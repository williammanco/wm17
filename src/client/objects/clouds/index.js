
import { Object3D, Geometry, ImageUtils, LinearMipMapLinearFilter, Fog, ShaderMaterial, PlaneGeometry, Mesh } from 'three'
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
    this.geometry = new Geometry()
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
		this.plane = new Mesh( new PlaneGeometry( 64, 64 ) )

    for ( var i = 0; i < 8000; i++ ) {

      self.plane.position.x = Math.random() * 1000 - 500;
      self.plane.position.y = - Math.random() * Math.random() * 200 - 15;
      self.plane.position.z = i;
      self.plane.rotation.z = Math.random() * Math.PI;
      self.plane.scale.x = self.plane.scale.y = Math.random() * Math.random() * 1.5 + 0.5;

      self.geometry.merge( self.geometry, self.plane )
    }

		this.mesh = new Mesh( self.geometry, self.material )

    this.add(self.mesh)
  }

  update(){

  }
}
