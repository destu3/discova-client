import { useState } from 'react';
import { NavLink } from 'react-router-dom';

import FormInput from '../../../components/form-input/form-input';

const defaultFields = {
  email: '',
  username: '',
  fullName: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [fields, setFields] = useState(defaultFields);

  const { email, username, fullName, password, confirmPassword } = fields;

  // Handle input change event
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  // Handle form submit event
  const handleSubmit = e => {
    e.preventDefault();
    window.location.assign('/');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex justify-center items-center">
      <div className="form-wrapper">
        <h2 className="text-2xl text-gray-100 font-semibold mb-8 text-center">
          Create a new account
        </h2>
        <form className="w-[90%] sm:w-4/5" onSubmit={e => e.preventDefault()}>
          {/* Render the Full Name input */}
          <FormInput
            handler={handleInputChange}
            type="text"
            placeholder="Full Name"
            id="f-name"
            name="fullName"
            value={fullName}
            label="Full Name"
          />

          {/* Render the Username input */}
          <FormInput
            handler={handleInputChange}
            type="text"
            placeholder="Username"
            id="username"
            name="username"
            value={username}
            label="Username"
          />

          {/* Render the Email input */}
          <FormInput
            handler={handleInputChange}
            type="email"
            placeholder="your.email@address.com"
            id="email"
            name="email"
            value={email}
            label="Email Address"
          />

          {/* Render the Password input */}
          <FormInput
            handler={handleInputChange}
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={password}
            label="Password"
          />

          {/* Render the Confirm Password input */}
          <FormInput
            handler={handleInputChange}
            type="password"
            placeholder="Confirm password"
            id="confirm-password"
            name="confirmPassword"
            value={confirmPassword}
            label="Confirm Password"
          />

          {/* Render the Sign Up button */}
          <button onClick={handleSubmit} className="form-btn my-6">
            Sign Up
          </button>

          {/* Render the "Already have an account?" text and Log In button */}
          <p className="text-[#B4B4BB] text-xs mb-2 mx-auto w-fit">
            Already have an account?
          </p>
          <NavLink to="/login">
            <button className="form-btn">Log In</button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default SignUpForm;
