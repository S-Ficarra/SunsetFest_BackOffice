import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetBand, EditBand as Edit } from "../../../controllers/band.controller";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';
import { convertToBase64, formatDate } from "../../../services/utils";

export function EditBand () {

    const { id } = useParams();
    const authHeader = useAuthHeader();
    const [bandEdited, setBandEdited] = useState()
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
        bannerImagePreview: '',
        isLoading: true,
    });


    useEffect(() => {
        const fetchBand = async () => {
            const band = await GetBand(authHeader, +id);
            
            /* transfrom ByteArray received from database into file, to allow users to keep the image without uploading a new one*/
            const base64ResponseThumbnail = await fetch(convertToBase64(band.thumbnailImage));
            const arrayBufferThumbnail = await base64ResponseThumbnail.arrayBuffer();
            const thumbnailImageFile = new File([arrayBufferThumbnail], "thumbnail.jpg", { type: "image/jpeg" });
    
            const base64ResponseBanner = await fetch(convertToBase64(band.bannerImage));
            const arrayBufferBanner = await base64ResponseBanner.arrayBuffer();
            const bannerImageFile = new File([arrayBufferBanner], "banner.jpg", { type: "image/jpeg" });

            setFormState({
                name: band.name,
                country: band.country,
                text: band.text,
                facebook: band.facebook,
                instagram: band.instagram,
                twitter: band.twitter,
                youtube: band.youtube,
                spotify: band.spotify,
                website: band.website,
                spotifyIntegration: band.spotifyIntegration,
                youtubeIntegration: band.youtubeIntegration,
                thumbnailImage: thumbnailImageFile,
                thumbnailImagePreview: convertToBase64(band.thumbnailImage),
                bannerImage: bannerImageFile,
                bannerImagePreview: convertToBase64(band.bannerImage),
                isLoading: false
            });
        };

        fetchBand();
    }, [authHeader, id]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;

        if (type === "file") {
            const file = files[0];
            if (file) {
                const imagePreview = URL.createObjectURL(file);
                setFormState(prevState => ({
                    ...prevState,
                    [name]: file,
                    [`${name}Preview`]: imagePreview
                }));
            }
        } else {
            setFormState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    const handleQuillChange = (content) => {
        const sanitizedContent = DOMPurify.sanitize(content);
        setFormState({
            ...formState,
            text: sanitizedContent
        });
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
    
            let bandEdited = await Edit(authHeader, formData, id);
            setBandEdited(bandEdited);
        } catch (error) {
            alert(error.message);
        }
    };

    if (formState.isLoading === true) {
        return (
            <div>Chargement</div>
        )
    }

    if (bandEdited) {
        return (
            <div className="SucessMessage">
                <h1>Actualité créé avec succès!</h1>
                <p><span>ID :</span> {bandEdited.id}</p>
                <p><span>Titre :</span> {bandEdited.name}</p>
                <p><span>Texte :</span> </p><div dangerouslySetInnerHTML={{ __html: bandEdited.text }}></div>
                <p><span>Auteur :</span> {bandEdited.userName}</p>
                <p><span>Créé le :</span> {formatDate(bandEdited.createdAt)}</p>
                <Link to='/backoffice/groupes'><button>Retour aux groupes</button></Link>
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
                        <label htmlFor="name">Nom</label>
                        <input name="name" id='name' type="text" defaultValue={formState.name} required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="country"></label>
                        <input name="country" id='country' type="text" defaultValue={formState.country} required onChange={(e) => {handleChange(e)}}/>
                    </div>

                    <label htmlFor="text"></label>
                    <ReactQuill name="coreText" id='coreText' type="text" value={formState.text} required onChange={(e) => {handleQuillChange(e)}}/>

                    <div className="SocialsFormContainer">
                        <label htmlFor="facebook"></label>
                        <input name="facebook" id='facebook' type="url" defaultValue={formState.facebook} required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="instagram"></label>
                        <input name="instagram" id='instagram' type="url" defaultValue={formState.instagram} required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="twitter"></label>
                        <input name="twitter" id='twitter' type="url" defaultValue={formState.twitter} required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="youtube"></label>
                        <input name="youtube" id='youtube' type="url" defaultValue={formState.youtube} required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="spotify"></label>
                        <input name="spotify" id='spotify' type="url" defaultValue={formState.spotify} required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="website"></label>
                        <input name="website" id='website' type="url" defaultValue={formState.website} required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="spotifyIntegration"></label>
                        <input name="spotifyIntegration" id='spotifyIntegration' type="url" defaultValue={formState.spotifyIntegration} required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="youtubeIntegration"></label>
                        <input name="youtubeIntegration" id='youtubeIntegration' type="url" defaultValue={formState.youtubeIntegration} required onChange={(e) => {handleChange(e)}}/>
                    </div>

                </div>

                <div className="FileLoadContainer">
                    <div className="FileLoadInputContainer">
                        <label htmlFor="thumbnailImage">Choisir la miniature</label>
                        <input type="file" id="thumbnailImage" name="thumbnailImage" onChange={(e) => {handleChange(e)}} accept=".jpg, .jpeg, .png"/>
                    </div>
                    <div className="IMGContainer">
                        <img id="thumbnailImage" name="thumbnailImage" src={formState.thumbnailImage ? formState.thumbnailImagePreview : ''} alt=""/>
                        <p data-image-name="thumbnailImage" onClick={handleResetImage}>X</p>
                    </div>
                </div>

                <div className="FileLoadContainer">
                    <div className="FileLoadInputContainer">
                        <label htmlFor="bannerImage">Choisir la bannière</label>
                        <input type="file" id="bannerImage" name="bannerImage" onChange={(e) => {handleChange(e)}} accept=".jpg, .jpeg, .png"/>
                    </div>
                    <div className="IMGContainer">
                        <img id="bannerImage" name="bannerImage" src={formState.bannerImage ? formState.bannerImagePreview : ''} alt=""/>
                        <p data-image-name="bannerImage" onClick={handleResetImage}>X</p>
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
export default EditBand;