import {  Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  Environment,
  Sparkles,
  PositionalAudio,
  Loader,
  OrbitControls,
} from "@react-three/drei";
import Building from "./Components/Building";
import VendingMach from "./Components/VendingMach";
import "bulma/css/bulma.css";
import Displayscreen from "./Components/screen1";

const App = ({ scale = Array.from({ length: 50 }, () => 0.5 + Math.random() * 4) }) => {
 
    
  return (
    <>
    <Canvas
      makeDefault
      camera={{ position: [47, 57, 80], fov: 60 }}
      dpr={[1, 2]}
    >
      
      <fog attach="fog" args={['lightpink', 60, 100]} />
      
      <directionalLight position={[10, 0, 5]} intensity={1} color="red" />
      <directionalLight position={[-1, -2, -5]} intensity={1} color="red" />
      <directionalLight position={[1, -2, -5]} intensity={0.2} color="#0c8cbf" />
      <spotLight position={[5, 0, 5]} intensity={2.5} penumbra={1} angle={0.35} castShadow color="#0c8cbf" />
      {/* <spotLight position={[5, 0, 5]} intensity={2.5} penumbra={1} angle={0.35} castShadow color="#0c8cbf" /> */}
      <Sparkles count={scale.length} size={scale} position={[0, 2, 2.5]} scale={[4, 3, 4]} speed={0.3} />
      <pointLight position={[0.3, 0, 2.025]} intensity={0.2} />
      <Environment preset="city" />
      <OrbitControls
        makeDefault
        maxDistance={10}
        minPolarAngle={0.5}
        maxPolarAngle={Math.PI / 2.2}
      />
      
      <Building position-y={-2}/>
      
      <Suspense fallback={null}>
        
      
      <Displayscreen position={[2.5, -1.15, -1.72]}  scale={0.05}/>
      <VendingMach scale={0.4} position={[2.3, -2, -2.02]} />
      <PositionalAudio autoplay loop url="/64kbps.mp3" distance={1}/>
        
        {/* <Model/> */}
      </Suspense>
     
    </Canvas>
    <Loader />
    </>
  );
};
export default App;
