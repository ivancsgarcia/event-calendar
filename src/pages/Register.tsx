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
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded border px-8 pt-8 pb-4 shadow-md"
            >
                <h1 className="mb-6 text-center text-2xl font-bold uppercase">
                    Register
                </h1>
                <div className="mb-4">
                    <label htmlFor="" className="mb-1 block">
                        Username
                    </label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setUsername(e.target.value);
                        }}
                        className="w-full rounded border p-2"
                    />
                </div>
                <div className="mb-4">
                    <label htmlFor="" className="mb-1 block">
                        Email
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value);
                        }}
                        className="w-full rounded border p-2"
                    />
                </div>

                <div className="mb-4">
                    <label htmlFor="" className="mb-1 block">
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value);
                        }}
                        className="w-full rounded border p-2"
                    />
                </div>
                <div className="mb-6">
                    <label htmlFor="" className="mb-1 block">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                            setConfirmPassword(e.target.value);
                        }}
                        className="w-full rounded border p-2"
                    />
                </div>
                <button className="mb-6 w-full cursor-pointer rounded border p-2">
                    Create Account
                </button>

                <Link
                    to={"/login"}
                    className="block text-center hover:underline"
                >
                    Login
                </Link>
            </form>
        </div>
    );
};

export default Register;
