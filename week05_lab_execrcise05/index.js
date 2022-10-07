const express = require('express');
const app = express();
const router = express.Router();
const fs = require('fs')

/*
- Create new html file name home.html 
- add <h1> tag with message "Welcome to ExpressJs Tutorial"
- Return home.html page to client
*/
router.get('/home.html', (req,res) => {
  res.sendFile(__dirname + "/home.html")
})

router.get('/home', (req,res) => {
  res.send('This is home router');
})

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req,res) => {
  fs.readFile(__dirname + "/user.json", "utf-8", (err, data) => {
    res.send(data)
  })
})

router.get('/profile', (req,res) => {
  res.send('This is profile router');
});

/*
- Modify /login router to accept username and password as query string parameter
- Read data from user.json file
- If username and  passsword is valid then send resonse as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If passsword is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
// http://localhost:8081/login?username=bret&password=bret@123
router.get('/login', (req,res) => {
  let file = fs.readFileSync(__dirname + "/user.json")
  let user_name = JSON.parse(file).username
  let password = JSON.parse(file).password
  let user_input = req.query.username
  let user_pin = req.query.password

  if (user_input == user_name && user_pin == password) {
    res.send("status: true, message: User Is valid")
  }
  if (user_input != user_name) {
    res.send('status: false,message: User Name is invalid')
  }
  if (user_pin != password) {
    res.send('status: false, message: Password is invalid')
  }
})


router.get('/login', (req,res) => {
  res.send('This is login router');
})

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
// http://localhost:8081/logout?username=bret
router.get('/logout', (req,res) => {
  let user_name = req.query.username
  res.send(`<b>${user_name} successfully logout.</b>`)
})


router.get('/logout', (req,res) => {
  res.send('This is logout router');
});

app.use('/', router);

app.listen(process.env.port || 8081);

console.log('Web Server is listening at port '+ (process.env.port || 8081));