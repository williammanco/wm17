// @flow

/* eslint-disable no-console */
import React from 'react'
import { render } from 'react-dom'
import settings from '../shared/settings'
import { Scene, WebGLRenderer, Clock, PerspectiveCamera } from 'three/src/Three'
import CubeSystem from './object/cubeSystem'
import ObjectSpotLight from './object/spotLight'
import { TweenMax } from 'gsap'


export default class Canvas extends React.Component {
  constructor (props, context) {
    super(props, context)
  }
  componentWillMount(){
    let width = window.innerWidth
    let height = window.innerHeight
    this.renderer = new WebGLRenderer({ antialising: true, alpha: true  })
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize( width, height  )
    this.camera =  new PerspectiveCamera( 75, width / height, 1, 10000)
    this.camera.position.x = 0
    this.camera.position.y = 0
    this.camera.position.z = 200
    // this.camera.lookAt(0, 20, 0)
    this.clock = new Clock()
    this.scene = new Scene()
    this.time = 0
    document.body.appendChild( this.renderer.domElement )
  }
  componentDidMount(){
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }
  init() {
    this.spotLight = new ObjectSpotLight()
    this.scene.add(this.spotLight)

    this.cubeSystem = []
    for(let i=0; i< 100; i++){
      this.cubeSystem[i] = new CubeSystem()
      this.scene.add(this.cubeSystem[i])
    }

    this.events()
    this.isReady = true
  }
  events(){
    const self = this
    let cameraPanRange = 1.0, cameraYawRange = cameraPanRange * 1.125
    $(window).on('mousemove touchmove', (e) => {
        const nx = e.clientX / window.innerWidth * 2 - 1
        const ny = -e.clientY / window.innerHeight * 2 + 1
        const ry = -THREE.Math.mapLinear(nx, -1, 1, cameraPanRange * -0.5, cameraPanRange * 0.5)
        const rx = THREE.Math.mapLinear(ny, -1, 1, cameraYawRange * -0.5, cameraYawRange * 0.5)
        TweenMax.to(this.camera.rotation, 2, {
          x: rx,
          y: ry,
          ease: Power4.easeOut,
        })
    })
  }
  resize() {
  }
  update(state) {
    if (!this.isReady) { return }
    let delta = this.clock.getDelta()
    this.time += 1/60
    for(let i=0; i< 100; i++){
      this.cubeSystem[i].update(this.time)
    }
    if (settings.usePostprocessing) {
    } else {
      this.renderer.render(this.scene, this.camera)
    }
  }
  render() {

    return false
  }
}