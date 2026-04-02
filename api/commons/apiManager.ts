
import { request, APIRequestContext } from "@playwright/test";

export default class ApiManager {
  private context!: APIRequestContext;

  async init(baseURL: string) {
    this.context = await request.newContext({
      baseURL,
      extraHTTPHeaders: {
        "Content-Type": "application/json",
      },
    });
  }

  getContext(): APIRequestContext {
    if (!this.context) {
      throw new Error("❌ APIRequestContext no inicializado");
    }
    return this.context;
  }

  async dispose() {
    if (this.context) {
      await this.context.dispose();
    }
  }
}
