const User = require('../../schemas/userSchema')

const getUsersController = async (req, res) => {
    const users = await User.find();
    res.json({ message: 'Hello all users', users });
};

const getUserByEmailController = async (req, res) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        res.json({ message: 'The user you are searching for is ', user });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};
module.exports={
    getUsersController,
    getUserByEmailController
}