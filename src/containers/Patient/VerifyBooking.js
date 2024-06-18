import React from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../../utils/constant";
import { connect } from "react-redux";
import * as action from "../../store/actions";
import { verifyBooking } from "../../services/userService";
import Header from "../HomePage/Header";
import './VerifyBooking.scss';

class VerifyBooking extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusVerify: false,
            errCode: 0
        }
    }

    async componentDidMount() {
        if (this.props.location && this.props.location.search) {
            const urlParams = new URLSearchParams(this.props.location.search);
            const token = urlParams.get('token');
            const doctorId = urlParams.get('doctorId');
            let res = await verifyBooking({ token, doctorId });
            if (res && res.errCode === 0) {
                this.setState({
                    statusVerify: true,
                    errCode: res.errCode
                });
            } else {
                this.setState({
                    statusVerify: true,
                    errCode: res && res.errCode ? res.errCode : -1
                });
            }
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    render() {
        console.log(this.state);
        return (
            <>
                <Header />
                <div className="verify">
                    {
                        this.state.statusVerify === false
                            ? <div className="loading">
                                Loading...
                            </div> :
                            this.state.errCode === 0
                                ? <div className="success">
                                    <FormattedMessage id='verifybooking.true'></FormattedMessage>
                                </div>
                                : <div className="fail">
                                    <FormattedMessage id='verifybooking.err'></FormattedMessage>
                                </div>
                    }
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
export default connect(mapStateToProp, mapDispatchToProp)(VerifyBooking);
