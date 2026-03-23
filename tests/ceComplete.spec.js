const { test, expect } = require("@playwright/test");
const { cepDocumentComplete } = require("../Utils/ceDocumentComplete");



test.describe('CER Document Test Suite' , () => {

    test('CE Complete Test' , async ({page}) => {

        test.setTimeout(1500000);

        await cepDocumentComplete(page);


    });

});