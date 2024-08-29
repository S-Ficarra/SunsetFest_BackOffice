# ----- THIS PROJECT IS PART OF A SCHOOL EXAM -----

This repository is the front-end back-office for managing data and users via CRUD operations on the SunsetFest API: https://github.com/S-Ficarra/SunsetFest

The project have been realized using :

- React 18.3.1
- React Router Dom 6.24.0
- React dotenv 0.1.3
- React-google-maps 1.1.0 
- Dompurify 3.1.6
- React Auth Kit 3.1.3
- React JWT 1.2.1
- React Quill 2.0.0


## Installation 

1 - Clone the repository from github

```bash
git clone https://github.com/S-Ficarra/SunsetFest_BackOffice.git
```

2 - Install the dependancies

```bash
npm install
```

3 - Create a .env file in the project root, following this structure : 

```javascript
REACT_APP_GOOGLE_API_KEY: //your_google_api_key
REACT_APP_MAP_ID: //your_google_api_map_id
```

4 - Configure the BASE_URL, that'll be the core of the URL you'll use to fetch from your API. `BASE_URL` is stocked in the file `./src/app.js` and can be changed directly from here : 

```javascript
export const BASE_URL = 'http://localhost:3000/'
```

## Structure

This project have been conceived with a layered architecture:

Datas will follow this path (exept for edit components) : API -> Service -> Controller -> Hook -> Component

`./src/__tests__` Contains all test files.

`./src/assets` Stores images and logos used across the website.

`./src/components` Reusable UI components.

`./src/controllers` Intermediaries between components and services.

`./src/dto` Data Transfer Objects (DTOs) for API communication.

`./src/hooks` Custom hooks, mainly for data fetching.

`./src/mappers` Mappers to convert DTOs into model objects.

`./src/models` Model objects for use within components.

`./src/services` Services that handle API communication.

`./src/views` Page components that combine smaller components.

## Hooks

- Hooks are used to call the controller and fetch the data once the component have been mounted, please see exemple for allBands :

```javascript
import { useState, useEffect } from "react";
import { GetAllBands } from "../controllers/band.controller";

export const useAllBands = (authHeader) => {

    const [allBands, setAllBands] = useState([]);
    
    useEffect(() => {
        const fetchAllBands= async () => {
            try {
                const allBands = await GetAllBands(authHeader);
                setAllBands(allBands);
            } catch (error) {
                console.log(error)
            }
        };
        fetchAllBands();
    }, [authHeader]);

    return { allBands };
}
```

For edit components, the hook is placed directly inside the component to populate the form with the current data. For example:


```javascript
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
```      

## Controllers

Controllers are used to be the interface between the component (the hook) and the service, they call the service and transform the dto received as the useable obect throught the mappers. See below an exemple of the controllers : 

```javascript
import { FaqsService } from "../../services/Publications/faqs.service";
import { FaqsMapper } from "../../mappers/Publications/faqs.mapper";

export const EditFaq = async (authHeader, formData, id) => {

    let { response, data } = await FaqsService.editFaq(authHeader, id, formData);

    if (response.status === 200) {
        return FaqsMapper.transformFaqsDtoToModel(data);
    } else {
        throw new Error(`${data.message} Status code: ${response.status} ${response.statusText}`);
    };
};
```

## Services

Services are responsible for API calls and handling DTO creation. Below is an example of a service for creating a FAQ:

```javascript
    //./src/services/Publications/faqs.service.js
    async createFaq (authHeader, newFaq) {
        
        const response = await fetch (`${BASE_URL}faqs/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newFaq)
        });
        
        const data = await response.json();
        return {response, data};
    },
```

For objects requiring image uploads, data is sent as FormData. Example:

```javascript
    //./src/components/Publications/Informations/addInformations/addInformations.js
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
```

```javascript
    //./src/services/Publications/informations.service.js
    async createInformation (authHeader, newInformation) {
       
        const response = await fetch (`${BASE_URL}informations/create`, {
            method: 'POST',
            headers: {
                'Authorization': authHeader,
            },
            body: newInformation
        });
        
        const data = await response.json();
        return {response, data};
    },
```

## Views

Views files display the `DashboardMenu` on the left side of the page and render different components on the right side depending on the URL. Example:

```javascript
function FaqsPage () {

    return (
        <div className="PageContainer">
            <DashboardMenu />
            <div>
                <Routes>
                    <Route path='/' element={<AllFaqs />} />
                    <Route path='/ajouter' element={<AddFaq />}/>
                    <Route path='/:id/editer' element={<EditFaq />}/>
                </Routes>
            </div>
        </div>
    );

};
```


## Tests

Tests are designed to test controllers, services and components. As code is similar in all thoses objects, one of each have been tested.