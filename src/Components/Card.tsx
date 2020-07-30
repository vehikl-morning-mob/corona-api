import React, {useEffect, useState} from 'react';
import CoronaApi from "../Api/CoronaApi";
import {ICountry} from "../types/CovidAPI";

const cardStyle = {
    padding: "1rem",
    border: "1px solid gray",
    borderRadius: "1rem",
    maxWidth: "15rem",
    textAlign: "center" as "center"
};

const countryNameStyle = {
    fontSize: "1.25rem",
};

const attributesListStyle = {
    listStyle: "none",
    textAlign: "left" as "left",
}

const attributeListItemStyle  = {
    marginTop: "0.25rem",
}

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
    }, []);

    return (
        <div style={cardStyle}>
            <h2 style={countryNameStyle}>{countryName}</h2>
            <ul style={attributesListStyle}>

                <li style={attributeListItemStyle}>Total Confirmed: {statistics.TotalConfirmed}</li>
                <li style={attributeListItemStyle}>Total Deaths: {statistics.TotalDeaths}</li>
                <li style={attributeListItemStyle}>Total Recovered: {statistics.TotalRecovered}</li>
            </ul>
        </div>
    )
};

export default Card;