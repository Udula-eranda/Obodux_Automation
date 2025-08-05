const { expect }  =  require("@playwright/test")


class riskAnalysisMatrixForm {

    constructor(page){

        this.page =  page;
    }

async ramtrixFirstRow(){

    const firstRowAnswers = [ 

        "T1 " , "T1 " , "T1 " , "T1 ",
        "1" , "1 " , "1 " , "T1 ",
        "T1 " , "T1 " , "T1 " , "T1 " ,
        "2 " , "2 " ,"2 " ,"2 " , "T1 "
    ]

    for( let i = 0 ; i < firstRowAnswers.length ; i++){

        const textField  =  this.page.locator("[data-placeholder*='Type']").nth(i)        
        await textField.fill(firstRowAnswers[i]);
    }

}


async ramtrixSecondRow(){

    const secondRowAnswers = [ 

        "T1 " , "T1 " , "T1 " , "T1 ",
        "1" , "1 " , "1 " , "T1 ",
        "T1 " , "T1 " , "T1 " , "T1 " ,
        "2 " , "2 " ,"2 " ,"2 " , "T1 "
    ]

    for (let j = 0; j < secondRowAnswers.length; j++) {
        const i = 34 + j; 
        const textField = this.page.locator("[data-placeholder*='Type']").nth(i);
        await textField.fill(secondRowAnswers[j]);
    }

}

async ramtrixThirdRow(){

    const secondRowAnswers = [ 

        "T1 " , "T1 " , "T1 " , "T1 ",
        "1" , "1 " , "1 " , "T1 ",
        "T1 " , "T1 " , "T1 " , "T1 " ,
        "2 " , "2 " ,"2 " ,"2 " , "T1 "
    ]

    for (let j = 0; j < secondRowAnswers.length; j++) {
        const i = 17 + j; 
        const textField = this.page.locator("[data-placeholder*='Type']").nth(i);
        await textField.fill(secondRowAnswers[j]);
    }


}

async deleteRow(){

    //4th row & 5th row
    const option4Btn =  this.page.getByRole('row', { name: '004 Type... Type... Type...' }).getByRole('img');

    await expect(option4Btn).toBeVisible();
    await expect(option4Btn).toBeEnabled();
    await option4Btn.click();
    
    // Dynamically locate the Delete Row button after DOM has updated
    const delteBtn = this.page.getByRole('button', { name: 'Delete Row' });
    await delteBtn.waitFor({ state: 'visible' }); // ensure it's attached & visible
    await delteBtn.click();

    // 3. Wait for the confirmation dialog to appear
    const confirmDialog = this.page.getByRole('dialog'); // or use a specific locator if needed
    await expect(confirmDialog).toBeVisible();

    // 4. Click the Confirm Delete button inside the dialog
    const confirmDeleteBtn = confirmDialog.getByRole('button', { name: 'Yes, Delete' }); // or the actual button label
    await confirmDeleteBtn.waitFor({ state: 'visible' });
    await confirmDeleteBtn.click();


}
    


}


module.exports = { riskAnalysisMatrixForm } ; 