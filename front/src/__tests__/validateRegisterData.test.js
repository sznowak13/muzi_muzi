import { validateRegisterData } from "../registerService";

it("returns true if provided with valid data", () => {
  expect(
    validateRegisterData("szymek", "sz@sz.pl", "sz@sz.pl", "szasza", "szasza")
  ).toEqual({
    validated: true,
    errors: ""
  });
});

it("returns false if provided with different passwords", () => {
  expect(
    validateRegisterData("szymek", "sz@sz.pl", "sz@sz.pl", "szasza1", "szasza2")
  ).toEqual({
    validated: false,
    errors: "Passwords don't match."
  });
});

it("returns false if provided with different emails", () => {
  expect(
    validateRegisterData("szymek", "sz1@sz.pl", "sz2@sz.pl", "szasza", "szasza")
  ).toEqual({
    validated: false,
    errors: "Emails don't match."
  });
});

it("returns false if provided with too long username", () => {
  expect(
    validateRegisterData(
      "szymekszymekszymekszymekszymekszymekszymekszymeszymekkszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymekszymek",
      "sz@sz.pl",
      "sz@sz.pl",
      "szasza",
      "szasza"
    )
  ).toEqual({
    validated: false,
    errors: "Username too long (max 150 characters)."
  });
});

it("returns false if provided with no username", () => {
  expect(
    validateRegisterData("", "sz@sz.pl", "sz@sz.pl", "szasza", "szasza")
  ).toEqual({
    validated: false,
    errors: "No username provided"
  });
});

it("returns false if provided with no email", () => {
  expect(validateRegisterData("szyszka", "", "", "szasza", "szasza")).toEqual({
    validated: false,
    errors: "No email provided"
  });
});

it("returns false if provided with no password", () => {
  expect(
    validateRegisterData("szyszka", "sz@sz.pl", "sz@sz.pl", "", "")
  ).toEqual({
    validated: false,
    errors: "No password provided"
  });
});

it("returns false if provided with no data", () => {
  expect(validateRegisterData("", "", "", "", "")).toEqual({
    validated: false,
    errors: "No username provided"
  });
});
