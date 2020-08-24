import React, {Component} from 'react';
import {updateObject, checkValidity} from '../../shared/Functions/utility';
import Input from '../../shared/UI/Input/Input';
import classes from './Authentication.module.css'; 
import YesNoButton from '../../shared/UI/Buttons/YesNoButton/YesNoButton'; 
import TextButton from '../../shared/UI/Buttons/TextButton/TextButton'; 
import LoadingSpinner from '../../shared/UI/LoadingSpinner/LoadingSpinner'; 

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
                    minLength: 1 
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
        formIsValid: false,
        token: null,
        authError: null,
        serverError: null,
        loading: false  
    }

    inputChangedHandler = (event, controlName) => {
        const updatedControls = updateObject(this.state.controls, {
            [controlName]: updateObject(this.state.controls[controlName], {
                value: event.target.value,
                valid: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            })
        })   
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid; 
        }
        this.setState({controls: updatedControls, formIsValid: formIsValid});
    }

    submitHandler = (event) => {
        event.preventDefault();  
        this.setState({loading: true});   
        let data = new FormData();
        data.append('username', this.state.controls.username.value);  
        data.append('password', this.state.controls.password.value);  
        let path = 'http://127.0.0.1:8000/login/';  
        if (!this.state.isLogIn) {
            path = 'http://127.0.0.1:8000/register/';
            data.append('email', this.state.controls.email.value);
            data.append('confirmPassword', this.state.controls.confirmPassword.value);
        }
        (async () => {
            try {
                let response = await fetch(path, {
                    method: 'POST',
                    body: data
                });
                let result = await response.json(); 
                if (response.status === 200) {
                    this.setState({token: result['token'], loading: false, authError: null});
                } 
                else {
                    this.setState({authError: result['authError'], loading: false});
                }
            }
            catch(serverError) {
                this.setState({serverError: serverError, loading: false});  
            }
        })(); 
    }

    switchAuthModeHandler = () => {
        this.setState(prev => ({
            ...prev, 
            controls: {
                ...prev.controls,
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
            formIsValid: false,
            authError: null,
            serverError: null,
            loading: false   
        }))
    }

    testHandler = () => {
        this.setState({loading: true})
        let data = new FormData();
        data.append('token', this.state.token); 
        fetch('http://127.0.0.1:8000/test/', {
            method: 'POST',
            body: data
        })
            .then(response => response.json())
            .then(result => {
                this.setState({loading: false});
            })
            .catch(error => {
                this.setState({loading: false});
                console.log(error);
            })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            }); 
        };

        let form = formElementsArray.map(formElement => (
            <Input
                key = {formElement.id}
                elementType = {formElement.config.elementType}
                elementConfig = {formElement.config.elementConfig}
                value = {formElement.config.value} 
                invalid = {!formElement.config.valid}
                shouldValidate = {formElement.config.validation}
                touched = {formElement.config.touched}
                changed = {(event) => this.inputChangedHandler(event, formElement.id)}
                valueType = {formElement.config.elementConfig.placeholder}/>
        ));

        if (this.state.isLogIn) {
            form.splice(1,1);
            form.splice(2,1);
        }
        
        let isLogInFormIsValid = (
            this.state.isLogIn &&
            this.state.controls.username.valid &&
            this.state.controls.password.valid
        )

        let errorMessage = null

        if (this.state.authError !== null) {
            errorMessage = <p style = {{color: 'red'}}>{this.state.authError}</p>
        }

        if (this.state.serverError !== null) {
            errorMessage = <p style = {{color: 'red'}}>{this.state.serverError}</p>
        }
        
        return (  
            <div className={classes.Authentication}>
                {this.state.loading ? <LoadingSpinner/> :
                <div>
                    {errorMessage}
                    <form onSubmit={this.submitHandler}>
                        {form}
                        <YesNoButton 
                            btnType="Yes" 
                            disabled={!this.state.formIsValid && !isLogInFormIsValid}>{this.state.isLogIn ? 'Log In' : 'Register'}
                        </YesNoButton>
                    </form>
                    <TextButton onClick={this.switchAuthModeHandler}>
                        {this.state.isLogIn ? 'Register ' : 'Log in '} instead
                    </TextButton>
                    <TextButton onClick={this.testHandler}>
                        Test
                    </TextButton>   
                </div>
                }
            </div>
        )
    }
}

export default Authentication; 
