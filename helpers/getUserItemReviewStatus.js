module.exports = async(data,res) => {
    let reviewStatus;

    // Getting the current user with the request email
    let user = await Users.findOne({
        where: {
            'email': data.email
        },
        include: [
            {model: Roles, attributes: ['name_en']}
        ],
    });

    // Checking if user exist
    if (!user) res.status(500).json('user_not_found');
    else {

        // Grabbing current user role
        let currentUser = user.toJSON();
        let roles = currentUser.roles[0];
        if (!roles || roles.length === 0) res.status(500).json('no_roles_for_user');
        else {

            // Deciding the image status according to user role
            let role = roles['name_en'].toLowerCase();
            let status = role === 'admin' ? 'accepted' : 'pending';

            // Getting status id
            reviewStatus = await ReviewStatuses.findOne({
                where: {name_en: status},
                attributes: ['id']
            });
        }
    }
    return reviewStatus['id'];
};