import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_ACTIONS } from '../../../utils';
import * as action from '../../../store/actions/adminAction';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';

import Select from 'react-select'

import './ManageDoctor.scss';

const mdParser = new MarkdownIt();
const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]

class ManageDoctor extends Component {


    constructor(props) {
        super(props);
        this.state = {
            listDoctors: [],
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: null,
            description: ''
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

    handleChange = selectedOption => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, this.state.selectedDoctor);
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
            description: description
        }
        this.props.saveDetailDoctor(data);
        this.setState({
            contentMarkdown: '',
            contentHTML: '',
            selectedOption: null,
            description: ''
        });
    }
    render() {
        const { selectedOption, listDoctors } = this.state;
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
                        renderHTML={() => mdParser.render(this.state.contentMarkdown)}
                        onChange={this.handleEditorChange} />
                </div>

                <button className='save-content-doctor' onClick={() => this.handleOnClick()}><FormattedMessage id='manageuser.save'></FormattedMessage></button>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        doctors: state.admin.doctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchAllDoctors: () => dispatch(action.fetchAllDoctorStart()),
        saveDetailDoctor: (data) => dispatch(action.saveDetailDoctorStart(data))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
