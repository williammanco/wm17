
import { Object3D, Vector3, Quaternion, MeshPhongMaterial } from 'three'

require( 'three-instanced-mesh' )(THREE)

export default class InstancedMesh extends Object3D {
  constructor(props) {
    super()
    const self = this
    self.props = props
    let material = new MeshPhongMaterial({
      color  : 0xff0000
    })

    //the instance group
    self.cluster = new THREE.InstancedMesh( this.props.bufferGeometry , material , function( o , oi ){

						o.position.x = Math.random() * 10000 - 5000;
						o.position.y = Math.random() * 10000 - 5000;
						o.position.z = Math.random() * 10000 - 5000;

						o.rotation.x = Math.random() * 2 * Math.PI;
						o.rotation.y = Math.random() * 2 * Math.PI;
						o.scale.x = o.scale.y = o.scale.z = Math.random() * 50 + 100;

					},

					100,
					true
				);



    let _v3 = new Vector3()
    let _q = new Quaternion()

    for ( let i ; i < 10000 ; i ++ ) {

      self.cluster.setQuaternionAt( i , _q )
      self.cluster.setPositionAt( i , v3.set( Math.random() , Math.random(), Math.random() ) );
      self.cluster.setScaleAt( i , v3.set(1,1,1) );

    }
    self.add(self.cluster)

  }
  update(delta){
  }
}
