import React from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils/constant";
import { connect } from "react-redux";
import * as action from "../../../store/actions";
import Header from "../../HomePage/Header";

import "./DoctorDetail.scss";
import { get } from "lodash";
import DoctorSchedule from "./DoctorSchedule";
import ExtraDoctorInfor from "./ExtraDoctorInfor";

class DetailDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: {},
            currentDoctorId: '',
            extraInfoDoctor: {},
            show: false,
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({ currentDoctorId: id });
            this.props.fetchDetailDoctor(id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({ doctor: this.props.detailDoctor });
        }
    }



    render() {
        const { doctor, currentDoctorId } = this.state;
        let descriptions = [];

        let nameVi = doctor.lastName + ' ' + doctor.firstName;
        let nameEn = doctor.firstName + ' ' + doctor.lastName;

        if (doctor && doctor.doctorData && doctor.doctorData.description) {
            descriptions = doctor.doctorData.description.split(',');
        }

        let position = '';
        if (doctor && doctor.positionData) {
            if (doctor.positionData.valueEn === 'None') {
                position = '';
            } else {
                if (this.props.language === languages.VI) {
                    position = doctor.positionData.valueVi;
                }
                else {
                    position = doctor.positionData.valueEn;
                }
            }
        }


        return (
            <>
                <Header />
                <div className="doctor-detail-container">
                    <div className="intro-doctor">
                        <div className="content-left">
                            <div className="avatar-doctor" style={{ backgroundImage: `url(${doctor.image})` }}></div>
                        </div>
                        <div className="content-right">
                            <div className="up">
                                {position && position + ', '}
                                <FormattedMessage id='booking.doctor'></FormattedMessage> &nbsp;
                                {this.props.language === languages.VI ? nameVi : nameEn}
                            </div>

                            <div className="down">

                                {descriptions && descriptions.map((item, index) => {
                                    return (
                                        <p>{item}</p>
                                    )
                                })}
                            </div>
                            {/* <div className="province">
                                <i class="fas fa-map-marker-alt"></i>
                                {province}
                            </div> */}
                            <div className="social">
                                <div className="like"><i class="fas fa-thumbs-up"></i><FormattedMessage id='doctordetail.like'></FormattedMessage></div>
                                <div className="share"><FormattedMessage id='doctordetail.share'></FormattedMessage></div>
                            </div>
                        </div>
                    </div>

                    <div className="schedule-doctor">
                        <div className="content-left">
                            <DoctorSchedule doctorId={currentDoctorId} />
                        </div>
                        <div className="content-right">
                            <ExtraDoctorInfor doctorId={currentDoctorId} />
                        </div>
                    </div>

                    <div className="detail-info-doctor">
                        {
                            doctor && doctor.doctorData && doctor.doctorData.contentHTML
                            && <div className="detail-content" dangerouslySetInnerHTML={{ __html: doctor.doctorData.contentHTML }}>

                            </div>
                        }
                    </div>

                    <div className="comment-doctor">

                    </div>
                </div >

            </>
        )
    }
}
const mapStateToProp = state => {
    return {
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor,
        extraInfoDoctor: state.admin.extraInfoDoctor,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchDetailDoctor: (id) => dispatch(action.getDetailDoctorById(id)),
        fetchExtraInfoDoctor: (id) => dispatch(action.fetchExtraInfoDoctor(id)),
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(DetailDoctor);
