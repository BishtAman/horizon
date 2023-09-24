
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, storage, db } from "../firebase";
import { useState } from "react";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
    const [err, setErr] = useState(null); // Initialize err as null
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const storageRef = ref(storage, displayName);
            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
                (error) => {
                    setErr(error); // Set the error in the state
                    console.log(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    });
                }
            );
        } catch (error) {
            setErr(error); // Set the error in the state
            console.error("Error:", error.message);
        }
    }

    return (
        <main className="bg-[#8DDFCB] flex h-[100vh] justify-center items-center">
            <section className="border-2  bg-white flex flex-col items-center text-slate-600 shadow-box rounded-lg  py-10 w-[40%] max-lg:w-[80%]">
                <h1 className="text-center  font-bold text-[2.5rem] " >Horizon</h1>
                <p className="text-[15px] my-3">Register</p>

                <form method="" action="/" onSubmit={handleSubmit} className="my-7 flex flex-col items-center  w-[80%]">
                <input type="text" placeholder="display name" className="w-full outline-none border-b-2 p-4" /><br />
                    <input type="email" placeholder="email" className="w-full outline-none border-b-2 p-4" /><br />
                    <input type="password" placeholder="password" className="w-full outline-none border-b-2 p-4" /><br />
                    <input type="file" style={{ display: "none" }} id="file" />
                    <label htmlFor="file" className="flex items-center space-x-2 cursor-pointer">
                        <img src="https://img.icons8.com/fluency/48/image.png" className="h-[30px] w-[30px]" alt="image" />
                        <span>Add an avatar</span>
                    </label>
                    <input type="submit" value="Sign Up" className="cursor-pointer mt-[28px] border-2 w-full bg-[#2dcba4] rounded-[4px] h-[44px] text-white" />
                    {err && <span style={{ color: "red" }}>{err.message}</span>}
                </form>
                <p className="text-[15px]">
                    You do have an account? <Link to="/login" className="text-blue-700 underline">Login</Link>
                </p>
            </section>
        </main>
    )
}

