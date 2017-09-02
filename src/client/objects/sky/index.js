
import { Object3D, SphereBufferGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

export default class Sky extends Object3D {
  constructor(props) {
    super()
    const self = this
    this.props = props
    this.props.envMap.minFilter = THREE.LinearMipMapLinearFilter
    this.props.envMap.mapping = THREE.EquirectangularReflectionMapping
    this.props.envMap.magFilter = THREE.LinearFilter
    this.props.envMap.minFilter = THREE.LinearMipMapLinearFilter
    this.props.envMap.mapping = THREE.EquirectangularRefractionMapping
    this.geometry = new SphereBufferGeometry( 110, 32, 10 )
    this.material = new MeshBasicMaterial( { color: 0xffffff, side: DoubleSide, envMap: this.props.envMap, fog: true } )
    this.sky = new Mesh( this.geometry, this.material )
    this.sky.position.z = -2
    this.add( this.sky )
  }
  update(delta){
  }
}
