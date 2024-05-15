import axios from '../axios'
const getTopDoctor = async (limit) => {
    return await axios.get(`/api/top-doctor-home?limit=${limit}`)
}
export {
    getTopDoctor
}