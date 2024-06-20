import React from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils/constant";
import { connect } from "react-redux";
import * as action from "../../../store/actions";
import Header from "../../HomePage/Header";
import { getDetailDoctor } from "../../../services/doctorService";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import "./DoctorDetail.scss";


class IntroDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: {},
        }
    }

    async componentDidMount() {
        let id = this.props.doctorId;
        if (id) {
            let res = await getDetailDoctor(id);
            if (res && res.errCode === 0) {
                this.setState({ doctor: res.data });
            }
        }
    }

    async componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctorId !== this.props.doctorId) {
            let id = this.props.doctorId;
            if (id) {
                let res = await getDetailDoctor(id);
                if (res && res.errCode === 0) {
                    this.setState({ doctor: res.data });
                }
            }
        }
    }

    handleShowDetailDoctor = () => {
        let id = this.props.doctorId;
        this.props.history.push(`/detail-doctor/${id}`);
    }

    render() {
        const { doctor } = this.state;
        console.log(this.props.doctorId);
        let descriptions = [];

        let nameVi = doctor.lastName + ' ' + doctor.firstName;
        let nameEn = doctor.firstName + ' ' + doctor.lastName;

        if (doctor && doctor.doctorData && doctor.doctorData.description) {
            descriptions = doctor.doctorData.description.split('.');
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
            <div className="intro-doctor">
                <div className="content-left">
                    <div className="avatar-doctor" style={{ backgroundImage: `url(${doctor.image})` }}></div>
                    <button onClick={() => this.handleShowDetailDoctor()}><FormattedMessage id='specialty.more' /></button>
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
                </div>
            </div>
        )
    }
}
const mapStateToProp = state => {
    return {
        language: state.app.language,
    }
}

const mapDispatchToProp = dispatch => {
    return {
    }
}
export default withRouter(connect(mapStateToProp, mapDispatchToProp)(IntroDoctor));
