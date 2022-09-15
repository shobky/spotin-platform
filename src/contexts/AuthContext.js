import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase/Config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, } from "firebase/firestore";




const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(false)
    const [orderTaker, setOrderTaker] = useState({ name: "Anonymys" })
    const cartId = orderTaker.name


    const signup = (email, password, name) => {
        updateProfile(auth.currentUser, {
            displayName: name
        })
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const onSelectedUser = (slectedUser) => {
        setOrderTaker(slectedUser)
        console.log(orderTaker)
    }


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(true)

        })

        return unsubscribe

    }, [])
    const getUserInfo = async () => {
        if (currentUser) {
            await setDoc(doc(db, "user-profile", currentUser.email), {
                email: currentUser.email,
                name: "Ahned shobky",
                uid: currentUser.email[3] + currentUser.uid[0] + currentUser.uid[15] + currentUser.uid[5] + currentUser.uid[13],
                // url: currentUser.url
            })
        }

    }
    useEffect(() => {
        getUserInfo()
    })

    const value = {
        signup,
        login,
        currentUser,
        logout,
        getUserInfo,
        onSelectedUser,
        orderTaker,
        cartId
    }

    return (
        <AuthContext.Provider value={value}>
            {loading && children}
        </AuthContext.Provider>
    )
}