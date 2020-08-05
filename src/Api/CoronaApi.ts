import axios from "axios";
import {ICountry, IProvince, ISummary} from "../types/CovidAPI";

export default class CoronaApi {
    static async getResultsForCountry(country: string): Promise<ICountry> {
        const response = await axios.get<ISummary>('https://api.covid19api.com/summary');
        const countryResults: ICountry | undefined = response.data.Countries
            .find(currentCountry => currentCountry.Country === country);

        if (!countryResults) {
            throw Error(`The country ${country} could not be found.`);
        }

        return countryResults;
    }

    static async getResultsForProvinces(country: string): Promise<IProvince[]> {
        const response = await axios.get<IProvince[]>('https://api.covid19api.com/country/canada');
        return response.data.reduce((accumulated: IProvince[], provinceStat: IProvince) => {
            let previousStats = accumulated.find((province: IProvince) => province.Province === provinceStat.Province);
            if (!previousStats) {
                previousStats = {
                    Country: provinceStat.Country,
                    Province: provinceStat.Province,
                    Confirmed: 0,
                    Deaths: 0,
                    Recovered: 0,
                    Active: 0,
                }
            }

            const updatedStats =  {
                Country: provinceStat.Country,
                Province: provinceStat.Province,
                Confirmed: previousStats.Confirmed + provinceStat.Confirmed,
                Deaths: previousStats.Deaths + provinceStat.Deaths,
                Recovered: previousStats.Recovered + provinceStat.Recovered,
                Active: previousStats.Active + provinceStat.Active,
            };

            return [ ... accumulated.filter(data => data.Province !== updatedStats.Province), updatedStats];
        }, []);
    }
}