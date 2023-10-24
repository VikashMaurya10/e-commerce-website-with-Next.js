const isValidEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._]+@[a-z]+\.[a-z]{2,3}$/;
  return Boolean(pattern.test(email));
};

const isValidPassword = (password) => {
  const pattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return Boolean(pattern.test(password));
};

const isValidPhoneNo = (phone) => {
  const pattern = /^(\+\d{1,3})?(\s?)?(\()?\d{3}(\))?[-\s.]?\d{3}[-\s.]?\d{4}$/;
  return Boolean(pattern.test(phone));
};
export { isValidEmail, isValidPassword, isValidPhoneNo };
