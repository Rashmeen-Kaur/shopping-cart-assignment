const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const bodyParser = require('body-parser')
const users = require("./server/users/userList.json");

const PORT = 3000;
const DATA_PATH = path.resolve(__dirname, './server');

const readDataFile = (method, name) => {
    const data = fs.readFileSync(`${DATA_PATH}/${name}/index.${method}.json`, 'utf-8');
    return JSON.parse(data);
}

const banners = readDataFile('get', 'banners');
const products = readDataFile('get', 'products');
const categories = readDataFile('get', 'categories');
const addToCart = readDataFile('post', 'addToCart');

const logger = (req, res, next) => {
    console.info(`request: ${req.method} ${req.url}`);
    next();
}

app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(cors());
app.use(logger);

app.get('/banners', (req, res) => {
    res.send(banners)
});

app.get('/products', (req, res) => {
    res.send(products)
});

app.get('/categories', (req, res) => {
    res.send(categories)
});

app.post('/addToCart', (req, res) => {
    res.send(addToCart)
});

app.post('/signin', (req, res) => {
    var email = req.body.email;
    var password =  req.body.password;
    let obj = users.find(o => o.email === email && o.password === password);
    console.log("obj", obj);
    if(obj){
        res.send({ response: 'S', responseMessage: 'Login successful' });
    }else{
        res.send({ response: 'F', responseMessage: 'Login failed, Invalid credentials' });
    }
    
});

app.post('/signup', (req, res) => {
    console.log("req.body",req.body);
    let user = req.body;
       
    // STEP 2: Adding new data to users object
    let obj = users.find(o => o.email === user.email);
    if(!obj){
        users.push(user);
        console.log("Users are ",users);
     // STEP 3: Writing to a file
     fs.writeFile(`${DATA_PATH}/users/userList.json`, JSON.stringify(users), err => {
         console.log("Inside write file");
          
         // Checking for errors
         if (err) throw err; 
        
         console.log("Done writing"); // Success
     });
     res.send({ response: 'S', responseMessage: 'User registered successfully' });
    }else{
        res.send({ response: 'F', responseMessage: 'User already exists' });
    }
   
    
});

app.listen(PORT, () => {
    console.log(`API server has started listening on port ${PORT}`);
});
