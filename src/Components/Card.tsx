import React, {useEffect, useState} from 'react';
import CoronaApi from "../Api/CoronaApi";
import {ICountry} from "../types/CovidAPI";

const cardStyle = {
    padding: "1rem 2rem",
    border: "1px solid gray",
    borderRadius: "1rem",
    maxWidth: "10rem",
    textAlign: "center" as "center"
};

interface ICardProps {
    countryName: string;
}



const initialStatistics: ICountry = {
    Country: '',
    NewConfirmed: 0,
    NewDeaths: 0,
    NewRecovered: 0,
    TotalConfirmed: 0,
    TotalDeaths: 0,
    TotalRecovered: 0,
};

const Card: React.FC<ICardProps> = ({countryName}) => {
    const [statistics, setStatistics] = useState<ICountry>(initialStatistics);

    useEffect(() => {
        CoronaApi.getResultsForCountry(countryName).then((result) => {
            setStatistics({...result});
        })
    }, [])

    return (
        <p style={cardStyle}>Country: {countryName}, Total Confirmed: {statistics.TotalConfirmed}, Total Deaths: {statistics.TotalDeaths}, Total Recovered: {statistics.TotalRecovered}</p>
    )
};

export default Card;