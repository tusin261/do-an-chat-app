import React, { Component } from 'react';

class SignUpForm extends Component {
    render() {
        return (
            <div className="container" id="container">
                <div className="form-container sign-in-container">
                    <form action="#">
                        <h1>Create Account</h1>
                        
                        <span>or use your email for registration</span>
                        <input type="text" placeholder="Họ" />
                        <input type="text" placeholder="Tên" />
                        <input type="tel" placeholder="Số Điện thoại" />
                        <input type="email" placeholder="Email" />
                        <input type="password" placeholder="Password" />
                        <button>Sign Up</button>
                    </form>
                </div>
                <div className="overlay-container">
                    <div className="overlay">
                        <div className="overlay-panel overlay-right">
                            <h1>Welcome Back!</h1>
                            <p>To keep connected with us please login with your personal info</p>
                            <button className="ghost" href="youtube.com">Sign In</button>
                        </div>
                    </div>
                </div>
            </div>

        );
    }
}

export default SignUpForm;