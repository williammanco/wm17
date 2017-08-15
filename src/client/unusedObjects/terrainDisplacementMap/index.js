
import { Object3D, ShaderMaterial, PlaneBufferGeometry, Mesh, RepeatWrapping, Color, Vector2 } from 'three'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

THREE.SubdivisionModifier = require('imports-loader?THREE=three!exports-loader?THREE.SubdivisionModifier!three/examples/js/modifiers/SubdivisionModifier');
const vert = require('./main.vert')
const frag = require('./main.frag')

export default class TerrainDisplacementMap extends Object3D {
  constructor(props) {
    super()
    const self = this
    this.props = props

    this.heightMapTexture = self.props.texture
	  this.heightMapTexture.wrapS = this.heightMapTexture.wrapT = RepeatWrapping
  	this.heightMapScale = 10.0
    this.heightMapTexture.repeat.set( 4, 4 )
    this.heightMapTexture.needsUpdate = true;

    this.material = new ShaderMaterial({
      uniforms: {
        displacementMap: { value: self.heightMapTexture },
        displacementScale: { value: self.heightMapScale},
        displacementBias: { value: 0.0 },
        noSolarize: { type: 'b', value: self.props.noSolarize },
        noForcedAlpha: { type: 'b', value: self.props.noForcedAlpha },
        topColor:    { type: "c", value: new Color( 0x0077ff ) },
        bottomColor: { type: "c", value: new Color( 0xffffff ) },
        offset:      { type: "f", value: 33 },
        exponent:    { type: "f", value: 0.2 },
        fogColor:    { type: "c", value: self.props.scene.fog.color },
        fogNear:     { type: "f", value: self.props.scene.fog.near },
        fogFar:      { type: "f", value: self.props.scene.fog.far },
        offset: {  value: new Vector2(1.0,1.0) }
      },
      vertexShader: vert,
    	fragmentShader: frag,
      fog: true,
    })
  	this.planeGeometry = new PlaneBufferGeometry( 300, 110, 100, 100 )
  	this.meshTerrain = new Mesh( this.planeGeometry, this.material )
  	this.meshTerrain.rotation.x = -Math.PI / 2
  	this.meshTerrain.position.y = -4
    // this.smooth = this.meshTerrain.clone()
    // this.modifier = new THREE.SubdivisionModifier( 2 )
    // this.modifier.modify( this.planeGeometry )

  	this.add( self.meshTerrain )
    self.updateReady = true
  }

  update(delta){


  }
}
