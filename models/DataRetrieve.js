/*
    Author: Raihan
    Objective: Retrieving the data for the function called in data controller
*/

const bcrypt = require("bcryptjs")
const validator = require("validator")

const db = require('../database/config')
global.db = db;

let DataRetrieve = function (data) {
    this.data = data
    this.errors = []
}


//student list retrieve
DataRetrieve.prototype.getStudentList = function () {
    return new Promise((resolve, reject) => {
        var sql = "select *from student order by CochingId;"
        db.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                this.data = result
                resolve("")
            }
        })
    })
}

//teacher list retrieve
DataRetrieve.prototype.getTeacherList = function () {
    return new Promise((resolve, reject) => {
        var sql = "select *from teacher order by CochingId;"
        db.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                this.data = result
                resolve("")
            }
        })
    })
}

//paid student list retrieve
DataRetrieve.prototype.getPaidStudentList = function () {
    return new Promise((resolve, reject) => {
        var sql = "select *from student where CochingId IN (select CochingId from payment where paymentDate Between ? and ? and Type='Student');"
        db.query(sql, [this.data.start, this.data.end], (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                this.data = result
                console.log(result);
                resolve("")
            }
        })
    })
}

//paid teacher list retrieve
DataRetrieve.prototype.getPaidTeacherList = function () {
    return new Promise((resolve, reject) => {
        var sql = "select *from teacher where CochingId IN (select CochingId from payment where Year = '" + this.data.Year + "' and Month = '" + this.data.Month +"' and Type='Teacher');"
        db.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                this.data = result
                console.log(result);
                resolve("")
            }
        })
    })
}




//unpaid student list retrieve
DataRetrieve.prototype.getUnPaidStudentList = function () {
    return new Promise((resolve, reject) => {
        var sql = "select *from student where CochingId NOT IN (select CochingId from payment where Year = '" + this.data.Year + "' and Month = '" + this.data.Month +"' and Type='Student');"
        db.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                this.data = result
                console.log(result);
                resolve("")
            }
        })
    })
}

//unpaid teacher list retrieve
DataRetrieve.prototype.getUnPaidTeacherList = function () {
    return new Promise((resolve, reject) => {
        var sql = "select *from teacher where CochingId NOT IN (select CochingId from payment where Year = '" + this.data.Year + "' and Month = '" + this.data.Month +"' and Type='Teacher');"
        db.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                this.data = result
                console.log(result);
                resolve("")
            }
        })
    })
}

DataRetrieve.prototype.getPayableStudentList = function () {
    return new Promise((resolve, reject) => {
        var sql = "select *from student where StudentName NOT IN (select name from payment where Type='student');"
        db.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                this.data = result
                resolve("")
            }
        })
    })
}

//paid teacher list retrieve
DataRetrieve.prototype.getPaidTeacherList = function () {
    return new Promise((resolve, reject) => {
        var sql = "select *from teacher where TeacherName IN (select name from payment where Type='teacher');"
        db.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                this.data = result
                resolve("")
            }
        })
    })
}

//unpaid teacher list retrieve
DataRetrieve.prototype.getPayableTeacherList = function () {
    return new Promise((resolve, reject) => {
        var sql = "select *from teacher where TeacherName NOT IN (select name from payment where Type='teacher');"
        db.query(sql, (err, result) => {
            if (err) {
                reject(err)
            }
            else {
                this.data = result
                resolve("")
            }
        })
    })
}

/* getting Student's information */

DataRetrieve.prototype.getStudentInfo = function () {
    return new Promise((resolve, reject)=>{
        let id = this.data.params.id
        var sql = "SELECT *FROM student where StudentID = '"+id+"';"
        db.query(sql,(err, result)=>{
            if (err) {
                reject(err)
            }
            else {
                this.data = result
                resolve("")
            }
        })
    })
}

// delete a student

DataRetrieve.prototype.deleteStudent = function () {
    return new Promise((resolve, reject)=>{
        let id = this.data.params.id
        var sql = "delete FROM student where StudentID = '"+id+"';"
        db.query(sql,(err, result)=>{
            if (err) {
                reject(err)
            }
            else {
                resolve("")
            }
        })
    })
}

// delete a teacher

DataRetrieve.prototype.deleteTeacher = function () {
    return new Promise((resolve, reject)=>{
        let id = this.data.params.id
        var sql = "delete FROM teacher where TeacherID = '"+id+"';"
        db.query(sql,(err, result)=>{
            if (err) {
                reject(err)
            }
            else {
                resolve("")
            }
        })
    })
}


/* getting teacher's information */

DataRetrieve.prototype.getTeacherInfo = function () {
    return new Promise((resolve, reject)=>{
        let id = this.data.params.id
        var sql = "SELECT *FROM teacher where TeacherID = '"+id+"';"
        db.query(sql,(err, result)=>{
            if (err) {
                reject(err)
            }
            else {
                this.data = result
                resolve("")
            }
        })
    })
}

DataRetrieve.prototype.getClassList = function(){
    return new Promise((resolve,reject)=>{
        let sql = null,
            add1 = "",
            add2 = "";

        if(this.data.select!="all"){
            add1 = this.data.select
        }
        if(this.data.choose!="all"){
            add2 = this.data.choose
        }

        if(add1=="" && add2==""){
            sql = "select *from student";
        }
        else if(add1!="" && add2!=""){
            sql = "select *from student where Class= '" + add1 + "' and Gender = '" + add2 + "'"
        }
        else if(add1!=""){
            sql = "select *from student where Class= '" + add1 + "'"
        }
        else{
            sql = "select *from student where Gender = '" + add2 + "'"
        }
        console.log(sql)
        db.query(sql,(err, result)=>{
            if(err){
                reject(err)
            }
            else{
                console.log("habib" + result)
                this.data = result
                resolve("")
            }
        })
    })
}

module.exports = DataRetrieve