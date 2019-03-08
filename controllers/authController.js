require('../constants/sequelize');

/**
 * Registers a user in the database
 * @param req
 * @param res
 * @returns {Promise<*>}
 */
exports.register = async (req, res) => {
    let data = req.body;
    let lang = data.lang;

    uploadProfileImg(req, res, async (err) => {

        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        }

        // Getting multer errors if any
        else if (err) res.status(423).json(err);

        // If file validation passed, heading to the request data validation
        else {

            // Getting validation result from express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array()[0]);
            }

            // Saving the original password of user and hashing it to save in db
            let originalPass = data.password;
            data.password = bcrypt.hashSync(originalPass, 10);

            // Getting the translations of user first and last names
            let firstName = await translateHelper(data['first_name_' + lang], lang, 'first_name');
            let lastName = await translateHelper(data['last_name_' + lang], lang, 'last_name');

            // Getting active status id and appending it to user request data
            let status = await UsersStatuses.findOne({name_en: 'active', attributes: ['id']});
            data.status_id = status.toJSON()['id'];

            // Merging translated names & descriptions with the request object
            let merged = {...data, ...firstName, ...lastName};

            await Users.create(merged);

            // Saving the original password again to request for authenticating the user at once
            data.password = originalPass;
            req.body = data;

            this.login(req, res);
        }


    })


};

/**
 * Authenticates the user
 * @param {*} req
 * @param {*} res
 */
exports.login = async (req, res) => {

    // Getting validation result from express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json(errors.array()[0]);
    }

    // Getting request data and setting user fields to return
    let data = req.body;
    let email = data.email.trim();
    let lang = data.lang;
    let attributes = [`first_name_${lang}`, `last_name_${lang}`, 'email', 'profile_img', 'password', 'id', 'status_id'];

    // Active status selecting
    let statusWhere = sequelize.where(sequelize.col('`users_status`.`name_en`'), 'active');

    // Selecting an employee that has an email matching request one
    let user = await Users.findOne({
        attributes: attributes,
        include: [
            {model: UsersStatuses, attributes: ['name_en','id'],where:{statusWhere}},
            {model: Roles, attributes: ['name_en','id']},
        ],
        where: {email: email}
    }, res);


    if (!res.headersSent) {

        // User is not active
        if (!user) res.status(500).json({name: 'you_are_inactive_error'});

        else {
            // Cloning users object without password and saving user full name
            let {password, ...details} = user.toJSON();
            let full_name = user[`first_name_${lang}`] + ' ' + user[`last_name_${lang}`];


            res.status(200).json({
                token: jwt.sign(details, 'secretkey', {expiresIn: '8h'}), user_id: user.id, full_name: full_name
            })
        }


    }


};


/**
 * Updates profile info
 * @param req
 * @param res
 * @returns {Promise<void>}
 */
exports.updateProfile = async (req, res) => {

    let data = req.body;
    let lang = data.lang;

    uploadProfileImg(req, res, async (err) => {
        // Gets file type validation error
        if (req.fileTypeError) {
            res.status(423).json(req.fileTypeError);
        }

        // Getting multer errors if any
        else if (err) res.status(423).json(err);

        // If file validation passed, heading to the request data validation
        else {
            // Getting validation result from express-validator
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).json(errors.array()[0]);
            }


            // Cloning user object without id and language to build update fields
            let {id, lang, ...fields} = data;

            let result = await to(Users.update(fields, {where: {id: data.id}}), res);
            res.json(result)
        }
    })


}