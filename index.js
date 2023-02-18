async function getJobs(location) {
  let page = 1;
  let hasMoreData = true;
  const jobs = [];

  while (hasMoreData) {
    const url = `https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_JOB_FULLTIME&location=0.20001&occupation=0.23&sort=RELEVANCE&page=${page}&vertical=job`;
    const response = await fetch(url, {
      headers: {
        accept: "*/*",
      },
    });
    const data = await response.json();

    if (data.docs.length === 0) {
      console.log("No more data");
      hasMoreData = false;
    } else {
      console.log(`Page ${page} has data`);
      data.docs.forEach((el) =>
        jobs.push({
          dato: new Date(el.timestamp).toLocaleDateString("en-GB"),
          lokasjon: el.location.toUpperCase(),
          tekst: el.heading,
          link: el.ad_link,
        })
      );
      page++;
      const delay = Math.floor(Math.random() * 10) + 1;
      console.log(`Waiting for ${delay} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));
    }
  }

  return jobs.filter((job) => job.lokasjon.includes(location.toUpperCase()));
}

getJobs()
  .then((jobs) => console.log(jobs))
  .catch((error) => console.error(error));

module.exports = getJobs