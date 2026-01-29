import BasePage from './base.page';

class LoginPage extends BasePage {
  protected path = '/auth/login';

  selectors = {
    email_tb: $('#email'),
    password_tb: $('#password'),
    login_btn: $('[data-test="login-submit"]'),
    error_box: $('[data-test="login-error"]'),
  };

  async login(email: string, password: string): Promise<void> {
    await this.selectors.email_tb.setValue(email);
    await this.selectors.password_tb.setValue(password);
    await this.selectors.login_btn.click();
  }
}

export default LoginPage;
