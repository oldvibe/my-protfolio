"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[813],{591:(e,t,n)=>{let r,i;function o(){return(o=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)({}).hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e}).apply(null,arguments)}n.d(t,{N:()=>T});var s=n(2115),a=n(5269),l=n(5860);let u=new a.NRn,c=new a.Pq0;class f extends a.CmU{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new a.qtW([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new a.qtW([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,n=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),n.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let n=new a.LuO(t,6,1);return this.setAttribute("instanceStart",new a.eHs(n,3,0)),this.setAttribute("instanceEnd",new a.eHs(n,3,3)),this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e,t=3){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));let r=new a.LuO(n,2*t,1);return this.setAttribute("instanceColorStart",new a.eHs(r,t,0)),this.setAttribute("instanceColorEnd",new a.eHs(r,t,t)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new a.XJ7(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new a.NRn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),u.setFromBufferAttribute(t),this.boundingBox.union(u))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new a.iyt),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let n=this.boundingSphere.center;this.boundingBox.getCenter(n);let r=0;for(let i=0,o=e.count;i<o;i++)c.fromBufferAttribute(e,i),r=Math.max(r,n.distanceToSquared(c)),c.fromBufferAttribute(t,i),r=Math.max(r,n.distanceToSquared(c));this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}applyMatrix(e){return console.warn("THREE.LineSegmentsGeometry: applyMatrix() has been renamed to applyMatrix4()."),this.applyMatrix4(e)}}var d=n(9625);let p=parseInt(a.sPf.replace(/\D+/g,""));class h extends a.BKk{constructor(e){super({type:"LineMaterial",uniforms:a.LlO.clone(a.LlO.merge([d.UniformsLib.common,d.UniformsLib.fog,{worldUnits:{value:1},linewidth:{value:1},resolution:{value:new a.I9Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}}])),vertexShader:`
				#include <common>
				#include <fog_pars_vertex>
				#include <logdepthbuf_pars_vertex>
				#include <clipping_planes_pars_vertex>

				uniform float linewidth;
				uniform vec2 resolution;

				attribute vec3 instanceStart;
				attribute vec3 instanceEnd;

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
						attribute vec4 instanceColorStart;
						attribute vec4 instanceColorEnd;
					#else
						varying vec3 vLineColor;
						attribute vec3 instanceColorStart;
						attribute vec3 instanceColorEnd;
					#endif
				#endif

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#ifdef USE_DASH

					uniform float dashScale;
					attribute float instanceDistanceStart;
					attribute float instanceDistanceEnd;
					varying float vLineDistance;

				#endif

				void trimSegment( const in vec4 start, inout vec4 end ) {

					// trim end segment so it terminates between the camera plane and the near plane

					// conservative estimate of the near plane
					float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
					float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
					float nearEstimate = - 0.5 * b / a;

					float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

					end.xyz = mix( start.xyz, end.xyz, alpha );

				}

				void main() {

					#ifdef USE_COLOR

						vLineColor = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

					#endif

					#ifdef USE_DASH

						vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
						vUv = uv;

					#endif

					float aspect = resolution.x / resolution.y;

					// camera space
					vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
					vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

					#ifdef WORLD_UNITS

						worldStart = start.xyz;
						worldEnd = end.xyz;

					#else

						vUv = uv;

					#endif

					// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
					// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
					// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
					// perhaps there is a more elegant solution -- WestLangley

					bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

					if ( perspective ) {

						if ( start.z < 0.0 && end.z >= 0.0 ) {

							trimSegment( start, end );

						} else if ( end.z < 0.0 && start.z >= 0.0 ) {

							trimSegment( end, start );

						}

					}

					// clip space
					vec4 clipStart = projectionMatrix * start;
					vec4 clipEnd = projectionMatrix * end;

					// ndc space
					vec3 ndcStart = clipStart.xyz / clipStart.w;
					vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

					// direction
					vec2 dir = ndcEnd.xy - ndcStart.xy;

					// account for clip-space aspect ratio
					dir.x *= aspect;
					dir = normalize( dir );

					#ifdef WORLD_UNITS

						// get the offset direction as perpendicular to the view vector
						vec3 worldDir = normalize( end.xyz - start.xyz );
						vec3 offset;
						if ( position.y < 0.5 ) {

							offset = normalize( cross( start.xyz, worldDir ) );

						} else {

							offset = normalize( cross( end.xyz, worldDir ) );

						}

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						float forwardOffset = dot( worldDir, vec3( 0.0, 0.0, 1.0 ) );

						// don't extend the line if we're rendering dashes because we
						// won't be rendering the endcaps
						#ifndef USE_DASH

							// extend the line bounds to encompass  endcaps
							start.xyz += - worldDir * linewidth * 0.5;
							end.xyz += worldDir * linewidth * 0.5;

							// shift the position of the quad so it hugs the forward edge of the line
							offset.xy -= dir * forwardOffset;
							offset.z += 0.5;

						#endif

						// endcaps
						if ( position.y > 1.0 || position.y < 0.0 ) {

							offset.xy += dir * 2.0 * forwardOffset;

						}

						// adjust for linewidth
						offset *= linewidth * 0.5;

						// set the world position
						worldPos = ( position.y < 0.5 ) ? start : end;
						worldPos.xyz += offset;

						// project the worldpos
						vec4 clip = projectionMatrix * worldPos;

						// shift the depth of the projected points so the line
						// segments overlap neatly
						vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
						clip.z = clipPose.z * clip.w;

					#else

						vec2 offset = vec2( dir.y, - dir.x );
						// undo aspect ratio adjustment
						dir.x /= aspect;
						offset.x /= aspect;

						// sign flip
						if ( position.x < 0.0 ) offset *= - 1.0;

						// endcaps
						if ( position.y < 0.0 ) {

							offset += - dir;

						} else if ( position.y > 1.0 ) {

							offset += dir;

						}

						// adjust for linewidth
						offset *= linewidth;

						// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
						offset /= resolution.y;

						// select end
						vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

						// back to clip space
						offset *= clip.w;

						clip.xy += offset;

					#endif

					gl_Position = clip;

					vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

					#include <logdepthbuf_vertex>
					#include <clipping_planes_vertex>
					#include <fog_vertex>

				}
			`,fragmentShader:`
				uniform vec3 diffuse;
				uniform float opacity;
				uniform float linewidth;

				#ifdef USE_DASH

					uniform float dashOffset;
					uniform float dashSize;
					uniform float gapSize;

				#endif

				varying float vLineDistance;

				#ifdef WORLD_UNITS

					varying vec4 worldPos;
					varying vec3 worldStart;
					varying vec3 worldEnd;

					#ifdef USE_DASH

						varying vec2 vUv;

					#endif

				#else

					varying vec2 vUv;

				#endif

				#include <common>
				#include <fog_pars_fragment>
				#include <logdepthbuf_pars_fragment>
				#include <clipping_planes_pars_fragment>

				#ifdef USE_COLOR
					#ifdef USE_LINE_COLOR_ALPHA
						varying vec4 vLineColor;
					#else
						varying vec3 vLineColor;
					#endif
				#endif

				vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

					float mua;
					float mub;

					vec3 p13 = p1 - p3;
					vec3 p43 = p4 - p3;

					vec3 p21 = p2 - p1;

					float d1343 = dot( p13, p43 );
					float d4321 = dot( p43, p21 );
					float d1321 = dot( p13, p21 );
					float d4343 = dot( p43, p43 );
					float d2121 = dot( p21, p21 );

					float denom = d2121 * d4343 - d4321 * d4321;

					float numer = d1343 * d4321 - d1321 * d4343;

					mua = numer / denom;
					mua = clamp( mua, 0.0, 1.0 );
					mub = ( d1343 + d4321 * ( mua ) ) / d4343;
					mub = clamp( mub, 0.0, 1.0 );

					return vec2( mua, mub );

				}

				void main() {

					#include <clipping_planes_fragment>

					#ifdef USE_DASH

						if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

						if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

					#endif

					float alpha = opacity;

					#ifdef WORLD_UNITS

						// Find the closest points on the view ray and the line segment
						vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
						vec3 lineDir = worldEnd - worldStart;
						vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

						vec3 p1 = worldStart + lineDir * params.x;
						vec3 p2 = rayEnd * params.y;
						vec3 delta = p1 - p2;
						float len = length( delta );
						float norm = len / linewidth;

						#ifndef USE_DASH

							#ifdef USE_ALPHA_TO_COVERAGE

								float dnorm = fwidth( norm );
								alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

							#else

								if ( norm > 0.5 ) {

									discard;

								}

							#endif

						#endif

					#else

						#ifdef USE_ALPHA_TO_COVERAGE

							// artifacts appear on some hardware if a derivative is taken within a conditional
							float a = vUv.x;
							float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
							float len2 = a * a + b * b;
							float dlen = fwidth( len2 );

							if ( abs( vUv.y ) > 1.0 ) {

								alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

							}

						#else

							if ( abs( vUv.y ) > 1.0 ) {

								float a = vUv.x;
								float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
								float len2 = a * a + b * b;

								if ( len2 > 1.0 ) discard;

							}

						#endif

					#endif

					vec4 diffuseColor = vec4( diffuse, alpha );
					#ifdef USE_COLOR
						#ifdef USE_LINE_COLOR_ALPHA
							diffuseColor *= vLineColor;
						#else
							diffuseColor.rgb *= vLineColor;
						#endif
					#endif

					#include <logdepthbuf_fragment>

					gl_FragColor = diffuseColor;

					#include <tonemapping_fragment>
					#include <${p>=154?"colorspace_fragment":"encodings_fragment"}>
					#include <fog_fragment>
					#include <premultiplied_alpha_fragment>

				}
			`,clipping:!0}),this.isLineMaterial=!0,this.onBeforeCompile=function(){this.transparent?this.defines.USE_LINE_COLOR_ALPHA="1":delete this.defines.USE_LINE_COLOR_ALPHA},Object.defineProperties(this,{color:{enumerable:!0,get:function(){return this.uniforms.diffuse.value},set:function(e){this.uniforms.diffuse.value=e}},worldUnits:{enumerable:!0,get:function(){return"WORLD_UNITS"in this.defines},set:function(e){!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}},linewidth:{enumerable:!0,get:function(){return this.uniforms.linewidth.value},set:function(e){this.uniforms.linewidth.value=e}},dashed:{enumerable:!0,get:function(){return"USE_DASH"in this.defines},set(e){!!e!="USE_DASH"in this.defines&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}},dashScale:{enumerable:!0,get:function(){return this.uniforms.dashScale.value},set:function(e){this.uniforms.dashScale.value=e}},dashSize:{enumerable:!0,get:function(){return this.uniforms.dashSize.value},set:function(e){this.uniforms.dashSize.value=e}},dashOffset:{enumerable:!0,get:function(){return this.uniforms.dashOffset.value},set:function(e){this.uniforms.dashOffset.value=e}},gapSize:{enumerable:!0,get:function(){return this.uniforms.gapSize.value},set:function(e){this.uniforms.gapSize.value=e}},opacity:{enumerable:!0,get:function(){return this.uniforms.opacity.value},set:function(e){this.uniforms.opacity.value=e}},resolution:{enumerable:!0,get:function(){return this.uniforms.resolution.value},set:function(e){this.uniforms.resolution.value.copy(e)}},alphaToCoverage:{enumerable:!0,get:function(){return"USE_ALPHA_TO_COVERAGE"in this.defines},set:function(e){!!e!="USE_ALPHA_TO_COVERAGE"in this.defines&&(this.needsUpdate=!0),!0===e?(this.defines.USE_ALPHA_TO_COVERAGE="",this.extensions.derivatives=!0):(delete this.defines.USE_ALPHA_TO_COVERAGE,this.extensions.derivatives=!1)}}}),this.setValues(e)}}let m=p>=125?"uv1":"uv2",v=new a.IUQ,y=new a.Pq0,b=new a.Pq0,w=new a.IUQ,g=new a.IUQ,S=new a.IUQ,x=new a.Pq0,E=new a.kn4,_=new a.cZY,L=new a.Pq0,A=new a.NRn,z=new a.iyt,O=new a.IUQ;function U(e,t,n){return O.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),O.multiplyScalar(1/O.w),O.x=i/n.width,O.y=i/n.height,O.applyMatrix4(e.projectionMatrixInverse),O.multiplyScalar(1/O.w),Math.abs(Math.max(O.x,O.y))}class C extends a.eaF{constructor(e=new f,t=new h({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,n=e.attributes.instanceEnd,r=new Float32Array(2*t.count);for(let e=0,i=0,o=t.count;e<o;e++,i+=2)y.fromBufferAttribute(t,e),b.fromBufferAttribute(n,e),r[i]=0===i?0:r[i-1],r[i+1]=r[i]+y.distanceTo(b);let i=new a.LuO(r,2,1);return e.setAttribute("instanceDistanceStart",new a.eHs(i,1,0)),e.setAttribute("instanceDistanceEnd",new a.eHs(i,1,1)),this}raycast(e,t){let n,o,s=this.material.worldUnits,l=e.camera;null!==l||s||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let u=void 0!==e.params.Line2&&e.params.Line2.threshold||0;r=e.ray;let c=this.matrixWorld,f=this.geometry,d=this.material;if(i=d.linewidth+u,null===f.boundingSphere&&f.computeBoundingSphere(),z.copy(f.boundingSphere).applyMatrix4(c),s)n=.5*i;else{let e=Math.max(l.near,z.distanceToPoint(r.origin));n=U(l,e,d.resolution)}if(z.radius+=n,!1!==r.intersectsSphere(z)){if(null===f.boundingBox&&f.computeBoundingBox(),A.copy(f.boundingBox).applyMatrix4(c),s)o=.5*i;else{let e=Math.max(l.near,A.distanceToPoint(r.origin));o=U(l,e,d.resolution)}A.expandByScalar(o),!1!==r.intersectsBox(A)&&(s?function(e,t){let n=e.matrixWorld,o=e.geometry,s=o.attributes.instanceStart,l=o.attributes.instanceEnd,u=Math.min(o.instanceCount,s.count);for(let o=0;o<u;o++){_.start.fromBufferAttribute(s,o),_.end.fromBufferAttribute(l,o),_.applyMatrix4(n);let u=new a.Pq0,c=new a.Pq0;r.distanceSqToSegment(_.start,_.end,c,u),c.distanceTo(u)<.5*i&&t.push({point:c,pointOnLine:u,distance:r.origin.distanceTo(c),object:e,face:null,faceIndex:o,uv:null,[m]:null})}}(this,t):function(e,t,n){let o=t.projectionMatrix,s=e.material.resolution,l=e.matrixWorld,u=e.geometry,c=u.attributes.instanceStart,f=u.attributes.instanceEnd,d=Math.min(u.instanceCount,c.count),p=-t.near;r.at(1,S),S.w=1,S.applyMatrix4(t.matrixWorldInverse),S.applyMatrix4(o),S.multiplyScalar(1/S.w),S.x*=s.x/2,S.y*=s.y/2,S.z=0,x.copy(S),E.multiplyMatrices(t.matrixWorldInverse,l);for(let t=0;t<d;t++){if(w.fromBufferAttribute(c,t),g.fromBufferAttribute(f,t),w.w=1,g.w=1,w.applyMatrix4(E),g.applyMatrix4(E),w.z>p&&g.z>p)continue;if(w.z>p){let e=w.z-g.z,t=(w.z-p)/e;w.lerp(g,t)}else if(g.z>p){let e=g.z-w.z,t=(g.z-p)/e;g.lerp(w,t)}w.applyMatrix4(o),g.applyMatrix4(o),w.multiplyScalar(1/w.w),g.multiplyScalar(1/g.w),w.x*=s.x/2,w.y*=s.y/2,g.x*=s.x/2,g.y*=s.y/2,_.start.copy(w),_.start.z=0,_.end.copy(g),_.end.z=0;let u=_.closestPointToPointParameter(x,!0);_.at(u,L);let d=a.cj9.lerp(w.z,g.z,u),h=d>=-1&&d<=1,v=x.distanceTo(L)<.5*i;if(h&&v){_.start.fromBufferAttribute(c,t),_.end.fromBufferAttribute(f,t),_.start.applyMatrix4(l),_.end.applyMatrix4(l);let i=new a.Pq0,o=new a.Pq0;r.distanceSqToSegment(_.start,_.end,o,i),n.push({point:o,pointOnLine:i,distance:r.origin.distanceTo(o),object:e,face:null,faceIndex:t,uv:null,[m]:null})}}}(this,l,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(v),this.material.uniforms.resolution.value.set(v.z,v.w))}}class M extends f{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){let t=e.length-3,n=new Float32Array(2*t);for(let r=0;r<t;r+=3)n[2*r]=e[r],n[2*r+1]=e[r+1],n[2*r+2]=e[r+2],n[2*r+3]=e[r+3],n[2*r+4]=e[r+4],n[2*r+5]=e[r+5];return super.setPositions(n),this}setColors(e,t=3){let n=e.length-t,r=new Float32Array(2*n);if(3===t)for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5];else for(let i=0;i<n;i+=t)r[2*i]=e[i],r[2*i+1]=e[i+1],r[2*i+2]=e[i+2],r[2*i+3]=e[i+3],r[2*i+4]=e[i+4],r[2*i+5]=e[i+5],r[2*i+6]=e[i+6],r[2*i+7]=e[i+7];return super.setColors(r,t),this}fromLine(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}}class P extends C{constructor(e=new M,t=new h({color:0xffffff*Math.random()})){super(e,t),this.isLine2=!0,this.type="Line2"}}let T=s.forwardRef(function({points:e,color:t=0xffffff,vertexColors:n,linewidth:r,lineWidth:i,segments:u,dashed:c,...d},p){var m,v;let y=(0,l.D)(e=>e.size),b=s.useMemo(()=>u?new C:new P,[u]),[w]=s.useState(()=>new h),g=(null==n||null==(m=n[0])?void 0:m.length)===4?4:3,S=s.useMemo(()=>{let r=u?new f:new M,i=e.map(e=>{let t=Array.isArray(e);return e instanceof a.Pq0||e instanceof a.IUQ?[e.x,e.y,e.z]:e instanceof a.I9Y?[e.x,e.y,0]:t&&3===e.length?[e[0],e[1],e[2]]:t&&2===e.length?[e[0],e[1],0]:e});if(r.setPositions(i.flat()),n){t=0xffffff;let e=n.map(e=>e instanceof a.Q1f?e.toArray():e);r.setColors(e.flat(),g)}return r},[e,u,n,g]);return s.useLayoutEffect(()=>{b.computeLineDistances()},[e,b]),s.useLayoutEffect(()=>{c?w.defines.USE_DASH="":delete w.defines.USE_DASH,w.needsUpdate=!0},[c,w]),s.useEffect(()=>()=>{S.dispose(),w.dispose()},[S]),s.createElement("primitive",o({object:b,ref:p},d),s.createElement("primitive",{object:S,attach:"geometry"}),s.createElement("primitive",o({object:w,attach:"material",color:t,vertexColors:!!n,resolution:[y.width,y.height],linewidth:null!=(v=null!=r?r:i)?v:1,dashed:c,transparent:4===g},d)))})},916:(e,t,n)=>{n.d(t,{h:()=>l});var r=n(2115),i=n(9339);let o=e=>{let t,n=new Set,r=(e,r)=>{let i="function"==typeof e?e(t):e;if(!Object.is(i,t)){let e=t;t=(null!=r?r:"object"!=typeof i||null===i)?i:Object.assign({},t,i),n.forEach(n=>n(t,e))}},i=()=>t,o={setState:r,getState:i,getInitialState:()=>s,subscribe:e=>(n.add(e),()=>n.delete(e))},s=t=e(r,i,o);return o},{useSyncExternalStoreWithSelector:s}=i,a=(e,t)=>{let n=e?o(e):o,i=(e,i=t)=>(function(e,t=e=>e,n){let i=s(e.subscribe,e.getState,e.getInitialState,t,n);return r.useDebugValue(i),i})(n,e,i);return Object.assign(i,n),i},l=(e,t)=>e?a(e,t):a},4400:(e,t,n)=>{n.d(t,{Af:()=>u,Go:()=>h,Nz:()=>s,u5:()=>c,y3:()=>p});var r,i,o=n(2115);function s(e,t,n){if(!e)return;if(!0===n(e))return e;let r=t?e.return:e.child;for(;r;){let e=s(r,t,n);if(e)return e;r=t?null:r.sibling}}function a(e){try{return Object.defineProperties(e,{_currentRenderer:{get:()=>null,set(){}},_currentRenderer2:{get:()=>null,set(){}}})}catch(t){return e}}"u">typeof window&&((null==(r=window.document)?void 0:r.createElement)||(null==(i=window.navigator)?void 0:i.product)==="ReactNative")?o.useLayoutEffect:o.useEffect;let l=a(o.createContext(null));class u extends o.Component{render(){return o.createElement(l.Provider,{value:this._reactInternals},this.props.children)}}function c(){let e=o.useContext(l);if(null===e)throw Error("its-fine: useFiber must be called within a <FiberProvider />!");let t=o.useId();return o.useMemo(()=>{for(let n of[e,null==e?void 0:e.alternate]){if(!n)continue;let e=s(n,!1,e=>{let n=e.memoizedState;for(;n;){if(n.memoizedState===t)return!0;n=n.next}});if(e)return e}},[e,t])}let f=Symbol.for("react.context"),d=e=>null!==e&&"object"==typeof e&&"$$typeof"in e&&e.$$typeof===f;function p(){let e=function(){let e=c(),[t]=o.useState(()=>new Map);t.clear();let n=e;for(;n;){let e=n.type;d(e)&&e!==l&&!t.has(e)&&t.set(e,o.use(a(e))),n=n.return}return t}();return o.useMemo(()=>Array.from(e.keys()).reduce((t,n)=>r=>o.createElement(t,null,o.createElement(n.Provider,{...r,value:e.get(n)})),e=>o.createElement(u,{...e})),[e])}function h(){if(!o.Activity)throw Error("its-fine: useActivityBridge requires React 19.2 or later!");let e=c(),[t]=o.useState(()=>{let t,n=[],r=!1;s(e,!0,e=>{var t,i;if(e.elementType===o.Activity){let r=(null==(t=e.child)?void 0:t.tag)===22?e.child.stateNode:null;if("number"!=typeof(null==r?void 0:r._visibility))throw Error("its-fine: unsupported React Activity internals!");n.push(r)}else 22===e.tag&&(null==(i=e.return)?void 0:i.elementType)!==o.Activity&&(r=!0)});let i="hidden",a=new Set,l={mounted:!1,connected:!1,subscribe:e=>(a.add(e),()=>{a.delete(e)}),sync(e){l.mounted&&!l.connected&&r&&n.length>0?t||(t=function(e){if("function"==typeof requestAnimationFrame){let t=requestAnimationFrame(e);return()=>cancelAnimationFrame(t)}let t=setTimeout(e,16);return()=>clearTimeout(t)}(()=>{t=void 0,l.sync(!0)})):(null==t||t(),t=void 0);let o=i;if(l.mounted?l.connected?o="visible":e&&(o=n.every(e=>(1&e._visibility)!=0)?"visible":"hidden"):o="hidden",i!==o)for(let e of(i=o,a))e()},Bridge:({children:e})=>o.createElement(o.Activity,{mode:o.useSyncExternalStore(l.subscribe,()=>i,()=>"hidden")},e)};return l});return o.useInsertionEffect(()=>(t.mounted=!0,queueMicrotask(()=>t.sync(!1)),()=>{t.mounted=!1,queueMicrotask(()=>t.sync(!1))}),[t]),o.useLayoutEffect(()=>(t.connected=!0,t.sync(!1),()=>{t.connected=!1,t.sync(!0)}),[t]),t.Bridge}},5538:(e,t,n)=>{var r=n(2115),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},o=r.useState,s=r.useEffect,a=r.useLayoutEffect,l=r.useDebugValue;function u(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!i(e,n)}catch(e){return!0}}var c="u"<typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var n=t(),r=o({inst:{value:n,getSnapshot:t}}),i=r[0].inst,c=r[1];return a(function(){i.value=n,i.getSnapshot=t,u(i)&&c({inst:i})},[e,n,t]),s(function(){return u(i)&&c({inst:i}),e(function(){u(i)&&c({inst:i})})},[e]),l(n),n};t.useSyncExternalStore=void 0!==r.useSyncExternalStore?r.useSyncExternalStore:c},6275:(e,t,n)=>{n.d(t,{Hl:()=>f});var r=n(5860),i=n(2115),o=n(9625);function s(e,t){let n;return(...r)=>{window.clearTimeout(n),n=window.setTimeout(()=>e(...r),t)}}let a=["x","y","top","bottom","left","right","width","height"];var l=n(4400),u=n(5155);function c({ref:e,children:t,fallback:n,resize:l,style:f,gl:d,events:p=r.f,eventSource:h,eventPrefix:m,shadows:v,linear:y,flat:b,legacy:w,orthographic:g,frameloop:S,dpr:x,performance:E,raycaster:_,camera:L,scene:A,onPointerMissed:z,onCreated:O,...U}){i.useMemo(()=>(0,r.e)(o),[]);let C=(0,r.u)(),[M,P]=function({debounce:e,scroll:t,polyfill:n,offsetSize:r}={debounce:0,scroll:!1,offsetSize:!1}){var o,l,u;let c=n||("u"<typeof window?class{}:window.ResizeObserver);if(!c)throw Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");let[f,d]=(0,i.useState)({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),p=(0,i.useRef)({element:null,scrollContainers:null,resizeObserver:null,lastBounds:f,orientationHandler:null}),h=e?"number"==typeof e?e:e.scroll:null,m=e?"number"==typeof e?e:e.resize:null,v=(0,i.useRef)(!1);(0,i.useEffect)(()=>(v.current=!0,()=>void(v.current=!1)));let[y,b,w]=(0,i.useMemo)(()=>{let e=()=>{let e,t;if(!p.current.element)return;let{left:n,top:i,width:o,height:s,bottom:l,right:u,x:c,y:f}=p.current.element.getBoundingClientRect(),h={left:n,top:i,width:o,height:s,bottom:l,right:u,x:c,y:f};p.current.element instanceof HTMLElement&&r&&(h.height=p.current.element.offsetHeight,h.width=p.current.element.offsetWidth),Object.freeze(h),v.current&&(e=p.current.lastBounds,t=h,!a.every(n=>e[n]===t[n]))&&d(p.current.lastBounds=h)};return[e,m?s(e,m):e,h?s(e,h):e]},[d,r,h,m]);function g(){p.current.scrollContainers&&(p.current.scrollContainers.forEach(e=>e.removeEventListener("scroll",w,!0)),p.current.scrollContainers=null),p.current.resizeObserver&&(p.current.resizeObserver.disconnect(),p.current.resizeObserver=null),p.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",p.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",p.current.orientationHandler))}function S(){p.current.element&&(p.current.resizeObserver=new c(w),p.current.resizeObserver.observe(p.current.element),t&&p.current.scrollContainers&&p.current.scrollContainers.forEach(e=>e.addEventListener("scroll",w,{capture:!0,passive:!0})),p.current.orientationHandler=()=>{w()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",p.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",p.current.orientationHandler))}return o=w,l=!!t,(0,i.useEffect)(()=>{if(l)return window.addEventListener("scroll",o,{capture:!0,passive:!0}),()=>void window.removeEventListener("scroll",o,!0)},[o,l]),u=b,(0,i.useEffect)(()=>(window.addEventListener("resize",u),()=>void window.removeEventListener("resize",u)),[u]),(0,i.useEffect)(()=>{g(),S()},[t,w,b]),(0,i.useEffect)(()=>g,[]),[e=>{e&&e!==p.current.element&&(g(),p.current.element=e,p.current.scrollContainers=function e(t){let n=[];if(!t||t===document.body)return n;let{overflow:r,overflowX:i,overflowY:o}=window.getComputedStyle(t);return[r,i,o].some(e=>"auto"===e||"scroll"===e)&&n.push(t),[...n,...e(t.parentElement)]}(e),S())},f,y]}({scroll:!0,debounce:{scroll:50,resize:0},...l}),T=i.useRef(null),j=i.useRef(null);i.useImperativeHandle(e,()=>T.current);let R=(0,r.a)(z),B=i.useCallback(e=>null==R.current?void 0:R.current(e),[R]),[D,I]=i.useState(!1),[H,k]=i.useState(!1);if(D)throw D;if(H)throw H;let N=i.useRef(null),[q,F]=(0,r.b)(),W=i.useRef(null),G=()=>h?(0,r.i)(h)?h.current:h:j.current;i.useInsertionEffect(()=>()=>{let e=N.current;N.current=null,null==e||e.unmount()},[]),(0,r.c)(()=>{let e=T.current;P.width>0&&P.height>0&&e&&(N.current||(N.current=(0,r.d)(e)),N.current.configure({gl:d,scene:A,events:p,shadows:v,linear:y,flat:b,legacy:w,orthographic:g,frameloop:S,dpr:x,performance:E,raycaster:_,camera:L,size:P,onPointerMissed:B,onCreated:e=>{var t;W.current=e,null==e.events.connect||e.events.connect(null!=(t=G())?t:j.current),m&&e.setEvents({compute:(e,t)=>{let n=e[m+"X"],r=e[m+"Y"];t.pointer.set(n/t.size.width*2-1,-(2*(r/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),null==O||O(e)}}).catch(k),"fulfilled"===N.current.ready.status?N.current.render((0,u.jsx)(C,{children:(0,u.jsx)(r.E,{set:k,children:(0,u.jsx)(i.Suspense,{fallback:(0,u.jsx)(r.B,{set:I}),children:null!=t?t:null})})})):"pending"===N.current.ready.status&&F(N.current.ready))}),i.useEffect(()=>{var e;let t=null==(e=W.current)?void 0:e.get(),n=G();t&&n&&t.events.connected!==n&&(null==t.events.connect||t.events.connect(n))}),i.useEffect(()=>{let e=T.current;return()=>{var t;e.isConnected||null==(t=N.current)||t.unmount()}},[]);let V=h?"none":"auto";return(0,u.jsxs)("div",{ref:j,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:V,...f},...U,children:[(0,u.jsx)("div",{ref:M,style:{width:"100%",height:"100%"},children:(0,u.jsx)("canvas",{ref:T,style:{display:"block"},children:n})}),q]})}function f(e){return(0,u.jsx)(l.Af,{children:(0,u.jsx)(c,{...e})})}n(8745)},7815:(e,t,n)=>{n.d(t,{n:()=>s});var r=n(2115),i=n(5860),o=n(5269);let s=r.forwardRef(({children:e,enabled:t=!0,speed:n=1,rotationIntensity:s=1,floatIntensity:a=1,floatingRange:l=[-.1,.1],autoInvalidate:u=!1,...c},f)=>{let d=r.useRef(null);r.useImperativeHandle(f,()=>d.current,[]);let p=r.useRef(1e4*Math.random());return(0,i.F)(e=>{var r,i;if(!t||0===n)return;u&&e.invalidate();let c=p.current+e.clock.elapsedTime;d.current.rotation.x=Math.cos(c/4*n)/8*s,d.current.rotation.y=Math.sin(c/4*n)/8*s,d.current.rotation.z=Math.sin(c/4*n)/20*s;let f=Math.sin(c/4*n)/10;f=o.cj9.mapLinear(f,-.1,.1,null!=(r=null==l?void 0:l[0])?r:-.1,null!=(i=null==l?void 0:l[1])?i:.1),d.current.position.y=f*a,d.current.updateMatrix()}),r.createElement("group",c,r.createElement("group",{ref:d,matrixAutoUpdate:!1},e))})},7930:(e,t)=>{function n(e,t){var n=e.length;for(e.push(t);0<n;){var r=n-1>>>1,i=e[r];if(0<o(i,t))e[r]=t,e[n]=i,n=r;else break}}function r(e){return 0===e.length?null:e[0]}function i(e){if(0===e.length)return null;var t=e[0],n=e.pop();if(n!==t){e[0]=n;for(var r=0,i=e.length,s=i>>>1;r<s;){var a=2*(r+1)-1,l=e[a],u=a+1,c=e[u];if(0>o(l,n))u<i&&0>o(c,l)?(e[r]=c,e[u]=n,r=u):(e[r]=l,e[a]=n,r=a);else if(u<i&&0>o(c,n))e[r]=c,e[u]=n,r=u;else break}}return t}function o(e,t){var n=e.sortIndex-t.sortIndex;return 0!==n?n:e.id-t.id}if(t.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var s,a=performance;t.unstable_now=function(){return a.now()}}else{var l=Date,u=l.now();t.unstable_now=function(){return l.now()-u}}var c=[],f=[],d=1,p=null,h=3,m=!1,v=!1,y=!1,b=!1,w="function"==typeof setTimeout?setTimeout:null,g="function"==typeof clearTimeout?clearTimeout:null,S="u">typeof setImmediate?setImmediate:null;function x(e){for(var t=r(f);null!==t;){if(null===t.callback)i(f);else if(t.startTime<=e)i(f),t.sortIndex=t.expirationTime,n(c,t);else break;t=r(f)}}function E(e){if(y=!1,x(e),!v)if(null!==r(c))v=!0,_||(_=!0,s());else{var t=r(f);null!==t&&P(E,t.startTime-e)}}var _=!1,L=-1,A=5,z=-1;function O(){return!!b||!(t.unstable_now()-z<A)}function U(){if(b=!1,_){var e=t.unstable_now();z=e;var n=!0;try{e:{v=!1,y&&(y=!1,g(L),L=-1),m=!0;var o=h;try{t:{for(x(e),p=r(c);null!==p&&!(p.expirationTime>e&&O());){var a=p.callback;if("function"==typeof a){p.callback=null,h=p.priorityLevel;var l=a(p.expirationTime<=e);if(e=t.unstable_now(),"function"==typeof l){p.callback=l,x(e),n=!0;break t}p===r(c)&&i(c),x(e)}else i(c);p=r(c)}if(null!==p)n=!0;else{var u=r(f);null!==u&&P(E,u.startTime-e),n=!1}}break e}finally{p=null,h=o,m=!1}}}finally{n?s():_=!1}}}if("function"==typeof S)s=function(){S(U)};else if("u">typeof MessageChannel){var C=new MessageChannel,M=C.port2;C.port1.onmessage=U,s=function(){M.postMessage(null)}}else s=function(){w(U,0)};function P(e,n){L=w(function(){e(t.unstable_now())},n)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):A=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return h},t.unstable_next=function(e){switch(h){case 1:case 2:case 3:var t=3;break;default:t=h}var n=h;h=t;try{return e()}finally{h=n}},t.unstable_requestPaint=function(){b=!0},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var n=h;h=e;try{return t()}finally{h=n}},t.unstable_scheduleCallback=function(e,i,o){var a=t.unstable_now();switch(o="object"==typeof o&&null!==o&&"number"==typeof(o=o.delay)&&0<o?a+o:a,e){case 1:var l=-1;break;case 2:l=250;break;case 5:l=0x3fffffff;break;case 4:l=1e4;break;default:l=5e3}return l=o+l,e={id:d++,callback:i,priorityLevel:e,startTime:o,expirationTime:l,sortIndex:-1},o>a?(e.sortIndex=o,n(f,e),null===r(c)&&e===r(f)&&(y?(g(L),L=-1):y=!0,P(E,o-a))):(e.sortIndex=l,n(c,e),v||m||(v=!0,_||(_=!0,s()))),e},t.unstable_shouldYield=O,t.unstable_wrapCallback=function(e){var t=h;return function(){var n=h;h=t;try{return e.apply(this,arguments)}finally{h=n}}}},8039:(e,t,n)=>{e.exports=n(5538)},8745:(e,t,n)=>{e.exports=n(7930)},9326:(e,t,n)=>{n.d(t,{DY:()=>s,IU:()=>l,uv:()=>a});let r=[];function i(e,t,n=(e,t)=>e===t){if(e===t)return!0;if(!e||!t)return!1;let r=e.length;if(t.length!==r)return!1;for(let i=0;i<r;i++)if(!n(e[i],t[i]))return!1;return!0}function o(e,t=null,n=!1,s={}){for(let o of(null===t&&(t=[e]),r))if(i(t,o.keys,o.equal)){if(n)return;if(Object.prototype.hasOwnProperty.call(o,"error"))throw o.error;if(Object.prototype.hasOwnProperty.call(o,"response"))return s.lifespan&&s.lifespan>0&&(o.timeout&&clearTimeout(o.timeout),o.timeout=setTimeout(o.remove,s.lifespan)),o.response;if(!n)throw o.promise}let a={keys:t,equal:s.equal,remove:()=>{let e=r.indexOf(a);-1!==e&&r.splice(e,1)},promise:("object"==typeof e&&"function"==typeof e.then?e:e(...t)).then(e=>{a.response=e,s.lifespan&&s.lifespan>0&&(a.timeout=setTimeout(a.remove,s.lifespan))}).catch(e=>a.error=e)};if(r.push(a),!n)throw a.promise}let s=(e,t,n)=>o(e,t,!1,n),a=(e,t,n)=>void o(e,t,!0,n),l=e=>{if(void 0===e||0===e.length)r.splice(0,r.length);else{let t=r.find(t=>i(e,t.keys,t.equal));t&&t.remove()}}},9339:(e,t,n)=>{e.exports=n(9617)},9617:(e,t,n)=>{var r=n(2115),i=n(8039),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},s=i.useSyncExternalStore,a=r.useRef,l=r.useEffect,u=r.useMemo,c=r.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,n,r,i){var f=a(null);if(null===f.current){var d={hasValue:!1,value:null};f.current=d}else d=f.current;var p=s(e,(f=u(function(){function e(e){if(!l){if(l=!0,s=e,e=r(e),void 0!==i&&d.hasValue){var t=d.value;if(i(t,e))return a=t}return a=e}if(t=a,o(s,e))return t;var n=r(e);return void 0!==i&&i(t,n)?(s=e,t):(s=e,a=n)}var s,a,l=!1,u=void 0===n?null:n;return[function(){return e(t())},null===u?void 0:function(){return e(u())}]},[t,n,r,i]))[0],f[1]);return l(function(){d.hasValue=!0,d.value=p},[p]),c(p),p}}}]);