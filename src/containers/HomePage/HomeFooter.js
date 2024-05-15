import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import actionTypes from '../../store/actions/actionTypes';
import { Fade } from 'react-slideshow-image';

import './HomeFooter.scss';

class HomeFooter extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }

    componentDidMount() {

    }


    changeLanguage = (language) => {
        this.props.changeLanguage(language);
    }

    render() {
        let language = this.props.language;

        return (
            <React.Fragment>
                <div className='home-footer'>
                    &copy; Created by Phạm Duy More infomation visit my github<a href='https://github.com/PhamXuanDuy20200114'> &#8594; Click here &#8592;</a>
                </div>
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: (language) => dispatch({ type: actionTypes.CHANGE_LANGUAGE, language })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
