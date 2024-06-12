import axios from "../axios"

const handleLogin = (email, password) => {
    return axios.post('/api/login', { email, password })
}

const getAllUsers = (inputId) => {
    return axios.get(`/api/get-all-users?id=${inputId}`)
}
const createNewUser = (data) => {
    return axios.post('/api/create-new-user', data)
}

const deleteUserService = async (userId) => {
    return await axios.delete(`/api/delete-user?id=${userId}`)
}

const updateUserService = async (inputData) => {
    return await axios.put('/api/edit-user', inputData)
}
const getAllCode = async (inputType) => {
    return await axios.get(`/api/allcode?type=${inputType}`)
}


export {
    handleLogin,
    getAllUsers,
    createNewUser,
    updateUserService,
    deleteUserService,
    getAllCode,
}
