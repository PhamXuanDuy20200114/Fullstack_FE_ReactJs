import React from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils/constant";
import { connect } from "react-redux";
import * as action from "../../../store/actions";
import Header from "../../HomePage/Header";

import "./ExtraDoctorInfo.scss";

class ExtraDoctorInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            extraInfoDoctor: {},
            show: false,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.extraInfoDoctor !== this.props.extraInfoDoctor) {
            this.setState({ extraInfoDoctor: this.props.extraInfoDoctor });
        }
        if (prevProps.doctorId !== this.props.doctorId) {
            let id = this.props.doctorId;
            this.props.fetchExtraInfoDoctor(id);
        }
    }

    handleShowHide = () => {
        this.setState({ show: !this.state.show });
    };

    render() {
        const { extraInfoDoctor, show } = this.state;
        let price = '';
        let payment = '';
        let province = '';
        let clinicName = '';
        let addressClinic = '';
        if (extraInfoDoctor && extraInfoDoctor.priceData && extraInfoDoctor.paymentData && extraInfoDoctor.provinceData && extraInfoDoctor.clinicName && extraInfoDoctor.addressClinic) {
            price = this.props.language === languages.VI ? extraInfoDoctor.priceData.valueVi + ' VND' : extraInfoDoctor.priceData.valueEn + '$';
            province = this.props.language === languages.VI ? extraInfoDoctor.provinceData.valueVi : extraInfoDoctor.provinceData.valueEn;
            clinicName = extraInfoDoctor.clinicName;
            addressClinic = extraInfoDoctor.addressClinic;
            if (extraInfoDoctor.paymentData.valueVi === 'Tất cả') {
                payment = this.props.language === languages.VI ? 'Tiền mặt và Thẻ ATM' : 'Card and Credit card';
            }
        }


        return (
            <>
                <div className="address">
                    <FormattedMessage id='doctordetail.address'></FormattedMessage>
                    <div className="hospital">{clinicName}</div>
                    <div className="hospital-address">{addressClinic}</div>
                </div>
                <div className="price">
                    <FormattedMessage id='doctordetail.price'></FormattedMessage>
                    {show === false && price}
                    {show &&
                        <div className="price-container">
                            <div className="price-detail">
                                <div className="top-content">
                                    <span><FormattedMessage id='doctordetail.price'></FormattedMessage></span>
                                    <span>{price}</span>
                                </div>
                                <div className="bottom-content">
                                    Được ưu tiên khám trước khi đặt khám ở BookingCare. Giá khám cho người nước ngoài 30$.
                                </div>
                            </div>
                            <div className="payment">
                                <FormattedMessage id='doctordetail.payment'></FormattedMessage> {payment}.
                            </div>
                        </div>
                    }
                    <button className="btn-show-hide" onClick={() => this.handleShowHide()}>
                        {show === false
                            ? <FormattedMessage id='doctordetail.more-info'></FormattedMessage>
                            : <FormattedMessage id='doctordetail.close'></FormattedMessage>
                        }
                    </button>

                </div>

            </>
        )
    }
}
const mapStateToProp = state => {
    return {
        language: state.app.language,
        extraInfoDoctor: state.admin.extraInfoDoctor,
    }
}

const mapDispatchToProp = dispatch => {
    return {
        fetchExtraInfoDoctor: (id) => dispatch(action.fetchExtraInfoDoctor(id)),
    }
}
export default connect(mapStateToProp, mapDispatchToProp)(ExtraDoctorInfo);
