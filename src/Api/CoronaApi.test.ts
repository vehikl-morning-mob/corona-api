import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {ICountry} from "../types/CovidAPI";
import CoronaApi from "./CoronaApi";
import SummaryFixture from "../fixtures/summary.json";
import ByCountryRawFixture from '../fixtures/byCountry - Raw.json';
import ByCountryProcessedFixture from '../fixtures/byCountry - Processed.json';

describe('CoronaApi', () => {
    let mockServer: MockAdapter;
    const testCountries: ICountry[] = SummaryFixture.Countries;

    beforeEach(() => {
        mockServer = new MockAdapter(axios);
    });

    afterEach(() => {
        mockServer.restore();
    });

    it('getResultsForCountry returns the total number of cases for an existing country', async () => {
        const targetCountryStats = testCountries[0];

        mockServer.onGet('https://api.covid19api.com/summary').reply(200, SummaryFixture);

        const actualStats = await CoronaApi.getResultsForCountry(targetCountryStats.Country);
        expect(actualStats).toEqual(targetCountryStats);
    });

    it('getResultsForCountry throws when no country was found', async () => {
        const fakeCountry = {
            Country: "Arstotzka",
            NewConfirmed: 0,
            NewDeaths: 0,
            NewRecovered: 0,
            TotalConfirmed: 1,
            TotalDeaths: 1,
            TotalRecovered: 0
        };
        mockServer.onGet('https://api.covid19api.com/summary').reply(200, SummaryFixture);

        await expect(CoronaApi.getResultsForCountry(fakeCountry.Country)).rejects.toThrow();
    });

    it('can get summary data for province', async () =>  {
        const mockCountryData = [
            {
                "Country": "Canada",
                "CountryCode": "CA",
                "Province": "Ontario",
                "City": "",
                "CityCode": "",
                "Lat": "51.25",
                "Lon": "-85.32",
                "Confirmed": 0,
                "Deaths": 0,
                "Recovered": 0,
                "Active": 1,
                "Date": "2020-01-22T00:00:00Z"
            },
            {
                "Country": "Canada",
                "CountryCode": "CA",
                "Province": "Ontario",
                "City": "",
                "CityCode": "",
                "Lat": "51.25",
                "Lon": "-85.32",
                "Confirmed": 2,
                "Deaths": 0,
                "Recovered": 0,
                "Active": 0,
                "Date": "2020-01-23T00:00:00Z"
            },
        ]
        mockServer.onGet('https://api.covid19api.com/country/canada').reply(200, mockCountryData);

        const actualStats = await CoronaApi.getResultsForProvinces('canada');
        const expected = [
            {
                "Country": "Canada",
                "Province": "Ontario",
                "Confirmed": mockCountryData[0].Confirmed + mockCountryData[1].Confirmed,
                "Deaths": mockCountryData[0].Deaths + mockCountryData[1].Deaths,
                "Active": mockCountryData[0].Active + mockCountryData[1].Active,
            }
        ];
        expect(actualStats).toEqual(expected);
    });

    it('can get summary data for complex set of provinces', async () => {
        mockServer.onGet('https://api.covid19api.com/country/canada').reply(200, ByCountryRawFixture);

        const actualStats = await CoronaApi.getResultsForProvinces('canada');

        expect(actualStats).toEqual(ByCountryProcessedFixture);
    });

    it('treats provinces with empty names as Nunavut', async () => {
        const mockCountryData = [
            {
                "Country": "Canada",
                "CountryCode": "CA",
                "Province": "Ontario",
                "City": "",
                "CityCode": "",
                "Lat": "51.25",
                "Lon": "-85.32",
                "Confirmed": 0,
                "Deaths": 0,
                "Recovered": 0,
                "Active": 1,
                "Date": "2020-01-22T00:00:00Z"
            },
            {
                "Country": "Canada",
                "CountryCode": "CA",
                "Province": "",
                "City": "",
                "CityCode": "",
                "Lat": "51.25",
                "Lon": "-85.32",
                "Confirmed": 2,
                "Deaths": 0,
                "Recovered": 0,
                "Active": 0,
                "Date": "2020-01-23T00:00:00Z"
            },
            {
                "Country": "Canada",
                "CountryCode": "CA",
                "Province": "British Columbia",
                "City": "",
                "CityCode": "",
                "Lat": "51.25",
                "Lon": "-85.32",
                "Confirmed": 2,
                "Deaths": 0,
                "Recovered": 0,
                "Active": 0,
                "Date": "2020-01-23T00:00:00Z"
            },
        ]
        mockServer.onGet('https://api.covid19api.com/country/canada').reply(200, mockCountryData);

        const actualStats = await CoronaApi.getResultsForProvinces('canada');

        expect(actualStats[1]).toMatchObject({
            "Province": "Nunavut"
        });
    });

    // it('passes', () => {
    //    expect(true).toBeFalsy();
    // });
});