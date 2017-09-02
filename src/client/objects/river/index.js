
import { Object3D, BoxBufferGeometry, ShaderMaterial, MeshPhongMaterial, PlaneBufferGeometry, Mesh, Color, LinearMipMapLinearFilter, ShaderLib, BackSide } from 'three'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

const frag = require('./main.frag')
const frags = THREE.ShaderChunk.meshbasic_frag

export default class River extends Object3D {
  constructor(props) {
    super()
    const self = this
    this.props = props
    this.props.normalMap.minFilter = THREE.LinearMipMapLinearFilter
    this.props.envMap.minFilter = THREE.LinearMipMapLinearFilter
    this.props.envMap.mapping = THREE.EquirectangularReflectionMapping
    this.props.envMap.magFilter = THREE.LinearFilter
    this.props.envMap.minFilter = THREE.LinearMipMapLinearFilter
    this.props.envMap.mapping = THREE.EquirectangularRefractionMapping
    this.props.normalMap.wrapS = this.props.normalMap.wrapT = THREE.RepeatWrapping
    this.props.normalMap.offset.set( 0, 0 )
    this.props.normalMap.repeat.set( 200, 200 )

    this.material = new MeshPhongMaterial({
      color: 0xc44e26,
      envMap: this.props.envMap,
      normalMap: this.props.normalMap,
      needsUpdate: false,
      fog: true,
      light: true,
    })

  	this.geometry = new THREE.PlaneBufferGeometry( 800,800,3,3)
  	this.mesh = new Mesh( this.geometry, this.material )
  	this.mesh.rotation.x = -Math.PI / 2
  	this.mesh.position.y = -1.9

  	this.add( self.mesh )
    self.updateReady = true

  }
  update(renderer, scene){
    // this.material.envMap = this.cubeCamera.renderTarget.texture
    // this.cubeCamera.updateCubeMap( renderer, scene )
    // this.material.uniforms.time.value += 1

  }
}
