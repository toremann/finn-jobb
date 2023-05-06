import { Job, JobOptions, CompanyDetails, Data } from "./interfaces"

async function getFinnJobs(): Promise<Job[]> {
  let page = 1;
  let hasMoreData = true;
  const jobs: Job[] = [];

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
      data.docs.forEach((el: any) =>
        jobs.push({
          company: 'test',
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

  return jobs;
}


async function getKode24Jobs(): Promise<Job[]> {
  const jobs: Job[] = [];
  const url = `https://functions.kode24.no/api/listing/job/sorted`;

  const response = await fetch(url, {
    headers: {
      accept: "*/*",
    },
  });

  const data = await response.json();

  data.ads.forEach((el: any) =>
    jobs.push({
      company: el.company.name,
      dato: new Date(el.published).toLocaleDateString("en-GB"),
      lokasjon: el.locations[0].toUpperCase(),
      tekst: el.title,
      link: `https://www.kode24.no/${el.id}`,
    })
  );

  return jobs;
}

async function getJobs(options: JobOptions): Promise<any> {
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



async function getDetails(company: string): Promise<CompanyDetails | { error: string }> {
  if (!company) {
    return { error: "No data found." };
  }

  const url = `https://beta.proff.no/_next/data/fElrgpLWDWVHX4IbLyCew/search.json?q=${company}`;

  const response = await fetch(url, {
    headers: {
      accept: "*/*",
    },
  });

  const data: Data = await response.json();

  if (data.pageProps.companiesByName.companies[0] == null) {
    return { error: "Data not found." };
  }

  const details: CompanyDetails = {
    navn: data.pageProps.companiesByName.companies[0].name,
    orgnr: data.pageProps.companiesByName.companies[0].orgnr,
    omsetning: data.pageProps.companiesByName.companies[0].profit,
    ansatte: data.pageProps.companiesByName.companies[0].employees,
    contact: {
      navn: data.pageProps.companiesByName.companies[0].contactPerson.name,
      adresse: data.pageProps.companiesByName.companies[0].visitorAddress.addressLine,
      postnr: data.pageProps.companiesByName.companies[0].visitorAddress.zipCode,
      poststed: data.pageProps.companiesByName.companies[0].visitorAddress.postPlace,
    },
  };
  return details;
}


module.exports = { getJobs, getDetails };
