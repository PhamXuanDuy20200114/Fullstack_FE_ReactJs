import ProfileDoctor from '../../containers/Patient/Doctor/ProfileDoctor';
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

    emailExist: '',
    scheduleTime: [],
    doctorsScheduleTime: [],

    prices: [],
    provinces: [],
    payments: [],

    extraInfoDoctor: {},

    profileDoctor: {},
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
            toast.success('Create USER SUCCESS!');
            return {
                ...state
            }
        case actionTypes.CREATE_USER_FAIL:
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
            toast.success('Delete USER SUCCESS!');
            return {
                ...state
            }
        case actionTypes.DELETE_USER_FAIL:
            toast.error('Delete USER FAILED!');
            return {
                ...state
            }

        //edit user 
        case actionTypes.UPDATE_USER_SUCCESS:
            toast.success('UPDATE USER SUCCESS!');
            return {
                ...state
            }
        case actionTypes.UPDATE_USER_FAIL:
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
            return {
                ...state,
            }

        //save detail doctor
        case actionTypes.SAVE_DETAIL_DOCTOR_SUCCESS:
            toast.success('SAVE DETAIL DOCTOR SUCCESS!');
            return {
                ...state
            }
        case actionTypes.SAVE_DETAIL_DOCTOR_FAIL:
            toast.error('SAVE DETAIL DOCTOR FAIL!');
            return {
                ...state
            }

        //get detail doctor
        case actionTypes.GET_DETAIL_DOCTOR_SUCCESS:
            state.detailDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.GET_DETAIL_DOCTOR_FAIL:
            return {
                ...state
            }

        //update detail doctor
        case actionTypes.UPDATE_INFO_DOCTOR_SUCCESS:
            toast.success('UPDATE DETAIL DOCTOR SUCCESS!');
            return {
                ...state
            }
        case actionTypes.UPDATE_INFO_DOCTOR_FAIL:
            toast.error('UPDATE DETAIL DOCTOR FAIL!');
            return {
                ...state
            }

        //fetch all code hours
        case actionTypes.FETCH_ALLCODE_HOURS_SUCCESS:
            state.scheduleTime = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALLCODE_HOURS_FAIL:
            return {
                ...state
            }

        //save schedule doctor
        case actionTypes.SAVE_SCHEDULE_DOCTOR_SUCCESS:
            toast.success('SAVE SCHEDULE DOCTOR SUCCESS!');
            return {
                ...state
            }
        case actionTypes.SAVE_SCHEDULE_DOCTOR_FAIL:
            toast.error('SAVE SCHEDULE DOCTOR FAIL!');
            return {
                ...state
            }

        //fetch schedule doctor
        case actionTypes.FETCH_SCHEDULE_DOCTOR_SUCCESS:
            state.doctorsScheduleTime = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_SCHEDULE_DOCTOR_FAIL:
            return {
                ...state
            }

        //fetch all price
        case actionTypes.FETCH_ALL_PRICE_SUCCESS:
            state.prices = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PRICE_FAIL:
            return {
                ...state
            }

        //fetch all province
        case actionTypes.FETCH_ALL_PROVINCE_SUCCESS:
            state.provinces = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PROVINCE_FAIL:
            return {
                ...state
            }

        //fetch all payment
        case actionTypes.FETCH_ALL_PAYMENT_SUCCESS:
            state.payments = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_ALL_PAYMENT_FAIL:
            return {
                ...state
            }

        //fetch extra info doctor
        case actionTypes.FETCH_EXTRA_INFO_DOCTOR_SUCCESS:
            state.extraInfoDoctor = action.data;
            return {
                ...state
            }

        case actionTypes.FETCH_EXTRA_INFO_DOCTOR_FAIL:
            return {
                ...state
            }

        //fetch profile doctor
        case actionTypes.FETCH_PROFILE_DOCTOR_SUCCESS:
            state.profileDoctor = action.data;
            return {
                ...state
            }
        case actionTypes.FETCH_PROFILE_DOCTOR_FAIL:
            return {
                ...state
            }
        default:
            return state;
    }
}

export default appReducer;