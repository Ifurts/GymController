const { Module } = require("module")
const express = require('express')
const routes = express.Router()
const instructors = require('./instructors')

routes.get('/', function(req, res){
    return res.redirect("/instructors")
})

routes.get('/instructors', function(req, res){
    return res.render("instructors/index")
    
})

routes.get('/instructors/create', function(req, res){
    return res.render("instructors/create")
    
})

routes.post('/instructors/create', instructors.post )

routes.get('/students', function(req, res){
    return res.render("students")
})


module.exports = routes
