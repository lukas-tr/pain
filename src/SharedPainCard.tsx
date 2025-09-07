
function SharedPainCard({coords, analysisResult}: {coords: [number, number], analysisResult: string}) {
    return (
        <div className="legend bg-white">
            <h2 className="text-lg">YOUR PAIN IS SHARED HERE</h2>
            <p className="pt-2">Coordinates: {coords.join(", ")} </p>
            <p className="pt-2">{analysisResult}</p>
        </div>
    )
}

export default SharedPainCard;
