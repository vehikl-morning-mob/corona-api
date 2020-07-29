import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {ISummary} from "../types/CovidAPI";
import CoronaApi from "./CoronaApi";

describe('CoronaApi', () => {
    let mockServer: MockAdapter;

    beforeEach(() => {
        mockServer = new MockAdapter(axios);
    });

    it('getResultsForCountry returns the total number of cases for the requested country', async () => {
        const targetCountryStats = {
            Country: "Arstotzka",
            NewConfirmed: 0,
            NewDeaths: 0,
            NewRecovered: 0,
            TotalConfirmed: 1,
            TotalDeaths: 1,
            TotalRecovered: 0
        };
        const globalSummary: ISummary = {
            Countries: [
                targetCountryStats,
                {
                    Country: "Fire Nation",
                    NewConfirmed: 5,
                    NewDeaths: 5,
                    NewRecovered: 5,
                    TotalConfirmed: 1,
                    TotalDeaths: 0,
                    TotalRecovered: 1
                }
            ],
            Date: "2020-01-01",
            Global: {
                NewConfirmed: 5,
                NewDeaths: 5,
                NewRecovered: 5,
                TotalConfirmed: 2,
                TotalDeaths: 1,
                TotalRecovered: 1
            }
        };
        mockServer.onGet('https://api.covid19api.com/summary').reply(200, globalSummary);

        const actualStats = await CoronaApi.getResultsForCountry(targetCountryStats.Country);
        expect(actualStats).toEqual(targetCountryStats);
    })

    afterEach(() => {
        mockServer.restore();
    });
});