import React, { Component } from 'react';
import { updateObject, checkValidity} from '../../shared/utility';
import Input from '../../shared/UI/Input/Input';
import classes from './Authentication.module.css'; 
import YesNoButton from '../../shared/UI/Buttons/YesNoButton/YesNoButton'; 
import TextButton from '../../shared/UI/Buttons/TextButton/TextButton'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner'; 
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index'; 

class Authentication extends Component {
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'input',
                    placeholder: 'Username'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1,
                    maxLength: 16 
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 1 
                },
                valid: false,
                touched: false
            },
            confirmPassword: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Confirm Password'
                },
                value: '',
                validation: {
                    required: false 
                },
                valid: false,
                touched: false
            }
        },
        isLogIn: true,
        formIsValid: false
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        } else this.props.onResetAuthError(); 
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });   
        let formIsValid = true;
        for (const inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid; 
        }
        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    submitHandler = async(event) => {
        event.preventDefault();  
        await this.props.onAuth(this.state.controls.username.value, 
            this.state.controls.email.value, 
            this.state.controls.password.value, 
            this.state.controls.confirmPassword.value, 
            this.state.isLogIn); 
        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        }
    }

    switchAuthModeHandler = () => {
        this.setState(prev => ({
            ...prev, 
            controls: {
                username: {
                    ...prev.controls.username,
                    ...prev.controls.username.elementConfig,
                    value: '',
                    ...prev.controls.username.validation,
                    valid: false,
                    touched: false
                },
                email: {
                    ...prev.controls.email,
                    ...prev.controls.email.elementConfig,
                    value: '',
                    ...prev.controls.email.validation,
                    valid: false,
                    touched: false
                },
                password: {
                    ...prev.controls.password,
                    ...prev.controls.password.elementConfig,
                    value: '',
                    ...prev.controls.password.validation,
                    valid: false,
                    touched: false
                },
                confirmPassword: {
                    ...prev.controls.confirmPassword,
                    ...prev.controls.confirmPassword.elementConfig,
                    value: '',
                    ...prev.controls.confirmPassword.validation,
                    valid: false,
                    touched: false
                }
            },
            isLogIn: !prev.isLogIn,
            formIsValid: false
        }));
        this.props.onResetAuthError(); 
    }

    render() {
        const formElementsArray = [];
        for (const key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            }); 
        }

        const form = formElementsArray.map(formElement => (
            <Input
                key = {formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value} 
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
                changed = {(event) => this.inputChangedHandler(event, formElement.id)}
                valueType = {formElement.config.elementConfig.placeholder}
            />
        ));

        if (this.state.isLogIn) {
            form.splice(1, 1);
            form.splice(2, 1);
        }
        const isLogInFormIsValid = (
            this.state.isLogIn &&
            this.state.controls.username.valid &&
            this.state.controls.password.valid
        );

        let error = null;
        if (this.props.authError) {
            error = <div className={classes.Error}>{this.props.authError}</div>;
        }
        
        const authClasses = [classes.Authentication]; 
        if (this.props.authError) {
            authClasses.push(classes.Shake);
        }

        return ( 
            <div className={authClasses.join(' ')}>
                {this.props.loading ? <LoadingSpinner/> :
                    <div>
                        {error}
                        <form onSubmit={this.submitHandler}>
                            {form}
                            <YesNoButton 
                                btnType="Yes" 
                                disabled={!this.state.formIsValid && !isLogInFormIsValid}
                            >
                                {this.state.isLogIn ? 'Log In' : 'Register'}
                            </YesNoButton>
                        </form>
                        <TextButton onClick={this.switchAuthModeHandler} style={{marginTop: '20px'}}>
                            {this.state.isLogIn ? 'Register ' : 'Log in '} instead
                        </TextButton>
                    </div>
                }
            </div> 
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.authentication.isAuthenticated,
        authError: state.authentication.authError,
        loading: state.authentication.loading
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (username, email, password, confirmPassword, isLogIn) => 
            dispatch(actions.auth(username, email, password, confirmPassword, isLogIn)),
        onResetAuthError: () => dispatch(actions.resetAuthError())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Authentication); 
