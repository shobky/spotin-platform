import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase/Config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from "firebase/firestore";


const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {


    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(false)

    const signup = (email, password) => {
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(true)


        })
        return unsubscribe

    }, [])

    const getUserInfo = async (itemName, itemPrice) => {
        if (currentUser) {
            await setDoc(doc(db, "user-profile", currentUser.email), {
                email: currentUser.email,
                name: "Ahned shobky",
                orders: {
                    lastorder: {
                        name: itemName,
                        price: itemPrice
                    }
                }
            })
        }
    }

    const value = {
        signup,
        login,
        currentUser,
        logout,
        getUserInfo
    }

    return (
        <AuthContext.Provider value={value}>
            {loading && children}
        </AuthContext.Provider>
    )
}