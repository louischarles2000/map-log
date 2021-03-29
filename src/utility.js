export const objectUpdate = (prevObject, currObject) => ({...prevObject, ...currObject});

export const arrayUpdate = (prevArray, currArray) => ([...prevArray, ...currArray]);

export const initFormData = {
    title: '',
    description: '',
    comments: '',
    image: '',
    rating: 1,
    latitude: 0,
    longitude: 0,
    zoom: 2.5,
    visitDate: ''
}

export const initViewport = {
    width: '100vw',
    height: '100vh',
    latitude: 4.175184,
    longitude: 19.508201,
    zoom: 2.5
}