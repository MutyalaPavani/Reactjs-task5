
import React, { useState } from "react";
import "./App.css";

function App() {
  const initialFormData = {
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    languages: [],
    hobbies: [],
  };

  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");

  // Handle Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
      ...(name === "password" ? { confirmPassword: "" } : {}),
    }));

    setSuccess("");
  };

  // Handle Checkbox Changes
  const handleCheckbox = (e) => {
    const { name, value, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value),
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));

    setSuccess("");
  };

  // Validate All Fields
  const validateForm = () => {
    const newErrors = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = "First name is required";
    } else if (!/^[a-zA-Z ]+$/.test(formData.firstName.trim())) {
      newErrors.firstName = "Enter a valid first name";
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = "Last name is required";
    } else if (!/^[a-zA-Z ]+$/.test(formData.lastName.trim())) {
      newErrors.lastName = "Enter a valid last name";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (!formData.mobile.trim()) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/.test(formData.password)
    ) {
      newErrors.password =
        "Use 8+ characters with uppercase, lowercase and a number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.dob) {
      newErrors.dob = "Date of birth is required";
    } else {
      const selectedDate = new Date(formData.dob + "T00:00:00");
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate > today) {
        newErrors.dob = "Date of birth cannot be in the future";
      }
    }

    if (!formData.gender) {
      newErrors.gender = "Please select your gender";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    if (!formData.city.trim()) {
      newErrors.city = "City is required";
    } else if (!/^[a-zA-Z ]+$/.test(formData.city.trim())) {
      newErrors.city = "Enter a valid city name";
    }

    if (formData.languages.length === 0) {
      newErrors.languages = "Select at least one language";
    }

    if (formData.hobbies.length === 0) {
      newErrors.hobbies = "Select at least one hobby";
    }

    return newErrors;
  };

  // Handle Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setSuccess("Registration completed successfully!");

      console.log("Registration Details:", formData);
    } else {
      setSuccess("");
    }
  };

  // Reset Form
  const handleReset = () => {
    setFormData(initialFormData);
    setErrors({});
    setSuccess("");
  };

  // Reusable Input Field
  const renderError = (field) =>
    errors[field] && <span className="error">{errors[field]}</span>;

  return (
    <div className="main-container">

      <div className="form-container">

        {/* Header */}
        <div className="form-header">
          <div className="logo-icon">✦</div>

          <span className="welcome-text">WELCOME TO OUR COMMUNITY</span>

          <h1>Create Your Account</h1>

          <p>
            Join us today! Please provide your details to
            complete your registration.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate>

          {/* Personal Information */}
          <div className="section-heading">
            <span className="section-icon">01</span>
            <div>
              <h3>Personal Information</h3>
              <p>Enter your basic personal details</p>
            </div>
          </div>

          <div className="form-grid">

            <div className="input-group">
              <label>First Name <span>*</span></label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter first name"
                value={formData.firstName}
                onChange={handleChange}
              />
              {renderError("firstName")}
            </div>

            <div className="input-group">
              <label>Last Name <span>*</span></label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter last name"
                value={formData.lastName}
                onChange={handleChange}
              />
              {renderError("lastName")}
            </div>

            <div className="input-group">
              <label>Email Address <span>*</span></label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
              />
              {renderError("email")}
            </div>

            <div className="input-group">
              <label>Mobile Number <span>*</span></label>
              <input
                type="tel"
                name="mobile"
                placeholder="Enter 10-digit number"
                value={formData.mobile}
                onChange={handleChange}
              />
              {renderError("mobile")}
            </div>

            <div className="input-group">
              <label>Date of Birth <span>*</span></label>
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
              {renderError("dob")}
            </div>

            <div className="input-group">
              <label>Gender <span>*</span></label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Choose your gender</option>
                <option value="Female">Female</option>
                <option value="Male">Male</option>
                <option value="Other">Other</option>
                <option value="Prefer not to say">
                  Prefer not to say
                </option>
              </select>
              {renderError("gender")}
            </div>

            <div className="input-group full-width">
              <label>Address <span>*</span></label>
              <textarea
                name="address"
                placeholder="Enter your complete residential address"
                rows="3"
                value={formData.address}
                onChange={handleChange}
              />
              {renderError("address")}
            </div>

            <div className="input-group full-width">
              <label>City <span>*</span></label>
              <input
                type="text"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
              />
              {renderError("city")}
            </div>

          </div>

          {/* Account Security */}
          <div className="section-heading">
            <span className="section-icon">02</span>
            <div>
              <h3>Account Security</h3>
              <p>Create a secure password for your account</p>
            </div>
          </div>

          <div className="form-grid">

            <div className="input-group">
              <label>Password <span>*</span></label>
              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
              />
              {renderError("password")}
              <small className="hint">
                Minimum 8 characters, uppercase, lowercase and number.
              </small>
            </div>

            <div className="input-group">
              <label>Confirm Password <span>*</span></label>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
              {renderError("confirmPassword")}
            </div>

          </div>

          {/* Languages */}
          <div className="section-heading">
            <span className="section-icon">03</span>
            <div>
              <h3>Languages Known</h3>
              <p>Select all the languages you can speak</p>
            </div>
          </div>

          <div className="checkbox-container">
            {["English", "Telugu", "Hindi", "Tamil"].map((language) => (
              <label className="checkbox-option" key={language}>
                <input
                  type="checkbox"
                  name="languages"
                  value={language}
                  checked={formData.languages.includes(language)}
                  onChange={handleCheckbox}
                />
                <span className="custom-check"></span>
                <span>{language}</span>
              </label>
            ))}
          </div>
          {renderError("languages")}

          {/* Hobbies */}
          <div className="section-heading hobbies-heading">
            <span className="section-icon">04</span>
            <div>
              <h3>Hobbies & Interests</h3>
              <p>Choose your favourite activities</p>
            </div>
          </div>

          <div className="checkbox-container">
            {["Reading", "Music", "Sports", "Travelling"].map((hobby) => (
              <label className="checkbox-option" key={hobby}>
                <input
                  type="checkbox"
                  name="hobbies"
                  value={hobby}
                  checked={formData.hobbies.includes(hobby)}
                  onChange={handleCheckbox}
                />
                <span className="custom-check"></span>
                <span>{hobby}</span>
              </label>
            ))}
          </div>
          {renderError("hobbies")}

          {/* Success Message */}
          {success && (
            <div className="success-message">
              <span className="success-icon">✓</span>
              <div>
                <strong>Congratulations!</strong>
                <p>{success}</p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="button-group">
            <button type="submit" className="submit-btn">
              Create Account <span>→</span>
            </button>

            <button
              type="button"
              className="reset-btn"
              onClick={handleReset}
            >
              ↻ Reset Form
            </button>
          </div>

          <p className="bottom-text">
            <span>*</span> All fields are mandatory. Please check your
            information before submitting.
          </p>

        </form>
      </div>

      <p className="footer-text">
        © 2026 Registration Portal. All rights reserved.
      </p>

    </div>
  );
}

export default App;
