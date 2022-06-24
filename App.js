const mongoose = require('mongoose')


const express = require('express')
const User = require('./schema/user')
const multer  = require('multer')
const path = require('path')

const app = express()
app.use(express.json())
app.use('/profile', express.static('upload/images'));
require('./data/connection')
// const User = require('./schema/user')
const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,cb) =>{
        console.log(file)
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
    
})
const upload = multer({ 
    storage:storage
})


app.post('/user/signup', upload.single('profile'), function (req, res) {
    
    console.log(req.body)
    console.log('body') 
    console.log(req.file)

    if (!req.file){
        console.log('google photo availval')
        const {name,age,gender,token,hobbies,latitude,longitude,profilepic,birthdate,blood} = req.body
           
        
        const user = new User({name,age,gender,token,hobbies,longitude,latitude,profilepic,birthdate,blood})
    
        user.save().then((e)=>{
            res.send(e)
    
            
        }).catch((e)=>{
            console.log(e)
        })
    }else{
        const {name,age,gender,token,hobbies,latitude,longitude,blood,birthdate} = req.body

        
       
        console.log('no google photo')
        const profilepic = req.file.filename
        const user = new User({name,age,gender,token,profilepic,hobbies,longitude,latitude,blood,birthdate})
    
        user.save().then((e)=>{
            res.send(e)
    console.log(e)
            
        }).catch((e)=>{
            console.log(e)
        })
    }
  
    

  })





app.post('/hobbies/parent',(req,res)=>{
    console.log(req.body)
    const {hobby} = req.body
    const add = new Hobby({hobby})

    add.save().then(()=>{
        res.send({"notice":'user saved in data'})
    }).catch((e)=>{
        console.log(e)
    })
})



app.post ('/user/detail',(req,res)=>{
    
    const token = req.body.token
    User.findOne({token:token},( err ,data

    )=>{
        
    //    console.log(data.profilepic)
       res.send(data)
    })
   
})



app.post ('/users/list',(req,res)=>{
    
   
    User.find({},(err,data

    )=>{
      console.log(data)
      console.log(err)
       res.send(data)
    })
   
})



app.listen(3000,()=>{
    console.log('App listioning on 3000')
})