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
    dName :"Cast Saw All Document Complete",
    deiveDes : "Powered oscillating cast saw for removal of orthopaedic plaster and fiberglass casts in clinical and emergency department settings",
    dFilePath: "C:\\Users\\udula\\Downloads\\Cast Saw.jpg"
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

      dName: "Cast Saw",
      intendedCount: "500",
      basicUdiDi: "0789123456CSW2024X",
      gmdnCode: "34619",
      emdnCode: "P190101",

      accessoryDescriptionText: "The Cast Saw is an active, powered oscillating saw designed for the removal of orthopaedic plaster and fiberglass casts in hospital and clinical settings. Constructed with an electric motor, oscillating blade mechanism, variable speed control, and detachable blade guard, compliant with IEC 60601-1 and ISO 14971.",
      principleOperationsText: "The device operates via an electric motor that drives a circular blade in a rapid oscillating arc rather than a full rotation. The oscillating motion cuts through rigid cast material while the blade's high-frequency vibration prevents cutting of the underlying skin and soft tissue. The variable speed controller allows the operator to adjust cutting speed based on cast material and thickness.",
      intendedPurposeText: "Intended for the removal of orthopaedic plaster of Paris and fiberglass casts applied to limbs and other body regions. The device provides controlled oscillating cutting power to section and remove cast material without causing laceration or thermal injury to the patient's underlying skin and soft tissue.",
      indicationsForUseText: "Indicated for removal of plaster of Paris and fiberglass orthopaedic casts applied to the upper and lower limbs and trunk. For use in emergency departments, orthopaedic clinics, fracture clinics, and hospital wards by trained clinical personnel. Not intended for use on casts applied to the head, neck, or digits unless specifically validated.",
      knownSideEffectsText: "Skin abrasion or laceration may occur if the blade is applied at an incorrect angle or with excessive pressure over bony prominences. Thermal injury from frictional heat may occur during prolonged cutting of thick fiberglass casts without adequate pausing technique. Fine particulate dust generated during fiberglass cast cutting presents an inhalation hazard to patients and operators if appropriate respiratory precautions are not followed.",
      contraindicationsText: "Contraindicated for use on casts applied over open wounds or sites with significantly compromised skin integrity where blade contact risk is elevated. Do not use on thermoplastic splints or materials not validated for oscillating blade removal. Not indicated for removal of casts applied using non-standard or unidentified materials.",
      clinicalUseSettingText: "Intended for use in licensed hospital departments including emergency departments, orthopaedic and fracture clinics, and hospital wards. Procedures must be performed by trained clinical personnel in accordance with the instructions for use. The device must be used with appropriate dust control measures and personal protective equipment as specified.",
      intendedUsersText: "Trained clinical personnel including orthopaedic nurses, plaster technicians, physiotherapists, and medical officers who have completed training in cast removal procedures and the safe use of powered oscillating cast saws. Operators must follow the device IFU and applicable clinical guidelines for cast removal.",
      intendedBodyPartText: "The device blade is applied to the outer surface of orthopaedic casts applied to limbs and other body regions. The blade cuts through cast material and contacts the underlying cast padding. The operator must maintain safe blade angle and technique to avoid direct blade contact with the patient's skin, particularly over bony prominences.",
      intendedUserEnvironmentText: "Hospital emergency departments, orthopaedic outpatient clinics, fracture clinics, and ward treatment rooms with access to electrical supply. The environment must support infection control requirements for reprocessing reusable blades or disposal of single-use blades. Adequate ventilation or local exhaust ventilation is required to manage fiberglass dust during cast removal."

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
          "Risk of skin laceration or abrasion from blade contact with patient skin during cast removal over bony prominences",
          "Risk of thermal injury to patient skin from frictional heat generated during prolonged cutting of thick fiberglass casts",
          "Electrical shock risk from motor housing insulation failure during powered cast saw operation",
          "Risk of inhalation of fine fiberglass or plaster dust particles generated during cast cutting by patient and operator",
          "Risk of blade fracture causing ejection of metallic fragment during high-speed oscillating operation",
          "Risk of inadequate reprocessing of reusable blades or handpiece resulting in cross-contamination between patients",
          "Risk of incorrect blade selection leading to ineffective cutting or increased pressure and patient discomfort",
          "Risk of speed control malfunction causing uncontrolled high-speed oscillation during cast removal",
          "Risk of excessive blade pressure applied over subcutaneous implants or hardware causing patient pain or implant damage",
          "Risk of battery depletion or power interruption during cast removal causing incomplete cast sectioning",
          "Risk of excessive vibration transmission to operator causing hand fatigue and reduced procedural accuracy",
          "Risk of ergonomic injury to operator from awkward posture during cast removal on lower limb casts",
          "Risk of noise-induced hearing damage to patient and operator from prolonged exposure to high-frequency oscillation sound",
          "Risk of patient anxiety or movement during cast removal causing inadvertent blade contact with skin",
          "Risk of patient identification error leading to removal of the wrong cast or incorrect cast type",
          "Risk of cable entanglement during cast removal causing accidental device movement and loss of operator control",
          // Group 2
          "Risk of electromagnetic interference with adjacent patient monitoring equipment from motor drive electronics",
          "Risk of cast debris entry into motor housing causing internal contamination or mechanical failure",
          "Risk of slip of the blade during initial entry into cast material causing unintended contact with underlying padding",
          "Risk of patient burn from contact with overheated handpiece body during prolonged cast removal procedure",
          "Risk of cross-contamination between patients from inadequate cleaning of reusable guard and handpiece components",
          "Risk of incorrect speed setting selection by operator leading to ineffective cutting or excessive vibration to patient",
          "Risk of labelling error on blade packaging leading to use of incorrect blade type for cast material",
          "Risk of hand-arm vibration syndrome in clinical personnel from repeated long-term use of oscillating cast saw",
          "Inadequate instructions for use may lead to incorrect blade attachment or unsafe operating technique by the operator",
          "Risk of device functional degradation if the handpiece is stored or operated outside specified environmental conditions",
          "Risk of blade corrosion from inadequate post-procedure decontamination reducing cutting performance and integrity",
          "Risk of accidental activation of the trigger causing blade oscillation outside the intended operating position",
          "Risk of structural fatigue of the handpiece from repeated reprocessing cycles beyond validated service life",
          "Risk of inadequate blade fixation causing blade ejection during oscillation under cutting load",
          "Risk of electric motor overheating causing thermal damage to internal components and reduced device service life"
      ],

      answers3: [
          "The Cast Saw incorporates an active electric motor requiring a mains or battery power supply for operation",
          "The device generates oscillating mechanical energy transmitted to a cutting blade and does not emit ionising radiation",
          "Active electronic components including the motor controller and speed regulation circuit are integral to device function",
          "The device incorporates embedded software for blade speed and oscillation control subject to IEC 62304 requirements",
          "No permanently implantable components are included within the Cast Saw system",
          "The device does not incorporate biological or animal-derived materials in its construction",
          "The Cast Saw does not process or store patient imaging data; no patient data interface is present",
          "No latex components are incorporated in the handpiece; all patient-contact components are latex-free per specification",
          "The device requires a mains electrical supply or rechargeable battery pack for motor operation",
          "Lubricants used in the motor assembly are contained within sealed components and are not released during normal use",
          "The Cast Saw does not incorporate ferromagnetic components; no MRI conditional or safe labelling is claimed",
          "No sterile fluid pathways are incorporated in the Cast Saw handpiece",
          "The device is not intended for implantation; it is an externally applied powered clinical instrument",
          "The blade contacts cast material in proximity to patient skin during use; all patient-contact materials comply with ISO 10993-1"
      ]

  },

  riskAnalysisMatrixFormData: {

    rows: [
      {
        // Prior: High → Post: Low
        hazard:                 "Risk of skin laceration or abrasion from blade contact with patient skin during cast removal over bony prominences",
        sequenceOfEvents:       "Operator applies excessive downward pressure while cutting over the tibial crest, causing the blade to contact the underlying skin through the cast padding",
        hazardousSituation:     "Oscillating blade contacts patient skin at the tibial crest causing a laceration requiring wound closure",
        harm:                   "Skin laceration requiring wound dressing or suturing, with associated patient pain and risk of infection at the wound site",
        riskControlMeasures:    "Blade guard prevents accidental deep penetration; IFU mandates rocking technique with controlled pressure; operator training required prior to use",
        riskControlAnalysis:    "Inherently safe design via oscillating blade mechanism and integral blade guard to limit depth of cut and prevent skin contact under normal use conditions",
        riskControlVerification:"Skin safety testing per IEC 60601-1; blade guard depth-of-cut validation; usability evaluation of rocking technique with simulated cast removal",
        gsprReference:          "GSPR 1, GSPR 7",
        riskControlOption:      "Inherently Safe Design",
        priorSeverity:          "Catastrophic",
        priorOccurrence:        "Frequent",
        postSeverity:           "Negligible",
        postOccurrence:         "Improbable",
      },
      {
        // Prior: High → Post: Medium
        hazard:                 "Risk of thermal injury to patient skin from frictional heat generated during prolonged cutting of thick fiberglass casts",
        sequenceOfEvents:       "Operator performs extended continuous cutting of a thick fiberglass cast without pausing to allow blade cooling, causing the blade temperature to rise",
        hazardousSituation:     "Elevated blade temperature is transmitted through residual cast material to the underlying cast padding and patient skin causing thermal injury",
        harm:                   "Contact burn to patient skin requiring wound care and potentially resulting in delayed healing, scarring, or infection",
        riskControlMeasures:    "IFU mandates intermittent cutting technique with mandatory pauses; blade material selection minimises frictional heat generation; operator training in thermal risk management",
        riskControlAnalysis:    "Safe manufacture controls applied to blade material and geometry to minimise heat generation per unit cutting time within specified intermittent cutting protocol",
        riskControlVerification:"Thermal performance testing per IEC 60601-1; blade surface temperature measurement during simulated fiberglass cast cutting at maximum duty cycle",
        gsprReference:          "GSPR 1, GSPR 8",
        riskControlOption:      "Safe Manufacture",
        priorSeverity:          "Catastrophic",
        priorOccurrence:        "Frequent",
        postSeverity:           "Serious",
        postOccurrence:         "Occasional",
      },
      {
        // Prior: Medium → Post: Low
        hazard:                 "Risk of inhalation of fine fiberglass or plaster dust particles generated during cast cutting by patient and operator",
        sequenceOfEvents:       "Operator cuts fiberglass cast in a poorly ventilated treatment room without respiratory protective equipment, generating airborne respirable fiberglass particles",
        hazardousSituation:     "Operator and patient are exposed to elevated concentrations of respirable fiberglass particulates above occupational exposure limits during cast removal",
        harm:                   "Respiratory irritation, potential long-term occupational lung disease risk in operators with repeated exposure; short-term respiratory discomfort in patients",
        riskControlMeasures:    "IFU mandates use of FFP2 respiratory protective equipment and local exhaust ventilation or vacuum attachment during fiberglass cast removal; patient mask provision recommended",
        riskControlAnalysis:    "Protective measure via IFU instruction mandating personal protective equipment and ventilation controls; vacuum blade attachment available as optional accessory",
        riskControlVerification:"Airborne particle concentration measurement during simulated cast removal; PPE usability assessment; operator training on dust control measures per IFU",
        gsprReference:          "GSPR 1, GSPR 11",
        riskControlOption:      "Protective Measures in the Device",
        priorSeverity:          "Serious",
        priorOccurrence:        "Occasional",
        postSeverity:           "Negligible",
        postOccurrence:         "Improbable",
      },
      {
        // Prior: Low → Post: High
        hazard:                 "Risk of speed control software malfunction causing uncontrolled high-speed blade oscillation",
        sequenceOfEvents:       "Software update introduces a regression in the speed control loop causing the cast saw to operate at maximum oscillation speed regardless of trigger input",
        hazardousSituation:     "Operator loses speed control of the cast saw during cast cutting, unable to modulate oscillation speed or stop blade movement via trigger release",
        harm:                   "Uncontrolled high-speed blade oscillation causing excessive heat generation or skin laceration if blade contacts patient skin during loss of control",
        riskControlMeasures:    "Hardware speed limiter independent of software control; software validated per IEC 62304 prior to release; dead-man trigger design requiring continuous trigger depression",
        riskControlAnalysis:    "Information for safety provided through motor fault indicator on handpiece and audible alarm on speed control fault detection",
        riskControlVerification:"Software validation testing per IEC 62304; hardware speed limiter functional test; dead-man trigger safety verification under fault conditions",
        gsprReference:          "GSPR 13, GSPR 23",
        riskControlOption:      "Information for Safety",
        priorSeverity:          "Negligible",
        priorOccurrence:        "Improbable",
        postSeverity:           "Catastrophic",
        postOccurrence:         "Frequent",
      },
      {
        // Prior: Low → Post: Medium
        hazard:                 "Risk of cross-contamination between patients from inadequate reprocessing of reusable cast saw handpiece components",
        sequenceOfEvents:       "Reprocessing personnel skip the pre-cleaning step under time pressure in a busy fracture clinic, leaving blood or exudate residue on the handpiece surface",
        hazardousSituation:     "Inadequately decontaminated handpiece is reused on the next patient without achieving the required decontamination standard for a non-sterile clinical instrument",
        harm:                   "Transmission of bloodborne pathogen or bacterial contamination between patients via reused handpiece components",
        riskControlMeasures:    "Reprocessing label on handpiece mandating pre-cleaning before high-level disinfection; IFU specifies validated cleaning and disinfection protocol per ISO 17664",
        riskControlAnalysis:    "Safe manufacture process controls govern handpiece surface finish and material compatibility with validated cleaning agents to facilitate effective reprocessing",
        riskControlVerification:"Reprocessing validation per ISO 17664; cleaning efficacy assessment with protein residue testing; usability evaluation of reprocessing instructions",
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

    overallResidualRisk: "The overall residual risk is acceptable when all individual risks are classified as Low or Medium after risk control measures have been applied. A benefit-risk analysis confirms that the clinical benefits of the Cast Saw in enabling safe and effective removal of orthopaedic plaster and fiberglass casts substantially outweigh the residual risks associated with skin laceration, thermal injury, dust inhalation, and cross-contamination when the device is used in accordance with the instructions for use and applicable operator training requirements.",
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
            justification: "All clauses are applicable to the Cast Saw quality management system"
        },
        {
            standard: "IEC 60601-1:2005+AMD1:2012",
            year: "2012",
            clauses: "Clause 11.6",
            justification: "Clause 11.6 is not applicable as the Cast Saw does not incorporate an alarm system independent of the blade speed fault indicator"
        }
    ]

  },

  vvData: {

    overviewRows: [
        {
            vvNumber: "VV-001",
            title:    "Software Functional Verification",
            aim:      "Verify all software functions of the Cast Saw blade speed and oscillation control system operate correctly per the software requirements specification",
            methods:  "Functional test protocol per IEC 62304; review of software requirements specification and individual test case execution records for all motor control and speed regulation software modules",
            results:  "All 36 test cases passed; no critical defects identified; Cast Saw motor control software confirmed compliant with IEC 62304 Class B requirements"
        },
        {
            vvNumber: "VV-002",
            title:    "Electrical Safety Verification",
            aim:      "Verify that the Cast Saw meets electrical safety requirements per IEC 60601-1 for active powered medical devices intended for use in clinical settings",
            methods:  "Electrical safety testing per IEC 60601-1 by accredited laboratory; dielectric strength, protective earth continuity, applied part leakage current, and enclosure leakage current tests",
            results:  "All electrical safety tests passed within accepted limits; Cast Saw confirmed compliant with IEC 60601-1 general safety requirements for electrically powered active medical devices"
        },
        {
            vvNumber: "VV-003",
            title:    "Mechanical Performance and Thermal Verification",
            aim:      "Verify that the Cast Saw meets oscillation speed accuracy, cutting performance, and thermal safety specifications under simulated cast removal conditions",
            methods:  "Oscillation speed measurement under variable load conditions; thermal performance testing using fiberglass cast material at defined continuous and intermittent cutting durations; blade fatigue testing per applicable standard",
            results:  "Speed accuracy within ±5% of set point across the operating load range; blade surface temperature below thermal injury threshold with specified intermittent cutting technique; blade fatigue life exceeds minimum validated cycle count"
        },
        {
            vvNumber: "VV-004",
            title:    "Summative Usability Evaluation",
            aim:      "Validate that trained clinical personnel can operate the Cast Saw safely and effectively without critical use errors in a simulated cast removal environment",
            methods:  "Summative usability study per IEC 62366-1; 15 qualified cast technicians and orthopaedic nurses; simulated-use protocol covering all critical tasks including blade attachment, speed selection, cast removal technique, and trigger release",
            results:  "Zero critical use errors recorded across all participants; all essential performance tasks completed successfully; device validated for the intended clinical operator user population"
        },
        {
            vvNumber: "VV-005",
            title:    "Reprocessing Validation",
            aim:      "Validate that the Cast Saw handpiece and reusable guard components achieve the required decontamination standard following the specified cleaning and high-level disinfection cycle",
            methods:  "Reprocessing validation per ISO 17664; cleaning efficacy assessment with protein residue testing; material compatibility assessment with validated cleaning agents and disinfectants",
            results:  "Protein residue below acceptance threshold following validated cleaning cycle; all handpiece and guard materials confirmed compatible with specified cleaning agents; reprocessing instructions validated for intended clinical operators"
        }
    ]

  },

  uepData: {

    q1DocNumber: "QMS-PRO-022",
    q3DocNumber: "TUEA-001",

    filePath: "C:\\Users\\udula\\Downloads\\Cast Saw.jpg",

    knownHazards: [
        {
            riskRef:             "H-001",
            hazard:              "Risk of skin laceration or abrasion from blade contact with patient skin during cast removal over bony prominences",
            sequenceOfEvents:    "Operator applies excessive downward pressure while cutting over a bony prominence, causing the oscillating blade to contact the patient's skin through the cast padding",
            hazardousSituation:  "Oscillating blade contacts patient skin causing laceration or abrasion at the site of bony prominence",
            harm:                "Skin laceration requiring wound care or suturing with associated patient pain and risk of wound infection",
            riskControlMeasure:  "Integral blade guard limits depth of cut; IFU mandates use of rocking technique with controlled pressure; operator training in safe blade application technique"
        }
    ],

    hazardUserScenarios: [
        {
            hrusNo:                    "HRUS-001",
            hazardRelatedUserScenario: "Operator applies excessive downward pressure and maintains a fixed blade angle over the tibial crest while removing a lower limb cast, leading to blade contact with the patient's skin",
            associatedRisk:            "H-001",
            includeInSummative:        "Yes",
            rationale:                 "Critical task with potential for patient harm; safe blade technique including rocking motion and pressure control must be evaluated in the summative usability study"
        }
    ],

    uiSpecification: [
        {
            uieNo:               "UIE-001",
            uiElement:           "Variable speed trigger and blade speed indicator",
            expressedUserNeed:   "Operators need clear feedback on blade speed and a responsive speed control to allow immediate speed reduction or stopping during cast removal",
            uiRequirements:      "Blade speed shall be variable via proportional trigger control; a visual indicator shall display current speed setting; trigger shall require continuous depression to maintain blade oscillation providing dead-man safety function",
            whenToEvaluate:      "Formative evaluation during design phase; summative evaluation prior to market release",
            uiUnknownProvenance: "No"
        }
    ]

  },

  cerSectionData: {

    equivalenceJustification: "The Cast Saw clinical evaluation is based on clinical data of the device under evaluation in accordance with MDR 2017/745 Article 61. Sufficient clinical data has been collected through systematic literature review, pre-clinical testing, and post-market surveillance to demonstrate conformity with the applicable GSPRs. Equivalence to a predicate device is not relied upon as the primary route of compliance.",

    pmsDataSummary: "PMS data reviewed for the Cast Saw covering 2022–2024. Total units deployed: 120 systems across 35 orthopaedic departments, fracture clinics, and emergency departments. Total complaints: 4 (rate: 3.3%). Categories: blade vibration feedback query (1), speed control sensitivity query (2), reprocessing instruction query (1). No serious adverse events (SAEs) or field safety corrective actions (FSCAs) reported. Post-market data confirms the Cast Saw maintains an acceptable safety and performance profile for orthopaedic cast removal.",

    summaryAppraisalRows: [
        [ "Thompson et al., 2023", "Evaluate skin safety and thermal performance of oscillating cast saws during fiberglass and plaster cast removal", "Prospective bench and clinical study", "n=150 cast removal procedures; simulated limb model and intraoperative temperature measurement", "Zero skin lacerations with standard technique; mean blade surface temperature 38.4°C with intermittent cutting; 54.1°C with continuous cutting beyond recommended duration", "Oscillating cast saws with correct intermittent cutting technique maintain blade temperature within safe limits consistent with device IFU requirements", "D1/I1/P1/S1", "I", "High" ],
        [ "Davies et al., 2022", "Assess blade fatigue life and fracture risk in repeated cast removal applications with fiberglass and plaster materials", "Retrospective mechanical fatigue study", "n=400 blades tested to end of specified service life under standardised cyclic oscillation load", "Zero fractures within validated service life; 3% fracture rate at 140% of service life; service life limit confirmed adequate", "Cast saw blade service life specification provides adequate safety margin against fatigue fracture under clinical cast removal conditions", "D1/I1/P2/S2", "II.1", "Moderate" ],
        [ "PMS Data 2023-2024", "Post-market safety and performance surveillance review", "PMS data analysis", "120 units deployed; 24-month surveillance period", "No SAEs; 4 minor complaints resolved; cast removal performance KPIs met at all sites", "Cast Saw maintains acceptable benefit-risk profile for powered cast removal in orthopaedic and emergency department settings", "D1/I1/P1/S1", "III.1", "Supporting" ],
    ],

    qualifications: [
        {
            name:           "Dr. Sarah Mitchell",
            jobTitle:       "Lead Clinical Evaluator",
            responsibility: "Responsible for conducting and overseeing the clinical evaluation per MDR 2017/745 and MEDDEV 2.7/1 Rev 4",
            qualifications: "MD, PhD — Clinical Research. 12 years medical device clinical evaluation experience including MDR Class I–IIa submissions for active powered clinical instruments and orthopaedic accessories"
        },
        {
            name:           "Dr. James Thornton",
            jobTitle:       "Clinical Reviewer",
            responsibility: "Independent clinical data appraisal and scientific validity assessment of literature sources and pre-clinical data",
            qualifications: "MD — Orthopaedic Surgery, MSc Regulatory Affairs. 8 years in regulatory and clinical affairs for powered clinical instruments and active medical devices in orthopaedic settings"
        },
    ],

    qualificationPdfPath: "C:\\Users\\udula\\Downloads\\1771864371795-signed-document.pdf",

    changes: [
        { indexNumber: "1", appliedChange: "Initial CER — first issue for regulatory submission under MDR 2017/745" },
        { indexNumber: "2", appliedChange: "Updated pre-clinical data section to include reprocessing validation report RV-002 per ISO 17664" },
    ],

    preClinicalData: {
        safetyPerformance: [
            [ "SP-001", "Blade Speed and Oscillation Performance Verification", "Blade oscillation speed accuracy and cutting performance tested per device specification across full operating range; all parameters within specification" ],
            [ "SP-002", "Thermal Safety Testing", "Blade surface temperature measured during simulated fiberglass and plaster cast removal at defined cutting durations; temperature below thermal injury threshold confirmed with specified intermittent cutting technique" ],
            [ "SP-003", "Blade Fatigue and Fracture Testing", "Blade oscillation fatigue tested under standardised cyclic load; zero fractures within validated service life confirmed across all blade sizes" ],
        ],
        usabilityTesting: [
            [ "UT-001", "Formative Usability Study", "IEC 62366-1 formative evaluation — 8 cast technicians and orthopaedic nurses; all critical tasks completed; blade technique and speed control identified as key UI requirements" ],
            [ "UT-002", "Summative Usability Study", "IEC 62366-1 summative evaluation — 15 clinical operators; zero critical use errors recorded across all tasks" ],
            [ "UT-003", "Workflow Integration Assessment", "Clinical workflow assessment at two orthopaedic fracture clinics confirmed device integrates with standard cast removal workflows without usability issues" ],
        ],
        biocompatibilityReport: [
            [ "BC-001", "Cytotoxicity Assessment", "ISO 10993-5 elution method — no cytotoxic potential identified for handpiece body and blade materials" ],
            [ "BC-002", "Sensitisation Testing", "ISO 10993-10 Guinea pig maximisation test — no sensitisation response observed for stainless steel blade and polymer handpiece materials" ],
            [ "BC-003", "Biological Risk Assessment", "ISO 10993-1 biological evaluation plan — all patient-proximate materials confirmed safe for use in proximity to intact and compromised skin" ],
        ],
    },

    equivalenceTable: {
        characteristics: [
            { device1: "Electric motor; variable speed oscillating blade mechanism; dead-man trigger; detachable blade guard; compatible oscillating blades", device2: "Equivalent electric motor with variable speed oscillation control; compatible blade guard system", differences: "No clinically significant differences in design or motor technology identified" },
            { device1: "Hospital emergency departments, orthopaedic clinics, and fracture clinics; trained clinical personnel; appropriate PPE and ventilation per IFU", device2: "Same conditions of use in licensed clinical settings by trained cast removal personnel", differences: "No differences in conditions of use" },
            { device1: "Oscillation angle: 3.4°; speed range: 0–18,000 oscillations per minute; blade diameter: 44 mm; handpiece weight: 680 g", device2: "Equivalent oscillation angle and speed range; same blade format; comparable handpiece weight", differences: "Specifications are equivalent; no clinically significant difference identified" },
            { device1: "Oscillating blade cast removal using dead-man trigger activation; operator-controlled variable speed; intermittent cutting technique", device2: "Identical oscillating cast removal method; same trigger activation mechanism and cutting technique requirements", differences: "Operating methods are equivalent" },
            { device1: "Powered removal of plaster and fiberglass orthopaedic casts in orthopaedic and emergency department settings", device2: "Same clinical purpose; equivalent cast removal performance and clinical indication", differences: "No differences in principles of operation" },
        ],
        justifications: [
            { text: "No clinically significant differences in technical characteristics identified. Both share identical oscillating motor technology, blade format, and operating parameters.", clinicallySig: "No" },
            { text: "Both devices are intended for identical conditions of use in licensed clinical settings by trained cast removal personnel. No differences affecting safety or performance were identified.", clinicallySig: "No" },
            { text: "Specifications are equivalent. Minor manufacturing tolerances are within the accepted range and do not result in clinically significant differences in cutting performance or thermal output.", clinicallySig: "No" },
            { text: "Cast removal methods are identical. Both devices are interchangeable in standard cast removal workflows without impact on clinical safety or performance.", clinicallySig: "No" },
        ],

        biologicalCharacteristics: [
            { device1: "Blade and blade guard in proximity to patient skin and cast padding; ISO 10993-1 compliant materials; no implantable components", device2: "Same patient-proximate materials; equivalent ISO 10993 compliance", differences: "No differences in materials or substances in proximity to patient tissue" },
            { device1: "Indirect contact via cast padding with patient skin during cast removal (procedure duration typically 5–20 minutes)", device2: "Equivalent contact duration and proximity to patient tissue", differences: "No differences in kind or duration of tissue proximity" },
            { device1: "No degradable components in patient-proximate areas; no particulate release from handpiece under normal conditions", device2: "Same release characteristics; no degradation products identified", differences: "No differences in release characteristics or degradation behaviour" },
        ],
        biologicalJustifications: [
            { text: "Both devices use the same ISO 10993-1 compliant materials for patient-proximate components. No clinically significant biological differences identified.", clinicallySig: "No" },
            { text: "Both devices have equivalent proximity duration to patient skin. No biological safety concerns arising from differences in tissue proximity.", clinicallySig: "No" },
            { text: "Neither device releases degradation products or particulates from the handpiece under normal use conditions. Release characteristics are equivalent.", clinicallySig: "No" },
            { text: "Overall biological characteristics are equivalent. No clinically significant differences identified across all biological characteristic criteria assessed.", clinicallySig: "No" },
        ],

        clinicalCharacteristics: [
            { device1: "Powered removal of plaster and fiberglass orthopaedic casts in emergency and orthopaedic clinical settings", device2: "Same clinical indication; identical purpose and patient population", differences: "No differences in clinical condition or purpose" },
            { device1: "External surface of orthopaedic casts applied to limbs and trunk; proximate to underlying patient skin", device2: "Identical anatomical site of use", differences: "No differences in site in the body" },
            { device1: "Patients with orthopaedic casts requiring removal across all age groups in clinical settings", device2: "Equivalent intended patient population; no difference in indication or anatomy", differences: "No differences in patient population" },
            { device1: "Trained clinical personnel including orthopaedic nurses, cast technicians, physiotherapists, and medical officers", device2: "Same intended user type and training requirements", differences: "No differences in kind of user" },
            { device1: "Effective and safe cast sectioning; controlled blade speed; thermal and skin safety during cast removal", device2: "Equivalent critical performance requirements; same cast removal clinical endpoints", differences: "No differences in relevant critical performance" },
        ],
        clinicalJustifications: [
            { text: "Both devices share the same clinical indication for powered cast removal in orthopaedic and emergency settings. No clinically significant differences in clinical condition, purpose, or patient population addressed.", clinicallySig: "No" },
            { text: "Both devices are used at identical anatomical sites — the outer surface of orthopaedic casts on limbs. No differences in body site or tissue interaction.", clinicallySig: "No" },
            { text: "Both devices target the same patient population requiring cast removal. No differences in patient population affecting safety or performance.", clinicallySig: "No" },
            { text: "Both devices are intended for trained clinical operators. Intended user type and required competency level are equivalent.", clinicallySig: "No" },
        ],
        clinicalSummary: "Based on the assessment of technical, biological, and clinical characteristics, the devices are considered equivalent under MDR 2017/745 Annex XIV. No clinically significant differences were identified across all assessed criteria. The equivalent device provides an adequate clinical evidence base for the Cast Saw under evaluation.",
    },

  },

  fepData: {
    planName: "FEP-001 Cast Saw Formative Evaluation Plan",
  },

  labelsData: {

    deviceLabel: {
      labelNumber:        "LBL-DEV-001",
      revNumber:          "Rev A",
      labelDescription:   "Device label for Cast Saw indicating CE marking, UDI, intended use, reprocessing symbol, and manufacturer details per MDR 2017/745 Annex I requirements. Label shall be permanently affixed to the handpiece and remain legible throughout the validated service life of the device.",
      labelSpecification: "Label dimensions: 80 mm × 40 mm. Material: anodised aluminium plate with laser-engraved text. Print method: laser engraving. All text minimum 1.0 mm character height. Compliant with ISO 15223-1 symbol requirements, ISO 17664 reprocessing symbol provisions, and MDR 2017/745 Annex I Chapter III.",
    },

    packagingLabel: {
      labelNumber:        "LBL-PKG-001",
      revNumber:          "Rev A",
      labelDescription:   "Packaging label for Cast Saw transit case indicating fragile handling requirements, orientation indicators, storage conditions, serial number, and batch traceability information per EU MDR 2017/745 and applicable transport regulations.",
      labelSpecification: "Label dimensions: 150 mm × 80 mm. Material: weatherproof polypropylene with permanent acrylic adhesive. Compliant with ISO 15223-1 symbol requirements for packaging. Font size minimum 2 mm for all mandatory information. Includes fragile and this-way-up pictograms.",
    },

    implantableDevice: "No",

    imagePath: "C:\\Users\\udula\\Downloads\\Cast Saw.jpg",

  },

  eifuData: {
    eifuPresent:           "yes",
    eifuWithHardCopy:      "yes",
    selectFirstRisk:       true,
    eifuURL:               "https://www.example.com/cast-saw-ifu",
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
      documentName:   "Cast Saw Instructions for Use - Greek Translation",
      language:       "Greek",
      countries:      "Greece",
      description:    "Greek language translation of the Instructions for Use for the Cast Saw, provided to comply with EU MDR 2017/745 labelling requirements for medical devices distributed in Greece. Includes all mandatory safety, reprocessing, and performance information as required under Annex I Chapter III.",
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
      explainNovelFeatures:    'The Cast Saw incorporates a novel variable speed dead-man trigger with integrated blade speed indicator that provides real-time cutting speed feedback and activates an audible alert if the blade oscillation frequency deviates beyond the specified safe operating range. It also introduces a novel vacuum blade attachment that actively collects fiberglass cast dust at the point of generation, representing a novel dust control approach for powered cast removal procedures.',
      conductFollowUp:         'Yes',
    },

    // Section 2: PMCF Activities
    activities: [
      {
        activityRef:   'PMCF-ACT-001',
        description:   'Systematic literature review and registry data collection to monitor long-term safety, thermal performance, and clinical effectiveness of the Cast Saw in routine orthopaedic cast removal and emergency department practice',
        activityType:  'Post-Market Clinical Study',
        source:        'Post-market surveillance activities',
        procedureType: 'general',
        timelines:     'Q4 2025 - Q4 2027',
      },
      {
        activityRef:   'PMCF-ACT-002',
        description:   'Structured survey of cast technicians, orthopaedic nurses, and emergency department practitioners to assess clinical performance, blade speed control usability, dust control accessory adequacy, and any adverse events or near-misses associated with the Cast Saw in routine cast removal practice',
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
      cerInfo:     'Clinical evidence from the CER identifies residual uncertainties regarding long-term blade thermal performance during extended fiberglass cast removal procedures across diverse cast thicknesses and patient populations. These findings should be monitored through the PMCF plan to validate continued thermal safety across the full range of cast materials and clinical settings.',
      rmfRelevant: 'Yes',
      rmfInfo:     'The Risk Management File identifies residual risks related to blade fatigue performance at the boundary of the validated service life and potential for skin laceration if the rocking technique is not consistently applied by operators in high-volume clinical settings. These risks require ongoing monitoring through PMCF activities to validate the effectiveness of existing risk control measures and confirm acceptable skin safety outcomes in routine clinical use.',
    },

    // Section 4: Equivalent / similar device
    equivalentDevices: [
      {
        productName:       'Stryker Cast Cutter System',
        intendedPurpose:   'Powered oscillating cast saw for removal of plaster and fiberglass orthopaedic casts in hospital and clinical settings',
        intendedUsers:     'Orthopaedic nurses, cast technicians, and clinical personnel trained in cast removal in licensed clinical settings',
        patientPopulation: 'Patients with orthopaedic casts requiring removal across all age groups in clinical and emergency settings',
        medicalCondition:  'Orthopaedic cast removal following fracture management, post-operative immobilisation, and rehabilitation',
        indication:        'Powered removal of plaster and fiberglass casts applied to limbs and trunk in orthopaedic and emergency settings',
        cerReference:      'CER Section 5.2 - Equivalent Device Analysis, Table 3',
      },
      {
        productName:       'De Soutter Medical Cast Cutter',
        intendedPurpose:   'Battery-powered oscillating saw for cast removal in orthopaedic departments and fracture clinics',
        intendedUsers:     'Orthopaedic clinical staff and plaster technicians in hospital outpatient and fracture clinic environments',
        patientPopulation: 'Patients across all age groups requiring removal of plaster or fiberglass orthopaedic casts',
        medicalCondition:  'Removal of plaster and fiberglass immobilisation casts following fracture, soft tissue injury, or post-operative recovery',
        indication:        'Powered cast removal with battery-operated oscillating motor for orthopaedic clinical use',
        cerReference:      'CER Section 5.2 - Equivalent Device Analysis, Table 4',
      },
      {
        productName:       'Richmar Cast Saw',
        intendedPurpose:   'Mains-powered oscillating cast cutter for removal of rigid orthopaedic casts in emergency and orthopaedic settings',
        intendedUsers:     'Emergency department nurses, orthopaedic technicians, and clinical staff trained in powered cast removal',
        patientPopulation: 'Emergency department and orthopaedic patients requiring urgent or planned cast removal',
        medicalCondition:  'Cast removal in emergency, orthopaedic, and fracture clinic settings for routine and urgent clinical indications',
        indication:        'Powered oscillating cast removal for plaster and fiberglass casts in emergency and outpatient clinical settings',
        cerReference:      'CER Section 5.2 - Equivalent Device Analysis, Table 5',
      },
    ],

    // Section 5: Guidance on PMCF
    guidanceOnPMCF: [
      'MDCG 2020-7 Guidance on PMCF Plan Template - A guide for manufacturers and notified bodies',
      'MDCG 2020-8 Guidance on PMCF Evaluation Report Template - Post Market Clinical Follow-up Evaluation Report',
    ],

  },

  verificationsData: {

    pdfs: {
      fer:  "C:\\Users\\udula\\Downloads\\1769528490225-signed-document (1).pdf",
      cpv:  "C:\\Users\\udula\\Downloads\\1768975517101-signed-document.pdf",
      gspr: "C:\\Users\\udula\\Downloads\\1768561515506-signed-document.pdf",
    },

    // Section 1: Biological Evaluation
    section1: {
      planReport: [
        { docNumber: "BIO-PL-001", title: "Biological Evaluation Plan and Report – Initial Issue" },
        { docNumber: "BIO-PL-002", title: "Biological Evaluation Plan and Report – Revision A" },
      ],
      testProtocols: [
        { docNumber: "BIO-TP-001", title: "Cytotoxicity Test Protocol – ISO 10993-5 Elution Method" },
      ],
      cvs: [
        { docNumber: "BIO-CV-001", title: "Evaluator CV – Dr. Anna Kowalski, Biological Safety Specialist" },
        { docNumber: "BIO-CV-002", title: "Evaluator CV – Dr. James Murray, Toxicologist" },
      ],
    },

    // Section 2: EMC – 4 tables, 1 row each
    section2: {
      tables: [
        { docNumber: "EMC-001", title: "EMC Test Report – Radiated and Conducted Emissions" },
        { docNumber: "EMC-002", title: "EMC Test Report – Immunity Requirements IEC 60601-1-2" },
        { docNumber: "EMC-003", title: "EMC Test Protocol – Test Plan Reference TEC-001" },
        { docNumber: "EMC-004", title: "EMC Declaration of Conformity" },
      ],
    },

    // Section 3: Software V&V – 5 tables, 1 row each
    section3: {
      tables: [
        { docNumber: "SW-001", title: "Software Validation and Verification Plan – IEC 62304" },
        { docNumber: "SW-002", title: "Software Validation and Verification Report" },
        { docNumber: "SW-003", title: "Software Test Protocol – Unit and Integration Testing" },
        { docNumber: "SW-004", title: "Software Test Results and Traceability Matrix" },
        { docNumber: "SW-005", title: "Software Risk Analysis Report per IEC 62304 Clause 7" },
      ],
    },

    // Section 4: Stability – 2 tables, 2 rows each
    section4: {
      tables: [
        [
          { docNumber: "STAB-001", title: "Stability Study Protocol – Real-Time and Accelerated Ageing" },
          { docNumber: "STAB-002", title: "Stability Study Report – 24-Month Real-Time Ageing Results" },
        ],
        [
          { docNumber: "STAB-003", title: "Shelf Life Validation Protocol per ISO 11607" },
          { docNumber: "STAB-004", title: "Shelf Life Validation Report – Accelerated Ageing Confirmation" },
        ],
      ],
    },

    // Section 5: Packaging – 4 tables, 1 row each
    section5: {
      tables: [
        { docNumber: "PKG-001", title: "Packaging Validation Plan – Sterile Barrier System" },
        { docNumber: "PKG-002", title: "Packaging Integrity Test Report – Peel Strength and Seal Integrity" },
        { docNumber: "PKG-003", title: "Sterile Barrier Validation Report per ISO 11607-1 and 11607-2" },
        { docNumber: "PKG-004", title: "Packaging Specification and Material Declaration" },
      ],
    },

    // Section 6: Cleaning/Sterilisation
    section6: {
      sterilisation: [
        [
          { docNumber: "STER-001", title: "Sterilisation Validation Protocol – Moist Heat EN ISO 17665-1" },
          { docNumber: "STER-002", title: "Sterilisation Validation Report – Half-Cycle and Full-Cycle Study" },
        ],
        [
          { docNumber: "STER-003", title: "Biological Indicator Test Report – Geobacillus Stearothermophilus" },
          { docNumber: "STER-004", title: "Sterilisation Process Validation Summary and Acceptance Statement" },
        ],
      ],
      cleaning: [
        { docNumber: "CLEAN-001", title: "Cleaning Validation Protocol – Manual and Automated Reprocessing" },
        { docNumber: "CLEAN-002", title: "Cleaning Efficacy Report – Protein Residue and TOC Testing" },
      ],
    },

    // Section 7: Connected Devices – 2 tables, 3 rows each
    section7: {
      tables: [
        [
          { docNumber: "CON-001", title: "Connected Device Test Protocol – Interoperability Assessment" },
          { docNumber: "CON-002", title: "Connected Device Test Report – Device A Compatibility Results" },
          { docNumber: "CON-003", title: "Connected Device Compatibility and Risk Summary" },
        ],
        [
          { docNumber: "CON-004", title: "Network Security Assessment Protocol per IEC 81001-5-1" },
          { docNumber: "CON-005", title: "Network Security Assessment Report – Vulnerability Analysis" },
          { docNumber: "CON-006", title: "Cybersecurity Risk Management Summary for Connected Functions" },
        ],
      ],
    },

    // Section 8: MRI – 3 tables, 1 row each
    section8: {
      tables: [
        { docNumber: "MRI-001", title: "MRI Safety Testing Protocol – ASTM F2503 Conditions Assessment" },
        { docNumber: "MRI-002", title: "MRI Compatibility Test Report – RF Heating and Force Deflection" },
        { docNumber: "MRI-003", title: "MR Conditional Labelling Assessment and Symbol Justification" },
      ],
    },

    // Section 9: CMR Substances – 4 tables, 2 rows each; sub-table: Yes/Yes/No
    section9: {
      subAnswers: ["Yes", "Yes", "No"],
      tables: [
        [
          { docNumber: "CMR-001", title: "CMR Substance Assessment Report – Category 1A Substances" },
          { docNumber: "CMR-002", title: "CMR Substance Assessment Report – Justification for Use" },
        ],
        [
          { docNumber: "CMR-003", title: "Chemical Characterisation Report – Extractables and Leachables" },
          { docNumber: "CMR-004", title: "Toxicological Risk Assessment for Identified CMR Substances" },
        ],
        [
          { docNumber: "CMR-005", title: "Regulatory Justification for CMR Substance Retention" },
          { docNumber: "CMR-006", title: "Benefit–Risk Justification for CMR Substance Use per MDR Annex I" },
        ],
        [
          { docNumber: "CMR-007", title: "Notified Body Consultation Record – CMR Substance Review" },
          { docNumber: "CMR-008", title: "Safety Evaluation Report – Patient Exposure and Risk Acceptability" },
        ],
      ],
    },

    // Section 10: Medicinal Substances – 5 tables, 1 row each
    section10: {
      tables: [
        { docNumber: "MED-001", title: "Medicinal Substance Justification Report per MDR Annex I §8.4" },
        { docNumber: "MED-002", title: "Drug-Device Combination Assessment – Pharmaceutical Quality Data" },
        { docNumber: "MED-003", title: "Pharmaceutical Quality and Safety Assessment Summary" },
        { docNumber: "MED-004", title: "Regulatory Consultation Record – Competent Authority Opinion" },
        { docNumber: "MED-005", title: "Clinical Benefit-Risk Assessment for Medicinal Substance Component" },
      ],
    },

    // Section 11: Tissue/Cells – 7 tables, 1 row each
    section11: {
      tables: [
        { docNumber: "TIS-001", title: "Tissue Sourcing Documentation and Donor Traceability Record" },
        { docNumber: "TIS-002", title: "Tissue Donor Risk Assessment per EU Directive 2004/23/EC" },
        { docNumber: "TIS-003", title: "Viral Inactivation Validation Report – Validated Reduction Steps" },
        { docNumber: "TIS-004", title: "TSE Risk Assessment per EMA/410/01 Rev 3 Guidelines" },
        { docNumber: "TIS-005", title: "Tissue Processing Validation Report – Sterilisation and Preservation" },
        { docNumber: "TIS-006", title: "Tissue Quality Control Test Report – Identity and Purity Testing" },
        { docNumber: "TIS-007", title: "Regulatory Approval Documentation for Tissue-Derived Component" },
      ],
    },

    // Section 12: Absorbed Substances – 8 tables, 1 row each
    section12: {
      tables: [
        { docNumber: "ABS-001", title: "Absorbed Substance Characterisation Report – Material Identity and Purity" },
        { docNumber: "ABS-002", title: "Degradation Study Protocol – In Vitro and In Vivo Assessment Plan" },
        { docNumber: "ABS-003", title: "In Vitro Degradation Study Report – Hydrolysis and Enzymatic Testing" },
        { docNumber: "ABS-004", title: "In Vivo Degradation Study Report – Animal Model Results" },
        { docNumber: "ABS-005", title: "Biocompatibility of Degradation Products – ISO 10993-13 Assessment" },
        { docNumber: "ABS-006", title: "Absorption Rate Verification Report – Clinical and Preclinical Data" },
        { docNumber: "ABS-007", title: "Clinical Performance Assessment for Biodegradable Device Function" },
        { docNumber: "ABS-008", title: "Post-Market Surveillance Plan for Absorbed Substance Monitoring" },
      ],
    },

    // Section 13: Performance/Safety/Other – 2 rows (full columns)
    section13: {
      rows: [
        {
          docNumber: "PERF-001",
          title:     "Electrical Safety Verification Report per IEC 60601-1",
          aim:       "Verify that the Cast Saw meets all electrical safety requirements per IEC 60601-1 for active powered medical devices intended for use in clinical settings",
          methods:   "Electrical safety testing conducted by an accredited independent laboratory per IEC 60601-1; tests include dielectric strength, protective earth continuity, applied part leakage current, enclosure leakage current, and touch current measurement",
          results:   "All electrical safety tests passed within the specified limits defined by IEC 60601-1; Cast Saw confirmed compliant with general safety requirements for electrically powered active medical devices",
        },
        {
          docNumber: "PERF-002",
          title:     "Mechanical Performance and Thermal Safety Verification Report",
          aim:       "Verify mechanical performance specifications including blade oscillation speed accuracy, cutting performance, and thermal safety under simulated cast removal conditions at defined continuous and intermittent cutting durations",
          methods:   "Blade oscillation speed measurement under variable cutting load conditions; thermal performance testing using fiberglass and plaster cast material at defined continuous and intermittent cutting durations; blade fatigue testing under standardised cyclic oscillation load",
          results:   "Blade speed accuracy confirmed within ±5% of set point across the full operating range; blade surface temperature below thermal injury threshold with specified intermittent cutting technique confirmed; blade fatigue life exceeds minimum validated service life with adequate safety margin",
        },
      ],
    },

  },

  sepData: {

    uploadFilePath: "C:\\Users\\udula\\Downloads\\1768975517101-signed-document (1).pdf",

    testParticipantGroupings: "Participants will be divided into two groups: Group A — experienced cast technicians and orthopaedic nurses with more than 3 years of experience performing cast removal using powered cast saws; Group B — less experienced clinical staff within their first year of using powered cast saws in a clinical setting. Each group will consist of a minimum of 5 participants to ensure adequate representation of the intended user population.",

    correctUseTasks: [
        {
            hrusNo:      "HRUS-001",
            scenario:    "Operator applies excessive downward pressure and maintains a fixed blade angle over the tibial crest while removing a lower limb cast, leading to blade contact with the patient's skin and risk of laceration",
            correctUse:  "Maintain a rocking blade technique throughout cast removal; apply controlled pressure and avoid sustained blade contact at bony prominences; reposition the blade angle frequently to avoid sustained contact with underlying cast padding in high-risk areas"
        },
        {
            hrusNo:      "HRUS-002",
            scenario:    "Operator continues cutting a thick fiberglass cast without pausing after prolonged continuous use, allowing blade temperature to rise above the safe threshold and risking thermal injury to the patient's skin",
            correctUse:  "Use intermittent cutting technique with mandatory pauses between cuts as specified in the IFU; allow blade to cool between sections of thick fiberglass cast; monitor for patient discomfort as an indicator of elevated blade temperature and pause immediately if reported"
        }
    ]

  }

};
