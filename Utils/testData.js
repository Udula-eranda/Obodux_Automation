module.exports = {

  URL:{
      siteLink: "https://web.staging.obodux.boris-software.com",
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
    dName :"Trocar",
    deiveDes : "Used for body drilling",
    dFilePath: "C:\\Users\\udula\\Downloads\\Trocar.jpg"
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

      dName: "Trocar",
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

  riskAnalysisMatrixFormData : {

      firstRowAnswers : [ 

        "T1 " , "T1 " , "T1 " , "T1 ",
        "1" , "1 " , "1 " , "High ",
        "T1 " , "T1 " , "T1 " , "T1 " ,
        "2 " , "2 " ,"2 " ,"Medium " , "T1 "
    ] ,

    secondRowAnswers : [ 

        "T2 " , "T2 " , "T2 " , "T2 ",
        "3" , "3 " , "3 " , "Medium ",
        "T2 " , "T2 " , "T2 " , "T2 " ,
        "4 " , "4 " ,"4 " ,"Low " , "T2 "
    ] ,

    thirdRowAnswers : [

        "T3 " , "T3 " , "T3 " , "T3 ",
        "5" , "5 " , "5" , "High ",
        "T3 " , "T3 " , "T3 " , "T3 " ,
        "6 " , "6 " ,"6" ,"High " , "T3 "
    ] ,

    fourthRowAnswers : [

        "T4 " , "T4 " , "T4 " , "T4 ",
        "7" , "7 " , "7 " , "Low ",
        "T4 " , "T4 " , "T4 " , "T4 " ,
        "8 " , "8 " , "8 " , "Low " , "T4 "
    ] ,

    fifthRowAnswers : [

        "T5 " , "T5 " , "T5 " , "T5 ",
        "9" , "9 " , "9 " , "Low ",
        "T5 " , "T5 " , "T5 " , "T5 " ,
        "10 " , "10 " , "10 " , "Low " , "T5 "
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

  cerSectionData: {

    equivalenceJustification: "The Trocar device is considered equivalent to the referenced predicate device based on: (1) Identical intended purpose of creating surgical access points in body cavities during minimally invasive procedures; (2) Similar design characteristics including sharp-tip geometry and hollow shaft construction from biocompatible stainless steel; (3) Comparable clinical procedures and patient populations. Equivalence assessed per MDCG 2020-5.",

    pmsDataSummary: "PMS data reviewed for period 2022–2024. Total units sold: 12,450. Total complaints: 11 (rate: 0.088%). Categories: packaging issues (7), labelling queries (3), device functionality (1). No serious adverse events (SAEs) or field safety corrective actions (FSCAs) reported. Equivalent device PMS data from published literature confirms a comparable safety and performance profile.",

    summaryAppraisalRows: [
        [ "REF-001", "Pre-Clinical", "ISO 10993 Biocompatibility testing — all endpoints passed", "2024-01-15", "Acceptable" ],
        [ "REF-002", "Literature",  "Systematic review of 45 publications on trocar safety and performance in laparoscopic surgery", "2024-02-20", "Acceptable" ],
        [ "REF-003", "PMS Data",    "Post-market surveillance summary — no SAEs or FSCAs identified during review period", "2024-03-10", "Acceptable" ],
    ],

    gsprJustification: "Clinical data from pre-clinical testing, systematic literature review, and post-market surveillance collectively demonstrate that the Trocar device meets the applicable General Safety and Performance Requirements (GSPRs) per Annex I of MDR 2017/745. The benefit-risk profile is acceptable for the intended use.",

    qualifications: [
        {
            name:           "Dr. Sarah Johnson",
            qualification:  "MD, PhD – Clinical Research and Medical Devices",
            experience:     "12 years of medical device clinical evaluation experience including MDR submissions",
            role:           "Lead Clinical Evaluator"
        },
        {
            name:           "Dr. Michael Chen",
            qualification:  "MD – Surgical Specialties, MSc Regulatory Affairs",
            experience:     "8 years in regulatory and clinical affairs for Class IIa and IIb surgical devices",
            role:           "Clinical Reviewer"
        },
    ],

    qualificationPdfPath: "C:\\Users\\udula\\Downloads\\Trocar.jpg",

    changes: [
        { description: "Updated biocompatibility assessment per revised ISO 10993-1:2018 guidance document", version: "v1.1" },
        { description: "Revised literature search to include publications from 2020–2024 and updated appraisal", version: "v1.2" },
    ],

    equivalenceTable: {
        predicateDevice:    "TrocoMed LX-3 Trocar System",
        manufacturer:       "MedTech Solutions GmbH",
        intendedPurpose:    "Minimally invasive surgical access for laparoscopic and thoracoscopic procedures",
        design:             "Sharp-tip trocar with hollow cannula shaft and integrated flap valve mechanism",
        materials:          "Grade 316L biocompatible stainless steel — ISO 10993 compliant",
        clinicalEquivalence:"Equivalent clinical application in adult patients undergoing minimally invasive abdominal surgery under general anaesthesia"
    }

  }

};
