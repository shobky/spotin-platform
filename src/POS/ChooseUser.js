import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';

import { db } from '../firebase/Config';
import "../styles/pos/selectuser.css"
import UserList from './UserList';
import { useEffect, useState } from 'react';
import Loading from '../components/loadingAnimaitno/Loading';
import '../components/loadingAnimaitno/loading.css'
const ChooseUser = ({ onChoosingState, showCart }) => {

    const query = collection(db, `user-profile`)
    const [docs, loading] = useCollectionData(query)

    const [searchQuery, setSearchQuery] = useState("#")
    const [username, setUsername] = useState([])

    console.log(docs)

    const userMapping = () => {
        let usernameArr = []
        docs?.map((user) =>
            usernameArr.push({ id: `#${user.uid}`, name: `${user.name}`, photo: user.url })
        )
        if (usernameArr.length === docs?.length) {
            setUsername(usernameArr)

        }
    }
    useEffect(() => {
        userMapping()
    }, )

    const startFiltering = (e) => {
        if (e.target.value.length > 0) {
            setSearchQuery(e.target.value)
        } else {
            setSearchQuery("#")

        }
        console.log(searchQuery)
        filterSearch();
    }

    const filterSearch = () => {
        let filteredUsernameArr = [];
        username.filter(name => name.includes(searchQuery) ?
            filteredUsernameArr.push(name) : ""
        )
        setUsername(filteredUsernameArr)
    }

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className='select-user_container'>
                <p className='select-user_header'>Select a user for this order</p>
                <div className='select-user_input-container'>
                    <input onChange={(e) => startFiltering(e)} className='select-user_input-search' placeholder='search users' type="text" />
                </div>
                <div className='select_user-user-list-container'>
                    {
                        loading ? <div className='select-user_loading'>
                            <Loading />
                        </div> :
                            username?.map((user, index) => (
                                <UserList showCart={showCart} onChoosingState={onChoosingState} index={index + 1} key={index} user={user} />
                            ))
                    }
                </div>
            </div>
        </div>
    )
}

export default ChooseUser