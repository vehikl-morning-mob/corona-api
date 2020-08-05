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
            let ontarioStats = accumulated.find((province: IProvince) => province.Province === provinceStat.Province);
            if (!ontarioStats) {
                ontarioStats = {
                    Country: provinceStat.Country,
                    Province: provinceStat.Province,
                    Confirmed: 0,
                    Deaths: 0,
                    Recovered: 0,
                    Active: 0,
                }
            }

            const taco =  {
                Country: provinceStat.Country,
                Province: provinceStat.Province,
                Confirmed: ontarioStats.Confirmed + provinceStat.Confirmed,
                Deaths: ontarioStats.Deaths + provinceStat.Deaths,
                Recovered: ontarioStats.Recovered + provinceStat.Recovered,
                Active: ontarioStats.Active + provinceStat.Active,
            };


            return [ ... accumulated.filter(data => data.Province !== taco.Province), taco];
        }, []);
    }
}