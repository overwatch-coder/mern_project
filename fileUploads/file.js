// const multer = require('multer');

// // set up multer storage options;
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, 'uploads')
//     },
//     fileName: (req, file, cb) => {
//         const fileName = `${file.originalname}-${new Date()}`;
//         cb(null, fileName)
//     }
// })

// // declaring where to store the uploaded file
// const upload = multer({storage: storage, limits: {fileSize: 1000000, files: 1}});

// module.exports = upload;