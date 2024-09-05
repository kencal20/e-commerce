const User = require("../../schemas/userSchema");

const createUserController = async (req, res, admin) => {
    const { name, email, password, address, phone, role } = req.body;
    try {
        const firebaseUser = await admin.auth().createUser({ email, password });

        const user = new User({
            name,
            email,
            address,
            phone,
            role,
            firebaseUid: firebaseUser.uid,
        });
        const newUser = await user.save();
        res.json({ message: 'New User Created', newUser });
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
};

module.exports = createUserController