const { test }  = require('@playwright/test')
const { riskManagementReportComplete }  = require("../Utils/riskManagementReportComplete")


test('Full Authorizer Flow' , async ({page}) => {

    test.setTimeout(350000);

    await riskManagementReportComplete(page);


})