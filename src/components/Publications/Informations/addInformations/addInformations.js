import React, {useState} from "react";
import './addInformations.css'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CreateInformation } from "../../../../controllers/informations.controller";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import { formatDate } from "../../../../services/utils";

function AddInformation () {

    const authHeader = useAuthHeader();

    const [informationCreated, setInformationCreated] = useState()

    const [formState, setFormState] = useState({
        title: '',
        text: '',
        status: 'false',
        image: null,
        imagePreview: ''
    });

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            if (file) {
                const imagePreview = URL.createObjectURL(file);
                setFormState({
                    ...formState,
                    image: file,
                    imagePreview
                });
            }
        } else {
            setFormState({
                ...formState,
                [name]: value
            });
        }
    };

    const handleQuillChange = (content) => {
        setFormState({
            ...formState,
            text: content
        });
    };

    const handleResetForm = () => {
        setInformationCreated(null);
    };

    const handleResetImage = () => {
        setFormState({
            ...formState,
            image: ''
        });
        document.querySelector('input[type="file"]').value = '';
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", formState.title);
            formData.append("text", formState.text);
            formData.append("status", formState.status);
            formData.append("image", formState.image);
 
            let informationCreated = await CreateInformation(authHeader, formData);
            setInformationCreated(informationCreated);
        } catch (error) {
            alert(error.message); 
        };

    };


    if (informationCreated) {
        return (
            <div className="SucessMessage">
                <h1>Information créé avec succès!</h1>
                <p><span>ID :</span> {informationCreated.id}</p>
                <p><span>Titre :</span> {informationCreated.title}</p>
                <p><span>Texte :</span> </p><div dangerouslySetInnerHTML={{ __html: informationCreated.text }}></div>
                <p><span>Statut :</span> {informationCreated.status ? 'Publié' : 'Non publié'}</p>
                <p><span>Auteur :</span> {informationCreated.userName}</p>
                <p><span>Créé le :</span> {formatDate(informationCreated.createdAt)}</p>
                <Link to='/backoffice/informations'><button>Retour aux informations</button></Link>
                <button onClick={handleResetForm}>Ajouter une nouvelle information</button>
            </div>
        );
    };

    return (
        <div>
            <h1 className="MainTitle">Ajouter une information</h1>
            <div className="FormContainer">
                <form onSubmit={handleSubmit}>
                    <div className="InputContainerAddFaq">
                        <label htmlFor="title"></label>
                        <input name="title" id='title' type="text" placeholder="Titre" required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="text"></label>
                        <ReactQuill name="coreText" id='coreText' type="text" placeholder="Texte" required onChange={(e) => {handleQuillChange(e)}}/>
                    </div>
                    <div className="FileLoadContainer">
                        <div>
                            <input type="file" onChange={(e) => {handleChange(e)}} required accept=".jpg, .jpeg, .png"/>
                        </div>
                        <div className="IMGContainer">
                            <img id="image" name="image" src={formState.image ? formState.imagePreview : ''} alt=""/>
                            <p onClick={handleResetImage} htmlFor="">X</p>
                        </div>
                    </div>
                    <div className="RadioContainer RadioFaq">
                        <div>
                            <input type="radio" name="status" id="true" value={true} onChange={(e) => {handleChange(e)}}/>
                            <label htmlFor="">Publié</label>
                        </div>
                        <div>
                            <input type="radio" name="status" defaultChecked id="false" value={false} onChange={(e) => {handleChange(e)}}/>
                            <label htmlFor="">Non Publié</label>
                        </div>
                    </div>
                    <div className="ButtonContainerAddFaq">
                        <button type="submit">Enregistrer</button>
                        <Link to='/backoffice/informations'><button>Annuler</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );


};
export default AddInformation;