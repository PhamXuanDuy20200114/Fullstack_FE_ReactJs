import React, { Component } from 'react';
import './UserManage.scss';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { getAllUsers, createNewUser, updateUserService, deleteUserService } from '../../services/userService';
import ModalUser from './ModalUser';
import ModalUserEdit from './ModalUserEdit';
import emitter from '../../utils/emitter';

class UserManage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModal: false,
            isOpenModalEdit: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        await this.getAllUsersFromService();
    }

    getAllUsersFromService = async () => {
        try {
            const response = await getAllUsers('ALL');
            if (response && response.errCode === 0) {
                this.setState({
                    users: response.users
                })
                console.log('data', response.users);
            }
        } catch (error) {
            console.log(error);
        }
    }

    createNewUserByService = async (data) => {
        try {
            let response = await createNewUser(data);
            console.log('response', response);
            if (response && response.errCode !== 0) {
                alert(response.message);
            } else {
                this.toggle();
                this.getAllUsersFromService();

            }
        } catch (error) {
            console.log(error);
        }
    }

    updateByService = async (data) => {
        console.log('data', data);
        try {
            let response = await updateUserService(data);
            if (response && response.errCode === 0) {
                this.toggleEdit();
                this.getAllUsersFromService();
            } else {
                alert(response.message);
            }
        } catch (error) {
            console.log(error);
        }
    }

    handleDeleteUser = async (userId) => {
        let response = await deleteUserService(userId);
        if (response && response.errCode === 0) {
            this.getAllUsersFromService();
        } else {
            alert(response.message);
        }
    }

    handleOpenModal = () => {
        this.setState({
            isOpenModal: true
        })
    }

    handleOpenModalEdit = (user) => {
        this.setState({
            isOpenModalEdit: true,
            userEdit: user
        })
    }

    toggle = () => {
        this.setState({
            isOpenModal: !this.state.isOpenModal,
        })
    }

    toggleEdit = () => {
        this.setState({
            isOpenModalEdit: !this.state.isOpenModalEdit,
        })
    }

    render() {
        return (
            <div className="user-container">
                <ModalUser
                    isOpenModal={this.state.isOpenModal}
                    toggle={this.toggle}
                    createNewUserByService={this.createNewUserByService}
                />
                {this.state.isOpenModalEdit &&
                    <ModalUserEdit
                        isOpenModal={this.state.isOpenModalEdit}
                        toggle={this.toggleEdit}
                        userEdit={this.state.userEdit}
                        updateByService={this.updateByService}
                    />
                }

                <div className='title text-center'>MANAGE USER TABLE</div>
                <div className='m-3'>
                    <button className='btn btn-primary px-3' onClick={() => this.handleOpenModal()}><i className="fas fa-plus"></i> Add new user</button>
                </div>
                <div className=''>
                    <table className="table table-bordered table striped table-hover">
                        <thead className='bg-success'>
                            <tr>
                                <th scope="col">Email</th>
                                <th scope="col">First</th>
                                <th scope="col">Last</th>
                                <th scope="col">Address</th>
                                <th scope="col">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.users && this.state.users.length > 0 && this.state.users.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button className='btn-edit' onClick={() => this.handleOpenModalEdit(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item.id)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
