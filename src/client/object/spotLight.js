import { SpotLight, Object3D } from 'three'

export default class ObjectSpotLight extends Object3D{
  constructor() {
    super()
    const self = this

    let spotLight = new SpotLight( 0xffffff , .1)
    spotLight.position.set( 100, 1000, 10000 )
    spotLight.castShadow = true

    spotLight.shadow.mapSize.width = 1024
    spotLight.shadow.mapSize.height = 1024

    spotLight.shadow.camera.near = 500
    spotLight.shadow.camera.far = 4000
    spotLight.shadow.camera.fov = 30

    this.add( spotLight )
  }
}
