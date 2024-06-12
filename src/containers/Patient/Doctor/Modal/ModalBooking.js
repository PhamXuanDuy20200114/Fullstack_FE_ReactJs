import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import * as action from '../../../../store/actions';
import './ModalBooking.scss';
import { languages } from '../../../../utils/constant';
import ProfileDoctor from '../ProfileDoctor';

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
            bookingFor: '',
            gender: '',

        }
    }

    componentDidMount() {
        this.props.fetchAllGender();
    }

    componentDidUpdate(prevProps, prevState) {
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


    render() {
        const { listGenders,
            fullName, phoneNumber, email, address,
            reason, bookingFor, gender }
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
                                    type='text' name='name' className='form-control' value={fullName}
                                    onChange={(event) => this.handleOnchangeInput(event)}
                                />
                            </div>
                            <div className='col-6 form-group'>
                                <label><FormattedMessage id='booking.phone'></FormattedMessage></label>
                                <input
                                    type='text' name='phone' className='form-control' value={phoneNumber}
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
                                <label><FormattedMessage id='booking.booking-for'></FormattedMessage></label>
                                <input
                                    type='text' name='bookingFor' className='form-control' value={bookingFor}
                                    onChange={(event) => this.handleOnchangeInput(event)} />
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
