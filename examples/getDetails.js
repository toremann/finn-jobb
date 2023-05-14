const { getJobs, getDetails } = require("finn-jobb");

async function myAwesomeFunc() {
    
    const jobs = await getJobs({
      getFinnJobs: false,
      getKode24Jobs: true,
    });
  
    // getDetails takes a string as an argument (jobs[0].company is the name of the company needed for getDetails(argument))
    const details = await getDetails(jobs[0].company);

    // create object that merges jobs[0] and details
    const data = {
      ...jobs[0],
      details: details
    };

    // returns the job with details
    console.log(data);
  }
  
  myAwesomeFunc();