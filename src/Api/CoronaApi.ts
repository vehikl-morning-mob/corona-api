interface ICoronaReport {
    countryName: string;
    numberOfCases: number;
}

export default class CoronaApi {

    static async getResultsForCountry(country: string): Promise<ICoronaReport> {
        return {
            countryName: country,
            numberOfCases: 543
        }
    }
}