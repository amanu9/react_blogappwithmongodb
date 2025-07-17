const LoginValidator = ({ email, password }) => {
  const errors = {
    email: "",
    password: ""
  };

  if (!email?.trim()) {
    errors.email = "Email is required";
  }

  if (!password?.trim()) {
    errors.password = "Password is required";
  }

  return errors;
};

export default LoginValidator;
