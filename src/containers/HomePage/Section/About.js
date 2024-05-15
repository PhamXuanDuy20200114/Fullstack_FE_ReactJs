import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { languages } from '../../../utils/constant';
import actionTypes from '../../../store/actions/actionTypes';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';

import './About.scss';

class About extends Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {

    }

    render() {

        const properties = {
            nextArrow: <button className='btn btn-handbook'><i className="fas fa-angle-right"></i></button>,
            prevArrow: <button className='btn btn-handbook'><i className="fas fa-angle-left"></i></button>
        }
        return (
            <React.Fragment>
                <div className='section-about'>
                    <div className='section-about-container'>
                        <div className='section-about-header'>
                            Truyền thông nói gì về chúng tôi
                        </div>
                        <div className='about-content'>
                            <div className='content-left'><iframe width="100%" height="360" src="https://www.youtube.com/embed/2Vv-BfVoq4g" title="Ed Sheeran - Perfect (Official Music Video)" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullScreen></iframe></div>
                            <div className='content-right'>
                                Ngày mình còn là sinh viên, đi hoc tại giảng đường Đại học, mình đã từng tham gia vào một số hoạt động tình nguyện. Mình nhận ra rằng, việc giúp đỡ người khác không chỉ giúp họ mà còn giúp mình trở nên tốt hơn. Đó là lý do mình quyết định tạo ra trang web này, để giúp mọi người tìm kiếm thông tin về các bác sĩ, bệnh viện, phòng khám một cách dễ dàng nhất.
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
