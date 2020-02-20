const bcrypt = require("bcryptjs")
const validator = require("validator")

const db = require('../database/config')
global.db = db;

let User = function (data) {
  this.data = data
  this.errors = []
}

User.prototype.cleanUp = function () {
  if (typeof (this.data.username) != "string") { this.data.username = "" }
  if (typeof (this.data.password) != "string") { this.data.password = "" }

  // get rid of any bogus properties
  this.data = {
    username: this.data.username.trim().toLowerCase(),
    password: this.data.password
  }
}

User.prototype.login = function () {
  return new Promise((resolve, reject) => {
    this.cleanUp()
    var sql = "SELECT  *FROM admin WHERE UserName = '" + this.data.username + "' and Password = '" + this.data.password + "';"
    db.query(sql, (err, result) => {
      if (err) {
        this.errors.push({msg: "Invalid"})
        reject(err)
      }
      if (result.length > 0) {
        resolve("Congrats!")
      }
      else {
        this.errors.push({msg: "Invalid username / Password"})
        reject("Invalid username / password.")
      }
    })
  })
}

User.prototype.savePasswordData = function () {
  return new Promise((resolve, reject) => {
    var oldpwd = this.data.OldPassword
    var newpwd = this.data.NewPassword
    var renewpwd = this.data.ReNewPassword

    if (newpwd != renewpwd) {
      this.errors.push({msg: "Password Not Matched"})
      reject()
      return
    }
    var sql = "UPDATE admin set Password = '" + newpwd + "' where AdminID = 1 && Password = '"+oldpwd+"' ";
    db.query(sql, (err, result) => {
      if (err) {
        this.errors.push({msg: "Please try again later"})
        reject(err)
      }
      else if(result.affectedRows>0) {
        console.log(result)
        this.errors.push({msg: "Successfully Updated Password"})
        resolve("Updated!")
      }
      else{
        this.errors.push({msg: "invalid old password"})
        reject()
      }
    })
  })
}


User.prototype.uploadPhoto = function(){
  return new Promise((resolve,reject)=>{    
    let id = this.data.body.ID;
    console.log("ahbifkd "+ id)
    if (Object.keys(this.data.files).length == 0) {
      console.log("empty file")
      reject('Empty File')
    }
    
    var file = this.data.files.profile_pic;
    //console.log(file.name);


    var uploadPath =  "public/assets/img/upload_images/" + file.name;
    console.log(uploadPath);

    file.mv(uploadPath, function(err) {
        console.log("habib" + id)
        if (err) {
            console.log("error");
            reject(err);
        }

        var sql = "UPDATE student SET Image = '" + file.name + "' where StudentID = '" + id + "'"
        console.log(sql)
        db.query(sql, function(err,result){
          if(err){
            console.log(err)
            reject(err)
          }
          else {
            resolve("Uploaded profile picture successfully")
          }
        })
    })
  })
}


User.prototype.uploadTeacherPhoto = function(){
  return new Promise((resolve,reject)=>{    
    let id = this.data.body.ID;
    if (Object.keys(this.data.files).length == 0) {
      console.log("empty file")
      reject('Empty File')
    }
    
    var file = this.data.files.profile_pic;
    //console.log(file.name);


    var uploadPath =  "public/assets/img/upload_images/" + file.name;
    console.log(uploadPath);

    file.mv(uploadPath, function(err) {
        if (err) {
            console.log("error");
            reject(err);
        }

        var sql = "UPDATE teacher SET Image = '" + file.name + "' where TeacherID = '" + id + "'"
        console.log(sql)
        db.query(sql, function(err,result){
          if(err){
            console.log(err)
            reject(err)
          }
          else {
            resolve("Uploaded profile picture successfully")
          }
        })
    })
  })
}

module.exports = User