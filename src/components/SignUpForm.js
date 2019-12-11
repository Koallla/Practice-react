import React, { Component } from 'react';
// import shortid from 'shortid';
import ids from 'short-id';
// import T from 'prop-types';
import { validateAll } from 'indicative/validator';
import ErrorNotification from './ErrorNotification';

const rules = {
  login: 'required|string',
  email: 'required|email',
  password: 'required|string|min:6',
};

const messages = {
  'login.required': 'Please choose a unique username for your account',
  'email.required': 'Enter a valid email address.',
  'email.email': 'Email is invalid',
  'password.required': 'Enter a valid password.',
  'password.min': 'Password must be at least 6 characters long',
};

const INITIAL_STATE = {
  login: '',
  email: '',
  password: '',
  errors: null,
};
// Только если примитивы!!!

export default class SignUpForm extends Component {
  state = { ...INITIAL_STATE };

  /*
   * Отвечает за обновление состояния всех трех инпутов
   */

  handleChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  /*
   * Вызывается при отправке формы
   */
  handleSubmit = evt => {
    evt.preventDefault();
    const { login, email, password } = this.state;
    validateAll({ login, email, password }, rules, messages)
      .then(data => {
        console.log('success: ', data);

        // this.props.onSignUp({ ...this.state });
        // this.reset();
      })
      .catch(errors => {
        console.log('error: ', errors);

        const formattedErrors = {};

        errors.forEach(error => {
          formattedErrors[error.field] = error.message;
        });

        console.log(formattedErrors);

        this.setState({
          errors: formattedErrors,
        });
      });

    // Проп который передается форме для вызова при сабмите
  };

  reset = () => {
    this.setState({
      login: '',
      email: '',
      password: '',
      errors: null,
    });
  };

  loginInputId = ids.generate();

  render() {
    const { login, email, password, errors } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            placeholder="Enter login"
            value={login}
            onChange={this.handleChange}
            name="login"
          />
          {errors && <ErrorNotification label={errors.login} />}
        </label>
        <br />
        <label>
          Email
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={this.handleChange}
            name="email"
          />
          {errors && <ErrorNotification label={errors.email} />}
        </label>
        <br />
        <label>
          Password
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={this.handleChange}
            name="password"
          />
          {errors && <ErrorNotification label={errors.password} />}
        </label>
        <br />

        <button type="submit">Sign up as {login}</button>
      </form>
    );
  }
}
