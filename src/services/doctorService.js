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
export {
    getTopDoctor,
    getAllDoctors,
    createDetailDoctor,
    getDetailDoctor,
    updateDetailDoctor,
    saveScheduleDoctor,
    getScheduleDoctorByDate
}