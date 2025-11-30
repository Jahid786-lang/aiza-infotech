import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";
import { random } from "maath";
import * as THREE from "three";
import { TypedArray } from "three";

const Stars = (props: any) => {
  const ref = useRef<THREE.Points>();
  const [sphere] = useState<TypedArray>(() =>
    random.inSphere(new Float32Array(5001), { radius: 1.2 })
  );

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className="absolute inset-0 z-[-1] h-auto w-full">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;

// import { useState, useRef, useMemo, useEffect, Suspense } from "react";
// import { Canvas, useFrame } from "@react-three/fiber";
// import { Points, PointMaterial, Preload, useTexture } from "@react-three/drei";
// import { random } from "maath";
// import * as THREE from "three";
// import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
// import {earth_normal, earthDiffuse} from "../../assets/index";
// /* ---------- Stars (unchanged) ---------- */
// const Stars = (props: any) => {
//   const ref = useRef<THREE.Points>();
//   const [sphere] = useState(() => random.inSphere(new Float32Array(5001), { radius: 1.2 }));

//   useFrame((_s, delta) => {
//     if (ref.current) {
//       ref.current.rotation.x -= delta / 10;
//       ref.current.rotation.y -= delta / 15;
//     }
//   });

//   return (
//     <group rotation={[0, 0, Math.PI / 4]}>
//       <Points ref={ref} positions={sphere as any} stride={3} frustumCulled {...props}>
//         <PointMaterial transparent color="#f272c8" size={0.002} sizeAttenuation depthWrite={false} />
//       </Points>
//     </group>
//   );
// };

// /* ---------- Planets (PBR with textures) ---------- */
// type PlanetSpec = {
//   name: string;
//   radius: number;
//   size: number;
//   colorMap?: string;
//   normalMap?: string;
//   roughnessMap?: string;
//   speed: number;
//   yOffset?: number;
//   ring?: { inner: number; outer: number };
// };

// const planetSpecs: PlanetSpec[] = [
//   // {
//   //   name: "Earth",
//   //   radius: 0.85,
//   //   size: 0.16,
//   //   colorMap: earthDiffuse,
//   //   normalMap: earth_normal,
//   //   roughnessMap: earth_normal,
//   //   speed: 0.24,
//   //   yOffset: 0.45,
//   // },
//   {
//     name: "Icy",
//     radius: 1.15,
//     size: 0.12,
//     colorMap: "/planet/textures/meteor_trail.png",
//     normalMap: "/planet/textures/meteor_trail.png",
//     roughnessMap: "/planet/textures/meteor_trail.png",
//     speed: 0.35,
//     yOffset: 0.35,
//   },
//   // {
//   //   name: "Ringed",
//   //   radius: 1.45,
//   //   size: 0.22,
//   //   colorMap: earthDiffuse,
//   //   normalMap: earthDiffuse,
//   //   roughnessMap: earthDiffuse,
//   //   speed: 0.15,
//   //   yOffset: 0.55,
//   //   ring: { inner: 0.24, outer: 0.34 },
//   // },
// ];

// const Planets = () => {
//   const groupRef = useRef<THREE.Group>(null);

//   useFrame(({ clock }) => {
//     if (groupRef.current) groupRef.current.rotation.y = clock.getElapsedTime() * 0.02;
//   });

//   return (
//     <group ref={groupRef}>
//       <ambientLight intensity={0.6} />
//       <pointLight position={[0, 0.6, 2]} intensity={1.2} />
//       {planetSpecs.map((p, i) => (
//         <Planet key={p.name} spec={p} index={i} />
//       ))}
//     </group>
//   );
// };

// const Planet = ({ spec, index }: { spec: PlanetSpec; index: number }) => {
//   const textures = useTexture(
//     [spec.colorMap ?? "", spec.normalMap ?? "", spec.roughnessMap ?? ""].filter(Boolean)
//   ) as THREE.Texture[];

//   const colorMap = textures[0] || null;
//   const normalMap = textures[1] || null;
//   const roughnessMap = textures[2] || null;

//   const meshRef = useRef<THREE.Mesh>(null);

//   useFrame(({ clock }) => {
//     const t = clock.getElapsedTime();
//     const phase = t * spec.speed + index * 0.7;
//     const x = Math.cos(phase) * spec.radius;
//     const z = Math.sin(phase) * spec.radius * 0.95;
//     const y = Math.abs(Math.sin(phase * 0.75)) * (spec.yOffset ?? 0.3) + 0.05;
//     if (meshRef.current) {
//       meshRef.current.position.set(x, y, z);
//       meshRef.current.rotation.y += 0.002 + index * 0.0008;
//     }
//   });

//   return (
//     <group>
//       <mesh ref={meshRef}>
//         <sphereGeometry args={[spec.size, 64, 64]} />
//         <meshStandardMaterial
//           map={colorMap ?? undefined}
//           normalMap={normalMap ?? undefined}
//           roughnessMap={roughnessMap ?? undefined}
//           roughness={roughnessMap ? undefined : 0.6}
//           metalness={0.0}
//           emissive={new THREE.Color(0x000000)}
//           envMapIntensity={0.6}
//         />
//       </mesh>

//       {spec.ring && (
//         <mesh rotation={[Math.PI / 2.4, 0, 0]} position={[0, 0, 0]}>
//           <torusGeometry args={[(spec.ring.inner + spec.ring.outer) / 2, (spec.ring.outer - spec.ring.inner) / 2, 2, 120]} />
//           <meshStandardMaterial transparent opacity={0.6} side={THREE.DoubleSide} roughness={1} metalness={0} />
//         </mesh>
//       )}
//     </group>
//   );
// };

// /* ---------- Meteorites — emissive core + scrolling trail plane ---------- */
// type Meteorite = {
//   id: number;
//   pos: THREE.Vector3;
//   vel: THREE.Vector3;
//   life: number;
//   size: number;
//   hue: number;
//   trailScale: number;
//   uvOffset: number;
// };

// const Meteorites = ({
//   maxMeteorites = 6,
//   slowFactor = 0.45,
// }: {
//   maxMeteorites?: number;
//   slowFactor?: number;
// }) => {
//   const [meteors, setMeteors] = useState<Meteorite[]>([]);
//   const nextId = useRef(1);
//   const spawnTimer = useRef<number | null>(null);

//   // NOTE: trail texture loading is handled by TrailAnimator and by the material in Meteorites
//   // We use the same path here to keep the code consistent; but we DO NOT call hooks outside Canvas.

//   // spawn helper
//   const spawnMeteor = () => {
//     setMeteors((prev) => {
//       if (prev?.length >= maxMeteorites) return prev;
//       const id = nextId.current++;
//       const angle = Math.random() * Math.PI * 2;
//       const dist = 2.6 + Math.random() * 1.8;
//       const x = Math.cos(angle) * dist;
//       const y = -1.0 + Math.random() * 2.2;
//       const z = Math.sin(angle) * dist;

//       const dir = new THREE.Vector3(-x + (Math.random() - 0.5) * 0.6, -y + (Math.random() - 0.5) * 0.6, -z + (Math.random() - 0.5) * 0.6).normalize();
//       const speed = (0.6 + Math.random() * 1.2) * slowFactor;

//       const meteor: Meteorite = {
//         id,
//         pos: new THREE.Vector3(x, y, z),
//         vel: dir.multiplyScalar(speed),
//         life: 4 + Math.random() * 3,
//         size: 0.03 + Math.random() * 0.06,
//         hue: Math.random() * 40 + 20,
//         trailScale: 0.35 + Math.random() * 1.1,
//         uvOffset: Math.random() * 10,
//       };
//       return [...prev, meteor];
//     });
//   };

//   // spawn loop
//   useEffect(() => {
//     let mounted = true;
//     const schedule = () => {
//       if (!mounted) return;
//       const next = 1500 + Math.random() * 3000;
//       spawnTimer.current = window.setTimeout(() => {
//         const burst = Math.random() < 0.2 ? 1 + Math.floor(Math.random() * 2) : 1;
//         for (let i = 0; i < burst; i++) spawnMeteor();
//         schedule();
//       }, next);
//     };
//     schedule();
//     return () => {
//       mounted = false;
//       if (spawnTimer.current) window.clearTimeout(spawnTimer.current);
//     };
//   }, [maxMeteorites, slowFactor]);

//   // update each frame
//   useFrame((_s, delta) => {
//     setMeteors((prev) => {
//       const next = prev
//         .map((m) => {
//           const pos = m.pos.clone().addScaledVector(m.vel, delta);
//           const vel = m.vel.clone().multiplyScalar(0.999);
//           const life = m.life - delta;
//           const uvOffset = m.uvOffset + delta * 2.0;
//           return { ...m, pos, vel, life, uvOffset };
//         })
//         .filter((m) => m.life > 0);
//       if (next?.length > 40) next.splice(0, next?.length - 40);
//       return next;
//     });
//   });

//   // For the trail plane material we can call useTexture inside the render (allowed),
//   // but doing it once per frame for many meteors is inefficient. Instead we will load inside TrailAnimator
//   // and rely on its global animation. Here we only set up the meshes and let the material use the same texture path.

//   return (
//     <group>
//       {meteors.map((m) => (
//         <group key={m.id} position={m.pos.toArray()}>
//           {/* Core */}
//           <mesh>
//             <sphereGeometry args={[m.size, 16, 12]} />
//             <meshStandardMaterial
//               color={new THREE.Color(`hsl(${m.hue} 100% 55%)`)}
//               emissive={new THREE.Color(`hsl(${m.hue} 100% 40%)`)}
//               emissiveIntensity={1.6}
//               roughness={0.25}
//               metalness={0.1}
//               transparent
//               opacity={Math.max(0.35, Math.min(1, m.life / 5))}
//             />
//           </mesh>

//           {/* Trail plane - material will reference the texture loaded by TrailAnimator */}
//           <mesh
//             ref={(node: THREE.Mesh | null) => {
//               if (!node) return;
//               const trailDir = m.vel.clone().normalize().multiplyScalar(-1);
//               const quat = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 0, 1), trailDir);
//               node.quaternion.copy(quat);
//             }}
//             position={[0, 0, 0]}
//           >
//             <planeGeometry args={[m.trailScale * 1.2, m.trailScale * 0.18, 1, 1]} />
//             {/* We create a MeshBasicMaterial with the texture path; TrailAnimator will mutate the same texture cache */}
//             <meshBasicMaterial
//               // eslint-disable-next-line @typescript-eslint/ban-ts-comment
//               // @ts-ignore
//               map={undefined}
//               transparent
//               depthWrite={false}
//               blending={THREE.AdditiveBlending}
//               opacity={Math.max(0.1, Math.min(0.95, m.life / 4))}
//               color={new THREE.Color(`hsl(${m.hue} 100% 60%)`)}
//             />
//           </mesh>

//           {/* small soft glow behind */}
//           <mesh>
//             <planeGeometry args={[m.size * 2.2, m.size * 2.2]} />
//             <meshBasicMaterial
//               transparent
//               depthWrite={false}
//               blending={THREE.AdditiveBlending}
//               color={new THREE.Color(`hsl(${m.hue} 100% 60%)`)}
//               opacity={Math.max(0.04, Math.min(0.6, m.life / 3))}
//             />
//           </mesh>
//         </group>
//       ))}
//     </group>
//   );
// };

// /* ---------- TrailAnimator (loads the trail texture inside Canvas and animates it) ---------- */
// const TrailAnimator = ({ path = "/planet/textures/meteor_trail.png" }: { path?: string }) => {
//   // load texture here — this hook runs inside Canvas (ok)
//   const [trailTexture] = useTexture([path]) as [THREE.Texture];

//   useEffect(() => {
//     if (!trailTexture) return;
//     trailTexture.wrapS = trailTexture.wrapT = THREE.RepeatWrapping;
//     trailTexture.repeat.set(1, 1);
//   }, [trailTexture]);

//   useFrame((_s, delta) => {
//     if (!trailTexture) return;
//     trailTexture.offset.y -= delta * 2.0; // scroll
//   });

//   return null;
// };

// /* ---------- Canvas with Postprocessing (no hooks outside Canvas) ---------- */
// const StarsCanvas = () => {
//   return (
//     <div className="absolute inset-0 z-[-1] h-auto w-full">
//       <Canvas camera={{ position: [0, 0, 2], fov: 50 }}>
//         <Suspense fallback={null}>
//           <Stars />
//           <Planets />
//           <Meteorites maxMeteorites={6} slowFactor={0.45} />
//           <TrailAnimator path="/planet/textures/meteor_trail.png" />

//           <EffectComposer>
//             <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} intensity={0.9} />
//             <DepthOfField focusDistance={0.02} focalLength={0.02} bokehScale={3} />
//           </EffectComposer>
//         </Suspense>
//         <Preload all />
//       </Canvas>
//     </div>
//   );
// };

// export default StarsCanvas;
