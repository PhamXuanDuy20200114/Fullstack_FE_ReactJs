import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_ACTIONS } from '../../../utils';
import * as action from '../../../store/actions/adminAction';
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite';
import 'react-markdown-editor-lite/lib/index.css';
import { getDetailDoctor, getExtraInfoDoctor } from '../../../services/doctorService';
import { CommonUtils } from '../../../utils';
import Lightbox from 'react-image-lightbox';
import './ManageSpecialty.scss';
import { createNewSpecialty } from '../../../services/specialtyService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            image: '',
            previewImgURL: '',
            descriptionHTML: '',
            descriptionMarkdown: '',
            isOpen: false,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeFile = async (e) => {
        let file = e.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
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

    handleOnChange = (e, name) => {
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    handleEditorChange = ({ html, text }) => {
        this.setState({
            descriptionMarkdown: text,
            descriptionHTML: html
        });
    }

    handleSaveSpecialty = async () => {
        let { name, image, descriptionHTML, descriptionMarkdown } = this.state;
        let data = {
            name,
            image,
            descriptionHTML,
            descriptionMarkdown
        }
        let res = await createNewSpecialty(data);
        if (res && res.errCode === 0) {
            toast.success('Create new specialty success!');
            this.setState({
                name: '',
                image: '',
                previewImgURL: '',
                descriptionHTML: '',
                descriptionMarkdown: ''
            });
        } else {
            toast.error('Create new specialty failed!');
        }
    }

    render() {
        console.log('check state', this.state)
        const { name, image, descriptionHTML, descriptionMarkdown } = this.state;
        return (
            <div className='manage-specialty-container row'>
                <div className='title'>
                    <FormattedMessage id='managespecialty.manage-specialty'></FormattedMessage>
                </div>
                <div className='content-top col-12'>
                    <div className='col-6 form-group'>
                        <label><FormattedMessage id='managespecialty.name'></FormattedMessage> </label>
                        <input type='text' className='form-control' value={name} onChange={(e) => this.handleOnChange(e, 'name')} />
                    </div>
                    <div className='col-6 form-group upload-img'>
                        <input type='file' id='previewImg' className='form-control' hidden
                            onChange={(e) => { this.handleOnChangeFile(e) }} />
                        <label className='upload-btn' htmlFor='previewImg' >
                            <span><FormattedMessage id='managespecialty.image'></FormattedMessage></span>
                            <span><i className='fas fa-upload'></i></span>
                        </label>
                        <div className='preview-img'
                            style={{ backgroundImage: `url(${this.state.previewImgURL})` }}
                            onClick={() => this.isOpenHandle()}></div>
                    </div>
                </div>
                <div className='content-bottom'>
                    <label><FormattedMessage id='manageclinic.description'></FormattedMessage></label>
                    <MdEditor
                        style={{ height: "300px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                        value={descriptionMarkdown}
                    />
                </div>
                <button type='submit' className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'} onClick={() => this.handleSaveSpecialty()}>
                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id='managespecialty.save-change'></FormattedMessage> : <FormattedMessage id='managespecialty.save'></FormattedMessage>}
                </button>
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

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
