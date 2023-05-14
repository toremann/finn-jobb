"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getFinnJobs() {
    return __awaiter(this, void 0, void 0, function* () {
        let page = 1;
        let hasMoreData = true;
        const jobs = [];
        while (hasMoreData) {
            const url = `https://www.finn.no/api/search-qf?searchkey=SEARCH_ID_JOB_FULLTIME&location=0.20001&occupation=0.23&sort=RELEVANCE&page=${page}&vertical=job`;
            const response = yield fetch(url, {
                headers: {
                    accept: "*/*",
                },
            });
            const data = yield response.json();
            if (data.docs.length === 0) {
                console.log("No more data");
                hasMoreData = false;
            }
            else {
                console.log(`Page ${page} has data`);
                data.docs.forEach((el) => jobs.push({
                    company: el.company_name,
                    dato: new Date(el.timestamp).toLocaleDateString("en-GB"),
                    lokasjon: el.location.toUpperCase(),
                    tekst: el.heading,
                    link: el.ad_link,
                }));
                page++;
                const delay = Math.floor(Math.random() * 10) + 1;
                console.log(`Waiting for ${delay} seconds...`);
                yield new Promise((resolve) => setTimeout(resolve, delay * 1000));
            }
        }
        return jobs;
    });
}
function getKode24Jobs() {
    return __awaiter(this, void 0, void 0, function* () {
        const jobs = [];
        const url = `https://functions.kode24.no/api/listing/job/sorted`;
        const response = yield fetch(url, {
            headers: {
                accept: "*/*",
            },
        });
        const data = yield response.json();
        data.ads.forEach((el) => jobs.push({
            company: el.company.name,
            dato: new Date(el.published).toLocaleDateString("en-GB"),
            lokasjon: el.locations[0].toUpperCase(),
            tekst: el.title,
            link: `https://www.kode24.no/${el.id}`,
        }));
        return jobs;
    });
}
function getJobs(options) {
    return __awaiter(this, void 0, void 0, function* () {
        if (options.getFinnJobs) {
            const finnJobs = yield getFinnJobs();
            return finnJobs;
        }
        if (options.getKode24Jobs) {
            const kode24Jobs = yield getKode24Jobs();
            return kode24Jobs;
        }
        console.log("Invalid options!");
    });
}
function getDetails(company) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!company) {
            return { error: "No data found." };
        }
        const url = `https://beta.proff.no/_next/data/fElrgpLWDWVHX4IbLyCew/search.json?q=${company}`;
        const response = yield fetch(url, {
            headers: {
                accept: "*/*",
            },
        });
        const data = yield response.json();
        if (data.pageProps.companiesByName.companies[0] == null) {
            return { error: "Data not found." };
        }
        const details = {
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
    });
}
module.exports = { getJobs, getDetails };
//# sourceMappingURL=index.js.map