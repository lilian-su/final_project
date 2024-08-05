"use client";

import { useEffect, useState } from "react";
import Holiday from "./Holiday"; // Assuming this is a component for displaying each holiday

// Mapping of country codes to country names
const countryCodeToName = {
    AD: "Andorra", AL: "Albania", AM: "Armenia", AR: "Argentina", AT: "Austria", AU: "Australia", AX: "Åland Islands",
    BA: "Bosnia and Herzegovina", BB: "Barbados", BE: "Belgium", BG: "Bulgaria", BJ: "Benin", BO: "Bolivia", BR: "Brazil",
    BS: "Bahamas", BW: "Botswana", BY: "Belarus", BZ: "Belize", CA: "Canada", CH: "Switzerland", CL: "Chile", CN: "China",
    CO: "Colombia", CR: "Costa Rica", CU: "Cuba", CY: "Cyprus", CZ: "Czechia", DE: "Germany", DK: "Denmark", DO: "Dominican Republic",
    EC: "Ecuador", EE: "Estonia", EG: "Egypt", ES: "Spain", FI: "Finland", FO: "Faroe Islands", FR: "France", GA: "Gabon",
    GB: "United Kingdom", GD: "Grenada", GE: "Georgia", GG: "Guernsey", GI: "Gibraltar", GL: "Greenland", GM: "Gambia",
    GR: "Greece", GT: "Guatemala", GY: "Guyana", HK: "Hong Kong", HN: "Honduras", HR: "Croatia", HT: "Haiti", HU: "Hungary",
    ID: "Indonesia", IE: "Ireland", IM: "Isle of Man", IS: "Iceland", IT: "Italy", JE: "Jersey", JM: "Jamaica", JP: "Japan",
    KR: "South Korea", KZ: "Kazakhstan", LI: "Liechtenstein", LS: "Lesotho", LT: "Lithuania", LU: "Luxembourg", LV: "Latvia",
    MA: "Morocco", MC: "Monaco", MD: "Moldova", ME: "Montenegro", MG: "Madagascar", MK: "North Macedonia", MN: "Mongolia",
    MS: "Montserrat", MT: "Malta", MX: "Mexico", MZ: "Mozambique", NA: "Namibia", NE: "Niger", NG: "Nigeria", NI: "Nicaragua",
    NL: "Netherlands", NO: "Norway", NZ: "New Zealand", PA: "Panama", PE: "Peru", PG: "Papua New Guinea", PL: "Poland",
    PR: "Puerto Rico", PT: "Portugal", PY: "Paraguay", RO: "Romania", RS: "Serbia", RU: "Russia", SE: "Sweden", SG: "Singapore",
    SI: "Slovenia", SJ: "Svalbard and Jan Mayen", SK: "Slovakia", SM: "San Marino", SR: "Suriname", SV: "El Salvador",
    TN: "Tunisia", TR: "Turkey", UA: "Ukraine", US: "United States", UY: "Uruguay", VA: "Vatican City", VE: "Venezuela",
    VN: "Vietnam", ZA: "South Africa", ZW: "Zimbabwe"
};

export default function HolidayList() {
    const [holidaysCountry1, setHolidaysCountry1] = useState([]);
    const [holidaysCountry2, setHolidaysCountry2] = useState([]);
    const [countryCode1, setCountryCode1] = useState("CA");
    const [countryCode2, setCountryCode2] = useState("US");
    const [countryCodes, setCountryCodes] = useState(Object.keys(countryCodeToName));
    const [year, setYear] = useState("2024"); // Default year

    async function fetchHolidays(code, year, setHolidays) {
        try {
            const response = await fetch(`https://date.nager.at/api/v3/publicholidays/${year}/${code}`);
            if (!response.ok) {
                console.log(`Error: ${response.statusText}`);
                return;
            }
            const data = await response.json();
            setHolidays(data);
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    useEffect(() => {
        setHolidaysCountry1([]);
        setHolidaysCountry2([]);

        fetchHolidays(countryCode1, year, setHolidaysCountry1);
        fetchHolidays(countryCode2, year, setHolidaysCountry2);
    }, [countryCode1, countryCode2, year]);

    const combineAndSortHolidays = () => {
        const combined = [...holidaysCountry1.map(holiday => ({ ...holiday, country: countryCode1 })),
                          ...holidaysCountry2.map(holiday => ({ ...holiday, country: countryCode2 }))];

        const groupedByDate = combined.reduce((acc, holiday) => {
            if (!acc[holiday.date]) {
                acc[holiday.date] = [];
            }
            acc[holiday.date].push(holiday);
            return acc;
        }, {});

        return Object.entries(groupedByDate).sort(([dateA], [dateB]) => new Date(dateA) - new Date(dateB));
    };

    const holidaysGrouped = combineAndSortHolidays();

 return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md">
        <div className="mb-4">
            <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                Year:
            </label>
            <input
                type="number"
                id="year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                min="1900"
                max="2100"
            />
        </div>
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2 p-4">
                <div className="mb-4">
                    <label htmlFor="country-select1" className="block text-sm font-medium text-gray-700">
                        Search Country 1:
                    </label>
                    <select
                        id="country-select1"
                        value={countryCode1}
                        onChange={(e) => setCountryCode1(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                        {countryCodes.map((code) => (
                            <option key={code} value={code}>
                                {countryCodeToName[code]}
                            </option>
                        ))}
                    </select>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Holidays in {countryCodeToName[countryCode1]}</h2>
                <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                    {holidaysGrouped
                        .filter(([date, holidays]) => holidays.some(holiday => holiday.country === countryCode1))
                        .map(([date, holidays]) => (
                            <div key={date} className="mb-2">
                                <h3 className="text-lg font-semibold text-gray-700">{date}</h3>
                                <ul className="list-disc pl-5">
                                    {holidays
                                        .filter(holiday => holiday.country === countryCode1)
                                        .map((holiday) => (
                                            <li key={holiday.name} className="p-2">
                                                <Holiday holidayObj={holiday} />
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        ))}
                </div>
            </div>
            <div className="w-full md:w-1/2 p-4">
                <div className="mb-4">
                    <label htmlFor="country-select2" className="block text-sm font-medium text-gray-700">
                        Search Country 2:
                    </label>
                    <select
                        id="country-select2"
                        value={countryCode2}
                        onChange={(e) => setCountryCode2(e.target.value)}
                        className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                    >
                        {countryCodes.map((code) => (
                            <option key={code} value={code}>
                                {countryCodeToName[code]}
                            </option>
                        ))}
                    </select>
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Holidays in {countryCodeToName[countryCode2]}</h2>
                <div className="p-4 bg-white border border-gray-300 rounded-lg shadow-sm">
                    {holidaysGrouped
                        .filter(([date, holidays]) => holidays.some(holiday => holiday.country === countryCode2))
                        .map(([date, holidays]) => (
                            <div key={date} className="mb-2">
                                <h3 className="text-lg font-semibold text-gray-700">{date}</h3>
                                <ul className="list-disc pl-5">
                                    {holidays
                                        .filter(holiday => holiday.country === countryCode2)
                                        .map((holiday) => (
                                            <li key={holiday.name} className="p-2">
                                                <Holiday holidayObj={holiday} />
                                            </li>
                                        ))}
                                </ul>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    </section>
);

}