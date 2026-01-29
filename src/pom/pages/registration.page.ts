import BasePage from './base.page';
import type { NewUser } from '../../types/newUser';

class RegistrationPage extends BasePage {
  protected path = '/auth/register';

  selectors = {
    form: {
      firstName_tb: $('#first_name'),
      lastName_tb: $('#last_name'),
      dob_tb: $('#dob'),
      street_tb: $('#street'),
      postalCode_tb: $('#postal_code'),
      city_tb: $('#city'),
      state_tb: $('#state'),
      country_tb: $('#country'),
      phone_tb: $('#phone'),
      email_tb: $('#email'),
      pwd_tb: $('#password'),
      submit_btn: $('button[type="submit"]'),
    },
    errors: {
      email: $('[data-test="email-error"]'),
      registration: $('[data-test="register-error"]'),
    },
  };

  async fillOutForm(newUser: NewUser): Promise<void> {
    await this.selectors.form.firstName_tb.setValue(newUser.firstname);
    await this.selectors.form.lastName_tb.setValue(newUser.lastname);
    await this.selectors.form.dob_tb.setValue(newUser.dob);
    await this.selectors.form.street_tb.setValue(newUser.street);
    await this.selectors.form.postalCode_tb.setValue(newUser.postalcode);
    await this.selectors.form.city_tb.setValue(newUser.city);
    await this.selectors.form.state_tb.setValue(newUser.state);

    // keeping your exact original approach
    await this.selectors.form.country_tb.selectByAttribute('value', newUser.country);

    await this.selectors.form.phone_tb.setValue(newUser.phone);
    await this.selectors.form.email_tb.setValue(newUser.email);
    await this.selectors.form.pwd_tb.setValue(newUser.password);
    await this.selectors.form.submit_btn.click();
  }
}

export default RegistrationPage;
