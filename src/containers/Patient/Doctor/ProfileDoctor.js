import React from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils/constant";
import { connect } from "react-redux";
import * as action from "../../../store/actions";
import moment from "moment";
import localization from 'moment/locale/vi';

import "./ExtraDoctorInfo.scss";

class ExtraDoctorInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            detailDoctor: {},

            isShowDetailDoctor: false,
        }
    }

    componentDidMount() {
        this.props.fetchAllGender();
        this.props.fetchProfileDoctorById(this.props.dataTime.doctorId);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.propfileDoctor !== this.props.propfileDoctor) {
            this.setState({ detailDoctor: this.props.propfileDoctor });
        }
    }

    handleShowHideDetailDoctor = () => {
        this.setState({ isShowDetailDoctor: !this.state.isShowDetailDoctor });
    };

    dayTime = (dataTime) => {
        let day = '';
        let time = '';
        if (dataTime) {
            day = this.props.language === languages.VI ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY') : moment.unix(+dataTime / 1000).locale('en').format('ddd - DD/MM/YYYY');
            day = day.charAt(0).toUpperCase() + day.slice(1);
            time = this.props.language === languages.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;
        }

        return (
            <>
                <div>
                    {time + ' ' + day}
                </div>
                <div>
                    <FormattedMessage id='booking.free-booking'></FormattedMessage>
                </div>
            </>
        )
    }


    render() {
        const { detailDoctor, isShowDetailDoctor } = this.state;

        let doctorNameEn = detailDoctor.firstName + ' ' + detailDoctor.lastName;
        let doctorNameVi = detailDoctor.lastName + ' ' + detailDoctor.firstName;

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

        let price = '';
        if (detailDoctor && detailDoctor.doctorInfoData && detailDoctor.doctorInfoData.priceData) {
            if (this.props.language === languages.VI) {
                price = detailDoctor.doctorInfoData.priceData.valueVi;
            } else {
                price = detailDoctor.doctorInfoData.priceData.valueEn;
            }
        }


        return (
            <>
                <div className="doctor-booking">
                    <div className="content-left">
                        <div className="avatar-doctor" style={{ backgroundImage: `url(${detailDoctor.image})` }}></div>
                    </div>
                    <div className="content-right">
                        <div className="up" onClick={() => this.handleShowHideDetailDoctor()}>
                            {position && position + ', '}
                            <FormattedMessage id='booking.doctor'></FormattedMessage>&nbsp;
                            {this.props.language === languages.VI ? doctorNameVi : doctorNameEn}
                        </div>

                        <div className="down">
                            {isShowDetailDoctor && descriptions}
                            {isShowDetailDoctor === false && this.dayTime(this.props.dataTime)}
                        </div>
                    </div>
                </div >
                <div className='price'>
                    <FormattedMessage id='booking.price'></FormattedMessage>:&nbsp;
                    <span>{price}</span>
                </div>
            </>
        )
    }
}
const mapStateToProp = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        propfileDoctor: state.admin.profileDoctor
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchAllGender: () => dispatch(action.fetchGenderStart()),
        fetchProfileDoctorById: (doctorId) => dispatch(action.fetchProfileDoctor(doctorId))
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(ExtraDoctorInfo);
