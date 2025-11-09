
interface SharedPainCardProps {
    coords: [number, number];
    analysisResult: string; // planetary view or shared story
    firstPersonInput?: { personal_account: string; elements: string[]; feelings: string[] } | null;
    sharedStory?: string | null;
    children?: React.ReactNode; // second dialog instance
}

function SharedPainCard({ coords, analysisResult, sharedStory, children }: SharedPainCardProps) {
    return (
        <div className="legend bg-white">
            <h2 className="text-lg">{sharedStory ? 'COMMON PAIN STORY' : 'YOUR PAIN IS SHARED HERE'}</h2>
            <p className="pt-2">Coordinates: {coords.join(", ")} </p>
            {!sharedStory && (
                <>
                    <p className="pt-2">{analysisResult}</p>
                </>
            )}
            {sharedStory && (
                <p className="pt-2 whitespace-pre-wrap">{sharedStory}</p>
            )}
            <div className="mt-4">
                {children}
            </div>
        </div>
    );
}

export default SharedPainCard;
