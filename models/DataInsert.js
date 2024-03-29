const bcrypt = require("bcryptjs")
const validator = require("validator")

const db = require('../database/config')
global.db = db;

let DataInsert = function (data) {
  this.data = data
  this.errors = []
}

DataInsert.prototype.saveStudentData = function () {
  return new Promise((resolve, reject) => {
    if (Object.keys(this.data.files).length == 0) {
      console.log("Empty file");
      this.errors.push({msg: "Empty image"})
      reject()
      return
    }

    var file = this.data.files.img;
    var uploadpath = "public/assets/img/upload_images/" + file.name;

    file.mv(uploadpath, function (err) {
      if (err) {
        this.errors.push({msg: "give a valid name"})
        reject()
        return
      }
    });
    var id = this.data.body.CochingId
    var name = this.data.body.name
    var phone = this.data.body.phone
    var gender = this.data.body.gender
    var address = this.data.body.address
    var stclass = this.data.body.class
    var institute = this.data.body.instituteName
    var addmission = this.data.body.AddmissionDate
    var fee = this.data.body.TutionFee
    var gname = this.data.body.GuardianName
    var gphone = this.data.body.GuardianPhone
    var relation = this.data.body.relation
    var gaddress = this.data.body.GuardianAddress
    var goccupation = this.data.body.occupation

    var sql = "INSERT INTO student(CochingId, StudentName, PhoneNumber, Gender, Address, Image, InstitutionName, Class, AdmissionDate, GuardianName, GuardianOccupation, Relation, GuardianPhoneNumber, GuardianAddress, MonthlyPayment) VALUES ('" + id + "','" + name + "','" + phone + "','" + gender + "','" + address + "','" + file.name + "','" + institute + "','" + stclass + "','" + addmission + "','" + gname + "','" + goccupation + "','" + relation + "','" + gphone + "','" + gaddress + "','" + fee + "'); "
    db.query(sql, (err, result) => {
      if (err) {
        this.errors.push({msg: "Failed to Insert Data"})
        reject(err)
      }
      else {
        this.errors.push({msg: "Successfully Data Inserted"})
        resolve("successful!")
      }
    })
  })
}


DataInsert.prototype.updateStudentData = function () {
  return new Promise((resolve, reject) => {

    var profilePhoto = this.data.body.profilePhoto;

    if (this.data.files && Object.keys(this.data.files).length != 0) {
      var file = this.data.files.img;
      var uploadpath = "public/assets/img/upload_images/" + file.name;

      file.mv(uploadpath, function (err) {
        if (err) {
          this.errors.push({msg: "give a valid name"})
          reject()
          return
        }
      });
      profilePhoto = file.name;
    }


    var studentId = this.data.params.id
    var CochingId = this.data.body.CochingId
    var name = this.data.body.name
    var phone = this.data.body.phone
    var gender = this.data.body.gender
    var address = this.data.body.address
    var stclass = this.data.body.class
    var institute = this.data.body.instituteName
    var addmission = this.data.body.AddmissionDate
    var fee = this.data.body.TutionFee
    var gname = this.data.body.GuardianName
    var gphone = this.data.body.GuardianPhone
    var relation = this.data.body.relation
    var gaddress = this.data.body.GuardianAddress
    var goccupation = this.data.body.occupation
    var sql = "UPDATE student SET CochingId=?, StudentName=?, PhoneNumber=?, Gender=?, Address=?, Image=?, InstitutionName=?, Class=?, AdmissionDate=?, GuardianName=?, GuardianOccupation=?, Relation=?, GuardianPhoneNumber=?, GuardianAddress=?, MonthlyPayment=? where StudentID=?;"
    db.query(sql, [CochingId, name, phone, gender, address, profilePhoto, institute, stclass, addmission, gname, goccupation, relation, gphone, gaddress, fee, studentId], (err, result) => {
      if (err) {
        this.errors.push({msg: "Failed to Update Data"})
        reject(err)
      }
      else {
        this.errors.push({msg: "Successfully Data Updated"})
        resolve("successful!")
      }
    })
  })
}

DataInsert.prototype.saveTeacherData = function () {
  return new Promise((resolve, reject) => {
    if (Object.keys(this.data.files).length == 0) {
      console.log("Empty file")
      this.errors.push({msg: "Empty image"})
      reject()
      return
    }

    var file = this.data.files.img;
    var uploadpath = "public/assets/img/upload_images/" + file.name;

    file.mv(uploadpath, function (err) {
      if (err) {
        this.errors.push({msg: "give a valid name"})
        reject()
        return
      }
    });
    var id = this.data.body.CochingId
    var name = this.data.body.name
    var phone = this.data.body.phone
    var gender = this.data.body.gender
    var address = this.data.body.address
    var email = this.data.body.Email
    var university = this.data.body.UniversityName
    var degree = this.data.body.UniversityDegree
    var college = this.data.body.CollegeName
    var group = this.data.body.CollegeGroup
    var joining = this.data.body.JoiningDate
    var salary = this.data.body.Salary

    var sql = "INSERT INTO teacher (CochingId, TeacherName, PhoneNumber, Gender, Address, Image, Email, UniversityName, UniversityDegree, CollegeName, CollegeGroup, JoiningDate, Salary) VALUES ('" + id + "','" + name + "','" + phone + "','" + gender + "','" + address + "','" + file.name + "','" + email + "','" + university + "','" + degree + "','" + college + "','" + group + "','" + joining + "','" + salary + "'); "
    db.query(sql, (err, result) => {
      if (err) {
        this.errors.push({msg: "Data Insert Failed "})
        reject(err)
      }
      else {
        this.errors.push({msg: "Succecfully Data Inserted"})
        resolve("successfull!")
      }
    })
  })
}


DataInsert.prototype.savePaymentData = function () {
  return new Promise((resolve, reject) => {
    var id = this.data.body.CochingId
    var name = this.data.body.name
    let year = this.data.body.year
    var month = this.data.body.month
    var date = this.data.body.PaymentDate
    var type = this.data.body.type

    var sql = "INSERT INTO payment(CochingId, Name, Year, Month, PaymentDate, Type) VALUES ('" + id + "','" + name + "','" + year + "','" + month + "','" + date + "','" + type + "');"
    console.log(sql)
    db.query(sql, (err, result) => {
      if (err) {
        this.errors.push({msg: "Failed to Insert Data"})
        reject(err)
      }
      else {
        this.errors.push({msg: "Succecfully Data Inserted"})
        resolve("Updated!")
      }
    })
  })
}

module.exports = DataInsert