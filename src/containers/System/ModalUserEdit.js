import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { create } from 'lodash';
import emitter from '../../utils/emitter';
import lodash from 'lodash';
class ModalUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: ''
        }
    }

    componentDidMount() {
        console.log(this.props)
        if (this.props.userEdit && !lodash.isEmpty(this.props.userEdit)) {
            this.setState({
                id: this.props.userEdit.id,
                email: this.props.userEdit.email,
                password: this.props.userEdit.password,
                firstName: this.props.userEdit.firstName,
                lastName: this.props.userEdit.lastName,
                address: this.props.userEdit.address
            })
        }
    }

    toggle = () => {
        this.props.toggle();
    }

    handaleOnchangeInput = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleEditUser = () => {
        this.props.updateByService(this.state);
    }

    render() {
        return (
            console.log('state', this.state),
            <div>
                <Modal
                    isOpen={this.props.isOpenModal}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered="true"
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
                                <input type="email" name='email' disabled='true' onChange={(event) => this.handaleOnchangeInput(event)} value={this.state.email} className="form-control" />
                            </div>
                            <div className="input-container">
                                <label>Password</label>
                                <input type="password" disabled='true' onChange={(event) => this.handaleOnchangeInput(event)} value={this.state.password} className="form-control" />
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
                        <Button color="primary" className='modal-btn' onClick={() => this.handleEditUser()}>
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
