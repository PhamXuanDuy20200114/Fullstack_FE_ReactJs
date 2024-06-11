import React from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils/constant";
import { connect } from "react-redux";
import * as action from "../../../store/actions";
import moment from "moment";
import localization from 'moment/locale/vi';

import "./DoctorSchedule.scss";

class DoctorSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            allDays: [],
            allAvailableTime: [],
        }
    }

    componentDidMount() {
        let allDays = this.getArrDays();
        this.setState({ allDays });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.language !== this.props.language) {
            let allDays = this.getArrDays();
            this.setState({ allDays });
        }
        if (prevProps.allAvailableTime !== this.props.allAvailableTime) {
            this.setState({ allAvailableTime: this.props.allAvailableTime ? this.props.allAvailableTime : [] });
        }

        if (this.props.doctorId !== prevProps.doctorId) {
            let allDays = this.getArrDays();
            if (allDays && allDays.length > 0) {
                this.props.getScheduleByDate(this.props.doctorId, allDays[0].value);
            }
        }
    }

    getArrDays = () => {
        let arrDate = [];
        for (let i = 0; i < 7; i++) {
            let obj = {};
            if (this.props.language === languages.VI) {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    obj.label = 'Hôm nay - ' + ddMM;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').format('dddd - DD/MM');
                    obj.label = obj.label.charAt(0).toUpperCase() + obj.label.slice(1);
                }
            } else {
                if (i === 0) {
                    let ddMM = moment(new Date()).format('DD/MM');
                    obj.label = 'Today - ' + ddMM;
                } else {
                    obj.label = moment(new Date()).add(i, 'days').locale('en').format('ddd - DD/MM');
                }
            }
            obj.value = moment().add(i, 'days').startOf('day').valueOf();
            arrDate.push(obj);
        }
        return arrDate;
    }

    handleOnChangeDate = (e) => {
        let date = e.target.value;
        this.props.getScheduleByDate(this.props.doctorId, date);
    }

    render() {
        const { allDays, allAvailableTime } = this.state;
        return (
            <div className="schedule-container">
                <div className="all-schedule">
                    <select className='selected-day' onChange={(e) => this.handleOnChangeDate(e)}>
                        {allDays && allDays.length > 0 && allDays.map((item, index) => {
                            return (
                                <option value={item.value}>{item.label}</option>
                            )
                        })}
                    </select>
                    <div className="title-schedule">
                        <i class="far fa-calendar"></i>
                        <FormattedMessage id='doctordetail.schedule'></FormattedMessage>
                    </div>
                    <div className="time">
                        {allAvailableTime && allAvailableTime.length > 0 && allAvailableTime.map((item, index) => {
                            return (
                                <div className="time-item">
                                    {this.props.language === languages.VI ? item.timeTypeData.valueVi : item.timeTypeData.valueEn}
                                </div>
                            )
                        })}
                        {
                            allAvailableTime.length === 0 &&
                            <div className="no-schedule">
                                <FormattedMessage id='doctordetail.no-schedule'></FormattedMessage>
                            </div>
                        }

                    </div>
                    <div className="more">
                        <FormattedMessage id='doctordetail.choose'></FormattedMessage> <i class="fas fa-hand-pointer"></i> <FormattedMessage id='doctordetail.booking'></FormattedMessage>
                    </div>
                </div>
                <div className="all-available-time">

                </div>
            </div>
        )
    }
}
const mapStateToProp = state => {
    return {
        language: state.app.language,
        allAvailableTime: state.admin.doctorsScheduleTime,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        getScheduleByDate: (doctorId, date) => dispatch(action.fetchScheduleDoctor(doctorId, date)),
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(DoctorSchedule);
