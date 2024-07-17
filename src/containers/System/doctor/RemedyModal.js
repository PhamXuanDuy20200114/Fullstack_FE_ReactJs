import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { connect } from 'react-redux';
import { CommonUtils } from '../../../utils';
import './RemedyModal.scss';

class RemedyModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            imageBase64: ''
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.data.email !== this.props.data.email) {
            this.setState({
                email: this.props.data.email
            })
        }

    }

    toggle = () => {
        this.props.closeRemedyModal();
    }

    handleOnChangeEmail = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangeFile = async (event) => {
        let file = event.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            this.setState({
                imageBase64: base64
            });
        }
    }

    handleSendMail = () => {
        let data = {
            email: this.state.email,
            imageBase64: this.state.imageBase64
        }
        this.props.sendRemedy(data);

        this.toggle();
    }

    render() {

        return (
            <div>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={() => this.toggle()}
                    size="lg"
                    centered={true}
                    className='modal-remery-container'
                >
                    <ModalHeader
                        toggle={() => this.toggle()}
                        className='modal-title'
                    >
                        Gửi hóa đơn khám bệnh thành công
                    </ModalHeader>
                    <ModalBody>
                        <div className='row'>
                            <div className='col-6 form-group'>
                                <label>Email bệnh nhân</label>
                                <input type='text' value={this.state.email} onChange={(e) => this.handleOnChangeEmail(e)} className='form-control' />
                            </div>
                            <div className='col-6 form-group'>
                                <label>Chọn file đơn thuốc</label>
                                <input type='file' value={this.state.file} onChange={(e) => this.handleOnChangeFile(e)} className='form-control' />
                            </div>
                        </div>

                    </ModalBody>
                    <ModalFooter className='modal-footer'>
                        <Button color="primary" className='modal-btn' onClick={() => this.handleSendMail()}>
                            <FormattedMessage id='booking.save'></FormattedMessage>
                        </Button>{' '}
                        <Button color="secondary" className='modal-btn' onClick={() => this.props.toggle()}>
                            <FormattedMessage id='booking.cancel'></FormattedMessage>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
