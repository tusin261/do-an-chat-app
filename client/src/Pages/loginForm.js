import React from 'react';

class LoginForm extends React.Component {
    render() { return <div className="container" id="container">
    <div className="form-container sign-in-container">
      <form action="#">
        <h1>Sign in</h1>
       
        <span>or use your account</span>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
        <a href="#">Forgot your password?</a>
        <button>Sign In</button>
      </form>
    </div>
    <div className="overlay-container">
      <div className="overlay">
        <div className="overlay-panel overlay-left">
          <h1>Welcome Back!</h1>
          <p>To keep connected with us please login with your personal info</p>
          <button className="ghost" id="signIn">Sign In</button>
        </div>
        <div className="overlay-panel overlay-right">
          <h1>Hello, Friend!</h1>
          <p>Enter your personal details and start journey with us</p>
          <button className="ghost" >Sign Up</button>
        </div>
      </div>
    </div>
  </div>
  
  ; }
}

export default LoginForm;