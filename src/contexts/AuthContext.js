import React, { useContext, useState, useEffect } from "react"
import { auth, db } from "../firebase/Config"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { doc, setDoc, } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";



const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(false)
    const [orderTaker, setOrderTaker] = useState({})
    const cartId = orderTaker.name


    const signup = async (email, password, name) => {
        await createUserWithEmailAndPassword(auth, email, password)
        return updateProfile(auth.currentUser, {
            displayName: name
        })
    }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    const onSelectedUser = (slectedUser) => {
        setOrderTaker(slectedUser)
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
                name: currentUser.displayName,
                uid: currentUser.email[3] + currentUser.uid[0] + currentUser.uid[15] + currentUser.uid[5] + currentUser.uid[13],
                // url: currentUser.url
            })
        }

    }

    const makeUser = async (name) => {
        await setDoc(doc(db, "user-profile", name), {
            name,
            uid: uuidv4().slice(-5),
            // url: currentUser.url
        })
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
        cartId,
        makeUser
    }

    return (
        <AuthContext.Provider value={value}>
            {loading && children}
        </AuthContext.Provider>
    )
}