// @flow

/* eslint-disable no-console */
import React from 'react'
import { render } from 'react-dom'
import Canvas from './canvas'

require('font-awesome/css/font-awesome.css')
require('./assets/sass/main.sass')

export default class App extends React.Component {
  constructor(){
    super()
    this.events()
  }
  componentWillMount(){
    console.log('%c |||| ', 'background: #222; color: #fff; padding: 10px 0px; font-weight: bold; line-height: 50px');
  }
  componentDidMount(){
    this.canvas.init()
    this.update()
  }
  events(){
    let self = this
    $(window).on({
      'resize' : function(){
        self.canvas.resize()
      }
    })
  }
  update() {
    this.canvas.update()
    requestAnimationFrame( this.update.bind(this) )
  }
  render() {
    return (
      <div>
        <Canvas onRef={ref => (this.canvas = ref)}/>
        <div id="text-content">
          <div className="description">
            <p>hello</p>
            <p>i’m a</p>
            <p>creative</p>
            <p>developer</p>
            <p>now at gusto</p>
          </div>
        </div>
        <div id="social">
          <a href="https://twitter.com/williammanco"><i className="fa fa-twitter"></i></a>
          <a href="https://www.linkedin.com/in/william-manco-a7aa4315/"><i className="fa fa-linkedin"></i></a>
        </div>
      </div>
    )
  }
}

render(<App />, document.getElementById('root'))
