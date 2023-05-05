# FINN-JOBB
Get all developer jobs from finn.no / kode24.no, made with :heart: 
## Quick start
---
First, run `npm install finn-jobb`

The function fetches job data from the Finn.no API, with a delay of 1 to 10 seconds between each page request to avoid overloading the API. The fetched job data is stored in an array, which is then filtered by the specified location and returned as a promise.

## Options

```js
getJobs({
      getFinnJobs: false,
      getKode24Jobs: true,
    });
```

## Example
```js
const { getJobs } = require("finn-jobb");

async function myAwesomeFunc() {
    const jobs = await getJobs({
      getFinnJobs: false,
      getKode24Jobs: true,
    });
  
    console.log(jobs)
  }
  
  myAwesomeFunc();

// ...
```

## Discord

GitHub user [MartheHilde](https://github.com/MartheHilde) has created a discord bot using finn-jobb, check it out here: [finn-jobb-discordbot](https://github.com/MartheHilde/Finn-jobb-discordbot) :beers: