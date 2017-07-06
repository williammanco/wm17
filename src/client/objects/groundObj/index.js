
import { Object3D, OBJLoader, Mesh } from 'three'
import settings from 'shared_path/settings'
import utils from 'shared_path/utils'
import state from 'shared_path/state'

const Obj = require('assets_path/obj/ground.obj')

export default class GroundObj extends Object3D {
  constructor() {
    super()
    var loader = new OBJLoader( manager );
    loader.load( Obj, function ( object ) {
      
      object.position.y = - 95
      this.add( object )

    }, onProgress, onError )
  }
  update(){
  }
}
