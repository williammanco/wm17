varying vec2 vUv;
attribute vec2 scaleAndRotation;
attribute vec3 position;

void main() {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  mvPosition.xyz += position * scaleAndRotation.x;
  gl_Position = projectionMatrix * modelViewMatrix * mvPosition;
}
