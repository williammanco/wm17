varying vec2 vUv;
uniform sampler2D displacementMap;
uniform float displacementBias;
uniform float displacementScale;
uniform vec2 offset;


void main() {
  vUv = uv;
  vec3 displacement = normalize( norm
    al ) * ( texture2D( displacementMap, uv * offset ).x * displacementScale + displacementBias );
  vec3 newPosition = position + normal * displacement;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
