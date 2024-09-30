
const path = require('path');



module.exports = {
    getLogin: (req, res) => {
        console.log('rendereizado desde authcontroller')
        res.render('login');
    },
} 

