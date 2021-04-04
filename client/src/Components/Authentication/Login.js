import React from 'react'
import errorIcon from '../../assets/icons/error.svg';
import './Authentication.scss';
import Cookies from 'js-cookie';

class Login extends React.Component {
    state = {
        username: '',  password: '',
        usernameError: false,  passwordError: false,
        isValid: true,
        isFormSubmitted: false,
        displayName: '',
    }

// handle change:

    handleChange = (event) => {
        let x = event.target.name + 'Error'
        if (event.target.value === '') { this.setState({ [x]: true }); }
        else { this.setState({ [x]: false }); }
        this.setState({ [event.target.name]: event.target.value })
    }

// Alert div after validation:

    Alert = () => <div className='input--errorContainer'>
        <img src={errorIcon} alt="error" className='input--error-img' />
        <span className='input--error-msg'>This field is required </span>
    </div>

// Form validation:

    isFormValid = () => {
        if(!this.state.username) this.setState({usernameError: true});
        if(!this.state.password) this.setState({passwordError: true});
        if (!this.state.username|| !this.state.password || this.state.usernameError || this.state.passwordError) {
            this.setState({ isValid: false });
            return false;
        }
        else {
            this.setState({ isValid: true });
            return true;
        }
    }
    // Handle form submit:

    handleSubmit = (event) => {
        event.preventDefault();
        let user = { username: this.state.username, password: this.state.password };
        if (this.isFormValid()) {
            this.setState({ isFormSubmitted: true, displayName: this.state.username });
            this.props.handleLogin(user);
            this.setState({ username: '', password: '' });
        }
    }

    render() {
        return (
            <section className='authentication'>
                {this.props.errorMsg ?
                    <div className='authentication__section authentication__formSubmitted'>
                        <h3 className="authentication__heading authentication__heading--status"> {this.props.errorMsg}</h3>
                        <a href='/login' className="link button button--big">Login Again!</a>
                    </div> : ''
                }
                {typeof Cookies.get('username') !== 'undefined' && !this.props.errorMsg && this.state.isFormSubmitted?
                    <div className='authentication__section authentication__formSubmitted'>
                        <h3 className="authentication__heading authentication__heading--status"> {`You are now logged in as ${Cookies.get('username')}`}</h3>
                        <a href='/home' className="link button button--auth">Home</a>
                    </div> : ''
                }
                {!this.state.isFormSubmitted && !this.props.errorMsg && !Cookies.get('username') ?
                    <div className='authentication__section'>
                        <h3 className='authentication__heading'> Complete the form to login. </h3>
                        <form className='authentication__reg-form'
                            onSubmit={(event) => { this.handleSubmit(event) }}>
                            <label className='input-label' htmlFor='username'>Username:
                            <input className={`input input--register ${this.state.nameError ? 'input--error' : ''}`} type='text'
                                placeholder='username' id='username' name='username' onChange={this.handleChange} />
                            {this.state.usernameError ? this.Alert() : ''}
                            </label>
                            <label className='input-label' htmlFor='password'>Password:
                            <input className={`input input--register ${this.state.nameError ? 'input--error' : ''}`} type='password' placeholder='password'
                                name='password' id='password' onChange={this.handleChange} autoComplete='off' />
                            {this.state.passwordError ? this.Alert() : ''}
                            </label>
                            <input className='button button--register' type='submit' value='Login' />
                        </form>
                    </div> : ''
                }
            </section>
        )
    }
}

export default Login;