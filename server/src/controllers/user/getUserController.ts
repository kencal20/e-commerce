import { Request, Response } from 'express';
import {User} from '../../schemas/userSchema'

const getUsersController = async (req:Request, res:Response) => {
    const users = await User.find();
    res.json({ message: 'Hello all users', users });
};

const getUserByEmailController = async (req:Request, res:Response) => {
    const { email } = req.params;
    try {
        const user = await User.findOne({ email });
        res.json({ message: 'The user you are searching for is ', user });
    } catch (error:any) {
        res.status(500).send({ error: error.message });
    }
};
module.exports={
    getUsersController,
    getUserByEmailController
}