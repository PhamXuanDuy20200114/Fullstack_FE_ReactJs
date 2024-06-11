import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_ACTIONS } from '../../../utils';
import * as action from '../../../store/actions/adminAction';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getDetailDoctor, getExtraInfoDoctor } from '../../../services/doctorService';

import Select from 'react-select'

import './ManageDoctor.scss';
import { has, update } from 'lodash';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {

            listDoctors: [],
            selectedDoctor: null,

            listPrices: [],
            selectedPrice: null,
            listProvinces: [],
            selectedProvince: null,
            listPayments: [],
            selectedPayment: null,

            clinicName: '',
            addressClinic: '',
            note: '',

            contentMarkdown: '',
            contentHTML: '',
            description: '',
            action: CRUD_ACTIONS.CREATE
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
        this.props.fetchAllDoctorPrices();
        this.props.fetchAllProvinces();
        this.props.fetchAllPayment();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            const listDoctors = this.buildSelectOption(this.props.doctors, 'USER');
            this.setState({ listDoctors: listDoctors });
        }
        if (prevProps.doctorPrices !== this.props.doctorPrices) {
            const listPrices = this.buildSelectOption(this.props.doctorPrices, 'PRICE');
            this.setState({ listPrices: listPrices });
        }
        if (prevProps.doctorProvinces !== this.props.doctorProvinces) {
            const listProvinces = this.buildSelectOption(this.props.doctorProvinces, 'PROVINCE');
            this.setState({ listProvinces: listProvinces });
        }
        if (prevProps.doctorPayments !== this.props.doctorPayments) {
            const listPayments = this.buildSelectOption(this.props.doctorPayments, 'PAYMENT');
            this.setState({ listPayments: listPayments });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });
    }

    handleChangeDoctor = async selectedDoctor => {
        this.setState({ selectedDoctor });
        let res = await getDetailDoctor(selectedDoctor.value);
        let resExtra = await getExtraInfoDoctor(selectedDoctor.value);
        if (res && res.errCode === 0 && res.data && res.data.doctorData) {
            this.setState({
                contentMarkdown: res.data.doctorData.contentMarkdown,
                contentHTML: res.data.doctorData.contentHTML,
                description: res.data.doctorData.description,
                action: CRUD_ACTIONS.EDIT,
            });
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
            });
        }
        if (resExtra && resExtra.errCode === 0 && resExtra.data) {
            let selectedPrice = this.props.language === languages.EN ? { value: resExtra.data.priceId, label: resExtra.data.priceData.valueEn + '$' } : { value: resExtra.data.priceId, label: resExtra.data.priceData.valueVi + ' VND' };
            let selectedProvince = this.props.language === languages.EN ? { value: resExtra.data.provinceId, label: resExtra.data.provinceData.valueEn } : { value: resExtra.data.provinceId, label: resExtra.data.provinceData.valueVi };
            let selectedPayment = this.props.language === languages.EN ? { value: resExtra.data.paymentId, label: resExtra.data.paymentData.valueEn } : { value: resExtra.data.paymentId, label: resExtra.data.paymentData.valueVi };
            this.setState({
                selectedPrice: selectedPrice,
                selectedProvince: selectedProvince,
                selectedPayment: selectedPayment,
                clinicName: resExtra.data.clinicName,
                addressClinic: resExtra.data.addressClinic,
                note: resExtra.data.note,
            })
        }
    }

    handleChange = (selectedOption, optionName) => {
        this.setState({ [optionName.name]: selectedOption });
    }

    buildSelectOption = (list, type) => {
        let result = [];
        if (type === 'USER') {
            if (list) {
                if (this.props.language === languages.EN) {
                    for (let doctor of list) {
                        result.push({
                            value: doctor.id,
                            label: doctor.firstName + ' ' + doctor.lastName
                        });
                    }
                }
                else {
                    for (let doctor of list) {
                        result.push({
                            value: doctor.id,
                            label: doctor.lastName + ' ' + doctor.firstName
                        });
                    }
                }
            }
        }
        if (type === 'PRICE') {
            if (list) {
                for (let item of list) {
                    result.push({
                        value: item.keyMap,
                        label: this.props.language === languages.EN ? item.valueEn + '$' : item.valueVi + ' Đ'
                    });
                }
            }
        }
        if (type === 'PROVINCE' || type === 'PAYMENT') {
            if (list) {
                for (let item of list) {
                    result.push({
                        value: item.keyMap,
                        label: this.props.language === languages.EN ? item.valueEn : item.valueVi
                    });
                }
            }

        }
        return result;
    }

    handleOnChangeInput = (e, name) => {
        this.setState({ [name]: e.target.value });
    }

    handleOnClick = () => {
        const { addressClinic, clinicName, note, selectedPrice, selectedPayment, selectedProvince, selectedDoctor, contentMarkdown, contentHTML, description } = this.state;
        let data = {
            doctorId: selectedDoctor.value,
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
            priceId: selectedPrice.value,
            provinceId: selectedProvince.value,
            paymentId: selectedPayment.value,
            clinicName: clinicName,
            addressClinic: addressClinic,
            note: note
        }
        if (this.state.action === CRUD_ACTIONS.EDIT) {
            this.props.updateDetailDoctor(data);
        } else {
            this.props.saveDetailDoctor(data);
        }

        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedDoctor: null,
            description: '',
            selectedPrice: null,
            selectedProvince: null,
            selectedPayment: null,
            clinicName: '',
            addressClinic: '',
            note: '',
            action: CRUD_ACTIONS.CREATE
        });

    }
    render() {
        const { clinicName, addressClinic, selectedDoctor, selectedPrice, selectedProvince, selectedPayment, listDoctors, action, listPrices, listPayments, listProvinces } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='title'><FormattedMessage id='managedoctor.add-new-info'></FormattedMessage></div>

                <div className='more-info'>
                    <div className='content-left'>
                        <label><FormattedMessage id='managedoctor.doctor'></FormattedMessage></label>
                        <Select
                            value={selectedDoctor}
                            onChange={this.handleChangeDoctor}
                            options={listDoctors}
                            className='form-control'
                            placeholder={this.props.language === languages.EN ? 'Choose doctor' : 'Chọn bác sĩ'}
                        />

                    </div>
                    <div className='content-right'>
                        <label ><FormattedMessage id='managedoctor.add-intro-info'></FormattedMessage></label>
                        <textarea className='form-control'
                            rows={4}
                            value={this.state.description}
                            onChange={(e) => this.handleOnChangeInput(e, 'description')}
                        >
                        </textarea>
                    </div>
                </div>

                <div className='doctor-info-edit row '>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id='managedoctor.price'></FormattedMessage></label>
                        <Select
                            value={selectedPrice}
                            onChange={this.handleChange}
                            options={listPrices}
                            className='form-control'
                            name={'selectedPrice'}
                            placeholder={this.props.language === languages.VI ? 'Chọn giá khám' : 'Choose price'} />
                    </div>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id='managedoctor.province'></FormattedMessage></label>
                        <Select
                            value={selectedProvince}
                            onChange={this.handleChange}
                            options={listProvinces}
                            className='form-control'
                            name='selectedProvince'
                            placeholder={this.props.language === languages.VI ? 'Chọn tỉnh thành' : 'Choose province'} />
                    </div>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id='managedoctor.payment'></FormattedMessage></label>
                        <Select
                            value={selectedPayment}
                            onChange={this.handleChange}
                            options={listPayments}
                            className='form-control'
                            name='selectedPayment'
                            placeholder={this.props.language === languages.VI ? 'Chọn phương thức thanh toán' : 'Choose payment'} />
                    </div>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id='managedoctor.clinic-name'></FormattedMessage></label>
                        <input type='text' className='form-control' value={clinicName} onChange={(e) => this.handleOnChangeInput(e, 'clinicName')} />
                    </div>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id='managedoctor.clinic-address'></FormattedMessage></label>
                        <input type='text' className='form-control' value={addressClinic} onChange={(e) => this.handleOnChangeInput(e, 'addressClinic')} />
                    </div>
                    <div className='form-group col-4'>
                        <label><FormattedMessage id='managedoctor.note'></FormattedMessage></label>
                        <textarea className='form-control'
                            rows={4}
                            value={this.state.note}
                            onChange={(e) => this.handleOnChangeInput(e, 'note')} />
                    </div>
                </div>

                <div className='manage-doctor-editer'>
                    <MdEditor
                        style={{ height: "500px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={this.state.contentMarkdown}
                    />
                </div>
                <button
                    className={action === CRUD_ACTIONS.CREATE ? 'save-content-doctor' : 'change-content-doctor'} onClick={() => this.handleOnClick()}>
                    {action === CRUD_ACTIONS.EDIT
                        ? <span><FormattedMessage id='manageuser.save-change'></FormattedMessage></span>
                        : <span><FormattedMessage id='manageuser.save'></FormattedMessage></span>
                    }
                </button>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctors: state.admin.doctors,
        doctorPrices: state.admin.prices,
        doctorProvinces: state.admin.provinces,
        doctorPayments: state.admin.payments,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(action.fetchAllDoctorStart()),
        fetchAllDoctorPrices: () => dispatch(action.fetchAllPrice()),
        fetchAllProvinces: () => dispatch(action.fetchAllProvince()),
        fetchAllPayment: () => dispatch(action.fetchAllPayment()),
        saveDetailDoctor: (data) => dispatch(action.saveDetailDoctorStart(data)),
        updateDetailDoctor: (data) => dispatch(action.updateInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
