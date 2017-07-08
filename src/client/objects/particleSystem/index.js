
import { Object3D, TextureLoader, BufferAttribute, BufferGeometry, ShaderMaterial, Points, AddEquation, Color, LinearMipMapLinearFilter, OneMinusSrcAlphaFactor, OneFactor, CustomBlending } from 'three'
import { TimelineMax } from 'gsap'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

const vert = require('./particle.vert')
const frag = require('./particle.frag')


export default class ParticleSystem extends Object3D {
  constructor(props) {
    super()
    this.props = props

    settings.explodeStart = false
    this.velocity = {
      x: 0.0,
      y: 0.1,
    }
    this.zone = {
      x: settings.world.width / 2,
      y: settings.world.height / 2,
      z: 100,
    }
    this.particlesCountText = 0
    let particleImage = this.props.particle
    let yOffset = this.props.yOffset
    let changeColor = this.props.changeColor
    let xs = this.props.xDensity
    let ys = this.props.yDensity
    this.particlesCount = xs * ys
    this.positions = new Float32Array(this.particlesCount * 3)
    this.alpha = new Float32Array(this.particlesCount * 1)
    this.aColor = new Float32Array(this.particlesCount * 3)

    this.depthLoop = 100
    let randomSpread = 1.9

    let particle = []
    let plane = {
      position: { x: 0, y: 0, z: 0 },
      scale: { x: 1, y: 1 },
      userData: {}
    }

    for (let x = 0; x < xs; x++) {
      let xv = x / xs - 0.5
      for (let y = 0; y < ys; y++) {
        let yv = y / ys - 0.5
        plane.position.x = xv * 400 + Math.random() * randomSpread * 2
        plane.position.y = (Math.sin(yv * Math.PI * 2) * Math.random() + Math.sin(xv *Math.PI*10 / 2) * 5.92) + Math.random() + yOffset
        plane.position.z = yv * this.depthLoop
        plane.userData = {x: plane.position.x, z: plane.position.z, y: plane.position.y, scaleY: plane.scale.y }

        // plane.position.x = xv * 60 + Math.random() * randomSpread * 2
        // plane.position.y = ( Math.cos( yv * Math.PI * 8 ) + Math.sin( yv * Math.PI * 8 ) ) *10
        // plane.position.z = x - 0.5

        particle.push(plane.userData)
      }
    }
    for (let i = 0, j = 0; i < particle.length; i += 1, j += 3) {

      this.positions[j + 0] = particle[i].x
      this.positions[j + 1] = particle[i].y
      this.positions[j + 2] = particle[i].z
      this.alpha[i] = 1
      if(changeColor){
        this.aColor[j + 0] = 1.6-Math.random()
        this.aColor[j + 1] = 1.6-Math.random()
        this.aColor[j + 2] = 1.6-Math.random()
      }else{
        let uniformRandom = Math.random()
        this.aColor[j + 0] = 1.6-uniformRandom
        this.aColor[j + 1] = 1.6-uniformRandom
        this.aColor[j + 2] = 1.6-uniformRandom
      }
    }

    this.geom = new BufferGeometry()
    this.geom.addAttribute('position', new BufferAttribute(this.positions, 3))
    this.geom.addAttribute('alpha', new BufferAttribute(this.alpha, 1))
    this.geom.addAttribute('aColor', new BufferAttribute(this.aColor, 3))
    this.geom.computeBoundingSphere()

    state.textures.particle = new TextureLoader().load(particleImage)
    state.textures.particle.minFilter = LinearMipMapLinearFilter
    state.textures.particle.flipY = false
    state.textures.particle.needsUpdate = true
    state.textures.particle.premultiplyAlpha = true

  
    this.mat = new ShaderMaterial({
      vertexShader: vert,
      fragmentShader: frag,
      uniforms: {
        texture: { type: 't', value: state.textures.particle },
        color: { type: 'c', value: new Color(0xffffff) },
        scale: { type: 'f', value: this.props.scale },
        noSolarize: { type: 'f', value: this.props.noSolarize },
        topColor:    { type: "c", value: new Color( 0x0077ff ) },
        bottomColor: { type: "c", value: new Color( 0xffffff ) },
        offset:      { type: "f", value: 33 },
        exponent:    { type: "f", value: 0.2 },
        fogColor:    { type: "c", value: this.props.scene.fog.color },
        fogNear:     { type: "f", value: this.props.scene.fog.near },
        fogFar:      { type: "f", value: this.props.scene.fog.far }
      },
      // lights:true,
      fog: true,
      transparent: true,
      blending: CustomBlending,
      blendSrc: OneFactor,
      blendDst: OneMinusSrcAlphaFactor,
      blendEquation: AddEquation,
    })
    this.particles = new Points(this.geom, this.mat)
    this.add(this.particles)
  }
  update() {
    const positions = this.particles.geometry.attributes.position.array
    for (let i = 0, j = 0; i < this.particlesCount; i += 1, j += 3) {
      positions[j + 2] += 0.2
      if (positions[j + 2] > this.zone.z) {
        positions[j + 2] = 0
      }
    }

    this.particles.geometry.attributes.position.needsUpdate = true
  }
}
