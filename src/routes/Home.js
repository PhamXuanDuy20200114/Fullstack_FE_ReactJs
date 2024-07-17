import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn, userInfo } = this.props;
        let role = userInfo && userInfo.roleId;
        let linkToRedirect = '';
        if (isLoggedIn) {
            if (role === 'R1') {
                linkToRedirect = '/system/user-manage';
            }
            if (role === 'R2') {
                linkToRedirect = '/doctor/manage-schedule';
            }
        } else {
            linkToRedirect = '/home';
        }

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
