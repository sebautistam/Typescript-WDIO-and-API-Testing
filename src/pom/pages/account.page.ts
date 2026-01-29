import BasePage from './base.page';

class AccountPage extends BasePage {
  protected path = '/account';

  selectors = {
    changeprof_btn: $('[data-test="nav-profile"]'),

    info_form: {
      country_tb: $('[data-test="country"]'),
      postcode_tb: $('[data-test="postal_code"]'),
      updateprof_btn: $('[data-test="update-profile-submit"]'),
      success_box: $('.alert.alert-success'),
    },

    pwd_form: {
      currentpwd_tb: $('[data-test="current-password"]'),
      newpwd_tb: $('[data-test="new-password"]'),
      newpwdconf_tb: $('[data-test="new-password-confirm"]'),
      submitnewpwd_btn: $('[data-test="change-password-submit"]'),
      error_box: $('.alert.alert-danger'),
    },
  };

  async changeProfile(): Promise<void> {
    await this.selectors.changeprof_btn.click();
  }

  async updatePassword(oldPassword: string, newPassword: string, newPasswordConfirm: string): Promise<void> {
    await this.selectors.pwd_form.currentpwd_tb.setValue(oldPassword);
    await this.selectors.pwd_form.newpwd_tb.setValue(newPassword);
    await this.selectors.pwd_form.newpwdconf_tb.setValue(newPasswordConfirm);
    await this.selectors.pwd_form.submitnewpwd_btn.click();
  }
}

export default AccountPage;
