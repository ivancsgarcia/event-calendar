import { ChangeEvent, FormEvent, useState } from "react";
import { loginUser } from "../services/auth";
import { useNavigate, Link } from "react-router";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await loginUser(email, password);
            console.log("User logged in successfully");
            navigate("/");
        } catch (error) {
            console.error("Login failed", error);
        }
    };
    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded-xl border border-gray-100 bg-white px-8 py-10 shadow-lg"
            >
                <h1 className="mb-8 text-center text-3xl font-semibold tracking-tight text-gray-900">
                    Login
                </h1>
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
                <div className="mb-6">
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

                <button className="mb-4 w-full rounded-md bg-blue-600 py-2 font-medium text-white shadow transition hover:bg-blue-700">
                    Login
                </button>

                <div className="text-center">
                    <Link
                        to={"/register"}
                        className="text-sm text-blue-600 hover:underline"
                    >
                        Create an account
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
