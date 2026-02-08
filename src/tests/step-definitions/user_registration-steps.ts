import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import RegistrationPage from '../../pom/pages/registration.page'
import type { RegistrationErrorType } from '../../types/registrationError';

const registrationPage = new RegistrationPage();

const newUserGeneric = {
  firstname: '',
  lastname: '',
  dob: '1999-01-02',
  street: '123 Road Street',
  postalcode: '12345',
  city: 'NYC',
  state: 'New York',
  country: 'US',
  phone: '123456789',
  email: '',
  password: '',
};

Given(/^I am on the registration page$/, async function () {
  await registrationPage.open();
});

Given(/^an already registered user (.+) (.+)$/, async function (_firstname, _lastname) {});

/***SCENARIO 1****/
When(
  /^I enter (.+) (.+) (.+) (.+) in the registration form$/,
  async function (firstname, lastname, email, password) {
    const newUser = { ...newUserGeneric };
    newUser.firstname = firstname;
    newUser.lastname = lastname;
    newUser.email = email;
    newUser.password = password;

    await registrationPage.fillOutForm(newUser);
  },
);

Then(
  /^I see a "([^"]*)" error message with text "([^"]*)"$/,
  async function (errorType: RegistrationErrorType, expectedText: string) {

    const errorElement = registrationPage.selectors.errors[errorType];

     await expect(errorElement).toBeDisplayed();
    const errorText = await errorElement.getText();
    await expect(errorText).toContain(expectedText);
  },
);

Then(/^the account is not created$/, async function () {
  const url = await browser.getUrl();
  await expect(url).toContain('auth/register');
});

/***SCENARIO 2****/
When(/^I fill out the registration form without email address$/, async function () {
  const newUserNoEmail = { ...newUserGeneric };
  newUserNoEmail.firstname = 'Alan';
  newUserNoEmail.lastname = 'Smith';
  newUserNoEmail.email = '';
  newUserNoEmail.password = 'Welcome01.';

  await registrationPage.fillOutForm(newUserNoEmail);
});

/***SCENARIO 3****/
When(/^I fill out the registration form correctly$/, async function () {
  const newUserCorrect = { ...newUserGeneric };
  const timestampName = Date.now();
  newUserCorrect.firstname = `Alan${timestampName}`;
  newUserCorrect.lastname = `Smith${timestampName}`;
  const timestampEmail = Date.now();
  newUserCorrect.email = `alan.smith${timestampEmail}@test.com`;
  newUserCorrect.password = 'Yjkasd2oasdww.';

  await registrationPage.fillOutForm(newUserCorrect);
});

Then(/^the account is created$/, async function () {
  await browser.waitUntil(async () => (await browser.getUrl()).includes('auth/login'), {
    timeout: 15000,
    timeoutMsg: 'Expected to be redirected to login page within 15s',
  });
});
