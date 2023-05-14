// const { getDetails } = require("finn-jobb");
const { getDetails } = require("../lib/index");

async function myAwesomeFunc() {
    
    const company = "Visma"
  
    // getDetails takes a string as an argument
    const details = await getDetails(company);

    // returns the details of company
    console.log(details);
  }
  
  myAwesomeFunc();