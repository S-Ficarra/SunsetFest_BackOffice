import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetInformation, EditInformation as Edit } from "../../../../controllers/Publications/informations.controller";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import { formatDate } from "../../../../services/utils";
import DOMPurify from 'dompurify';
import { BASE_URL } from "../../../../App";


function EditInformation () {

    const { id } = useParams();
    const authHeader = useAuthHeader();
    const [informationEdited, setInformationEdited] = useState()
    const [formState, setFormState] = useState({
        title: '',
        text: '',
        status: '',
        image: '',
        imagePreview: '',
        isLoading: true,
    });

    useEffect(() => {
        const fetchInformation = async () => {
            const information = await GetInformation(authHeader, +id);

            /* Transform URL from the server into a File */
            const urlToFile = async (url, filename, mimeType) => {
                const response = await fetch(url);
                const blob = await response.blob();
                return new File([blob], filename, { type: mimeType });
            };

            const imageFile = await urlToFile(information.image, "image.jpg", "image/jpeg");

            setFormState({
                title: information.title,
                text: information.text,
                status: information.status.toString(),
                image: imageFile,
                imagePreview: `${BASE_URL}${information.image}`,
                isLoading: false
            });
        };

        fetchInformation();
      }, [authHeader, id]);


    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            if (file) {

                const maxSizeInKB = 500;
                const maxSizeInBytes = maxSizeInKB * 1024;
    
                if (file.size > maxSizeInBytes) {
                    alert(`Le fichier dépasse la taille maximale autorisée de ${maxSizeInKB} Ko.`);
                    e.target.value = '';
                    return;
                }
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
        const sanitizedContent = DOMPurify.sanitize(content);
        setFormState({
            ...formState,
            text: sanitizedContent
        });
    };

    const handleResetImage = () => {
        setFormState({
            ...formState,
            image: ''
        });
        document.querySelector('input[type="file"]').value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const formData = new FormData();
            formData.append("title", formState.title);
            formData.append("text", formState.text);
            formData.append("status", formState.status);
            formData.append("image", formState.image);
 
            let informationEdited = await Edit(authHeader, formData, id);
            setInformationEdited(informationEdited);
        } catch (error) {
            alert(error.message); 
        };
    };

    if (formState.isLoading === true) {
        return (
            <div>Chargement</div>
        )
        
    }

    if (informationEdited) {
        return (
            <div className="SucessMessage">
                <h1>Information modifiée avec succès!</h1>
                <p><span>ID :</span> {informationEdited.id}</p>
                <p><span>Titre :</span> {informationEdited.title}</p>
                <p><span>Texte :</span> </p><div dangerouslySetInnerHTML={{ __html: informationEdited.text }}></div>
                <p><span>Statut :</span> {informationEdited.status ? 'Publié' : 'Non publié'}</p>
                <p><span>Auteur :</span> {informationEdited.userName}</p>
                <p><span>Créé le :</span> {formatDate(informationEdited.createdAt)}</p>
                <Link to='/backoffice/informations'><button>Retour aux informations</button></Link>
            </div>
        );
    };

    return (
        <div>
            <div className="FormContainer">
                <form onSubmit={handleSubmit}>
                    <div className="InputContainer">
                        <label htmlFor="title"></label>
                        <input name="title" id='title' type="text" placeholder="Titre" defaultValue={formState.title} required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="text"></label>
                        <ReactQuill name="coreText" id='coreText' type="text" value={formState.text} placeholder="Texte" required onChange={(e) => {handleQuillChange(e)}}/>
                    </div>
                    <div className="FileLoadContainer">
                        <div>
                            <label>Choisir l'illustration (500Ko max)</label>
                            <input type="file" onChange={(e) => {handleChange(e)}} accept=".jpg, .jpeg, .png"/>
                        </div>
                        <div className="IMGContainer">
                            <img id="image" name="image" src={formState.image ? formState.imagePreview : ''} alt=""/>
                            <p onClick={handleResetImage} htmlFor="">X</p>
                        </div>
                    </div>
                    <div className="RadioContainer RadioFaq">
                        <div>
                            <input type="radio" name="status" id="true" checked={formState.status === 'true'} value={true} onChange={(e) => {handleChange(e)}}/>
                            <label htmlFor="">Publié</label>
                        </div>
                        <div>
                            <input type="radio" name="status" checked={formState.status === 'false'} id="false" value={false} onChange={(e) => {handleChange(e)}}/>
                            <label htmlFor="">Non Publié</label>
                        </div>
                    </div>
                    <div className="ValidateFormButtonContainer">
                        <button type="submit" className="ValidateFormButton">Enregistrer</button>
                        <Link to='/backoffice/informations'><button className="ValidateFormButton">Annuler</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default EditInformation;