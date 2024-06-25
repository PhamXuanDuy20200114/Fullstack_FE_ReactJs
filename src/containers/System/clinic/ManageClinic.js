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
import './ManageClinic.scss';
import { createNewClinic } from '../../../services/clinicService';
import { toast } from 'react-toastify';
const mdParser = new MarkdownIt();

class ManageClinic extends Component {


    constructor(props) {
        super(props);
        this.state = {
            name: '',
            imageLogo: '',
            previewImgLogoURL: '',
            imageBackground: '',
            previewImgBackgroundURL: '',
            address: '',
            introHTML: '',
            introMarkdown: '',
            expertiseHTML: '',
            expertiseMarkdown: '',
            equipmentHTML: '',
            equipmentMarkdown: '',
            processHTML: '',
            processMarkdown: '',
            priceHTML: '',
            priceMarkdown: '',
            isOpen: false,
            isBackground: false,
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeFile = async (e, name) => {
        let file = e.target.files[0];
        if (file) {
            let base64 = await CommonUtils.getBase64(file);
            let objectUrl = URL.createObjectURL(file);
            if (name === 'logo') {
                this.setState({
                    previewImgLogoURL: objectUrl,
                    imageLogo: base64
                });
            }
            if (name === 'background') {
                this.setState({
                    previewImgBackgroundURL: objectUrl,
                    imageBackground: base64
                });
            }
        }
    }

    isOpenHandle = (name) => {
        if (name === 'previewImgLogoURl') {
            if (this.state.previewImgLogoURL === '') {
                return;
            }
            this.setState({
                isOpen: true,
                isBackground: false
            });
        }
        if (name === 'previewImgBackgroundURl') {
            if (this.state.previewImgBackgroundURL === '') {
                return;
            }
            this.setState({
                isOpen: true,
                isBackground: true
            });
        }
    }

    handleOnChange = (e, name) => {
        let value = e.target.value;
        this.setState({
            [name]: value
        });
    }

    handleEditorChangeIntro = ({ html, text }) => {

        this.setState({
            introHTML: html,
            introMarkdown: text
        });

    }

    handleEditorChangeEquipment = ({ html, text }) => {
        this.setState({
            equipmentHTML: html,
            equipmentMarkdown: text
        });
    }

    handleEditorChangeExpertise = ({ html, text }) => {
        this.setState({
            expertiseHTML: html,
            expertiseMarkdown: text
        });
    }

    handleEditorChangeProcess = ({ html, text }) => {
        this.setState({
            processHTML: html,
            processMarkdown: text
        });
    }

    handleEditorChangePrice = ({ html, text }) => {
        this.setState({
            priceHTML: html,
            priceMarkdown: text
        });
    }

    handleSaveClinic = async () => {
        let { name, imageLogo, imageBackground, address, introHTML, introMarkdown, expertiseHTML, expertiseMarkdown
            , equipmentHTML, equipmentMarkdown, processHTML, processMarkdown, priceHTML, priceMarkdown
        } = this.state;
        let data = {
            name,
            imageLogo,
            imageBackground,
            address,
            introHTML,
            introMarkdown,
            expertiseHTML,
            expertiseMarkdown,
            equipmentHTML,
            equipmentMarkdown,
            processHTML,
            processMarkdown,
            priceHTML,
            priceMarkdown
        }
        let res = await createNewClinic(data);
        if (res && res.errCode === 0) {
            toast.success('Create new specialty success!');
            this.setState({
                name: '',
                imageLogo: '',
                imageBackground: '',
                address: '',
                previewImgLogoURL: '',
                previewImgBackgroundURL: '',
                introHTML: '',
                introMarkdown: '',
                expertiseHTML: '',
                expertiseMarkdown: '',
                equipmentHTML: '',
                equipmentMarkdown: '',
                processHTML: '',
                processMarkdown: '',
                priceHTML: '',
                priceMarkdown: '',
            });
        } else {
            toast.error('Create new specialty failed!');
        }
    }

    render() {
        const { name, address, introMarkdown, equipmentMarkdown,
            expertiseMarkdown, processMarkdown, priceMarkdown } = this.state;
        return (
            <div className='manage-clinic-container row'>
                <div className='title'>
                    <FormattedMessage id='manageclinic.manage-clinic'></FormattedMessage>
                </div>
                <div className='content-top col-12'>
                    <div className='col-4 form-group'>
                        <label><FormattedMessage id='manageclinic.name'></FormattedMessage> </label>
                        <input type='text' className='form-control' value={name} onChange={(e) => this.handleOnChange(e, 'name')} />
                    </div>
                    <div className='col-7 form-group'>
                        <label><FormattedMessage id='manageclinic.address'></FormattedMessage> </label>
                        <input type='text' className='form-control' value={address} onChange={(e) => this.handleOnChange(e, 'address')} />
                    </div>
                    <div className='col-4 form-group upload-img'>
                        <input type='file' id='previewImgLogo' className='form-control' hidden
                            onChange={(e) => { this.handleOnChangeFile(e, 'logo') }} />
                        <label className='upload-btn' htmlFor='previewImgLogo' >
                            <span><FormattedMessage id='manageclinic.image-logo'></FormattedMessage></span>
                            <span><i className='fas fa-upload'></i></span>
                        </label>
                        <div className='preview-img'
                            style={{ backgroundImage: `url(${this.state.previewImgLogoURL})` }}
                            onClick={() => this.isOpenHandle('previewImgLogoURl')}></div>
                    </div>
                    <div className='col-4 form-group upload-img'>
                        <input type='file' id='previewImgBackground' className='form-control' hidden
                            onChange={(e) => { this.handleOnChangeFile(e, 'background') }} />
                        <label className='upload-btn' htmlFor='previewImgBackground' >
                            <span><FormattedMessage id='manageclinic.image-background'></FormattedMessage></span>
                            <span><i className='fas fa-upload'></i></span>
                        </label>
                        <div className='preview-img'
                            style={{ backgroundImage: `url(${this.state.previewImgBackgroundURL})` }}
                            onClick={() => this.isOpenHandle('previewImgBackgroundURl')}></div>
                    </div>

                </div>
                <div className='content-bottom'>
                    <div className='markdown-item'>
                        <label><FormattedMessage id='manageclinic.intro'></FormattedMessage></label>
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChangeIntro}
                            value={introMarkdown}
                        />
                    </div>
                    <div className='markdown-item'>
                        <label><FormattedMessage id='manageclinic.expertise'></FormattedMessage></label>
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChangeExpertise}
                            value={expertiseMarkdown}
                        />
                    </div>

                    <div className='markdown-item'>
                        <label><FormattedMessage id='manageclinic.equip'></FormattedMessage></label>
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChangeEquipment}
                            value={equipmentMarkdown}
                        />
                    </div>
                    <div className='markdown-item'>
                        <label><FormattedMessage id='manageclinic.process'></FormattedMessage></label>
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChangeProcess}
                            value={processMarkdown}
                        />
                    </div>
                    <div className='markdown-item'>
                        <label><FormattedMessage id='manageclinic.price'></FormattedMessage></label>
                        <MdEditor
                            style={{ height: "300px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChangePrice}
                            value={priceMarkdown}
                        />
                    </div>
                </div>
                <button type='submit' className={this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-warning' : 'btn btn-primary'} onClick={() => this.handleSaveClinic()}>
                    {this.state.action === CRUD_ACTIONS.EDIT ? <FormattedMessage id='manageclinic.save-change'></FormattedMessage> : <FormattedMessage id='manageclinic.save'></FormattedMessage>}
                </button>
                {this.state.isOpen && this.state.isBackground &&
                    <Lightbox
                        mainSrc={this.state.previewImgBackgroundURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                }
                {this.state.isOpen && !this.state.isBackground &&
                    <Lightbox
                        mainSrc={this.state.previewImgLogoURL}
                        onCloseRequest={() => this.setState({ isOpen: false })}

                    />
                }
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageClinic);
