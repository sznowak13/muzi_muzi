export const validateRegisterData = (
  username,
  email,
  email2,
  password,
  password2
) => {
  let result = {
    validated: true,
    errors: ""
  };
  if (
    !!username &&
    !!email &&
    !!password &&
    username.length < 150 &&
    password === password2 &&
    email === email2
  ) {
    return result;
  } else {
    result.validated = false;
    if (!username) {
      result.errors = "No username provided";
    } else if (!email) {
      result.errors = "No email provided";
    } else if (!password) {
      result.errors = "No password provided";
    } else if (username.length > 150) {
      result.errors = "Username too long (max 150 characters).";
    } else if (password !== password2) {
      result.errors = "Passwords don't match.";
    } else if (email !== email2) {
      result.errors = "Emails don't match.";
    }
    return result;
  }
};

export const sendRegisterData = async (fetch, formData) => {
  let result = {
    success: true,
    errors: {},
    data: { username: formData.username, email: formData.email1 }
  };
  let response = await fetch("http://127.0.0.1:8000/register/", {
    method: "POST",
    body: JSON.stringify({
      username: formData.username,
      email: formData.email1,
      email2: formData.email2,
      password: formData.password1,
      password2: formData.password2
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  let json;
  if (response.status === 500) {
    result.success = false;
    result.errors = { serverError: "Failed to fetch resources" };
  } else if (response.status === 400) {
    result.success = false;
    json = await response.json();
    result.errors = json;
  }

  return result;
};

export const sendVerificationToken = async token => {
  let response = await fetch(
    "http://127.0.0.1:8000/register/verify_email/?key=" + token
  );
  return response.ok;
};
