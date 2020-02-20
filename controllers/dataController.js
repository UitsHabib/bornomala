const DataInsert = require('../models/DataInsert')

var excel = require('excel4node')

const db = require('../database/config')
global.db = db;


exports.addStudent = function (req, res) {
    if (req.session.user) {
        res.render('add_student', { admin: req.session.user.username })
    }
    else {
        res.redirect('/login')
    }
}

exports.showPayement = function (req, res) {
    if (req.session.user) {
        let year = req.body.year;
        let sid = req.body.id;
        var sql = "select * from payment where year = '" + year + "' and CochingId = '" + sid + "'"
        db.query(sql, function(err,result){
            if(err){
                console.log(err)
            }
            else{
                console.log(result)
                res.json(result);
            }
        })
    }
    else {
        res.redirect('/login')
    }
}

exports.enteringStudent = function (req, res) {
    let datainsert = new DataInsert (req)
    datainsert.saveStudentData().then(function (result) {
        res.render('add_student', {admin: req.session.user.username, errors: datainsert.errors})
    }).catch(function (e) {
        res.redirect('/login')
    })
}

exports.addteacher = function (req, res) {
    if (req.session.user) {
        res.render('add_teacher', { admin: req.session.user.username })
    }
    else {
        res.redirect('/login')
    }
}

exports.enteringTeacher = function (req, res) {
    let datainsert = new DataInsert(req)
    datainsert.saveTeacherData().then(function (result) {
        res.render('add_teacher', {admin: req.session.user.username, errors: datainsert.errors})
    }).catch(function (e) {
        res.redirect('/login')
    })
}

exports.addPayment = function (req, res) {
    if (req.session.user) {
        res.render('add_payment', { admin: req.session.user.username })
    }
    else {
        res.redirect('/login')
    }
}

exports.enteringPayment = function (req, res) {
    let datainsert = new DataInsert(req)
    datainsert.savePaymentData().then(function (result) {
        res.render('add_payment', {admin: req.session.user.username, errors: datainsert.errors})
    }).catch(function (e) {
        res.redirect('/login')
    })
}

exports.adminUpdatePassword = function (req, res) {
    if (req.session.user) {
        res.render('admin_update_password', { admin: req.session.user.username })
    }
    else {
        res.redirect('/login')
    }
}

/*
    Author: Raihan
    Objective: Creating the function for retrieving data for DataRetrieve
*/

const DataRetrieve = require('../models/DataRetrieve')


//get the student list
exports.getStudent = function (req, res) {
    let dataRetrieve = new DataRetrieve([])
    dataRetrieve.getStudentList().then(function (result) {
        res.render('student-list', {admin: req.session.user.username, info: dataRetrieve.data} )
    }).catch(function (e) {
        console.log(e)
        res.redirect('/login')
    })
}

exports.chooseClass = function(req,res){
    let dataRetrieve = new DataRetrieve(req.body)
    dataRetrieve.getClassList().then(function(result){
        console.log(dataRetrieve.data)
        res.render('student-list', {admin: req.session.user.username, info: dataRetrieve.data})
    }).catch(function(e){
        console.log(e)
        res.redirect('/login')
    })
}

//get the teacher list
exports.getTeacher = function (req,res) {
    let dataRetrieve = new DataRetrieve([])
    dataRetrieve.getTeacherList().then(function (result) {
        res.render('teacher-list', {admin: req.session.user.username, info: dataRetrieve.data})
    }).catch(function (e) {
        console.log(e)
        res.redirect('/login')
    })
}

//get the teacher info
exports.teacherInfo = function (req, res) {
    let dataRetrieve = new DataRetrieve(req)
    dataRetrieve.getTeacherInfo().then( function (result){
        console.log(dataRetrieve.data)
        res.render('teacher-info', {admin: req.session.user.username, item: dataRetrieve.data[0]})
    })
    .catch(function (e) {
        console.log(e)
        res.redirect('/login')
    })
}

//get the student info
exports.studentInfo = function (req, res) {
    let dataRetrieve = new DataRetrieve(req)
    dataRetrieve.getStudentInfo().then( function (result){
        res.render('student-info', {admin: req.session.user.username, item: dataRetrieve.data[0] })
    })
    .catch(function (e) {
        console.log(e)
        res.redirect('/login')
    })
}

// delete a student
exports.deleteStudent = function (req, res) {
    let dataRetrieve = new DataRetrieve(req)
    dataRetrieve.deleteStudent().then( function (result){
        res.redirect('/student-list')
    })
    .catch(function (e) {
        console.log(e)
        res.redirect('/login')
    })
}

// delete a teacher
exports.deleteTeacher = function (req, res) {
    let dataRetrieve = new DataRetrieve(req)
    dataRetrieve.deleteTeacher().then( function (result){
        res.redirect('/teacher-list')
    })
    .catch(function (e) {
        console.log(e)
        res.redirect('/login')
    })
}

exports.choosePaidStudents = function(req,res){
    if(req.session.user){
        let dataRetrieve = new DataRetrieve(req.body)
        dataRetrieve.getPaidStudentList().then(function (result) {
            res.render('paid-student', {admin: req.session.user.username, info: dataRetrieve.data} )
        }).catch(function (e) {
            console.log(e)
            res.redirect('/login')
        })
    }
    else{
        res.redirect('/login');
    }
}

exports.choosePaidTeachers = function(req,res){
    if(req.session.user){
        let dataRetrieve = new DataRetrieve(req.body)
        dataRetrieve.getPaidTeacherList().then(function (result) {
            console.log("teacher info: " , dataRetrieve.data)
            res.render('paid-teacher', {admin: req.session.user.username, info: dataRetrieve.data} )
        }).catch(function (e) {
            console.log(e)
            res.redirect('/login')
        })
    }
    else{
        res.redirect('/login');
    }
}

exports.chooseUnPaidStudents = function(req,res){
    if(req.session.user){
        let dataRetrieve = new DataRetrieve(req.body)
        dataRetrieve.getUnPaidStudentList().then(function (result) {
            res.render('payable-student', {admin: req.session.user.username, info: dataRetrieve.data} )
        }).catch(function (e) {
            console.log(e)
            res.redirect('/login')
        })
    }
    else{
        res.redirect('/login');
    }
}

exports.chooseUnPaidTeachers = function(req,res){
    if(req.session.user){
        let dataRetrieve = new DataRetrieve(req.body)
        dataRetrieve.getUnPaidTeacherList().then(function (result) {
            res.render('payable-teacher', {admin: req.session.user.username, info: dataRetrieve.data} )
        }).catch(function (e) {
            console.log(e)
            res.redirect('/login')
        })
    }
    else{
        res.redirect('/login');
    }
}

//get the paid student list
exports.getPaidStudent = function (req, res) {
    if(req.session.user){
        res.render('paid-student', {admin: req.session.user.username, info: []} )
    }
    else{
        res.redirect('/login');
    }
}


//get the unpaid student list
exports.getPayableStudent = function (req, res) {
    if(req.session.user){
        res.render('payable-student', {admin: req.session.user.username, info: []} )
    }
    else{
        res.redirect('/login');
    }
}


//get the paid teacher list
exports.getPaidTeacher = function (req, res) {
    if(req.session.user){
        res.render('paid-teacher', {admin: req.session.user.username, info: []} )
    }
    else{
        res.redirect('/login');
    }
}



//get the unpaid teacher list
exports.getPayableTeacher = function (req, res) {
    if(req.session.user){
        res.render('payable-teacher', {admin: req.session.user.username, info: []} )
    }
    else{
        res.redirect('/login');
    }
}

//-------------------------save the pages data in excel---------------------

exports.saveExcelPaidStudents = function(req,res){
    var workbook = new excel.Workbook()
    var worksheet = workbook.addWorksheet('Sheet 1')

    // Create a reusable style
    var style = workbook.createStyle({
        font: {
        color: '#FF0800',
        size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });
    const data = JSON.parse(req.body.data)

    for(let i=0; i<data.length; i++){
        const salary = data[i].MonthlyPayment.toString()
        console.log(salary)
        console.log(typeof salary)
        
        worksheet.cell(i+1,1).string(data[i].CochingId).style(style)
        worksheet.cell(i+1,2).string(data[i].StudentName).style(style)
        worksheet.cell(i+1,3).string(data[i].PhoneNumber).style(style)
        worksheet.cell(i+1,4).string(data[i].Class).style(style)
        worksheet.cell(i+1,5).string(salary).style(style)
        worksheet.cell(i+1,6).string(data[i].GuardianName).style(style)
        worksheet.cell(i+1,7).string(data[i].GuardianPhoneNumber).style(style)
        worksheet.cell(i+1,8).string(data[i].Relation).style(style)
    }
    var tempfile = require('tempfile');
    var tempFilePath = tempfile('.xlsx');
    console.log("tempFilePath : ", tempFilePath);
    workbook.write(tempFilePath, function(err,result) {
        res.sendFile(tempFilePath, function(err){
            console.log('---------- error downloading file: ', err);
        });
        console.log('file is written');
    });
}


exports.saveExcelUnPaidStudents = function(req,res){
    var workbook = new excel.Workbook()
    var worksheet = workbook.addWorksheet('Sheet 1')

    // Create a reusable style
    var style = workbook.createStyle({
        font: {
        color: '#FF0800',
        size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });
    const data = JSON.parse(req.body.data)

    for(let i=0; i<data.length; i++){
        worksheet.cell(i+1,1).string(data[i].CochingId).style(style)
        worksheet.cell(i+1,2).string(data[i].StudentName).style(style)
        worksheet.cell(i+1,3).string(data[i].PhoneNumber).style(style)
        worksheet.cell(i+1,4).string(data[i].Class).style(style)
        worksheet.cell(i+1,5).string(data[i].MonthlyPayment).style(style)
        worksheet.cell(i+1,6).string(data[i].GuardianName).style(style)
        worksheet.cell(i+1,7).string(data[i].GuardianPhoneNumber).style(style)
        worksheet.cell(i+1,5).string(data[i].Relation).style(style)
    }
    var tempfile = require('tempfile');
    var tempFilePath = tempfile('.xlsx');
    console.log("tempFilePath : ", tempFilePath);
    workbook.write(tempFilePath, function(err,result) {
        res.sendFile(tempFilePath, function(err){
            console.log('---------- error downloading file: ', err);
        });
        console.log('file is written');
    });
}

exports.saveExcelPaidTeachers = function(req,res){
    var workbook = new excel.Workbook()
    var worksheet = workbook.addWorksheet('Sheet 1')

    // Create a reusable style
    var style = workbook.createStyle({
        font: {
        color: '#FF0800',
        size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });
    const data = JSON.parse(req.body.data)

    for(let i=0; i<data.length; i++){
        worksheet.cell(i+1,1).string(data[i].CochingId).style(style)
        worksheet.cell(i+1,2).string(data[i].TeacherName).style(style)
        worksheet.cell(i+1,3).string(data[i].PhoneNumber).style(style)
        worksheet.cell(i+1,5).string(data[i].MonthlyPayment).style(style)
        worksheet.cell(i+1,6).string(data[i].Email).style(style)
    }
    var tempfile = require('tempfile');
    var tempFilePath = tempfile('.xlsx');
    console.log("tempFilePath : ", tempFilePath);
    workbook.write(tempFilePath, function(err,result) {
        res.sendFile(tempFilePath, function(err){
            console.log('---------- error downloading file: ', err);
        });
        console.log('file is written');
    });
}


exports.saveExcelUnPaidTeachers = function(req,res){
    var workbook = new excel.Workbook()
    var worksheet = workbook.addWorksheet('Sheet 1')

    // Create a reusable style
    var style = workbook.createStyle({
        font: {
        color: '#FF0800',
        size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });
    const data = JSON.parse(req.body.data)

    for(let i=0; i<data.length; i++){
        worksheet.cell(i+1,1).string(data[i].CochingId).style(style)
        worksheet.cell(i+1,2).string(data[i].TeacherName).style(style)
        worksheet.cell(i+1,3).string(data[i].PhoneNumber).style(style)
        worksheet.cell(i+1,5).string(data[i].MonthlyPayment).style(style)
        worksheet.cell(i+1,6).string(data[i].Email).style(style)
    }
    var tempfile = require('tempfile');
    var tempFilePath = tempfile('.xlsx');
    console.log("tempFilePath : ", tempFilePath);
    workbook.write(tempFilePath, function(err,result) {
        res.sendFile(tempFilePath, function(err){
            console.log('---------- error downloading file: ', err);
        });
        console.log('file is written');
    });
}


exports.saveExcelStudentsList = function(req,res){
    var workbook = new excel.Workbook()
    var worksheet = workbook.addWorksheet('Sheet 1')

    // Create a reusable style
    var style = workbook.createStyle({
        font: {
        color: '#FF0800',
        size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });
    const data = JSON.parse(req.body.data)

    for(let i=0; i<data.length; i++){
        worksheet.cell(i+1,1).string(data[i].CochingId).style(style)
        worksheet.cell(i+1,2).string(data[i].StudentName).style(style)
        worksheet.cell(i+1,3).string(data[i].PhoneNumber).style(style)
        worksheet.cell(i+1,4).string(data[i].Class).style(style)
        worksheet.cell(i+1,5).string(data[i].MonthlyPayment).style(style)
        worksheet.cell(i+1,6).string(data[i].GuardianName).style(style)
        worksheet.cell(i+1,7).string(data[i].GuardianPhoneNumber).style(style)
        worksheet.cell(i+1,5).string(data[i].Relation).style(style)
    }
    var tempfile = require('tempfile');
    var tempFilePath = tempfile('.xlsx');
    console.log("tempFilePath : ", tempFilePath);
    workbook.write(tempFilePath, function(err,result) {
        res.sendFile(tempFilePath, function(err){
            console.log('---------- error downloading file: ', err);
        });
        console.log('file is written');
    });
}

exports.saveExcelTeachersList = function(req,res){
    var workbook = new excel.Workbook()
    var worksheet = workbook.addWorksheet('Sheet 1')

    // Create a reusable style
    var style = workbook.createStyle({
        font: {
        color: '#FF0800',
        size: 12
        },
        numberFormat: '$#,##0.00; ($#,##0.00); -'
    });
    const data = JSON.parse(req.body.data)

    for(let i=0; i<data.length; i++){
        worksheet.cell(i+1,1).string(data[i].CochingId).style(style)
        worksheet.cell(i+1,2).string(data[i].TeacherName).style(style)
        worksheet.cell(i+1,3).string(data[i].PhoneNumber).style(style)
        worksheet.cell(i+1,5).string(data[i].MonthlyPayment).style(style)
        worksheet.cell(i+1,6).string(data[i].Email).style(style)
    }
    var tempfile = require('tempfile');
    var tempFilePath = tempfile('.xlsx');
    console.log("tempFilePath : ", tempFilePath);
    workbook.write(tempFilePath, function(err,result) {
        res.sendFile(tempFilePath, function(err){
            console.log('---------- error downloading file: ', err);
        });
        console.log('file is written');
    });
}
