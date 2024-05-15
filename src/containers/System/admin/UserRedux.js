import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import TableUser from './TableUser';
import { languages, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as action from '../../../store/actions/adminAction';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss';
import { stringify } from 'react-auth-wrapper/helpers';

class UserRedux extends Component {

    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            positions: [],
            roles: [],
            previewImgURL: '',
            isOpen: false,

            //user
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            phoneNumber: '',
            address: '',
            gender: '',
            position: '',
            role: '',
            image: '',
            userEditId: '',
            action: ''
        }
    }

    componentDidMount() {
        this.props.fetchGenderStart();
        this.props.fetchPositionStart();
        this.props.fetchRoleStart();
        // try {
        //     let resGender = await getAllCode('gender');
        //     let resPosition = await getAllCode('position');
        //     let resRole = await getAllCode('role');
        //     this.setState({
        //         gender: resGender.data,
        //         position: resPosition.data,
        //         role: resRole.data
        //     });
        // } catch (error) {
        //     console.log('error', error);
        // }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.genders !== this.props.genders) {
            let arrGender = this.props.genders;
            this.setState({
                genders: arrGender,
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : ''
            })
        }
        if (prevProps.positions !== this.props.positions) {
            let arrPosition = this.props.positions;
            this.setState({
                positions: arrPosition,
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : ''
            })
        }
        if (prevProps.roles !== this.props.roles) {
            let arrRole = this.props.roles;
            this.setState({
                roles: arrRole,
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : ''
            })
        }

        if (prevProps.users !== this.props.users) {
            let arrGender = this.props.genders;
            let arrRole = this.props.roles;
            let arrPosition = this.props.positions;
            this.setState({
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                phoneNumber: '',
                address: '',
                gender: arrGender && arrGender.length > 0 ? arrGender[0].keyMap : '',
                position: arrPosition && arrPosition.length > 0 ? arrPosition[0].keyMap : '',
                role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : '',
                image: '',
                userEditId: '',
                previewImgURL: '',
                action: CRUD_ACTIONS.CREATE
            })
        }

    }

    handleOnChangeFile = async (e) => {
        let file = e.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            console.log('check base64', base64)
            let objectUrl = URL.createObjectURL(file);
            this.setState({
                previewImgURL: objectUrl,
                image: base64
            });
        }
    }

    isOpenHandle = () => {
        if (this.state.previewImgURL === '') {
            return;
        }
        this.setState({
            isOpen: true
        });
    }

    handleOnChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    checkValidateInput = () => {
        let isValid = true;
        let arrInput = ['email', 'password', 'firstName', 'lastName',
            'phoneNumber', 'address', 'gender', 'position', 'role'];
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Please input: ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleSaveUser = () => {
        if (this.state.action !== CRUD_ACTIONS.EDIT) {
            let isValid = this.checkValidateInput();
            if (!isValid) {
                console.log('Not valid')
                return;
            }
            let data = {};
            data.email = this.state.email;
            data.password = this.state.password;
            data.firstName = this.state.firstName;
            data.lastName = this.state.lastName;
            data.phoneNumber = this.state.phoneNumber;
            data.address = this.state.address;
            data.gender = this.state.gender;
            data.position = this.state.position;
            data.role = this.state.role;
            data.image = this.state.image;
            this.props.createNewUser(data);
        } else {
            let data = {};
            data.email = this.state.email;
            data.password = this.state.password;
            data.firstName = this.state.firstName;
            data.lastName = this.state.lastName;
            data.phoneNumber = this.state.phoneNumber;
            data.address = this.state.address;
            data.gender = this.state.gender;
            data.position = this.state.position;
            data.role = this.state.role;
            data.id = this.state.userEditId;
            data.image = this.state.image;
            data.previewImgURL = this.state.previewImgURL;
            console.log('data', data)
            this.props.editUser(data);
        }

    }

    editUser = (user) => {
        let imageBase64 = ''
        if (user.image) {
            imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
        }
        console.log('check image', imageBase64, user.image)

        this.setState({
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            phoneNumber: user.phonenumber,
            gender: user.gender,
            position: user.positionId,
            role: user.roleId,
            userEditId: user.id,
            image: '',
            previewImgURL: imageBase64,
            action: CRUD_ACTIONS.EDIT
        })
    }

    render() {
        let genders = this.state.genders;
        let positions = this.state.positions;
        let roles = this.state.roles;

        //user
        let { email, password, firstName, lastName,
            phoneNumber, address, role, position, gender, image } = this.state;

        return (

            <div className="user-redux-container">
                <div className='title'>
                    USER MANAGEMENT WITH REDUX
                </div>
                <div className='user-redux-body'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12 add-user'><FormattedMessage id='manageuser.add'></FormattedMessage></div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manageuser.email'></FormattedMessage></label>
                                <input type='text' name='email' disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} className='form-control' onChange={(e) => { this.handleOnChange(e) }} value={email} placeholder='' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manageuser.password'></FormattedMessage></label>
                                <input type='password' name='password' disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false} className='form-control' onChange={(e) => this.handleOnChange(e)} value={password} placeholder='' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manageuser.first-name'></FormattedMessage></label>
                                <input type='text' name='firstName' className='form-control' onChange={(e) => this.handleOnChange(e)} value={firstName} placeholder='' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manageuser.last-name'></FormattedMessage></label>
                                <input type='text' name='lastName' className='form-control' onChange={(e) => this.handleOnChange(e)} value={lastName} placeholder='' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manageuser.phone'></FormattedMessage></label>
                                <input type='text' name='phoneNumber' className='form-control' onChange={(e) => this.handleOnChange(e)} value={phoneNumber} placeholder='' />
                            </div>
                            <div className='col-9'>
                                <label><FormattedMessage id='manageuser.address'></FormattedMessage></label>
                                <input type='text' name='address' className='form-control' onChange={(e) => this.handleOnChange(e)} value={address} placeholder='' />
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manageuser.gender'></FormattedMessage></label>
                                <select className='form-control' value={gender} name='gender' onChange={(e) => this.handleOnChange(e)}>
                                    {genders && genders.length > 0 &&
                                        genders.map((item, index) => {
                                            return <option key={index} value={item.keyMap}>{this.props.language === languages.VI ? item.valueVi : item.valueEn}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manageuser.position'></FormattedMessage></label>
                                <select className='form-control' value={position} name='position' onChange={(e) => this.handleOnChange(e)}>
                                    {positions && positions.length > 0 &&
                                        positions.map((item, index) => {
                                            return <option key={index} value={item.keyMap}>{this.props.language === languages.VI ? item.valueVi : item.valueEn}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manageuser.role' ></FormattedMessage></label>
                                <select className='form-control' value={role} name='role' onChange={(e) => this.handleOnChange(e)}>
                                    {roles && roles.length > 0 &&
                                        roles.map((item, index) => {
                                            return <option key={index} value={item.keyMap}>{this.props.language === languages.VI ? item.valueVi : item.valueEn}</option>
                                        })
                                    }
                                </select>
                            </div>
                            <div className='col-3'>
                                <label><FormattedMessage id='manageuser.image'></FormattedMessage></label>
                                <div className='upload-img'>
                                    <input type='file' id='previewImg' className='form-control' hidden
                                        onChange={(e) => { this.handleOnChangeFile(e) }} />
                                    <label className='upload-btn' htmlFor='previewImg' ><FormattedMessage id='manageuser.choose-image'></FormattedMessage> <i className='fas fa-upload'></i></label>
                                    <div className='preview-img'
                                        style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                                        onClick={() => this.isOpenHandle()}></div>
                                </div>
                            </div>

                            <button type='submit' className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'} onClick={() => this.handleSaveUser()}>
                                {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id='manageuser.save-change'></FormattedMessage> : <FormattedMessage id='manageuser.save'></FormattedMessage>}
                            </button>
                        </div>
                        <TableUser
                            editUser={this.editUser}
                            action={this.state.action}
                        />
                    </div>
                </div>
                {this.state.isOpen &&
                    <Lightbox
                        mainSrc={this.state.previewImgURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />}
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles,
        users: state.admin.users

    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchGenderStart: () => dispatch(action.fetchGenderStart()),
        fetchPositionStart: () => dispatch(action.fetchPositionStart()),
        fetchRoleStart: () => dispatch(action.fetchRoleStart()),

        //Create new User
        createNewUser: (data) => dispatch(action.createUserStart(data)),
        //GET all users
        getAllUsers: () => dispatch(action.fetchAllUserStart()),
        editUser: (user) => dispatch(action.updateUserStart(user))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
