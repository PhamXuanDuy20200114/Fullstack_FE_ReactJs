import React, { Component } from 'react';
import { connect } from 'react-redux';

import Header from './Header';
import Service from './Section/Service';
import Specialty from './Section/Specialty';
import MedicalFacility from './Section/MedicalFacility';
import OutStandingDoctor from './Section/OutStandingDoctor';
import HandBook from './Section/HandBook';
import MentalHealth from './Section/MentalHealth';
import About from './Section/About';
import HomeFooter from './HomeFooter';
import './HomePage.scss';
import Banner from './Banner';

class HomePage extends Component {

    render() {

        return (
            <div className='home-container'>
                <div className='home-header'>
                    <Header />
                    <Banner />
                </div>
                <Service />
                <Specialty />
                <MedicalFacility />
                <OutStandingDoctor />
                {/* <MentalHealth />
                <HandBook /> */}
                <About />
                <HomeFooter />
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
