import React, {useState} from "react";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CreateNews } from "../../../../controllers/news.controller";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import { formatDate } from "../../../../services/utils";



function AddNews () {

    const authHeader = useAuthHeader();
    const [newsCreated, setNewsCreated] = useState()

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
        setNewsCreated(null);
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
 
            let newsCreated = await CreateNews(authHeader, formData);
            setNewsCreated(newsCreated);
        } catch (error) {
            alert(error.message); 
        };

    };

    if (newsCreated) {
        return (
            <div className="SucessMessage">
                <h1>Actualité créé avec succès!</h1>
                <p><span>ID :</span> {newsCreated.id}</p>
                <p><span>Titre :</span> {newsCreated.title}</p>
                <p><span>Texte :</span> </p><div dangerouslySetInnerHTML={{ __html: newsCreated.text }}></div>
                <p><span>Statut :</span> {newsCreated.status ? 'Publié' : 'Non publié'}</p>
                <p><span>Auteur :</span> {newsCreated.userName}</p>
                <p><span>Créé le :</span> {formatDate(newsCreated.createdAt)}</p>
                <Link to='/backoffice/actualites'><button>Retour aux actualités</button></Link>
                <button onClick={handleResetForm}>Ajouter une nouvelle actualité</button>
            </div>
        );
    };

    return (
        <div>
            <h1 className="MainTitle">Ajouter une actualité</h1>
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
                    </div>
                </form>
            </div>
        </div>
    );

};
export default AddNews;