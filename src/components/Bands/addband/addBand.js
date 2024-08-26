import React, {useState} from "react";
import './addBand.css'
import DOMPurify from 'dompurify';
import ReactQuill from 'react-quill';
import { Link } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';
import { formatDate } from "../../../services/utils";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CreateBand } from "../../../controllers/band.controller";


function AddBand () {

    const authHeader = useAuthHeader();
    const [bandCreated, setBandCreated] = useState()

    const [formState, setFormState] = useState({
        name: '',
        country: '',
        text: '',
        facebook: '',
        instagram: '',
        twitter: '',
        youtube: '',
        spotify: '',
        website: '',
        spotifyIntegration: '',
        youtubeIntegration: '',
        thumbnailImage: null,
        thumbnailImagePreview: '',
        bannerImage: null,
        bannerImagePreview: ''
    });

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
                    [name]: file,
                    [`${name}Preview`]: imagePreview
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

    const handleResetForm = () => {
        setBandCreated(null);
    };

    const handleResetImage = (e) => {
        const imageName = e.target.getAttribute('data-image-name');
        setFormState({
            ...formState,
            [imageName]: null,
            [`${imageName}Preview`]: ''
        });
        document.querySelector(`input[name="${imageName}"]`).value = '';
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const formData = new FormData();
            formData.append("name", formState.name);
            formData.append("country", formState.country);
            formData.append("text", formState.text);
            formData.append("facebook", formState.facebook);
            formData.append("instagram", formState.instagram);
            formData.append("twitter", formState.twitter);
            formData.append("youtube", formState.youtube);
            formData.append("spotify", formState.spotify);
            formData.append("website", formState.website);
            formData.append("spotifyIntegration", formState.spotifyIntegration);
            formData.append("youtubeIntegration", formState.youtubeIntegration);
            formData.append("thumbnailImage", formState.thumbnailImage);
            formData.append("bannerImage", formState.bannerImage);
    
            let bandCreated = await CreateBand(authHeader, formData);
            setBandCreated(bandCreated);
        } catch (error) {
            alert(error.message);
        }
    };

    if (bandCreated) {
        return (
            <div className="SucessMessage">
                <h1>Groupe créé avec succès!</h1>
                <p><span>ID :</span> {bandCreated.id}</p>
                <p><span>Nom :</span> {bandCreated.name}</p>
                <p><span>Texte :</span> </p><div dangerouslySetInnerHTML={{ __html: bandCreated.text }}></div>
                <p><span>Auteur :</span> {bandCreated.userName}</p>
                <p><span>Créé le :</span> {formatDate(bandCreated.createdAt)}</p>
                <Link to='/backoffice/groupes'><button>Retour aux groupes</button></Link>
                <button onClick={handleResetForm}>Ajouter un nouveau groupe</button>
            </div>
        );
    };

    return (
        <div>
        <h1 className="MainTitle">Ajouter un groupe</h1>
        <div className="FormContainer">
            <form onSubmit={handleSubmit}>
                <div className="InputContainer">
                    <div className="TopFormContainer">
                        <label htmlFor="name"></label>
                        <input name="name" id='name' type="text" placeholder="Nom" required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="country"></label>
                        <input name="country" id='country' type="text" placeholder="Pays" required onChange={(e) => {handleChange(e)}}/>
                    </div>
                    <label htmlFor="text"></label>
                    <ReactQuill className="quill" name="text" id='text' type="text" placeholder="Texte" required onChange={(e) => {handleQuillChange(e)}}/>
                    <div className="SocialsFormContainer">
                        <label htmlFor="facebook"></label>
                        <input name="facebook" id='facebook' type="url" placeholder="Facebook" required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="instagram"></label>
                        <input name="instagram" id='instagram' type="url" placeholder="Instagram" required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="twitter"></label>
                        <input name="twitter" id='twitter' type="url" placeholder="Twitter" required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="youtube"></label>
                        <input name="youtube" id='youtube' type="url" placeholder="Youtube" required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="spotify"></label>
                        <input name="spotify" id='spotify' type="url" placeholder="Spotify" required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="website"></label>
                        <input name="website" id='website' type="url" placeholder="Site" required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="spotifyIntegration"></label>
                        <input name="spotifyIntegration" id='spotifyIntegration' type="url" placeholder="Integration Spotify" required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="youtubeIntegration"></label>
                        <input name="youtubeIntegration" id='youtubeIntegration' type="url" placeholder="Integration Youtube" required onChange={(e) => {handleChange(e)}}/>
                    </div>
                </div>
                <div className="FileLoadContainer">
                    <div className="FileLoadInputContainer">
                        <label htmlFor="thumbnailImage">Choisir la miniature (500Ko max)</label>
                        <input type="file" id="thumbnailImage" name="thumbnailImage" onChange={(e) => {handleChange(e)}} required accept=".jpg, .jpeg, .png"/>
                    </div>
                    <div className="IMGContainer">
                        <img id="thumbnailImage" name="thumbnailImage" src={formState.thumbnailImage ? formState.thumbnailImagePreview : ''} alt=""/>
                        <p data-image-name="thumbnailImage" onClick={handleResetImage} >X</p>
                    </div>
                </div>
                <div className="FileLoadContainer">
                    <div className="FileLoadInputContainer">
                        <label htmlFor="bannerImage">Choisir la bannière (500Ko max)</label>
                        <input type="file" id="bannerImage" name="bannerImage" onChange={(e) => {handleChange(e)}} required accept=".jpg, .jpeg, .png"/>
                    </div>
                    <div className="IMGContainer">
                        <img id="bannerImage" name="bannerImage" src={formState.bannerImage ? formState.bannerImagePreview : ''} alt=""/>
                        <p onClick={handleResetImage} htmlFor="">X</p>
                    </div>
                </div>
                <div className="ValidateFormButtonContainer">
                    <button type="submit" className="ValidateFormButton">Enregistrer</button>
                    <Link to='/backoffice/groupes'><button className="ValidateFormButton">Annuler</button></Link>
                </div>
            </form>
        </div>
    </div>
    );

};
export default AddBand;