
import { Object3D, PlaneGeometry, MeshStandardMaterial, Mesh, DoubleSide, TextureLoader, RepeatWrapping } from 'three'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

const map = require('assets_path/img/ground.jpg')
const normalMap = require('assets_path/img/ground_normal.png')
const displacementMap = require('assets_path/img/ground_dspl.png')
const ambientOcclusionMap = require('assets_path/img/ground_ao.png')

export default class Ground extends Object3D {
  constructor() {
    super()
    this.geometry = new PlaneGeometry(100, 100, 10)
    this.texture = {
      map: new TextureLoader().load(map),
      normalMap: new TextureLoader().load(normalMap),
      displacementMap: new TextureLoader().load(displacementMap),
      ambientOcclusionMap: new TextureLoader().load(ambientOcclusionMap),
    }
    this.texture.map.wrapS = this.texture.map.wrapT = RepeatWrapping
    this.texture.map.offset.set( 0, 0 )
    this.texture.map.repeat.set( 2, 2 )
    this.material = new MeshStandardMaterial({
      color: 0xffffff,
      side: DoubleSide,
      map: this.texture.map,
      displacementMap: this.texture.displacementMap,
      aoMap: this.texture.ambientOcclusionMap,
    })
    this.plane = new Mesh(this.geometry, this.material)
    this.plane.rotation.x = -0.4 * Math.PI
    this.plane.position.x = 0
    this.plane.position.y = -10
    this.plane.position.z = 0
    this.plane.receiveShadow = true
    this.add(this.plane)
  }
  update(){
  }
}
