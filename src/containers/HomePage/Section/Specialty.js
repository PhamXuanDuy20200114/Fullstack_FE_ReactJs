import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils/constant';
import actionTypes from '../../../store/actions/actionTypes';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css"

class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {

        const properties = {
            slidesToScroll: 3,
            infinite: true,
            slidesToShow: 3,
            dots: false,
        }
        return (
            <React.Fragment>
                <div className='section-container'>
                    <div className='section-content'>
                        <div className='section-title'>
                            <span ><FormattedMessage id='specialty.specialty'></FormattedMessage></span>
                            <span ><button><FormattedMessage id='local.more'></FormattedMessage></button></span>
                        </div>
                        <div className='slider-container'>
                            <Slider {...properties}>

                            </Slider>
                        </div>
                    </div>
                </div>

            </React.Fragment >
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
