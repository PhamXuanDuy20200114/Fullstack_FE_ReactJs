import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { create } from 'lodash';
import emitter from '../../utils/emitter';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        console.log('mouting modal');
    }

    toggle = () => {
        this.props.toggle();
    }

    handaleOnchangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    checkValidateInput = () => {
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address'];
        let isValid = true;
        console.log('state', this.state);
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false;
                alert('Missing ' + arrInput[i]);
                break;
            }
        }
        return isValid;
    }

    handleAddNewUser = () => {
        if (this.checkValidateInput()) {
            this.props.createNewUserByService(this.state);
        }
    }

    render() {
        return (
            <div>
                <Modal
                    isOpen={this.props.isOpenModal}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered={true}
                    className='modal-user-container'
                >
                    <ModalHeader
                        toggle={() => this.toggle()}
                        className='modal-title'
                    >
                        Modal title
                    </ModalHeader>
                    <ModalBody>
                        <div className='modal-user-body'>
                            <div className="input-container">
                                <label>Email</label>
                                <input type="email" name='email' onChange={(event) => this.handaleOnchangeInput(event)} value={this.state.email} className="form-control" />
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input type="password" name='password' onChange={(event) => this.handaleOnchangeInput(event)} value={this.state.password} className="form-control" />
                            </div>
                            <div className="input-container">
                                <label>First name</label>
                                <input type="text" name='firstName' onChange={(event) => this.handaleOnchangeInput(event)} value={this.state.firstName} className="form-control" />
                            </div>
                            <div className="input-container">
                                <label>Last name</label>
                                <input type="text" name='lastName' onChange={(event) => this.handaleOnchangeInput(event)} value={this.state.lastName} className="form-control" />
                            </div>
                            <div className="input-container max-w">
                                <label>Address</label>
                                <input type="text" name='address' onChange={(event) => this.handaleOnchangeInput(event)} value={this.state.address} className="form-control" />
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter className='modal-footer'>
                        <Button color="primary" className='modal-btn' onClick={() => this.handleAddNewUser()}>
                            Save
                        </Button>{' '}
                        <Button color="secondary" className='modal-btn' onClick={() => this.props.toggle()}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
