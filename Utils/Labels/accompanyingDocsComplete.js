const { LabellingPage } = require('../../PomModels/labellingPom');
const { accompanyingDocsData } = require('../testData');

async function accompanyingDocsComplete(page) {
    const labelling = new LabellingPage(page);

    await labelling.navigateToAccompanyingDocs();
    await labelling.fillIFU(accompanyingDocsData.ifu);
    await labelling.fillAccompanyingDocument(accompanyingDocsData.accompanyingDocument);
    await labelling.saveAccompanyingDocs();
}

module.exports = { accompanyingDocsComplete };
