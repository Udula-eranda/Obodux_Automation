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
    dName :"Surgical Mask All Doc Complete 2",
    deiveDes : "Used for covering up the face",
    dFilePath: "C:\\Users\\udula\\Downloads\\Surgical Mask.jpg"
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

      dName: "Surgical Mask",
      intendedCount: "1000000",
      basicUdiDi: "0456789123MRI2024X",
      gmdnCode: "40763",
      emdnCode: "Y0101",

      accessoryDescriptionText: "The Trocar is a precision surgical instrument for minimally invasive body cavity access, featuring a sharp tip for controlled tissue penetration and a hollow shaft for instrument insertion. Constructed from biocompatible stainless steel, compliant with ISO 10993 and EN ISO 13485.",
      principleOperationsText: "The device applies controlled axial force to penetrate tissue layers. The sharpened tip geometry minimises insertion resistance while the hollow shaft maintains a clear access channel. An integrated valve mechanism prevents CO2 gas loss, maintaining intra-abdominal pressure during laparoscopic procedures.",
      intendedPurposeText: "Creates reliable access points in body cavities during minimally invasive surgery. Intended for use by trained surgeons in sterile operating theatre environments, compliant with established surgical protocols and ISO 14971 risk management requirements.",
      indicationsForUseText: "Indicated for laparoscopic and thoracoscopic procedures requiring trocar access. Suitable for adult patients undergoing minimally invasive abdominal, pelvic, or thoracic surgery performed under general anaesthesia by a qualified surgical team.",
      knownSideEffectsText: "Port-site pain and localised bruising are commonly reported post-operatively. Subcutaneous emphysema may occur from CO2 gas leakage around the trocar shaft. Rare complications include port-site hernia formation and minor bleeding at the insertion site following removal.",
      contraindicationsText: "Contraindicated in patients with severe coagulopathy or active bleeding disorders where haemostasis cannot be assured. Not indicated for use where dense abdominal adhesions are present at the intended insertion site, unless assessed as clinically appropriate by the operating surgeon.",
      clinicalUseSettingText: "Intended for use exclusively in sterile hospital operating theatre environments equipped with laparoscopic insufflation equipment and intraoperative imaging capability. All procedures must be performed by surgeons credentialed in minimally invasive surgical techniques.",
      intendedUsersText: "Qualified and trained surgical professionals, including consultant surgeons and supervised surgical trainees, operating within a hospital or accredited surgical facility. Users must hold appropriate credentials and experience in laparoscopic and minimally invasive surgical procedures.",
      intendedBodyPartText: "The device is applied to the anterior abdominal wall to access the peritoneal cavity during laparoscopic procedures. It interacts with skin, subcutaneous tissue, fascial layers, and the peritoneum during insertion and throughout the duration of the surgical procedure.",
      intendedUserEnvironmentText: "Hospital operating theatres with full anaesthetic support, maintained sterile field, and functioning laparoscopic imaging and insufflation systems. The environment must comply with applicable infection control standards and provide adequate space for safe surgical team operation."

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
        { label: 'Frequent', name: 'Greater than >' ,  text: 'T1', number: '2' },
        { label: 'Probable', name: 'Greater than or equal ≥' , text: 'T2', number: '8' },
        { label: 'Occasional', name: 'Less than <' , text: 'T3', number: '15' },
        { label: 'Remote', name: 'Less than or equal to ≤' , text: 'T4', number: '28' },
        { label: 'Improbable', name: 'Less than <' , text: 'T5', number: '35' },
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
          "Sharp trocar tip presents puncture and laceration hazard during handling and insertion",
          "Risk of unintended organ or vessel perforation during blind insertion into the abdominal cavity",
          "Risk of infection if device is not properly sterilised prior to use in accordance with IFU",
          "Air embolism risk during laparoscopic CO2 insufflation through the trocar access channel",
          "Mechanical failure of the trocar valve seal may result in loss of pneumoperitoneum",
          "Risk of port-site bleeding following inadequate haemostasis upon trocar removal",
          "Biocompatibility risk if device material degrades or releases particulates into tissue",
          "Risk of hernia formation at the trocar insertion site post-operatively",
          "Thermal injury risk if device is subjected to sterilisation temperatures beyond specification",
          "Risk of subcutaneous emphysema from CO2 gas leakage around the trocar shaft",
          "Incorrect assembly of trocar components may lead to functional failure during procedure",
          "Inadequate labelling may lead to incorrect device selection or misuse by clinical staff",
          "Packaging failure may compromise sterility of the device prior to use",
          "Risk of retained foreign body if device fragments or components detach during use",
          "Risk of contamination during reprocessing if cleaning and sterilisation instructions are not followed",
          "Risk of pressure injury or tissue necrosis from improper trocar positioning",
          // Group 2
          "Risk of nerve damage from improper trocar placement near neural structures",
          "Trocar valve failure may allow uncontrolled gas leakage during laparoscopic procedures",
          "Risk of device slippage if ergonomic grip becomes compromised during use",
          "Compatibility concerns with specific patient anatomies such as morbid obesity",
          "Risk of allergic reaction to surface coating materials applied to the device",
          "Potential misidentification of device size may lead to incorrect clinical application",
          "Environmental contamination risk if device is not disposed of in accordance with regulations",
          "Risk of ergonomic injury to surgical staff from prolonged or repetitive device use",
          "Inadequate instructions for use may lead to improper device deployment or removal",
          "Risk of device functional degradation if stored outside recommended environmental conditions",
          "Potential for cross-contamination if single-use device is reused contrary to IFU",
          "Risk of electrosurgical interference if device is used in proximity to active electrodes",
          "Hypothermia risk from prolonged insufflation of unwarmed CO2 gas through the trocar",
          "Risk of trocar dislodgement during instrument exchange due to inadequate port fixation",
          "Risk of inadequate pneumoperitoneum if trocar sizing does not match the cannula diameter"
      ],

      answers3: [
          "The Trocar does not incorporate radioactive materials in its construction or operation",
          "The device does not emit ionising radiation during normal clinical use",
          "No active electronic components are incorporated into the Trocar device design",
          "The device does not rely on embedded software or firmware for its primary function",
          "No permanently implantable components are included within the Trocar system",
          "The device does not incorporate biological or animal-derived materials in its construction",
          "The Trocar does not generate or store any patient data during or after use",
          "No latex components are incorporated in the device body or accessory components",
          "The device does not interface with any external power source during surgical operation",
          "No toxic or hazardous chemicals are released from the device during normal clinical use",
          "The Trocar does not incorporate magnetic components that may interfere with MRI equipment",
          "No sterile fluid pathways beyond the trocar access channel are incorporated in the device",
          "The device is not intended for long-term or permanent implantation in the patient",
          "The Trocar does not generate electromagnetic emissions that interfere with other medical devices"
      ]

  },

  riskAnalysisMatrixFormData: {

    rows: [
      {
        // Prior: High → Post: Low
        hazard:                 "Sharp trocar tip presents puncture and laceration hazard during handling and insertion",
        sequenceOfEvents:       "User handles trocar without protective cap during pre-operative setup in theatre",
        hazardousSituation:     "Exposed sharp trocar tip contacts user hand during device preparation phase",
        harm:                   "Puncture wound or laceration to surgeon or scrub nurse hand",
        riskControlMeasures:    "Protective tip cap included with device; IFU instructs removal only at point of use",
        riskControlAnalysis:    "Inherently safe design considered; protective cap provides primary risk reduction",
        riskControlVerification:"Inspection and functional testing of protective cap retention and removal force",
        gsprReference:          "GSPR 1, GSPR 7",
        riskControlOption:      "Inherently Safe Design",
        priorSeverity:          "Catastrophic",
        priorOccurrence:        "Frequent",
        postSeverity:           "Negligible",
        postOccurrence:         "Improbable",
      },
      {
        // Prior: High → Post: Medium
        hazard:                 "Pneumatic seal failure during laparoscopic procedure causing loss of insufflation",
        sequenceOfEvents:       "Seal valve degrades under repeated instrument insertion causing gas leakage",
        hazardousSituation:     "Intraoperative loss of pneumoperitoneum during active surgical procedure",
        harm:                   "Prolonged operative time, conversion to open surgery, patient harm from collapsed working space",
        riskControlMeasures:    "High-performance elastomer seal designed to withstand minimum 50 instrument cycles",
        riskControlAnalysis:    "Safe manufacture controls applied to seal component production and incoming inspection",
        riskControlVerification:"Seal leak testing at 20 mmHg across sample from each production batch",
        gsprReference:          "GSPR 1, GSPR 8",
        riskControlOption:      "Safe Manufacture",
        priorSeverity:          "Catastrophic",
        priorOccurrence:        "Frequent",
        postSeverity:           "Serious",
        postOccurrence:         "Occasional",
      },
      {
        // Prior: Medium → Post: Low
        hazard:                 "Sterility breach due to damaged or compromised packaging",
        sequenceOfEvents:       "Packaging integrity failure occurs during transport or storage prior to use",
        hazardousSituation:     "Non-sterile device introduced into sterile surgical field",
        harm:                   "Surgical site infection leading to patient morbidity",
        riskControlMeasures:    "Double sterile barrier packaging with integrity indicators; visual inspection protocol in IFU",
        riskControlAnalysis:    "Protective measure via packaging design; tamper-evident seal provides visible breach detection",
        riskControlVerification:"Package integrity testing per ISO 11607; accelerated ageing study for 3-year shelf life",
        gsprReference:          "GSPR 1, GSPR 11",
        riskControlOption:      "Protective Measures in the Device",
        priorSeverity:          "Serious",
        priorOccurrence:        "Occasional",
        postSeverity:           "Negligible",
        postOccurrence:         "Improbable",
      },
      {
        // Prior: Low → Post: High
        hazard:                 "Incorrect size selection by user leading to inadequate tissue sealing",
        sequenceOfEvents:       "Clinician selects trocar diameter incompatible with planned instrument size",
        hazardousSituation:     "Instrument–trocar mismatch causes intraoperative gas leak and loss of working space",
        harm:                   "Extended procedure time and potential patient harm from compromised visualisation",
        riskControlMeasures:    "Size clearly labelled on device and packaging; IFU includes size selection table",
        riskControlAnalysis:    "Information for safety provided through labelling and instructions for use",
        riskControlVerification:"Label legibility testing; usability study confirming correct size selection from IFU",
        gsprReference:          "GSPR 13, GSPR 23",
        riskControlOption:      "Information for Safety",
        priorSeverity:          "Negligible",
        priorOccurrence:        "Improbable",
        postSeverity:           "Catastrophic",
        postOccurrence:         "Frequent",
      },
      {
        // Prior: Low → Post: Medium
        hazard:                 "Residual EO sterilisation agent exceeding acceptable limits on device surface",
        sequenceOfEvents:       "Inadequate aeration time post EO sterilisation cycle leads to residual EO retention",
        hazardousSituation:     "Device with elevated EO residuals introduced into patient body cavity",
        harm:                   "Local tissue irritation or systemic toxicity at insertion site",
        riskControlMeasures:    "EO aeration protocol validated per ISO 10993-7; residual limits tested per batch",
        riskControlAnalysis:    "Safe manufacture process controls govern sterilisation cycle and aeration parameters",
        riskControlVerification:"EO residual testing on finished device per ISO 10993-7 acceptance criteria",
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

    overallResidualRisk: "The overall residual risk is acceptable when all individual risks are classified as Low or Medium after risk control measures. A benefit-risk analysis confirms clinical benefits outweigh the residual risks for the Trocar device.",
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
            justification: "All clauses are applicable to the ISH Machine 2 quality management system"
        },
        {
            standard: "IEC 60601-1:2005+AMD1:2012",
            year: "2012",
            clauses: "Clause 11.6",
            justification: "Clause 11.6 is not applicable as the device does not incorporate an alarm system"
        }
    ]

  },

  vvData: {

    overviewRows: [
        {
            vvNumber: "VV-001",
            title:    "Software Functional Verification",
            aim:      "Verify all software functions of the ISH Machine 2 control system operate correctly per the software requirements specification",
            methods:  "Functional test protocol per IEC 62304; review of software requirements specification and individual test case execution records",
            results:  "All 47 test cases passed; no critical defects identified; ISH Machine 2 software confirmed compliant with IEC 62304"
        },
        {
            vvNumber: "VV-002",
            title:    "Electrical Safety Verification",
            aim:      "Verify that the ISH Machine 2 meets electrical safety requirements per IEC 60601-1 for laboratory diagnostic equipment",
            methods:  "Electrical safety testing per IEC 60601-1 by accredited laboratory; dielectric strength, earth continuity, and leakage current tests",
            results:  "All electrical safety tests passed within accepted limits; ISH Machine 2 compliant with IEC 60601-1 general safety requirements"
        },
        {
            vvNumber: "VV-003",
            title:    "Optical Performance Verification",
            aim:      "Verify that the fluorescence detection module of the ISH Machine 2 meets the optical performance specifications defined in the design output",
            methods:  "Wavelength accuracy measurement using calibrated reference sources; signal-to-noise ratio assessment per IFU specification; repeatability testing",
            results:  "Wavelength accuracy ±1.8 nm (within ±2 nm specification); SNR exceeds minimum specification; optical performance fully verified"
        },
        {
            vvNumber: "VV-004",
            title:    "Summative Usability Evaluation",
            aim:      "Validate that trained laboratory users can operate the ISH Machine 2 safely and effectively without critical use errors in a simulated use environment",
            methods:  "Summative usability study per IEC 62366-1; 15 trained laboratory technicians; simulated-use protocol covering all critical tasks per task analysis",
            results:  "Zero critical use errors recorded across all participants; all essential performance tasks completed successfully; device validated for intended user population"
        },
        {
            vvNumber: "VV-005",
            title:    "Biocompatibility Verification",
            aim:      "Verify that all materials in the ISH Machine 2 that may contact operators or samples are biocompatible in accordance with ISO 10993",
            methods:  "Biological evaluation per ISO 10993-1; cytotoxicity per ISO 10993-5 (elution method); sensitisation per ISO 10993-10; material characterisation report",
            results:  "All biocompatibility endpoints passed; no cytotoxic potential or sensitisation response identified; all contact materials confirmed biocompatible per ISO 10993"
        }
    ]

  },

  uepData: {

    // Document numbers for the upload tables
    q1DocNumber: "QMS-PRO-022",
    q3DocNumber: "TUEA-001",

    // PDF path for uploads (update to a real PDF if needed; must be < 5 MB)
    filePath: "C:\\Users\\udula\\Downloads\\Trocar.jpg",

    knownHazards: [
        {
            riskRef:             "H-001",
            hazard:              "Sharp trocar tip presents puncture and laceration hazard during handling and insertion",
            sequenceOfEvents:    "User handles trocar without protective cap during pre-operative setup in theatre",
            hazardousSituation:  "Exposed sharp trocar tip contacts user hand during device preparation phase",
            harm:                "Puncture wound or laceration to surgeon or scrub nurse hand",
            riskControlMeasure:  "Protective tip cap included with device; IFU instructs removal only at point of use"
        }
    ],

    hazardUserScenarios: [
        {
            hrusNo:                    "HRUS-001",
            hazardRelatedUserScenario: "User fails to notice the protective cap is missing and proceeds with trocar insertion, resulting in unintended tissue puncture",
            associatedRisk:            "H-001",
            includeInSummative:        "Yes",
            rationale:                 "Critical task with potential for serious harm; must be evaluated in summative usability study"
        }
    ],

    uiSpecification: [
        {
            uieNo:               "UIE-001",
            uiElement:           "Protective tip cap",
            expressedUserNeed:   "Users need clear indication that the cap must remain in place until point of use",
            uiRequirements:      "Cap shall be colour-coded red and labelled Remove at point of use in accordance with IEC 62366-1",
            whenToEvaluate:      "Formative evaluation during design phase; summative evaluation prior to market release",
            uiUnknownProvenance: "No"
        }
    ]

  },

  cerSectionData: {

    // Trocar-specific equivalence justification (Clinical Evaluation Overview)
    equivalenceJustification: "The Trocar device clinical evaluation is based on clinical data of the device under evaluation in accordance with MDR 2017/745 Article 61. Sufficient clinical data has been collected through systematic literature review, pre-clinical testing, and post-market surveillance to demonstrate conformity with the applicable GSPRs. Equivalence to a predicate device is not relied upon as the primary route of compliance.",

    // Trocar PMS summary (Clinical Data Generated by Manufacturer)
    pmsDataSummary: "PMS data reviewed for the Trocar device covering 2022–2024. Total units deployed: 450. Total complaints: 3 (rate: 0.67%). Categories: trocar valve query (2), port-site minor bleeding (1). No serious adverse events (SAEs) or field safety corrective actions (FSCAs) reported. Post-market data confirms the Trocar maintains an acceptable safety and performance profile for laparoscopic use.",

    // 9 columns: Citation | Study Objectives | Study Design | Description & Subjects
    //            | Main Findings | Authors Conclusions | Relevance Score | Scientific Validity Score | Contribution Weighting
    // Only 3 rows used (extra rows are deleted in the POM method)
    summaryAppraisalRows: [
        [ "Smith et al., 2023", "Evaluate trocar safety & efficacy", "Prospective RCT", "n=120 laparoscopic procedures", "98.3% successful insertion; 0 serious adverse events", "Trocar demonstrates excellent safety profile", "D1/I1/P1/S1", "I", "High" ],
        [ "Johnson et al., 2022", "Assess trocar usability in routine surgery", "Retrospective analysis", "n=200 procedures across 3 sites", "Zero port-site hernia; 2 minor port-site bleeds resolved", "Device performs equivalently to comparator trocars", "D1/I1/P2/S2", "II.1", "Moderate" ],
        [ "PMS Data 2023-2024", "Post-market safety surveillance review", "PMS data analysis", "450 deployed units, 12 months", "No SAEs; 3 minor complaints (valve query) resolved", "Trocar maintains acceptable benefit-risk profile", "D1/I1/P1/S1", "III.1", "Supporting" ],
    ],

    qualifications: [
        {
            name:           "Dr. Sarah Mitchell",
            jobTitle:       "Lead Clinical Evaluator",
            responsibility: "Responsible for conducting and overseeing the clinical evaluation per MDR 2017/745 and MEDDEV 2.7/1 Rev 4",
            qualifications: "MD, PhD — Clinical Research. 12 years medical device clinical evaluation experience including MDR Class I–IIb submissions"
        },
        {
            name:           "Dr. James Thornton",
            jobTitle:       "Clinical Reviewer",
            responsibility: "Independent clinical data appraisal and scientific validity assessment of literature sources and pre-clinical data",
            qualifications: "MD — Surgery, MSc Regulatory Affairs. 8 years in regulatory and clinical affairs for surgical devices"
        },
    ],

    qualificationPdfPath: "C:\\Users\\udula\\Downloads\\1771864371795-signed-document.pdf",

    changes: [
        { indexNumber: "1", appliedChange: "Initial CER — first issue for regulatory submission under MDR 2017/745" },
        { indexNumber: "2", appliedChange: "Updated pre-clinical data section to include sterility validation report SP-003 per ISO 11135" },
    ],

    // Pre-Clinical Data table rows: [ [reportNo, reportName, description], ... ]
    preClinicalData: {
        safetyPerformance: [
            [ "SP-001", "Mechanical Integrity Testing", "Trocar shaft and tip tested per ISO 11135 for mechanical strength and dimensional tolerances" ],
            [ "SP-002", "Seal Valve Leak Testing", "Pneumatic seal integrity tested at 20 mmHg CO2 pressure — no leakage observed" ],
            [ "SP-003", "Sterility Validation", "EO sterilisation validation per ISO 11135; SAL 10-6 achieved" ],
        ],
        usabilityTesting: [
            [ "UT-001", "Formative Usability Study", "IEC 62366-1 formative evaluation — 10 surgeons; all critical tasks completed successfully" ],
            [ "UT-002", "Summative Usability Study", "IEC 62366-1 summative evaluation — 15 surgeons; zero critical use errors recorded" ],
            [ "UT-003", "Grip & Ergonomics Assessment", "Ergonomic handle design validated for left and right-hand use under simulated theatre conditions" ],
        ],
        biocompatibilityReport: [
            [ "BC-001", "Cytotoxicity Assessment", "ISO 10993-5 elution method — no cytotoxic potential identified for stainless steel components" ],
            [ "BC-002", "Sensitisation Testing", "ISO 10993-10 Guinea pig maximisation test — no sensitisation response observed" ],
            [ "BC-003", "Biological Risk Assessment", "ISO 10993-1 biological evaluation plan — all contact materials confirmed biocompatible" ],
        ],
    },

    // Equivalence Table — MDCG 2020-05 structure (Trocar-specific)
    // Technical Characteristics: 5 rows × device1 / device2 / differences
    // Justifications 1.1–1.4: text + clinicallySig Yes/No radio (all "No" for Trocar)
    equivalenceTable: {
        characteristics: [
            { device1: "Stainless steel construction; sharpened trocar tip with hollow shaft; integrated valve mechanism", device2: "Stainless steel construction; equivalent tip geometry and hollow shaft design", differences: "No clinically significant differences in design or materials identified" },
            { device1: "Sterile operating theatre; laparoscopic procedures under general anaesthesia; ambient 18–25°C", device2: "Same conditions of use in sterile operative environment", differences: "No differences in conditions of use" },
            { device1: "Shaft diameter: 5 mm or 10 mm; length: 100 mm; ISO 10993 compliant materials; pressure rated to 20 mmHg", device2: "Equivalent shaft diameter and length specifications; same material compliance", differences: "Specifications are equivalent; no clinically significant difference identified" },
            { device1: "Trocar inserted via controlled axial force; cannula maintained for instrument access during procedure", device2: "Identical deployment method; same surgical insertion technique", differences: "Deployment methods are equivalent" },
            { device1: "Creates and maintains access port for laparoscopic instrument insertion; CO2 gas retention via valve", device2: "Same operating principles; equivalent critical performance requirements", differences: "No differences in principles of operation" },
        ],
        justifications: [
            { text: "No clinically significant differences in technical characteristics identified. Both share identical design principles, materials, and operating parameters per ISO 10993.", clinicallySig: "No" },
            { text: "Both devices are intended for identical conditions of use in sterile operating theatres for laparoscopic surgery. No differences affecting safety or performance were identified.", clinicallySig: "No" },
            { text: "Specifications are equivalent. Minor manufacturing tolerances are within the accepted range and do not result in clinically significant differences in safety or performance.", clinicallySig: "No" },
            { text: "Deployment methods are identical. Both devices are interchangeable in standard laparoscopic workflow without any impact on clinical safety or performance outcomes.", clinicallySig: "No" },
        ],

        biologicalCharacteristics: [
            { device1: "Stainless steel components; ISO 10993-1 compliant materials; no tissue-contacting coatings", device2: "Same stainless steel material composition; equivalent ISO 10993 compliance", differences: "No differences in materials or substances in contact with the same tissue" },
            { device1: "Short-term contact (< 24 hours per use); peritoneal tissue contact during insertion", device2: "Equivalent contact duration and tissue contact type", differences: "No differences in kind or duration of tissue contact" },
            { device1: "No degradable components; no particulate release under normal conditions", device2: "Same release characteristics; no degradation products identified", differences: "No differences in release characteristics or degradation behaviour" },
        ],
        biologicalJustifications: [
            { text: "Both devices use the same stainless steel materials meeting ISO 10993-1. No clinically significant biological differences identified in material composition or tissue contact.", clinicallySig: "No" },
            { text: "Both devices have equivalent short-term contact duration and contact the same tissue types. No biological safety concerns arising from differences in contact.", clinicallySig: "No" },
            { text: "Neither device releases degradation products or particulates under normal use conditions. Release characteristics are equivalent.", clinicallySig: "No" },
            { text: "Overall biological characteristics are equivalent. No clinically significant differences identified across all biological characteristic criteria assessed.", clinicallySig: "No" },
        ],

        clinicalCharacteristics: [
            { device1: "Laparoscopic access device; indicated for minimally invasive abdominal surgery under general anaesthesia", device2: "Same clinical indication; identical purpose and procedure type", differences: "No differences in clinical condition or purpose" },
            { device1: "Anterior abdominal wall — peritoneal cavity access", device2: "Identical anatomical site of use", differences: "No differences in site in the body" },
            { device1: "Adult surgical patients undergoing laparoscopic procedures; similar anatomy and physiological status", device2: "Equivalent intended patient population; no difference in age or anatomy", differences: "No differences in patient population" },
            { device1: "Qualified surgeons credentialed in minimally invasive surgical techniques", device2: "Same intended user type and training requirements", differences: "No differences in kind of user" },
            { device1: "Reliable trocar insertion; pneumoperitoneum maintenance; CO2 retention via valve mechanism", device2: "Equivalent critical performance requirements; same clinical endpoints", differences: "No differences in relevant critical performance" },
        ],
        clinicalJustifications: [
            { text: "Both devices share the same clinical indication for laparoscopic access. No clinically significant differences in clinical condition, purpose, or severity of condition addressed.", clinicallySig: "No" },
            { text: "Both devices are used at the identical anatomical site — anterior abdominal wall. No differences in body site or tissue interaction.", clinicallySig: "No" },
            { text: "Both devices target the same adult surgical patient population with equivalent anatomy. No differences in patient population affecting safety or performance.", clinicallySig: "No" },
            { text: "Both devices are intended for qualified surgeons. Intended user type and required competency level are equivalent.", clinicallySig: "No" },
        ],
        clinicalSummary: "Based on the assessment of technical, biological, and clinical characteristics, the devices are considered equivalent under MDR 2017/745 Annex XIV. No clinically significant differences were identified across all assessed criteria. The equivalent device provides an adequate clinical evidence base for the device under evaluation.",
    },

  },

  fepData: {
    planName: "FEP-001 Surgical Mask Formative Evaluation Plan",
  },

  labelsData: {

    deviceLabel: {
      labelNumber:        "LBL-DEV-001",
      revNumber:          "Rev A",
      labelDescription:   "Device label for Surgical Mask indicating CE marking, UDI, intended use, and manufacturer details per MDR 2017/745 Annex I requirements. Label shall be affixed to the primary packaging and remain legible throughout the device shelf life.",
      labelSpecification: "Label dimensions: 80 mm × 40 mm. Material: tamper-evident adhesive polyester. Print method: thermal transfer. All text minimum 0.6 mm character height. Compliant with ISO 15223-1 symbol requirements and MDR 2017/745 Annex I Chapter III labelling provisions.",
    },

    packagingLabel: {
      labelNumber:        "LBL-PKG-001",
      revNumber:          "Rev A",
      labelDescription:   "Packaging label for Surgical Mask sterile blister pack indicating sterility status, expiry date, storage conditions, lot number, and batch traceability information per EU MDR 2017/745 and ISO 11607.",
      labelSpecification: "Label dimensions: 120 mm × 60 mm. Material: direct thermal paper with permanent acrylic adhesive. Compliant with ISO 15223-1 symbol requirements for sterile medical device packaging. Font size minimum 1 mm for all mandatory information.",
    },

    implantableDevice: "No",

    // Same image used for device onboarding
    imagePath: "C:\\Users\\udula\\Downloads\\Surgical Mask.jpg",

  },

  eifuData: {
    eifuPresent:           "yes",
    eifuWithHardCopy:      "yes",
    selectFirstRisk:       true,   // check only the first risk checkbox (risksWitheifu-001)
    eifuURL:               "https://www.example.com/surgical-mask-ifu",
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
      documentName:   "Surgical Mask Instructions for Use - Greek Translation",
      language:       "Greek",
      countries:      "Greece",
      description:    "Greek language translation of the Instructions for Use for the Surgical Mask device, provided to comply with EU MDR 2017/745 labelling requirements for medical devices distributed in Greece. Includes all mandatory safety and performance information as required under Annex I Chapter III.",
      pdfPath:        "C:\\Users\\udula\\Downloads\\1771864371795-signed-document.pdf",
    },

  },

  sepData: {

    // PDF file for upload (accompanying documentation)
    uploadFilePath: "C:\\Users\\udula\\Downloads\\1768975517101-signed-document (1).pdf",

    // Test Participant Groupings
    testParticipantGroupings: "Participants will be divided into two groups: Group A — experienced surgeons with more than 5 years of laparoscopic procedure experience; Group B — novice surgeons within their first 2 years of laparoscopic training. Each group will consist of a minimum of 5 participants to ensure adequate statistical representation.",

    // Section 17 — Correct Use / List of Tasks (2 rows)
    correctUseTasks: [
        {
            hrusNo:      "HRUS-001",
            scenario:    "User removes protective trocar cap prematurely during device setup causing self-puncture",
            correctUse:  "Remove protective cap only at point of insertion; visually confirm tip is directed away from personnel before removal"
        },
        {
            hrusNo:      "HRUS-002",
            scenario:    "User fails to confirm pneumoperitoneum seal prior to commencing laparoscopic procedure",
            correctUse:  "Verify CO2 insufflation seal integrity by checking pressure gauge before inserting laparoscopic instruments through the trocar"
        }
    ]

  }

};
