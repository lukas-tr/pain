import './App.css'
import EarthGlobe from './EarthGlobe'
import ShareYourPainDialog from './ShareYourPainDialog'
import AboutDialog from './AboutDialog'
import DataSourcesDialog from './DataSourcesDialog'
import { useState } from 'react';
import SharedPainCard from './SharedPainCard';

function WelcomeSection() {
  return (
    <div className="section text-center">
      <h1 style={{ fontSize: "1.8rem" }}><strong>P.A.I.N</strong> <b>is PERSONAL AND INTERCONNECTED with NATURE</b></h1>
    </div>
  );
}

function Legend() {
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
}

function App() {

  // const [count, setCount] = useState(0)

  const [analysisResult, setAnalysisResult] = useState("")
  const [coords, setCoords] = useState<[number, number] | null>(null);

  return (
    <>
      <WelcomeSection />
      <div className="card">
        {
          coords && analysisResult && (
            <SharedPainCard coords={coords} analysisResult={analysisResult} />
          )
        }
        {/* <Canvas>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas> */}
      </div>
        <div className="relative overflow-hidden">
           <strong> P.A.I.N is PERSONAL AND INTERCONNECTED with NATURE</strong>
               <br> </br>
              <p>P.A.I.N is a research investigatory project exploring the Earth's pain and its ripple effects. The project provides a holistic perspective on pain through personal, physical, emotional, ecological, socioeconomic, political, collective, and interconnected aspects.</p> 
          <h2 className="text-[1.8rem] m-2"><strong>EXPLORE PERSONAL-PLANETARY-PAIN (PPP)</strong></h2>
          <p className="m-2"><b>(click anywhere on the map)</b></p>
          <EarthGlobe highlightCoords={coords} />
         <Legend />
        </div>
      <div className="fixed bottom-4 gap-2 right-[0.5rem] w-[calc(100%-1rem)] flex">
        <AboutDialog />
        <DataSourcesDialog />
        <div className="flex-grow"></div>
        <ShareYourPainDialog onAnalysisComplete={(analysis) => {
          setAnalysisResult(analysis.planetary_view);
          // TODO: highlight this coordinate
          setCoords([analysis.lat, analysis.lon]);
        }} />
      </div>
    </>
  )
}

export default App
