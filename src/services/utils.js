export const translator = (message) => {

    const translations = {
        "Email already exist": "Cette adresse e-mail est déjà utilisé",
        "Please log to access this ressource" : "Veuillez vous connecter pour accéder à cette page"
    };

    return translations[message] || "Une erreur s'est produite";
};