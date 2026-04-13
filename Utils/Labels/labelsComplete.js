const { LabellingPage } = require('../../PomModels/labellingPom');
const { labelsData } = require('../testData');

async function labelsComplete(page) {

    const labelling = new LabellingPage(page);

    // ── Navigate to Labels sub-section ────────────────────────────────────────
    await labelling.navigateToLabels();

    // ── Device Labels ─────────────────────────────────────────────────────────
    await labelling.fillDeviceLabel({
        labelNumber:        labelsData.deviceLabel.labelNumber,
        revNumber:          labelsData.deviceLabel.revNumber,
        labelDescription:   labelsData.deviceLabel.labelDescription,
        labelSpecification: labelsData.deviceLabel.labelSpecification,
        imagePath:          labelsData.imagePath,
    });

    // ── Packaging Labels ──────────────────────────────────────────────────────
    await labelling.fillPackagingLabel({
        labelNumber:        labelsData.packagingLabel.labelNumber,
        revNumber:          labelsData.packagingLabel.revNumber,
        labelDescription:   labelsData.packagingLabel.labelDescription,
        labelSpecification: labelsData.packagingLabel.labelSpecification,
        imagePath:          labelsData.imagePath,
    });

    // ── Is this device an implantable device? ─────────────────────────────────
    await labelling.selectImplantableDevice(labelsData.implantableDevice);

    // ── Save + Mark Section Complete ──────────────────────────────────────────
    await labelling.saveLabels();

    console.log('Labels: Complete ✓');

}

module.exports = { labelsComplete };
