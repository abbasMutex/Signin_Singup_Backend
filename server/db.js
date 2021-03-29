const Pool = require('pg').Pool

const pool= new Pool({
    user:"postgres",
    password:"abbas",
    hsot:"localhsot",
    port:5432,
    database:"adminpanel"
});

module.exports = pool;