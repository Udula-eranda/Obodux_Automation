module.exports = {

  URL:{
      siteLink: "https://web.dev.obodux.boris-software.com",
  },

  validUser: {
    email: 'primary-admin@yopmail.com',
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
    dName :"Oximeter",
    deiveDes : "Test Description",
    dFilePath: "C:\\Users\\udula\\Downloads\\pulseOximeter.png"
  }
};
