import axios from '../axios'

const createNewSpecialty = async (specialty) => {
    return await axios.post('/api/create-new-specialty', specialty);
}
const getAllSpecialties = async () => {
    return await axios.get('/api/get-all-specialties');
}

const getSpecialtyById = async (id) => {
    return await axios.get(`/api/get-detail-specialty?id=${id}`);

}
export {
    createNewSpecialty,
    getAllSpecialties,
    getSpecialtyById
}