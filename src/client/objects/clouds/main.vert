varying vec2 vUv;
attribute vec2 aScaleAndRotation;
attribute vec3 aTranslate;

void main() {
  vUv = uv;
  vec4 mvPosition = modelViewMatrix * vec4( aTranslate, 1.0 );
  mvPosition.xyz += position * aScaleAndRotation.x;
  gl_Position = projectionMatrix * modelViewMatrix * mvPosition;
}
