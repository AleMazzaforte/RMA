const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination:  (req, file, cb) => {
        cb(null, 'public/img')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname)
    }
});

// Filtrar solo imágenes
const fileFilter = (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
        cb(null, true);
    } else {
        cb(new Error('No se permiten archivos que no sean imágenes'), false);
    }
};


const uploadFile = multer({storage: storage, fileFilter: fileFilter});

module.exports = uploadFile;
