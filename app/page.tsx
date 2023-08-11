'use client'
import React, { ChangeEvent, useEffect, useState, useTransition, useContext } from 'react';
import { AFRICA, AMERICA, ASIA, EUROPE, OCEANIA } from '@/constants/constants';
import { HiMagnifyingGlass } from 'react-icons/hi2';
import CountriesList from '@/components/CountriesList/CountriesList';
import CircularProgress from '@mui/material/CircularProgress';
import { CountryType } from '@/types/types';
import { ThemeContext } from '@/contexts/themeContext';
import './page.css';


export default function HomePage() {
  const [allCountries, setAllCountries] = useState<CountryType[] | null>();
  const [shownCountries, setShownCountries] = useState<CountryType[] | null>();
  const [region, setRegion] = useState<string>('all');
  const [isPending, startTransition] = useTransition();
  const themeCtx = useContext(ThemeContext);
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population',
      { cache: 'force-cache' })
      .then(res => res.json())
      .then(data => {
        setShownCountries(data);
        setAllCountries(data);
      });
  }, [])

  const searchCountryHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const filterPattern = e.target.value;
    startTransition(() => {
      setShownCountries(prevState => {
        if (region !== 'all') { //if there is an active region filter, this returns result based on both region & search value
          return allCountries?.filter(country => country.name.official.includes(filterPattern) && country.region === region);
        }
        return allCountries?.filter(country => country.name.official.includes(filterPattern));
      });
    })
  };

  const filterByRegionHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setRegion(e.target.value);
    setShownCountries(prevState => {
      return allCountries?.filter(country => country.region === e.target.value);
    });
  };

  return (
    <>
      {

        shownCountries ? (
          <div className={themeCtx.isThemeDark ? 'homepage' : 'homepage light'} >
            <div className="homepage-inputs">
              <div className={themeCtx.isThemeDark ? 'homepage-search-wrapper' : 'homepage-search-wrapper light'}>
                <HiMagnifyingGlass className={themeCtx.isThemeDark ? 'homepage-search-icon' : 'homepage-search-icon light'} />
                <input type="text" placeholder='Search for a country...' onChange={searchCountryHandler} />
              </div>
              <select
                name="select-region"
                className={themeCtx.isThemeDark ? 'homepage-select-region' : 'homepage-select-region light'}
                onChange={filterByRegionHandler}
              >
                <option value='Default' hidden>
                  Filter by region
                </option>
                <option value={AFRICA}>Africa</option>
                <option value={AMERICA}>America</option>
                <option value={ASIA}>Asia</option>
                <option value={EUROPE}>Europe</option>
                <option value={OCEANIA}>Oceania</option>
              </select>
            </div>


            <div className="homepage-countries-preview">
              {
                shownCountries ? <CountriesList selectedCountries={shownCountries} /> : null
              }

            </div>


          </div>
        ) :
          <div className="homepage spinner">
            <CircularProgress id='spinner' />
          </div>
      }
    </>
  )
}
