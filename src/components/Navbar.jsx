import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { useContext } from "react";
import {AuthContext} from '../context/AuthContext'

export default function Navbar() {
  const {currentUser} = useContext(AuthContext)
  return (
    <main className="navbar">
      <span className="logo">Horizon</span>
      <section className="user flex items-center space-x-3">
        <img
          src="https://images.unsplash.com/photo-1629196753813-8b4827ddc7c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80"
          alt="img"
          className="userImg"
        />
        <span>{currentUser.displayName}</span>
        <button onClick={()=>signOut(auth)} className="logOut">Log Out</button>
      </section>
    </main>
  )
}
