import React, { useState, useEffect }from "react";
import { useParams } from "react-router-dom";
import useAuthHeader from "react-auth-kit/hooks/useAuthHeader";
import { GetFaq, EditFaq as Edit} from "../../../../controllers/Publications/faqs.controller";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Link } from "react-router-dom";
import { formatDate } from "../../../../services/utils";
import DOMPurify from 'dompurify';


function EditFaq () {

    const { id } = useParams();
    const authHeader = useAuthHeader();
    const [faqEdited, setFaqEdited] = useState()
    const [formState, setFormState] = useState({
        question: '',
        answer: '',
        status: ''
    });

    useEffect(() => {
        const fetchFaq = async () => {
            const faq = await GetFaq(authHeader, +id);

            setFormState({
                question : faq.question, 
                answer: faq.answer,
                status: faq.status.toString()
            });
        };

        fetchFaq();
      }, [authHeader, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormState((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleQuillChange = (content) => {
        const sanitizedContent = DOMPurify.sanitize(content);
        setFormState({
            ...formState,
            text: sanitizedContent
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            let faqEdited = await Edit(authHeader, formState, id);
            setFaqEdited(faqEdited);
        } catch (error) {
            alert(error.message); 
        };

    };

    if (faqEdited) {
        return (
            <div className="SucessMessage">
                <h1>FAQ modifiée avec succès!</h1>
                <p><span>ID :</span> {faqEdited.id}</p>
                <p><span>Question :</span> {faqEdited.question}</p>
                <p><span>Réponse :</span> </p><div dangerouslySetInnerHTML={{ __html: faqEdited.answer }}></div>
                <p><span>Statut :</span> {faqEdited.status ? 'Publié' : 'Non publié'}</p>
                <p><span>Auteur :</span> {faqEdited.userName}</p>
                <p><span>Créé le :</span> {formatDate(faqEdited.createdAt)}</p>
                <Link to='/backoffice/faqs'><button>Retour aux FAQs</button></Link>
            </div>
        );
    };


    return (
        <div>
            <div className="FormContainer">
                <form onSubmit={handleSubmit}>
                    <div className="InputContainer">
                        <label htmlFor="answer"></label>
                        <input name="question" id='question' type="text" defaultValue={formState.question} required onChange={(e) => {handleChange(e)}}/>
                        <label htmlFor="answer"></label>
                        <ReactQuill name="answer" id='answer' type="text" value={formState.answer} required onChange={(e) => {handleQuillChange(e)}}/>
                    </div>
                    <div className="RadioContainer RadioFaq">
                        <div>
                            <input type="radio" name="status" id="true"  checked={formState.status === 'true'} value='true' onChange={(e) => {handleChange(e)}}/>
                            <label htmlFor="">Publié</label>
                        </div>
                        <div>
                            <input type="radio" name="status" checked={formState.status === 'false'} id="false" value='false' onChange={(e) => {handleChange(e)}}/>
                            <label htmlFor="">Non Publié</label>
                        </div>
                    </div>
                    <div className="ValidateFormButtonContainer">
                        <button type="submit" className="ValidateFormButton">Enregistrer</button>
                        <Link to='/backoffice/faqs'><button className="ValidateFormButton">Annuler</button></Link>
                    </div>
                </form>
            </div>
        </div>
    );

};
export default EditFaq
