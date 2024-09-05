import { useState } from "react";
import FormComponent from "../components/formComponent";
import InputComponent from "../components/inputComponent";
import { componentProps } from "../objects.model";
import { auth } from '../config/firebase.config';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import SubmitButtonComponent from "../components/submitButtonComponent";
import { useNavigate } from "react-router-dom";

type Props = {}

export default function CreateUser({ }: Props) {
    const [input, setInput] = useState<componentProps['userProps']>({
        fullName: '',
        email: "",
        password: "",
        confirmPassword: '',
        phone: ""
    });

    const [users, setUsers] = useState<componentProps['userProps'][]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [status, setStatus] = useState<componentProps['statusProps']>({
        text: "",
        variant: undefined
    })
    const [isloading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setInput((prevInput) => ({ ...prevInput, [name]: value }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setIsLoading(true);
        try {
            const { fullName, email, password, confirmPassword, phone } = input;
            if (!fullName || !email || !password || !confirmPassword) {
                setStatus({ text: 'All fields are required', variant: "danger" });
                return;
            }
            else if (confirmPassword !== password) {
                setStatus({ text: 'Passwords do not match', variant: "danger" });
                return;
            }

            const newUser: componentProps['userProps'] = {
                fullName,
                email,
                password,
                confirmPassword,
                phone
            };

            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                setUsers([...users, newUser]);
                setInput({ fullName: '', email: "", password: '', confirmPassword: '', phone: "" });
                setStatus({ text: "User created successfully", variant: "success" });

                // Send email verification
                await sendEmailVerification(userCredential.user);
                setStatus({ text: "Verification email sent. Please check your inbox.", variant: "success" });

                // Redirect to login page
                navigate('/login');

            } catch (error: any) {
                const errorMessage = error.message;
                setStatus({ text: `Error: ${errorMessage}`, variant: "danger" });
            }

        } catch (error) {
            setStatus({ text: "User creation unsuccessful", variant: "danger" });
        } finally {
            setIsLoading(false);
        }
    }
    
    function togglePasswordVisibility() {
        if (input.password || input.confirmPassword) {
            setShowPassword(prevShowPassword => !prevShowPassword);
        }
    }

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Create a New Account</h2>

                {status.text && (
                    <div className={`flex items-center p-4 mb-4 text-sm rounded-lg ${status.variant === "success"
                        ? "text-green-800 bg-green-50"
                        : "text-red-800 bg-red-50"
                        }`} role="alert">
                        <svg className="flex-shrink-0 w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                        </svg>
                        <span className="ml-3">{status.text}</span>
                        <button type="button" onClick={() => setStatus({ text: "", variant: undefined })} className="ml-auto p-1.5 rounded-lg text-gray-500 hover:bg-gray-200">
                            <svg className="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>
                )}

                <FormComponent onSubmit={handleSubmit}
                    className="max-w-md mx-auto"
                >
                    <InputComponent
                        label="Full Name"
                        name="fullName"
                        type="text"
                        value={input.fullName}
                        onChange={handleInputChange}
                        required={true}
                        className="mb-4"
                    />
                    <InputComponent
                        label="Email"
                        name="email"
                        type="email"
                        value={input.email}
                        onChange={handleInputChange}
                        required={true}
                        className="mb-4"
                    />

                    <div className="relative mb-4">
                        <InputComponent
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            value={input.password}
                            onChange={handleInputChange}
                            required={true}
                            className="pr-10"
                        />
                    
                    </div>

                    <div className="relative mb-6">
                        <InputComponent
                            label="Confirm Password"
                            name="confirmPassword"
                            type={showPassword ? "text" : "password"}
                            value={input.confirmPassword}
                            onChange={handleInputChange}
                            required={true}
                            className="pr-10"
                        />
                    </div>

                    <div className="flex items-center mb-4">
                            <input id="default-checkbox" type="checkbox" value=""
                                onClick={togglePasswordVisibility}
                                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                            <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Show Password</label>
                        </div>

                    <SubmitButtonComponent isloading={isloading} />
                </FormComponent>
                <p className="text-center text-gray-500 mt-4">
                   Already have an account? <button onClick={()=>navigate('/login')} className="text-blue-600 hover:underline">Login here</button>.
                </p>
            </div>
        </div>
    );
}
