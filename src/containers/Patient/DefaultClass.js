import React from "react";
import { FormattedMessage } from "react-intl";
import { languages } from "../../../utils/constant";
import { connect } from "react-redux";
import * as action from "../../../store/actions";

import "./ExtraDoctorInfo.scss";

class ExtraDoctorInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    render() {

        return (
            <div></div>
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
export default connect(mapStateToProp, mapDispatchToProp)(ExtraDoctorInfo);
