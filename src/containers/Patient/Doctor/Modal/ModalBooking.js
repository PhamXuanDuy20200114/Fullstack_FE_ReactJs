import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import * as action from '../../../../store/actions';
import DatePicker from "../../../../components/Input/DatePicker";
import './ModalBooking.scss';
import { postPatientBooking } from '../../../../services/userService';
import { languages } from '../../../../utils/constant';
import ProfileDoctor from '../ProfileDoctor';
import { toast } from 'react-toastify';
import moment from 'moment';

class ModalBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listGenders: [],

            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            birthday: '',
            gender: '',

            date: '',
            timeType: '',

            doctorId: '',
            doctorName: '',

        }
    }

    componentDidMount() {
        this.props.fetchAllGender();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.dataTime !== this.props.dataTime) {
            if (this.props.dataTime) {
                if (this.props.language === languages.VI) {
                    this.setState({
                        doctorId: this.props.dataTime.doctorId,
                        date: this.props.dataTime.date,
                        timeType: this.props.dataTime.timeType,
                        doctorName: this.props.dataTime.doctorData.lastName + ' ' + this.props.dataTime.doctorData.firstName
                    });
                } else {
                    this.setState({
                        doctorId: this.props.dataTime.doctorId,
                        date: this.props.dataTime.date,
                        timeType: this.props.dataTime.timeType,
                        doctorName: this.props.dataTime.doctorData.firstName + ' ' + this.props.dataTime.doctorData.lastName
                    });
                }
            }
        }
        if (prevProps.genders !== this.props.genders) {
            this.setState({ listGenders: this.props.genders });
        }

    }

    toggle = () => {
        this.props.toggle();
    }

    handleOnchangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    selectDate = date => {
        this.setState({ birthday: date[0] });
    }

    handleConfirmBooking = async () => {
        const { doctorId, fullName, phoneNumber,
            email, address, reason, gender, birthday,
            date, timeType, doctorName } = this.state;

        const res = await postPatientBooking({
            doctorId: doctorId,
            doctorName: doctorName,

            fullName: fullName,
            phoneNumber: phoneNumber,
            email: email,
            address: address,
            reason: reason,
            birthday: birthday,
            gender: gender,
            timeType: timeType,
            date: date,

            language: this.props.language,
            timeString: this.buildTimeBooking(this.props.dataTime)
        });

        if (res && res.errCode === 0) {
            toast.success('Booking success');
            this.setState({
                doctorId: '',

                fullName: '',
                phoneNumber: '',
                email: '',
                address: '',
                reason: '',
                birthday: '',
                gender: '',
                birthday: '',

                date: '',
                timeType: '',

            });
            this.toggle();
        } else {
            toast.error('Booking failed');
        }
    }

    buildTimeBooking = (dataTime) => {
        let day = '';
        let time = '';
        if (dataTime) {
            day = this.props.language === languages.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') : moment.unix(+dataTime.date / 1000).locale('en').format('ddd - MM/DD/YYYY');
            day = day.charAt(0).toUpperCase() + day.slice(1);
            time = this.props.language === languages.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
            return `${time} ${day}`
        }

        return '';
    }


    render() {
        const { listGenders,
            fullName, phoneNumber, email, address,
            reason, birthday, gender }
            = this.state;
        const { dataTime } = this.props;
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpenBookingModal}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered={true}
                    className='modal-booking-container'
                >
                    <ModalHeader
                        toggle={() => this.toggle()}
                        className='modal-title'
                    >
                        <FormattedMessage id='booking.booking'></FormattedMessage>
                    </ModalHeader>
                    <ModalBody>
                        <ProfileDoctor
                            dataTime={dataTime}
                        />

                        <div className='customer-info row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.name'></FormattedMessage></label>
                                <input
                                    type='text' name='fullName' className='form-control' value={fullName}
                                    onChange={(event) => this.handleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.phone'></FormattedMessage></label>
                                <input
                                    type='text' name='phoneNumber' className='form-control' value={phoneNumber}
                                    onChange={(event) => this.handleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.email'></FormattedMessage></label>
                                <input
                                    type='text' name='email' className='form-control' value={email}
                                    onChange={(event) => this.handleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.address'></FormattedMessage></label>
                                <input
                                    type='text' name='address' className='form-control' value={address}
                                    onChange={(event) => this.handleOnchangeInput(event)} />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='booking.reason'></FormattedMessage></label>
                                <input
                                    type='text' name='reason' className='form-control' value={reason}
                                    onChange={(event) => this.handleOnchangeInput(event)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.birthday'></FormattedMessage></label>
                                <DatePicker
                                    onChange={(birthday) => this.selectDate(birthday)}
                                    className='form-control'
                                    value={birthday}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.gender'></FormattedMessage></label>
                                <select className='form-control' value={gender} name='gender' onChange={(e) => this.handleOnchangeInput(e)}>
                                    {listGenders && listGenders.length > 0 &&
                                        listGenders.map((item, index) => {
                                            return <option key={index} value={item.keyMap}>{this.props.language === languages.VI ? item.valueVi : item.valueEn}</option>
                                        })
                                    }
                                </select>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className='modal-footer'>
                        <Button color="primary" className='modal-btn' onClick={() => this.handleConfirmBooking()}>
                            <FormattedMessage id='booking.save'></FormattedMessage>
                        </Button>{' '}
                        <Button color="secondary" className='modal-btn' onClick={() => this.props.toggle()}>
                            <FormattedMessage id='booking.cancel'></FormattedMessage>
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor,
        extraInfoDoctor: state.admin.extraInfoDoctor,
        genders: state.admin.genders,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchExtraInfoDoctor: (id) => dispatch(action.fetchExtraInfoDoctor(id)),
        fetchDetailDoctor: (id) => dispatch(action.getDetailDoctorById(id)),
        fetchAllGender: () => dispatch(action.fetchGenderStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalBooking);
