const User = require('../models/User');

const createNewUser = async (req,res) => {
    let userName = req.body.username;
    if(userName)
    {
        try
        {
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
    else
    {
        return res.send(`Pass some vaid username`);
    }
}

const findUserById = async(uId) =>{
    const existedUser = await User.findById({_id: uId});
    return existedUser;
}

module.exports = {
    createNewUser,
    findUserById
};