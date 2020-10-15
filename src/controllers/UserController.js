const User = require('../models/User');
const UserValidator = require('../validation/User/UserValidation');

const createNewUser = async (req,res) => {
    const validate = UserValidator.createUserValidator(req.body);
    if(validate.error)
    {
        return res.status(400).send(validate.error.details[0].message);
    }
    try
    {
        const userName = req.body.username;
        let isUserExist = await User.findOne({username: userName});
        if(isUserExist)
        {
            return res.send(`Username ${userName} already taken`);
        }
        else
        {
            const newUser = new User({
                username: userName
            });
            try{
                const createdUser = await newUser.save();
                const response = {username: createdUser.username, _id: createdUser._id.toString()};
                return res.json(response);
            }
            catch(err)
            {
                console.error(err);
                return res.status(400).send(`Server Error!`);
            }
        }
    }
    catch(err)
    {
        console.error(err);
        return res.status(400).send(`Server Error!`);
    }
}

const getAllUsers = async (req,res) => {
    try
    {
        let users = await User.find();
        let response = [];
        for(let i=0;i<users.length;i++)
        {
            response.push({username: users[i].username, _id: users[i]._id});
        }
        return res.json(response);
    }
    catch(err)
    {
        console.error(err);
        return res.status(400).send(`Server Error!`);
    }
}


const findUserById = async(uId) =>{
    const existedUser = await User.findById({_id: uId});
    return existedUser;
}

module.exports = {
    createNewUser,
    findUserById,
    getAllUsers
};