let express = require('express');
let path = require('path');
let fs = require('fs');
let bodyParser = require('body-parser');
const { fstat } = require('fs');
const { json } = require('express/lib/response');

let app = express();
app.use(bodyParser.urlencoded({ urlencoded: false }));

// app.get('/', (req, res) => {
//     res.send('Hello from the web server side ...');
// })

// app.use((req, res, next) => {
//     // console.log(req.url);
//     next();
// })

app.post('/contact', (req, res, next) => {
    // console.log(req.body.name);
    // console.log(req.body.phone);
    fs.appendFileSync('./data.json', JSON.stringify({name: req.body.name, num: req.body.phone}))
    res.send(`Thank you ${req.body.name}`)
})
// // this keeps appending a new list to the file h** how to add an obj to a list of objs in a file.
// app.post('/contact', (req, res, next) => {
//     // console.log(req.body.name);
//     // console.log(req.body.phone);
//     let dataRead = fs.readFileSync('data.json', 'utf-8')
//     let dataP = JSON.parse(dataRead);
//     let newData = {name: req.body.name, num: req.body.phone}
//     dataP.push(newData)
//     fs.writeFileSync('./data.json', JSON.stringify(dataP))
//     res.send(`Thank you ${req.body.name}`)
// })

app.get('/formsubs', (req, res) => {
    res.contentType('html')
    res.send(fs.readFileSync('data.json'));
})

app.use(express.static(path.join(__dirname, '../public')));

app.listen(3000);