"use client";

import { useEffect, useState } from "react";
import Holiday from "./holiday"; // Assuming this is a component for displaying each holiday

export default function HolidayList() {
    const [holidaysCountry1, setHolidaysCountry1] = useState([]);
    const [holidaysCountry2, setHolidaysCountry2] = useState([]);
    const [countryCode1, setCountryCode1] = useState("CA"); // Default country code for country 1
    const [countryCode2, setCountryCode2] = useState("US"); // Default country code for country 2
    const [countryCodes, setCountryCodes] = useState([
        // List of country codes
        "AD", "AL", "AM", "AR", "AT", "AU", "AX", "BA", "BB", "BE", "BG", "BJ", "BO", "BR", "BS", "BW", "BY", "BZ", "CA",
        "CH", "CL", "CN", "CO", "CR", "CU", "CY", "CZ", "DE", "DK", "DO", "EC", "EE", "EG", "ES", "FI", "FO", "FR", "GA",
        "GB", "GD", "GE", "GG", "GI", "GL", "GM", "GR", "GT", "GY", "HK", "HN", "HR", "HT", "HU", "ID", "IE", "IM", "IS",
        "IT", "JE", "JM", "JP", "KR", "KZ", "LI", "LS", "LT", "LU", "LV", "MA", "MC", "MD", "ME", "MG", "MK", "MN", "MS",
        "MT", "MX", "MZ", "NA", "NE", "NG", "NI", "NL", "NO", "NZ", "PA", "PE", "PG", "PL", "PR", "PT", "PY", "RO", "RS",
        "RU", "SE", "SG", "SI", "SJ", "SK", "SM", "SR", "SV", "TN", "TR", "UA", "US", "UY", "VA", "VE", "VN", "ZA", "ZW"
    ]);

    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    async function fetchHolidays(code, setHolidays) {
        try {
            const response = await fetch(`https://date.nager.at/api/v3/publicholidays/2024/${code}`);
            if (!response.ok) {
                console.log(`Error: ${response.statusText}`);
                return;
            }
            const data = await response.json();
            setHolidays(data); // Store the fetched data
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    useEffect(() => {
        // Reset holidays when country codes change
        setHolidaysCountry1([]);
        setHolidaysCountry2([]);

        // Fetch holidays for both countries
        fetchHolidays(countryCode1, setHolidaysCountry1);
        fetchHolidays(countryCode2, setHolidaysCountry2);
    }, [countryCode1, countryCode2]);

    function handleSearch() {
        // Filter holidays for both countries by the selected date range
        const filterByDateRange = (holidays) => {
            return holidays.filter((holiday) => {
                if (!startDate && !endDate) return true;
                const holidayDate = new Date(holiday.date);
                const start = startDate ? new Date(startDate) : null;
                const end = endDate ? new Date(endDate) : null;
                return (!start || holidayDate >= start) && (!end || holidayDate <= end);
            });
        };

        const filteredHolidays1 = filterByDateRange(holidaysCountry1);
        const filteredHolidays2 = filterByDateRange(holidaysCountry2);

        setHolidaysCountry1(filteredHolidays1);
        setHolidaysCountry2(filteredHolidays2);
    }

    useEffect(() => {
        handleSearch(); // Apply filtering whenever date range changes
    }, [startDate, endDate]);

    return (
        <section>
            <div>
                <label htmlFor="country-select1">Select Country 1: </label>
                <select
                    id="country-select1"
                    value={countryCode1}
                    onChange={(e) => setCountryCode1(e.target.value)}
                >
                    {countryCodes.map((code) => (
                        <option key={code} value={code}>
                            {code}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="country-select2">Select Country 2: </label>
                <select
                    id="country-select2"
                    value={countryCode2}
                    onChange={(e) => setCountryCode2(e.target.value)}
                >
                    {countryCodes.map((code) => (
                        <option key={code} value={code}>
                            {code}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label htmlFor="start-date">Start Date: </label>
                <input
                    type="date"
                    id="start-date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                />
            </div>
            <div>
                <label htmlFor="end-date">End Date: </label>
                <input
                    type="date"
                    id="end-date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                />
            </div>
            <button
                onClick={handleSearch}
                className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
            >
                Search
            </button>
            <div className="flex">
                <div className="w-1/2">
                    <h2 className="text-xl">Holidays in {countryCode1}</h2>
                    {
                        holidaysCountry1.map((holiday) => (
                            <Holiday holidayObj={holiday} key={holiday.date}/>
                        ))
                    }
                </div>
                <div className="w-1/2">
                    <h2 className="text-xl">Holidays in {countryCode2}</h2>
                    {
                        holidaysCountry2.map((holiday) => (
                            <Holiday holidayObj={holiday} key={holiday.date}/>
                        ))
                    }
                </div>
            </div>
        </section>
    );
}
