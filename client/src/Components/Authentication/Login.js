import React from 'react'
import errorIcon from '../../assets/icons/error.svg';
import './Authentication.scss';

class Login extends React.Component{
    state= {
        username: '',
        password: '',

        usernameError: true,
        passwordError: true,
        isValid: true,
        isFormSubmitted: false, 
    }

// handle change:

    handleChange= (event) =>{
        let x = event.target.name + 'Error'
        // console.log(event.target.value, x)
        if(event.target.value === ''){ this.setState({[x]: true}); }
        else { this.setState({[x]: false});   }
        this.setState({[event.target.name]: event.target.value})}

// Alert div after validation:

    Alert = () =><div className='input--errorContainer'>
                    <img src={errorIcon} alt="error" className='input--error-img' />
                    <span className='input--error-msg'>This field is required </span>
                </div>

// Alert div (invisible)

    AlertInvisible = () => <div className='input--errorContainer-invisible'>
                            <img src={errorIcon} alt="error" className='input--error-img' />
                            <span className='input--error-msg'>This field is required </span>
                        </div>

// Form validation:

    isFormValid = () => {
        if(this.state.usernameError || this.state.passwordError) {
                this.setState({isValid: false});
                return false;
        }
        else{
            this.setState({isValid: true});
            return true;
        }
    }
// Handle form submit:

    handleSubmit = (event) =>{
        event.preventDefault();
        let user = {username: this.state.username, password: this.state.password};
        if(this.isFormValid()){
            this.setState({isFormSubmitted: true});
            this.props.handleLogin(user);
        }
        this.setState({username: '', password: ''});
    }

    render(){
        return(
            <section className='authentication authentication__login'>
                {this.props.errorMsg?
                    <div className='authentication__errorFromServer'>
                        <h3 className="authentication__subheading"> {this.props.errorMsg}</h3>
                        <a href = '/login' className="link button">Login Again!</a>
                    </div>: ''
                } 
                {!this.props.errorMsg && this.state.isFormSubmitted ? 
                    <div className='authentication__formSubmitted'>
                        <h3 className="authentication__subheading"> You are now logged in</h3>
                        <a href = '/home' className="link button">Home</a>
                    </div> : ''
                }
                {!this.state.isFormSubmitted && !this.props.errorMsg? 
                    <div>
                        <h3 className='authentication__heading'> Complete the form to login. </h3>
                        <form className='authentication__reg-form' 
                            onSubmit={(event) =>{this.handleSubmit(event)}}>
                            <label className='input-label' htmlFor='username'>Username:</label>
                            <input className={`input input--register ${this.state.nameError? 'input--error': ''}`}  type='text' 
                                    placeholder='username' id='username' name='username' onChange={this.handleChange} />                   
                            {this.state.usernameError? this.Alert(): this.AlertInvisible() }
                            <label className='input-label' htmlFor='password'>Password:</label>
                            <input className={`input input--register ${this.state.nameError? 'input--error': ''}`} type='password' placeholder='password' 
                                    name='password' id='password' onChange={this.handleChange} autoComplete='off'/>
                            {this.state.passwordError? this.Alert(): this.AlertInvisible() }
                            <input className='button button--register' type='submit'value='Login'/>
                        </form>
                    </div>: ''
                }
            </section>
        )
    }
}

export default Login;