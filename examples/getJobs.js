const { getJobs } = require("../lib/index");
// const { getJobs } = require("finn-jobb");

async function myAwesomeFunc() {
    const jobs = await getJobs({
      getFinnJobs: false,
      getKode24Jobs: true,
    });
  
    console.log(jobs)
  }
  
  myAwesomeFunc();