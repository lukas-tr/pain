import { Canvas, useFrame, useLoader, useThree, type ThreeEvent } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useEffect, useRef, useState } from "react";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

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
    new Audio("audio/earth.ogg"),
    new Audio("audio/fire.ogg"),
    new Audio("audio/metal.ogg"),
    new Audio("audio/water.ogg"),
    new Audio("audio/wood.ogg"),
]

const SURFACE_OFFSET = 1.02;
const CAMERA_DISTANCE = 2;

const coordsToVector = ([lat, lon]: [number, number]) => {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -Math.sin(phi) * Math.cos(theta);
    const y = Math.cos(phi);
    const z = Math.sin(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z).normalize();
};

const vectorToTuple = (vector: THREE.Vector3): [number, number, number] => [vector.x, vector.y, vector.z];

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

function Earth({ highlightCoords }: { highlightCoords: [number, number] | null }) {
    const grp = useRef<THREE.Group>(null!);
    const cloudsRef = useRef<THREE.Mesh>(null!);
    // const day = useLoader(THREE.TextureLoader, "/textures/planets/8k_earth_daymap.jpg");
    // const day = useLoader(THREE.TextureLoader, "/textures/planets/8k_earth_daymap_greyscale.jpg");
    // const night = useLoader(THREE.TextureLoader, "/textures/planets/earth_night_4096.jpg");
    const [
        clouds,
        height,
        emotional,
        physical, 
        social,
    ] = useLoader(THREE.TextureLoader, [
        "/textures/planets/2k_earth_clouds.jpg",
        "https://pain-ix0y.onrender.com/api/bumpmap/",
        "/textures/planets/emo-map.png",
        "/textures/planets/physical-map.png",
        "/textures/planets/socio-eco-map.png",
    ]);
    // const clouds = useLoader(THREE.TextureLoader, "https://pain-ix0y.onrender.com/api/cloudmap/");
    // const height = useLoader(THREE.TextureLoader, "/textures/planets/8k_height.jpg");
    const soundSourceSphereKey = useRef(0);

    // const day = useLoader(THREE.TextureLoader, "/textures/planets/economic.png");

    // Store box positions as array of { position: [x, y, z] }
    const [boxes, setBoxes] = useState<{ position: [number, number, number] }[]>([]);

    useEffect(() => {
        [emotional, physical, social, clouds].forEach(t => {
            t.colorSpace = THREE.SRGBColorSpace;
            t.anisotropy = 8;
        });

        // Configure PNG textures with alpha channel for iOS compatibility
        [emotional, physical, social].forEach(t => {
            t.format = THREE.RGBAFormat;
            t.generateMipmaps = true;
            t.minFilter = THREE.LinearMipmapLinearFilter;
            t.magFilter = THREE.LinearFilter;
        });

        [height].forEach(t => {
            t.colorSpace = THREE.LinearSRGBColorSpace;
            t.anisotropy = 8;
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
        });
    }, [emotional, physical, social, clouds, height]);

    // no rotation -> easier to zoom and explore (otherwise the earth rotates while focusing on the point)
    // useFrame((_, delta) => {
    //     grp.current.rotation.y += delta * 0.03;
    // });

    function handleEarthClick(event: ThreeEvent<MouseEvent>) {
        const localPoint = grp.current.worldToLocal(event.point);

        const len = Math.sqrt(localPoint.x * localPoint.x + localPoint.y * localPoint.y + localPoint.z * localPoint.z);
        const scale = 1.02 / len; // normalize to just above surface
        const pos: [number, number, number] = [localPoint.x * scale, localPoint.y * scale, localPoint.z * scale];
        // setBoxes(prev => [...prev, { position: pos }]);
        playSoundAtPositionAndShowSphere(pos);
    }
    
    const widthHeightSegments = 32;
    
    useEffect(() => {
        if (highlightCoords) {
            const point = coordsToVector(highlightCoords).multiplyScalar(SURFACE_OFFSET);
            playSoundAtPositionAndShowSphere(vectorToTuple(point));
        }
    }, [highlightCoords]);
    
    const playSoundAtPositionAndShowSphere = (position: [number, number, number]) => {
            setBoxes(() => [{ position }]);
            soundSourceSphereKey.current += 1;
            soundFiles[Math.floor(Math.random() * soundFiles.length)].play();
    }

    return (
        <group ref={grp}>
            {/* Globe */}
            <mesh onClick={handleEarthClick}>
                <sphereGeometry args={[1, widthHeightSegments, widthHeightSegments]} />
                <meshStandardMaterial map={emotional}
                    displacementMap={height}
                    displacementScale={-0.2}
                    displacementBias={0}
                />
            </mesh>
            <mesh onClick={handleEarthClick}>
                <sphereGeometry args={[1, widthHeightSegments, widthHeightSegments]} />
                <meshStandardMaterial map={physical}
                    displacementMap={height}
                    displacementScale={-0.2}
                    displacementBias={0.005}
                    opacity={0.3}
                    transparent
                    alphaTest={0.01}
                    depthWrite={false}
                />
            </mesh>
            <mesh onClick={handleEarthClick}>
                <sphereGeometry args={[1, widthHeightSegments, widthHeightSegments]} />
                <meshStandardMaterial map={social}
                    displacementMap={height}
                    displacementScale={-0.2}
                    displacementBias={0.01}
                    opacity={0.3}
                    transparent
                    alphaTest={0.01}
                    depthWrite={false}
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
                <sphereGeometry args={[1.03, 64, 64]} />
                <meshStandardMaterial
                    map={clouds}
                    transparent
                    opacity={0.3}
                    depthWrite={false}
                    depthTest={true}
                    alphaTest={0.01}
                />
            </mesh>

            {/* Atmosphere glow */}
            <mesh>
                <sphereGeometry args={[1.04, 64, 64]} />
                <meshBasicMaterial
                    color="#4db2ff"
                    transparent
                    opacity={0.1}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>
        </group>
    );
}

function CameraFocus({ highlightCoords, controlsRef }: { highlightCoords: [number, number] | null; controlsRef: React.RefObject<OrbitControlsImpl | null>; }) {
    const { camera } = useThree();
    const animationRef = useRef<number | null>(null);
    const previousCoords = useRef<[number, number] | null>(null);

    useEffect(() => {
        if (!highlightCoords) {
            previousCoords.current = null;
            return;
        }

        if (
            previousCoords.current &&
            previousCoords.current[0] === highlightCoords[0] &&
            previousCoords.current[1] === highlightCoords[1]
        ) {
            return;
        }

        const controls = controlsRef.current;
        if (!controls) {
            previousCoords.current = highlightCoords;
            return;
        }

    const direction = coordsToVector(highlightCoords);
    const cameraPoint = direction.clone().multiplyScalar(CAMERA_DISTANCE);
    const targetPoint = new THREE.Vector3(0, 0, 0);

        const startCameraPosition = camera.position.clone();
        const startTarget = controls.target.clone();
        const durationMs = 600;

        if (animationRef.current !== null) {
            cancelAnimationFrame(animationRef.current);
        }

        const startTime = performance.now();

        const animate = () => {
            const elapsed = performance.now() - startTime;
            const t = Math.min(elapsed / durationMs, 1);
            const ease = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

            camera.position.lerpVectors(startCameraPosition, cameraPoint, ease);
            controls.target.lerpVectors(startTarget, targetPoint, ease);
            controls.update();

            if (t < 1) {
                animationRef.current = requestAnimationFrame(animate);
            } else {
                animationRef.current = null;
            }
        };

        animationRef.current = requestAnimationFrame(animate);
        previousCoords.current = highlightCoords;

        return () => {
            if (animationRef.current !== null) {
                cancelAnimationFrame(animationRef.current);
                animationRef.current = null;
            }
        };
    }, [camera, controlsRef, highlightCoords]);

    return null;
}

export default function EarthScene({ highlightCoords }: { highlightCoords: [number, number] | null }) {
    const key = useRef(0);
    const controlsRef = useRef<OrbitControlsImpl | null>(null);

    useEffect(() => {
        key.current = Math.random(); // needed to force remount during hmr
    }, [])

    return (
        <Canvas style={{ width: "100vw", height: "90vh" }} camera={{ fov: 25, position: [4.5, 2, 3] }}>
            {/* <EquirectBackground src="/textures/planets/8k_stars_milky_way.jpg" /> */}
            {/* <color attach="background" args={["#000"]} /> */}
            <ambientLight intensity={2} />
            <directionalLight color="#fff" intensity={5} position={[0, 0, 3]} />
            <OrbitControls
                ref={controlsRef}
                enablePan={false}
                enableDamping
                dampingFactor={0.02}
                minDistance={CAMERA_DISTANCE - 0.4}
                maxDistance={8}
            />
            <CameraFocus highlightCoords={highlightCoords} controlsRef={controlsRef} />
            <Earth highlightCoords={highlightCoords} />
        </Canvas>
    );
}
