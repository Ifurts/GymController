const { age, date, graduation } = require('../../lib/utils')
const Intl = require('intl')
const Student = require('../models/Student')
const db = require('../../config/db')

module.exports = {
    index(req, res){

        Student.all(function(students){
            return res.render("students/index", {students})

        })

        
    },
    create(req, res){

        Student.instructorsSelectOptions(function(options) {

            return res.render("students/create", {instructorOptions: options}) 
        })


        

    },
    post(req, res){

        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please fulfill all fields')}
        }

        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })


    },
    show(req, res){
        Student.find(req.params.id, function(student){
            if (!student) return res.send("Student not found!")

            student.birth = date(student.birth).birthDay
    

            return res.render("students/show", { student })

        })

    },
    edit(req, res){

        Student.find(req.params.id, function(student){
            if (!student) return res.send("Student not found!")

            student.birth = date(student.birth).iso
            
            Student.instructorsSelectOptions(function(options) {

                return res.render("students/edit", {student, instructorOptions: options}) 
            })
    

        })
    },
    put(req, res){

        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please fulfill all fields')}
        }

        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })
    },
    delete(req, res){
        Student.delete(req.body.id, function(){
            return res.redirect(`/students`)
        }) 
    },
    instructorsSelectOptions(callback) {
        db.query(`SELECT name, id FROM instructors`, function(err, results){
            if(err) throw `Database Error! + ${err}`

            callback(results.rows)
        })
    }
}
