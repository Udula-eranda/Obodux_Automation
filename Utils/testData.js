module.exports = {

  URL:{
      siteLink: "https://web.staging.obodux.boris-software.com/",
  },

  validUser: {
    email: 'editor-stag.1@yopmail.com',
    password: 'abcd@TEST123'
  },

  invalidUser: {
    email: 'kaiz.admin@yopmail.com',
    password: 'abcd@TES'
  },

  expected: {
    loginError: 'Incorrect account or password. Please check your input.',
    dashboardTitle: 'Obodux'
  },

  deviceDetails: {
    dName :"Mammography Machine All Document Complete",
    deiveDes : "Used for covering up the face",
    dFilePath: "C:\\Users\\udula\\Downloads\\Mammography Machine.jpg"
  },

  manufacturerData: {
    name: "Pan Piotr Nowak",
    srnNo: "473824726",
    phoneNo: "783647862",
    street: "ul. Piłsudskiego 42/2",
    state: "Wrocław",
    city: "Liverpool",
    postal: "50-033",
    country: "Poland (PL)"
  },

  authoriserData: {
      name: "Bill Lockwood",
      srnNo: "GB-AR-473824728",
      phoneNo: "+447836478624",
      street: "No 23,A",
      state: "West",
      city: "Liverpool",
      postal: "W/1S",
      country: "United Kingdom"
  },

  deviceInfoPageData: {

      dName: "Mammography Machine",
      intendedCount: "500",
      basicUdiDi: "0789123456MAM2024X",
      gmdnCode: "37595",
      emdnCode: "F0501",

      accessoryDescriptionText: "The Mammography Machine is an active diagnostic imaging device designed for breast cancer screening and diagnosis. It uses low-dose X-ray technology to produce high-resolution digital images of breast tissue. Constructed with a digital flat-panel detector, motorised compression paddle, and C-arm configuration, compliant with IEC 60601-2-45 and IEC 60601-1.",
      principleOperationsText: "The device generates controlled low-dose X-ray radiation directed through compressed breast tissue onto a digital flat-panel detector. The motorised compression paddle reduces tissue thickness to improve image contrast and minimise radiation dose. Acquired digital images are processed by the embedded software and transmitted via DICOM to a dedicated radiologist workstation for interpretation.",
      intendedPurposeText: "Intended for breast cancer screening and diagnostic imaging in adult female patients. The device provides high-resolution digital mammographic images to support early detection of breast abnormalities including masses, microcalcifications, and architectural distortions, in accordance with national breast screening programme requirements.",
      indicationsForUseText: "Indicated for digital mammography screening and diagnostic imaging of the breast in adult female patients aged 40 years and above. For use in routine breast cancer screening programmes and diagnostic workup of patients with clinically or imaging-detected breast abnormalities. For use by qualified radiographers under the supervision of a consultant radiologist.",
      knownSideEffectsText: "Breast discomfort and pain during paddle compression are commonly reported, particularly in patients with dense or sensitive breast tissue. Low-dose ionising radiation exposure carries a theoretical small incremental increase in lifetime cancer risk consistent with established radiation protection guidelines. Skin bruising at the compression site may occur in patients with fragile or friable skin.",
      contraindicationsText: "Contraindicated for standard compression views in patients with confirmed breast implants unless modified-compression or implant-displaced views are clinically indicated and approved by the responsible radiologist. Not recommended as a primary screening modality in patients under 40 years unless clinically indicated, due to the relative radiodensity of younger breast tissue.",
      clinicalUseSettingText: "Intended for use exclusively in licensed hospital radiology departments or dedicated breast screening units equipped with radiation shielding, qualified radiography personnel, and quality assurance infrastructure compliant with national breast screening programme requirements and IEC 61223-3-2.",
      intendedUsersText: "Qualified diagnostic radiographers trained and credentialed in mammography, operating under the supervision of consultant radiologists. Users must maintain clinical competency through continuing professional development in mammography techniques and radiation protection as required by national regulatory frameworks.",
      intendedBodyPartText: "The device is applied to the breast. It interacts with breast tissue, skin surface, and underlying chest wall structures during the compression and imaging cycle. Low-dose ionising radiation passes through the compressed breast and is detected by the digital flat-panel detector system.",
      intendedUserEnvironmentText: "Licensed hospital or community radiology departments and dedicated breast cancer screening units with appropriate radiation shielding, controlled access zones, and quality control equipment. Environments must comply with national radiation protection legislation and breast screening programme quality standards including IEC 61223-3-2."

  },

  rmResponsibilityOptions: {

    proceRefNo: "QMS-PRO-017",

    options: [
        "Identifies potential risks",
        "Evaluates risk levels",
        "Implements risk control",
        "Reviews the file",
        "Identifies potential risks",
        "Evaluates risk levels",
        "Implements risk control",
        "Reviews the file",
        ],

    levels: [
        { label: 'Frequent',    name: 'Greater than >',              text: 'T1', number: '2'  },
        { label: 'Probable',    name: 'Greater than or equal ≥',     text: 'T2', number: '8'  },
        { label: 'Occasional',  name: 'Less than <',                 text: 'T3', number: '15' },
        { label: 'Remote',      name: 'Less than or equal to ≤',     text: 'T4', number: '28' },
        { label: 'Improbable',  name: 'Less than <',                 text: 'T5', number: '35' },
        ],

    newProbofHarmValues: {
        fixedValues: [5, 4, 3, 2, 1],
        startDecimal: 0.98,
        decimalDecreaseRange: [0.01, 0.05]
      },

    teamMembers: [
        { code: "QA-01", role: "Quality Assurance Manager" },
        { code: "RE-01", role: "Regulatory Affairs Lead" },
        { code: "CE-01", role: "Clinical Engineer" },
        { code: "RD-01", role: "R&D Engineer" },
        { code: "QA-02", role: "Quality Assurance Engineer" },
        { code: "RE-02", role: "Regulatory Affairs Specialist" },
        { code: "CE-02", role: "Clinical Safety Officer" },
        { code: "RD-02", role: "Senior Design Engineer" },
    ],

    grades: [
        { definition: 'Catastrophic', severity: '10' },
        { definition: 'Critical',     severity: '8'  },
        { definition: 'Moderate',     severity: '5'  },
        { definition: 'Minor',        severity: '3'  },
        { definition: 'Negligible',   severity: '1'  },
    ]

  },

  initialHazardFormData: {

      answers: [
          // Group 1
          "Ionising radiation exposure to patient breast tissue during mammographic image acquisition",
          "Risk of excessive radiation dose delivery due to automatic exposure control (AEC) system malfunction",
          "Risk of breast compression injury from excessive pressure applied by the motorised compression paddle",
          "Electrical shock risk from high-voltage X-ray generator components accessible to clinical staff",
          "Risk of mechanical failure of the C-arm positioning system causing uncontrolled movement during imaging",
          "Risk of skin injury or bruising from compression paddle edges contacting patient breast tissue",
          "Fire risk from electrical fault in the X-ray generator or high-voltage power supply circuitry",
          "Risk of patient fall during positioning if footrest or patient handle design is inadequate",
          "Risk of incorrect diagnosis from degraded image quality due to digital detector calibration drift",
          "Risk of radiation scatter exposure to staff remaining in the room during image acquisition",
          "Thermal burn risk from overheated X-ray tube housing contacting patient or radiographer",
          "Inadequate labelling of control panel functions may lead to incorrect exposure parameter selection",
          "Risk of cross-contamination between patients if compression paddles are not adequately decontaminated",
          "Software malfunction causing incorrect kVp or mAs settings leading to patient under- or over-exposure",
          "Risk of patient data loss or image misidentification due to software or DICOM interface failure",
          "Mechanical failure of compression release mechanism trapping patient breast in an emergency",
          // Group 2
          "Risk of electromagnetic interference with adjacent medical devices from X-ray generator operation",
          "Inadequate image quality from detector artefacts due to manufacturing defect or physical damage",
          "Risk of C-arm vibration or mechanical instability affecting image quality and patient safety",
          "Allergic reaction to compression paddle or detector cover materials contacting patient skin",
          "Risk of incorrect patient positioning leading to suboptimal image quality and repeat radiation exposure",
          "Potential misidentification of device configuration may lead to incorrect imaging protocol selection",
          "Environmental contamination risk from improper disposal of X-ray generating components",
          "Risk of repetitive strain injury to radiographers from operating compression mechanisms repeatedly",
          "Inadequate instructions for use may lead to incorrect patient positioning or exposure parameter setting",
          "Risk of device functional degradation if stored or operated outside specified environmental conditions",
          "Potential for patient identification error if patient demographics are incorrectly entered at workstation",
          "Risk of electrical shock to operator from damaged mains power cable or inadequate protective earth",
          "Risk of incorrect breast thickness measurement leading to suboptimal AEC-driven exposure selection",
          "Risk of radiation leakage from inadequate X-ray tube housing shielding beyond IEC 60601-1-3 limits",
          "Risk of image archival failure causing loss of diagnostic images from PACS integration fault"
      ],

      answers3: [
          "The Mammography Machine incorporates ionising radiation contained within device housing compliant with IEC 60601-1-3",
          "The device emits ionising radiation only during triggered image acquisition and not during standby or positioning",
          "Active electronic components including the digital flat-panel detector and AEC are integral to device function",
          "The device relies on embedded software for image acquisition, processing, and AEC control per IEC 62304",
          "No permanently implantable components are included within the Mammography Machine system",
          "The device does not incorporate biological or animal-derived materials in its construction",
          "The Mammography Machine processes and stores patient imaging data subject to applicable data protection regulations",
          "No latex components are incorporated in the device body; compression paddle covers are latex-free per specification",
          "The device requires an external AC mains power supply for operation of the X-ray generator and detector",
          "No hazardous chemicals are released from the device during normal clinical imaging operation",
          "The Mammography Machine does not incorporate ferromagnetic components that would interfere with MRI equipment",
          "No sterile fluid pathways are incorporated in the Mammography Machine",
          "The device is not intended for implantation; it is an external diagnostic imaging system",
          "The Mammography Machine generates X-ray emissions during acquisition; shielding compliant with IEC 60601-1-3"
      ]

  },

  riskAnalysisMatrixFormData: {

    rows: [
      {
        // Prior: High → Post: Low
        hazard:                 "Ionising radiation exposure to patient breast tissue during mammographic image acquisition",
        sequenceOfEvents:       "AEC system malfunction causes prolonged X-ray exposure beyond intended diagnostic dose",
        hazardousSituation:     "Patient receives radiation dose significantly above the intended diagnostic level during breast imaging",
        harm:                   "Increased risk of radiation-induced harm to breast tissue beyond accepted diagnostic risk threshold",
        riskControlMeasures:    "Dose area product (DAP) meter with automatic exposure termination; AEC validation testing per IEC 60601-2-45",
        riskControlAnalysis:    "Inherently safe design with hardware dose limiting circuit independent of software AEC function",
        riskControlVerification:"AEC accuracy and dose measurement testing per IEC 60601-2-45; type testing and periodic QC verification",
        gsprReference:          "GSPR 1, GSPR 7",
        riskControlOption:      "Inherently Safe Design",
        priorSeverity:          "Catastrophic",
        priorOccurrence:        "Frequent",
        postSeverity:           "Negligible",
        postOccurrence:         "Improbable",
      },
      {
        // Prior: High → Post: Medium
        hazard:                 "Mechanical failure of compression release mechanism trapping patient breast in an emergency",
        sequenceOfEvents:       "Motorised compression drive fails in closed position during imaging with patient breast compressed",
        hazardousSituation:     "Patient breast remains trapped under compression paddle and cannot be released by normal controls",
        harm:                   "Prolonged breast compression causing pain, bruising, tissue ischaemia, or delayed emergency response",
        riskControlMeasures:    "Manual emergency release mechanism accessible without power; audible alarm on compression fault",
        riskControlAnalysis:    "Safe manufacture controls applied to compression drive and emergency release mechanism assembly",
        riskControlVerification:"Manual emergency release force testing; functional testing of compression fault alarm per IEC 60601-2-45",
        gsprReference:          "GSPR 1, GSPR 8",
        riskControlOption:      "Safe Manufacture",
        priorSeverity:          "Catastrophic",
        priorOccurrence:        "Frequent",
        postSeverity:           "Serious",
        postOccurrence:         "Occasional",
      },
      {
        // Prior: Medium → Post: Low
        hazard:                 "Risk of radiation leakage from inadequate X-ray tube housing shielding beyond IEC limits",
        sequenceOfEvents:       "Structural damage to X-ray tube housing during transport or maintenance reduces shielding integrity",
        hazardousSituation:     "Unintended radiation leakage exposes radiographer or other staff outside the primary beam area",
        harm:                   "Unintended occupational radiation exposure to clinical staff beyond permitted annual dose limits",
        riskControlMeasures:    "Lead-lined tube housing designed to IEC 60601-1-3 leakage limits; housing integrity inspection protocol",
        riskControlAnalysis:    "Protective measure via inherent shielding design; visual inspection procedure provided in maintenance manual",
        riskControlVerification:"Leakage radiation measurement per IEC 60601-1-3 at type test and after each service intervention",
        gsprReference:          "GSPR 1, GSPR 11",
        riskControlOption:      "Protective Measures in the Device",
        priorSeverity:          "Serious",
        priorOccurrence:        "Occasional",
        postSeverity:           "Negligible",
        postOccurrence:         "Improbable",
      },
      {
        // Prior: Low → Post: High
        hazard:                 "Software malfunction causing incorrect kVp or mAs settings leading to patient under- or over-exposure",
        sequenceOfEvents:       "Software update introduces regression causing AEC-selected exposure parameters to exceed design limits",
        hazardousSituation:     "Incorrect exposure parameters applied to patient imaging session without operator awareness",
        harm:                   "Patient receives sub-diagnostic or excessive radiation dose resulting in missed diagnosis or radiation harm",
        riskControlMeasures:    "Exposure parameter range limits enforced in hardware; software validated per IEC 62304 prior to release",
        riskControlAnalysis:    "Information for safety provided through operator console display of selected and delivered exposure values",
        riskControlVerification:"Software validation testing per IEC 62304; hardware interlock testing for parameter limit enforcement",
        gsprReference:          "GSPR 13, GSPR 23",
        riskControlOption:      "Information for Safety",
        priorSeverity:          "Negligible",
        priorOccurrence:        "Improbable",
        postSeverity:           "Catastrophic",
        postOccurrence:         "Frequent",
      },
      {
        // Prior: Low → Post: Medium
        hazard:                 "Risk of cross-contamination between patients if compression paddles are not adequately decontaminated",
        sequenceOfEvents:       "Decontamination procedure not followed between patients due to time pressure or inadequate IFU",
        hazardousSituation:     "Contaminated compression paddle surface contacts next patient's breast tissue",
        harm:                   "Transmission of infection between patients via direct contact with contaminated paddle surface",
        riskControlMeasures:    "Compression paddle marked as patient-contact surface requiring decontamination; IFU specifies validated cleaning method",
        riskControlAnalysis:    "Safe manufacture process controls govern paddle material compatibility with approved disinfectants",
        riskControlVerification:"Material compatibility testing of paddle surface with specified disinfectants; usability evaluation of IFU cleaning instructions",
        gsprReference:          "GSPR 1, GSPR 10",
        riskControlOption:      "Safe Manufacture",
        priorSeverity:          "Negligible",
        priorOccurrence:        "Improbable",
        postSeverity:           "Serious",
        postOccurrence:         "Occasional",
      },
    ]

  },

  rmPlanData: {

    overallResidualRisk: "The overall residual risk is acceptable when all individual risks are classified as Low or Medium after risk control measures have been applied. A benefit-risk analysis confirms that the clinical benefits of early breast cancer detection provided by the Mammography Machine substantially outweigh the residual risks associated with low-dose ionising radiation and mechanical compression.",
    listOfProcedures: "QMS-PRO-018: Post-Market Surveillance Procedure\nQMS-PRO-019: Customer Complaint Handling\nQMS-PRO-020: Field Safety Corrective Action\nQMS-PRO-021: Vigilance Reporting Procedure",
    jobTitle: "Quality Assurance Manager"

  },

  cerData : {

    safetyNperform: [
        "A1" , "A1.1" , "A1.1 Desc",
        "B1" , "B1.1" , "B1.1 Desc",
        "C1" , "C1.1" , "C1.1 Desc"
    ] ,

    usabilityTesting : [
        "U1" , "U1.1" , "U1.1 Desc",
        "U2" , "U2.1" , "U2.1 Desc",
        "U3" , "U3.1" , "U3.1 Desc",
    ] ,

    bioCompatability: [
        "B1" , "B1.1" , "B1.1 Desc",
        "B2" , "B2.1" , "B2.1 Desc",
        "B3" , "B3.1" , "B3.1 Desc",
      ]

  },

  checklistData: {

    applicableStandards: [
        {
            standard: "ISO 13485:2016",
            year: "2016",
            clauses: "None",
            justification: "All clauses are applicable to the Mammography Machine quality management system"
        },
        {
            standard: "IEC 60601-1:2005+AMD1:2012",
            year: "2012",
            clauses: "Clause 11.6",
            justification: "Clause 11.6 is not applicable as the Mammography Machine does not incorporate an internal alarm system"
        }
    ]

  },

  vvData: {

    overviewRows: [
        {
            vvNumber: "VV-001",
            title:    "Software Functional Verification",
            aim:      "Verify all software functions of the Mammography Machine image acquisition and processing system operate correctly per the software requirements specification",
            methods:  "Functional test protocol per IEC 62304; review of software requirements specification and individual test case execution records for all software modules",
            results:  "All 52 test cases passed; no critical defects identified; Mammography Machine software confirmed compliant with IEC 62304 Class B requirements"
        },
        {
            vvNumber: "VV-002",
            title:    "Electrical Safety Verification",
            aim:      "Verify that the Mammography Machine meets electrical safety requirements per IEC 60601-1 for active diagnostic X-ray equipment",
            methods:  "Electrical safety testing per IEC 60601-1 by accredited laboratory; dielectric strength, protective earth continuity, and patient leakage current tests",
            results:  "All electrical safety tests passed within accepted limits; Mammography Machine confirmed compliant with IEC 60601-1 general safety requirements"
        },
        {
            vvNumber: "VV-003",
            title:    "Radiation Safety and Image Quality Verification",
            aim:      "Verify that the Mammography Machine meets radiation output, image quality, and AEC performance specifications per IEC 60601-2-45",
            methods:  "Radiation output measurement using calibrated dosimeter; AEC accuracy testing across breast thickness range; MTF and CNR image quality assessment",
            results:  "Mean glandular dose within IEC 60601-2-45 limits; AEC accuracy ±15% across all thicknesses; image quality metrics meet or exceed specification"
        },
        {
            vvNumber: "VV-004",
            title:    "Summative Usability Evaluation",
            aim:      "Validate that trained radiographers can operate the Mammography Machine safely and effectively without critical use errors in a simulated clinical environment",
            methods:  "Summative usability study per IEC 62366-1; 15 trained radiographers; simulated-use protocol covering all critical tasks including compression, exposure, and emergency release",
            results:  "Zero critical use errors recorded across all participants; all essential performance tasks completed successfully; device validated for intended radiographer user population"
        },
        {
            vvNumber: "VV-005",
            title:    "Electromagnetic Compatibility Verification",
            aim:      "Verify that the Mammography Machine meets EMC requirements and does not cause interference with adjacent medical devices in a clinical environment",
            methods:  "EMC testing per IEC 60601-1-2 by accredited laboratory; radiated and conducted emissions measurement; immunity testing per applicable test levels",
            results:  "All EMC emissions within Class B limits; immunity tests passed at all specified test levels; Mammography Machine confirmed compliant with IEC 60601-1-2"
        }
    ]

  },

  uepData: {

    q1DocNumber: "QMS-PRO-022",
    q3DocNumber: "TUEA-001",

    filePath: "C:\\Users\\udula\\Downloads\\Mammography Machine.jpg",

    knownHazards: [
        {
            riskRef:             "H-001",
            hazard:              "Risk of breast compression injury from excessive pressure applied by the motorised compression paddle",
            sequenceOfEvents:    "Radiographer applies compression beyond the recommended maximum pressure for the patient's breast thickness",
            hazardousSituation:  "Excessive compression force applied to patient breast causing pain, bruising, or tissue injury",
            harm:                "Breast tissue bruising or injury to the patient during the mammographic examination",
            riskControlMeasure:  "Compression force display on operator console; maximum force limit enforced by compression drive firmware"
        }
    ],

    hazardUserScenarios: [
        {
            hrusNo:                    "HRUS-001",
            hazardRelatedUserScenario: "Radiographer applies excessive compression force to a patient with sensitive or fragile breast tissue, causing pain or bruising",
            associatedRisk:            "H-001",
            includeInSummative:        "Yes",
            rationale:                 "Critical task with potential for patient harm; compression force monitoring must be evaluated in summative usability study"
        }
    ],

    uiSpecification: [
        {
            uieNo:               "UIE-001",
            uiElement:           "Compression force display",
            expressedUserNeed:   "Radiographers need clear real-time feedback on applied compression force to avoid exceeding safe limits",
            uiRequirements:      "Compression force shall be displayed in decanewtons (daN) on the operator console with colour-coded warning at 150 N per IEC 60601-2-45",
            whenToEvaluate:      "Formative evaluation during design phase; summative evaluation prior to market release",
            uiUnknownProvenance: "No"
        }
    ]

  },

  cerSectionData: {

    equivalenceJustification: "The Mammography Machine clinical evaluation is based on clinical data of the device under evaluation in accordance with MDR 2017/745 Article 61. Sufficient clinical data has been collected through systematic literature review, pre-clinical testing, and post-market surveillance to demonstrate conformity with the applicable GSPRs. Equivalence to a predicate device is not relied upon as the primary route of compliance.",

    pmsDataSummary: "PMS data reviewed for the Mammography Machine covering 2022–2024. Total units deployed: 120 systems across 18 breast screening sites. Total complaints: 4 (rate: 3.3%). Categories: compression paddle alignment query (2), software interface query (1), image quality query (1). No serious adverse events (SAEs) or field safety corrective actions (FSCAs) reported. Post-market data confirms the Mammography Machine maintains an acceptable safety and performance profile for breast screening.",

    summaryAppraisalRows: [
        [ "Smith et al., 2023", "Evaluate digital mammography sensitivity and specificity", "Prospective multicentre study", "n=2,400 screening examinations across 5 centres", "Sensitivity 87.2%; specificity 94.1%; cancer detection rate 7.8 per 1,000 screened", "Digital mammography demonstrates clinical performance consistent with national screening benchmarks", "D1/I1/P1/S1", "I", "High" ],
        [ "Johnson et al., 2022", "Assess mean glandular dose in routine screening practice", "Retrospective dose audit", "n=850 examinations; average compressed breast thickness 55 mm", "Mean glandular dose 1.8 mGy per two-view examination; within EU reference dose guidance", "Dose performance equivalent to comparator digital mammography systems", "D1/I1/P2/S2", "II.1", "Moderate" ],
        [ "PMS Data 2023-2024", "Post-market safety and performance surveillance review", "PMS data analysis", "120 units deployed; 24-month surveillance period", "No SAEs; 4 minor complaints resolved; image quality KPIs met at all sites", "Mammography Machine maintains acceptable benefit-risk profile for breast screening", "D1/I1/P1/S1", "III.1", "Supporting" ],
    ],

    qualifications: [
        {
            name:           "Dr. Sarah Mitchell",
            jobTitle:       "Lead Clinical Evaluator",
            responsibility: "Responsible for conducting and overseeing the clinical evaluation per MDR 2017/745 and MEDDEV 2.7/1 Rev 4",
            qualifications: "MD, PhD — Clinical Research. 12 years medical device clinical evaluation experience including MDR Class IIa–IIb submissions for diagnostic imaging devices"
        },
        {
            name:           "Dr. James Thornton",
            jobTitle:       "Clinical Reviewer",
            responsibility: "Independent clinical data appraisal and scientific validity assessment of literature sources and pre-clinical data",
            qualifications: "MD — Radiology, MSc Regulatory Affairs. 8 years in regulatory and clinical affairs for diagnostic imaging and radiation-emitting medical devices"
        },
    ],

    qualificationPdfPath: "C:\\Users\\udula\\Downloads\\1771864371795-signed-document.pdf",

    changes: [
        { indexNumber: "1", appliedChange: "Initial CER — first issue for regulatory submission under MDR 2017/745" },
        { indexNumber: "2", appliedChange: "Updated pre-clinical data section to include radiation safety validation report RS-003 per IEC 60601-1-3" },
    ],

    preClinicalData: {
        safetyPerformance: [
            [ "SP-001", "Radiation Output and AEC Verification", "X-ray output and AEC accuracy tested per IEC 60601-2-45; all dose parameters within specification" ],
            [ "SP-002", "Compression Force and Emergency Release Testing", "Compression paddle force accuracy and emergency release mechanism tested per IEC 60601-2-45" ],
            [ "SP-003", "Leakage Radiation Measurement", "X-ray tube housing leakage measured per IEC 60601-1-3; all values below 1 mGy/h at 1 m" ],
        ],
        usabilityTesting: [
            [ "UT-001", "Formative Usability Study", "IEC 62366-1 formative evaluation — 8 radiographers; all critical tasks completed; compression force feedback identified as key UI requirement" ],
            [ "UT-002", "Summative Usability Study", "IEC 62366-1 summative evaluation — 15 radiographers; zero critical use errors recorded across all tasks" ],
            [ "UT-003", "Workflow Integration Assessment", "Clinical workflow assessment at two screening sites confirmed device integrates with RIS/PACS without usability issues" ],
        ],
        biocompatibilityReport: [
            [ "BC-001", "Cytotoxicity Assessment", "ISO 10993-5 elution method — no cytotoxic potential identified for compression paddle materials" ],
            [ "BC-002", "Sensitisation Testing", "ISO 10993-10 Guinea pig maximisation test — no sensitisation response observed for paddle cover materials" ],
            [ "BC-003", "Biological Risk Assessment", "ISO 10993-1 biological evaluation plan — all patient-contact materials confirmed biocompatible" ],
        ],
    },

    equivalenceTable: {
        characteristics: [
            { device1: "Digital flat-panel detector; motorised C-arm with compression paddle; integrated AEC; DICOM output", device2: "Digital flat-panel detector with equivalent C-arm and compression system; integrated AEC", differences: "No clinically significant differences in design or detector technology identified" },
            { device1: "Licensed breast screening unit; qualified radiographer; ambient 18–25°C; mains power supply", device2: "Same conditions of use in licensed breast screening or radiology environment", differences: "No differences in conditions of use" },
            { device1: "Detector active area: 24×30 cm; compression force range: 0–200 N; kVp range: 22–35 kVp; Mo/W anode", device2: "Equivalent detector dimensions and compression range; same anode specification", differences: "Specifications are equivalent; no clinically significant difference identified" },
            { device1: "Breast compressed between paddle and detector; X-ray exposure triggered manually or via AEC", device2: "Identical compression and exposure method; same image acquisition technique", differences: "Operating methods are equivalent" },
            { device1: "Digital mammographic imaging for breast cancer screening and diagnosis; DICOM image output", device2: "Same clinical purpose; equivalent image processing and output requirements", differences: "No differences in principles of operation" },
        ],
        justifications: [
            { text: "No clinically significant differences in technical characteristics identified. Both share identical detector technology, AEC principles, and operating parameters per IEC 60601-2-45.", clinicallySig: "No" },
            { text: "Both devices are intended for identical conditions of use in licensed breast screening and radiology environments. No differences affecting safety or performance were identified.", clinicallySig: "No" },
            { text: "Specifications are equivalent. Minor manufacturing tolerances are within the accepted range and do not result in clinically significant differences in image quality or radiation dose.", clinicallySig: "No" },
            { text: "Compression and exposure methods are identical. Both devices are interchangeable in standard mammography workflow without impact on clinical safety or performance.", clinicallySig: "No" },
        ],

        biologicalCharacteristics: [
            { device1: "Compression paddle and detector cover in patient-contact; ISO 10993-1 compliant materials; no implantable components", device2: "Same patient-contact materials; equivalent ISO 10993 compliance", differences: "No differences in materials or substances in contact with patient tissue" },
            { device1: "Transient surface contact with breast tissue during examination (< 30 minutes per session)", device2: "Equivalent contact duration and tissue contact type", differences: "No differences in kind or duration of tissue contact" },
            { device1: "No degradable components in patient-contact areas; no particulate release under normal conditions", device2: "Same release characteristics; no degradation products identified", differences: "No differences in release characteristics or degradation behaviour" },
        ],
        biologicalJustifications: [
            { text: "Both devices use the same ISO 10993-1 compliant materials for patient-contact components. No clinically significant biological differences identified.", clinicallySig: "No" },
            { text: "Both devices have equivalent transient contact duration with breast tissue. No biological safety concerns arising from differences in contact.", clinicallySig: "No" },
            { text: "Neither device releases degradation products or particulates under normal use conditions. Release characteristics are equivalent.", clinicallySig: "No" },
            { text: "Overall biological characteristics are equivalent. No clinically significant differences identified across all biological characteristic criteria assessed.", clinicallySig: "No" },
        ],

        clinicalCharacteristics: [
            { device1: "Digital mammography for breast cancer screening and diagnostic imaging in adult female patients", device2: "Same clinical indication; identical purpose and patient population", differences: "No differences in clinical condition or purpose" },
            { device1: "Breast — external compression and X-ray imaging of breast tissue", device2: "Identical anatomical site of use", differences: "No differences in site in the body" },
            { device1: "Adult female patients aged 40 and above attending breast screening or diagnostic imaging", device2: "Equivalent intended patient population; no difference in age range or anatomy", differences: "No differences in patient population" },
            { device1: "Qualified diagnostic radiographers credentialed in mammography", device2: "Same intended user type and training requirements", differences: "No differences in kind of user" },
            { device1: "High-resolution breast imaging; cancer detection; early-stage lesion visualisation", device2: "Equivalent critical performance requirements; same clinical imaging endpoints", differences: "No differences in relevant critical performance" },
        ],
        clinicalJustifications: [
            { text: "Both devices share the same clinical indication for digital mammography screening and diagnosis. No clinically significant differences in clinical condition, purpose, or patient population addressed.", clinicallySig: "No" },
            { text: "Both devices are used at the identical anatomical site — the breast. No differences in body site or tissue interaction.", clinicallySig: "No" },
            { text: "Both devices target the same adult female patient population. No differences in patient population affecting safety or performance.", clinicallySig: "No" },
            { text: "Both devices are intended for qualified radiographers. Intended user type and required competency level are equivalent.", clinicallySig: "No" },
        ],
        clinicalSummary: "Based on the assessment of technical, biological, and clinical characteristics, the devices are considered equivalent under MDR 2017/745 Annex XIV. No clinically significant differences were identified across all assessed criteria. The equivalent device provides an adequate clinical evidence base for the Mammography Machine under evaluation.",
    },

  },

  fepData: {
    planName: "FEP-001 Mammography Machine Formative Evaluation Plan",
  },

  labelsData: {

    deviceLabel: {
      labelNumber:        "LBL-DEV-001",
      revNumber:          "Rev A",
      labelDescription:   "Device label for Mammography Machine indicating CE marking, UDI, intended use, radiation warning symbol, and manufacturer details per MDR 2017/745 Annex I requirements. Label shall be permanently affixed to the device housing and remain legible throughout the device operational lifetime.",
      labelSpecification: "Label dimensions: 100 mm × 60 mm. Material: anodised aluminium plate with engraved text. Print method: laser engraving. All text minimum 1.0 mm character height. Compliant with ISO 15223-1 symbol requirements, IEC 60601-2-45 labelling provisions, and MDR 2017/745 Annex I Chapter III.",
    },

    packagingLabel: {
      labelNumber:        "LBL-PKG-001",
      revNumber:          "Rev A",
      labelDescription:   "Packaging label for Mammography Machine shipping crate indicating fragile handling requirements, orientation indicators, storage conditions, serial number, and batch traceability information per EU MDR 2017/745 and applicable transport regulations.",
      labelSpecification: "Label dimensions: 200 mm × 100 mm. Material: weatherproof polypropylene with permanent acrylic adhesive. Compliant with ISO 15223-1 symbol requirements for packaging. Font size minimum 2 mm for all mandatory information. Includes fragile and this-way-up pictograms.",
    },

    implantableDevice: "No",

    imagePath: "C:\\Users\\udula\\Downloads\\Mammography Machine.jpg",

  },

  eifuData: {
    eifuPresent:           "yes",
    eifuWithHardCopy:      "yes",
    selectFirstRisk:       true,
    eifuURL:               "https://www.example.com/mammography-machine-ifu",
  },

  accompanyingDocsData: {

    ifu: {
      documentNumber: "IFU-001",
      revNumber:      "Rev A",
      language:       "English",
      countries:      "United Kingdom",
      pdfPath:        "C:\\Users\\udula\\Downloads\\1771864371795-signed-document.pdf",
    },

    accompanyingDocument: {
      documentNumber: "ACCOMP-001",
      revNumber:      "Rev A",
      documentName:   "Mammography Machine Instructions for Use - Greek Translation",
      language:       "Greek",
      countries:      "Greece",
      description:    "Greek language translation of the Instructions for Use for the Mammography Machine, provided to comply with EU MDR 2017/745 labelling requirements for medical devices distributed in Greece. Includes all mandatory safety, radiation protection, and performance information as required under Annex I Chapter III.",
      pdfPath:        "C:\\Users\\udula\\Downloads\\1771864371795-signed-document.pdf",
    },

  },

  pmsPlanData: {

    dataCollection: [
      { responsibility: 'Quality Manager',         howOften: 'Continuously and annually',       procedureRef: 'SOP-PMS-001' },
      { responsibility: 'Quality Manager',         howOften: 'Quarterly and annually',          procedureRef: 'SOP-PMS-002' },
      { responsibility: 'Regulatory Affairs',      howOften: 'Quarterly',                       procedureRef: 'SOP-PMS-003' },
      { responsibility: 'Clinical Affairs',        howOften: 'Annually',                        procedureRef: 'SOP-PMS-004' },
      { responsibility: 'Customer Service',        howOften: 'Continuously and quarterly',      procedureRef: 'SOP-PMS-005' },
      { responsibility: 'Production Manager',      howOften: 'Monthly',                         procedureRef: 'SOP-PMS-006' },
      { responsibility: 'Service Manager',         howOften: 'As reported and annually',        procedureRef: 'SOP-PMS-007' },
      { responsibility: 'Service Manager',         howOften: 'As reported and annually',        procedureRef: 'SOP-PMS-008' },
      { responsibility: 'Regulatory Affairs',      howOften: 'Annually',                        procedureRef: 'SOP-PMS-009' },
      { responsibility: 'Supply Chain Manager',    howOften: 'Quarterly',                       procedureRef: 'SOP-PMS-010' },
      { responsibility: 'Clinical Affairs',        howOften: 'Annually',                        procedureRef: 'SOP-PMS-011' },
      { responsibility: 'Software Manager',        howOften: 'Continuously and monthly',        procedureRef: 'SOP-PMS-012' },
      { responsibility: 'Software Manager',        howOften: 'As released and quarterly',       procedureRef: 'SOP-PMS-013' },
    ],

    nonCollectedData: [
      'Serious incident data is actively collected; all incidents are reported and investigated per SOP-PMS-001.',
      'Non-serious incident and side-effect data are actively collected via the complaint handling process per SOP-PMS-002.',
      'Trend data is actively collected through internal quality systems and reported quarterly.',
      'Literature and database searches are conducted annually; all relevant findings are documented and reviewed.',
      'User feedback and complaints are actively collected through the CRM system and distributor reports.',
      'Production monitoring data is actively collected and reviewed as part of the QMS on a monthly basis.',
      'Installation data is actively collected through field service reports for each installation activity.',
      'Maintenance data is actively collected through field service reports for each maintenance activity.',
      'Competitor and similar device data is collected through annual market surveillance activities.',
      'Supply chain information is actively collected through supplier qualification and ongoing monitoring.',
      'State of the art information is reviewed annually through literature searches and standards monitoring.',
      'Software defects and issues are tracked in the defect tracking system and reviewed monthly.',
      'SOUP updates are monitored via supplier notifications and software bill of materials (SBOM) reviews.',
    ],

    frequencyPMS: 'Annually, or more frequently if triggered by a safety-related event or regulatory requirement.',

  },

  pmcfData: {

    // Section 1: Introduction
    introduction: {
      novelDevice:             'Yes',
      novelClinicalProcedures: 'Yes',
      explainNovelFeatures:    'The Mammography Machine incorporates a novel dual-energy spectral imaging capability that enables tissue composition analysis alongside standard mammographic imaging. It also introduces a novel AI-assisted lesion detection module that provides real-time image quality feedback to the radiographer during acquisition, representing a novel clinical workflow for breast screening.',
      conductFollowUp:         'Yes',
    },

    // Section 2: PMCF Activities
    activities: [
      {
        activityRef:   'PMCF-ACT-001',
        description:   'Systematic literature review and registry data collection to monitor long-term safety, radiation dose performance, and clinical effectiveness of the Mammography Machine in routine breast screening practice',
        activityType:  'Post-Market Clinical Study',
        source:        'Post-market surveillance activities',
        procedureType: 'general',
        timelines:     'Q4 2025 - Q4 2027',
      },
      {
        activityRef:   'PMCF-ACT-002',
        description:   'Structured survey of radiographers and radiologists to assess clinical performance, AI-assisted detection module usability, and any adverse events or near-misses associated with the Mammography Machine in routine clinical use',
        activityType:  'Healthcare Professional Survey',
        source:        'Direct user feedback collection',
        procedureType: 'specific',
        timelines:     'Q1 2026 - Q4 2026',
      },
    ],

    evaluationReportDate: { day: 15, month: 12, year: 2026 },

    // Section 3: Ref to Technical Documentation
    technicalDocumentation: {
      cerRelevant: 'Yes',
      cerInfo:     'Clinical evidence from the CER identifies residual uncertainties regarding long-term performance of the AI-assisted lesion detection module across diverse patient populations and breast tissue densities. These findings should be monitored through the PMCF plan to validate continued clinical effectiveness across the intended population.',
      rmfRelevant: 'Yes',
      rmfInfo:     'The Risk Management File identifies residual risks related to AEC performance drift over device lifetime and potential for dose creep in high-density breast tissue populations. These risks require ongoing monitoring through PMCF activities to validate the effectiveness of existing risk control measures and confirm acceptable mean glandular dose levels.',
    },

    // Section 4: Equivalent / similar device
    equivalentDevices: [
      {
        productName:       'Hologic Selenia Dimensions',
        intendedPurpose:   'Full-field digital mammography and digital breast tomosynthesis system for breast cancer screening and diagnostic imaging',
        intendedUsers:     'Qualified radiographers and radiologists in licensed breast screening and radiology units',
        patientPopulation: 'Adult female patients aged 40 and above attending breast cancer screening or diagnostic imaging',
        medicalCondition:  'Breast cancer screening and early detection of breast abnormalities',
        indication:        'Digital mammography and tomosynthesis imaging for breast cancer detection and diagnosis',
        cerReference:      'CER Section 5.2 - Equivalent Device Analysis, Table 3',
      },
      {
        productName:       'GE Senographe Pristina',
        intendedPurpose:   'Digital mammography system with patient-assisted compression for breast cancer screening and diagnosis',
        intendedUsers:     'Radiographers and radiologists in hospital and community breast screening environments',
        patientPopulation: 'Adult female patients participating in routine breast cancer screening programmes',
        medicalCondition:  'Breast cancer screening, lesion characterisation, and diagnostic mammographic workup',
        indication:        'Digital mammographic imaging with patient-centred compression design for breast screening',
        cerReference:      'CER Section 5.2 - Equivalent Device Analysis, Table 4',
      },
      {
        productName:       'Siemens Mammomat Revelation',
        intendedPurpose:   'Digital mammography system with intelligent AEC and advanced image processing for breast cancer screening and diagnosis',
        intendedUsers:     'Trained radiographers and diagnostic radiologists in accredited breast imaging facilities',
        patientPopulation: 'Adult female patients undergoing breast cancer screening or diagnostic imaging procedures',
        medicalCondition:  'Detection and characterisation of breast masses, microcalcifications, and architectural distortions',
        indication:        'High-resolution digital mammographic imaging for breast cancer screening and diagnostic workup',
        cerReference:      'CER Section 5.2 - Equivalent Device Analysis, Table 5',
      },
    ],

    // Section 5: Guidance on PMCF
    guidanceOnPMCF: [
      'MDCG 2020-7 Guidance on PMCF Plan Template - A guide for manufacturers and notified bodies',
      'MDCG 2020-8 Guidance on PMCF Evaluation Report Template - Post Market Clinical Follow-up Evaluation Report',
    ],

  },

  sepData: {

    uploadFilePath: "C:\\Users\\udula\\Downloads\\1768975517101-signed-document (1).pdf",

    testParticipantGroupings: "Participants will be divided into two groups: Group A — experienced radiographers with more than 5 years of dedicated mammography practice; Group B — radiographers within their first 2 years of mammography training. Each group will consist of a minimum of 5 participants to ensure adequate representation of the intended user population.",

    correctUseTasks: [
        {
            hrusNo:      "HRUS-001",
            scenario:    "Radiographer applies compression paddle without confirming breast tissue is correctly positioned on detector, resulting in suboptimal image requiring repeat exposure",
            correctUse:  "Confirm breast tissue is correctly centred and positioned on the detector surface before applying compression; perform visual check of tissue position before initiating compression"
        },
        {
            hrusNo:      "HRUS-002",
            scenario:    "Radiographer fails to confirm patient identity at the workstation before initiating image acquisition, resulting in potential patient identification mismatch",
            correctUse:  "Verify patient identity by confirming name and date of birth at the workstation against the examination request before selecting acquisition protocol and initiating exposure"
        }
    ]

  }

};
