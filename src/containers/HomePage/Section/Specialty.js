import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils/constant';
import actionTypes from '../../../store/actions/actionTypes';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css"
import { getAllSpecialties } from '../../../services/specialtyService';
import { withRouter } from 'react-router-dom';
class Specialty extends Component {

    constructor(props) {
        super(props);
        this.state = {
            specialties: []
        };
    }

    async componentDidMount() {
        let response = await getAllSpecialties();
        if (response && response.data) {
            this.setState({
                specialties: response.data
            });
        }
    }

    handleViewDetailSpecialty = (specialty) => {
        console.log('specialty', specialty)
        this.props.history.push(`/detail-specialty/${specialty.id}`);
    }

    render() {
        const properties = {
            slidesToScroll: 3,
            infinite: false,
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
                                {this.state.specialties && this.state.specialties.length > 0
                                    && this.state.specialties.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                        }
                                        return (
                                            <div className='specialty-slide' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                                <div className='specialty-image' style={{ background: `url(${imageBase64})` }}>
                                                </div>
                                                <div className='specialty-name'>
                                                    <span>{item.name}</span>
                                                </div>
                                            </div>
                                        )
                                    })}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Specialty));
