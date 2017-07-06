
import { Object3D, IcosahedronBufferGeometry, MeshStandardMaterial, Mesh, DoubleSide, TextureLoader, RepeatWrapping, Vector2 } from 'three'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

const map = require('assets_path/img/grass.png')
const normalMap = require('assets_path/img/norm.jpg')
const displacementMap = require('assets_path/img/ao.jpg')
const ambientOcclusionMap = require('assets_path/img/ao.jpg')
const roughnessMap = require('assets_path/img/spec.jpg')

export default class TreeSphere extends Object3D {
  constructor() {
    super()
    this.radius = 10
    this.detail = 3
    this.geometry = new IcosahedronBufferGeometry(this.radius, this.detail)
    this.texture = {
      map: new TextureLoader().load(map),
      normalMap: new TextureLoader().load(normalMap),
      displacementMap: new TextureLoader().load(displacementMap),
      ambientOcclusionMap: new TextureLoader().load(ambientOcclusionMap),
      roughnessMap: new TextureLoader().load(roughnessMap)
    }
    this.texture.map.wrapS = this.texture.map.wrapT = RepeatWrapping
    this.texture.map.offset.set( 0, 0 )
    this.texture.map.repeat.set( 4, 4 )
    this.material = new MeshStandardMaterial({
      color: 0xffffff,
      side: DoubleSide,
      map: this.texture.map,
      normalMap: this.texture.normalMap,
      displacementMap: this.texture.displacementMap,
      aoMap: this.texture.ambientOcclusionMap,
      displacementScale: 20,
    })
    this.obj = new Mesh(this.geometry, this.material)
    this.obj.receiveShadow = true
    this.add(this.obj)
  }
  update(){
  }
}
