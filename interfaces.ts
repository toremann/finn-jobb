export interface Job {
    company: string;
    dato: string;
    lokasjon: string;
    tekst: string;
    link: string;
}

export interface JobOptions {
    getFinnJobs: boolean;
    getKode24Jobs: boolean;
}

export interface Contact {
    navn: string;
    adresse: string;
    postnr: string;
    poststed: string;
}

export interface CompanyDetails {
    navn: string;
    orgnr: string;
    omsetning: number;
    ansatte: number;
    contact: Contact;
}

export interface Data {
    pageProps: {
        companiesByName: {
            companies: {
                name: string;
                orgnr: string;
                profit: number;
                employees: number;
                contactPerson: {
                    name: string;
                };
                visitorAddress: {
                    addressLine: string;
                    zipCode: string;
                    postPlace: string;
                };
            }[];
        };
    };
}