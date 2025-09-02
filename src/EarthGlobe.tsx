import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import React, { useEffect, useRef } from "react";

// texture source: https://www.solarsystemscope.com/textures/

function EquirectBackground({ src }: { src: string }) {
    const tex = useLoader(THREE.TextureLoader, src);
    const { scene } = useThree();

    useEffect(() => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.mapping = THREE.EquirectangularReflectionMapping;
        const prev = scene.background;
        scene.background = tex;
        return () => { scene.background = prev; };
    }, [scene, tex]);

    return null;
}


function Earth() {
    const earthRef = useRef<THREE.Mesh>(null!);
    const grp = useRef<THREE.Group>(null!);
    const cloudsRef = useRef<THREE.Mesh>(null!);
    // const day = useLoader(THREE.TextureLoader, "/textures/planets/8k_earth_daymap.jpg");
    const day = useLoader(THREE.TextureLoader, "/textures/planets/8k_earth_daymap_greyscale.jpg");
    // const night = useLoader(THREE.TextureLoader, "/textures/planets/earth_night_4096.jpg");
    const clouds = useLoader(THREE.TextureLoader, "/textures/planets/8k_earth_clouds.jpg");
    const height = useLoader(THREE.TextureLoader, "/textures/planets/8k_height.jpg");

    useEffect(() => {
        [day, clouds].forEach(t => {
            t.colorSpace = THREE.SRGBColorSpace;
            t.anisotropy = 8;
        });

        [height].forEach(t => {
            t.colorSpace = THREE.LinearSRGBColorSpace;
            t.anisotropy = 8;
            t.wrapS = t.wrapT = THREE.RepeatWrapping;
        });
    }, [day, clouds, height]);


    useFrame((_, delta) => {
        // earthRef.current.rotation.y += delta * 0.025;
        // cloudsRef.current.rotation.y += delta * 0.05;
        grp.current.rotation.y += delta * 0.03;
    });

    return (
        <group ref={grp}>
            {/* Globe */}
            <mesh ref={earthRef}>
                <sphereGeometry args={[1, 512, 512]} />
                <meshStandardMaterial map={day}
                    displacementMap={height}
                    displacementScale={-0.2}
                    displacementBias={0}
                />
            </mesh>

            {/* Night lights overlay (additive blend) */}
            {/* <mesh>
        <sphereGeometry args={[1.001, 64, 64]} />
        <meshBasicMaterial map={night} blending={THREE.AdditiveBlending} transparent />
      </mesh> */}

            {/* Clouds */}
            <mesh ref={cloudsRef}>
                <sphereGeometry args={[1.01, 64, 64]} />
                <meshStandardMaterial
                    map={clouds}
                    transparent
                    opacity={0.1}
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
            <EquirectBackground src="/textures/planets/8k_stars_milky_way.jpg" />
            {/* <color attach="background" args={["#000"]} /> */}
            <ambientLight intensity={2} />
            <directionalLight color="#fff" intensity={5} position={[0, 0, 3]} />
            <OrbitControls enablePan={false} enableDamping dampingFactor={0.02} minDistance={2} maxDistance={8} />
            <Earth />
        </Canvas>
    );
}
