export const translator = (message) => {

    const translations = {
        "Email already exist": "Cette adresse e-mail est déjà utilisé",
        "Please log to access this ressource" : "Veuillez vous connecter pour accéder à cette page"
    };

    return translations[message] || "Une erreur s'est produite";
};

export const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
};

export function convertToBase64 (byteArray) {
    const binary = byteArray.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return `data:image/jpeg;base64,${btoa(binary)}`;
  };