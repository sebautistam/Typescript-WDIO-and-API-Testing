abstract class BasePage {
  // each page must define its own path
  protected abstract path: string;

  async open(): Promise<void> {
    await browser.url(this.path);
  }
}

export default BasePage;
