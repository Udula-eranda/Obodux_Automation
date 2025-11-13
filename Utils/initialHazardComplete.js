const { rmPlanComplete }  = require('./rmPlanComplete')
const { initialHazardForm }  =require('../PomModels/initialHazardReviewPom')
const { initialHazardFormData }  = require('./testData')

async function initialHazardComplete(page) {

    await rmPlanComplete(page);

    await page.waitForTimeout(15000);
    const ihForm = new initialHazardForm(page);

    //toggle up RM menu
    await ihForm.closeRmPlanPage();

    //Initial Hazard Form open and open questions form
    await ihForm.openIHFormandOpenForm();
   
    
    
    //-------------- Questions Group 1 & 2 filling-------------------------------
    
    await ihForm.fillingForm1andForm2(initialHazardFormData.answers);


    //----------------Questions Group 3 --------------------------
       
    await ihForm.fillingForm3(initialHazardFormData.answers3);
    
    await page.waitForTimeout(7000);
    //clickSavenComplete
    await ihForm.clickSaveAndComplete();


    
}

module.exports = { initialHazardComplete }