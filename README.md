# FINN-JOBB
---
Get all developer jobs from finn.no
## Quick start
---
First, run `npm install finn-jobb`

The function fetches job data from the Finn.no API, with a delay of 1 to 10 seconds between each page request to avoid overloading the API. The fetched job data is stored in an array, which is then filtered by the specified location and returned as a promise.

```js
const getJobs = require('finn-jobb')

getJobs().then((jobs) => {
    const filteredJobs = jobs.filter((job) => job.lokasjon.includes('OSLO'));
    console.log(filteredJobs);
  });

// ...
```