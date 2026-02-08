abstract class BasePage {

  protected abstract path: string;

  async open(): Promise<void> {
    await browser.url(this.path);
  }
}

export default BasePage;
