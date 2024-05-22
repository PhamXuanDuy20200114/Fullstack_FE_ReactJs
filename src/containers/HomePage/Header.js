import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import actionTypes from '../../store/actions/actionTypes';
import { withRouter } from 'react-router-dom';
import './Header.scss';

class Header extends Component {

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

    handleOnClick = () => {
        this.props.history.push('/home');
    }

    render() {
        let language = this.props.language;

        return (

            <div className='home-header-content'>
                <div className='content-left'>
                    <i className='fas fa-bars'></i>
                    <div className='header-logo' onClick={() => this.handleOnClick()}></div>
                </div>
                <div className='content-center '>
                    <div className='child-content'>
                        <div><b><FormattedMessage id='homeheader.specialty'></FormattedMessage></b></div>
                        <div className='sub-title'><FormattedMessage id='homeheader.search-doctor'></FormattedMessage></div>
                    </div>

                    <div className='child-content'>
                        <div><b><FormattedMessage id='homeheader.health-facility'></FormattedMessage></b></div>
                        <div className='sub-title'><FormattedMessage id='homeheader.select-room'></FormattedMessage></div>
                    </div>

                    <div className='child-content'>
                        <div><b><FormattedMessage id='homeheader.doctor'></FormattedMessage></b></div>
                        <div className='sub-title'><FormattedMessage id='homeheader.find-good-doctor'></FormattedMessage></div>
                    </div>

                    <div className='child-content'>
                        <div><b><FormattedMessage id='homeheader.medical-package'></FormattedMessage></b></div>
                        <div className='sub-title'><FormattedMessage id='homeheader.general-health-check'></FormattedMessage></div>
                    </div>

                </div>

                <div className='search'>
                    <button>
                        <i className="fas fa-search"></i>
                    </button>
                    <input type='text' placeholder='Tìm kiếm bác sĩ, phòng khám, gói khám'></input>
                </div>
                <div className='content-right'>
                    <div className='support'>
                        <i class="fas fa-question"></i>
                        <div className='sub-title'><FormattedMessage id='homeheader.support'></FormattedMessage></div>
                    </div>
                    <div className='flag'>
                        <div className={language === languages.VI ? 'vi action' : 'vi'} onClick={() => this.changeLanguage(languages.VI)}>VI</div>
                        <div className={language === languages.EN ? 'en action' : 'en'} onClick={() => this.changeLanguage(languages.EN)}>EN</div>
                    </div>
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
