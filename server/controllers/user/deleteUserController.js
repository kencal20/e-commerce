const User = require("../../schemas/userSchema");

const deleteUserController = async (req, res, admin) => {
    const { email } = req.params;
    try {
        const deleteUser = await User.findOneAndDelete({ email });

        if (!deleteUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userRecord = await admin.auth().getUserByEmail(email);
        await admin.auth().deleteUser(userRecord.uid);
        res.json({ message: 'User deleted successfully', deleteUser });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

module.exports = deleteUserController