import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection } from 'firebase/firestore';

import { db } from '../../firebase/Config';
import "../../styles/pos/selectuser.css"
import UserList from './UserList';
import Loading from '../../components/loadingAnimaitno/Loading';
import '../../components/loadingAnimaitno/loading.css'
const ChooseUser = ({ onChoosingState }) => {

    const query = collection(db, `user-profile`)
    const [docs, loading] = useCollectionData(query)

    return (
        <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div className='select-user_container'>
                <p className='select-user_header'>Select a user for this order</p>
                <div className='select_user-user-list-container'>
                    {
                        loading ? <div className='select-user_loading'>
                            <Loading />
                        </div> :

                            <div>
                                <div className='user-list-header'>
                                    <strong><p>index</p></strong>
                                    <strong><p>name</p></strong>
                                    <strong><p>id</p></strong>

                                </div>
                                {docs?.map((user, index) => (
                                    <UserList onChoosingState={onChoosingState} key={index} index={index + 1} user={user} />
                                ))}
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default ChooseUser