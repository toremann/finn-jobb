const { getJobs } = require("../index");

async function myAwesomeFunc() {
    const jobs = await getJobs({
      getFinnJobs: false,
      getKode24Jobs: true,
    });
  
    console.log(jobs)
  }
  
  myAwesomeFunc();