const userModel = require('../models/user.model');


module.exports.createUser = async ({
    firstname, lastname, email, password
}) => {
    if (!firstname || !email || !password) {    // Check if all fields are provided
        throw new Error('All fields are required');
    }
    const user = userModel.create({
        fullname: {
            firstname,
            lastname
        },
        email,
        password
    })

    return user;
}