const { getJobs } = require("../lib/index");

async function myAwesomeFunc() {
    const jobs = await getJobs({
      getFinnJobs: true,
      getKode24Jobs: true,
    });
  
    console.log(jobs)
  }
  
  myAwesomeFunc();