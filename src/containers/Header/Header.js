import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import { FormattedMessage } from 'react-intl';
import './Header.scss';
import { languages } from '../../utils';

class Header extends Component {

    render() {
        const { processLogout, userInfo } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>
                <div className='left-content'>
                    <div className='languages'>
                        <span className='welcome'><FormattedMessage id='homeheader.welcome'></FormattedMessage> {userInfo && userInfo.firstName ? userInfo.firstName : ''}!</span>
                        <span className={this.props.language === languages.VI ? 'language-vi active' : 'language-vi'} onClick={() => { this.props.changeLanguage(languages.VI) }}>Vi</span>
                        <span className={this.props.language === languages.EN ? 'language-en active' : 'language-en'} onClick={() => { this.props.changeLanguage(languages.EN) }}>En</span>
                    </div>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title='Log out'>
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                </div>


            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguage: (language) => dispatch(actions.changeLanguage(language))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
