export default function Holiday({ holidayObj }) {
    const {
        date,
        localName = "Not Available",
        name = "Not Available",
        countryCode,
        types = [],
    } = holidayObj;

    return (
        <div className="mx-20 my-10 p-5 bg-blue-400 rounded">
            <h3 className="text-lg">{name}</h3>
            <ul>
                <li><b>Local Name:</b> {localName}</li>
                <li><b>Date:</b> {date}</li>
                <li><b>Country Code:</b> {countryCode}</li>
                <li><b>Types:</b> {types.join(', ')}</li>
            </ul>
        </div>
    );
}
