const { Country } = require('../models');


const countryData = [   
    {
        countryName: 'France',
        countryCode: 'FR',
        diseaseRisk: 'High',
        entryText: 'All travellers wishing to enter France, including nationals, are required to complete and present a sworn statement confirming that they do not have COVID-19 symptoms, they are not aware of contact with a confirmed case of COVID-19 within the last 14 days and they will be compliant with testing or quarantine requirements upon arrival.',
        entryDate: '2021-09-12',
        docText: 'All travellers wishing to enter France, including nationals, are required to complete and present a sworn statement confirming that they do not have COVID-19 symptoms, they are not aware of contact with a confirmed case of COVID-19 within the last 14 days and they will be compliant with testing or quarantine requirements upon arrival.</p>',
        docDate: '2021-09-12',
        isDocReq: 'Yes',
        countryDocLink: 'https://www.interieur.gouv.fr/Actualites/L-actu-du-Ministere/Attestation-de-deplacement-et-de-voyage',
        maskText: 'Face masks are mandatory on public transport and in enclosed public areas. Face masks must be also worn at markets, stadiums, queues and other crowded outdoor spaces when distancing is not possible. In high-incidence areas where the infection rate exceeds 200 cases per 100,000 inhabitants, face masks must be also worn in indoor spaces where a health pass is required for entry.</p> <p>Face masks must be worn inflight. A disposable, surgical-type mask must be worn when onboard planes; passengers wearing reusable face masks have been denied boarding. Air France passengers are asked to wear a surgical mask from the moment they arrive at the airport and for the duration of the flight.',
        maskDate: '2021-09-01'
    },
    {
        countryName: 'Canada',
        countryCode: 'CA',
        diseaseRisk: 'High',
        entryText: 'The United States (US) and Canadian governments agreed to close the US-Canada border to unvaccinated travellers until 21 September. Fully vaccinated travellers, those engaged in commercial trade and those with cross-border work permits were unaffected.</p> <p>All travellers who are fully vaccinated against COVID-19 will be permitted to enter Canada without quarantine or post-arrival testing. Foreign nationals who are immediate family members of Canadian citizens or permanent residents and who do not have or display any symptoms of COVID-19, as well as air crew, diplomats, seasonal workers, caregivers and international students are also exempt from the entry ban. Airline passengers will be permitted to transit through Canadian airports.</p> <p>An ongoing ban on traffic of cruise ships and pleasure crafts with a capacity of at least 100 passengers in Canadas territorial waters was extended until 1 November.',
        entryDate: '2021-09-11',
        docText: 'Travellers can download the ArriveCAN app or access it online 72 hours prior to entry to submit required information for arrival at an international border crossing, including vaccination status. Arriving travellers must digitally submit their personal information, including travel and contact information, quarantine plan and COVID-19 symptom self-assessment, through the ArriveCAN website before boarding their flights. ',
        docDate: '2021-09-11',
        isDocReq: 'Yes',
        countryDocLink: 'https://arrivecan.cbsa-asfc.cloud-nuage.canada.ca/',
        maskText: 'Voluntary face mask wearing is encouraged on ferries, trains and buses. Masks must be worn on flights.',
        maskDate: '2021-09-11'
    },
    {
        countryName: 'Italy',
        countryCode: 'IT',
        diseaseRisk: 'Medium',
        entryText: 'Entry is permitted from Category C countries - EU and Schengen Area countries, Andorra, Monaco and Israel - provided that arrivals only transited or stayed in countries where entry is permitted in the last 14 days. There are no restrictions on entry from San Marino and Vatican City (\"Category A\").</p> <p>Travellers from \"Category D\" countries - Albania, Armenia, Australia, Azerbaijan, Bosnia and Herzegovina, Brunei, Canada, Hong Kong, Japan, Jordan, Kosovo, Lebanon, Macau, Moldova, Montenegro, New Zealand, North Macedonia, Qatar, Saudi Arabia, Serbia, Singapore, South Korea, Taiwan, Ukraine, the United Arab Emirates (UAE), the United Kingdom (UK) and the United States (US) - are also permitted entry. However, \"Category D\" travellers without proof of vaccination and negative test for COVID-19 are generally subject to quarantine.</p> <p>Non-essential travel from other non-EU/Schengen countries (\"Category E\") is banned. EU nationals and long-term residents and those seeking to travel for work, absolute urgency, health, study or return home are exempt.</p> <p>Travellers who stayed or transited in Bangladesh, India or Sri Lanka in the last 14 days are banned from entering Italy. Students, parents of minor children residing in Italy, partners of Italian residents, those who had registered residence in Italy before 28 August and Italian nationals registered in the Registry of Italians Residing Abroad (AIRE) are exempt.</p> <p>Travellers who stayed or transited in Brazil in the last 14 days are banned from entering Italy. Students, military personnel, parents of minor children residing in Italy, only those who had registered residence in Italy before 13 February are exempt and permitted entry.',
        entryDate: '2021-09-08',
        docText: 'Arriving travellers must complete the EU Digital Passenger Locator Form .',
        docDate: '2021-09-09',
        isDocReq: 'Yes',
        countryDocLink: 'https://app.euplf.eu/#/',
        maskText: '2021-09-09',
        maskDate: 'Face masks must be worn on public transport and in indoor spaces, as well as crowded outdoor areas.</p> <p>In Sicily, a face mask must be worn in both indoor and outdoor spaces.'
    },
    {
        countryName: 'United States of America',
        countryCode: 'US',
        diseaseRisk: 'Medium',
        entryText: 'Travellers arriving from or transiting through India, South Africa, China, Iran, Brazil, Ireland, the United Kingdom and the European Schengen Area countries of Austria, Belgium, Czech Republic, Denmark, Estonia, Finland, France, Germany, Greece, Hungary, Iceland, Italy, Latvia, Liechtenstein, Lithuania, Luxembourg, Malta, Netherlands, Norway, Poland, Portugal, Slovakia, Slovenia, Spain, Sweden, Switzerland, Monaco, San Marino and Vatican City within 14 days of their planned arrival in the US are barred from entry. US ESTA (Electronic System for Travel Authorization) holders are included within the restrictions. The restrictions do not apply to legal permanent residents or US citizens and their immediate family members, foreign diplomats with A or G visas and air and sea crew with C, D or C1/D visas. Travellers who require an ESTA must still apply and obtain one in advance of arrival. Certain categories of travellers who fall under the National Interest Exception (NIE) are exempt and permitted entry. Immigrants, fiancés/fiancées of US nationals and their dependents (K visas), students holding F-1 or M-1 visas and new or returning students present in China, Brazil, Iran, South Africa or India will be automatically considered for NIE at the port of arrival without prior approval at an embassy or consulate.',
        entryDate: '2021-09-10',
        docText: 'Travellers are not required to complete any health and/or travel documentation. Airlines may require passengers to complete forms prior to landing.',
        docDate: '2021-09-10',
        isDocReq: 'No',
        countryDocLink: 'None',
        maskText: 'Some states and territories require residents to wear masks while out in public. Violators may be subject to fines and be denied entry to businesses and use of public transport. Most states and territories have voluntary measures or measures restricted to specific venues and municipalities.</p> <p>Enforcement varies widely and is not consistently enforced below the federal level. Masks must be worn in federal government buildings as well as on inter-state transport, including at airports and onboard flights, trains, planes, intercity buses and ferries until at least 18 January 2022.',
        maskDate: '2021-09-10'
    },
    {
        countryName: 'Estonia',
        countryCode: 'EE',   
        diseaseRisk: 'High',  
        entryText: 'Unvaccinated non-European Union (EU) nationals and residents cannot enter the country for non-essential travel. Residents of lower COVID-19 risk countries - Albania, Armenia, Australia, Azerbaijan, Bosnia-Herzegovina, Brunei, Canada, Hong Kong, Japan, Jordan, Moldova, Montenegro, New Zealand, Saudi Arabia, Serbia, Singapore, South Korea, Taiwan and Ukraine - are exempt. Entry for work and study is permitted. People transporting goods and raw materials, people involved in international freight or passenger transport, people performing technical tasks for companies in Estonia, healthcare workers, diplomats, people arriving for the purpose of international military cooperation and people with special permission to enter are also exempt from the countrys entry ban.</p> <p>Nationals, residents and long-stay visa holders of EU member states, Schengen Area countries, the United Kingdom, Andorra, Monaco, San Marino and Vatican City and their family members are permitted entry.</p> <p>With the exception of Estonian residents and their family members, foreign nationals who show symptoms of COVID-19 will be denied entry.',  
        entryDate: '2021-09-09',
        docText: 'Travellers must complete a passenger locator form. The form can be completed within three days before arrival.',
        docDate: '2021-09-05',
        isDocReq: 'Yes',
        countryDocLink: 'https://iseteenindus.terviseamet.ee/',
        maskText: 'A face mask must be worn on public transport and inside shops, pharmacies, libraries, bank offices and all other public venues, where visitors are not required to present their COVID-19 certificates. Children below the age of 12 are exempt from this rule.',
        maskDate: '2021-09-05'
    },
];

const seedCountry = () => Country.bulkCreate(countryData);
module.exports = seedCountry;