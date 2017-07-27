
import { Object3D, InstancedBufferGeometry, InstancedBufferAttribute, ImageUtils, LinearMipMapLinearFilter, Fog, ShaderMaterial, PlaneGeometry, Mesh } from 'three'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

import vertex from './main.vert'
import fragment from './main.frag'

export default class Clouds extends Object3D {
  /**
   * @method constructor
   * @param  {string}    props.image [image for texture loader]
   */
  constructor(props) {
    super()
    const self = this
    this.props = props
    this.texture = ImageUtils.loadTexture( self.props.image, null, () => self.updateReady = true )
		this.texture.minFilter = LinearMipMapLinearFilter
    this.fog = new Fog( 0x4584b4, - 100, 3000 )
    this.material = new ShaderMaterial({
      uniforms: {
        "map": { type: "t", value: self.texture },
        "fogColor" : { type: "c", value: self.fog.color },
        "fogNear" : { type: "f", value: self.fog.near },
        "fogFar" : { type: "f", value: self.fog.far },
      },
      vertexShader: vertex,
      fragmentShader: fragment,
      depthWrite: false,
      depthTest: false,
      transparent: true,
		})

    this.geometry = new InstancedBufferGeometry()
    this.geometry.copy( new PlaneGeometry(64, 64) )
    this.particleCount = 50
    let translateArray = new Float32Array( this.particleCount * 3 )
    for ( let i = 0, j = 0, l = this.particleCount; i < l; i ++, j += 3 ) {
      translateArray[ j + 0 ] = Math.random() * 1000 - 500
      translateArray[ j + 1 ] = - Math.random() * Math.random() * 200 - 15
      translateArray[ j + 2 ] = i
    }
    let scaleArray = new Float32Array( this.particleCount * 2 )
    for ( let i = 0, j = 0, l = this.particleCount; i < l; i ++, j += 2 ) {
      scaleArray[ j + 0 ] = Math.random() * Math.PI
      scaleArray[ j + 1 ] = Math.random() * Math.random() * 1.5 + 0.5
    }
    this.geometry.addAttribute( "translate", new InstancedBufferAttribute( translateArray, 3, 1 ) )
    this.geometry.addAttribute( "scale", new InstancedBufferAttribute( scaleArray, 2, 1 ) )

		this.mesh = new Mesh( self.geometry, self.material )
    this.add(self.mesh)
  }

  update(){
    const self = this
    if(self.updateReady){

    }
  }
}
