import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import * as action from '../../../../store/actions';
import './ModalBooking.scss';
import { languages } from '../../../../utils/constant';

class ModalBooking extends Component {

    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},
            price: '',

            listGenders: [],

            fullName: '',
            phoneNumber: '',
            email: '',
            address: '',
            reason: '',
            bookingFor: '',
            gender: '',
        }
    }

    componentDidMount() {
        let id = this.props.dataTime.doctorId;
        this.props.fetchDetailDoctor(id);
        this.props.fetchExtraInfoDoctor(id);
        this.props.fetchAllGender();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({ detailDoctor: this.props.detailDoctor });
        }
        if (prevProps.extraInfoDoctor !== this.props.extraInfoDoctor) {
            if (this.props.extraInfoDoctor.priceData) {
                if (this.props.language === languages.VI) {
                    this.setState({ price: this.props.extraInfoDoctor.priceData.valueVi + ' VND' });
                } else {
                    this.setState({ price: this.props.extraInfoDoctor.priceData.valueEn + '$' });
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

    handaleOnchangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    checkValidateInput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        let isValid = true;
        console.log('state', this.state);
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        if (this.checkValidateInput()) {
            this.props.createNewUserByService(this.state);
        }
    }

    render() {
        const { detailDoctor, price, listGenders,
            fullName, phoneNumber, email, address, reason, bookingFor, gender } = this.state;

        let doctorNameVi = detailDoctor.firstName + ' ' + detailDoctor.lastName;
        let doctorNameEn = detailDoctor.lastName + ' ' + detailDoctor.firstName;

        let descriptions = '';
        if (detailDoctor && detailDoctor.doctorData && detailDoctor.doctorData.description) {
            descriptions = detailDoctor.doctorData.description;
        }
        let position = '';
        if (detailDoctor && detailDoctor.positionData) {
            if (detailDoctor.positionData.valueEn === 'None') {
                position = '';
            } else {
                if (this.props.language === languages.VI) {
                    position = detailDoctor.positionData.valueVi;
                }
                else {
                    position = detailDoctor.positionData.valueEn;
                }
            }
        }

        console.log('detailDoctor', detailDoctor);

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
                        <div className="doctor-booking">
                            <div className="content-left">
                                <div className="avatar-doctor" style={{ backgroundImage: `url(${detailDoctor.image})` }}></div>
                            </div>
                            <div className="content-right">
                                <div className="up">
                                    {position && position + ', '}
                                    <FormattedMessage id='booking.doctor'></FormattedMessage>&nbsp;
                                    {this.props.language === languages.VI ? doctorNameVi : doctorNameEn}
                                </div>

                                <div className="down">
                                    {descriptions}
                                </div>
                            </div>
                        </div>
                        <div className='price'>
                            <FormattedMessage id='booking.price'></FormattedMessage>:&nbsp;
                            <span>{price}</span>
                        </div>

                        <div className='customer-info row'>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.name'></FormattedMessage></label>
                                <input
                                    type='text' name='name' className='form-control'
                                    onChange={(event) => this.handaleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.phone'></FormattedMessage></label>
                                <input
                                    type='text' name='phone' className='form-control'
                                    onChange={(event) => this.handaleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.email'></FormattedMessage></label>
                                <input
                                    type='text' name='email' className='form-control'
                                    onChange={(event) => this.handaleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.address'></FormattedMessage></label>
                                <input
                                    type='text' name='address' className='form-control'
                                    onChange={(event) => this.handaleOnchangeInput(event)} />
                            </div>
                            <div className='col-12 form-group'>
                                <label><FormattedMessage id='booking.reason'></FormattedMessage></label>
                                <input
                                    type='text' name='reason' className='form-control'
                                    onChange={(event) => this.handaleOnchangeInput(event)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.booking-for'></FormattedMessage></label>
                                <input
                                    type='text' name='bookingFor' className='form-control'
                                    onChange={(event) => this.handaleOnchangeInput(event)} />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.gender'></FormattedMessage></label>
                                <select className='form-control' value={gender} name='gender' onChange={(e) => this.handleOnChange(e)}>
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
                        <Button color="primary" className='modal-btn' onClick={() => this.handleAddNewUser()}>
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
