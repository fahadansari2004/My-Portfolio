"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame, extend, useThree } from "@react-three/fiber";
import { useTexture, Center } from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { shaderMaterial } from "@react-three/drei";
import MagneticButton from "../MagneticButton";

const LiquidDistortionMaterial = shaderMaterial(
  {
    uTime: 0,
    uTexture: new THREE.Texture(),
    uHoverState: 0,
    uMouse: new THREE.Vector2(0.5, 0.5),
    uResolution: new THREE.Vector2(1, 1),
    uImageResolution: new THREE.Vector2(1, 1),
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
      float idleFloat = sin(pos.x * 2.0 + uTime * 1.5) * 0.015 * (1.0 - uHoverState);
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
    uniform vec2 uResolution;
    uniform vec2 uImageResolution;
    varying vec2 vUv;

    void main() {
      vec2 planeUv = vUv;

      // Object-cover UV mapping for the image
      vec2 ratio = vec2(
        min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
        min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
      );
      vec2 uv = vec2(
        planeUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
        planeUv.y * ratio.y + (1.0 - ratio.y) * 0.85
      );

      // Adjust for aspect ratio of the ripple
      vec2 aspectUv = planeUv;
      vec2 aspectMouse = uMouse;
      if (uResolution.x > uResolution.y) {
        aspectUv.x *= uResolution.x / uResolution.y;
        aspectMouse.x *= uResolution.x / uResolution.y;
      } else {
        aspectUv.y *= uResolution.y / uResolution.x;
        aspectMouse.y *= uResolution.y / uResolution.x;
      }

      // Distance from mouse
      float dist = distance(aspectUv, aspectMouse);
      
      // Smooth step for localized effect (radius of the ripple)
      float falloff = smoothstep(0.4, 0.0, dist) * uHoverState;

      // Ripple calculation
      float ripplePhase = dist * 25.0 - uTime * 5.0;
      float ripple = sin(ripplePhase) * 0.03 * falloff;
      
      // Derivative for lighting (cosine)
      float dRipple = cos(ripplePhase) * 0.03 * falloff;
      
      // Direction vector from mouse to planeUv
      vec2 dir = normalize(aspectUv - aspectMouse + vec2(0.0001));
      
      // Distortion vector for refraction (only applies near mouse)
      vec2 distortion = dir * ripple;
      
      // Chromatic aberration (RGB shift) near mouse on the mapped texture UV
      float r = texture2D(uTexture, uv + distortion * 1.3).r;
      float g = texture2D(uTexture, uv + distortion * 1.0).g;
      float b = texture2D(uTexture, uv + distortion * 0.7).b;
      
      vec4 texColor = vec4(r, g, b, 1.0);
      
      // Original texture for areas outside the mouse hover
      vec4 originalColor = texture2D(uTexture, uv);
      
      // Blend original and distorted based on falloff
      vec4 finalColor = mix(originalColor, texColor, falloff);
      
      // Lighting/Highlight
      float highlight = max(0.0, dRipple * 15.0) * falloff;
      vec3 glow = vec3(0.6, 0.8, 1.0) * highlight * 0.8;
      
      // Soft edge fading (blend seamlessly into background) using the plane coordinates
      float edgeX = smoothstep(0.0, 0.15, planeUv.x) * smoothstep(1.0, 0.85, planeUv.x);
      float edgeY = smoothstep(0.0, 0.15, planeUv.y) * smoothstep(1.0, 0.85, planeUv.y);
      float alpha = edgeX * edgeY;
      
      gl_FragColor = vec4(finalColor.rgb + glow, finalColor.a * alpha);
    }
  `
);

extend({ LiquidDistortionMaterial });

function ProfileImageMesh() {
  const materialRef = useRef<any>(null);
  const [hovered, setHover] = useState(false);
  const [mousePos, setMousePos] = useState(new THREE.Vector2(0.5, 0.5));
  const targetMousePos = useRef(new THREE.Vector2(0.5, 0.5));
  const { viewport } = useThree();

  const texture = useTexture('/mypic.png?v=1');

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime += delta;
      
      materialRef.current.uHoverState = THREE.MathUtils.lerp(
        materialRef.current.uHoverState,
        hovered ? 1 : 0,
        0.05
      );
      
      mousePos.lerp(targetMousePos.current, 0.1);
      materialRef.current.uMouse.copy(mousePos);
      materialRef.current.uResolution.set(viewport.width, viewport.height);
      if (texture.image) {
        materialRef.current.uImageResolution.set(texture.image.width, texture.image.height);
      }
    }
  });

  return (
    <mesh
      onPointerOver={() => setHover(true)}
      onPointerOut={() => {
        setHover(false);
        targetMousePos.current.set(0.5, 0.5);
      }}
      onPointerMove={(e) => {
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

const letterVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
};

const lineVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.2,
    },
  },
};

export default function Hero() {
  const { scrollY } = useScroll();
  const yText = useTransform(scrollY, [0, 500], [0, -150]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);
  const scaleImage = useTransform(scrollY, [0, 500], [1, 1.1]);

  return (
    <section id="home" className="relative w-full h-[100vh] flex items-center overflow-hidden">
      
      {/* Absolute Full Bleed 3D Canvas Background */}
      <motion.div 
        style={{ scale: scaleImage }}
        className="absolute inset-0 z-0 flex justify-end items-center pointer-events-auto"
      >
        <div className="w-full md:w-[60%] h-[70vh] md:h-[90vh] relative right-[-5%]">
           <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 1.5]}>
             <ambientLight intensity={1} />
             <Center>
               <ProfileImageMesh />
             </Center>
           </Canvas>
        </div>
      </motion.div>

      {/* Foreground Content */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col justify-center h-full pointer-events-none">
        
        <motion.div 
          style={{ y: yText, opacity: opacityText }}
          className="w-full md:w-[60%] flex flex-col items-start"
        >
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex items-center gap-4 mb-6"
          >
            <div className="h-[2px] w-12 bg-white/50" />
            <span className="text-sm tracking-[0.3em] text-gray-300 uppercase">Hello, I'm</span>
          </motion.div>

          <motion.h1
            variants={lineVariants}
            initial="hidden"
            animate="visible"
            className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter leading-[1.1] mb-6 text-white"
          >
            {Array.from("FAHAD BIN").map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
            <br />
            {Array.from("ANSARI").map((char, index) => (
              <motion.span key={index} variants={letterVariants} className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-gray-500">
                {char === " " ? "\u00A0" : char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="text-lg md:text-xl text-gray-400 max-w-lg mb-10 leading-relaxed font-light tracking-wide flex flex-col gap-2"
          >
            <span className="text-white font-medium">Software Engineer</span>
            <span className="text-white/80">Full Stack Developer</span>
            <span className="text-white/60">AI Developer</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.5 }}
            className="flex flex-col sm:flex-row items-center gap-6 pointer-events-auto"
          >
            <MagneticButton href="#projects">
              View Projects
            </MagneticButton>
            
            <MagneticButton href="/Fahad Bin Ansari-Resumeorg.pdf" download={true} className="!bg-transparent !border-white/20 hover:!bg-white/10">
              Download Resume
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
