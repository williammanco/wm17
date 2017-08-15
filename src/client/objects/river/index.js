
import { Object3D, ShaderMaterial, PlaneBufferGeometry, Mesh, Color } from 'three'
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
    console.log(frags)

    // this.cubeCamera = new THREE.CubeCamera( 0.1, 3000, 1024 )
    // this.cubeCamera.renderTarget.texture.minFilter = THREE.LinearMipMapLinearFilter;
    // this.cubeCamera.position.set(0, 5, 0)
    // this.add( this.cubeCamera )

    this.uniforms = THREE.UniformsUtils.merge([
      {
        // time: { type: "f", value: 1.0 },
        color: { type: 'c', value: new Color(0xffffff) },
      },
    ])

    this.material = new ShaderMaterial({
      fragmentShader: frag,
      uniforms: this.uniforms,
      fog: true
    })
  	this.geometry = new THREE.PlaneBufferGeometry( 100,100,20,20)
  	this.mesh = new Mesh( this.geometry, this.material )
  	this.mesh.rotation.x = -Math.PI / 2
  	this.mesh.position.y = -2.5

  	this.add( self.mesh )
    self.updateReady = true

  }
  update(renderer, scene){
    // this.material.envMap = this.cubeCamera.renderTarget.texture
    // this.cubeCamera.updateCubeMap( renderer, scene )
    // this.material.uniforms.time.value += 1

  }
}
