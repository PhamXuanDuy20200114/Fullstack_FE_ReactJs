import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../utils/constant';
import actionTypes from '../../store/actions/actionTypes';
import { Fade } from 'react-slideshow-image';
import './Banner.scss';


class Banner extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    indicators = (index) => (
        <div className="indicator">
            <i className="fas fa-circle" ></i>
        </div>);

    render() {
        let language = this.props.language;

        return (
            <div className='home-header-banner'>
                <Fade
                    slidesToScroll={1}
                    slidesToShow={1}
                    canSwipe={false}
                    arrows={false}
                    indicators={i => this.indicators(i)}
                    transitionDuration={500}
                    duration={1000}
                >
                    <div className={'slide-1'}>
                    </div>
                    <div className={'slide-2'}>
                    </div>
                    <div className={'slide-3'}>
                    </div>
                    <div className={'slide-4'}>
                    </div>
                </Fade>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: (language) => dispatch({ type: actionTypes.CHANGE_LANGUAGE, language })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Banner);
