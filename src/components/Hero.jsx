import { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Play, Battery, Sun, Zap } from 'lucide-react'

// Lightning WebGL Component
const Lightning = ({
  hue = 30,
  xOffset = 0,
  speed = 1,
  intensity = 1,
  size = 1,
}) => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeCanvas = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    const gl = canvas.getContext("webgl")
    if (!gl) {
      console.error("WebGL not supported")
      return
    }

    const vertexShaderSource = `
      attribute vec2 aPosition;
      void main() {
        gl_Position = vec4(aPosition, 0.0, 1.0);
      }
    `

    const fragmentShaderSource = `
      precision mediump float;
      uniform vec2 iResolution;
      uniform float iTime;
      uniform float uHue;
      uniform float uXOffset;
      uniform float uSpeed;
      uniform float uIntensity;
      uniform float uSize;

      #define OCTAVE_COUNT 10

      vec3 hsv2rgb(vec3 c) {
          vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
          return c.z * mix(vec3(1.0), rgb, c.y);
      }

      float hash11(float p) {
          p = fract(p * .1031);
          p *= p + 33.33;
          p *= p + p;
          return fract(p);
      }

      float hash12(vec2 p) {
          vec3 p3 = fract(vec3(p.xyx) * .1031);
          p3 += dot(p3, p3.yzx + 33.33);
          return fract((p3.x + p3.y) * p3.z);
      }

      mat2 rotate2d(float theta) {
          float c = cos(theta);
          float s = sin(theta);
          return mat2(c, -s, s, c);
      }

      float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 fp = fract(p);
          float a = hash12(ip);
          float b = hash12(ip + vec2(1.0, 0.0));
          float c = hash12(ip + vec2(0.0, 1.0));
          float d = hash12(ip + vec2(1.0, 1.0));

          vec2 t = smoothstep(0.0, 1.0, fp);
          return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
      }

      float fbm(vec2 p) {
          float value = 0.0;
          float amplitude = 0.5;
          for (int i = 0; i < OCTAVE_COUNT; ++i) {
              value += amplitude * noise(p);
              p *= rotate2d(0.45);
              p *= 2.0;
              amplitude *= 0.5;
          }
          return value;
      }

      void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
          vec2 uv = fragCoord / iResolution.xy;
          uv = 2.0 * uv - 1.0;
          uv.x *= iResolution.x / iResolution.y;
          uv.x += uXOffset;

          uv += 2.0 * fbm(uv * uSize + 0.8 * iTime * uSpeed) - 1.0;

          float dist = abs(uv.x);
          vec3 baseColor = hsv2rgb(vec3(uHue / 360.0, 0.8, 0.9));
          vec3 col = baseColor * pow(mix(0.0, 0.07, hash11(iTime * uSpeed)) / dist, 1.0) * uIntensity;
          col = pow(col, vec3(1.0));
          fragColor = vec4(col, 1.0);
      }

      void main() {
          mainImage(gl_FragColor, gl_FragCoord.xy);
      }
    `

    const compileShader = (source, type) => {
      const shader = gl.createShader(type)
      if (!shader) return null
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compile error:", gl.getShaderInfoLog(shader))
        gl.deleteShader(shader)
        return null
      }
      return shader
    }

    const vertexShader = compileShader(vertexShaderSource, gl.VERTEX_SHADER)
    const fragmentShader = compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER)
    if (!vertexShader || !fragmentShader) return

    const program = gl.createProgram()
    if (!program) return
    gl.attachShader(program, vertexShader)
    gl.attachShader(program, fragmentShader)
    gl.linkProgram(program)
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program linking error:", gl.getProgramInfoLog(program))
      return
    }
    gl.useProgram(program)

    const vertices = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ])
    const vertexBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

    const aPosition = gl.getAttribLocation(program, "aPosition")
    gl.enableVertexAttribArray(aPosition)
    gl.vertexAttribPointer(aPosition, 2, gl.FLOAT, false, 0, 0)

    const iResolutionLocation = gl.getUniformLocation(program, "iResolution")
    const iTimeLocation = gl.getUniformLocation(program, "iTime")
    const uHueLocation = gl.getUniformLocation(program, "uHue")
    const uXOffsetLocation = gl.getUniformLocation(program, "uXOffset")
    const uSpeedLocation = gl.getUniformLocation(program, "uSpeed")
    const uIntensityLocation = gl.getUniformLocation(program, "uIntensity")
    const uSizeLocation = gl.getUniformLocation(program, "uSize")

    const startTime = performance.now()
    let animationId
    const render = () => {
      resizeCanvas()
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(iResolutionLocation, canvas.width, canvas.height)
      const currentTime = performance.now()
      gl.uniform1f(iTimeLocation, (currentTime - startTime) / 1000.0)
      gl.uniform1f(uHueLocation, hue)
      gl.uniform1f(uXOffsetLocation, xOffset)
      gl.uniform1f(uSpeedLocation, speed)
      gl.uniform1f(uIntensityLocation, intensity)
      gl.uniform1f(uSizeLocation, size)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      animationId = requestAnimationFrame(render)
    }
    animationId = requestAnimationFrame(render)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationId)
    }
  }, [hue, xOffset, speed, intensity, size])

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0" />
}

// Feature Item Component
const FeatureItem = ({ icon: Icon, name, value, position }) => {
  return (
    <motion.div
      className={`absolute ${position} z-10 group transition-all duration-300 hover:scale-110`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <div className="flex items-center gap-3 relative bg-white/10 backdrop-blur-md border border-white/20 px-4 py-3 rounded-2xl">
        <div className="relative">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#0071E3] to-[#005BB6] flex items-center justify-center">
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -inset-1 bg-[#0071E3]/30 rounded-xl blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="text-white relative">
          <div className="font-semibold text-white group-hover:text-white transition-colors duration-300">{name}</div>
          <div className="text-white/60 text-sm group-hover:text-white/80 transition-colors duration-300">{value}</div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 z-0">
        {/* Dark base */}
        <div className="absolute inset-0 bg-[#0a1628]"></div>

        {/* Lightning effect - Blue hue */}
        <div className="absolute inset-0 opacity-60">
          <Lightning
            hue={210}
            xOffset={0}
            speed={1.2}
            intensity={0.8}
            size={2}
          />
        </div>

        {/* Glowing orb */}
        <div className="absolute top-[60%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[800px] lg:h-[800px] rounded-full bg-gradient-to-b from-[#0071E3]/20 to-[#004589]/10 blur-3xl"></div>

        {/* Planet/sphere at bottom */}
        <div className="z-10 absolute top-[65%] left-1/2 transform -translate-x-1/2 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] lg:w-[700px] lg:h-[700px] backdrop-blur-xl rounded-full bg-[radial-gradient(circle_at_25%_90%,_#004589_15%,_#0D1117_70%,_#0a1628_100%)] border border-[#0071E3]/20"></div>

        {/* Additional glow effects */}
        <div className="absolute top-0 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-[#0071E3]/10 rounded-full blur-[60px] sm:blur-[90px] lg:blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-[#004589]/10 rounded-full blur-[60px] sm:blur-[90px] lg:blur-[120px]"></div>
      </div>

      {/* Floating Feature Cards */}
      <div className="absolute inset-0 z-20 max-w-7xl mx-auto px-6 hidden lg:block">
        <FeatureItem
          icon={Battery}
          name="3072Wh"
          value="Max Capacity"
          position="left-10 top-1/3"
        />
        <FeatureItem
          icon={Sun}
          name="800W Solar"
          value="Fast Charging"
          position="left-20 top-1/2"
        />
        <FeatureItem
          icon={Zap}
          name="3000W Output"
          value="Pure Sine Wave"
          position="right-10 top-1/3"
        />
        <FeatureItem
          icon={Battery}
          name="10 Years"
          value="Warranty"
          position="right-20 top-1/2"
        />
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-30 flex flex-col items-center text-center max-w-4xl mx-auto px-4 sm:px-6 pt-24 sm:pt-32 pb-16 sm:pb-20"
      >
        {/* Badge */}
        <motion.button
          variants={itemVariants}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2.5 bg-[#0071E3]/10 border border-[#0071E3]/30 backdrop-blur-sm rounded-full text-sm mb-8 transition-all duration-300 group cursor-pointer"
        >
          <span className="w-2 h-2 bg-[#0071E3] rounded-full animate-pulse"></span>
          <span className="text-[#0071E3] font-medium">New 2026 Collection Available</span>
          <ArrowRight size={16} className="text-[#0071E3] transform group-hover:translate-x-1 transition-transform duration-300" />
        </motion.button>

        {/* Main Headline */}
        <motion.h1
          variants={itemVariants}
          className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-8xl font-bold leading-[1.05] mb-4"
        >
          <span className="text-white">Power Your</span>
          <br />
          <span className="text-gradient">Adventure</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h2
          variants={itemVariants}
          className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-light text-white/70 mb-4 sm:mb-6"
        >
          Lighting Up The Future
        </motion.h2>

        {/* Description */}
        <motion.p
          variants={itemVariants}
          className="text-base sm:text-lg text-white/50 mb-6 sm:mb-10 max-w-2xl px-2"
        >
          Portable power stations and solar panels engineered for explorers.
          Clean energy that goes wherever life takes you.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row flex-wrap justify-center gap-3 sm:gap-4 mb-10 sm:mb-16 px-2"
        >
          <Link to="/npex-600">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="btn-primary flex items-center gap-2 cursor-pointer"
            >
              Explore Products
              <ArrowRight size={18} />
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-6 py-4 rounded-full border-2 border-white/20 text-white font-semibold hover:bg-white/5 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#0071E3]/20 flex items-center justify-center">
              <Play size={14} className="text-[#0071E3]" fill="currentColor" />
            </div>
            Watch Film
          </motion.button>
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-3 gap-4 sm:gap-8 md:gap-16"
        >
          {[
            { value: '50K+', label: 'Happy Explorers' },
            { value: '4.9', label: 'Average Rating' },
            { value: '10yr', label: 'Warranty' },
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-display font-bold text-[#0071E3]">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/50 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-30"
      >
        <span className="text-xs text-white/40 uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 border-2 border-white/30 rounded-full flex justify-center pt-1"
        >
          <div className="w-1 h-2 bg-[#0071E3] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  )
}
