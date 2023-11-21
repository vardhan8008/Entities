var Express = require("express");
const path = require("path")
var bodyparser = require('body-parser')
const Port = process.env.PORT || 7001;
var app = Express();
var CarSingleData = require("./carsingledata")
var dbservice =require("./dbservice");
require("./dbconnection");
var CarService = require("./cars");
var CarData = require("./carData");
var AuthController=require("./controler/auth.controller")

app.use(bodyparser.json());
const cors = require('cors');
const corsOptions = {   origin: 'http://localhost:3000', 
methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',   
credentials: true, 
optionsSuccessStatus: 204, };
 
app.use(cors(corsOptions));

app.get("/cars/all" ,async (req, res) => {
  try {
    const cars = await CarData.getAllCars();
    res.send(cars);
  } catch (e) {
    console.log("error", e);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

app.post("/createcar" ,AuthController.isAuthenticated, async function(req,res){
  try {
      var result  = await CarService.createCar(req.body)
      res.send({
          message:"Car Data Created",
          data:result
      })
  }
  catch(e){
      console.log("error " , e)
      res.status(500).send({
          message:"Internal Server Error"
      })
  }
})
app.get("/cars/:id", async (req, res) => {
  const carId = req.params.id;
 
  try {
    const car = await CarSingleData.getCarById(carId);
 
    if (!car) {
      res.status(404).send({
        message: "Car not found",
      });
    } else {
      res.send(car);
    }
  } catch (e) {
    console.log("error", e);
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

app.get("/", (req, res) => {
  res.send("home");
});
 


 
app.listen(Port, () => {
  console.log("Server is running on ...", Port);
});