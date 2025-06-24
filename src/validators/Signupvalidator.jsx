const SignupValidator = ({ name, email, password, confirmPassword }) => {
  const errors = {
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  };

  // Name validation
  if (!name?.trim()) {
    errors.name = "Name is required";
  } else if (name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  // Email validation
  if (!email?.trim()) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Please enter a valid email address";
  }

  // Password validation
  if (!password) {
    errors.password = "Password is required";
  } else if (password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (!/[A-Z]/.test(password)) {
    errors.password = "Must contain at least one uppercase letter";
  } else if (!/[0-9]/.test(password)) {
    errors.password = "Must contain at least one number";
  }

  // Confirm Password validation
  if (!confirmPassword) {
    errors.confirmPassword = "Please confirm your password";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
};

export default SignupValidator;