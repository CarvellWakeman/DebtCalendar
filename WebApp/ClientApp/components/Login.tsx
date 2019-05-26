import * as React from 'react';
import { RouteComponentProps, Redirect } from 'react-router';
import { ReactPropTypes } from 'react';

interface Props {
    loginHandler: () => void;
}

interface State {
    usernameText: string;
    passwordText: string;
    formError: string;
}

// Login screen, communicates back to main app container (Layout)
export class Login extends React.Component<Props, State> {
    constructor(props: Props, state: State) {
        super(props, state);
        this.state = {
            usernameText: "",
            passwordText: "",
            formError: ""
        };
    }

    // Event handlers
    handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ usernameText: e.currentTarget.value });
    }

    handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ passwordText: e.currentTarget.value });
    }

    handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (this.isValid()) {
            this.tryLogin()
                .then((result: any) => {
                    // Successful login
                    if (result.statusCode == 200) {
                        this.setState({
                            usernameText: "",
                            passwordText: ""
                        });

                        localStorage.setItem("apitoken", result.data);
                        this.props.loginHandler();
                    } else { // Unsuccessful login
                        this.setState({
                            formError: result.data,
                            passwordText: ""
                        });
                    }
                });
        }
    }

    // Form
    isValid = () => {
        if (!this.state.usernameText) { return false; }
        if (!this.state.passwordText) { return false; }

        return true;
    }

    // API calls
    tryLogin = (): Promise<any> => {
        return fetch('loginUser', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                Username: this.state.usernameText,
                Password: this.state.passwordText
            })
        })
        .then(response => response.json() as Promise<any>)
        .then(result => { return result; });
    }

    public render() {
        if (localStorage.getItem("apitoken")) {
            return <Redirect to='/accounts' />;
        }

        return (
            <div className='mr-auto ml-auto mt-5 mb-auto w-50'>
                <div className='card'>
                    <div className="card-body">
                        <h5 className="card-title">Login</h5>
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
                                <label>Password</label>
                                <input type="password"
                                    className="form-control"
                                    placeholder="Enter Password"
                                    value={this.state.passwordText}
                                    onChange={this.handleChangePassword}
                                />
                            </div>

                            <button
                                className="btn btn-primary btn-block"
                                type="submit"
                                disabled={!this.isValid()}>
                                Login
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}
