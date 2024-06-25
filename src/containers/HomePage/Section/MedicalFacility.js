import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils/constant';
import actionTypes from '../../../store/actions/actionTypes';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css"
import { withRouter } from 'react-router-dom';
import { getAllClinic } from '../../../services/clinicService';

class MedicalFacility extends Component {

    constructor(props) {
        super(props);
        this.state = {
            listClinic: [],

        };
    }

    async componentDidMount() {
        let response = await getAllClinic();
        if (response && response.data) {
            this.setState({
                listClinic: response.data
            });
        }
    }

    handleViewDetailSpecialty = (clinic) => {
        console.log('clinic', clinic)
        this.props.history.push(`/detail-clinic/${clinic.id}`);
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
                            <span ><FormattedMessage id='medicalfacility.medical-facility'></FormattedMessage></span>
                            <span ><button><FormattedMessage id='local.more'></FormattedMessage></button></span>
                        </div>
                        <div className='slider-container'>
                            <Slider {...properties}>
                                {this.state.listClinic && this.state.listClinic.length > 0
                                    && this.state.listClinic.map((item, index) => {
                                        let imageLogoBase64 = '';
                                        if (item.imageLogo) {
                                            imageLogoBase64 = Buffer.from(item.imageLogo, 'base64').toString('binary');
                                        }
                                        return (
                                            <div className='clinic-slide' key={index} onClick={() => this.handleViewDetailSpecialty(item)}>
                                                <div className='clinic-image' style={{ background: `url(${imageLogoBase64})` }}>
                                                </div>
                                                <div className='clinic-name'>
                                                    {item.name}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MedicalFacility));
