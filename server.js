const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database ={
    sessions:
    [
    {
        id: '123',
        code:'asdfg',
        title:'First Session',
        created: new Date()
    },
    {
        id: '124',
        code:'qwert',
        title:'Second Session',
        created: new Date()
    }
        
    ]
}

app.get('/',(req,res)=>{
    res.send(database.sessions);
})

app.post('/joinSession', (req,res)=>{
   if (req.body.code === database.sessions[0].code)
   {
       res.json('success');
   }else{
       res.status(400).json('Error joining session');
   }
    
})

app.post('/createSession',(req,res) =>{
    const {code,title} = req.body;
    bcrypt.hash(code, null, null, function(err, hash) {
        console.log(hash);
    });
    database.sessions.push({
        id: '125',
        code:code,
        title:title,
        created: new Date()
    })
   res.json(database.sessions[database.sessions.length-1])
})
app.get('/session/:id',(req,res) =>{
    const {id} = req.params;
    let found = false;
    database.sessions.forEach(session =>{
        if(session.id === id) {
            found = true;
            return res.json(session);
        }
          
    })
    if(!found){
        res.status(404).json("no such session");
    }
} )
app.listen(3000,()=>{
    console.log('App is running on port 3000');
});


/*
// Load hash from your password DB.
bcrypt.compare("bacon", hash, function(err, res) {
    // res == true
});
bcrypt.compare("veggies", hash, function(err, res) {
    // res = false
});*/