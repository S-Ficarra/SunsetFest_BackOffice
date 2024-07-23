import React, {useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetNews, EditNews as Edit } from "../../../../controllers/news.controller";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import { convertToBase64, formatDate } from "../../../../services/utils";

function EditNews () {
    
    const { id } = useParams();
    const authHeader = useAuthHeader();
    const [newsEdited, setNewsEdited] = useState();
    const [formState, setFormState] = useState({
        title: '',
        text: '',
        status: '',
        image: '',
        imagePreview: '',
        isLoading: true,
    });

    useEffect(() => {
        const fetchNews = async () => {
            const news = await GetNews(authHeader, +id);
            
            /* transfrom ByteArray received from database into file, to allow users to keep the image without uploading one*/
            const base64Response = await fetch(`${convertToBase64(news.image)}`);
            const arrayBuffer = await base64Response.arrayBuffer();
            const imageFile = new File([arrayBuffer], "image.jpg", { type: "image/jpeg" });

            setFormState({
                title: news.title,
                text: news.text,
                status: news.status.toString(),
                image: imageFile,
                imagePreview: convertToBase64(news.image),
                isLoading: false
            });
        };

        fetchNews();
      }, [authHeader, id]);

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
 
            let newsEdited = await Edit(authHeader, formData, id);
            setNewsEdited(newsEdited);
        } catch (error) {
            alert(error.message); 
        };
    };

    if (formState.isLoading === true) {
        return (
            <div>Chargement</div>
        )
        
    }

    if (newsEdited) {
        return (
            <div className="SucessMessage">
                <h1>Actualité modifiée avec succès!</h1>
                <p><span>ID :</span> {newsEdited.id}</p>
                <p><span>Titre :</span> {newsEdited.title}</p>
                <p><span>Texte :</span> </p><div dangerouslySetInnerHTML={{ __html: newsEdited.text }}></div>
                <p><span>Statut :</span> {newsEdited.status ? 'Publié' : 'Non publié'}</p>
                <p><span>Auteur :</span> {newsEdited.userName}</p>
                <p><span>Créé le :</span> {formatDate(newsEdited.createdAt)}</p>
                <Link to='/backoffice/actualites'><button>Retour aux actualités</button></Link>
            </div>
        );
    };



    return (
        <div>
            <div className="FormContainer">
                <form onSubmit={handleSubmit}>
                    <div className="InputContainerAddFaq">
                        <label htmlFor="title"></label>
                        <input name="title" id='title' type="text" placeholder="Titre" defaultValue={formState.title} required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="text"></label>
                        <ReactQuill name="coreText" id='coreText' type="text" value={formState.text} placeholder="Texte" required onChange={(e) => {handleQuillChange(e)}}/>
                    </div>
                    <div className="FileLoadContainer">
                        <div>
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
                    <div className="ButtonContainerAddFaq">
                        <button type="submit">Enregistrer</button>
                    </div>
                </form>
            </div>
        </div>
    );

};
export default EditNews;