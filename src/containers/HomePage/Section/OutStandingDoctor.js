import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils/constant';
import actionTypes from '../../../store/actions/actionTypes';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import "slick-carousel/slick/slick-theme.css"
import * as action from '../../../store/actions';


class OutStandingDoctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            outStandingDoctor: []
        };
    }

    componentDidMount() {
        this.props.fetchTopDoctor();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({ outStandingDoctor: this.props.topDoctors });
        }
    }



    render() {

        const properties = {
            slidesToScroll: 4,
            infinite: true,
            slidesToShow: 4,
            dots: false,
        }

        let outStandingDoctor = this.state.outStandingDoctor;
        console.log('outStandingDoctor', outStandingDoctor);
        return (
            <React.Fragment>
                <div className='section-container section-doctor'>
                    <div className='section-content doctor-content'>
                        <div className='section-title doctor-title'>
                            <span ><FormattedMessage id='doctor.out-standing-doctor'></FormattedMessage></span>
                            <span ><button><FormattedMessage id='local.more'></FormattedMessage></button></span>
                        </div>
                        <div className='slider-container'>
                            <Slider {...properties}>

                                {outStandingDoctor && outStandingDoctor.length > 0
                                    && outStandingDoctor.map((item, index) => {
                                        let imageBase64 = '';
                                        if (item.image) {
                                            imageBase64 = Buffer.from(item.image, 'base64').toString('binary');
                                        }
                                        let positionVi = `${item.positionData.valueVi} ${item.lastName} ${item.firstName}`;
                                        let positionEn = `${item.positionData.valueEn} ${item.lastName} ${item.firstName}`;
                                        return (
                                            <div className='doctor-slide'>
                                                <div className='img-doctor' style={{ backgroundImage: `url('${imageBase64}')` }}></div>
                                                <div className='name'>{this.props.language === languages.VI ? positionVi : positionEn}</div>
                                                <div className='specialty'>Cơ sương khớp</div>
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
        language: state.app.language,
        topDoctors: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguage: (language) => dispatch({ type: actionTypes.CHANGE_LANGUAGE, language }),
        fetchTopDoctor: () => dispatch(action.fetchTopDoctorStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
