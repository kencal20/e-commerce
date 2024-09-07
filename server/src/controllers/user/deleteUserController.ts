import { Request, Response } from 'express';
import {User} from '../../schemas/userSchema'

const deleteUserController = async (req: Request, res: Response, admin:any) => {
    const { email } = req.params;
    try {
        const deleteUser = await User.findOneAndDelete({ email });

        if (!deleteUser) {
            return res.status(404).json({ error: 'User not found' });
        }

        const userRecord = await admin.auth().getUserByEmail(email);
        await admin.auth().deleteUser(userRecord.uid);
        res.json({ message: 'User deleted successfully', deleteUser });
    } catch (error:any) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
};

module.exports = deleteUserController