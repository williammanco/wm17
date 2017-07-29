
import { Object3D, InstancedBufferGeometry, InstancedBufferAttribute, ImageUtils, LinearMipMapLinearFilter, Fog, ShaderMaterial, PlaneBufferGeometry, Mesh } from 'three'
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
    this.fog = new Fog( 0xffffff, - 100, 3000 )
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
    this.zone = {
      x: settings.world.width / 2,
      y: settings.world.height / 2,
      z: 100,
    }
    this.geometry = new InstancedBufferGeometry()
    this.geometry.copy( new PlaneBufferGeometry(500, 500) )
    this.particleCount = 100
    let translateArray = new Float32Array( this.particleCount * 3 )
    for ( let i = 0, j = 0, l = this.particleCount; i < l; i ++, j += 3 ) {
      translateArray[ j + 0 ] = -Math.random() * Math.random() * settings.world.width
      translateArray[ j + 1 ] = (Math.random() * 400) + 200
      translateArray[ j + 2 ] = -i * 10
    }
    let scaleAndRotationArray = new Float32Array( this.particleCount * 2 )
    for ( let i = 0, j = 0, l = this.particleCount; i < l; i ++, j += 2 ) {
      scaleAndRotationArray[ j + 0 ] = Math.random() * Math.random() * 1.5 + 0.5
      scaleAndRotationArray[ j + 1 ] = Math.random() * Math.PI
    }
    this.geometry.addAttribute( "aTranslate", new InstancedBufferAttribute( translateArray, 3, 1 ) )
    this.geometry.addAttribute( "aScaleAndRotation", new InstancedBufferAttribute( scaleAndRotationArray, 2, 1 ) )

		this.mesh = new Mesh( self.geometry, self.material )
    this.add(self.mesh)
  }

  update(){
    const self = this
    if (!this.updateReady) { return false }
    let positions = self.mesh.geometry.attributes.aTranslate.array
    for (let i = 0, j = 0; i < this.particleCount; i += 1, j += 3) {
      positions[j + 2] += 2
      if (positions[j + 2] > self.zone.z*4) {
        positions[j + 2] = -settings.world.depth
      }
    }
    self.mesh.geometry.attributes.aTranslate.needsUpdate = true
  }
}
