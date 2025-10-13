'use client';
import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, useGLTF, useTexture, Environment } from '@react-three/drei';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import * as THREE from 'three';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';
import { degToRad } from 'three/src/math/MathUtils';
import { EffectComposer, ChromaticAberration } from '@react-three/postprocessing';
import { Vector2 } from 'three';

gsap.registerPlugin(ScrollTrigger);


function Model({ modelRef, initialPosition, initialRotation, initialScale }) {
  const gltf = useGLTF('/models/intro.glb', true, undefined, loader => {
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('/draco/');
    loader.setDRACOLoader(dracoLoader);
  });

  const texture = useTexture('/assets/texture/intro-texture.jpg');

  useEffect(() => {
    if (gltf.scene && texture) {
      gltf.scene.traverse(child => {
        if (child.isMesh) {
          child.material.map = texture;
          child.material.needsUpdate = true;
        }
      });
      
      // Set initial transformations
      if (initialPosition) {
        gltf.scene.position.set(...initialPosition);
      }
      if (initialRotation) {
        gltf.scene.rotation.set(...initialRotation);
      }
      if (initialScale) {
        gltf.scene.scale.set(...initialScale);
      }
      
      // Set the ref once the scene is loaded
      if (modelRef) {
        modelRef.current = gltf.scene;
      }
    }
  }, [gltf, texture, modelRef, initialPosition, initialRotation, initialScale]);

  useFrame(() => {
  if (gltf.scene) {
    const wind = gltf.scene.getObjectByName('Wind');
    if (wind) {
      ['Blade_1', 'Blade_2', 'Blade_3', 'Blade_4'].forEach(name => {
        const blade = wind.getObjectByName(name);
        if (blade) {
          blade.rotation.x += 0.05; // Adjust rotation speed here
        }
      });
    }
  }
});


  return <primitive object={gltf.scene} />;
}

function CameraController({ cameraRef }) {
  const { camera } = useThree();
  
  useEffect(() => {
    cameraRef.current = camera;
  }, [camera, cameraRef]);
  
  return null;
}

function ParallaxGroup({ children, modelRef }) {
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      mouse.current = { x, y };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.position.x = THREE.MathUtils.lerp(
      groupRef.current.position.x,
      -mouse.current.x * 0.5,
      0.1
    );
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      mouse.current.y * 0.5,
      0.1
    );
  });

  return <group ref={groupRef}>{children}</group>;
}

export default function ThreeScene() {
  const cameraRef = useRef();
  const modelRef = useRef();
  const containerRef = useRef();
  const [modelLoaded, setModelLoaded] = useState(false);

  // Define initial transformations
  const initialPosition = [5, 5, -22]; 
  const initialRotation = [degToRad(35), degToRad(-40), degToRad(-3)]; 
  const initialScale = [1, 1, 1];

  // Separate effect to detect when model is loaded
  useEffect(() => {
    const checkModel = setInterval(() => {
      if (modelRef.current) {
        setModelLoaded(true);
        clearInterval(checkModel);
      }
    }, 100);

    return () => clearInterval(checkModel);
  }, []);

  // GSAP ScrollTrigger effect
  useEffect(() => {
    if (!modelLoaded || !modelRef.current || !containerRef.current || !cameraRef.current) return;

    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top top',
            end: 'bottom top',
            // pin: true,
            scrub: true,
            // markers: true,
          },
        });
        
        const camera = cameraRef.current;

        tl.to(modelRef.current.position, {
          x: 0,
          
        }, 0)
        .to(modelRef.current.rotation, {
            y: `-=${degToRad(15)}`,
        })
        
        .to(modelRef.current.position, {
          y: `+=${13}`,
           z: `-=${8}`,
           x:`-=${8}`
        })
        .to(modelRef.current.position, {
            y: `+=${15}`,
           z: `-=${20}`,
           x:`-=${15}`
        })
        
        // .to(modelRef.current.rotation, {
        //   y: `+=${degToRad(10)}`,
        //   x: `+=${degToRad(10)}`,
        // })

        .to(camera.position, {
        // x:`-=${5}`,
         y: `+=${2}`,
        // z: 15,
      })
      .to(camera.rotation, {
        // x: degToRad(-10),
        y: degToRad(-50),
        // z: degToRad(0),
      })
      .to(modelRef.current.rotation, {
          y: `-=${degToRad(10)}`,
          x: `-=${degToRad(10)}`,
        }, '>')
        
        


      }, containerRef.current);

      return () => {
        ctx.revert();
        ScrollTrigger.getAll().forEach(trigger => trigger.kill());
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [modelLoaded]);

  

  return (
    <div ref={containerRef} className="w-full h-[600vh] intro-model">
      <div className="sticky top-0 w-full h-screen i">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }} >
           <CameraController cameraRef={cameraRef} />
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
           {/* <axesHelper args={[10]} /> */}
  {/* <gridHelper args={[100, 100]} /> */}  
          <Suspense fallback={null}>
            <ParallaxGroup modelRef={modelRef}>
              <Model 
                modelRef={modelRef}
                initialPosition={initialPosition}
                initialRotation={initialRotation}
                initialScale={initialScale}
              />
            </ParallaxGroup>
            <Environment preset="sunset" />
          </Suspense>
          <EffectComposer>
  <ChromaticAberration
    offset={new Vector2(0.001, 0.001)} // tweak for intensity
    blendFunction={2} 
  />
</EffectComposer>

          {/* <OrbitControls /> */}
        </Canvas>
      </div>
    </div>
  );
}