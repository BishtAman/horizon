import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate, Link} from "react-router-dom";
import { auth } from "../firebase";

export default function Login() {
    const [err, setErr] = useState(null); // Initialize err as null
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const email = e.target[0].value;
        const password = e.target[1].value;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/");
        } catch (error) {
            setErr(error); // Set the error in the state
            console.error("Error:", error.message);
        }
    };

    return (
        <main className="bg-[#8DDFCB] flex h-[100vh] justify-center items-center">
            <section className="border-2  bg-white flex flex-col items-center text-slate-600 shadow-box rounded-lg  py-10 w-[30%] max-lg:w-[60%]">
                <h1 className="text-center  font-bold text-[2.5rem] ">Horizon</h1>
                <p className="text-[15px] my-3">Login</p>

                <form onSubmit={handleSubmit} className="my-7 flex flex-col items-center  w-[80%]">
                    <input type="email" placeholder="email" className="w-full outline-none border-b-2 p-4" /><br />
                    <input type="password" placeholder="password" className="w-full outline-none border-b-2 p-4" /><br />

                    <input type="submit" value="Sign In" className="cursor-pointer mt-[28px] border-2 w-full bg-[#2dcba4] rounded-[4px] h-[44px] text-white" />
                    
                    {/* Display the error message */}
                    {err && <span style={{ color: "red" }}>{err.message}</span>}
                </form>
                <p className="text-[15px]">
                    You don't have an account? <Link to="/register" className="text-blue-700 underline">Register</Link>
                </p>
            </section>
        </main>
    );
}
