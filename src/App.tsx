import './App.css'
import EarthGlobe from './EarthGlobe'
import ShareYourPainDialog, { type IPainInput } from './ShareYourPainDialog'
import AboutDialog from './AboutDialog'
import DataSourcesDialog from './DataSourcesDialog'
import { useState } from 'react';
import SharedPainCard from './SharedPainCard';
import MapLegendDialog from './MapLegendDialog'

/* function Legend() {
  return (
    <div className="legend">
      <div className="legend-row">
        <div style={{ backgroundImage: "linear-gradient(to top, darkgrey , white)", width: "2rem", height: "2rem", flexShrink: 0, border: "1px solid var(--fg-primary)", borderRadius: 4 }}></div>
        <p>
          <strong>Environmental Destruction</strong> (air pollution, deforestation, toxicity, rare earth mining, fires, earthquakes, floods)
        </p>
      </div>

      <div className="legend-row">
        <div style={{ backgroundColor: "#ff00ff", width: "2rem", height: "2rem", flexShrink: 0, border: "1px solid var(--fg-primary)", borderRadius: 4 }}></div>
        <p>
          <strong>Physiological and Physical Pain</strong> (human health datasets, asthma rates, chronic pain, cancers and diseases)
        </p>
      </div>

      <div className="legend-row">
        <div style={{ backgroundColor: "#00ffff", width: "2rem", height: "2rem", flexShrink: 0, border: "1px solid var(--fg-primary)", borderRadius: 4 }}></div>
        <p>
          <strong>Emotional Pain</strong> (social media posts, personal narratives, grief, solastalgia, anxiety, depression)
        </p>
      </div>

      <div className="legend-row">
        <div style={{ backgroundColor: "#ffff00", width: "2rem", height: "2rem", flexShrink: 0, border: "1px solid var(--fg-primary)", borderRadius: 4 }}></div>
        <p>
          <strong>Socio-economic Pain</strong> (social vulnerability indexes, deaths in conflicts, poverty rates, healthcare, GDP, human rights index)
        </p>
      </div>
    </div>
  )
}*/

function App() {

  // const [count, setCount] = useState(0)

  const [analysisResult, setAnalysisResult] = useState("")
  const [coords, setCoords] = useState<[number, number] | null>(null);
  const [firstPersonPainInput, setFirstPersonPainInput] = useState<IPainInput | null>(null);
  const [sharedStory, setSharedStory] = useState<string | null>(null);

  return (
    <>
      <div className="card">
        {coords && analysisResult && (
          <SharedPainCard
            coords={coords}
            analysisResult={analysisResult}
            firstPersonInput={firstPersonPainInput}
            sharedStory={sharedStory}
          >
            {firstPersonPainInput && !sharedStory && (
              <ShareYourPainDialog
                variant="second"
                firstPerson={firstPersonPainInput}
                triggerLabel="Create common pain story"
                onCommonPainComplete={(story) => {
                  setSharedStory(story);
                  // Keep the same coords highlight; scroll to top for visibility
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  // alter coordinates slightly so the earth scrolls again
                  setCoords([coords[0] + 0.0001, coords[1] + 0.0001]);
                }}
              />
            )}
            {firstPersonPainInput && sharedStory && (
            <button
              className="text-sm"
              onClick={() => {
                setAnalysisResult("");
                setCoords(null);
                setFirstPersonPainInput(null);
                setSharedStory(null);
              }}
            >
              Start Over
            </button>
            )}
          </SharedPainCard>
        )}
        {/* <Canvas>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas> */}
      </div>
        <div className="relative overflow-hidden">
        <h2 className="text-[2rem] m-2" style={{textAlign: "center"}}>  ⁠<strong>P.A.I.N</strong> <b>is PERSONAL AND INTERCONNECTED with NATURE</b></h2>
          <p className="text-[1.6rem]" style={{textAlign: "center"}}><b>Explore the Personal-Planetary-Pain (PPP) Map</b></p>
          <EarthGlobe highlightCoords={coords} />
        </div>
      <div className="fixed bottom-4 gap-2 right-[0.5rem] w-[calc(100%-1rem)] flex print:hidden">
        <AboutDialog />
        <DataSourcesDialog />
        <MapLegendDialog />
        <div className="flex-grow"></div>
        <ShareYourPainDialog onAnalysisComplete={(analysis, painInput) => {
          setAnalysisResult(analysis.planetary_view);
          // TODO: highlight this coordinate
          setCoords([analysis.lat, analysis.lon]);
          // Scroll to the top when analysis is completed
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setFirstPersonPainInput(painInput);
          setSharedStory(null); // reset any previous common story for a fresh flow
        }} />
      </div>
    </>
  )
}

export default App
