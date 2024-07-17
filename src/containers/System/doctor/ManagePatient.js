import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_ACTIONS } from '../../../utils';
import * as action from '../../../store/actions/adminAction';
import DatePicker from "../../../components/Input/DatePicker";
import Select from 'react-select'
import moment from 'moment';
import { getAllPatients } from '../../../services/doctorService';
import './ManagePatient.scss';
import { toast } from 'react-toastify';
import { get } from 'lodash';
import { postRemedy } from '../../../services/doctorService';
import RemedyModal from './RemedyModal';


class ManagePatient extends Component {


    constructor(props) {
        super(props);
        // const currentDate = new Date();
        // currentDate.setHours(0, 0, 0, 0);
        this.state = {
            currentDate: '',
            listPatient: [],
            isOpenRemedyModal: false,
            dataModal: {}
        }
    }

    async componentDidMount() {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        this.setState({ currentDate: date });
        let dateValue = moment(date).valueOf()
        if (dateValue && this.props.userInfo) {
            let res = await getAllPatients(this.props.userInfo.id, dateValue);
            if (res && res.errCode === 0) {
                this.setState({ listPatient: res.data })
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {


    }

    selectDate = async (currentDate) => {
        console.log(currentDate[0], currentDate[1])
        if (currentDate[1] === currentDate[0]) {
            console.log('check')
            return;
        } else {
            this.setState({ currentDate: currentDate[0] });
            let dateValue = moment(currentDate[0]).valueOf()
            if (dateValue && this.props.userInfo) {
                let res = await getAllPatients(this.props.userInfo.id, dateValue);
                if (res && res.errCode === 0) {
                    this.setState({ listPatient: res.data })
                }
            }
        }

    }

    handleConfirm = (item) => {
        let data = {
            doctorId: item.doctorId,
            patientId: item.patientId,
            email: item.patientBookingData.email,
            timeType: item.timeType,
            patientName: item.patientBookingData.firstName,
        }
        this.setState({ isOpenRemedyModal: true, dataModal: data })
    }

    closeRemedyModal = () => {
        this.setState({ isOpenRemedyModal: false, dataModal: {} })
    }

    sendRemedy = async (dataFromModal) => {
        let dataModal = this.state.dataModal;
        let res = await postRemedy({
            doctorId: dataModal.doctorId,
            patientId: dataModal.patientId,
            email: dataFromModal.email,
            imageBase64: dataFromModal.imageBase64,
            timeType: dataModal.timeType,
            language: this.props.language,
            patientName: dataModal.patientName
        });
        if (res && res.errCode === 0) {
            toast.success('Send remedy success');
        } else {
            toast.error('Send remedy error');
        }
        this.closeRemedyModal();
    }

    render() {
        let { currentDate, listPatient } = this.state;
        let date = new Date();
        let language = this.props.language;
        return (

            <div className='manage-patient-container'>
                <div className='title'><FormattedMessage id='managepatient.manage-patient' /></div>
                <div className='manage-patient-body row'>
                    <div className='col-6 form-group date'>
                        <label><FormattedMessage id='managepatient.choose-date' /></label>
                        <div>
                            <DatePicker
                                onChange={(currentDate) => this.selectDate(currentDate)}
                                className='form-control'
                                value={currentDate} minDate={date.setDate(date.getDate() - 1)} />
                        </div>

                    </div>
                    <div className='list-patient col-12'>
                        <table class="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col"><FormattedMessage id='managepatient.name' /></th>
                                    <th scope="col"><FormattedMessage id='managepatient.phone' /></th>
                                    <th scope="col"><FormattedMessage id='managepatient.examination-time' /></th>
                                    <th scope="col"><FormattedMessage id='managepatient.gender' /></th>
                                    <th scope="col"><FormattedMessage id='managepatient.action' /></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listPatient && listPatient.length > 0 ? listPatient.map((item, index) => {
                                    return (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.patientBookingData && item.patientBookingData.firstName}</td>
                                            <td>{item.patientBookingData && item.patientBookingData.phonenumber}</td>
                                            <td>{item.patientBookingData && language === languages.VI ? item.timeData.valueVi : item.timeData.valueEn}</td>
                                            <td>{item.patientBookingData && language === languages.VI ? item.patientBookingData.genderData.valueVi : item.patientBookingData.genderData.ValueEn}</td>
                                            <td className='action'>
                                                <button className='btn btn-confirm' onClick={() => this.handleConfirm(item)}>
                                                    <FormattedMessage id='managepatient.confirm' />
                                                </button>
                                            </td>
                                        </tr>
                                    )

                                }) :
                                    <tr>
                                        <td colSpan={6}><FormattedMessage id='managepatient.no-data' /></td>
                                    </tr>}
                            </tbody>
                        </table>
                    </div>
                </div>
                <RemedyModal
                    isOpen={this.state.isOpenRemedyModal}
                    closeRemedyModal={() => this.closeRemedyModal()}
                    data={this.state.dataModal}
                    sendRemedy={(dataFromModal) => this.sendRemedy(dataFromModal)}
                />
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        userInfo: state.user.userInfo,
    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
