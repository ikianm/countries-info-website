import React from 'react';
import CountryCard from '../CountryCard/CountryCard';
import { CountryType } from '@/types/types';

type CountriesListProp = {
    selectedCountries: CountryType[]
};

export default function CountriesList({ selectedCountries }: CountriesListProp) {
    return (
        <>
            {
                selectedCountries?.map(country => (
                    <CountryCard key={country.name.official} {...country} />
                ))
            }
        </>
    )
}
