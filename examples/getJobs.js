const { getJobs } = require("../dist/src/index");

async function myAwesomeFunc() {
    const jobs = await getJobs({
      getFinnJobs: false,
      getKode24Jobs: true,
    });
  
    console.log(jobs)
  }
  
  myAwesomeFunc();