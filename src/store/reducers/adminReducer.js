import actionTypes from '../actions/actionTypes';
import { toast } from 'react-toastify';
const initialState = {
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    doctors: [],
    detailDoctor: {},
    isLoadingUsers: false,
    emailExist: '',
    scheduleTime: [],
}

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        //Admin
        case actionTypes.FETCH_GENDER_START:
            let copyStateGender = { ...state };
            copyStateGender.isLoading = true;
            return {
                ...copyStateGender,
            }
        case actionTypes.FETCH_GENDER_SUCCESS:
            let copyState = { ...state };
            copyState.genders = action.genders;
            copyState.isLoading = false;
            return {
                ...copyState
            }
        case actionTypes.FETCH_GENDER_FAIL:
            console.log('fetchGenderFail', action);
            let copyStateFail = { ...state };
            copyStateFail.isLoading = false;
            return {
                ...copyStateFail,
            }
        //POSITION

        case actionTypes.FETCH_POSITION_SUCCESS:
            let copyStatePosition = { ...state };
            copyStatePosition.positions = action.positions;
            return {
                ...copyStatePosition
            }
        case actionTypes.FETCH_POSITION_FAIL:
            console.log('fetchPositionFail', action);
            return {
                ...state,
            }
        //ROLE

        case actionTypes.FETCH_ROLE_SUCCESS:
            let copyStateRole = { ...state };
            copyStateRole.roles = action.roles;
            return {
                ...copyStateRole
            }
        case actionTypes.FETCH_ROLE_FAIL:
            console.log('fetchRoleFail', action);
            return {
                ...state,
            }

        //CRUD USER
        //create
        case actionTypes.CREATE_USER_SUCCESS:
            console.log('CREATE USER SUCCESS', action)
            toast.success('Create USER SUCCESS!');
            return {
                ...state
            }
        case actionTypes.CREATE_USER_FAIL:
            toast.error('Create USER FAILED!');
            console.log('CREATE USER FAIL', action)
            return {
                ...state
            }
        //Get all user
        case actionTypes.FETCH_ALL_USER_START:
            state.isLoadingUsers = true;
            return {
                ...state
            }

        case actionTypes.FETCH_ALL_USER_SUCCESS:
            state.isLoadingUsers = false;
            state.users = action.data
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USER_FAIL:
            state.isLoadingUsers = false;
            state.users = [];
            return {
                ...state
            }
        //delete user 
        case actionTypes.DELETE_USER_SUCCESS:
            console.log('DELETE USER SUCCESS', action)
            toast.success('Delete USER SUCCESS!');
            return {
                ...state
            }
        case actionTypes.DELETE_USER_FAIL:
            console.log('DELETE USER FAIL', action)
            toast.error('Delete USER FAILED!');
            return {
                ...state
            }

        //edit user 
        case actionTypes.UPDATE_USER_SUCCESS:
            console.log('UPDATE USER SUCCESS', action)
            toast.success('UPDATE USER SUCCESS!');
            return {
                ...state
            }
        case actionTypes.UPDATE_USER_FAIL:
            console.log('UPDATE USER FAIL', action)
            toast.error('UPDATE USER FAILED!');
            return {
                ...state
            }

        //Doctor
        //get top doctor
        case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
            state.topDoctors = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_TOP_DOCTOR_FAIL:
            console.log('fetchTopDoctorFail', action);
            return {
                ...state,
            }

        //get all doctor
        case actionTypes.FETCH_ALL_DOCTOR_SUCCESS:
            state.doctors = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_DOCTOR_FAIL:
            console.log('fetchTopDoctorFail', action);
            return {
                ...state,
            }

        //save detail doctor
        case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS:
            console.log('SAVE DETAIL DOCTOR SUCCESS', action)
            toast.success('SAVE DETAIL DOCTOR SUCCESS!');
            return {
                ...state
            }
        case actionTypes.SAVE_DETAIL_DOCTOR_FAIL:
            console.log('SAVE DETAIL DOCTOR FAIL', action)
            toast.error('SAVE DETAIL DOCTOR FAIL!');
            return {
                ...state
            }

        //get detail doctor
        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            console.log('GET DETAIL DOCTOR SUCCESS', action)
            state.detailDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.GET_DETAIL_DOCTOR_FAIL:
            console.log('GET DETAIL DOCTOR FAIL', action)
            return {
                ...state
            }

        //update detail doctor
        case actionTypes.UPDATE_INFO_DOCTOR_SUCCESS:
            console.log('UPDATE DETAIL DOCTOR SUCCESS', action)
            toast.success('UPDATE DETAIL DOCTOR SUCCESS!');
            return {
                ...state
            }
        case actionTypes.UPDATE_INFO_DOCTOR_FAIL:
            console.log('UPDATE DETAIL DOCTOR FAIL', action)
            toast.error('UPDATE DETAIL DOCTOR FAIL!');
            return {
                ...state
            }

        //fetch all code hours
        case actionTypes.FETCH_ALLCODE_HOURS_SUCCESS:
            console.log('FETCH ALL CODE HOURS SUCCESS', action)
            state.scheduleTime = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_HOURS_FAIL:
            console.log('FETCH ALL CODE HOURS FAIL', action)
            return {
                ...state
            }

        //save schedule doctor
        case actionTypes.SAVE_SCHEDULE_DOCTOR_SUCCESS:
            console.log('SAVE SCHEDULE DOCTOR SUCCESS', action)
            toast.success('SAVE SCHEDULE DOCTOR SUCCESS!');
            return {
                ...state
            }
        case actionTypes.SAVE_SCHEDULE_DOCTOR_FAIL:
            console.log('SAVE SCHEDULE DOCTOR FAIL', action)
            toast.error('SAVE SCHEDULE DOCTOR FAIL!');
            return {
                ...state
            }

        default:
            return state;
    }
}

export default appReducer;