
import { Object3D, PlaneBufferGeometry, MeshBasicMaterial, Mesh } from 'three'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

export default class Sky extends Object3D {
  constructor(props) {
    super()
    const self = this
    this.geometry = new PlaneBufferGeometry( 1000, 1000 )
    this.material = new MeshBasicMaterial( { color: 0xe5e5e5 } )
    this.sky = new Mesh( this.geometry, this.material )
    this.sky.position.z = -2
    this.add( this.sky )
  }
  update(delta){
  }
}
