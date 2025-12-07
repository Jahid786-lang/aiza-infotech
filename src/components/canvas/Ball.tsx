// import React, { Suspense } from "react";
// import { Canvas } from "@react-three/fiber";
// import {
//   Decal,
//   Float,
//   OrbitControls,
//   Preload,
//   useTexture,
// } from "@react-three/drei";

// import CanvasLoader from "../layout/Loader";

// const Ball = (props: any) => {
//   const [decal] = useTexture([props.imgUrl]);

//   return (
//     <Float speed={1.75} rotationIntensity={1} floatIntensity={2}>
//       <ambientLight intensity={0.25} />
//       <directionalLight position={[0, 0, 0.05]} />
//       <mesh castShadow receiveShadow scale={2.75}>
//         <icosahedronGeometry args={[1, 1]} />
//         <meshStandardMaterial
//           color="#fff8eb"
//           polygonOffset
//           polygonOffsetFactor={-5}
//           flatShading
//         />
//         <Decal
//           position={[0, 0, 1]}
//           rotation={[2 * Math.PI, 0, 6.25]}
//           scale={1}
//           map={decal}
//           // @ts-expect-error
//           flatShading
//         />
//       </mesh>
//     </Float>
//   );
// };

// const BallCanvas: React.FC<{ icon: string }> = ({ icon }) => {
//   return (
//     <Canvas
//       frameloop="demand"
//       dpr={[1, 2]}
//       gl={{ preserveDrawingBuffer: true }}
//     >
//       <Suspense fallback={<CanvasLoader />}>
//         <OrbitControls enableZoom={false} />
//         <Ball imgUrl={icon} />
//       </Suspense>

//       <Preload all />
//     </Canvas>
//   );
// };

// export default BallCanvas;

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Decal,
  Float,
  Preload,
  useTexture,
  PresentationControls,   // ⬅️ new import
} from "@react-three/drei";

import CanvasLoader from "../layout/Loader";

const Ball = (props: { imgUrl: string }) => {
  const [decal] = useTexture([props.imgUrl]);

  return (
    <Float speed={1.75} rotationIntensity={0} floatIntensity={2}>
      <ambientLight intensity={0.25} />
      <directionalLight position={[0, 0, 0.05]} />
      <mesh castShadow receiveShadow scale={2.75}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color="#fff8eb"
          polygonOffset
          polygonOffsetFactor={-5}
          flatShading
        />
        <Decal
          position={[0, 0, 1]}
          rotation={[0, 0, 0]} // cleaner rotation
          scale={1}
          map={decal}
          // @ts-expect-error
          flatShading
        />
      </mesh>
    </Float>
  );
};

const BallCanvas: React.FC<{ icon: string }> = ({ icon }) => {
  return (
    <Canvas
      frameloop="always"             // keep updating while user is dragging
      dpr={[1, 2]}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        {/* Drag with mouse / touch to rotate the BALL in 3D */}
        <PresentationControls
          cursor
          snap
          speed={1.2}
          zoom={1}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}    // limit vertical rotation
          azimuth={[-Math.PI / 2, Math.PI / 2]}  // limit horizontal rotation
        >
          <Ball imgUrl={icon} />
        </PresentationControls>
      </Suspense>

      <Preload all />
    </Canvas>
  );
};

export default BallCanvas;
