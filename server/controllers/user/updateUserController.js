const User = require("../../schemas/userSchema");

const updateUser = async (req, res, admin) => {
    const { email } = req.params;
    const { name, password, address, phone, role } = req.body;
    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { name, address, phone, role },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (password) {
            const userRecord = await admin.auth().getUserByEmail(email);
            const uid = userRecord.uid;
            await admin.auth().updateUser(uid, { password });
        }

        res.json({ message: 'User has been updated', updatedUser });
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};
module.exports=updateUser
