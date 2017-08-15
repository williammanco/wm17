
import { Object3D, MeshBasicMaterial, PlaneBufferGeometry, Mesh } from 'three'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

export default class TerrainPlane extends Object3D {
  constructor(props) {
    super()
    const self = this
    this.props = props

    this.material = new MeshBasicMaterial({ color: 0x000000 } )
  	this.geometry = new PlaneBufferGeometry( 120, 120, 1, 1 )
  	this.mesh = new Mesh( this.geometry, this.material )
  	this.mesh.rotation.x = -Math.PI / 2
  	this.mesh.position.y = -5

  	this.add( self.mesh )
    self.updateReady = true
  }
}
