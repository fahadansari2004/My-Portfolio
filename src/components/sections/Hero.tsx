"use client";

import { motion } from "framer-motion";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { shaderMaterial, useTexture, Center } from "@react-three/drei";
import * as THREE from "three";
import { useRef, useState, useMemo } from "react";
import { extend } from "@react-three/fiber";

const LiquidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHoverState: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
  },
  // vertex shader
  `
    varying vec2 vUv;
    uniform float uTime;
    uniform float uHoverState;

    void main() {
      vUv = uv;
      
      // Gentle floating animation when idle
      vec3 pos = position;
      float idleFloat = sin(pos.x * 2.0 + uTime * 1.5) * 0.02 * (1.0 - uHoverState);
      pos.z += idleFloat;
      
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `,
  // fragment shader
  `
    uniform float uTime;
    uniform sampler2D uTexture;
    uniform float uHoverState;
    uniform vec2 uMouse;
    varying vec2 vUv;

    void main() {
      vec2 uv = vUv;

      // Distance from mouse
      float dist = distance(uv, uMouse);
      
      // Smooth step for localized effect (radius of the ripple)
      float falloff = smoothstep(0.5, 0.0, dist) * uHoverState;

      // Ripple calculation (sine wave based on distance)
      float ripplePhase = dist * 20.0 - uTime * 4.0;
      float ripple = sin(ripplePhase) * 0.03 * falloff;
      
      // Derivative for lighting (cosine)
      float dRipple = cos(ripplePhase) * 0.03 * falloff;
      
      // Direction vector from mouse to uv
      vec2 dir = normalize(uv - uMouse + vec2(0.0001));
      
      // Distortion vector for refraction
      vec2 distortion = dir * ripple;
      
      // Chromatic aberration (RGB shift)
      float r = texture2D(uTexture, uv + distortion * 1.3).r;
      float g = texture2D(uTexture, uv + distortion * 1.0).g;
      float b = texture2D(uTexture, uv + distortion * 0.7).b;
      
      vec4 texColor = vec4(r, g, b, 1.0);
      
      // Lighting/Highlight (specular-like reflection on the wave peaks)
      float highlight = max(0.0, dRipple * 15.0) * falloff;
      
      // Soft ambient neon glow added to the highlights
      vec3 glow = vec3(0.6, 0.8, 1.0) * highlight * 0.8;
      
      // Edge darkening/vignette for premium look
      float vignette = smoothstep(1.2, 0.2, distance(uv, vec2(0.5)));
      
      gl_FragColor = vec4(texColor.rgb * vignette + glow, 1.0);
    }
  `
);

extend({ LiquidDistortionMaterial });

function ProfileImageMesh() {
  const materialRef = useRef<any>(null);
  const [hovered, setHover] = useState(false);
  // Start mouse at center so it doesn't snap abruptly
  const [mousePos, setMousePos] = useState(new THREE.Vector2(0.5, 0.5));
  const targetMousePos = useRef(new THREE.Vector2(0.5, 0.5));

  // Load the user's uploaded image (using static version string to break initial cache but prevent re-render loops)
  const texture = useTexture('/prtfolio.jpg?v=3');

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      
      // Smooth easing for hover state
      materialRef.current.uHoverState = THREE.MathUtils.lerp(
        materialRef.current.uHoverState,
        hovered ? 1 : 0,
        0.05
      );
      
      // Smooth easing for mouse position (reduces jerky movements)
      mousePos.lerp(targetMousePos.current, 0.1);
      materialRef.current.uMouse.copy(mousePos);
    }
  });

  const { viewport } = useThree();

  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => {
        setHover(false);
        // Reset target to center when mouse leaves
        targetMousePos.current.set(0.5, 0.5);
      }}
      onPointerMove={(e) => {
        // Map pointer position to 0-1 UV space
        const x = (e.intersections[0].uv?.x) || 0.5;
        const y = (e.intersections[0].uv?.y) || 0.5;
        targetMousePos.current.set(x, y);
      }}
    >
      <planeGeometry args={[viewport.width, viewport.height, 64, 64]} />
      {/* @ts-ignore */}
      <liquidDistortionMaterial
        ref={materialRef}
        uTexture={texture}
        transparent
      />
    </mesh>
  );
}


export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden py-20">
      <div className="container mx-auto px-6 relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-12 h-full">
        
        {/* Text Content */}
        <div className="w-full md:w-1/2 flex flex-col items-start z-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="h-[1px] w-12 bg-white/50" />
            <span className="text-sm tracking-widest text-gray-300 uppercase">Available for work</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-6xl md:text-8xl font-bold tracking-tighter leading-tight mb-6"
          >
            FAHAD BIN <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
              ANSARI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-lg md:text-xl text-gray-400 max-w-md mb-10 leading-relaxed"
          >
            Versatile Full-Stack Developer crafting premium, scalable web applications with immersive digital experiences.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex items-center gap-6"
          >
            <a href="#contact" className="relative px-8 py-4 bg-white text-black font-medium tracking-wide uppercase overflow-hidden group" data-hover>
              <span className="relative z-10">Let's Talk</span>
              <div className="absolute inset-0 bg-gray-200 transform scale-x-0 origin-left transition-transform duration-300 group-hover:scale-x-100" />
            </a>
            <a href="#projects" className="text-sm font-medium tracking-widest uppercase hover:text-gray-300 transition-colors" data-hover>
              Explore Work
            </a>
          </motion.div>
        </div>

        {/* 3D Profile Image with Premium Glassmorphism Frame */}
        <div className="w-full md:w-1/2 flex items-center justify-center perspective-[1000px] mt-10 md:mt-0 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
            className="relative w-full max-w-[280px] sm:max-w-[320px] md:max-w-[400px] aspect-[4/5] rounded-2xl p-[2px] bg-gradient-to-br from-white/30 via-white/5 to-transparent backdrop-blur-xl shadow-[0_0_50px_rgba(255,255,255,0.05)] group transform-style-3d hover:shadow-[0_0_60px_rgba(255,255,255,0.1)] transition-shadow duration-700"
          >
             {/* Inner frame */}
             <div className="w-full h-full relative rounded-xl overflow-hidden bg-black/40 border border-white/10">
               <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
                 <ambientLight intensity={1} />
                 <Center>
                   <ProfileImageMesh />
                 </Center>
               </Canvas>
               {/* Soft inner glow overlay */}
               <div className="absolute inset-0 rounded-xl pointer-events-none shadow-[inset_0_0_30px_rgba(255,255,255,0.05)]" />
             </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
