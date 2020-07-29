import {ICountry} from "./ICountry";
import {IStats} from "./IStats";

export interface ISummary {
    Countries: ICountry[],
    Date: String,
    Global: IStats
}