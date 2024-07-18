import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetAllUser, GetUser } from "../../controllers/user.controller";
import { decodeToken } from "react-jwt";
import './users.css'
import Pen from '../../assets/pen-solid.svg'
import Trash from '../../assets/trash-solid.svg'
import { DeleteUser } from "../../controllers/user.controller";


function Users () {

    const authHeader = useAuthHeader()
    const { users } = GetAllUser(authHeader)
    const userId = decodeToken(authHeader)
    const { user: currentUser } = GetUser(authHeader, userId.sub)

    const handleDelete = async (e, userId) => {
        e.preventDefault();
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?");

        if (confirmation) {
            const response = await DeleteUser(authHeader, userId);
            if (response.response.status === 200) {
                window.location.reload();
            }
        } else {
            window.location.reload();
        }
    };

    
    return (
        <div className="MainContainer">
            <h1>VOTRE ÉQUIPE</h1>
            <div className="UsersHeader">
                <div className="TitleContainer">
                    <h2 id="Name">Nom</h2>
                    <h2>Adresse Email</h2>
                    <h2>Rôle</h2>
                </div>
            </div>
            <div className="AllUsersContainer">
                {users.map((user) => (
                    <div className="UserContainer" key={user.id}>
                        <p>{user.id}</p>
                        <p>{user.fullName}</p>
                        <p>{user.email}</p>
                        <p>{user.role}</p>
                        {currentUser.role === 'Administrateur' && (
                            <div className="ActionContainer">
                                <button>
                                    <div className="EditContainer">
                                        <img src={Pen} alt="Modifier un utilisateur" />
                                        <p>Modifier</p>
                                    </div>
                                </button>
                                <button onClick={(e) => handleDelete(e, user.id)}>
                                    <div className="DeleteContainer">
                                        <img src={Trash} alt="Supprimer un utilisateur" />
                                        <p>Supprimer</p>
                                    </div>
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Users;