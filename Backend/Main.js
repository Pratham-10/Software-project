const { mongoose } = require('mongoose');
const express = require('express');
const app = express();
require('dotenv').config({path : '../.env'});
const cors = require('cors');
  
app.use(cors());  

app.listen(3300,()=>{
    console.log("server running on port 3300");
})

const uri = process.env.uri;

mongoose.connect(uri).then(()=>{
    console.log("connection")
}).catch((err)=>{console.log(err.message)});

const bodyparser = require('body-parser');
const { Int32, Timestamp } = require('mongodb');
app.use(bodyparser.json());
//////////////////////// User ////////////////////////
/////////////////// Register /////////////////////////
const testSchema = new mongoose.Schema({
        first : String,
        last : String,
        username : {type:String , unique: true },
        password : String,
        dob : Date,
        phone : String,
        email : String,
        gender : String,
},{ versionKey: false });

const userdetail = mongoose.model('users', testSchema);

app.get('/userdetail/:username', (req, ress) => {

  const user = req.params.username;
userdetail.find({username: user})
  .then(res => {
    ress.send(res);
  })
  .catch(error => {
    ress.send(error);
  });
});

////////////////////// Login ///////////////////

app.post('/newuser',async (req,ress)=>{
await userdetail.create(req.body).then((res)=>{
    ress.send(res)
}).catch((err)=>{

   ress.status(500).json({ error: 'Internal Server Error' });
});

});


///////////////// ProvideRide ////////////////////



const generateUniqueCode = async (req, res, next) => {
  // Function to generate a random 6-digit code
  const generateRandomCode = () => Math.floor(100000 + Math.random() * 900000);

  // Function to check if the generated code is unique in the collection
  const isCodeUnique = async (code) => {
    const existingDoc = await RideDetails.findOne({ code });
    return !existingDoc;
  };

  let uniqueCode;
  do {
    uniqueCode = generateRandomCode();
  } while (!(await isCodeUnique(uniqueCode)));

  // Attach the unique code to the request object
  req.uniqueCode = uniqueCode;

  // Proceed to the next middleware or route handler
  next();
};



const RideDetailschema = new mongoose.Schema({
  license: String,
  seat: Number,
  carno : String,
  carname: String,
  cartype : String,
  charge: Number,
  from: String,
  to: String,  
  driver_username: String,
  date: { type: Date, default : Date.now},
  occupied : {type: Number, default: 0},
  passenger: { type: Array, default : []},
  code: { type: Number, unique: true, required: true },
},{ versionKey: false });

const RideDetails = mongoose.model('ridedetail', RideDetailschema);

app.post('/ridedetails',generateUniqueCode,async (req,ress)=>{
  await RideDetails.create({...req.body, code: req.uniqueCode}).then((res)=>{
      ress.send(res)
  }).catch((err)=>{
      ress.send(err.message);
  });
  
  });

  app.get('/passengerride/:ispassengercount/:isfrom/:isto',(req,ress)=>{
    const query = {
      seat: { $gte: req.params.ispassengercount},
      from: req.params.isfrom,
      to: req.params.isto,
    };
    RideDetails.find(query).then((res)=>{
      console.log(res);
      const responseArray = Array.isArray(res) ? res : [res];
      ress.send(responseArray);
    }).catch((err)=>{
      console.log("error",err.message);
    })
  })