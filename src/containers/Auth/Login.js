
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from '../../store/actions';

import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { handleLogin } from '../../services/userService';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false
        }
    }

    handleOnChangeUsername = (event) => {
        this.setState({
            username: event.target.value
        });
    }

    handleOnChangePassword = (event) => {
        this.setState({
            password: event.target.value
        });
    }

    handleLogin = async () => {
        this.setState({
            errMessage: ''
        });
        try {
            let data = await handleLogin(this.state.username, this.state.password)
            if (data && data.errCode !== 0) {
                this.setState({
                    errMessage: data.message
                })

            }
            if (data && data.errCode === 0) {
                this.setState({
                    errMessage: ''
                })
                this.props.userLoginSuccess(data.userData);
            }
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message) {
                this.setState({
                    errMessage: error.response.data.message
                })
            }
        }
    }

    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        });
    }

    render() {
        return (
            <div className='login-background'>
                <div className="login-container">
                    <div className="login-content row">
                        <div className="col-12 login-title">
                            Login
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Username:</label>
                            <input type='text' className='form-control ' onChange={(event) => { this.handleOnChangeUsername(event) }} value={this.state.username} placeholder='Enter your usename' />
                        </div>
                        <div className='col-12 form-group login-input'>
                            <label>Password:</label>
                            <div className='custom-input-password'>
                                <input type={this.state.isShowPassword ? 'text' : 'password'} className='form-control ' onChange={(event) => { this.handleOnChangePassword(event) }} value={this.state.password} placeholder='Enter your password' />
                                <span onClick={() => this.handleShowHidePassword()}>
                                    <i className={this.state.isShowPassword ? "far fa-eye " : "far fa-eye-slash"} ></i>
                                </span>
                            </div>
                        </div>
                        <div className='col-12' style={{ color: 'red', textAlign: 'center' }}>
                            {this.state.errMessage}
                        </div>
                        <div className='col-12 btn-login'>
                            <button className='btn btn-primary' onClick={() => { this.handleLogin() }}>Login</button>
                        </div>
                        <div className='col-12 forgot-password'>
                            <span> Forgot your password? </span>
                        </div>
                        <div className='col-12 text-other-login'>
                            <span>Or login with: </span>
                        </div>
                        <div className='col-12 login-social'>
                            <i className="fab fa-google-plus-g google"></i>
                            <i className="fab fa-facebook-f facebook"></i>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
