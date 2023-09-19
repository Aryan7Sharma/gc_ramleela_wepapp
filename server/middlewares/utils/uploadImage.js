const multer = require('multer');
const { env } = process;

const pathArray = __dirname.split('/');
pathArray.pop();
pathArray.pop();// Remove the last two element from the array
const profileImgFolder = pathArray.join('/') + "/public/Images/UsersProfileImage/";
// Define storage for uploaded images
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Set the destination folder where you want to save the images
        cb(null, profileImgFolder);
    },
    filename: function (req, file, cb) {
        // Define the file name for the uploaded image (you can customize this as needed)
        cb(null, Date.now() + '-' + file.originalname);
    }
});

// Create the multer instance
const upload = multer({ storage: storage });

// Middleware function to handle file upload
const uploadImage = (req, res, next) => { 
    upload.single('image')(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            // A Multer error occurred (e.g., file too large)
            return res.status(400).json({ status: env.s400, msg: 'File upload error' });
        } else if (err) {
            // An unknown error occurred
            return res.status(500).json({ status: env.s500, msg: 'Server error' });
        }

        // if (!req.file) {
        //     return res.status(400).json({ status: env.s400, msg: 'No image uploaded' });
        // }

        // If you reach here, the image has been successfully saved
        //res.status(200).json({ status: env.s200, msg: 'Image uploaded successfully' });
        next();
    });
}

module.exports = uploadImage;
