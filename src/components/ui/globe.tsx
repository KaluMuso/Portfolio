"use client";

import { useEffect, useRef, useState } from "react";
import { Color, Scene, Fog, PerspectiveCamera, Vector3 } from "three";
import ThreeGlobe from "three-globe";
import { useThree, Canvas, extend, ReactThreeFiber } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import countries from "./globe.json";

extend({ ThreeGlobe });

declare module "@react-three/fiber" {
  interface ThreeElements {
    threeGlobe: any;
  }
}

export const globeConfig = {
  pointSize: 4,
  globeColor: "#062056",
  showAtmosphere: true,
  atmosphereColor: "#FFFFFF",
  atmosphereAltitude: 0.1,
  emissive: "#062056",
  emissiveIntensity: 0.1,
  shininess: 0.9,
  polygonColor: "rgba(255,255,255,0.7)",
  ambientLight: "#38bdf8",
  directionalLeftLight: "#ffffff",
  directionalTopLight: "#ffffff",
  pointLight: "#ffffff",
  arcTime: 1000,
  arcLength: 0.9,
  rings: 1,
  maxRings: 3,
  initialPosition: { lat: 22.3193, lng: 114.1694 },
  autoRotate: true,
  autoRotateSpeed: 0.5,
};

export function Globe({ className }: { className?: string }) {
  const [globeData, setGlobeData] = useState<any>(null);

  useEffect(() => {
    // Import or generate basic globe data to avoid complex json
    setGlobeData(countries);
  }, []);

  return (
    <div className={(className || "") + " absolute inset-0 max-w-full h-full"}>
      <Canvas camera={{ position: [0, 0, 250], fov: 45 }}>
        <ambientLight color={globeConfig.ambientLight} intensity={0.6} />
        <directionalLight
          color={globeConfig.directionalLeftLight}
          position={[-400, 100, 400]}
        />
        <directionalLight
          color={globeConfig.directionalTopLight}
          position={[-200, 500, 200]}
        />
        <pointLight
          color={globeConfig.pointLight}
          position={[-200, 500, 200]}
          intensity={0.8}
        />
        <GlobeComponent data={globeData} />
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          minDistance={100}
          maxDistance={500}
          autoRotate={true}
          autoRotateSpeed={1}
          minPolarAngle={Math.PI / 3.5}
          maxPolarAngle={Math.PI - Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}

function GlobeComponent({ data }: { data: any }) {
  const globeRef = useRef<ThreeGlobe | null>(null);

  useEffect(() => {
    if (globeRef.current && data) {
      globeRef.current
        .hexPolygonsData(data.features)
        .hexPolygonResolution(3)
        .hexPolygonMargin(0.7)
        .showAtmosphere(globeConfig.showAtmosphere)
        .atmosphereColor(globeConfig.atmosphereColor)
        .atmosphereAltitude(globeConfig.atmosphereAltitude)
        .hexPolygonColor((e: any) => "rgba(255,255,255, 0.7)");
    }
  }, [data]);

  return <threeGlobe ref={globeRef} />;
}
