#if NUM_DIR_LIGHTS > 0
  struct DirectionalLight {
     vec3 direction;
     vec3 color;
     int shadow;
     float shadowBias;
     float shadowRadius;
     vec2 shadowMapSize;
  };
  uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
#endif
uniform float size;
uniform float scale;
attribute float alpha;
attribute vec3 aColor;
varying vec3 vColor;
varying float vAlpha;

void main() {
  vAlpha = alpha;
  vColor = aColor;
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  gl_PointSize = (1.0 * scale) * ( 1000.0 / length( mvPosition.xyz ) );
  gl_Position = projectionMatrix * mvPosition;
}
