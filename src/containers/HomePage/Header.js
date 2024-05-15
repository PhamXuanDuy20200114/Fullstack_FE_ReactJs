import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import actionTypes from '../../store/actions/actionTypes';
import { Fade } from 'react-slideshow-image';

import './Header.scss';

class Header extends Component {

    constructor(props) {
        super(props);
        this.state = {
            slide: 1
        };
    }

    componentDidMount() {

    }

    indicators = (index) => (
        <div className="indicator">
            <i className="fas fa-circle" ></i>
        </div>);

    changeLanguage = (language) => {
        this.props.changeLanguage(language);
    }

    render() {
        let language = this.props.language;

        return (
            <React.Fragment>

                <div className='home-header-container'>
                    <div className='home-header-content'>
                        <div className='content-left'>
                            <i className='fas fa-bars'></i>
                            <div className='header-logo'></div>
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

                    <div className='home-header-banner'>
                        <Fade
                            slidesToScroll={1}
                            slidesToShow={1}
                            canSwipe={false}
                            arrows={false}
                            indicators={i => this.indicators(i)}
                            transitionDuration={500}
                            duration={1000}
                        >
                            <div className={'slide-1'}>
                            </div>
                            <div className={'slide-2'}>
                            </div>
                            <div className={'slide-3'}>
                            </div>
                            <div className={'slide-4'}>
                            </div>
                        </Fade>
                    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Header);
