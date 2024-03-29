import React, { Component } from 'react';
import { updateObject, checkValidity} from '../../shared/utility';
import Input from '../../shared/userInterfaces/Input/Input';
import classes from './Authentication.module.css'; 
import YesNoButton from '../../shared/userInterfaces/buttons/YesNoButton/YesNoButton'; 
import TextButton from '../../shared/userInterfaces/buttons/TextButton/TextButton'; 
import LoadingSpinner from '../../shared/userInterfaces/LoadingSpinner/LoadingSpinner'; 
import Backdrop from '../../shared/userInterfaces/Backdrop/Backdrop';
import { connect } from 'react-redux'; 
import * as actions from '../../store/actions/index'; 

// Validations for registration, since log in doesn't need validation (except for required: true)
const USERNAME_VALIDATION = {
    required: true,
    minLength: 1,
    maxLength: 16,
    noWhiteSpace: true
}

const EMAIL_VALIDATION = {
    required: true,
    isEmail: true
}

const PASSWORD_VALIDATION = {
    required: true,
    minLength: 8,
    maxLength: 64
}

const CONFIRM_PASSWORD_VALIDATION = {
    required: true
}

class Authentication extends Component {
    // Initial state is for log in.
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
                    required: true
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
                validation: {},
                valid: true,
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
                    required: true
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
                validation: {},
                valid: true,
                touched: false,
                customErrMsg: "Please confirm your password."
            }
        },
        isLogIn: true,
        formIsValid: false
    }

    componentDidMount() {
        if (this.props.isAuthenticated) {
            this.props.history.push('/');
        } 
    }

    componentWillUnmount() {
        this.props.onResetAuthError();
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        });
        let updatedFormIsValid = true;
        for (const inputIdentifier in updatedControls) {
            updatedFormIsValid = updatedControls[inputIdentifier].valid && updatedFormIsValid; 
        }
        this.setState({controls: updatedControls, formIsValid: updatedFormIsValid});
    }

    submitHandler = async (event) => {
        event.preventDefault();  
        await this.props.onAuth(
            this.state.controls.username.value, 
            this.state.controls.email.value, 
            this.state.controls.password.value, 
            this.state.controls.confirmPassword.value, 
            this.state.isLogIn
        ); 
        if (this.props.isAuthenticated) {
            if (this.props.selectedItem) {
                this.props.history.push('/market');
            } else {
                this.props.history.push('/');
            }
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
                    validation: prev.isLogIn ? {
                        ...USERNAME_VALIDATION
                    } : {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                email: {
                    ...prev.controls.email,
                    ...prev.controls.email.elementConfig,
                    value: '',
                    validation: prev.isLogIn ? {
                        ...EMAIL_VALIDATION
                    } : {},
                    valid: prev.isLogIn ? false : true,
                    touched: false
                },
                password: {
                    ...prev.controls.password,
                    ...prev.controls.password.elementConfig,
                    value: '',
                    validation: prev.isLogIn ? {
                        ...PASSWORD_VALIDATION
                    } : {
                        required: true
                    },
                    valid: false,
                    touched: false
                },
                confirmPassword: {
                    ...prev.controls.confirmPassword,
                    ...prev.controls.confirmPassword.elementConfig,
                    value: '',
                    validation: prev.isLogIn ? {
                        ...CONFIRM_PASSWORD_VALIDATION
                    } : {},
                    valid: prev.isLogIn ? false : true,
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
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value} 
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)}
                valueType={formElement.config.elementConfig.placeholder}
                customErrMsg={formElement.config.customErrMsg}
            />
        ));
        if (this.state.isLogIn) {
            form.splice(1, 1);
            form.splice(2, 1);
        }

        let errors = [];
        if (this.props.authError) {
            if (this.props.authError.constructor === Array) {
                for (let i = 0; i < this.props.authError.length; i++) {
                    errors.push(<div key={i} className={classes.Error}>{this.props.authError[i]}</div>);
                }
            } else {
                errors.push(<div key={0} className={classes.Error}>{this.props.authError}</div>);
            }
        }
        
        const authClasses = [classes.Authentication]; 
        if (this.props.authError) {
            authClasses.push(classes.Shake);
        }

        return ( 
            <div className={authClasses.join(' ')}>
                {this.props.authLoading 
                    ?
                        <>
                            <LoadingSpinner/> 
                            <Backdrop portal style={{opacity: '0'}}/>
                        </>
                    :
                        <div>
                            {errors}
                            <form onSubmit={this.submitHandler} style={{paddingTop: '5px'}}>
                                {form}
                                <YesNoButton 
                                    btnType="Yes" 
                                    disabled={!this.state.formIsValid}
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
        authLoading: state.authentication.authLoading,
        selectedItem: state.market.selectedItem
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
