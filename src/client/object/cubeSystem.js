import {Object3D, BoxBufferGeometry, MeshLambertMaterial, Mesh } from 'three'
import utils from '../../shared/utils.js'

export default class CubeSystem extends Object3D{
  constructor() {
    super()
    const self = this

    this.geometry = new BoxBufferGeometry( utils.getRandomArbitrary(40,200) , utils.getRandomArbitrary(40,200) , utils.getRandomArbitrary(40,200)  )
    this.material = new MeshLambertMaterial( {
      color: 0xffffff
    })
    this.mesh = new Mesh( this.geometry, this.material )
    this.mesh.position.x = utils.getRandomArbitrary(-window.innerWidth/2,window.innerWidth/2)
    this.mesh.position.z = utils.getRandomArbitrary(-window.innerWidth/2,0)
    this.mesh.position.y = utils.getRandomArbitrary(-window.innerHeight/2,window.innerHeight/2)
    this.mesh.opacity = 0
    this.add(this.mesh)



  }


  update(delta) {
    this.mesh.opacity += .05
    this.mesh.rotation.x = delta*.9
    this.mesh.rotation.y = Math.sin(delta*.3)
  }
}
