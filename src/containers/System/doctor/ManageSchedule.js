import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_ACTIONS } from '../../../utils';
import * as action from '../../../store/actions/adminAction';
import DatePicker from "../../../components/Input/DatePicker";
import Select from 'react-select'
import moment from 'moment';

import './ManageSchedule.scss';
import { toast } from 'react-toastify';
import { saveScheduleDoctor } from '../../../services/doctorService';


class ManageSchedule extends Component {


    constructor(props) {
        super(props);
        // const currentDate = new Date();
        // currentDate.setHours(0, 0, 0, 0);
        this.state = {
            listDoctors: [],
            selectedOption: null,
            currentDate: '',
            listHours: [],
            chooseTime: []
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctor();
        this.props.fetchAllCodeHours();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.listDoctors !== this.props.listDoctors) {
            this.setState({ listDoctors: this.props.listDoctors });
        }
        if (prevProps.scheduleTime !== this.props.scheduleTime) {
            let data = this.props.scheduleTime;
            if (data && data.length > 0) {
                data = data.map(item => ({
                    ...item, isSelected: false
                }));
                this.setState({ listHours: data });
            }
        }
    }

    buildSelectOption = (listDoctors) => {
        let result = [];
        if (listDoctors) {
            if (this.props.language === languages.EN) {
                for (let doctor of listDoctors) {
                    result.push({
                        value: doctor.id,
                        label: doctor.firstName + ' ' + doctor.lastName
                    });
                }
            }
            else {
                for (let doctor of listDoctors) {
                    result.push({
                        value: doctor.id,
                        label: doctor.lastName + ' ' + doctor.firstName
                    });
                }
            }
        }
        return result;
    }

    handleChange = selectedOption => {
        this.setState({ selectedOption });
    }

    selectDate = date => {
        this.setState({ currentDate: date[0] });
    }

    handleChooseTime = time => {
        const { chooseTime } = this.state;
        if (!time.isSelected) {
            chooseTime.push(time);
            time.isSelected = true;
        } else {
            const index = chooseTime.findIndex(item => item.keyMap === time.keyMap);
            chooseTime.splice(index, 1);
            time.isSelected = false;
        }
        this.setState({ chooseTime });
    }

    handleSaveSchedule = () => {
        const { selectedOption, currentDate, chooseTime } = this.state;
        if (!currentDate) {
            toast.error('Invalid date!');
            return;
        }
        if (!selectedOption) {
            toast.error('Invalid doctor!');
            return;
        }


        let result = [];
        if (chooseTime && chooseTime.length > 0) {
            chooseTime.map(item => {
                result.push({
                    doctorId: selectedOption.value,
                    date: moment(currentDate).valueOf(),
                    timeType: item.keyMap
                });
            });
        }
        this.props.saveScheduleDoctor(result);
        chooseTime.map(item => {
            item.isSelected = false;
        })
        this.setState({ selectedOption: null, currentDate: '', chooseTime: [] });
    }

    render() {
        const { listDoctors, selectedOption, currentDate, listHours, chooseTime } = this.state;
        return (
            <div className='manage-schedule-container'>
                <div className='title'>
                    <FormattedMessage id='manageschedule.manage-schedule' />
                </div>
                <div className='container'>
                    <div className='row'>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manageschedule.choose-doctor' /></label>
                            <Select
                                value={selectedOption}
                                onChange={this.handleChange}
                                options={this.buildSelectOption(listDoctors)}
                                className='form-control' />
                        </div>
                        <div className='col-6 form-group'>
                            <label><FormattedMessage id='manageschedule.choose-date' /></label>
                            <div><DatePicker onChange={(currentDate) => this.selectDate(currentDate)} className='form-control' value={currentDate} minDate={new Date()} /></div>
                        </div>
                        <div className='col-12 form-group pick-hour-container'>
                            {listHours && listHours.length > 0 &&
                                listHours.map((hour, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className={hour.isSelected ? 'choose-time active' : 'choose-time'}
                                            onClick={() => this.handleChooseTime(hour)}
                                        >
                                            {this.props.language === languages.VI ? hour.valueVi : hour.valueEn}
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <button className='btn btn-primary save-btn' onClick={() => this.handleSaveSchedule()}><FormattedMessage id='manageschedule.save' /></button>
                    </div>
                </div >
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        listDoctors: state.admin.doctors,
        scheduleTime: state.admin.scheduleTime
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctor: () => dispatch(action.fetchAllDoctorStart()),
        fetchAllCodeHours: () => dispatch(action.fetchAllCodeHours()),
        saveScheduleDoctor: (data) => dispatch(action.saveScheduleDoctorStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
