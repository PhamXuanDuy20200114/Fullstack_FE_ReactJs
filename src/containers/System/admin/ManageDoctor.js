import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_ACTIONS } from '../../../utils';
import * as action from '../../../store/actions/adminAction';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getDetailDoctor } from '../../../services/doctorService';

import Select from 'react-select'

import './ManageDoctor.scss';
import { has, update } from 'lodash';

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: null,
            description: '',
            action: CRUD_ACTIONS.CREATE
        }
    }

    componentDidMount() {
        this.props.fetchAllDoctors();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({ listDoctors: this.props.doctors });
        }
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentMarkdown: text,
            contentHTML: html
        });
    }

    handleChange = async selectedOption => {
        this.setState({ selectedOption });
        let res = await getDetailDoctor(selectedOption.value);
        if (res && res.errCode === 0 && res.data && res.data.doctorData) {
            this.setState({
                contentMarkdown: res.data.doctorData.contentMarkdown,
                contentHTML: res.data.doctorData.contentHTML,
                description: res.data.doctorData.description,
                action: CRUD_ACTIONS.EDIT,
            });
            console.log('change', this.state.hasChange);
        } else {
            this.setState({
                contentMarkdown: '',
                contentHTML: '',
                description: '',
            });
        }
    }

    buildSelectOption = (listDoctors) => {
        let result = [];
        if (listDoctors) {
            if (this.props.language === languages.EN) {
                for (let doctor of listDoctors) {
                    result.push({
                        value: doctor.id,
                        label: doctor.firstName + ' ' + doctor.lastName
                    });
                }
            }
            else {
                for (let doctor of listDoctors) {
                    result.push({
                        value: doctor.id,
                        label: doctor.lastName + ' ' + doctor.firstName
                    });
                }
            }
        }
        return result;
    }

    handleOnChangeDescription = (e) => {
        this.setState({ description: e.target.value });
        console.log('description', this.state.description);
    }

    handleOnClick = () => {
        const { selectedOption, contentMarkdown, contentHTML, description } = this.state;
        let data = {
            doctorId: selectedOption.value,
            contentHTML: contentHTML,
            contentMarkdown: contentMarkdown,
            description: description,
        }
        if (this.state.action === CRUD_ACTIONS.EDIT) {
            this.props.updateDetailDoctor(data);
        } else {
            this.props.saveDetailDoctor(data);
        }

        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: null,
            description: '',
            action: CRUD_ACTIONS.CREATE
        });

    }
    render() {
        const { selectedOption, listDoctors, action } = this.state;
        return (
            <div className='manage-doctor-container'>
                <div className='title'>THÊM THÔNG TIN DOCTORS</div>

                <div className='more-info form-group'>
                    <div className='content-left'>
                        <label>Chọn bác sĩ:</label>
                        <Select
                            value={selectedOption}
                            onChange={this.handleChange}
                            options={this.buildSelectOption(listDoctors)}
                            className='form-control' />

                    </div>
                    <div className='content-right'>
                        <label >Thêm thông tin giới thiệu:</label>
                        <textarea className='form-control'
                            rows={4}
                            value={this.state.description}
                            onChange={(e) => this.handleOnChangeDescription(e)}
                        >
                        </textarea>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(action.fetchAllDoctorStart()),
        saveDetailDoctor: (data) => dispatch(action.saveDetailDoctorStart(data)),
        updateDetailDoctor: (data) => dispatch(action.updateInfoDoctor(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
