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
    deiveDes : "A sharp, pointed surgical instrument used to puncture a body cavity during laparoscopic surgery.",
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

      dName: "Blood Pressure DInfo",
      intendedPurpose: " Blood Pressure intended purpose",
      clinicalBenefits: "Blood Pressure clinical benefits",
      knownSideEffects: "Blood Pressure known side effects",
      contradictions: "Blood Pressure contradictions",
      clinicalUsage: "Blood Pressure clinical usage",
      intendedUsers: "For General Patients",
      intendedCount: "1000000",
      basicUdiDi: "0456789123MRI2024X",
      gmdnCode: "40763",
      emdnCode: "Y0101"
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

    grades: [
        {definition: 'T1' , severity: '10'},
        {definition: 'T2' , severity: '8'},
        {definition: 'T3' , severity: '5'},
        {definition: 'T4' , severity: '3'},
        {definition: 'T5' , severity: '1'},
      ]

  },

  initialHazardFormData: {

       answers : [
        
                "test 1", "test 2", "test 3", "test 4", "test 5",
                "test 6", "test 7", "test 8", "test 9", "test 10",
                "test 11", "test 12", "test 13", "test 14", "test 15",
                "test 16", "test 17", "test 18", "test 19", "test 20",
                "test 21", "test 22", "test 23", "test 24", "test 25",
                "test 26", "test 27", "test 28", "test 29","test 30",
                "test 31"
            ],

      answers3 : [

        "test 32", "test 33", "test 34", "test 35","test 36",
        "test 37", "test 38", "test 39", "test 40",
        "test 41", "test 42", "test 43", "test 44" , "test 45"
    ]

  } ,

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
    ]

  }

};
