
import { Object3D, PlaneGeometry, MeshStandardMaterial, Mesh, DoubleSide, ShaderMaterial, TextureLoader } from 'three'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

const map = require('assets_path/img/Map.png')
const normalMap = require('assets_path/img/NormalMap.png')
const displacementMap = require('assets_path/img/DisplacementMap.png')
const ambientOcclusionMap = require('assets_path/img/AmbientOcclusionMap.png')
const vertexShader = require('./particle.vert')
const fragmentShader = require('./particle.frag')

export default class Particles extends Object3D {
  constructor() {
    super()
    // this.ambientLight = new AmbientLight(0x404040)
    // this.add(this.ambientLight)

    this.mousePos = { x:0.5, y:0.5 }
    document.addEventListener('mousemove', (event) => this.mousePos = { x: event.clientX/window.innerWidth, y: event.clientY/window.innerHeight })
    this.texture = {
      map: new TextureLoader().load(map),
      normalMap: new TextureLoader().load(normalMap),
      displacementMap: new TextureLoader().load(displacementMap),
      ambientOcclusionMap: new TextureLoader().load(ambientOcclusionMap),
    }

    this.geometry = new PlaneGeometry(20, 20, 32)
    this.material = new MeshStandardMaterial({
      color: 0xffff00,
      side: DoubleSide,
      transparent: true,
      map: this.texture.map,
      displacementMap: this.texture.displacementMap,
      //aoMap: this.texture.ambientOcclusionMap,
    })
    this.plane = new Mesh(this.geometry, this.material)
    const uniforms = { texture: { value: this.texture.map } }


    console.log(this.plane.customDepthMaterial)

    this.plane.castShadow = true
    this.plane.receiveShadow = true
    this.add(this.plane)
    this.plane.customDepthMaterial = new ShaderMaterial({
      uniforms: uniforms,
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: DoubleSide,
    })
  }
  update(){
  }
}
