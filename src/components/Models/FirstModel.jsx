'use client'
import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { degToRad } from 'three/src/math/MathUtils';
import { useThree } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import {
  EffectComposer,
  ChromaticAberration,
} from "@react-three/postprocessing";
import { Vector2 } from "three";


gsap.registerPlugin(ScrollTrigger);

// Configure Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');

function Model({ url, textures = {}, initialOpacity = 1, rotation, opacity, position, scale = 1 }) {
  const group = useRef();
  const gltf = useGLTF(url, true, true, (loader) => {
    loader.setDRACOLoader(dracoLoader);
  });

  const textureUrls = Object.values(textures);
  const loadedTextureArray = useTexture(textureUrls.length > 0 ? textureUrls : []);
  
  const loadedTextures = {};
  const textureKeys = Object.keys(textures);
  textureKeys.forEach((key, index) => {
    loadedTextures[key] = Array.isArray(loadedTextureArray) ? loadedTextureArray[index] : loadedTextureArray;
  });

  useEffect(() => {
    if (group.current) {
      group.current.traverse((child) => {
        if (child.isMesh) {
          child.material = child.material.clone();
          child.material.transparent = true;
          child.material.opacity = initialOpacity;
          child.material.depthTest = true;
          child.material.side = THREE.DoubleSide;
          child.material.needsUpdate = true;
          child.renderOrder = 1; // ensure consistent render order

          // Assign texture if available
          if (loadedTextures[child.name]) {
            const tex = loadedTextures[child.name].clone();
            tex.wrapS = THREE.ClampToEdgeWrapping;
            tex.wrapT = THREE.ClampToEdgeWrapping;
            tex.colorSpace = THREE.SRGBColorSpace;
            tex.needsUpdate = true;
            child.material.map = tex;
          }
        }
      });
    }
  }, [initialOpacity, loadedTextures, gltf]);

  useFrame(() => {
    if (group.current) {
      group.current.rotation.set(rotation.current.x, rotation.current.y, rotation.current.z);
      group.current.position.set(position.current.x, position.current.y, position.current.z);
      group.current.scale.set(scale, scale, scale);

      group.current.traverse((child) => {
        if (child.isMesh) {
          const mat = child.material;
          const targetOpacity = opacity.current;
          if (mat.opacity !== targetOpacity) {
            mat.opacity = targetOpacity;
            // dynamically control depthWrite based on opacity
            mat.depthWrite = targetOpacity >= 0.99;
            mat.needsUpdate = true;
          }
        }
      });
    }
  });

  return <primitive ref={group} object={gltf.scene} />;
}



function Scene() {
  const rotation1 = useRef({ x: degToRad(0), y: degToRad(-30), z: degToRad(0) });
  const position1 = useRef({ x: 10, y: -6, z: -43 });

  const rotation2 = useRef({ x: 0, y: degToRad(30), z: 0 });
  const position2 = useRef({ x: 0, y: 0, z: 0 });
  const opacity1 = useRef(1);
  const opacity2 = useRef(0);
  const { camera } = useThree();

  useEffect(() => {
    // Initial camera position
    camera.position.set(0, 5, -20);

    // Initial rotation (Euler angles in radians) - increased x rotation to look down more
    camera.rotation.set(degToRad(-43), degToRad(0), degToRad(0));

    camera.updateProjectionMatrix();

    // Or you can make the camera look at a point
    // camera.lookAt(0, -30, 0);
  });

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '.scroll-container',
        start: 'top top',
        end: 'bottom top',
        
        scrub: true,
        // markers: true,
      }
    });

    

    tl
    .to(position1.current, {
      z: `-=${5}`,
      x: `-=${20}`,
      // y: `+=${4}`,
      ease: 'none',
    })
    .to(rotation1.current, {
       y: `-=${degToRad(10)}`,
        // x: `-=${degToRad(5)}`,
      ease: 'none'
    },'<')

    .to(position1.current, {
            z: `-=${25}`,
            x: `-=${25}`,
            ease: 'none',
    })
    .to(position1.current, {
            z: `-=${25}`,
            x: `-=${25}`,
            ease: 'none',
    })

    .to(rotation1.current, {
         y: `+=${degToRad(10)}`,
         ease:'none',
    })
    .to(position1.current, {
            z: `+=${25}`,
            y: `+=${2}`,
            x: `-=${5}`,
            ease: 'none',
    }, '<')

   

    tl.to(opacity1, {
      current: 0,
      duration: 0.2,
      ease: 'none'
    })

    .to(camera.position, {
      z: 20,
      duration:0.05,
      ease: 'none',
      onUpdate: () => camera.updateProjectionMatrix()
    })
    .to(camera.rotation, {
      x: degToRad(-15),
      duration:0.05,
    
      ease: 'none',
      onUpdate: () => camera.updateProjectionMatrix()
    }, '<')

    // Second model: position animation
    tl.to(position2.current, {
      x: -10,
      y: 3,
      z: 15,
      ease: 'none'
    });

    // Second model: fade in (starts after first model fades out)
    tl.to(opacity2, {
      current: 1,
      duration:0.2,
      ease: 'none'
    });

    // Second model: rotate while visible
    tl.to(position2.current, {
       z: `+=${10}`,
            y: `-=${2}`,
            x: `+=${5}`,
    })
    .to(rotation2.current, {
       y: `+=${degToRad(10)}`,
      ease: 'none'
    })
    .to(rotation2.current, {
       y: `+=${degToRad(10)}`,
      ease: 'none'
    })
    


    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  

  return (
    <>
      <ambientLight intensity={5.5} />
      <directionalLight position={[10, 10, 5]} intensity={5.0} />
      <directionalLight position={[-10, -10, -5]} intensity={5.5} />
      
      <Suspense fallback={null}>
        {/* Replace these URLs with your actual model paths */}
        <Model
          url="/models/intro.glb"
          initialOpacity={1}
          rotation={rotation1}
          opacity={opacity1}
          position={position1}
          textures={{
            FLOOR_01: "/assets/texture/floor1.jpg",
            FLOOR_02: "/assets/texture/floor2.jpg",
            // GROUP_01: "/assets/texture/group01.jpg",
            // GROUP_02: "/assets/texture/group02.jpg",
            // GROUP_03: "/assets/texture/group03.jpg",
          }}
        />
        <Model 
          url="/models/blocks.glb" 
          textures={{
            Comp: "/assets/texture/blocks-texture.jpg"
          }}
          initialOpacity={0}
          rotation={rotation2}
          opacity={opacity2}
          position={position2}
          scale={3}
        />
         {/* <Environment preset="sunset" />  */}
      </Suspense>

      <EffectComposer>
        <ChromaticAberration
          offset={new Vector2(0.001, 0.001)}
          blendFunction={2}
        />
      </EffectComposer>
      
   
    </>
  );
}

export default function App() {
  return (
    <div style={{ width: '100%' }}>
      <div 
        className="scroll-container" 
        style={{ 
          height: '700vh',
          position: 'relative'
        }}
      >
        <div style={{ 
          position: 'sticky', 
          top: 0, 
          height: '100vh',
          width: '100%',
          zIndex: 1
        }}>
          <Canvas shadows camera={{ position: [0, 0, -15], fov: 50 }}>
            <Scene />
          </Canvas>
          
          <div style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            color: 'white',
            fontSize: '18px',
            textAlign: 'center',
            pointerEvents: 'none',
            zIndex: 10
          }}>
           
          </div>
        </div>
      </div>
      
   
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #1a1a1a, #000)',
        padding: '4rem 2rem',
        color: 'white'
      }}>
       
      </div>
    </div>
  );
}