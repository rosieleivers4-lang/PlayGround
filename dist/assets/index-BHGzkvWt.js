(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const ja="187",eh=0,Io=1,nh=2,ls=1,ih=2,as=3,fi=0,He=1,ke=2,Bi=0,cs=1,en=2,No=3,Uo=4,sh=5,Fi=100,rh=101,ah=102,oh=103,lh=104,ch=200,hh=201,uh=202,dh=203,Kl=204,Jl=205,fh=206,ph=207,mh=208,gh=209,_h=210,xh=211,vh=212,Mh=213,Sh=214,la=0,ca=1,ha=2,ds=3,ua=4,da=5,fa=6,pa=7,Zl=0,yh=1,bh=2,On=0,Ql=1,jl=2,tc=3,to=4,ec=5,nc=6,ic=7,sc=300,Gi=301,fs=302,Ar=303,Rr=304,ar=1e3,Fn=1001,ma=1002,Le=1003,Eh=1004,Ss=1005,Xe=1006,Cr=1007,Jn=1008,$e=1009,rc=1010,ac=1011,ps=1012,eo=1013,An=1014,un=1015,Rn=1016,no=1017,io=1018,ki=1020,oc=35902,lc=35899,cc=1021,hc=1022,Sn=1023,Qn=1026,Zn=1027,so=1028,ro=1029,pi=1030,ao=1031,oo=1033,js=33776,tr=33777,er=33778,nr=33779,ga=35840,_a=35841,xa=35842,va=35843,Ma=36196,Sa=37492,ya=37496,ba=37488,Ea=37489,or=37490,wa=37491,Ta=37808,Aa=37809,Ra=37810,Ca=37811,Pa=37812,La=37813,Da=37814,Ia=37815,Na=37816,Ua=37817,Fa=37818,Oa=37819,Ba=37820,za=37821,Ga=36492,ka=36494,Ha=36495,Va=36283,Wa=36284,lr=36285,Xa=36286,wh=3200,qa=0,Th=1,Kn="",Pe="srgb",cr="srgb-linear",hr="linear",re="srgb",Pr=7680,Ah=519,Rh=512,Ch=513,Ph=514,uc=515,Lh=516,Dh=517,dc=518,fc=519,pc=35044,Fo="300 es",dn=2e3,ms=2001;function Ih(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ur(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Nh(){const s=ur("canvas");return s.style.display="block",s}const Oo={};function dr(...s){const t="THREE."+s.shift();console.log(t,...s)}function mc(s){const t=s[0];if(typeof t=="string"&&t.startsWith("TSL:")){const e=s[1];e&&e.isStackTrace?s[0]+=" "+e.getLocation():s[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return s}function Ut(...s){s=mc(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.warn(e.getError(t)):console.warn(t,...s)}}function te(...s){s=mc(s);const t="THREE."+s.shift();{const e=s[0];e&&e.isStackTrace?console.error(e.getError(t)):console.error(t,...s)}}function ir(...s){const t=s.join(" ");t in Oo||(Oo[t]=!0,Ut(...s))}function Uh(s,t,e){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(t,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,e);break;default:n()}}setTimeout(r,e)})}const Fh={[la]:la,[ha]:fa,[ua]:ua,[ds]:da,[ca]:ca,[fa]:ha,[pa]:pa,[da]:ds};class mi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){const n=this._listeners;return n===void 0?!1:n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){const n=this._listeners;if(n===void 0)return;const i=n[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){const e=this._listeners;if(e===void 0)return;const n=e[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const Ne=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Lr=Math.PI/180,Ya=180/Math.PI;function gi(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ne[s&255]+Ne[s>>8&255]+Ne[s>>16&255]+Ne[s>>24&255]+"-"+Ne[t&255]+Ne[t>>8&255]+"-"+Ne[t>>16&15|64]+Ne[t>>24&255]+"-"+Ne[e&63|128]+Ne[e>>8&255]+"-"+Ne[e>>16&255]+Ne[e>>24&255]+Ne[n&255]+Ne[n>>8&255]+Ne[n>>16&255]+Ne[n>>24&255]).toLowerCase()}function Yt(s,t,e){return Math.max(t,Math.min(e,s))}function Oh(s,t){return(s%t+t)%t}function Dr(s,t,e){return(1-e)*s+e*t}function Bh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function xr(s){switch(s.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function gc(s,t){if(t.constructor===Float32Array)return s;const e=xr(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(s/e,-1)}function _c(s,t){if(t.constructor===Float32Array)return s;const e=xr(t);if(e===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(s*e)}const xo=class xo{constructor(t=0,e=0){this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("THREE.Vector2: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};xo.prototype.isVector2=!0;let St=xo;class Bn{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],f=n[i+3],u=r[a+0],p=r[a+1],g=r[a+2],y=r[a+3];if(f!==y||l!==u||c!==p||h!==g){let d=l*u+c*p+h*g+f*y;d<0&&(u=-u,p=-p,g=-g,y=-y,d=-d);let m=1-o;if(d<.9995){const x=Math.acos(d),T=Math.sin(x);m=Math.sin(m*x)/T,o=Math.sin(o*x)/T,l=l*m+u*o,c=c*m+p*o,h=h*m+g*o,f=f*m+y*o}else{l=l*m+u*o,c=c*m+p*o,h=h*m+g*o,f=f*m+y*o;const x=1/Math.sqrt(l*l+c*c+h*h+f*f);l*=x,c*=x,h*=x,f*=x}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=f}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],f=r[a],u=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+h*f+l*p-c*u,t[e+1]=l*g+h*u+c*f-o*p,t[e+2]=c*g+h*p+o*u-l*f,t[e+3]=h*g-o*f-l*u-c*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),f=o(r/2),u=l(n/2),p=l(i/2),g=l(r/2);switch(a){case"XYZ":this._x=u*h*f+c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f-u*p*g;break;case"YXZ":this._x=u*h*f+c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f+u*p*g;break;case"ZXY":this._x=u*h*f-c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f-u*p*g;break;case"ZYX":this._x=u*h*f-c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f+u*p*g;break;case"YZX":this._x=u*h*f+c*p*g,this._y=c*p*f+u*h*g,this._z=c*h*g-u*p*f,this._w=c*h*f-u*p*g;break;case"XZY":this._x=u*h*f-c*p*g,this._y=c*p*f-u*h*g,this._z=c*h*g+u*p*f,this._w=c*h*f+u*p*g;break;default:Ut("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],l=e[9],c=e[2],h=e[6],f=e[10],u=n+o+f;if(u>0){const p=.5/Math.sqrt(u+1);this._w=.25/p,this._x=(h-l)*p,this._y=(r-c)*p,this._z=(a-i)*p}else if(n>o&&n>f){const p=2*Math.sqrt(1+n-o-f);this._w=(h-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+c)/p}else if(o>f){const p=2*Math.sqrt(1+o-n-f);this._w=(r-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+h)/p}else{const p=2*Math.sqrt(1+f-n-o);this._w=(a-i)/p,this._x=(r+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<1e-8?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Yt(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+a*o+i*c-r*l,this._y=i*h+a*l+r*o-n*c,this._z=r*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-r*c,this._onChangeCallback(),this}slerp(t,e){let n=t._x,i=t._y,r=t._z,a=t._w,o=this.dot(t);o<0&&(n=-n,i=-i,r=-r,a=-a,o=-o);let l=1-e;if(o<.9995){const c=Math.acos(o),h=Math.sin(c);l=Math.sin(l*c)/h,e=Math.sin(e*c)/h,this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this._onChangeCallback()}else this._x=this._x*l+n*e,this._y=this._y*l+i*e,this._z=this._z*l+r*e,this._w=this._w*l+a*e,this.normalize();return this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),r*Math.sin(e),r*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const vo=class vo{constructor(t=0,e=0,n=0){this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("THREE.Vector3: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(Bo.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(Bo.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,l=t.w,c=2*(a*i-o*n),h=2*(o*e-r*i),f=2*(r*n-a*e);return this.x=e+l*c+a*f-o*h,this.y=n+l*h+o*c-r*f,this.z=i+l*f+r*h-a*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,l=e.z;return this.x=i*l-r*o,this.y=r*a-n*l,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ir.copy(this).projectOnVector(t),this.sub(Ir)}reflect(t){return this.sub(Ir.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Yt(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};vo.prototype.isVector3=!0;let P=vo;const Ir=new P,Bo=new Bn,Mo=class Mo{constructor(t,e,n,i,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c)}set(t,e,n,i,r,a,o,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=o,h[3]=e,h[4]=r,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],f=n[7],u=n[2],p=n[5],g=n[8],y=i[0],d=i[3],m=i[6],x=i[1],T=i[4],S=i[7],b=i[2],w=i[5],_=i[8];return r[0]=a*y+o*x+l*b,r[3]=a*d+o*T+l*w,r[6]=a*m+o*S+l*_,r[1]=c*y+h*x+f*b,r[4]=c*d+h*T+f*w,r[7]=c*m+h*S+f*_,r[2]=u*y+p*x+g*b,r[5]=u*d+p*T+g*w,r[8]=u*m+p*S+g*_,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8];return e*a*h-e*o*c-n*r*h+n*o*l+i*r*c-i*a*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=h*a-o*c,u=o*l-h*r,p=c*r-a*l,g=e*f+n*u+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return t[0]=f*y,t[1]=(i*c-h*n)*y,t[2]=(o*n-i*a)*y,t[3]=u*y,t[4]=(h*e-i*l)*y,t[5]=(i*r-o*e)*y,t[6]=p*y,t[7]=(n*l-c*e)*y,t[8]=(a*e-n*r)*y,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+t,-i*c,i*l,-i*(-c*a+l*o)+o+e,0,0,1),this}scale(t,e){return ir("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Nr.makeScale(t,e)),this}rotate(t){return ir("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Nr.makeRotation(-t)),this}translate(t,e){return ir("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Nr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}};Mo.prototype.isMatrix3=!0;let Bt=Mo;const Nr=new Bt,zo=new Bt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Go=new Bt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function zh(){const s={enabled:!0,workingColorSpace:cr,spaces:{},convert:function(i,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===re&&(i.r=zn(i.r),i.g=zn(i.g),i.b=zn(i.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===re&&(i.r=zi(i.r),i.g=zi(i.g),i.b=zi(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Kn?hr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,a){return i.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace}},t=[.64,.33,.3,.6,.15,.06],e=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[cr]:{primaries:t,whitePoint:n,transfer:hr,toXYZ:zo,fromXYZ:Go,luminanceCoefficients:e,workingColorSpaceConfig:{unpackColorSpace:Pe},outputColorSpaceConfig:{drawingBufferColorSpace:Pe}},[Pe]:{primaries:t,whitePoint:n,transfer:re,toXYZ:zo,fromXYZ:Go,luminanceCoefficients:e,outputColorSpaceConfig:{drawingBufferColorSpace:Pe}}}),s}const Jt=zh();function zn(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function zi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let vi;class Gh{static getDataURL(t,e="image/png"){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let n;if(t instanceof HTMLCanvasElement)n=t;else{vi===void 0&&(vi=ur("canvas")),vi.width=t.width,vi.height=t.height;const i=vi.getContext("2d");t instanceof ImageData?i.putImageData(t,0,0):i.drawImage(t,0,0,t.width,t.height),n=vi}return n.toDataURL(e)}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ur("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=zn(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(zn(e[n]/255)*255):e[n]=zn(e[n]);return{data:e,width:t.width,height:t.height}}else return Ut("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let kh=0;class lo{constructor(t=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:kh++}),this.uuid=gi(),this.data=t,this.dataReady=!0,this.version=0}getSize(t){const e=this.data;return typeof HTMLVideoElement<"u"&&e instanceof HTMLVideoElement?t.set(e.videoWidth,e.videoHeight,0):typeof VideoFrame<"u"&&e instanceof VideoFrame?t.set(e.displayWidth,e.displayHeight,0):e!==null?t.set(e.width||0,e.height||0,e.depth||0):t.set(0,0,0),t}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Ur(i[a].image)):r.push(Ur(i[a]))}else r=Ur(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Ur(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Gh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(Ut("Texture: Unable to serialize Texture."),{})}let Hh=0;const Fr=new P;class Fe extends mi{constructor(t=Fe.DEFAULT_IMAGE,e=Fe.DEFAULT_MAPPING,n=Fn,i=Fn,r=Xe,a=Jn,o=Sn,l=$e,c=Fe.DEFAULT_ANISOTROPY,h=Kn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Hh++}),this.uuid=gi(),this.name="",this.source=new lo(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new St(0,0),this.repeat=new St(1,1),this.center=new St(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Bt,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(t&&t.depth&&t.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Fr).x}get height(){return this.source.getSize(Fr).y}get depth(){return this.source.getSize(Fr).z}get image(){return this.source.data}set image(t){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.normalized=t.normalized,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.mipmapsAutoUpdate=t.mipmapsAutoUpdate,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.renderTarget=t.renderTarget,this.isRenderTargetTexture=t.isRenderTargetTexture,this.isPMREMTexture=t.isPMREMTexture,this.isArrayTexture=t.isArrayTexture,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}setValues(t){for(const e in t){const n=t[e];if(n===void 0){Ut(`Texture.setValues(): parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ut(`Texture.setValues(): property '${e}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==sc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ar:t.x=t.x-Math.floor(t.x);break;case Fn:t.x=t.x<0?0:1;break;case ma:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ar:t.y=t.y-Math.floor(t.y);break;case Fn:t.y=t.y<0?0:1;break;case ma:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Fe.DEFAULT_IMAGE=null;Fe.DEFAULT_MAPPING=sc;Fe.DEFAULT_ANISOTROPY=1;const So=class So{constructor(t=0,e=0,n=0,i=1){this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("THREE.Vector4: index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this.w/=t.w,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const l=t.elements,c=l[0],h=l[4],f=l[8],u=l[1],p=l[5],g=l[9],y=l[2],d=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(f-y)<.01&&Math.abs(g-d)<.01){if(Math.abs(h+u)<.1&&Math.abs(f+y)<.1&&Math.abs(g+d)<.1&&Math.abs(c+p+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const T=(c+1)/2,S=(p+1)/2,b=(m+1)/2,w=(h+u)/4,_=(f+y)/4,v=(g+d)/4;return T>S&&T>b?T<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(T),i=w/n,r=_/n):S>b?S<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(S),n=w/i,r=v/i):b<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(b),n=_/r,i=v/r),this.set(n,i,r,e),this}let x=Math.sqrt((d-g)*(d-g)+(f-y)*(f-y)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(d-g)/x,this.y=(f-y)/x,this.z=(u-h)/x,this.w=Math.acos((c+p+m-1)/2),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this.w=e[15],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Yt(this.x,t.x,e.x),this.y=Yt(this.y,t.y,e.y),this.z=Yt(this.z,t.z,e.z),this.w=Yt(this.w,t.w,e.w),this}clampScalar(t,e){return this.x=Yt(this.x,t,e),this.y=Yt(this.y,t,e),this.z=Yt(this.z,t,e),this.w=Yt(this.w,t,e),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Yt(n,t,e))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};So.prototype.isVector4=!0;let fe=So;class Vh extends mi{constructor(t=1,e=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Xe,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=n.depth,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e),this.textures=[];const i=n.count;for(let r=0;r<i;r++)this.textures[r]=new Fe({width:t,height:e,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(t={}){const e={minFilter:Xe,generateMipmaps:!1,flipY:!1,internalFormat:null};t.mapping!==void 0&&(e.mapping=t.mapping),t.wrapS!==void 0&&(e.wrapS=t.wrapS),t.wrapT!==void 0&&(e.wrapT=t.wrapT),t.wrapR!==void 0&&(e.wrapR=t.wrapR),t.magFilter!==void 0&&(e.magFilter=t.magFilter),t.minFilter!==void 0&&(e.minFilter=t.minFilter),t.format!==void 0&&(e.format=t.format),t.type!==void 0&&(e.type=t.type),t.anisotropy!==void 0&&(e.anisotropy=t.anisotropy),t.colorSpace!==void 0&&(e.colorSpace=t.colorSpace),t.flipY!==void 0&&(e.flipY=t.flipY),t.generateMipmaps!==void 0&&(e.generateMipmaps=t.generateMipmaps),t.mipmapsAutoUpdate!==void 0&&(e.mipmapsAutoUpdate=t.mipmapsAutoUpdate),t.internalFormat!==void 0&&(e.internalFormat=t.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(e)}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}set depthTexture(t){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),t!==null&&t.renderTarget===null&&(t.renderTarget=this),this._depthTexture=t}get depthTexture(){return this._depthTexture}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let e=0,n=t.textures.length;e<n;e++){this.textures[e]=t.textures[e].clone(),this.textures[e].isRenderTargetTexture=!0,this.textures[e].renderTarget=this;const i=Object.assign({},t.textures[e].image);this.textures[e].source=new lo(i)}if(this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveColorBuffer=t.resolveColorBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,this.storeMultisampledColorBuffer=t.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=t.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=t.storeMultisampledStencilBuffer,t.depthTexture!==null)if(t.depthTexture.renderTarget===t){const e=t.depthTexture.clone();e.renderTarget=null,this.depthTexture=e}else this.depthTexture=t.depthTexture;else this.depthTexture=null;return this.samples=t.samples,this.multiview=t.multiview,this.useArrayDepthTexture=t.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Tn extends Vh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class xc extends Fe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Le,this.minFilter=Le,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}addLayerUpdate(t){this.layerUpdates.add(t)}clearLayerUpdates(){this.layerUpdates.clear()}}class Wh extends Fe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Le,this.minFilter=Le,this.wrapR=Fn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(t){return super.copy(t),this.wrapR=t.wrapR,this}}const _r=class _r{constructor(t,e,n,i,r,a,o,l,c,h,f,u,p,g,y,d){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,a,o,l,c,h,f,u,p,g,y,d)}set(t,e,n,i,r,a,o,l,c,h,f,u,p,g,y,d){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=a,m[9]=o,m[13]=l,m[2]=c,m[6]=h,m[10]=f,m[14]=u,m[3]=p,m[7]=g,m[11]=y,m[15]=d,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new _r().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return this.determinantAffine()===0?(t.set(1,0,0),e.set(0,1,0),n.set(0,0,1),this):(t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){if(t.determinantAffine()===0)return this.identity();const e=this.elements,n=t.elements,i=1/Mi.setFromMatrixColumn(t,0).length(),r=1/Mi.setFromMatrixColumn(t,1).length(),a=1/Mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(r),f=Math.sin(r);if(t.order==="XYZ"){const u=a*h,p=a*f,g=o*h,y=o*f;e[0]=l*h,e[4]=-l*f,e[8]=c,e[1]=p+g*c,e[5]=u-y*c,e[9]=-o*l,e[2]=y-u*c,e[6]=g+p*c,e[10]=a*l}else if(t.order==="YXZ"){const u=l*h,p=l*f,g=c*h,y=c*f;e[0]=u+y*o,e[4]=g*o-p,e[8]=a*c,e[1]=a*f,e[5]=a*h,e[9]=-o,e[2]=p*o-g,e[6]=y+u*o,e[10]=a*l}else if(t.order==="ZXY"){const u=l*h,p=l*f,g=c*h,y=c*f;e[0]=u-y*o,e[4]=-a*f,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*h,e[9]=y-u*o,e[2]=-a*c,e[6]=o,e[10]=a*l}else if(t.order==="ZYX"){const u=a*h,p=a*f,g=o*h,y=o*f;e[0]=l*h,e[4]=g*c-p,e[8]=u*c+y,e[1]=l*f,e[5]=y*c+u,e[9]=p*c-g,e[2]=-c,e[6]=o*l,e[10]=a*l}else if(t.order==="YZX"){const u=a*l,p=a*c,g=o*l,y=o*c;e[0]=l*h,e[4]=y-u*f,e[8]=g*f+p,e[1]=f,e[5]=a*h,e[9]=-o*h,e[2]=-c*h,e[6]=p*f+g,e[10]=u-y*f}else if(t.order==="XZY"){const u=a*l,p=a*c,g=o*l,y=o*c;e[0]=l*h,e[4]=-f,e[8]=c*h,e[1]=u*f+y,e[5]=a*h,e[9]=p*f-g,e[2]=g*f-p,e[6]=o*h,e[10]=y*f+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Xh,t,qh)}lookAt(t,e,n){const i=this.elements;return qe.subVectors(t,e),qe.lengthSq()===0&&(qe.z=1),qe.normalize(),Vn.crossVectors(n,qe),Vn.lengthSq()===0&&(Math.abs(n.z)===1?qe.x+=1e-4:qe.z+=1e-4,qe.normalize(),Vn.crossVectors(n,qe)),Vn.normalize(),ys.crossVectors(qe,Vn),i[0]=Vn.x,i[4]=ys.x,i[8]=qe.x,i[1]=Vn.y,i[5]=ys.y,i[9]=qe.y,i[2]=Vn.z,i[6]=ys.z,i[10]=qe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],f=n[5],u=n[9],p=n[13],g=n[2],y=n[6],d=n[10],m=n[14],x=n[3],T=n[7],S=n[11],b=n[15],w=i[0],_=i[4],v=i[8],C=i[12],R=i[1],N=i[5],F=i[9],G=i[13],I=i[2],H=i[6],K=i[10],D=i[14],J=i[3],X=i[7],V=i[11],Z=i[15];return r[0]=a*w+o*R+l*I+c*J,r[4]=a*_+o*N+l*H+c*X,r[8]=a*v+o*F+l*K+c*V,r[12]=a*C+o*G+l*D+c*Z,r[1]=h*w+f*R+u*I+p*J,r[5]=h*_+f*N+u*H+p*X,r[9]=h*v+f*F+u*K+p*V,r[13]=h*C+f*G+u*D+p*Z,r[2]=g*w+y*R+d*I+m*J,r[6]=g*_+y*N+d*H+m*X,r[10]=g*v+y*F+d*K+m*V,r[14]=g*C+y*G+d*D+m*Z,r[3]=x*w+T*R+S*I+b*J,r[7]=x*_+T*N+S*H+b*X,r[11]=x*v+T*F+S*K+b*V,r[15]=x*C+T*G+S*D+b*Z,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],l=t[9],c=t[13],h=t[2],f=t[6],u=t[10],p=t[14],g=t[3],y=t[7],d=t[11],m=t[15],x=l*p-c*u,T=o*p-c*f,S=o*u-l*f,b=a*p-c*h,w=a*u-l*h,_=a*f-o*h;return e*(y*x-d*T+m*S)-n*(g*x-d*b+m*w)+i*(g*T-y*b+m*_)-r*(g*S-y*w+d*_)}determinantAffine(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[1],a=t[5],o=t[9],l=t[2],c=t[6],h=t[10];return e*(a*h-o*c)-n*(r*h-o*l)+i*(r*c-a*l)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],l=t[6],c=t[7],h=t[8],f=t[9],u=t[10],p=t[11],g=t[12],y=t[13],d=t[14],m=t[15],x=e*o-n*a,T=e*l-i*a,S=e*c-r*a,b=n*l-i*o,w=n*c-r*o,_=i*c-r*l,v=h*y-f*g,C=h*d-u*g,R=h*m-p*g,N=f*d-u*y,F=f*m-p*y,G=u*m-p*d,I=x*G-T*F+S*N+b*R-w*C+_*v;if(I===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const H=1/I;return t[0]=(o*G-l*F+c*N)*H,t[1]=(i*F-n*G-r*N)*H,t[2]=(y*_-d*w+m*b)*H,t[3]=(u*w-f*_-p*b)*H,t[4]=(l*R-a*G-c*C)*H,t[5]=(e*G-i*R+r*C)*H,t[6]=(d*S-g*_-m*T)*H,t[7]=(h*_-u*S+p*T)*H,t[8]=(a*F-o*R+c*v)*H,t[9]=(n*R-e*F-r*v)*H,t[10]=(g*w-y*S+m*x)*H,t[11]=(f*S-h*w-p*x)*H,t[12]=(o*C-a*N-l*v)*H,t[13]=(e*N-n*C+i*v)*H,t[14]=(y*T-g*b-d*x)*H,t[15]=(h*b-f*T+u*x)*H,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,l=t.z,c=r*a,h=r*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,r*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,l=e._w,c=r+r,h=a+a,f=o+o,u=r*c,p=r*h,g=r*f,y=a*h,d=a*f,m=o*f,x=l*c,T=l*h,S=l*f,b=n.x,w=n.y,_=n.z;return i[0]=(1-(y+m))*b,i[1]=(p+S)*b,i[2]=(g-T)*b,i[3]=0,i[4]=(p-S)*w,i[5]=(1-(u+m))*w,i[6]=(d+x)*w,i[7]=0,i[8]=(g+T)*_,i[9]=(d-x)*_,i[10]=(1-(u+y))*_,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;t.x=i[12],t.y=i[13],t.z=i[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),e.identity(),this;let a=Mi.set(i[0],i[1],i[2]).length();const o=Mi.set(i[4],i[5],i[6]).length(),l=Mi.set(i[8],i[9],i[10]).length();r<0&&(a=-a),rn.copy(this);const c=1/a,h=1/o,f=1/l;return rn.elements[0]*=c,rn.elements[1]*=c,rn.elements[2]*=c,rn.elements[4]*=h,rn.elements[5]*=h,rn.elements[6]*=h,rn.elements[8]*=f,rn.elements[9]*=f,rn.elements[10]*=f,e.setFromRotationMatrix(rn),n.x=a,n.y=o,n.z=l,this}makePerspective(t,e,n,i,r,a,o=dn,l=!1){const c=this.elements,h=2*r/(e-t),f=2*r/(n-i),u=(e+t)/(e-t),p=(n+i)/(n-i);let g,y;if(l)g=r/(a-r),y=a*r/(a-r);else if(o===dn)g=-(a+r)/(a-r),y=-2*a*r/(a-r);else if(o===ms)g=-a/(a-r),y=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=f,c[9]=p,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,a,o=dn,l=!1){const c=this.elements,h=2/(e-t),f=2/(n-i),u=-(e+t)/(e-t),p=-(n+i)/(n-i);let g,y;if(l)g=1/(a-r),y=a/(a-r);else if(o===dn)g=-2/(a-r),y=-(a+r)/(a-r);else if(o===ms)g=-1/(a-r),y=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=h,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=f,c[9]=0,c[13]=p,c[2]=0,c[6]=0,c[10]=g,c[14]=y,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}};_r.prototype.isMatrix4=!0;let ee=_r;const Mi=new P,rn=new ee,Xh=new P(0,0,0),qh=new P(1,1,1),Vn=new P,ys=new P,qe=new P,ko=new ee,Ho=new Bn;class fn{constructor(t=0,e=0,n=0,i=fn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],f=i[2],u=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(Yt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Yt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-f,r),this._z=0);break;case"ZXY":this._x=Math.asin(Yt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-f,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Yt(f,-1,1)),Math.abs(f)<.9999999?(this._x=Math.atan2(u,p),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Yt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-f,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Yt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-h,p),this._y=0);break;default:Ut("Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return ko.makeRotationFromQuaternion(t),this.setFromRotationMatrix(ko,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return Ho.setFromEuler(this),this.setFromQuaternion(Ho,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}fn.DEFAULT_ORDER="XYZ";class vc{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Yh=0;const Vo=new P,Si=new Bn,Pn=new ee,bs=new P,Ki=new P,$h=new P,Kh=new Bn,Wo=new P(1,0,0),Xo=new P(0,1,0),qo=new P(0,0,1),Yo={type:"added"},Jh={type:"removed"},yi={type:"childadded",child:null},Or={type:"childremoved",child:null};class xe extends mi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=gi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=xe.DEFAULT_UP.clone();const t=new P,e=new fn,n=new Bn,i=new P(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ee},normalMatrix:{value:new Bt}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=xe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new vc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.multiply(Si),this}rotateOnWorldAxis(t,e){return Si.setFromAxisAngle(t,e),this.quaternion.premultiply(Si),this}rotateX(t){return this.rotateOnAxis(Wo,t)}rotateY(t){return this.rotateOnAxis(Xo,t)}rotateZ(t){return this.rotateOnAxis(qo,t)}translateOnAxis(t,e){return Vo.copy(t).applyQuaternion(this.quaternion),this.position.add(Vo.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Wo,t)}translateY(t){return this.translateOnAxis(Xo,t)}translateZ(t){return this.translateOnAxis(qo,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?bs.copy(t):bs.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Ki.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(Ki,bs,this.up):Pn.lookAt(bs,Ki,this.up),this.quaternion.setFromRotationMatrix(Pn),i&&(Pn.extractRotation(i.matrixWorld),Si.setFromRotationMatrix(Pn),this.quaternion.premultiply(Si.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(te("Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Yo),yi.child=t,this.dispatchEvent(yi),yi.child=null):te("Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Jh),Or.child=t,this.dispatchEvent(Or),Or.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Yo),yi.child=t,this.dispatchEvent(yi),yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,a=i.length;r<a;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,t,$h),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ki,Kh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const t=this.pivot;if(t!==null){const e=t.x,n=t.y,i=t.z,r=this.matrix.elements;r[12]+=e-r[0]*e-r[4]*n-r[8]*i,r[13]+=n-r[1]*e-r[5]*n-r[9]*i,r[14]+=i-r[2]*e-r[6]*n-r[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].updateMatrixWorld(t)}updateWorldMatrix(t,e,n=!1){const i=this.parent;if(t===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),e===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(t),i.indirectTexture=this._indirectTexture.toJSON(t),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(t)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const f=l[c];r(t.shapes,f)}else r(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(t.materials,this.material[l]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];i.animations.push(r(t.animations,l))}}if(e){const o=a(t.geometries),l=a(t.materials),c=a(t.textures),h=a(t.images),f=a(t.shapes),u=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),f.length>0&&(n.shapes=f),u.length>0&&(n.skeletons=u),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const l=[];for(const c in o){const h=o[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.pivot=t.pivot!==null?t.pivot.clone():null,this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.static=t.static,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}xe.DEFAULT_UP=new P(0,1,0);xe.DEFAULT_MATRIX_AUTO_UPDATE=!0;xe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class jt extends xe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Zh={type:"move"};class Br{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new jt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new jt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new jt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){a=!0;for(const y of t.hand.values()){const d=e.getJointPose(y,n),m=this._getHandJoint(c,y);d!==null&&(m.matrix.fromArray(d.transform.matrix),m.matrix.decompose(m.position,m.quaternion,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=d.radius),m.visible=d!==null}const h=c.joints["index-finger-tip"],f=c.joints["thumb-tip"],u=h.position.distanceTo(f.position),p=.02,g=.005;c.inputState.pinching&&u>p+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=p-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:t,target:this})));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Zh)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new jt;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Mc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Wn={h:0,s:0,l:0},Es={h:0,s:0,l:0};function zr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class yt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Pe){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,Jt.colorSpaceToWorking(this,e),this}setRGB(t,e,n,i=Jt.workingColorSpace){return this.r=t,this.g=e,this.b=n,Jt.colorSpaceToWorking(this,i),this}setHSL(t,e,n,i=Jt.workingColorSpace){if(t=Oh(t,1),e=Yt(e,0,1),n=Yt(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=zr(a,r,t+1/3),this.g=zr(a,r,t),this.b=zr(a,r,t-1/3)}return Jt.colorSpaceToWorking(this,i),this}setStyle(t,e=Pe){function n(r){r!==void 0&&parseFloat(r)<1&&Ut("Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,e);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:Ut("Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);Ut("Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Pe){const n=Mc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):Ut("Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=zn(t.r),this.g=zn(t.g),this.b=zn(t.b),this}copyLinearToSRGB(t){return this.r=zi(t.r),this.g=zi(t.g),this.b=zi(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Pe){return Jt.workingToColorSpace(Ue.copy(this),t),Math.round(Yt(Ue.r*255,0,255))*65536+Math.round(Yt(Ue.g*255,0,255))*256+Math.round(Yt(Ue.b*255,0,255))}getHexString(t=Pe){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=Jt.workingColorSpace){Jt.workingToColorSpace(Ue.copy(this),e);const n=Ue.r,i=Ue.g,r=Ue.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let l,c;const h=(o+a)/2;if(o===a)l=0,c=0;else{const f=a-o;switch(c=h<=.5?f/(a+o):f/(2-a-o),a){case n:l=(i-r)/f+(i<r?6:0);break;case i:l=(r-n)/f+2;break;case r:l=(n-i)/f+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=Jt.workingColorSpace){return Jt.workingToColorSpace(Ue.copy(this),e),t.r=Ue.r,t.g=Ue.g,t.b=Ue.b,t}getStyle(t=Pe){Jt.workingToColorSpace(Ue.copy(this),t);const e=Ue.r,n=Ue.g,i=Ue.b;return t!==Pe?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Wn),this.setHSL(Wn.h+t,Wn.s+e,Wn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Wn),t.getHSL(Es);const n=Dr(Wn.h,Es.h,e),i=Dr(Wn.s,Es.s,e),r=Dr(Wn.l,Es.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ue=new yt;yt.NAMES=Mc;class co{constructor(t,e=25e-5){this.isFogExp2=!0,this.name="",this.color=new yt(t),this.density=e}clone(){return new co(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class Qh extends xe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fn,this.environmentIntensity=1,this.environmentRotation=new fn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),this.background=t.background!==null?t.background.clone():null,this.environment=t.environment!==null?t.environment.clone():null,this.fog=t.fog!==null?t.fog.clone():null,this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),this.overrideMaterial=t.overrideMaterial!==null?t.overrideMaterial.clone():null,this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),e.object.backgroundBlurriness=this.backgroundBlurriness,e.object.backgroundIntensity=this.backgroundIntensity,e.object.backgroundRotation=this.backgroundRotation.toArray(),e.object.environmentIntensity=this.environmentIntensity,e.object.environmentRotation=this.environmentRotation.toArray(),e}}const an=new P,Ln=new P,Gr=new P,Dn=new P,bi=new P,Ei=new P,$o=new P,kr=new P,Hr=new P,Vr=new P,Wr=new fe,Xr=new fe,qr=new fe;class nn{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),an.subVectors(t,e),i.cross(an);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){an.subVectors(i,e),Ln.subVectors(n,e),Gr.subVectors(t,e);const a=an.dot(an),o=an.dot(Ln),l=an.dot(Gr),c=Ln.dot(Ln),h=Ln.dot(Gr),f=a*c-o*o;if(f===0)return r.set(0,0,0),null;const u=1/f,p=(c*l-o*h)*u,g=(a*h-o*l)*u;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Dn)===null?!1:Dn.x>=0&&Dn.y>=0&&Dn.x+Dn.y<=1}static getInterpolation(t,e,n,i,r,a,o,l){return this.getBarycoord(t,e,n,i,Dn)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Dn.x),l.addScaledVector(a,Dn.y),l.addScaledVector(o,Dn.z),l)}static getInterpolatedAttribute(t,e,n,i,r,a){return Wr.setScalar(0),Xr.setScalar(0),qr.setScalar(0),Wr.fromBufferAttribute(t,e),Xr.fromBufferAttribute(t,n),qr.fromBufferAttribute(t,i),a.setScalar(0),a.addScaledVector(Wr,r.x),a.addScaledVector(Xr,r.y),a.addScaledVector(qr,r.z),a}static isFrontFacing(t,e,n,i){return an.subVectors(n,e),Ln.subVectors(t,e),an.cross(Ln).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return an.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),an.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return nn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return nn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,r){return nn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return nn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return nn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;bi.subVectors(i,n),Ei.subVectors(r,n),kr.subVectors(t,n);const l=bi.dot(kr),c=Ei.dot(kr);if(l<=0&&c<=0)return e.copy(n);Hr.subVectors(t,i);const h=bi.dot(Hr),f=Ei.dot(Hr);if(h>=0&&f<=h)return e.copy(i);const u=l*f-h*c;if(u<=0&&l>=0&&h<=0&&l-h>0)return a=l/(l-h),e.copy(n).addScaledVector(bi,a);Vr.subVectors(t,r);const p=bi.dot(Vr),g=Ei.dot(Vr);if(g>=0&&p<=g)return e.copy(r);const y=p*c-l*g;if(y<=0&&c>=0&&g<=0)return o=c/(c-g),e.copy(n).addScaledVector(Ei,o);const d=h*g-p*f;if(d<=0&&f-h>=0&&p-g>=0)return $o.subVectors(r,i),o=(f-h)/(f-h+(p-g)),e.copy(i).addScaledVector($o,o);const m=1/(d+y+u);return a=y*m,o=u*m,e.copy(n).addScaledVector(bi,a).addScaledVector(Ei,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}class _i{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(on.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(on.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=on.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0&&t.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)t.isMesh===!0?t.getVertexPosition(a,on):on.fromBufferAttribute(r,a),on.applyMatrix4(t.matrixWorld),this.expandByPoint(on);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ws.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ws.copy(n.boundingBox)),ws.applyMatrix4(t.matrixWorld),this.union(ws)}const i=t.children;for(let r=0,a=i.length;r<a;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return t.x>=this.min.x&&t.x<=this.max.x&&t.y>=this.min.y&&t.y<=this.max.y&&t.z>=this.min.z&&t.z<=this.max.z}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return t.max.x>=this.min.x&&t.min.x<=this.max.x&&t.max.y>=this.min.y&&t.min.y<=this.max.y&&t.max.z>=this.min.z&&t.min.z<=this.max.z}intersectsSphere(t){return this.clampPoint(t.center,on),on.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ji),Ts.subVectors(this.max,Ji),wi.subVectors(t.a,Ji),Ti.subVectors(t.b,Ji),Ai.subVectors(t.c,Ji),Xn.subVectors(Ti,wi),qn.subVectors(Ai,Ti),si.subVectors(wi,Ai);let e=[0,-Xn.z,Xn.y,0,-qn.z,qn.y,0,-si.z,si.y,Xn.z,0,-Xn.x,qn.z,0,-qn.x,si.z,0,-si.x,-Xn.y,Xn.x,0,-qn.y,qn.x,0,-si.y,si.x,0];return!Yr(e,wi,Ti,Ai,Ts)||(e=[1,0,0,0,1,0,0,0,1],!Yr(e,wi,Ti,Ai,Ts))?!1:(As.crossVectors(Xn,qn),e=[As.x,As.y,As.z],Yr(e,wi,Ti,Ai,Ts))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,on).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(on).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(In[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),In[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),In[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),In[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),In[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),In[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),In[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),In[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(In),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(t){return this.min.fromArray(t.min),this.max.fromArray(t.max),this}}const In=[new P,new P,new P,new P,new P,new P,new P,new P],on=new P,ws=new _i,wi=new P,Ti=new P,Ai=new P,Xn=new P,qn=new P,si=new P,Ji=new P,Ts=new P,As=new P,ri=new P;function Yr(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){ri.fromArray(s,r);const o=i.x*Math.abs(ri.x)+i.y*Math.abs(ri.y)+i.z*Math.abs(ri.z),l=t.dot(ri),c=e.dot(ri),h=n.dot(ri);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}const me=new P,Rs=new St;let jh=0;class Ae extends mi{constructor(t,e,n=!1){if(super(),Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:jh++}),this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=pc,this.updateRanges=[],this.gpuType=un,this.version=0,this._normalizationScale=t!==void 0?xr(t):void 0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this._normalizationScale=t._normalizationScale,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Rs.fromBufferAttribute(this,e),Rs.applyMatrix3(t),this.setXY(e,Rs.x,Rs.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix3(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyMatrix4(t),this.setXYZ(e,me.x,me.y,me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.applyNormalMatrix(t),this.setXYZ(e,me.x,me.y,me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)me.fromBufferAttribute(this,e),me.transformDirection(t),this.setXYZ(e,me.x,me.y,me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=this._denormalize(e)),e}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=this._denormalize(e)),e}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=this._denormalize(e)),e}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=this._denormalize(e)),e}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return t.name=this.name,t.usage=this.usage,t.gpuType=this.gpuType,t}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):gc(t,this.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):_c(t,this.array)}}class Sc extends Ae{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class yc extends Ae{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Zt extends Ae{constructor(t,e,n){super(new Float32Array(t),e,n)}}const tu=new _i,Zi=new P,$r=new P;class Xi{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):tu.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Zi.subVectors(t,this.center);const e=Zi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Zi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):($r.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Zi.copy(t.center).add($r)),this.expandByPoint(Zi.copy(t.center).sub($r))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(t){return this.radius=t.radius,this.center.fromArray(t.center),this}}let eu=0;const je=new ee,Kr=new xe,Ri=new P,Ye=new _i,Qi=new _i,Te=new P;class le extends mi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:eu++}),this.uuid=gi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Ih(t)?yc:Sc)(t,1):this.index=t,this}setIndirect(t,e=0){return this.indirect=t,this.indirectOffset=e,this}getIndirect(){return this.indirect}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Bt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(t){return je.makeRotationFromQuaternion(t),this.applyMatrix4(je),this}rotateX(t){return je.makeRotationX(t),this.applyMatrix4(je),this}rotateY(t){return je.makeRotationY(t),this.applyMatrix4(je),this}rotateZ(t){return je.makeRotationZ(t),this.applyMatrix4(je),this}translate(t,e,n){return je.makeTranslation(t,e,n),this.applyMatrix4(je),this}scale(t,e,n){return je.makeScale(t,e,n),this.applyMatrix4(je),this}lookAt(t){return Kr.lookAt(t),Kr.updateMatrix(),this.applyMatrix4(Kr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ri).negate(),this.translate(Ri.x,Ri.y,Ri.z),this}setFromPoints(t){const e=this.getAttribute("position");if(e===void 0){const n=[];for(let i=0,r=t.length;i<r;i++){const a=t[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Zt(n,3))}else{const n=Math.min(t.length,e.count);for(let i=0;i<n;i++){const r=t[i];e.setXYZ(i,r.x,r.y,r.z||0)}t.length>e.count&&Ut("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),e.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _i);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Ye.setFromBufferAttribute(r),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Ye.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Ye.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Ye.min),this.boundingBox.expandByPoint(Ye.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&te('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Xi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){te("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(Ye.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];Qi.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(Ye.min,Qi.min),Ye.expandByPoint(Te),Te.addVectors(Ye.max,Qi.max),Ye.expandByPoint(Te)):(Ye.expandByPoint(Qi.min),Ye.expandByPoint(Qi.max))}Ye.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)Te.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Te));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)Te.fromBufferAttribute(o,c),l&&(Ri.fromBufferAttribute(t,c),Te.add(Ri)),i=Math.max(i,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&te('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){te("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,r=e.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Ae(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(n.count);for(let C=0;C<n.count;C++)o[C]=new P,l[C]=new P;const h=new P,f=new P,u=new P,p=new St,g=new St,y=new St,d=new P,m=new P;function x(C,R,N){c[C]=c[R]=c[N]=1,h.fromBufferAttribute(n,C),f.fromBufferAttribute(n,R),u.fromBufferAttribute(n,N),p.fromBufferAttribute(r,C),g.fromBufferAttribute(r,R),y.fromBufferAttribute(r,N),f.sub(h),u.sub(h),g.sub(p),y.sub(p);const F=1/(g.x*y.y-y.x*g.y);isFinite(F)&&(d.copy(f).multiplyScalar(y.y).addScaledVector(u,-g.y).multiplyScalar(F),m.copy(u).multiplyScalar(g.x).addScaledVector(f,-y.x).multiplyScalar(F),o[C].add(d),o[R].add(d),o[N].add(d),l[C].add(m),l[R].add(m),l[N].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:t.count}]);for(let C=0,R=T.length;C<R;++C){const N=T[C],F=N.start,G=N.count;for(let I=F,H=F+G;I<H;I+=3)x(t.getX(I+0),t.getX(I+1),t.getX(I+2))}const S=new P,b=new P,w=new P,_=new P;function v(C){w.fromBufferAttribute(i,C),_.copy(w);const R=o[C];S.copy(R),S.sub(w.multiplyScalar(w.dot(R))).normalize(),b.crossVectors(_,R);const F=b.dot(l[C])<0?-1:1;a.setXYZW(C,S.x,S.y,S.z,F)}for(let C=0,R=n.count;C<R;++C)c[C]&&v(C);this._transformed=!0}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==e.count)n=new Ae(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,p=n.count;u<p;u++)n.setXYZ(u,0,0,0);const i=new P,r=new P,a=new P,o=new P,l=new P,c=new P,h=new P,f=new P;if(t)for(let u=0,p=t.count;u<p;u+=3){const g=t.getX(u+0),y=t.getX(u+1),d=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,y),a.fromBufferAttribute(e,d),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),o.fromBufferAttribute(n,g),l.fromBufferAttribute(n,y),c.fromBufferAttribute(n,d),o.add(h),l.add(h),c.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,l.x,l.y,l.z),n.setXYZ(d,c.x,c.y,c.z)}else for(let u=0,p=e.count;u<p;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),a.fromBufferAttribute(e,u+2),h.subVectors(a,r),f.subVectors(i,r),h.cross(f),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(o,l){const c=o.array,h=o.itemSize,f=o.normalized,u=new c.constructor(l.length*h);let p=0,g=0;for(let y=0,d=l.length;y<d;y++){o.isInterleavedBufferAttribute?p=l[y]*o.data.stride+o.offset:p=l[y]*h;for(let m=0;m<h;m++)u[g++]=c[p++]}return new Ae(u,h,f)}if(this.index===null)return Ut("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new le,n=this.index.array,i=this.attributes;for(const o in i){const l=i[o],c=t(l,n);e.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let h=0,f=c.length;h<f;h++){const u=c[h],p=t(u,n);l.push(p)}e.morphAttributes[o]=l}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,t.name=this.name,Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let f=0,u=c.length;f<u;f++){const p=c[f];h.push(p.toJSON(t.data))}h.length>0&&(i[l]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere=o.toJSON()),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone());const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const r=t.morphAttributes;for(const c in r){const h=[],f=r[c];for(let u=0,p=f.length;u<p;u++)h.push(f[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let c=0,h=a.length;c<h;c++){const f=a[c];this.addGroup(f.start,f.count,f.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this._transformed=t._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class nu{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=pc,this.updateRanges=[],this.version=0,this.uuid=gi()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=Ko(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=this.array.slice(0).buffer);const n=new this.array.constructor(t.arrayBuffers[e]),i=new this.constructor(n,this.stride);return i.setUsage(this.usage),i}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){t.arrayBuffers===void 0&&(t.arrayBuffers={});const e=Ko(this.array);t.arrayBuffers[e]===void 0&&(t.arrayBuffers[e]=Array.from(new Uint32Array(this.array.slice(0).buffer)));const n={uuid:this.uuid,buffer:e,type:this.array.constructor.name,stride:this.stride};return n.usage=this.usage,n}}function Ko(s){return s.buffer._uuid===void 0&&(s.buffer._uuid=gi()),s.byteOffset===0&&s.byteLength===s.buffer.byteLength?s.buffer._uuid:s.buffer._uuid+":"+s.byteOffset+":"+s.byteLength}const Be=new P;class fr{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i,this._normalizationScale=t!==void 0?xr(t.array):void 0}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyMatrix4(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.applyNormalMatrix(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Be.fromBufferAttribute(this,e),Be.transformDirection(t),this.setXYZ(e,Be.x,Be.y,Be.z);return this}getComponent(t,e){let n=this.array[t*this.data.stride+this.offset+e];return this.normalized&&(n=this._denormalize(n)),n}setComponent(t,e,n){return this.normalized&&(n=this._normalize(n)),this.data.array[t*this.data.stride+this.offset+e]=n,this}setX(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=this._normalize(e)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=this._denormalize(e)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=this._denormalize(e)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=this._denormalize(e)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=this._denormalize(e)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=this._normalize(e),n=this._normalize(n),i=this._normalize(i),r=this._normalize(r)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){dr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new Ae(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new fr(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){dr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}_denormalize(t){const e=this._normalizationScale;return e!==void 0?Math.max(t/e,-1):gc(t,this.data.array)}_normalize(t){const e=this._normalizationScale;return e!==void 0?Math.round(t*e):_c(t,this.data.array)}}const Jr=new P,iu=new P,su=new Bt;class $n{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Jr.subVectors(n,e).cross(iu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e,n=!0){const i=t.delta(Jr),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const a=-(t.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:e.copy(t.start).addScaledVector(i,a)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||su.getNormalMatrix(t),i=this.coplanarPoint(Jr).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(t){return this.normal.fromArray(t.normal),this.constant=t.constant,this}}let ru=0;class xi extends mi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:ru++}),this.uuid=gi(),this.name="",this.type="Material",this.blending=cs,this.side=fi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Kl,this.blendDst=Jl,this.blendEquation=Fi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new yt(0,0,0),this.blendAlpha=0,this.depthFunc=ds,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ah,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pr,this.stencilZFail=Pr,this.stencilZPass=Pr,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){Ut(`Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){Ut(`Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(t).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(t).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(t).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(t,e){if(t.uuid!==void 0&&(this.uuid=t.uuid),t.name!==void 0&&(this.name=t.name),t.color!==void 0&&this.color!==void 0&&this.color.setHex(t.color),t.roughness!==void 0&&(this.roughness=t.roughness),t.metalness!==void 0&&(this.metalness=t.metalness),t.sheen!==void 0&&(this.sheen=t.sheen),t.sheenColor!==void 0&&(this.sheenColor=new yt().setHex(t.sheenColor)),t.sheenRoughness!==void 0&&(this.sheenRoughness=t.sheenRoughness),t.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(t.emissive),t.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(t.specular),t.specularIntensity!==void 0&&(this.specularIntensity=t.specularIntensity),t.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(t.specularColor),t.shininess!==void 0&&(this.shininess=t.shininess),t.clearcoat!==void 0&&(this.clearcoat=t.clearcoat),t.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=t.clearcoatRoughness),t.diffuseRoughness!==void 0&&(this.diffuseRoughness=t.diffuseRoughness),t.dispersion!==void 0&&(this.dispersion=t.dispersion),t.retroreflectivity!==void 0&&(this.retroreflectivity=t.retroreflectivity),t.iridescence!==void 0&&(this.iridescence=t.iridescence),t.iridescenceIOR!==void 0&&(this.iridescenceIOR=t.iridescenceIOR),t.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessMinimum),t.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=t.iridescenceThicknessMaximum),t.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=t.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=t.iridescenceThicknessRange[1]),t.transmission!==void 0&&(this.transmission=t.transmission),t.thickness!==void 0&&(this.thickness=t.thickness),t.attenuationDistance!==void 0&&(this.attenuationDistance=t.attenuationDistance),t.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(t.attenuationColor),t.anisotropy!==void 0&&(this.anisotropy=t.anisotropy),t.anisotropyRotation!==void 0&&(this.anisotropyRotation=t.anisotropyRotation),t.fog!==void 0&&(this.fog=t.fog),t.flatShading!==void 0&&(this.flatShading=t.flatShading),t.blending!==void 0&&(this.blending=t.blending),t.combine!==void 0&&(this.combine=t.combine),t.side!==void 0&&(this.side=t.side),t.shadowSide!==void 0&&(this.shadowSide=t.shadowSide),t.opacity!==void 0&&(this.opacity=t.opacity),t.transparent!==void 0&&(this.transparent=t.transparent),t.alphaTest!==void 0&&(this.alphaTest=t.alphaTest),t.alphaHash!==void 0&&(this.alphaHash=t.alphaHash),t.depthFunc!==void 0&&(this.depthFunc=t.depthFunc),t.depthTest!==void 0&&(this.depthTest=t.depthTest),t.depthWrite!==void 0&&(this.depthWrite=t.depthWrite),t.colorWrite!==void 0&&(this.colorWrite=t.colorWrite),t.clippingPlanes!==void 0&&(this.clippingPlanes=t.clippingPlanes.map(n=>new $n().fromJSON(n))),t.clipIntersection!==void 0&&(this.clipIntersection=t.clipIntersection),t.clipShadows!==void 0&&(this.clipShadows=t.clipShadows),t.depthPacking!==void 0&&(this.depthPacking=t.depthPacking),t.blendSrc!==void 0&&(this.blendSrc=t.blendSrc),t.blendDst!==void 0&&(this.blendDst=t.blendDst),t.blendEquation!==void 0&&(this.blendEquation=t.blendEquation),t.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=t.blendSrcAlpha),t.blendDstAlpha!==void 0&&(this.blendDstAlpha=t.blendDstAlpha),t.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=t.blendEquationAlpha),t.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(t.blendColor),t.blendAlpha!==void 0&&(this.blendAlpha=t.blendAlpha),t.stencilWriteMask!==void 0&&(this.stencilWriteMask=t.stencilWriteMask),t.stencilFunc!==void 0&&(this.stencilFunc=t.stencilFunc),t.stencilRef!==void 0&&(this.stencilRef=t.stencilRef),t.stencilFuncMask!==void 0&&(this.stencilFuncMask=t.stencilFuncMask),t.stencilFail!==void 0&&(this.stencilFail=t.stencilFail),t.stencilZFail!==void 0&&(this.stencilZFail=t.stencilZFail),t.stencilZPass!==void 0&&(this.stencilZPass=t.stencilZPass),t.stencilWrite!==void 0&&(this.stencilWrite=t.stencilWrite),t.wireframe!==void 0&&(this.wireframe=t.wireframe),t.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=t.wireframeLinewidth),t.wireframeLinecap!==void 0&&(this.wireframeLinecap=t.wireframeLinecap),t.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=t.wireframeLinejoin),t.rotation!==void 0&&(this.rotation=t.rotation),t.linewidth!==void 0&&(this.linewidth=t.linewidth),t.linecap!==void 0&&(this.linecap=t.linecap),t.linejoin!==void 0&&(this.linejoin=t.linejoin),t.dashSize!==void 0&&(this.dashSize=t.dashSize),t.gapSize!==void 0&&(this.gapSize=t.gapSize),t.scale!==void 0&&(this.scale=t.scale),t.polygonOffset!==void 0&&(this.polygonOffset=t.polygonOffset),t.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=t.polygonOffsetFactor),t.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=t.polygonOffsetUnits),t.dithering!==void 0&&(this.dithering=t.dithering),t.alphaToCoverage!==void 0&&(this.alphaToCoverage=t.alphaToCoverage),t.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=t.premultipliedAlpha),t.forceSinglePass!==void 0&&(this.forceSinglePass=t.forceSinglePass),t.allowOverride!==void 0&&(this.allowOverride=t.allowOverride),t.visible!==void 0&&(this.visible=t.visible),t.toneMapped!==void 0&&(this.toneMapped=t.toneMapped),t.userData!==void 0&&(this.userData=t.userData),t.vertexColors!==void 0&&(typeof t.vertexColors=="number"?this.vertexColors=t.vertexColors>0:this.vertexColors=t.vertexColors),t.size!==void 0&&(this.size=t.size),t.sizeAttenuation!==void 0&&(this.sizeAttenuation=t.sizeAttenuation),t.map!==void 0&&(this.map=e[t.map]||null),t.matcap!==void 0&&(this.matcap=e[t.matcap]||null),t.alphaMap!==void 0&&(this.alphaMap=e[t.alphaMap]||null),t.bumpMap!==void 0&&(this.bumpMap=e[t.bumpMap]||null),t.bumpScale!==void 0&&(this.bumpScale=t.bumpScale),t.normalMap!==void 0&&(this.normalMap=e[t.normalMap]||null),t.normalMapType!==void 0&&(this.normalMapType=t.normalMapType),t.normalScale!==void 0){let n=t.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new St().fromArray(n)}return t.displacementMap!==void 0&&(this.displacementMap=e[t.displacementMap]||null),t.displacementScale!==void 0&&(this.displacementScale=t.displacementScale),t.displacementBias!==void 0&&(this.displacementBias=t.displacementBias),t.roughnessMap!==void 0&&(this.roughnessMap=e[t.roughnessMap]||null),t.metalnessMap!==void 0&&(this.metalnessMap=e[t.metalnessMap]||null),t.emissiveMap!==void 0&&(this.emissiveMap=e[t.emissiveMap]||null),t.emissiveIntensity!==void 0&&(this.emissiveIntensity=t.emissiveIntensity),t.specularMap!==void 0&&(this.specularMap=e[t.specularMap]||null),t.specularIntensityMap!==void 0&&(this.specularIntensityMap=e[t.specularIntensityMap]||null),t.specularColorMap!==void 0&&(this.specularColorMap=e[t.specularColorMap]||null),t.envMap!==void 0&&(this.envMap=e[t.envMap]||null),t.envMapRotation!==void 0&&this.envMapRotation.fromArray(t.envMapRotation),t.envMapIntensity!==void 0&&(this.envMapIntensity=t.envMapIntensity),t.reflectivity!==void 0&&(this.reflectivity=t.reflectivity),t.refractionRatio!==void 0&&(this.refractionRatio=t.refractionRatio),t.lightMap!==void 0&&(this.lightMap=e[t.lightMap]||null),t.lightMapIntensity!==void 0&&(this.lightMapIntensity=t.lightMapIntensity),t.aoMap!==void 0&&(this.aoMap=e[t.aoMap]||null),t.aoMapIntensity!==void 0&&(this.aoMapIntensity=t.aoMapIntensity),t.gradientMap!==void 0&&(this.gradientMap=e[t.gradientMap]||null),t.clearcoatMap!==void 0&&(this.clearcoatMap=e[t.clearcoatMap]||null),t.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=e[t.clearcoatRoughnessMap]||null),t.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=e[t.clearcoatNormalMap]||null),t.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new St().fromArray(t.clearcoatNormalScale)),t.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=e[t.diffuseRoughnessMap]||null),t.iridescenceMap!==void 0&&(this.iridescenceMap=e[t.iridescenceMap]||null),t.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=e[t.iridescenceThicknessMap]||null),t.transmissionMap!==void 0&&(this.transmissionMap=e[t.transmissionMap]||null),t.thicknessMap!==void 0&&(this.thicknessMap=e[t.thicknessMap]||null),t.anisotropyMap!==void 0&&(this.anisotropyMap=e[t.anisotropyMap]||null),t.sheenColorMap!==void 0&&(this.sheenColorMap=e[t.sheenColorMap]||null),t.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=e[t.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.allowOverride=t.allowOverride,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class $a extends xi{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new yt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Ci;const ji=new P,Pi=new P,Li=new P,Di=new St,ts=new St,bc=new ee,Cs=new P,es=new P,Ps=new P,Jo=new St,Zr=new St,Zo=new St;class Qo extends xe{constructor(t=new $a){if(super(),this.isSprite=!0,this.type="Sprite",Ci===void 0){Ci=new le;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new nu(e,5);Ci.setIndex([0,1,2,0,2,3]),Ci.setAttribute("position",new fr(n,3,0,!1)),Ci.setAttribute("uv",new fr(n,2,3,!1))}this.geometry=Ci,this.material=t,this.center=new St(.5,.5),this.count=1}intersectsFrustum(t){return t.intersectsSprite(this)}raycast(t,e){t.camera===null&&te('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Pi.setFromMatrixScale(this.matrixWorld),bc.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Li.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Pi.multiplyScalar(-Li.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const a=this.center;Ls(Cs.set(-.5,-.5,0),Li,a,Pi,i,r),Ls(es.set(.5,-.5,0),Li,a,Pi,i,r),Ls(Ps.set(.5,.5,0),Li,a,Pi,i,r),Jo.set(0,0),Zr.set(1,0),Zo.set(1,1);let o=t.ray.intersectTriangle(Cs,es,Ps,!1,ji);if(o===null&&(Ls(es.set(-.5,.5,0),Li,a,Pi,i,r),Zr.set(0,1),o=t.ray.intersectTriangle(Cs,Ps,es,!1,ji),o===null))return;const l=t.ray.origin.distanceTo(ji);l<t.near||l>t.far||e.push({distance:l,point:ji.clone(),uv:nn.getInterpolation(ji,Cs,es,Ps,Jo,Zr,Zo,new St),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}toJSON(t){const e=super.toJSON(t);return e.object.center=this.center.toArray(),e}}function Ls(s,t,e,n,i,r){Di.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(ts.x=r*Di.x-i*Di.y,ts.y=i*Di.x+r*Di.y):ts.copy(Di),s.copy(t),s.x+=ts.x,s.y+=ts.y,s.applyMatrix4(bc)}const Nn=new P,Qr=new P,Ds=new P,Is=new P;class Ec{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Nn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Nn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Nn.copy(this.origin).addScaledVector(this.direction,e),Nn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Qr.copy(t).add(e).multiplyScalar(.5),Ds.copy(e).sub(t).normalize(),Is.copy(this.origin).sub(Qr);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ds),o=Is.dot(this.direction),l=-Is.dot(Ds),c=Is.lengthSq(),h=Math.abs(1-a*a);let f,u,p,g;if(h>0)if(f=a*l-o,u=a*o-l,g=r*h,f>=0)if(u>=-g)if(u<=g){const y=1/h;f*=y,u*=y,p=f*(f+a*u+2*o)+u*(a*f+u+2*l)+c}else u=r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;else u=-r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;else u<=-g?(f=Math.max(0,-(-a*r+o)),u=f>0?-r:Math.min(Math.max(-r,-l),r),p=-f*f+u*(u+2*l)+c):u<=g?(f=0,u=Math.min(Math.max(-r,-l),r),p=u*(u+2*l)+c):(f=Math.max(0,-(a*r+o)),u=f>0?r:Math.min(Math.max(-r,-l),r),p=-f*f+u*(u+2*l)+c);else u=a>0?-r:r,f=Math.max(0,-(a*u+o)),p=-f*f+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,f),i&&i.copy(Qr).addScaledVector(Ds,u),p}intersectSphere(t,e){if(t.radius<0)return null;Nn.subVectors(t.center,this.origin);const n=Nn.dot(this.direction),i=Nn.dot(Nn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,e):this.at(o,e)}intersectsSphere(t){return t.radius<0?!1:this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,l;const c=1/this.direction.x,h=1/this.direction.y,f=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(r=(t.min.y-u.y)*h,a=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,a=(t.min.y-u.y)*h),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),f>=0?(o=(t.min.z-u.z)*f,l=(t.max.z-u.z)*f):(o=(t.max.z-u.z)*f,l=(t.min.z-u.z)*f),n>l||o>i)||((o>n||n!==n)&&(n=o),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Nn)!==null}intersectTriangle(t,e,n,i,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,h=o.z,f=t.x-a.x,u=t.y-a.y,p=t.z-a.z,g=e.x-a.x,y=e.y-a.y,d=e.z-a.z,m=n.x-a.x,x=n.y-a.y,T=n.z-a.z,S=Math.abs(l),b=Math.abs(c),w=Math.abs(h);let _,v,C,R,N,F,G,I,H,K,D,J;if(S>=b&&S>=w?(C=l,F=f,H=g,J=m,l>=0?(_=c,v=h,R=u,N=p,G=y,I=d,K=x,D=T):(_=h,v=c,R=p,N=u,G=d,I=y,K=T,D=x)):b>=w?(C=c,F=u,H=y,J=x,c>=0?(_=h,v=l,R=p,N=f,G=d,I=g,K=T,D=m):(_=l,v=h,R=f,N=p,G=g,I=d,K=m,D=T)):(C=h,F=p,H=d,J=T,h>=0?(_=l,v=c,R=f,N=u,G=g,I=y,K=m,D=x):(_=c,v=l,R=u,N=f,G=y,I=g,K=x,D=m)),C===0)return null;const X=_/C,V=v/C,Z=1/C,lt=R-X*F,_t=N-V*F,W=G-X*H,it=I-V*H,Y=K-X*J,rt=D-V*J,nt=Y*it-rt*W,Ct=lt*rt-_t*Y,qt=W*_t-it*lt;if(i){if(nt<0||Ct<0||qt<0)return null}else if((nt<0||Ct<0||qt<0)&&(nt>0||Ct>0||qt>0))return null;const At=nt+Ct+qt;if(At===0)return null;const Ft=Z*(nt*F+Ct*H+qt*J);return(At>0?Ft<0:Ft>0)?null:this.at(Ft/At,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class yn extends xi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new yt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.combine=Zl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const jo=new ee,ai=new Ec,Ns=new Xi,tl=new P,Us=new P,Fs=new P,Os=new P,jr=new P,Bs=new P,el=new P,zs=new P;class Nt extends xe{constructor(t=new le,e=new yn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){Bs.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const h=o[l],f=r[l];h!==0&&(jr.fromBufferAttribute(f,t),a?Bs.addScaledVector(jr,h):Bs.addScaledVector(jr.sub(e),h))}e.add(Bs)}return e}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ns.copy(n.boundingSphere),Ns.applyMatrix4(r),ai.copy(t.ray).recast(t.near),!(Ns.containsPoint(ai.origin)===!1&&(ai.intersectSphere(Ns,tl)===null||ai.origin.distanceToSquared(tl)>(t.far-t.near)**2))&&(jo.copy(r).invert(),ai.copy(t.ray).applyMatrix4(jo),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let i;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,h=r.attributes.uv1,f=r.attributes.normal,u=r.groups,p=r.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){const d=u[g],m=a[d.materialIndex],x=Math.max(d.start,p.start),T=Math.min(o.count,Math.min(d.start+d.count,p.start+p.count));for(let S=x,b=T;S<b;S+=3){const w=o.getX(S),_=o.getX(S+1),v=o.getX(S+2);i=Gs(this,m,t,n,c,h,f,w,_,v),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=d.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),y=Math.min(o.count,p.start+p.count);for(let d=g,m=y;d<m;d+=3){const x=o.getX(d),T=o.getX(d+1),S=o.getX(d+2);i=Gs(this,a,t,n,c,h,f,x,T,S),i&&(i.faceIndex=Math.floor(d/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){const d=u[g],m=a[d.materialIndex],x=Math.max(d.start,p.start),T=Math.min(l.count,Math.min(d.start+d.count,p.start+p.count));for(let S=x,b=T;S<b;S+=3){const w=S,_=S+1,v=S+2;i=Gs(this,m,t,n,c,h,f,w,_,v),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=d.materialIndex,e.push(i))}}else{const g=Math.max(0,p.start),y=Math.min(l.count,p.start+p.count);for(let d=g,m=y;d<m;d+=3){const x=d,T=d+1,S=d+2;i=Gs(this,a,t,n,c,h,f,x,T,S),i&&(i.faceIndex=Math.floor(d/3),e.push(i))}}}}function au(s,t,e,n,i,r,a,o){let l;if(t.side===He?l=n.intersectTriangle(a,r,i,!0,o):l=n.intersectTriangle(i,r,a,t.side===fi,o),l===null)return null;zs.copy(o),zs.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(zs);return c<e.near||c>e.far?null:{distance:c,point:zs.clone(),object:s}}function Gs(s,t,e,n,i,r,a,o,l,c){s.getVertexPosition(o,Us),s.getVertexPosition(l,Fs),s.getVertexPosition(c,Os);const h=au(s,t,e,n,Us,Fs,Os,el);if(h){const f=new P;nn.getBarycoord(el,Us,Fs,Os,f),i&&(h.uv=nn.getInterpolatedAttribute(i,o,l,c,f,new St)),r&&(h.uv1=nn.getInterpolatedAttribute(r,o,l,c,f,new St)),a&&(h.normal=nn.getInterpolatedAttribute(a,o,l,c,f,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:l,c,normal:new P,materialIndex:0};nn.getNormal(Us,Fs,Os,u.normal),h.face=u,h.barycoord=f}return h}class wc extends Fe{constructor(t=null,e=1,n=1,i,r,a,o,l,c=Le,h=Le,f,u){super(null,a,o,l,c,h,i,r,f,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class nl extends Ae{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Ii=new ee,il=new ee,ks=[],sl=new _i,ou=new ee,ns=new Nt,is=new Xi;class tn extends Nt{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new nl(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,ou)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new _i),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ii),sl.copy(t.boundingBox).applyMatrix4(Ii),this.boundingBox.union(sl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Xi),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Ii),is.copy(t.boundingSphere).applyMatrix4(Ii),this.boundingSphere.union(is)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),this.morphTexture=t.morphTexture!==null?t.morphTexture.clone():null,this.instanceColor=t.instanceColor!==null?t.instanceColor.clone():null,this.count=t.count,this.boundingBox=t.boundingBox!==null?t.boundingBox.clone():null,this.boundingSphere=t.boundingSphere!==null?t.boundingSphere.clone():null,this}getColorAt(t,e){return this.instanceColor===null?e.setRGB(1,1,1):e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){return e.fromArray(this.instanceMatrix.array,t*16)}getMorphAt(t,e){const n=e.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,a=t*r+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(t,e){const n=this.matrixWorld,i=this.count;if(ns.geometry=this.geometry,ns.material=this.material,ns.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),is.copy(this.boundingSphere),is.applyMatrix4(n),t.ray.intersectsSphere(is)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Ii),il.multiplyMatrices(n,Ii),ns.matrixWorld=il,ns.raycast(t,ks);for(let a=0,o=ks.length;a<o;a++){const l=ks[a];l.instanceId=r,l.object=this,e.push(l)}ks.length=0}}setColorAt(t,e){return this.instanceColor===null&&(this.instanceColor=new nl(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),e.toArray(this.instanceColor.array,t*3),this}setMatrixAt(t,e){return e.toArray(this.instanceMatrix.array,t*16),this}setMorphAt(t,e){const n=e.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new wc(new Float32Array(i*this.count),i,this.count,so,un));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=i*t;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const oi=new Xi,lu=new St(.5,.5),Hs=new P;class gs{constructor(t=new $n,e=new $n,n=new $n,i=new $n,r=new $n,a=new $n){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=dn,n=!1){const i=this.planes,r=t.elements,a=r[0],o=r[1],l=r[2],c=r[3],h=r[4],f=r[5],u=r[6],p=r[7],g=r[8],y=r[9],d=r[10],m=r[11],x=r[12],T=r[13],S=r[14],b=r[15];if(i[0].setComponents(c-a,p-h,m-g,b-x).normalize(),i[1].setComponents(c+a,p+h,m+g,b+x).normalize(),i[2].setComponents(c+o,p+f,m+y,b+T).normalize(),i[3].setComponents(c-o,p-f,m-y,b-T).normalize(),n)i[4].setComponents(l,u,d,S).normalize(),i[5].setComponents(c-l,p-u,m-d,b-S).normalize();else if(i[4].setComponents(c-l,p-u,m-d,b-S).normalize(),e===dn)i[5].setComponents(c+l,p+u,m+d,b+S).normalize();else if(e===ms)i[5].setComponents(l,u,d,S).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),oi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),oi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(oi)}intersectsSprite(t){oi.center.set(0,0,0);const e=lu.distanceTo(t.center);return oi.radius=.7071067811865476+e,oi.applyMatrix4(t.matrixWorld),this.intersectsSphere(oi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Hs.x=i.normal.x>0?t.max.x:t.min.x,Hs.y=i.normal.y>0?t.max.y:t.min.y,Hs.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Hs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const rl=new ee;class ho{constructor(){this.coordinateSystem=dn,this._frustums=[],this._count=0}setFromArrayCamera(t){const e=t.cameras,n=this._frustums;for(let i=0;i<e.length;i++){const r=e[i];rl.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[i]===void 0&&(n[i]=new gs),n[i].setFromProjectionMatrix(rl,r.coordinateSystem,r.reversedDepth)}return this._count=e.length,this}getFrustum(t){return this._frustums[t]}intersectsObject(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsObject(t))return!0;return!1}intersectsSprite(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSprite(t))return!0;return!1}intersectsSphere(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsSphere(t))return!0;return!1}intersectsBox(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].intersectsBox(t))return!0;return!1}containsPoint(t){const e=this._frustums;for(let n=0;n<this._count;n++)if(e[n].containsPoint(t))return!0;return!1}copy(t){this.coordinateSystem=t.coordinateSystem;const e=this._frustums,n=t._frustums;for(let i=0;i<t._count;i++)e[i]===void 0&&(e[i]=new gs),e[i].copy(n[i]);return this._count=t._count,this}clone(){return new ho().copy(this)}}class ui extends xi{constructor(t){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new yt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.size=t.size,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}const al=new ee,Ka=new Ec,Vs=new Xi,Ws=new P;class Oi extends xe{constructor(t=new le,e=new ui){super(),this.isPoints=!0,this.type="Points",this.geometry=t,this.material=e,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0?this.morphTargetInfluences=t.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,t.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}intersectsFrustum(t){return t.intersectsObject(this)}raycast(t,e){const n=this.geometry,i=this.matrixWorld,r=t.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(i),Vs.radius+=r,t.ray.intersectsSphere(Vs)===!1)return;al.copy(i).invert(),Ka.copy(t.ray).applyMatrix4(al);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,f=n.attributes.position;if(c!==null){const u=Math.max(0,a.start),p=Math.min(c.count,a.start+a.count);for(let g=u,y=p;g<y;g++){const d=c.getX(g);Ws.fromBufferAttribute(f,d),ol(Ws,d,l,i,t,e,this)}}else{const u=Math.max(0,a.start),p=Math.min(f.count,a.start+a.count);for(let g=u,y=p;g<y;g++)Ws.fromBufferAttribute(f,g),ol(Ws,g,l,i,t,e,this)}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function ol(s,t,e,n,i,r,a){const o=Ka.distanceSqToPoint(s);if(o<e){const l=new P;Ka.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:t,face:null,faceIndex:null,barycoord:null,object:a})}}class Tc extends Fe{constructor(t=[],e=Gi,n,i,r,a,o,l,c,h){super(t,e,n,i,r,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class vr extends Fe{constructor(t,e,n,i,r,a,o,l,c){super(t,e,n,i,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Hi extends Fe{constructor(t,e,n=An,i,r,a,o=Le,l=Le,c,h=Qn,f=1){if(h!==Qn&&h!==Zn)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:t,height:e,depth:f};super(u,i,r,a,o,l,h,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.source=new lo(Object.assign({},t.image)),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return e.compareFunction=this.compareFunction,e}}class Ac extends Hi{constructor(t,e=An,n=Gi,i,r,a=Le,o=Le,l,c=Qn){const h={width:t,height:t,depth:1},f=[h,h,h,h,h,h];super(t,t,e,n,i,r,a,o,l,c),this.image=f,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(t){this.image=t}}class Rc extends Fe{constructor(t=null){super(),this.sourceTexture=t,this.isExternalTexture=!0}copy(t){return super.copy(t),this.sourceTexture=t.sourceTexture,this}}class qi extends le{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],h=[],f=[];let u=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(f,2));function g(y,d,m,x,T,S,b,w,_,v,C){const R=S/_,N=b/v,F=S/2,G=b/2,I=w/2,H=_+1,K=v+1;let D=0,J=0;const X=new P;for(let V=0;V<K;V++){const Z=V*N-G;for(let lt=0;lt<H;lt++){const _t=lt*R-F;X[y]=_t*x,X[d]=Z*T,X[m]=I,c.push(X.x,X.y,X.z),X[y]=0,X[d]=0,X[m]=w>0?1:-1,h.push(X.x,X.y,X.z),f.push(lt/_),f.push(1-V/v),D+=1}}for(let V=0;V<v;V++)for(let Z=0;Z<_;Z++){const lt=u+Z+H*V,_t=u+Z+H*(V+1),W=u+(Z+1)+H*(V+1),it=u+(Z+1)+H*V;l.push(lt,_t,it),l.push(_t,W,it),J+=6}o.addGroup(p,J,C),p+=J,u+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qi(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}class Mr extends le{constructor(t=1,e=1,n=4,i=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:t,height:e,capSegments:n,radialSegments:i,heightSegments:r},e=Math.max(0,e),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],h=e/2,f=Math.PI/2*t,u=e,p=2*f+u,g=n*2+r,y=i+1,d=new P,m=new P;for(let x=0;x<=g;x++){let T=0,S=0,b=0,w=0;if(x<=n){const C=x/n,R=C*Math.PI/2;S=-h-t*Math.cos(R),b=t*Math.sin(R),w=-t*Math.cos(R),T=C*f}else if(x<=n+r){const C=(x-n)/r;S=-h+C*e,b=t,w=0,T=f+C*u}else{const C=(x-n-r)/n,R=C*Math.PI/2;S=h+t*Math.sin(R),b=t*Math.cos(R),w=t*Math.sin(R),T=f+u+C*f}const _=Math.max(0,Math.min(1,T/p));let v=0;x===0?v=.5/i:x===g&&(v=-.5/i);for(let C=0;C<=i;C++){const R=C/i,N=R*Math.PI*2,F=Math.sin(N),G=Math.cos(N);m.x=-b*G,m.y=S,m.z=b*F,o.push(m.x,m.y,m.z),d.set(-b*G,w,b*F),d.normalize(),l.push(d.x,d.y,d.z),c.push(R+v,_)}if(x>0){const C=(x-1)*y;for(let R=0;R<i;R++){const N=C+R,F=C+R+1,G=x*y+R,I=x*y+R+1;a.push(N,F,G),a.push(F,I,G)}}}this.setIndex(a),this.setAttribute("position",new Zt(o,3)),this.setAttribute("normal",new Zt(l,3)),this.setAttribute("uv",new Zt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mr(t.radius,t.height,t.capSegments,t.radialSegments,t.heightSegments)}}class _s extends le{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],a=[],o=[],l=[],c=new P,h=new St;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let f=0,u=3;f<=e;f++,u+=3){const p=n+f/e*i;c.x=t*Math.cos(p),c.y=t*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[u]/t+1)/2,h.y=(a[u+1]/t+1)/2,l.push(h.x,h.y)}for(let f=1;f<=e;f++)r.push(f,f+1,0);this.setIndex(r),this.setAttribute("position",new Zt(a,3)),this.setAttribute("normal",new Zt(o,3)),this.setAttribute("uv",new Zt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _s(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class cn extends le{constructor(t=1,e=1,n=1,i=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;i=Math.floor(i),r=Math.floor(r);const h=[],f=[],u=[],p=[];let g=0;const y=[],d=n/2;let m=0;x(),a===!1&&(t>0&&T(!0),e>0&&T(!1)),this.setIndex(h),this.setAttribute("position",new Zt(f,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(p,2));function x(){const S=new P,b=new P;let w=0;const _=(e-t)/n;for(let v=0;v<=r;v++){const C=[],R=v/r,N=R*(e-t)+t;for(let F=0;F<=i;F++){const G=F/i,I=G*l+o,H=Math.sin(I),K=Math.cos(I);b.x=N*H,b.y=-R*n+d,b.z=N*K,f.push(b.x,b.y,b.z),S.set(H,_,K).normalize(),u.push(S.x,S.y,S.z),p.push(G,1-R),C.push(g++)}y.push(C)}for(let v=0;v<i;v++)for(let C=0;C<r;C++){const R=y[C][v],N=y[C+1][v],F=y[C+1][v+1],G=y[C][v+1];(t>0||C!==0)&&(h.push(R,N,G),w+=3),(e>0||C!==r-1)&&(h.push(N,F,G),w+=3)}c.addGroup(m,w,0),m+=w}function T(S){const b=g,w=new St,_=new P;let v=0;const C=S===!0?t:e,R=S===!0?1:-1;for(let F=1;F<=i;F++)f.push(0,d*R,0),u.push(0,R,0),p.push(.5,.5),g++;const N=g;for(let F=0;F<=i;F++){const I=F/i*l+o,H=Math.cos(I),K=Math.sin(I);_.x=C*K,_.y=d*R,_.z=C*H,f.push(_.x,_.y,_.z),u.push(0,R,0),w.x=H*.5+.5,w.y=K*.5*R+.5,p.push(w.x,w.y),g++}for(let F=0;F<i;F++){const G=b+F,I=N+F;S===!0?h.push(I,I+1,G):h.push(I+1,I,G),v+=3}c.addGroup(m,v,S===!0?1:2),m+=v}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cn(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class bn extends cn{constructor(t=1,e=1,n=32,i=1,r=!1,a=0,o=Math.PI*2){super(0,t,e,n,i,r,a,o),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(t){return new bn(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Sr extends le{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],a=[];o(i),c(n),h(),this.setAttribute("position",new Zt(r,3)),this.setAttribute("normal",new Zt(r.slice(),3)),this.setAttribute("uv",new Zt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const T=new P,S=new P,b=new P;for(let w=0;w<e.length;w+=3)p(e[w+0],T),p(e[w+1],S),p(e[w+2],b),l(T,S,b,x)}function l(x,T,S,b){const w=b+1,_=[];for(let v=0;v<=w;v++){_[v]=[];const C=x.clone().lerp(S,v/w),R=T.clone().lerp(S,v/w),N=w-v;for(let F=0;F<=N;F++)F===0&&v===w?_[v][F]=C:_[v][F]=C.clone().lerp(R,F/N)}for(let v=0;v<w;v++)for(let C=0;C<2*(w-v)-1;C++){const R=Math.floor(C/2);C%2===0?(u(_[v][R+1]),u(_[v+1][R]),u(_[v][R])):(u(_[v][R+1]),u(_[v+1][R+1]),u(_[v+1][R]))}}function c(x){const T=new P;for(let S=0;S<r.length;S+=3)T.x=r[S+0],T.y=r[S+1],T.z=r[S+2],T.normalize().multiplyScalar(x),r[S+0]=T.x,r[S+1]=T.y,r[S+2]=T.z}function h(){const x=new P;for(let T=0;T<r.length;T+=3){x.x=r[T+0],x.y=r[T+1],x.z=r[T+2];const S=d(x)/2/Math.PI+.5,b=m(x)/Math.PI+.5;a.push(S,1-b)}g(),f()}function f(){for(let x=0;x<a.length;x+=6){const T=a[x+0],S=a[x+2],b=a[x+4],w=Math.max(T,S,b),_=Math.min(T,S,b);w>.9&&_<.1&&(T<.2&&(a[x+0]+=1),S<.2&&(a[x+2]+=1),b<.2&&(a[x+4]+=1))}}function u(x){r.push(x.x,x.y,x.z)}function p(x,T){const S=x*3;T.x=t[S+0],T.y=t[S+1],T.z=t[S+2]}function g(){const x=new P,T=new P,S=new P,b=new P,w=new St,_=new St,v=new St;for(let C=0,R=0;C<r.length;C+=9,R+=6){x.set(r[C+0],r[C+1],r[C+2]),T.set(r[C+3],r[C+4],r[C+5]),S.set(r[C+6],r[C+7],r[C+8]),w.set(a[R+0],a[R+1]),_.set(a[R+2],a[R+3]),v.set(a[R+4],a[R+5]),b.copy(x).add(T).add(S).divideScalar(3);const N=d(b);y(w,R+0,x,N),y(_,R+2,T,N),y(v,R+4,S,N)}}function y(x,T,S,b){b<0&&x.x===1&&(a[T]=x.x-1),S.x===0&&S.z===0&&(a[T]=b/2/Math.PI+.5)}function d(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Sr(t.vertices,t.indices,t.radius,t.detail)}}class pr extends Sr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,t,e),this.type="DodecahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new pr(t.radius,t.detail)}}class Gn{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){Ut("Curve: .getPoint() not implemented.")}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let a=1;a<=t;a++)n=this.getPoint(a/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e=null){const n=this.getLengths();let i=0;const r=n.length;let a;e?a=e:a=t*n[r-1];let o=0,l=r-1,c;for(;o<=l;)if(i=Math.floor(o+(l-o)/2),c=n[i]-a,c<0)o=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===a)return i/(r-1);const h=n[i],u=n[i+1]-h,p=(a-h)/u;return(i+p)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const a=this.getPoint(i),o=this.getPoint(r),l=e||(a.isVector2?new St:new P);return l.copy(o).sub(a).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e=!1){const n=new P,i=[],r=[],a=[],o=new P,l=new ee;for(let p=0;p<=t;p++){const g=p/t;i[p]=this.getTangentAt(g,new P)}r[0]=new P,a[0]=new P;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),f=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),f<=c&&(c=f,n.set(0,1,0)),u<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],o),a[0].crossVectors(i[0],r[0]);for(let p=1;p<=t;p++){if(r[p]=r[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();const g=Math.acos(Yt(i[p-1].dot(i[p]),-1,1));r[p].applyMatrix4(l.makeRotationAxis(o,g))}a[p].crossVectors(i[p],r[p])}if(e===!0){let p=Math.acos(Yt(r[0].dot(r[t]),-1,1));p/=t,i[0].dot(o.crossVectors(r[0],r[t]))>0&&(p=-p);for(let g=1;g<=t;g++)r[g].applyMatrix4(l.makeRotationAxis(i[g],p*g)),a[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:a}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}toJSON(){const t={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this.cacheArcLengths=null,this}}class Cc extends Gn{constructor(t=0,e=0,n=1,i=1,r=0,a=Math.PI*2,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(t,e=new St){const n=e,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const a=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(a?r=0:r=i),this.aClockwise===!0&&!a&&(r===i?r=-i:r=r-i);const o=this.aStartAngle+t*r;let l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){const h=Math.cos(this.aRotation),f=Math.sin(this.aRotation),u=l-this.aX,p=c-this.aY;l=u*h-p*f+this.aX,c=u*f+p*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class cu extends Cc{constructor(t,e,n,i,r,a){super(t,e,n,n,i,r,a),this.isArcCurve=!0,this.type="ArcCurve"}}function uo(){let s=0,t=0,e=0,n=0;function i(r,a,o,l){s=r,t=o,e=-3*r+3*a-2*o-l,n=2*r-2*a+o+l}return{initCatmullRom:function(r,a,o,l,c){i(a,o,c*(o-r),c*(l-a))},initNonuniformCatmullRom:function(r,a,o,l,c,h,f){let u=(a-r)/c-(o-r)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+f)+(l-o)/f;u*=h,p*=h,i(a,o,u,p)},calc:function(r){const a=r*r,o=a*r;return s+t*r+e*a+n*o}}}const ll=new P,cl=new P,ta=new uo,ea=new uo,na=new uo;class Pc extends Gn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){const n=e,i=this.points,r=i.length,a=(r-(this.closed?0:1))*t;let o=Math.floor(a),l=a-o;this.closed?o+=o>0?0:(Math.floor(Math.abs(o)/r)+1)*r:l===0&&o===r-1&&(o=r-2,l=1);let c,h;this.closed||o>0?c=i[(o-1)%r]:(cl.subVectors(i[0],i[1]).add(i[0]),c=cl);const f=i[o%r],u=i[(o+1)%r];if(this.closed||o+2<r?h=i[(o+2)%r]:(ll.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=ll),this.curveType==="centripetal"||this.curveType==="chordal"){const p=this.curveType==="chordal"?.5:.25;let g=Math.pow(c.distanceToSquared(f),p),y=Math.pow(f.distanceToSquared(u),p),d=Math.pow(u.distanceToSquared(h),p);y<1e-4&&(y=1),g<1e-4&&(g=y),d<1e-4&&(d=y),ta.initNonuniformCatmullRom(c.x,f.x,u.x,h.x,g,y,d),ea.initNonuniformCatmullRom(c.y,f.y,u.y,h.y,g,y,d),na.initNonuniformCatmullRom(c.z,f.z,u.z,h.z,g,y,d)}else this.curveType==="catmullrom"&&(ta.initCatmullRom(c.x,f.x,u.x,h.x,this.tension),ea.initCatmullRom(c.y,f.y,u.y,h.y,this.tension),na.initCatmullRom(c.z,f.z,u.z,h.z,this.tension));return n.set(ta.calc(l),ea.calc(l),na.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function hl(s,t,e,n,i){const r=(n-t)*.5,a=(i-e)*.5,o=s*s,l=s*o;return(2*e-2*n+r+a)*l+(-3*e+3*n-2*r-a)*o+r*s+e}function hu(s,t){const e=1-s;return e*e*t}function uu(s,t){return 2*(1-s)*s*t}function du(s,t){return s*s*t}function hs(s,t,e,n){return hu(s,t)+uu(s,e)+du(s,n)}function fu(s,t){const e=1-s;return e*e*e*t}function pu(s,t){const e=1-s;return 3*e*e*s*t}function mu(s,t){return 3*(1-s)*s*s*t}function gu(s,t){return s*s*s*t}function us(s,t,e,n,i){return fu(s,t)+pu(s,e)+mu(s,n)+gu(s,i)}class _u extends Gn{constructor(t=new St,e=new St,n=new St,i=new St){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new St){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(us(t,i.x,r.x,a.x,o.x),us(t,i.y,r.y,a.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class xu extends Gn{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,a=this.v2,o=this.v3;return n.set(us(t,i.x,r.x,a.x,o.x),us(t,i.y,r.y,a.y,o.y),us(t,i.z,r.z,a.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class vu extends Gn{constructor(t=new St,e=new St){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new St){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new St){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Mu extends Gn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Su extends Gn{constructor(t=new St,e=new St,n=new St){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new St){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(hs(t,i.x,r.x,a.x),hs(t,i.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Lc extends Gn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,i=this.v0,r=this.v1,a=this.v2;return n.set(hs(t,i.x,r.x,a.x),hs(t,i.y,r.y,a.y),hs(t,i.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yu extends Gn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new St){const n=e,i=this.points,r=(i.length-1)*t,a=Math.floor(r),o=r-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],f=i[a>i.length-3?i.length-1:a+2];return n.set(hl(o,l.x,c.x,h.x,f.x),hl(o,l.y,c.y,h.y,f.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new St().fromArray(i))}return this}}var bu=Object.freeze({__proto__:null,ArcCurve:cu,CatmullRomCurve3:Pc,CubicBezierCurve:_u,CubicBezierCurve3:xu,EllipseCurve:Cc,LineCurve:vu,LineCurve3:Mu,QuadraticBezierCurve:Su,QuadraticBezierCurve3:Lc,SplineCurve:yu});class fo extends Sr{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new fo(t.radius,t.detail)}}class jn extends le{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,f=t/o,u=e/l,p=[],g=[],y=[],d=[];for(let m=0;m<h;m++){const x=m*u-a;for(let T=0;T<c;T++){const S=T*f-r;g.push(S,-x,0),y.push(0,0,1),d.push(T/o),d.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<o;x++){const T=x+c*m,S=x+c*(m+1),b=x+1+c*(m+1),w=x+1+c*m;p.push(T,S,w),p.push(S,b,w)}this.setIndex(p),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(y,3)),this.setAttribute("uv",new Zt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new jn(t.width,t.height,t.widthSegments,t.heightSegments)}}class Vi extends le{constructor(t=.5,e=1,n=32,i=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],l=[],c=[],h=[];let f=t;const u=(e-t)/i,p=new P,g=new St;for(let y=0;y<=i;y++){for(let d=0;d<=n;d++){const m=r+d/n*a;p.x=f*Math.cos(m),p.y=f*Math.sin(m),l.push(p.x,p.y,p.z),c.push(0,0,1),g.x=(p.x/e+1)/2,g.y=(p.y/e+1)/2,h.push(g.x,g.y)}f+=u}for(let y=0;y<i;y++){const d=y*(n+1);for(let m=0;m<n;m++){const x=m+d,T=x,S=x+n+1,b=x+n+2,w=x+1;o.push(T,S,w),o.push(S,b,w)}}this.setIndex(o),this.setAttribute("position",new Zt(l,3)),this.setAttribute("normal",new Zt(c,3)),this.setAttribute("uv",new Zt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vi(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class di extends le{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:a,thetaLength:o},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const h=[],f=new P,u=new P,p=[],g=[],y=[],d=[];for(let m=0;m<=n;m++){const x=[],T=m/n,S=a+T*o,b=t*Math.cos(S),w=Math.sqrt(t*t-b*b);let _=0;m===0&&a===0?_=.5/e:m===n&&l===Math.PI&&(_=-.5/e);for(let v=0;v<=e;v++){const C=v/e,R=i+C*r;f.x=-w*Math.cos(R),f.y=b,f.z=w*Math.sin(R),g.push(f.x,f.y,f.z),u.copy(f).normalize(),y.push(u.x,u.y,u.z),d.push(C+_,1-T),x.push(c++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<e;x++){const T=h[m][x+1],S=h[m][x],b=h[m+1][x],w=h[m+1][x+1];(m!==0||a>0)&&p.push(T,S,w),(m!==n-1||l<Math.PI)&&p.push(S,b,w)}this.setIndex(p),this.setAttribute("position",new Zt(g,3)),this.setAttribute("normal",new Zt(y,3)),this.setAttribute("uv",new Zt(d,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new di(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class _n extends le{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),i=Math.floor(i);const l=[],c=[],h=[],f=[],u=new P,p=new P,g=new P;for(let y=0;y<=n;y++){const d=a+y/n*o;for(let m=0;m<=i;m++){const x=m/i*r;p.x=(t+e*Math.cos(d))*Math.cos(x),p.y=(t+e*Math.cos(d))*Math.sin(x),p.z=e*Math.sin(d),c.push(p.x,p.y,p.z),u.x=t*Math.cos(x),u.y=t*Math.sin(x),g.subVectors(p,u).normalize(),h.push(g.x,g.y,g.z),f.push(m/i),f.push(y/n)}}for(let y=1;y<=n;y++)for(let d=1;d<=i;d++){const m=(i+1)*y+d-1,x=(i+1)*(y-1)+d-1,T=(i+1)*(y-1)+d,S=(i+1)*y+d;l.push(m,x,S),l.push(x,T,S)}this.setIndex(l),this.setAttribute("position",new Zt(c,3)),this.setAttribute("normal",new Zt(h,3)),this.setAttribute("uv",new Zt(f,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _n(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc,t.thetaStart,t.thetaLength)}}class po extends le{constructor(t=new Lc(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,i=8,r=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:r};const a=t.computeFrenetFrames(e,r);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;const o=new P,l=new P,c=new St;let h=new P;const f=[],u=[],p=[],g=[];y(),this.setIndex(g),this.setAttribute("position",new Zt(f,3)),this.setAttribute("normal",new Zt(u,3)),this.setAttribute("uv",new Zt(p,2));function y(){for(let T=0;T<e;T++)d(T);d(r===!1?e:0),x(),m()}function d(T){h=t.getPointAt(T/e,h);const S=a.normals[T],b=a.binormals[T];for(let w=0;w<=i;w++){const _=w/i*Math.PI*2,v=Math.sin(_),C=-Math.cos(_);l.x=C*S.x+v*b.x,l.y=C*S.y+v*b.y,l.z=C*S.z+v*b.z,l.normalize(),u.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,f.push(o.x,o.y,o.z)}}function m(){for(let T=1;T<=e;T++)for(let S=1;S<=i;S++){const b=(i+1)*(T-1)+(S-1),w=(i+1)*T+(S-1),_=(i+1)*T+S,v=(i+1)*(T-1)+S;g.push(b,w,v),g.push(w,_,v)}}function x(){for(let T=0;T<=e;T++)for(let S=0;S<=i;S++)c.x=T/e,c.y=S/i,p.push(c.x,c.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new po(new bu[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}function Wi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];if(ul(i))i.isRenderTargetTexture?(Ut("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone();else if(Array.isArray(i))if(ul(i[0])){const r=[];for(let a=0,o=i.length;a<o;a++)r[a]=i[a].clone();t[e][n]=r}else t[e][n]=i.slice();else t[e][n]=i}}return t}function Ge(s){const t={};for(let e=0;e<s.length;e++){const n=Wi(s[e]);for(const i in n)t[i]=n[i]}return t}function ul(s){return s&&(s.isColor||s.isMatrix3||s.isMatrix4||s.isVector2||s.isVector3||s.isVector4||s.isTexture||s.isQuaternion)}function Eu(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Dc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:Jt.workingColorSpace}const wu={clone:Wi,merge:Ge};var Tu=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Au=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ti extends xi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Tu,this.fragmentShader=Au,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Wi(t.uniforms),this.uniformsGroups=Eu(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this.defaultAttributeValues=Object.assign({},t.defaultAttributeValues),this.index0AttributeName=t.index0AttributeName,this.uniformsNeedUpdate=t.uniformsNeedUpdate,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}fromJSON(t,e){if(super.fromJSON(t,e),t.uniforms!==void 0)for(const n in t.uniforms){const i=t.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=e[i.value]||null;break;case"c":this.uniforms[n].value=new yt().setHex(i.value);break;case"v2":this.uniforms[n].value=new St().fromArray(i.value);break;case"v3":this.uniforms[n].value=new P().fromArray(i.value);break;case"v4":this.uniforms[n].value=new fe().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Bt().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ee().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(t.defines!==void 0&&(this.defines=t.defines),t.vertexShader!==void 0&&(this.vertexShader=t.vertexShader),t.fragmentShader!==void 0&&(this.fragmentShader=t.fragmentShader),t.glslVersion!==void 0&&(this.glslVersion=t.glslVersion),t.extensions!==void 0)for(const n in t.extensions)this.extensions[n]=t.extensions[n];return t.lights!==void 0&&(this.lights=t.lights),t.clipping!==void 0&&(this.clipping=t.clipping),this}}class Ru extends ti{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ie extends xi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new yt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new yt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=qa,this.normalScale=new St(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class Cu extends xi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Pu extends xi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}class Ic extends xe{static registerNode(t){this.prototype._lightNode=t}constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new yt(t),this.intensity=e}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,e}}class Lu extends Ic{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new yt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}toJSON(t){const e=super.toJSON(t);return e.object.groundColor=this.groundColor.getHex(),e}}const ia=new ee,dl=new P,fl=new P;class Du{constructor(t){this.camera=t,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new St(512,512),this.mapType=$e,this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new gs,this._frameExtents=new St(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera;dl.setFromMatrixPosition(t.matrixWorld),e.position.copy(dl),fl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(fl),e.updateMatrixWorld(),this._updateMatrix(e,this.matrix,this._frustum)}_updateMatrix(t,e,n,i){ia.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),n.setFromProjectionMatrix(ia,t.coordinateSystem,t.reversedDepth);const r=this._frameExtents,a=i?i.z/r.x:1,o=i?i.w/r.y:1,l=i?i.x/r.x:0,c=i?i.y/r.y:0;t.coordinateSystem===ms||t.reversedDepth?e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):e.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),e.multiply(ia)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.intensity=t.intensity,this.bias=t.bias,this.radius=t.radius,this.autoUpdate=t.autoUpdate,this.needsUpdate=t.needsUpdate,this.normalBias=t.normalBias,this.blurSamples=t.blurSamples,this.mapSize.copy(t.mapSize),this.mapType=t.mapType,this.biasNode=t.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return t.intensity=this.intensity,t.bias=this.bias,t.normalBias=this.normalBias,t.radius=this.radius,t.blurSamples=this.blurSamples,t.mapSize=this.mapSize.toArray(),t.mapType=this.mapType,t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const Xs=new P,qs=new Bn,mn=new P;class Nc extends xe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorld.decompose(Xs,qs,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xs,qs,mn.set(1,1,1)).invert()}updateWorldMatrix(t,e,n=!1){super.updateWorldMatrix(t,e,n),this.matrixWorld.decompose(Xs,qs,mn),mn.x===1&&mn.y===1&&mn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Xs,qs,mn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Yn=new P,pl=new St,ml=new St;class hn extends Nc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ya*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Lr*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ya*2*Math.atan(Math.tan(Lr*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Yn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z),Yn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Yn.x,Yn.y).multiplyScalar(-t/Yn.z)}getViewSize(t,e){return this.getViewBounds(t,pl,ml),e.subVectors(ml,pl)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Lr*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*i/l,e-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}class Uc extends Nc{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}class Iu extends Du{constructor(){super(new Uc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ja extends Ic{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xe.DEFAULT_UP),this.updateMatrix(),this.target=new xe,this.shadow=new Iu}dispose(){super.dispose(),this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}toJSON(t){const e=super.toJSON(t);return e.object.shadow=this.shadow.toJSON(),e.object.target=this.target.uuid,e}}const Ni=-90,Ui=1;class Za extends xe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new hn(Ni,Ui,t,e);i.layers=this.layers,this.add(i);const r=new hn(Ni,Ui,t,e);r.layers=this.layers,this.add(r);const a=new hn(Ni,Ui,t,e);a.layers=this.layers,this.add(a);const o=new hn(Ni,Ui,t,e);o.layers=this.layers,this.add(o);const l=new hn(Ni,Ui,t,e);l.layers=this.layers,this.add(l);const c=new hn(Ni,Ui,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,a,o,l]=e;for(const c of e)this.remove(c);if(t===dn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ms)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,h]=this.children,f=t.getRenderTarget(),u=t.getActiveCubeFace(),p=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const y=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let d=!1;t.isWebGLRenderer===!0?d=t.state.buffers.depth.getReversed():d=t.reversedDepthBuffer,t.setRenderTarget(n,0,i),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,r),t.setRenderTarget(n,1,i),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,a),t.setRenderTarget(n,2,i),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,o),t.setRenderTarget(n,3,i),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,l),t.setRenderTarget(n,4,i),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,c),n.texture.mipmapsAutoUpdate=y,t.setRenderTarget(n,5,i),d&&t.autoClear===!1&&t.clearDepth(),t.render(e,h),t.setRenderTarget(f,u,p),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Nu extends hn{constructor(t=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=t,this.perCameraFrustumCulled=!1}}function gl(s,t,e,n){const i=Uu(n);switch(e){case cc:return s*t;case so:return s*t/i.components*i.byteLength;case ro:return s*t/i.components*i.byteLength;case pi:return s*t*2/i.components*i.byteLength;case ao:return s*t*2/i.components*i.byteLength;case hc:return s*t*3/i.components*i.byteLength;case Sn:return s*t*4/i.components*i.byteLength;case oo:return s*t*4/i.components*i.byteLength;case js:case tr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case er:case nr:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case _a:case va:return Math.max(s,16)*Math.max(t,8)/4;case ga:case xa:return Math.max(s,8)*Math.max(t,8)/2;case Ma:case Sa:case ba:case Ea:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*8;case ya:case or:case wa:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Ta:return Math.floor((s+3)/4)*Math.floor((t+3)/4)*16;case Aa:return Math.floor((s+4)/5)*Math.floor((t+3)/4)*16;case Ra:return Math.floor((s+4)/5)*Math.floor((t+4)/5)*16;case Ca:return Math.floor((s+5)/6)*Math.floor((t+4)/5)*16;case Pa:return Math.floor((s+5)/6)*Math.floor((t+5)/6)*16;case La:return Math.floor((s+7)/8)*Math.floor((t+4)/5)*16;case Da:return Math.floor((s+7)/8)*Math.floor((t+5)/6)*16;case Ia:return Math.floor((s+7)/8)*Math.floor((t+7)/8)*16;case Na:return Math.floor((s+9)/10)*Math.floor((t+4)/5)*16;case Ua:return Math.floor((s+9)/10)*Math.floor((t+5)/6)*16;case Fa:return Math.floor((s+9)/10)*Math.floor((t+7)/8)*16;case Oa:return Math.floor((s+9)/10)*Math.floor((t+9)/10)*16;case Ba:return Math.floor((s+11)/12)*Math.floor((t+9)/10)*16;case za:return Math.floor((s+11)/12)*Math.floor((t+11)/12)*16;case Ga:case ka:case Ha:return Math.ceil(s/4)*Math.ceil(t/4)*16;case Va:case Wa:return Math.ceil(s/4)*Math.ceil(t/4)*8;case lr:case Xa:return Math.ceil(s/4)*Math.ceil(t/4)*16}throw new Error(`Unable to determine texture byte length for ${e} format.`)}function Uu(s){switch(s){case $e:case rc:return{byteLength:1,components:1};case ps:case ac:case Rn:return{byteLength:2,components:1};case no:case io:return{byteLength:2,components:4};case An:case eo:case un:return{byteLength:4,components:1};case oc:case lc:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ja}}));typeof window<"u"&&(window.__THREE__?Ut("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ja);function Fc(){let s=null,t=!1,e=null,n=null;function i(r,a){n=s.requestAnimationFrame(i),e(r,a)}return{start:function(){t!==!0&&e!==null&&s!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s!==null&&s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Fu(s){const t=new WeakMap;function e(o,l){const c=o.array,h=o.usage,f=c.byteLength,u=s.createBuffer();s.bindBuffer(l,u),s.bufferData(l,c,h),o.onUploadCallback();let p;if(c instanceof Float32Array)p=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)p=s.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?p=s.HALF_FLOAT:p=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)p=s.SHORT;else if(c instanceof Uint32Array)p=s.UNSIGNED_INT;else if(c instanceof Int32Array)p=s.INT;else if(c instanceof Int8Array)p=s.BYTE;else if(c instanceof Uint8Array)p=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)p=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:p,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:f}}function n(o,l,c){const h=l.array,f=l.updateRanges;if(s.bindBuffer(c,o),f.length===0)s.bufferSubData(c,0,h);else{f.sort((p,g)=>p.start-g.start);let u=0;for(let p=1;p<f.length;p++){const g=f[u],y=f[p];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++u,f[u]=y)}f.length=u+1;for(let p=0,g=f.length;p<g;p++){const y=f[p];s.bufferSubData(c,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),t.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=t.get(o);l&&(s.deleteBuffer(l.buffer),t.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=t.get(o);(!h||h.version<o.version)&&t.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=t.get(o);if(c===void 0)t.set(o,e(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:i,remove:r,update:a}}var Ou=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Bu=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,zu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Gu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ku=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Hu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Vu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Wu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Xu=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,qu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Yu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,$u=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ku=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Ju=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Zu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Qu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,ju=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,td=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,ed=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,nd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,id=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,sd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,rd=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,ad=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,od=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,ld=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,cd=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,hd=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ud=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,dd="gl_FragColor = linearToOutputTexel( gl_FragColor );",fd=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,pd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,md=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,gd=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,_d=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,xd=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,vd=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Md=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Sd=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,yd=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,bd=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Ed=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,wd=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Td=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ad=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Rd=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * worldNormal, ENVMAP_MAX_LOD );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_PMREM
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureLod( envMap, envMapRotation * reflectVec, roughnessToMip( roughness ) );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureLod( envMap, envMapRotation * retroVec, roughnessToMip( roughness ) );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_PMREM
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_PMREM
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,Cd=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Pd=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Ld=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Dd=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Id=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.045 );
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef USE_DIFFUSE_ROUGHNESS
	float diffuseRoughnessFactor = diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		diffuseRoughnessFactor *= texture2D( diffuseRoughnessMap, vDiffuseRoughnessMapUv ).r;
	#endif
	material.diffuseRoughness = saturate( diffuseRoughnessFactor );
#endif
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.045 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,Nd=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float diffuseRoughness;
	#endif
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
#ifdef USE_DIFFUSE_ROUGHNESS
	const float EON_EPSILON = 1e-7;
	float FON_DirectionalAlbedo( const in float mu, const in float roughness, const in float A ) {
		float muComp = 1.0 - mu;
		float gOverPi = muComp * ( 0.0571085289 + muComp * ( 0.491881867 + muComp * ( - 0.332181442 + muComp * 0.0714429953 ) ) );
		return A * ( 1.0 + roughness * gOverPi );
	}
	vec3 BRDF_EON( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 diffuseColor, const in float roughness ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return BRDF_Lambert( rho );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float s = dot( lightDir, viewDir ) - dotNL * dotNV;
		float sOverT = ( s > 0.0 ) ? s / max( max( dotNL, dotNV ), EON_EPSILON ) : s;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		vec3 singleScatter = rho * RECIPROCAL_PI * A * ( 1.0 + roughness * sOverT );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		float albedoV = FON_DirectionalAlbedo( dotNV, roughness, A );
		float albedoL = FON_DirectionalAlbedo( dotNL, roughness, A );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		vec3 multiScatter = rhoMultiScatter * RECIPROCAL_PI
			* max( EON_EPSILON, 1.0 - albedoV )
			* max( EON_EPSILON, 1.0 - albedoL )
			/ max( EON_EPSILON, 1.0 - averageAlbedo );
		return singleScatter + multiScatter;
	}
	vec3 EON_DirectionalAlbedo( const in vec3 diffuseColor, const in float roughness, const in float dotNV ) {
		vec3 rho = saturate( diffuseColor );
		if ( roughness <= EON_EPSILON ) return rho;
		float A = 1.0 / ( 1.0 + ( 0.5 - 2.0 / ( 3.0 * PI ) ) * roughness );
		float directionalAlbedo = FON_DirectionalAlbedo( dotNV, roughness, A );
		float averageAlbedo = A * ( 1.0 + ( 2.0 / 3.0 - 28.0 / ( 15.0 * PI ) ) * roughness );
		vec3 rhoMultiScatter = rho * rho * averageAlbedo / max( vec3( EON_EPSILON ), vec3( 1.0 ) - rho * ( 1.0 - averageAlbedo ) );
		return rho * directionalAlbedo + rhoMultiScatter * ( 1.0 - directionalAlbedo );
	}
#endif
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = max( material.clearcoatRoughness, 0.045 );
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = max( material.roughness, 0.045 );
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float alphaT = max( material.alphaT, alpha );
		float V = V_GGX_SmithCorrelated_Anisotropic( alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		vec3 diffuseBRDF = BRDF_EON( directLight.direction, geometryViewDir, geometryNormal, material.diffuseColor, material.diffuseRoughness ) * ( 1.0 - material.metalness );
	#else
		vec3 diffuseBRDF = BRDF_Lambert( material.diffuseContribution );
	#endif
	reflectedLight.directDiffuse += irradiance * diffuseBRDF * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuseAlbedo = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness );
		vec3 diffuse = irradiance * RECIPROCAL_PI * diffuseAlbedo * ( 1.0 - singleScattering - multiScattering );
	#else
		vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#endif
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	#ifdef USE_DIFFUSE_ROUGHNESS
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		vec3 diffuse = EON_DirectionalAlbedo( material.diffuseColor, material.diffuseRoughness, dotNV ) * ( 1.0 - material.metalness ) * ( 1.0 - totalScatteringDielectric );
	#else
		vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	#endif
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ud=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_LIGHT_PROBE_GRIDS > 0
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		int probeGrid = - 1;
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( isInsideLightProbeGrid( probeWorldPos, probeWorldNormal, probesMin[ i ], probesMax[ i ], probesResolution[ i ] ) ) probeGrid = UNROLLED_LOOP_INDEX;
		}
		#pragma unroll_loop_end
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_LIGHT_PROBE_GRIDS; i ++ ) {
			if ( probeGrid == UNROLLED_LOOP_INDEX ) irradiance += getLightProbeGridIrradiance( probesSH[ i ], probesMin[ i ], probesMax[ i ], probesResolution[ i ], probeWorldPos, probeWorldNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Fd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_PMREM )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Od=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Bd=`#if NUM_LIGHT_PROBE_GRIDS > 0
uniform highp sampler3D probesSH[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMin[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesMax[ NUM_LIGHT_PROBE_GRIDS ];
uniform vec3 probesResolution[ NUM_LIGHT_PROBE_GRIDS ];
bool isInsideLightProbeGrid( vec3 worldPos, vec3 worldNormal, vec3 probesMin, vec3 probesMax, vec3 probesResolution ) {
	vec3 spacing = ( probesMax - probesMin ) / probesResolution;
	vec3 samplePos = worldPos + worldNormal * spacing * 0.5;
	vec3 margin = spacing * 0.01;
	return all( greaterThanEqual( samplePos, probesMin - margin ) ) && all( lessThanEqual( samplePos, probesMax + margin ) );
}
vec3 getLightProbeGridIrradiance( highp sampler3D probesSH, vec3 probesMin, vec3 probesMax, vec3 probesResolution, vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 probeSpacing = gridRange / res;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.5 / res, 1.0 - 0.5 / res );
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,zd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Gd=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,kd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Hd=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Vd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Wd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Xd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,qd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,$d=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Kd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Jd=`#if defined( USE_MORPHCOLORS )
	#if defined( USE_COLOR_ALPHA )
		vColor *= morphTargetBaseInfluence;
	#elif defined( USE_COLOR )
		vColor.rgb *= morphTargetBaseInfluence;
	#endif
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor.rgb += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Zd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Qd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,jd=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,tf=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ef=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,nf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,sf=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,rf=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,af=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,of=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,lf=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,cf=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,hf=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,uf=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,df=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,ff=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,pf=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,mf=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,gf=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,_f=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,xf=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,vf=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				vec2 radius = shadowRadius * texelSize;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float lightDistance = length( lightToPosition );
			float depthRange = shadowCameraFar - shadowCameraNear;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float depthA = - shadowCameraNear / depthRange - shadowBias;
				float depthB = shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#else
				float depthA = shadowCameraFar / depthRange + shadowBias;
				float depthB = - shadowCameraNear * shadowCameraFar / ( depthRange * lightDistance );
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			shadow = 0.0;
			for ( int i = 0; i < 5; i ++ ) {
				vec2 offset = vogelDiskSample( i, 5, phi );
				vec3 direction = bd3D + ( tangent * offset.x + bitangent * offset.y ) * texelSize;
				vec3 absDirection = abs( direction );
				float dp = depthA + depthB / max( max( absDirection.x, absDirection.y ), absDirection.z );
				shadow += texture( shadowMap, vec4( direction, dp ) );
			}
			shadow *= 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,Mf=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Sf=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,yf=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,bf=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ef=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,wf=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Tf=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Af=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Rf=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Cf=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Pf=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Lf=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Df=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,If=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	uniform mat3 diffuseRoughnessMapTransform;
	varying vec2 vDiffuseRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Uf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DIFFUSE_ROUGHNESSMAP
	vDiffuseRoughnessMapUv = ( diffuseRoughnessMapTransform * vec3( DIFFUSE_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,Ff=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Of=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Bf=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,zf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Gf=`uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <envmap_common_pars_fragment>
void main() {
	#ifdef ENVMAP_TYPE_PMREM
		vec4 texColor = textureLod( envMap, backgroundRotation * vWorldDirection, roughnessToMip( backgroundBlurriness ) );
	#else
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,kf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Hf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Vf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,Wf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,Xf=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,qf=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,Yf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,$f=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Jf=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Zf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,Qf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,jf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,tp=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ep=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,np=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,ip=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,sp=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,rp=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ap=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,op=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,lp=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DIFFUSE_ROUGHNESS
	uniform float diffuseRoughness;
	#ifdef USE_DIFFUSE_ROUGHNESSMAP
		uniform sampler2D diffuseRoughnessMap;
	#endif
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cp=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,hp=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,up=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,dp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,fp=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,pp=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,mp=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gp=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Wt={alphahash_fragment:Ou,alphahash_pars_fragment:Bu,alphamap_fragment:zu,alphamap_pars_fragment:Gu,alphatest_fragment:ku,alphatest_pars_fragment:Hu,aomap_fragment:Vu,aomap_pars_fragment:Wu,batching_pars_vertex:Xu,batching_vertex:qu,begin_vertex:Yu,beginnormal_vertex:$u,bsdfs:Ku,iridescence_fragment:Ju,bumpmap_pars_fragment:Zu,clipping_planes_fragment:Qu,clipping_planes_pars_fragment:ju,clipping_planes_pars_vertex:td,clipping_planes_vertex:ed,color_fragment:nd,color_pars_fragment:id,color_pars_vertex:sd,color_vertex:rd,common:ad,defaultnormal_vertex:od,displacementmap_pars_vertex:ld,displacementmap_vertex:cd,emissivemap_fragment:hd,emissivemap_pars_fragment:ud,colorspace_fragment:dd,colorspace_pars_fragment:fd,envmap_fragment:pd,envmap_common_pars_fragment:md,envmap_pars_fragment:gd,envmap_pars_vertex:_d,envmap_physical_pars_fragment:Rd,envmap_vertex:xd,fog_vertex:vd,fog_pars_vertex:Md,fog_fragment:Sd,fog_pars_fragment:yd,gradientmap_pars_fragment:bd,lightmap_pars_fragment:Ed,lights_lambert_fragment:wd,lights_lambert_pars_fragment:Td,lights_pars_begin:Ad,lights_toon_fragment:Cd,lights_toon_pars_fragment:Pd,lights_phong_fragment:Ld,lights_phong_pars_fragment:Dd,lights_physical_fragment:Id,lights_physical_pars_fragment:Nd,lights_fragment_begin:Ud,lights_fragment_maps:Fd,lights_fragment_end:Od,lightprobes_pars_fragment:Bd,logdepthbuf_fragment:zd,logdepthbuf_pars_fragment:Gd,logdepthbuf_pars_vertex:kd,logdepthbuf_vertex:Hd,map_fragment:Vd,map_pars_fragment:Wd,map_particle_fragment:Xd,map_particle_pars_fragment:qd,metalnessmap_fragment:Yd,metalnessmap_pars_fragment:$d,morphinstance_vertex:Kd,morphcolor_vertex:Jd,morphnormal_vertex:Zd,morphtarget_pars_vertex:Qd,morphtarget_vertex:jd,normal_fragment_begin:tf,normal_fragment_maps:ef,normal_pars_fragment:nf,normal_pars_vertex:sf,normal_vertex:rf,normalmap_pars_fragment:af,clearcoat_normal_fragment_begin:of,clearcoat_normal_fragment_maps:lf,clearcoat_pars_fragment:cf,iridescence_pars_fragment:hf,opaque_fragment:uf,packing:df,premultiplied_alpha_fragment:ff,project_vertex:pf,dithering_fragment:mf,dithering_pars_fragment:gf,roughnessmap_fragment:_f,roughnessmap_pars_fragment:xf,shadowmap_pars_fragment:vf,shadowmap_pars_vertex:Mf,shadowmap_vertex:Sf,shadowmask_pars_fragment:yf,skinbase_vertex:bf,skinning_pars_vertex:Ef,skinning_vertex:wf,skinnormal_vertex:Tf,specularmap_fragment:Af,specularmap_pars_fragment:Rf,tonemapping_fragment:Cf,tonemapping_pars_fragment:Pf,transmission_fragment:Lf,transmission_pars_fragment:Df,uv_pars_fragment:If,uv_pars_vertex:Nf,uv_vertex:Uf,worldpos_vertex:Ff,background_vert:Of,background_frag:Bf,backgroundCube_vert:zf,backgroundCube_frag:Gf,cube_vert:kf,cube_frag:Hf,depth_vert:Vf,depth_frag:Wf,distance_vert:Xf,distance_frag:qf,equirect_vert:Yf,equirect_frag:$f,linedashed_vert:Kf,linedashed_frag:Jf,meshbasic_vert:Zf,meshbasic_frag:Qf,meshlambert_vert:jf,meshlambert_frag:tp,meshmatcap_vert:ep,meshmatcap_frag:np,meshnormal_vert:ip,meshnormal_frag:sp,meshphong_vert:rp,meshphong_frag:ap,meshphysical_vert:op,meshphysical_frag:lp,meshtoon_vert:cp,meshtoon_frag:hp,points_vert:up,points_frag:dp,shadow_vert:fp,shadow_frag:pp,sprite_vert:mp,sprite_frag:gp},vt={common:{diffuse:{value:new yt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Bt}},envmap:{envMap:{value:null},envMapRotation:{value:new Bt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Bt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Bt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Bt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Bt},normalScale:{value:new St(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Bt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Bt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Bt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Bt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new yt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new yt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0},uvTransform:{value:new Bt}},sprite:{diffuse:{value:new yt(16777215)},opacity:{value:1},center:{value:new St(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Bt},alphaMap:{value:null},alphaMapTransform:{value:new Bt},alphaTest:{value:0}}},vn={basic:{uniforms:Ge([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.fog]),vertexShader:Wt.meshbasic_vert,fragmentShader:Wt.meshbasic_frag},lambert:{uniforms:Ge([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new yt(0)},envMapIntensity:{value:1}}]),vertexShader:Wt.meshlambert_vert,fragmentShader:Wt.meshlambert_frag},phong:{uniforms:Ge([vt.common,vt.specularmap,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,vt.lights,{emissive:{value:new yt(0)},specular:{value:new yt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphong_vert,fragmentShader:Wt.meshphong_frag},standard:{uniforms:Ge([vt.common,vt.envmap,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.roughnessmap,vt.metalnessmap,vt.fog,vt.lights,{emissive:{value:new yt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag},toon:{uniforms:Ge([vt.common,vt.aomap,vt.lightmap,vt.emissivemap,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.gradientmap,vt.fog,vt.lights,{emissive:{value:new yt(0)}}]),vertexShader:Wt.meshtoon_vert,fragmentShader:Wt.meshtoon_frag},matcap:{uniforms:Ge([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,vt.fog,{matcap:{value:null}}]),vertexShader:Wt.meshmatcap_vert,fragmentShader:Wt.meshmatcap_frag},points:{uniforms:Ge([vt.points,vt.fog]),vertexShader:Wt.points_vert,fragmentShader:Wt.points_frag},dashed:{uniforms:Ge([vt.common,vt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Wt.linedashed_vert,fragmentShader:Wt.linedashed_frag},depth:{uniforms:Ge([vt.common,vt.displacementmap]),vertexShader:Wt.depth_vert,fragmentShader:Wt.depth_frag},normal:{uniforms:Ge([vt.common,vt.bumpmap,vt.normalmap,vt.displacementmap,{opacity:{value:1}}]),vertexShader:Wt.meshnormal_vert,fragmentShader:Wt.meshnormal_frag},sprite:{uniforms:Ge([vt.sprite,vt.fog]),vertexShader:Wt.sprite_vert,fragmentShader:Wt.sprite_frag},background:{uniforms:{uvTransform:{value:new Bt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Wt.background_vert,fragmentShader:Wt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Bt}},vertexShader:Wt.backgroundCube_vert,fragmentShader:Wt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Wt.cube_vert,fragmentShader:Wt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Wt.equirect_vert,fragmentShader:Wt.equirect_frag},distance:{uniforms:Ge([vt.common,vt.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Wt.distance_vert,fragmentShader:Wt.distance_frag},shadow:{uniforms:Ge([vt.lights,vt.fog,{color:{value:new yt(0)},opacity:{value:1}}]),vertexShader:Wt.shadow_vert,fragmentShader:Wt.shadow_frag}};vn.physical={uniforms:Ge([vn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Bt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Bt},clearcoatNormalScale:{value:new St(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Bt},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new Bt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Bt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Bt},sheen:{value:0},sheenColor:{value:new yt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Bt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Bt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Bt},transmissionSamplerSize:{value:new St},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Bt},attenuationDistance:{value:0},attenuationColor:{value:new yt(0)},specularColor:{value:new yt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Bt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Bt},anisotropyVector:{value:new St},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Bt}}]),vertexShader:Wt.meshphysical_vert,fragmentShader:Wt.meshphysical_frag};const Ys={r:0,b:0,g:0},_p=new ee,Oc=new Bt;Oc.set(-1,0,0,0,1,0,0,0,1);function xp(s,t,e,n,i,r){const a=new yt(0);let o=i===!0?0:1,l,c,h=null,f=0,u=null;function p(x){let T=x.isScene===!0?x.background:null;if(T&&T.isTexture){const S=x.backgroundBlurriness>0;T=t.get(T,S)}return T}function g(x){let T=!1;const S=p(x);S===null?d(a,o):S&&S.isColor&&(d(S,1),T=!0);const b=s.xr.getEnvironmentBlendMode();b==="additive"?e.buffers.color.setClear(0,0,0,1,r):b==="alpha-blend"&&e.buffers.color.setClear(0,0,0,0,r),(s.autoClear||T)&&(e.buffers.depth.setTest(!0),e.buffers.depth.setMask(!0),e.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function y(x,T){const S=p(T);S&&S.isCubeTexture?(c===void 0&&(c=new Nt(new qi(1,1,1),new ti({name:"BackgroundCubeMaterial",uniforms:Wi(vn.backgroundCube.uniforms),vertexShader:vn.backgroundCube.vertexShader,fragmentShader:vn.backgroundCube.fragmentShader,side:He,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(b,w,_){this.matrixWorld.copyPosition(_.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=S,c.material.uniforms.backgroundBlurriness.value=T.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(_p.makeRotationFromEuler(T.backgroundRotation)).transpose(),S.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(Oc),c.material.toneMapped=Jt.getTransfer(S.colorSpace)!==re,(h!==S||f!==S.version||u!==s.toneMapping)&&(c.material.needsUpdate=!0,h=S,f=S.version,u=s.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Nt(new jn(2,2),new ti({name:"BackgroundMaterial",uniforms:Wi(vn.background.uniforms),vertexShader:vn.background.vertexShader,fragmentShader:vn.background.fragmentShader,side:fi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=T.backgroundIntensity,l.material.toneMapped=Jt.getTransfer(S.colorSpace)!==re,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||f!==S.version||u!==s.toneMapping)&&(l.material.needsUpdate=!0,h=S,f=S.version,u=s.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function d(x,T){x.getRGB(Ys,Dc(s)),e.buffers.color.setClear(Ys.r,Ys.g,Ys.b,T,r)}function m(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,T=1){a.set(x),o=T,d(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,d(a,o)},render:g,addToRenderList:y,dispose:m}}function vp(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=u(null);let r=i,a=!1;function o(N,F,G,I,H){let K=!1;const D=f(N,I,G,F);r!==D&&(r=D,c(r.object)),K=p(N,I,G,H),K&&g(N,I,G,H),H!==null&&t.update(H,s.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,S(N,F,G,I),H!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(H).buffer))}function l(){return s.createVertexArray()}function c(N){return s.bindVertexArray(N)}function h(N){return s.deleteVertexArray(N)}function f(N,F,G,I){const H=I.wireframe===!0;let K=n[F.id];K===void 0&&(K={},n[F.id]=K);const D=N.isInstancedMesh===!0?N.id:0;let J=K[D];J===void 0&&(J={},K[D]=J);let X=J[G.id];X===void 0&&(X={},J[G.id]=X);let V=X[H];return V===void 0&&(V=u(l()),X[H]=V),V}function u(N){const F=[],G=[],I=[];for(let H=0;H<e;H++)F[H]=0,G[H]=0,I[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:F,enabledAttributes:G,attributeDivisors:I,object:N,attributes:{},index:null}}function p(N,F,G,I){const H=r.attributes,K=F.attributes;let D=0;const J=G.getAttributes();for(const X in J)if(J[X].location>=0){const Z=H[X];let lt=K[X];if(lt===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(lt=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(lt=N.instanceColor)),Z===void 0||Z.attribute!==lt||lt&&Z.data!==lt.data)return!0;D++}return r.attributesNum!==D||r.index!==I}function g(N,F,G,I){const H={},K=F.attributes;let D=0;const J=G.getAttributes();for(const X in J)if(J[X].location>=0){let Z=K[X];Z===void 0&&(X==="instanceMatrix"&&N.instanceMatrix&&(Z=N.instanceMatrix),X==="instanceColor"&&N.instanceColor&&(Z=N.instanceColor));const lt={};lt.attribute=Z,Z&&Z.data&&(lt.data=Z.data),H[X]=lt,D++}r.attributes=H,r.attributesNum=D,r.index=I}function y(){const N=r.newAttributes;for(let F=0,G=N.length;F<G;F++)N[F]=0}function d(N){m(N,0)}function m(N,F){const G=r.newAttributes,I=r.enabledAttributes,H=r.attributeDivisors;G[N]=1,I[N]===0&&(s.enableVertexAttribArray(N),I[N]=1),H[N]!==F&&(s.vertexAttribDivisor(N,F),H[N]=F)}function x(){const N=r.newAttributes,F=r.enabledAttributes;for(let G=0,I=F.length;G<I;G++)F[G]!==N[G]&&(s.disableVertexAttribArray(G),F[G]=0)}function T(N,F,G,I,H,K,D){D===!0?s.vertexAttribIPointer(N,F,G,H,K):s.vertexAttribPointer(N,F,G,I,H,K)}function S(N,F,G,I){y();const H=I.attributes,K=G.getAttributes(),D=F.defaultAttributeValues;for(const J in K){const X=K[J];if(X.location>=0){let V=H[J];if(V===void 0&&(J==="instanceMatrix"&&N.instanceMatrix&&(V=N.instanceMatrix),J==="instanceColor"&&N.instanceColor&&(V=N.instanceColor)),V!==void 0){const Z=V.normalized,lt=V.itemSize,_t=t.get(V);if(_t===void 0)continue;const W=_t.buffer,it=_t.type,Y=_t.bytesPerElement,rt=it===s.INT||it===s.UNSIGNED_INT||V.gpuType===eo;if(V.isInterleavedBufferAttribute){const nt=V.data,Ct=nt.isInterleavedBuffer===!0?nt.stride:nt.itemSize,qt=V.offset;if(nt.isInstancedInterleavedBuffer||nt.isInstancedBufferAttribute){for(let At=0;At<X.locationSize;At++)m(X.location+At,nt.meshPerAttribute);N.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=nt.meshPerAttribute*nt.count)}else for(let At=0;At<X.locationSize;At++)d(X.location+At);s.bindBuffer(s.ARRAY_BUFFER,W);for(let At=0;At<X.locationSize;At++)T(X.location+At,lt/X.locationSize,it,Z,Ct*Y,(qt+lt/X.locationSize*At)*Y,rt)}else{if(V.isInstancedBufferAttribute){for(let nt=0;nt<X.locationSize;nt++)m(X.location+nt,V.meshPerAttribute);N.isInstancedMesh!==!0&&I._maxInstanceCount===void 0&&(I._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let nt=0;nt<X.locationSize;nt++)d(X.location+nt);s.bindBuffer(s.ARRAY_BUFFER,W);for(let nt=0;nt<X.locationSize;nt++)T(X.location+nt,lt/X.locationSize,it,Z,lt*Y,lt/X.locationSize*nt*Y,rt)}}else if(D!==void 0){const Z=D[J];if(Z!==void 0)switch(Z.length){case 2:s.vertexAttrib2fv(X.location,Z);break;case 3:s.vertexAttrib3fv(X.location,Z);break;case 4:s.vertexAttrib4fv(X.location,Z);break;default:s.vertexAttrib1fv(X.location,Z)}}}}x()}function b(){C();for(const N in n){const F=n[N];for(const G in F){const I=F[G];for(const H in I){const K=I[H];for(const D in K)h(K[D].object),delete K[D];delete I[H]}}delete n[N]}}function w(N){if(n[N.id]===void 0)return;const F=n[N.id];for(const G in F){const I=F[G];for(const H in I){const K=I[H];for(const D in K)h(K[D].object),delete K[D];delete I[H]}}delete n[N.id]}function _(N){for(const F in n){const G=n[F];for(const I in G){const H=G[I];if(H[N.id]===void 0)continue;const K=H[N.id];for(const D in K)h(K[D].object),delete K[D];delete H[N.id]}}}function v(N){for(const F in n){const G=n[F],I=N.isInstancedMesh===!0?N.id:0,H=G[I];if(H!==void 0){for(const K in H){const D=H[K];for(const J in D)h(D[J].object),delete D[J];delete H[K]}delete G[I],Object.keys(G).length===0&&delete n[F]}}}function C(){R(),a=!0,r!==i&&(r=i,c(r.object))}function R(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:C,resetDefaultState:R,dispose:b,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:_,initAttributes:y,enableAttribute:d,disableUnusedAttributes:x}}function Mp(s,t,e){let n;function i(l){n=l}function r(l,c){s.drawArrays(n,l,c),e.update(c,n,1)}function a(l,c,h){h!==0&&(s.drawArraysInstanced(n,l,c,h),e.update(c,n,h))}function o(l,c,h){if(h===0)return;t.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,h);let u=0;for(let p=0;p<h;p++)u+=c[p];e.update(u,n,1)}this.setMode=i,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Sp(s,t,e,n){let i;function r(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const _=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(_.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(_){return!(_!==Sn&&n.convert(_)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(_){const v=_===Rn&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(_!==$e&&_!==un&&!v&&n.convert(_)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE))}function l(_){if(_==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";_="mediump"}return _==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=e.precision!==void 0?e.precision:"highp";const h=l(c);h!==c&&(Ut("WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);const f=e.reversedDepthBuffer===!0&&t.has("EXT_clip_control"),u=e.logarithmicDepthBuffer===!0&&f===!1;e.reversedDepthBuffer===!0&&f===!1&&Ut("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),e.logarithmicDepthBuffer===!0&&f===!0&&Ut("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const p=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=s.getParameter(s.MAX_TEXTURE_SIZE),d=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),x=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),T=s.getParameter(s.MAX_VARYING_VECTORS),S=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),b=s.getParameter(s.MAX_SAMPLES),w=s.getParameter(s.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:f,maxTextures:p,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:d,maxAttributes:m,maxVertexUniforms:x,maxVaryings:T,maxFragmentUniforms:S,maxSamples:b,samples:w}}function yp(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new $n,o=new Bt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(f,u){const p=f.length!==0||u||n!==0||i;return i=u,n=f.length,p},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(f,u){e=h(f,u,0)},this.setState=function(f,u,p){const g=f.clippingPlanes,y=f.clipIntersection,d=f.clipShadows,m=s.get(f);if(!i||g===null||g.length===0||r&&!d)r?h(null):c();else{const x=r?0:n,T=x*4;let S=m.clippingState||null;l.value=S,S=h(g,u,T,p);for(let b=0;b!==T;++b)S[b]=e[b];m.clippingState=S,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(f,u,p,g){const y=f!==null?f.length:0;let d=null;if(y!==0){if(d=l.value,g!==!0||d===null){const m=p+y*4,x=u.matrixWorldInverse;o.getNormalMatrix(x),(d===null||d.length<m)&&(d=new Float32Array(m));for(let T=0,S=p;T!==y;++T,S+=4)a.copy(f[T]).applyMatrix4(x,o),a.normal.toArray(d,S),d[S+3]=a.constant}l.value=d,l.needsUpdate=!0}return t.numPlanes=y,t.numIntersection=0,d}}class mo extends Tn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Tc(i),this._setTextureOptions(e),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new qi(5,5,5),r=new ti({name:"CubemapFromEquirect",uniforms:Wi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:He,blending:Bi});r.uniforms.tEquirect.value=e;const a=new Nt(i,r),o=e.minFilter;return e.minFilter===Jn&&(e.minFilter=Xe),new Za(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e=!0,n=!0,i=!0){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const _l=256,bp=3,Ep=20,Bc=256,zc=16,wp=3,Tp=new P,Ap=new yt;class mr{constructor(t){this._renderer=t,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new Za(1,10,null),this._boxMesh=new Nt(new qi(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(t,e=0,n=.1,i=100,r={}){const{size:a=256,position:o=Tp}=r,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),h=this._getSourceTarget(!0);e>0&&(h.texture.mipmapsAutoUpdate=!1);const f=l.autoClear,u=l.autoClearColor,p=l.autoClearDepth,g=l.autoClearStencil,y=t.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,y===null&&(t.background=l.getClearColor(Ap));const d=new Za(n,i,h);return d.position.copy(o),d.update(l,t),l.autoClear=f,l.autoClearColor=u,l.autoClearDepth=p,l.autoClearStencil=g,t.background=y,e>0&&(h.texture.mipmapsAutoUpdate=!0,this._blur(c,e)),this._applyPMREM(c),c}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(t,e){return e>0?1-Math.sqrt(1-t/e):0}_setSize(t){this._cubeSize=Math.max(_l,Bh(t))}_fromTexture(t,e){t.mapping===Gi||t.mapping===fs?this._setSize(t.image.length===0?_l:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4);const n=e||this._allocateTarget();return this._textureToCubemap(t),this._applyPMREM(n),n}_allocateTarget(){const t=this._cubeSize,e=xl(t,!1,!1),n=Math.log2(t)-bp;for(let i=0;i<=n;i++)e.texture.mipmaps.push({width:t>>i,height:t>>i});return e.texture.name="PMREM",e.texture.isPMREMTexture=!0,e}_getSourceTarget(t=!1){const e=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==e||t&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=xl(e,!0,t)),this._sourceTarget}_compileMaterial(t){this._boxMesh.material=t,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(t,e,n){const i=this._boxMesh,r=this._cubeCamera;i.material=n,r.renderTarget=t,r.activeMipmapLevel=e;const a=t.width>>e;t.viewport.set(0,0,a,a),r.update(this._renderer,i),t.viewport.set(0,0,t.width,t.height)}_textureToCubemap(t){let e;t.mapping===Gi||t.mapping===fs?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ml()),e=this._cubemapMaterial,e.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=vl()),e=this._equirectMaterial),e.uniforms.envMap.value=t,this._renderCube(this._getSourceTarget(),0,e)}_applyPMREM(t){this._ggxMaterial===null&&(this._ggxMaterial=Rp(),this._integrationMaterial=Cp());const e=this._cubeSize,n=t.texture.mipmaps.length-1,i=this._ggxMaterial.uniforms;i.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(e/zc);for(let a=0;a<=n;a++){const o=mr.lodToRoughness(a,n);if(a>n-wp)r.roughness.value=o,this._renderCube(t,a,this._integrationMaterial);else{const l=o>0?Math.log2(e)+.5*Math.log2(6/(Bc*Math.pow(o,4)))+.5:0;i.roughness.value=o,i.lodBias.value=l,this._renderCube(t,a,this._ggxMaterial)}}}_blur(t,e){this._blurMaterial===null&&(this._blurMaterial=Pp());const n=this._blurMaterial,i=n.uniforms,r=this._sourceTarget;i.sigma.value=Math.min(e,Math.PI)/Math.SQRT2,i.envMap.value=r.texture,this._renderCube(t,0,n),i.envMap.value=t.texture,this._renderCube(r,0,n)}}function xl(s,t,e){return new mo(s,{minFilter:Jn,generateMipmaps:t,type:Rn,colorSpace:cr,depthBuffer:e})}function xs(s,t,e){return new ti({name:s,uniforms:t,vertexShader:Wt.cube_vert,fragmentShader:e,side:He,blending:Bi,depthTest:!1,depthWrite:!1})}function Rp(){return xs("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${Bc}u

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float lodBias;

		#include <common>

		// Van der Corput radical inverse
		float radicalInverse_VdC( uint bits ) {

			bits = ( bits << 16u ) | ( bits >> 16u );
			bits = ( ( bits & 0x55555555u ) << 1u ) | ( ( bits & 0xAAAAAAAAu ) >> 1u );
			bits = ( ( bits & 0x33333333u ) << 2u ) | ( ( bits & 0xCCCCCCCCu ) >> 2u );
			bits = ( ( bits & 0x0F0F0F0Fu ) << 4u ) | ( ( bits & 0xF0F0F0F0u ) >> 4u );
			bits = ( ( bits & 0x00FF00FFu ) << 8u ) | ( ( bits & 0xFF00FF00u ) >> 8u );
			return float( bits ) * 2.3283064365386963e-10; // / 0x100000000

		}

		// Hammersley sequence
		vec2 hammersley( uint i, uint N ) {

			return vec2( float( i ) / float( N ), radicalInverse_VdC( i ) );

		}

		void main() {

			vec3 N = normalize( vWorldDirection );

			// For very low roughness, just sample the environment directly
			if ( roughness < 0.001 ) {

				gl_FragColor = vec4( textureLod( envMap, N, 0.0 ).rgb, 1.0 );
				return;

			}

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			// Tangent space basis for VNDF sampling
			vec3 up = abs( N.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, N ) );
			vec3 bitangent = cross( N, tangent );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			for ( uint i = 0u; i < GGX_SAMPLES; i ++ ) {

				vec2 Xi = hammersley( i, GGX_SAMPLES );

				// With V = N, sample the reflected direction directly.
				float invQ = 1.0 / ( 1.0 - Xi.x + alpha2 * Xi.x );
				float NdotL = ( 1.0 - Xi.x - alpha2 * Xi.x ) * invQ;

				if ( NdotL > 0.0 ) {

					float phi = 2.0 * PI * Xi.y;
					float sinTheta = 2.0 * alpha * sqrt( Xi.x * ( 1.0 - Xi.x ) ) * invQ;
					vec3 L = N * NdotL + ( tangent * cos( phi ) + bitangent * sin( phi ) ) * sinTheta;

					// Match the source mip to the sample's solid angle. The terms
					// independent of the sample are precomputed in lodBias.
					float d = alpha2 * invQ;
					float lod = max( log2( d ) + lodBias, 0.0 );

					// Weight by NdotL for the split-sum approximation
					prefilteredColor += textureLod( envMap, L, lod ).rgb * NdotL;
					totalWeight += NdotL;

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Cp(){return xs("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:zc}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float roughness;
		uniform float sourceLod;
		uniform int sourceSize;

		void main() {

			vec3 N = normalize( vWorldDirection );

			float alpha = roughness * roughness;
			float alpha2 = alpha * alpha;

			float texelSize = 2.0 / float( sourceSize );

			vec3 prefilteredColor = vec3( 0.0 );
			float totalWeight = 0.0;

			// Pair opposite texels: only the one in N's hemisphere contributes.
			for ( int face = 0; face < 3; face ++ ) {

				for ( int y = 0; y < sourceSize; y ++ ) {

					for ( int x = 0; x < sourceSize; x ++ ) {

						vec2 uv = ( vec2( x, y ) + 0.5 ) * texelSize - 1.0;
						vec3 texelDirection = face == 0 ? vec3( 1.0, uv ) : ( face == 1 ? vec3( uv.x, 1.0, uv.y ) : vec3( uv, 1.0 ) );

						float invDistance = inversesqrt( 1.0 + dot( uv, uv ) );
						float NdotL = dot( N, texelDirection );
						texelDirection *= NdotL < 0.0 ? - 1.0 : 1.0;
						NdotL = abs( NdotL ) * invDistance;

						// With V = N, NdotH squared is ( 1 + NdotL ) / 2. Common factors
						// in the GGX distribution and texel solid angle cancel when normalized.
						float d = 1.0 + alpha2 + ( alpha2 - 1.0 ) * NdotL;
						float weight = NdotL * invDistance * invDistance * invDistance / ( d * d );

						prefilteredColor += textureLod( envMap, texelDirection, sourceLod ).rgb * weight;
						totalWeight += weight;

					}

				}

			}

			gl_FragColor = vec4( prefilteredColor / totalWeight, 1.0 );

		}
	`)}function Pp(){return xs("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${Ep}
		#define GOLDEN_ANGLE 2.39996322973

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float sigma;

		#include <common>

		void main() {

			vec3 outputDirection = normalize( vWorldDirection );

			vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
			vec3 tangent = normalize( cross( up, outputDirection ) );
			vec3 bitangent = cross( outputDirection, tangent );

			// Truncate the kernel at three standard deviations or at the antipode.
			float thetaMax = min( 3.0 * sigma, PI );
			float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

			vec3 accumColor = vec3( 0.0 );
			float accumWeight = 0.0;

			for ( int i = 0; i < SAMPLES; i ++ ) {

				// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
				float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
				float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
				float phi = float( i ) * GOLDEN_ANGLE;

				vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
				vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

				// Correct the planar sample density to solid angle.
				float weight = sin( theta ) / theta;

				accumColor += weight * textureLod( envMap, sampleDirection, 0.0 ).rgb;
				accumWeight += weight;

			}

			gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

		}
	`)}function vl(){return xs("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

		varying vec3 vWorldDirection;

		uniform sampler2D envMap;

		#include <common>

		void main() {

			// Average four subpixel samples to preserve small, bright features.
			vec3 direction = normalize( vWorldDirection );
			vec3 dx = dFdx( direction ) * 0.25;
			vec3 dy = dFdy( direction ) * 0.25;

			vec3 color = textureLod( envMap, equirectUv( normalize( direction - dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx - dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction - dx + dy ) ), 0.0 ).rgb;
			color += textureLod( envMap, equirectUv( normalize( direction + dx + dy ) ), 0.0 ).rgb;
			gl_FragColor = vec4( color * 0.25, 1.0 );

		}
	`)}function Ml(){return xs("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function Lp(s){let t=new WeakMap,e=new WeakMap,n=null;function i(u,p=!1){return u==null?null:p?a(u):r(u)}function r(u){if(u&&u.isTexture){const p=u.mapping;if(p===Ar||p===Rr)if(t.has(u)){const g=t.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const y=new mo(g.height);return y.fromEquirectangularTexture(s,u),t.set(u,y),u.addEventListener("dispose",c),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture&&u.isPMREMTexture!==!0){const p=u.mapping,g=p===Ar||p===Rr,y=p===Gi||p===fs;if(g||y){let d=e.get(u);const m=d!==void 0?d.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==m)return n===null&&(n=new mr(s)),d=g?n.fromEquirectangular(u,d):n.fromCubemap(u,d),d.texture.pmremVersion=u.pmremVersion,e.set(u,d),d.texture;if(d!==void 0)return d.texture;{const x=u.image;return g&&x&&x.height>0||y&&x&&l(x)?(n===null&&(n=new mr(s)),d=g?n.fromEquirectangular(u):n.fromCubemap(u),d.texture.pmremVersion=u.pmremVersion,e.set(u,d),u.addEventListener("dispose",h),d.texture):null}}}return u}function o(u,p){return p===Ar?u.mapping=Gi:p===Rr&&(u.mapping=fs),u}function l(u){let p=0;const g=6;for(let y=0;y<g;y++)u[y]!==void 0&&p++;return p===g}function c(u){const p=u.target;p.removeEventListener("dispose",c);const g=t.get(p);g!==void 0&&(t.delete(p),g.dispose())}function h(u){const p=u.target;p.removeEventListener("dispose",h);const g=e.get(p);g!==void 0&&(e.delete(p),g.dispose())}function f(){t=new WeakMap,e=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:f}}function Dp(s){const t={};function e(n){if(t[n]!==void 0)return t[n];const i=s.getExtension(n);return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&ir("WebGLRenderer: "+n+" extension not supported."),i}}}function Ip(s,t,e,n){const i={},r=new WeakMap,a=new FinalizationRegistry(g=>delete i[g]);function o(g){l(g.target)}function l(g){g.index!==null&&t.remove(g.index);for(const d in g.attributes)t.remove(g.attributes[d]);g.removeEventListener("dispose",o),delete i[g.id],a.unregister(g);const y=r.get(g);y&&(t.remove(y),r.delete(g)),n.releaseStatesOfGeometry(g),g.isInstancedBufferGeometry===!0&&delete g._maxInstanceCount,e.memory.geometries--}function c(g,y){return i[y.id]!==void 0||(y.addEventListener("dispose",o),i[y.id]=new WeakRef(y),a.register(y,y.id,y),e.memory.geometries++),y}function h(g){const y=g.attributes;for(const d in y)t.update(y[d],s.ARRAY_BUFFER)}function f(g){const y=g.index,d=g.attributes.position;let m=0;if(d===void 0)return;const x=y!==null?y.array.length:d.array.length/3-1,T=d.count>=65535?yc:Sc,S=new T(Math.ceil(x/3)*6,1),b=S.array;if(y!==null){const _=y.array;m=y.version;for(let v=0,C=0;v<x;v+=3){const R=_[v+0],N=_[v+1],F=_[v+2];b[C++]=R,b[C++]=N,b[C++]=N,b[C++]=F,b[C++]=F,b[C++]=R}}else{m=d.version;for(let _=0,v=0;_<x;_+=3){const C=_+0,R=_+1,N=_+2;b[v++]=C,b[v++]=R,b[v++]=R,b[v++]=N,b[v++]=N,b[v++]=C}}S.version=m;const w=r.get(g);w&&t.remove(w),r.set(g,S)}function u(g){const y=r.get(g);if(y){const d=g.index;d!==null&&y.version<d.version&&f(g)}else f(g);return r.get(g)}function p(){for(const g in i){const y=i[g].deref();y!==void 0&&l(y)}}return{get:c,update:h,getWireframeAttribute:u,dispose:p}}function Np(s,t,e){let n;function i(f){n=f}let r,a;function o(f){r=f.type,a=f.bytesPerElement}function l(f,u){s.drawElements(n,u,r,f*a),e.update(u,n,1)}function c(f,u,p){p!==0&&(s.drawElementsInstanced(n,u,r,f*a,p),e.update(u,n,p))}function h(f,u,p){if(p===0)return;t.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,r,f,0,p);let y=0;for(let d=0;d<p;d++)y+=u[d];e.update(y,n,1)}this.setMode=i,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=h}function Up(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case s.TRIANGLES:e.triangles+=o*(r/3);break;case s.LINES:e.lines+=o*(r/2);break;case s.LINE_STRIP:e.lines+=o*(r-1);break;case s.LINE_LOOP:e.lines+=o*r;break;case s.POINTS:e.points+=o*r;break;default:te("WebGLInfo: Unknown draw mode:",a);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Fp(s,t,e){const n=new WeakMap,i=new fe;function r(a,o,l){const c=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,f=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==f){let R=function(){v.dispose(),n.delete(o),o.removeEventListener("dispose",R)};var p=R;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,d=o.morphAttributes.color!==void 0,m=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],T=o.morphAttributes.color||[];let S=0;g===!0&&(S=1),y===!0&&(S=2),d===!0&&(S=3);let b=o.attributes.position.count*S,w=1;b>t.maxTextureSize&&(w=Math.ceil(b/t.maxTextureSize),b=t.maxTextureSize);const _=new Float32Array(b*w*4*f),v=new xc(_,b,w,f);v.type=un,v.needsUpdate=!0;const C=S*4;for(let N=0;N<f;N++){const F=m[N],G=x[N],I=T[N],H=b*w*4*N;for(let K=0;K<F.count;K++){const D=K*C;g===!0&&(i.fromBufferAttribute(F,K),_[H+D+0]=i.x,_[H+D+1]=i.y,_[H+D+2]=i.z,_[H+D+3]=0),y===!0&&(i.fromBufferAttribute(G,K),_[H+D+4]=i.x,_[H+D+5]=i.y,_[H+D+6]=i.z,_[H+D+7]=0),d===!0&&(i.fromBufferAttribute(I,K),_[H+D+8]=i.x,_[H+D+9]=i.y,_[H+D+10]=i.z,_[H+D+11]=I.itemSize===4?i.w:1)}}u={count:f,texture:v,size:new St(b,w)},n.set(o,u),o.addEventListener("dispose",R)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",a.morphTexture,e);else{let g=0;for(let d=0;d<c.length;d++)g+=c[d];const y=o.morphTargetsRelative?1:1-g;l.getUniforms().setValue(s,"morphTargetBaseInfluence",y),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",u.texture,e),l.getUniforms().setValue(s,"morphTargetsTextureSize",u.size)}return{update:r}}function Op(s,t,e,n,i){let r=new WeakMap;function a(c){const h=i.render.frame,f=c.geometry,u=t.get(c,f);if(r.get(u)!==h&&(t.update(u),r.set(u,h)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==h&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),r.set(c,h))),c.isSkinnedMesh){const p=c.skeleton;r.get(p)!==h&&(p.update(),r.set(p,h))}return u}function o(){r=new WeakMap}function l(c){const h=c.target;h.removeEventListener("dispose",l),n.releaseStatesOfObject(h),e.remove(h.instanceMatrix),h.instanceColor!==null&&e.remove(h.instanceColor)}return{update:a,dispose:o}}const Bp={[Ql]:"LINEAR_TONE_MAPPING",[jl]:"REINHARD_TONE_MAPPING",[tc]:"CINEON_TONE_MAPPING",[to]:"ACES_FILMIC_TONE_MAPPING",[nc]:"AGX_TONE_MAPPING",[ic]:"NEUTRAL_TONE_MAPPING",[ec]:"CUSTOM_TONE_MAPPING"};function zp(s,t,e,n,i,r){const a=new Tn(t,e,{type:s,depthBuffer:i,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const h=new le;h.setAttribute("position",new Zt([-1,3,0,-1,-1,0,3,-1,0],3)),h.setAttribute("uv",new Zt([0,2,0,0,2,0],2));const f=new Ru({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),u=new Nt(h,f),p=new Uc(-1,1,1,-1,0,1);let g=null,y=null,d=!1,m,x=null,T=[],S=!1;this.setSize=function(b,w){a.setSize(b,w),o!==null&&o.setSize(b,w),l!==null&&l.setSize(b,w);for(let _=0;_<T.length;_++){const v=T[_];v.setSize&&v.setSize(b,w)}},this.setEffects=function(b){T=b,S=T.length>0&&T[0].isRenderPass===!0;const w=a.width,_=a.height;T.length>0&&o===null&&(o=new Tn(w,_,{type:Rn,depthBuffer:!1,stencilBuffer:!1}),l=new Tn(w,_,{type:Rn,depthBuffer:!1,stencilBuffer:!1}));const v=i===!0&&T.some(C=>C.needsDepthTexture===!0);v!==(a.depthTexture!==null)&&(v===!0&&c===null&&(c=new Hi(w,_),r===!0&&(c.format=Zn,c.type=ki)),a.dispose(),a.depthTexture=v?c:null,a.resolveDepthBuffer=v,a.storeMultisampledDepthBuffer=v);for(let C=0;C<T.length;C++){const R=T[C];R.setSize&&R.setSize(w,_),v&&R.needsDepthTexture===!0&&R.setDepthTexture&&R.setDepthTexture(c)}},this.begin=function(b,w){if(d||b.toneMapping===On&&T.length===0)return!1;if(x=w,w!==null){const _=w.width,v=w.height;(a.width!==_||a.height!==v)&&this.setSize(_,v)}return S===!1&&b.setRenderTarget(a),m=b.toneMapping,b.toneMapping=On,!0},this.hasRenderPass=function(){return S},this.end=function(b,w){b.toneMapping=m,d=!0;let _=a,v=o;for(let C=0;C<T.length;C++){const R=T[C];R.enabled!==!1&&(R.render(b,v,_,w),R.needsSwap!==!1&&(_=v,v=v===o?l:o))}if(g!==b.outputColorSpace||y!==b.toneMapping){g=b.outputColorSpace,y=b.toneMapping,f.defines={},Jt.getTransfer(g)===re&&(f.defines.SRGB_TRANSFER="");const C=Bp[y];C&&(f.defines[C]=""),f.needsUpdate=!0}f.uniforms.tDiffuse.value=_.texture,b.setRenderTarget(x),b.render(u,p),x=null,d=!1},this.isCompositing=function(){return d},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),h.dispose(),f.dispose()}}const Gc=new Fe,kc=new Hi(1,1),Hc=new Ac(1),Vc=new xc,Wc=new Wh,Xc=new Tc,Sl=[],yl=[],bl=new Float32Array(16),El=new Float32Array(9),wl=new Float32Array(4);function Yi(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Sl[i];if(r===void 0&&(r=new Float32Array(i),Sl[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function Se(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function ye(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function yr(s,t){let e=yl[t];e===void 0&&(e=new Int32Array(t),yl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function Gp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function kp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2fv(this.addr,t),ye(e,t)}}function Hp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Se(e,t))return;s.uniform3fv(this.addr,t),ye(e,t)}}function Vp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4fv(this.addr,t),ye(e,t)}}function Wp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),ye(e,t)}else{if(Se(e,n))return;wl.set(n),s.uniformMatrix2fv(this.addr,!1,wl),ye(e,n)}}function Xp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),ye(e,t)}else{if(Se(e,n))return;El.set(n),s.uniformMatrix3fv(this.addr,!1,El),ye(e,n)}}function qp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Se(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),ye(e,t)}else{if(Se(e,n))return;bl.set(n),s.uniformMatrix4fv(this.addr,!1,bl),ye(e,n)}}function Yp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function $p(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2iv(this.addr,t),ye(e,t)}}function Kp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;s.uniform3iv(this.addr,t),ye(e,t)}}function Jp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4iv(this.addr,t),ye(e,t)}}function Zp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function Qp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Se(e,t))return;s.uniform2uiv(this.addr,t),ye(e,t)}}function jp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Se(e,t))return;s.uniform3uiv(this.addr,t),ye(e,t)}}function tm(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Se(e,t))return;s.uniform4uiv(this.addr,t),ye(e,t)}}function br(s){return s.version===0&&(s.compareFunction=fc,s.needsUpdate=!0),s}function em(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?r=br(kc):r=Gc,e.setTexture2D(t||r,i)}function nm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Wc,i)}function im(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_CUBE_SHADOW?r=br(Hc):r=Xc,e.setTextureCube(t||r,i)}function sm(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Vc,i)}function rm(s){switch(s){case 5126:return Gp;case 35664:return kp;case 35665:return Hp;case 35666:return Vp;case 35674:return Wp;case 35675:return Xp;case 35676:return qp;case 5124:case 35670:return Yp;case 35667:case 35671:return $p;case 35668:case 35672:return Kp;case 35669:case 35673:return Jp;case 5125:return Zp;case 36294:return Qp;case 36295:return jp;case 36296:return tm;case 35678:case 36198:case 36298:case 36306:case 35682:return em;case 35679:case 36299:case 36307:return nm;case 35680:case 36300:case 36308:case 36293:return im;case 36289:case 36303:case 36311:case 36292:return sm}}function am(s,t){s.uniform1fv(this.addr,t)}function om(s,t){const e=Yi(t,this.size,2);s.uniform2fv(this.addr,e)}function lm(s,t){const e=Yi(t,this.size,3);s.uniform3fv(this.addr,e)}function cm(s,t){const e=Yi(t,this.size,4);s.uniform4fv(this.addr,e)}function hm(s,t){const e=Yi(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function um(s,t){const e=Yi(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function dm(s,t){const e=Yi(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function fm(s,t){s.uniform1iv(this.addr,t)}function pm(s,t){s.uniform2iv(this.addr,t)}function mm(s,t){s.uniform3iv(this.addr,t)}function gm(s,t){s.uniform4iv(this.addr,t)}function _m(s,t){s.uniform1uiv(this.addr,t)}function xm(s,t){s.uniform2uiv(this.addr,t)}function vm(s,t){s.uniform3uiv(this.addr,t)}function Mm(s,t){s.uniform4uiv(this.addr,t)}function Sm(s,t,e){const n=this.cache,i=t.length,r=yr(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));let a;this.type===s.SAMPLER_2D_SHADOW?a=br(kc):a=Gc;for(let o=0;o!==i;++o)e.setTexture2D(t[o]||a,r[o])}function ym(s,t,e){const n=this.cache,i=t.length,r=yr(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Wc,r[a])}function bm(s,t,e){const n=this.cache,i=t.length,r=yr(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));let a;this.type===s.SAMPLER_CUBE_SHADOW?a=br(Hc):a=Xc;for(let o=0;o!==i;++o)e.setTextureCube(t[o]||a,r[o])}function Em(s,t,e){const n=this.cache,i=t.length,r=yr(e,i);Se(n,r)||(s.uniform1iv(this.addr,r),ye(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Vc,r[a])}function wm(s){switch(s){case 5126:return am;case 35664:return om;case 35665:return lm;case 35666:return cm;case 35674:return hm;case 35675:return um;case 35676:return dm;case 5124:case 35670:return fm;case 35667:case 35671:return pm;case 35668:case 35672:return mm;case 35669:case 35673:return gm;case 5125:return _m;case 36294:return xm;case 36295:return vm;case 36296:return Mm;case 35678:case 36198:case 36298:case 36306:case 35682:return Sm;case 35679:case 36299:case 36307:return ym;case 35680:case 36300:case 36308:case 36293:return bm;case 36289:case 36303:case 36311:case 36292:return Em}}class Tm{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=rm(e.type)}}class Am{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=wm(e.type)}}class Rm{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const sa=/(\w+)(\])?(\[|\.)?/g;function Tl(s,t){s.seq.push(t),s.map[t.id]=t}function Cm(s,t,e){const n=s.name,i=n.length;for(sa.lastIndex=0;;){const r=sa.exec(n),a=sa.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===i){Tl(e,c===void 0?new Tm(o,s,t):new Am(o,s,t));break}else{let f=e.map[o];f===void 0&&(f=new Rm(o),Tl(e,f)),e=f}}}class sr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=t.getActiveUniform(e,a),l=t.getUniformLocation(e,o.name);Cm(o,l,this)}const i=[],r=[];for(const a of this.seq)a.type===t.SAMPLER_2D_SHADOW||a.type===t.SAMPLER_CUBE_SHADOW||a.type===t.SAMPLER_2D_ARRAY_SHADOW?i.push(a):r.push(a);i.length>0&&(this.seq=i.concat(r))}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Al(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Pm=37297;let Lm=0;function Dm(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}const Rl=new Bt;function Im(s){Jt._getMatrix(Rl,Jt.workingColorSpace,s);const t=`mat3( ${Rl.elements.map(e=>e.toFixed(4))} )`;switch(Jt.getTransfer(s)){case hr:return[t,"LinearTransferOETF"];case re:return[t,"sRGBTransferOETF"];default:return Ut("WebGLProgram: Unsupported color space: ",s),[t,"LinearTransferOETF"]}}function Cl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),r=(s.getShaderInfoLog(t)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return e.toUpperCase()+`

`+r+`

`+Dm(s.getShaderSource(t),o)}else return r}function Nm(s,t){const e=Im(t);return[`vec4 ${s}( vec4 value ) {`,`	return ${e[1]}( vec4( ${e[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const Um={[Ql]:"Linear",[jl]:"Reinhard",[tc]:"Cineon",[to]:"ACESFilmic",[nc]:"AgX",[ic]:"Neutral",[ec]:"Custom"};function Fm(s,t){const e=Um[t];return e===void 0?(Ut("WebGLProgram: Unsupported toneMapping:",t),"vec3 "+s+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}const $s=new P;function Om(){Jt.getLuminanceCoefficients($s);const s=$s.x.toFixed(4),t=$s.y.toFixed(4),e=$s.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${t}, ${e} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Bm(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(os).join(`
`)}function zm(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Gm(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===s.FLOAT_MAT2&&(o=2),r.type===s.FLOAT_MAT3&&(o=3),r.type===s.FLOAT_MAT4&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function os(s){return s!==""}function Pl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_SUN_LIGHTS/g,t.numSunLights).replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,t.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,t.numLightProbeGrids)}function Ll(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const km=/^[ \t]*#include +<([\w\d./]+)>/gm;function Qa(s){return s.replace(km,Hm)}function Hm(s,t){const e=Wt[t];if(e===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+t+">");return Qa(e)}const Vm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dl(s){return s.replace(Vm,Wm)}function Wm(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Il(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}const Xm={[ls]:"SHADOWMAP_TYPE_PCF",[as]:"SHADOWMAP_TYPE_VSM"};function qm(s){return Xm[s.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Ym={[fs]:"ENVMAP_MODE_REFRACTION"};function $m(s){return s.envMap===!1?"ENVMAP_MODE_REFLECTION":Ym[s.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Km={[Zl]:"ENVMAP_BLENDING_MULTIPLY",[yh]:"ENVMAP_BLENDING_MIX",[bh]:"ENVMAP_BLENDING_ADD"};function Jm(s){return s.envMap===!1?"ENVMAP_BLENDING_NONE":Km[s.combine]||"ENVMAP_BLENDING_NONE"}function Zm(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const l=qm(e),c=e.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",h=$m(e),f=Jm(e),u=Bm(e),p=zm(r),g=i.createProgram();let y,d,m=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(y=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(os).join(`
`),y.length>0&&(y+=`
`),d=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p].filter(os).join(`
`),d.length>0&&(d+=`
`)):(y=[Il(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.batchingColor?"#define USE_BATCHING_COLOR":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+e.diffuseRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexNormals?"#define HAS_NORMAL":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(os).join(`
`),d=[Il(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,p,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+f:"",e.envMapPMREM?"#define ENVMAP_MAX_LOD "+e.envMapMaxLod+".0":"",e.envMapPMREM?"#define ENVMAP_SIZE "+e.envMapSize+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",e.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.retroreflection?"#define USE_RETROREFLECTION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas||e.batchingColor?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",e.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",e.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==On?"#define TONE_MAPPING":"",e.toneMapping!==On?Wt.tonemapping_pars_fragment:"",e.toneMapping!==On?Fm("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Wt.colorspace_pars_fragment,Nm("linearToOutputTexel",e.outputColorSpace),Om(),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(os).join(`
`)),a=Qa(a),a=Pl(a,e),a=Ll(a,e),o=Qa(o),o=Pl(o,e),o=Ll(o,e),a=Dl(a),o=Dl(o),e.isRawShaderMaterial!==!0&&(m=`#version 300 es
`,y=[u,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+y,d=["#define varying in",e.glslVersion===Fo?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Fo?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const x=m+y+a,T=m+d+o,S=Al(i,i.VERTEX_SHADER,x),b=Al(i,i.FRAGMENT_SHADER,T);i.attachShader(g,S),i.attachShader(g,b),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.hasPositionAttribute===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function w(R){if(s.debug.checkShaderErrors){const N=i.getProgramInfoLog(g)||"",F=i.getShaderInfoLog(S)||"",G=i.getShaderInfoLog(b)||"",I=N.trim(),H=F.trim(),K=G.trim();let D=!0,J=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(D=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,g,S,b);else{const X=Cl(i,S,"vertex"),V=Cl(i,b,"fragment");te("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+I+`
`+X+`
`+V)}else I!==""?Ut("WebGLProgram: Program Info Log:",I):(H===""||K==="")&&(J=!1);J&&(R.diagnostics={runnable:D,programLog:I,vertexShader:{log:H,prefix:y},fragmentShader:{log:K,prefix:d}})}i.deleteShader(S),i.deleteShader(b),_=new sr(i,g),v=Gm(i,g)}let _;this.getUniforms=function(){return _===void 0&&w(this),_};let v;this.getAttributes=function(){return v===void 0&&w(this),v};let C=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return C===!1&&(C=i.getProgramParameter(g,Pm)),C},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Lm++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=b,this}let Qm=0;class jm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t,e,n){const i=this._getShaderCacheForMaterial(t);return i.has(e)===!1&&(i.add(e),e.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderStage(t){return this._getShaderStage(t.vertexShader)}getFragmentShaderStage(t){return this._getShaderStage(t.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new t0(t),e.set(t,n)),n}}class t0{constructor(t){this.id=Qm++,this.code=t,this.usedTimes=0}}function e0(s){return s===pi||s===or||s===lr}function n0(s,t,e,n,i,r){const a=new vc,o=new jm,l=new Set,c=[],h=new Map,f=n.logarithmicDepthBuffer,u={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function p(_){return l.add(_),_===0?"uv":`uv${_}`}function g(_,v,C,R,N,F){const G=R.fog,I=N.geometry,H=_.isMeshStandardMaterial||_.isMeshLambertMaterial||_.isMeshPhongMaterial?R.environment:null,K=_.isMeshStandardMaterial||_.isMeshLambertMaterial&&!_.envMap||_.isMeshPhongMaterial&&!_.envMap,D=t.get(_.envMap||H,K),J=u[_.type];let X=n.precision;_.precision!==null&&(X=n.getMaxPrecision(_.precision),X!==_.precision&&Ut("WebGLProgram.getParameters:",_.precision,"not supported, using",X,"instead."));const V=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,Z=V!==void 0?V.length:0;let lt=0;I.morphAttributes.position!==void 0&&(lt=1),I.morphAttributes.normal!==void 0&&(lt=2),I.morphAttributes.color!==void 0&&(lt=3);let _t,W,it,Y;if(J){const xt=vn[J];_t=xt.vertexShader,W=xt.fragmentShader}else{_t=_.vertexShader,W=_.fragmentShader;const xt=o.getVertexShaderStage(_),se=o.getFragmentShaderStage(_);o.update(_,xt,se),it=xt.id,Y=se.id}const rt=s.getRenderTarget(),nt=s.state.buffers.depth.getReversed(),Ct=N.isInstancedMesh===!0,qt=N.isBatchedMesh===!0,At=!!_.map,Ft=!!_.matcap,kt=!!D,Ht=kt&&D.isPMREMTexture===!0,Re=!!_.aoMap,ve=!!_.lightMap,Ve=!!_.bumpMap&&_.wireframe===!1,ue=!!_.normalMap,pn=!!_.displacementMap,be=!!_.emissiveMap,Ke=!!_.metalnessMap,Je=!!_.roughnessMap,Ze=_.anisotropy>0,O=_.clearcoat>0,Qe=_.diffuseRoughness>0,ce=_.dispersion>0,he=_.retroreflectivity>0,gt=_.iridescence>0,Me=_.sheen>0,Lt=_.transmission>0,Ot=Ze&&!!_.anisotropyMap,A=O&&!!_.clearcoatMap,M=O&&!!_.clearcoatNormalMap,z=O&&!!_.clearcoatRoughnessMap,st=Qe&&!!_.diffuseRoughnessMap,et=gt&&!!_.iridescenceMap,ct=gt&&!!_.iridescenceThicknessMap,pt=Me&&!!_.sheenColorMap,Q=Me&&!!_.sheenRoughnessMap,j=!!_.specularMap,ut=!!_.specularColorMap,L=!!_.specularIntensityMap,tt=Lt&&!!_.transmissionMap,$=Lt&&!!_.thicknessMap,dt=!!_.gradientMap,ot=!!_.alphaMap,ht=_.alphaTest>0,Rt=!!_.alphaHash,Vt=!!_.extensions;let at=On;_.toneMapped&&(rt===null||rt.isXRRenderTarget===!0)&&(at=s.toneMapping);const Pt=Ht?D.isCompressedCubeTexture?D.image[0].mipmaps:D.mipmaps:null,Gt={shaderID:J,shaderType:_.type,shaderName:_.name,vertexShader:_t,fragmentShader:W,defines:_.defines,customVertexShaderID:it,customFragmentShaderID:Y,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:X,batching:qt,batchingColor:qt&&N._colorsTexture!==null,instancing:Ct,instancingColor:Ct&&N.instanceColor!==null,instancingMorph:Ct&&N.morphTexture!==null,outputColorSpace:rt===null?s.outputColorSpace:rt.isXRRenderTarget===!0?rt.texture.colorSpace:Jt.workingColorSpace,alphaToCoverage:!!_.alphaToCoverage,map:At,matcap:Ft,envMap:kt,envMapMode:kt&&D.mapping,envMapPMREM:Ht,envMapMaxLod:Ht?Pt.length-1:null,envMapSize:Ht?Pt[0].width:null,aoMap:Re,lightMap:ve,bumpMap:Ve,normalMap:ue,displacementMap:pn,emissiveMap:be,normalMapObjectSpace:ue&&_.normalMapType===Th,normalMapTangentSpace:ue&&_.normalMapType===qa,packedNormalMap:ue&&_.normalMapType===qa&&e0(_.normalMap.format),metalnessMap:Ke,roughnessMap:Je,anisotropy:Ze,anisotropyMap:Ot,clearcoat:O,clearcoatMap:A,clearcoatNormalMap:M,clearcoatRoughnessMap:z,diffuseRoughness:Qe,diffuseRoughnessMap:st,dispersion:ce,retroreflection:he,iridescence:gt,iridescenceMap:et,iridescenceThicknessMap:ct,sheen:Me,sheenColorMap:pt,sheenRoughnessMap:Q,specularMap:j,specularColorMap:ut,specularIntensityMap:L,transmission:Lt,transmissionMap:tt,thicknessMap:$,gradientMap:dt,opaque:_.transparent===!1&&_.blending===cs&&_.alphaToCoverage===!1,alphaMap:ot,alphaTest:ht,alphaHash:Rt,combine:_.combine,mapUv:At&&p(_.map.channel),aoMapUv:Re&&p(_.aoMap.channel),lightMapUv:ve&&p(_.lightMap.channel),bumpMapUv:Ve&&p(_.bumpMap.channel),normalMapUv:ue&&p(_.normalMap.channel),displacementMapUv:pn&&p(_.displacementMap.channel),emissiveMapUv:be&&p(_.emissiveMap.channel),metalnessMapUv:Ke&&p(_.metalnessMap.channel),roughnessMapUv:Je&&p(_.roughnessMap.channel),anisotropyMapUv:Ot&&p(_.anisotropyMap.channel),clearcoatMapUv:A&&p(_.clearcoatMap.channel),clearcoatNormalMapUv:M&&p(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&p(_.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:st&&p(_.diffuseRoughnessMap.channel),iridescenceMapUv:et&&p(_.iridescenceMap.channel),iridescenceThicknessMapUv:ct&&p(_.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&p(_.sheenColorMap.channel),sheenRoughnessMapUv:Q&&p(_.sheenRoughnessMap.channel),specularMapUv:j&&p(_.specularMap.channel),specularColorMapUv:ut&&p(_.specularColorMap.channel),specularIntensityMapUv:L&&p(_.specularIntensityMap.channel),transmissionMapUv:tt&&p(_.transmissionMap.channel),thicknessMapUv:$&&p(_.thicknessMap.channel),alphaMapUv:ot&&p(_.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(ue||Ze),vertexNormals:!!I.attributes.normal,vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!I.attributes.uv&&(At||ot),fog:!!G,useFog:_.fog===!0,fogExp2:!!G&&G.isFogExp2,flatShading:_.wireframe===!1&&(_.flatShading===!0||I.attributes.normal===void 0&&ue===!1&&(_.isMeshLambertMaterial||_.isMeshPhongMaterial||_.isMeshStandardMaterial||_.isMeshPhysicalMaterial)),sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:f,reversedDepthBuffer:nt,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:I.attributes.position!==void 0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:Z,morphTextureStride:lt,numSunLights:v.sun.length,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numSunLightShadows:v.sunShadowMap.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numLightProbeGrids:F.filter(xt=>xt.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:at,decodeVideoTexture:At&&_.map.isVideoTexture===!0&&Jt.getTransfer(_.map.colorSpace)===re,decodeVideoTextureEmissive:be&&_.emissiveMap.isVideoTexture===!0&&Jt.getTransfer(_.emissiveMap.colorSpace)===re,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===ke,flipSided:_.side===He,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionClipCullDistance:Vt&&_.extensions.clipCullDistance===!0&&e.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Vt&&_.extensions.multiDraw===!0||qt)&&e.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:e.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()};return Gt.vertexUv1s=l.has(1),Gt.vertexUv2s=l.has(2),Gt.vertexUv3s=l.has(3),l.clear(),Gt}function y(_){const v=[];if(_.shaderID?v.push(_.shaderID):(v.push(_.customVertexShaderID),v.push(_.customFragmentShaderID)),_.defines!==void 0)for(const C in _.defines)v.push(C),v.push(_.defines[C]);return _.isRawShaderMaterial===!1&&(d(v,_),m(v,_),v.push(s.outputColorSpace)),v.push(_.customProgramCacheKey),v.join()}function d(_,v){_.push(v.precision),_.push(v.outputColorSpace),_.push(v.envMapMode),_.push(v.envMapPMREM),_.push(v.envMapMaxLod),_.push(v.envMapSize),_.push(v.mapUv),_.push(v.alphaMapUv),_.push(v.lightMapUv),_.push(v.aoMapUv),_.push(v.bumpMapUv),_.push(v.normalMapUv),_.push(v.displacementMapUv),_.push(v.emissiveMapUv),_.push(v.metalnessMapUv),_.push(v.roughnessMapUv),_.push(v.anisotropyMapUv),_.push(v.clearcoatMapUv),_.push(v.clearcoatNormalMapUv),_.push(v.clearcoatRoughnessMapUv),_.push(v.diffuseRoughnessMapUv),_.push(v.iridescenceMapUv),_.push(v.iridescenceThicknessMapUv),_.push(v.sheenColorMapUv),_.push(v.sheenRoughnessMapUv),_.push(v.specularMapUv),_.push(v.specularColorMapUv),_.push(v.specularIntensityMapUv),_.push(v.transmissionMapUv),_.push(v.thicknessMapUv),_.push(v.combine),_.push(v.fogExp2),_.push(v.sizeAttenuation),_.push(v.morphTargetsCount),_.push(v.numSunLights),_.push(v.numDirLights),_.push(v.numPointLights),_.push(v.numSpotLights),_.push(v.numSpotLightMaps),_.push(v.numHemiLights),_.push(v.numRectAreaLights),_.push(v.numSunLightShadows),_.push(v.numDirLightShadows),_.push(v.numPointLightShadows),_.push(v.numSpotLightShadows),_.push(v.numSpotLightShadowsWithMaps),_.push(v.numLightProbes),_.push(v.numLightProbeGrids),_.push(v.shadowMapType),_.push(v.toneMapping),_.push(v.numClippingPlanes),_.push(v.numClipIntersection),_.push(v.depthPacking)}function m(_,v){a.disableAll(),v.instancing&&a.enable(0),v.instancingColor&&a.enable(1),v.instancingMorph&&a.enable(2),v.matcap&&a.enable(3),v.envMap&&a.enable(4),v.normalMapObjectSpace&&a.enable(5),v.normalMapTangentSpace&&a.enable(6),v.clearcoat&&a.enable(7),v.iridescence&&a.enable(8),v.alphaTest&&a.enable(9),v.vertexColors&&a.enable(10),v.vertexAlphas&&a.enable(11),v.vertexUv1s&&a.enable(12),v.vertexUv2s&&a.enable(13),v.vertexUv3s&&a.enable(14),v.vertexTangents&&a.enable(15),v.anisotropy&&a.enable(16),v.alphaHash&&a.enable(17),v.batching&&a.enable(18),v.dispersion&&a.enable(19),v.retroreflection&&a.enable(24),v.diffuseRoughness&&a.enable(25),v.batchingColor&&a.enable(20),v.gradientMap&&a.enable(21),v.packedNormalMap&&a.enable(22),v.vertexNormals&&a.enable(23),_.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),v.numLightProbeGrids>0&&a.enable(22),v.hasPositionAttribute&&a.enable(23),_.push(a.mask)}function x(_){const v=u[_.type];let C;if(v){const R=vn[v];C=wu.clone(R.uniforms)}else C=_.uniforms;return C}function T(_,v){let C=h.get(v);return C!==void 0?++C.usedTimes:(C=new Zm(s,v,_,i),c.push(C),h.set(v,C)),C}function S(_){if(--_.usedTimes===0){const v=c.indexOf(_);c[v]=c[c.length-1],c.pop(),h.delete(_.cacheKey),_.destroy()}}function b(_){o.remove(_)}function w(){o.dispose()}return{getParameters:g,getProgramCacheKey:y,getUniforms:x,acquireProgram:T,releaseProgram:S,releaseShaderCache:b,programs:c,dispose:w}}function i0(){let s=new WeakMap;function t(a){return s.has(a)}function e(a){let o=s.get(a);return o===void 0&&(o={},s.set(a,o)),o}function n(a){s.delete(a)}function i(a,o,l){s.get(a)[o]=l}function r(){s=new WeakMap}return{has:t,get:e,remove:n,update:i,dispose:r}}function s0(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.materialVariant!==t.materialVariant?s.materialVariant-t.materialVariant:s.z!==t.z?s.z-t.z:s.id-t.id}function Nl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Ul(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(u){let p=0;return u.isInstancedMesh&&(p+=2),u.isSkinnedMesh&&(p+=1),p}function o(u,p,g,y,d,m){let x=s[t];return x===void 0?(x={id:u.id,object:u,geometry:p,material:g,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:d,group:m},s[t]=x):(x.id=u.id,x.object=u,x.geometry=p,x.material=g,x.materialVariant=a(u),x.groupOrder=y,x.renderOrder=u.renderOrder,x.z=d,x.group=m),t++,x}function l(u,p,g,y,d,m,x){x.reversedDepth===!0&&(d=-d);const T=o(u,p,g,y,d,m);g.transmission>0?n.push(T):g.transparent===!0?i.push(T):e.push(T)}function c(u,p,g,y,d,m){const x=o(u,p,g,y,d,m);g.transmission>0?n.unshift(x):g.transparent===!0?i.unshift(x):e.unshift(x)}function h(u,p){e.length>1&&e.sort(u||s0),n.length>1&&n.sort(p||Nl),i.length>1&&i.sort(p||Nl)}function f(){for(let u=t,p=s.length;u<p;u++){const g=s[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:l,unshift:c,finish:f,sort:h}}function r0(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Ul,s.set(n,[a])):i>=r.length?(a=new Ul,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function a0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={direction:new P,color:new yt};break;case"SpotLight":e={position:new P,direction:new P,color:new yt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new yt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new yt,groundColor:new yt};break;case"RectAreaLight":e={color:new yt,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function o0(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"SunLight":case"DirectionalLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"SpotLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St};break;case"PointLight":e={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new St,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let l0=0;function c0(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function h0(s){const t=new a0,e=o0(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new P);const i=new P,r=new ee,a=new ee;function o(c){let h=0,f=0,u=0;for(let F=0;F<9;F++)n.probe[F].set(0,0,0);let p=0,g=0,y=0,d=0,m=0,x=0,T=0,S=0,b=0,w=0,_=0,v=0,C=0,R=0;c.sort(c0);for(let F=0,G=c.length;F<G;F++){const I=c[F],H=I.color,K=I.intensity,D=I.distance;let J=null;if(I.shadow&&I.shadow.map&&(I.shadow.map.texture.format===pi?J=I.shadow.map.texture:J=I.shadow.map.depthTexture||I.shadow.map.texture),I.isAmbientLight)h+=H.r*K,f+=H.g*K,u+=H.b*K;else if(I.isLightProbe){for(let X=0;X<9;X++)n.probe[X].addScaledVector(I.sh.coefficients[X],K);R++}else if(I.isSunLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const V=I.shadow,Z=e.get(I);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize.copy(V.mapSize).multiply(V.getFrameExtents()),n.sunShadow[g]=Z,n.sunShadowMap[g]=J;const lt=V.getViewportCount();for(let _t=0;_t<lt;_t++)n.sunShadowMatrix[y+_t]=V.getMatrix(_t),n.sunShadowCascade[y+_t]=V._cascadeData[_t];y+=lt,g++}n.sun[p]=X,p++}else if(I.isDirectionalLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),I.castShadow){const V=I.shadow,Z=e.get(I);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,n.directionalShadow[d]=Z,n.directionalShadowMap[d]=J,n.directionalShadowMatrix[d]=I.shadow.matrix,b++}n.directional[d]=X,d++}else if(I.isSpotLight){const X=t.get(I);X.position.setFromMatrixPosition(I.matrixWorld),X.color.copy(H).multiplyScalar(K),X.distance=D,X.coneCos=Math.cos(I.angle),X.penumbraCos=Math.cos(I.angle*(1-I.penumbra)),X.decay=I.decay,n.spot[x]=X;const V=I.shadow;if(I.map&&(n.spotLightMap[v]=I.map,v++,V.updateMatrices(I),I.castShadow&&C++),n.spotLightMatrix[x]=V.matrix,I.castShadow){const Z=e.get(I);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,n.spotShadow[x]=Z,n.spotShadowMap[x]=J,_++}x++}else if(I.isRectAreaLight){const X=t.get(I);X.color.copy(H).multiplyScalar(K),X.halfWidth.set(I.width*.5,0,0),X.halfHeight.set(0,I.height*.5,0),n.rectArea[T]=X,T++}else if(I.isPointLight){const X=t.get(I);if(X.color.copy(I.color).multiplyScalar(I.intensity),X.distance=I.distance,X.decay=I.decay,I.castShadow){const V=I.shadow,Z=e.get(I);Z.shadowIntensity=V.intensity,Z.shadowBias=V.bias,Z.shadowNormalBias=V.normalBias,Z.shadowRadius=V.radius,Z.shadowMapSize=V.mapSize,Z.shadowCameraNear=V.camera.near,Z.shadowCameraFar=V.camera.far,n.pointShadow[m]=Z,n.pointShadowMap[m]=J,n.pointShadowMatrix[m]=I.shadow.matrix,w++}n.point[m]=X,m++}else if(I.isHemisphereLight){const X=t.get(I);X.skyColor.copy(I.color).multiplyScalar(K),X.groundColor.copy(I.groundColor).multiplyScalar(K),n.hemi[S]=X,S++}}T>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=vt.LTC_FLOAT_1,n.rectAreaLTC2=vt.LTC_FLOAT_2):(n.rectAreaLTC1=vt.LTC_HALF_1,n.rectAreaLTC2=vt.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=f,n.ambient[2]=u;const N=n.hash;(N.sunLength!==p||N.directionalLength!==d||N.pointLength!==m||N.spotLength!==x||N.rectAreaLength!==T||N.hemiLength!==S||N.numSunShadows!==g||N.numDirectionalShadows!==b||N.numPointShadows!==w||N.numSpotShadows!==_||N.numSpotMaps!==v||N.numLightProbes!==R)&&(n.sun.length=p,n.directional.length=d,n.spot.length=x,n.rectArea.length=T,n.point.length=m,n.hemi.length=S,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=b,n.directionalShadowMap.length=b,n.directionalShadowMatrix.length=b,n.pointShadow.length=w,n.pointShadowMap.length=w,n.pointShadowMatrix.length=w,n.spotShadow.length=_,n.spotShadowMap.length=_,n.spotLightMatrix.length=_+v-C,n.spotLightMap.length=v,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=R,N.sunLength=p,N.directionalLength=d,N.pointLength=m,N.spotLength=x,N.rectAreaLength=T,N.hemiLength=S,N.numSunShadows=g,N.numDirectionalShadows=b,N.numPointShadows=w,N.numSpotShadows=_,N.numSpotMaps=v,N.numLightProbes=R,n.version=l0++)}function l(c,h){let f=0,u=0,p=0,g=0,y=0,d=0;const m=h.matrixWorldInverse;for(let x=0,T=c.length;x<T;x++){const S=c[x];if(S.isSunLight){const b=n.sun[f];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(m),f++}else if(S.isDirectionalLight){const b=n.directional[u];b.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),u++}else if(S.isSpotLight){const b=n.spot[g];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(m),b.direction.setFromMatrixPosition(S.matrixWorld),i.setFromMatrixPosition(S.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(m),g++}else if(S.isRectAreaLight){const b=n.rectArea[y];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(m),a.identity(),r.copy(S.matrixWorld),r.premultiply(m),a.extractRotation(r),b.halfWidth.set(S.width*.5,0,0),b.halfHeight.set(0,S.height*.5,0),b.halfWidth.applyMatrix4(a),b.halfHeight.applyMatrix4(a),y++}else if(S.isPointLight){const b=n.point[p];b.position.setFromMatrixPosition(S.matrixWorld),b.position.applyMatrix4(m),p++}else if(S.isHemisphereLight){const b=n.hemi[d];b.direction.setFromMatrixPosition(S.matrixWorld),b.direction.transformDirection(m),d++}}}return{setup:o,setupView:l,state:n}}function Fl(s){const t=new h0(s),e=[],n=[],i=[];function r(f){h.camera=f,e.length=0,n.length=0,i.length=0}function a(f){f.isLightProbeGrid?i.push(f):e.push(f)}function o(f){n.push(f)}function l(){t.setup(e),i.sort((f,u)=>f.priority-u.priority||f.id-u.id)}function c(f){t.setupView(e,f)}const h={lightsArray:e,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:t,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function u0(s){let t=new WeakMap;function e(i,r=0){const a=t.get(i);let o;return a===void 0?(o=new Fl(s),t.set(i,[o])):r>=a.length?(o=new Fl(s),a.push(o)):o=a[r],o}function n(){t=new WeakMap}return{get:e,dispose:n}}const d0=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,f0=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,p0=[new P(1,0,0),new P(-1,0,0),new P(0,1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1)],m0=[new P(0,-1,0),new P(0,-1,0),new P(0,0,1),new P(0,0,-1),new P(0,-1,0),new P(0,-1,0)],Ol=new ee,ss=new P,ra=new P;function g0(s,t,e){let n=new gs;const i=new St,r=new St,a=new fe,o=new Cu,l=new Pu,c={},h=e.maxTextureSize,f={[fi]:He,[He]:fi,[ke]:ke},u=new ti({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new St},radius:{value:4}},vertexShader:d0,fragmentShader:f0}),p=u.clone();p.defines.HORIZONTAL_PASS=1;const g=new le;g.setAttribute("position",new Ae(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Nt(g,u),d=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ls;let m=this.type;this.render=function(w,_,v){if(d.enabled===!1||d.autoUpdate===!1&&d.needsUpdate===!1||w.length===0)return;this.type===ih&&(Ut("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ls);const C=s.getRenderTarget(),R=s.getActiveCubeFace(),N=s.getActiveMipmapLevel(),F=s.state;F.setBlending(Bi),F.buffers.depth.getReversed()===!0?F.buffers.color.setClear(0,0,0,0):F.buffers.color.setClear(1,1,1,1),F.buffers.depth.setTest(!0),F.setScissorTest(!1);const G=m!==this.type;G&&_.traverse(function(I){I.material&&(Array.isArray(I.material)?I.material.forEach(H=>H.needsUpdate=!0):I.material.needsUpdate=!0)});for(let I=0,H=w.length;I<H;I++){const K=w[I],D=K.shadow;if(D===void 0){Ut("WebGLShadowMap:",K,"has no shadow.");continue}if(D.autoUpdate===!1&&D.needsUpdate===!1)continue;i.copy(D.mapSize);const J=D.getFrameExtents();i.multiply(J),r.copy(D.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/J.x),i.x=r.x*J.x,D.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/J.y),i.y=r.y*J.y,D.mapSize.y=r.y));const X=s.state.buffers.depth.getReversed();if(D.camera._reversedDepth=X,D.map===null||G===!0){if(D.map!==null&&(D.map.depthTexture!==null&&(D.map.depthTexture.dispose(),D.map.depthTexture=null),D.map.dispose()),this.type===as){if(K.isPointLight){Ut("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}D.map=new Tn(i.x,i.y,{format:pi,type:Rn,minFilter:Xe,magFilter:Xe,generateMipmaps:!1}),D.map.texture.name=K.name+".shadowMap",D.map.depthTexture=new Hi(i.x,i.y,un),D.map.depthTexture.name=K.name+".shadowMapDepth",D.map.depthTexture.format=Qn,D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Le,D.map.depthTexture.magFilter=Le}else K.isPointLight?(D.map=new mo(i.x),D.map.depthTexture=new Ac(i.x,An)):(D.map=new Tn(i.x,i.y),D.map.depthTexture=new Hi(i.x,i.y,An)),D.map.depthTexture.name=K.name+".shadowMap",D.map.depthTexture.format=Qn,this.type===ls?(D.map.depthTexture.compareFunction=X?dc:uc,D.map.depthTexture.minFilter=Xe,D.map.depthTexture.magFilter=Xe):(D.map.depthTexture.compareFunction=null,D.map.depthTexture.minFilter=Le,D.map.depthTexture.magFilter=Le);D.camera.updateProjectionMatrix()}D.map.isWebGLCubeRenderTarget!==!0&&(D.map.width!==i.x||D.map.height!==i.y)&&D.map.setSize(i.x,i.y);const V=D.map.isWebGLCubeRenderTarget?6:D.getViewportCount();K.isPointLight!==!0&&D.updateMatrices(K,v);const Z=(D.camera.layers.mask&4294967294)!==0?D.camera.layers:v.layers;for(let lt=0;lt<V;lt++){const _t=D.getCamera(lt);if(K.isPointLight){const W=D.camera,it=D.matrix,Y=K.distance||W.far;Y!==W.far&&(W.far=Y,W.updateProjectionMatrix()),ss.setFromMatrixPosition(K.matrixWorld),W.position.copy(ss),ra.copy(W.position),ra.add(p0[lt]),W.up.copy(m0[lt]),W.lookAt(ra),W.updateMatrixWorld(),it.makeTranslation(-ss.x,-ss.y,-ss.z),Ol.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),D._frustum.setFromProjectionMatrix(Ol,W.coordinateSystem,W.reversedDepth)}if(D.map.isWebGLCubeRenderTarget)s.setRenderTarget(D.map,lt),s.clear();else{lt===0&&(s.setRenderTarget(D.map),s.clear());const W=D.getViewport(lt);a.set(r.x*W.x,r.y*W.y,r.x*W.z,r.y*W.w),F.viewport(a)}n=D.getFrustum(lt),S(_,v,_t,K,Z,this.type)}D.isPointLightShadow!==!0&&this.type===as&&x(D,v),D.needsUpdate=!1}m=this.type,d.needsUpdate=!1,s.setRenderTarget(C,R,N)};function x(w,_){const v=t.update(y);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,p.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,p.needsUpdate=!0),w.mapPass===null?w.mapPass=new Tn(i.x,i.y,{format:pi,type:Rn}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,s.setRenderTarget(w.mapPass),s.clear(),s.renderBufferDirect(_,null,v,u,y,null),p.uniforms.shadow_pass.value=w.mapPass.texture,p.uniforms.resolution.value.set(w.map.width,w.map.height),p.uniforms.radius.value=w.radius,s.setRenderTarget(w.map),s.clear(),s.renderBufferDirect(_,null,v,p,y,null)}function T(w,_,v,C){let R=null;const N=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(N!==void 0)R=N;else if(R=v.isPointLight===!0?l:o,s.localClippingEnabled&&_.clipShadows===!0&&Array.isArray(_.clippingPlanes)&&_.clippingPlanes.length!==0||_.displacementMap&&_.displacementScale!==0||_.alphaMap&&_.alphaTest>0||_.map&&_.alphaTest>0||_.alphaToCoverage===!0){const F=R.uuid,G=_.uuid;let I=c[F];I===void 0&&(I={},c[F]=I);let H=I[G];H===void 0&&(H=R.clone(),I[G]=H,_.addEventListener("dispose",b)),R=H}if(R.visible=_.visible,R.wireframe=_.wireframe,C===as?R.side=_.shadowSide!==null?_.shadowSide:_.side:R.side=_.shadowSide!==null?_.shadowSide:f[_.side],R.alphaMap=_.alphaMap,R.alphaTest=_.alphaToCoverage===!0?.5:_.alphaTest,R.map=_.map,R.clipShadows=_.clipShadows,R.clippingPlanes=_.clippingPlanes,R.clipIntersection=_.clipIntersection,R.displacementMap=_.displacementMap,R.displacementScale=_.displacementScale,R.displacementBias=_.displacementBias,R.wireframeLinewidth=_.wireframeLinewidth,R.linewidth=_.linewidth,v.isPointLight===!0&&R.isMeshDistanceMaterial===!0){const F=s.properties.get(R);F.light=v}return R}function S(w,_,v,C,R,N){if(w.visible===!1)return;if(w.layers.test(R)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&N===as)&&(!w.frustumCulled||w.intersectsFrustum(n))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);const I=t.update(w),H=w.material;if(Array.isArray(H)){const K=I.groups;for(let D=0,J=K.length;D<J;D++){const X=K[D],V=H[X.materialIndex];if(V&&V.visible){const Z=T(w,V,C,N);w.onBeforeShadow(s,w,_,v,I,Z,X),s.renderBufferDirect(v,null,I,Z,w,X),w.onAfterShadow(s,w,_,v,I,Z,X)}}}else if(H.visible){const K=T(w,H,C,N);w.onBeforeShadow(s,w,_,v,I,K,null),s.renderBufferDirect(v,null,I,K,w,null),w.onAfterShadow(s,w,_,v,I,K,null)}}const G=w.children;for(let I=0,H=G.length;I<H;I++)S(G[I],_,v,C,R,N)}function b(w){w.target.removeEventListener("dispose",b);for(const v in c){const C=c[v],R=w.target.uuid;R in C&&(C[R].dispose(),delete C[R])}}}function _0(s,t){function e(){let L=!1;const tt=new fe;let $=null;const dt=new fe(0,0,0,0);return{setMask:function(ot){$!==ot&&!L&&(s.colorMask(ot,ot,ot,ot),$=ot)},setLocked:function(ot){L=ot},setClear:function(ot,ht,Rt,Vt,at){at===!0&&(ot*=Vt,ht*=Vt,Rt*=Vt),tt.set(ot,ht,Rt,Vt),dt.equals(tt)===!1&&(s.clearColor(ot,ht,Rt,Vt),dt.copy(tt))},reset:function(){L=!1,$=null,dt.set(-1,0,0,0)}}}function n(){let L=!1,tt=!1,$=null,dt=null,ot=null;return{setReversed:function(ht){if(tt!==ht){const Rt=t.get("EXT_clip_control");ht?Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.ZERO_TO_ONE_EXT):Rt.clipControlEXT(Rt.LOWER_LEFT_EXT,Rt.NEGATIVE_ONE_TO_ONE_EXT),tt=ht;const Vt=ot;ot=null,this.setClear(Vt)}},getReversed:function(){return tt},setTest:function(ht){ht?nt(s.DEPTH_TEST):Ct(s.DEPTH_TEST)},setMask:function(ht){$!==ht&&!L&&(s.depthMask(ht),$=ht)},setFunc:function(ht){if(tt&&(ht=Fh[ht]),dt!==ht){switch(ht){case la:s.depthFunc(s.NEVER);break;case ca:s.depthFunc(s.ALWAYS);break;case ha:s.depthFunc(s.LESS);break;case ds:s.depthFunc(s.LEQUAL);break;case ua:s.depthFunc(s.EQUAL);break;case da:s.depthFunc(s.GEQUAL);break;case fa:s.depthFunc(s.GREATER);break;case pa:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}dt=ht}},setLocked:function(ht){L=ht},setClear:function(ht){ot!==ht&&(ot=ht,tt&&(ht=1-ht),s.clearDepth(ht))},reset:function(){L=!1,$=null,dt=null,ot=null,tt=!1}}}function i(){let L=!1,tt=null,$=null,dt=null,ot=null,ht=null,Rt=null,Vt=null,at=null;return{setTest:function(Pt){L||(Pt?nt(s.STENCIL_TEST):Ct(s.STENCIL_TEST))},setMask:function(Pt){tt!==Pt&&!L&&(s.stencilMask(Pt),tt=Pt)},setFunc:function(Pt,Gt,xt){($!==Pt||dt!==Gt||ot!==xt)&&(s.stencilFunc(Pt,Gt,xt),$=Pt,dt=Gt,ot=xt)},setOp:function(Pt,Gt,xt){(ht!==Pt||Rt!==Gt||Vt!==xt)&&(s.stencilOp(Pt,Gt,xt),ht=Pt,Rt=Gt,Vt=xt)},setLocked:function(Pt){L=Pt},setClear:function(Pt){at!==Pt&&(s.clearStencil(Pt),at=Pt)},reset:function(){L=!1,tt=null,$=null,dt=null,ot=null,ht=null,Rt=null,Vt=null,at=null}}}const r=new e,a=new n,o=new i;let l={};const c=new WeakMap;let h={},f={},u={},p=new WeakMap,g=[],y=null,d=!1,m=null,x=null,T=null,S=null,b=null,w=null,_=null,v=new yt(0,0,0),C=0,R=!1,N=null,F=null,G=null,I=null,H=null;const K=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let D=!1,J=0;const X=s.getParameter(s.VERSION);X.indexOf("WebGL")!==-1?(J=parseFloat(/^WebGL (\d)/.exec(X)[1]),D=J>=1):X.indexOf("OpenGL ES")!==-1&&(J=parseFloat(/^OpenGL ES (\d)/.exec(X)[1]),D=J>=2);let V=null,Z={};const lt=s.getParameter(s.SCISSOR_BOX),_t=s.getParameter(s.VIEWPORT),W=new fe().fromArray(lt),it=new fe().fromArray(_t);function Y(L,tt,$,dt){const ot=new Uint8Array(4),ht=s.createTexture();s.bindTexture(L,ht),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Rt=0;Rt<$;Rt++)L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY?s.texImage3D(tt,0,s.RGBA,1,1,dt,0,s.RGBA,s.UNSIGNED_BYTE,ot):s.texImage2D(tt+Rt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ot);return ht}const rt={};rt[s.TEXTURE_2D]=Y(s.TEXTURE_2D,s.TEXTURE_2D,1),rt[s.TEXTURE_CUBE_MAP]=Y(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),rt[s.TEXTURE_2D_ARRAY]=Y(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),rt[s.TEXTURE_3D]=Y(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),nt(s.DEPTH_TEST),a.setFunc(ds),Ve(!1),ue(Io),nt(s.CULL_FACE),Re(Bi);function nt(L){h[L]!==!0&&(s.enable(L),h[L]=!0)}function Ct(L){h[L]!==!1&&(s.disable(L),h[L]=!1)}function qt(L,tt){return u[L]!==tt?(s.bindFramebuffer(L,tt),u[L]=tt,L===s.DRAW_FRAMEBUFFER&&(u[s.FRAMEBUFFER]=tt),L===s.FRAMEBUFFER&&(u[s.DRAW_FRAMEBUFFER]=tt),!0):!1}function At(L,tt){let $=g,dt=!1;if(L){$=p.get(tt),$===void 0&&($=[],p.set(tt,$));const ot=L.textures;if($.length!==ot.length||$[0]!==s.COLOR_ATTACHMENT0){for(let ht=0,Rt=ot.length;ht<Rt;ht++)$[ht]=s.COLOR_ATTACHMENT0+ht;$.length=ot.length,dt=!0}}else $[0]!==s.BACK&&($[0]=s.BACK,dt=!0);dt&&s.drawBuffers($)}function Ft(L){return y!==L?(s.useProgram(L),y=L,!0):!1}const kt={[Fi]:s.FUNC_ADD,[rh]:s.FUNC_SUBTRACT,[ah]:s.FUNC_REVERSE_SUBTRACT};kt[oh]=s.MIN,kt[lh]=s.MAX;const Ht={[ch]:s.ZERO,[hh]:s.ONE,[uh]:s.SRC_COLOR,[Kl]:s.SRC_ALPHA,[_h]:s.SRC_ALPHA_SATURATE,[mh]:s.DST_COLOR,[fh]:s.DST_ALPHA,[dh]:s.ONE_MINUS_SRC_COLOR,[Jl]:s.ONE_MINUS_SRC_ALPHA,[gh]:s.ONE_MINUS_DST_COLOR,[ph]:s.ONE_MINUS_DST_ALPHA,[xh]:s.CONSTANT_COLOR,[vh]:s.ONE_MINUS_CONSTANT_COLOR,[Mh]:s.CONSTANT_ALPHA,[Sh]:s.ONE_MINUS_CONSTANT_ALPHA};function Re(L,tt,$,dt,ot,ht,Rt,Vt,at,Pt){if(L===Bi){d===!0&&(Ct(s.BLEND),d=!1);return}if(d===!1&&(nt(s.BLEND),d=!0),L!==sh){if(L!==m||Pt!==R){if((x!==Fi||b!==Fi)&&(s.blendEquation(s.FUNC_ADD),x=Fi,b=Fi),Pt)switch(L){case cs:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case en:s.blendFunc(s.ONE,s.ONE);break;case No:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Uo:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:te("WebGLState: Invalid blending: ",L);break}else switch(L){case cs:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case en:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case No:te("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Uo:te("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:te("WebGLState: Invalid blending: ",L);break}T=null,S=null,w=null,_=null,v.set(0,0,0),C=0,m=L,R=Pt}return}ot=ot||tt,ht=ht||$,Rt=Rt||dt,(tt!==x||ot!==b)&&(s.blendEquationSeparate(kt[tt],kt[ot]),x=tt,b=ot),($!==T||dt!==S||ht!==w||Rt!==_)&&(s.blendFuncSeparate(Ht[$],Ht[dt],Ht[ht],Ht[Rt]),T=$,S=dt,w=ht,_=Rt),(Vt.equals(v)===!1||at!==C)&&(s.blendColor(Vt.r,Vt.g,Vt.b,at),v.copy(Vt),C=at),m=L,R=!1}function ve(L,tt){L.side===ke?Ct(s.CULL_FACE):nt(s.CULL_FACE);let $=L.side===He;tt&&($=!$),Ve($),L.blending===cs&&L.transparent===!1?Re(Bi):Re(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const dt=L.stencilWrite;o.setTest(dt),dt&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),be(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?nt(s.SAMPLE_ALPHA_TO_COVERAGE):Ct(s.SAMPLE_ALPHA_TO_COVERAGE)}function Ve(L){N!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),N=L)}function ue(L){L!==eh?(nt(s.CULL_FACE),L!==F&&(L===Io?s.cullFace(s.BACK):L===nh?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Ct(s.CULL_FACE),F=L}function pn(L){L!==G&&(D&&s.lineWidth(L),G=L)}function be(L,tt,$){L?(nt(s.POLYGON_OFFSET_FILL),(I!==tt||H!==$)&&(I=tt,H=$,a.getReversed()&&(tt=-tt,$=-$),s.polygonOffset(tt,$))):Ct(s.POLYGON_OFFSET_FILL)}function Ke(L){L?nt(s.SCISSOR_TEST):Ct(s.SCISSOR_TEST)}function Je(L){L===void 0&&(L=s.TEXTURE0+K-1),V!==L&&(s.activeTexture(L),V=L)}function Ze(L,tt,$){$===void 0&&(V===null?$=s.TEXTURE0+K-1:$=V);let dt=Z[$];dt===void 0&&(dt={type:void 0,texture:void 0},Z[$]=dt),(dt.type!==L||dt.texture!==tt)&&(V!==$&&(s.activeTexture($),V=$),s.bindTexture(L,tt||rt[L]),dt.type=L,dt.texture=tt)}function O(){const L=Z[V];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function Qe(){try{s.compressedTexImage2D(...arguments)}catch(L){te("WebGLState:",L)}}function ce(){try{s.compressedTexImage3D(...arguments)}catch(L){te("WebGLState:",L)}}function he(){try{s.texSubImage2D(...arguments)}catch(L){te("WebGLState:",L)}}function gt(){try{s.texSubImage3D(...arguments)}catch(L){te("WebGLState:",L)}}function Me(){try{s.compressedTexSubImage2D(...arguments)}catch(L){te("WebGLState:",L)}}function Lt(){try{s.compressedTexSubImage3D(...arguments)}catch(L){te("WebGLState:",L)}}function Ot(){try{s.texStorage2D(...arguments)}catch(L){te("WebGLState:",L)}}function A(){try{s.texStorage3D(...arguments)}catch(L){te("WebGLState:",L)}}function M(){try{s.texImage2D(...arguments)}catch(L){te("WebGLState:",L)}}function z(){try{s.texImage3D(...arguments)}catch(L){te("WebGLState:",L)}}function st(L){return f[L]!==void 0?f[L]:s.getParameter(L)}function et(L,tt){f[L]!==tt&&(s.pixelStorei(L,tt),f[L]=tt)}function ct(L){W.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),W.copy(L))}function pt(L){it.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),it.copy(L))}function Q(L,tt){let $=c.get(tt);$===void 0&&($=new WeakMap,c.set(tt,$));let dt=$.get(L);dt===void 0&&(dt=s.getUniformBlockIndex(tt,L.name),s.uniformBlockBinding(tt,dt,dt),$.set(L,dt))}function j(L,tt,$){const ot=c.get(tt).get(L);l[ot]!==$&&(s.bindBufferBase(s.UNIFORM_BUFFER,ot,$),l[ot]=$)}function ut(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),a.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),s.pixelStorei(s.PACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.BROWSER_DEFAULT_WEBGL),s.pixelStorei(s.PACK_ROW_LENGTH,0),s.pixelStorei(s.PACK_SKIP_PIXELS,0),s.pixelStorei(s.PACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),h={},f={},V=null,Z={},u={},l={},p=new WeakMap,g=[],y=null,d=!1,m=null,x=null,T=null,S=null,b=null,w=null,_=null,v=new yt(0,0,0),C=0,R=!1,N=null,F=null,G=null,I=null,H=null,W.set(0,0,s.canvas.width,s.canvas.height),it.set(0,0,s.canvas.width,s.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:nt,disable:Ct,bindFramebuffer:qt,drawBuffers:At,useProgram:Ft,setBlending:Re,setMaterial:ve,setFlipSided:Ve,setCullFace:ue,setLineWidth:pn,setPolygonOffset:be,setScissorTest:Ke,activeTexture:Je,bindTexture:Ze,unbindTexture:O,compressedTexImage2D:Qe,compressedTexImage3D:ce,texImage2D:M,texImage3D:z,pixelStorei:et,getParameter:st,updateUBOMapping:Q,uniformBlockBinding:j,texStorage2D:Ot,texStorage3D:A,texSubImage2D:he,texSubImage3D:gt,compressedTexSubImage2D:Me,compressedTexSubImage3D:Lt,scissor:ct,viewport:pt,reset:ut}}function x0(s,t,e,n,i,r,a){const o=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new St,h=new WeakMap,f=new Set;let u;const p=new WeakMap,g=new Set,y=new FinalizationRegistry(A=>g.delete(A));let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function m(A,M){return d?new OffscreenCanvas(A,M):ur("canvas")}function x(A,M,z){let st=1;const et=Ot(A);if((et.width>z||et.height>z)&&(st=z/Math.max(et.width,et.height)),st<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const ct=Math.floor(st*et.width),pt=Math.floor(st*et.height);u===void 0&&(u=m(ct,pt));const Q=M?m(ct,pt):u;return Q.width=ct,Q.height=pt,Q.getContext("2d").drawImage(A,0,0,ct,pt),Ut("WebGLRenderer: Texture has been resized from ("+et.width+"x"+et.height+") to ("+ct+"x"+pt+")."),Q}else return"data"in A&&Ut("WebGLRenderer: Image in DataTexture is too big ("+et.width+"x"+et.height+")."),A;return A}function T(A){return A.generateMipmaps}function S(A){s.generateMipmap(A)}function b(A){return A.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?s.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function w(A,M,z,st,et,ct=!1){if(A!==null){if(s[A]!==void 0)return s[A];Ut("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let pt;st&&(pt=t.get("EXT_texture_norm16"),pt||Ut("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=M;if(M===s.RED&&(z===s.FLOAT&&(Q=s.R32F),z===s.HALF_FLOAT&&(Q=s.R16F),z===s.UNSIGNED_BYTE&&(Q=s.R8),z===s.UNSIGNED_SHORT&&pt&&(Q=pt.R16_EXT),z===s.SHORT&&pt&&(Q=pt.R16_SNORM_EXT)),M===s.RED_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.R8UI),z===s.UNSIGNED_SHORT&&(Q=s.R16UI),z===s.UNSIGNED_INT&&(Q=s.R32UI),z===s.BYTE&&(Q=s.R8I),z===s.SHORT&&(Q=s.R16I),z===s.INT&&(Q=s.R32I)),M===s.RG&&(z===s.FLOAT&&(Q=s.RG32F),z===s.HALF_FLOAT&&(Q=s.RG16F),z===s.UNSIGNED_BYTE&&(Q=s.RG8),z===s.UNSIGNED_SHORT&&pt&&(Q=pt.RG16_EXT),z===s.SHORT&&pt&&(Q=pt.RG16_SNORM_EXT)),M===s.RG_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RG8UI),z===s.UNSIGNED_SHORT&&(Q=s.RG16UI),z===s.UNSIGNED_INT&&(Q=s.RG32UI),z===s.BYTE&&(Q=s.RG8I),z===s.SHORT&&(Q=s.RG16I),z===s.INT&&(Q=s.RG32I)),M===s.RGB_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RGB8UI),z===s.UNSIGNED_SHORT&&(Q=s.RGB16UI),z===s.UNSIGNED_INT&&(Q=s.RGB32UI),z===s.BYTE&&(Q=s.RGB8I),z===s.SHORT&&(Q=s.RGB16I),z===s.INT&&(Q=s.RGB32I)),M===s.RGBA_INTEGER&&(z===s.UNSIGNED_BYTE&&(Q=s.RGBA8UI),z===s.UNSIGNED_SHORT&&(Q=s.RGBA16UI),z===s.UNSIGNED_INT&&(Q=s.RGBA32UI),z===s.BYTE&&(Q=s.RGBA8I),z===s.SHORT&&(Q=s.RGBA16I),z===s.INT&&(Q=s.RGBA32I)),M===s.RGB&&(z===s.UNSIGNED_SHORT&&pt&&(Q=pt.RGB16_EXT),z===s.SHORT&&pt&&(Q=pt.RGB16_SNORM_EXT),z===s.UNSIGNED_INT_5_9_9_9_REV&&(Q=s.RGB9_E5),z===s.UNSIGNED_INT_10F_11F_11F_REV&&(Q=s.R11F_G11F_B10F)),M===s.RGBA){const j=ct?hr:Jt.getTransfer(et);z===s.FLOAT&&(Q=s.RGBA32F),z===s.HALF_FLOAT&&(Q=s.RGBA16F),z===s.UNSIGNED_BYTE&&(Q=j===re?s.SRGB8_ALPHA8:s.RGBA8),z===s.UNSIGNED_SHORT&&pt&&(Q=pt.RGBA16_EXT),z===s.SHORT&&pt&&(Q=pt.RGBA16_SNORM_EXT),z===s.UNSIGNED_SHORT_4_4_4_4&&(Q=s.RGBA4),z===s.UNSIGNED_SHORT_5_5_5_1&&(Q=s.RGB5_A1)}return(Q===s.R16F||Q===s.R32F||Q===s.RG16F||Q===s.RG32F||Q===s.RGBA16F||Q===s.RGBA32F)&&t.get("EXT_color_buffer_float"),Q}function _(A,M){let z;return A?M===null||M===An||M===ki?z=s.DEPTH24_STENCIL8:M===un?z=s.DEPTH32F_STENCIL8:M===ps&&(z=s.DEPTH24_STENCIL8,Ut("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===An||M===ki?z=s.DEPTH_COMPONENT24:M===un?z=s.DEPTH_COMPONENT32F:M===ps&&(z=s.DEPTH_COMPONENT16),z}function v(A,M){return T(A)===!0||A.isFramebufferTexture&&A.minFilter!==Le&&A.minFilter!==Xe?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function C(A){const M=new WeakRef(A);n.get(A).__ref=M,g.add(M),y.register(A,M,M)}function R(A){const M=n.get(A).__ref;M!==void 0&&(g.delete(M),y.unregister(M))}function N(A){G(A.target)}function F(A){I(A.target)}function G(A){A.removeEventListener("dispose",N),R(A),K(A),A.isVideoTexture&&h.delete(A),A.isHTMLTexture&&f.delete(A)}function I(A){A.removeEventListener("dispose",F),R(A),J(A)}function H(){for(const A of g){const M=A.deref();M!==void 0&&(M.isRenderTarget===!0?I(M):G(M))}g.clear(),f.clear()}function K(A){const M=n.get(A);if(M.__webglInit===void 0)return;const z=A.source,st=p.get(z);if(st){const et=st[M.__cacheKey];et.usedTimes--,et.usedTimes===0&&D(A),Object.keys(st).length===0&&p.delete(z)}n.remove(A)}function D(A){const M=n.get(A);s.deleteTexture(M.__webglTexture);const z=A.source,st=p.get(z);delete st[M.__cacheKey],a.memory.textures--}function J(A){const M=n.get(A);M.__depthDisposeCallback&&M.__depthDisposeCallback();const z=A.depthTexture;if(z&&z.renderTarget===A&&G(z),A.isWebGLCubeRenderTarget)for(let et=0;et<6;et++){if(Array.isArray(M.__webglFramebuffer[et]))for(let ct=0;ct<M.__webglFramebuffer[et].length;ct++)s.deleteFramebuffer(M.__webglFramebuffer[et][ct]);else s.deleteFramebuffer(M.__webglFramebuffer[et]);M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer[et])}else{if(Array.isArray(M.__webglFramebuffer))for(let et=0;et<M.__webglFramebuffer.length;et++)s.deleteFramebuffer(M.__webglFramebuffer[et]);else s.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&s.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&s.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let et=0;et<M.__webglColorRenderbuffer.length;et++)M.__webglColorRenderbuffer[et]&&s.deleteRenderbuffer(M.__webglColorRenderbuffer[et]);M.__webglDepthRenderbuffer&&s.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const st=A.textures;for(let et=0,ct=st.length;et<ct;et++){const pt=n.get(st[et]);pt.__webglTexture&&(s.deleteTexture(pt.__webglTexture),a.memory.textures--),n.remove(st[et])}n.remove(A)}let X=0;function V(){X=0}function Z(){return X}function lt(A){X=A}function _t(){const A=X;return A>=i.maxTextures&&Ut("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+i.maxTextures),X+=1,A}function W(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.mipmapsAutoUpdate),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function it(A,M){const z=n.get(A);if(A.isVideoTexture&&Me(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&z.__version!==A.version){const st=A.image;if(st===null)Ut("WebGLRenderer: Texture marked for update but no image data found.");else if(st.complete===!1)Ut("WebGLRenderer: Texture marked for update but image is incomplete");else{ve(z,A,M);return}}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(s.TEXTURE_2D,z.__webglTexture,s.TEXTURE0+M)}function Y(A,M){const z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){ve(z,A,M);return}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);e.bindTexture(s.TEXTURE_2D_ARRAY,z.__webglTexture,s.TEXTURE0+M)}function rt(A,M){const z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){ve(z,A,M);return}e.bindTexture(s.TEXTURE_3D,z.__webglTexture,s.TEXTURE0+M)}function nt(A,M){const z=n.get(A);if(A.version>0&&z.__version!==A.version){Ve(z,A,M);return}e.bindTexture(s.TEXTURE_CUBE_MAP,z.__webglTexture,s.TEXTURE0+M)}const Ct={[ar]:s.REPEAT,[Fn]:s.CLAMP_TO_EDGE,[ma]:s.MIRRORED_REPEAT},qt={[Le]:s.NEAREST,[Eh]:s.NEAREST_MIPMAP_NEAREST,[Ss]:s.NEAREST_MIPMAP_LINEAR,[Xe]:s.LINEAR,[Cr]:s.LINEAR_MIPMAP_NEAREST,[Jn]:s.LINEAR_MIPMAP_LINEAR},At={[Rh]:s.NEVER,[fc]:s.ALWAYS,[Ch]:s.LESS,[uc]:s.LEQUAL,[Ph]:s.EQUAL,[dc]:s.GEQUAL,[Lh]:s.GREATER,[Dh]:s.NOTEQUAL};function Ft(A,M){if(M.type===un&&t.has("OES_texture_float_linear")===!1&&(M.magFilter===Xe||M.magFilter===Cr||M.magFilter===Ss||M.magFilter===Jn||M.minFilter===Xe||M.minFilter===Cr||M.minFilter===Ss||M.minFilter===Jn)&&Ut("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(A,s.TEXTURE_WRAP_S,Ct[M.wrapS]),s.texParameteri(A,s.TEXTURE_WRAP_T,Ct[M.wrapT]),(A===s.TEXTURE_3D||A===s.TEXTURE_2D_ARRAY)&&s.texParameteri(A,s.TEXTURE_WRAP_R,Ct[M.wrapR]),s.texParameteri(A,s.TEXTURE_MAG_FILTER,qt[M.magFilter]),s.texParameteri(A,s.TEXTURE_MIN_FILTER,qt[M.minFilter]),M.compareFunction&&(s.texParameteri(A,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(A,s.TEXTURE_COMPARE_FUNC,At[M.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===Le||M.minFilter!==Ss&&M.minFilter!==Jn||M.type===un&&t.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const z=t.get("EXT_texture_filter_anisotropic");s.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,i.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function kt(A,M){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",N),C(M));const st=M.source;let et=p.get(st);et===void 0&&(et={},p.set(st,et));const ct=W(M);if(ct!==A.__cacheKey){et[ct]===void 0&&(et[ct]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,z=!0),et[ct].usedTimes++;const pt=et[A.__cacheKey];pt!==void 0&&(et[A.__cacheKey].usedTimes--,pt.usedTimes===0&&D(M)),A.__cacheKey=ct,A.__webglTexture=et[ct].texture}return z}function Ht(A,M,z){return Math.floor(Math.floor(A/z)/M)}function Re(A,M,z,st){const ct=A.updateRanges;if(ct.length===0)e.texSubImage2D(s.TEXTURE_2D,0,0,0,M.width,M.height,z,st,M.data);else{ct.sort((L,tt)=>L.start-tt.start);let pt=0;for(let L=1;L<ct.length;L++){const tt=ct[pt],$=ct[L],dt=tt.start+tt.count,ot=Ht($.start,M.width,4),ht=Ht(tt.start,M.width,4);$.start<=dt+1&&ot===ht&&Ht($.start+$.count-1,M.width,4)===ot?tt.count=Math.max(tt.count,$.start+$.count-tt.start):(++pt,ct[pt]=$)}ct.length=pt+1;const Q=e.getParameter(s.UNPACK_ROW_LENGTH),j=e.getParameter(s.UNPACK_SKIP_PIXELS),ut=e.getParameter(s.UNPACK_SKIP_ROWS);e.pixelStorei(s.UNPACK_ROW_LENGTH,M.width);for(let L=0,tt=ct.length;L<tt;L++){const $=ct[L],dt=Math.floor($.start/4),ot=Math.ceil($.count/4),ht=dt%M.width,Rt=Math.floor(dt/M.width),Vt=ot,at=1;e.pixelStorei(s.UNPACK_SKIP_PIXELS,ht),e.pixelStorei(s.UNPACK_SKIP_ROWS,Rt),e.texSubImage2D(s.TEXTURE_2D,0,ht,Rt,Vt,at,z,st,M.data)}A.clearUpdateRanges(),e.pixelStorei(s.UNPACK_ROW_LENGTH,Q),e.pixelStorei(s.UNPACK_SKIP_PIXELS,j),e.pixelStorei(s.UNPACK_SKIP_ROWS,ut)}}function ve(A,M,z){let st=s.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(st=s.TEXTURE_2D_ARRAY),M.isData3DTexture&&(st=s.TEXTURE_3D);const et=kt(A,M),ct=M.source;e.bindTexture(st,A.__webglTexture,s.TEXTURE0+z);const pt=n.get(ct);if(ct.version!==pt.__version||et===!0){if(e.activeTexture(s.TEXTURE0+z),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const at=Jt.getPrimaries(Jt.workingColorSpace),Pt=M.colorSpace===Kn?null:Jt.getPrimaries(M.colorSpace),Gt=M.colorSpace===Kn||at===Pt?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Gt)}e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment);let j=x(M.image,!1,i.maxTextureSize);j=Lt(M,j);const ut=r.convert(M.format,M.colorSpace),L=r.convert(M.type);let tt=w(M.internalFormat,ut,L,M.normalized,M.colorSpace,M.isVideoTexture);Ft(st,M);let $;const dt=M.mipmaps,ot=M.isVideoTexture!==!0,ht=pt.__version===void 0||et===!0,Rt=ct.dataReady,Vt=v(M,j);if(M.isDepthTexture)tt=_(M.format===Zn,M.type),ht&&(ot?e.texStorage2D(s.TEXTURE_2D,1,tt,j.width,j.height):e.texImage2D(s.TEXTURE_2D,0,tt,j.width,j.height,0,ut,L,null));else if(M.isDataTexture)if(dt.length>0){ot&&ht&&e.texStorage2D(s.TEXTURE_2D,Vt,tt,dt[0].width,dt[0].height);for(let at=0,Pt=dt.length;at<Pt;at++)$=dt[at],ot?Rt&&e.texSubImage2D(s.TEXTURE_2D,at,0,0,$.width,$.height,ut,L,$.data):e.texImage2D(s.TEXTURE_2D,at,tt,$.width,$.height,0,ut,L,$.data);M.generateMipmaps=!1}else ot?(ht&&e.texStorage2D(s.TEXTURE_2D,Vt,tt,j.width,j.height),Rt&&Re(M,j,ut,L)):e.texImage2D(s.TEXTURE_2D,0,tt,j.width,j.height,0,ut,L,j.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){ot&&ht&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Vt,tt,dt[0].width,dt[0].height,j.depth);for(let at=0,Pt=dt.length;at<Pt;at++)if($=dt[at],M.format!==Sn)if(ut!==null)if(ot){if(Rt)if(M.layerUpdates.size>0){const Gt=gl($.width,$.height,M.format,M.type);for(const xt of M.layerUpdates){const se=$.data.subarray(xt*Gt/$.data.BYTES_PER_ELEMENT,(xt+1)*Gt/$.data.BYTES_PER_ELEMENT);e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,at,0,0,xt,$.width,$.height,1,ut,se)}}else e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,at,0,0,0,$.width,$.height,j.depth,ut,$.data)}else e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,at,tt,$.width,$.height,j.depth,0,$.data,0,0);else Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else ot?Rt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,at,0,0,0,$.width,$.height,j.depth,ut,L,$.data):e.texImage3D(s.TEXTURE_2D_ARRAY,at,tt,$.width,$.height,j.depth,0,ut,L,$.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{ot&&ht&&e.texStorage2D(s.TEXTURE_2D,Vt,tt,dt[0].width,dt[0].height);for(let at=0,Pt=dt.length;at<Pt;at++)$=dt[at],M.format!==Sn?ut!==null?ot?Rt&&e.compressedTexSubImage2D(s.TEXTURE_2D,at,0,0,$.width,$.height,ut,$.data):e.compressedTexImage2D(s.TEXTURE_2D,at,tt,$.width,$.height,0,$.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ot?Rt&&e.texSubImage2D(s.TEXTURE_2D,at,0,0,$.width,$.height,ut,L,$.data):e.texImage2D(s.TEXTURE_2D,at,tt,$.width,$.height,0,ut,L,$.data)}else if(M.isDataArrayTexture)if(ot){if(ht&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Vt,tt,j.width,j.height,j.depth),Rt)if(M.layerUpdates.size>0){const at=gl(j.width,j.height,M.format,M.type);for(const Pt of M.layerUpdates){const Gt=j.data.subarray(Pt*at/j.data.BYTES_PER_ELEMENT,(Pt+1)*at/j.data.BYTES_PER_ELEMENT);e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Pt,j.width,j.height,1,ut,L,Gt)}M.clearLayerUpdates()}else e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,j.width,j.height,j.depth,ut,L,j.data)}else e.texImage3D(s.TEXTURE_2D_ARRAY,0,tt,j.width,j.height,j.depth,0,ut,L,j.data);else if(M.isData3DTexture)ot?(ht&&e.texStorage3D(s.TEXTURE_3D,Vt,tt,j.width,j.height,j.depth),Rt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,j.width,j.height,j.depth,ut,L,j.data)):e.texImage3D(s.TEXTURE_3D,0,tt,j.width,j.height,j.depth,0,ut,L,j.data);else if(M.isFramebufferTexture){if(ht)if(ot)e.texStorage2D(s.TEXTURE_2D,Vt,tt,j.width,j.height);else{let at=j.width,Pt=j.height;for(let Gt=0;Gt<Vt;Gt++)e.texImage2D(s.TEXTURE_2D,Gt,tt,at,Pt,0,ut,L,null),at>>=1,Pt>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in s){const at=s.canvas;if(at.hasAttribute("layoutsubtree")||at.setAttribute("layoutsubtree","true"),j.parentNode!==at){at.appendChild(j),f.add(M),at.onpaint=Pt=>{const Gt=Pt.changedElements;for(const xt of f)Gt.includes(xt.image)&&(xt.needsUpdate=!0)},at.requestPaint();return}if(s.texElementImage2D.length===3)s.texElementImage2D(s.TEXTURE_2D,s.RGBA8,j);else{const Gt=s.RGBA,xt=s.RGBA,se=s.UNSIGNED_BYTE;s.texElementImage2D(s.TEXTURE_2D,0,Gt,xt,se,j)}s.texParameteri(s.TEXTURE_2D,s.TEXTURE_MIN_FILTER,s.LINEAR),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(s.TEXTURE_2D,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE)}}else if(dt.length>0){if(ot&&ht){const at=Ot(dt[0]);e.texStorage2D(s.TEXTURE_2D,Vt,tt,at.width,at.height)}for(let at=0,Pt=dt.length;at<Pt;at++)$=dt[at],ot?Rt&&e.texSubImage2D(s.TEXTURE_2D,at,0,0,ut,L,$):e.texImage2D(s.TEXTURE_2D,at,tt,ut,L,$);M.generateMipmaps=!1}else if(ot){if(ht){const at=Ot(j);e.texStorage2D(s.TEXTURE_2D,Vt,tt,at.width,at.height)}Rt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ut,L,j)}else e.texImage2D(s.TEXTURE_2D,0,tt,ut,L,j);T(M)&&M.mipmapsAutoUpdate===!0&&S(st),pt.__version=ct.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Ve(A,M,z){if(M.image.length!==6)return;const st=kt(A,M),et=M.source;e.bindTexture(s.TEXTURE_CUBE_MAP,A.__webglTexture,s.TEXTURE0+z);const ct=n.get(et);if(et.version!==ct.__version||st===!0){e.activeTexture(s.TEXTURE0+z);const pt=Jt.getPrimaries(Jt.workingColorSpace),Q=M.colorSpace===Kn?null:Jt.getPrimaries(M.colorSpace),j=M.colorSpace===Kn||pt===Q?s.NONE:s.BROWSER_DEFAULT_WEBGL;e.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,M.flipY),e.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),e.pixelStorei(s.UNPACK_ALIGNMENT,M.unpackAlignment),e.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,j);const ut=M.isCompressedTexture||M.image[0].isCompressedTexture,L=M.image[0]&&M.image[0].isDataTexture,tt=[];for(let xt=0;xt<6;xt++)!ut&&!L?tt[xt]=x(M.image[xt],!0,i.maxCubemapSize):tt[xt]=L?M.image[xt].image:M.image[xt],tt[xt]=Lt(M,tt[xt]);const $=tt[0],dt=r.convert(M.format,M.colorSpace),ot=r.convert(M.type);let ht=w(M.internalFormat,dt,ot,M.normalized,M.colorSpace);const Rt=M.isVideoTexture!==!0,Vt=ct.__version===void 0||st===!0,at=et.dataReady;let Pt=v(M,$);Ft(s.TEXTURE_CUBE_MAP,M);let Gt;if(M.isDepthTexture){if(ht=_(M.format===Zn,M.type),Vt)if(Rt)e.texStorage2D(s.TEXTURE_CUBE_MAP,1,ht,$.width,$.height);else for(let xt=0;xt<6;xt++)e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,ht,$.width,$.height,0,dt,ot,null)}else if(ut){Rt&&Vt&&e.texStorage2D(s.TEXTURE_CUBE_MAP,Pt,ht,$.width,$.height);for(let xt=0;xt<6;xt++){Gt=tt[xt].mipmaps;for(let se=0;se<Gt.length;se++){const Ee=Gt[se];M.format!==Sn?dt!==null?Rt?at&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,se,0,0,Ee.width,Ee.height,dt,Ee.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,se,ht,Ee.width,Ee.height,0,Ee.data):Ut("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Rt?at&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,se,0,0,Ee.width,Ee.height,dt,ot,Ee.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,se,ht,Ee.width,Ee.height,0,dt,ot,Ee.data)}}}else{if(Gt=M.mipmaps,Rt&&Vt){Gt.length>0&&Pt++;const xt=Ot(tt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,Pt,ht,xt.width,xt.height)}for(let xt=0;xt<6;xt++)if(L){Rt?at&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,tt[xt].width,tt[xt].height,dt,ot,tt[xt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,ht,tt[xt].width,tt[xt].height,0,dt,ot,tt[xt].data);for(let se=0;se<Gt.length;se++){const kn=Gt[se].image[xt].image;Rt?at&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,se+1,0,0,kn.width,kn.height,dt,ot,kn.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,se+1,ht,kn.width,kn.height,0,dt,ot,kn.data)}}else{Rt?at&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,0,0,dt,ot,tt[xt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,0,ht,dt,ot,tt[xt]);for(let se=0;se<Gt.length;se++){const Ee=Gt[se];Rt?at&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,se+1,0,0,dt,ot,Ee.image[xt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+xt,se+1,ht,dt,ot,Ee.image[xt])}}}T(M)&&M.mipmapsAutoUpdate===!0&&S(s.TEXTURE_CUBE_MAP),ct.__version=et.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function ue(A,M,z,st,et,ct){const pt=r.convert(z.format,z.colorSpace),Q=r.convert(z.type),j=w(z.internalFormat,pt,Q,z.normalized,z.colorSpace),ut=n.get(M),L=n.get(z);if(L.__renderTarget=M,!ut.__hasExternalTextures){const tt=Math.max(1,M.width>>ct),$=Math.max(1,M.height>>ct);et===s.TEXTURE_3D||et===s.TEXTURE_2D_ARRAY?e.texImage3D(et,ct,j,tt,$,M.depth,0,pt,Q,null):e.texImage2D(et,ct,j,tt,$,0,pt,Q,null)}e.bindFramebuffer(s.FRAMEBUFFER,A),gt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,st,et,L.__webglTexture,0,he(M)):(et===s.TEXTURE_2D||et>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&et<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,st,et,L.__webglTexture,ct),e.bindFramebuffer(s.FRAMEBUFFER,null)}function pn(A,M,z){if(s.bindRenderbuffer(s.RENDERBUFFER,A),M.depthBuffer){const st=M.depthTexture,et=st&&st.isDepthTexture?st.type:null,ct=_(M.stencilBuffer,et),pt=M.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;gt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,he(M),ct,M.width,M.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,he(M),ct,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,ct,M.width,M.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,pt,s.RENDERBUFFER,A)}else{const st=M.textures;for(let et=0;et<st.length;et++){const ct=st[et],pt=r.convert(ct.format,ct.colorSpace),Q=r.convert(ct.type),j=w(ct.internalFormat,pt,Q,ct.normalized,ct.colorSpace);gt(M)?o.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,he(M),j,M.width,M.height):z?s.renderbufferStorageMultisample(s.RENDERBUFFER,he(M),j,M.width,M.height):s.renderbufferStorage(s.RENDERBUFFER,j,M.width,M.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function be(A,M,z){const st=M.isWebGLCubeRenderTarget===!0;if(e.bindFramebuffer(s.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const et=n.get(M.depthTexture);et.__renderTarget=M;const ct=st?M.depthTexture.image[0]:M.depthTexture.image;(!et.__webglTexture||ct.width!==M.width||ct.height!==M.height)&&(ct.width=M.width,ct.height=M.height,M.depthTexture.needsUpdate=!0),st?nt(M.depthTexture,0):it(M.depthTexture,0);const pt=et.__webglTexture,Q=he(M),j=st?s.TEXTURE_CUBE_MAP_POSITIVE_X+z:s.TEXTURE_2D,ut=M.depthTexture.format===Zn?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;if(M.depthTexture.format===Qn)gt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ut,j,pt,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,ut,j,pt,0);else if(M.depthTexture.format===Zn)gt(M)?o.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ut,j,pt,0,Q):s.framebufferTexture2D(s.FRAMEBUFFER,ut,j,pt,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ke(A){const M=n.get(A),z=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const st=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),st){const et=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,st.removeEventListener("dispose",et)};st.addEventListener("dispose",et),M.__depthDisposeCallback=et}M.__boundDepthTexture=st}if(A.depthTexture&&!M.__autoAllocateDepthBuffer)if(z)for(let st=0;st<6;st++)be(M.__webglFramebuffer[st],A,st);else A.texture.mipmaps.length>0?be(M.__webglFramebuffer[0],A,0):be(M.__webglFramebuffer,A,0);else if(z){M.__webglDepthbuffer=[];for(let st=0;st<6;st++)if(e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[st]),M.__webglDepthbuffer[st]===void 0)M.__webglDepthbuffer[st]=s.createRenderbuffer(),pn(M.__webglDepthbuffer[st],A,!1);else{const et=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ct=M.__webglDepthbuffer[st];s.bindRenderbuffer(s.RENDERBUFFER,ct),s.framebufferRenderbuffer(s.FRAMEBUFFER,et,s.RENDERBUFFER,ct)}}else if(A.texture.mipmaps.length>0?e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer[0]):e.bindFramebuffer(s.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=s.createRenderbuffer(),pn(M.__webglDepthbuffer,A,!1);else{const et=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ct=M.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,ct),s.framebufferRenderbuffer(s.FRAMEBUFFER,et,s.RENDERBUFFER,ct)}e.bindFramebuffer(s.FRAMEBUFFER,null)}function Je(A,M,z){const st=n.get(A);M!==void 0&&ue(st.__webglFramebuffer,A,A.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),z!==void 0&&Ke(A)}function Ze(A){const M=A.texture,z=n.get(A),st=n.get(M);A.addEventListener("dispose",F),C(A);const et=A.textures,ct=A.isWebGLCubeRenderTarget===!0,pt=et.length>1;if(pt||(st.__webglTexture===void 0&&(st.__webglTexture=s.createTexture()),st.__version=M.version,a.memory.textures++),ct){z.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(M.mipmaps.length>0){z.__webglFramebuffer[Q]=[];for(let j=0;j<M.mipmaps.length;j++)z.__webglFramebuffer[Q][j]=s.createFramebuffer()}else z.__webglFramebuffer[Q]=s.createFramebuffer()}else{if(M.mipmaps.length>0){z.__webglFramebuffer=[];for(let Q=0;Q<M.mipmaps.length;Q++)z.__webglFramebuffer[Q]=s.createFramebuffer()}else z.__webglFramebuffer=s.createFramebuffer();if(pt)for(let Q=0,j=et.length;Q<j;Q++){const ut=n.get(et[Q]);ut.__webglTexture===void 0&&(ut.__webglTexture=s.createTexture(),a.memory.textures++)}if(A.samples>0&&gt(A)===!1){z.__webglMultisampledFramebuffer=s.createFramebuffer(),z.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Q=0;Q<et.length;Q++){const j=et[Q];z.__webglColorRenderbuffer[Q]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,z.__webglColorRenderbuffer[Q]);const ut=r.convert(j.format,j.colorSpace),L=r.convert(j.type),tt=w(j.internalFormat,ut,L,j.normalized,j.colorSpace,A.isXRRenderTarget===!0),$=he(A);s.renderbufferStorageMultisample(s.RENDERBUFFER,$,tt,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Q,s.RENDERBUFFER,z.__webglColorRenderbuffer[Q])}s.bindRenderbuffer(s.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=s.createRenderbuffer(),pn(z.__webglDepthRenderbuffer,A,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ct){e.bindTexture(s.TEXTURE_CUBE_MAP,st.__webglTexture),Ft(s.TEXTURE_CUBE_MAP,M);for(let Q=0;Q<6;Q++)if(M.mipmaps.length>0)for(let j=0;j<M.mipmaps.length;j++)ue(z.__webglFramebuffer[Q][j],A,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,j);else ue(z.__webglFramebuffer[Q],A,M,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);T(M)?S(s.TEXTURE_CUBE_MAP):M.mipmaps.length>0&&s.texParameteri(s.TEXTURE_CUBE_MAP,s.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}else if(pt){for(let Q=0,j=et.length;Q<j;Q++){const ut=et[Q],L=n.get(ut);let tt=s.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(tt=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(tt,L.__webglTexture),Ft(tt,ut),ue(z.__webglFramebuffer,A,ut,s.COLOR_ATTACHMENT0+Q,tt,0),T(ut)&&S(tt)}e.unbindTexture()}else{let Q=s.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Q=A.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(Q,st.__webglTexture),Ft(Q,M),M.mipmaps.length>0)for(let j=0;j<M.mipmaps.length;j++)ue(z.__webglFramebuffer[j],A,M,s.COLOR_ATTACHMENT0,Q,j);else ue(z.__webglFramebuffer,A,M,s.COLOR_ATTACHMENT0,Q,0);T(M)?S(Q):M.mipmaps.length>0&&s.texParameteri(Q,s.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),e.unbindTexture()}A.depthBuffer&&Ke(A)}function O(A){const M=A.textures;for(let z=0,st=M.length;z<st;z++){const et=M[z];if(T(et)&&et.mipmapsAutoUpdate===!0){const ct=b(A),pt=n.get(et).__webglTexture;e.bindTexture(ct,pt),S(ct),e.unbindTexture()}}}const Qe=[];function ce(A){if(A.samples>0){if(gt(A)===!1){const M=A.textures,z=A.width,st=A.height;let et=s.COLOR_BUFFER_BIT;const ct=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,pt=n.get(A),Q=M.length>1;if(Q)for(let ut=0;ut<M.length;ut++)e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,pt.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglFramebuffer[0]):e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglFramebuffer);for(let ut=0;ut<M.length;ut++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(et|=s.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(et|=s.STENCIL_BUFFER_BIT)),Q){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,pt.__webglColorRenderbuffer[ut]);const L=n.get(M[ut]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,L,0)}s.blitFramebuffer(0,0,z,st,0,0,z,st,et,s.NEAREST),l===!0&&(Qe.length=0,Qe.push(s.COLOR_ATTACHMENT0+ut),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&Qe.push(ct),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Qe))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Q)for(let ut=0;ut<M.length;ut++){e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.RENDERBUFFER,pt.__webglColorRenderbuffer[ut]);const L=n.get(M[ut]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,pt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ut,s.TEXTURE_2D,L,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,pt.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const M=A.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[M])}}}function he(A){return Math.min(i.maxSamples,A.samples)}function gt(A){const M=n.get(A);return A.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function Me(A){const M=a.render.frame;h.get(A)!==M&&(h.set(A,M),A.update())}function Lt(A,M){const z=A.colorSpace,st=A.format,et=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==cr&&z!==Kn&&(Jt.getTransfer(z)===re?(st!==Sn||et!==$e)&&Ut("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):te("WebGLTextures: Unsupported texture color space:",z)),M}function Ot(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=_t,this.resetTextureUnits=V,this.getTextureUnits=Z,this.setTextureUnits=lt,this.setTexture2D=it,this.setTexture2DArray=Y,this.setTexture3D=rt,this.setTextureCube=nt,this.rebindTextures=Je,this.setupRenderTarget=Ze,this.updateRenderTargetMipmap=O,this.updateMultisampleRenderTarget=ce,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=ue,this.useMultisampledRTT=gt,this.dispose=H}function v0(s,t){function e(n,i=Kn){let r;const a=Jt.getTransfer(i);if(n===$e)return s.UNSIGNED_BYTE;if(n===no)return s.UNSIGNED_SHORT_4_4_4_4;if(n===io)return s.UNSIGNED_SHORT_5_5_5_1;if(n===oc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===lc)return s.UNSIGNED_INT_10F_11F_11F_REV;if(n===rc)return s.BYTE;if(n===ac)return s.SHORT;if(n===ps)return s.UNSIGNED_SHORT;if(n===eo)return s.INT;if(n===An)return s.UNSIGNED_INT;if(n===un)return s.FLOAT;if(n===Rn)return s.HALF_FLOAT;if(n===cc)return s.ALPHA;if(n===hc)return s.RGB;if(n===Sn)return s.RGBA;if(n===Qn)return s.DEPTH_COMPONENT;if(n===Zn)return s.DEPTH_STENCIL;if(n===so)return s.RED;if(n===ro)return s.RED_INTEGER;if(n===pi)return s.RG;if(n===ao)return s.RG_INTEGER;if(n===oo)return s.RGBA_INTEGER;if(n===js||n===tr||n===er||n===nr)if(a===re)if(r=t.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===js)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===tr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===er)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===nr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=t.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===js)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===tr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===er)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===nr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===ga||n===_a||n===xa||n===va)if(r=t.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===ga)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===_a)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===xa)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===va)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ma||n===Sa||n===ya||n===ba||n===Ea||n===or||n===wa)if(r=t.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Ma||n===Sa)return a===re?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===ya)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===ba)return r.COMPRESSED_R11_EAC;if(n===Ea)return r.COMPRESSED_SIGNED_R11_EAC;if(n===or)return r.COMPRESSED_RG11_EAC;if(n===wa)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Ta||n===Aa||n===Ra||n===Ca||n===Pa||n===La||n===Da||n===Ia||n===Na||n===Ua||n===Fa||n===Oa||n===Ba||n===za)if(r=t.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Ta)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Aa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Ra)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Ca)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Pa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===La)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Da)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Ia)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Na)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ua)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Fa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Oa)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Ba)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===za)return a===re?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ga||n===ka||n===Ha)if(r=t.get("EXT_texture_compression_bptc"),r!==null){if(n===Ga)return a===re?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===ka)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ha)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Va||n===Wa||n===lr||n===Xa)if(r=t.get("EXT_texture_compression_rgtc"),r!==null){if(n===Va)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Wa)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===lr)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Xa)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===ki?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}const M0=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,S0=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class y0{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e){if(this.texture===null){const n=new Rc(t.texture);(t.depthNear!==e.depthNear||t.depthFar!==e.depthFar)&&(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=n}}getMesh(t){if(this.texture!==null&&this.mesh===null){const e=t.cameras[0].viewport,n=new ti({vertexShader:M0,fragmentShader:S0,uniforms:{depthColor:{value:this.texture},depthWidth:{value:e.z},depthHeight:{value:e.w}}});this.mesh=new Nt(new jn(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class b0 extends mi{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",l=1,c=null,h=null,f=null,u=null,p=null,g=null;const y=typeof XRWebGLBinding<"u",d=new y0,m={},x=e.getContextAttributes();let T=null,S=null;const b=[],w=[],_=new St;let v=null,C=null;const R=new hn;R.viewport=new fe;const N=new hn;N.viewport=new fe;const F=[R,N],G=new Nu;let I=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let it=b[W];return it===void 0&&(it=new Br,b[W]=it),it.getTargetRaySpace()},this.getControllerGrip=function(W){let it=b[W];return it===void 0&&(it=new Br,b[W]=it),it.getGripSpace()},this.getHand=function(W){let it=b[W];return it===void 0&&(it=new Br,b[W]=it),it.getHandSpace()};function K(W){const it=w.indexOf(W.inputSource);if(it===-1)return;const Y=b[it];Y!==void 0&&(Y.update(W.inputSource,W.frame,c||a),Y.dispatchEvent({type:W.type,data:W.inputSource}))}function D(){i.removeEventListener("select",K),i.removeEventListener("selectstart",K),i.removeEventListener("selectend",K),i.removeEventListener("squeeze",K),i.removeEventListener("squeezestart",K),i.removeEventListener("squeezeend",K),i.removeEventListener("end",D),i.removeEventListener("inputsourceschange",J);for(let W=0;W<b.length;W++){const it=w[W];it!==null&&(w[W]=null,b[W].disconnect(it))}I=null,H=null,d.reset();for(const W in m)delete m[W];if(t.setRenderTarget(T),p=null,u=null,f=null,i=null,S=null,_t.stop(),n.isPresenting=!1,t.setPixelRatio(v),t.setSize(_.width,_.height,!1),C!==null){const W=C.camera;W.fov=C.fov,W.zoom=C.zoom,W.updateProjectionMatrix(),C=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){r=W,n.isPresenting===!0&&Ut("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){o=W,n.isPresenting===!0&&Ut("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(W){c=W},this.getBaseLayer=function(){return u!==null?u:p},this.getBinding=function(){return f===null&&y&&(f=new XRWebGLBinding(i,e)),f},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(T=t.getRenderTarget(),i.addEventListener("select",K),i.addEventListener("selectstart",K),i.addEventListener("selectend",K),i.addEventListener("squeeze",K),i.addEventListener("squeezestart",K),i.addEventListener("squeezeend",K),i.addEventListener("end",D),i.addEventListener("inputsourceschange",J),x.xrCompatible!==!0&&await e.makeXRCompatible(),v=t.getPixelRatio(),t.getSize(_),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let Y=null,rt=null,nt=null;x.depth&&(nt=x.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,Y=x.stencil?Zn:Qn,rt=x.stencil?ki:An);const Ct={colorFormat:e.RGBA8,depthFormat:nt,scaleFactor:r};f=this.getBinding(),u=f.createProjectionLayer(Ct),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),S=new Tn(u.textureWidth,u.textureHeight,{format:Sn,type:$e,depthTexture:new Hi(u.textureWidth,u.textureHeight,rt,void 0,void 0,void 0,void 0,void 0,void 0,Y),stencilBuffer:x.stencil,colorSpace:t.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const Y={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,Y),i.updateRenderState({baseLayer:p}),t.setPixelRatio(1),t.setSize(p.framebufferWidth,p.framebufferHeight,!1),S=new Tn(p.framebufferWidth,p.framebufferHeight,{format:Sn,type:$e,colorSpace:t.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:p.ignoreDepthValues===!1,resolveStencilBuffer:p.ignoreDepthValues===!1,storeMultisampledDepthBuffer:p.ignoreDepthValues===!1,storeMultisampledStencilBuffer:p.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),_t.setContext(i),_t.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return d.getDepthTexture()};function J(W){for(let it=0;it<W.removed.length;it++){const Y=W.removed[it],rt=w.indexOf(Y);rt>=0&&(w[rt]=null,b[rt].disconnect(Y))}for(let it=0;it<W.added.length;it++){const Y=W.added[it];let rt=w.indexOf(Y);if(rt===-1){for(let Ct=0;Ct<b.length;Ct++)if(Ct>=w.length){w.push(Y),rt=Ct;break}else if(w[Ct]===null){w[Ct]=Y,rt=Ct;break}if(rt===-1)break}const nt=b[rt];nt&&nt.connect(Y)}}function X(W,it){it===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(it.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;let it=W.near,Y=W.far;d.texture!==null&&(d.depthNear>0&&(it=d.depthNear),d.depthFar>0&&(Y=d.depthFar)),G.near=N.near=R.near=it,G.far=N.far=R.far=Y,(I!==G.near||H!==G.far)&&(i.updateRenderState({depthNear:G.near,depthFar:G.far}),I=G.near,H=G.far),G.layers.mask=W.layers.mask|6,R.layers.mask=G.layers.mask&-5,N.layers.mask=G.layers.mask&-3;const rt=W.parent,nt=G.cameras;X(G,rt);for(let Ct=0;Ct<nt.length;Ct++)X(nt[Ct],rt);G.projectionMatrix.copy(R.projectionMatrix),G.projectionMatrixInverse.copy(R.projectionMatrixInverse),C===null&&W.isPerspectiveCamera&&(C={camera:W,fov:W.fov,zoom:W.zoom}),V(W,G,rt)};function V(W,it,Y){Y===null?W.matrix.copy(it.matrixWorld):(W.matrix.copy(Y.matrixWorld),W.matrix.invert(),W.matrix.multiply(it.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(it.projectionMatrix),W.projectionMatrixInverse.copy(it.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ya*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return G},this.getFoveation=function(){if(!(u===null&&p===null))return l},this.setFoveation=function(W){l=W,u!==null&&(u.fixedFoveation=W),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=W)},this.hasDepthSensing=function(){return d.texture!==null},this.getDepthSensingMesh=function(){return d.getMesh(G)},this.getCameraTexture=function(W){return m[W]};let Z=null;function lt(W,it){if(h=it.getViewerPose(c||a),g=it,h!==null){const Y=h.views;p!==null&&(t.setRenderTargetFramebuffer(S,p.framebuffer),t.setRenderTarget(S));let rt=!1;Y.length!==G.cameras.length&&(G.cameras.length=0,rt=!0);for(let At=0;At<Y.length;At++){const Ft=Y[At];let kt=null;if(p!==null)kt=p.getViewport(Ft);else{const Re=f.getViewSubImage(u,Ft);kt=Re.viewport,At===0&&(t.setRenderTargetTextures(S,Re.colorTexture,Re.depthStencilTexture),t.setRenderTarget(S))}let Ht=F[At];Ht===void 0&&(Ht=new hn,Ht.layers.enable(At),Ht.viewport=new fe,F[At]=Ht),Ht.matrix.fromArray(Ft.transform.matrix),Ht.matrix.decompose(Ht.position,Ht.quaternion,Ht.scale),Ht.projectionMatrix.fromArray(Ft.projectionMatrix),Ht.projectionMatrixInverse.copy(Ht.projectionMatrix).invert(),Ht.viewport.set(kt.x,kt.y,kt.width,kt.height),At===0&&(G.matrix.copy(Ht.matrix),G.matrix.decompose(G.position,G.quaternion,G.scale)),rt===!0&&G.cameras.push(Ht)}const nt=i.enabledFeatures;if(nt&&nt.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){f=n.getBinding();const At=f.getDepthInformation(Y[0]);At&&At.isValid&&At.texture&&d.init(At,i.renderState)}if(nt&&nt.includes("camera-access")&&y){t.state.unbindTexture(),f=n.getBinding();for(let At=0;At<Y.length;At++){const Ft=Y[At].camera;if(Ft){let kt=m[Ft];kt||(kt=new Rc,m[Ft]=kt);const Ht=f.getCameraImage(Ft);kt.sourceTexture=Ht}}}}for(let Y=0;Y<b.length;Y++){const rt=w[Y],nt=b[Y];rt!==null&&nt!==void 0&&nt.update(rt,it,c||a)}Z&&Z(W,it),it.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:it}),g=null}const _t=new Fc;_t.setAnimationLoop(lt),this.setAnimationLoop=function(W){Z=W},this.dispose=function(){}}}const E0=new ee,qc=new Bt;qc.set(-1,0,0,0,1,0,0,0,1);function w0(s,t){function e(d,m){d.matrixAutoUpdate===!0&&d.updateMatrix(),m.value.copy(d.matrix)}function n(d,m){m.color.getRGB(d.fogColor.value,Dc(s)),m.isFog?(d.fogNear.value=m.near,d.fogFar.value=m.far):m.isFogExp2&&(d.fogDensity.value=m.density)}function i(d,m,x,T,S){m.isNodeMaterial?m.uniformsNeedUpdate=!1:m.isMeshBasicMaterial?r(d,m):m.isMeshLambertMaterial?(r(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshToonMaterial?(r(d,m),f(d,m)):m.isMeshPhongMaterial?(r(d,m),h(d,m),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)):m.isMeshStandardMaterial?(r(d,m),u(d,m),m.isMeshPhysicalMaterial&&p(d,m,S)):m.isMeshMatcapMaterial?(r(d,m),g(d,m)):m.isMeshDepthMaterial?r(d,m):m.isMeshDistanceMaterial?(r(d,m),y(d,m)):m.isMeshNormalMaterial?r(d,m):m.isLineBasicMaterial?(a(d,m),m.isLineDashedMaterial&&o(d,m)):m.isPointsMaterial?l(d,m,x,T):m.isSpriteMaterial?c(d,m):m.isShadowMaterial?(d.color.value.copy(m.color),d.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(d,m){d.opacity.value=m.opacity,m.color&&d.diffuse.value.copy(m.color),m.emissive&&d.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(d.map.value=m.map,e(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.bumpMap&&(d.bumpMap.value=m.bumpMap,e(m.bumpMap,d.bumpMapTransform),d.bumpScale.value=m.bumpScale,m.side===He&&(d.bumpScale.value*=-1)),m.normalMap&&(d.normalMap.value=m.normalMap,e(m.normalMap,d.normalMapTransform),d.normalScale.value.copy(m.normalScale),m.side===He&&d.normalScale.value.negate()),m.displacementMap&&(d.displacementMap.value=m.displacementMap,e(m.displacementMap,d.displacementMapTransform),d.displacementScale.value=m.displacementScale,d.displacementBias.value=m.displacementBias),m.emissiveMap&&(d.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,d.emissiveMapTransform)),m.specularMap&&(d.specularMap.value=m.specularMap,e(m.specularMap,d.specularMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest);const x=t.get(m),T=x.envMap,S=x.envMapRotation;T&&(d.envMap.value=T,d.envMapRotation.value.setFromMatrix4(E0.makeRotationFromEuler(S)).transpose(),T.isCubeTexture&&T.isRenderTargetTexture===!1&&d.envMapRotation.value.premultiply(qc),d.reflectivity.value=m.reflectivity,d.ior.value=m.ior,d.refractionRatio.value=m.refractionRatio),m.lightMap&&(d.lightMap.value=m.lightMap,d.lightMapIntensity.value=m.lightMapIntensity,e(m.lightMap,d.lightMapTransform)),m.aoMap&&(d.aoMap.value=m.aoMap,d.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,d.aoMapTransform))}function a(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,m.map&&(d.map.value=m.map,e(m.map,d.mapTransform))}function o(d,m){d.dashSize.value=m.dashSize,d.totalSize.value=m.dashSize+m.gapSize,d.scale.value=m.scale}function l(d,m,x,T){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.size.value=m.size*x,d.scale.value=T*.5,m.map&&(d.map.value=m.map,e(m.map,d.uvTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function c(d,m){d.diffuse.value.copy(m.color),d.opacity.value=m.opacity,d.rotation.value=m.rotation,m.map&&(d.map.value=m.map,e(m.map,d.mapTransform)),m.alphaMap&&(d.alphaMap.value=m.alphaMap,e(m.alphaMap,d.alphaMapTransform)),m.alphaTest>0&&(d.alphaTest.value=m.alphaTest)}function h(d,m){d.specular.value.copy(m.specular),d.shininess.value=Math.max(m.shininess,1e-4)}function f(d,m){m.gradientMap&&(d.gradientMap.value=m.gradientMap)}function u(d,m){d.metalness.value=m.metalness,m.metalnessMap&&(d.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,d.metalnessMapTransform)),d.roughness.value=m.roughness,m.roughnessMap&&(d.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,d.roughnessMapTransform)),m.envMap&&(d.envMapIntensity.value=m.envMapIntensity)}function p(d,m,x){d.ior.value=m.ior,m.diffuseRoughness>0&&(d.diffuseRoughness.value=m.diffuseRoughness,m.diffuseRoughnessMap&&(d.diffuseRoughnessMap.value=m.diffuseRoughnessMap,e(m.diffuseRoughnessMap,d.diffuseRoughnessMapTransform))),m.sheen>0&&(d.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),d.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(d.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,d.sheenColorMapTransform)),m.sheenRoughnessMap&&(d.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,d.sheenRoughnessMapTransform))),m.clearcoat>0&&(d.clearcoat.value=m.clearcoat,d.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(d.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,d.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(d.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,d.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(d.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,d.clearcoatNormalMapTransform),d.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===He&&d.clearcoatNormalScale.value.negate())),m.dispersion>0&&(d.dispersion.value=m.dispersion),m.retroreflectivity>0&&(d.retroreflectivity.value=m.retroreflectivity),m.iridescence>0&&(d.iridescence.value=m.iridescence,d.iridescenceIOR.value=m.iridescenceIOR,d.iridescenceThicknessMinimum.value=m.iridescenceThicknessMinimum,d.iridescenceThicknessMaximum.value=m.iridescenceThicknessMaximum,m.iridescenceMap&&(d.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,d.iridescenceMapTransform)),m.iridescenceThicknessMap&&(d.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,d.iridescenceThicknessMapTransform))),m.transmission>0&&(d.transmission.value=m.transmission,d.transmissionSamplerMap.value=x.texture,d.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(d.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,d.transmissionMapTransform)),d.thickness.value=m.thickness,m.thicknessMap&&(d.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,d.thicknessMapTransform)),d.attenuationDistance.value=m.attenuationDistance,d.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(d.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(d.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,d.anisotropyMapTransform))),d.specularIntensity.value=m.specularIntensity,d.specularColor.value.copy(m.specularColor),m.specularColorMap&&(d.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,d.specularColorMapTransform)),m.specularIntensityMap&&(d.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,d.specularIntensityMapTransform))}function g(d,m){m.matcap&&(d.matcap.value=m.matcap)}function y(d,m){const x=t.get(m).light;d.referencePosition.value.setFromMatrixPosition(x.matrixWorld),d.nearDistance.value=x.shadow.camera.near,d.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function T0(s,t,e,n){let i={},r={};function a(x,T){const S=T.program;n.uniformBlockBinding(x,S,i[x.id])}function o(x,T){let S=i[x.id];S===void 0&&(g(x),S=l(x),i[x.id]=S,x.addEventListener("dispose",d));const b=T.program;n.updateUBOMapping(x,b);const w=t.render.frame;r[x.id]!==w&&(c(x),r[x.id]=w)}function l(x){const T=s.createBuffer(),S=x.__size,b=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,T),s.bufferData(s.UNIFORM_BUFFER,S,b),s.bindBuffer(s.UNIFORM_BUFFER,null),T}function c(x){const T=i[x.id],S=x.uniforms,b=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,T);for(let w=0,_=S.length;w<_;w++){const v=S[w];if(Array.isArray(v))for(let C=0,R=v.length;C<R;C++)h(v[C],w,C,b);else h(v,w,0,b)}s.bindBuffer(s.UNIFORM_BUFFER,null)}function h(x,T,S,b){if(u(x,T,S,b)===!0){const w=x.__offset,_=x.value;if(Array.isArray(_)){let v=0;for(let C=0;C<_.length;C++){const R=_[C],N=y(R,!0);f(R,x.__data,v),v+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else f(_,x.__data,0);s.bufferSubData(s.UNIFORM_BUFFER,w,x.__data)}}function f(x,T,S){typeof x=="number"||typeof x=="boolean"?T[S]=x:x.isMatrix3?(T[S]=x.elements[0],T[S+1]=x.elements[1],T[S+2]=x.elements[2],T[S+3]=0,T[S+4]=x.elements[3],T[S+5]=x.elements[4],T[S+6]=x.elements[5],T[S+7]=0,T[S+8]=x.elements[6],T[S+9]=x.elements[7],T[S+10]=x.elements[8],T[S+11]=0):ArrayBuffer.isView(x)?T.set(x.subarray(0,T.length-S),S):x.toArray(T,S)}function u(x,T,S,b){const w=x.value,_=T+"_"+S;if(Array.isArray(w)){b[_]===void 0&&(b[_]=[]);const v=b[_];let C=!1;for(let R=0;R<w.length;R++)p(w[R],v,R)===!0&&(C=!0);return C}return p(w,b,_)}function p(x,T,S){if(T[S]===void 0)return typeof x=="number"||typeof x=="boolean"?T[S]=x:ArrayBuffer.isView(x)?T[S]=x.slice():T[S]=x.clone(),!0;{const b=T[S];if(typeof x=="number"||typeof x=="boolean"){if(b!==x)return T[S]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(b.equals(x)===!1)return b.copy(x),!0}}return!1}function g(x){const T=x.uniforms;let S=0;const b=16;for(let _=0,v=T.length;_<v;_++){const C=Array.isArray(T[_])?T[_]:[T[_]];for(let R=0,N=C.length;R<N;R++){const F=C[R],G=Array.isArray(F.value)?F.value:[F.value],I=Array.isArray(T[_])||Array.isArray(F.value);let H=S;for(let D=0,J=G.length;D<J;D++){const X=G[D],V=y(X,I),Z=S%b,lt=Z%V.boundary,_t=Z+lt;S+=lt,_t!==0&&b-_t<V.storage&&(S+=b-_t),D===0&&(H=S),S+=V.storage}const K=F.type==="int"?Int32Array:F.type==="uint"?Uint32Array:Float32Array;F.__data=new K((S-H)/Float32Array.BYTES_PER_ELEMENT),F.__offset=H}}const w=S%b;return w>0&&(S+=b-w),x.__size=S,x.__cache={},this}function y(x,T){const S={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(S.boundary=4,S.storage=4):x.isVector2?(S.boundary=8,S.storage=8):x.isVector3||x.isColor?(S.boundary=16,S.storage=12):x.isVector4?(S.boundary=16,S.storage=16):x.isMatrix3?(S.boundary=16,S.storage=48):x.isMatrix4?(S.boundary=16,S.storage=64):x.isTexture?Ut("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(S.boundary=16,S.storage=x.byteLength):Ut("WebGLRenderer: Unsupported uniform value type.",x),T===!0&&(S.boundary=16,S.storage=Math.ceil(S.storage/16)*16),S}function d(x){const T=x.target;T.removeEventListener("dispose",d),s.deleteBuffer(i[T.id]),delete i[T.id],delete r[T.id]}function m(){for(const x in i)s.deleteBuffer(i[x]);i={},r={}}return{bind:a,update:o,dispose:m}}const A0=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let gn=null;function R0(){return gn===null&&(gn=new wc(A0,16,16,pi,Rn),gn.name="DFG_LUT",gn.minFilter=Xe,gn.magFilter=Xe,gn.wrapS=Fn,gn.wrapT=Fn,gn.generateMipmaps=!1,gn.needsUpdate=!0),gn}class C0{constructor(t={}){const{canvas:e=Nh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:f=!1,reversedDepthBuffer:u=!1,outputBufferType:p=$e}=t;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const y=p,d=new Set([oo,ao,ro]),m=new Set([$e,An,ps,ki,no,io]),x=new Uint32Array(4),T=new Int32Array(4),S={textures:[],min:[],max:[],resolution:[]};let b=null,w=null;const _=[],v=[];let C=null;this.domElement=e,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=On,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const R=this;let N=!1,F=null,G=null,I=null,H=null;this._outputColorSpace=Pe;let K=0,D=0,J=null,X=-1,V=null;const Z=new fe,lt=new fe;let _t=null;const W=new yt(0);let it=0,Y=e.width,rt=e.height,nt=1,Ct=null,qt=null;const At=new fe(0,0,Y,rt),Ft=new fe(0,0,Y,rt);let kt=!1;const Ht=new gs,Re=new ho;let ve=!1,Ve=!1;const ue=new ee,pn=new P,be=new fe,Ke={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Je=!1;function Ze(){return J===null?nt:1}let O=n;function Qe(E,U){return e.getContext(E,U)}let ce,he,gt,Me,Lt,Ot,A,M,z,st,et,ct,pt,Q,j,ut,L,tt,$,dt,ot,ht,Rt;try{const E={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:f};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ja}`),e.addEventListener("webglcontextlost",Pt,!1),e.addEventListener("webglcontextrestored",Gt,!1),e.addEventListener("webglcontextcreationerror",xt,!1),O===null){const U="webgl2";if(O=Qe(U,E),O===null)throw Qe(U)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Vt()}catch(E){throw e.removeEventListener("webglcontextlost",Pt,!1),e.removeEventListener("webglcontextrestored",Gt,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),te("WebGLRenderer: "+E.message),E}function Vt(){ce=new Dp(O),ce.init(),ot=new v0(O,ce),he=new Sp(O,ce,t,ot),gt=new _0(O,ce),he.reversedDepthBuffer&&u&&gt.buffers.depth.setReversed(!0),G=O.createFramebuffer(),I=O.createFramebuffer(),H=O.createFramebuffer(),Me=new Up(O),Lt=new i0,Ot=new x0(O,ce,gt,Lt,he,ot,Me),A=new Lp(R),M=new Fu(O),ht=new vp(O,M),z=new Ip(O,M,Me,ht),st=new Op(O,z,M,ht,Me),tt=new Fp(O,he,Ot),j=new yp(Lt),et=new n0(R,A,ce,he,ht,j),ct=new w0(R,Lt),pt=new r0,Q=new u0(ce),L=new xp(R,A,gt,st,g,l),ut=new g0(R,st,he),Rt=new T0(O,Me,he,gt),$=new Mp(O,ce,Me),dt=new Np(O,ce,Me),Me.programs=et.programs,R.capabilities=he,R.extensions=ce,R.properties=Lt,R.renderLists=pt,R.shadowMap=ut,R.state=gt,R.info=Me}y!==$e&&(C=new zp(y,e.width,e.height,o,i,r));const at=new b0(R,O);this.xr=at,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const E=ce.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){const E=ce.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return nt},this.setPixelRatio=function(E){E!==void 0&&(nt=E,this.setSize(Y,rt,!1))},this.getSize=function(E){return E.set(Y,rt)},this.setSize=function(E,U,q=!0){if(at.isPresenting){Ut("WebGLRenderer: Can't change size while VR device is presenting.");return}Y=E,rt=U,e.width=Math.floor(E*nt),e.height=Math.floor(U*nt),q===!0&&(e.style.width=E+"px",e.style.height=U+"px"),C!==null&&C.setSize(e.width,e.height),this.setViewport(0,0,E,U)},this.getDrawingBufferSize=function(E){return E.set(Y*nt,rt*nt).floor()},this.setDrawingBufferSize=function(E,U,q){Y=E,rt=U,nt=q,e.width=Math.floor(E*q),e.height=Math.floor(U*q),this.setViewport(0,0,E,U)},this.setEffects=function(E){if(y===$e){te("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let U=0;U<E.length;U++)if(E[U].isOutputPass===!0){Ut("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}C.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(Z)},this.getViewport=function(E){return E.copy(At)},this.setViewport=function(E,U,q,B){E.isVector4?At.set(E.x,E.y,E.z,E.w):At.set(E,U,q,B),gt.viewport(Z.copy(At).multiplyScalar(Ze()).round())},this.getScissor=function(E){return E.copy(Ft)},this.setScissor=function(E,U,q,B){E.isVector4?Ft.set(E.x,E.y,E.z,E.w):Ft.set(E,U,q,B),gt.scissor(lt.copy(Ft).multiplyScalar(Ze()).round())},this.getScissorTest=function(){return kt},this.setScissorTest=function(E){gt.setScissorTest(kt=E)},this.setOpaqueSort=function(E){Ct=E},this.setTransparentSort=function(E){qt=E},this.getClearColor=function(E){return E.copy(L.getClearColor())},this.setClearColor=function(){L.setClearColor(...arguments)},this.getClearAlpha=function(){return L.getClearAlpha()},this.setClearAlpha=function(){L.setClearAlpha(...arguments)},this.clear=function(E=!0,U=!0,q=!0){let B=0;if(E){let k=!1;if(J!==null){const mt=J.texture.format;k=d.has(mt)}if(k){const mt=J.texture.type,bt=m.has(mt),ft=L.getClearColor(),Mt=L.getClearAlpha(),Tt=ft.r,zt=ft.g,$t=ft.b;bt?(x[0]=Tt,x[1]=zt,x[2]=$t,x[3]=Mt,O.clearBufferuiv(O.COLOR,0,x)):(T[0]=Tt,T[1]=zt,T[2]=$t,T[3]=Mt,O.clearBufferiv(O.COLOR,0,T))}else B|=O.COLOR_BUFFER_BIT}U&&(B|=O.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),q&&(B|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),B!==0&&O.clear(B)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),F=E},this.dispose=function(){e.removeEventListener("webglcontextlost",Pt,!1),e.removeEventListener("webglcontextrestored",Gt,!1),e.removeEventListener("webglcontextcreationerror",xt,!1),L.dispose(),pt.dispose(),Q.dispose(),Ot.dispose(),Lt.dispose(),A.dispose(),st.dispose(),z.dispose(),ht.dispose(),Rt.dispose(),et.dispose(),at.dispose(),at.removeEventListener("sessionstart",bo),at.removeEventListener("sessionend",Eo),ei.stop()};function Pt(E){E.preventDefault(),dr("WebGLRenderer: Context Lost."),N=!0}function Gt(){dr("WebGLRenderer: Context Restored."),N=!1;const E=Me.autoReset,U=ut.enabled,q=ut.autoUpdate,B=ut.needsUpdate,k=ut.type;Vt(),Me.autoReset=E,ut.enabled=U,ut.autoUpdate=q,ut.needsUpdate=B,ut.type=k}function xt(E){te("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function se(E){const U=E.target;U.removeEventListener("dispose",se),Ee(U)}function Ee(E){kn(E),Lt.remove(E)}function kn(E){const U=Lt.get(E).programs;U!==void 0&&(U.forEach(function(q){et.releaseProgram(q)}),E.isShaderMaterial&&et.releaseShaderCache(E))}this.renderBufferDirect=function(E,U,q,B,k,mt){U===null&&(U=Ke);const bt=k.isMesh&&k.matrixWorld.determinantAffine()<0,ft=Qc(E,U,q,B,k);gt.setMaterial(B,bt);let Mt=q.index,Tt=1;if(B.wireframe===!0){if(Mt=z.getWireframeAttribute(q),Mt===void 0)return;Tt=2}const zt=q.drawRange,$t=q.attributes.position;let Et=zt.start*Tt,Kt=(zt.start+zt.count)*Tt;mt!==null&&(Et=Math.max(Et,mt.start*Tt),Kt=Math.min(Kt,(mt.start+mt.count)*Tt)),Mt!==null?(Et=Math.max(Et,0),Kt=Math.min(Kt,Mt.count)):$t!=null&&(Et=Math.max(Et,0),Kt=Math.min(Kt,$t.count));const pe=Kt-Et;if(pe<0||pe===1/0)return;ht.setup(k,B,ft,q,Mt);let oe,ae=$;if(Mt!==null&&(oe=M.get(Mt),ae=dt,ae.setIndex(oe)),k.isMesh)B.wireframe===!0?(gt.setLineWidth(B.wireframeLinewidth*Ze()),ae.setMode(O.LINES)):ae.setMode(O.TRIANGLES);else if(k.isLine){let De=B.linewidth;De===void 0&&(De=1),gt.setLineWidth(De*Ze()),k.isLineSegments?ae.setMode(O.LINES):k.isLineLoop?ae.setMode(O.LINE_LOOP):ae.setMode(O.LINE_STRIP)}else k.isPoints?ae.setMode(O.POINTS):k.isSprite&&ae.setMode(O.TRIANGLES);if(k.isBatchedMesh)if(ce.get("WEBGL_multi_draw"))ae.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{const De=k._multiDrawStarts,wt=k._multiDrawCounts,Oe=k._multiDrawCount,ne=Mt?M.get(Mt).bytesPerElement:1,ni=Lt.get(B).currentProgram.getUniforms();for(let Ie=0;Ie<Oe;Ie++)ni.setValue(O,"_gl_DrawID",Ie),ae.render(De[Ie]/ne,wt[Ie])}else if(k.isInstancedMesh)ae.renderInstances(Et,pe,k.count);else if(q.isInstancedBufferGeometry){const De=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,wt=Math.min(q.instanceCount,De);ae.renderInstances(Et,pe,wt)}else ae.render(Et,pe)};function yo(E,U,q,B){F!==null&&E.isNodeMaterial&&F.setObject(B,E),ve===!0&&j.setState(E,q,!1),E.transparent===!0&&E.side===ke&&E.forceSinglePass===!1?(E.side=He,E.needsUpdate=!0,$i(E,U,B),E.side=fi,E.needsUpdate=!0,$i(E,U,B),E.side=ke):$i(E,U,B)}this.compile=function(E,U,q=null){q===null&&(q=E),F!==null&&F.renderStart(E,U,q),w=Q.get(q),w.init(U),v.push(w),q.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(w.pushLight(k),k.castShadow&&w.pushShadow(k))}),E!==q&&E.traverseVisible(function(k){k.isLight&&k.layers.test(U.layers)&&(w.pushLight(k),k.castShadow&&w.pushShadow(k))}),w.setupLights(),F!==null&&F.updateLights(w.state.lightsArray),Ve=this.localClippingEnabled,ve=j.init(this.clippingPlanes,Ve),ve===!0&&j.setGlobalState(this.clippingPlanes,U),F!==null&&ut.render(w.state.shadowsArray,q,U);const B=new Set;return E.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;const mt=k.material;if(mt)if(Array.isArray(mt))for(let bt=0;bt<mt.length;bt++){const ft=mt[bt];yo(ft,q,U,k),B.add(ft)}else yo(mt,q,U,k),B.add(mt)}),w=v.pop(),F!==null&&F.renderEnd(),B},this.compileAsync=function(E,U,q=null){const B=this.compile(E,U,q);return new Promise(k=>{function mt(){if(B.forEach(function(bt){const Mt=Lt.get(bt).currentProgram;(Mt===void 0||Mt.isReady())&&B.delete(bt)}),B.size===0){k(E);return}setTimeout(mt,10)}ce.get("KHR_parallel_shader_compile")!==null?mt():setTimeout(mt,10)})};let wr=null;function Jc(E){wr&&wr(E)}function bo(){ei.stop()}function Eo(){ei.start()}const ei=new Fc;ei.setAnimationLoop(Jc),typeof self<"u"&&ei.setContext(self),this.setAnimationLoop=function(E){wr=E,at.setAnimationLoop(E),E===null?ei.stop():ei.start()},at.addEventListener("sessionstart",bo),at.addEventListener("sessionend",Eo),this.render=function(E,U){if(U!==void 0&&U.isCamera!==!0){te("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;F!==null&&F.renderStart(E,U);const q=at.enabled===!0&&at.isPresenting===!0,B=C!==null&&(J===null||q)&&C.begin(R,J);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),at.enabled===!0&&at.isPresenting===!0&&(C===null||C.isCompositing()===!1)&&(at.cameraAutoUpdate===!0&&at.updateCamera(U),U=at.getCamera()),E.isScene===!0&&E.onBeforeRender(R,E,U,J),w=Q.get(E,v.length),w.init(U),w.state.textureUnits=Ot.getTextureUnits(),v.push(w),ue.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),U.isArrayCamera?Re.setFromArrayCamera(U):Ht.setFromProjectionMatrix(ue,dn,U.reversedDepth),Ve=this.localClippingEnabled,ve=j.init(this.clippingPlanes,Ve),b=pt.get(E,_.length),b.init(),_.push(b),this.info.render.frame++,at.enabled===!0&&at.isPresenting===!0){const bt=R.xr.getDepthSensingMesh();bt!==null&&Tr(bt,U,-1/0,R.sortObjects)}Tr(E,U,0,R.sortObjects),b.finish(),F!==null&&F.updateLights(w.state.lightsArray),R.sortObjects===!0&&b.sort(Ct,qt),Je=at.enabled===!1||at.isPresenting===!1||at.hasDepthSensing()===!1,Je&&L.addToRenderList(b,E),this.info.autoReset===!0&&this.info.reset(),ve===!0&&j.beginShadows();const k=w.state.shadowsArray;if(ut.render(k,E,U),ve===!0&&j.endShadows(),(B&&C.hasRenderPass())===!1){const bt=b.opaque,ft=b.transmissive;if(w.setupLights(),U.isArrayCamera){const Mt=U.cameras;if(ft.length>0)for(let Tt=0,zt=Mt.length;Tt<zt;Tt++){const $t=Mt[Tt];To(bt,ft,E,$t)}Je&&L.render(E);for(let Tt=0,zt=Mt.length;Tt<zt;Tt++){const $t=Mt[Tt];wo(b,E,$t,$t.viewport)}}else ft.length>0&&To(bt,ft,E,U),Je&&L.render(E),wo(b,E,U)}J!==null&&D===0&&(Ot.updateMultisampleRenderTarget(J),Ot.updateRenderTargetMipmap(J)),B&&C.end(R),E.isScene===!0&&E.onAfterRender(R,E,U),ht.resetDefaultState(),X=-1,V=null,v.pop(),v.length>0?(w=v[v.length-1],Ot.setTextureUnits(w.state.textureUnits),ve===!0&&j.setGlobalState(R.clippingPlanes,w.state.camera)):w=null,_.pop(),_.length>0?b=_[_.length-1]:b=null,F!==null&&F.renderEnd()};function Tr(E,U,q,B){if(E.visible===!1)return;if(E.layers.test(U.layers)){if(E.isGroup)q=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(U);else if(E.isLight)w.pushLight(E),E.castShadow&&w.pushShadow(E);else if(E.isSprite){const bt=U.isArrayCamera?Re:Ht;if(!E.frustumCulled||E.intersectsFrustum(bt)){B&&be.setFromMatrixPosition(E.matrixWorld).applyMatrix4(ue);const ft=st.update(E),Mt=E.material;Mt.visible&&b.push(E,ft,Mt,q,be.z,null,U)}}else if(E.isMesh||E.isLine||E.isPoints){const bt=U.isArrayCamera?Re:Ht;if(!E.frustumCulled||E.intersectsFrustum(bt)){const ft=st.update(E),Mt=E.material;if(B&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),be.copy(E.boundingSphere.center)):(ft.boundingSphere===null&&ft.computeBoundingSphere(),be.copy(ft.boundingSphere.center)),be.applyMatrix4(E.matrixWorld).applyMatrix4(ue)),Array.isArray(Mt)){const Tt=ft.groups;for(let zt=0,$t=Tt.length;zt<$t;zt++){const Et=Tt[zt],Kt=Mt[Et.materialIndex];Kt&&Kt.visible&&b.push(E,ft,Kt,q,be.z,Et,U)}}else Mt.visible&&b.push(E,ft,Mt,q,be.z,null,U)}}}const mt=E.children;for(let bt=0,ft=mt.length;bt<ft;bt++)Tr(mt[bt],U,q,B)}function wo(E,U,q,B){const{opaque:k,transmissive:mt,transparent:bt}=E;w.setupLightsView(q),ve===!0&&j.setGlobalState(R.clippingPlanes,q),B&&gt.viewport(Z.copy(B)),k.length>0&&vs(k,U,q),mt.length>0&&vs(mt,U,q),bt.length>0&&vs(bt,U,q),gt.buffers.depth.setTest(!0),gt.buffers.depth.setMask(!0),gt.buffers.color.setMask(!0),gt.setPolygonOffset(!1)}function To(E,U,q,B){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[B.id]===void 0){const Et=ce.has("EXT_color_buffer_half_float")||ce.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[B.id]=new Tn(1,1,{generateMipmaps:!0,type:Et?Rn:$e,minFilter:Jn,samples:Math.max(4,he.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:Jt.workingColorSpace})}const mt=w.state.transmissionRenderTarget[B.id],bt=B.viewport||Z;mt.setSize(bt.z*R.transmissionResolutionScale,bt.w*R.transmissionResolutionScale);const ft=R.getRenderTarget(),Mt=R.getActiveCubeFace(),Tt=R.getActiveMipmapLevel();R.setRenderTarget(mt),R.getClearColor(W),it=R.getClearAlpha(),it<1&&R.setClearColor(16777215,.5),R.clear(),Je&&L.render(q);const zt=R.toneMapping;R.toneMapping=On;const $t=B.viewport;if(B.viewport!==void 0&&(B.viewport=void 0),w.setupLightsView(B),ve===!0&&j.setGlobalState(R.clippingPlanes,B),vs(E,q,B),Ot.updateMultisampleRenderTarget(mt),Ot.updateRenderTargetMipmap(mt),ce.has("WEBGL_multisampled_render_to_texture")===!1){let Et=!1;for(let Kt=0,pe=U.length;Kt<pe;Kt++){const oe=U[Kt],{object:ae,geometry:De,material:wt,group:Oe}=oe;if(wt.side===ke&&ae.layers.test(B.layers)){const ne=wt.side;wt.side=He,wt.needsUpdate=!0,Ao(ae,q,B,De,wt,Oe),wt.side=ne,wt.needsUpdate=!0,Et=!0}}Et===!0&&(Ot.updateMultisampleRenderTarget(mt),Ot.updateRenderTargetMipmap(mt))}R.setRenderTarget(ft,Mt,Tt),R.setClearColor(W,it),$t!==void 0&&(B.viewport=$t),R.toneMapping=zt}function vs(E,U,q){const B=U.isScene===!0?U.overrideMaterial:null;for(let k=0,mt=E.length;k<mt;k++){const bt=E[k],{object:ft,geometry:Mt,group:Tt}=bt;let zt=bt.material;zt.allowOverride===!0&&B!==null&&(zt=B),ft.layers.test(q.layers)&&Ao(ft,U,q,Mt,zt,Tt)}}function Ao(E,U,q,B,k,mt){F!==null&&k.isNodeMaterial&&F.setObject(E,k),E.onBeforeRender(R,U,q,B,k,mt),E.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),k.onBeforeRender(R,U,q,B,E,mt),k.transparent===!0&&k.side===ke&&k.forceSinglePass===!1?(k.side=He,k.needsUpdate=!0,R.renderBufferDirect(q,U,B,k,E,mt),k.side=fi,k.needsUpdate=!0,R.renderBufferDirect(q,U,B,k,E,mt),k.side=ke):R.renderBufferDirect(q,U,B,k,E,mt),E.onAfterRender(R,U,q,B,k,mt)}function Ro(E){let U=0;for(const q of E)q.texture!==null&&U++;return U}function $i(E,U,q){U.isScene!==!0&&(U=Ke);const B=Lt.get(E),k=w.state.lights,mt=w.state.shadowsArray,bt=k.state.version,ft=et.getParameters(E,k.state,mt,U,q,w.state.lightProbeGridArray),Mt=et.getProgramCacheKey(ft);let Tt=B.programs;B.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?U.environment:null,B.fog=U.fog;const zt=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;B.envMap=A.get(E.envMap||B.environment,zt),B.envMapRotation=B.environment!==null&&E.envMap===null?U.environmentRotation:E.envMapRotation,Tt===void 0&&(E.addEventListener("dispose",se),Tt=new Map,B.programs=Tt,B.programVariants=new Map);let $t=Tt.get(Mt);if($t!==void 0){if(B.currentProgram===$t&&B.lightsStateVersion===bt)return Po(E,ft),$t}else ft.uniforms=et.getUniforms(E),F!==null&&E.isNodeMaterial&&F.build(E,q,ft),E.onBeforeCompile(ft,R),$t=et.acquireProgram(ft,Mt),Tt.set(Mt,$t),B.uniforms=ft.uniforms;const Et=B.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Et.clippingPlanes=j.uniform),Po(E,ft),B.needsLights=th(E),B.lightsStateVersion=bt,B.needsLights&&(Et.ambientLightColor.value=k.state.ambient,Et.lightProbe.value=k.state.probe,Et.sunLights.value=k.state.sun,Et.sunLightShadows.value=k.state.sunShadow,Et.directionalLights.value=k.state.directional,Et.directionalLightShadows.value=k.state.directionalShadow,Et.spotLights.value=k.state.spot,Et.spotLightShadows.value=k.state.spotShadow,Et.rectAreaLights.value=k.state.rectArea,Et.ltc_1.value=k.state.rectAreaLTC1,Et.ltc_2.value=k.state.rectAreaLTC2,Et.pointLights.value=k.state.point,Et.pointLightShadows.value=k.state.pointShadow,Et.hemisphereLights.value=k.state.hemi,Et.sunShadowMatrix.value=k.state.sunShadowMatrix,Et.sunShadowCascade.value=k.state.sunShadowCascade,Et.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Et.spotLightMatrix.value=k.state.spotLightMatrix,Et.spotLightMap.value=k.state.spotLightMap,Et.pointShadowMatrix.value=k.state.pointShadowMatrix),B.numLightProbeGrids=Ro(w.state.lightProbeGridArray),B.currentProgram=$t,B.uniformsList=null,$t}function Zc(E,U,q,B,k){const mt=Lt.get(E),bt=mt.currentProgram.id+","+B+","+k;let ft=mt.programVariants.get(bt);return ft===void 0?(ft=$i(E,U,q),mt.programVariants.set(bt,ft)):(mt.currentProgram=ft,mt.uniformsList=null,mt.outputColorSpace=B,mt.toneMapping=k),ft}function Co(E){if(E.uniformsList===null){const U=E.currentProgram.getUniforms();E.uniformsList=sr.seqWithValue(U.seq,E.uniforms)}return E.uniformsList}function Po(E,U){const q=Lt.get(E);q.outputColorSpace=U.outputColorSpace,q.batching=U.batching,q.batchingColor=U.batchingColor,q.instancing=U.instancing,q.instancingColor=U.instancingColor,q.instancingMorph=U.instancingMorph,q.skinning=U.skinning,q.morphTargets=U.morphTargets,q.morphNormals=U.morphNormals,q.morphColors=U.morphColors,q.morphTargetsCount=U.morphTargetsCount,q.numClippingPlanes=U.numClippingPlanes,q.numIntersection=U.numClipIntersection,q.vertexAlphas=U.vertexAlphas,q.vertexTangents=U.vertexTangents,q.toneMapping=U.toneMapping}function Qc(E,U,q,B,k){U.isScene!==!0&&(U=Ke),Ot.resetTextureUnits();const mt=U.fog,bt=B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial?U.environment:null,ft=J===null?R.outputColorSpace:J.isXRRenderTarget===!0?J.texture.colorSpace:Jt.workingColorSpace,Mt=B.isMeshStandardMaterial||B.isMeshLambertMaterial&&!B.envMap||B.isMeshPhongMaterial&&!B.envMap,Tt=A.get(B.envMap||bt,Mt),zt=B.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,$t=!!q.attributes.tangent&&(!!B.normalMap||B.anisotropy>0),Et=!!q.morphAttributes.position,Kt=!!q.morphAttributes.normal,pe=!!q.morphAttributes.color;let oe=On;B.toneMapped&&(J===null||J.isXRRenderTarget===!0)&&(oe=R.toneMapping);const ae=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,De=ae!==void 0?ae.length:0,wt=Lt.get(B),Oe=w.state.lights;if(ve===!0&&(Ve===!0||E!==V)){const de=E===V&&B.id===X;j.setState(B,E,de)}let ne=!1,ni=!1;B.version===wt.__version?wt.needsLights&&wt.lightsStateVersion!==Oe.state.version||k.isBatchedMesh&&wt.batching===!1||!k.isBatchedMesh&&wt.batching===!0||k.isBatchedMesh&&wt.batchingColor===!0&&k._colorsTexture===null||k.isBatchedMesh&&wt.batchingColor===!1&&k._colorsTexture!==null||k.isInstancedMesh&&wt.instancing===!1||!k.isInstancedMesh&&wt.instancing===!0||k.isSkinnedMesh&&wt.skinning===!1||!k.isSkinnedMesh&&wt.skinning===!0||k.isInstancedMesh&&wt.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&wt.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&wt.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&wt.instancingMorph===!1&&k.morphTexture!==null||wt.envMap!==Tt||B.fog===!0&&wt.fog!==mt||wt.numClippingPlanes!==void 0&&(wt.numClippingPlanes!==j.numPlanes||wt.numIntersection!==j.numIntersection)||wt.vertexAlphas!==zt||wt.vertexTangents!==$t||wt.morphTargets!==Et||wt.morphNormals!==Kt||wt.morphColors!==pe||wt.morphTargetsCount!==De||wt.numLightProbeGrids!==Ro(w.state.lightProbeGridArray)?ne=!0:(wt.outputColorSpace!==ft||wt.toneMapping!==oe)&&(ni=!0):(ne=!0,wt.__version=B.version);let Ie=wt.currentProgram;(ne===!0||ni===!0)&&(Ie=ni===!0?Zc(B,U,k,ft,oe):$i(B,U,k),F&&B.isNodeMaterial&&F.onUpdateProgram(B,Ie,wt));let Ms=!1,Hn=!1,ii=!1;const Qt=Ie.getUniforms(),Ce=wt.uniforms;if(gt.useProgram(Ie.program)&&(Ms=!0,Hn=!0,ii=!0),B.id!==X&&(X=B.id,Hn=!0),Ms||V!==E){gt.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Qt.setValue(O,"projectionMatrix",E.projectionMatrix),Qt.setValue(O,"viewMatrix",E.matrixWorldInverse);const we=Qt.map.cameraPosition;we!==void 0&&we.setValue(O,pn.setFromMatrixPosition(E.matrixWorld)),he.logarithmicDepthBuffer&&Qt.setValue(O,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(B.isMeshPhongMaterial||B.isMeshToonMaterial||B.isMeshLambertMaterial||B.isMeshBasicMaterial||B.isMeshStandardMaterial||B.isShaderMaterial)&&Qt.setValue(O,"isOrthographic",E.isOrthographicCamera===!0),V!==E&&(V=E,Hn=!0,ii=!0)}if(wt.needsLights&&(Oe.state.sunShadowMap.length>0&&Qt.setValue(O,"sunShadowMap",Oe.state.sunShadowMap,Ot),Oe.state.directionalShadowMap.length>0&&Qt.setValue(O,"directionalShadowMap",Oe.state.directionalShadowMap,Ot),Oe.state.spotShadowMap.length>0&&Qt.setValue(O,"spotShadowMap",Oe.state.spotShadowMap,Ot),Oe.state.pointShadowMap.length>0&&Qt.setValue(O,"pointShadowMap",Oe.state.pointShadowMap,Ot)),k.isSkinnedMesh){Qt.setOptional(O,k,"bindMatrix"),Qt.setOptional(O,k,"bindMatrixInverse");const de=k.skeleton;de&&(de.boneTexture===null&&de.computeBoneTexture(),Qt.setValue(O,"boneTexture",de.boneTexture,Ot))}k.isBatchedMesh&&(Qt.setOptional(O,k,"batchingTexture"),Qt.setValue(O,"batchingTexture",k._matricesTexture,Ot),Qt.setOptional(O,k,"batchingIdTexture"),Qt.setValue(O,"batchingIdTexture",k._indirectTexture,Ot),Qt.setOptional(O,k,"batchingColorTexture"),k._colorsTexture!==null&&Qt.setValue(O,"batchingColorTexture",k._colorsTexture,Ot));const sn=q.morphAttributes;if((sn.position!==void 0||sn.normal!==void 0||sn.color!==void 0)&&tt.update(k,q,Ie),(Hn||wt.receiveShadow!==k.receiveShadow)&&(wt.receiveShadow=k.receiveShadow,Qt.setValue(O,"receiveShadow",k.receiveShadow)),(B.isMeshStandardMaterial||B.isMeshLambertMaterial||B.isMeshPhongMaterial)&&B.envMap===null&&U.environment!==null&&(Ce.envMapIntensity.value=U.environmentIntensity),Ce.dfgLUT!==void 0&&(Ce.dfgLUT.value=R0()),Hn){if(Qt.setValue(O,"toneMappingExposure",R.toneMappingExposure),wt.needsLights&&jc(Ce,ii),mt&&B.fog===!0&&ct.refreshFogUniforms(Ce,mt),ct.refreshMaterialUniforms(Ce,B,nt,rt,w.state.transmissionRenderTarget[E.id]),wt.needsLights&&wt.numLightProbeGrids>0){const de=S;let we=0;for(const Cn of w.state.lightProbeGridArray)Cn.texture!==null&&(de.textures[we]=Cn.texture,de.min[we]=Cn.boundingBox.min,de.max[we]=Cn.boundingBox.max,de.resolution[we]=Cn.resolution,we++);for(const Cn in de)de[Cn].length=we;Ce.probesSH.value=de.textures,Ce.probesMin.value=de.min,Ce.probesMax.value=de.max,Ce.probesResolution.value=de.resolution}sr.upload(O,Co(wt),Ce,Ot)}if(B.isShaderMaterial&&B.uniformsNeedUpdate===!0&&(sr.upload(O,Co(wt),Ce,Ot),B.uniformsNeedUpdate=!1),B.isSpriteMaterial&&Qt.setValue(O,"center",k.center),Qt.setValue(O,"modelViewMatrix",k.modelViewMatrix),Qt.setValue(O,"normalMatrix",k.normalMatrix),Qt.setValue(O,"modelMatrix",k.matrixWorld),B.uniformsGroups!==void 0){const de=B.uniformsGroups;for(let we=0,Cn=de.length;we<Cn;we++){const Do=de[we];Rt.update(Do,Ie),Rt.bind(Do,Ie)}}return Ie}function jc(E,U){E.ambientLightColor.needsUpdate=U,E.lightProbe.needsUpdate=U,E.sunLights.needsUpdate=U,E.sunLightShadows.needsUpdate=U,E.directionalLights.needsUpdate=U,E.directionalLightShadows.needsUpdate=U,E.pointLights.needsUpdate=U,E.pointLightShadows.needsUpdate=U,E.spotLights.needsUpdate=U,E.spotLightShadows.needsUpdate=U,E.rectAreaLights.needsUpdate=U,E.hemisphereLights.needsUpdate=U}function th(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return D},this.getRenderTarget=function(){return J},this.setRenderTargetTextures=function(E,U,q){const B=Lt.get(E);B.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,B.__autoAllocateDepthBuffer===!1&&(B.__useRenderToTexture=!1),Lt.get(E.texture).__webglTexture=U,Lt.get(E.depthTexture).__webglTexture=B.__autoAllocateDepthBuffer?void 0:q,B.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,U){const q=Lt.get(E);q.__webglFramebuffer=U,q.__useDefaultFramebuffer=U===void 0},this.setRenderTarget=function(E,U=0,q=0){J=E,K=U,D=q;let B=null,k=!1,mt=!1;if(E){const ft=Lt.get(E);if(ft.__useDefaultFramebuffer!==void 0){gt.bindFramebuffer(O.FRAMEBUFFER,ft.__webglFramebuffer),Z.copy(E.viewport),lt.copy(E.scissor),_t=E.scissorTest,gt.viewport(Z),gt.scissor(lt),gt.setScissorTest(_t),X=-1;return}else if(ft.__webglFramebuffer===void 0)Ot.setupRenderTarget(E);else if(ft.__hasExternalTextures)Ot.rebindTextures(E,Lt.get(E.texture).__webglTexture,Lt.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){const zt=E.depthTexture;if(ft.__boundDepthTexture!==zt){if(zt!==null&&Lt.has(zt)&&(E.width!==zt.image.width||E.height!==zt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ot.setupDepthRenderbuffer(E)}}const Mt=E.texture;(Mt.isData3DTexture||Mt.isDataArrayTexture||Mt.isCompressedArrayTexture)&&(mt=!0);const Tt=Lt.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(Tt[U])?B=Tt[U][q]:B=Tt[U],k=!0):E.samples>0&&Ot.useMultisampledRTT(E)===!1?B=Lt.get(E).__webglMultisampledFramebuffer:Array.isArray(Tt)?B=Tt[q]:B=Tt,Z.copy(E.viewport),lt.copy(E.scissor),_t=E.scissorTest}else Z.copy(At).multiplyScalar(nt).floor(),lt.copy(Ft).multiplyScalar(nt).floor(),_t=kt;if(q!==0&&(B=G),gt.bindFramebuffer(O.FRAMEBUFFER,B)&&gt.drawBuffers(E,B),gt.viewport(Z),gt.scissor(lt),gt.setScissorTest(_t),k){const ft=Lt.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+U,ft.__webglTexture,q)}else if(mt){const ft=U;for(let Mt=0;Mt<E.textures.length;Mt++){const Tt=Lt.get(E.textures[Mt]);O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0+Mt,Tt.__webglTexture,q,ft)}}else if(E!==null&&q!==0){const ft=Lt.get(E.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,ft.__webglTexture,q)}X=-1};function Lo(E){const U=Lt.get(E);return(U.__readFormat!==E.format||U.__readType!==E.type)&&(U.__readFormat=E.format,U.__readType=E.type,U.__formatReadable=he.textureFormatReadable(E.format),U.__typeReadable=he.textureTypeReadable(E.type)),U}this.readRenderTargetPixels=function(E,U,q,B,k,mt,bt,ft=0){if(!(E&&E.isWebGLRenderTarget)){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Mt=Lt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&bt!==void 0&&(Mt=Mt[bt],Array.isArray(Mt)&&(Mt=Mt[0])),Mt){gt.bindFramebuffer(O.FRAMEBUFFER,Mt);try{const Tt=E.textures[ft],zt=Tt.format,$t=Tt.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ft);const Et=Lo(Tt);if(Et.__formatReadable===!1){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Et.__typeReadable===!1){te("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=E.width-B&&q>=0&&q<=E.height-k&&O.readPixels(U,q,B,k,ot.convert(zt),ot.convert($t),mt)}finally{const Tt=J!==null?Lt.get(J).__webglFramebuffer:null;gt.bindFramebuffer(O.FRAMEBUFFER,Tt)}}},this.readRenderTargetPixelsAsync=async function(E,U,q,B,k,mt,bt,ft=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Mt=Lt.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&bt!==void 0&&(Mt=Mt[bt],Array.isArray(Mt)&&(Mt=Mt[0])),Mt)if(U>=0&&U<=E.width-B&&q>=0&&q<=E.height-k){gt.bindFramebuffer(O.FRAMEBUFFER,Mt);const Tt=E.textures[ft],zt=Tt.format,$t=Tt.type;E.textures.length>1&&O.readBuffer(O.COLOR_ATTACHMENT0+ft);const Et=Lo(Tt);if(Et.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Et.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const Kt=O.createBuffer();O.bindBuffer(O.PIXEL_PACK_BUFFER,Kt),O.bufferData(O.PIXEL_PACK_BUFFER,mt.byteLength,O.STREAM_READ),O.readPixels(U,q,B,k,ot.convert(zt),ot.convert($t),0),O.bindBuffer(O.PIXEL_PACK_BUFFER,null);const pe=J!==null?Lt.get(J).__webglFramebuffer:null;gt.bindFramebuffer(O.FRAMEBUFFER,pe);const oe=O.fenceSync(O.SYNC_GPU_COMMANDS_COMPLETE,0);return O.flush(),await Uh(O,oe,4),O.bindBuffer(O.PIXEL_PACK_BUFFER,Kt),O.getBufferSubData(O.PIXEL_PACK_BUFFER,0,mt),O.bindBuffer(O.PIXEL_PACK_BUFFER,null),O.deleteBuffer(Kt),O.deleteSync(oe),mt}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,U=null,q=0){const B=Math.pow(2,-q),k=Math.floor(E.image.width*B),mt=Math.floor(E.image.height*B),bt=U!==null?U.x:0,ft=U!==null?U.y:0;Ot.setTexture2D(E,0),O.copyTexSubImage2D(O.TEXTURE_2D,q,0,0,bt,ft,k,mt),gt.unbindTexture()},this.copyTextureToTexture=function(E,U,q=null,B=null,k=0,mt=0){let bt,ft,Mt,Tt,zt,$t,Et,Kt,pe;const oe=E.isCompressedTexture?E.mipmaps[mt]:E.image;if(q!==null)bt=q.max.x-q.min.x,ft=q.max.y-q.min.y,Mt=q.isBox3?q.max.z-q.min.z:1,Tt=q.min.x,zt=q.min.y,$t=q.isBox3?q.min.z:0;else{const Qt=Math.pow(2,-k);bt=Math.floor(oe.width*Qt),ft=Math.floor(oe.height*Qt),E.isDataArrayTexture?Mt=oe.depth:E.isData3DTexture?Mt=Math.floor(oe.depth*Qt):Mt=1,Tt=0,zt=0,$t=0}B!==null?(Et=B.x,Kt=B.y,pe=B.z):(Et=0,Kt=0,pe=0);const ae=ot.convert(U.format),De=ot.convert(U.type);let wt;U.isData3DTexture?(Ot.setTexture3D(U,0),wt=O.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ot.setTexture2DArray(U,0),wt=O.TEXTURE_2D_ARRAY):(Ot.setTexture2D(U,0),wt=O.TEXTURE_2D),gt.activeTexture(O.TEXTURE0),gt.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,U.flipY),gt.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),gt.pixelStorei(O.UNPACK_ALIGNMENT,U.unpackAlignment);const Oe=gt.getParameter(O.UNPACK_ROW_LENGTH),ne=gt.getParameter(O.UNPACK_IMAGE_HEIGHT),ni=gt.getParameter(O.UNPACK_SKIP_PIXELS),Ie=gt.getParameter(O.UNPACK_SKIP_ROWS),Ms=gt.getParameter(O.UNPACK_SKIP_IMAGES);gt.pixelStorei(O.UNPACK_ROW_LENGTH,oe.width),gt.pixelStorei(O.UNPACK_IMAGE_HEIGHT,oe.height),gt.pixelStorei(O.UNPACK_SKIP_PIXELS,Tt),gt.pixelStorei(O.UNPACK_SKIP_ROWS,zt),gt.pixelStorei(O.UNPACK_SKIP_IMAGES,$t);const Hn=E.isDataArrayTexture||E.isData3DTexture,ii=U.isDataArrayTexture||U.isData3DTexture;if(E.isDepthTexture){const Qt=Lt.get(E),Ce=Lt.get(U),sn=Lt.get(Qt.__renderTarget),de=Lt.get(Ce.__renderTarget);gt.bindFramebuffer(O.READ_FRAMEBUFFER,sn.__webglFramebuffer),gt.bindFramebuffer(O.DRAW_FRAMEBUFFER,de.__webglFramebuffer);for(let we=0;we<Mt;we++)Hn&&(O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Lt.get(E).__webglTexture,k,$t+we),O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Lt.get(U).__webglTexture,mt,pe+we)),O.blitFramebuffer(Tt,zt,Tt+bt,zt+ft,Et,Kt,Et+bt,Kt+ft,O.DEPTH_BUFFER_BIT,O.NEAREST);gt.bindFramebuffer(O.READ_FRAMEBUFFER,null),gt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else if(k!==0||E.isRenderTargetTexture||Lt.has(E)){const Qt=Lt.get(E),Ce=Lt.get(U);gt.bindFramebuffer(O.READ_FRAMEBUFFER,I),gt.bindFramebuffer(O.DRAW_FRAMEBUFFER,H);for(let sn=0;sn<Mt;sn++)Hn?O.framebufferTextureLayer(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Qt.__webglTexture,k,$t+sn):O.framebufferTexture2D(O.READ_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Qt.__webglTexture,k),ii?O.framebufferTextureLayer(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,Ce.__webglTexture,mt,pe+sn):O.framebufferTexture2D(O.DRAW_FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_2D,Ce.__webglTexture,mt),k!==0?O.blitFramebuffer(Tt,zt,Tt+bt,zt+ft,Et,Kt,Et+bt,Kt+ft,O.COLOR_BUFFER_BIT,O.NEAREST):ii?O.copyTexSubImage3D(wt,mt,Et,Kt,pe+sn,Tt,zt,bt,ft):O.copyTexSubImage2D(wt,mt,Et,Kt,Tt,zt,bt,ft);gt.bindFramebuffer(O.READ_FRAMEBUFFER,null),gt.bindFramebuffer(O.DRAW_FRAMEBUFFER,null)}else ii?E.isDataTexture||E.isData3DTexture?O.texSubImage3D(wt,mt,Et,Kt,pe,bt,ft,Mt,ae,De,oe.data):U.isCompressedArrayTexture?O.compressedTexSubImage3D(wt,mt,Et,Kt,pe,bt,ft,Mt,ae,oe.data):O.texSubImage3D(wt,mt,Et,Kt,pe,bt,ft,Mt,ae,De,oe):E.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,mt,Et,Kt,bt,ft,ae,De,oe.data):E.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,mt,Et,Kt,oe.width,oe.height,ae,oe.data):O.texSubImage2D(O.TEXTURE_2D,mt,Et,Kt,bt,ft,ae,De,oe);gt.pixelStorei(O.UNPACK_ROW_LENGTH,Oe),gt.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ne),gt.pixelStorei(O.UNPACK_SKIP_PIXELS,ni),gt.pixelStorei(O.UNPACK_SKIP_ROWS,Ie),gt.pixelStorei(O.UNPACK_SKIP_IMAGES,Ms),mt===0&&U.generateMipmaps===!0&&U.mipmapsAutoUpdate===!0&&O.generateMipmap(wt),gt.unbindTexture()},this.initRenderTarget=function(E){Lt.get(E).__webglFramebuffer===void 0&&Ot.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?Ot.setTextureCube(E,0):E.isData3DTexture?Ot.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?Ot.setTexture2DArray(E,0):Ot.setTexture2D(E,0),gt.unbindTexture()},this.resetState=function(){K=0,D=0,J=null,gt.reset(),ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=Jt._getDrawingBufferColorSpace(t),e.unpackColorSpace=Jt._getUnpackColorSpace()}}const Xt=Math.PI*2,Dt=(s,t,e)=>Math.min(e,Math.max(t,s)),Mn=(s,t,e)=>s+(t-s)*e,xn=(s,t,e)=>{const n=Dt((e-s)/(t-s),0,1);return n*n*(3-2*n)},En=(s,t,e,n)=>Mn(s,t,1-Math.exp(-e*n)),Yc=(s,t,e,n)=>{let i=((t-s+Math.PI)%Xt+Xt)%Xt-Math.PI;return s+i*(1-Math.exp(-e*n))};function go(s){let t=s>>>0;return function(){t+=1831565813;let e=t;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}function Ks(s,t,e=0){const n=Math.sin(s*127.1+t*311.7+e*74.7)*43758.5453123;return n-Math.floor(n)}function $c(s,t,e=0){const n=Math.floor(s),i=Math.floor(t),r=s-n,a=t-i,o=r*r*(3-2*r),l=a*a*(3-2*a),c=Ks(n,i,e),h=Ks(n+1,i,e),f=Ks(n,i+1,e),u=Ks(n+1,i+1,e);return Mn(Mn(c,h,o),Mn(f,u,o),l)}function Bl(s,t,e=0,n=3){let i=0,r=.5,a=1;for(let o=0;o<n;o++)i+=$c(s*a,t*a,e+o*13)*r,a*=2.03,r*=.5;return i}function rs(s,t){return t[Math.floor(s()*t.length)%t.length]}function P0(s,t){const e=s>>16&255,n=s>>8&255,i=s&255;return Dt(Math.round(e+t),0,255)<<16|Dt(Math.round(n+t),0,255)<<8|Dt(Math.round(i+t),0,255)}const aa=new Map;function Er(s,t){return aa.has(s)||aa.set(s,t()),aa.get(s)}function hi(){return Er("glow",()=>{const s=document.createElement("canvas");s.width=s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,64,0,64,64,64);e.addColorStop(0,"rgba(255,255,255,1)"),e.addColorStop(.18,"rgba(255,255,255,.9)"),e.addColorStop(.45,"rgba(255,255,255,.28)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128);const n=new vr(s);return n.colorSpace=Pe,n})}function L0(){return Er("soft",()=>{const s=document.createElement("canvas");s.width=s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,64,2,64,64,64);e.addColorStop(0,"rgba(255,255,255,.9)"),e.addColorStop(.35,"rgba(255,255,255,.35)"),e.addColorStop(1,"rgba(255,255,255,0)"),t.fillStyle=e,t.fillRect(0,0,128,128);const n=new vr(s);return n.colorSpace=Pe,n})}function D0(){return Er("ground",()=>{const s=document.createElement("canvas");s.width=s.height=256;const t=s.getContext("2d");t.fillStyle="#f4f1e7",t.fillRect(0,0,256,256);for(let n=0;n<1100;n++){const i=Math.random()*256,r=Math.random()*256,a=1+Math.random()*13;t.globalAlpha=.025+Math.random()*.07,t.fillStyle=Math.random()>.45?"#3d4636":"#f4efdf",t.beginPath(),t.arc(i,r,a,0,Xt),t.fill()}for(let n=0;n<2400;n++){const i=Math.random()*256,r=Math.random()*256;t.globalAlpha=.05+Math.random()*.16,t.fillStyle=Math.random()>.5?"#29352a":"#eee6ce",t.fillRect(i,r,1,1)}t.globalAlpha=1;const e=new vr(s);return e.wrapS=e.wrapT=ar,e.repeat.set(16,16),e.colorSpace=Pe,e})}function I0(){return Er("leaf",()=>{const s=document.createElement("canvas");s.width=s.height=64;const t=s.getContext("2d");t.translate(32,32),t.fillStyle="rgba(255,255,255,.95)",t.beginPath(),t.ellipse(0,0,9,22,.4,0,Xt),t.fill(),t.strokeStyle="rgba(0,0,0,.25)",t.lineWidth=1.2,t.beginPath(),t.moveTo(-9,15),t.lineTo(9,-15),t.stroke();const e=new vr(s);return e.colorSpace=Pe,e})}const ln=[{t:0,top:330264,bottom:1188922,fog:661280,sun:9418751,sunI:.16,hemiSky:2573668,hemiGround:527625,hemiI:.42,exposure:.82,cloud:.3},{t:.19,top:1055795,bottom:3886433,fog:2503740,sun:11126527,sunI:.22,hemiSky:3562098,hemiGround:856588,hemiI:.48,exposure:.86,cloud:.36},{t:.255,top:4215158,bottom:15377016,fog:11116425,sun:16761741,sunI:1.15,hemiSky:9413810,hemiGround:2894366,hemiI:.8,exposure:.96,cloud:.52},{t:.34,top:4161456,bottom:14279887,fog:10993047,sun:16773320,sunI:2.35,hemiSky:12836321,hemiGround:4146473,hemiI:1.12,exposure:1.06,cloud:.52},{t:.5,top:3112120,bottom:14871511,fog:11584931,sun:16774877,sunI:2.6,hemiSky:13362406,hemiGround:4540973,hemiI:1.22,exposure:1.07,cloud:.46},{t:.66,top:5275550,bottom:14077868,fog:11381645,sun:16767903,sunI:1.8,hemiSky:11059133,hemiGround:3619361,hemiI:.92,exposure:1.01,cloud:.5},{t:.745,top:3754608,bottom:15570021,fog:10189416,sun:16753246,sunI:1.25,hemiSky:8091792,hemiGround:2761242,hemiI:.72,exposure:.96,cloud:.58},{t:.815,top:1121592,bottom:5197156,fog:3490635,sun:12701426,sunI:.3,hemiSky:3888750,hemiGround:1053453,hemiI:.5,exposure:.86,cloud:.38},{t:1,top:330264,bottom:1188922,fog:661280,sun:9418751,sunI:.16,hemiSky:2573668,hemiGround:527625,hemiI:.42,exposure:.82,cloud:.3}].map(s=>({...s,top:new yt(s.top),bottom:new yt(s.bottom),fog:new yt(s.fog),sun:new yt(s.sun),hemiSky:new yt(s.hemiSky),hemiGround:new yt(s.hemiGround)})),N0=`
varying vec3 vDir;
void main() {
  vDir = normalize(position);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`,U0=`
uniform vec3 uTop;
uniform vec3 uBottom;
uniform vec3 uSunColor;
uniform vec3 uSunDir;
uniform vec3 uMoonDir;
uniform float uTime;
uniform float uNight;
uniform float uCloud;
varying vec3 vDir;

float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i), b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0)), d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  for (int i = 0; i < 4; i++) { v += a * noise(p); p *= 2.03; a *= 0.5; }
  return v;
}

void main() {
  vec3 dir = normalize(vDir);
  float h = clamp(dir.y, -0.12, 1.0);
  float grad = pow(smoothstep(-0.05, 0.72, h), 0.72);
  vec3 col = mix(uBottom, uTop, grad);

  float sunDot = max(dot(dir, uSunDir), 0.0);
  float moonDot = max(dot(dir, uMoonDir), 0.0);

  // atmospheric bloom around the sun and a soft moon halo
  col += uSunColor * pow(sunDot, 9.0) * 0.16;
  col += uSunColor * pow(sunDot, 90.0) * 0.45;
  col += uSunColor * smoothstep(0.9992, 0.99975, sunDot) * 2.4;
  col += vec3(0.55, 0.68, 0.94) * pow(moonDot, 90.0) * (0.08 + uNight * 0.26);
  col += vec3(0.80, 0.88, 1.0) * smoothstep(0.99945, 0.99985, moonDot) * (0.4 + uNight * 1.5);

  // painted cloud bands
  vec2 p = dir.xz / (abs(dir.y) + 0.18);
  float n = fbm(p * 1.15 + vec2(uTime * 0.004, uTime * 0.0015));
  n += fbm(p * 2.8 - vec2(uTime * 0.002, 0.0)) * 0.35;
  float band = smoothstep(0.035, 0.33, dir.y) * (1.0 - smoothstep(0.6, 0.95, dir.y));
  float clouds = smoothstep(0.54, 0.78, n) * band * uCloud;
  vec3 cloudDark = mix(uTop, uBottom, 0.35) * (0.72 + 0.1 * uNight);
  vec3 cloudLit = mix(uBottom, uSunColor, 0.42);
  col = mix(col, mix(cloudDark, cloudLit, 0.55 + sunDot * 0.3), clouds * 0.62);

  // gentle horizon haze
  col = mix(col, uBottom * 1.06, (1.0 - smoothstep(-0.02, 0.14, dir.y)) * 0.42);

  gl_FragColor = vec4(col, 1.0);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}`;function Js(s,t,e){return s.onBeforeCompile=n=>{n.uniforms.uWindTime={value:0},n.vertexShader=`uniform float uWindTime;
${n.vertexShader}`,n.vertexShader=n.vertexShader.replace("#include <begin_vertex>",`#include <begin_vertex>
      #ifdef USE_INSTANCING
        vec3 wpos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
      #else
        vec3 wpos = vec3(0.0);
      #endif
      float wHeight = max(transformed.y, 0.0);
      float wSway = sin(uWindTime * 0.72 + wpos.x * 0.18 + wpos.z * 0.23) * ${t.toFixed(4)};
      float wGust = sin(uWindTime * 0.23 + wpos.x * 0.04) * 0.5 + 0.5;
      transformed.x += wSway * (0.5 + wGust) * ${e==="grass"?"wHeight":"1.0"};
      transformed.z += wSway * 0.55 * (0.5 + wGust) * ${e==="grass"?"wHeight":"1.0"};
    `),s.userData.wind=n.uniforms.uWindTime},s.needsUpdate=!0,s}function F0(s=7){const t=[];for(let n=0;n<s;n++){const i=n/s*Xt+Math.random()*.25,r=.028+Math.random()*.022,a=.2+Math.random()*.34,o=.1+Math.random()*.18,l=Math.cos(i)*.06,c=Math.sin(i)*.06,h=l+Math.cos(i)*o,f=c+Math.sin(i)*o,u=Math.cos(i+Math.PI/2)*r,p=Math.sin(i+Math.PI/2)*r;t.push(l-u,0,c-p,l+u,0,c+p,h,a,f)}const e=new le;return e.setAttribute("position",new Zt(t,3)),e.computeVertexNormals(),e}function O0(){const s=[];for(let n=0;n<9;n++){const i=n/9*Xt+Math.random()*.2,r=.45+Math.random()*.35,a=.09+Math.random()*.04,o=Math.cos(i+Math.PI/2)*a,l=Math.sin(i+Math.PI/2)*a;s.push(o,.05,l,-o,.05,-l,Math.cos(i)*r,.32+Math.random()*.18,Math.sin(i)*r)}const e=new le;return e.setAttribute("position",new Zt(s,3)),e.computeVertexNormals(),e}class B0{constructor(t,e,n="high"){this.level=t,this.biome=t.biome,this.renderer=e,this.quality=n,this.scene=new Qh,this.rng=go(t.seed),this.colliders=[],this.treeDots=[],this.time=t.clock,this.elapsed=0,this.timeSpeed=24e-5,this.sunDir=new P(0,1,0),this.moonDir=new P(0,-1,0),this._interval={a:ln[0],b:ln[1],f:0},this._color=new yt,this._color2=new yt,this._build()}heightAt(t,e){const n=Math.hypot(t,e),i=xn(3.5,15,n);return(Math.sin(t*.145)*Math.cos(e*.115)*.55+Math.sin(t*.33+1.7)*Math.sin(e*.27+.4)*.28+Math.sin((t+e)*.71)*.055+$c(t*.22,e*.22,this.level.seed)*.16)*i}openSpot(t,e=9,n=37,i=1.7){for(let r=0;r<60;r++){const a=t()*Xt,o=e+Math.sqrt(t())*(n-e),l=Math.cos(a)*o,c=Math.sin(a)*o;let h=!0;for(const f of this.colliders)if(Math.hypot(f.x-l,f.z-c)<f.r+i){h=!1;break}if(h)return{x:l,z:c}}return{x:Math.cos(t()*Xt)*18,z:Math.sin(t()*Xt)*18}}_build(){const{scene:t,biome:e,quality:n}=this,r=n==="low"?.72:n==="high"?1.12:1;t.fog=new co(9348733,e.fogDensity),this._buildLights(),this._buildSky(),this._buildGround(),this._buildTrees(r),this._buildUnderstory(r),this._buildMist(),this._buildParticles(r),this._applyTime(0,!0)}_buildLights(){const t=new Lu(12178390,3883046,1.05);this.hemi=t,this.scene.add(t);const e=new Ja(16773584,2.2);e.position.set(38,60,16),e.castShadow=this.quality!=="low"&&this.renderer?.shadowMap?.enabled!==!1;const n=this.quality==="high"?1536:1024;e.shadow.mapSize.set(n,n),e.shadow.camera.left=-38,e.shadow.camera.right=38,e.shadow.camera.top=38,e.shadow.camera.bottom=-38,e.shadow.camera.near=1,e.shadow.camera.far=140,e.shadow.bias=-8e-4,e.shadow.normalBias=.045,this.scene.add(e),this.scene.add(e.target),this.sunLight=e;const i=new Ja(9091529,.3);i.position.set(-20,14,-30),this.scene.add(i),this.fillLight=i}_buildSky(){const t={uTop:{value:ln[4].top.clone()},uBottom:{value:ln[4].bottom.clone()},uSunColor:{value:ln[4].sun.clone()},uSunDir:{value:new P(.6,.7,.2)},uMoonDir:{value:new P(-.6,-.7,.2)},uTime:{value:0},uNight:{value:0},uCloud:{value:.5}};this.skyUniforms=t;const e=new Nt(new di(330,40,24),new ti({uniforms:t,vertexShader:N0,fragmentShader:U0,side:He,depthWrite:!1,fog:!1}));e.frustumCulled=!1,this.sky=e,this.scene.add(e);const n=this.quality==="high"?700:380,i=new Float32Array(n*3),r=new Float32Array(n);for(let h=0;h<n;h++){const f=Math.random()*Xt,u=Math.pow(Math.random(),.65)*.95+.04,p=Math.sqrt(1-u*u);i[h*3]=Math.cos(f)*p*300,i[h*3+1]=u*300,i[h*3+2]=Math.sin(f)*p*300,r[h]=.7+Math.random()*1.8}const a=new le;a.setAttribute("position",new Ae(i,3));const o=new ui({size:1.35,map:hi(),color:13622773,transparent:!0,opacity:0,depthWrite:!1,blending:en,sizeAttenuation:!0,fog:!1});this.stars=new Oi(a,o),this.stars.frustumCulled=!1,this.scene.add(this.stars);const l=new $a({map:hi(),color:16769184,transparent:!0,opacity:.85,depthWrite:!1,blending:en,fog:!1});this.sunSprite=new Qo(l),this.sunSprite.scale.setScalar(36),this.scene.add(this.sunSprite);const c=new $a({map:hi(),color:13951743,transparent:!0,opacity:0,depthWrite:!1,blending:en,fog:!1});this.moonSprite=new Qo(c),this.moonSprite.scale.setScalar(19),this.scene.add(this.moonSprite)}_buildGround(){const e=this.quality==="low"?64:104,n=new jn(112,112,e,e);n.rotateX(-Math.PI/2);const i=n.attributes.position,r=new Float32Array(i.count*3),a=this.biome,o=new yt(a.moss),l=new yt(a.dirt),c=new yt(a.ground[0]),h=new yt(a.ground[1]),f=new yt(a.ground[2]),u=new yt;for(let w=0;w<i.count;w++){const _=i.getX(w),v=i.getZ(w),C=this.heightAt(_,v);i.setY(w,C);const R=Math.hypot(_,v),N=Bl(_*.12,v*.12,this.level.seed,3),F=Bl(_*.46+20,v*.46-7,this.level.seed+3,2);u.copy(c).lerp(h,xn(.3,.72,N)).lerp(f,xn(.55,.9,F)*.6),F>.7&&u.lerp(o,(F-.7)*2.1);const G=Math.sin(v*.13)*4.2+Math.sin(v*.043+1.3)*2.2,I=(R<6.6?xn(6.6,3.6,R):0)+(Math.abs(_-G)<1.35&&Math.abs(v)<35?xn(1.35,.55,Math.abs(_-G))*.8:0);I>0&&u.lerp(l,Dt(I*.72,0,.75)),u.offsetHSL(0,0,(F-.5)*.06),r[w*3]=u.r,r[w*3+1]=u.g,r[w*3+2]=u.b}n.setAttribute("color",new Ae(r,3)),n.computeVertexNormals();const p=new ie({vertexColors:!0,map:D0(),roughness:.97,metalness:0,dithering:!0}),g=new Nt(n,p);g.receiveShadow=!0,this.ground=g,this.scene.add(g);const y=new ie({color:P0(this.biome.dirt,24),roughness:.92,flatShading:!0}),d=new cn(.5,.62,.07,7),m=new tn(d,y,26),x=new ee,T=new Bn,S=new P,b=new P;for(let w=0;w<26;w++){const _=this.rng()*Xt,v=2.5+this.rng()*7.5;b.set(Math.cos(_)*v,this.heightAt(Math.cos(_)*v,Math.sin(_)*v)+.02,Math.sin(_)*v),T.setFromEuler(new fn(0,this.rng()*Xt,0)),S.set(.4+this.rng()*.7,.5+this.rng()*.8,.4+this.rng()*.7),x.compose(b,T,S),m.setMatrixAt(w,x)}m.receiveShadow=!0,m.castShadow=!0,this.scene.add(m)}_buildTrees(t){const e=this.rng,n=this.biome,i=Math.round((this.quality==="low"?76:118)*t),r=[],a=[],o=[],l=[],c=[],h=n.treeMix,f=Object.values(h).reduce((D,J)=>D+J,0);for(let D=0;D<i;D++){let J;const X=e()*f;X<h.broad?J="broad":X<h.broad+h.pine?J="pine":X<h.broad+h.pine+h.birch?J="birch":J="dead";let V=0,Z=0,lt=!1;for(let At=0;At<30;At++){const Ft=e()*Xt,kt=10+Math.pow(e(),.72)*42;V=Math.cos(Ft)*kt,Z=Math.sin(Ft)*kt,lt=!0;for(const Ht of this.colliders)if(Math.hypot(Ht.x-V,Ht.z-Z)<Ht.r+2.2){lt=!1;break}if(lt)break}if(!lt)continue;const _t=.82+Math.pow(e(),1.35)*1.05,W=(J==="pine"?6.8:5.9)*_t,it=(e()-.5)*.075,Y=this.heightAt(V,Z),rt=e()*Xt,nt=(J==="birch"?.75:1)*(.75+e()*.45),Ct=new yt(rs(e,n.bark)).offsetHSL(0,0,(e()-.5)*.06),qt={x:V,z:Z,y:Y,height:W,tilt:it,rot:rt,scale:_t,type:J,thick:nt,color:Ct};if(J==="birch"?r.push({...qt,birch:!0}):J==="dead"?l.push(qt):r.push(qt),J==="broad"){const At=2+(e()>.45?1:0);for(let Ft=0;Ft<At;Ft++){const kt=(1.3+e()*.9)*_t;a.push({x:V+(e()-.5)*_t*1.8,y:Y+W*(.67+e()*.3),z:Z+(e()-.5)*_t*1.8,sx:kt*(.95+e()*.5),sy:kt*(.7+e()*.4),sz:kt*(.95+e()*.5),ry:e()*Xt,color:new yt(rs(e,n.foliage)).offsetHSL((e()-.5)*.015,0,(e()-.5)*.09)})}}else if(J==="pine")for(let Ft=0;Ft<3;Ft++){const kt=(2.05-Ft*.38)*_t;o.push({x:V,z:Z,y:Y+W*(.43+Ft*.22),sx:kt,sy:(1.8-Ft*.12)*_t,sz:kt,ry:rt,color:new yt(rs(e,n.foliage)).offsetHSL(0,0,(e()-.5)*.08)})}this.colliders.push({x:V,z:Z,r:J==="birch"?.34*nt:.42*nt}),e()>.42&&c.push({x:V,z:Z,r:J==="pine"?1.5:1.1})}const u=new cn(.18,.33,1,6,1);u.translate(0,.5,0);const p=new ie({roughness:.94,flatShading:!0,vertexColors:!1}),g=r.filter(D=>!D.birch).concat(l),y=r.filter(D=>D.birch),d=new tn(u,p,g.length),m=new tn(u,p.clone(),y.length),x=new ee,T=new Bn,S=new P,b=new P,w=new fn;g.forEach((D,J)=>{b.set(D.x,D.y-.15,D.z),T.setFromEuler(w.set(D.tilt,D.rot,D.tilt*.7)),S.set(D.thick,D.height,D.thick),x.compose(b,T,S),d.setMatrixAt(J,x),d.setColorAt(J,D.color)}),y.forEach((D,J)=>{b.set(D.x,D.y-.15,D.z),T.setFromEuler(w.set(D.tilt,D.rot,D.tilt*.7)),S.set(D.thick,D.height,D.thick),x.compose(b,T,S),m.setMatrixAt(J,x),m.setColorAt(J,D.color)}),d.castShadow=!0,d.receiveShadow=!0,m.castShadow=!0,m.receiveShadow=!0,d.instanceColor&&(d.instanceColor.needsUpdate=!0),m.instanceColor&&(m.instanceColor.needsUpdate=!0),this.scene.add(d,m);const _=new fo(1,1),v=Js(new ie({roughness:.89,flatShading:!0,dithering:!0}),.055,"canopy"),C=new tn(_,v,a.length);a.forEach((D,J)=>{b.set(D.x,D.y,D.z),T.setFromEuler(w.set(0,D.ry,0)),S.set(D.sx,D.sy,D.sz),x.compose(b,T,S),C.setMatrixAt(J,x),C.setColorAt(J,D.color)}),C.castShadow=!0,C.receiveShadow=!0,C.instanceColor.needsUpdate=!0,this.scene.add(C),this._canopyMat=v;const R=new bn(1,1,7,1);R.translate(0,.5,0);const N=Js(new ie({roughness:.91,flatShading:!0,dithering:!0}),.045,"pine"),F=new tn(R,N,o.length);o.forEach((D,J)=>{b.set(D.x,D.y-D.sy*.5,D.z),T.setFromEuler(w.set(0,D.ry,0)),S.set(D.sx,D.sy,D.sz),x.compose(b,T,S),F.setMatrixAt(J,x),F.setColorAt(J,D.color)}),F.castShadow=!0,F.receiveShadow=!0,F.instanceColor.needsUpdate=!0,this.scene.add(F),this._pineMat=N;const G=new ie({color:4932152,roughness:.97,flatShading:!0}),I=new cn(.05,.11,1,5);I.translate(0,.5,0);const H=new tn(I,G,l.length*3);let K=0;for(const D of l)for(let J=0;J<3;J++){const X=D.rot+J*2.1;b.set(D.x,D.y+D.height*(.45+J*.16),D.z),T.setFromEuler(w.set(.9+e()*.5,X,.2)),S.set(1,1.4+e()*1.5,1),x.compose(b,T,S),H.setMatrixAt(K++,x)}H.castShadow=!0,this.scene.add(H),this.treeDots=c}_buildUnderstory(t){const e=this.rng,n=this.quality==="low",i=Math.round((n?1750:3100)*t),r=Js(new ie({color:16777215,roughness:.96,side:ke,vertexColors:!1,dithering:!0}),.16,"grass"),a=F0(7),o=new tn(a,r,i),l=new ee,c=new Bn,h=new P,f=new P,u=new fn,p=new yt;for(let V=0;V<i;V++){const Z=e()*Xt,_t=e()<.3?1.2+Math.sqrt(e())*10.5:1.5+Math.sqrt(e())*43,W=Math.cos(Z)*_t,it=Math.sin(Z)*_t,Y=this.heightAt(W,it);f.set(W,Y-.03,it),c.setFromEuler(u.set(0,e()*Xt,0));const rt=.75+e()*.7;h.set(rt,rt*(.7+e()*.55),rt),l.compose(f,c,h),o.setMatrixAt(V,l),p.setHex(this.biome.grass).offsetHSL((e()-.5)*.02,(e()-.5)*.07,(e()-.5)*.12),o.setColorAt(V,p)}o.receiveShadow=!0,o.instanceColor.needsUpdate=!0,o.frustumCulled=!1,this.scene.add(o),this._grassMat=r;const g=Math.round((n?170:300)*t),y=Js(new ie({color:16777215,roughness:.94,side:ke,dithering:!0}),.08,"fern"),d=new tn(O0(),y,g);for(let V=0;V<g;V++){const Z=e()*Xt,lt=7+Math.sqrt(e())*35,_t=Math.cos(Z)*lt,W=Math.sin(Z)*lt,it=this.heightAt(_t,W);f.set(_t,it,W),c.setFromEuler(u.set(0,e()*Xt,0));const Y=.65+e()*.8;h.set(Y,Y*(.8+e()*.5),Y),l.compose(f,c,h),d.setMatrixAt(V,l),p.setHex(this.biome.moss).offsetHSL(0,0,(e()-.5)*.1),d.setColorAt(V,p)}d.instanceColor.needsUpdate=!0,d.castShadow=!1,d.receiveShadow=!0,this.scene.add(d);const m=Math.round((n?80:220)*t),x=new di(.055,5,4),T=new ie({roughness:.65,emissive:this.biome.accent,emissiveIntensity:.08}),S=new tn(x,T,m),b=new yt;for(let V=0;V<m;V++){const Z=e()*Xt,lt=3+Math.sqrt(e())*39,_t=Math.cos(Z)*lt,W=Math.sin(Z)*lt,it=this.heightAt(_t,W)+.24+e()*.3;f.set(_t,it,W),c.identity(),h.setScalar(.7+e()*1.6),l.compose(f,c,h),S.setMatrixAt(V,l),b.setHex(rs(e,this.biome.flowers)),S.setColorAt(V,b)}S.instanceColor.needsUpdate=!0,this.scene.add(S);const w=Math.round(50*this.biome.mushrooms*t),_=new ie({color:14208688,roughness:.9}),v=new ie({color:10243900,roughness:.7,emissive:6040352,emissiveIntensity:.15}),C=new tn(new cn(.03,.045,.18,5),_,w),R=new tn(new di(.1,6,4),v,w);for(let V=0;V<w;V++){const Z=rs(e,this.colliders),lt=e()*Xt,_t=.6+e()*1.8,W=(Z?Z.x:0)+Math.cos(lt)*_t,it=(Z?Z.z:0)+Math.sin(lt)*_t,Y=this.heightAt(W,it);f.set(W,Y+.09,it),c.identity(),h.setScalar(.7+e()*.9),l.compose(f,c,h),C.setMatrixAt(V,l),f.set(W,Y+.2,it),h.set(1,.62,1).multiplyScalar(.7+e()*1.1),l.compose(f,c,h),R.setMatrixAt(V,l),b.setHex(e()>.55?11880508:13611898),R.setColorAt(V,b)}R.instanceColor.needsUpdate=!0,this.scene.add(C,R),this.mushroomCaps=v;const N=Math.round(72*t),F=new ie({color:7106658,roughness:.95,flatShading:!0}),G=new tn(new pr(1,0),F,N),I=new yt;for(let V=0;V<N;V++){const Z=e()*Xt,lt=7+Math.sqrt(e())*36,_t=Math.cos(Z)*lt,W=Math.sin(Z)*lt,it=.28+Math.pow(e(),1.8)*1.5;f.set(_t,this.heightAt(_t,W)+it*.17,W),c.setFromEuler(u.set(e(),e()*Xt,e())),h.set(it*(.8+e()*.7),it*(.45+e()*.4),it*(.8+e()*.6)),l.compose(f,c,h),G.setMatrixAt(V,l),I.setHex(7106658).offsetHSL((e()-.5)*.03,0,(e()-.5)*.14),G.setColorAt(V,I),it>.75&&this.colliders.push({x:_t,z:W,r:it*.75})}G.castShadow=!0,G.receiveShadow=!0,G.instanceColor.needsUpdate=!0,this.scene.add(G);const H=new ie({color:4798250,roughness:.96,flatShading:!0}),K=new cn(.22,.28,1,7);for(let V=0;V<10;V++){const Z=e()*Xt,lt=9+e()*30,_t=Math.cos(Z)*lt,W=Math.sin(Z)*lt,it=2.2+e()*3.4,Y=new Nt(K,H);Y.scale.set(1,it,1),Y.rotation.set(Math.PI/2,0,e()*Xt),Y.position.set(_t,this.heightAt(_t,W)+.24,W),Y.castShadow=!0,Y.receiveShadow=!0,this.scene.add(Y),this.colliders.push({x:_t,z:W,r:.5})}const D=new Nt(new pr(1.5,0),F);D.position.set(6.2,this.heightAt(6.2,5.2)+.6,5.2),D.scale.set(1.3,.9,1.1),D.rotation.set(.4,.9,.1),D.castShadow=!0,D.receiveShadow=!0,this.scene.add(D),this.colliders.push({x:6.2,z:5.2,r:1.7});const J=new ie({color:5980974,roughness:.95,flatShading:!0}),X=new Nt(new cn(.75,.95,.8,7),J);X.position.set(-5.8,this.heightAt(-5.8,6.8)+.3,6.8),X.castShadow=!0,X.receiveShadow=!0,this.scene.add(X),this.colliders.push({x:-5.8,z:6.8,r:1})}_buildMist(){const t=this.quality==="low"?4:8;this.mist=[];const e=new jn(1,1);for(let n=0;n<t;n++){const i=new yn({map:L0(),color:this.biome.fog,transparent:!0,opacity:.06,depthWrite:!1,blending:en,fog:!1}),r=new Nt(e,i);r.rotation.x=-Math.PI/2,r.rotation.z=this.rng()*Xt;const a=5+this.rng()*30,o=this.rng()*Xt;r.position.set(Math.cos(o)*a,.4+this.rng()*1.5,Math.sin(o)*a);const l=14+this.rng()*24;r.scale.set(l,l,1),r.renderOrder=3,this.scene.add(r),this.mist.push({mesh:r,base:r.position.clone(),phase:this.rng()*Xt,speed:.05+this.rng()*.08})}}_buildParticles(t){const e=this.rng,n=Math.round((this.quality==="low"?80:180)*t),i=new Float32Array(n*3),r=[];for(let p=0;p<n;p++){const g=e()*Xt,y=3+Math.sqrt(e())*34,d=Math.cos(g)*y,m=Math.sin(g)*y,x=this.heightAt(d,m)+.55+e()*2.8;i[p*3]=d,i[p*3+1]=x,i[p*3+2]=m,r.push({x:d,y:x,z:m,p:e()*Xt,s:.35+e()*.8})}const a=new le;a.setAttribute("position",new Ae(i,3));const o=new ui({size:.3,map:hi(),color:this.biome.accent,transparent:!0,opacity:0,depthWrite:!1,blending:en,sizeAttenuation:!0});this.fireflies=new Oi(a,o),this.fireflies.frustumCulled=!1,this.firefliesBase=r,this.scene.add(this.fireflies);const l=this.quality==="low"?70:150,c=new Float32Array(l*3),h=[];for(let p=0;p<l;p++){const g=e()*Xt,y=2+Math.sqrt(e())*28,d=Math.cos(g)*y,m=Math.sin(g)*y,x=this.heightAt(d,m)+.4+e()*5;c[p*3]=d,c[p*3+1]=x,c[p*3+2]=m,h.push({x:d,y:x,z:m,p:e()*Xt,s:.2+e()*.5})}const f=new le;f.setAttribute("position",new Ae(c,3));const u=new ui({size:.13,map:hi(),color:16769186,transparent:!0,opacity:.4,depthWrite:!1,blending:en,sizeAttenuation:!0});if(this.pollen=new Oi(f,u),this.pollen.frustumCulled=!1,this.pollenBase=h,this.scene.add(this.pollen),this.biome.snow){const p=this.quality==="low"?260:480,g=new Float32Array(p*3),y=[];for(let T=0;T<p;T++){const S=(e()-.5)*70,b=(e()-.5)*70,w=this.heightAt(S,b)+e()*12;g[T*3]=S,g[T*3+1]=w,g[T*3+2]=b,y.push({x:S,z:b,y0:this.heightAt(S,b),speed:.5+e()*.7,p:e()*Xt})}const d=new le;d.setAttribute("position",new Ae(g,3));const m=new ui({size:.16,map:hi(),color:15792122,transparent:!0,opacity:.8,depthWrite:!1,sizeAttenuation:!0}),x=new Oi(d,m);x.frustumCulled=!1,this.snow=x,this.snowBase=y,this.scene.add(x)}if(this.biome.key==="birchfall"||this.biome.key==="redgrove"||this.biome.key==="ashen"){const g=new Float32Array(240),y=[];for(let T=0;T<80;T++){const S=(e()-.5)*48,b=(e()-.5)*48,w=this.heightAt(S,b)+1+e()*9;g[T*3]=S,g[T*3+1]=w,g[T*3+2]=b,y.push({x:S,z:b,y0:this.heightAt(S,b),speed:.25+e()*.5,p:e()*Xt})}const d=new le;d.setAttribute("position",new Ae(g,3));const m=new ui({size:.28,map:I0(),color:this.biome.accent,transparent:!0,opacity:.75,depthWrite:!1,alphaTest:.1,sizeAttenuation:!0}),x=new Oi(d,m);x.frustumCulled=!1,this.leaves=x,this.leavesBase=y,this.scene.add(x)}}_samplePalette(t){let e=0;for(e=0;e<ln.length-1&&!(t>=ln[e].t&&t<=ln[e+1].t);e++);const n=ln[e],i=ln[Math.min(e+1,ln.length-1)],r=xn(0,1,(t-n.t)/Math.max(1e-4,i.t-n.t));return this._interval={a:n,b:i,f:r},this._interval}_applyTime(t,e=!1){const{a:n,b:i,f:r}=this._samplePalette(this.time),a=this.biome,o=this.skyUniforms;o.uTop.value.copy(n.top).lerp(i.top,r),o.uBottom.value.copy(n.bottom).lerp(i.bottom,r),o.uSunColor.value.copy(n.sun).lerp(i.sun,r),o.uCloud.value=Mn(n.cloud,i.cloud,r),this._color.copy(n.fog).lerp(i.fog,r).lerp(new yt(a.fog),.3);const l=xn(.78,.93,this.time)+(this.time<.14?1:0);o.uNight.value=Dt(l,0,1);const c=(this.time-.25)*Xt;this.sunDir.set(Math.cos(c),Math.sin(c),.28).normalize(),this.moonDir.copy(this.sunDir).multiplyScalar(-1),o.uSunDir.value.copy(this.sunDir),o.uMoonDir.value.copy(this.moonDir),o.uTime.value=this.elapsed,this.sunLight.position.copy(this.sunDir).multiplyScalar(70).add(new P(0,0,0)),this.sunLight.position.y=Math.max(this.sunLight.position.y,-20),this.sunLight.color.copy(o.uSunColor.value),this.sunLight.intensity=Mn(n.sunI,i.sunI,r)*(this.quality==="low"?.9:1),this.hemi.color.copy(n.hemiSky).lerp(i.hemiSky,r),this.hemi.groundColor.copy(n.hemiGround).lerp(i.hemiGround,r),this.hemi.intensity=Mn(n.hemiI,i.hemiI,r),this.fillLight.intensity=Dt(Mn(n.hemiI,i.hemiI,r)*.13,.05,.2),this.scene.fog.color.copy(this._color),this.scene.fog.density=a.fogDensity*Mn(1.18,.82,xn(.18,.55,this.time))*(this.time>.78||this.time<.14?1.22:1),this.renderer&&(this.renderer.toneMappingExposure=Mn(n.exposure,i.exposure,r)*(a.key==="moonfen"?.94:1)),this.stars.material.opacity=Dt(l*.85,0,.85),this.sunSprite.position.copy(this.sunDir).multiplyScalar(250),this.sunSprite.material.opacity=this.sunDir.y>0?.55:0,this.sunSprite.visible=this.sunDir.y>-.04,this.moonSprite.position.copy(this.moonDir).multiplyScalar(250),this.moonSprite.material.opacity=this.moonDir.y>0?.34+l*.5:0,this.moonSprite.visible=this.moonDir.y>-.04,this.sunSprite.material.color&&this.sunSprite.material.color.copy(o.uSunColor.value).lerp(new yt(16777215),.35),this.fireflies&&(this.fireflies.material.opacity=Dt((l*.85+.06)*Math.min(1,a.fireflies),0,.95)),this.pollen&&(this.pollen.material.opacity=Dt((1-l)*.55,0,.55)),this.snow&&(this.snow.material.opacity=.55+(1-l)*.25),this.mushroomCaps.emissiveIntensity=.1+l*.55,this.mushroomCaps.emissive.copy(o.uSunColor.value).lerp(new yt(a.accent),.7);for(const h of this.mist)h.mesh.material.color.copy(this._color).lerp(new yt(16777215),.15),h.mesh.material.opacity=(l*.045+.035)*(a.fogDensity/.02);this._windTime=this.elapsed,this._canopyMat?.userData.wind&&(this._canopyMat.userData.wind.value=this.elapsed),this._pineMat?.userData.wind&&(this._pineMat.userData.wind.value=this.elapsed),this._grassMat?.userData.wind&&(this._grassMat.userData.wind.value=this.elapsed),e&&this._applyTime(0,!1)}update(t){this.elapsed+=t,this.time=(this.time+t*this.timeSpeed)%1,this._applyTime(t);const e=this.elapsed;if(this.fireflies){const n=this.fireflies.geometry.attributes.position;for(let i=0;i<this.firefliesBase.length;i++){const r=this.firefliesBase[i];n.setXYZ(i,r.x+Math.sin(e*.33*r.s+r.p)*.75,r.y+Math.sin(e*.7*r.s+r.p*1.7)*.32,r.z+Math.cos(e*.27*r.s+r.p)*.75)}n.needsUpdate=!0}if(this.pollen){const n=this.pollen.geometry.attributes.position;for(let i=0;i<this.pollenBase.length;i++){const r=this.pollenBase[i];n.setXYZ(i,r.x+Math.sin(e*.16+r.p)*1.2,r.y+Math.sin(e*.25+r.p)*.4,r.z+Math.cos(e*.12+r.p)*1.2)}n.needsUpdate=!0}if(this.snow){const n=this.snow.geometry.attributes.position;for(let i=0;i<this.snowBase.length;i++){const r=this.snowBase[i],a=r.y0+(this.elapsed*r.speed+r.p*3)%12;n.setXYZ(i,r.x+Math.sin(e*.4+r.p)*.7,a,r.z+Math.cos(e*.35+r.p)*.7)}n.needsUpdate=!0}if(this.leaves){const n=this.leaves.geometry.attributes.position;for(let i=0;i<this.leavesBase.length;i++){const r=this.leavesBase[i],a=(this.elapsed*r.speed+r.p*2)%10;n.setXYZ(i,r.x+Math.sin(e*.5+r.p)*1.4,r.y0+9-a,r.z+Math.cos(e*.4+r.p)*1.4)}n.needsUpdate=!0}for(const n of this.mist)n.mesh.position.x=n.base.x+Math.sin(e*.03+n.phase)*2.4,n.mesh.position.z=n.base.z+Math.cos(e*.024+n.phase)*2.4,n.mesh.rotation.z+=t*.004*n.speed}dispose(){const t=new Set;this.scene.traverse(e=>{e.geometry&&!t.has(e.geometry)&&(t.add(e.geometry),e.geometry.dispose());const n=Array.isArray(e.material)?e.material:e.material?[e.material]:[];for(const i of n)t.has(i)||(t.add(i),i.dispose())}),this.scene.clear()}}function z0(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},a={},o=s[0].morphTargetsRelative,l=new le;l.morphTargetsRelative=o;let c=0;for(let h=0;h<s.length;++h){const f=s[h];let u=0,p=0;if(e!==(f.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const g in f.attributes){if(!n.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+g+'" attribute exists among all geometries, or in none of them.'),null;r[g]===void 0&&(r[g]=[]),r[g].push(f.attributes[g]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==f.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const g in f.morphAttributes){if(!i.has(g))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;if(f.morphAttributes[g].length!==s[0].morphAttributes[g].length)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have the same number of morph targets for the "'+g+'" morph attribute.'),null;a[g]===void 0&&(a[g]=[]),a[g].push(f.morphAttributes[g]),p++}if(p!==i.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of morph attributes."),null;if(t){let g;if(e)g=f.index.count;else if(f.attributes.position!==void 0)g=f.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,g,h),c+=g}}if(e){let h=0;const f=[];for(let u=0;u<s.length;++u){const p=s[u].index;for(let g=0;g<p.count;++g)f.push(p.getX(g)+h);h+=s[u].attributes.position.count}l.setIndex(f)}for(const h in r){const f=zl(r[h]);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,f)}for(const h in a){const f=a[h][0].length;if(f!==0){l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<f;++u){const p=[];for(let y=0;y<a[h].length;++y)p.push(a[h][y][u]);const g=zl(p);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(g)}}}return l}function zl(s){let t,e,n,i=-1,r=0;for(let c=0;c<s.length;++c){const h=s[c];if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.count*e}const a=new t(r),o=new Ae(a,e,n);let l=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute){const f=l/e;for(let u=0,p=h.count;u<p;u++)for(let g=0;g<e;g++){const y=h.getComponent(u,g);o.setComponent(u+f,g,y)}}else a.set(h.array,l);l+=h.count*e}return i!==void 0&&(o.gpuType=i),o}const Zs=new yt;function _e(s,t,e=null){if(!s)return null;const n=s.children.filter(o=>o.isMesh&&!o.isInstancedMesh&&(!e||e(o)));if(!n.length)return null;const i=[];for(const o of n){o.updateMatrix();let l=o.geometry;l.index?l=l.toNonIndexed():l=l.clone(),l.applyMatrix4(o.matrix),l.deleteAttribute("uv"),l.deleteAttribute("uv1"),l.deleteAttribute("uv2"),l.deleteAttribute("tangent");const c=l.attributes.position.count,h=new Float32Array(c*3);if(o.material?.vertexColors&&l.attributes.color)h.set(l.attributes.color.array.subarray(0,c*3));else{Zs.copy(o.material?.color||new yt(16777215));for(let f=0;f<c;f++)h[f*3]=Zs.r,h[f*3+1]=Zs.g,h[f*3+2]=Zs.b}l.setAttribute("color",new Ae(h,3)),i.push(l)}const r=z0(i,!1);for(const o of i)o.dispose();if(!r)return null;r.computeBoundingSphere(),r.computeBoundingBox();for(const o of n)s.remove(o);const a=new Nt(r,t);return a.castShadow=!0,a.receiveShadow=!0,s.add(a),a}function Kc(s=.9,t=.02,e=null,n=.55){const i=new ie({vertexColors:!0,roughness:s,metalness:t,dithering:!0});if(e!==null){const r=new yt(e);i.onBeforeCompile=a=>{a.fragmentShader=a.fragmentShader.replace("#include <opaque_fragment>",`#include <opaque_fragment>
        float rim = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.8);
        gl_FragColor.rgb += vec3(${r.r.toFixed(4)}, ${r.g.toFixed(4)}, ${r.b.toFixed(4)}) * rim * ${n.toFixed(3)};`)},i.customProgramCacheKey=()=>`pup-rim-${e}-${n}`}return i}const It={fur:new ie({color:2303791,roughness:.84,metalness:.03}),fur2:new ie({color:2961980,roughness:.82,metalness:.03}),furDark:new ie({color:1316636,roughness:.88}),teal:new ie({color:1811642,roughness:.52,metalness:.08,emissive:670532,emissiveIntensity:.55}),tealLight:new ie({color:3983318,roughness:.5,emissive:869968,emissiveIntensity:.6}),cream:new ie({color:15001570,roughness:.76}),leather:new ie({color:1184793,roughness:.4,metalness:.16}),silver:new ie({color:13226970,roughness:.22,metalness:.94}),nose:new ie({color:724241,roughness:.26,metalness:.12}),amber:new ie({color:16760674,roughness:.26,emissive:16747044,emissiveIntensity:1.05}),black:new ie({color:526603,roughness:.36}),tongue:new ie({color:13793412,roughness:.66}),curl:new ie({color:8014382,roughness:.92}),curl2:new ie({color:9658428,roughness:.92})};function li(s,t,e,n=8){const i=new Nt(new Mr(s,t,4,n),e);return i.castShadow=!0,i.receiveShadow=!0,i}function ge(s,t,e=1,n=1,i=1,r=12){const a=new Nt(new di(s,r,Math.max(6,r-2)),t);return a.scale.set(e,n,i),a.castShadow=!0,a.receiveShadow=!0,a}function Gl(s,t,e){const n=new Pc(s.map(a=>new P(...a))),i=new po(n,18,t,5,!1),r=new Nt(i,e);return r.castShadow=!0,r}class G0{constructor(){this.root=new jt,this.rig=new jt,this.root.add(this.rig),this.phase=0,this.biteT=0,this.pawT=0,this.eatT=0,this.hurtT=0,this.dead=!1,this.earTwitch=0,this._build()}_build(){const t=this.rig;this.matte=Kc(.82,.04,9429487,.62);const e=new jt;e.position.y=.88,t.add(e),this.body=e;const n=new jt;e.add(n);const i=li(.33,.66,It.fur,14);i.rotation.x=Math.PI/2,i.scale.set(1.05,1,.95),e.add(i),this.torso=i;const r=ge(.35,It.fur2,1.02,.98,1.08);r.position.set(0,.045,.32),e.add(r);const a=ge(.33,It.fur2,1,.98,1);a.position.set(0,.02,-.42),e.add(a);for(let Y=0;Y<7;Y++){const rt=Y/7*Math.PI*2,nt=ge(.1,Y%2?It.fur2:It.fur,.7,1.25,.7,6);nt.position.set(Math.cos(rt)*.28,.16+Math.sin(rt)*.11,.36+Math.sin(rt)*.04),nt.rotation.z=rt,e.add(nt)}const o=new jt;o.position.set(0,.16,.46),e.add(o),this.neck=o;const l=li(.23,.16,It.fur,10);l.rotation.x=.35,l.position.set(0,.09,.06),o.add(l);const c=new jt;o.add(c);const h=new jt;h.position.set(0,.25,.17),h.rotation.x=.06,o.add(h),this.head=h;const f=ge(.34,It.fur,1,1.03,1.06,16);h.add(f);const u=ge(.25,It.fur2,1,.9,1,12);u.position.set(0,.1,-.06),h.add(u);const p=ge(.3,It.fur,.95,.55,.7,12);p.position.set(0,.14,.16),h.add(p);const g=li(.145,.2,It.teal,12);g.rotation.x=Math.PI/2,g.position.set(0,-.055,.26),g.scale.set(1.08,1,1),h.add(g),this.muzzle=g;const y=ge(.14,It.teal,1.05,.9,.8,10);y.position.set(-.145,-.09,.21),y.rotation.z=.22,h.add(y);const d=y.clone();d.position.x=.145,d.rotation.z=-.22,h.add(d);const m=ge(.105,It.nose,1.2,.55,1.5,10);m.position.set(0,.035,.4),m.rotation.x=.12,h.add(m);const x=ge(.105,It.nose,1.18,.82,.9,12);x.position.set(0,.015,.475),h.add(x);const T=ge(.018,It.black,1,.6,.6,6);T.position.set(-.045,.02,.545),h.add(T);const S=T.clone();S.position.x=.045,h.add(S);const b=new jt;b.position.set(0,-.135,.15),h.add(b),this.jaw=b;const w=li(.115,.14,It.teal,10);w.rotation.x=Math.PI/2,w.position.set(0,-.02,.18),w.scale.set(1.05,.72,1),b.add(w);const _=ge(.11,It.teal,1.05,.62,.9,10);_.position.set(0,-.01,.35),b.add(_);const v=ge(.055,It.tongue,1.2,.4,1.5,8);v.position.set(0,.035,.29),b.add(v),this.tongue=v;const C=new Nt(new qi(.15,.02,.04),It.cream);C.position.set(0,.02,.34),b.add(C);const R=ge(.11,It.cream,1.5,.42,.5,10);R.position.set(-.145,.175,.275),R.rotation.set(-.2,.1,.18),h.add(R);const N=R.clone();N.position.x=.145,N.rotation.z=-.18,h.add(N);const F=new jt;h.add(F);for(const Y of[-1,1]){const rt=ge(.088,It.furDark,1,1,.7,10);rt.position.set(Y*.145,.078,.29),h.add(rt);const nt=ge(.045,It.amber,1,1,.6,10);nt.position.set(Y*.145,.082,.348),F.add(nt);const Ct=ge(.018,It.black,1,1.15,.5,6);Ct.position.set(Y*.145,.082,.377),h.add(Ct);const qt=ge(.009,It.cream,1,1,.5,5);qt.position.set(Y*.14-.01,.095,.386),h.add(qt)}this.ears=[];for(const Y of[-1,1]){const rt=new jt;rt.position.set(Y*.19,.31,-.04),rt.rotation.set(-.12,Y*.09,Y*.16),h.add(rt);const nt=new Nt(new bn(.155,.62,5),It.fur);nt.position.y=.31,nt.scale.set(1,1,.52),nt.castShadow=!0,rt.add(nt);const Ct=new Nt(new bn(.082,.44,4),It.teal);Ct.position.set(0,.26,.046),Ct.scale.set(1,1,.24),rt.add(Ct);const qt=new Nt(new bn(.055,.16,4),It.fur2);qt.position.set(0,.56,-.01),qt.scale.set(1,1,.5),rt.add(qt),this.ears.push(rt)}const G=new Nt(new _n(.255,.034,6,22),It.teal);G.position.set(0,.2,.08),G.scale.set(1,.9,1),G.castShadow=!0,o.add(G);const I=new Nt(new _n(.055,.012,5,14),It.silver);I.position.set(0,.02,.27),c.add(I);const H=new Nt(new _s(.038,12),It.silver);H.position.set(0,-.04,.275),H.rotation.x=.1,H.material=It.silver,c.add(H);const K=new Nt(new _n(.39,.036,6,26),It.leather);K.position.set(0,0,.2),K.scale.set(1.03,.94,1),K.castShadow=!0,e.add(K);const D=new Nt(new _n(.36,.03,6,24),It.leather);D.position.set(0,.01,-.22),D.scale.set(1.03,.94,1),D.castShadow=!0,e.add(D);for(const Y of[-1,1]){e.add(Gl([[Y*.3,-.05,.36],[Y*.36,.14,.26],[Y*.31,.36,.05],[Y*.3,.31,-.25],[Y*.28,.1,-.4]],.024,It.leather));const rt=new Nt(new _n(.075,.014,6,16),It.silver);rt.position.set(Y*.37,.04,.28),rt.rotation.y=Math.PI/2,n.add(rt)}const J=Gl([[0,.34,.12],[0,.3,.36],[0,.12,.5]],.026,It.leather);e.add(J);const X=new Nt(new _n(.085,.015,6,18),It.silver);X.position.set(0,.05,.515),n.add(X);for(let Y=0;Y<8;Y++){const rt=ge(.015,It.silver,1,1,1,5),nt=Y/8*Math.PI*2;rt.position.set(Math.cos(nt)*.39,Math.sin(nt)*.34,.2),n.add(rt)}const V=new jt;V.position.set(0,-.06,-.08),h.add(V);for(let Y=0;Y<11;Y++){const rt=Y%2===0?-1:1,nt=new Nt(new _n(.048+Math.random()*.025,.021,4,8),Y%3?It.curl:It.curl2);nt.position.set(rt*(.16+Math.random()*.13),-.2-Math.random()*.18,-.1+Math.random()*.25),nt.rotation.set(Math.random()*Math.PI,Math.random()*Math.PI,Math.random()*Math.PI),nt.scale.setScalar(.8+Math.random()*.7),nt.castShadow=!0,V.add(nt)}this.legs=[],[{x:-.25,z:.36,rear:!1,side:-1},{x:.25,z:.36,rear:!1,side:1},{x:-.27,z:-.42,rear:!0,side:-1},{x:.27,z:-.42,rear:!0,side:1}].forEach((Y,rt)=>{const nt=new jt;nt.position.set(Y.x,.74,Y.z),t.add(nt);const Ct=li(.083,.2,It.fur,8);Ct.position.y=-.16,Ct.scale.set(1,1,1.2),nt.add(Ct);const qt=new jt;qt.position.y=-.33,nt.add(qt);const At=li(.06,.18,It.fur2,7);At.position.y=-.12,qt.add(At);const Ft=ge(.1,It.furDark,1.15,.62,1.35,9);Ft.position.set(0,-.28,.055),qt.add(Ft);const kt=ge(.035,It.fur,1.2,.5,1,5);kt.position.set(0,-.31,.16),qt.add(kt),this.legs.push({hip:nt,knee:qt,paw:Ft,baseX:Y.x,baseZ:Y.z,rear:Y.rear,side:Y.side,offset:rt===0||rt===3?0:Math.PI})});const lt=new jt;lt.position.set(0,.16,-.64),lt.rotation.x=-.45,e.add(lt),this.tail=lt,this.tailSegs=[];let _t=lt;for(let Y=0;Y<3;Y++){const rt=new jt;Y>0&&(rt.position.z=-.23),_t.add(rt);const nt=li(.07-Y*.014,.19,It.fur,7);nt.rotation.x=Math.PI/2,nt.position.z=-.11,rt.add(nt),this.tailSegs.push(rt),_t=rt}const W=new Nt(new _n(.058,.016,4,12),It.teal);W.position.z=-.37,_t.add(W);const it=new Nt(new _s(.6,24),new yn({color:0,transparent:!0,opacity:.28,depthWrite:!1}));it.rotation.x=-Math.PI/2,it.position.y=.025,it.scale.set(1.3,1.6,1),this.root.add(it),this.shadow=it,_e(e,this.matte),_e(n,It.silver),_e(o,this.matte),_e(c,It.silver),_e(h,this.matte),_e(F,It.amber),_e(b,this.matte);for(const Y of this.ears)_e(Y,this.matte);_e(V,this.matte);for(const Y of this.legs)_e(Y.hip,this.matte),_e(Y.knee,this.matte);for(const Y of this.tailSegs)_e(Y,this.matte);t.traverse(Y=>{Y.isMesh&&(Y.castShadow=!0,Y.receiveShadow=!0)})}bite(){this.biteT=.46}paw(){this.pawT=.42}eat(){this.eatT=.95}hurt(){this.hurtT=.34}update(t,e,n={}){const i=Math.abs(n.speed||0),r=i>.15,a=Dt(i/7,0,1.1);this.phase+=t*(2.6+i*2.1)*(n.speed<0?-.95:1);const o=this.phase;this.biteT>0&&(this.biteT=Math.max(0,this.biteT-t)),this.pawT>0&&(this.pawT=Math.max(0,this.pawT-t)),this.eatT>0&&(this.eatT=Math.max(0,this.eatT-t)),this.hurtT>0&&(this.hurtT=Math.max(0,this.hurtT-t)),this.earTwitch=Math.max(0,this.earTwitch-t),Math.random()<t*.22&&(this.earTwitch=.25);let c=(r?Math.abs(Math.sin(o*2))*.038*a:Math.sin(e*1.5)*.007)+(n.jumpY||0),h=0,f=-Dt(n.turn||0,-1,1)*.055;const u=this.biteT>0?1-this.biteT/.46:0,p=this.pawT>0?1-this.pawT/.42:0,g=this.eatT>0?Math.sin((1-this.eatT/.95)*Math.PI):0;if(u>0){const d=u<.34?xn(0,.34,u):Math.max(0,1-xn(.34,.58,u));this.jaw.rotation.x=d*.72+.03,this.head.rotation.x=.06+(u<.4?-.16:.18)-d*.04,h+=Math.sin(u*Math.PI)*.07,this.rig.position.z=Math.sin(u*Math.PI)*.12,this.tongue.visible=d>.12}else this.jaw.rotation.x=.03+Math.sin(e*1.7)*.008,this.head.rotation.x=.055+Math.sin(o*2)*.025*a+Math.sin(e*1.2)*.006,this.rig.position.z=0,this.tongue.visible=g>.2;if(g>0?(this.head.rotation.x+=g*.5,this.neck.rotation.x=g*.22,this.jaw.rotation.x=.15+Math.abs(Math.sin((1-this.eatT/.95)*Math.PI*5))*.34,c-=g*.06):this.neck.rotation.x=0,p>0){const d=Math.sin(p*Math.PI);this.legs[1].hip.rotation.x=-d*1.25,this.legs[1].hip.rotation.z=-d*.45,this.legs[1].knee.rotation.x=d*.75,f-=d*.1,h+=d*.04}else this.legs[1].hip.rotation.z=0;for(let d=0;d<this.legs.length;d++){const m=this.legs[d],x=Math.sin(o+m.offset),T=Math.max(0,Math.cos(o+m.offset));p>0&&d===1||(m.hip.rotation.x=x*(.24+a*.52),m.knee.rotation.x=T*(.12+a*.52),m.rear&&(m.knee.rotation.x*=.78),m.hip.rotation.z=m.side*.018)}this.body.position.y=.88+(r?Math.sin(o*2+.4)*.018*a:Math.sin(e*1.4)*.006),this.body.rotation.z=Math.sin(o)*.025*a+f*.35,this.body.rotation.x=h*.4,this.body.scale.y=1+Math.sin(e*1.35)*.005,this.head.rotation.y=Dt(n.turn||0,-1,1)*.16+Math.sin(e*.7)*.02,this.head.rotation.z=Dt(n.turn||0,-1,1)*.04,this.ears.forEach((d,m)=>{const x=m===0?-1:1;d.rotation.x=-.12+Math.sin(o*2+m)*.06*a+(this.earTwitch>0?Math.sin(e*35)*.08:0),d.rotation.z=x*.16+Math.sin(e*1.2+m*2)*.015});const y=.35+a*.55;if(this.tail.rotation.y=Math.sin(e*5.2)*y,this.tail.rotation.x=-.45+Math.sin(e*2.1)*.08+(this.hurtT>0?-.2:0),this.tailSegs.forEach((d,m)=>{d.rotation.y=Math.sin(e*5.2-m*.55)*.24*y,d.rotation.x=Math.sin(e*2.4-m*.4)*.04}),n.jumping&&(h=-.22,this.legs.forEach((d,m)=>{d.hip.rotation.x=(m<2?-.8:.9)+Math.sin(o*2)*.1,d.knee.rotation.x=m<2?.9:.25})),this.hurtT>0){const d=this.hurtT/.34;f+=Math.sin(this.hurtT*60)*.05*d,c-=d*.04,this.head.rotation.z+=Math.sin(this.hurtT*40)*.08*d}this.dead&&(h=-.9,c=-.38),this.rig.position.y=c,this.rig.rotation.x=h,this.rig.rotation.z=f,It.amber.emissiveIntensity=.65+Math.sin(e*2.2)*.12,this.shadow.scale.set(1.3+a*.2,1.6+a*.25,1),this.shadow.material.opacity=.22+.08*(1-a)}}const kl={rabbit:{name:"Rabbit",scale:.55,hp:34,speed:5.7,prey:!0,food:18,hunger:22,fur:11837575,fur2:13878701,belly:15129543,inner:13867665,eye:2300435,legs:.52,body:.23,bodyLen:.26,head:.2,snout:.16,ear:"long",tail:"puff",aggro:0,range:0,damage:0,flee:9.5,radius:.42,height:1.08,hop:!0},fox:{name:"Fox",scale:.82,hp:58,speed:6.5,prey:!1,food:20,hunger:16,fur:12347187,fur2:13728319,belly:15655888,dark:3154973,eye:16757575,legs:.46,body:.25,bodyLen:.42,head:.23,snout:.26,ear:"point",tail:"bush",aggro:12,range:2.4,damage:9,flee:0,radius:.55,height:1.25},badger:{name:"Badger",scale:.86,hp:92,speed:4.9,prey:!1,food:24,hunger:18,fur:4934992,fur2:6448234,belly:2697772,dark:1710877,eye:657931,legs:.34,body:.28,bodyLen:.46,head:.24,snout:.2,ear:"round",tail:"short",aggro:10,range:2.2,damage:13,flee:0,radius:.62,height:1.08,stripe:!0},boar:{name:"Boar",scale:1.03,hp:132,speed:5.3,prey:!1,food:30,hunger:24,fur:5061165,fur2:6441785,belly:3680801,dark:2366230,eye:16754240,legs:.4,body:.33,bodyLen:.55,head:.27,snout:.26,ear:"round",tail:"short",aggro:11,range:2.7,damage:17,flee:0,radius:.78,height:1.28,tusks:!0},wolf:{name:"Wolf",scale:1,hp:108,speed:6.7,prey:!1,food:28,hunger:22,fur:5987940,fur2:7369594,belly:11908786,dark:3355962,eye:16762206,legs:.5,body:.27,bodyLen:.5,head:.25,snout:.28,ear:"point",tail:"bush",aggro:15,range:2.6,damage:15,flee:0,radius:.68,height:1.42},deer:{name:"Deer",scale:1.15,hp:118,speed:7.2,prey:!0,food:40,hunger:32,fur:9990730,fur2:11306330,belly:14272169,dark:4403749,eye:2169363,legs:.62,body:.3,bodyLen:.55,head:.22,snout:.28,ear:"deer",tail:"short",aggro:0,range:0,damage:0,flee:12,radius:.7,height:1.9,antlers:!0}};function Hl(s,t=.92,e={}){return new ie({color:s,roughness:t,flatShading:!1,...e})}function ze(s,t,e=1,n=1,i=1,r=10){const a=new Nt(new di(s,r,Math.max(6,r-2)),t);return a.scale.set(e,n,i),a.castShadow=!0,a.receiveShadow=!0,a}function Un(s,t,e,n=8){const i=new Nt(new Mr(s,t,4,n),e);return i.castShadow=!0,i.receiveShadow=!0,i}class Vl{constructor(t,e,n,i,r,a,o=!1){this.type=t;const l=kl[t]||kl.rabbit;this.spec=l,this.level=e,this.world=n,this.scene=i,this.boss=o,this.maxHp=Math.round(l.hp*e.difficulty*(o?4.6:1)),this.hp=this.maxHp,this.damage=Math.round(l.damage*e.difficulty*(o?1.45:1)),this.speed=l.speed*(o?.93:1),this.radius=l.radius*(o?1.55:1)*l.scale,this.dead=!1,this.deathT=0,this.heading=Math.random()*Xt,this.state="wander",this.stateT=1+Math.random()*2,this.wander=new P(r,0,a),this.home=new St(r,a),this.phase=Math.random()*10,this.attackCd=.8+Math.random()*1.5,this.windup=0,this.hurtT=0,this.kb=new P,this.flash=0,this.targeted=!1,this.onAttack=null,this.onDeath=null,this._mats=[],this._build(),this.root.position.set(r,n.heightAt(r,a),a),this.root.rotation.y=this.heading,i.add(this.root),this._buildBar()}_m(t){const e=Hl(t);return this._mats.push(e),e}_build(){const t=this.spec,e=t.scale*(this.boss?1.55:1);this.root=new jt,this.root.scale.setScalar(e),this.rig=new jt,this.root.add(this.rig),this.scaleValue=e;const n=this._m(t.fur),i=this._m(t.fur2),r=this._m(t.belly),a=this._m(t.dark||t.fur),o=Hl(t.eye,.25,{emissive:t.eye,emissiveIntensity:.5});this._mats.push(o),this.eyeMat=o,this.furMat=Kc(.9,.02,16766886,.2),this.matte=this.furMat;const l=new jt;l.position.y=t.legs+t.body*.9,this.rig.add(l),this.body=l;const c=Un(t.body,t.bodyLen,n,10);c.rotation.x=Math.PI/2,c.scale.set(1.03,1,.98),l.add(c);const h=ze(t.body*.9,i,1,1,1.06);h.position.set(0,.03,t.bodyLen*.65),l.add(h);const f=ze(t.body*.92,i,1,.98,1);f.position.set(0,.01,-t.bodyLen*.62),l.add(f);const u=ze(t.body*.8,r,.9,.7,1);u.position.set(0,-t.body*.42,.02),l.add(u);const p=new jt;p.position.set(0,t.body*.75,t.bodyLen*.7),l.add(p),this.neck=p;const g=new jt;g.position.set(0,t.head*.35,t.head*.35),p.add(g),this.head=g;const y=ze(t.head,n,1,.98,1.05,12);g.add(y);const d=Un(t.snout*.55,t.snout*.75,t.name==="Rabbit"?i:n,8);d.rotation.x=Math.PI/2,d.position.set(0,-t.head*.18,t.head*.75+t.snout*.22),d.scale.set(1,.8,1),g.add(d);const m=ze(t.snout*.22,a,1.2,.8,.8,7);if(m.position.set(0,-t.head*.1,t.head*.75+t.snout*.68),g.add(m),t.stripe){const b=ze(t.head*.52,this._m(14802385),.65,.5,1.35,10);b.position.set(0,t.head*.3,t.head*.15),g.add(b);for(const w of[-1,1]){const _=ze(t.head*.32,this._m(1579291),.8,.55,.7,8);_.position.set(w*t.head*.22,t.head*.08,t.head*.72),g.add(_)}}const x=new jt;g.add(x);for(const b of[-1,1]){const w=ze(t.head*.19,this._m(657672),1,1,.8,8);w.position.set(b*t.head*.48,t.head*.2,t.head*.56),g.add(w);const _=ze(t.head*.105,o,1,1,.6,8);_.position.set(b*t.head*.5,t.head*.21,t.head*.7),x.add(_);const v=ze(t.head*.035,this._m(15986910),1,1,.5,5);v.position.set(b*t.head*.47-.01,t.head*.25,t.head*.73),g.add(v)}this.ears=[];for(const b of[-1,1]){const w=new jt;if(t.ear==="long"){w.position.set(b*t.head*.34,t.head*.72,-t.head*.08),w.rotation.set(-.16,0,b*.18);const _=Un(t.head*.3,t.head*1.4,n,8);_.scale.set(.58,1,.32),_.position.y=t.head*.72,w.add(_);const v=ze(t.head*.21,this._m(t.inner||13867665),.45,1.45,.15,8);v.position.set(0,t.head*.72,t.head*.1),w.add(v),w.userData.long=!0}else if(t.ear==="deer"){w.position.set(b*t.head*.58,t.head*.55,0),w.rotation.set(.1,0,b*1.05);const _=Un(t.head*.24,t.head*.5,n,7);_.scale.set(.65,1,.35),_.rotation.z=Math.PI/2,w.add(_);const v=ze(t.head*.13,this._m(13215884),1.5,.55,.2,7);w.add(v)}else{w.position.set(b*t.head*.46,t.head*.68,-t.head*.05),w.rotation.set(-.14,0,b*.23);const _=new Nt(new bn(t.head*.36,t.head*.95,5),n);_.position.y=t.head*.46,_.scale.set(1,1,.55),_.castShadow=!0,w.add(_);const v=new Nt(new bn(t.head*.18,t.head*.62,4),this._m(11567224));v.position.set(0,t.head*.38,t.head*.1),v.scale.set(1,1,.25),w.add(v)}g.add(w),this.ears.push(w)}if(this.antlerGroups=[],t.antlers){const b=this._m(13747621);for(const w of[-1,1]){const _=new jt;_.position.set(w*t.head*.28,t.head*.85,-.02),_.rotation.set(-.2,0,w*.3),g.add(_),this.antlerGroups.push(_);const v=new Nt(new cn(.018,.035,t.head*1.1,5),b);v.position.y=t.head*.54,v.castShadow=!0,_.add(v);for(let C=0;C<2;C++){const R=new Nt(new cn(.012,.026,t.head*.52,5),b);R.position.set(w*.09,t.head*(.7+C*.28),0),R.rotation.z=w*(.8+C*.15),R.castShadow=!0,_.add(R)}}}if(t.tusks){const b=this._m(15130055);for(const _ of[-1,1]){const v=new Nt(new bn(t.head*.1,t.head*.5,5),b);v.position.set(_*t.head*.42,-t.head*.28,t.head*1.12),v.rotation.set(-.4,0,_*.2),v.castShadow=!0,g.add(v)}const w=this._m(t.dark);for(let _=0;_<5;_++){const v=new Nt(new bn(.06,.16,4),w);v.position.set(0,t.body*.96,-t.bodyLen*.4+_*t.bodyLen*.2),v.castShadow=!0,l.add(v)}}if(t.tail==="puff"){const b=ze(t.body*.4,r,1,1,1,9);b.position.set(0,t.body*.25,-t.bodyLen-t.body*.3),l.add(b)}else if(t.tail==="bush"){const b=new jt;b.position.set(0,t.body*.5,-t.bodyLen-t.body*.35),b.rotation.x=-.55,l.add(b),this.tail=b;const w=Un(t.body*.22,t.body*.75,n,8);w.rotation.x=Math.PI/2,w.position.z=-t.body*.33,b.add(w);const _=Un(t.body*.17,t.body*.55,i,8);_.rotation.x=Math.PI/2,_.position.z=-t.body*.92,b.add(_);const v=ze(t.body*.18,r,1,1,1.2,8);v.position.z=-t.body*1.2,b.add(v)}else{const b=new jt;b.position.set(0,t.body*.55,-t.bodyLen-t.body*.42),b.rotation.x=-.5,l.add(b),this.tail=b;const w=Un(t.body*.075,t.body*.3,n,6);w.rotation.x=Math.PI/2,w.position.z=-t.body*.2,b.add(w)}this.legs=[];const T=[[-t.body*.62,t.bodyLen*.62,!1],[t.body*.62,t.bodyLen*.62,!1],[-t.body*.68,-t.bodyLen*.6,!0],[t.body*.68,-t.bodyLen*.6,!0]];for(let b=0;b<4;b++){const[w,_,v]=T[b],C=new jt;C.position.set(w,t.legs,_),this.rig.add(C);const R=Un(t.body*.16,t.legs*.55,n,7);R.position.y=-t.legs*.28,R.scale.set(1,1,1),C.add(R);const N=new jt;N.position.y=-t.legs*.52,C.add(N);const F=Un(t.body*.11,t.legs*.45,a,6);F.position.y=-t.legs*.22,N.add(F);const G=ze(t.body*.16,a,1,.55,1.4,7);G.position.set(0,-t.legs*.48,t.body*.16),N.add(G),this.legs.push({hip:C,knee:N,rear:v,offset:b===0||b===3?0:Math.PI})}_e(l,this.matte),_e(g,this.matte),_e(x,this.eyeMat);for(const b of this.ears)_e(b,this.matte);for(const b of this.antlerGroups)_e(b,this.matte);for(const b of this.legs)_e(b.hip,this.matte),_e(b.knee,this.matte);if(this.tail&&_e(this.tail,this.matte),this.boss){const b=new Nt(new Vi(.8,1.15,24),new yn({color:13654586,transparent:!0,opacity:.28,side:ke,depthWrite:!1}));b.rotation.x=-Math.PI/2,b.position.y=.04,this.root.add(b),this.aura=b,this.eyeMat.emissiveIntensity=1.7,this.eyeMat.color.setHex(16742970)}this.root.traverse(b=>{b.isMesh&&(b.castShadow=!0,b.receiveShadow=!0)});const S=new Nt(new _s(.55,18),new yn({color:0,transparent:!0,opacity:.28,depthWrite:!1}));S.rotation.x=-Math.PI/2,S.position.y=.02,S.scale.set(1.2,1.5,1),this.root.add(S),this.shadow=S}_buildBar(){const t=new jt,e=new Nt(new jn(.84,.075),new yn({color:329734,transparent:!0,opacity:.62,depthWrite:!1,depthTest:!1,fog:!1})),n=new Nt(new jn(.78,.04),new yn({color:this.spec.prey?15774815:14902104,depthWrite:!1,depthTest:!1,fog:!1}));n.position.z=.002,t.add(e,n),t.renderOrder=30,t.visible=!1,this.scene.add(t),this.barGroup=t,this.barFill=n,this.barWidth=.78}updateBar(t){if(this.dead){this.barGroup.visible=!1;return}const e=Dt(this.hp/this.maxHp,0,1),n=e<.999||this.targeted||this.boss;if(this.barGroup.visible=n,!n)return;const i=this.root.position.y+this.spec.height*this.scaleValue*(this.boss?1:1.03)+.18;this.barGroup.position.set(this.root.position.x,i,this.root.position.z),this.barGroup.quaternion.copy(t.quaternion),this.barFill.scale.x=Math.max(.001,e),this.barFill.position.x=-(1-e)*this.barWidth*.5,this.barFill.material.color.setHex(this.spec.prey?this.targeted?16242063:15774815:14902104)}hit(t,e,n=2.4){if(this.dead)return!1;this.hp=Math.max(0,this.hp-t),this.hurtT=.36,this.flash=1,this.state="hurt",this.stateT=.24;const i=this.root.position.x-e.x,r=this.root.position.z-e.z,a=Math.hypot(i,r)||1;return this.kb.set(i/a,0,r/a).multiplyScalar(n*(this.boss?.35:1)),this.hp<=0&&this.die(),!0}die(){this.dead||(this.dead=!0,this.deathT=0,this.state="dead",this.barGroup.visible=!1,this.aura&&(this.aura.visible=!1),this.onDeath?.(this))}_move(t,e){const n=Math.sin(this.heading),i=Math.cos(this.heading);this.root.position.x+=n*e*t,this.root.position.z+=i*e*t}_avoid(t){const e=this.root.position;for(const i of this.world.colliders){const r=e.x-i.x,a=e.z-i.z,o=Math.hypot(r,a),l=i.r+this.radius;if(o<l&&o>1e-4){const c=(l-o)*.65;e.x+=r/o*c,e.z+=a/o*c}}for(const i of this.world.creatures||[]){if(i===this||i.dead)continue;const r=e.x-i.root.position.x,a=e.z-i.root.position.z,o=Math.hypot(r,a),l=this.radius+i.radius;if(o<l&&o>.001){const c=(l-o)*.4;e.x+=r/o*c,e.z+=a/o*c}}const n=Math.hypot(e.x,e.z);n>41&&(e.x=e.x/n*41,e.z=e.z/n*41)}update(t,e,n,i){if(this.dead)this.deathT+=t,this.root.rotation.z=En(this.root.rotation.z,Math.PI*.47,5,t),this.root.position.y=En(this.root.position.y,this.world.heightAt(this.root.position.x,this.root.position.z)-.14,4,t),this.rig.scale.setScalar(En(this.rig.scale.x,.92,2,t));else{const r=this.spec,a=n.position.x,o=n.position.z,l=a-this.root.position.x,c=o-this.root.position.z,h=Math.hypot(l,c),f=!n.dead;this.attackCd=Math.max(0,this.attackCd-t),this.stateT-=t,this.hurtT>0&&(this.hurtT-=t),this.flash>0&&(this.flash=Math.max(0,this.flash-t*5));let u=0,p=this.heading;if(this.state==="hurt")this.stateT<=0&&(this.state=r.prey?"flee":"chase");else if(r.prey)if(h<r.flee&&f)this.state="flee",p=Math.atan2(-l,-c)+Math.sin(e*5+this.phase)*.22,u=this.speed;else if(this.state==="flee"&&h>r.flee*1.5)this.state="wander",this.stateT=1+Math.random()*2;else{if(this.stateT<=0||this.root.position.distanceTo(this.wander)<1.2){const x=this.world.openSpot(Math.random,4,34,1.2);this.wander.set(x.x,0,x.z),this.stateT=2+Math.random()*3}this.root.position.distanceTo(this.wander)>1.4&&(p=Math.atan2(this.wander.x-this.root.position.x,this.wander.z-this.root.position.z),u=this.speed*.28),this.state="wander"}else{const x=this.boss?Math.max(r.aggro,24):r.aggro;if(f&&h<x)this.state==="windup"?(this.windup-=t,u=this.speed*.18,p=Math.atan2(l,c),this.windup<=0&&(this.state="recover",this.stateT=.48,h<r.range+1.1&&(this.onAttack?.(this),this.lunge=1))):this.state==="recover"?(this.stateT<=0&&(this.state="chase"),p=Math.atan2(l,c),u=-this.speed*.16):(this.state="chase",p=Math.atan2(l,c),h>r.range*.72?u=this.speed:this.attackCd<=0?(this.state="windup",this.windup=this.boss?.48:.58,this.attackCd=(this.boss?1.35:1.65)+Math.random()*.7):(p=Math.atan2(l,c)+.7,u=this.speed*.4));else{if(this.stateT<=0||this.root.position.distanceTo(this.wander)<1.3){const T=this.world.openSpot(Math.random,5,35,1.2);this.wander.set(T.x,0,T.z),this.stateT=2.5+Math.random()*4}this.state="wander",this.root.position.distanceTo(this.wander)>1.4&&(p=Math.atan2(this.wander.x-this.root.position.x,this.wander.z-this.root.position.z),u=this.speed*.24)}}f&&h<this.radius+.75&&h>.001&&(this.root.position.x-=l/h*.04,this.root.position.z-=c/h*.04),this.heading=Yc(this.heading,p,this.state==="flee"?8:5.5,t);const g=Math.abs(u)>.1;g?(this._move(t,u),this.phase+=t*(4+Math.abs(u)*2.1)):this.phase+=t*1.4,this.lunge>0&&(this._move(t,this.boss?7:5.2),this.lunge=Math.max(0,this.lunge-t*4)),this.kb.lengthSq()>.001&&(this.root.position.x+=this.kb.x*t,this.root.position.z+=this.kb.z*t,this.kb.multiplyScalar(Math.max(0,1-t*8))),this._avoid(t);const y=r.hop?Math.abs(Math.sin(this.phase))*.26*Dt(Math.abs(u)/this.speed,0,1):0;this.root.position.y=this.world.heightAt(this.root.position.x,this.root.position.z)+y,this.root.rotation.y=this.heading;const d=Dt(Math.abs(u)/this.speed,0,1.1);this.body.position.y=r.legs+r.body*.9+(g?Math.abs(Math.sin(this.phase*2))*.025*d:Math.sin(e*1.2+this.phase)*.006),this.body.rotation.z=Math.sin(this.phase)*.03*d;const m=Dt(Math.atan2(l,c)-this.heading,-1.2,1.2);this.head.rotation.y=En(this.head.rotation.y,m*.65,5,t),this.head.rotation.x=Math.sin(this.phase*2)*.04*d+(this.state==="windup"?.18:0);for(const x of this.legs){const T=Math.sin(this.phase+x.offset);x.hip.rotation.x=T*(.25+d*.6),x.knee.rotation.x=Math.max(0,Math.cos(this.phase+x.offset))*(.15+d*.5),x.rear&&(x.knee.rotation.x*=.8)}if(r.hop){const x=Dt(Math.abs(u)/this.speed,0,1);this.legs.forEach((T,S)=>{T.hip.rotation.x=(S<2?-.65:.7)*x+Math.sin(this.phase+T.offset)*.15*x,T.knee.rotation.x=.7*x}),this.root.position.y+=Math.max(0,Math.sin(this.phase*2))*.16*x}this.ears&&this.ears.forEach((x,T)=>{x.rotation.x=(x.userData.long?-.16:-.12)+Math.sin(e*2+T)*.03+(this.state==="windup"?-.2:0)}),this.tail&&(this.tail.rotation.y=Math.sin(e*(this.spec.prey?6:3.2)+this.phase)*.3),this.aura&&(this.aura.rotation.z+=t*.4,this.aura.material.opacity=.2+Math.sin(e*2)*.08),this.eyeMat.emissiveIntensity=this.state==="windup"?2:this.boss?1.6:.55,this.flash>0?(this.furMat.emissive=this.furMat.emissive||new yt,this.furMat.emissive.setRGB(.8*this.flash,.15*this.flash,.08*this.flash)):this.furMat.emissive&&!this.boss&&this.furMat.emissive.setRGB(0,0,0),this.shadow.position.y=.02-y,this.shadow.scale.setScalar(1-y*.5)}this.updateBar(i)}dispose(){this.scene.remove(this.root),this.scene.remove(this.barGroup),this.root.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&(Array.isArray(t.material)?t.material:[t.material]).forEach(n=>n.dispose())}),this.barGroup.traverse(t=>{t.geometry&&t.geometry.dispose(),t.material&&t.material.dispose()}),this._mats.forEach(t=>t.dispose())}}class k0{constructor(t){this.game=t,this.keys=new Set,this.joy={active:!1,x:0,y:0,id:null,startX:0,startY:0,radius:52},this.steer=0,this.throttle=0,this.sprint=!1,this.tiltEnabled=!1,this.tilt={steer:0,throttle:0,baseBeta:null,baseGamma:null},this.actionQueue=[],this.setupKeyboard(),this.setupJoystick(),this.setupButtons()}setupKeyboard(){window.addEventListener("keydown",t=>{["ArrowUp","ArrowDown","ArrowLeft","ArrowRight","Space"].includes(t.code)&&t.preventDefault(),this.keys.add(t.code),!t.repeat&&((t.code==="KeyJ"||t.code==="KeyF")&&this.queue("bite"),t.code==="KeyK"&&this.queue("paw"),t.code==="Space"&&this.queue("pounce"),(t.code==="KeyP"||t.code==="Escape")&&this.game.togglePause(),t.code==="KeyM"&&this.game.toggleSound())}),window.addEventListener("keyup",t=>this.keys.delete(t.code)),window.addEventListener("blur",()=>{this.keys.clear(),this.joy.active=!1,this.joy.id=null,this.resetKnob()})}setupJoystick(){const t=document.getElementById("joystick"),e=document.getElementById("joystick-knob");if(this.joyEl=t,this.knob=e,!t)return;const n=()=>t.getBoundingClientRect(),i=o=>{if(!this.game.canControl())return;const l=n();this.joy.active=!0,this.joy.id=o.pointerId,this.joy.startX=l.left+l.width/2,this.joy.startY=l.top+l.height/2,this.joy.radius=l.width*.36,t.setPointerCapture?.(o.pointerId),this.applyJoy(o.clientX,o.clientY),o.preventDefault()},r=o=>{!this.joy.active||this.joy.id!==null&&o.pointerId!==this.joy.id||(this.applyJoy(o.clientX,o.clientY),o.preventDefault())},a=o=>{o&&this.joy.id!==null&&o.pointerId!==this.joy.id||(this.joy.active=!1,this.joy.id=null,this.joy.x=0,this.joy.y=0,this.resetKnob())};t.addEventListener("pointerdown",i,{passive:!1}),window.addEventListener("pointermove",r,{passive:!1}),window.addEventListener("pointerup",a),window.addEventListener("pointercancel",a),t.addEventListener("contextmenu",o=>o.preventDefault())}setupButtons(){const t=(n,i)=>{const r=document.getElementById(n);r&&r.addEventListener("pointerdown",a=>{a.preventDefault(),a.stopPropagation(),this.queue(i)})};t("btn-bite","bite"),t("btn-paw","paw"),t("btn-pounce","pounce");const e=document.getElementById("btn-bite");e&&e.addEventListener("contextmenu",n=>n.preventDefault())}queue(t){this.game.canControl()&&this.game.doAction(t)}applyJoy(t,e){const n=t-this.joy.startX,i=e-this.joy.startY,r=Math.hypot(n,i),a=this.joy.radius,o=Math.min(r,a),l=r>0?n/r*(o/a):0,c=r>0?i/r*(o/a):0;this.joy.x=Math.abs(l)<.06?0:l,this.joy.y=Math.abs(c)<.06?0:c,this.knob.style.transform=`translate(${l*a}px, ${c*a}px)`}resetKnob(){this.knob&&(this.knob.style.transform="translate(0px, 0px)")}async requestTilt(){try{return typeof DeviceMotionEvent<"u"&&typeof DeviceMotionEvent.requestPermission=="function"&&await DeviceMotionEvent.requestPermission()!=="granted"?{ok:!1,reason:"Motion access was not granted."}:typeof DeviceOrientationEvent<"u"&&typeof DeviceOrientationEvent.requestPermission=="function"&&await DeviceOrientationEvent.requestPermission()!=="granted"?{ok:!1,reason:"Motion access was not granted."}:typeof DeviceOrientationEvent>"u"&&typeof DeviceMotionEvent>"u"?{ok:!1,reason:"This device has no motion sensor."}:(this.enableTilt(),{ok:!0})}catch{return{ok:!1,reason:"Motion access is not available here."}}}enableTilt(){this.tiltEnabled||(this.tiltEnabled=!0,this.tilt.baseBeta=null,this.tilt.baseGamma=null,this._onOrient=t=>{if(t.beta===null||t.gamma===null)return;if(this.tilt.baseBeta===null){this.tilt.baseBeta=t.beta,this.tilt.baseGamma=t.gamma;return}let e=0;try{e=screen.orientation?.angle??window.orientation??0}catch{e=0}let n=t.gamma-this.tilt.baseGamma,i=t.beta-this.tilt.baseBeta,r=Dt(n/16,-1,1),a=Dt(-i/16,-1,1);Math.abs(e)===90&&(r=Dt(i/16,-1,1)*(e===90?1:-1),a=Dt(-n/16,-1,1)),Math.abs(r)<.08&&(r=0),Math.abs(a)<.1&&(a=0),this.tilt.steer=r,this.tilt.throttle=a},window.addEventListener("deviceorientation",this._onOrient,!0))}disableTilt(){this.tiltEnabled=!1,this.tilt.steer=0,this.tilt.throttle=0,this._onOrient&&window.removeEventListener("deviceorientation",this._onOrient,!0),this._onOrient=null}update(t){const e=this.keys;let n=0,i=0;(e.has("KeyA")||e.has("ArrowLeft"))&&(n-=1),(e.has("KeyD")||e.has("ArrowRight"))&&(n+=1),(e.has("KeyW")||e.has("ArrowUp"))&&(i+=1),(e.has("KeyS")||e.has("ArrowDown"))&&(i-=1);const r=Math.hypot(this.joy.x,this.joy.y)>.08,a=this.tiltEnabled&&(this.tilt.steer!==0||this.tilt.throttle!==0);let o,l;r?(o=this.joy.x,l=-this.joy.y):n!==0||i!==0?(o=n,l=i):a?(o=this.tilt.steer,l=this.tilt.throttle):(o=0,l=0),this.steer=En(this.steer,Dt(o,-1,1),18,t),this.throttle=En(this.throttle,Dt(l,-1,1),18,t),this.sprint=Math.hypot(this.joy.x,this.joy.y)>.86||e.has("ShiftLeft")||e.has("ShiftRight"),this.joyMagnitude=Math.min(1,Math.hypot(this.joy.x,this.joy.y))}}const We=500,wn=25,_o="pupwild.save.v2",Wl=[{key:"emerald",name:"Emerald Hollow",note:"Moss, goldlight & hare tracks",ground:[3756333,4612405,5402940],moss:6389571,dirt:6310450,grass:6785596,foliage:[3099692,3891251,4879419,5668671],bark:[4930348,3681314,5719606],fog:9348733,accent:10209131,fogMix:.4,fogDensity:.017,treeMix:{broad:.48,pine:.3,birch:.14,dead:.08},flowers:[15326620,15986658,12113895,15773872],fireflies:.4,snow:!1,mushrooms:1},{key:"mothwood",name:"Mothwood",note:"Blue mist & old pine song",ground:[2439215,2901049,3427649],moss:4152906,dirt:4079668,grass:4417615,foliage:[1653556,2181182,2839879,3366991],bark:[3157544,2499871,3946800],fog:6258550,accent:6737860,fogMix:.55,fogDensity:.023,treeMix:{broad:.18,pine:.64,birch:.1,dead:.08},flowers:[10475728,14411743,9090007],fireflies:1.1,snow:!1,mushrooms:1.8},{key:"birchfall",name:"Birchfall",note:"Pale trunks & amber leaf-fall",ground:[5464123,6384448,7239494],moss:8357197,dirt:7427386,grass:9015630,foliage:[8160830,10132038,11576140,12692308],bark:[13157810,11710883,14210239],fog:11906694,accent:14727018,fogMix:.42,fogDensity:.018,treeMix:{broad:.2,pine:.12,birch:.6,dead:.08},flowers:[15192975,15984577,14133598],fireflies:.45,snow:!1,mushrooms:.5},{key:"ashen",name:"Ashen Pines",note:"Rust needles & a smoked sky",ground:[4142638,4931379,5785399],moss:6708540,dirt:5060650,grass:7103293,foliage:[4078380,5325875,6441271,7491898],bark:[4011056,3090469,5062714],fog:9336680,accent:14715480,fogMix:.55,fogDensity:.022,treeMix:{broad:.18,pine:.58,birch:.06,dead:.18},flowers:[14846557,14069866,13222309],fireflies:.7,snow:!1,mushrooms:1.1},{key:"moonfen",name:"Moonfen",note:"Black water & waking lights",ground:[2505526,2901567,3493959],moss:3957331,dirt:3687485,grass:4352858,foliage:[1917502,2445642,3105365,3764830],bark:[3358008,2699565,4279108],fog:5732984,accent:8250322,fogMix:.62,fogDensity:.026,treeMix:{broad:.3,pine:.38,birch:.14,dead:.18},flowers:[10414299,13627108,11064555],fireflies:1.5,snow:!1,mushrooms:2.2},{key:"redgrove",name:"Redgrove",note:"Copper canopy & warm shadows",ground:[5061166,6046770,7032119],moss:7235384,dirt:6176040,grass:7959101,foliage:[6962474,8538671,9984056,11167549],bark:[4928552,3877151,5980209],fog:11041118,accent:14715738,fogMix:.45,fogDensity:.018,treeMix:{broad:.56,pine:.16,birch:.1,dead:.18},flowers:[14981729,14270586,15583653],fireflies:.6,snow:!1,mushrooms:.8},{key:"frostpine",name:"Frostpine",note:"Quiet snow & silver bark",ground:[7306873,8227717,9148304],moss:10201486,dirt:7236962,grass:10201740,foliage:[3232330,3826006,4747363,5668719],bark:[5985872,4933442,7038558],fog:11781576,accent:11002343,fogMix:.56,fogDensity:.021,treeMix:{broad:.14,pine:.66,birch:.14,dead:.06},flowers:[13625321,16054258,11130077],fireflies:.2,snow:!0,mushrooms:.5}],gr=["First Light","The Green Run","Moth & Moon","Pale Timber","Rust & Root","The Quiet Fen","Copperfall","Silver Thaw","The Long Hunger","Fernwake","Hollow Song","Amber Deep","The Night Crossing","Briar Crown","Old Pine Teeth","Moonlit Mile","The Reddening","Cold Antler","The Final Thicket","Five Hundred"],Qs=["Moss","Fern","Thistle","Amber","Dew","Bramble","Cinder","Moon","Willow","Fox","Ash","Briar","Elk","Pine","Owl","Hare","Rook","Frost","Hazel","Sorrel","Nettle","Cedar","Marten","Clover","Vixen"],oa=["light","fall","run","deep","glade","hollow","reach","trail","shade","song","den","crossing","rise","hush","mire","step","wake","bough","drift","rest"],ci=[{key:"dawn",label:"Dawn",time:.235},{key:"morning",label:"Morning",time:.34},{key:"noon",label:"High sun",time:.5},{key:"afternoon",label:"Afternoon",time:.6},{key:"dusk",label:"Dusk",time:.735},{key:"night",label:"Night",time:.865},{key:"deepnight",label:"Deep night",time:.94}];function H0(s){if(s===1)return ci[1];const t=s%9;return t===0?ci[5]:t===1?ci[6]:t===4?ci[4]:t===7?ci[0]:t===2?ci[3]:ci[1+s*7%2]}const V0={dawn:"The rabbits stir before the sun. Fill your belly early.",morning:"The woods are awake. Hunt while the light is kind.",noon:"High sun, long shadows, hungry things everywhere.",afternoon:"The light is turning gold. Do not let your hunger turn first.",dusk:"Night is coming. Eat now, or the dark will eat you.",night:"The forest is awake in the dark. Trust your ears.",deepnight:"Nothing sleeps out here. Keep moving. Keep feeding."};function Xl(s){s=Dt(Math.round(s),1,We);const t=Math.floor((s-1)/wn)+1,e=Wl[(s-1)%Wl.length],n=H0(s),i=s*811+4021>>>0,r=go(i),a=s%25===0,o=Math.floor(r()*Qs.length*oa.length),l=Qs[o%Qs.length]+oa[Math.floor(o/Qs.length)%oa.length],c=s===1?"First Light Clearing":s===We?"The Five Hundredth":l,h=a?2+Math.floor(s/140):Math.min(6,3+Math.floor((s-1)/55)),f=a?1:Math.min(5,1+Math.floor((s-1)/38)),u=Math.min(h+6,h+3+Math.floor(s/90)),p=a?3:Math.min(f+4,f+2+Math.floor(s/150)),g=["wolf","boar","badger","wolf"];return{level:s,chapter:t,chapterLabel:gr[(t-1)%gr.length],biome:e,phase:n,phaseKey:n.key,seed:i,name:c,boss:a,bossType:g[(t-1)%g.length],preyGoal:h,beastGoal:f,preySpawn:u,beastSpawn:p,difficulty:Math.min(2.4,1+(s-1)*.009),subtitle:V0[n.key],clock:n.time}}function W0(s){return s=Dt(s,1,20),{chapter:s,name:gr[(s-1)%gr.length],range:[(s-1)*wn+1,Math.min(We,s*wn)]}}function rr(){return{unlocked:1,cleared:[],totalFeasts:0,bestLife:0,settings:{tilt:!1,sound:!0,sensitivity:1,quality:"auto"},seenIntro:!1}}function X0(){try{const s=JSON.parse(localStorage.getItem(_o)||"null");if(!s||typeof s!="object")return rr();const t=rr();return{...t,...s,unlocked:Dt(Number(s.unlocked)||1,1,We),cleared:Array.isArray(s.cleared)?s.cleared.filter(e=>Number.isInteger(e)&&e>=1&&e<=We):[],settings:{...t.settings,...s.settings||{}}}}catch{return rr()}}function q0(s){try{localStorage.setItem(_o,JSON.stringify(s))}catch{}}function Y0(){try{localStorage.removeItem(_o)}catch{}}function ql(s){const t=Math.round((s%1+1)%1*24*60),e=Math.floor(t/60)%24,n=t%60;return`${String(e).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function $0(s){return s<.2||s>=.82?"Night":s<.28?"Dawn":s<.46?"Morning":s<.58?"High sun":s<.7?"Afternoon":s<.82?"Dusk":"Night"}function Yl(s){return s<.215||s>=.805}class K0{constructor(t){this.game=t,this.el={};const e=["screen-menu","hud","screen-levels","screen-settings","screen-pause","screen-complete","screen-dead","btn-play","btn-continue","btn-menu-levels","btn-menu-settings","btn-menu-sound","btn-levels-play","menu-biome","menu-biome-sub","menu-clock","menu-phase","menu-feasts","menu-beasts","stat-trail","stat-best","stat-total","hud-biome","hud-chapter","hud-level","hud-clock","hud-phase","time-icon","time-fill","life-num","life-fill","life-max","hunger-num","hunger-fill","obj-prey-count","obj-prey-fill","obj-beast-count","obj-beast-fill","obj-beast-label","obj-prey","obj-beast","btn-pause","btn-sound","btn-paw","btn-pounce","btn-bite","boss-wrap","boss-name","boss-hp-num","boss-fill","target-tag","target-name","target-fill","level-banner","banner-kicker","banner-title","banner-sub","tip","toasts","floaters","hitmark","minimap","joystick","joystick-knob","chapter-name","chapter-range","chapter-prev","chapter-next","level-grid","toggle-tilt","toggle-sound","tilt-status","sens-range","sens-val","quality-seg","btn-fullscreen","btn-reset","pause-level","pause-feasts","pause-beasts","pause-life","btn-resume","btn-pause-settings","btn-quit","pause-tip","complete-kicker","complete-sub","complete-feasts","complete-beasts","complete-life","complete-time","btn-next","btn-replay","btn-complete-map","dead-sub","dead-feasts","dead-beasts","dead-time","btn-retry","btn-dead-map","loading","load-fill","load-text","screen-menu","hurt","heal","flash"];for(const n of e)this.el[n]=document.getElementById(n);this.mapCanvas=document.getElementById("minimap"),this.mapCtx=this.mapCanvas?.getContext("2d"),this.bannerTimer=null,this.tipTimer=null,this.selectedLevel=1,this.chapter=1,this.lastMap=0,this.lastVitals="",this.bind()}bind(){const t=(r,a)=>{const o=document.getElementById(r);o&&o.addEventListener("click",l=>{this.game.audio.click(),a(l)})};t("btn-play",()=>this.game.startFromMenu()),t("btn-continue",()=>this.game.startFromMenu()),t("btn-menu-levels",()=>this.game.openLevels()),t("btn-menu-settings",()=>this.game.openSettings()),t("btn-menu-sound",()=>this.game.toggleSound()),t("btn-pause",()=>this.game.togglePause()),t("btn-sound",()=>this.game.toggleSound()),t("btn-pause-settings",()=>this.game.openSettings()),t("btn-resume",()=>this.game.togglePause(!1)),t("btn-quit",()=>this.game.quitToMenu()),t("btn-next",()=>this.game.nextLevel()),t("btn-replay",()=>this.game.replayLevel()),t("btn-complete-map",()=>this.game.openLevels()),t("btn-retry",()=>this.game.replayLevel()),t("btn-dead-map",()=>this.game.openLevels()),t("btn-fullscreen",()=>this.game.toggleFullscreen()),t("btn-reset",()=>this.game.resetProgress()),t("chapter-prev",()=>this.game.changeChapter(-1)),t("chapter-next",()=>this.game.changeChapter(1)),t("btn-levels-play",()=>this.game.playSelectedLevel()),document.querySelectorAll("[data-close]").forEach(r=>r.addEventListener("click",a=>{this.game.audio.click();const o=r.getAttribute("data-close");o==="levels"&&this.game.closeLevels(),o==="settings"&&this.game.closeSettings()}));const e=document.getElementById("toggle-tilt");e&&e.addEventListener("click",()=>this.game.toggleTilt());const n=document.getElementById("toggle-sound");n&&n.addEventListener("click",()=>this.game.toggleSound());const i=document.getElementById("sens-range");i&&i.addEventListener("input",()=>{const r=Number(i.value)/100,a=document.getElementById("sens-val");a&&(a.textContent=`${i.value}%`),this.game.setSensitivity(r)}),document.querySelectorAll("#quality-seg button").forEach(r=>r.addEventListener("click",()=>{this.game.audio.click(),this.game.setQuality(r.getAttribute("data-q"))})),this.bindSwipeNav()}bindSwipeNav(){const t=document.getElementById("level-grid");if(!t)return;let e=0,n=0;t.addEventListener("pointerdown",i=>{e=i.clientX,n=i.clientY}),t.addEventListener("pointerup",i=>{const r=i.clientX-e,a=i.clientY-n;Math.abs(r)>60&&Math.abs(a)<50&&this.game.changeChapter(r<0?1:-1)})}refreshMenu(t,e){const n=(a,o)=>{const l=this.el[a];l&&(l.textContent=o)};n("menu-biome",e.biome.name),n("menu-biome-sub",`Trail ${String(e.level).padStart(3,"0")} · ${e.phase.label}`),n("menu-clock",ql(e.clock)),n("menu-phase",e.phase.label),n("menu-feasts",t.totalFeasts),n("menu-beasts",t.cleared.length),n("stat-trail",String(e.level).padStart(3,"0")),n("stat-best",t.cleared.length),n("stat-total",t.totalFeasts>999?"999+":t.totalFeasts);const i=this.el["btn-continue"],r=this.el["btn-play"];i&&(t.unlocked>1?(i.hidden=!1,i.textContent=`Continue · Trail ${String(t.unlocked).padStart(3,"0")}`,r.querySelector(".btn-label").textContent="New trail"):(i.hidden=!0,r.querySelector(".btn-label").textContent="Start the trail"))}showMenu(t){this.el["screen-menu"].hidden=!t,t&&this.el.hud.classList.remove("on")}showHUD(t){const e=this.el.hud;e.hidden=!t,requestAnimationFrame(()=>e.classList.toggle("on",t))}hideAllPanels(){for(const t of["screen-levels","screen-settings","screen-pause","screen-complete","screen-dead"])this.el[t]&&(this.el[t].hidden=!0)}openPanel(t){this.hideAllPanels(),this.el[t]&&(this.el[t].hidden=!1)}closePanel(t){this.el[t]&&(this.el[t].hidden=!0)}updateHud(t){const{player:e,level:n,counts:i,boss:r}=t,a=Dt(e.hp/e.maxLife,0,1),o=Dt(e.hunger/100,0,1);this.el["life-fill"].style.width=`${a*100}%`,this.el["hunger-fill"].style.width=`${o*100}%`,this.el["life-num"].textContent=`${Math.ceil(e.hp)} / ${Math.round(e.maxLife)}`,this.el["hunger-num"].textContent=`${Math.ceil(e.hunger)}`,this.el["life-fill"].closest(".vital")?.classList.toggle("low",a<.25),this.el["hunger-fill"].closest(".vital")?.classList.toggle("low",o<.22),this.el["obj-prey-count"].textContent=`${i.prey}/${n.preyGoal}`,this.el["obj-beast-count"].textContent=`${i.beasts}/${n.beastGoal}`,this.el["obj-prey-fill"].style.width=`${Dt(i.prey/n.preyGoal,0,1)*100}%`,this.el["obj-beast-fill"].style.width=`${Dt(i.beasts/n.beastGoal,0,1)*100}%`,this.el["obj-prey"].classList.toggle("done",i.prey>=n.preyGoal),this.el["obj-beast"].classList.toggle("done",i.beasts>=n.beastGoal),n.boss&&(this.el["obj-beast-label"].textContent=r?.name||"Face the alpha");const l=t.time;this.el["hud-clock"].textContent=ql(l),this.el["hud-phase"].textContent=$0(l),this.el["time-fill"].style.width=`${l*100}%`;const c=l>=.805||l<.215;this.el["time-icon"].classList.toggle("night",c);const h=this.el["time-icon"].querySelector("use");h&&h.setAttribute("href",c?"#icon-moon":"#icon-sun"),this.el["btn-sound"].querySelector("use")?.setAttribute("href",this.game.audio.enabled?"#icon-sound":"#icon-mute"),this.el["btn-menu-sound"].querySelector("use")?.setAttribute("href",this.game.audio.enabled?"#icon-sound":"#icon-mute"),r?(this.el["boss-wrap"].hidden=!1,this.el["boss-wrap"].classList.add("on"),this.el["boss-name"].textContent=r.name,this.el["boss-fill"].style.width=`${Dt(r.hp/r.maxHp,0,1)*100}%`,this.el["boss-hp-num"].textContent=`${Math.ceil(Dt(r.hp/r.maxHp,0,1)*100)}%`):(this.el["boss-wrap"].classList.add("off"),this.el["boss-wrap"].hidden=!0),performance.now()-this.lastMap>90&&(this.lastMap=performance.now(),this.drawMinimap(t))}updateCooldowns(t,e,n){const i=(r,a,o)=>{const l=this.el[r];if(!l)return;const c=a>0?Dt(1-a/o,0,1)*100:0;l.style.setProperty("--cd",`${a>0?100-c:100}%`),l.classList.toggle("cooling",a>.02)};i("btn-bite",t.remaining,t.cooldown),i("btn-paw",e.remaining,e.cooldown),i("btn-pounce",n.remaining,n.cooldown)}flashAbility(t){const e=this.el[t];e&&(e.classList.remove("flash"),e.offsetWidth,e.classList.add("flash"))}showLevelBanner(t,e){const n=`Trail ${String(t.level).padStart(3,"0")} · ${t.biome.name}`;this.el["banner-kicker"].textContent=n,this.el["banner-title"].textContent=t.name,this.el["banner-sub"].textContent=e?"The alpha is close. Face it, and the trail is yours.":t.subtitle;const i=this.el["level-banner"];i.classList.remove("on"),i.offsetWidth,i.classList.add("on"),clearTimeout(this.bannerTimer),this.bannerTimer=setTimeout(()=>i.classList.remove("on"),4600)}setLevelChrome(t){this.el["hud-biome"].textContent=t.biome.name,this.el["hud-chapter"].textContent=`Chapter ${t.chapter}`,this.el["hud-level"].textContent=String(t.level).padStart(3,"0")}showTip(t,e=6e3){const n=this.el.tip;n.innerHTML=t,n.classList.add("on"),clearTimeout(this.tipTimer),this.tipTimer=setTimeout(()=>n.classList.remove("on"),e)}hideTip(){clearTimeout(this.tipTimer),this.el.tip.classList.remove("on")}toast(t,e=""){const n=this.el.toasts;for(;n.children.length>=3;)n.firstElementChild.remove();const i=document.createElement("div");i.className=`toast ${e}`,i.innerHTML=t,n.appendChild(i),setTimeout(()=>i.classList.add("fade"),1900),setTimeout(()=>i.remove(),2450)}float(t,e,n,i=""){const r=document.createElement("div");r.className=`floater ${i}`,r.textContent=t,r.style.left=`${e}px`,r.style.top=`${n}px`,this.el.floaters.appendChild(r),setTimeout(()=>r.remove(),1350)}floatWorld(t,e,n,i=""){const r=t.clone().project(e);if(r.z>1)return;const a=(r.x*.5+.5)*window.innerWidth,o=(-r.y*.5+.5)*window.innerHeight;this.float(n,a,o,i)}hitmark(){const t=this.el.hitmark;t.classList.remove("on"),t.offsetWidth,t.classList.add("on")}damageFlash(t=1){const e=this.el.hurt;e.style.opacity=String(Dt(.4+t*.35,0,1)),setTimeout(()=>{e.style.opacity="0"},130)}healFlash(){const t=this.el.heal;t.style.opacity="0.7",setTimeout(()=>{t.style.opacity="0"},220)}whiteFlash(){const t=this.el.flash;t.style.opacity="0.7",setTimeout(()=>{t.style.opacity="0"},100)}setTarget(t,e){const n=this.el["target-tag"];if(!t||t.dead){n.hidden=!0;return}const i=t.root.position.clone();i.y+=t.spec.height*t.scaleValue+.6;const r=i.project(e);if(r.z>1){n.hidden=!0;return}n.hidden=!1,n.style.left=`${(r.x*.5+.5)*window.innerWidth}px`,n.style.top=`${(-r.y*.5+.5)*window.innerHeight}px`,this.el["target-name"].textContent=t.boss?t.name:t.spec.name,this.el["target-fill"].style.width=`${Dt(t.hp/t.maxHp,0,1)*100}%`}drawMinimap(t){const e=this.mapCtx;if(!e)return;const i=this.mapCanvas.width,r=i/2,o=i*.46/32,l=t.player.position.x,c=t.player.position.z,h=t.player.heading,f=Math.cos(h),u=Math.sin(h);e.clearRect(0,0,i,i),e.save(),e.beginPath(),e.arc(r,r,i*.48,0,Xt),e.clip();const p=e.createRadialGradient(r,r*.8,10,r,r,i*.5);p.addColorStop(0,"rgba(45,74,52,.96)"),p.addColorStop(1,"rgba(10,22,15,.98)"),e.fillStyle=p,e.fillRect(0,0,i,i);const g=(d,m)=>{const x=d-l,T=m-c,S=x*f-T*u,b=x*u+T*f;return[r+S*o,r-b*o]};e.fillStyle="rgba(111,150,96,.52)";for(const d of t.world.treeDots){const[m,x]=g(d.x,d.z);m<0||x<0||m>i||x>i||(e.beginPath(),e.arc(m,x,Math.max(1.2,d.r*1.5),0,Xt),e.fill())}for(const d of t.creatures){if(d.dead||d.boss)continue;const[m,x]=g(d.root.position.x,d.root.position.z);Math.hypot(m-r,x-r)>i*.47||(e.beginPath(),e.arc(m,x,d.spec.prey?2.8:3.4,0,Xt),e.fillStyle=d.spec.prey?"#f0cc7a":"#e37a67",e.fill(),d.targeted&&(e.strokeStyle="#f7e6bb",e.lineWidth=1.4,e.stroke()))}if(t.boss&&!t.boss.dead){const[d,m]=g(t.boss.root.position.x,t.boss.root.position.z);Math.hypot(d-r,m-r)<i*.47&&(e.save(),e.translate(d,m),e.rotate(Math.PI/4),e.fillStyle="#f07a5b",e.fillRect(-4,-4,8,8),e.restore())}e.save(),e.translate(r,r),e.beginPath(),e.moveTo(0,-9),e.lineTo(6,6),e.lineTo(0,3),e.lineTo(-6,6),e.closePath(),e.fillStyle="#55d8ce",e.shadowColor="rgba(85,216,206,.8)",e.shadowBlur=8,e.fill(),e.restore(),performance.now()/1e3;const y=e.createLinearGradient(r,r,r,0);y.addColorStop(0,"rgba(85,216,206,.08)"),y.addColorStop(1,"rgba(85,216,206,0)"),e.fillStyle=y,e.beginPath(),e.moveTo(r,r),e.arc(r,r,i*.47,-Math.PI/2-.24,-Math.PI/2+.24),e.closePath(),e.fill(),e.restore()}setupLevelSelect(t,e,n,i){this.chapter=n,this.selectedLevel=i;const r=W0(n);this.el["chapter-name"].textContent=`Chapter ${String(n).padStart(2,"0")} · ${r.name}`,this.el["chapter-range"].textContent=`Trails ${String(r.range[0]).padStart(3,"0")} – ${String(r.range[1]).padStart(3,"0")}`,this.el["chapter-prev"].disabled=n<=1,this.el["chapter-next"].disabled=n>=Math.ceil(We/wn);const a=this.el["level-grid"];a.innerHTML="";const o=(n-1)*wn+1,l=Math.min(We,n*wn);for(let h=o;h<=l;h++){const f=document.createElement("button"),u=h>t.unlocked,p=t.cleared.includes(h);f.className=`level-btn${u?" locked":""}${p?" cleared":""}${h===e?" current":""}${h===i?" selected":""}${h%25===0?" boss":""}`,f.dataset.level=h,u?f.innerHTML=`<svg><use href="#icon-lock"/></svg><span>${String(h).padStart(3,"0")}</span>`:f.innerHTML=`<b>${String(h).padStart(3,"0")}</b><span>${h===e?"Current":p?"Cleared":"Trail"}</span>`,f.addEventListener("click",()=>{if(u){this.game.audio.click(),this.toast(`Clear Trail <strong>${String(t.unlocked).padStart(3,"0")}</strong> first`,"warn");return}this.selectedLevel=h,a.querySelectorAll(".level-btn").forEach(y=>y.classList.toggle("selected",Number(y.dataset.level)===h));const g=this.el["btn-levels-play"].querySelector(".btn-label");g&&(g.textContent=`Play trail ${String(h).padStart(3,"0")}`)}),a.appendChild(f)}const c=this.el["btn-levels-play"].querySelector(".btn-label");c&&(c.textContent=`Play trail ${String(i).padStart(3,"0")}`)}populateSettings(t,e){const n=this.el["toggle-tilt"];n&&(n.classList.toggle("on",!!t.tilt),n.setAttribute("aria-checked",String(!!t.tilt)));const i=this.el["tilt-status"];i&&(i.textContent=t.tilt?"On · tilt to steer":"Off");const r=this.el["toggle-sound"];r&&(r.classList.toggle("on",e),r.setAttribute("aria-checked",String(e)));const a=this.el["sens-range"];if(a){a.value=String(Math.round((t.sensitivity||1)*100));const o=this.el["sens-val"];o&&(o.textContent=`${a.value}%`)}document.querySelectorAll("#quality-seg button").forEach(o=>{o.classList.toggle("on",o.getAttribute("data-q")===(t.quality||"auto"))})}showComplete(t,e){this.el["complete-kicker"].textContent=`Trail ${String(t.level).padStart(3,"0")} cleared · ${t.biome.name}`,this.el["complete-sub"].textContent=t.level>=We?"Five hundred trails. One small pup. The whole forest knows your name now.":"You fed well. Another trail opens beneath the trees.",this.el["complete-feasts"].textContent=e.feasts,this.el["complete-beasts"].textContent=e.beasts,this.el["complete-life"].textContent=Math.round(e.life),this.el["complete-time"].textContent=e.time,this.openPanel("screen-complete")}showDead(t,e,n){this.el["dead-sub"].textContent=n||"You starved before the trail was done. Eat sooner, and eat more.",this.el["dead-feasts"].textContent=e.feasts,this.el["dead-beasts"].textContent=e.beasts,this.el["dead-time"].textContent=e.time,this.openPanel("screen-dead")}showPause(t,e){this.el["pause-level"].textContent=String(t.level).padStart(3,"0"),this.el["pause-feasts"].textContent=e.feasts,this.el["pause-beasts"].textContent=e.beasts,this.el["pause-life"].textContent=Math.round(e.life);const n=["Keep your hunger above the red line. Eating restores life and raises your maximum.","Rabbits bolt when you get close. Pounce first, then bite.","Paw swipes push beasts back. Bites do the real damage.","Every animal you eat makes you harder to kill. Every empty belly makes you easier.","Night trails are full of eyes. Keep moving and keep feeding."];this.el["pause-tip"].textContent=n[Math.floor(Math.random()*n.length)],this.openPanel("screen-pause")}setLoading(t,e){this.el["load-fill"]&&(this.el["load-fill"].style.width=`${Dt(t,0,1)*100}%`),e&&this.el["load-text"]&&(this.el["load-text"].textContent=e)}hideLoading(){this.el.loading.classList.add("done")}setTiltStatus(t){this.el["tilt-status"]&&(this.el["tilt-status"].textContent=t)}setSoundIcon(){const t=this.game.audio.enabled?"#icon-sound":"#icon-mute";this.el["btn-sound"].querySelector("use")?.setAttribute("href",t),this.el["btn-menu-sound"].querySelector("use")?.setAttribute("href",t)}}class J0{constructor(){this.ctx=null,this.master=null,this.enabled=!0,this.night=!1,this.started=!1,this._ambient=[],this._birdTimer=null,this._cricketTimer=null,this._noiseBuffer=null}init(){if(this.started){this.ctx?.state==="suspended"&&this.ctx.resume();return}const t=window.AudioContext||window.webkitAudioContext;t&&(this.ctx=new t,this.started=!0,this.master=this.ctx.createGain(),this.master.gain.value=this.enabled?.42:0,this.master.connect(this.ctx.destination),this._makeNoise(),this._startWind(),this._scheduleBirds(),this._scheduleCrickets(),this.ctx.state==="suspended"&&this.ctx.resume())}_makeNoise(){const t=this.ctx.sampleRate*3,e=this.ctx.createBuffer(1,t,this.ctx.sampleRate),n=e.getChannelData(0);let i=0;for(let r=0;r<t;r++){const a=Math.random()*2-1;i=(i+.02*a)/1.02,n[r]=i*3.2}this._noiseBuffer=e}_noiseSource(){const t=this.ctx.createBufferSource();return t.buffer=this._noiseBuffer,t}_env(t,e,n,i,r){t.gain.setValueAtTime(1e-4,e),t.gain.linearRampToValueAtTime(r,e+n),t.gain.exponentialRampToValueAtTime(1e-4,e+n+i)}_startWind(){const t=this._noiseSource();t.loop=!0;const e=this.ctx.createBiquadFilter();e.type="lowpass",e.frequency.value=420,e.Q.value=.6;const n=this.ctx.createGain();n.gain.value=.055,t.connect(e).connect(n).connect(this.master),t.start();const i=this.ctx.createOscillator(),r=this.ctx.createGain();i.frequency.value=.07,r.gain.value=.02,i.connect(r).connect(n.gain),i.start(),this._ambient.push(t,i)}_scheduleBirds(){clearInterval(this._birdTimer),this._birdTimer=setInterval(()=>{!this.enabled||!this.started||this.night||Math.random()>.62&&this.bird()},2600)}_scheduleCrickets(){clearInterval(this._cricketTimer),this._cricketTimer=setInterval(()=>{!this.enabled||!this.started||!this.night||Math.random()>.5&&this.cricket()},1500)}setNight(t){this.night=t}setEnabled(t){this.enabled=t,this.master&&this.master.gain.setTargetAtTime(t?.42:0,this.ctx.currentTime,.05)}bird(){if(!this.started||!this.enabled)return;const t=this.ctx.currentTime,e=this.ctx.createStereoPanner?this.ctx.createStereoPanner():null;e&&(e.pan.value=Math.random()*2-1,e.connect(this.master));const n=2+Math.floor(Math.random()*4),i=1750+Math.random()*1400;for(let r=0;r<n;r++){const a=this.ctx.createOscillator(),o=this.ctx.createGain();a.type="sine";const l=t+r*(.075+Math.random()*.05);a.frequency.setValueAtTime(i*(.9+Math.random()*.3),l),a.frequency.exponentialRampToValueAtTime(i*(1.25+Math.random()*.35),l+.045),a.frequency.exponentialRampToValueAtTime(i*.85,l+.1),this._env(o,l,.005,.09,.022),a.connect(o),e?o.connect(e):o.connect(this.master),a.start(l),a.stop(l+.15)}}cricket(){if(!this.started||!this.enabled)return;const t=this.ctx.currentTime,e=3800+Math.random()*900;for(let n=0;n<3;n++){const i=this.ctx.createOscillator(),r=this.ctx.createGain();i.type="triangle";const a=t+n*.085;i.frequency.value=e,this._env(r,a,.003,.035,.009),i.connect(r).connect(this.master),i.start(a),i.stop(a+.06)}}footstep(t=!1){if(!this.started||!this.enabled)return;const e=this.ctx.currentTime,n=this._noiseSource(),i=this.ctx.createBiquadFilter();i.type="lowpass",i.frequency.value=650+Math.random()*350;const r=this.ctx.createGain();this._env(r,e,.004,.07,t?.01:.035),n.connect(i).connect(r).connect(this.master),n.start(e,Math.random()*2,.1)}bite(){if(!this.started||!this.enabled)return;const t=this.ctx.currentTime,e=this._noiseSource(),n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(1900,t),n.frequency.exponentialRampToValueAtTime(380,t+.12),n.Q.value=1.2;const i=this.ctx.createGain();this._env(i,t,.003,.13,.14),e.connect(n).connect(i).connect(this.master),e.start(t,Math.random()*2,.2);const r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="triangle",r.frequency.setValueAtTime(170,t),r.frequency.exponentialRampToValueAtTime(60,t+.12),this._env(a,t,.004,.14,.12),r.connect(a).connect(this.master),r.start(t),r.stop(t+.2)}claw(){if(!this.started||!this.enabled)return;const t=this.ctx.currentTime,e=this._noiseSource(),n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(900,t),n.frequency.exponentialRampToValueAtTime(2600,t+.1),n.Q.value=2;const i=this.ctx.createGain();this._env(i,t,.006,.12,.09),e.connect(n).connect(i).connect(this.master),e.start(t,Math.random()*2,.15)}chomp(){if(!this.started||!this.enabled)return;const t=this.ctx.currentTime;for(let e=0;e<2;e++){const n=this._noiseSource(),i=this.ctx.createBiquadFilter();i.type="lowpass",i.frequency.value=480;const r=this.ctx.createGain();this._env(r,t+e*.11,.004,.09,.13),n.connect(i).connect(r).connect(this.master),n.start(t+e*.11,Math.random()*2,.12)}}gulp(){if(!this.started||!this.enabled)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(260,t),e.frequency.exponentialRampToValueAtTime(90,t+.25),this._env(n,t,.01,.24,.11),e.connect(n).connect(this.master),e.start(t),e.stop(t+.3)}hurt(){if(!this.started||!this.enabled)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sawtooth",e.frequency.setValueAtTime(220,t),e.frequency.exponentialRampToValueAtTime(85,t+.3),this._env(n,t,.01,.3,.08);const i=this.ctx.createBiquadFilter();i.type="lowpass",i.frequency.value=900,e.connect(i).connect(n).connect(this.master),e.start(t),e.stop(t+.35),this.footstep()}growl(){if(!this.started||!this.enabled)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain(),i=this.ctx.createOscillator(),r=this.ctx.createGain();e.type="sawtooth",e.frequency.value=72,i.frequency.value=24,r.gain.value=18,i.connect(r).connect(e.frequency);const a=this.ctx.createBiquadFilter();a.type="lowpass",a.frequency.value=320,this._env(n,t,.02,.45,.09),e.connect(a).connect(n).connect(this.master),e.start(t),i.start(t),e.stop(t+.5),i.stop(t+.5)}pounce(){if(!this.started||!this.enabled)return;const t=this.ctx.currentTime,e=this._noiseSource(),n=this.ctx.createBiquadFilter();n.type="bandpass",n.frequency.setValueAtTime(500,t),n.frequency.exponentialRampToValueAtTime(1800,t+.2),n.Q.value=1.4;const i=this.ctx.createGain();this._env(i,t,.02,.25,.06),e.connect(n).connect(i).connect(this.master),e.start(t,Math.random()*2,.3)}levelComplete(){if(!this.started||!this.enabled)return;const t=this.ctx.currentTime;[392,493.88,587.33,783.99].forEach((n,i)=>{const r=this.ctx.createOscillator(),a=this.ctx.createGain();r.type="sine",r.frequency.value=n,this._env(a,t+i*.11,.02,.55,.045),r.connect(a).connect(this.master),r.start(t+i*.11),r.stop(t+i*.11+.6)})}death(){if(!this.started||!this.enabled)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(220,t),e.frequency.exponentialRampToValueAtTime(55,t+1.2),this._env(n,t,.04,1.15,.1),e.connect(n).connect(this.master),e.start(t),e.stop(t+1.3)}click(){if(this.started||this.init(),!this.started||!this.enabled)return;const t=this.ctx.currentTime,e=this.ctx.createOscillator(),n=this.ctx.createGain();e.type="sine",e.frequency.setValueAtTime(440,t),e.frequency.exponentialRampToValueAtTime(260,t+.07),this._env(n,t,.003,.07,.03),e.connect(n).connect(this.master),e.start(t),e.stop(t+.1)}}class Z0{constructor(t){this.scene=t,this.points=[],this.rings=[]}burst(t,e=15774815,n=22,i=4.4,r=.22,a=.8,o=-5){const l=new Float32Array(n*3),c=[];for(let p=0;p<n;p++){l[p*3]=t.x,l[p*3+1]=t.y,l[p*3+2]=t.z;const g=Math.random()*Math.PI*2,y=Math.random()*Math.PI,d=i*(.35+Math.random()*.8);c.push(new P(Math.sin(y)*Math.cos(g)*d,Math.abs(Math.cos(y))*d*.8,Math.sin(y)*Math.sin(g)*d))}const h=new le;h.setAttribute("position",new Ae(l,3));const f=new ui({size:r,map:hi(),color:e,transparent:!0,opacity:1,depthWrite:!1,blending:en,sizeAttenuation:!0}),u=new Oi(h,f);u.frustumCulled=!1,this.scene.add(u),this.points.push({pts:u,vel:c,life:a,maxLife:a,gravity:o,positions:l})}dust(t,e=10126944,n=8){this.burst(new P(t.x,t.y+.08,t.z),e,n,1.3,.34,.55,-.6)}ring(t,e=15774815,n=1.4,i=.45,r=Math.PI*2){const a=new Vi(n*.45,n,24,1,0,r),o=new yn({color:e,transparent:!0,opacity:.8,side:ke,depthWrite:!1,blending:en}),l=new Nt(a,o);l.rotation.x=-Math.PI/2,l.position.set(t.x,t.y+.06,t.z),l.renderOrder=6,this.scene.add(l),this.rings.push({mesh:l,life:i,maxLife:i,base:n})}swipe(t,e){const n=new Vi(.9,1.7,18,1,-.8,1.6),i=new yn({color:16767392,transparent:!0,opacity:.55,side:ke,depthWrite:!1,blending:en}),r=new Nt(n,i);r.position.set(t.x,t.y+.5,t.z),r.rotation.set(-Math.PI/2,0,-e+.8),r.renderOrder=7,this.scene.add(r),this.rings.push({mesh:r,life:.26,maxLife:.26,base:1,swipe:!0})}update(t){for(let e=this.points.length-1;e>=0;e--){const n=this.points[e];n.life-=t;const i=n.positions;for(let r=0;r<n.vel.length;r++){const a=n.vel[r];a.y+=n.gravity*t,i[r*3]+=a.x*t,i[r*3+1]+=a.y*t,i[r*3+2]+=a.z*t,a.multiplyScalar(1-t*1.3)}n.pts.geometry.attributes.position.needsUpdate=!0,n.pts.material.opacity=Math.max(0,n.life/n.maxLife),n.life<=0&&(this.scene.remove(n.pts),n.pts.geometry.dispose(),n.pts.material.dispose(),this.points.splice(e,1))}for(let e=this.rings.length-1;e>=0;e--){const n=this.rings[e];n.life-=t;const i=1-n.life/n.maxLife;n.swipe?(n.mesh.scale.setScalar(1+i*.4),n.mesh.material.opacity=Math.max(0,.55*(1-i))):(n.mesh.scale.setScalar(.6+i*.9),n.mesh.material.opacity=Math.max(0,.8*(1-i))),n.life<=0&&(this.scene.remove(n.mesh),n.mesh.geometry.dispose(),n.mesh.material.dispose(),this.rings.splice(e,1))}}clear(){for(const t of this.points)this.scene.remove(t.pts),t.pts.geometry.dispose(),t.pts.material.dispose();for(const t of this.rings)this.scene.remove(t.mesh),t.mesh.geometry.dispose(),t.mesh.material.dispose();this.points.length=0,this.rings.length=0}}const Q0={wolf:["The Grey King","Old Frostjaw","Hollow Alpha","The Pale Fang"],boar:["Rootback the Terrible","Old Iron Tusk","The Bramble Boar","Cinder Snout"],badger:["The Grinning Badger","Brambleclaw","The Iron Biter","Mossjaw"]};class j0{constructor(t){this.canvas=t,this.save=X0(),this.quality=this.resolveQuality(this.save.settings.quality),this.renderer=new C0({canvas:t,antialias:!0,powerPreference:"high-performance",alpha:!1,stencil:!1}),this.softwareRenderer=this.detectSoftwareRenderer(),this.softwareRenderer&&(this.quality="low"),this.renderer.setPixelRatio(this.pixelRatioFor(this.quality)),this.renderer.outputColorSpace=Pe,this.renderer.toneMapping=to,this.renderer.toneMappingExposure=1.06,this.renderer.shadowMap.enabled=!this.softwareRenderer&&this.quality!=="low",this.renderer.shadowMap.type=ls,this.renderer.setClearColor(659982,1),this.camera=new hn(58,window.innerWidth/window.innerHeight,.1,420),this.scene=null,this.world=null,this.effects=null,this.creatures=[],this.pendingRemove=[],this.mode="boot",this.panelSource="menu",this.levelDone=!1,this.levelElapsed=0,this.time=0,this.shake=0,this.fpsSamples=[],this.lowFpsTime=0,this.resetArmed=!1,this.pup=new G0,this.pup.root.scale.setScalar(.93),this.ui=new K0(this),this.audio=new J0,this.input=new k0(this),this.player={position:new P,heading:0,speed:0,hp:100,maxLife:100,hunger:90,dead:!1,pounce:null,jump:0,stepT:0,moving:!1},this.aiProxy={position:new P(500,0,500),dead:!0},this.camLook=new P(0,1.2,0),this.camWant=new P,this.counts={prey:0,beasts:0},this.target=null,this.boss=null,this.cooldowns={bite:{remaining:0,cooldown:.46},paw:{remaining:0,cooldown:.72},pounce:{remaining:0,cooldown:2.4}},this.audio.enabled=this.save.settings.sound!==!1,this.ui.setSoundIcon(),this.resize(),this.bindResize(),this.bindVisibility(),this._lastHud=0,this._lastFrame=performance.now(),this._loop=this._loop.bind(this)}resolveQuality(t){return t==="high"||t==="low"?t:window.matchMedia?.("(pointer: coarse)")?.matches||window.innerWidth<820?"medium":"high"}detectSoftwareRenderer(){try{const t=this.renderer.getContext(),e=t.getExtension("WEBGL_debug_renderer_info"),n=String(e?t.getParameter(e.UNMASKED_RENDERER_WEBGL):t.getParameter(t.RENDERER));return/swiftshader|llvmpipe|software|basic render/i.test(n)}catch{return!1}}pixelRatioFor(t){const e=window.devicePixelRatio||1;return t==="low"?1:t==="high"?Math.min(e,1.75):Math.min(e,1.35)}async boot(){this.ui.setLoading(.12,"Waking the woods…"),await new Promise(e=>requestAnimationFrame(e));const t=Xl(this.save.unlocked);this.ui.setLoading(.35,`Finding trail ${String(t.level).padStart(3,"0")}…`),await new Promise(e=>setTimeout(e,40)),this.loadLevel(t.level,!0),this.ui.setLoading(.82,"Waking the rabbits…"),await new Promise(e=>requestAnimationFrame(e)),this.ui.refreshMenu(this.save,this.info),this.ui.showMenu(!0),this.ui.showHUD(!1),this.ui.setLoading(1,"The trail is ready."),await new Promise(e=>setTimeout(e,420)),this.ui.hideLoading(),this.mode="menu",this.clock=performance.now(),requestAnimationFrame(this._loop)}loadLevel(t,e=!1){this.world&&(this.effects?.clear(),this.scene?.remove(this.pup.root),this.world.dispose(),this.scene=null,this.world=null,this.effects=null),this.creatures=[],this.target=null,this.boss=null,this.levelDone=!1,this.levelElapsed=0,this.attract=e,this.info=Xl(t),this.level=this.info.level,this.world=new B0(this.info,this.renderer,this.quality),this.scene=this.world.scene,this.effects=new Z0(this.scene),this.rimLight=new Ja(12577279,.72),this.rimTarget=new xe,this.rimLight.target=this.rimTarget,this.scene.add(this.rimLight,this.rimTarget);const n=this.player;n.maxLife=100+Dt(this.save.vitality||0,0,100),n.hp=n.maxLife,n.hunger=88,n.dead=!1,n.speed=0,n.pounce=null,n.jump=0,n.heading=0,n.stepT=0,n.position.set(0,this.world.heightAt(0,0),0),this.pup.root.position.copy(n.position),this.pup.root.rotation.set(0,0,0),this.pup.rig.rotation.set(0,0,0),this.pup.rig.position.set(0,0,0),this.pup.dead=!1,this.pup.biteT=0,this.pup.eatT=0,this.pup.hurtT=0,this.pup.pawT=0,this.scene.add(this.pup.root),this.counts={prey:0,beasts:0},this.cooldowns.bite.remaining=0,this.cooldowns.paw.remaining=0,this.cooldowns.pounce.remaining=0,this.spawnCreatures();const i=new Nt(new Vi(.62,.78,32),new yn({color:15774815,transparent:!0,opacity:.6,side:ke,depthWrite:!1,blending:en}));if(i.rotation.x=-Math.PI/2,i.visible=!1,i.renderOrder=5,this.scene.add(i),this.targetRing=i,this.ui.setLevelChrome(this.info),this.ui.updateCooldowns(this.cooldowns.bite,this.cooldowns.paw,this.cooldowns.pounce),this.ui.el["boss-wrap"].hidden=!0,this.ui.el["target-tag"].hidden=!0,this.camLook.set(n.position.x,n.position.y+1.2,n.position.z),e)this.camera.position.set(Math.sin(.62)*6.1,2.6,Math.cos(.62)*6.1),this.camera.lookAt(n.position.x-.7,n.position.y+1.15,n.position.z-.2),this.camLook.set(n.position.x-.7,n.position.y+1.15,n.position.z-.2),this.camera.fov=43;else{const r=this.playerCameraDistance()+1.3;this.camera.position.set(n.position.x,n.position.y+2.4,n.position.z-r),this.camLook.set(n.position.x,n.position.y+1.3,n.position.z+2.1),this.camera.fov=this.playerFov(0)}this.camera.updateProjectionMatrix(),this.audio.setNight(Yl(this.world.time))}spawnCreatures(){const t=this.info,e=this.world,n=go(t.seed+991),i=[],r=(o,l,c,h)=>{let f,u;if(h)f=h[0],u=h[1];else{let g=0;do{const y=e.openSpot(n,l,c,1.4);f=y.x,u=y.z,g++}while(g<20&&(Math.hypot(f,u)<7||i.some(y=>Math.hypot(y.root.position.x-f,y.root.position.z-u)<2.6)))}const p=new Vl(o,t,e,this.scene,f,u,!1);return p.onAttack=g=>this.onCreatureAttack(g),p.onDeath=g=>this.onCreatureDeath(g),i.push(p),p},a=t.level===1?[[-2.5,8.6],[3.4,10.6],[-7.4,13.8],[7.8,9.2],[-1.6,17.2]]:null;for(let o=0;o<t.preySpawn;o++){const l=o===t.preySpawn-1&&t.level>12&&n()>.72?"deer":"rabbit";r(l,8,30,a?a[o%a.length]:null)}for(let o=0;o<t.beastSpawn;o++){let l;const c=n();t.level<8||c<.34?l="fox":c<.62?l="badger":c<.85?l="wolf":l="boar",r(l,13,34,t.level===1&&o===0?[5.6,19.2]:null)}if(t.boss){const o=new Vl(t.bossType,t,e,this.scene,0,19,!0),l=Q0[t.bossType]||["The Hollow Alpha"];o.name=l[(t.chapter-1)%l.length],o.onAttack=c=>this.onCreatureAttack(c),o.onDeath=c=>this.onCreatureDeath(c),i.push(o),this.boss=o,this.ui.toast(`<strong>${o.name}</strong> has caught your scent`,"warn")}this.creatures=i,e.creatures=i}playerCameraDistance(){const t=window.innerWidth/Math.max(1,window.innerHeight);return t<.85?7:t<1.2?6.2:5.7}playerFov(t){return(window.innerWidth<window.innerHeight?66:58)+Dt(t/8,0,1)*4}startFromMenu(){this.audio.init(),this.ui.showMenu(!1),this.ui.hideAllPanels(),this.ui.showHUD(!0),this.mode="play",this.levelDone=!1,this.audio.setEnabled(this.audio.enabled),this.ui.showLevelBanner(this.info,this.boss);const t=this.info.level===1?"Push the stick to run <span>·</span> BITE to hunt <span>·</span> Eat or your life drains":"Stay fed <span>·</span> Every meal raises your life <span>·</span> Clear the trail";this.ui.showTip(t,9e3),this.save.seenIntro=!0,this.persist()}async startLevel(t,e="play"){this._switching||(this._switching=!0,this.ui.hideAllPanels(),this.ui.whiteFlash(),await new Promise(n=>setTimeout(n,80)),this.loadLevel(Dt(t,1,We),e==="menu"),e==="play"?(this.ui.showMenu(!1),this.ui.showHUD(!0),this.mode="play",this.audio.init(),this.ui.showLevelBanner(this.info,this.boss),this.ui.showTip(this.tipForLevel(),7500)):(this.ui.showHUD(!1),this.ui.showMenu(!0),this.mode="menu",this.ui.refreshMenu(this.save,this.info)),this._switching=!1)}tipForLevel(){return this.info.boss?"The alpha will not run <span>·</span> Paw to push it back <span>·</span> Bite when it lunges":this.info.level<=3?"Push the stick to run <span>·</span> BITE to hunt <span>·</span> Eat or your life drains":this.info.phaseKey==="night"||this.info.phaseKey==="deepnight"?"Night eyes are watching <span>·</span> Keep moving <span>·</span> Follow the golden dots on your map":"Stay fed <span>·</span> Every meal raises your life <span>·</span> Clear the trail"}nextLevel(){if(this.ui.hideAllPanels(),this.level>=We){this.openLevels();return}this.startLevel(this.level+1)}replayLevel(){this.ui.hideAllPanels(),this.startLevel(this.level)}openLevels(){this.panelSource=this.mode==="paused"?"pause":this.mode==="play"?"play":"menu",this.mode==="play"&&(this.mode="paused"),this.ui.setupLevelSelect(this.save,this.level,Math.floor((this.level-1)/wn)+1,this.level),this.ui.openPanel("screen-levels"),this.audio.click()}closeLevels(){this.ui.closePanel("screen-levels"),this.restoreFromPanel()}openSettings(){this.panelSource=this.mode==="paused"?"pause":this.mode==="play"?"play":"menu",this.mode==="play"&&(this.mode="paused"),this.ui.populateSettings(this.save.settings,this.audio.enabled),this.ui.openPanel("screen-settings"),this.audio.click()}closeSettings(){if(this.ui.closePanel("screen-settings"),this.panelSource==="pause"){this.ui.showPause(this.info,this.stats()),this.mode="paused";return}this.restoreFromPanel()}restoreFromPanel(){this.panelSource==="play"?(this.mode="play",this.ui.hideAllPanels()):this.panelSource==="pause"?(this.mode="paused",this.ui.showPause(this.info,this.stats())):(this.mode="menu",this.ui.hideAllPanels(),this.ui.showMenu(!0))}changeChapter(t){const e=Math.ceil(We/wn);let n=Dt(this.ui.chapter+t,1,e);const i=(n-1)*wn+1,r=Math.min(We,n*wn),a=Dt(this.level,i,r);this.ui.setupLevelSelect(this.save,this.level,n,a)}playSelectedLevel(){const t=this.ui.selectedLevel;t>this.save.unlocked||(this.ui.hideAllPanels(),this.startLevel(t))}togglePause(t){if(!(this.mode==="menu"||this.mode==="complete"||this.mode==="dead"||this.mode==="boot")){if(this.mode==="paused"){(t===!1||t===void 0)&&(this.mode="play",this.ui.hideAllPanels());return}this.mode==="play"&&(this.mode="paused",this.ui.showPause(this.info,this.stats()),this.audio.click())}}stats(){return{feasts:this.counts.prey,beasts:this.counts.beasts,life:this.player.hp,time:this.formatTime(this.levelElapsed)}}formatTime(t){const e=Math.floor(t/60),n=Math.floor(t%60);return`${e}:${String(n).padStart(2,"0")}`}quitToMenu(){this.ui.hideAllPanels(),this.ui.showHUD(!1),this.mode="menu",this.startLevel(this.save.unlocked,"menu")}toggleSound(){this.audio.init(),this.audio.setEnabled(!this.audio.enabled),this.save.settings.sound=this.audio.enabled,this.persist(),this.ui.setSoundIcon(),this.ui.populateSettings(this.save.settings,this.audio.enabled),this.ui.toast(this.audio.enabled?"Sound on":"Sound off")}async toggleTilt(){if(this.input.tiltEnabled){this.input.disableTilt(),this.setTiltSetting(!1,"Off"),this.ui.toast("Tilt steering off");return}this.ui.setTiltStatus("Requesting motion access…");const t=await this.input.requestTilt();t.ok?(this.setTiltSetting(!0,"On · tilt to steer"),this.ui.toast("Tilt steering on <strong>·</strong> hold level and lean")):(this.setTiltSetting(!1,t.reason||"Unavailable"),this.ui.toast(t.reason||"Motion access is not available","warn"))}setTiltSetting(t,e){this.save.settings.tilt=t,this.persist();const n=document.getElementById("toggle-tilt");n&&(n.classList.toggle("on",t),n.setAttribute("aria-checked",String(t))),this.ui.setTiltStatus(e)}setSensitivity(t){this.save.settings.sensitivity=Dt(t,.6,1.6),this.persist()}setQuality(t){this.save.settings.quality=t,this.quality=this.resolveQuality(t),this.renderer.setPixelRatio(this.pixelRatioFor(this.quality)),this.resize(),this.persist(),this.ui.populateSettings(this.save.settings,this.audio.enabled),this.ui.toast(`Graphics: ${t==="auto"?"Auto":t==="high"?"High":"Lite"}`)}async toggleFullscreen(){try{document.fullscreenElement?await document.exitFullscreen():await document.documentElement.requestFullscreen(),this.ui.toast("Fullscreen toggled")}catch{this.ui.toast("Fullscreen is not available on this device","warn")}}resetProgress(){if(!this.resetArmed){this.resetArmed=!0,this.ui.toast("Tap <strong>Reset progress</strong> again to erase all trails","warn"),setTimeout(()=>{this.resetArmed=!1},4e3);return}this.resetArmed=!1,Y0(),this.save=rr(),this.save.settings.sound=this.audio.enabled,this.persist(),this.ui.hideAllPanels(),this.startLevel(1,"menu"),this.ui.toast("Every trail has been erased")}canControl(){return this.mode==="play"&&!this.levelDone&&!this.player.dead}doAction(t){this.canControl()&&(t==="bite"?this.doBite():t==="paw"?this.doPaw():t==="pounce"&&this.doPounce())}acquireTarget(t=7){const e=this.player.position,n=Math.sin(this.player.heading),i=Math.cos(this.player.heading);let r=null,a=1/0;for(const o of this.creatures){if(o.dead)continue;const l=o.root.position.x-e.x,c=o.root.position.z-e.z,h=Math.hypot(l,c);if(h>t)continue;const f=(l*n+c*i)/Math.max(.001,h);if(f<.12)continue;let u=h-f*1.4;o===this.target&&(u-=1.2),o.spec.prey&&(u-=.5),u<a&&(a=u,r=o)}return r}doBite(){const t=this.cooldowns.bite;if(t.remaining>0)return;t.remaining=t.cooldown,this.pup.bite(),this.audio.bite(),this.ui.flashAbility("btn-bite");const e=this.acquireTarget(8.2);if(!e)return;const n=e.root.position.x-this.player.position.x,i=e.root.position.z-this.player.position.z,r=Math.hypot(n,i);if(r>4.4||(n*Math.sin(this.player.heading)+i*Math.cos(this.player.heading))/Math.max(.001,r)<-.1)return;this.player.heading=Yc(this.player.heading,Math.atan2(n,i),20,.05);const o=23+Dt((this.player.maxLife-100)*.16,0,20)+this.level*.035;e.hit(o,this.player.position,2.2),this.hitFeedback(e,o),this.shake=Math.max(this.shake,.16),e.dead||this.ui.hitmark()}doPaw(){const t=this.cooldowns.paw;if(t.remaining>0)return;t.remaining=t.cooldown,this.pup.paw(),this.audio.claw(),this.ui.flashAbility("btn-paw");const e=Math.sin(this.player.heading),n=Math.cos(this.player.heading);let i=0;for(const a of this.creatures){if(a.dead)continue;const o=a.root.position.x-this.player.position.x,l=a.root.position.z-this.player.position.z,c=Math.hypot(o,l);if(c>4.2+a.radius||(o*e+l*n)/Math.max(.001,c)<.1)continue;const f=14+Dt((this.player.maxLife-100)*.1,0,12)+this.level*.02;a.hit(f,this.player.position,5.2),this.hitFeedback(a,f,!0),i++}const r=this.player.position.clone().add(new P(e*1.7,.1,n*1.7));this.effects.swipe(r,this.player.heading),i&&(this.shake=Math.max(this.shake,.2),this.ui.hitmark())}doPounce(){const t=this.cooldowns.pounce;t.remaining>0||this.player.pounce||(t.remaining=t.cooldown,this.player.pounce={t:0,dur:.66,hit:!1},this.audio.pounce(),this.ui.flashAbility("btn-pounce"),this.effects.ring(this.player.position,10479832,1.2,.4))}hitFeedback(t,e,n=!1){const i=t.root.position.clone();i.y+=t.spec.height*t.scaleValue*.65,this.effects.burst(i,n?11135197:16761208,n?12:18,4.5,.2,.55),this.effects.burst(i,16773841,6,2.2,.12,.32),this.ui.floatWorld(i,this.camera,`-${Math.round(e)}`,n?"":"damage"),this.audio.chomp(),t.dead&&!t.spec.prey&&t.boss&&this.ui.whiteFlash()}onCreatureAttack(t){this.canControl()&&this.damagePlayer(t.damage,t)}damagePlayer(t,e){if(this.player.dead||this.levelDone)return;this.player.hp-=t,this.pup.hurt(),this.audio.hurt(),this.ui.damageFlash(t/18),this.shake=Math.max(this.shake,.36);const n=this.player.position.clone();n.y+=1.2,this.effects.burst(n,14902104,14,3.2,.18,.5),this.ui.floatWorld(n,this.camera,`-${Math.round(t)}`,"damage"),this.player.hp<=0&&(this.player.hp=0,this.die(e?.name||e?.spec?.name||"the wild"))}onCreatureDeath(t){if(this.levelDone)return;const e=t.spec.food+Math.floor(this.level/25)*2,n=t.spec.hunger;t.spec.prey?this.counts.prey+=1:this.counts.beasts+=1;const i=t.spec.prey?2:3;this.player.maxLife=Math.min(200,this.player.maxLife+i),this.player.hp=Math.min(this.player.maxLife,this.player.hp+e),this.player.hunger=Math.min(100,this.player.hunger+n),this.save.totalFeasts=(this.save.totalFeasts||0)+1,this.save.vitality=Dt(Math.round(this.player.maxLife-100),0,100),this.save.bestLife=Math.max(this.save.bestLife||0,Math.round(this.player.hp)),this.persist(),this.pup.eat(),this.audio.chomp(),setTimeout(()=>this.audio.gulp(),150),this.ui.healFlash();const r=t.root.position.clone();r.y+=t.spec.height*t.scaleValue+.2,this.ui.floatWorld(r,this.camera,`+${e} LIFE`,"");const a=r.clone();a.y+=.35,this.ui.floatWorld(a,this.camera,`+${n} HUNGER`,"gold"),this.effects.burst(r,7332815,24,4,.22,.9),this.effects.ring(t.root.position,7332815,1.8,.55),this.shake=Math.max(this.shake,.08),t.boss&&(this.ui.toast(`<strong>${t.name}</strong> falls. The forest exhales.`),this.ui.whiteFlash()),t.removeAt=this.time+2.1,this.checkComplete()}checkComplete(){this.levelDone||this.counts.prey>=this.info.preyGoal&&this.counts.beasts>=this.info.beastGoal&&this.completeLevel()}completeLevel(){this.levelDone=!0,this.mode="complete",this.ui.hideTip(),this.ui.whiteFlash(),this.audio.levelComplete(),this.save.cleared.includes(this.level)||this.save.cleared.push(this.level),this.save.cleared.sort((e,n)=>e-n),this.save.unlocked=Math.max(this.save.unlocked,Math.min(We,this.level+1)),this.save.vitality=Dt(Math.round(this.player.maxLife-100),0,100),this.save.bestLife=Math.max(this.save.bestLife||0,Math.round(this.player.hp)),this.persist(),this.ui.toast(`Trail <strong>${String(this.level).padStart(3,"0")}</strong> cleared`);const t=this.stats();setTimeout(()=>{if(this.mode!=="complete")return;this.ui.showComplete(this.info,t);const e=this.ui.el["btn-next"]?.querySelector(".btn-label");e&&(e.textContent=this.level>=We?"Back to the map":"Next trail")},1050)}die(t){this.player.dead||(this.player.dead=!0,this.pup.dead=!0,this.mode="dead",this.ui.hideTip(),this.audio.death(),this.shake=.5,setTimeout(()=>{this.mode==="dead"&&this.ui.showDead(this.info,this.stats(),`The ${t} took you before the trail was done. Eat sooner, and eat more.`)},1300))}persist(){q0(this.save)}updatePlayer(t){const e=this.player,n=this.input,i=this.save.settings.sensitivity||1,r=n.sprint;if(this.cooldowns.bite.remaining=Math.max(0,this.cooldowns.bite.remaining-t),this.cooldowns.paw.remaining=Math.max(0,this.cooldowns.paw.remaining-t),this.cooldowns.pounce.remaining=Math.max(0,this.cooldowns.pounce.remaining-t),e.dead)return;const a=!!e.pounce;let o=(2.4+(r?.35:0))*i;a&&(o*=.3),e.heading+=n.steer*o*t,e.heading=((e.heading+Math.PI)%(Math.PI*2)+Math.PI*2)%(Math.PI*2)-Math.PI;const l=r?8.7:5.5;let c=n.throttle>0?n.throttle*l:n.throttle*3;a&&(c=10.5),e.speed=En(e.speed,c,a?18:9,t);const h=Math.sin(e.heading),f=Math.cos(e.heading),u=e.speed*t;Math.abs(e.speed)>.08&&(e.position.x+=h*u,e.position.z+=f*u);let p=0;if(e.pounce){e.pounce.t+=t/e.pounce.dur;const d=Dt(e.pounce.t,0,1);if(p=Math.sin(d*Math.PI)*1.15,!e.pounce.hit&&d>.32){e.pounce.hit=!0,e.position.clone();let m=!1;for(const x of this.creatures){if(x.dead)continue;if(Math.hypot(x.root.position.x-e.position.x,x.root.position.z-e.position.z)<3.3+x.radius){const S=21+Dt((e.maxLife-100)*.12,0,16)+this.level*.03;x.hit(S,e.position,6.4),this.hitFeedback(x,S),m=!0}}this.effects.ring(e.position,12449254,2.7,.5),this.audio.claw(),m&&(this.shake=Math.max(this.shake,.3),this.ui.hitmark())}e.pounce.t>=1&&(e.pounce=null)}e.jump=p;for(const d of this.world.colliders){const m=e.position.x-d.x,x=e.position.z-d.z,T=Math.hypot(m,x),S=d.r+.36;if(T<S&&T>.001){const b=S-T;e.position.x+=m/T*b,e.position.z+=x/T*b}}const g=Math.hypot(e.position.x,e.position.z);if(g>39.5&&(e.position.x=e.position.x/g*39.5,e.position.z=e.position.z/g*39.5),e.position.y=this.world.heightAt(e.position.x,e.position.z)+p,e.moving=Math.abs(e.speed)>.4,this.pup.root.position.copy(e.position),this.pup.root.rotation.y=e.heading,e.stepT+=Math.abs(e.speed)*t,e.stepT>1.8&&e.moving&&(e.stepT=0,this.audio.footstep(r),Math.abs(e.speed)>3)){const d=e.position.x-h*.4,m=e.position.z-f*.4;this.effects.dust({x:d,y:this.world.heightAt(d,m),z:m},10390892,r?4:2)}const y=.62+(r&&e.moving?.2:0)+(e.moving?.15:0);e.hunger=Math.max(0,e.hunger-y*t*(.9+this.level*5e-4)),e.hunger<=0&&(e.hp-=t*5.4,e.hp<=0&&(e.hp=0,this.die("hunger"))),e.hp>e.maxLife&&(e.hp=e.maxLife),this.levelElapsed+=t}updateCamera(t){const e=this.player;if(this.rimLight&&(this.rimLight.position.set(this.camera.position.x,this.camera.position.y+1.6,this.camera.position.z),this.rimTarget.position.set(e.position.x,e.position.y+.9,e.position.z)),this.mode==="menu"){const u=this.time,p=.62+Math.sin(u*.07)*.1,g=6.1+Math.sin(u*.11)*.18,y=new P(e.position.x+Math.sin(p)*g,e.position.y+2.6+Math.sin(u*.18)*.08,e.position.z+Math.cos(p)*g),d=new P(e.position.x-.7,e.position.y+1.15,e.position.z-.2);this.camera.position.lerp(y,1-Math.exp(-t*2.4)),this.camLook.lerp(d,1-Math.exp(-t*3.4)),this.camera.lookAt(this.camLook),this.camera.fov=En(this.camera.fov,43,2,t),this.camera.updateProjectionMatrix();return}if(this.mode==="complete"){const p=this.time*.35+.8,g=4,y=new P(e.position.x+Math.sin(p)*g,e.position.y+1.75,e.position.z+Math.cos(p)*g),d=new P(e.position.x,e.position.y+1.15,e.position.z);this.camera.position.lerp(y,1-Math.exp(-t*2.2)),this.camLook.lerp(d,1-Math.exp(-t*4)),this.camera.lookAt(this.camLook),this.camera.fov=En(this.camera.fov,48,2,t),this.camera.updateProjectionMatrix();return}const n=Math.sin(e.heading),i=Math.cos(e.heading);let r=this.playerCameraDistance();this.mode==="dead"&&(r+=1.4);const a=this.mode==="dead"?1.8:2.75,o=new P(e.position.x-n*r,e.position.y+a,e.position.z-i*r),l=this.world.heightAt(o.x,o.z);o.y=Math.max(o.y,l+1.1);const c=new P(e.position.x+n*2.5,e.position.y+(this.mode==="dead"?.55:1.34+e.jump*.3),e.position.z+i*2.5),h=this.mode==="dead"?2.2:4.6;this.camera.position.lerp(o,1-Math.exp(-t*h)),this.camLook.lerp(c,1-Math.exp(-t*(this.mode==="dead"?2.6:6)));const f=this.shake;f>.001&&(this.camera.position.x+=(Math.random()-.5)*f*.3,this.camera.position.y+=(Math.random()-.5)*f*.22,this.camera.position.z+=(Math.random()-.5)*f*.3,this.camLook.x+=(Math.random()-.5)*f*.18,this.camLook.y+=(Math.random()-.5)*f*.18),this.camera.lookAt(this.camLook),this.camera.fov=En(this.camera.fov,this.playerFov(Math.abs(e.speed)),3,t),this.camera.updateProjectionMatrix(),this.shake*=Math.exp(-t*7)}update(t){if(this.time+=t,this.world?.update(t),this.mode==="paused"||this.mode==="boot")return;const e=this.mode==="menu",n=e?this.aiProxy:this.player;if(!e&&!this.levelDone?(this.input.update(t),this.updatePlayer(t)):e&&(this.input.update(t),this.pup.update(t,this.time,{speed:0,turn:0})),this.mode==="play"&&!this.player.dead&&!this.levelDone){const r=this.acquireTarget(8);r!==this.target&&(this.target&&(this.target.targeted=!1),this.target=r,this.target&&(this.target.targeted=!0))}else this.target&&(this.target.targeted=!1,this.target=null);for(const r of this.creatures)r.dead&&r.removeAt&&this.time>r.removeAt||r.update(t,this.time,n,this.camera);for(let r=this.creatures.length-1;r>=0;r--){const a=this.creatures[r];a.dead&&a.removeAt&&this.time>a.removeAt&&(this.target===a&&(this.target=null),this.boss===a&&(this.boss=null),a.dispose(),this.creatures.splice(r,1),this.world.creatures=this.creatures)}if(!e&&!this.levelDone&&!this.player.dead?this.pup.update(t,this.time,{speed:this.player.speed,turn:this.input.steer,jumpY:0,jumping:!!this.player.pounce}):this.pup.update(t,this.time,{speed:0,turn:0,jumping:!1}),this.targetRing)if(this.target&&!this.target.dead){this.targetRing.visible=!0,this.targetRing.position.set(this.target.root.position.x,this.target.root.position.y+.035,this.target.root.position.z);const r=1+Math.sin(this.time*5)*.06;this.targetRing.scale.setScalar(r*(this.target.boss?1.8:1)),this.targetRing.material.color.setHex(this.target.boss?14902104:15774815)}else this.targetRing.visible=!1;this.target?(this.target.updateBar(this.camera),this.ui.setTarget(this.target,this.camera)):this.ui.setTarget(null,this.camera),this.boss&&this.boss.dead&&(this.ui.el["boss-wrap"].hidden=!0),this.effects.update(t),this.mode==="play"&&!this.levelDone&&!this.player.dead?(this.ui.updateCooldowns(this.cooldowns.bite,this.cooldowns.paw,this.cooldowns.pounce),this.time-this._lastHud>.09&&(this._lastHud=this.time,this.ui.updateHud({player:this.player,level:this.info,counts:this.counts,boss:this.boss&&!this.boss.dead?this.boss:null,time:this.world.time,world:this.world,creatures:this.creatures}))):!e&&!this.levelDone&&this.time-this._lastHud>.25&&(this._lastHud=this.time,this.ui.updateHud({player:this.player,level:this.info,counts:this.counts,boss:this.boss&&!this.boss.dead?this.boss:null,time:this.world.time,world:this.world,creatures:this.creatures})),e||this.ui.setLevelChrome(this.info),this.audio.setNight(Yl(this.world.time)),this.updateCamera(t)}_loop(t){const e=Math.min(.05,Math.max(1e-4,(t-this.clock)/1e3));this.clock=t,this.mode!=="paused"&&this.mode!=="boot"&&this.update(e);try{this.renderer.render(this.scene,this.camera)}catch(n){console.error(n)}requestAnimationFrame(this._loop)}bindResize(){let t=0;window.addEventListener("resize",()=>{clearTimeout(t),t=setTimeout(()=>this.resize(),100)}),window.addEventListener("orientationchange",()=>setTimeout(()=>this.resize(),180))}resize(){const t=window.innerWidth,e=window.innerHeight;this.renderer.setSize(t,e,!1),this.camera.aspect=t/Math.max(1,e),this.camera.updateProjectionMatrix(),this.renderer.setPixelRatio(this.pixelRatioFor(this.quality))}bindVisibility(){document.addEventListener("visibilitychange",()=>{document.hidden&&this.mode==="play"&&this.togglePause(!0)}),window.addEventListener("blur",()=>{this.mode==="play"&&this.togglePause(!0)})}}const tg=document.getElementById("scene");function $l(s){const t=document.getElementById("loading");t&&(t.classList.remove("done"),t.innerHTML=`
    <div class="load-brand" style="letter-spacing:.2em">PUPWILD</div>
    <div style="max-width:420px;text-align:center;font-size:13px;line-height:1.6;color:#b9c6b0;padding:0 24px">
      ${s}
    </div>`)}try{const s=new j0(tg);window.__pupwild=s,s.boot().catch(t=>{console.error(t),$l("The woods could not wake. Please reload, or try a browser with WebGL enabled.")})}catch(s){console.error(s),$l("This device could not start the 3D forest. Please try another browser with WebGL enabled.")}document.addEventListener("contextmenu",s=>{s.target.closest("#app")&&s.preventDefault()});if(window.innerWidth<700&&window.innerHeight>window.innerWidth){const s=document.getElementById("rotate-hint");s&&(s.style.display="flex",setTimeout(()=>{s.style.display="none"},2600),s.addEventListener("pointerdown",()=>{s.style.display="none"}))}
