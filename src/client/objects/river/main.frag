#include <common>
#include <envmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <fog_pars_fragment>
// uniform vec3 color;
void main() {
  #include <logdepthbuf_fragment>

  #include <envmap_fragment>
  gl_FragColor = vec4( 1.0,0.0,0.0, 1.0);
  #include <fog_fragment>

}
