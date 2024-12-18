import { Suspense, useState, useEffect, useRef} from 'react'
import { Canvas } from '@react-three/fiber'
import Loader from '../components/Loader'
import Island from '../models/island'
import Sky from '../models/Sky'
import Bird from '../models/Bird'
import Plane from '../models/Plane'
import Homeinfo from '../components/Homeinfo'
import sakura from '../assets/sakura.mp3'
import { soundoff, soundon } from "../assets/icons";



const Home = () => {

  const audioRef = useRef(new Audio(sakura))
  audioRef.current.volume=0.9
  audioRef.current.loop= true

  const [isRotating, setisRotating] = useState(false)
  const [CurrentStage, setCurrentStage] = useState(1)

  const [isPlayingMusic , setisPlayingMusic]=useState(false)



  useEffect(() =>{
    if(isPlayingMusic){
      audioRef.current.play()
    }
    return() => {
      audioRef.current.pause()
    }
  },[isPlayingMusic])


  const adjustIslandForScreenSIze = () => {
    let screenScale = null;
    let screenPosition = [0, -6.5, -43];
    let rotaion = [0.1, 4.7, 0];


    if (window.innerWidth < 768) {
      screenScale = [0.5, 0.5, 0.5]
    }
    else {
      screenScale = [1, 1, 1];
    }

    return [screenScale, screenPosition, rotaion]
  }


  const adjustPlaneForScreenSIze = () => {
    let screenScale, screenPosition;


    if (window.innerWidth < 768) {
      screenScale = [1, 1, 1]
      screenPosition = [0, -1.5, 0]
    }
    else {
      screenScale = [3, 3, 3];
      screenPosition = [0, -4, -4]
    }

    return [screenScale, screenPosition]
  }


  const [islandScale, islandPosition, islandRotation] = adjustIslandForScreenSIze();
  const [planeScale, planePosition] = adjustPlaneForScreenSIze();

  return (
    <section className='w-full h-screen relative'>

      {<div className=' absolute top-28 left-0 right-0 z-10 flex items-center justify-center'>
      {CurrentStage && <Homeinfo currentStage={CurrentStage}/>}
      </div>}
      <Canvas
        className={`w-full h-screen bg-transparent  ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        camera={{ near: 0.1, far: 1000 }}>
        <Suspense fallback={<Loader />}>
          <directionalLight
            position={[1, 1, 1]}
            intensity={1}

          />
          <ambientLight
            intensity={0.5}
          />
          <pointLight />
          <spotLight />
          <hemisphereLight
            skyColor='#b1e1ff' groundColor='#000000' intensity={1}
          />

          <Bird />
          <Sky isRotating={isRotating} />


          <Island
            isRotating={isRotating}
            setisRotating={setisRotating}
            setCurrentStage={setCurrentStage}
            position={islandPosition}
            rotation={[0.1, 4.7077, 0]}
            scale={islandScale}
          />

          <Plane
            isRotating={isRotating}
            position={planePosition}
            rotation={[0, 20.1, 0]}

            scale={planeScale}


          />


        </Suspense>
      </Canvas>

      <div className='absolute bottom-2 left-2'>
        <img
          src={!isPlayingMusic ? soundoff : soundon}
          alt='jukebox'
          onClick={() => setisPlayingMusic(!isPlayingMusic)}
          className=' mb-14  w-10 h-10 cursor-pointer object-contain'
        />
      </div>
    </section>
  )
}
export default Home