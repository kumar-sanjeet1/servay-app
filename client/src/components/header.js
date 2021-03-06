import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {


    renderContent() {
        switch(this.props.auth) {
            case null: 
                return;
            case false: 
                return <li><a href="/auth/google">Login with Google</a></li>;
            default: 
                return <li><a href="/api/logout">Logout</a></li>;
        }
    }

    render() {
        return (
            <nav>
                <div className="container">
                    <div className="nav-wrapper">
                    <Link to={this.props.auth ? '/dashbard': '/' }
                            className="brand-logo">Logo
                    </Link>
                    <ul id="nav-mobile" className="right hide-on-med-and-down">
                        { this.renderContent()}
                        {/* <li><a href="/auth/google"></a></li> */}
                    </ul>
                    </div>
                </div>
            </nav>
        )
    }
}

const MapsStateToProps = (state) => {
    return { auth: state.auth }
}
export default connect(MapsStateToProps)(Header);

