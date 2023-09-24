import { onAuthStateChanged } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import { auth } from "../firebase"; 
import PropTypes from "prop-types"; 

export const AuthContext = createContext()

export const AuthContextProvider = ({children})=>{
    const [currentUser, setCurrentUser] = useState({})

    useEffect(()=>{
        const unSub = onAuthStateChanged(auth, (user)=>{
            setCurrentUser(user)
            console.log(user);
        })
        return ()=>{
            unSub()
        }
    },[]);

    return(
        <AuthContext.Provider value={{currentUser}}>
        {children}
    </AuthContext.Provider>
    )
}

AuthContextProvider.propTypes = {
    children: PropTypes.node.isRequired, // Ensure children is a valid node
};