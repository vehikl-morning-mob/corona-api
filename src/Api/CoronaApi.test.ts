import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import {ICountry} from "../types/CovidAPI";
import CoronaApi from "./CoronaApi";
import fixture from "../fixtures/summary.json";

describe('CoronaApi', () => {
    let mockServer: MockAdapter;
    const testCountries: ICountry[] = fixture.Countries;

    beforeEach(() => {
        mockServer = new MockAdapter(axios);
    });

    it('getResultsForCountry returns the total number of cases for an existing country', async () => {
        const targetCountryStats = testCountries[0];

        mockServer.onGet('https://api.covid19api.com/summary').reply(200, fixture);

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
        mockServer.onGet('https://api.covid19api.com/summary').reply(200, fixture);

        await expect(CoronaApi.getResultsForCountry(fakeCountry.Country)).rejects.toThrow();
    });

    afterEach(() => {
        mockServer.restore();
    });
});