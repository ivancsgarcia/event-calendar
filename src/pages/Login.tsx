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
        <div className="flex min-h-screen items-center justify-center">
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-sm rounded border px-8 pt-8 pb-4 shadow-md"
            >
                <h1 className="mb-6 text-center text-2xl font-bold uppercase">
                    Login
                </h1>
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
                <div className="mb-6">
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

                <button className="mb-6 w-full cursor-pointer rounded border p-2">
                    Login
                </button>

                <Link
                    to={"/register"}
                    className="block text-center hover:underline"
                >
                    Register
                </Link>
            </form>
        </div>
    );
};

export default Login;
