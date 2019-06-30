import { sendRegisterData } from "../registerService";

it("calls correct api url", () => {
  let isCalled = false;
  const fakeFetch = url => {
    isCalled = true;
    expect(url).toBe("http://127.0.0.1:8000/register/");
    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve({})
    });
  };
  sendRegisterData(
    fakeFetch,
    "user",
    "user@user.com",
    "user@user.com",
    "pass",
    "pass"
  ).then(() => {
    expect(isCalled).toBe(true);
  });
});

it("returns object response with results if success", () => {
  const fakeFetch = url => {
    return Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          username: "user",
          email: "user@user.com"
        })
    });
  };
  sendRegisterData(
    fakeFetch,
    "user",
    "user@user.com",
    "user@user.com",
    "pass",
    "pass"
  ).then(result =>
    expect(result).toStrictEqual({
      result: "success",
      errors: {},
      data: {
        username: "user",
        email: "user@user.com"
      }
    })
  );
});

it("returns object response with errors if wrong data", () => {
  const fakeFetch = url => {
    return Promise.resolve({
      ok: true,
      status: 400,
      json: () =>
        Promise.resolve({
          password: ["Password must match"],
          email: ["Emails must match"]
        })
    });
  };
  sendRegisterData(
    fakeFetch,
    "user",
    "user1@user.com",
    "user2@user.com",
    "pass1",
    "pass2"
  ).then(result =>
    expect(result).toStrictEqual({
      result: "failed",
      errors: {
        password: ["Password must match"],
        email: ["Emails must match"]
      },
      data: {
        username: "user",
        email: "user1@user.com"
      }
    })
  );
});

it("returns object response with errors if failed to fetch", () => {
  const fakeFetch = url => {
    return Promise.resolve({
      ok: false
    });
  };
  sendRegisterData(
    fakeFetch,
    "user",
    "user1@user.com",
    "user2@user.com",
    "pass1",
    "pass2"
  ).then(result =>
    expect(result).toStrictEqual({
      result: "failed",
      errors: { serverError: "Failed to fetch resources" },
      data: {
        username: "user",
        email: "user1@user.com"
      }
    })
  );
});
