import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import './Service.scss';

class Service extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }



    render() {
        return (
            <React.Fragment>

                <div className='service-container'>
                    <div className='service-title'>
                        <FormattedMessage id='homeservice.comprehensive-service'></FormattedMessage>
                    </div>
                    <div className='option'>
                        <div className='option-child'>
                            <i className="far fa-hospital"></i>
                            <div className='option-name'><FormattedMessage id='homeservice.check-by-specialty'></FormattedMessage></div>
                        </div>
                        <div className='option-child'>
                            <i className="fas fa-mobile-alt"></i>
                            <div className='option-name'><FormattedMessage id='homeservice.remote-check'></FormattedMessage></div>
                        </div>
                        <div className='option-child'>
                            <i className="fas fa-procedures"></i>
                            <div className='option-name'><FormattedMessage id='homeservice.general-check'></FormattedMessage></div>
                        </div>
                        <div className='option-child'>
                            <i className="fas fa-vial"></i>
                            <div className='option-name'><FormattedMessage id='homeservice.medical-testing'></FormattedMessage></div>
                        </div>
                        <div className='option-child'>
                            <i className="fas fa-user-md"></i>
                            <div className='option-name'><FormattedMessage id='homeservice.mental-health'></FormattedMessage></div>
                        </div>
                        <div className='option-child'>
                            <i class="fas fa-stethoscope"></i>
                            <div className='option-name'><FormattedMessage id='homeservice.dental-check'></FormattedMessage></div>
                        </div>

                    </div>
                </div>

            </React.Fragment>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);
