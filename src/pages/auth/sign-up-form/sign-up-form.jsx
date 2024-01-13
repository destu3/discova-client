import { useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AlertContext } from '../../../contexts/alert.context';
import { showAlert } from '../../../utils/alert-utils';
import { redirectHome } from '../../../utils/common';
import FormInput from '../../../components/form-input/form-input';
import '../auth.css';

// Services
import { register } from '../../../services/api/auth/registration';

const defaultFields = {
  email: '',
  username: '',
  fullName: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [fields, setFields] = useState(defaultFields);
  const [preview, setPreview] = useState('');
  const [requestPending, setRequestPending] = useState(false);
  const { email, username, fullName, password, confirmPassword } = fields;
  const { setAlert } = useContext(AlertContext);

  useEffect(() => {
    document.title = 'Discova - Sign Up';
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
      setRequestPending(true);
      const { username } = await register(fields);
      showAlert(`Welcome to Discova ${username}`, setAlert);
      setRequestPending(false);
      redirectHome(2000);
    } catch (err) {
      setRequestPending(false);
      showAlert(err.message, setAlert, true);
    }
  };

  // Preview an image selected from an input file element.
  const previewImage = e => {
    const reader = new FileReader();
    const file = e.target.files[0];
    if (!file) return;

    reader.readAsDataURL(file); // reads the file and returns a dataURL with the data represented as a base64 encoded string

    reader.onload = function () {
      const result = this.result;
      setFields({ ...fields, image: result });
      setPreview(result);
    };
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

          <label className="select-pfp my-2" role="button" htmlFor="pfp">
            Choose your profile picture
            <div className="disclaimer text-xs">
              Please select a square image
            </div>
          </label>
          <input
            className="opacity-0 w-0 h-0"
            type="file"
            name="pfp"
            id="pfp"
            accept="image/png, image/jpeg"
            onChange={previewImage}
          />
          {preview && (
            <div className="thumbnail flex justify-center w-full aspect-square mt-2">
              <img
                className="rounded-md aspect-square w-full"
                src={preview}
                alt="thumbnail"
              />
            </div>
          )}

          {/* Render the Sign Up button */}
          <button
            onClick={handleSubmit}
            className="form-btn my-6 mt-9 relative"
          >
            Sign Up
            <ClipLoader
              loading={requestPending}
              className="absolute top-0 bottom-0 my-auto mx-0 right-5"
              size={20}
              speedMultiplier={0.8}
              color="#111827"
            />
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
