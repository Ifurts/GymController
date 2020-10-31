const db = require('../../config/db')
const { age, date, graduation } = require('../../lib/utils')
const Intl = require('intl')

module.exports = {
    all(callback) {

            db.query(`
            SELECT instructors.*, count(students) AS total_students
            FROM instructors
            LEFT JOIN students ON (instructors.id = students.instructor_id)
            GROUP BY instructors.id
            ORDER BY total_students DESC`, function(err, results){
            if(err) throw `Database Error! + ${err}` 

            callback(results.rows)
        })
        
    },
    create (data, callback) {
        
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
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education_level,
            data.class_modality,
            data.fit_area,
            date(Date.now()).iso,
        ]


        db.query(query, values, function(err, results){
            if(err) return res.send("Database Error")
            
           callback(results.rows[0])
        })

    },
    find(id, callback) {
        db.query(`
        SELECT *
        FROM instructors 
        WHERE id = $1`, [id], function(err, results){
            if(err) throw `Database Error! + ${err}`
            callback(results.rows[0])
        })
    },
    findBy(filter, callback) {
        db.query(`
        SELECT instructors.*, count(students) AS total_students
        FROM instructors
        LEFT JOIN students ON (instructors.id = students.instructor_id)
        WHERE instructors.name ILIKE '%${filter}%'
        OR instructors.fit_area ILIKE '%${filter}%'
        GROUP BY instructors.id
        ORDER BY total_students DESC`, function(err, results){
            if(err) throw `Database Error! + ${err}` 

            callback(results.rows)
        })
    },
    update(data, callback) {
        const query = `
            UPDATE instructors SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            education_level=($4),
            class_modality=($5),
            fit_area=($6)
            WHERE id = $7
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.education_level,
            data.class_modality,
            data.fit_area,
            data.id 
        ]

        db.query(query, values, function(err, results){
            if(err) throw  `Database Error! + ${err}`

            callback()
        })
    },   
    delete(id, callback) {
        db.query(`DELETE FROM instructors WHERE id = $1`, [id], function(err , results) {
            if(err) throw  `Database Error! + ${err}`

            return callback
        })
    }

}
