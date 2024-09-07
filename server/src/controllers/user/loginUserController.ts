import { Request, Response } from 'express';
import { User } from '../../schemas/userSchema'

module.exports = async function loginController(req: Request, res: Response, admin: any) {
  const { idToken } = req.body;

  try {
    // Verify the ID token using Firebase Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const email = decodedToken.email;

    // Find the user in your database by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User logged in successfully", user });
  } catch (error: any) {
    res
      .status(401)
      .json({ message: "Authentication failed", error: error.message });
  }
};
