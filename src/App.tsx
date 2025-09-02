import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
import './App.css'
// import { Canvas, useFrame } from '@react-three/fiber'
import EarthGlobe from './EarthGlobe'
import PointSelector from './PointSelector'

function App() {
  // const [count, setCount] = useState(0)
  
  const [text, setText] = useState("")

  return (
    <>
      <h1>PAIN</h1>
      <div className="card">
        <textarea 
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Pain from the last 5 years..."
        />
        <PointSelector
  width={480}
  height={320}
  initialPoint={{x:0.25,y:0.75}}
  snapToGrid={10}
  onChange={p => console.log(p)}
/>
        <EarthGlobe />
        {/* <Canvas>
    <ambientLight intensity={Math.PI / 2} />
    <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
    <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
    <Box position={[-1.2, 0, 0]} />
    <Box position={[1.2, 0, 0]} />
  </Canvas> */}
      </div>
    </>
  )
}

export default App
