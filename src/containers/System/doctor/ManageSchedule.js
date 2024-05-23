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

import './ManageSchedule.scss';
import { has, update } from 'lodash';

const mdParser = new MarkdownIt();

class ManageSchedule extends Component {


    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }


    render() {
        return (
            <div className='manage-doctor-container'>
                Manage Schedule
            </div >
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
