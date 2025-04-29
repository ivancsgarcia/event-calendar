import { ChangeEvent, useState } from "react";
import { registerUser } from "../services/auth";
import { Link, useNavigate } from "react-router";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }
        try {
            const userCredentials = await registerUser(email, password);
            const user = await userCredentials.user;
            await setDoc(doc(db, "users", user.uid), {
                username,
                email,
            });
            console.log("User registered successfully");
            navigate("/");
        } catch (error) {
            console.error("Registration failed", error);
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-xl border border-gray-100 bg-white px-8 py-10 shadow-lg"
            >
                <h1 className="mb-8 text-center text-3xl font-semibold tracking-tight text-gray-900">
                    Register
                </h1>
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setUsername(e.target.value);
                        }}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                </div>
                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                </div>

                <div className="mb-5">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                </div>
                <div className="mb-6">
                    <label className="mb-2 block text-sm font-medium text-gray-700">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setConfirmPassword(e.target.value);
                        }}
                        className="w-full rounded-md border border-gray-300 bg-gray-100 p-2 text-gray-900 transition focus:border-blue-500 focus:bg-white focus:outline-none"
                    />
                </div>
                <button className="mb-4 w-full rounded-md bg-blue-600 py-2 font-medium text-white shadow transition hover:bg-blue-700">
                    Create Account
                </button>

                <div className="text-center">
                    <Link
                        to={"/login"}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Already have an account? Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
