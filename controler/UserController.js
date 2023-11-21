var UserService = require("../services/user.service");
var jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const nodemailer = require("nodemailer");
const axios = require('axios');
 
exports.signup = async function (req, res) {
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User Already Exists!!" });
    } else {
      var data = req.body;
      var result = await UserService.addUser(data);
      var mailData = {"name":req.body['name'],"email":req.body['email']};
      sendMail(mailData);
      res.send({
        message: "User created",
      });
    }
  } catch (e) {
    res.status(500).send({
      message: "internal server error",
    });
  }
};
 
exports.login = async function (req, res) {
  var data = req.body;
  try {
    var result = await UserService.findUser(data);
    if (result) {
      var payload = {
        name: result.name,
        email: result.email,
        role: result.role,
      };
      var token = jwt.sign(payload, "mysecretkey");
      console.log("token", token);
      res.set("Authorization", token);
      res.send({
        data: result,
      });
    } else {
      res.status(204).send({
        message: "Invalid Login",
      });
    }
  } catch (e) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
};
 
 
function sendMail(user) {
  return axios({
    url: "http://localhost:"+ 3000+"/sendmail",
    method: "post",
    data: user,
  })
  .then(response => {
    console.log('Email sent successfully');
  })
  .catch(error => {
    console.log('Error sending email:', error);
  });
}