import axios from '../axios'
const getTopDoctor = async (limit) => {
    return await axios.get(`/api/top-doctor-home?limit=${limit}`)
}
const getAllDoctors = async () => {
    return await axios.get('/api/get-all-doctors');
}

const createDetailDoctor = async (data) => {
    return await axios.post('/api/save-info-doctor', data);
}

const getDetailDoctor = async (id) => {
    return await axios.get(`/api/get-info-doctor/?id=${id}`);
}

const updateDetailDoctor = async (data) => {
    return await axios.put('/api/update-info-doctor', data);
}

const saveScheduleDoctor = async (data) => {
    return await axios.post('/api/bulk-create-schedule', data);
}

const getScheduleDoctorByDate = async (doctorId, date) => {
    return await axios.get(`/api/get-schedule-doctor-by-date?doctorId=${doctorId}&date=${date}`);
}

const getExtraInfoDoctor = async (id) => {
    return await axios.get(`/api/get-extra-info-doctor-by-id?id=${id}`);
}
const getProfileDoctorById = async (doctorId) => {
    return await axios.get(`/api/get-profile-doctor-by-id?id=${doctorId}`);
}

const getDoctorBySpecialty = async (id, location) => {
    return await axios.get(`/api/get-doctor-by-specialty?id=${id}&location=${location}`);
}
export {
    getTopDoctor,
    getAllDoctors,
    createDetailDoctor,
    getDetailDoctor,
    updateDetailDoctor,
    saveScheduleDoctor,
    getScheduleDoctorByDate,
    getExtraInfoDoctor,
    getProfileDoctorById,
    getDoctorBySpecialty
}