
import { Object3D, InstancedBufferGeometry, CircleBufferGeometry, InstancedBufferAttribute, RawShaderMaterial, Mesh, DoubleSide } from 'three'
const vertexShader = require('./material.vert')
const fragmentShader = require('./material.frag')

export default class InstancedGeometry extends Object3D {
  constructor(props) {
    super()
    const self = this
    self.props = props
    let mesh
    let geometry = new InstancedBufferGeometry()
  	geometry.copy( self.props.bufferGeometry )
  	let particleCount = 50;
    let translateArray = new Float32Array( particleCount * 3 )
    for ( let i = 0, i3 = 0, l = particleCount; i < l; i ++, i3 += 3 ) {
      translateArray[ i3 + 0 ] = Math.random() * 2 - 1
      translateArray[ i3 + 1 ] = Math.random() * 2 - 1
      translateArray[ i3 + 2 ] = Math.random() * 2 - 1
    }
    geometry.addAttribute( "translate", new InstancedBufferAttribute( translateArray, 3, 1 ) )
    let material = new RawShaderMaterial( {

      uniforms: {
        time: { value: 1.0 },
        sineTime: { value: 1.0 },
        //map: { value: self.props.texture },
      },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      side: DoubleSide,
      transparent: false

    } )
    mesh = new Mesh( geometry, material )
    mesh.scale.set( 10, 10, 10 )
    console.log('mesh',mesh)
    self.add( mesh )
  }
  update(delta){
  }
}
