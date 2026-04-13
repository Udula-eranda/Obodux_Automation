const { LabellingPage } = require('../../PomModels/labellingPom');
const { eifuData } = require('../testData');

async function eifuComplete(page) {
    const labelling = new LabellingPage(page);
    await labelling.navigateToEIFU();
    await labelling.fillEIFU(eifuData);
    await labelling.saveEIFU();
}

module.exports = { eifuComplete };
