module.exports = {

  URL:{
      siteLink: "https://web.dev.obodux.boris-software.com",
  },

  validUser: {
    email: 'admin-qa1@yopmail.com',
    password: 'abcd@TEST123'
  },

  invalidUser: {
    email: 'primary-admin@yopmail.com',
    password: 'abcd@TES'
  },

  expected: {
    loginError: 'Incorrect account or password. Please check your input.',
    dashboardTitle: 'Obodux'
  },

  deviceDetails: {
    dName :"Stethoscope",
    deiveDes : "Test Description for Stethoscope",
    dFilePath: "C:\\Users\\udula\\Downloads\\Stethascope.jpg"
  },

  manufacturerData: {
    name: "Goblin Care",
    srnNo: "GB-MF-473824726",
    phoneNo: "+447836478624",
    street: "No 23,A",
    state: "West",
    city: "Liverpool",
    postal: "W/1S",
    country: "United Kingdom"
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
  }
};
