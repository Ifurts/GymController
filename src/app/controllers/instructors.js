const { age, date, graduation } = require('../../lib/utils')
const Intl = require('intl')
const db = require('../../config/db')

module.exports = {
    index(req, res){
        return res.render("instructors/index") 

    },
    create(req, res){
        return res.render("instructors/create") 

    },
    post(req, res){

        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please fulfill all fields')}
        }
            
        const query = `
            INSERT INTO instructors (
                avatar_url,
                name,
                birth,
                education_level,
                class_modality,
                fit_area,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        const values = [
            req.body.avatar_url,
            req.body.name,
            date(req.body.birth).iso,
            req.body.education_level,
            req.body.class_modality,
            req.body.fit_area,
            date(Date.now()).iso,
        ]


        db.query(query, values, function(err, results){
            if(err) return res.send("Database Error")
            
            return res.redirect(`/instructors/${results.rows[0].id}`)
        })

    },
    show(req, res){
        return

    },
    edit(req, res){
        return
    },
    put(req, res){

        const keys = Object.keys(req.body)
        
        for (key of keys) {
            if (req.body[key] == "") {
                return res.send('Please fulfill all fields')}
        }

        return
    },
    delete(req, res){
        return
    },
}
