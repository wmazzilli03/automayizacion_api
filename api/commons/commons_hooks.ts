import { Before, After, Status } from "@cucumber/cucumber";
import ApiManager from "./apiManager";
import * as dotenv from "dotenv";
dotenv.config();

export const apiManager = new ApiManager();

const URLS = {
  URL_Base : "https://api.escuelajs.co",
};

Before({ tags: "@api" }, async () => {
  await apiManager.init(URLS.URL_Base);
});


After({ tags: "@api" }, async () => {
  await apiManager.dispose();
});



