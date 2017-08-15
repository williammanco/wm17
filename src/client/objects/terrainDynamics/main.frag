uniform vec3 fogColor;
uniform float fogNear;
uniform float fogFar;
uniform bool noSolarize;

void main() {

  gl_FragColor = vec4( 0.0,0.0,0.0, 1. );

  #ifdef USE_FOG
    #ifdef USE_LOGDEPTHBUF_EXT
      float depth = gl_FragDepthEXT / gl_FragCoord.w;
    #else
      float depth = gl_FragCoord.z / gl_FragCoord.w;
    #endif
    float fogFactor = smoothstep( fogNear, fogFar, depth );
    gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
    float alphaColor = 1.0;

    if(depth > 50.0 && noSolarize != true){
      alphaColor = smoothstep( 1.0, 0.0, (depth-50.0)*0.1 );
    }
    gl_FragColor.a += smoothstep( 1.0, 0.0, alphaColor );
  #endif

}
