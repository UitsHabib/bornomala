const express = require('express')
const router = express.Router()
const userController = require('./controllers/userController')
const dataController = require('./controllers/dataController')

router.get('/', userController.home)
router.get('/login', userController.loginpage)
router.post('/login', userController.login)
router.get('/logout', userController.logout)
router.get('/about', userController.about)
router.get('/service', userController.service)
router.get('/gallery', userController.gallery)
router.get('/event', userController.event)
router.get('/contact', userController.contact)
router.post('/update-password', userController.updatePassword)


router.get('/add-student', dataController.addStudent)
router.post('/add-student', dataController.enteringStudent)
router.get('/add-teacher', dataController.addteacher)
router.post('/add-teacher', dataController.enteringTeacher)
router.get('/add-payment', dataController.addPayment)
router.post('/add-payment', dataController.enteringPayment)
router.get('/admin-update-password', dataController.adminUpdatePassword)


//getting data
router.get('/teacher-list', dataController.getTeacher)
router.get('/student-list', dataController.getStudent)
router.get('/teacher-info/:id', dataController.teacherInfo)
router.get('/student-info/:id', dataController.studentInfo)
router.get('/paid-student', dataController.getPaidStudent)
router.get('/payable-student', dataController.getPayableStudent)
router.get('/paid-teacher', dataController.getPaidTeacher)
router.get('/payable-teacher', dataController.getPayableTeacher)
router.get('/student-delete/:id', dataController.deleteStudent)
router.get('/teacher-delete/:id', dataController.deleteTeacher)

router.post('/choose', dataController.chooseClass)
router.post('/choose-paid-students', dataController.choosePaidStudents)
router.post('/choose-paid-teachers', dataController.choosePaidTeachers)

router.post('/choose-unpaid-students', dataController.chooseUnPaidStudents)
router.post('/choose-unpaid-teachers', dataController.chooseUnPaidTeachers)

router.post('/upload-profile-picture', userController.uploadPhoto)
router.post('/upload-teacher-profile-picture', userController.uploadTeacherPhoto)
router.post('/show-payment-history', dataController.showPayement)
// -----------------saving all files in Excel-------------------
router.post('/save_excel_paid_students', dataController.saveExcelPaidStudents) 
router.post('/save_excel_unpaid_students', dataController.saveExcelUnPaidStudents)
router.post('/save_excel_paid_teachers', dataController.saveExcelPaidTeachers) 
router.post('/save_excel_unpaid_teachers', dataController.saveExcelUnPaidTeachers) 
router.post('/save_excel_students_list', dataController.saveExcelStudentsList) 
router.post('/save_excel_teachers_list', dataController.saveExcelTeachersList)

module.exports = router
