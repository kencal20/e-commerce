import { useState } from "react";
import FormComponent from "../components/formComponent";
import InputComponent from "../components/inputComponent";
import { componentProps } from "../objects.model";
import SubmitButtonComponent from "../components/submitButtonComponent";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase.config";
import { useNavigate } from "react-router-dom";

type Props = {}

export default function LoginScreen({ }: Props) {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [input, setInput] = useState<Omit<componentProps['userProps'], 'fullName' | 'confirmPassword' | 'phone'>>({
        email: "",
        password: ""
    });
    const [status, setStatus] = useState<componentProps['statusProps']>({
        text: "",
        variant: undefined
    });

    function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = e.target;
        setInput((prevInput) => ({
            ...prevInput,
            [name]: value,
        }));
    }

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setIsLoading(true);
        try {
            const { email, password } = input;

            if (!email || !password) {
                setStatus({ text: "All fields are required.", variant: "danger" });
                setIsLoading(false);
                return;
            }

            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            if (user.emailVerified) {
                setStatus({
                    text: "Login successful! Redirecting...",
                    variant: "success"
                });
                
                setTimeout(() => {
                    navigate("/dashboard");
                }, 1500);
            } else {
                setStatus({
                    text: "Please verify your email before logging in.",
                    variant: "danger"
                });
                setIsLoading(false);
            }

        } catch (error: any) {
            const errorMessage = error.message;
            setStatus({
                text: `Login failed: ${errorMessage}`,
                variant: "danger"
            });
        } finally {
            setIsLoading(false);
        }
    }

    async function handlePasswordReset() {
        if (!input.email) {
            setStatus({ text: "Please enter your email to reset your password.", variant: "danger" });
            return;
        }

        try {
            await sendPasswordResetEmail(auth, input.email);
            setStatus({
                text: "Password reset email sent! Check your inbox.",
                variant: "success"
            });
        } catch (error: any) {
            if (error.code === 'auth/user-not-found') {
                setStatus({
                    text: "Email not registered. Please check and try again.",
                    variant: "danger"
                });
            } else {
                setStatus({
                    text: `Failed to send reset email: ${error.message}`,
                    variant: "danger"
                });
            }
        }
    }

    function togglePasswordVisibility() {
        setShowPassword(prevShowPassword => !prevShowPassword);

    }


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Login to Your Account</h2>

                {status.text && (
                    <div className={`text-center p-2 mb-4 rounded ${status.variant === 'success' ? 'text-green-700 bg-green-100' : 'text-red-700 bg-red-100'}`}>
                        {status.text}
                    </div>
                )}

                <FormComponent onSubmit={handleSubmit} className="max-w-md mx-auto">
                    <InputComponent
                        label="Email"
                        name="email"
                        type="email"
                        value={input.email}
                        onChange={handleInputChange}
                        required={true}
                        className="mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />
                    <InputComponent
                        label="Password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        value={input.password}
                        onChange={handleInputChange}
                        required={true}
                        className="mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                    />

                    <div className="flex items-center mb-4">
                        <input id="default-checkbox" type="checkbox" value=""
                            onClick={togglePasswordVisibility}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label className="ms-2 text-sm font-medium text-gray-900 dark:text-slate-900">Show Password</label>
                    </div>

                    <SubmitButtonComponent isloading={isLoading} />
                </FormComponent>

                <p className="text-center text-gray-500 mt-4">
                    Forgot your password? <button onClick={handlePasswordReset} className="text-blue-600 hover:underline">Reset it here</button>.
                </p>

                <p className="text-center text-gray-500 mt-4">
                    Don't have an account? <button onClick={() => navigate('/signup')} className="text-blue-600 hover:underline">Sign up here</button>.
                </p>
            </div>
        </div>
    );
}
