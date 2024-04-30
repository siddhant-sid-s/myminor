const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const UserModel = require('./Models/User')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/blood");

app.post('/login',(req,res) =>{
    const {email,password} = req.body;
    UserModel.findOne({email:email})
    .then(user => {
        if(user){
            if(user.password == password){
                res.json("Success")
            }else{
                res.json("The password is incorrect")
            }
        }else{
            res.json("No record existed")
        }
    })
})
app.post('/register',(req,res) =>{
    UserModel.create(req.body)
    .then(user => res.json(user))
    .catch(err => res.json(err))
})
app.get('/api/users', async (req, res) => {
    const { pincode, bloodGroup } = req.query;
    console.log('Searching for users with pincode:', pincode, 'and blood group:', bloodGroup);
  
    try {
      const users = await UserModel.find({pincode ,bloodGroup});
      console.log('Users found:', users);
      res.json(users);
    } catch (error) {
      console.error('Error during user search:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.listen(3001, () =>{
    console.log("Server is running");
})