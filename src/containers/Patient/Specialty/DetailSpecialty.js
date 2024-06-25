import React from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils/constant";
import { connect } from "react-redux";
import * as action from "../../../store/actions";
import Header from "../../HomePage/Header";
import { getDoctorBySpecialty } from "../../../services/doctorService";
import { getSpecialtyById } from "../../../services/specialtyService";
import "./DetailSpecialty.scss";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import ExtraDoctorInfor from "../Doctor/ExtraDoctorInfor";
import IntroDoctor from "../Doctor/IntroDoctor";
import { Dropdown } from "reactstrap";
class DetailSpecialty extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentSpecialtyId: '',
            fullDescriptionHTML: '',
            name: '',
            descriptionHTML: '',
            listDoctorId: [],

            isOpen: true,
        }
    }

    async componentDidMount() {
        if (this.props.match && this.props.match.params && this.props.match.params.id) {
            let id = this.props.match.params.id;
            this.setState({ currentSpecialtyId: id });
            let res = await getSpecialtyById(id);
            if (res && res.errCode === 0) {
                this.setState({
                    name: res.data.name,
                    fullDescriptionHTML: res.data.descriptionHTML,
                    descriptionHTML: res.data.descriptionHTML.substring(0, 400)
                });

            }
            let resDoctor = await getDoctorBySpecialty(id, 'ALL');
            if (resDoctor && resDoctor.errCode === 0) {
                this.setState({ listDoctorId: resDoctor.data });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleShowHide = () => {
        let { isOpen, fullDescriptionHTML } = this.state;
        let descriptionHTML = '';
        this.setState({
            isOpen: !isOpen
        })
        if (isOpen === false) {
            descriptionHTML = fullDescriptionHTML.substring(0, 400);
        } else {
            descriptionHTML = fullDescriptionHTML;
        }
        this.setState({
            descriptionHTML: descriptionHTML
        });
    }

    handleBackToHome = () => {
        this.props.history.push('/home');
    }

    onChangeSelectLocation = async (e) => {
        let location = e.target.value;
        let { currentSpecialtyId } = this.state;
        let res = await getDoctorBySpecialty(currentSpecialtyId, location);
        if (res && res.errCode === 0) {
            this.setState({ listDoctorId: res.data });
        }
    }

    render() {
        let { name, descriptionHTML, isOpen, listDoctorId } = this.state;

        return (
            <>
                <Header />
                <div className="specialty-container">
                    <div className="home">
                        <i class="fas fa-home" onClick={() => this.handleBackToHome()}></i>/
                        <FormattedMessage id='specialty.specialized-examination'></FormattedMessage>
                    </div>
                    <div className="specialty-content">
                        <div className="specialty-name">{name}</div>
                        <div className="specialty-detail" dangerouslySetInnerHTML={{ __html: descriptionHTML }}>
                        </div>
                        <button onClick={() => this.handleShowHide()}>
                            {isOpen === true ? <FormattedMessage id='specialty.more'></FormattedMessage>
                                : <FormattedMessage id='specialty.hide'></FormattedMessage>}
                        </button>
                    </div>

                    <div className="location">
                        <select name="location" id="location-select" defaultValue={'ALL'} onChange={(e) => this.onChangeSelectLocation(e)}>
                            <option value="ALL">{this.props.language === languages.VI ? 'Toàn Quốc' : 'All'}</option>
                            <option value="PRO1">{this.props.language === languages.VI ? 'Hà Nội' : 'Ha Noi'}</option>
                            <option value="PRO2">{this.props.language === languages.VI ? 'Hồ Chí Minh' : 'Ho Chi Minh'}</option>
                        </select>
                    </div>

                    <div className="specialty-doctor">

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
export default connect(mapStateToProp, mapDispatchToProp)(DetailSpecialty);
