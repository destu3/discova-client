import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { AlertContext } from '../../../contexts/alert.context';
import { manageAlert } from '../../../helpers/alert-utils';
import '../auth.css';

// Components
import FormInput from '../../../components/form-input/form-input';

// Services
import { login } from '../../../services/internal-api/auth/login-services';

const defaultFields = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const [fields, setFields] = useState(defaultFields);
  const { email, password } = fields;
  const { alert, setAlert } = useContext(AlertContext);

  useEffect(() => {
    document.title = 'Discova - Login';
  }, []);

  // Handle input change event
  const handleInputChange = e => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  // Handle form submit event
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await login(email, password, setAlert, {
        ...alert,
        type: 'success',
        visible: true,
      });
    } catch (err) {
      manageAlert(err, alert, setAlert);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex justify-center items-center">
      <div className="form-wrapper">
        <h2 className="mb-8 font-semibold text-gray-100 text-2xl text-center">
          Log In
        </h2>
        <form className="w-[90%] sm:w-4/5" onSubmit={e => e.preventDefault()}>
          {/* Render the email input */}
          <FormInput
            handler={handleInputChange}
            type={'email'}
            placeholder="your.email@address.com"
            id="email"
            name="email"
            value={email}
            label="Email"
          />

          {/* Render the password input */}
          <FormInput
            handler={handleInputChange}
            type={'password'}
            placeholder="Enter your password"
            id="password"
            name="password"
            value={password}
            label="Password"
          />

          {/* Render the login button */}
          <button onClick={handleSubmit} className="form-btn my-6">
            Log In
          </button>

          {/* Render the "New to Discova?" text and sign up button */}
          <span className="text-[#B4B4BB] block text-xs mb-2 mx-auto w-fit">
            New to Discova?
          </span>
          <NavLink to="/sign-up">
            <button className="form-btn">Sign Up</button>
          </NavLink>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
