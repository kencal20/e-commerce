import { Request, Response } from 'express';
import {User} from '../../schemas/userSchema'

const updateUser = async (req:Request,res:Response,admin:any) => {
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
    } catch (error:any) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
};
module.exports = updateUser
