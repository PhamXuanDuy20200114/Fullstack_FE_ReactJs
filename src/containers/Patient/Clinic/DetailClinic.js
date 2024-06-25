import React from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils/constant";
import { connect } from "react-redux";
import * as action from "../../../store/actions";
import Header from "../../HomePage/Header";
import { getDoctorByClinic } from "../../../services/doctorService";
import { getClinicById } from "../../../services/clinicService";
import "./DetailClinic.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ExtraDoctorInfor from "../Doctor/ExtraDoctorInfor";
import IntroDoctor from "../Doctor/IntroDoctor";
import { Dropdown } from "reactstrap";
class DetailClinic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentClinicId: '',
            name: '',
            address: '',
            clinicLogo: '',
            clinicBackground: '',
            introHTML: '',
            expertiseHTML: '',
            equipHTML: '',
            processHTML: '',
            price: '',
            listDoctorId: [],
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({ currentClinicId: id });
            let res = await getClinicById(id);
            if (res && res.errCode === 0) {
                this.setState({
                    name: res.data.name,
                    address: res.data.address,
                    introHTML: res.data.introHTML,
                    expertiseHTML: res.data.expertiseHTML,
                    equipHTML: res.data.equipHTML,
                    processHTML: res.data.processHTML,
                    priceHTML: res.data.priceHTML,
                    clinicBackground: res.data.imageBackground,
                    clinicLogo: res.data.imageLogo
                });

            }
            let resDoctor = await getDoctorByClinic(id);
            if (resDoctor && resDoctor.errCode === 0) {
                this.setState({ listDoctorId: resDoctor.data });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    render() {
        let { name, introHTML, expertiseHTML, equipHTML, processHTML, priceHTML, listDoctorId, clinicLogo, clinicBackground } = this.state;
        let imageLogoBase64 = '';
        let imageBackgroundBase64 = '';
        if (clinicLogo) {
            imageLogoBase64 = Buffer.from(clinicLogo, 'base64').toString('binary');
        }
        if (clinicBackground) {
            imageBackgroundBase64 = Buffer.from(clinicBackground, 'base64').toString('binary');
        }
        return (
            <>
                <Header />
                <div className="clinic-container">
                    <div className="clinic-header" >
                        <div className="clinic-image-background" style={{ background: `url(${imageBackgroundBase64})` }}></div>
                        <div className="clinic-title">
                            <div className="clinic-logo" style={{ background: `url(${imageLogoBase64})` }}></div>
                            <div className="clinic-name">{name}</div>
                        </div>
                    </div>

                    <div className="clinic-doctor">

                        {listDoctorId && listDoctorId.length > 0 &&
                            listDoctorId.map((item, index) => {
                                return (
                                    <div className="doctor-item" key={index}>
                                        <IntroDoctor doctorId={item} />
                                        <div className="doctor-right" >
                                            <DoctorSchedule doctorId={item} />
                                            <ExtraDoctorInfor doctorId={item} />
                                        </div>
                                    </div>
                                )
                            })
                        }

                    </div>

                </div>

            </>
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
export default connect(mapStateToProp, mapDispatchToProp)(DetailClinic);
