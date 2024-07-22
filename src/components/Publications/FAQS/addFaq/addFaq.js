import React, { useState }from "react";
import './addFaq.css'
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { CreateFaq } from "../../../../controllers/faqs.controller";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import { formatDate } from "../../../../services/utils";


function AddFaq () {

    const authHeader = useAuthHeader();
    
    const [faqCreated, setFaqCreated] = useState()

    const [formState, setFormState] = useState({
        question: '',
        answer: '',
        status: 'false'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState({
            ...formState,
            [name]: value
        });
    };

    const handleQuillChange = (content) => {
        setFormState({
            ...formState,
            answer: content
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let faqCreated = await CreateFaq(authHeader, formState);
            setFaqCreated(faqCreated);
        } catch (error) {
            alert(error.message); 
        };

    };

    const handleResetForm = () => {
        setFaqCreated(null);
    };

    if (faqCreated) {
        return (
            <div className="SucessMessage">
                <h1>FAQ créé avec succès!</h1>
                <p><span>ID :</span> {faqCreated.id}</p>
                <p><span>Question :</span> {faqCreated.question}</p>
                <p><span>Réponse :</span> </p><div dangerouslySetInnerHTML={{ __html: faqCreated.answer }}></div>
                <p><span>Statut :</span> {faqCreated.status ? 'Publié' : 'Non publié'}</p>
                <p><span>Auteur :</span> {faqCreated.userName}</p>
                <p><span>Créé le :</span> {formatDate(faqCreated.createdAt)}</p>
                <Link to='/backoffice/faqs'><button>Retour aux FAQs</button></Link>
                <button onClick={handleResetForm}>Ajouter une nouvelle FAQ</button>
            </div>
        );
    };

    return (
        <div>
            <h1 className="MainTitle">Ajouter une FAQ</h1>
            <div className="FormContainer">
                <form onSubmit={handleSubmit}>
                    <div className="InputContainerAddFaq">
                        <label htmlFor="answer"></label>
                        <input name="question" id='question' type="text" placeholder="Indiquez la question" required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="answer"></label>
                        <ReactQuill name="answer" id='answer' type="text" placeholder="Indiquez la réponse" required onChange={(e) => {handleQuillChange(e)}}/>
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
export default AddFaq;