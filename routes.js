const { Module } = require("module")
const express = require('express')
const routes = express.Router()
const instructors = require('./controllers/instructors')
const students = require('./controllers/students')

routes.get('/', function(req, res){
    return res.redirect("/instructors")
})

// Routes instructors

routes.get('/instructors', instructors.index)
routes.get('/instructors/create', instructors.create)
routes.get('/instructors/:id', instructors.show)
routes.get('/instructors/:id/edit', instructors.edit)
routes.post('/instructors/create', instructors.post )
routes.put("/instructors", instructors.put)
routes.delete("/instructors", instructors.delete)

// Routes students

routes.get('/students', students.index)
routes.get('/students/create', students.create)
routes.get('/students/:id', students.show)
routes.get('/students/:id/edit', students.edit)
routes.post('/students/create', students.post )
routes.put("/students", students.put)
routes.delete("/students", students.delete)



module.exports = routes
