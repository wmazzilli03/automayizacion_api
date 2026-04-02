const options = [
  "--require-module ts-node/register", 
  "--format progress", 
  //"--retry 2", // Retry once if there are failures
].join(" ");

const runApi = [
  "api/features/**/*.feature",
  "--require api/stepDefinitions/**/*.ts", 
  options,
].join(" ");

module.exports = {
  test_api: runApi,
   default: `--format @cucumber/pretty-formatter --format json:./reports/cucumber-report.json`,
};
