import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase.config'; // Import your Firebase auth

export default function useLogout() {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await auth.signOut();
            navigate('/login');
            
        } catch (error) {
            console.error("Error signing out:", error);
        }
    };

    return handleLogout;
}
