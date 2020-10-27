const db = require('../../config/db')
const { age, date, graduation } = require('../../lib/utils')
const Intl = require('intl')

module.exports = {
    all(callback) {

            db.query(`SELECT * FROM students`, function(err, results){
            if(err) throw `Database Error! + ${err}` 


            callback(results.rows)
        })
        
    },
    create (data, callback) {
        
        const query = `
            INSERT INTO students (
                avatar_url,
                name,
                birth,
                education_level,
                class_perweek,
                email
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education_level,
            data.class_perweek,
            data.email,
        ]


        db.query(query, values, function(err, results){
            if(err) return res.send("Database Error")
            
           callback(results.rows[0])
        })

    },

    find(id, callback) {
        db.query(`
        SELECT *
        FROM students 
        WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! + ${err}`
            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE students SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            education_level=($4),
            class_perweek=($5),
            email=($6)
            WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education_level,
            data.class_perweek,
            data.email,
            data.id 
        ]

        db.query(query, values, function(err, results){
            if(err) throw  `Database Error! + ${err}`

            callback()
        })
    },
    
    delete(id, callback) {
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err , results) {
            if(err) throw  `Database Error! + ${err}`

            return callback
        })
    }
}