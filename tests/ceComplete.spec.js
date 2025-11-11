const { test, expect } = require("@playwright/test");
const { cepDocumentComplete } = require("../Utils/ceDocumentComplete");



test.describe('CER Document Test Suite' , () => {

    test('CE Complete Test' , async ({page}) => {

        test.setTimeout(250000);
        
        await cepDocumentComplete(page);


    });

});