import React from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils/constant";
import { connect } from "react-redux";
import * as action from "../../../store/actions";
import Header from "../../HomePage/Header";

import "./DoctorDetail.scss";
import { get } from "lodash";

class DetailDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: {},
        }
    }

    componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            this.props.fetchDetailDoctor(this.props.match.params.id);
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.detailDoctor !== this.props.detailDoctor) {
            this.setState({ doctor: this.props.detailDoctor });
        }
    }

    render() {
        console.log('doctor', this.state.doctor);
        const doctor = this.state.doctor;
        let nameVi = doctor.positionData && doctor.positionData.valueVi + ', Bác sĩ' + ' ' + doctor.lastName + ' ' + doctor.firstName;
        let nameEn = doctor.positionData && doctor.positionData.valueEn + ' ' + doctor.firstName + ' ' + doctor.lastName;
        let descriptions = [];
        if (doctor && doctor.doctorData && doctor.doctorData.description) {
            descriptions = doctor.doctorData.description.split(',');
            console.log('descriptions', descriptions);
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
                                {this.props.language === languages.VI ? nameVi : nameEn}
                            </div>

                            <div className="down">

                                {descriptions && descriptions.map((item, index) => {
                                    return (
                                        <p>{item}</p>
                                    )
                                })}

                            </div>
                        </div>
                    </div>

                    <div className="schedule-doctor">

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
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchDetailDoctor: (id) => dispatch(action.getDetailDoctorById(id)),
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(DetailDoctor);
