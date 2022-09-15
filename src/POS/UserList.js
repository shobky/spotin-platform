import { useAuth } from "../contexts/AuthContext";

const UserList = ({ user, index, onChoosingState, showCart }) => {


    const { onSelectedUser } = useAuth()

    const selectAuser = () => {
        onSelectedUser(user)
        onChoosingState()
        showCart()
    }

    return (
        <div className="userList_user" >
            <p onClick={selectAuser} className="userList_user">{user.name}</p>

            <p className="userList_userid" id={`${index}user`} onClick={selectAuser}>{user.id}</p>
        </div>
    )
}

export default UserList