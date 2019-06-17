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

export const sendRegisterData = async (
  fetch,
  username,
  email,
  email2,
  password,
  password2
) => {
  let result = {
    result: "success",
    errors: {},
    data: { username: username, email: email }
  };
  let response = await fetch("http://127.0.0.1:8000/register/", {
    method: "POST",
    body: JSON.stringify({
      username: username,
      email: email,
      email2: email2,
      password: password,
      password2: password2
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  let json;
  if (!response.ok) {
    result.result = "failed";
    result.errors = { serverError: "Failed to fetch resources" };
  } else if (response.status === 400) {
    result.result = "failed";
    json = await response.json();
    result.errors = json;
  }

  return result;
};
