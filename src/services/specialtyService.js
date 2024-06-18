import axios from '../axios'

const createNewSpecialty = async (specialty) => {
    return await axios.post('/api/create-new-specialty', specialty);
}

export {
    createNewSpecialty
}