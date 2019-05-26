import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { ReactPropTypes } from 'react';

interface Props {
    registerHandler: () => void;
}

interface State {
    usernameText: string;
    emailText: string;
    passwordText: string;
    passwordVerifyText: string;
    formError: string;
    registered: boolean;
}

// Registration page for posting a new user to the API
export class Register extends React.Component<RouteComponentProps<{}>, State> {
    constructor() {
        super();
        this.state = {
            usernameText: "",
            emailText: "",
            passwordText: "",
            passwordVerifyText: "",
            registered: false,
            formError: ""
        };
    }

    // Event handlers
    handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ usernameText: e.currentTarget.value });
    }

    handleChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ emailText: e.currentTarget.value });
    }

    handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ passwordText: e.currentTarget.value });
    }

    handleChangePasswordVerify = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ passwordVerifyText: e.currentTarget.value });
    }


    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (this.isValid()) {
            this.tryRegister()
                .then((result: any) => {
                    // Successful register
                    if (result.statusCode == 200) {
                        this.setState({
                            usernameText: "",
                            emailText: "",
                            passwordText: "",
                            passwordVerifyText: "",
                            registered: true
                        });
                    } else { // Unsuccessful register
                        this.setState({
                            formError: result.data,
                            passwordText: "",
                            passwordVerifyText: ""
                        });
                    }
                });
        }
    }

    // Form
    isValid = () => {
        if (!this.state.usernameText) { return false; }
        if (!this.state.emailText) { return false; }
        if (!this.state.passwordText) { return false; }
        if (!this.state.passwordVerifyText) { return false; }
        if (this.state.passwordText != this.state.passwordVerifyText) { return false; }

        return true;
    }


    // API calls
    tryRegister = (): Promise<any> => {
        return fetch('postUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: this.state.usernameText,
                Email: this.state.emailText,
                Password: this.state.passwordText
            })
        })
        .then(response => response.json() as Promise<any>)
        .then(result => { return result; });
    }

    public render() {
        if (this.state.registered) {
            return <Redirect to='/' />;
        }

        return (
            <div className='mr-auto ml-auto mt-5 mb-auto w-50'>
                <div className='card'>
                    <div className="card-body">
                        <h5 className="card-title">Register</h5>
                        <small className="form-text text-danger">
                            {this.state.formError}
                        </small>

                        <form onSubmit={this.handleSubmit}>

                            <div className="form-group">
                                <label>Username</label>
                                <input type="text"
                                    className="form-control"
                                    placeholder="Enter Username"
                                    value={this.state.usernameText}
                                    onChange={this.handleChangeUsername}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email"
                                    className="form-control"
                                    placeholder="Enter Email"
                                    value={this.state.emailText}
                                    onChange={this.handleChangeEmail}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={this.state.passwordText}
                                    onChange={this.handleChangePassword}
                                />
                            </div>

                            <div className="form-group">
                                <label>Verify Password</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Enter Password Again"
                                    value={this.state.passwordVerifyText}
                                    onChange={this.handleChangePasswordVerify}
                                />
                            </div>
                            
                            <button
                                className="btn btn-success btn-block"
                                type="submit"
                                disabled={!this.isValid()}>
                                Create Account
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
