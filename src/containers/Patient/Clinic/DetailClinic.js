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
        let { name, address, introHTML, expertiseHTML, equipHTML, processHTML, priceHTML, listDoctorId, clinicLogo, clinicBackground } = this.state;
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
                        <div className="clinic-header-intro">
                            <div className="clinic-title">
                                <div className="clinic-logo" style={{ background: `url(${imageLogoBase64})` }}></div>
                                <div>
                                    <div className="clinic-name">{name}</div>
                                    <div className="clinic-address">{address}</div>
                                </div>
                            </div>
                            <div className="nav">
                                {listDoctorId && listDoctorId.length > 0 && <a href="#booking"><FormattedMessage id='clinicdetail.booking' /></a>}
                                {introHTML && <a href="#intro"><FormattedMessage id='clinicdetail.intro' /></a>}
                                {expertiseHTML && <a href="#expertise"><FormattedMessage id='clinicdetail.expertise' /></a>}
                                {equipHTML && <a href="#equip"><FormattedMessage id='clinicdetail.equip' /></a>}
                                {processHTML && <a href="#process"><FormattedMessage id='clinicdetail.process' /></a>}
                                {priceHTML && <a href="#price"><FormattedMessage id='clinicdetail.price' /></a>}
                            </div>
                        </div>
                    </div>

                    <div className="web-intro">
                        <div className="bookingcare">
                            BookingCare là Nền tảng Y tế chăm sóc sức khỏe toàn diện hàng đầu Việt Nam kết nối người dùng với trên 200 bệnh viện - phòng khám uy tín, hơn 1,500 bác sĩ chuyên khoa giỏi và hàng nghìn dịch vụ, sản phẩm y tế chất lượng cao.
                        </div>
                        <div className="more-info">
                            Từ nay, người bệnh có thể đặt lịch tại Khoa khám bệnh theo yêu cầu và Quốc tế, {name} thông qua hệ thống đặt khám BookingCare.
                            <ul>
                                <li>Khám theo giờ hẹn, giảm thiểu thời gian chờ đợi xếp hàng</li>
                                <li>Được lựa chọn khám với các bác sĩ chuyên khoa giàu kinh nghiệm</li>
                                <li>Hỗ trợ đặt khám trực tuyến trước khi đi khám (miễn phí đặt lịch)</li>
                            </ul>
                            Sau khi đặt khám, người bệnh sẽ nhận được hướng dẫn chi tiết về sự chuẩn bị cả TRƯỚC và TRONG và SAU KHI KHÁM để hành trình đi khám thuận tiện và hiệu quả hơn.
                        </div>
                    </div>

                    <div className="clinic-doctor" id="booking">
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

                    <div className="clinic-content">
                        {introHTML &&
                            <div className="clinic-intro" id="intro"
                                dangerouslySetInnerHTML={{ __html: introHTML }}
                            >
                            </div>
                        }
                        {expertiseHTML &&
                            <div className="clinic-expertise" id="expertise"
                                dangerouslySetInnerHTML={{ __html: expertiseHTML }}
                            >
                            </div>
                        }
                        {equipHTML &&
                            <div className="clinic-equip" id="equip"
                                dangerouslySetInnerHTML={{ __html: equipHTML }}
                            >
                            </div>
                        }

                        {processHTML &&
                            <div className="clinic-process" id="process"
                                dangerouslySetInnerHTML={{ __html: processHTML }}
                            >
                            </div>
                        }

                        {priceHTML &&
                            <div className="clinic-price" id="price"
                                dangerouslySetInnerHTML={{ __html: priceHTML }}
                            >
                            </div>
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
