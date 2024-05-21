import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { languages, CRUD_ACTIONS } from '../../../utils';
import * as action from '../../../store/actions/adminAction';

import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite';
// import style manually
import 'react-markdown-editor-lite/lib/index.css';

import './TableUser.scss';

// Initialize a markdown parser
const mdParser = new MarkdownIt();

// Finish!
function handleEditorChange({ html, text }) {
    console.log('handleEditorChange', html, text);
}

class TableUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
        }
    }

    componentDidMount() {
        this.props.getAllUsers();;
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.users !== this.props.users) {
            this.setState({
                users: this.props.users
            })
        }

    }

    handleDeleteUser = (id) => {
        this.props.deleteUser(id)
    }

    handleEditUser = (user) => {
        this.props.editUser(user);
        console.log(user);
    }
    render() {
        //all users
        let allUsers = this.state.users;

        return (
            <React.Fragment>
                <table class="table table-bordered mg-5">
                    <thead>
                        <tr>
                            <th scope="col" className='column-1'></th>
                            <th scope="col" className='column-2'><FormattedMessage id='manageuser.email'></FormattedMessage></th>
                            <th scope="col" className='column-3'><FormattedMessage id='manageuser.first-name'></FormattedMessage></th>
                            <th scope="col" className='column-3'><FormattedMessage id='manageuser.last-name'></FormattedMessage></th>
                            <th scope="col" className='column-4'><FormattedMessage id='manageuser.address'></FormattedMessage></th>
                            <th scope='col' className='column-3'>
                                <FormattedMessage id='manageuser.action'></FormattedMessage>
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allUsers && allUsers.length > 0 &&
                            allUsers.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="row" className='column-1'>{index}</th>
                                        <td className='column-2'>{item.email}</td>
                                        <td className='column-3'>{item.firstName}</td>
                                        <td className='column-3'>{item.lastName}</td>
                                        <td className='column-4'>{item.address}</td>
                                        <td className='column-3'>
                                            <button className='btn-edit' onClick={() => this.handleEditUser(item)}><i className="fas fa-pencil-alt"></i></button>
                                            <button className='btn-delete' onClick={() => this.handleDeleteUser(item.id)}><i className="fas fa-trash"></i></button>
                                        </td>
                                    </tr>)
                            })}

                    </tbody>
                </table >
                <MdEditor
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={handleEditorChange} />
            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        users: state.admin.users
    };
};

const mapDispatchToProps = dispatch => {
    return {
        //GET all users
        getAllUsers: () => dispatch(action.fetchAllUserStart()),
        deleteUser: (id) => dispatch(action.deleteUserStart(id))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableUser);
