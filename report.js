const { generate } = require("cucumber-html-reporter");

/** @type {import('cucumber-html-reporter').Options} */
const reportName = process.argv[2] || "report";

const options = {
  theme: "bootstrap",
  jsonFile: "report/cucumber_report.json",
  output: `report/${reportName}.html`, 
  reportSuiteAsScenarios: true,
  scenarioTimestamp: true,
  launchReport: false,
  storeScreenshots: true, 
  metadata: {
    "App Version": "0.1.0",
    "Test Environment": "test",
    "Browser": "Chrome 114",
    "Platform": "Windows 11",
    "Executed": "Local",
    "Author": "Walberto Mazzilli",
    "Generated At": new Date().toLocaleString()
  },
  screenshotsDirectory: "report/screenshots", 
};

generate(options);
