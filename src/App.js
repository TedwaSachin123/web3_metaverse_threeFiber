 import { useRef, useState, Suspense } from 'react'
 import { Canvas, useFrame } from '@react-three/fiber'
 import {Html, OrbitControls, Stars, useBounds, Bounds, useGLTF} from "@react-three/drei";
 import Building from "./Building";
 //import VendingMachine from './dapp code';
 import VendingMach from './VendingMach'
 import 'bulma/css/bulma.css';
import { ethers } from 'ethers';
//import VendingMachinecontact from './contracts/vending.js';
import Screen from './screen';


 function SelectToZoom({ children }) {
   const api = useBounds()
   return (
     <group onClick={(e) => (e.stopPropagation(), e.delta <= 2 && api.refresh(e.object).fit())}>
       {children}
     </group>
   )
 }
 

//   function Model() {
//     const { nodes } = useGLTF('/mac-draco.glb')
//     return ( 
//             <mesh scale position={[0, 2.96, -0.13]} rotation={[Math.PI / 2, 0, 0]} geometry={nodes['Cube008_2'].geometry}>
//               {/* Drei's HTML component can now "hide behind" canvas geometry */}
            
//               <Html scale={0.5} rotation={[Math.PI / 2, 0, 0]} position={[0, 2.96, -0.13]} transform occlude>
//                 <div className="annotation">
//               6.550 $ <span style={{ fontSize: '1.5em' }}>🥲</span>
//                 </div>
//               </Html>
//             </mesh>
//            )
//   }


  const App=()=> {
  const Box = ()=> {
    // //const [error,seterror] = useState("");
    
    // const [web3,setweb3] = useState(null);
    // const [address,setAddress] = useState(null);
    // const [vmcontract, setvmcontract] = useState(null);
    // const [inventory,getinventory] = useState("");
    // //const [load, setLoadingScreen] = useState("")
    //const [vendingMachBal, setvendingbal] = useState("")
   
    const connectWalletHandler = async() =>{
      //check metamask is available 
      if(typeof window !== "undefined" && typeof window.ethereum !=="undefined" ){
         
         await window.ethereum.request({method:"eth_requestAccounts"}) //request wallet connect
         }
         
       else{
          //metamask not install
          alert('please install metamask')
      }
     
  }
    const checkbal = async()=>{
         const contractAddress = "0x3Be769353B5B7052380C2C71229B6C2467a40608";
         const abi = [ { "inputs": [], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [ { "internalType": "address", "name": "", "type": "address" } ], "name": "donutbalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "getvendingmachinebalance", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amt", "type": "uint256" } ], "name": "restock", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "amt", "type": "uint256" } ], "name": "purchase", "outputs": [], "stateMutability": "payable", "type": "function" } ];
         const provider=new ethers.providers.Web3Provider(window.ethereum);
         const newSigner=provider.getSigner();
         const contract = new ethers.Contract(contractAddress, abi, newSigner);
         await contract.getvendingmachinebalance();
    }
  
     return(
       <mesh position={[2.255,.29,-1.73]} >
        
         <planeBufferGeometry attach="geometry" args={[0.47, 0.15, 1]} />
         <meshStandardMaterial attach="material" color='hotpink' />
         <Html scale={0.2}  position={[0,0,0.005]}  transform occlude>
                 {/* <div className="annotation">
                 <button onClick={connectWalletHandler} className='button is-primary'>Connect Wallet </button>
                 </div> */}
                 <div className='navbar-end'>
                  <button onClick={connectWalletHandler} className='button is-primary'>Connect Wallet </button>
                  
                  </div>
         </Html> 
         <Html ><div className='container'>
         <button onClick={checkbal} className='button is-primary'>check bal </button>
            </div></Html> 
        
       </mesh>
     )
   }
   return (
     <Canvas makeDefault camera={{ position: [47, 47, 50], fov: 50 }} dpr={[1, 2]}>
      
       <Stars/>
       <spotLight position={[10, 10, 15]} angle={0.15} penumbra={1} color={0xEEDD82} />
       <pointLight position={[.3,0,2.025]} intensity={0.2} />
       <OrbitControls makeDefault maxDistance={10} minPolarAngle={.5} maxPolarAngle={Math.PI / 2.2}/>
       <Building />
       <Suspense fallback={null}>
       <Bounds clip observe margin={1.2}>
           <SelectToZoom>
        
         <VendingMach  scale={0.4} position={[2.3,0,-2.02]} />
         </SelectToZoom>
         </Bounds>
         <Box />
         
         {/* <Model/> */}
        
       </Suspense>
      
     </Canvas>
    
   )
 }
export default App;