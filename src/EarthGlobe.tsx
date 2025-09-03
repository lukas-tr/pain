import { Canvas, useFrame, useLoader, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";

// texture source: https://www.solarsystemscope.com/textures/

// function EquirectBackground({ src }: { src: string }) {
//     const tex = useLoader(THREE.TextureLoader, src);
//     const { scene } = useThree();

//     useEffect(() => {
//         tex.colorSpace = THREE.SRGBColorSpace;
//         tex.mapping = THREE.EquirectangularReflectionMapping;
//         const prev = scene.background;
//         scene.background = tex;
//         return () => { scene.background = prev; };
//     }, [scene, tex]);

//     return null;
// }

const soundFiles = [
    new Audio("audio/earth.wav"),
    new Audio("audio/fire.wav"),
    new Audio("audio/metal.wav"),
    new Audio("audio/water.wav"),
    new Audio("audio/wood.wav"),
]

function SoundSourceSphere(props: { position: [number, number, number] }) {
    // This reference will give us direct access to the mesh
    const meshRef = useRef<THREE.Mesh>(null!);
    // Set up state for the hovered and active state
    // const [hovered, setHover] = useState(false)
    //   const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((_, delta) => {
        meshRef.current.rotation.x += delta;
        const material = meshRef.current.material as THREE.MeshStandardMaterial;
        material.opacity -= delta * 0.08;
        meshRef.current.scale.addScalar(delta * 0.1);
    })
    // Return view, these are regular three.js elements expressed in JSX
    return (
        <mesh
            {...props}
            ref={meshRef}
            //   scale={active ? 1.5 : 1}
            scale={0.001}
        //   onClick={(event) => setActive(!active)}
        // onPointerOver={() => setHover(true)}
        // onPointerOut={() => setHover(false)}
        >
            <sphereGeometry args={[1, 32, 32]} />
            <meshStandardMaterial
                color="#0000ff"
                transparent
                opacity={0.2}
                side={THREE.FrontSide}
                blending={THREE.AdditiveBlending}

            // transparent color={hovered ? 'hotpink' : 'orange'} 
            />
        </mesh>
    )
}

function Earth() {
    const grp = useRef<THREE.Group>(null!);
    const cloudsRef = useRef<THREE.Mesh>(null!);
    // const day = useLoader(THREE.TextureLoader, "/textures/planets/8k_earth_daymap.jpg");
    // const day = useLoader(THREE.TextureLoader, "/textures/planets/8k_earth_daymap_greyscale.jpg");
    // const night = useLoader(THREE.TextureLoader, "/textures/planets/earth_night_4096.jpg");
    const clouds = useLoader(THREE.TextureLoader, "/textures/planets/8k_earth_clouds.jpg");
    // const clouds = useLoader(THREE.TextureLoader, "https://pain-ix0y.onrender.com/api/cloudmap/");
    const height = useLoader(THREE.TextureLoader, "/textures/planets/8k_height.jpg");
    //const height = useLoader(THREE.TextureLoader, "https://pain-ix0y.onrender.com/api/bumpmap/");/
    const soundSourceSphereKey = useRef(0);

    // const day = useLoader(THREE.TextureLoader, "/textures/planets/economic.png");
    const emotional = useLoader(THREE.TextureLoader, "/textures/planets/emo-map.png");
    const physical = useLoader(THREE.TextureLoader, "/textures/planets/physical-map.png");
    const social = useLoader(THREE.TextureLoader, "/textures/planets/socio-eco-map.png");

    // Store box positions as array of { position: [x, y, z] }
    const [boxes, setBoxes] = useState<{ position: [number, number, number] }[]>([]);

    useEffect(() => {
        [emotional, physical, social, clouds].forEach(t => {
            t.colorSpace = THREE.SRGBColorSpace;
            t.anisotropy = 8;
        });

        [height].forEach(t => {
            t.colorSpace = THREE.LinearSRGBColorSpace;
            t.anisotropy = 8;
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
        });
    }, [emotional, physical, social, clouds, height]);

    useFrame((_, delta) => {
        grp.current.rotation.y += delta * 0.03;
    });

    function handleEarthClick(event: ThreeEvent<MouseEvent>) {
        const localPoint = grp.current.worldToLocal(event.point);

        const len = Math.sqrt(localPoint.x * localPoint.x + localPoint.y * localPoint.y + localPoint.z * localPoint.z);
        const scale = 1.02 / len; // normalize to just above surface
        const pos: [number, number, number] = [localPoint.x * scale, localPoint.y * scale, localPoint.z * scale];
        // setBoxes(prev => [...prev, { position: pos }]);
        setBoxes(() => [{ position: pos }]);
        soundSourceSphereKey.current += 1;
        soundFiles[Math.floor(Math.random() * soundFiles.length)].play();
    }

    return (
        <group ref={grp}>
            {/* Globe */}
            <mesh onClick={handleEarthClick}>
                <sphereGeometry args={[1, 512, 512]} />
                <meshStandardMaterial map={emotional}
                    displacementMap={height}
                    displacementScale={-0.2}
                    displacementBias={0}
                />
            </mesh>
            <mesh onClick={handleEarthClick}>
                <sphereGeometry args={[1, 512, 512]} />
                <meshStandardMaterial map={physical}
                    displacementMap={height}
                    displacementScale={-0.2}
                    displacementBias={0}
                    opacity={0.3}
                    transparent
                />
            </mesh>
            <mesh onClick={handleEarthClick}>
                <sphereGeometry args={[1, 512, 512]} />
                <meshStandardMaterial map={social}
                    displacementMap={height}
                    displacementScale={-0.2}
                    displacementBias={0}
                    opacity={0.3}
                    transparent
                />
            </mesh>

            {/* Spawned Boxes */}
            {boxes.map((box, i) => (
                <SoundSourceSphere key={i + soundSourceSphereKey.current} position={box.position} />
            ))}

            {/* economic
            <mesh>
                <sphereGeometry args={[1.005, 64, 64]} />
                <meshStandardMaterial
                    map={economic}
                    transparent
                    opacity={0.5}
                    depthWrite={false}
                />
            </mesh> */}

            {/* Clouds */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[1.01, 64, 64]} />
                <meshStandardMaterial
                    map={clouds}
                    transparent
                    opacity={0.3}
                    depthWrite={false}
                />
            </mesh>

            {/* Atmosphere glow */}
            <mesh>
                <sphereGeometry args={[1.03, 64, 64]} />
                <meshBasicMaterial
                    color="#4db2ff"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                />
            </mesh>
        </group>
    );
}

export default function EarthScene() {
    const key = useRef(0);
    useEffect(() => {
        key.current = Math.random(); // needed to force remount during hmr
    }, [])
    return (
        <Canvas style={{ width: "100vw", height: "90vh" }} camera={{ fov: 25, position: [4.5, 2, 3] }}>
            {/* <EquirectBackground src="/textures/planets/8k_stars_milky_way.jpg" /> */}
            {/* <color attach="background" args={["#000"]} /> */}
            <ambientLight intensity={2} />
            <directionalLight color="#fff" intensity={5} position={[0, 0, 3]} />
            <OrbitControls enablePan={false} enableDamping dampingFactor={0.02} minDistance={2} maxDistance={8} />
            <Earth />
        </Canvas>
    );
}
