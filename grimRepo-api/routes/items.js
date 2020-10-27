// import required essentials
const express = require('express');
const { readFile, readFileSync, appendFile, writeFile} = require('fs')
var cors = require('cors');

let txt = readFileSync('./movies.json', 'utf8')

// console.log(txt);// create new router
const router = express.Router();

// TODO: import movies here
// create a JSON data array
// let data = [
//     { id: 1, title: 'Create a project',  order: 1, completed: true, createdOn: new Date() },
//     { id: 2, title: 'Take a cofféé',     order: 2, completed: true, createdOn: new Date() },
//     { id: 3, title: 'Write new article', order: 3, completed: true, createdOn: new Date() },
//     { id: 4, title: 'Walk toward home', order: 4, completed: false, createdOn: new Date() },
//     { id: 5, title: 'Have some dinner', order: 5, completed: false, createdOn: new Date() },
// ];
let data = JSON.parse(txt) ;
// this end-point of an API returns JSON data array
router.get('/', function (req, res) {
    res.status(200).json(data);
});

// this end-point returns an object from a data array find by id
// we get `id` from URL end-points
router.get('/:id', function (req, res) {
    // find an object from `data` array match by `id`
    let found = data.find(function (item) {
        return item.id === parseInt(req.params.id);
    });
    // if object found return an object else return 404 not-found
    if (found) {
        res.status(200).json(found);
    } else {
        res.sendStatus(404);
    }
});



// CREATE
// this api end-point add new object to item list
// that is add new object to `data` array
router.post('/', function (req, res) {
    console.log(req.body)
    // get itemIds from data array
    let itemIds = data.map(item => item.id);
    // get orderNums from data array
    let orderNums = data.map(item => item.order);

    // create new id (basically +1 of last item object)
    let newId = itemIds.length > 0 ? Math.max.apply(Math, itemIds) + 1 : 1;
    // create new order number (basically +1 of last item object)
    let newOrderNum = orderNums.length > 0 ? Math.max.apply(Math, orderNums) + 1 : 1;

    // create an object of new Item
    let newItem = {
        id: newId, // generated in above step
        name: req.body.name, // value of `title` get from POST req
        year: req.body.year, // generated in above step
        image: req.body.image, // default value is set to false
        createdOn: new Date() // new date object
    };
    let newMovieSheet = JSON.parse(txt) ;

    console.log('insert new move here ', newMovieSheet);
    console.log('NEW MOVIE ', newItem);

    newMovieSheet.push(newItem) ;
    // push new item object to data array of items
    data.push(newItem);

    writeFile('movies.json', JSON.stringify(newMovieSheet), function (err) {
        if (err) throw err;
        console.log('Saved!');
      });

    // return with status 201
    // 201 means Created. The request has been fulfilled and 
    // has resulted in one or more new resources being created. 
    res.status(201).json(newItem);



});

module.exports = router;