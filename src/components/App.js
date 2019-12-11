import React, { Component } from 'react';
import SignUpForm from './SignUpForm';

export default class App extends Component {
  handleSignUp = credentials => {
    console.log(credentials);
  };

  render() {
    return <SignUpForm onSignUp={this.handleSignUp} />;
  }
}
