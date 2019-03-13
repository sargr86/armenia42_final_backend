module.exports = (req,res,multerError)=>{
    // Gets file type validation error
    if (req.fileTypeError) {
        res.status(423).json(req.fileTypeError);
        return true;
    }

    else if(req.fileExistsError){
        res.status(424).json(req.fileExistsError);
        return true;
    }

    // Getting multer errors if any
    else if (multerError) {
        res.status(423).json(multerError);
        return true;
    }

    // If file validation passed, heading to the request data validation
    else {
        // Getting validation result from express-validator
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.status(422).json(errors.array()[0]);
            return true;
        }
    }

    return false;
};