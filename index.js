async function getFinnJobs() {
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
          link: el.canonical_url,
        })
      );
      page++;
      const delay = Math.floor(Math.random() * 10) + 1;
      console.log(`Waiting for ${delay} seconds...`);
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));
    }
  }

  return jobs;
}

async function getKode24Jobs() {
  const jobs = [];
  const url = `https://functions.kode24.no/api/listing/job/sorted`;

  const response = await fetch(url, {
    headers: {
      accept: "*/*",
    },
  });

  const data = await response.json();

  data.ads.forEach((el) =>
    jobs.push({
      dato: new Date(el.published).toLocaleDateString("en-GB"),
      lokasjon: el.locations[0].toUpperCase(),
      // kode24.no/el.id for link
      tekst: el.title,
      id: `https://www.kode24.no/${el.id}`,
    })
  );

  return jobs;
}

async function getJobs(options) {
  if (options.getFinnJobs) {
    const finnJobs = await getFinnJobs();
    return finnJobs;
  }

  if (options.getKode24Jobs) {
    const kode24Jobs = await getKode24Jobs();
    return kode24Jobs;
  }

  console.log("Invalid options!");
}

module.exports = { getJobs };
