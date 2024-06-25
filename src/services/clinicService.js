import axios from '../axios'

const createNewClinic = async (clinic) => {
    return await axios.post('/api/create-new-clinic', clinic);
}

const getAllClinic = async () => {
    return await axios.get('/api/get-all-clinics');
}

const getClinicById = async (id) => {
    return await axios.get(`/api/get-detail-clinic?id=${id}`);
}

export {
    createNewClinic,
    getAllClinic,
    getClinicById
}