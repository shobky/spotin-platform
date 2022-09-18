import { useAuth } from "../../contexts/AuthContext";

const UserList = ({ user, index, onChoosingState }) => {


    const { onSelectedUser } = useAuth()

    const selectAuser = () => {
        onSelectedUser(user)
        onChoosingState()
    }

    return (

        <div className="userList_user" >
            <p>{index}-</p>
            <p onClick={selectAuser} className="userList_username">{user.name}</p>
            <p className="userList_userid" id={`${index}user`} onClick={selectAuser}>{user.uid}</p>
        </div>
    )
}

export default UserList