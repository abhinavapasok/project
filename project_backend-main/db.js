const { Pool } = require('pg')
// const pool=new Pool({
//     user:"postgres",
//     password:"op[]",
//     // host:"ec2-44-196-223-128.compute-1.amazonaws.com",
//     host:"localhost",
//     port:5432,
//     database:"miniproject",

// })
const pool=new Pool({
    user:"postgres",
    password:"postgres_password",
    // host:"ec2-44-196-223-128.compute-1.amazonaws.com",
    host:"postgres",
    port:5432,
    database:"postgres",

})
// const pool=new Pool({
//     user:"postgres",
//     password:'11092002',
//     host:"db-instance-2.chcgweg4mpls.ap-southeast-2.rds.amazonaws.com",
//     port:5432,
//     database:"miniproject",
//     ssl:{
//         rejectUnauthorized:false
//     }
// })

const users=[
    {
        username: "user",
        password: "1234",
        roles:["admin", "staff advisor", "hod", "warden", "hosteloffice", "sergeant"]
    }
]

module.exports = {pool, users}