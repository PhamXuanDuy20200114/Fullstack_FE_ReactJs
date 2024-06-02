import actionTypes from './actionTypes';
import { getAllCode, createNewUser, getAllUsers, deleteUserService, updateUserService } from '../../services/userService';
import { getTopDoctor, getAllDoctors, createDetailDoctor, getDetailDoctor, updateDetailDoctor, saveScheduleDoctor } from '../../services/doctorService';

//start doing end


//GENDER
//start
export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })
            let res = await getAllCode('GENDER');
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        }
        catch (e) {
            dispatch(fetchGenderFail());
            console.log('fetch gender start err: ', e);
        }
    }
}
//doing
export const fetchGenderSuccess = (data) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    genders: data
})
//end
export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
})

//POSITION
export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode('POSITION');
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        }
        catch (e) {
            dispatch(fetchPositionFail());
            console.log('fetch Position start err: ', e);
        }
    }
}

export const fetchPositionSuccess = (data) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    positions: data
})

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
})

//ROLE
export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await getAllCode('ROLE');
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        }
        catch (e) {
            dispatch(fetchRoleFail());
            console.log('fetch Role start err: ', e);
        }
    }
}

export const fetchRoleSuccess = (data) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    roles: data
})

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
})


//CRUD USER

//Create user
export const createUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createNewUser(data);
            if (res && res.errCode === 0) {
                dispatch(createUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(createUserFail())
            }
        }
        catch (e) {
            dispatch(createUserFail());
            console.log('fetch create user start err: ', e);
        }
    }
}

export const createUserSuccess = () => ({
    type: actionTypes.CREATE_USER_SUCCESS,
})

export const createUserFail = () => ({
    type: actionTypes.CREATE_USER_FAIL,
})

//GET ALL USERS
export const fetchAllUserStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_ALL_USER_START })
            let res = await getAllUsers('ALL');
            if (res && res.errCode === 0) {
                dispatch(fetchAllUserSuccess(res.data.reverse()));
            } else {
                dispatch(fetchAllUserFail());
            }
        }
        catch (e) {
            dispatch(fetchRoleFail());
            console.log('fetch all user start err: ', e);
        }
    }
}

export const fetchAllUserSuccess = (data) => ({
    type: actionTypes.FETCH_ALL_USER_SUCCESS,
    data
})

export const fetchAllUserFail = () => ({
    type: actionTypes.FETCH_ALL_USER_FAIL
})

//Delete user
export const deleteUserStart = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await deleteUserService(id);
            if (res && res.errCode === 0) {
                dispatch(deleteUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(deleteUserFail())
            }
        }
        catch (e) {
            dispatch(deleteUserFail());
            console.log('fetch create user start err: ', e);
        }
    }
}

export const deleteUserSuccess = () => ({
    type: actionTypes.DELETE_USER_SUCCESS,

})

export const deleteUserFail = () => ({
    type: actionTypes.DELETE_USER_FAIL,

})

//update user
export const updateUserStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateUserService(data);
            if (res && res.errCode === 0) {
                dispatch(updateUserSuccess());
                dispatch(fetchAllUserStart());
            } else {
                dispatch(updateUserFail())
            }
        }
        catch (e) {
            dispatch(updateUserFail());
            console.log('fetch create user start err: ', e);
        }
    }
}

export const updateUserSuccess = () => ({
    type: actionTypes.UPDATE_USER_SUCCESS,

})

export const updateUserFail = () => ({
    type: actionTypes.UPDATE_USER_FAIL,

})

//Doctor

//get top doctor
export const fetchTopDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getTopDoctor('8');
            console.log('fetchTopDoctorStart res: ', res);
            if (res && res.errCode === 0) {
                dispatch(fetchTopDoctorSuccess(res.data));
            } else {
                console.log('fetch doctor start fail: ', res);
                dispatch(fetchTopDoctorFail())
            }
        }
        catch (e) {
            dispatch(fetchTopDoctorFail());
            console.log('fetch doctor start err: ', e);
        }
    }
}

export const fetchTopDoctorSuccess = (doctor) => ({
    type: actionTypes.FETCH_TOP_DOCTOR_SUCCESS,
    data: doctor

})

export const fetchTopDoctorFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTOR_FAIL,
})

//get all doctor
export const fetchAllDoctorStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllDoctors();
            console.log('fetchAllDoctorStart res: ', res);
            if (res && res.errCode === 0) {
                dispatch(fetchAllDoctorSuccess(res.data));
            } else {
                console.log('fetch doctor start fail: ', res);
                dispatch(fetchAllDoctorFail())
            }
        }
        catch (e) {
            dispatch(fetchAllDoctorFail());
            console.log('fetch doctor start err: ', e);
        }
    }
}

export const fetchAllDoctorSuccess = (doctor) => ({
    type: actionTypes.FETCH_ALL_DOCTOR_SUCCESS,
    data: doctor

})

export const fetchAllDoctorFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTOR_FAIL,
})

//save detail doctor
export const saveDetailDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await createDetailDoctor(data);
            if (res && res.errCode === 0) {
                dispatch(saveDetailDoctorSuccess());
                //dispatch(fetchAllDoctorStart());
            } else {
                dispatch(saveDetailDoctorFail())
            }
        }
        catch (e) {
            dispatch(saveDetailDoctorFail());
            console.log('fetch create user start err: ', e);
        }
    }
}

export const saveDetailDoctorSuccess = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS,

})

export const saveDetailDoctorFail = () => ({
    type: actionTypes.SAVE_DETAIL_DOCTOR_FAIL,

})

//get doctor
export const getDetailDoctorById = (id) => {
    return async (dispatch, getState) => {
        try {
            let res = await getDetailDoctor(id);
            if (res && res.errCode === 0) {
                dispatch(getDoctorByIdSuccess(res.data));
            } else {
                dispatch(getDoctorByIdFail())
            }
        }
        catch (e) {
            dispatch(getDoctorByIdFail());
            console.log('fetch create user start err: ', e);
        }
    }
}

export const getDoctorByIdSuccess = (data) => ({
    type: actionTypes.GET_DETAIL_DOCTOR_SUCCESS,
    data
})

export const getDoctorByIdFail = () => ({
    type: actionTypes.GET_DETAIL_DOCTOR_FAIL,

})

//update doctor
export const updateInfoDoctor = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await updateDetailDoctor(data);
            if (res && res.errCode === 0) {
                dispatch(updateInfoDoctorSuccess());
            } else {
                dispatch(updateInfoDoctorFail())
            }
        }
        catch (e) {
            dispatch(updateInfoDoctorFail());
            console.log('fetch create user start err: ', e);
        }
    }
}

export const updateInfoDoctorSuccess = () => ({
    type: actionTypes.UPDATE_INFO_DOCTOR_SUCCESS,
})


export const updateInfoDoctorFail = () => ({
    type: actionTypes.UPDATE_INFO_DOCTOR_FAIL,
})


//fetch all code hours
export const fetchAllCodeHours = () => {
    return async (dispatch, getState) => {
        try {
            let res = await getAllCode('TIME');
            if (res && res.errCode === 0) {
                dispatch(fetchAllCodeHoursSuccess(res.data));
            } else {
                dispatch(fetchAllCodeHoursFail())
            }
        }
        catch (e) {
            dispatch(fetchAllCodeHoursFail());
            console.log('fetch create user start err: ', e);
        }
    }
}

export const fetchAllCodeHoursSuccess = (data) => ({
    type: actionTypes.FETCH_ALLCODE_HOURS_SUCCESS,
    data
})

export const fetchAllCodeHoursFail = () => ({
    type: actionTypes.FETCH_ALLCODE_HOURS_FAIL,
})

//save schedule doctor
export const saveScheduleDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {
            let res = await saveScheduleDoctor(data);
            if (res && res.errCode === 0) {
                dispatch(saveScheduleDoctorSuccess());
            } else {
                dispatch(saveScheduleDoctorFail())
            }
        }
        catch (e) {
            dispatch(saveScheduleDoctorFail());
            console.log('fetch create user start err: ', e);
        }
    }
}

export const saveScheduleDoctorSuccess = () => ({
    type: actionTypes.SAVE_SCHEDULE_DOCTOR_SUCCESS,
})

export const saveScheduleDoctorFail = () => ({
    type: actionTypes.SAVE_SCHEDULE_DOCTOR_FAIL,
})

