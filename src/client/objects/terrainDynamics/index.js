
import { Object3D, ShaderMaterial, PlaneBufferGeometry, Mesh, RepeatWrapping, Color, Vector2 } from 'three'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

const vert = require('./main.vert')
const frag = require('./main.frag')

export default class TerrainDynamics extends Object3D {
  constructor(props) {
    super()
    const self = this
    this.props = props

    this.material = new ShaderMaterial({
      uniforms: {
        time: { type: "f", value: 1.0 },
        speed: { type: "f", value: 0.007 },
        amplitude: { type: "f", value: 0.04 },
        elevation: { type: "f", value: 5.0 },
        noSolarize: { type: 'b', value: 1.0 },
        fogColor:    { type: "c", value: self.props.scene.fog.color },
        fogNear:     { type: "f", value: self.props.scene.fog.near },
        fogFar:      { type: "f", value: self.props.scene.fog.far },
      },
      vertexShader: vert,
    	fragmentShader: frag,
      fog: true,
      wireframe: false,
    })
  	this.planeGeometry = new PlaneBufferGeometry( this.props.width, this.props.height, 100, 100 )
  	this.meshTerrain = new Mesh( this.planeGeometry, this.material )
  	this.meshTerrain.rotation.x = -Math.PI / 2
  	this.meshTerrain.position.y = 0

  	this.add( self.meshTerrain )
    self.updateReady = true
  }

  update(delta){
    this.material.uniforms.time.value += 1
    return this.planeGeometry.attributes.position.array
  }
}
