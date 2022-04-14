import React from 'react';
import {connect} from 'react-redux';

import {RootState} from '../../redux/reducers';
import {login} from '../../redux/actions/account';
import {LoginData} from '../../models/account';

type StateProps = {
  loggedIn: boolean;
};

type DispatchProps = {
  login: (loginData: LoginData) => void;
};

type OwnProps = {
  // other props like props from the parent
};

type LoginProps = StateProps & DispatchProps & OwnProps;

type LoginState = {
  username: string;
  password: string;
};

const mapStateToProps = (state: RootState, ownProps: OwnProps): StateProps => ({
  loggedIn: state.account.loggedIn,
});

const mapDispatchToProps: DispatchProps = {
  login: (loginData: LoginData) => login(loginData),
};

class Login extends React.Component<LoginProps, LoginState> {
  readonly state: LoginState = {
    username: '',
    password: '',
  };

  // TODO: add data validator by imported function or HOC
  login(): void {
    const {username, password} = this.state;
    this.props.login({username, password});
  }

  render(): React.ReactNode {
    const {loggedIn} = this.props;
    const {username, password} = this.state;

    return (
      <>
        <h1>Login</h1>
        <h3>LoggedIn: {loggedIn.toString()}</h3>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            this.setState({username: event?.target.value})
          }
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>): void =>
            this.setState({password: event?.target.value})
          }
        />
        <button onClick={(): void => this.login()}>Submit</button>
      </>
    );
  }
}

export default connect<StateProps, DispatchProps, OwnProps, RootState>(
  mapStateToProps,
  mapDispatchToProps
)(Login);
