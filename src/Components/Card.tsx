import React, {useEffect, useState} from 'react';
import CoronaApi from "../Api/CoronaApi";

interface ICardProps {
    countryName: string;
}

const Card: React.FC<ICardProps> = ({countryName}) => {
    const [numberOfCases, setNumberOfCases] = useState(0);

    useEffect(() => {
        new CoronaApi().getResultsForCountry(countryName).then((result) => {
            setNumberOfCases(result.numberOfCases);
        })
    }, [])

    return (
        <p>I am the card for {countryName} : {numberOfCases}</p>
    )
};

export default Card;