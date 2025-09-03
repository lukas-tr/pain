import './App.css'
import EarthGlobe from './EarthGlobe'
import Icon from '@mdi/react';
import { mdiMouseScrollWheel } from '@mdi/js';
import ShareYourPainDialog from './ShareYourPainDialog'
import AboutDialog from './AboutDialog'
import DataSourcesDialog from './DataSourcesDialog'

function WelcomeSection() {
  return (
    <div className="section text-center">
      {/* TODO: add logo image */}
      <img src="/pain.png" width={256} height={256} alt="P.A.I.N. logo" />
      <h1 style={{ fontSize: "1.8rem" }}><strong>P.A.I.N.</strong> is PERSONAL AND INTERCONNECTED with NATURE</h1>
      <p>P.A.I.N is a research investigatory project exploring the Earth's pain and its ripple effects through a scientific, medical, and creative approach. It provides a holistic perspective on pain through personal, physical, emotional, ecological, socioeconomic, political, collective, and interconnected aspects. </p>

      <button className="mt-8" onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}>
        <Icon path={mdiMouseScrollWheel} size={1} />
        <span>Scroll down to explore the map</span>
      </button>

    </div>
  );
}

function App() {

  // const [count, setCount] = useState(0)

  // const [text, setText] = useState("")

  return (
    <>
      <WelcomeSection />
      <div className="card">
        <h2 className="text-[1.8rem] m-2">EXPLORE PERSONAL-PLANETARY-PAIN (PPP) </h2>
        <p className="m-2">(click anywhere on the map)</p>
        <EarthGlobe />
        {/* <Canvas>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas> */}
      </div>
      <div className="fixed bottom-4 gap-2 right-[0.5rem] w-[calc(100%-1rem)] flex">
      <AboutDialog />
      <DataSourcesDialog />
      <div className="flex-grow"></div>
      <ShareYourPainDialog />
</div>
    </>
  )
}

export default App
