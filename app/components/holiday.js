import { useState } from "react";

export default function Holiday({ holidayObj }) {
    const [isOpen, setIsOpen] = useState(false);

    // Destructure and provide default values for properties
    const {
        date = "Not Available",
        localName = "Not Available",
        name = "Not Available",
        countryCode = "Not Available",
        fixed = "Not Available",
        global = "Not Available",
        counties = "Not Available",
        launchYear = "Not Available",
        types = [],
    } = holidayObj || {};

    return (
        <div>
            <h3
                className="text-lg text-blue-500 cursor-pointer"
                onClick={() => setIsOpen(true)}
            >
                {name} {date}
            </h3>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded shadow-md">
                        <h3 className="text-lg mb-2">{name}</h3>
                        <ul className="mb-4">
                            <li><b>Local Name:</b> {localName}</li>
                            <li><b>Date:</b> {date}</li>
                            <li><b>Country Code:</b> {countryCode}</li>
                            <li><b>Fixed:</b> {fixed ? "Yes" : "No"}</li>
                            <li><b>Global:</b> {global ? "Yes" : "No"}</li>
                            <li><b>Counties:</b> {counties || "Not Available"}</li>
                            <li><b>Launch Year:</b> {launchYear || "Not Available"}</li>
                            <li><b>Type:</b> {types.length > 0 ? types.join(', ') : "Not Available"} holiday</li>
                        </ul>
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded"
                            onClick={() => setIsOpen(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

