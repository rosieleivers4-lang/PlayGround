(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const hl="187",xu=0,Bl=1,vu=2,ir=1,Mu=2,Qs=3,ts=0,_n=1,Pn=2,Cs=0,Ps=1,ki=2,zl=3,kl=4,Su=5,Es=100,yu=101,bu=102,Eu=103,Tu=104,wu=200,Au=201,Ru=202,Cu=203,sh=204,rh=205,Pu=206,Lu=207,Du=208,Iu=209,Nu=210,Uu=211,Fu=212,Ou=213,Bu=214,_o=0,xo=1,vo=2,lr=3,Mo=4,So=5,yo=6,bo=7,ah=0,zu=1,ku=2,pi=0,oh=1,lh=2,ch=3,ul=4,hh=5,uh=6,dh=7,fh=300,Ns=301,cr=302,Fa=303,Oa=304,Eo=1e3,Kn=1001,To=1002,sn=1003,Gu=1004,Ar=1005,Tn=1006,Ba=1007,Ui=1008,Ln=1009,ph=1010,mh=1011,hr=1012,dl=1013,si=1014,Zn=1015,ri=1016,fl=1017,pl=1018,Us=1020,gh=35902,_h=35899,xh=1021,vh=1022,ni=1023,Hi=1026,Fi=1027,ml=1028,gl=1029,ns=1030,_l=1031,xl=1033,na=33776,ia=33777,sa=33778,ra=33779,wo=35840,Ao=35841,Ro=35842,Co=35843,Po=36196,Lo=37492,Do=37496,Io=37488,No=37489,ua=37490,Uo=37491,Fo=37808,Oo=37809,Bo=37810,zo=37811,ko=37812,Go=37813,Ho=37814,Vo=37815,Wo=37816,Xo=37817,qo=37818,Yo=37819,$o=37820,Ko=37821,Zo=36492,Jo=36494,Qo=36495,jo=36283,el=36284,da=36285,tl=36286,Hu=3200,nl=0,Vu=1,Ii="",tn="srgb",fa="srgb-linear",pa="linear",wt="srgb",za=7680,Wu=519,Xu=512,qu=513,Yu=514,Mh=515,$u=516,Ku=517,Sh=518,yh=519,Zu=35044,Gl="300 es",Jn=2e3,ur=2001;function Ju(i){for(let e=i.length-1;e>=0;--e)if(i[e]>=65535)return!0;return!1}function ma(i){return document.createElementNS("http://www.w3.org/1999/xhtml",i)}function Qu(){const i=ma("canvas");return i.style.display="block",i}const Hl={};function Vl(...i){const e="THREE."+i.shift();console.log(e,...i)}function bh(i){const e=i[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=i[1];t&&t.isStackTrace?i[0]+=" "+t.getLocation():i[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return i}function je(...i){i=bh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...i)}}function yt(...i){i=bh(i);const e="THREE."+i.shift();{const t=i[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...i)}}function aa(...i){const e=i.join(" ");e in Hl||(Hl[e]=!0,je(...i))}function ju(i,e,t){return new Promise(function(n,s){function r(){switch(i.clientWaitSync(e,i.SYNC_FLUSH_COMMANDS_BIT,0)){case i.WAIT_FAILED:s();break;case i.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const ed={[_o]:_o,[vo]:yo,[Mo]:Mo,[lr]:So,[xo]:xo,[yo]:vo,[bo]:bo,[So]:lr};class os{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const s=n[e];if(s!==void 0){const r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const s=n.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}}const ln=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],ka=Math.PI/180,il=180/Math.PI;function Mr(){const i=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(ln[i&255]+ln[i>>8&255]+ln[i>>16&255]+ln[i>>24&255]+"-"+ln[e&255]+ln[e>>8&255]+"-"+ln[e>>16&15|64]+ln[e>>24&255]+"-"+ln[t&63|128]+ln[t>>8&255]+"-"+ln[t>>16&255]+ln[t>>24&255]+ln[n&255]+ln[n>>8&255]+ln[n>>16&255]+ln[n>>24&255]).toLowerCase()}function mt(i,e,t){return Math.max(e,Math.min(t,i))}function td(i,e){return(i%e+e)%e}function Ga(i,e,t){return(1-t)*i+t*e}function nd(i){return Math.pow(2,Math.floor(Math.log(i)/Math.LN2))}function vl(i){switch(i.constructor){case Uint32Array:return 4294967295;case Uint16Array:return 65535;case Uint8Array:case Uint8ClampedArray:return 255;case Int32Array:return 2147483647;case Int16Array:return 32767;case Int8Array:return 127;default:return}}function id(i,e){if(e.constructor===Float32Array)return i;const t=vl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.max(i/t,-1)}function sd(i,e){if(e.constructor===Float32Array)return i;const t=vl(e);if(t===void 0)throw new Error("THREE.MathUtils: Invalid component type.");return Math.round(i*t)}const Dl=class Dl{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6],this.y=s[1]*t+s[4]*n+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*n-a*s+e.x,this.y=r*s+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};Dl.prototype.isVector2=!0;let rt=Dl;class ls{constructor(e=0,t=0,n=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=s}static slerpFlat(e,t,n,s,r,a,o){let l=n[s+0],c=n[s+1],u=n[s+2],h=n[s+3],d=r[a+0],m=r[a+1],_=r[a+2],v=r[a+3];if(h!==v||l!==d||c!==m||u!==_){let f=l*d+c*m+u*_+h*v;f<0&&(d=-d,m=-m,_=-_,v=-v,f=-f);let p=1-o;if(f<.9995){const x=Math.acos(f),E=Math.sin(x);p=Math.sin(p*x)/E,o=Math.sin(o*x)/E,l=l*p+d*o,c=c*p+m*o,u=u*p+_*o,h=h*p+v*o}else{l=l*p+d*o,c=c*p+m*o,u=u*p+_*o,h=h*p+v*o;const x=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=x,c*=x,u*=x,h*=x}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,n,s,r,a){const o=n[s],l=n[s+1],c=n[s+2],u=n[s+3],h=r[a],d=r[a+1],m=r[a+2],_=r[a+3];return e[t]=o*_+u*h+l*m-c*d,e[t+1]=l*_+u*d+c*h-o*m,e[t+2]=c*_+u*m+o*d-l*h,e[t+3]=u*_-o*h-l*d-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,s){return this._x=e,this._y=t,this._z=n,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),u=o(s/2),h=o(r/2),d=l(n/2),m=l(s/2),_=l(r/2);switch(a){case"XYZ":this._x=d*u*h+c*m*_,this._y=c*m*h-d*u*_,this._z=c*u*_+d*m*h,this._w=c*u*h-d*m*_;break;case"YXZ":this._x=d*u*h+c*m*_,this._y=c*m*h-d*u*_,this._z=c*u*_-d*m*h,this._w=c*u*h+d*m*_;break;case"ZXY":this._x=d*u*h-c*m*_,this._y=c*m*h+d*u*_,this._z=c*u*_+d*m*h,this._w=c*u*h-d*m*_;break;case"ZYX":this._x=d*u*h-c*m*_,this._y=c*m*h+d*u*_,this._z=c*u*_-d*m*h,this._w=c*u*h+d*m*_;break;case"YZX":this._x=d*u*h+c*m*_,this._y=c*m*h+d*u*_,this._z=c*u*_-d*m*h,this._w=c*u*h-d*m*_;break;case"XZY":this._x=d*u*h-c*m*_,this._y=c*m*h-d*u*_,this._z=c*u*_+d*m*h,this._w=c*u*h+d*m*_;break;default:je("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,s=Math.sin(n);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=n+o+h;if(d>0){const m=.5/Math.sqrt(d+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-c)*m,this._z=(a-s)*m}else if(n>o&&n>h){const m=2*Math.sqrt(1+n-o-h);this._w=(u-l)/m,this._x=.25*m,this._y=(s+a)/m,this._z=(r+c)/m}else if(o>h){const m=2*Math.sqrt(1+o-n-h);this._w=(r-c)/m,this._x=(s+a)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+h-n-o);this._w=(a-s)/m,this._x=(r+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(mt(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const s=Math.min(1,t/n);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-n*c,this._z=r*u+a*c+n*l-s*o,this._w=a*u-n*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let n=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){const c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+n*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),s=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Il=class Il{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Wl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Wl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*s,this.y=r[1]*t+r[4]*n+r[7]*s,this.z=r[2]*t+r[5]*n+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*n+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*n+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*n+r[10]*s+r[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*n),u=2*(o*t-r*s),h=2*(r*n-a*t);return this.x=t+l*c+a*h-o*u,this.y=n+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*s,this.y=r[1]*t+r[5]*n+r[9]*s,this.z=r[2]*t+r[6]*n+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-n*l,this.z=n*o-s*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ha.copy(this).projectOnVector(e),this.sub(Ha)}reflect(e){return this.sub(Ha.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(mt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,s=this.z-e.z;return t*t+n*n+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const s=Math.sin(t)*e;return this.x=s*Math.sin(n),this.y=Math.cos(t)*e,this.z=s*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Il.prototype.isVector3=!0;let F=Il;const Ha=new F,Wl=new ls,Nl=class Nl{constructor(e,t,n,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c)}set(e,t,n,s,r,a,o,l,c){const u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],u=n[4],h=n[7],d=n[2],m=n[5],_=n[8],v=s[0],f=s[3],p=s[6],x=s[1],E=s[4],b=s[7],w=s[2],T=s[5],g=s[8];return r[0]=a*v+o*x+l*w,r[3]=a*f+o*E+l*T,r[6]=a*p+o*b+l*g,r[1]=c*v+u*x+h*w,r[4]=c*f+u*E+h*T,r[7]=c*p+u*b+h*g,r[2]=d*v+m*x+_*w,r[5]=d*f+m*E+_*T,r[8]=d*p+m*b+_*g,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-n*r*u+n*o*l+s*r*c-s*a*l}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*r,m=c*r-a*l,_=t*h+n*d+s*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=h*v,e[1]=(s*c-u*n)*v,e[2]=(o*n-s*a)*v,e[3]=d*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=m*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,s,r,a,o){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return aa("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Va.makeScale(e,t)),this}rotate(e){return aa("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Va.makeRotation(-e)),this}translate(e,t){return aa("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Va.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<9;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Nl.prototype.isMatrix3=!0;let et=Nl;const Va=new et,Xl=new et().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),ql=new et().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function rd(){const i={enabled:!0,workingColorSpace:fa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===wt&&(s.r=mi(s.r),s.g=mi(s.g),s.b=mi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===wt&&(s.r=Ls(s.r),s.g=Ls(s.g),s.b=Ls(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Ii?pa:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[a].fromXYZ).multiply(this.spaces[r].toXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return i.define({[fa]:{primaries:e,whitePoint:n,transfer:pa,toXYZ:Xl,fromXYZ:ql,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:tn},outputColorSpaceConfig:{drawingBufferColorSpace:tn}},[tn]:{primaries:e,whitePoint:n,transfer:wt,toXYZ:Xl,fromXYZ:ql,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:tn}}}),i}const pt=rd();function mi(i){return i<.04045?i*.0773993808:Math.pow(i*.9478672986+.0521327014,2.4)}function Ls(i){return i<.0031308?i*12.92:1.055*Math.pow(i,.41666)-.055}let us;class ad{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{us===void 0&&(us=ma("canvas")),us.width=e.width,us.height=e.height;const s=us.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),n=us}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ma("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const s=n.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=mi(r[a]/255)*255;return n.putImageData(s,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(mi(t[n]/255)*255):t[n]=mi(t[n]);return{data:t,width:e.width,height:e.height}}else return je("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let od=0;class Ml{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:od++}),this.uuid=Mr(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width||0,t.height||0,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Wa(s[a].image)):r.push(Wa(s[a]))}else r=Wa(s);n.url=r}return t||(e.images[this.uuid]=n),n}}function Wa(i){return typeof HTMLImageElement<"u"&&i instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&i instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&i instanceof ImageBitmap?ad.getDataURL(i):i.data?{data:Array.from(i.data),width:i.width,height:i.height,type:i.data.constructor.name}:(je("Texture: Unable to serialize Texture."),{})}let ld=0;const Xa=new F;class dn extends os{constructor(e=dn.DEFAULT_IMAGE,t=dn.DEFAULT_MAPPING,n=Kn,s=Kn,r=Tn,a=Ui,o=ni,l=Ln,c=dn.DEFAULT_ANISOTROPY,u=Ii){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:ld++}),this.uuid=Mr(),this.name="",this.source=new Ml(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new rt(0,0),this.repeat=new rt(1,1),this.center=new rt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new et,this.generateMipmaps=!0,this.mipmapsAutoUpdate=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.isPMREMTexture=!1,this.normalized=!1}get width(){return this.source.getSize(Xa).x}get height(){return this.source.getSize(Xa).y}get depth(){return this.source.getSize(Xa).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.mipmapsAutoUpdate=e.mipmapsAutoUpdate,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isPMREMTexture=e.isPMREMTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){je(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){je(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&n&&s.isVector2&&n.isVector2||s&&n&&s.isVector3&&n.isVector3||s&&n&&s.isMatrix3&&n.isMatrix3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,mipmapsAutoUpdate:this.mipmapsAutoUpdate,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==fh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Eo:e.x=e.x-Math.floor(e.x);break;case Kn:e.x=e.x<0?0:1;break;case To:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Eo:e.y=e.y-Math.floor(e.y);break;case Kn:e.y=e.y<0?0:1;break;case To:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}dn.DEFAULT_IMAGE=null;dn.DEFAULT_MAPPING=fh;dn.DEFAULT_ANISOTROPY=1;const Ul=class Ul{constructor(e=0,t=0,n=0,s=1){this.x=e,this.y=t,this.z=n,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,s){return this.x=e,this.y=t,this.z=n,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*n+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*n+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*n+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,s,r;const l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],m=l[5],_=l[9],v=l[2],f=l[6],p=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-v)<.01&&Math.abs(_-f)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+v)<.1&&Math.abs(_+f)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,b=(m+1)/2,w=(p+1)/2,T=(u+d)/4,g=(h+v)/4,y=(_+f)/4;return E>b&&E>w?E<.01?(n=0,s=.707106781,r=.707106781):(n=Math.sqrt(E),s=T/n,r=g/n):b>w?b<.01?(n=.707106781,s=0,r=.707106781):(s=Math.sqrt(b),n=T/s,r=y/s):w<.01?(n=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),n=g/r,s=y/r),this.set(n,s,r,t),this}let x=Math.sqrt((f-_)*(f-_)+(h-v)*(h-v)+(d-u)*(d-u));return Math.abs(x)<.001&&(x=1),this.x=(f-_)/x,this.y=(h-v)/x,this.z=(d-u)/x,this.w=Math.acos((c+m+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=mt(this.x,e.x,t.x),this.y=mt(this.y,e.y,t.y),this.z=mt(this.z,e.z,t.z),this.w=mt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=mt(this.x,e,t),this.y=mt(this.y,e,t),this.z=mt(this.z,e,t),this.w=mt(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(mt(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};Ul.prototype.isVector4=!0;let Ft=Ul;class cd extends os{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Tn,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new Ft(0,0,e,t),this.scissorTest=!1,this.viewport=new Ft(0,0,e,t),this.textures=[];const s=n.count;for(let r=0;r<s;r++)this.textures[r]=new dn({width:e,height:t,depth:n.depth}),this.textures[r].isRenderTargetTexture=!0,this.textures[r].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Tn,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.mipmapsAutoUpdate!==void 0&&(t.mipmapsAutoUpdate=e.mipmapsAutoUpdate),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=n,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const s=Object.assign({},e.textures[t].image);this.textures[t].source=new Ml(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;else this.depthTexture=null;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ii extends cd{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Eh extends dn{constructor(e=null,t=1,n=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class hd extends dn{constructor(e=null,t=1,n=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=Kn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const Ta=class Ta{constructor(e,t,n,s,r,a,o,l,c,u,h,d,m,_,v,f){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,s,r,a,o,l,c,u,h,d,m,_,v,f)}set(e,t,n,s,r,a,o,l,c,u,h,d,m,_,v,f){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=s,p[1]=r,p[5]=a,p[9]=o,p[13]=l,p[2]=c,p[6]=u,p[10]=h,p[14]=d,p[3]=m,p[7]=_,p[11]=v,p[15]=f,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ta().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,s=1/ds.setFromMatrixColumn(e,0).length(),r=1/ds.setFromMatrixColumn(e,1).length(),a=1/ds.setFromMatrixColumn(e,2).length();return t[0]=n[0]*s,t[1]=n[1]*s,t[2]=n[2]*s,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,s=e.y,r=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){const d=a*u,m=a*h,_=o*u,v=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=m+_*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=_+m*c,t[10]=a*l}else if(e.order==="YXZ"){const d=l*u,m=l*h,_=c*u,v=c*h;t[0]=d+v*o,t[4]=_*o-m,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=m*o-_,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){const d=l*u,m=l*h,_=c*u,v=c*h;t[0]=d-v*o,t[4]=-a*h,t[8]=_+m*o,t[1]=m+_*o,t[5]=a*u,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){const d=a*u,m=a*h,_=o*u,v=o*h;t[0]=l*u,t[4]=_*c-m,t[8]=d*c+v,t[1]=l*h,t[5]=v*c+d,t[9]=m*c-_,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){const d=a*l,m=a*c,_=o*l,v=o*c;t[0]=l*u,t[4]=v-d*h,t[8]=_*h+m,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=m*h+_,t[10]=d-v*h}else if(e.order==="XZY"){const d=a*l,m=a*c,_=o*l,v=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+v,t[5]=a*u,t[9]=m*h-_,t[2]=_*h-m,t[6]=o*u,t[10]=v*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(ud,e,dd)}lookAt(e,t,n){const s=this.elements;return An.subVectors(e,t),An.lengthSq()===0&&(An.z=1),An.normalize(),Ei.crossVectors(n,An),Ei.lengthSq()===0&&(Math.abs(n.z)===1?An.x+=1e-4:An.z+=1e-4,An.normalize(),Ei.crossVectors(n,An)),Ei.normalize(),Rr.crossVectors(An,Ei),s[0]=Ei.x,s[4]=Rr.x,s[8]=An.x,s[1]=Ei.y,s[5]=Rr.y,s[9]=An.y,s[2]=Ei.z,s[6]=Rr.z,s[10]=An.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,s=t.elements,r=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],u=n[1],h=n[5],d=n[9],m=n[13],_=n[2],v=n[6],f=n[10],p=n[14],x=n[3],E=n[7],b=n[11],w=n[15],T=s[0],g=s[4],y=s[8],P=s[12],C=s[1],N=s[5],O=s[9],W=s[13],R=s[2],I=s[6],V=s[10],B=s[14],se=s[3],Y=s[7],j=s[11],ie=s[15];return r[0]=a*T+o*C+l*R+c*se,r[4]=a*g+o*N+l*I+c*Y,r[8]=a*y+o*O+l*V+c*j,r[12]=a*P+o*W+l*B+c*ie,r[1]=u*T+h*C+d*R+m*se,r[5]=u*g+h*N+d*I+m*Y,r[9]=u*y+h*O+d*V+m*j,r[13]=u*P+h*W+d*B+m*ie,r[2]=_*T+v*C+f*R+p*se,r[6]=_*g+v*N+f*I+p*Y,r[10]=_*y+v*O+f*V+p*j,r[14]=_*P+v*W+f*B+p*ie,r[3]=x*T+E*C+b*R+w*se,r[7]=x*g+E*N+b*I+w*Y,r[11]=x*y+E*O+b*V+w*j,r[15]=x*P+E*W+b*B+w*ie,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],m=e[14],_=e[3],v=e[7],f=e[11],p=e[15],x=l*m-c*d,E=o*m-c*h,b=o*d-l*h,w=a*m-c*u,T=a*d-l*u,g=a*h-o*u;return t*(v*x-f*E+p*b)-n*(_*x-f*w+p*T)+s*(_*E-v*w+p*g)-r*(_*b-v*T+f*g)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-n*(r*u-o*l)+s*(r*c-a*l)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],m=e[11],_=e[12],v=e[13],f=e[14],p=e[15],x=t*o-n*a,E=t*l-s*a,b=t*c-r*a,w=n*l-s*o,T=n*c-r*o,g=s*c-r*l,y=u*v-h*_,P=u*f-d*_,C=u*p-m*_,N=h*f-d*v,O=h*p-m*v,W=d*p-m*f,R=x*W-E*O+b*N+w*C-T*P+g*y;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/R;return e[0]=(o*W-l*O+c*N)*I,e[1]=(s*O-n*W-r*N)*I,e[2]=(v*g-f*T+p*w)*I,e[3]=(d*T-h*g-m*w)*I,e[4]=(l*C-a*W-c*P)*I,e[5]=(t*W-s*C+r*P)*I,e[6]=(f*b-_*g-p*E)*I,e[7]=(u*g-d*b+m*E)*I,e[8]=(a*O-o*C+c*y)*I,e[9]=(n*C-t*O-r*y)*I,e[10]=(_*T-v*b+p*x)*I,e[11]=(h*b-u*T-m*x)*I,e[12]=(o*P-a*N-l*y)*I,e[13]=(t*N-n*P+s*y)*I,e[14]=(v*E-_*w-f*x)*I,e[15]=(u*w-h*E+d*x)*I,this}scale(e){const t=this.elements,n=e.x,s=e.y,r=e.z;return t[0]*=n,t[4]*=s,t[8]*=r,t[1]*=n,t[5]*=s,t[9]*=r,t[2]*=n,t[6]*=s,t[10]*=r,t[3]*=n,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,s))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),s=Math.sin(t),r=1-n,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+n,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+n,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,s,r,a){return this.set(1,n,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,n){const s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,d=r*c,m=r*u,_=r*h,v=a*u,f=a*h,p=o*h,x=l*c,E=l*u,b=l*h,w=n.x,T=n.y,g=n.z;return s[0]=(1-(v+p))*w,s[1]=(m+b)*w,s[2]=(_-E)*w,s[3]=0,s[4]=(m-b)*T,s[5]=(1-(d+p))*T,s[6]=(f+x)*T,s[7]=0,s[8]=(_+E)*g,s[9]=(f-x)*g,s[10]=(1-(d+v))*g,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,n){const s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];const r=this.determinantAffine();if(r===0)return n.set(1,1,1),t.identity(),this;let a=ds.set(s[0],s[1],s[2]).length();const o=ds.set(s[4],s[5],s[6]).length(),l=ds.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Vn.copy(this);const c=1/a,u=1/o,h=1/l;return Vn.elements[0]*=c,Vn.elements[1]*=c,Vn.elements[2]*=c,Vn.elements[4]*=u,Vn.elements[5]*=u,Vn.elements[6]*=u,Vn.elements[8]*=h,Vn.elements[9]*=h,Vn.elements[10]*=h,t.setFromRotationMatrix(Vn),n.x=a,n.y=o,n.z=l,this}makePerspective(e,t,n,s,r,a,o=Jn,l=!1){const c=this.elements,u=2*r/(t-e),h=2*r/(n-s),d=(t+e)/(t-e),m=(n+s)/(n-s);let _,v;if(l)_=r/(a-r),v=a*r/(a-r);else if(o===Jn)_=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===ur)_=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,s,r,a,o=Jn,l=!1){const c=this.elements,u=2/(t-e),h=2/(n-s),d=-(t+e)/(t-e),m=-(n+s)/(n-s);let _,v;if(l)_=1/(a-r),v=a/(a-r);else if(o===Jn)_=-2/(a-r),v=-(a+r)/(a-r);else if(o===ur)_=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let s=0;s<16;s++)if(t[s]!==n[s])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};Ta.prototype.isMatrix4=!0;let Rt=Ta;const ds=new F,Vn=new Rt,ud=new F(0,0,0),dd=new F(1,1,1),Ei=new F,Rr=new F,An=new F,Yl=new Rt,$l=new ls;class xi{constructor(e=0,t=0,n=0,s=xi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,s=this._order){return this._x=e,this._y=t,this._z=n,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],m=s[10];switch(t){case"XYZ":this._y=Math.asin(mt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-mt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(mt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,m),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-mt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(mt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,m));break;case"XZY":this._z=Math.asin(-mt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:je("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Yl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Yl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return $l.setFromEuler(this),this.setFromQuaternion($l,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xi.DEFAULT_ORDER="XYZ";class Th{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let fd=0;const Kl=new F,fs=new ls,ci=new Rt,Cr=new F,Xs=new F,pd=new F,md=new ls,Zl=new F(1,0,0),Jl=new F(0,1,0),Ql=new F(0,0,1),jl={type:"added"},gd={type:"removed"},ps={type:"childadded",child:null},qa={type:"childremoved",child:null};class Yt extends os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fd++}),this.uuid=Mr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Yt.DEFAULT_UP.clone();const e=new F,t=new xi,n=new ls,s=new F(1,1,1);function r(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Rt},normalMatrix:{value:new et}}),this.matrix=new Rt,this.matrixWorld=new Rt,this.matrixAutoUpdate=Yt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Th,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale),this.pivot!==null&&this.position.copy(this.pivot).applyMatrix4(this.matrix).sub(this.pivot)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.multiply(fs),this}rotateOnWorldAxis(e,t){return fs.setFromAxisAngle(e,t),this.quaternion.premultiply(fs),this}rotateX(e){return this.rotateOnAxis(Zl,e)}rotateY(e){return this.rotateOnAxis(Jl,e)}rotateZ(e){return this.rotateOnAxis(Ql,e)}translateOnAxis(e,t){return Kl.copy(e).applyQuaternion(this.quaternion),this.position.add(Kl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Zl,e)}translateY(e){return this.translateOnAxis(Jl,e)}translateZ(e){return this.translateOnAxis(Ql,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ci.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Cr.copy(e):Cr.set(e,t,n);const s=this.parent;this.updateWorldMatrix(!0,!1),Xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ci.lookAt(Xs,Cr,this.up):ci.lookAt(Cr,Xs,this.up),this.quaternion.setFromRotationMatrix(ci),s&&(ci.extractRotation(s.matrixWorld),fs.setFromRotationMatrix(ci),this.quaternion.premultiply(fs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(yt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(jl),ps.child=e,this.dispatchEvent(ps),ps.child=null):yt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gd),qa.child=e,this.dispatchEvent(qa),qa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ci.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ci.multiply(e.parent.matrixWorld)),e.applyMatrix4(ci),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(jl),ps.child=e,this.dispatchEvent(ps),ps.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,s=this.children.length;n<s;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,e,pd),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Xs,md,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){return!0}traverse(e){e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*n-r[8]*s,r[13]+=n-r[1]*t-r[5]*n-r[9]*s,r[14]+=s-r[2]*t-r[6]*n-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,s=t.length;n<s;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){const l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){const o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),m=a(e.animations),_=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),d.length>0&&(n.skeletons=d),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=s,n;function a(o){const l=[];for(const c in o){const u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const s=e.children[n];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}Yt.DEFAULT_UP=new F(0,1,0);Yt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Yt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class lt extends Yt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _d={type:"move"};class Ya{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new lt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new lt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new F,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new F),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new lt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new F,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new F,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let s=null,r=null,a=null;const o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(const v of e.hand.values()){const f=t.getJointPose(v,n),p=this._getHandJoint(c,v);f!==null&&(p.matrix.fromArray(f.transform.matrix),p.matrix.decompose(p.position,p.quaternion,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=f.radius),p.visible=f!==null}const u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),m=.02,_=.005;c.inputState.pinching&&d>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.quaternion,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,n),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.quaternion,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_d)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new lt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ti={h:0,s:0,l:0},Pr={h:0,s:0,l:0};function $a(i,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?i+(e-i)*6*t:t<1/2?e:t<2/3?i+(e-i)*6*(2/3-t):i}class Ue{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=tn){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,pt.colorSpaceToWorking(this,t),this}setRGB(e,t,n,s=pt.workingColorSpace){return this.r=e,this.g=t,this.b=n,pt.colorSpaceToWorking(this,s),this}setHSL(e,t,n,s=pt.workingColorSpace){if(e=td(e,1),t=mt(t,0,1),n=mt(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,a=2*n-r;this.r=$a(a,r,e+1/3),this.g=$a(a,r,e),this.b=$a(a,r,e-1/3)}return pt.colorSpaceToWorking(this,s),this}setStyle(e,t=tn){function n(r){r!==void 0&&parseFloat(r)<1&&je("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setRGB(Math.min(100,parseFloat(r[1]))/100,Math.min(100,parseFloat(r[2]))/100,Math.min(100,parseFloat(r[3]))/100,t);break;case"hsl":case"hsla":if(r=/^\s*([+-]?(?:\d+(?:\.\d+)?|\.\d+))\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*,\s*(\d+(?:\.\d+)?|\.\d+)\%\s*(?:,\s*(\d+(?:\.\d+)?|\.\d+)\s*)?$/.exec(o))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:je("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);je("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=tn){const n=wh[e.toLowerCase()];return n!==void 0?this.setHex(n,t):je("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=mi(e.r),this.g=mi(e.g),this.b=mi(e.b),this}copyLinearToSRGB(e){return this.r=Ls(e.r),this.g=Ls(e.g),this.b=Ls(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=tn){return pt.workingToColorSpace(cn.copy(this),e),Math.round(mt(cn.r*255,0,255))*65536+Math.round(mt(cn.g*255,0,255))*256+Math.round(mt(cn.b*255,0,255))}getHexString(e=tn){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=pt.workingColorSpace){pt.workingToColorSpace(cn.copy(this),t);const n=cn.r,s=cn.g,r=cn.b,a=Math.max(n,s,r),o=Math.min(n,s,r);let l,c;const u=(o+a)/2;if(o===a)l=0,c=0;else{const h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case n:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-n)/h+2;break;case r:l=(n-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=pt.workingColorSpace){return pt.workingToColorSpace(cn.copy(this),t),e.r=cn.r,e.g=cn.g,e.b=cn.b,e}getStyle(e=tn){pt.workingToColorSpace(cn.copy(this),e);const t=cn.r,n=cn.g,s=cn.b;return e!==tn?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(s*255)})`}offsetHSL(e,t,n){return this.getHSL(Ti),this.setHSL(Ti.h+e,Ti.s+t,Ti.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Ti),e.getHSL(Pr);const n=Ga(Ti.h,Pr.h,t),s=Ga(Ti.s,Pr.s,t),r=Ga(Ti.l,Pr.l,t);return this.setHSL(n,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*s,this.g=r[1]*t+r[4]*n+r[7]*s,this.b=r[2]*t+r[5]*n+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const cn=new Ue;Ue.NAMES=wh;class Sl{constructor(e,t=25e-5){this.isFogExp2=!0,this.name="",this.color=new Ue(e),this.density=t}clone(){return new Sl(this.color,this.density)}toJSON(){return{type:"FogExp2",name:this.name,color:this.color.getHex(),density:this.density}}}class xd extends Yt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xi,this.environmentIntensity=1,this.environmentRotation=new xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),this.background=e.background!==null?e.background.clone():null,this.environment=e.environment!==null?e.environment.clone():null,this.fog=e.fog!==null?e.fog.clone():null,this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),this.overrideMaterial=e.overrideMaterial!==null?e.overrideMaterial.clone():null,this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const Wn=new F,hi=new F,Ka=new F,ui=new F,ms=new F,gs=new F,ec=new F,Za=new F,Ja=new F,Qa=new F,ja=new Ft,eo=new Ft,to=new Ft;class Yn{constructor(e=new F,t=new F,n=new F){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,s){s.subVectors(n,t),Wn.subVectors(e,t),s.cross(Wn);const r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,n,s,r){Wn.subVectors(s,t),hi.subVectors(n,t),Ka.subVectors(e,t);const a=Wn.dot(Wn),o=Wn.dot(hi),l=Wn.dot(Ka),c=hi.dot(hi),u=hi.dot(Ka),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;const d=1/h,m=(c*l-o*u)*d,_=(a*u-o*l)*d;return r.set(1-m-_,_,m)}static containsPoint(e,t,n,s){return this.getBarycoord(e,t,n,s,ui)===null?!1:ui.x>=0&&ui.y>=0&&ui.x+ui.y<=1}static getInterpolation(e,t,n,s,r,a,o,l){return this.getBarycoord(e,t,n,s,ui)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,ui.x),l.addScaledVector(a,ui.y),l.addScaledVector(o,ui.z),l)}static getInterpolatedAttribute(e,t,n,s,r,a){return ja.setScalar(0),eo.setScalar(0),to.setScalar(0),ja.fromBufferAttribute(e,t),eo.fromBufferAttribute(e,n),to.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(ja,r.x),a.addScaledVector(eo,r.y),a.addScaledVector(to,r.z),a}static isFrontFacing(e,t,n,s){return Wn.subVectors(n,t),hi.subVectors(e,t),Wn.cross(hi).dot(s)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,s){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,n,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Wn.subVectors(this.c,this.b),hi.subVectors(this.a,this.b),Wn.cross(hi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return Yn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return Yn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,s,r){return Yn.getInterpolation(e,this.a,this.b,this.c,t,n,s,r)}containsPoint(e){return Yn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return Yn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,s=this.b,r=this.c;let a,o;ms.subVectors(s,n),gs.subVectors(r,n),Za.subVectors(e,n);const l=ms.dot(Za),c=gs.dot(Za);if(l<=0&&c<=0)return t.copy(n);Ja.subVectors(e,s);const u=ms.dot(Ja),h=gs.dot(Ja);if(u>=0&&h<=u)return t.copy(s);const d=l*h-u*c;if(d<=0&&l>=0&&u<=0&&l-u>0)return a=l/(l-u),t.copy(n).addScaledVector(ms,a);Qa.subVectors(e,r);const m=ms.dot(Qa),_=gs.dot(Qa);if(_>=0&&m<=_)return t.copy(r);const v=m*c-l*_;if(v<=0&&c>=0&&_<=0)return o=c/(c-_),t.copy(n).addScaledVector(gs,o);const f=u*_-m*h;if(f<=0&&h-u>=0&&m-_>=0)return ec.subVectors(r,s),o=(h-u)/(h-u+(m-_)),t.copy(s).addScaledVector(ec,o);const p=1/(f+v+d);return a=v*p,o=d*p,t.copy(n).addScaledVector(ms,a).addScaledVector(gs,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class cs{constructor(e=new F(1/0,1/0,1/0),t=new F(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Xn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Xn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=Xn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0&&e.isBatchedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Xn):Xn.fromBufferAttribute(r,a),Xn.applyMatrix4(e.matrixWorld),this.expandByPoint(Xn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Lr.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Lr.copy(n.boundingBox)),Lr.applyMatrix4(e.matrixWorld),this.union(Lr)}const s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Xn),Xn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(qs),Dr.subVectors(this.max,qs),_s.subVectors(e.a,qs),xs.subVectors(e.b,qs),vs.subVectors(e.c,qs),wi.subVectors(xs,_s),Ai.subVectors(vs,xs),$i.subVectors(_s,vs);let t=[0,-wi.z,wi.y,0,-Ai.z,Ai.y,0,-$i.z,$i.y,wi.z,0,-wi.x,Ai.z,0,-Ai.x,$i.z,0,-$i.x,-wi.y,wi.x,0,-Ai.y,Ai.x,0,-$i.y,$i.x,0];return!no(t,_s,xs,vs,Dr)||(t=[1,0,0,0,1,0,0,0,1],!no(t,_s,xs,vs,Dr))?!1:(Ir.crossVectors(wi,Ai),t=[Ir.x,Ir.y,Ir.z],no(t,_s,xs,vs,Dr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Xn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Xn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(di[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),di[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),di[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),di[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),di[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),di[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),di[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),di[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(di),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const di=[new F,new F,new F,new F,new F,new F,new F,new F],Xn=new F,Lr=new cs,_s=new F,xs=new F,vs=new F,wi=new F,Ai=new F,$i=new F,qs=new F,Dr=new F,Ir=new F,Ki=new F;function no(i,e,t,n,s){for(let r=0,a=i.length-3;r<=a;r+=3){Ki.fromArray(i,r);const o=s.x*Math.abs(Ki.x)+s.y*Math.abs(Ki.y)+s.z*Math.abs(Ki.z),l=e.dot(Ki),c=t.dot(Ki),u=n.dot(Ki);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}const Vt=new F,Nr=new rt;let vd=0;class En extends os{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vd++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Zu,this.updateRanges=[],this.gpuType=Zn,this.version=0,this._normalizationScale=e!==void 0?vl(e):void 0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this._normalizationScale=e._normalizationScale,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[n+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Nr.fromBufferAttribute(this,t),Nr.applyMatrix3(e),this.setXY(t,Nr.x,Nr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=this._denormalize(n)),n}setComponent(e,t,n){return this.normalized&&(n=this._normalize(n)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=this._denormalize(t)),t}setX(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=this._denormalize(t)),t}setY(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=this._denormalize(t)),t}setZ(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=this._denormalize(t)),t}setW(e,t){return this.normalized&&(t=this._normalize(t)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,s){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this}setXYZW(e,t,n,s,r){return e*=this.itemSize,this.normalized&&(t=this._normalize(t),n=this._normalize(n),s=this._normalize(s),r=this._normalize(r)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}_denormalize(e){const t=this._normalizationScale;return t!==void 0?Math.max(e/t,-1):id(e,this.array)}_normalize(e){const t=this._normalizationScale;return t!==void 0?Math.round(e*t):sd(e,this.array)}}class Ah extends En{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Rh extends En{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class Tt extends En{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Md=new cs,Ys=new F,io=new F;class Gs{constructor(e=new F,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Md.setFromPoints(e).getCenter(n);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ys.subVectors(e,this.center);const t=Ys.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),s=(n-this.radius)*.5;this.center.addScaledVector(Ys,s/n),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(io.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ys.copy(e.center).add(io)),this.expandByPoint(Ys.copy(e.center).sub(io))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let Sd=0;const On=new Rt,so=new Yt,Ms=new F,Rn=new cs,$s=new cs,Jt=new F;class Wt extends os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Sd++}),this.uuid=Mr(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ju(e)?Rh:Ah)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new et().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return On.makeRotationFromQuaternion(e),this.applyMatrix4(On),this}rotateX(e){return On.makeRotationX(e),this.applyMatrix4(On),this}rotateY(e){return On.makeRotationY(e),this.applyMatrix4(On),this}rotateZ(e){return On.makeRotationZ(e),this.applyMatrix4(On),this}translate(e,t,n){return On.makeTranslation(e,t,n),this.applyMatrix4(On),this}scale(e,t,n){return On.makeScale(e,t,n),this.applyMatrix4(On),this}lookAt(e){return so.lookAt(e),so.updateMatrix(),this.applyMatrix4(so.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ms).negate(),this.translate(Ms.x,Ms.y,Ms.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let s=0,r=e.length;s<r;s++){const a=e[s];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Tt(n,3))}else{const n=Math.min(e.length,t.count);for(let s=0;s<n;s++){const r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&je("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new cs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){yt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new F(-1/0,-1/0,-1/0),new F(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,s=t.length;n<s;n++){const r=t[n];Rn.setFromBufferAttribute(r),this.morphTargetsRelative?(Jt.addVectors(this.boundingBox.min,Rn.min),this.boundingBox.expandByPoint(Jt),Jt.addVectors(this.boundingBox.max,Rn.max),this.boundingBox.expandByPoint(Jt)):(this.boundingBox.expandByPoint(Rn.min),this.boundingBox.expandByPoint(Rn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&yt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gs);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){yt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new F,1/0);return}if(e){const n=this.boundingSphere.center;if(Rn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){const o=t[r];$s.setFromBufferAttribute(o),this.morphTargetsRelative?(Jt.addVectors(Rn.min,$s.min),Rn.expandByPoint(Jt),Jt.addVectors(Rn.max,$s.max),Rn.expandByPoint(Jt)):(Rn.expandByPoint($s.min),Rn.expandByPoint($s.max))}Rn.getCenter(n);let s=0;for(let r=0,a=e.count;r<a;r++)Jt.fromBufferAttribute(e,r),s=Math.max(s,n.distanceToSquared(Jt));if(t)for(let r=0,a=t.length;r<a;r++){const o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)Jt.fromBufferAttribute(o,c),l&&(Ms.fromBufferAttribute(e,c),Jt.add(Ms)),s=Math.max(s,n.distanceToSquared(Jt))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&yt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){yt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,s=t.normal,r=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new En(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],l=[],c=new Uint8Array(n.count);for(let P=0;P<n.count;P++)o[P]=new F,l[P]=new F;const u=new F,h=new F,d=new F,m=new rt,_=new rt,v=new rt,f=new F,p=new F;function x(P,C,N){c[P]=c[C]=c[N]=1,u.fromBufferAttribute(n,P),h.fromBufferAttribute(n,C),d.fromBufferAttribute(n,N),m.fromBufferAttribute(r,P),_.fromBufferAttribute(r,C),v.fromBufferAttribute(r,N),h.sub(u),d.sub(u),_.sub(m),v.sub(m);const O=1/(_.x*v.y-v.x*_.y);isFinite(O)&&(f.copy(h).multiplyScalar(v.y).addScaledVector(d,-_.y).multiplyScalar(O),p.copy(d).multiplyScalar(_.x).addScaledVector(h,-v.x).multiplyScalar(O),o[P].add(f),o[C].add(f),o[N].add(f),l[P].add(p),l[C].add(p),l[N].add(p))}let E=this.groups;E.length===0&&(E=[{start:0,count:e.count}]);for(let P=0,C=E.length;P<C;++P){const N=E[P],O=N.start,W=N.count;for(let R=O,I=O+W;R<I;R+=3)x(e.getX(R+0),e.getX(R+1),e.getX(R+2))}const b=new F,w=new F,T=new F,g=new F;function y(P){T.fromBufferAttribute(s,P),g.copy(T);const C=o[P];b.copy(C),b.sub(T.multiplyScalar(T.dot(C))).normalize(),w.crossVectors(g,C);const O=w.dot(l[P])<0?-1:1;a.setXYZW(P,b.x,b.y,b.z,O)}for(let P=0,C=n.count;P<C;++P)c[P]&&y(P);this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new En(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let d=0,m=n.count;d<m;d++)n.setXYZ(d,0,0,0);const s=new F,r=new F,a=new F,o=new F,l=new F,c=new F,u=new F,h=new F;if(e)for(let d=0,m=e.count;d<m;d+=3){const _=e.getX(d+0),v=e.getX(d+1),f=e.getX(d+2);s.fromBufferAttribute(t,_),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,f),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(n,_),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,f),o.add(u),l.add(u),c.add(u),n.setXYZ(_,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(f,c.x,c.y,c.z)}else for(let d=0,m=t.count;d<m;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),n.setXYZ(d+0,u.x,u.y,u.z),n.setXYZ(d+1,u.x,u.y,u.z),n.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Jt.fromBufferAttribute(e,t),Jt.normalize(),e.setXYZ(t,Jt.x,Jt.y,Jt.z)}toNonIndexed(){function e(o,l){const c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u);let m=0,_=0;for(let v=0,f=l.length;v<f;v++){o.isInterleavedBufferAttribute?m=l[v]*o.data.stride+o.offset:m=l[v]*u;for(let p=0;p<u;p++)d[_++]=c[m++]}return new En(d,u,h)}if(this.index===null)return je("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Wt,n=this.index.array,s=this.attributes;for(const o in s){const l=s[o],c=e(l,n);t.setAttribute(o,c)}const r=this.morphAttributes;for(const o in r){const l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){const d=c[u],m=e(d,n);l.push(m)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,l=a.length;o<l;o++){const c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const s={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){const m=c[h];u.push(m.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const s=e.attributes;for(const c in s){const u=s[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],h=r[c];for(let d=0,m=h.length;d<m;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let c=0,u=a.length;c<u;c++){const h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ro=new F,yd=new F,bd=new et;class Pi{constructor(e=new F(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,s){return this.normal.set(e,t,n),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const s=ro.subVectors(n,t).cross(yd.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const s=e.delta(ro),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/r;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||bd.getNormalMatrix(e),s=this.coplanarPoint(ro).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let Ed=0;class Hs extends os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ed++}),this.uuid=Mr(),this.name="",this.type="Material",this.blending=Ps,this.side=ts,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=sh,this.blendDst=rh,this.blendEquation=Es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ue(0,0,0),this.blendAlpha=0,this.depthFunc=lr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Wu,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=za,this.stencilZFail=za,this.stencilZPass=za,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){je(`Material: parameter '${t}' has value of undefined.`);continue}const s=this[t];if(s===void 0){je(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(n):s&&s.isVector2&&n&&n.isVector2||s&&s.isEuler&&n&&n.isEuler||s&&s.isVector3&&n&&n.isVector3?s.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.diffuseRoughness!==void 0&&(n.diffuseRoughness=this.diffuseRoughness),this.diffuseRoughnessMap&&this.diffuseRoughnessMap.isTexture&&(n.diffuseRoughnessMap=this.diffuseRoughnessMap.toJSON(e).uuid),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessMinimum!==void 0&&(n.iridescenceThicknessMinimum=this.iridescenceThicknessMinimum),this.iridescenceThicknessMaximum!==void 0&&(n.iridescenceThicknessMaximum=this.iridescenceThicknessMaximum),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function s(r){const a=[];for(const o in r){const l=r[o];delete l.metadata,a.push(l)}return a}if(t){const r=s(e.textures),a=s(e.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ue().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.diffuseRoughness!==void 0&&(this.diffuseRoughness=e.diffuseRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessMinimum!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessMinimum),e.iridescenceThicknessMaximum!==void 0&&(this.iridescenceThicknessMaximum=e.iridescenceThicknessMaximum),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],this.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1]),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Pi().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new rt().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new rt().fromArray(e.clearcoatNormalScale)),e.diffuseRoughnessMap!==void 0&&(this.diffuseRoughnessMap=t[e.diffuseRoughnessMap]||null),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const s=t.length;n=new Array(s);for(let r=0;r!==s;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}const fi=new F,ao=new F,Ur=new F,Fr=new F;class Ch{constructor(e=new F,t=new F(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,fi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=fi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(fi.copy(this.origin).addScaledVector(this.direction,t),fi.distanceToSquared(e))}distanceSqToSegment(e,t,n,s){ao.copy(e).add(t).multiplyScalar(.5),Ur.copy(t).sub(e).normalize(),Fr.copy(this.origin).sub(ao);const r=e.distanceTo(t)*.5,a=-this.direction.dot(Ur),o=Fr.dot(this.direction),l=-Fr.dot(Ur),c=Fr.lengthSq(),u=Math.abs(1-a*a);let h,d,m,_;if(u>0)if(h=a*l-o,d=a*o-l,_=r*u,h>=0)if(d>=-_)if(d<=_){const v=1/u;h*=v,d*=v,m=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=r,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*l)+c;else d<=-_?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),m=-h*h+d*(d+2*l)+c):d<=_?(h=0,d=Math.min(Math.max(-r,-l),r),m=d*(d+2*l)+c):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),m=-h*h+d*(d+2*l)+c);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),m=-h*h+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(ao).addScaledVector(Ur,d),m}intersectSphere(e,t){if(e.radius<0)return null;fi.subVectors(e.center,this.origin);const n=fi.dot(this.direction),s=fi.dot(fi)-n*n,r=e.radius*e.radius;if(s>r)return null;const a=Math.sqrt(r-s),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,s,r,a,o,l;const c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),n>a||r>s||((r>n||isNaN(n))&&(n=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),n>l||o>s)||((o>n||n!==n)&&(n=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(n>=0?n:s,t)}intersectsBox(e){return this.intersectBox(e,fi)!==null}intersectTriangle(e,t,n,s,r){const a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,h=e.x-a.x,d=e.y-a.y,m=e.z-a.z,_=t.x-a.x,v=t.y-a.y,f=t.z-a.z,p=n.x-a.x,x=n.y-a.y,E=n.z-a.z,b=Math.abs(l),w=Math.abs(c),T=Math.abs(u);let g,y,P,C,N,O,W,R,I,V,B,se;if(b>=w&&b>=T?(P=l,O=h,I=_,se=p,l>=0?(g=c,y=u,C=d,N=m,W=v,R=f,V=x,B=E):(g=u,y=c,C=m,N=d,W=f,R=v,V=E,B=x)):w>=T?(P=c,O=d,I=v,se=x,c>=0?(g=u,y=l,C=m,N=h,W=f,R=_,V=E,B=p):(g=l,y=u,C=h,N=m,W=_,R=f,V=p,B=E)):(P=u,O=m,I=f,se=E,u>=0?(g=l,y=c,C=h,N=d,W=_,R=v,V=p,B=x):(g=c,y=l,C=d,N=h,W=v,R=_,V=x,B=p)),P===0)return null;const Y=g/P,j=y/P,ie=1/P,Le=C-Y*O,Fe=N-j*O,$=W-Y*I,Se=R-j*I,Ne=V-Y*se,We=B-j*se,Re=Ne*Se-We*$,qe=Le*We-Fe*Ne,xt=$*Fe-Se*Le;if(s){if(Re<0||qe<0||xt<0)return null}else if((Re<0||qe<0||xt<0)&&(Re>0||qe>0||xt>0))return null;const Ke=Re+qe+xt;if(Ke===0)return null;const vt=ie*(Re*O+qe*I+xt*se);return(Ke>0?vt<0:vt>0)?null:this.at(vt/Ke,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ds extends Hs{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ue(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.combine=ah,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const tc=new Rt,Zi=new Ch,Or=new Gs,nc=new F,Br=new F,zr=new F,kr=new F,oo=new F,Gr=new F,ic=new F,Hr=new F;class Ot extends Yt{constructor(e=new Wt,t=new Ds){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){const n=this.geometry,s=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(s,e);const o=this.morphTargetInfluences;if(r&&o){Gr.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=o[l],h=r[l];u!==0&&(oo.fromBufferAttribute(h,e),a?Gr.addScaledVector(oo,u):Gr.addScaledVector(oo.sub(t),u))}t.add(Gr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Or.copy(n.boundingSphere),Or.applyMatrix4(r),Zi.copy(e.ray).recast(e.near),!(Or.containsPoint(Zi.origin)===!1&&(Zi.intersectSphere(Or,nc)===null||Zi.origin.distanceToSquared(nc)>(e.far-e.near)**2))&&(tc.copy(r).invert(),Zi.copy(e.ray).applyMatrix4(tc),!(n.boundingBox!==null&&Zi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Zi)))}_computeIntersections(e,t,n){let s;const r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,m=r.drawRange;if(o!==null)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const f=d[_],p=a[f.materialIndex],x=Math.max(f.start,m.start),E=Math.min(o.count,Math.min(f.start+f.count,m.start+m.count));for(let b=x,w=E;b<w;b+=3){const T=o.getX(b),g=o.getX(b+1),y=o.getX(b+2);s=Vr(this,p,e,n,c,u,h,T,g,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,m.start),v=Math.min(o.count,m.start+m.count);for(let f=_,p=v;f<p;f+=3){const x=o.getX(f),E=o.getX(f+1),b=o.getX(f+2);s=Vr(this,a,e,n,c,u,h,x,E,b),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let _=0,v=d.length;_<v;_++){const f=d[_],p=a[f.materialIndex],x=Math.max(f.start,m.start),E=Math.min(l.count,Math.min(f.start+f.count,m.start+m.count));for(let b=x,w=E;b<w;b+=3){const T=b,g=b+1,y=b+2;s=Vr(this,p,e,n,c,u,h,T,g,y),s&&(s.faceIndex=Math.floor(b/3),s.face.materialIndex=f.materialIndex,t.push(s))}}else{const _=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let f=_,p=v;f<p;f+=3){const x=f,E=f+1,b=f+2;s=Vr(this,a,e,n,c,u,h,x,E,b),s&&(s.faceIndex=Math.floor(f/3),t.push(s))}}}}function Td(i,e,t,n,s,r,a,o){let l;if(e.side===_n?l=n.intersectTriangle(a,r,s,!0,o):l=n.intersectTriangle(s,r,a,e.side===ts,o),l===null)return null;Hr.copy(o),Hr.applyMatrix4(i.matrixWorld);const c=t.ray.origin.distanceTo(Hr);return c<t.near||c>t.far?null:{distance:c,point:Hr.clone(),object:i}}function Vr(i,e,t,n,s,r,a,o,l,c){i.getVertexPosition(o,Br),i.getVertexPosition(l,zr),i.getVertexPosition(c,kr);const u=Td(i,e,t,n,Br,zr,kr,ic);if(u){const h=new F;Yn.getBarycoord(ic,Br,zr,kr,h),s&&(u.uv=Yn.getInterpolatedAttribute(s,o,l,c,h,new rt)),r&&(u.uv1=Yn.getInterpolatedAttribute(r,o,l,c,h,new rt)),a&&(u.normal=Yn.getInterpolatedAttribute(a,o,l,c,h,new F),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const d={a:o,b:l,c,normal:new F,materialIndex:0};Yn.getNormal(Br,zr,kr,d.normal),u.face=d,u.barycoord=h}return u}class Ph extends dn{constructor(e=null,t=1,n=1,s,r,a,o,l,c=sn,u=sn,h,d){super(null,a,o,l,c,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class sc extends En{constructor(e,t,n,s=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=s}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Ss=new Rt,rc=new Rt,Wr=[],ac=new cs,wd=new Rt,Ks=new Ot,Zs=new Gs;class Ad extends Ot{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new sc(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let s=0;s<n;s++)this.setMatrixAt(s,wd)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new cs),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ss),ac.copy(e.boundingBox).applyMatrix4(Ss),this.boundingBox.union(ac)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gs),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Ss),Zs.copy(e.boundingSphere).applyMatrix4(Ss),this.boundingSphere.union(Zs)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),this.morphTexture=e.morphTexture!==null?e.morphTexture.clone():null,this.instanceColor=e.instanceColor!==null?e.instanceColor.clone():null,this.count=e.count,this.boundingBox=e.boundingBox!==null?e.boundingBox.clone():null,this.boundingSphere=e.boundingSphere!==null?e.boundingSphere.clone():null,this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,s=this.morphTexture.source.data.data,r=n.length+1,a=e*r+1;for(let o=0;o<n.length;o++)n[o]=s[a+o]}raycast(e,t){const n=this.matrixWorld,s=this.count;if(Ks.geometry=this.geometry,Ks.material=this.material,Ks.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Zs.copy(this.boundingSphere),Zs.applyMatrix4(n),e.ray.intersectsSphere(Zs)!==!1))for(let r=0;r<s;r++){this.getMatrixAt(r,Ss),rc.multiplyMatrices(n,Ss),Ks.matrixWorld=rc,Ks.raycast(e,Wr);for(let a=0,o=Wr.length;a<o;a++){const l=Wr[a];l.instanceId=r,l.object=this,t.push(l)}Wr.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new sc(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,s=n.length+1;this.morphTexture===null&&(this.morphTexture=new Ph(new Float32Array(s*this.count),s,this.count,ml,Zn));const r=this.morphTexture.source.data.data;let a=0;for(let c=0;c<n.length;c++)a+=n[c];const o=this.geometry.morphTargetsRelative?1:1-a,l=s*e;return r[l]=o,r.set(n,l+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.instanceMatrix.dispose(),this.instanceColor!==null&&this.instanceColor.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Ji=new Gs,Rd=new rt(.5,.5),Xr=new F;class dr{constructor(e=new Pi,t=new Pi,n=new Pi,s=new Pi,r=new Pi,a=new Pi){this.planes=[e,t,n,s,r,a]}set(e,t,n,s,r,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Jn,n=!1){const s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],d=r[6],m=r[7],_=r[8],v=r[9],f=r[10],p=r[11],x=r[12],E=r[13],b=r[14],w=r[15];if(s[0].setComponents(c-a,m-u,p-_,w-x).normalize(),s[1].setComponents(c+a,m+u,p+_,w+x).normalize(),s[2].setComponents(c+o,m+h,p+v,w+E).normalize(),s[3].setComponents(c-o,m-h,p-v,w-E).normalize(),n)s[4].setComponents(l,d,f,b).normalize(),s[5].setComponents(c-l,m-d,p-f,w-b).normalize();else if(s[4].setComponents(c-l,m-d,p-f,w-b).normalize(),t===Jn)s[5].setComponents(c+l,m+d,p+f,w+b).normalize();else if(t===ur)s[5].setComponents(l,d,f,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Ji.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Ji.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Ji)}intersectsSprite(e){Ji.center.set(0,0,0);const t=Rd.distanceTo(e.center);return Ji.radius=.7071067811865476+t,Ji.applyMatrix4(e.matrixWorld),this.intersectsSphere(Ji)}intersectsSphere(e){const t=this.planes,n=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<s)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const s=t[n];if(Xr.x=s.normal.x>0?e.max.x:e.min.x,Xr.y=s.normal.y>0?e.max.y:e.min.y,Xr.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Xr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}const oc=new Rt;class yl{constructor(){this.coordinateSystem=Jn,this._frustums=[],this._count=0}setFromArrayCamera(e){const t=e.cameras,n=this._frustums;for(let s=0;s<t.length;s++){const r=t[s];oc.multiplyMatrices(r.projectionMatrix,r.matrixWorldInverse),n[s]===void 0&&(n[s]=new dr),n[s].setFromProjectionMatrix(oc,r.coordinateSystem,r.reversedDepth)}return this._count=t.length,this}getFrustum(e){return this._frustums[e]}intersectsObject(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsObject(e))return!0;return!1}intersectsSprite(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSprite(e))return!0;return!1}intersectsSphere(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsSphere(e))return!0;return!1}intersectsBox(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].intersectsBox(e))return!0;return!1}containsPoint(e){const t=this._frustums;for(let n=0;n<this._count;n++)if(t[n].containsPoint(e))return!0;return!1}copy(e){this.coordinateSystem=e.coordinateSystem;const t=this._frustums,n=e._frustums;for(let s=0;s<e._count;s++)t[s]===void 0&&(t[s]=new dr),t[s].copy(n[s]);return this._count=e._count,this}clone(){return new yl().copy(this)}}class Li extends Hs{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ue(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const lc=new Rt,sl=new Ch,qr=new Gs,Yr=new F;class js extends Yt{constructor(e=new Wt,t=new Li){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0?this.morphTargetInfluences=e.morphTargetInfluences.slice():this.morphTargetInfluences=void 0,e.morphTargetDictionary!==void 0?this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary):this.morphTargetDictionary=void 0,this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),qr.copy(n.boundingSphere),qr.applyMatrix4(s),qr.radius+=r,e.ray.intersectsSphere(qr)===!1)return;lc.copy(s).invert(),sl.copy(e.ray).applyMatrix4(lc);const o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null){const d=Math.max(0,a.start),m=Math.min(c.count,a.start+a.count);for(let _=d,v=m;_<v;_++){const f=c.getX(_);Yr.fromBufferAttribute(h,f),cc(Yr,f,l,s,e,t,this)}}else{const d=Math.max(0,a.start),m=Math.min(h.count,a.start+a.count);for(let _=d,v=m;_<v;_++)Yr.fromBufferAttribute(h,_),cc(Yr,_,l,s,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const s=t[n[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){const o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}}function cc(i,e,t,n,s,r,a){const o=sl.distanceSqToPoint(i);if(o<t){const l=new F;sl.closestPointToPoint(i,l),l.applyMatrix4(n);const c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class Lh extends dn{constructor(e=[],t=Ns,n,s,r,a,o,l,c,u){super(e,t,n,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class wa extends dn{constructor(e,t,n,s,r,a,o,l,c){super(e,t,n,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Fs extends dn{constructor(e,t,n=si,s,r,a,o=sn,l=sn,c,u=Hi,h=1){if(u!==Hi&&u!==Fi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const d={width:e,height:t,depth:h};super(d,s,r,a,o,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Ml(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Dh extends Fs{constructor(e,t=si,n=Ns,s,r,a=sn,o=sn,l,c=Hi){const u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,n,s,r,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class Ih extends dn{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class Vs extends Wt{constructor(e=1,t=1,n=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:s,heightSegments:r,depthSegments:a};const o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);const l=[],c=[],u=[],h=[];let d=0,m=0;_("z","y","x",-1,-1,n,t,e,a,r,0),_("z","y","x",1,-1,n,t,-e,a,r,1),_("x","z","y",1,1,e,n,t,s,a,2),_("x","z","y",1,-1,e,n,-t,s,a,3),_("x","y","z",1,-1,e,t,n,s,r,4),_("x","y","z",-1,-1,e,t,-n,s,r,5),this.setIndex(l),this.setAttribute("position",new Tt(c,3)),this.setAttribute("normal",new Tt(u,3)),this.setAttribute("uv",new Tt(h,2));function _(v,f,p,x,E,b,w,T,g,y,P){const C=b/g,N=w/y,O=b/2,W=w/2,R=T/2,I=g+1,V=y+1;let B=0,se=0;const Y=new F;for(let j=0;j<V;j++){const ie=j*N-W;for(let Le=0;Le<I;Le++){const Fe=Le*C-O;Y[v]=Fe*x,Y[f]=ie*E,Y[p]=R,c.push(Y.x,Y.y,Y.z),Y[v]=0,Y[f]=0,Y[p]=T>0?1:-1,u.push(Y.x,Y.y,Y.z),h.push(Le/g),h.push(1-j/y),B+=1}}for(let j=0;j<y;j++)for(let ie=0;ie<g;ie++){const Le=d+ie+I*j,Fe=d+ie+I*(j+1),$=d+(ie+1)+I*(j+1),Se=d+(ie+1)+I*j;l.push(Le,Fe,Se),l.push(Fe,$,Se),se+=6}o.addGroup(m,se,P),m+=se,d+=B}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Vs(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Aa extends Wt{constructor(e=1,t=1,n=4,s=8,r=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:s,heightSegments:r},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),s=Math.max(3,Math.floor(s)),r=Math.max(1,Math.floor(r));const a=[],o=[],l=[],c=[],u=t/2,h=Math.PI/2*e,d=t,m=2*h+d,_=n*2+r,v=s+1,f=new F,p=new F;for(let x=0;x<=_;x++){let E=0,b=0,w=0,T=0;if(x<=n){const P=x/n,C=P*Math.PI/2;b=-u-e*Math.cos(C),w=e*Math.sin(C),T=-e*Math.cos(C),E=P*h}else if(x<=n+r){const P=(x-n)/r;b=-u+P*t,w=e,T=0,E=h+P*d}else{const P=(x-n-r)/n,C=P*Math.PI/2;b=u+e*Math.sin(C),w=e*Math.cos(C),T=e*Math.sin(C),E=h+d+P*h}const g=Math.max(0,Math.min(1,E/m));let y=0;x===0?y=.5/s:x===_&&(y=-.5/s);for(let P=0;P<=s;P++){const C=P/s,N=C*Math.PI*2,O=Math.sin(N),W=Math.cos(N);p.x=-w*W,p.y=b,p.z=w*O,o.push(p.x,p.y,p.z),f.set(-w*W,T,w*O),f.normalize(),l.push(f.x,f.y,f.z),c.push(C+y,g)}if(x>0){const P=(x-1)*v;for(let C=0;C<s;C++){const N=P+C,O=P+C+1,W=x*v+C,R=x*v+C+1;a.push(N,O,W),a.push(O,R,W)}}}this.setIndex(a),this.setAttribute("position",new Tt(o,3)),this.setAttribute("normal",new Tt(l,3)),this.setAttribute("uv",new Tt(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Aa(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class Ra extends Wt{constructor(e=1,t=32,n=0,s=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:s},t=Math.max(3,t);const r=[],a=[],o=[],l=[],c=new F,u=new rt;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let h=0,d=3;h<=t;h++,d+=3){const m=n+h/t*s;c.x=e*Math.cos(m),c.y=e*Math.sin(m),a.push(c.x,c.y,c.z),o.push(0,0,1),u.x=(a[d]/e+1)/2,u.y=(a[d+1]/e+1)/2,l.push(u.x,u.y)}for(let h=1;h<=t;h++)r.push(h,h+1,0);this.setIndex(r),this.setAttribute("position",new Tt(a,3)),this.setAttribute("normal",new Tt(o,3)),this.setAttribute("uv",new Tt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ra(e.radius,e.segments,e.thetaStart,e.thetaLength)}}class Oi extends Wt{constructor(e=1,t=1,n=1,s=32,r=1,a=!1,o=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:s,heightSegments:r,openEnded:a,thetaStart:o,thetaLength:l};const c=this;s=Math.floor(s),r=Math.floor(r);const u=[],h=[],d=[],m=[];let _=0;const v=[],f=n/2;let p=0;x(),a===!1&&(e>0&&E(!0),t>0&&E(!1)),this.setIndex(u),this.setAttribute("position",new Tt(h,3)),this.setAttribute("normal",new Tt(d,3)),this.setAttribute("uv",new Tt(m,2));function x(){const b=new F,w=new F;let T=0;const g=(t-e)/n;for(let y=0;y<=r;y++){const P=[],C=y/r,N=C*(t-e)+e;for(let O=0;O<=s;O++){const W=O/s,R=W*l+o,I=Math.sin(R),V=Math.cos(R);w.x=N*I,w.y=-C*n+f,w.z=N*V,h.push(w.x,w.y,w.z),b.set(I,g,V).normalize(),d.push(b.x,b.y,b.z),m.push(W,1-C),P.push(_++)}v.push(P)}for(let y=0;y<s;y++)for(let P=0;P<r;P++){const C=v[P][y],N=v[P+1][y],O=v[P+1][y+1],W=v[P][y+1];(e>0||P!==0)&&(u.push(C,N,W),T+=3),(t>0||P!==r-1)&&(u.push(N,O,W),T+=3)}c.addGroup(p,T,0),p+=T}function E(b){const w=_,T=new rt,g=new F;let y=0;const P=b===!0?e:t,C=b===!0?1:-1;for(let O=1;O<=s;O++)h.push(0,f*C,0),d.push(0,C,0),m.push(.5,.5),_++;const N=_;for(let O=0;O<=s;O++){const R=O/s*l+o,I=Math.cos(R),V=Math.sin(R);g.x=P*V,g.y=f*C,g.z=P*I,h.push(g.x,g.y,g.z),d.push(0,C,0),T.x=I*.5+.5,T.y=V*.5*C+.5,m.push(T.x,T.y),_++}for(let O=0;O<s;O++){const W=w+O,R=N+O;b===!0?u.push(R,R+1,W):u.push(R+1,R,W),y+=3}c.addGroup(p,y,b===!0?1:2),p+=y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class Os extends Oi{constructor(e=1,t=1,n=32,s=1,r=!1,a=0,o=Math.PI*2){super(0,e,t,n,s,r,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:s,openEnded:r,thetaStart:a,thetaLength:o}}static fromJSON(e){return new Os(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class bl extends Wt{constructor(e=[],t=[],n=1,s=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:s};const r=[],a=[];o(s),c(n),u(),this.setAttribute("position",new Tt(r,3)),this.setAttribute("normal",new Tt(r.slice(),3)),this.setAttribute("uv",new Tt(a,2)),s===0?this.computeVertexNormals():this.normalizeNormals();function o(x){const E=new F,b=new F,w=new F;for(let T=0;T<t.length;T+=3)m(t[T+0],E),m(t[T+1],b),m(t[T+2],w),l(E,b,w,x)}function l(x,E,b,w){const T=w+1,g=[];for(let y=0;y<=T;y++){g[y]=[];const P=x.clone().lerp(b,y/T),C=E.clone().lerp(b,y/T),N=T-y;for(let O=0;O<=N;O++)O===0&&y===T?g[y][O]=P:g[y][O]=P.clone().lerp(C,O/N)}for(let y=0;y<T;y++)for(let P=0;P<2*(T-y)-1;P++){const C=Math.floor(P/2);P%2===0?(d(g[y][C+1]),d(g[y+1][C]),d(g[y][C])):(d(g[y][C+1]),d(g[y+1][C+1]),d(g[y+1][C]))}}function c(x){const E=new F;for(let b=0;b<r.length;b+=3)E.x=r[b+0],E.y=r[b+1],E.z=r[b+2],E.normalize().multiplyScalar(x),r[b+0]=E.x,r[b+1]=E.y,r[b+2]=E.z}function u(){const x=new F;for(let E=0;E<r.length;E+=3){x.x=r[E+0],x.y=r[E+1],x.z=r[E+2];const b=f(x)/2/Math.PI+.5,w=p(x)/Math.PI+.5;a.push(b,1-w)}_(),h()}function h(){for(let x=0;x<a.length;x+=6){const E=a[x+0],b=a[x+2],w=a[x+4],T=Math.max(E,b,w),g=Math.min(E,b,w);T>.9&&g<.1&&(E<.2&&(a[x+0]+=1),b<.2&&(a[x+2]+=1),w<.2&&(a[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function m(x,E){const b=x*3;E.x=e[b+0],E.y=e[b+1],E.z=e[b+2]}function _(){const x=new F,E=new F,b=new F,w=new F,T=new rt,g=new rt,y=new rt;for(let P=0,C=0;P<r.length;P+=9,C+=6){x.set(r[P+0],r[P+1],r[P+2]),E.set(r[P+3],r[P+4],r[P+5]),b.set(r[P+6],r[P+7],r[P+8]),T.set(a[C+0],a[C+1]),g.set(a[C+2],a[C+3]),y.set(a[C+4],a[C+5]),w.copy(x).add(E).add(b).divideScalar(3);const N=f(w);v(T,C+0,x,N),v(g,C+2,E,N),v(y,C+4,b,N)}}function v(x,E,b,w){w<0&&x.x===1&&(a[E]=x.x-1),b.x===0&&b.z===0&&(a[E]=w/2/Math.PI+.5)}function f(x){return Math.atan2(x.z,-x.x)}function p(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new bl(e.vertices,e.indices,e.radius,e.detail)}}class El extends bl{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,s=1/n,r=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-s,-n,0,-s,n,0,s,-n,0,s,n,-s,-n,0,-s,n,0,s,-n,0,s,n,0,-n,0,-s,n,0,-s,-n,0,s,n,0,s],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(r,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new El(e.radius,e.detail)}}class is extends Wt{constructor(e=1,t=1,n=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:s};const r=e/2,a=t/2,o=Math.floor(n),l=Math.floor(s),c=o+1,u=l+1,h=e/o,d=t/l,m=[],_=[],v=[],f=[];for(let p=0;p<u;p++){const x=p*d-a;for(let E=0;E<c;E++){const b=E*h-r;_.push(b,-x,0),v.push(0,0,1),f.push(E/o),f.push(1-p/l)}}for(let p=0;p<l;p++)for(let x=0;x<o;x++){const E=x+c*p,b=x+c*(p+1),w=x+1+c*(p+1),T=x+1+c*p;m.push(E,b,T),m.push(b,w,T)}this.setIndex(m),this.setAttribute("position",new Tt(_,3)),this.setAttribute("normal",new Tt(v,3)),this.setAttribute("uv",new Tt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new is(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ca extends Wt{constructor(e=.5,t=1,n=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:s,thetaStart:r,thetaLength:a},n=Math.max(3,n),s=Math.max(1,s);const o=[],l=[],c=[],u=[];let h=e;const d=(t-e)/s,m=new F,_=new rt;for(let v=0;v<=s;v++){for(let f=0;f<=n;f++){const p=r+f/n*a;m.x=h*Math.cos(p),m.y=h*Math.sin(p),l.push(m.x,m.y,m.z),c.push(0,0,1),_.x=(m.x/t+1)/2,_.y=(m.y/t+1)/2,u.push(_.x,_.y)}h+=d}for(let v=0;v<s;v++){const f=v*(n+1);for(let p=0;p<n;p++){const x=p+f,E=x,b=x+n+1,w=x+n+2,T=x+1;o.push(E,b,T),o.push(b,w,T)}}this.setIndex(o),this.setAttribute("position",new Tt(l,3)),this.setAttribute("normal",new Tt(c,3)),this.setAttribute("uv",new Tt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ca(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Bi extends Wt{constructor(e=1,t=32,n=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const l=Math.min(a+o,Math.PI);let c=0;const u=[],h=new F,d=new F,m=[],_=[],v=[],f=[];for(let p=0;p<=n;p++){const x=[],E=p/n,b=a+E*o,w=e*Math.cos(b),T=Math.sqrt(e*e-w*w);let g=0;p===0&&a===0?g=.5/t:p===n&&l===Math.PI&&(g=-.5/t);for(let y=0;y<=t;y++){const P=y/t,C=s+P*r;h.x=-T*Math.cos(C),h.y=w,h.z=T*Math.sin(C),_.push(h.x,h.y,h.z),d.copy(h).normalize(),v.push(d.x,d.y,d.z),f.push(P+g,1-E),x.push(c++)}u.push(x)}for(let p=0;p<n;p++)for(let x=0;x<t;x++){const E=u[p][x+1],b=u[p][x],w=u[p+1][x],T=u[p+1][x+1];(p!==0||a>0)&&m.push(E,b,T),(p!==n-1||l<Math.PI)&&m.push(b,w,T)}this.setIndex(m),this.setAttribute("position",new Tt(_,3)),this.setAttribute("normal",new Tt(v,3)),this.setAttribute("uv",new Tt(f,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Bi(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}class Pa extends Wt{constructor(e=1,t=.4,n=12,s=48,r=Math.PI*2,a=0,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:s,arc:r,thetaStart:a,thetaLength:o},n=Math.floor(n),s=Math.floor(s);const l=[],c=[],u=[],h=[],d=new F,m=new F,_=new F;for(let v=0;v<=n;v++){const f=a+v/n*o;for(let p=0;p<=s;p++){const x=p/s*r;m.x=(e+t*Math.cos(f))*Math.cos(x),m.y=(e+t*Math.cos(f))*Math.sin(x),m.z=t*Math.sin(f),c.push(m.x,m.y,m.z),d.x=e*Math.cos(x),d.y=e*Math.sin(x),_.subVectors(m,d).normalize(),u.push(_.x,_.y,_.z),h.push(p/s),h.push(v/n)}}for(let v=1;v<=n;v++)for(let f=1;f<=s;f++){const p=(s+1)*v+f-1,x=(s+1)*(v-1)+f-1,E=(s+1)*(v-1)+f,b=(s+1)*v+f;l.push(p,x,b),l.push(x,E,b)}this.setIndex(l),this.setAttribute("position",new Tt(c,3)),this.setAttribute("normal",new Tt(u,3)),this.setAttribute("uv",new Tt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Pa(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc,e.thetaStart,e.thetaLength)}}function Bs(i){const e={};for(const t in i){e[t]={};for(const n in i[t]){const s=i[t][n];if(hc(s))s.isRenderTargetTexture?(je("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=s.clone();else if(Array.isArray(s))if(hc(s[0])){const r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][n]=r}else e[t][n]=s.slice();else e[t][n]=s}}return e}function mn(i){const e={};for(let t=0;t<i.length;t++){const n=Bs(i[t]);for(const s in n)e[s]=n[s]}return e}function hc(i){return i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)}function Cd(i){const e=[];for(let t=0;t<i.length;t++)e.push(i[t].clone());return e}function Nh(i){const e=i.getRenderTarget();return e===null?i.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:pt.workingColorSpace}const Pd={clone:Bs,merge:mn};var Ld=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Dd=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Vi extends Hs{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ld,this.fragmentShader=Dd,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Bs(e.uniforms),this.uniformsGroups=Cd(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const s in this.uniforms){const a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const s in this.extensions)this.extensions[s]===!0&&(n[s]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const s=e.uniforms[n];switch(this.uniforms[n]={},s.type){case"t":this.uniforms[n].value=t[s.value]||null;break;case"c":this.uniforms[n].value=new Ue().setHex(s.value);break;case"v2":this.uniforms[n].value=new rt().fromArray(s.value);break;case"v3":this.uniforms[n].value=new F().fromArray(s.value);break;case"v4":this.uniforms[n].value=new Ft().fromArray(s.value);break;case"m3":this.uniforms[n].value=new et().fromArray(s.value);break;case"m4":this.uniforms[n].value=new Rt().fromArray(s.value);break;default:this.uniforms[n].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class Id extends Vi{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Bn extends Hs{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ue(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ue(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=nl,this.normalScale=new rt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Nd extends Hs{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Hu,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Ud extends Hs{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}class Tl extends Yt{static registerNode(e){this.prototype._lightNode=e}constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ue(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class Fd extends Tl{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ue(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const lo=new Rt,uc=new F,dc=new F;class Uh{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new rt(512,512),this.mapType=Ln,this.map=null,this.mapPass=null,this.matrix=new Rt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new dr,this._frameExtents=new rt(1,1),this._viewportCount=1,this._viewports=[new Ft(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;uc.setFromMatrixPosition(e.matrixWorld),t.position.copy(uc),dc.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(dc),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,s){lo.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(lo,e.coordinateSystem,e.reversedDepth);const r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===ur||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(lo)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.mapType=e.mapType,this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.mapType=this.mapType,e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const $r=new F,Kr=new ls,Qn=new F;class Fh extends Yt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Rt,this.projectionMatrix=new Rt,this.projectionMatrixInverse=new Rt,this.coordinateSystem=Jn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose($r,Kr,Qn),Qn.x===1&&Qn.y===1&&Qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($r,Kr,Qn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose($r,Kr,Qn),Qn.x===1&&Qn.y===1&&Qn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose($r,Kr,Qn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const Ri=new F,fc=new rt,pc=new rt;class zn extends Fh{constructor(e=50,t=1,n=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=il*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(ka*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return il*2*Math.atan(Math.tan(ka*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ri.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z),Ri.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ri.x,Ri.y).multiplyScalar(-e/Ri.z)}getViewSize(e,t){return this.getViewBounds(e,fc,pc),t.subVectors(pc,fc)}setViewOffset(e,t,n,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(ka*.5*this.fov)/this.zoom,n=2*t,s=this.aspect*n,r=-.5*s;const a=this.view;if(this.view!==null&&this.view.enabled){const l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*n/c,s*=a.width/l,n*=a.height/c}const o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class Od extends Uh{constructor(){super(new zn(90,1,.5,500)),this.isPointLightShadow=!0}}class Bd extends Tl{constructor(e,t,n=0,s=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=s,this.shadow=new Od}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class Oh extends Fh{constructor(e=-1,t=1,n=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,s=(this.top+this.bottom)/2;let r=n-e,a=n+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class zd extends Uh{constructor(){super(new Oh(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class mc extends Tl{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Yt.DEFAULT_UP),this.updateMatrix(),this.target=new Yt,this.shadow=new zd}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}const ys=-90,bs=1;class rl extends Yt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const s=new zn(ys,bs,e,t);s.layers=this.layers,this.add(s);const r=new zn(ys,bs,e,t);r.layers=this.layers,this.add(r);const a=new zn(ys,bs,e,t);a.layers=this.layers,this.add(a);const o=new zn(ys,bs,e,t);o.layers=this.layers,this.add(o);const l=new zn(ys,bs,e,t);l.layers=this.layers,this.add(l);const c=new zn(ys,bs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,s,r,a,o,l]=t;for(const c of t)this.remove(c);if(e===Jn)n.up.set(0,1,0),n.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===ur)n.up.set(0,-1,0),n.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.mipmapsAutoUpdate;n.texture.mipmapsAutoUpdate=!1;let f=!1;e.isWebGLRenderer===!0?f=e.state.buffers.depth.getReversed():f=e.reversedDepthBuffer,e.setRenderTarget(n,0,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(n,1,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(n,4,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),n.texture.mipmapsAutoUpdate=v,e.setRenderTarget(n,5,s),f&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,m),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class kd extends zn{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e,this.perCameraFrustumCulled=!1}}function gc(i,e,t,n){const s=Gd(n);switch(t){case xh:return i*e;case ml:return i*e/s.components*s.byteLength;case gl:return i*e/s.components*s.byteLength;case ns:return i*e*2/s.components*s.byteLength;case _l:return i*e*2/s.components*s.byteLength;case vh:return i*e*3/s.components*s.byteLength;case ni:return i*e*4/s.components*s.byteLength;case xl:return i*e*4/s.components*s.byteLength;case na:case ia:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case sa:case ra:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Ao:case Co:return Math.max(i,16)*Math.max(e,8)/4;case wo:case Ro:return Math.max(i,8)*Math.max(e,8)/2;case Po:case Lo:case Io:case No:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*8;case Do:case ua:case Uo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Fo:return Math.floor((i+3)/4)*Math.floor((e+3)/4)*16;case Oo:return Math.floor((i+4)/5)*Math.floor((e+3)/4)*16;case Bo:return Math.floor((i+4)/5)*Math.floor((e+4)/5)*16;case zo:return Math.floor((i+5)/6)*Math.floor((e+4)/5)*16;case ko:return Math.floor((i+5)/6)*Math.floor((e+5)/6)*16;case Go:return Math.floor((i+7)/8)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((i+7)/8)*Math.floor((e+5)/6)*16;case Vo:return Math.floor((i+7)/8)*Math.floor((e+7)/8)*16;case Wo:return Math.floor((i+9)/10)*Math.floor((e+4)/5)*16;case Xo:return Math.floor((i+9)/10)*Math.floor((e+5)/6)*16;case qo:return Math.floor((i+9)/10)*Math.floor((e+7)/8)*16;case Yo:return Math.floor((i+9)/10)*Math.floor((e+9)/10)*16;case $o:return Math.floor((i+11)/12)*Math.floor((e+9)/10)*16;case Ko:return Math.floor((i+11)/12)*Math.floor((e+11)/12)*16;case Zo:case Jo:case Qo:return Math.ceil(i/4)*Math.ceil(e/4)*16;case jo:case el:return Math.ceil(i/4)*Math.ceil(e/4)*8;case da:case tl:return Math.ceil(i/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Gd(i){switch(i){case Ln:case ph:return{byteLength:1,components:1};case hr:case mh:case ri:return{byteLength:2,components:1};case fl:case pl:return{byteLength:2,components:4};case si:case dl:case Zn:return{byteLength:4,components:1};case gh:case _h:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${i}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:hl}}));typeof window<"u"&&(window.__THREE__?je("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=hl);function Bh(){let i=null,e=!1,t=null,n=null;function s(r,a){n=i.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&i!==null&&(n=i.requestAnimationFrame(s),e=!0)},stop:function(){i!==null&&i.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){i=r}}}function Hd(i){const e=new WeakMap;function t(o,l){const c=o.array,u=o.usage,h=c.byteLength,d=i.createBuffer();i.bindBuffer(l,d),i.bufferData(l,c,u),o.onUploadCallback();let m;if(c instanceof Float32Array)m=i.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=i.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?m=i.HALF_FLOAT:m=i.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=i.SHORT;else if(c instanceof Uint32Array)m=i.UNSIGNED_INT;else if(c instanceof Int32Array)m=i.INT;else if(c instanceof Int8Array)m=i.BYTE;else if(c instanceof Uint8Array)m=i.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=i.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function n(o,l,c){const u=l.array,h=l.updateRanges;if(i.bindBuffer(c,o),h.length===0)i.bufferSubData(c,0,u);else{h.sort((m,_)=>m.start-_.start);let d=0;for(let m=1;m<h.length;m++){const _=h[d],v=h[m];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++d,h[d]=v)}h.length=d+1;for(let m=0,_=h.length;m<_;m++){const v=h[m];i.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);const l=e.get(o);l&&(i.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Vd=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Wd=`#ifdef USE_ALPHAHASH
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
#endif`,Xd=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,qd=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Yd=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,$d=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Kd=`#ifdef USE_AOMAP
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
#endif`,Zd=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Jd=`#ifdef USE_BATCHING
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
#endif`,Qd=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,jd=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,ef=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,tf=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,nf=`#ifdef USE_IRIDESCENCE
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
#endif`,sf=`#ifdef USE_BUMPMAP
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
#endif`,rf=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,af=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,of=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,lf=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,cf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,hf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,uf=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,df=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,ff=`#define PI 3.141592653589793
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
} // validated`,pf=`vec3 transformedNormal = objectNormal;
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
#endif`,mf=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,gf=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,_f=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,xf=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,vf="gl_FragColor = linearToOutputTexel( gl_FragColor );",Mf=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Sf=`#ifdef USE_ENVMAP
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
#endif`,yf=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	uniform samplerCube envMap;
	#ifdef ENVMAP_TYPE_PMREM
		float roughnessToMip( const in float roughness ) {
			float r = clamp( roughness, 0.0, 1.0 );
			return ENVMAP_MAX_LOD * r * ( 2.0 - r );
		}
	#endif
#endif`,bf=`#ifdef USE_ENVMAP
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
#endif`,Ef=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Tf=`#ifdef USE_ENVMAP
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
#endif`,wf=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Af=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Rf=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Cf=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Pf=`#ifdef USE_GRADIENTMAP
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
}`,Lf=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Df=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,If=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Nf=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,Uf=`#ifdef USE_ENVMAP
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
#endif`,Ff=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Of=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Bf=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,zf=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,kf=`PhysicalMaterial material;
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
#endif`,Gf=`uniform sampler2D dfgLUT;
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
}`,Hf=`
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
#endif`,Vf=`#if defined( RE_IndirectDiffuse )
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
#endif`,Wf=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Xf=`#if NUM_LIGHT_PROBE_GRIDS > 0
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
#endif`,qf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Yf=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$f=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Kf=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Zf=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Jf=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Qf=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,jf=`#if defined( USE_POINTS_UV )
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
#endif`,ep=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,tp=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,np=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,ip=`#if defined( USE_MORPHCOLORS )
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
#endif`,sp=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,rp=`#ifdef USE_MORPHTARGETS
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
#endif`,ap=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,op=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,lp=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,cp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,hp=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,up=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,dp=`#ifdef USE_NORMALMAP
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
#endif`,fp=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,pp=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,mp=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,gp=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,_p=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,xp=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,vp=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Mp=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Sp=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,yp=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,bp=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Ep=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Tp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,wp=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ap=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Rp=`float getShadowMask() {
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
}`,Cp=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Pp=`#ifdef USE_SKINNING
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
#endif`,Lp=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Dp=`#ifdef USE_SKINNING
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
#endif`,Ip=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Np=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Up=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Fp=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Op=`#ifdef USE_TRANSMISSION
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
#endif`,Bp=`#ifdef USE_TRANSMISSION
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
#endif`,zp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,kp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Gp=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Hp=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Vp=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Wp=`uniform sampler2D t2D;
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
}`,Xp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,qp=`uniform float backgroundBlurriness;
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
}`,Yp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$p=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Kp=`#include <common>
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
}`,Zp=`#if DEPTH_PACKING == 3200
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
}`,Jp=`#define DISTANCE
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
}`,Qp=`#define DISTANCE
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
}`,jp=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,e0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,t0=`uniform float scale;
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
}`,n0=`uniform vec3 diffuse;
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
}`,i0=`#include <common>
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
}`,s0=`uniform vec3 diffuse;
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
}`,r0=`#define LAMBERT
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
}`,a0=`#define LAMBERT
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
}`,o0=`#define MATCAP
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
}`,l0=`#define MATCAP
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
}`,c0=`#define NORMAL
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
}`,h0=`#define NORMAL
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
}`,u0=`#define PHONG
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
}`,d0=`#define PHONG
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
}`,f0=`#define STANDARD
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
}`,p0=`#define STANDARD
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
}`,m0=`#define TOON
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
}`,g0=`#define TOON
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
}`,_0=`uniform float size;
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
}`,x0=`uniform vec3 diffuse;
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
}`,v0=`#include <common>
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
}`,M0=`uniform vec3 color;
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
}`,S0=`uniform float rotation;
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
}`,y0=`uniform vec3 diffuse;
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
}`,ot={alphahash_fragment:Vd,alphahash_pars_fragment:Wd,alphamap_fragment:Xd,alphamap_pars_fragment:qd,alphatest_fragment:Yd,alphatest_pars_fragment:$d,aomap_fragment:Kd,aomap_pars_fragment:Zd,batching_pars_vertex:Jd,batching_vertex:Qd,begin_vertex:jd,beginnormal_vertex:ef,bsdfs:tf,iridescence_fragment:nf,bumpmap_pars_fragment:sf,clipping_planes_fragment:rf,clipping_planes_pars_fragment:af,clipping_planes_pars_vertex:of,clipping_planes_vertex:lf,color_fragment:cf,color_pars_fragment:hf,color_pars_vertex:uf,color_vertex:df,common:ff,defaultnormal_vertex:pf,displacementmap_pars_vertex:mf,displacementmap_vertex:gf,emissivemap_fragment:_f,emissivemap_pars_fragment:xf,colorspace_fragment:vf,colorspace_pars_fragment:Mf,envmap_fragment:Sf,envmap_common_pars_fragment:yf,envmap_pars_fragment:bf,envmap_pars_vertex:Ef,envmap_physical_pars_fragment:Uf,envmap_vertex:Tf,fog_vertex:wf,fog_pars_vertex:Af,fog_fragment:Rf,fog_pars_fragment:Cf,gradientmap_pars_fragment:Pf,lightmap_pars_fragment:Lf,lights_lambert_fragment:Df,lights_lambert_pars_fragment:If,lights_pars_begin:Nf,lights_toon_fragment:Ff,lights_toon_pars_fragment:Of,lights_phong_fragment:Bf,lights_phong_pars_fragment:zf,lights_physical_fragment:kf,lights_physical_pars_fragment:Gf,lights_fragment_begin:Hf,lights_fragment_maps:Vf,lights_fragment_end:Wf,lightprobes_pars_fragment:Xf,logdepthbuf_fragment:qf,logdepthbuf_pars_fragment:Yf,logdepthbuf_pars_vertex:$f,logdepthbuf_vertex:Kf,map_fragment:Zf,map_pars_fragment:Jf,map_particle_fragment:Qf,map_particle_pars_fragment:jf,metalnessmap_fragment:ep,metalnessmap_pars_fragment:tp,morphinstance_vertex:np,morphcolor_vertex:ip,morphnormal_vertex:sp,morphtarget_pars_vertex:rp,morphtarget_vertex:ap,normal_fragment_begin:op,normal_fragment_maps:lp,normal_pars_fragment:cp,normal_pars_vertex:hp,normal_vertex:up,normalmap_pars_fragment:dp,clearcoat_normal_fragment_begin:fp,clearcoat_normal_fragment_maps:pp,clearcoat_pars_fragment:mp,iridescence_pars_fragment:gp,opaque_fragment:_p,packing:xp,premultiplied_alpha_fragment:vp,project_vertex:Mp,dithering_fragment:Sp,dithering_pars_fragment:yp,roughnessmap_fragment:bp,roughnessmap_pars_fragment:Ep,shadowmap_pars_fragment:Tp,shadowmap_pars_vertex:wp,shadowmap_vertex:Ap,shadowmask_pars_fragment:Rp,skinbase_vertex:Cp,skinning_pars_vertex:Pp,skinning_vertex:Lp,skinnormal_vertex:Dp,specularmap_fragment:Ip,specularmap_pars_fragment:Np,tonemapping_fragment:Up,tonemapping_pars_fragment:Fp,transmission_fragment:Op,transmission_pars_fragment:Bp,uv_pars_fragment:zp,uv_pars_vertex:kp,uv_vertex:Gp,worldpos_vertex:Hp,background_vert:Vp,background_frag:Wp,backgroundCube_vert:Xp,backgroundCube_frag:qp,cube_vert:Yp,cube_frag:$p,depth_vert:Kp,depth_frag:Zp,distance_vert:Jp,distance_frag:Qp,equirect_vert:jp,equirect_frag:e0,linedashed_vert:t0,linedashed_frag:n0,meshbasic_vert:i0,meshbasic_frag:s0,meshlambert_vert:r0,meshlambert_frag:a0,meshmatcap_vert:o0,meshmatcap_frag:l0,meshnormal_vert:c0,meshnormal_frag:h0,meshphong_vert:u0,meshphong_frag:d0,meshphysical_vert:f0,meshphysical_frag:p0,meshtoon_vert:m0,meshtoon_frag:g0,points_vert:_0,points_frag:x0,shadow_vert:v0,shadow_frag:M0,sprite_vert:S0,sprite_frag:y0},Pe={common:{diffuse:{value:new Ue(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new et}},envmap:{envMap:{value:null},envMapRotation:{value:new et},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new et}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new et}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new et},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new et},normalScale:{value:new rt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new et},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new et}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new et}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new et}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ue(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:[]},probesMin:{value:[]},probesMax:{value:[]},probesResolution:{value:[]}},points:{diffuse:{value:new Ue(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0},uvTransform:{value:new et}},sprite:{diffuse:{value:new Ue(16777215)},opacity:{value:1},center:{value:new rt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new et},alphaMap:{value:null},alphaMapTransform:{value:new et},alphaTest:{value:0}}},ti={basic:{uniforms:mn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.fog]),vertexShader:ot.meshbasic_vert,fragmentShader:ot.meshbasic_frag},lambert:{uniforms:mn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Ue(0)},envMapIntensity:{value:1}}]),vertexShader:ot.meshlambert_vert,fragmentShader:ot.meshlambert_frag},phong:{uniforms:mn([Pe.common,Pe.specularmap,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,Pe.lights,{emissive:{value:new Ue(0)},specular:{value:new Ue(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:ot.meshphong_vert,fragmentShader:ot.meshphong_frag},standard:{uniforms:mn([Pe.common,Pe.envmap,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.roughnessmap,Pe.metalnessmap,Pe.fog,Pe.lights,{emissive:{value:new Ue(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag},toon:{uniforms:mn([Pe.common,Pe.aomap,Pe.lightmap,Pe.emissivemap,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.gradientmap,Pe.fog,Pe.lights,{emissive:{value:new Ue(0)}}]),vertexShader:ot.meshtoon_vert,fragmentShader:ot.meshtoon_frag},matcap:{uniforms:mn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,Pe.fog,{matcap:{value:null}}]),vertexShader:ot.meshmatcap_vert,fragmentShader:ot.meshmatcap_frag},points:{uniforms:mn([Pe.points,Pe.fog]),vertexShader:ot.points_vert,fragmentShader:ot.points_frag},dashed:{uniforms:mn([Pe.common,Pe.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:ot.linedashed_vert,fragmentShader:ot.linedashed_frag},depth:{uniforms:mn([Pe.common,Pe.displacementmap]),vertexShader:ot.depth_vert,fragmentShader:ot.depth_frag},normal:{uniforms:mn([Pe.common,Pe.bumpmap,Pe.normalmap,Pe.displacementmap,{opacity:{value:1}}]),vertexShader:ot.meshnormal_vert,fragmentShader:ot.meshnormal_frag},sprite:{uniforms:mn([Pe.sprite,Pe.fog]),vertexShader:ot.sprite_vert,fragmentShader:ot.sprite_frag},background:{uniforms:{uvTransform:{value:new et},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:ot.background_vert,fragmentShader:ot.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new et}},vertexShader:ot.backgroundCube_vert,fragmentShader:ot.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:ot.cube_vert,fragmentShader:ot.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:ot.equirect_vert,fragmentShader:ot.equirect_frag},distance:{uniforms:mn([Pe.common,Pe.displacementmap,{referencePosition:{value:new F},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:ot.distance_vert,fragmentShader:ot.distance_frag},shadow:{uniforms:mn([Pe.lights,Pe.fog,{color:{value:new Ue(0)},opacity:{value:1}}]),vertexShader:ot.shadow_vert,fragmentShader:ot.shadow_frag}};ti.physical={uniforms:mn([ti.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new et},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new et},clearcoatNormalScale:{value:new rt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new et},diffuseRoughness:{value:0},diffuseRoughnessMap:{value:null},diffuseRoughnessMapTransform:{value:new et},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new et},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new et},sheen:{value:0},sheenColor:{value:new Ue(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new et},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new et},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new et},transmissionSamplerSize:{value:new rt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new et},attenuationDistance:{value:0},attenuationColor:{value:new Ue(0)},specularColor:{value:new Ue(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new et},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new et},anisotropyVector:{value:new rt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new et}}]),vertexShader:ot.meshphysical_vert,fragmentShader:ot.meshphysical_frag};const Zr={r:0,b:0,g:0},b0=new Rt,zh=new et;zh.set(-1,0,0,0,1,0,0,0,1);function E0(i,e,t,n,s,r){const a=new Ue(0);let o=s===!0?0:1,l,c,u=null,h=0,d=null;function m(x){let E=x.isScene===!0?x.background:null;if(E&&E.isTexture){const b=x.backgroundBlurriness>0;E=e.get(E,b)}return E}function _(x){let E=!1;const b=m(x);b===null?f(a,o):b&&b.isColor&&(f(b,1),E=!0);const w=i.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(i.autoClear||E)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),i.clear(i.autoClearColor,i.autoClearDepth,i.autoClearStencil))}function v(x,E){const b=m(E);b&&b.isCubeTexture?(c===void 0&&(c=new Ot(new Vs(1,1,1),new Vi({name:"BackgroundCubeMaterial",uniforms:Bs(ti.backgroundCube.uniforms),vertexShader:ti.backgroundCube.vertexShader,fragmentShader:ti.backgroundCube.fragmentShader,side:_n,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,T,g){this.matrixWorld.copyPosition(g.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(c)),c.material.uniforms.envMap.value=b,c.material.uniforms.backgroundBlurriness.value=E.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(b0.makeRotationFromEuler(E.backgroundRotation)).transpose(),b.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(zh),c.material.toneMapped=pt.getTransfer(b.colorSpace)!==wt,(u!==b||h!==b.version||d!==i.toneMapping)&&(c.material.needsUpdate=!0,u=b,h=b.version,d=i.toneMapping),c.layers.enableAll(),x.unshift(c,c.geometry,c.material,0,0,null)):b&&b.isTexture&&(l===void 0&&(l=new Ot(new is(2,2),new Vi({name:"BackgroundMaterial",uniforms:Bs(ti.background.uniforms),vertexShader:ti.background.vertexShader,fragmentShader:ti.background.fragmentShader,side:ts,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(l)),l.material.uniforms.t2D.value=b,l.material.uniforms.backgroundIntensity.value=E.backgroundIntensity,l.material.toneMapped=pt.getTransfer(b.colorSpace)!==wt,b.matrixAutoUpdate===!0&&b.updateMatrix(),l.material.uniforms.uvTransform.value.copy(b.matrix),(u!==b||h!==b.version||d!==i.toneMapping)&&(l.material.needsUpdate=!0,u=b,h=b.version,d=i.toneMapping),l.layers.enableAll(),x.unshift(l,l.geometry,l.material,0,0,null))}function f(x,E){x.getRGB(Zr,Nh(i)),t.buffers.color.setClear(Zr.r,Zr.g,Zr.b,E,r)}function p(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(x,E=1){a.set(x),o=E,f(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(x){o=x,f(a,o)},render:_,addToRenderList:v,dispose:p}}function T0(i,e){const t=i.getParameter(i.MAX_VERTEX_ATTRIBS),n={},s=d(null);let r=s,a=!1;function o(N,O,W,R,I){let V=!1;const B=h(N,R,W,O);r!==B&&(r=B,c(r.object)),V=m(N,R,W,I),V&&_(N,R,W,I),I!==null&&e.update(I,i.ELEMENT_ARRAY_BUFFER),(V||a)&&(a=!1,b(N,O,W,R),I!==null&&i.bindBuffer(i.ELEMENT_ARRAY_BUFFER,e.get(I).buffer))}function l(){return i.createVertexArray()}function c(N){return i.bindVertexArray(N)}function u(N){return i.deleteVertexArray(N)}function h(N,O,W,R){const I=R.wireframe===!0;let V=n[O.id];V===void 0&&(V={},n[O.id]=V);const B=N.isInstancedMesh===!0?N.id:0;let se=V[B];se===void 0&&(se={},V[B]=se);let Y=se[W.id];Y===void 0&&(Y={},se[W.id]=Y);let j=Y[I];return j===void 0&&(j=d(l()),Y[I]=j),j}function d(N){const O=[],W=[],R=[];for(let I=0;I<t;I++)O[I]=0,W[I]=0,R[I]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:W,attributeDivisors:R,object:N,attributes:{},index:null}}function m(N,O,W,R){const I=r.attributes,V=O.attributes;let B=0;const se=W.getAttributes();for(const Y in se)if(se[Y].location>=0){const ie=I[Y];let Le=V[Y];if(Le===void 0&&(Y==="instanceMatrix"&&N.instanceMatrix&&(Le=N.instanceMatrix),Y==="instanceColor"&&N.instanceColor&&(Le=N.instanceColor)),ie===void 0||ie.attribute!==Le||Le&&ie.data!==Le.data)return!0;B++}return r.attributesNum!==B||r.index!==R}function _(N,O,W,R){const I={},V=O.attributes;let B=0;const se=W.getAttributes();for(const Y in se)if(se[Y].location>=0){let ie=V[Y];ie===void 0&&(Y==="instanceMatrix"&&N.instanceMatrix&&(ie=N.instanceMatrix),Y==="instanceColor"&&N.instanceColor&&(ie=N.instanceColor));const Le={};Le.attribute=ie,ie&&ie.data&&(Le.data=ie.data),I[Y]=Le,B++}r.attributes=I,r.attributesNum=B,r.index=R}function v(){const N=r.newAttributes;for(let O=0,W=N.length;O<W;O++)N[O]=0}function f(N){p(N,0)}function p(N,O){const W=r.newAttributes,R=r.enabledAttributes,I=r.attributeDivisors;W[N]=1,R[N]===0&&(i.enableVertexAttribArray(N),R[N]=1),I[N]!==O&&(i.vertexAttribDivisor(N,O),I[N]=O)}function x(){const N=r.newAttributes,O=r.enabledAttributes;for(let W=0,R=O.length;W<R;W++)O[W]!==N[W]&&(i.disableVertexAttribArray(W),O[W]=0)}function E(N,O,W,R,I,V,B){B===!0?i.vertexAttribIPointer(N,O,W,I,V):i.vertexAttribPointer(N,O,W,R,I,V)}function b(N,O,W,R){v();const I=R.attributes,V=W.getAttributes(),B=O.defaultAttributeValues;for(const se in V){const Y=V[se];if(Y.location>=0){let j=I[se];if(j===void 0&&(se==="instanceMatrix"&&N.instanceMatrix&&(j=N.instanceMatrix),se==="instanceColor"&&N.instanceColor&&(j=N.instanceColor)),j!==void 0){const ie=j.normalized,Le=j.itemSize,Fe=e.get(j);if(Fe===void 0)continue;const $=Fe.buffer,Se=Fe.type,Ne=Fe.bytesPerElement,We=Se===i.INT||Se===i.UNSIGNED_INT||j.gpuType===dl;if(j.isInterleavedBufferAttribute){const Re=j.data,qe=Re.isInterleavedBuffer===!0?Re.stride:Re.itemSize,xt=j.offset;if(Re.isInstancedInterleavedBuffer||Re.isInstancedBufferAttribute){for(let Ke=0;Ke<Y.locationSize;Ke++)p(Y.location+Ke,Re.meshPerAttribute);N.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=Re.meshPerAttribute*Re.count)}else for(let Ke=0;Ke<Y.locationSize;Ke++)f(Y.location+Ke);i.bindBuffer(i.ARRAY_BUFFER,$);for(let Ke=0;Ke<Y.locationSize;Ke++)E(Y.location+Ke,Le/Y.locationSize,Se,ie,qe*Ne,(xt+Le/Y.locationSize*Ke)*Ne,We)}else{if(j.isInstancedBufferAttribute){for(let Re=0;Re<Y.locationSize;Re++)p(Y.location+Re,j.meshPerAttribute);N.isInstancedMesh!==!0&&R._maxInstanceCount===void 0&&(R._maxInstanceCount=j.meshPerAttribute*j.count)}else for(let Re=0;Re<Y.locationSize;Re++)f(Y.location+Re);i.bindBuffer(i.ARRAY_BUFFER,$);for(let Re=0;Re<Y.locationSize;Re++)E(Y.location+Re,Le/Y.locationSize,Se,ie,Le*Ne,Le/Y.locationSize*Re*Ne,We)}}else if(B!==void 0){const ie=B[se];if(ie!==void 0)switch(ie.length){case 2:i.vertexAttrib2fv(Y.location,ie);break;case 3:i.vertexAttrib3fv(Y.location,ie);break;case 4:i.vertexAttrib4fv(Y.location,ie);break;default:i.vertexAttrib1fv(Y.location,ie)}}}}x()}function w(){P();for(const N in n){const O=n[N];for(const W in O){const R=O[W];for(const I in R){const V=R[I];for(const B in V)u(V[B].object),delete V[B];delete R[I]}}delete n[N]}}function T(N){if(n[N.id]===void 0)return;const O=n[N.id];for(const W in O){const R=O[W];for(const I in R){const V=R[I];for(const B in V)u(V[B].object),delete V[B];delete R[I]}}delete n[N.id]}function g(N){for(const O in n){const W=n[O];for(const R in W){const I=W[R];if(I[N.id]===void 0)continue;const V=I[N.id];for(const B in V)u(V[B].object),delete V[B];delete I[N.id]}}}function y(N){for(const O in n){const W=n[O],R=N.isInstancedMesh===!0?N.id:0,I=W[R];if(I!==void 0){for(const V in I){const B=I[V];for(const se in B)u(B[se].object),delete B[se];delete I[V]}delete W[R],Object.keys(W).length===0&&delete n[O]}}}function P(){C(),a=!0,r!==s&&(r=s,c(r.object))}function C(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:P,resetDefaultState:C,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfObject:y,releaseStatesOfProgram:g,initAttributes:v,enableAttribute:f,disableUnusedAttributes:x}}function w0(i,e,t){let n;function s(l){n=l}function r(l,c){i.drawArrays(n,l,c),t.update(c,n,1)}function a(l,c,u){u!==0&&(i.drawArraysInstanced(n,l,c,u),t.update(c,n,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,l,0,c,0,u);let d=0;for(let m=0;m<u;m++)d+=c[m];t.update(d,n,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function A0(i,e,t,n){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){const g=e.get("EXT_texture_filter_anisotropic");s=i.getParameter(g.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(g){return!(g!==ni&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(g){const y=g===ri&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(g!==Ln&&g!==Zn&&!y&&n.convert(g)!==i.getParameter(i.IMPLEMENTATION_COLOR_READ_TYPE))}function l(g){if(g==="highp"){if(i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.HIGH_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.HIGH_FLOAT).precision>0)return"highp";g="mediump"}return g==="mediump"&&i.getShaderPrecisionFormat(i.VERTEX_SHADER,i.MEDIUM_FLOAT).precision>0&&i.getShaderPrecisionFormat(i.FRAGMENT_SHADER,i.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(je("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),d=t.logarithmicDepthBuffer===!0&&h===!1;t.reversedDepthBuffer===!0&&h===!1&&je("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer."),t.logarithmicDepthBuffer===!0&&h===!0&&je("WebGLRenderer: Logarithmic depth buffer is ignored when reversed depth buffer is enabled.");const m=i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS),_=i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=i.getParameter(i.MAX_TEXTURE_SIZE),f=i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE),p=i.getParameter(i.MAX_VERTEX_ATTRIBS),x=i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS),E=i.getParameter(i.MAX_VARYING_VECTORS),b=i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS),w=i.getParameter(i.MAX_SAMPLES),T=i.getParameter(i.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:f,maxAttributes:p,maxVertexUniforms:x,maxVaryings:E,maxFragmentUniforms:b,maxSamples:w,samples:T}}function R0(i){const e=this;let t=null,n=0,s=!1,r=!1;const a=new Pi,o=new et,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){const m=h.length!==0||d||n!==0||s;return s=d,n=h.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,m){const _=h.clippingPlanes,v=h.clipIntersection,f=h.clipShadows,p=i.get(h);if(!s||_===null||_.length===0||r&&!f)r?u(null):c();else{const x=r?0:n,E=x*4;let b=p.clippingState||null;l.value=b,b=u(_,d,E,m);for(let w=0;w!==E;++w)b[w]=t[w];p.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(h,d,m,_){const v=h!==null?h.length:0;let f=null;if(v!==0){if(f=l.value,_!==!0||f===null){const p=m+v*4,x=d.matrixWorldInverse;o.getNormalMatrix(x),(f===null||f.length<p)&&(f=new Float32Array(p));for(let E=0,b=m;E!==v;++E,b+=4)a.copy(h[E]).applyMatrix4(x,o),a.normal.toArray(f,b),f[b+3]=a.constant}l.value=f,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,f}}class wl extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},s=[n,n,n,n,n,n];this.texture=new Lh(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Vs(5,5,5),r=new Vi({name:"CubemapFromEquirect",uniforms:Bs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:_n,blending:Cs});r.uniforms.tEquirect.value=t;const a=new Ot(s,r),o=t.minFilter;return t.minFilter===Ui&&(t.minFilter=Tn),new rl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,s=!0){const r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,s);e.setRenderTarget(r)}}const _c=256,C0=3,P0=20,kh=256,Gh=16,L0=3,D0=new F,I0=new Ue;class ga{constructor(e){this._renderer=e,this._cubeSize=0,this._sourceTarget=null,this._cubeCamera=new rl(1,10,null),this._boxMesh=new Ot(new Vs(5,5,5),null),this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null,this._integrationMaterial=null}fromScene(e,t=0,n=.1,s=100,r={}){const{size:a=256,position:o=D0}=r,l=this._renderer;this._setSize(a);const c=this._allocateTarget(),u=this._getSourceTarget(!0);t>0&&(u.texture.mipmapsAutoUpdate=!1);const h=l.autoClear,d=l.autoClearColor,m=l.autoClearDepth,_=l.autoClearStencil,v=e.background;l.autoClear=!0,l.autoClearColor=!0,l.autoClearDepth=!0,l.autoClearStencil=!0,v===null&&(e.background=l.getClearColor(I0));const f=new rl(n,s,u);return f.position.copy(o),f.update(l,e),l.autoClear=h,l.autoClearColor=d,l.autoClearDepth=m,l.autoClearStencil=_,e.background=v,t>0&&(u.texture.mipmapsAutoUpdate=!0,this._blur(c,t)),this._applyPMREM(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Mc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=vc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._sourceTarget!==null&&this._sourceTarget.dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._integrationMaterial!==null&&this._integrationMaterial.dispose(),this._boxMesh.geometry.dispose()}static lodToRoughness(e,t){return t>0?1-Math.sqrt(1-e/t):0}_setSize(e){this._cubeSize=Math.max(_c,nd(e))}_fromTexture(e,t){e.mapping===Ns||e.mapping===cr?this._setSize(e.image.length===0?_c:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4);const n=t||this._allocateTarget();return this._textureToCubemap(e),this._applyPMREM(n),n}_allocateTarget(){const e=this._cubeSize,t=xc(e,!1,!1),n=Math.log2(e)-C0;for(let s=0;s<=n;s++)t.texture.mipmaps.push({width:e>>s,height:e>>s});return t.texture.name="PMREM",t.texture.isPMREMTexture=!0,t}_getSourceTarget(e=!1){const t=this._cubeSize,n=this._sourceTarget;return(n===null||n.width!==t||e&&n.depthBuffer===!1)&&(n!==null&&n.dispose(),this._sourceTarget=xc(t,!0,e)),this._sourceTarget}_compileMaterial(e){this._boxMesh.material=e,this._renderer.compile(this._boxMesh,this._cubeCamera.children[0])}_renderCube(e,t,n){const s=this._boxMesh,r=this._cubeCamera;s.material=n,r.renderTarget=e,r.activeMipmapLevel=t;const a=e.width>>t;e.viewport.set(0,0,a,a),r.update(this._renderer,s),e.viewport.set(0,0,e.width,e.height)}_textureToCubemap(e){let t;e.mapping===Ns||e.mapping===cr?(this._cubemapMaterial===null&&(this._cubemapMaterial=Mc()),t=this._cubemapMaterial,t.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):(this._equirectMaterial===null&&(this._equirectMaterial=vc()),t=this._equirectMaterial),t.uniforms.envMap.value=e,this._renderCube(this._getSourceTarget(),0,t)}_applyPMREM(e){this._ggxMaterial===null&&(this._ggxMaterial=N0(),this._integrationMaterial=U0());const t=this._cubeSize,n=e.texture.mipmaps.length-1,s=this._ggxMaterial.uniforms;s.envMap.value=this._sourceTarget.texture;const r=this._integrationMaterial.uniforms;r.envMap.value=this._sourceTarget.texture,r.sourceLod.value=Math.log2(t/Gh);for(let a=0;a<=n;a++){const o=ga.lodToRoughness(a,n);if(a>n-L0)r.roughness.value=o,this._renderCube(e,a,this._integrationMaterial);else{const l=o>0?Math.log2(t)+.5*Math.log2(6/(kh*Math.pow(o,4)))+.5:0;s.roughness.value=o,s.lodBias.value=l,this._renderCube(e,a,this._ggxMaterial)}}}_blur(e,t){this._blurMaterial===null&&(this._blurMaterial=F0());const n=this._blurMaterial,s=n.uniforms,r=this._sourceTarget;s.sigma.value=Math.min(t,Math.PI)/Math.SQRT2,s.envMap.value=r.texture,this._renderCube(e,0,n),s.envMap.value=e.texture,this._renderCube(r,0,n)}}function xc(i,e,t){return new wl(i,{minFilter:Ui,generateMipmaps:e,type:ri,colorSpace:fa,depthBuffer:t})}function Sr(i,e,t){return new Vi({name:i,uniforms:e,vertexShader:ot.cube_vert,fragmentShader:t,side:_n,blending:Cs,depthTest:!1,depthWrite:!1})}function N0(){return Sr("PMREMGGXConvolution",{envMap:{value:null},roughness:{value:0},lodBias:{value:0}},`

		#define GGX_SAMPLES ${kh}u

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
	`)}function U0(){return Sr("PMREMGGXIntegration",{envMap:{value:null},roughness:{value:0},sourceLod:{value:0},sourceSize:{value:Gh}},`

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
	`)}function F0(){return Sr("PMREMSphericalGaussianBlur",{envMap:{value:null},sigma:{value:0}},`

		#define SAMPLES ${P0}
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
	`)}function vc(){return Sr("PMREMEquirectangularToCubemap",{envMap:{value:null}},`

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
	`)}function Mc(){return Sr("PMREMCubemapToCubemap",{envMap:{value:null},flipEnvMap:{value:-1}},`

		varying vec3 vWorldDirection;

		uniform samplerCube envMap;
		uniform float flipEnvMap;

		void main() {

			gl_FragColor = vec4( textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) ).rgb, 1.0 );

		}
	`)}function O0(i){let e=new WeakMap,t=new WeakMap,n=null;function s(d,m=!1){return d==null?null:m?a(d):r(d)}function r(d){if(d&&d.isTexture){const m=d.mapping;if(m===Fa||m===Oa)if(e.has(d)){const _=e.get(d).texture;return o(_,d.mapping)}else{const _=d.image;if(_&&_.height>0){const v=new wl(_.height);return v.fromEquirectangularTexture(i,d),e.set(d,v),d.addEventListener("dispose",c),o(v.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture&&d.isPMREMTexture!==!0){const m=d.mapping,_=m===Fa||m===Oa,v=m===Ns||m===cr;if(_||v){let f=t.get(d);const p=f!==void 0?f.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==p)return n===null&&(n=new ga(i)),f=_?n.fromEquirectangular(d,f):n.fromCubemap(d,f),f.texture.pmremVersion=d.pmremVersion,t.set(d,f),f.texture;if(f!==void 0)return f.texture;{const x=d.image;return _&&x&&x.height>0||v&&x&&l(x)?(n===null&&(n=new ga(i)),f=_?n.fromEquirectangular(d):n.fromCubemap(d),f.texture.pmremVersion=d.pmremVersion,t.set(d,f),d.addEventListener("dispose",u),f.texture):null}}}return d}function o(d,m){return m===Fa?d.mapping=Ns:m===Oa&&(d.mapping=cr),d}function l(d){let m=0;const _=6;for(let v=0;v<_;v++)d[v]!==void 0&&m++;return m===_}function c(d){const m=d.target;m.removeEventListener("dispose",c);const _=e.get(m);_!==void 0&&(e.delete(m),_.dispose())}function u(d){const m=d.target;m.removeEventListener("dispose",u);const _=t.get(m);_!==void 0&&(t.delete(m),_.dispose())}function h(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:s,dispose:h}}function B0(i){const e={};function t(n){if(e[n]!==void 0)return e[n];const s=i.getExtension(n);return e[n]=s,s}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const s=t(n);return s===null&&aa("WebGLRenderer: "+n+" extension not supported."),s}}}function z0(i,e,t,n){const s={},r=new WeakMap,a=new FinalizationRegistry(_=>delete s[_]);function o(_){l(_.target)}function l(_){_.index!==null&&e.remove(_.index);for(const f in _.attributes)e.remove(_.attributes[f]);_.removeEventListener("dispose",o),delete s[_.id],a.unregister(_);const v=r.get(_);v&&(e.remove(v),r.delete(_)),n.releaseStatesOfGeometry(_),_.isInstancedBufferGeometry===!0&&delete _._maxInstanceCount,t.memory.geometries--}function c(_,v){return s[v.id]!==void 0||(v.addEventListener("dispose",o),s[v.id]=new WeakRef(v),a.register(v,v.id,v),t.memory.geometries++),v}function u(_){const v=_.attributes;for(const f in v)e.update(v[f],i.ARRAY_BUFFER)}function h(_){const v=_.index,f=_.attributes.position;let p=0;if(f===void 0)return;const x=v!==null?v.array.length:f.array.length/3-1,E=f.count>=65535?Rh:Ah,b=new E(Math.ceil(x/3)*6,1),w=b.array;if(v!==null){const g=v.array;p=v.version;for(let y=0,P=0;y<x;y+=3){const C=g[y+0],N=g[y+1],O=g[y+2];w[P++]=C,w[P++]=N,w[P++]=N,w[P++]=O,w[P++]=O,w[P++]=C}}else{p=f.version;for(let g=0,y=0;g<x;g+=3){const P=g+0,C=g+1,N=g+2;w[y++]=P,w[y++]=C,w[y++]=C,w[y++]=N,w[y++]=N,w[y++]=P}}b.version=p;const T=r.get(_);T&&e.remove(T),r.set(_,b)}function d(_){const v=r.get(_);if(v){const f=_.index;f!==null&&v.version<f.version&&h(_)}else h(_);return r.get(_)}function m(){for(const _ in s){const v=s[_].deref();v!==void 0&&l(v)}}return{get:c,update:u,getWireframeAttribute:d,dispose:m}}function k0(i,e,t){let n;function s(h){n=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,d){i.drawElements(n,d,r,h*a),t.update(d,n,1)}function c(h,d,m){m!==0&&(i.drawElementsInstanced(n,d,r,h*a,m),t.update(d,n,m))}function u(h,d,m){if(m===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,d,0,r,h,0,m);let v=0;for(let f=0;f<m;f++)v+=d[f];t.update(v,n,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function G0(i){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(t.calls++,a){case i.TRIANGLES:t.triangles+=o*(r/3);break;case i.LINES:t.lines+=o*(r/2);break;case i.LINE_STRIP:t.lines+=o*(r-1);break;case i.LINE_LOOP:t.lines+=o*r;break;case i.POINTS:t.points+=o*r;break;default:yt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:n}}function H0(i,e,t){const n=new WeakMap,s=new Ft;function r(a,o,l){const c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0;let d=n.get(o);if(d===void 0||d.count!==h){let C=function(){y.dispose(),n.delete(o),o.removeEventListener("dispose",C)};var m=C;d!==void 0&&d.texture.dispose();const _=o.morphAttributes.position!==void 0,v=o.morphAttributes.normal!==void 0,f=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],x=o.morphAttributes.normal||[],E=o.morphAttributes.color||[];let b=0;_===!0&&(b=1),v===!0&&(b=2),f===!0&&(b=3);let w=o.attributes.position.count*b,T=1;w>e.maxTextureSize&&(T=Math.ceil(w/e.maxTextureSize),w=e.maxTextureSize);const g=new Float32Array(w*T*4*h),y=new Eh(g,w,T,h);y.type=Zn,y.needsUpdate=!0;const P=b*4;for(let N=0;N<h;N++){const O=p[N],W=x[N],R=E[N],I=w*T*4*N;for(let V=0;V<O.count;V++){const B=V*P;_===!0&&(s.fromBufferAttribute(O,V),g[I+B+0]=s.x,g[I+B+1]=s.y,g[I+B+2]=s.z,g[I+B+3]=0),v===!0&&(s.fromBufferAttribute(W,V),g[I+B+4]=s.x,g[I+B+5]=s.y,g[I+B+6]=s.z,g[I+B+7]=0),f===!0&&(s.fromBufferAttribute(R,V),g[I+B+8]=s.x,g[I+B+9]=s.y,g[I+B+10]=s.z,g[I+B+11]=R.itemSize===4?s.w:1)}}d={count:h,texture:y,size:new rt(w,T)},n.set(o,d),o.addEventListener("dispose",C)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(i,"morphTexture",a.morphTexture,t);else{let _=0;for(let f=0;f<c.length;f++)_+=c[f];const v=o.morphTargetsRelative?1:1-_;l.getUniforms().setValue(i,"morphTargetBaseInfluence",v),l.getUniforms().setValue(i,"morphTargetInfluences",c)}l.getUniforms().setValue(i,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(i,"morphTargetsTextureSize",d.size)}return{update:r}}function V0(i,e,t,n,s){let r=new WeakMap;function a(c){const u=s.render.frame,h=c.geometry,d=e.get(c,h);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,i.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,i.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){const m=c.skeleton;r.get(m)!==u&&(m.update(),r.set(m,u))}return d}function o(){r=new WeakMap}function l(c){const u=c.target;u.removeEventListener("dispose",l),n.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}const W0={[oh]:"LINEAR_TONE_MAPPING",[lh]:"REINHARD_TONE_MAPPING",[ch]:"CINEON_TONE_MAPPING",[ul]:"ACES_FILMIC_TONE_MAPPING",[uh]:"AGX_TONE_MAPPING",[dh]:"NEUTRAL_TONE_MAPPING",[hh]:"CUSTOM_TONE_MAPPING"};function X0(i,e,t,n,s,r){const a=new ii(e,t,{type:i,depthBuffer:s,stencilBuffer:r,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,l=null,c=null;const u=new Wt;u.setAttribute("position",new Tt([-1,3,0,-1,-1,0,3,-1,0],3)),u.setAttribute("uv",new Tt([0,2,0,0,2,0],2));const h=new Id({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Ot(u,h),m=new Oh(-1,1,1,-1,0,1);let _=null,v=null,f=!1,p,x=null,E=[],b=!1;this.setSize=function(w,T){a.setSize(w,T),o!==null&&o.setSize(w,T),l!==null&&l.setSize(w,T);for(let g=0;g<E.length;g++){const y=E[g];y.setSize&&y.setSize(w,T)}},this.setEffects=function(w){E=w,b=E.length>0&&E[0].isRenderPass===!0;const T=a.width,g=a.height;E.length>0&&o===null&&(o=new ii(T,g,{type:ri,depthBuffer:!1,stencilBuffer:!1}),l=new ii(T,g,{type:ri,depthBuffer:!1,stencilBuffer:!1}));const y=s===!0&&E.some(P=>P.needsDepthTexture===!0);y!==(a.depthTexture!==null)&&(y===!0&&c===null&&(c=new Fs(T,g),r===!0&&(c.format=Fi,c.type=Us)),a.dispose(),a.depthTexture=y?c:null,a.resolveDepthBuffer=y,a.storeMultisampledDepthBuffer=y);for(let P=0;P<E.length;P++){const C=E[P];C.setSize&&C.setSize(T,g),y&&C.needsDepthTexture===!0&&C.setDepthTexture&&C.setDepthTexture(c)}},this.begin=function(w,T){if(f||w.toneMapping===pi&&E.length===0)return!1;if(x=T,T!==null){const g=T.width,y=T.height;(a.width!==g||a.height!==y)&&this.setSize(g,y)}return b===!1&&w.setRenderTarget(a),p=w.toneMapping,w.toneMapping=pi,!0},this.hasRenderPass=function(){return b},this.end=function(w,T){w.toneMapping=p,f=!0;let g=a,y=o;for(let P=0;P<E.length;P++){const C=E[P];C.enabled!==!1&&(C.render(w,y,g,T),C.needsSwap!==!1&&(g=y,y=y===o?l:o))}if(_!==w.outputColorSpace||v!==w.toneMapping){_=w.outputColorSpace,v=w.toneMapping,h.defines={},pt.getTransfer(_)===wt&&(h.defines.SRGB_TRANSFER="");const P=W0[v];P&&(h.defines[P]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=g.texture,w.setRenderTarget(x),w.render(d,m),x=null,f=!1},this.isCompositing=function(){return f},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),u.dispose(),h.dispose()}}const Hh=new dn,Vh=new Fs(1,1),Wh=new Dh(1),Xh=new Eh,qh=new hd,Yh=new Lh,Sc=[],yc=[],bc=new Float32Array(16),Ec=new Float32Array(9),Tc=new Float32Array(4);function Ws(i,e,t){const n=i[0];if(n<=0||n>0)return i;const s=e*t;let r=Sc[s];if(r===void 0&&(r=new Float32Array(s),Sc[s]=r),e!==0){n.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,i[a].toArray(r,o)}return r}function $t(i,e){if(i.length!==e.length)return!1;for(let t=0,n=i.length;t<n;t++)if(i[t]!==e[t])return!1;return!0}function Kt(i,e){for(let t=0,n=e.length;t<n;t++)i[t]=e[t]}function La(i,e){let t=yc[e];t===void 0&&(t=new Int32Array(e),yc[e]=t);for(let n=0;n!==e;++n)t[n]=i.allocateTextureUnit();return t}function q0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1f(this.addr,e),t[0]=e)}function Y0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2fv(this.addr,e),Kt(t,e)}}function $0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(i.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if($t(t,e))return;i.uniform3fv(this.addr,e),Kt(t,e)}}function K0(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4fv(this.addr,e),Kt(t,e)}}function Z0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix2fv(this.addr,!1,e),Kt(t,e)}else{if($t(t,n))return;Tc.set(n),i.uniformMatrix2fv(this.addr,!1,Tc),Kt(t,n)}}function J0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix3fv(this.addr,!1,e),Kt(t,e)}else{if($t(t,n))return;Ec.set(n),i.uniformMatrix3fv(this.addr,!1,Ec),Kt(t,n)}}function Q0(i,e){const t=this.cache,n=e.elements;if(n===void 0){if($t(t,e))return;i.uniformMatrix4fv(this.addr,!1,e),Kt(t,e)}else{if($t(t,n))return;bc.set(n),i.uniformMatrix4fv(this.addr,!1,bc),Kt(t,n)}}function j0(i,e){const t=this.cache;t[0]!==e&&(i.uniform1i(this.addr,e),t[0]=e)}function em(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2iv(this.addr,e),Kt(t,e)}}function tm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;i.uniform3iv(this.addr,e),Kt(t,e)}}function nm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4iv(this.addr,e),Kt(t,e)}}function im(i,e){const t=this.cache;t[0]!==e&&(i.uniform1ui(this.addr,e),t[0]=e)}function sm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(i.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if($t(t,e))return;i.uniform2uiv(this.addr,e),Kt(t,e)}}function rm(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(i.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if($t(t,e))return;i.uniform3uiv(this.addr,e),Kt(t,e)}}function am(i,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(i.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if($t(t,e))return;i.uniform4uiv(this.addr,e),Kt(t,e)}}function Da(i){return i.version===0&&(i.compareFunction=yh,i.needsUpdate=!0),i}function om(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_2D_SHADOW?r=Da(Vh):r=Hh,t.setTexture2D(e||r,s)}function lm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture3D(e||qh,s)}function cm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s);let r;this.type===i.SAMPLER_CUBE_SHADOW?r=Da(Wh):r=Yh,t.setTextureCube(e||r,s)}function hm(i,e,t){const n=this.cache,s=t.allocateTextureUnit();n[0]!==s&&(i.uniform1i(this.addr,s),n[0]=s),t.setTexture2DArray(e||Xh,s)}function um(i){switch(i){case 5126:return q0;case 35664:return Y0;case 35665:return $0;case 35666:return K0;case 35674:return Z0;case 35675:return J0;case 35676:return Q0;case 5124:case 35670:return j0;case 35667:case 35671:return em;case 35668:case 35672:return tm;case 35669:case 35673:return nm;case 5125:return im;case 36294:return sm;case 36295:return rm;case 36296:return am;case 35678:case 36198:case 36298:case 36306:case 35682:return om;case 35679:case 36299:case 36307:return lm;case 35680:case 36300:case 36308:case 36293:return cm;case 36289:case 36303:case 36311:case 36292:return hm}}function dm(i,e){i.uniform1fv(this.addr,e)}function fm(i,e){const t=Ws(e,this.size,2);i.uniform2fv(this.addr,t)}function pm(i,e){const t=Ws(e,this.size,3);i.uniform3fv(this.addr,t)}function mm(i,e){const t=Ws(e,this.size,4);i.uniform4fv(this.addr,t)}function gm(i,e){const t=Ws(e,this.size,4);i.uniformMatrix2fv(this.addr,!1,t)}function _m(i,e){const t=Ws(e,this.size,9);i.uniformMatrix3fv(this.addr,!1,t)}function xm(i,e){const t=Ws(e,this.size,16);i.uniformMatrix4fv(this.addr,!1,t)}function vm(i,e){i.uniform1iv(this.addr,e)}function Mm(i,e){i.uniform2iv(this.addr,e)}function Sm(i,e){i.uniform3iv(this.addr,e)}function ym(i,e){i.uniform4iv(this.addr,e)}function bm(i,e){i.uniform1uiv(this.addr,e)}function Em(i,e){i.uniform2uiv(this.addr,e)}function Tm(i,e){i.uniform3uiv(this.addr,e)}function wm(i,e){i.uniform4uiv(this.addr,e)}function Am(i,e,t){const n=this.cache,s=e.length,r=La(t,s);$t(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));let a;this.type===i.SAMPLER_2D_SHADOW?a=Da(Vh):a=Hh;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Rm(i,e,t){const n=this.cache,s=e.length,r=La(t,s);$t(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||qh,r[a])}function Cm(i,e,t){const n=this.cache,s=e.length,r=La(t,s);$t(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));let a;this.type===i.SAMPLER_CUBE_SHADOW?a=Da(Wh):a=Yh;for(let o=0;o!==s;++o)t.setTextureCube(e[o]||a,r[o])}function Pm(i,e,t){const n=this.cache,s=e.length,r=La(t,s);$t(n,r)||(i.uniform1iv(this.addr,r),Kt(n,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||Xh,r[a])}function Lm(i){switch(i){case 5126:return dm;case 35664:return fm;case 35665:return pm;case 35666:return mm;case 35674:return gm;case 35675:return _m;case 35676:return xm;case 5124:case 35670:return vm;case 35667:case 35671:return Mm;case 35668:case 35672:return Sm;case 35669:case 35673:return ym;case 5125:return bm;case 36294:return Em;case 36295:return Tm;case 36296:return wm;case 35678:case 36198:case 36298:case 36306:case 35682:return Am;case 35679:case 36299:case 36307:return Rm;case 35680:case 36300:case 36308:case 36293:return Cm;case 36289:case 36303:case 36311:case 36292:return Pm}}class Dm{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=um(t.type)}}class Im{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Lm(t.type)}}class Nm{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const s=this.seq;for(let r=0,a=s.length;r!==a;++r){const o=s[r];o.setValue(e,t[o.id],n)}}}const co=/(\w+)(\])?(\[|\.)?/g;function wc(i,e){i.seq.push(e),i.map[e.id]=e}function Um(i,e,t){const n=i.name,s=n.length;for(co.lastIndex=0;;){const r=co.exec(n),a=co.lastIndex;let o=r[1];const l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){wc(t,c===void 0?new Dm(o,i,e):new Im(o,i,e));break}else{let h=t.map[o];h===void 0&&(h=new Nm(o),wc(t,h)),t=h}}}class oa{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Um(o,l,this)}const s=[],r=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,n,s){const r=this.map[t];r!==void 0&&r.setValue(e,n,s)}setOptional(e,t,n){const s=t[n];s!==void 0&&this.setValue(e,n,s)}static upload(e,t,n,s){for(let r=0,a=t.length;r!==a;++r){const o=t[r],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){const n=[];for(let s=0,r=e.length;s!==r;++s){const a=e[s];a.id in t&&n.push(a)}return n}}function Ac(i,e,t){const n=i.createShader(e);return i.shaderSource(n,t),i.compileShader(n),n}const Fm=37297;let Om=0;function Bm(i,e){const t=i.split(`
`),n=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const Rc=new et;function zm(i){pt._getMatrix(Rc,pt.workingColorSpace,i);const e=`mat3( ${Rc.elements.map(t=>t.toFixed(4))} )`;switch(pt.getTransfer(i)){case pa:return[e,"LinearTransferOETF"];case wt:return[e,"sRGBTransferOETF"];default:return je("WebGLProgram: Unsupported color space: ",i),[e,"LinearTransferOETF"]}}function Cc(i,e,t){const n=i.getShaderParameter(e,i.COMPILE_STATUS),r=(i.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const a=/ERROR: 0:(\d+)/.exec(r);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Bm(i.getShaderSource(e),o)}else return r}function km(i,e){const t=zm(e);return[`vec4 ${i}( vec4 value ) {`,`	return ${t[1]}( vec4( ${t[0]} * value.rgb, value.a ) );`,"}"].join(`
`)}const Gm={[oh]:"Linear",[lh]:"Reinhard",[ch]:"Cineon",[ul]:"ACESFilmic",[uh]:"AgX",[dh]:"Neutral",[hh]:"Custom"};function Hm(i,e){const t=Gm[e];return t===void 0?(je("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+i+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+i+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Jr=new F;function Vm(){pt.getLuminanceCoefficients(Jr);const i=Jr.x.toFixed(4),e=Jr.y.toFixed(4),t=Jr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${i}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wm(i){return[i.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",i.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(er).join(`
`)}function Xm(i){const e=[];for(const t in i){const n=i[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function qm(i,e){const t={},n=i.getProgramParameter(e,i.ACTIVE_ATTRIBUTES);for(let s=0;s<n;s++){const r=i.getActiveAttrib(e,s),a=r.name;let o=1;r.type===i.FLOAT_MAT2&&(o=2),r.type===i.FLOAT_MAT3&&(o=3),r.type===i.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:i.getAttribLocation(e,a),locationSize:o}}return t}function er(i){return i!==""}function Pc(i,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return i.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows).replace(/NUM_LIGHT_PROBE_GRIDS/g,e.numLightProbeGrids)}function Lc(i,e){return i.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ym=/^[ \t]*#include +<([\w\d./]+)>/gm;function al(i){return i.replace(Ym,$m)}function $m(i,e){const t=ot[e];if(t===void 0)throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">");return al(t)}const Km=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Dc(i){return i.replace(Km,Zm)}function Zm(i,e,t,n){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function Ic(i){let e=`precision ${i.precision} float;
	precision ${i.precision} int;
	precision ${i.precision} sampler2D;
	precision ${i.precision} samplerCube;
	precision ${i.precision} sampler3D;
	precision ${i.precision} sampler2DArray;
	precision ${i.precision} sampler2DShadow;
	precision ${i.precision} samplerCubeShadow;
	precision ${i.precision} sampler2DArrayShadow;
	precision ${i.precision} isampler2D;
	precision ${i.precision} isampler3D;
	precision ${i.precision} isamplerCube;
	precision ${i.precision} isampler2DArray;
	precision ${i.precision} usampler2D;
	precision ${i.precision} usampler3D;
	precision ${i.precision} usamplerCube;
	precision ${i.precision} usampler2DArray;
	`;return i.precision==="highp"?e+=`
#define HIGH_PRECISION`:i.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:i.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Jm={[ir]:"SHADOWMAP_TYPE_PCF",[Qs]:"SHADOWMAP_TYPE_VSM"};function Qm(i){return Jm[i.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const jm={[cr]:"ENVMAP_MODE_REFRACTION"};function eg(i){return i.envMap===!1?"ENVMAP_MODE_REFLECTION":jm[i.envMapMode]||"ENVMAP_MODE_REFLECTION"}const tg={[ah]:"ENVMAP_BLENDING_MULTIPLY",[zu]:"ENVMAP_BLENDING_MIX",[ku]:"ENVMAP_BLENDING_ADD"};function ng(i){return i.envMap===!1?"ENVMAP_BLENDING_NONE":tg[i.combine]||"ENVMAP_BLENDING_NONE"}function ig(i,e,t,n){const s=i.getContext(),r=t.defines;let a=t.vertexShader,o=t.fragmentShader;const l=Qm(t),c=t.envMapPMREM===!0?"ENVMAP_TYPE_PMREM":"ENVMAP_TYPE_CUBE",u=eg(t),h=ng(t),d=Wm(t),m=Xm(r),_=s.createProgram();let v,f,p=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(v=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(er).join(`
`),v.length>0&&(v+=`
`),f=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(er).join(`
`),f.length>0&&(f+=`
`)):(v=[Ic(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.diffuseRoughnessMapUv?"#define DIFFUSE_ROUGHNESSMAP_UV "+t.diffuseRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(er).join(`
`),f=[Ic(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",t.envMapPMREM?"#define ENVMAP_MAX_LOD "+t.envMapMaxLod+".0":"",t.envMapPMREM?"#define ENVMAP_SIZE "+t.envMapSize+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.diffuseRoughness?"#define USE_DIFFUSE_ROUGHNESS":"",t.diffuseRoughnessMap?"#define USE_DIFFUSE_ROUGHNESSMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==pi?"#define TONE_MAPPING":"",t.toneMapping!==pi?ot.tonemapping_pars_fragment:"",t.toneMapping!==pi?Hm("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",ot.colorspace_pars_fragment,km("linearToOutputTexel",t.outputColorSpace),Vm(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(er).join(`
`)),a=al(a),a=Pc(a,t),a=Lc(a,t),o=al(o),o=Pc(o,t),o=Lc(o,t),a=Dc(a),o=Dc(o),t.isRawShaderMaterial!==!0&&(p=`#version 300 es
`,v=[d,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+v,f=["#define varying in",t.glslVersion===Gl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Gl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+f);const x=p+v+a,E=p+f+o,b=Ac(s,s.VERTEX_SHADER,x),w=Ac(s,s.FRAGMENT_SHADER,E);s.attachShader(_,b),s.attachShader(_,w),t.index0AttributeName!==void 0?s.bindAttribLocation(_,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(_,0,"position"),s.linkProgram(_);function T(C){if(i.debug.checkShaderErrors){const N=s.getProgramInfoLog(_)||"",O=s.getShaderInfoLog(b)||"",W=s.getShaderInfoLog(w)||"",R=N.trim(),I=O.trim(),V=W.trim();let B=!0,se=!0;if(s.getProgramParameter(_,s.LINK_STATUS)===!1)if(B=!1,typeof i.debug.onShaderError=="function")i.debug.onShaderError(s,_,b,w);else{const Y=Cc(s,b,"vertex"),j=Cc(s,w,"fragment");yt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(_,s.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+R+`
`+Y+`
`+j)}else R!==""?je("WebGLProgram: Program Info Log:",R):(I===""||V==="")&&(se=!1);se&&(C.diagnostics={runnable:B,programLog:R,vertexShader:{log:I,prefix:v},fragmentShader:{log:V,prefix:f}})}s.deleteShader(b),s.deleteShader(w),g=new oa(s,_),y=qm(s,_)}let g;this.getUniforms=function(){return g===void 0&&T(this),g};let y;this.getAttributes=function(){return y===void 0&&T(this),y};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(_,Fm)),P},this.destroy=function(){n.releaseStatesOfProgram(this),s.deleteProgram(_),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Om++,this.cacheKey=e,this.usedTimes=1,this.program=_,this.vertexShader=b,this.fragmentShader=w,this}let sg=0;class rg{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(n)===!1&&(s.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new ag(e),t.set(e,n)),n}}class ag{constructor(e){this.id=sg++,this.code=e,this.usedTimes=0}}function og(i){return i===ns||i===ua||i===da}function lg(i,e,t,n,s,r){const a=new Th,o=new rg,l=new Set,c=[],u=new Map,h=n.logarithmicDepthBuffer,d={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(g){return l.add(g),g===0?"uv":`uv${g}`}function _(g,y,P,C,N,O){const W=C.fog,R=N.geometry,I=g.isMeshStandardMaterial||g.isMeshLambertMaterial||g.isMeshPhongMaterial?C.environment:null,V=g.isMeshStandardMaterial||g.isMeshLambertMaterial&&!g.envMap||g.isMeshPhongMaterial&&!g.envMap,B=e.get(g.envMap||I,V),se=d[g.type];let Y=n.precision;g.precision!==null&&(Y=n.getMaxPrecision(g.precision),Y!==g.precision&&je("WebGLProgram.getParameters:",g.precision,"not supported, using",Y,"instead."));const j=R.morphAttributes.position||R.morphAttributes.normal||R.morphAttributes.color,ie=j!==void 0?j.length:0;let Le=0;R.morphAttributes.position!==void 0&&(Le=1),R.morphAttributes.normal!==void 0&&(Le=2),R.morphAttributes.color!==void 0&&(Le=3);let Fe,$,Se,Ne;if(se){const Ae=ti[se];Fe=Ae.vertexShader,$=Ae.fragmentShader}else{Fe=g.vertexShader,$=g.fragmentShader;const Ae=o.getVertexShaderStage(g),ht=o.getFragmentShaderStage(g);o.update(g,Ae,ht),Se=Ae.id,Ne=ht.id}const We=i.getRenderTarget(),Re=i.state.buffers.depth.getReversed(),qe=N.isInstancedMesh===!0,xt=N.isBatchedMesh===!0,Ke=!!g.map,vt=!!g.matcap,Et=!!B,ct=Et&&B.isPMREMTexture===!0,it=!!g.aoMap,zt=!!g.lightMap,rn=!!g.bumpMap&&g.wireframe===!1,Mt=!!g.normalMap,vn=!!g.displacementMap,Gt=!!g.emissiveMap,fn=!!g.metalnessMap,Mn=!!g.roughnessMap,Sn=g.anisotropy>0,U=g.clearcoat>0,yn=g.diffuseRoughness>0,Ct=g.dispersion>0,Pt=g.retroreflectivity>0,we=g.iridescence>0,It=g.sheen>0,Ye=g.transmission>0,Ze=Sn&&!!g.anisotropyMap,A=U&&!!g.clearcoatMap,M=U&&!!g.clearcoatNormalMap,z=U&&!!g.clearcoatRoughnessMap,ae=yn&&!!g.diffuseRoughnessMap,te=we&&!!g.iridescenceMap,me=we&&!!g.iridescenceThicknessMap,_e=It&&!!g.sheenColorMap,Q=It&&!!g.sheenRoughnessMap,ee=!!g.specularMap,ge=!!g.specularColorMap,L=!!g.specularIntensityMap,ne=Ye&&!!g.transmissionMap,Z=Ye&&!!g.thicknessMap,ve=!!g.gradientMap,fe=!!g.alphaMap,xe=g.alphaTest>0,Ge=!!g.alphaHash,at=!!g.extensions;let ce=pi;g.toneMapped&&(We===null||We.isXRRenderTarget===!0)&&(ce=i.toneMapping);const Ve=ct?B.isCompressedCubeTexture?B.image[0].mipmaps:B.mipmaps:null,Qe={shaderID:se,shaderType:g.type,shaderName:g.name,vertexShader:Fe,fragmentShader:$,defines:g.defines,customVertexShaderID:Se,customFragmentShaderID:Ne,isRawShaderMaterial:g.isRawShaderMaterial===!0,glslVersion:g.glslVersion,precision:Y,batching:xt,batchingColor:xt&&N._colorsTexture!==null,instancing:qe,instancingColor:qe&&N.instanceColor!==null,instancingMorph:qe&&N.morphTexture!==null,outputColorSpace:We===null?i.outputColorSpace:We.isXRRenderTarget===!0?We.texture.colorSpace:pt.workingColorSpace,alphaToCoverage:!!g.alphaToCoverage,map:Ke,matcap:vt,envMap:Et,envMapMode:Et&&B.mapping,envMapPMREM:ct,envMapMaxLod:ct?Ve.length-1:null,envMapSize:ct?Ve[0].width:null,aoMap:it,lightMap:zt,bumpMap:rn,normalMap:Mt,displacementMap:vn,emissiveMap:Gt,normalMapObjectSpace:Mt&&g.normalMapType===Vu,normalMapTangentSpace:Mt&&g.normalMapType===nl,packedNormalMap:Mt&&g.normalMapType===nl&&og(g.normalMap.format),metalnessMap:fn,roughnessMap:Mn,anisotropy:Sn,anisotropyMap:Ze,clearcoat:U,clearcoatMap:A,clearcoatNormalMap:M,clearcoatRoughnessMap:z,diffuseRoughness:yn,diffuseRoughnessMap:ae,dispersion:Ct,retroreflection:Pt,iridescence:we,iridescenceMap:te,iridescenceThicknessMap:me,sheen:It,sheenColorMap:_e,sheenRoughnessMap:Q,specularMap:ee,specularColorMap:ge,specularIntensityMap:L,transmission:Ye,transmissionMap:ne,thicknessMap:Z,gradientMap:ve,opaque:g.transparent===!1&&g.blending===Ps&&g.alphaToCoverage===!1,alphaMap:fe,alphaTest:xe,alphaHash:Ge,combine:g.combine,mapUv:Ke&&m(g.map.channel),aoMapUv:it&&m(g.aoMap.channel),lightMapUv:zt&&m(g.lightMap.channel),bumpMapUv:rn&&m(g.bumpMap.channel),normalMapUv:Mt&&m(g.normalMap.channel),displacementMapUv:vn&&m(g.displacementMap.channel),emissiveMapUv:Gt&&m(g.emissiveMap.channel),metalnessMapUv:fn&&m(g.metalnessMap.channel),roughnessMapUv:Mn&&m(g.roughnessMap.channel),anisotropyMapUv:Ze&&m(g.anisotropyMap.channel),clearcoatMapUv:A&&m(g.clearcoatMap.channel),clearcoatNormalMapUv:M&&m(g.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:z&&m(g.clearcoatRoughnessMap.channel),diffuseRoughnessMapUv:ae&&m(g.diffuseRoughnessMap.channel),iridescenceMapUv:te&&m(g.iridescenceMap.channel),iridescenceThicknessMapUv:me&&m(g.iridescenceThicknessMap.channel),sheenColorMapUv:_e&&m(g.sheenColorMap.channel),sheenRoughnessMapUv:Q&&m(g.sheenRoughnessMap.channel),specularMapUv:ee&&m(g.specularMap.channel),specularColorMapUv:ge&&m(g.specularColorMap.channel),specularIntensityMapUv:L&&m(g.specularIntensityMap.channel),transmissionMapUv:ne&&m(g.transmissionMap.channel),thicknessMapUv:Z&&m(g.thicknessMap.channel),alphaMapUv:fe&&m(g.alphaMap.channel),vertexTangents:!!R.attributes.tangent&&(Mt||Sn),vertexNormals:!!R.attributes.normal,vertexColors:g.vertexColors,vertexAlphas:g.vertexColors===!0&&!!R.attributes.color&&R.attributes.color.itemSize===4,pointsUvs:N.isPoints===!0&&!!R.attributes.uv&&(Ke||fe),fog:!!W,useFog:g.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:g.wireframe===!1&&(g.flatShading===!0||R.attributes.normal===void 0&&Mt===!1&&(g.isMeshLambertMaterial||g.isMeshPhongMaterial||g.isMeshStandardMaterial||g.isMeshPhysicalMaterial)),sizeAttenuation:g.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:Re,skinning:N.isSkinnedMesh===!0,hasPositionAttribute:R.attributes.position!==void 0,morphTargets:R.morphAttributes.position!==void 0,morphNormals:R.morphAttributes.normal!==void 0,morphColors:R.morphAttributes.color!==void 0,morphTargetsCount:ie,morphTextureStride:Le,numSunLights:y.sun.length,numDirLights:y.directional.length,numPointLights:y.point.length,numSpotLights:y.spot.length,numSpotLightMaps:y.spotLightMap.length,numRectAreaLights:y.rectArea.length,numHemiLights:y.hemi.length,numSunLightShadows:y.sunShadowMap.length,numDirLightShadows:y.directionalShadowMap.length,numPointLightShadows:y.pointShadowMap.length,numSpotLightShadows:y.spotShadowMap.length,numSpotLightShadowsWithMaps:y.numSpotLightShadowsWithMaps,numLightProbes:y.numLightProbes,numLightProbeGrids:O.filter(Ae=>Ae.texture!==null).length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:g.dithering,shadowMapEnabled:i.shadowMap.enabled&&P.length>0,shadowMapType:i.shadowMap.type,toneMapping:ce,decodeVideoTexture:Ke&&g.map.isVideoTexture===!0&&pt.getTransfer(g.map.colorSpace)===wt,decodeVideoTextureEmissive:Gt&&g.emissiveMap.isVideoTexture===!0&&pt.getTransfer(g.emissiveMap.colorSpace)===wt,premultipliedAlpha:g.premultipliedAlpha,doubleSided:g.side===Pn,flipSided:g.side===_n,useDepthPacking:g.depthPacking>=0,depthPacking:g.depthPacking||0,index0AttributeName:g.index0AttributeName,extensionClipCullDistance:at&&g.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(at&&g.extensions.multiDraw===!0||xt)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:g.customProgramCacheKey()};return Qe.vertexUv1s=l.has(1),Qe.vertexUv2s=l.has(2),Qe.vertexUv3s=l.has(3),l.clear(),Qe}function v(g){const y=[];if(g.shaderID?y.push(g.shaderID):(y.push(g.customVertexShaderID),y.push(g.customFragmentShaderID)),g.defines!==void 0)for(const P in g.defines)y.push(P),y.push(g.defines[P]);return g.isRawShaderMaterial===!1&&(f(y,g),p(y,g),y.push(i.outputColorSpace)),y.push(g.customProgramCacheKey),y.join()}function f(g,y){g.push(y.precision),g.push(y.outputColorSpace),g.push(y.envMapMode),g.push(y.envMapPMREM),g.push(y.envMapMaxLod),g.push(y.envMapSize),g.push(y.mapUv),g.push(y.alphaMapUv),g.push(y.lightMapUv),g.push(y.aoMapUv),g.push(y.bumpMapUv),g.push(y.normalMapUv),g.push(y.displacementMapUv),g.push(y.emissiveMapUv),g.push(y.metalnessMapUv),g.push(y.roughnessMapUv),g.push(y.anisotropyMapUv),g.push(y.clearcoatMapUv),g.push(y.clearcoatNormalMapUv),g.push(y.clearcoatRoughnessMapUv),g.push(y.diffuseRoughnessMapUv),g.push(y.iridescenceMapUv),g.push(y.iridescenceThicknessMapUv),g.push(y.sheenColorMapUv),g.push(y.sheenRoughnessMapUv),g.push(y.specularMapUv),g.push(y.specularColorMapUv),g.push(y.specularIntensityMapUv),g.push(y.transmissionMapUv),g.push(y.thicknessMapUv),g.push(y.combine),g.push(y.fogExp2),g.push(y.sizeAttenuation),g.push(y.morphTargetsCount),g.push(y.numSunLights),g.push(y.numDirLights),g.push(y.numPointLights),g.push(y.numSpotLights),g.push(y.numSpotLightMaps),g.push(y.numHemiLights),g.push(y.numRectAreaLights),g.push(y.numSunLightShadows),g.push(y.numDirLightShadows),g.push(y.numPointLightShadows),g.push(y.numSpotLightShadows),g.push(y.numSpotLightShadowsWithMaps),g.push(y.numLightProbes),g.push(y.numLightProbeGrids),g.push(y.shadowMapType),g.push(y.toneMapping),g.push(y.numClippingPlanes),g.push(y.numClipIntersection),g.push(y.depthPacking)}function p(g,y){a.disableAll(),y.instancing&&a.enable(0),y.instancingColor&&a.enable(1),y.instancingMorph&&a.enable(2),y.matcap&&a.enable(3),y.envMap&&a.enable(4),y.normalMapObjectSpace&&a.enable(5),y.normalMapTangentSpace&&a.enable(6),y.clearcoat&&a.enable(7),y.iridescence&&a.enable(8),y.alphaTest&&a.enable(9),y.vertexColors&&a.enable(10),y.vertexAlphas&&a.enable(11),y.vertexUv1s&&a.enable(12),y.vertexUv2s&&a.enable(13),y.vertexUv3s&&a.enable(14),y.vertexTangents&&a.enable(15),y.anisotropy&&a.enable(16),y.alphaHash&&a.enable(17),y.batching&&a.enable(18),y.dispersion&&a.enable(19),y.retroreflection&&a.enable(24),y.diffuseRoughness&&a.enable(25),y.batchingColor&&a.enable(20),y.gradientMap&&a.enable(21),y.packedNormalMap&&a.enable(22),y.vertexNormals&&a.enable(23),g.push(a.mask),a.disableAll(),y.fog&&a.enable(0),y.useFog&&a.enable(1),y.flatShading&&a.enable(2),y.logarithmicDepthBuffer&&a.enable(3),y.reversedDepthBuffer&&a.enable(4),y.skinning&&a.enable(5),y.morphTargets&&a.enable(6),y.morphNormals&&a.enable(7),y.morphColors&&a.enable(8),y.premultipliedAlpha&&a.enable(9),y.shadowMapEnabled&&a.enable(10),y.doubleSided&&a.enable(11),y.flipSided&&a.enable(12),y.useDepthPacking&&a.enable(13),y.dithering&&a.enable(14),y.transmission&&a.enable(15),y.sheen&&a.enable(16),y.opaque&&a.enable(17),y.pointsUvs&&a.enable(18),y.decodeVideoTexture&&a.enable(19),y.decodeVideoTextureEmissive&&a.enable(20),y.alphaToCoverage&&a.enable(21),y.numLightProbeGrids>0&&a.enable(22),y.hasPositionAttribute&&a.enable(23),g.push(a.mask)}function x(g){const y=d[g.type];let P;if(y){const C=ti[y];P=Pd.clone(C.uniforms)}else P=g.uniforms;return P}function E(g,y){let P=u.get(y);return P!==void 0?++P.usedTimes:(P=new ig(i,y,g,s),c.push(P),u.set(y,P)),P}function b(g){if(--g.usedTimes===0){const y=c.indexOf(g);c[y]=c[c.length-1],c.pop(),u.delete(g.cacheKey),g.destroy()}}function w(g){o.remove(g)}function T(){o.dispose()}return{getParameters:_,getProgramCacheKey:v,getUniforms:x,acquireProgram:E,releaseProgram:b,releaseShaderCache:w,programs:c,dispose:T}}function cg(){let i=new WeakMap;function e(a){return i.has(a)}function t(a){let o=i.get(a);return o===void 0&&(o={},i.set(a,o)),o}function n(a){i.delete(a)}function s(a,o,l){i.get(a)[o]=l}function r(){i=new WeakMap}return{has:e,get:t,remove:n,update:s,dispose:r}}function hg(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.material.id!==e.material.id?i.material.id-e.material.id:i.materialVariant!==e.materialVariant?i.materialVariant-e.materialVariant:i.z!==e.z?i.z-e.z:i.id-e.id}function Nc(i,e){return i.groupOrder!==e.groupOrder?i.groupOrder-e.groupOrder:i.renderOrder!==e.renderOrder?i.renderOrder-e.renderOrder:i.z!==e.z?e.z-i.z:i.id-e.id}function Uc(){const i=[];let e=0;const t=[],n=[],s=[];function r(){e=0,t.length=0,n.length=0,s.length=0}function a(d){let m=0;return d.isInstancedMesh&&(m+=2),d.isSkinnedMesh&&(m+=1),m}function o(d,m,_,v,f,p){let x=i[e];return x===void 0?(x={id:d.id,object:d,geometry:m,material:_,materialVariant:a(d),groupOrder:v,renderOrder:d.renderOrder,z:f,group:p},i[e]=x):(x.id=d.id,x.object=d,x.geometry=m,x.material=_,x.materialVariant=a(d),x.groupOrder=v,x.renderOrder=d.renderOrder,x.z=f,x.group=p),e++,x}function l(d,m,_,v,f,p,x){x.reversedDepth===!0&&(f=-f);const E=o(d,m,_,v,f,p);_.transmission>0?n.push(E):_.transparent===!0?s.push(E):t.push(E)}function c(d,m,_,v,f,p){const x=o(d,m,_,v,f,p);_.transmission>0?n.unshift(x):_.transparent===!0?s.unshift(x):t.unshift(x)}function u(d,m){t.length>1&&t.sort(d||hg),n.length>1&&n.sort(m||Nc),s.length>1&&s.sort(m||Nc)}function h(){for(let d=e,m=i.length;d<m;d++){const _=i[d];if(_.id===null)break;_.id=null,_.object=null,_.geometry=null,_.material=null,_.group=null}}return{opaque:t,transmissive:n,transparent:s,init:r,push:l,unshift:c,finish:h,sort:u}}function ug(){let i=new WeakMap;function e(n,s){const r=i.get(n);let a;return r===void 0?(a=new Uc,i.set(n,[a])):s>=r.length?(a=new Uc,r.push(a)):a=r[s],a}function t(){i=new WeakMap}return{get:e,dispose:t}}function dg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new F,color:new Ue};break;case"SpotLight":t={position:new F,direction:new F,color:new Ue,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new F,color:new Ue,distance:0,decay:0};break;case"HemisphereLight":t={direction:new F,skyColor:new Ue,groundColor:new Ue};break;case"RectAreaLight":t={color:new Ue,position:new F,halfWidth:new F,halfHeight:new F};break}return i[e.id]=t,t}}}function fg(){const i={};return{get:function(e){if(i[e.id]!==void 0)return i[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new rt,shadowCameraNear:1,shadowCameraFar:1e3};break}return i[e.id]=t,t}}}let pg=0;function mg(i,e){return(e.castShadow?2:0)-(i.castShadow?2:0)+(e.map?1:0)-(i.map?1:0)}function gg(i){const e=new dg,t=fg(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new F);const s=new F,r=new Rt,a=new Rt;function o(c){let u=0,h=0,d=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let m=0,_=0,v=0,f=0,p=0,x=0,E=0,b=0,w=0,T=0,g=0,y=0,P=0,C=0;c.sort(mg);for(let O=0,W=c.length;O<W;O++){const R=c[O],I=R.color,V=R.intensity,B=R.distance;let se=null;if(R.shadow&&R.shadow.map&&(R.shadow.map.texture.format===ns?se=R.shadow.map.texture:se=R.shadow.map.depthTexture||R.shadow.map.texture),R.isAmbientLight)u+=I.r*V,h+=I.g*V,d+=I.b*V;else if(R.isLightProbe){for(let Y=0;Y<9;Y++)n.probe[Y].addScaledVector(R.sh.coefficients[Y],V);C++}else if(R.isSunLight){const Y=e.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const j=R.shadow,ie=t.get(R);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize.copy(j.mapSize).multiply(j.getFrameExtents()),n.sunShadow[_]=ie,n.sunShadowMap[_]=se;const Le=j.getViewportCount();for(let Fe=0;Fe<Le;Fe++)n.sunShadowMatrix[v+Fe]=j.getMatrix(Fe),n.sunShadowCascade[v+Fe]=j._cascadeData[Fe];v+=Le,_++}n.sun[m]=Y,m++}else if(R.isDirectionalLight){const Y=e.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){const j=R.shadow,ie=t.get(R);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.directionalShadow[f]=ie,n.directionalShadowMap[f]=se,n.directionalShadowMatrix[f]=R.shadow.matrix,w++}n.directional[f]=Y,f++}else if(R.isSpotLight){const Y=e.get(R);Y.position.setFromMatrixPosition(R.matrixWorld),Y.color.copy(I).multiplyScalar(V),Y.distance=B,Y.coneCos=Math.cos(R.angle),Y.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),Y.decay=R.decay,n.spot[x]=Y;const j=R.shadow;if(R.map&&(n.spotLightMap[y]=R.map,y++,j.updateMatrices(R),R.castShadow&&P++),n.spotLightMatrix[x]=j.matrix,R.castShadow){const ie=t.get(R);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,n.spotShadow[x]=ie,n.spotShadowMap[x]=se,g++}x++}else if(R.isRectAreaLight){const Y=e.get(R);Y.color.copy(I).multiplyScalar(V),Y.halfWidth.set(R.width*.5,0,0),Y.halfHeight.set(0,R.height*.5,0),n.rectArea[E]=Y,E++}else if(R.isPointLight){const Y=e.get(R);if(Y.color.copy(R.color).multiplyScalar(R.intensity),Y.distance=R.distance,Y.decay=R.decay,R.castShadow){const j=R.shadow,ie=t.get(R);ie.shadowIntensity=j.intensity,ie.shadowBias=j.bias,ie.shadowNormalBias=j.normalBias,ie.shadowRadius=j.radius,ie.shadowMapSize=j.mapSize,ie.shadowCameraNear=j.camera.near,ie.shadowCameraFar=j.camera.far,n.pointShadow[p]=ie,n.pointShadowMap[p]=se,n.pointShadowMatrix[p]=R.shadow.matrix,T++}n.point[p]=Y,p++}else if(R.isHemisphereLight){const Y=e.get(R);Y.skyColor.copy(R.color).multiplyScalar(V),Y.groundColor.copy(R.groundColor).multiplyScalar(V),n.hemi[b]=Y,b++}}E>0&&(i.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=Pe.LTC_FLOAT_1,n.rectAreaLTC2=Pe.LTC_FLOAT_2):(n.rectAreaLTC1=Pe.LTC_HALF_1,n.rectAreaLTC2=Pe.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=h,n.ambient[2]=d;const N=n.hash;(N.sunLength!==m||N.directionalLength!==f||N.pointLength!==p||N.spotLength!==x||N.rectAreaLength!==E||N.hemiLength!==b||N.numSunShadows!==_||N.numDirectionalShadows!==w||N.numPointShadows!==T||N.numSpotShadows!==g||N.numSpotMaps!==y||N.numLightProbes!==C)&&(n.sun.length=m,n.directional.length=f,n.spot.length=x,n.rectArea.length=E,n.point.length=p,n.hemi.length=b,n.sunShadow.length=_,n.sunShadowMap.length=_,n.sunShadowMatrix.length=v,n.sunShadowCascade.length=v,n.directionalShadow.length=w,n.directionalShadowMap.length=w,n.directionalShadowMatrix.length=w,n.pointShadow.length=T,n.pointShadowMap.length=T,n.pointShadowMatrix.length=T,n.spotShadow.length=g,n.spotShadowMap.length=g,n.spotLightMatrix.length=g+y-P,n.spotLightMap.length=y,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=C,N.sunLength=m,N.directionalLength=f,N.pointLength=p,N.spotLength=x,N.rectAreaLength=E,N.hemiLength=b,N.numSunShadows=_,N.numDirectionalShadows=w,N.numPointShadows=T,N.numSpotShadows=g,N.numSpotMaps=y,N.numLightProbes=C,n.version=pg++)}function l(c,u){let h=0,d=0,m=0,_=0,v=0,f=0;const p=u.matrixWorldInverse;for(let x=0,E=c.length;x<E;x++){const b=c[x];if(b.isSunLight){const w=n.sun[h];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(p),h++}else if(b.isDirectionalLight){const w=n.directional[d];w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),d++}else if(b.isSpotLight){const w=n.spot[_];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),w.direction.setFromMatrixPosition(b.matrixWorld),s.setFromMatrixPosition(b.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(p),_++}else if(b.isRectAreaLight){const w=n.rectArea[v];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),a.identity(),r.copy(b.matrixWorld),r.premultiply(p),a.extractRotation(r),w.halfWidth.set(b.width*.5,0,0),w.halfHeight.set(0,b.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(b.isPointLight){const w=n.point[m];w.position.setFromMatrixPosition(b.matrixWorld),w.position.applyMatrix4(p),m++}else if(b.isHemisphereLight){const w=n.hemi[f];w.direction.setFromMatrixPosition(b.matrixWorld),w.direction.transformDirection(p),f++}}}return{setup:o,setupView:l,state:n}}function Fc(i){const e=new gg(i),t=[],n=[],s=[];function r(h){u.camera=h,t.length=0,n.length=0,s.length=0}function a(h){h.isLightProbeGrid?s.push(h):t.push(h)}function o(h){n.push(h)}function l(){e.setup(t),s.sort((h,d)=>h.priority-d.priority||h.id-d.id)}function c(h){e.setupView(t,h)}const u={lightsArray:t,shadowsArray:n,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:u,setupLights:l,setupLightsView:c,pushLight:a,pushShadow:o}}function _g(i){let e=new WeakMap;function t(s,r=0){const a=e.get(s);let o;return a===void 0?(o=new Fc(i),e.set(s,[o])):r>=a.length?(o=new Fc(i),a.push(o)):o=a[r],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const xg=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vg=`uniform sampler2D shadow_pass;
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
}`,Mg=[new F(1,0,0),new F(-1,0,0),new F(0,1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1)],Sg=[new F(0,-1,0),new F(0,-1,0),new F(0,0,1),new F(0,0,-1),new F(0,-1,0),new F(0,-1,0)],Oc=new Rt,Js=new F,ho=new F;function yg(i,e,t){let n=new dr;const s=new rt,r=new rt,a=new Ft,o=new Nd,l=new Ud,c={},u=t.maxTextureSize,h={[ts]:_n,[_n]:ts,[Pn]:Pn},d=new Vi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new rt},radius:{value:4}},vertexShader:xg,fragmentShader:vg}),m=d.clone();m.defines.HORIZONTAL_PASS=1;const _=new Wt;_.setAttribute("position",new En(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Ot(_,d),f=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=ir;let p=this.type;this.render=function(T,g,y){if(f.enabled===!1||f.autoUpdate===!1&&f.needsUpdate===!1||T.length===0)return;this.type===Mu&&(je("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=ir);const P=i.getRenderTarget(),C=i.getActiveCubeFace(),N=i.getActiveMipmapLevel(),O=i.state;O.setBlending(Cs),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const W=p!==this.type;W&&g.traverse(function(R){R.material&&(Array.isArray(R.material)?R.material.forEach(I=>I.needsUpdate=!0):R.material.needsUpdate=!0)});for(let R=0,I=T.length;R<I;R++){const V=T[R],B=V.shadow;if(B===void 0){je("WebGLShadowMap:",V,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;s.copy(B.mapSize);const se=B.getFrameExtents();s.multiply(se),r.copy(B.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/se.x),s.x=r.x*se.x,B.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/se.y),s.y=r.y*se.y,B.mapSize.y=r.y));const Y=i.state.buffers.depth.getReversed();if(B.camera._reversedDepth=Y,B.map===null||W===!0){if(B.map!==null&&(B.map.depthTexture!==null&&(B.map.depthTexture.dispose(),B.map.depthTexture=null),B.map.dispose()),this.type===Qs){if(V.isPointLight){je("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}B.map=new ii(s.x,s.y,{format:ns,type:ri,minFilter:Tn,magFilter:Tn,generateMipmaps:!1}),B.map.texture.name=V.name+".shadowMap",B.map.depthTexture=new Fs(s.x,s.y,Zn),B.map.depthTexture.name=V.name+".shadowMapDepth",B.map.depthTexture.format=Hi,B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=sn,B.map.depthTexture.magFilter=sn}else V.isPointLight?(B.map=new wl(s.x),B.map.depthTexture=new Dh(s.x,si)):(B.map=new ii(s.x,s.y),B.map.depthTexture=new Fs(s.x,s.y,si)),B.map.depthTexture.name=V.name+".shadowMap",B.map.depthTexture.format=Hi,this.type===ir?(B.map.depthTexture.compareFunction=Y?Sh:Mh,B.map.depthTexture.minFilter=Tn,B.map.depthTexture.magFilter=Tn):(B.map.depthTexture.compareFunction=null,B.map.depthTexture.minFilter=sn,B.map.depthTexture.magFilter=sn);B.camera.updateProjectionMatrix()}B.map.isWebGLCubeRenderTarget!==!0&&(B.map.width!==s.x||B.map.height!==s.y)&&B.map.setSize(s.x,s.y);const j=B.map.isWebGLCubeRenderTarget?6:B.getViewportCount();V.isPointLight!==!0&&B.updateMatrices(V,y);const ie=(B.camera.layers.mask&4294967294)!==0?B.camera.layers:y.layers;for(let Le=0;Le<j;Le++){const Fe=B.getCamera(Le);if(V.isPointLight){const $=B.camera,Se=B.matrix,Ne=V.distance||$.far;Ne!==$.far&&($.far=Ne,$.updateProjectionMatrix()),Js.setFromMatrixPosition(V.matrixWorld),$.position.copy(Js),ho.copy($.position),ho.add(Mg[Le]),$.up.copy(Sg[Le]),$.lookAt(ho),$.updateMatrixWorld(),Se.makeTranslation(-Js.x,-Js.y,-Js.z),Oc.multiplyMatrices($.projectionMatrix,$.matrixWorldInverse),B._frustum.setFromProjectionMatrix(Oc,$.coordinateSystem,$.reversedDepth)}if(B.map.isWebGLCubeRenderTarget)i.setRenderTarget(B.map,Le),i.clear();else{Le===0&&(i.setRenderTarget(B.map),i.clear());const $=B.getViewport(Le);a.set(r.x*$.x,r.y*$.y,r.x*$.z,r.y*$.w),O.viewport(a)}n=B.getFrustum(Le),b(g,y,Fe,V,ie,this.type)}B.isPointLightShadow!==!0&&this.type===Qs&&x(B,y),B.needsUpdate=!1}p=this.type,f.needsUpdate=!1,i.setRenderTarget(P,C,N)};function x(T,g){const y=e.update(v);d.defines.VSM_SAMPLES!==T.blurSamples&&(d.defines.VSM_SAMPLES=T.blurSamples,m.defines.VSM_SAMPLES=T.blurSamples,d.needsUpdate=!0,m.needsUpdate=!0),T.mapPass===null?T.mapPass=new ii(s.x,s.y,{format:ns,type:ri}):(T.mapPass.width!==T.map.width||T.mapPass.height!==T.map.height)&&T.mapPass.setSize(T.map.width,T.map.height),d.uniforms.shadow_pass.value=T.map.depthTexture,d.uniforms.resolution.value.set(T.map.width,T.map.height),d.uniforms.radius.value=T.radius,i.setRenderTarget(T.mapPass),i.clear(),i.renderBufferDirect(g,null,y,d,v,null),m.uniforms.shadow_pass.value=T.mapPass.texture,m.uniforms.resolution.value.set(T.map.width,T.map.height),m.uniforms.radius.value=T.radius,i.setRenderTarget(T.map),i.clear(),i.renderBufferDirect(g,null,y,m,v,null)}function E(T,g,y,P){let C=null;const N=y.isPointLight===!0?T.customDistanceMaterial:T.customDepthMaterial;if(N!==void 0)C=N;else if(C=y.isPointLight===!0?l:o,i.localClippingEnabled&&g.clipShadows===!0&&Array.isArray(g.clippingPlanes)&&g.clippingPlanes.length!==0||g.displacementMap&&g.displacementScale!==0||g.alphaMap&&g.alphaTest>0||g.map&&g.alphaTest>0||g.alphaToCoverage===!0){const O=C.uuid,W=g.uuid;let R=c[O];R===void 0&&(R={},c[O]=R);let I=R[W];I===void 0&&(I=C.clone(),R[W]=I,g.addEventListener("dispose",w)),C=I}if(C.visible=g.visible,C.wireframe=g.wireframe,P===Qs?C.side=g.shadowSide!==null?g.shadowSide:g.side:C.side=g.shadowSide!==null?g.shadowSide:h[g.side],C.alphaMap=g.alphaMap,C.alphaTest=g.alphaToCoverage===!0?.5:g.alphaTest,C.map=g.map,C.clipShadows=g.clipShadows,C.clippingPlanes=g.clippingPlanes,C.clipIntersection=g.clipIntersection,C.displacementMap=g.displacementMap,C.displacementScale=g.displacementScale,C.displacementBias=g.displacementBias,C.wireframeLinewidth=g.wireframeLinewidth,C.linewidth=g.linewidth,y.isPointLight===!0&&C.isMeshDistanceMaterial===!0){const O=i.properties.get(C);O.light=y}return C}function b(T,g,y,P,C,N){if(T.visible===!1)return;if(T.layers.test(C)&&(T.isMesh||T.isLine||T.isPoints)&&(T.castShadow||T.receiveShadow&&N===Qs)&&(!T.frustumCulled||T.intersectsFrustum(n))){T.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,T.matrixWorld);const R=e.update(T),I=T.material;if(Array.isArray(I)){const V=R.groups;for(let B=0,se=V.length;B<se;B++){const Y=V[B],j=I[Y.materialIndex];if(j&&j.visible){const ie=E(T,j,P,N);T.onBeforeShadow(i,T,g,y,R,ie,Y),i.renderBufferDirect(y,null,R,ie,T,Y),T.onAfterShadow(i,T,g,y,R,ie,Y)}}}else if(I.visible){const V=E(T,I,P,N);T.onBeforeShadow(i,T,g,y,R,V,null),i.renderBufferDirect(y,null,R,V,T,null),T.onAfterShadow(i,T,g,y,R,V,null)}}const W=T.children;for(let R=0,I=W.length;R<I;R++)b(W[R],g,y,P,C,N)}function w(T){T.target.removeEventListener("dispose",w);for(const y in c){const P=c[y],C=T.target.uuid;C in P&&(P[C].dispose(),delete P[C])}}}function bg(i,e){function t(){let L=!1;const ne=new Ft;let Z=null;const ve=new Ft(0,0,0,0);return{setMask:function(fe){Z!==fe&&!L&&(i.colorMask(fe,fe,fe,fe),Z=fe)},setLocked:function(fe){L=fe},setClear:function(fe,xe,Ge,at,ce){ce===!0&&(fe*=at,xe*=at,Ge*=at),ne.set(fe,xe,Ge,at),ve.equals(ne)===!1&&(i.clearColor(fe,xe,Ge,at),ve.copy(ne))},reset:function(){L=!1,Z=null,ve.set(-1,0,0,0)}}}function n(){let L=!1,ne=!1,Z=null,ve=null,fe=null;return{setReversed:function(xe){if(ne!==xe){const Ge=e.get("EXT_clip_control");xe?Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.ZERO_TO_ONE_EXT):Ge.clipControlEXT(Ge.LOWER_LEFT_EXT,Ge.NEGATIVE_ONE_TO_ONE_EXT),ne=xe;const at=fe;fe=null,this.setClear(at)}},getReversed:function(){return ne},setTest:function(xe){xe?Re(i.DEPTH_TEST):qe(i.DEPTH_TEST)},setMask:function(xe){Z!==xe&&!L&&(i.depthMask(xe),Z=xe)},setFunc:function(xe){if(ne&&(xe=ed[xe]),ve!==xe){switch(xe){case _o:i.depthFunc(i.NEVER);break;case xo:i.depthFunc(i.ALWAYS);break;case vo:i.depthFunc(i.LESS);break;case lr:i.depthFunc(i.LEQUAL);break;case Mo:i.depthFunc(i.EQUAL);break;case So:i.depthFunc(i.GEQUAL);break;case yo:i.depthFunc(i.GREATER);break;case bo:i.depthFunc(i.NOTEQUAL);break;default:i.depthFunc(i.LEQUAL)}ve=xe}},setLocked:function(xe){L=xe},setClear:function(xe){fe!==xe&&(fe=xe,ne&&(xe=1-xe),i.clearDepth(xe))},reset:function(){L=!1,Z=null,ve=null,fe=null,ne=!1}}}function s(){let L=!1,ne=null,Z=null,ve=null,fe=null,xe=null,Ge=null,at=null,ce=null;return{setTest:function(Ve){L||(Ve?Re(i.STENCIL_TEST):qe(i.STENCIL_TEST))},setMask:function(Ve){ne!==Ve&&!L&&(i.stencilMask(Ve),ne=Ve)},setFunc:function(Ve,Qe,Ae){(Z!==Ve||ve!==Qe||fe!==Ae)&&(i.stencilFunc(Ve,Qe,Ae),Z=Ve,ve=Qe,fe=Ae)},setOp:function(Ve,Qe,Ae){(xe!==Ve||Ge!==Qe||at!==Ae)&&(i.stencilOp(Ve,Qe,Ae),xe=Ve,Ge=Qe,at=Ae)},setLocked:function(Ve){L=Ve},setClear:function(Ve){ce!==Ve&&(i.clearStencil(Ve),ce=Ve)},reset:function(){L=!1,ne=null,Z=null,ve=null,fe=null,xe=null,Ge=null,at=null,ce=null}}}const r=new t,a=new n,o=new s;let l={};const c=new WeakMap;let u={},h={},d={},m=new WeakMap,_=[],v=null,f=!1,p=null,x=null,E=null,b=null,w=null,T=null,g=null,y=new Ue(0,0,0),P=0,C=!1,N=null,O=null,W=null,R=null,I=null;const V=i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,se=0;const Y=i.getParameter(i.VERSION);Y.indexOf("WebGL")!==-1?(se=parseFloat(/^WebGL (\d)/.exec(Y)[1]),B=se>=1):Y.indexOf("OpenGL ES")!==-1&&(se=parseFloat(/^OpenGL ES (\d)/.exec(Y)[1]),B=se>=2);let j=null,ie={};const Le=i.getParameter(i.SCISSOR_BOX),Fe=i.getParameter(i.VIEWPORT),$=new Ft().fromArray(Le),Se=new Ft().fromArray(Fe);function Ne(L,ne,Z,ve){const fe=new Uint8Array(4),xe=i.createTexture();i.bindTexture(L,xe),i.texParameteri(L,i.TEXTURE_MIN_FILTER,i.NEAREST),i.texParameteri(L,i.TEXTURE_MAG_FILTER,i.NEAREST);for(let Ge=0;Ge<Z;Ge++)L===i.TEXTURE_3D||L===i.TEXTURE_2D_ARRAY?i.texImage3D(ne,0,i.RGBA,1,1,ve,0,i.RGBA,i.UNSIGNED_BYTE,fe):i.texImage2D(ne+Ge,0,i.RGBA,1,1,0,i.RGBA,i.UNSIGNED_BYTE,fe);return xe}const We={};We[i.TEXTURE_2D]=Ne(i.TEXTURE_2D,i.TEXTURE_2D,1),We[i.TEXTURE_CUBE_MAP]=Ne(i.TEXTURE_CUBE_MAP,i.TEXTURE_CUBE_MAP_POSITIVE_X,6),We[i.TEXTURE_2D_ARRAY]=Ne(i.TEXTURE_2D_ARRAY,i.TEXTURE_2D_ARRAY,1,1),We[i.TEXTURE_3D]=Ne(i.TEXTURE_3D,i.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Re(i.DEPTH_TEST),a.setFunc(lr),rn(!1),Mt(Bl),Re(i.CULL_FACE),it(Cs);function Re(L){u[L]!==!0&&(i.enable(L),u[L]=!0)}function qe(L){u[L]!==!1&&(i.disable(L),u[L]=!1)}function xt(L,ne){return d[L]!==ne?(i.bindFramebuffer(L,ne),d[L]=ne,L===i.DRAW_FRAMEBUFFER&&(d[i.FRAMEBUFFER]=ne),L===i.FRAMEBUFFER&&(d[i.DRAW_FRAMEBUFFER]=ne),!0):!1}function Ke(L,ne){let Z=_,ve=!1;if(L){Z=m.get(ne),Z===void 0&&(Z=[],m.set(ne,Z));const fe=L.textures;if(Z.length!==fe.length||Z[0]!==i.COLOR_ATTACHMENT0){for(let xe=0,Ge=fe.length;xe<Ge;xe++)Z[xe]=i.COLOR_ATTACHMENT0+xe;Z.length=fe.length,ve=!0}}else Z[0]!==i.BACK&&(Z[0]=i.BACK,ve=!0);ve&&i.drawBuffers(Z)}function vt(L){return v!==L?(i.useProgram(L),v=L,!0):!1}const Et={[Es]:i.FUNC_ADD,[yu]:i.FUNC_SUBTRACT,[bu]:i.FUNC_REVERSE_SUBTRACT};Et[Eu]=i.MIN,Et[Tu]=i.MAX;const ct={[wu]:i.ZERO,[Au]:i.ONE,[Ru]:i.SRC_COLOR,[sh]:i.SRC_ALPHA,[Nu]:i.SRC_ALPHA_SATURATE,[Du]:i.DST_COLOR,[Pu]:i.DST_ALPHA,[Cu]:i.ONE_MINUS_SRC_COLOR,[rh]:i.ONE_MINUS_SRC_ALPHA,[Iu]:i.ONE_MINUS_DST_COLOR,[Lu]:i.ONE_MINUS_DST_ALPHA,[Uu]:i.CONSTANT_COLOR,[Fu]:i.ONE_MINUS_CONSTANT_COLOR,[Ou]:i.CONSTANT_ALPHA,[Bu]:i.ONE_MINUS_CONSTANT_ALPHA};function it(L,ne,Z,ve,fe,xe,Ge,at,ce,Ve){if(L===Cs){f===!0&&(qe(i.BLEND),f=!1);return}if(f===!1&&(Re(i.BLEND),f=!0),L!==Su){if(L!==p||Ve!==C){if((x!==Es||w!==Es)&&(i.blendEquation(i.FUNC_ADD),x=Es,w=Es),Ve)switch(L){case Ps:i.blendFuncSeparate(i.ONE,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ki:i.blendFunc(i.ONE,i.ONE);break;case zl:i.blendFuncSeparate(i.ZERO,i.ONE_MINUS_SRC_COLOR,i.ZERO,i.ONE);break;case kl:i.blendFuncSeparate(i.DST_COLOR,i.ONE_MINUS_SRC_ALPHA,i.ZERO,i.ONE);break;default:yt("WebGLState: Invalid blending: ",L);break}else switch(L){case Ps:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE_MINUS_SRC_ALPHA,i.ONE,i.ONE_MINUS_SRC_ALPHA);break;case ki:i.blendFuncSeparate(i.SRC_ALPHA,i.ONE,i.ONE,i.ONE);break;case zl:yt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case kl:yt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:yt("WebGLState: Invalid blending: ",L);break}E=null,b=null,T=null,g=null,y.set(0,0,0),P=0,p=L,C=Ve}return}fe=fe||ne,xe=xe||Z,Ge=Ge||ve,(ne!==x||fe!==w)&&(i.blendEquationSeparate(Et[ne],Et[fe]),x=ne,w=fe),(Z!==E||ve!==b||xe!==T||Ge!==g)&&(i.blendFuncSeparate(ct[Z],ct[ve],ct[xe],ct[Ge]),E=Z,b=ve,T=xe,g=Ge),(at.equals(y)===!1||ce!==P)&&(i.blendColor(at.r,at.g,at.b,ce),y.copy(at),P=ce),p=L,C=!1}function zt(L,ne){L.side===Pn?qe(i.CULL_FACE):Re(i.CULL_FACE);let Z=L.side===_n;ne&&(Z=!Z),rn(Z),L.blending===Ps&&L.transparent===!1?it(Cs):it(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),a.setFunc(L.depthFunc),a.setTest(L.depthTest),a.setMask(L.depthWrite),r.setMask(L.colorWrite);const ve=L.stencilWrite;o.setTest(ve),ve&&(o.setMask(L.stencilWriteMask),o.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),o.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),Gt(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?Re(i.SAMPLE_ALPHA_TO_COVERAGE):qe(i.SAMPLE_ALPHA_TO_COVERAGE)}function rn(L){N!==L&&(L?i.frontFace(i.CW):i.frontFace(i.CCW),N=L)}function Mt(L){L!==xu?(Re(i.CULL_FACE),L!==O&&(L===Bl?i.cullFace(i.BACK):L===vu?i.cullFace(i.FRONT):i.cullFace(i.FRONT_AND_BACK))):qe(i.CULL_FACE),O=L}function vn(L){L!==W&&(B&&i.lineWidth(L),W=L)}function Gt(L,ne,Z){L?(Re(i.POLYGON_OFFSET_FILL),(R!==ne||I!==Z)&&(R=ne,I=Z,a.getReversed()&&(ne=-ne,Z=-Z),i.polygonOffset(ne,Z))):qe(i.POLYGON_OFFSET_FILL)}function fn(L){L?Re(i.SCISSOR_TEST):qe(i.SCISSOR_TEST)}function Mn(L){L===void 0&&(L=i.TEXTURE0+V-1),j!==L&&(i.activeTexture(L),j=L)}function Sn(L,ne,Z){Z===void 0&&(j===null?Z=i.TEXTURE0+V-1:Z=j);let ve=ie[Z];ve===void 0&&(ve={type:void 0,texture:void 0},ie[Z]=ve),(ve.type!==L||ve.texture!==ne)&&(j!==Z&&(i.activeTexture(Z),j=Z),i.bindTexture(L,ne||We[L]),ve.type=L,ve.texture=ne)}function U(){const L=ie[j];L!==void 0&&L.type!==void 0&&(i.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function yn(){try{i.compressedTexImage2D(...arguments)}catch(L){yt("WebGLState:",L)}}function Ct(){try{i.compressedTexImage3D(...arguments)}catch(L){yt("WebGLState:",L)}}function Pt(){try{i.texSubImage2D(...arguments)}catch(L){yt("WebGLState:",L)}}function we(){try{i.texSubImage3D(...arguments)}catch(L){yt("WebGLState:",L)}}function It(){try{i.compressedTexSubImage2D(...arguments)}catch(L){yt("WebGLState:",L)}}function Ye(){try{i.compressedTexSubImage3D(...arguments)}catch(L){yt("WebGLState:",L)}}function Ze(){try{i.texStorage2D(...arguments)}catch(L){yt("WebGLState:",L)}}function A(){try{i.texStorage3D(...arguments)}catch(L){yt("WebGLState:",L)}}function M(){try{i.texImage2D(...arguments)}catch(L){yt("WebGLState:",L)}}function z(){try{i.texImage3D(...arguments)}catch(L){yt("WebGLState:",L)}}function ae(L){return h[L]!==void 0?h[L]:i.getParameter(L)}function te(L,ne){h[L]!==ne&&(i.pixelStorei(L,ne),h[L]=ne)}function me(L){$.equals(L)===!1&&(i.scissor(L.x,L.y,L.z,L.w),$.copy(L))}function _e(L){Se.equals(L)===!1&&(i.viewport(L.x,L.y,L.z,L.w),Se.copy(L))}function Q(L,ne){let Z=c.get(ne);Z===void 0&&(Z=new WeakMap,c.set(ne,Z));let ve=Z.get(L);ve===void 0&&(ve=i.getUniformBlockIndex(ne,L.name),i.uniformBlockBinding(ne,ve,ve),Z.set(L,ve))}function ee(L,ne,Z){const fe=c.get(ne).get(L);l[fe]!==Z&&(i.bindBufferBase(i.UNIFORM_BUFFER,fe,Z),l[fe]=Z)}function ge(){i.disable(i.BLEND),i.disable(i.CULL_FACE),i.disable(i.DEPTH_TEST),i.disable(i.POLYGON_OFFSET_FILL),i.disable(i.SCISSOR_TEST),i.disable(i.STENCIL_TEST),i.disable(i.SAMPLE_ALPHA_TO_COVERAGE),i.blendEquation(i.FUNC_ADD),i.blendFunc(i.ONE,i.ZERO),i.blendFuncSeparate(i.ONE,i.ZERO,i.ONE,i.ZERO),i.blendColor(0,0,0,0),i.colorMask(!0,!0,!0,!0),i.clearColor(0,0,0,0),i.depthMask(!0),i.depthFunc(i.LESS),a.setReversed(!1),i.clearDepth(1),i.stencilMask(4294967295),i.stencilFunc(i.ALWAYS,0,4294967295),i.stencilOp(i.KEEP,i.KEEP,i.KEEP),i.clearStencil(0),i.cullFace(i.BACK),i.frontFace(i.CCW),i.polygonOffset(0,0),i.activeTexture(i.TEXTURE0),i.bindFramebuffer(i.FRAMEBUFFER,null),i.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),i.bindFramebuffer(i.READ_FRAMEBUFFER,null),i.useProgram(null),i.lineWidth(1),i.scissor(0,0,i.canvas.width,i.canvas.height),i.viewport(0,0,i.canvas.width,i.canvas.height),i.pixelStorei(i.PACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_ALIGNMENT,4),i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,i.BROWSER_DEFAULT_WEBGL),i.pixelStorei(i.PACK_ROW_LENGTH,0),i.pixelStorei(i.PACK_SKIP_PIXELS,0),i.pixelStorei(i.PACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_ROW_LENGTH,0),i.pixelStorei(i.UNPACK_IMAGE_HEIGHT,0),i.pixelStorei(i.UNPACK_SKIP_PIXELS,0),i.pixelStorei(i.UNPACK_SKIP_ROWS,0),i.pixelStorei(i.UNPACK_SKIP_IMAGES,0),u={},h={},j=null,ie={},d={},l={},m=new WeakMap,_=[],v=null,f=!1,p=null,x=null,E=null,b=null,w=null,T=null,g=null,y=new Ue(0,0,0),P=0,C=!1,N=null,O=null,W=null,R=null,I=null,$.set(0,0,i.canvas.width,i.canvas.height),Se.set(0,0,i.canvas.width,i.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Re,disable:qe,bindFramebuffer:xt,drawBuffers:Ke,useProgram:vt,setBlending:it,setMaterial:zt,setFlipSided:rn,setCullFace:Mt,setLineWidth:vn,setPolygonOffset:Gt,setScissorTest:fn,activeTexture:Mn,bindTexture:Sn,unbindTexture:U,compressedTexImage2D:yn,compressedTexImage3D:Ct,texImage2D:M,texImage3D:z,pixelStorei:te,getParameter:ae,updateUBOMapping:Q,uniformBlockBinding:ee,texStorage2D:Ze,texStorage3D:A,texSubImage2D:Pt,texSubImage3D:we,compressedTexSubImage2D:It,compressedTexSubImage3D:Ye,scissor:me,viewport:_e,reset:ge}}function Eg(i,e,t,n,s,r,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new rt,u=new WeakMap,h=new Set;let d;const m=new WeakMap,_=new Set,v=new FinalizationRegistry(A=>_.delete(A));let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(A,M){return f?new OffscreenCanvas(A,M):ma("canvas")}function x(A,M,z){let ae=1;const te=Ze(A);if((te.width>z||te.height>z)&&(ae=z/Math.max(te.width,te.height)),ae<1)if(typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&A instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&A instanceof ImageBitmap||typeof VideoFrame<"u"&&A instanceof VideoFrame){const me=Math.floor(ae*te.width),_e=Math.floor(ae*te.height);d===void 0&&(d=p(me,_e));const Q=M?p(me,_e):d;return Q.width=me,Q.height=_e,Q.getContext("2d").drawImage(A,0,0,me,_e),je("WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+me+"x"+_e+")."),Q}else return"data"in A&&je("WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),A;return A}function E(A){return A.generateMipmaps}function b(A){i.generateMipmap(A)}function w(A){return A.isWebGLCubeRenderTarget?i.TEXTURE_CUBE_MAP:A.isWebGL3DRenderTarget?i.TEXTURE_3D:A.isWebGLArrayRenderTarget||A.isCompressedArrayTexture?i.TEXTURE_2D_ARRAY:i.TEXTURE_2D}function T(A,M,z,ae,te,me=!1){if(A!==null){if(i[A]!==void 0)return i[A];je("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+A+"'")}let _e;ae&&(_e=e.get("EXT_texture_norm16"),_e||je("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Q=M;if(M===i.RED&&(z===i.FLOAT&&(Q=i.R32F),z===i.HALF_FLOAT&&(Q=i.R16F),z===i.UNSIGNED_BYTE&&(Q=i.R8),z===i.UNSIGNED_SHORT&&_e&&(Q=_e.R16_EXT),z===i.SHORT&&_e&&(Q=_e.R16_SNORM_EXT)),M===i.RED_INTEGER&&(z===i.UNSIGNED_BYTE&&(Q=i.R8UI),z===i.UNSIGNED_SHORT&&(Q=i.R16UI),z===i.UNSIGNED_INT&&(Q=i.R32UI),z===i.BYTE&&(Q=i.R8I),z===i.SHORT&&(Q=i.R16I),z===i.INT&&(Q=i.R32I)),M===i.RG&&(z===i.FLOAT&&(Q=i.RG32F),z===i.HALF_FLOAT&&(Q=i.RG16F),z===i.UNSIGNED_BYTE&&(Q=i.RG8),z===i.UNSIGNED_SHORT&&_e&&(Q=_e.RG16_EXT),z===i.SHORT&&_e&&(Q=_e.RG16_SNORM_EXT)),M===i.RG_INTEGER&&(z===i.UNSIGNED_BYTE&&(Q=i.RG8UI),z===i.UNSIGNED_SHORT&&(Q=i.RG16UI),z===i.UNSIGNED_INT&&(Q=i.RG32UI),z===i.BYTE&&(Q=i.RG8I),z===i.SHORT&&(Q=i.RG16I),z===i.INT&&(Q=i.RG32I)),M===i.RGB_INTEGER&&(z===i.UNSIGNED_BYTE&&(Q=i.RGB8UI),z===i.UNSIGNED_SHORT&&(Q=i.RGB16UI),z===i.UNSIGNED_INT&&(Q=i.RGB32UI),z===i.BYTE&&(Q=i.RGB8I),z===i.SHORT&&(Q=i.RGB16I),z===i.INT&&(Q=i.RGB32I)),M===i.RGBA_INTEGER&&(z===i.UNSIGNED_BYTE&&(Q=i.RGBA8UI),z===i.UNSIGNED_SHORT&&(Q=i.RGBA16UI),z===i.UNSIGNED_INT&&(Q=i.RGBA32UI),z===i.BYTE&&(Q=i.RGBA8I),z===i.SHORT&&(Q=i.RGBA16I),z===i.INT&&(Q=i.RGBA32I)),M===i.RGB&&(z===i.UNSIGNED_SHORT&&_e&&(Q=_e.RGB16_EXT),z===i.SHORT&&_e&&(Q=_e.RGB16_SNORM_EXT),z===i.UNSIGNED_INT_5_9_9_9_REV&&(Q=i.RGB9_E5),z===i.UNSIGNED_INT_10F_11F_11F_REV&&(Q=i.R11F_G11F_B10F)),M===i.RGBA){const ee=me?pa:pt.getTransfer(te);z===i.FLOAT&&(Q=i.RGBA32F),z===i.HALF_FLOAT&&(Q=i.RGBA16F),z===i.UNSIGNED_BYTE&&(Q=ee===wt?i.SRGB8_ALPHA8:i.RGBA8),z===i.UNSIGNED_SHORT&&_e&&(Q=_e.RGBA16_EXT),z===i.SHORT&&_e&&(Q=_e.RGBA16_SNORM_EXT),z===i.UNSIGNED_SHORT_4_4_4_4&&(Q=i.RGBA4),z===i.UNSIGNED_SHORT_5_5_5_1&&(Q=i.RGB5_A1)}return(Q===i.R16F||Q===i.R32F||Q===i.RG16F||Q===i.RG32F||Q===i.RGBA16F||Q===i.RGBA32F)&&e.get("EXT_color_buffer_float"),Q}function g(A,M){let z;return A?M===null||M===si||M===Us?z=i.DEPTH24_STENCIL8:M===Zn?z=i.DEPTH32F_STENCIL8:M===hr&&(z=i.DEPTH24_STENCIL8,je("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):M===null||M===si||M===Us?z=i.DEPTH_COMPONENT24:M===Zn?z=i.DEPTH_COMPONENT32F:M===hr&&(z=i.DEPTH_COMPONENT16),z}function y(A,M){return E(A)===!0||A.isFramebufferTexture&&A.minFilter!==sn&&A.minFilter!==Tn?Math.log2(Math.max(M.width,M.height))+1:A.mipmaps.length>0?A.mipmaps.length:A.isCompressedTexture&&Array.isArray(A.image)?M.mipmaps.length:1}function P(A){const M=new WeakRef(A);n.get(A).__ref=M,_.add(M),v.register(A,M,M)}function C(A){const M=n.get(A).__ref;M!==void 0&&(_.delete(M),v.unregister(M))}function N(A){W(A.target)}function O(A){R(A.target)}function W(A){A.removeEventListener("dispose",N),C(A),V(A),A.isVideoTexture&&u.delete(A),A.isHTMLTexture&&h.delete(A)}function R(A){A.removeEventListener("dispose",O),C(A),se(A)}function I(){for(const A of _){const M=A.deref();M!==void 0&&(M.isRenderTarget===!0?R(M):W(M))}_.clear(),h.clear()}function V(A){const M=n.get(A);if(M.__webglInit===void 0)return;const z=A.source,ae=m.get(z);if(ae){const te=ae[M.__cacheKey];te.usedTimes--,te.usedTimes===0&&B(A),Object.keys(ae).length===0&&m.delete(z)}n.remove(A)}function B(A){const M=n.get(A);i.deleteTexture(M.__webglTexture);const z=A.source,ae=m.get(z);delete ae[M.__cacheKey],a.memory.textures--}function se(A){const M=n.get(A);M.__depthDisposeCallback&&M.__depthDisposeCallback();const z=A.depthTexture;if(z&&z.renderTarget===A&&W(z),A.isWebGLCubeRenderTarget)for(let te=0;te<6;te++){if(Array.isArray(M.__webglFramebuffer[te]))for(let me=0;me<M.__webglFramebuffer[te].length;me++)i.deleteFramebuffer(M.__webglFramebuffer[te][me]);else i.deleteFramebuffer(M.__webglFramebuffer[te]);M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer[te])}else{if(Array.isArray(M.__webglFramebuffer))for(let te=0;te<M.__webglFramebuffer.length;te++)i.deleteFramebuffer(M.__webglFramebuffer[te]);else i.deleteFramebuffer(M.__webglFramebuffer);if(M.__webglDepthbuffer&&i.deleteRenderbuffer(M.__webglDepthbuffer),M.__webglMultisampledFramebuffer&&i.deleteFramebuffer(M.__webglMultisampledFramebuffer),M.__webglColorRenderbuffer)for(let te=0;te<M.__webglColorRenderbuffer.length;te++)M.__webglColorRenderbuffer[te]&&i.deleteRenderbuffer(M.__webglColorRenderbuffer[te]);M.__webglDepthRenderbuffer&&i.deleteRenderbuffer(M.__webglDepthRenderbuffer)}const ae=A.textures;for(let te=0,me=ae.length;te<me;te++){const _e=n.get(ae[te]);_e.__webglTexture&&(i.deleteTexture(_e.__webglTexture),a.memory.textures--),n.remove(ae[te])}n.remove(A)}let Y=0;function j(){Y=0}function ie(){return Y}function Le(A){Y=A}function Fe(){const A=Y;return A>=s.maxTextures&&je("WebGLTextures: Trying to use "+(A+1)+" texture units while this GPU supports only "+s.maxTextures),Y+=1,A}function $(A){const M=[];return M.push(A.wrapS),M.push(A.wrapT),M.push(A.wrapR||0),M.push(A.magFilter),M.push(A.minFilter),M.push(A.anisotropy),M.push(A.internalFormat),M.push(A.format),M.push(A.type),M.push(A.generateMipmaps),M.push(A.mipmapsAutoUpdate),M.push(A.premultiplyAlpha),M.push(A.flipY),M.push(A.unpackAlignment),M.push(A.colorSpace),M.join()}function Se(A,M){const z=n.get(A);if(A.isVideoTexture&&It(A),A.isRenderTargetTexture===!1&&A.isExternalTexture!==!0&&A.version>0&&z.__version!==A.version){const ae=A.image;if(ae===null)je("WebGLRenderer: Texture marked for update but no image data found.");else if(ae.complete===!1)je("WebGLRenderer: Texture marked for update but image is incomplete");else{zt(z,A,M);return}}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D,z.__webglTexture,i.TEXTURE0+M)}function Ne(A,M){const z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){zt(z,A,M);return}else A.isExternalTexture&&(z.__webglTexture=A.sourceTexture?A.sourceTexture:null);t.bindTexture(i.TEXTURE_2D_ARRAY,z.__webglTexture,i.TEXTURE0+M)}function We(A,M){const z=n.get(A);if(A.isRenderTargetTexture===!1&&A.version>0&&z.__version!==A.version){zt(z,A,M);return}t.bindTexture(i.TEXTURE_3D,z.__webglTexture,i.TEXTURE0+M)}function Re(A,M){const z=n.get(A);if(A.version>0&&z.__version!==A.version){rn(z,A,M);return}t.bindTexture(i.TEXTURE_CUBE_MAP,z.__webglTexture,i.TEXTURE0+M)}const qe={[Eo]:i.REPEAT,[Kn]:i.CLAMP_TO_EDGE,[To]:i.MIRRORED_REPEAT},xt={[sn]:i.NEAREST,[Gu]:i.NEAREST_MIPMAP_NEAREST,[Ar]:i.NEAREST_MIPMAP_LINEAR,[Tn]:i.LINEAR,[Ba]:i.LINEAR_MIPMAP_NEAREST,[Ui]:i.LINEAR_MIPMAP_LINEAR},Ke={[Xu]:i.NEVER,[yh]:i.ALWAYS,[qu]:i.LESS,[Mh]:i.LEQUAL,[Yu]:i.EQUAL,[Sh]:i.GEQUAL,[$u]:i.GREATER,[Ku]:i.NOTEQUAL};function vt(A,M){if(M.type===Zn&&e.has("OES_texture_float_linear")===!1&&(M.magFilter===Tn||M.magFilter===Ba||M.magFilter===Ar||M.magFilter===Ui||M.minFilter===Tn||M.minFilter===Ba||M.minFilter===Ar||M.minFilter===Ui)&&je("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),i.texParameteri(A,i.TEXTURE_WRAP_S,qe[M.wrapS]),i.texParameteri(A,i.TEXTURE_WRAP_T,qe[M.wrapT]),(A===i.TEXTURE_3D||A===i.TEXTURE_2D_ARRAY)&&i.texParameteri(A,i.TEXTURE_WRAP_R,qe[M.wrapR]),i.texParameteri(A,i.TEXTURE_MAG_FILTER,xt[M.magFilter]),i.texParameteri(A,i.TEXTURE_MIN_FILTER,xt[M.minFilter]),M.compareFunction&&(i.texParameteri(A,i.TEXTURE_COMPARE_MODE,i.COMPARE_REF_TO_TEXTURE),i.texParameteri(A,i.TEXTURE_COMPARE_FUNC,Ke[M.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(M.magFilter===sn||M.minFilter!==Ar&&M.minFilter!==Ui||M.type===Zn&&e.has("OES_texture_float_linear")===!1)return;if(M.anisotropy>1||n.get(M).__currentAnisotropy){const z=e.get("EXT_texture_filter_anisotropic");i.texParameterf(A,z.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(M.anisotropy,s.getMaxAnisotropy())),n.get(M).__currentAnisotropy=M.anisotropy}}}function Et(A,M){let z=!1;A.__webglInit===void 0&&(A.__webglInit=!0,M.addEventListener("dispose",N),P(M));const ae=M.source;let te=m.get(ae);te===void 0&&(te={},m.set(ae,te));const me=$(M);if(me!==A.__cacheKey){te[me]===void 0&&(te[me]={texture:i.createTexture(),usedTimes:0},a.memory.textures++,z=!0),te[me].usedTimes++;const _e=te[A.__cacheKey];_e!==void 0&&(te[A.__cacheKey].usedTimes--,_e.usedTimes===0&&B(M)),A.__cacheKey=me,A.__webglTexture=te[me].texture}return z}function ct(A,M,z){return Math.floor(Math.floor(A/z)/M)}function it(A,M,z,ae){const me=A.updateRanges;if(me.length===0)t.texSubImage2D(i.TEXTURE_2D,0,0,0,M.width,M.height,z,ae,M.data);else{me.sort((L,ne)=>L.start-ne.start);let _e=0;for(let L=1;L<me.length;L++){const ne=me[_e],Z=me[L],ve=ne.start+ne.count,fe=ct(Z.start,M.width,4),xe=ct(ne.start,M.width,4);Z.start<=ve+1&&fe===xe&&ct(Z.start+Z.count-1,M.width,4)===fe?ne.count=Math.max(ne.count,Z.start+Z.count-ne.start):(++_e,me[_e]=Z)}me.length=_e+1;const Q=t.getParameter(i.UNPACK_ROW_LENGTH),ee=t.getParameter(i.UNPACK_SKIP_PIXELS),ge=t.getParameter(i.UNPACK_SKIP_ROWS);t.pixelStorei(i.UNPACK_ROW_LENGTH,M.width);for(let L=0,ne=me.length;L<ne;L++){const Z=me[L],ve=Math.floor(Z.start/4),fe=Math.ceil(Z.count/4),xe=ve%M.width,Ge=Math.floor(ve/M.width),at=fe,ce=1;t.pixelStorei(i.UNPACK_SKIP_PIXELS,xe),t.pixelStorei(i.UNPACK_SKIP_ROWS,Ge),t.texSubImage2D(i.TEXTURE_2D,0,xe,Ge,at,ce,z,ae,M.data)}A.clearUpdateRanges(),t.pixelStorei(i.UNPACK_ROW_LENGTH,Q),t.pixelStorei(i.UNPACK_SKIP_PIXELS,ee),t.pixelStorei(i.UNPACK_SKIP_ROWS,ge)}}function zt(A,M,z){let ae=i.TEXTURE_2D;(M.isDataArrayTexture||M.isCompressedArrayTexture)&&(ae=i.TEXTURE_2D_ARRAY),M.isData3DTexture&&(ae=i.TEXTURE_3D);const te=Et(A,M),me=M.source;t.bindTexture(ae,A.__webglTexture,i.TEXTURE0+z);const _e=n.get(me);if(me.version!==_e.__version||te===!0){if(t.activeTexture(i.TEXTURE0+z),(typeof ImageBitmap<"u"&&M.image instanceof ImageBitmap)===!1){const ce=pt.getPrimaries(pt.workingColorSpace),Ve=M.colorSpace===Ii?null:pt.getPrimaries(M.colorSpace),Qe=M.colorSpace===Ii||ce===Ve?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,Qe)}t.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment);let ee=x(M.image,!1,s.maxTextureSize);ee=Ye(M,ee);const ge=r.convert(M.format,M.colorSpace),L=r.convert(M.type);let ne=T(M.internalFormat,ge,L,M.normalized,M.colorSpace,M.isVideoTexture);vt(ae,M);let Z;const ve=M.mipmaps,fe=M.isVideoTexture!==!0,xe=_e.__version===void 0||te===!0,Ge=me.dataReady,at=y(M,ee);if(M.isDepthTexture)ne=g(M.format===Fi,M.type),xe&&(fe?t.texStorage2D(i.TEXTURE_2D,1,ne,ee.width,ee.height):t.texImage2D(i.TEXTURE_2D,0,ne,ee.width,ee.height,0,ge,L,null));else if(M.isDataTexture)if(ve.length>0){fe&&xe&&t.texStorage2D(i.TEXTURE_2D,at,ne,ve[0].width,ve[0].height);for(let ce=0,Ve=ve.length;ce<Ve;ce++)Z=ve[ce],fe?Ge&&t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Z.width,Z.height,ge,L,Z.data):t.texImage2D(i.TEXTURE_2D,ce,ne,Z.width,Z.height,0,ge,L,Z.data);M.generateMipmaps=!1}else fe?(xe&&t.texStorage2D(i.TEXTURE_2D,at,ne,ee.width,ee.height),Ge&&it(M,ee,ge,L)):t.texImage2D(i.TEXTURE_2D,0,ne,ee.width,ee.height,0,ge,L,ee.data);else if(M.isCompressedTexture)if(M.isCompressedArrayTexture){fe&&xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,at,ne,ve[0].width,ve[0].height,ee.depth);for(let ce=0,Ve=ve.length;ce<Ve;ce++)if(Z=ve[ce],M.format!==ni)if(ge!==null)if(fe){if(Ge)if(M.layerUpdates.size>0){const Qe=gc(Z.width,Z.height,M.format,M.type);for(const Ae of M.layerUpdates){const ht=Z.data.subarray(Ae*Qe/Z.data.BYTES_PER_ELEMENT,(Ae+1)*Qe/Z.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,Ae,Z.width,Z.height,1,ge,ht)}}else t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,0,Z.width,Z.height,ee.depth,ge,Z.data)}else t.compressedTexImage3D(i.TEXTURE_2D_ARRAY,ce,ne,Z.width,Z.height,ee.depth,0,Z.data,0,0);else je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else fe?Ge&&t.texSubImage3D(i.TEXTURE_2D_ARRAY,ce,0,0,0,Z.width,Z.height,ee.depth,ge,L,Z.data):t.texImage3D(i.TEXTURE_2D_ARRAY,ce,ne,Z.width,Z.height,ee.depth,0,ge,L,Z.data);M.layerUpdates.size>0&&M.clearLayerUpdates()}else{fe&&xe&&t.texStorage2D(i.TEXTURE_2D,at,ne,ve[0].width,ve[0].height);for(let ce=0,Ve=ve.length;ce<Ve;ce++)Z=ve[ce],M.format!==ni?ge!==null?fe?Ge&&t.compressedTexSubImage2D(i.TEXTURE_2D,ce,0,0,Z.width,Z.height,ge,Z.data):t.compressedTexImage2D(i.TEXTURE_2D,ce,ne,Z.width,Z.height,0,Z.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):fe?Ge&&t.texSubImage2D(i.TEXTURE_2D,ce,0,0,Z.width,Z.height,ge,L,Z.data):t.texImage2D(i.TEXTURE_2D,ce,ne,Z.width,Z.height,0,ge,L,Z.data)}else if(M.isDataArrayTexture)if(fe){if(xe&&t.texStorage3D(i.TEXTURE_2D_ARRAY,at,ne,ee.width,ee.height,ee.depth),Ge)if(M.layerUpdates.size>0){const ce=gc(ee.width,ee.height,M.format,M.type);for(const Ve of M.layerUpdates){const Qe=ee.data.subarray(Ve*ce/ee.data.BYTES_PER_ELEMENT,(Ve+1)*ce/ee.data.BYTES_PER_ELEMENT);t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,Ve,ee.width,ee.height,1,ge,L,Qe)}M.clearLayerUpdates()}else t.texSubImage3D(i.TEXTURE_2D_ARRAY,0,0,0,0,ee.width,ee.height,ee.depth,ge,L,ee.data)}else t.texImage3D(i.TEXTURE_2D_ARRAY,0,ne,ee.width,ee.height,ee.depth,0,ge,L,ee.data);else if(M.isData3DTexture)fe?(xe&&t.texStorage3D(i.TEXTURE_3D,at,ne,ee.width,ee.height,ee.depth),Ge&&t.texSubImage3D(i.TEXTURE_3D,0,0,0,0,ee.width,ee.height,ee.depth,ge,L,ee.data)):t.texImage3D(i.TEXTURE_3D,0,ne,ee.width,ee.height,ee.depth,0,ge,L,ee.data);else if(M.isFramebufferTexture){if(xe)if(fe)t.texStorage2D(i.TEXTURE_2D,at,ne,ee.width,ee.height);else{let ce=ee.width,Ve=ee.height;for(let Qe=0;Qe<at;Qe++)t.texImage2D(i.TEXTURE_2D,Qe,ne,ce,Ve,0,ge,L,null),ce>>=1,Ve>>=1}}else if(M.isHTMLTexture){if("texElementImage2D"in i){const ce=i.canvas;if(ce.hasAttribute("layoutsubtree")||ce.setAttribute("layoutsubtree","true"),ee.parentNode!==ce){ce.appendChild(ee),h.add(M),ce.onpaint=Ve=>{const Qe=Ve.changedElements;for(const Ae of h)Qe.includes(Ae.image)&&(Ae.needsUpdate=!0)},ce.requestPaint();return}if(i.texElementImage2D.length===3)i.texElementImage2D(i.TEXTURE_2D,i.RGBA8,ee);else{const Qe=i.RGBA,Ae=i.RGBA,ht=i.UNSIGNED_BYTE;i.texElementImage2D(i.TEXTURE_2D,0,Qe,Ae,ht,ee)}i.texParameteri(i.TEXTURE_2D,i.TEXTURE_MIN_FILTER,i.LINEAR),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_S,i.CLAMP_TO_EDGE),i.texParameteri(i.TEXTURE_2D,i.TEXTURE_WRAP_T,i.CLAMP_TO_EDGE)}}else if(ve.length>0){if(fe&&xe){const ce=Ze(ve[0]);t.texStorage2D(i.TEXTURE_2D,at,ne,ce.width,ce.height)}for(let ce=0,Ve=ve.length;ce<Ve;ce++)Z=ve[ce],fe?Ge&&t.texSubImage2D(i.TEXTURE_2D,ce,0,0,ge,L,Z):t.texImage2D(i.TEXTURE_2D,ce,ne,ge,L,Z);M.generateMipmaps=!1}else if(fe){if(xe){const ce=Ze(ee);t.texStorage2D(i.TEXTURE_2D,at,ne,ce.width,ce.height)}Ge&&t.texSubImage2D(i.TEXTURE_2D,0,0,0,ge,L,ee)}else t.texImage2D(i.TEXTURE_2D,0,ne,ge,L,ee);E(M)&&M.mipmapsAutoUpdate===!0&&b(ae),_e.__version=me.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function rn(A,M,z){if(M.image.length!==6)return;const ae=Et(A,M),te=M.source;t.bindTexture(i.TEXTURE_CUBE_MAP,A.__webglTexture,i.TEXTURE0+z);const me=n.get(te);if(te.version!==me.__version||ae===!0){t.activeTexture(i.TEXTURE0+z);const _e=pt.getPrimaries(pt.workingColorSpace),Q=M.colorSpace===Ii?null:pt.getPrimaries(M.colorSpace),ee=M.colorSpace===Ii||_e===Q?i.NONE:i.BROWSER_DEFAULT_WEBGL;t.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,M.flipY),t.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,M.premultiplyAlpha),t.pixelStorei(i.UNPACK_ALIGNMENT,M.unpackAlignment),t.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL,ee);const ge=M.isCompressedTexture||M.image[0].isCompressedTexture,L=M.image[0]&&M.image[0].isDataTexture,ne=[];for(let Ae=0;Ae<6;Ae++)!ge&&!L?ne[Ae]=x(M.image[Ae],!0,s.maxCubemapSize):ne[Ae]=L?M.image[Ae].image:M.image[Ae],ne[Ae]=Ye(M,ne[Ae]);const Z=ne[0],ve=r.convert(M.format,M.colorSpace),fe=r.convert(M.type);let xe=T(M.internalFormat,ve,fe,M.normalized,M.colorSpace);const Ge=M.isVideoTexture!==!0,at=me.__version===void 0||ae===!0,ce=te.dataReady;let Ve=y(M,Z);vt(i.TEXTURE_CUBE_MAP,M);let Qe;if(M.isDepthTexture){if(xe=g(M.format===Fi,M.type),at)if(Ge)t.texStorage2D(i.TEXTURE_CUBE_MAP,1,xe,Z.width,Z.height);else for(let Ae=0;Ae<6;Ae++)t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,xe,Z.width,Z.height,0,ve,fe,null)}else if(ge){Ge&&at&&t.texStorage2D(i.TEXTURE_CUBE_MAP,Ve,xe,Z.width,Z.height);for(let Ae=0;Ae<6;Ae++){Qe=ne[Ae].mipmaps;for(let ht=0;ht<Qe.length;ht++){const Nt=Qe[ht];M.format!==ni?ve!==null?Ge?ce&&t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ht,0,0,Nt.width,Nt.height,ve,Nt.data):t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ht,xe,Nt.width,Nt.height,0,Nt.data):je("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ge?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ht,0,0,Nt.width,Nt.height,ve,fe,Nt.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ht,xe,Nt.width,Nt.height,0,ve,fe,Nt.data)}}}else{if(Qe=M.mipmaps,Ge&&at){Qe.length>0&&Ve++;const Ae=Ze(ne[0]);t.texStorage2D(i.TEXTURE_CUBE_MAP,Ve,xe,Ae.width,Ae.height)}for(let Ae=0;Ae<6;Ae++)if(L){Ge?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,ne[Ae].width,ne[Ae].height,ve,fe,ne[Ae].data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,xe,ne[Ae].width,ne[Ae].height,0,ve,fe,ne[Ae].data);for(let ht=0;ht<Qe.length;ht++){const Fn=Qe[ht].image[Ae].image;Ge?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ht+1,0,0,Fn.width,Fn.height,ve,fe,Fn.data):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ht+1,xe,Fn.width,Fn.height,0,ve,fe,Fn.data)}}else{Ge?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,0,0,ve,fe,ne[Ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,0,xe,ve,fe,ne[Ae]);for(let ht=0;ht<Qe.length;ht++){const Nt=Qe[ht];Ge?ce&&t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ht+1,0,0,ve,fe,Nt.image[Ae]):t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X+Ae,ht+1,xe,ve,fe,Nt.image[Ae])}}}E(M)&&M.mipmapsAutoUpdate===!0&&b(i.TEXTURE_CUBE_MAP),me.__version=te.version,M.onUpdate&&M.onUpdate(M)}A.__version=M.version}function Mt(A,M,z,ae,te,me){const _e=r.convert(z.format,z.colorSpace),Q=r.convert(z.type),ee=T(z.internalFormat,_e,Q,z.normalized,z.colorSpace),ge=n.get(M),L=n.get(z);if(L.__renderTarget=M,!ge.__hasExternalTextures){const ne=Math.max(1,M.width>>me),Z=Math.max(1,M.height>>me);te===i.TEXTURE_3D||te===i.TEXTURE_2D_ARRAY?t.texImage3D(te,me,ee,ne,Z,M.depth,0,_e,Q,null):t.texImage2D(te,me,ee,ne,Z,0,_e,Q,null)}t.bindFramebuffer(i.FRAMEBUFFER,A),we(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ae,te,L.__webglTexture,0,Pt(M)):(te===i.TEXTURE_2D||te>=i.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=i.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&i.framebufferTexture2D(i.FRAMEBUFFER,ae,te,L.__webglTexture,me),t.bindFramebuffer(i.FRAMEBUFFER,null)}function vn(A,M,z){if(i.bindRenderbuffer(i.RENDERBUFFER,A),M.depthBuffer){const ae=M.depthTexture,te=ae&&ae.isDepthTexture?ae.type:null,me=g(M.stencilBuffer,te),_e=M.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;we(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt(M),me,M.width,M.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt(M),me,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,me,M.width,M.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,_e,i.RENDERBUFFER,A)}else{const ae=M.textures;for(let te=0;te<ae.length;te++){const me=ae[te],_e=r.convert(me.format,me.colorSpace),Q=r.convert(me.type),ee=T(me.internalFormat,_e,Q,me.normalized,me.colorSpace);we(M)?o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER,Pt(M),ee,M.width,M.height):z?i.renderbufferStorageMultisample(i.RENDERBUFFER,Pt(M),ee,M.width,M.height):i.renderbufferStorage(i.RENDERBUFFER,ee,M.width,M.height)}}i.bindRenderbuffer(i.RENDERBUFFER,null)}function Gt(A,M,z){const ae=M.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(i.FRAMEBUFFER,A),!(M.depthTexture&&M.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const te=n.get(M.depthTexture);te.__renderTarget=M;const me=ae?M.depthTexture.image[0]:M.depthTexture.image;(!te.__webglTexture||me.width!==M.width||me.height!==M.height)&&(me.width=M.width,me.height=M.height,M.depthTexture.needsUpdate=!0),ae?Re(M.depthTexture,0):Se(M.depthTexture,0);const _e=te.__webglTexture,Q=Pt(M),ee=ae?i.TEXTURE_CUBE_MAP_POSITIVE_X+z:i.TEXTURE_2D,ge=M.depthTexture.format===Fi?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;if(M.depthTexture.format===Hi)we(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ge,ee,_e,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,ge,ee,_e,0);else if(M.depthTexture.format===Fi)we(M)?o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER,ge,ee,_e,0,Q):i.framebufferTexture2D(i.FRAMEBUFFER,ge,ee,_e,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function fn(A){const M=n.get(A),z=A.isWebGLCubeRenderTarget===!0;if(M.__boundDepthTexture!==A.depthTexture){const ae=A.depthTexture;if(M.__depthDisposeCallback&&M.__depthDisposeCallback(),ae){const te=()=>{delete M.__boundDepthTexture,delete M.__depthDisposeCallback,ae.removeEventListener("dispose",te)};ae.addEventListener("dispose",te),M.__depthDisposeCallback=te}M.__boundDepthTexture=ae}if(A.depthTexture&&!M.__autoAllocateDepthBuffer)if(z)for(let ae=0;ae<6;ae++)Gt(M.__webglFramebuffer[ae],A,ae);else A.texture.mipmaps.length>0?Gt(M.__webglFramebuffer[0],A,0):Gt(M.__webglFramebuffer,A,0);else if(z){M.__webglDepthbuffer=[];for(let ae=0;ae<6;ae++)if(t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[ae]),M.__webglDepthbuffer[ae]===void 0)M.__webglDepthbuffer[ae]=i.createRenderbuffer(),vn(M.__webglDepthbuffer[ae],A,!1);else{const te=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=M.__webglDepthbuffer[ae];i.bindRenderbuffer(i.RENDERBUFFER,me),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,me)}}else if(A.texture.mipmaps.length>0?t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer[0]):t.bindFramebuffer(i.FRAMEBUFFER,M.__webglFramebuffer),M.__webglDepthbuffer===void 0)M.__webglDepthbuffer=i.createRenderbuffer(),vn(M.__webglDepthbuffer,A,!1);else{const te=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,me=M.__webglDepthbuffer;i.bindRenderbuffer(i.RENDERBUFFER,me),i.framebufferRenderbuffer(i.FRAMEBUFFER,te,i.RENDERBUFFER,me)}t.bindFramebuffer(i.FRAMEBUFFER,null)}function Mn(A,M,z){const ae=n.get(A);M!==void 0&&Mt(ae.__webglFramebuffer,A,A.texture,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,0),z!==void 0&&fn(A)}function Sn(A){const M=A.texture,z=n.get(A),ae=n.get(M);A.addEventListener("dispose",O),P(A);const te=A.textures,me=A.isWebGLCubeRenderTarget===!0,_e=te.length>1;if(_e||(ae.__webglTexture===void 0&&(ae.__webglTexture=i.createTexture()),ae.__version=M.version,a.memory.textures++),me){z.__webglFramebuffer=[];for(let Q=0;Q<6;Q++)if(M.mipmaps.length>0){z.__webglFramebuffer[Q]=[];for(let ee=0;ee<M.mipmaps.length;ee++)z.__webglFramebuffer[Q][ee]=i.createFramebuffer()}else z.__webglFramebuffer[Q]=i.createFramebuffer()}else{if(M.mipmaps.length>0){z.__webglFramebuffer=[];for(let Q=0;Q<M.mipmaps.length;Q++)z.__webglFramebuffer[Q]=i.createFramebuffer()}else z.__webglFramebuffer=i.createFramebuffer();if(_e)for(let Q=0,ee=te.length;Q<ee;Q++){const ge=n.get(te[Q]);ge.__webglTexture===void 0&&(ge.__webglTexture=i.createTexture(),a.memory.textures++)}if(A.samples>0&&we(A)===!1){z.__webglMultisampledFramebuffer=i.createFramebuffer(),z.__webglColorRenderbuffer=[],t.bindFramebuffer(i.FRAMEBUFFER,z.__webglMultisampledFramebuffer);for(let Q=0;Q<te.length;Q++){const ee=te[Q];z.__webglColorRenderbuffer[Q]=i.createRenderbuffer(),i.bindRenderbuffer(i.RENDERBUFFER,z.__webglColorRenderbuffer[Q]);const ge=r.convert(ee.format,ee.colorSpace),L=r.convert(ee.type),ne=T(ee.internalFormat,ge,L,ee.normalized,ee.colorSpace,A.isXRRenderTarget===!0),Z=Pt(A);i.renderbufferStorageMultisample(i.RENDERBUFFER,Z,ne,A.width,A.height),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+Q,i.RENDERBUFFER,z.__webglColorRenderbuffer[Q])}i.bindRenderbuffer(i.RENDERBUFFER,null),A.depthBuffer&&(z.__webglDepthRenderbuffer=i.createRenderbuffer(),vn(z.__webglDepthRenderbuffer,A,!0)),t.bindFramebuffer(i.FRAMEBUFFER,null)}}if(me){t.bindTexture(i.TEXTURE_CUBE_MAP,ae.__webglTexture),vt(i.TEXTURE_CUBE_MAP,M);for(let Q=0;Q<6;Q++)if(M.mipmaps.length>0)for(let ee=0;ee<M.mipmaps.length;ee++)Mt(z.__webglFramebuffer[Q][ee],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,ee);else Mt(z.__webglFramebuffer[Q],A,M,i.COLOR_ATTACHMENT0,i.TEXTURE_CUBE_MAP_POSITIVE_X+Q,0);E(M)?b(i.TEXTURE_CUBE_MAP):M.mipmaps.length>0&&i.texParameteri(i.TEXTURE_CUBE_MAP,i.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),t.unbindTexture()}else if(_e){for(let Q=0,ee=te.length;Q<ee;Q++){const ge=te[Q],L=n.get(ge);let ne=i.TEXTURE_2D;(A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(ne=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(ne,L.__webglTexture),vt(ne,ge),Mt(z.__webglFramebuffer,A,ge,i.COLOR_ATTACHMENT0+Q,ne,0),E(ge)&&b(ne)}t.unbindTexture()}else{let Q=i.TEXTURE_2D;if((A.isWebGL3DRenderTarget||A.isWebGLArrayRenderTarget)&&(Q=A.isWebGL3DRenderTarget?i.TEXTURE_3D:i.TEXTURE_2D_ARRAY),t.bindTexture(Q,ae.__webglTexture),vt(Q,M),M.mipmaps.length>0)for(let ee=0;ee<M.mipmaps.length;ee++)Mt(z.__webglFramebuffer[ee],A,M,i.COLOR_ATTACHMENT0,Q,ee);else Mt(z.__webglFramebuffer,A,M,i.COLOR_ATTACHMENT0,Q,0);E(M)?b(Q):M.mipmaps.length>0&&i.texParameteri(Q,i.TEXTURE_MAX_LEVEL,M.mipmaps.length-1),t.unbindTexture()}A.depthBuffer&&fn(A)}function U(A){const M=A.textures;for(let z=0,ae=M.length;z<ae;z++){const te=M[z];if(E(te)&&te.mipmapsAutoUpdate===!0){const me=w(A),_e=n.get(te).__webglTexture;t.bindTexture(me,_e),b(me),t.unbindTexture()}}}const yn=[];function Ct(A){if(A.samples>0){if(we(A)===!1){const M=A.textures,z=A.width,ae=A.height;let te=i.COLOR_BUFFER_BIT;const me=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT,_e=n.get(A),Q=M.length>1;if(Q)for(let ge=0;ge<M.length;ge++)t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,null),t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,null,0);t.bindFramebuffer(i.READ_FRAMEBUFFER,_e.__webglMultisampledFramebuffer),A.texture.mipmaps.length>0?t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer[0]):t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglFramebuffer);for(let ge=0;ge<M.length;ge++){if(A.resolveDepthBuffer&&(A.depthBuffer&&(te|=i.DEPTH_BUFFER_BIT),A.stencilBuffer&&A.resolveStencilBuffer&&(te|=i.STENCIL_BUFFER_BIT)),Q){i.framebufferRenderbuffer(i.READ_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.RENDERBUFFER,_e.__webglColorRenderbuffer[ge]);const L=n.get(M[ge]).__webglTexture;i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0,i.TEXTURE_2D,L,0)}i.blitFramebuffer(0,0,z,ae,0,0,z,ae,te,i.NEAREST),l===!0&&(yn.length=0,yn.push(i.COLOR_ATTACHMENT0+ge),A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&yn.push(me),i.invalidateFramebuffer(i.READ_FRAMEBUFFER,yn))}if(t.bindFramebuffer(i.READ_FRAMEBUFFER,null),t.bindFramebuffer(i.DRAW_FRAMEBUFFER,null),Q)for(let ge=0;ge<M.length;ge++){t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglMultisampledFramebuffer),i.framebufferRenderbuffer(i.FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.RENDERBUFFER,_e.__webglColorRenderbuffer[ge]);const L=n.get(M[ge]).__webglTexture;t.bindFramebuffer(i.FRAMEBUFFER,_e.__webglFramebuffer),i.framebufferTexture2D(i.DRAW_FRAMEBUFFER,i.COLOR_ATTACHMENT0+ge,i.TEXTURE_2D,L,0)}t.bindFramebuffer(i.DRAW_FRAMEBUFFER,_e.__webglMultisampledFramebuffer)}else if(A.depthBuffer&&A.storeMultisampledDepthBuffer===!1&&l){const M=A.stencilBuffer?i.DEPTH_STENCIL_ATTACHMENT:i.DEPTH_ATTACHMENT;i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER,[M])}}}function Pt(A){return Math.min(s.maxSamples,A.samples)}function we(A){const M=n.get(A);return A.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&M.__useRenderToTexture!==!1}function It(A){const M=a.render.frame;u.get(A)!==M&&(u.set(A,M),A.update())}function Ye(A,M){const z=A.colorSpace,ae=A.format,te=A.type;return A.isCompressedTexture===!0||A.isVideoTexture===!0||z!==fa&&z!==Ii&&(pt.getTransfer(z)===wt?(ae!==ni||te!==Ln)&&je("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):yt("WebGLTextures: Unsupported texture color space:",z)),M}function Ze(A){return typeof HTMLImageElement<"u"&&A instanceof HTMLImageElement?(c.width=A.naturalWidth||A.width,c.height=A.naturalHeight||A.height):typeof VideoFrame<"u"&&A instanceof VideoFrame?(c.width=A.displayWidth,c.height=A.displayHeight):(c.width=A.width,c.height=A.height),c}this.allocateTextureUnit=Fe,this.resetTextureUnits=j,this.getTextureUnits=ie,this.setTextureUnits=Le,this.setTexture2D=Se,this.setTexture2DArray=Ne,this.setTexture3D=We,this.setTextureCube=Re,this.rebindTextures=Mn,this.setupRenderTarget=Sn,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=Ct,this.setupDepthRenderbuffer=fn,this.setupFrameBufferTexture=Mt,this.useMultisampledRTT=we,this.dispose=I}function Tg(i,e){function t(n,s=Ii){let r;const a=pt.getTransfer(s);if(n===Ln)return i.UNSIGNED_BYTE;if(n===fl)return i.UNSIGNED_SHORT_4_4_4_4;if(n===pl)return i.UNSIGNED_SHORT_5_5_5_1;if(n===gh)return i.UNSIGNED_INT_5_9_9_9_REV;if(n===_h)return i.UNSIGNED_INT_10F_11F_11F_REV;if(n===ph)return i.BYTE;if(n===mh)return i.SHORT;if(n===hr)return i.UNSIGNED_SHORT;if(n===dl)return i.INT;if(n===si)return i.UNSIGNED_INT;if(n===Zn)return i.FLOAT;if(n===ri)return i.HALF_FLOAT;if(n===xh)return i.ALPHA;if(n===vh)return i.RGB;if(n===ni)return i.RGBA;if(n===Hi)return i.DEPTH_COMPONENT;if(n===Fi)return i.DEPTH_STENCIL;if(n===ml)return i.RED;if(n===gl)return i.RED_INTEGER;if(n===ns)return i.RG;if(n===_l)return i.RG_INTEGER;if(n===xl)return i.RGBA_INTEGER;if(n===na||n===ia||n===sa||n===ra)if(a===wt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===na)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===ra)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===na)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===sa)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===ra)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wo||n===Ao||n===Ro||n===Co)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Ao)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ro)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Co)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Po||n===Lo||n===Do||n===Io||n===No||n===ua||n===Uo)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Po||n===Lo)return a===wt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Do)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(n===Io)return r.COMPRESSED_R11_EAC;if(n===No)return r.COMPRESSED_SIGNED_R11_EAC;if(n===ua)return r.COMPRESSED_RG11_EAC;if(n===Uo)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Fo||n===Oo||n===Bo||n===zo||n===ko||n===Go||n===Ho||n===Vo||n===Wo||n===Xo||n===qo||n===Yo||n===$o||n===Ko)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Fo)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Oo)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Bo)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===zo)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ko)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Go)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Ho)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===Vo)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Wo)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Xo)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===qo)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Yo)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===$o)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===Ko)return a===wt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Zo||n===Jo||n===Qo)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===Zo)return a===wt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Jo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Qo)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===jo||n===el||n===da||n===tl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===jo)return r.COMPRESSED_RED_RGTC1_EXT;if(n===el)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===da)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===tl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Us?i.UNSIGNED_INT_24_8:i[n]!==void 0?i[n]:null}return{convert:t}}const wg=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Ag=`
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

}`;class Rg{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new Ih(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new Vi({vertexShader:wg,fragmentShader:Ag,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Ot(new is(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Cg extends os{constructor(e,t){super();const n=this;let s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,m=null,_=null;const v=typeof XRWebGLBinding<"u",f=new Rg,p={},x=t.getContextAttributes();let E=null,b=null;const w=[],T=[],g=new rt;let y=null,P=null;const C=new zn;C.viewport=new Ft;const N=new zn;N.viewport=new Ft;const O=[C,N],W=new kd;let R=null,I=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Se=w[$];return Se===void 0&&(Se=new Ya,w[$]=Se),Se.getTargetRaySpace()},this.getControllerGrip=function($){let Se=w[$];return Se===void 0&&(Se=new Ya,w[$]=Se),Se.getGripSpace()},this.getHand=function($){let Se=w[$];return Se===void 0&&(Se=new Ya,w[$]=Se),Se.getHandSpace()};function V($){const Se=T.indexOf($.inputSource);if(Se===-1)return;const Ne=w[Se];Ne!==void 0&&(Ne.update($.inputSource,$.frame,c||a),Ne.dispatchEvent({type:$.type,data:$.inputSource}))}function B(){s.removeEventListener("select",V),s.removeEventListener("selectstart",V),s.removeEventListener("selectend",V),s.removeEventListener("squeeze",V),s.removeEventListener("squeezestart",V),s.removeEventListener("squeezeend",V),s.removeEventListener("end",B),s.removeEventListener("inputsourceschange",se);for(let $=0;$<w.length;$++){const Se=T[$];Se!==null&&(T[$]=null,w[$].disconnect(Se))}R=null,I=null,f.reset();for(const $ in p)delete p[$];if(e.setRenderTarget(E),m=null,d=null,h=null,s=null,b=null,Fe.stop(),n.isPresenting=!1,e.setPixelRatio(y),e.setSize(g.width,g.height,!1),P!==null){const $=P.camera;$.fov=P.fov,$.zoom=P.zoom,$.updateProjectionMatrix(),P=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){r=$,n.isPresenting===!0&&je("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&je("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function($){c=$},this.getBaseLayer=function(){return d!==null?d:m},this.getBinding=function(){return h===null&&v&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return _},this.getSession=function(){return s},this.setSession=async function($){if(s=$,s!==null){if(E=e.getRenderTarget(),s.addEventListener("select",V),s.addEventListener("selectstart",V),s.addEventListener("selectend",V),s.addEventListener("squeeze",V),s.addEventListener("squeezestart",V),s.addEventListener("squeezeend",V),s.addEventListener("end",B),s.addEventListener("inputsourceschange",se),x.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(g),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let Ne=null,We=null,Re=null;x.depth&&(Re=x.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,Ne=x.stencil?Fi:Hi,We=x.stencil?Us:si);const qe={colorFormat:t.RGBA8,depthFormat:Re,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(qe),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),b=new ii(d.textureWidth,d.textureHeight,{format:ni,type:Ln,depthTexture:new Fs(d.textureWidth,d.textureHeight,We,void 0,void 0,void 0,void 0,void 0,void 0,Ne),stencilBuffer:x.stencil,colorSpace:e.outputColorSpace,samples:x.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{const Ne={antialias:x.antialias,alpha:!0,depth:x.depth,stencil:x.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(s,t,Ne),s.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),b=new ii(m.framebufferWidth,m.framebufferHeight,{format:ni,type:Ln,colorSpace:e.outputColorSpace,stencilBuffer:x.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1,storeMultisampledDepthBuffer:m.ignoreDepthValues===!1,storeMultisampledStencilBuffer:m.ignoreDepthValues===!1})}b.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),Fe.setContext(s),Fe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return f.getDepthTexture()};function se($){for(let Se=0;Se<$.removed.length;Se++){const Ne=$.removed[Se],We=T.indexOf(Ne);We>=0&&(T[We]=null,w[We].disconnect(Ne))}for(let Se=0;Se<$.added.length;Se++){const Ne=$.added[Se];let We=T.indexOf(Ne);if(We===-1){for(let qe=0;qe<w.length;qe++)if(qe>=T.length){T.push(Ne),We=qe;break}else if(T[qe]===null){T[qe]=Ne,We=qe;break}if(We===-1)break}const Re=w[We];Re&&Re.connect(Ne)}}function Y($,Se){Se===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Se.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(s===null)return;let Se=$.near,Ne=$.far;f.texture!==null&&(f.depthNear>0&&(Se=f.depthNear),f.depthFar>0&&(Ne=f.depthFar)),W.near=N.near=C.near=Se,W.far=N.far=C.far=Ne,(R!==W.near||I!==W.far)&&(s.updateRenderState({depthNear:W.near,depthFar:W.far}),R=W.near,I=W.far),W.layers.mask=$.layers.mask|6,C.layers.mask=W.layers.mask&-5,N.layers.mask=W.layers.mask&-3;const We=$.parent,Re=W.cameras;Y(W,We);for(let qe=0;qe<Re.length;qe++)Y(Re[qe],We);W.projectionMatrix.copy(C.projectionMatrix),W.projectionMatrixInverse.copy(C.projectionMatrixInverse),P===null&&$.isPerspectiveCamera&&(P={camera:$,fov:$.fov,zoom:$.zoom}),j($,W,We)};function j($,Se,Ne){Ne===null?$.matrix.copy(Se.matrixWorld):($.matrix.copy(Ne.matrixWorld),$.matrix.invert(),$.matrix.multiply(Se.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Se.projectionMatrix),$.projectionMatrixInverse.copy(Se.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=il*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return W},this.getFoveation=function(){if(!(d===null&&m===null))return l},this.setFoveation=function($){l=$,d!==null&&(d.fixedFoveation=$),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=$)},this.hasDepthSensing=function(){return f.texture!==null},this.getDepthSensingMesh=function(){return f.getMesh(W)},this.getCameraTexture=function($){return p[$]};let ie=null;function Le($,Se){if(u=Se.getViewerPose(c||a),_=Se,u!==null){const Ne=u.views;m!==null&&(e.setRenderTargetFramebuffer(b,m.framebuffer),e.setRenderTarget(b));let We=!1;Ne.length!==W.cameras.length&&(W.cameras.length=0,We=!0);for(let Ke=0;Ke<Ne.length;Ke++){const vt=Ne[Ke];let Et=null;if(m!==null)Et=m.getViewport(vt);else{const it=h.getViewSubImage(d,vt);Et=it.viewport,Ke===0&&(e.setRenderTargetTextures(b,it.colorTexture,it.depthStencilTexture),e.setRenderTarget(b))}let ct=O[Ke];ct===void 0&&(ct=new zn,ct.layers.enable(Ke),ct.viewport=new Ft,O[Ke]=ct),ct.matrix.fromArray(vt.transform.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.projectionMatrix.fromArray(vt.projectionMatrix),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert(),ct.viewport.set(Et.x,Et.y,Et.width,Et.height),Ke===0&&(W.matrix.copy(ct.matrix),W.matrix.decompose(W.position,W.quaternion,W.scale)),We===!0&&W.cameras.push(ct)}const Re=s.enabledFeatures;if(Re&&Re.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){h=n.getBinding();const Ke=h.getDepthInformation(Ne[0]);Ke&&Ke.isValid&&Ke.texture&&f.init(Ke,s.renderState)}if(Re&&Re.includes("camera-access")&&v){e.state.unbindTexture(),h=n.getBinding();for(let Ke=0;Ke<Ne.length;Ke++){const vt=Ne[Ke].camera;if(vt){let Et=p[vt];Et||(Et=new Ih,p[vt]=Et);const ct=h.getCameraImage(vt);Et.sourceTexture=ct}}}}for(let Ne=0;Ne<w.length;Ne++){const We=T[Ne],Re=w[Ne];We!==null&&Re!==void 0&&Re.update(We,Se,c||a)}ie&&ie($,Se),Se.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Se}),_=null}const Fe=new Bh;Fe.setAnimationLoop(Le),this.setAnimationLoop=function($){ie=$},this.dispose=function(){}}}const Pg=new Rt,$h=new et;$h.set(-1,0,0,0,1,0,0,0,1);function Lg(i,e){function t(f,p){f.matrixAutoUpdate===!0&&f.updateMatrix(),p.value.copy(f.matrix)}function n(f,p){p.color.getRGB(f.fogColor.value,Nh(i)),p.isFog?(f.fogNear.value=p.near,f.fogFar.value=p.far):p.isFogExp2&&(f.fogDensity.value=p.density)}function s(f,p,x,E,b){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?r(f,p):p.isMeshLambertMaterial?(r(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(r(f,p),h(f,p)):p.isMeshPhongMaterial?(r(f,p),u(f,p),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(r(f,p),d(f,p),p.isMeshPhysicalMaterial&&m(f,p,b)):p.isMeshMatcapMaterial?(r(f,p),_(f,p)):p.isMeshDepthMaterial?r(f,p):p.isMeshDistanceMaterial?(r(f,p),v(f,p)):p.isMeshNormalMaterial?r(f,p):p.isLineBasicMaterial?(a(f,p),p.isLineDashedMaterial&&o(f,p)):p.isPointsMaterial?l(f,p,x,E):p.isSpriteMaterial?c(f,p):p.isShadowMaterial?(f.color.value.copy(p.color),f.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(f,p){f.opacity.value=p.opacity,p.color&&f.diffuse.value.copy(p.color),p.emissive&&f.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(f.map.value=p.map,t(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.bumpMap&&(f.bumpMap.value=p.bumpMap,t(p.bumpMap,f.bumpMapTransform),f.bumpScale.value=p.bumpScale,p.side===_n&&(f.bumpScale.value*=-1)),p.normalMap&&(f.normalMap.value=p.normalMap,t(p.normalMap,f.normalMapTransform),f.normalScale.value.copy(p.normalScale),p.side===_n&&f.normalScale.value.negate()),p.displacementMap&&(f.displacementMap.value=p.displacementMap,t(p.displacementMap,f.displacementMapTransform),f.displacementScale.value=p.displacementScale,f.displacementBias.value=p.displacementBias),p.emissiveMap&&(f.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,f.emissiveMapTransform)),p.specularMap&&(f.specularMap.value=p.specularMap,t(p.specularMap,f.specularMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest);const x=e.get(p),E=x.envMap,b=x.envMapRotation;E&&(f.envMap.value=E,f.envMapRotation.value.setFromMatrix4(Pg.makeRotationFromEuler(b)).transpose(),E.isCubeTexture&&E.isRenderTargetTexture===!1&&f.envMapRotation.value.premultiply($h),f.reflectivity.value=p.reflectivity,f.ior.value=p.ior,f.refractionRatio.value=p.refractionRatio),p.lightMap&&(f.lightMap.value=p.lightMap,f.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,f.lightMapTransform)),p.aoMap&&(f.aoMap.value=p.aoMap,f.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,f.aoMapTransform))}function a(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,p.map&&(f.map.value=p.map,t(p.map,f.mapTransform))}function o(f,p){f.dashSize.value=p.dashSize,f.totalSize.value=p.dashSize+p.gapSize,f.scale.value=p.scale}function l(f,p,x,E){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.size.value=p.size*x,f.scale.value=E*.5,p.map&&(f.map.value=p.map,t(p.map,f.uvTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function c(f,p){f.diffuse.value.copy(p.color),f.opacity.value=p.opacity,f.rotation.value=p.rotation,p.map&&(f.map.value=p.map,t(p.map,f.mapTransform)),p.alphaMap&&(f.alphaMap.value=p.alphaMap,t(p.alphaMap,f.alphaMapTransform)),p.alphaTest>0&&(f.alphaTest.value=p.alphaTest)}function u(f,p){f.specular.value.copy(p.specular),f.shininess.value=Math.max(p.shininess,1e-4)}function h(f,p){p.gradientMap&&(f.gradientMap.value=p.gradientMap)}function d(f,p){f.metalness.value=p.metalness,p.metalnessMap&&(f.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,f.metalnessMapTransform)),f.roughness.value=p.roughness,p.roughnessMap&&(f.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,f.roughnessMapTransform)),p.envMap&&(f.envMapIntensity.value=p.envMapIntensity)}function m(f,p,x){f.ior.value=p.ior,p.diffuseRoughness>0&&(f.diffuseRoughness.value=p.diffuseRoughness,p.diffuseRoughnessMap&&(f.diffuseRoughnessMap.value=p.diffuseRoughnessMap,t(p.diffuseRoughnessMap,f.diffuseRoughnessMapTransform))),p.sheen>0&&(f.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),f.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(f.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,f.sheenColorMapTransform)),p.sheenRoughnessMap&&(f.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,f.sheenRoughnessMapTransform))),p.clearcoat>0&&(f.clearcoat.value=p.clearcoat,f.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(f.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,f.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(f.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,f.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(f.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,f.clearcoatNormalMapTransform),f.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===_n&&f.clearcoatNormalScale.value.negate())),p.dispersion>0&&(f.dispersion.value=p.dispersion),p.retroreflectivity>0&&(f.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(f.iridescence.value=p.iridescence,f.iridescenceIOR.value=p.iridescenceIOR,f.iridescenceThicknessMinimum.value=p.iridescenceThicknessMinimum,f.iridescenceThicknessMaximum.value=p.iridescenceThicknessMaximum,p.iridescenceMap&&(f.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,f.iridescenceMapTransform)),p.iridescenceThicknessMap&&(f.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,f.iridescenceThicknessMapTransform))),p.transmission>0&&(f.transmission.value=p.transmission,f.transmissionSamplerMap.value=x.texture,f.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(f.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,f.transmissionMapTransform)),f.thickness.value=p.thickness,p.thicknessMap&&(f.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,f.thicknessMapTransform)),f.attenuationDistance.value=p.attenuationDistance,f.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(f.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(f.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,f.anisotropyMapTransform))),f.specularIntensity.value=p.specularIntensity,f.specularColor.value.copy(p.specularColor),p.specularColorMap&&(f.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,f.specularColorMapTransform)),p.specularIntensityMap&&(f.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,f.specularIntensityMapTransform))}function _(f,p){p.matcap&&(f.matcap.value=p.matcap)}function v(f,p){const x=e.get(p).light;f.referencePosition.value.setFromMatrixPosition(x.matrixWorld),f.nearDistance.value=x.shadow.camera.near,f.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:s}}function Dg(i,e,t,n){let s={},r={};function a(x,E){const b=E.program;n.uniformBlockBinding(x,b,s[x.id])}function o(x,E){let b=s[x.id];b===void 0&&(_(x),b=l(x),s[x.id]=b,x.addEventListener("dispose",f));const w=E.program;n.updateUBOMapping(x,w);const T=e.render.frame;r[x.id]!==T&&(c(x),r[x.id]=T)}function l(x){const E=i.createBuffer(),b=x.__size,w=x.usage;return i.bindBuffer(i.UNIFORM_BUFFER,E),i.bufferData(i.UNIFORM_BUFFER,b,w),i.bindBuffer(i.UNIFORM_BUFFER,null),E}function c(x){const E=s[x.id],b=x.uniforms,w=x.__cache;i.bindBuffer(i.UNIFORM_BUFFER,E);for(let T=0,g=b.length;T<g;T++){const y=b[T];if(Array.isArray(y))for(let P=0,C=y.length;P<C;P++)u(y[P],T,P,w);else u(y,T,0,w)}i.bindBuffer(i.UNIFORM_BUFFER,null)}function u(x,E,b,w){if(d(x,E,b,w)===!0){const T=x.__offset,g=x.value;if(Array.isArray(g)){let y=0;for(let P=0;P<g.length;P++){const C=g[P],N=v(C,!0);h(C,x.__data,y),y+=N.storage/Float32Array.BYTES_PER_ELEMENT}}else h(g,x.__data,0);i.bufferSubData(i.UNIFORM_BUFFER,T,x.__data)}}function h(x,E,b){typeof x=="number"||typeof x=="boolean"?E[b]=x:x.isMatrix3?(E[b]=x.elements[0],E[b+1]=x.elements[1],E[b+2]=x.elements[2],E[b+3]=0,E[b+4]=x.elements[3],E[b+5]=x.elements[4],E[b+6]=x.elements[5],E[b+7]=0,E[b+8]=x.elements[6],E[b+9]=x.elements[7],E[b+10]=x.elements[8],E[b+11]=0):ArrayBuffer.isView(x)?E.set(x.subarray(0,E.length-b),b):x.toArray(E,b)}function d(x,E,b,w){const T=x.value,g=E+"_"+b;if(Array.isArray(T)){w[g]===void 0&&(w[g]=[]);const y=w[g];let P=!1;for(let C=0;C<T.length;C++)m(T[C],y,C)===!0&&(P=!0);return P}return m(T,w,g)}function m(x,E,b){if(E[b]===void 0)return typeof x=="number"||typeof x=="boolean"?E[b]=x:ArrayBuffer.isView(x)?E[b]=x.slice():E[b]=x.clone(),!0;{const w=E[b];if(typeof x=="number"||typeof x=="boolean"){if(w!==x)return E[b]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(w.equals(x)===!1)return w.copy(x),!0}}return!1}function _(x){const E=x.uniforms;let b=0;const w=16;for(let g=0,y=E.length;g<y;g++){const P=Array.isArray(E[g])?E[g]:[E[g]];for(let C=0,N=P.length;C<N;C++){const O=P[C],W=Array.isArray(O.value)?O.value:[O.value],R=Array.isArray(E[g])||Array.isArray(O.value);let I=b;for(let B=0,se=W.length;B<se;B++){const Y=W[B],j=v(Y,R),ie=b%w,Le=ie%j.boundary,Fe=ie+Le;b+=Le,Fe!==0&&w-Fe<j.storage&&(b+=w-Fe),B===0&&(I=b),b+=j.storage}const V=O.type==="int"?Int32Array:O.type==="uint"?Uint32Array:Float32Array;O.__data=new V((b-I)/Float32Array.BYTES_PER_ELEMENT),O.__offset=I}}const T=b%w;return T>0&&(b+=w-T),x.__size=b,x.__cache={},this}function v(x,E){const b={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(b.boundary=4,b.storage=4):x.isVector2?(b.boundary=8,b.storage=8):x.isVector3||x.isColor?(b.boundary=16,b.storage=12):x.isVector4?(b.boundary=16,b.storage=16):x.isMatrix3?(b.boundary=16,b.storage=48):x.isMatrix4?(b.boundary=16,b.storage=64):x.isTexture?je("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(x)?(b.boundary=16,b.storage=x.byteLength):je("WebGLRenderer: Unsupported uniform value type.",x),E===!0&&(b.boundary=16,b.storage=Math.ceil(b.storage/16)*16),b}function f(x){const E=x.target;E.removeEventListener("dispose",f),i.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function p(){for(const x in s)i.deleteBuffer(s[x]);s={},r={}}return{bind:a,update:o,dispose:p}}const Ig=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let jn=null;function Ng(){return jn===null&&(jn=new Ph(Ig,16,16,ns,ri),jn.name="DFG_LUT",jn.minFilter=Tn,jn.magFilter=Tn,jn.wrapS=Kn,jn.wrapT=Kn,jn.generateMipmaps=!1,jn.needsUpdate=!0),jn}class Ug{constructor(e={}){const{canvas:t=Qu(),context:n=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:m=Ln}=e;this.isWebGLRenderer=!0;let _;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");_=n.getContextAttributes().alpha}else _=a;const v=m,f=new Set([xl,_l,gl]),p=new Set([Ln,si,hr,Us,fl,pl]),x=new Uint32Array(4),E=new Int32Array(4),b={textures:[],min:[],max:[],resolution:[]};let w=null,T=null;const g=[],y=[];let P=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=pi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const C=this;let N=!1,O=null,W=null,R=null,I=null;this._outputColorSpace=tn;let V=0,B=0,se=null,Y=-1,j=null;const ie=new Ft,Le=new Ft;let Fe=null;const $=new Ue(0);let Se=0,Ne=t.width,We=t.height,Re=1,qe=null,xt=null;const Ke=new Ft(0,0,Ne,We),vt=new Ft(0,0,Ne,We);let Et=!1;const ct=new dr,it=new yl;let zt=!1,rn=!1;const Mt=new Rt,vn=new F,Gt=new Ft,fn={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Mn=!1;function Sn(){return se===null?Re:1}let U=n;function yn(S,D){return t.getContext(S,D)}let Ct,Pt,we,It,Ye,Ze,A,M,z,ae,te,me,_e,Q,ee,ge,L,ne,Z,ve,fe,xe,Ge;try{const S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${hl}`),t.addEventListener("webglcontextlost",Ve,!1),t.addEventListener("webglcontextrestored",Qe,!1),t.addEventListener("webglcontextcreationerror",Ae,!1),U===null){const D="webgl2";if(U=yn(D,S),U===null)throw yn(D)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}at()}catch(S){throw t.removeEventListener("webglcontextlost",Ve,!1),t.removeEventListener("webglcontextrestored",Qe,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),yt("WebGLRenderer: "+S.message),S}function at(){Ct=new B0(U),Ct.init(),fe=new Tg(U,Ct),Pt=new A0(U,Ct,e,fe),we=new bg(U,Ct),Pt.reversedDepthBuffer&&d&&we.buffers.depth.setReversed(!0),W=U.createFramebuffer(),R=U.createFramebuffer(),I=U.createFramebuffer(),It=new G0(U),Ye=new cg,Ze=new Eg(U,Ct,we,Ye,Pt,fe,It),A=new O0(C),M=new Hd(U),xe=new T0(U,M),z=new z0(U,M,It,xe),ae=new V0(U,z,M,xe,It),ne=new H0(U,Pt,Ze),ee=new R0(Ye),te=new lg(C,A,Ct,Pt,xe,ee),me=new Lg(C,Ye),_e=new ug,Q=new _g(Ct),L=new E0(C,A,we,ae,_,l),ge=new yg(C,ae,Pt),Ge=new Dg(U,It,Pt,we),Z=new w0(U,Ct,It),ve=new k0(U,Ct,It),It.programs=te.programs,C.capabilities=Pt,C.extensions=Ct,C.properties=Ye,C.renderLists=_e,C.shadowMap=ge,C.state=we,C.info=It}v!==Ln&&(P=new X0(v,t.width,t.height,o,s,r));const ce=new Cg(C,U);this.xr=ce,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const S=Ct.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=Ct.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Re},this.setPixelRatio=function(S){S!==void 0&&(Re=S,this.setSize(Ne,We,!1))},this.getSize=function(S){return S.set(Ne,We)},this.setSize=function(S,D,X=!0){if(ce.isPresenting){je("WebGLRenderer: Can't change size while VR device is presenting.");return}Ne=S,We=D,t.width=Math.floor(S*Re),t.height=Math.floor(D*Re),X===!0&&(t.style.width=S+"px",t.style.height=D+"px"),P!==null&&P.setSize(t.width,t.height),this.setViewport(0,0,S,D)},this.getDrawingBufferSize=function(S){return S.set(Ne*Re,We*Re).floor()},this.setDrawingBufferSize=function(S,D,X){Ne=S,We=D,Re=X,t.width=Math.floor(S*X),t.height=Math.floor(D*X),this.setViewport(0,0,S,D)},this.setEffects=function(S){if(v===Ln){yt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let D=0;D<S.length;D++)if(S[D].isOutputPass===!0){je("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}P.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ie)},this.getViewport=function(S){return S.copy(Ke)},this.setViewport=function(S,D,X,k){S.isVector4?Ke.set(S.x,S.y,S.z,S.w):Ke.set(S,D,X,k),we.viewport(ie.copy(Ke).multiplyScalar(Sn()).round())},this.getScissor=function(S){return S.copy(vt)},this.setScissor=function(S,D,X,k){S.isVector4?vt.set(S.x,S.y,S.z,S.w):vt.set(S,D,X,k),we.scissor(Le.copy(vt).multiplyScalar(Sn()).round())},this.getScissorTest=function(){return Et},this.setScissorTest=function(S){we.setScissorTest(Et=S)},this.setOpaqueSort=function(S){qe=S},this.setTransparentSort=function(S){xt=S},this.getClearColor=function(S){return S.copy(L.getClearColor())},this.setClearColor=function(){L.setClearColor(...arguments)},this.getClearAlpha=function(){return L.getClearAlpha()},this.setClearAlpha=function(){L.setClearAlpha(...arguments)},this.clear=function(S=!0,D=!0,X=!0){let k=0;if(S){let H=!1;if(se!==null){const Te=se.texture.format;H=f.has(Te)}if(H){const Te=se.texture.type,Oe=p.has(Te),be=L.getClearColor(),De=L.getClearAlpha(),ke=be.r,tt=be.g,ut=be.b;Oe?(x[0]=ke,x[1]=tt,x[2]=ut,x[3]=De,U.clearBufferuiv(U.COLOR,0,x)):(E[0]=ke,E[1]=tt,E[2]=ut,E[3]=De,U.clearBufferiv(U.COLOR,0,E))}else k|=U.COLOR_BUFFER_BIT}D&&(k|=U.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),X&&(k|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&U.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),O=S},this.dispose=function(){t.removeEventListener("webglcontextlost",Ve,!1),t.removeEventListener("webglcontextrestored",Qe,!1),t.removeEventListener("webglcontextcreationerror",Ae,!1),L.dispose(),_e.dispose(),Q.dispose(),Ze.dispose(),Ye.dispose(),A.dispose(),ae.dispose(),z.dispose(),xe.dispose(),Ge.dispose(),te.dispose(),ce.dispose(),ce.removeEventListener("sessionstart",G),ce.removeEventListener("sessionend",q),he.stop()};function Ve(S){S.preventDefault(),Vl("WebGLRenderer: Context Lost."),N=!0}function Qe(){Vl("WebGLRenderer: Context Restored."),N=!1;const S=It.autoReset,D=ge.enabled,X=ge.autoUpdate,k=ge.needsUpdate,H=ge.type;at(),It.autoReset=S,ge.enabled=D,ge.autoUpdate=X,ge.needsUpdate=k,ge.type=H}function Ae(S){yt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function ht(S){const D=S.target;D.removeEventListener("dispose",ht),Nt(D)}function Nt(S){Fn(S),Ye.remove(S)}function Fn(S){const D=Ye.get(S).programs;D!==void 0&&(D.forEach(function(X){te.releaseProgram(X)}),S.isShaderMaterial&&te.releaseShaderCache(S))}this.renderBufferDirect=function(S,D,X,k,H,Te){D===null&&(D=fn);const Oe=H.isMesh&&H.matrixWorld.determinantAffine()<0,be=Gn(S,D,X,k,H);we.setMaterial(k,Oe);let De=X.index,ke=1;if(k.wireframe===!0){if(De=z.getWireframeAttribute(X),De===void 0)return;ke=2}const tt=X.drawRange,ut=X.attributes.position;let Be=tt.start*ke,dt=(tt.start+tt.count)*ke;Te!==null&&(Be=Math.max(Be,Te.start*ke),dt=Math.min(dt,(Te.start+Te.count)*ke)),De!==null?(Be=Math.max(Be,0),dt=Math.min(dt,De.count)):ut!=null&&(Be=Math.max(Be,0),dt=Math.min(dt,ut.count));const Ht=dt-Be;if(Ht<0||Ht===1/0)return;xe.setup(H,k,be,X,De);let Lt,At=Z;if(De!==null&&(Lt=M.get(De),At=ve,At.setIndex(Lt)),H.isMesh)k.wireframe===!0?(we.setLineWidth(k.wireframeLinewidth*Sn()),At.setMode(U.LINES)):At.setMode(U.TRIANGLES);else if(H.isLine){let an=k.linewidth;an===void 0&&(an=1),we.setLineWidth(an*Sn()),H.isLineSegments?At.setMode(U.LINES):H.isLineLoop?At.setMode(U.LINE_LOOP):At.setMode(U.LINE_STRIP)}else H.isPoints?At.setMode(U.POINTS):H.isSprite&&At.setMode(U.TRIANGLES);if(H.isBatchedMesh)if(Ct.get("WEBGL_multi_draw"))At.renderMultiDraw(H._multiDrawStarts,H._multiDrawCounts,H._multiDrawCount);else{const an=H._multiDrawStarts,ze=H._multiDrawCounts,pn=H._multiDrawCount,St=De?M.get(De).bytesPerElement:1,qi=Ye.get(k).currentProgram.getUniforms();for(let on=0;on<pn;on++)qi.setValue(U,"_gl_DrawID",on),At.render(an[on]/St,ze[on])}else if(H.isInstancedMesh)At.renderInstances(Be,Ht,H.count);else if(X.isInstancedBufferGeometry){const an=X._maxInstanceCount!==void 0?X._maxInstanceCount:1/0,ze=Math.min(X.instanceCount,an);At.renderInstances(Be,Ht,ze)}else At.render(Be,Ht)};function yi(S,D,X,k){O!==null&&S.isNodeMaterial&&O.setObject(k,S),zt===!0&&ee.setState(S,X,!1),S.transparent===!0&&S.side===Pn&&S.forceSinglePass===!1?(S.side=_n,S.needsUpdate=!0,Ee(S,D,k),S.side=ts,S.needsUpdate=!0,Ee(S,D,k),S.side=Pn):Ee(S,D,k)}this.compile=function(S,D,X=null){X===null&&(X=S),O!==null&&O.renderStart(S,D,X),T=Q.get(X),T.init(D),y.push(T),X.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),S!==X&&S.traverseVisible(function(H){H.isLight&&H.layers.test(D.layers)&&(T.pushLight(H),H.castShadow&&T.pushShadow(H))}),T.setupLights(),O!==null&&O.updateLights(T.state.lightsArray),rn=this.localClippingEnabled,zt=ee.init(this.clippingPlanes,rn),zt===!0&&ee.setGlobalState(this.clippingPlanes,D),O!==null&&ge.render(T.state.shadowsArray,X,D);const k=new Set;return S.traverse(function(H){if(!(H.isMesh||H.isPoints||H.isLine||H.isSprite))return;const Te=H.material;if(Te)if(Array.isArray(Te))for(let Oe=0;Oe<Te.length;Oe++){const be=Te[Oe];yi(be,X,D,H),k.add(be)}else yi(Te,X,D,H),k.add(Te)}),T=y.pop(),O!==null&&O.renderEnd(),k},this.compileAsync=function(S,D,X=null){const k=this.compile(S,D,X);return new Promise(H=>{function Te(){if(k.forEach(function(Oe){const De=Ye.get(Oe).currentProgram;(De===void 0||De.isReady())&&k.delete(Oe)}),k.size===0){H(S);return}setTimeout(Te,10)}Ct.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Xi=null;function Tr(S){Xi&&Xi(S)}function G(){he.stop()}function q(){he.start()}const he=new Bh;he.setAnimationLoop(Tr),typeof self<"u"&&he.setContext(self),this.setAnimationLoop=function(S){Xi=S,ce.setAnimationLoop(S),S===null?he.stop():he.start()},ce.addEventListener("sessionstart",G),ce.addEventListener("sessionend",q),this.render=function(S,D){if(D!==void 0&&D.isCamera!==!0){yt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(N===!0)return;O!==null&&O.renderStart(S,D);const X=ce.enabled===!0&&ce.isPresenting===!0,k=P!==null&&(se===null||X)&&P.begin(C,se);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),D.parent===null&&D.matrixWorldAutoUpdate===!0&&D.updateMatrixWorld(),ce.enabled===!0&&ce.isPresenting===!0&&(P===null||P.isCompositing()===!1)&&(ce.cameraAutoUpdate===!0&&ce.updateCamera(D),D=ce.getCamera()),S.isScene===!0&&S.onBeforeRender(C,S,D,se),T=Q.get(S,y.length),T.init(D),T.state.textureUnits=Ze.getTextureUnits(),y.push(T),Mt.multiplyMatrices(D.projectionMatrix,D.matrixWorldInverse),D.isArrayCamera?it.setFromArrayCamera(D):ct.setFromProjectionMatrix(Mt,Jn,D.reversedDepth),rn=this.localClippingEnabled,zt=ee.init(this.clippingPlanes,rn),w=_e.get(S,g.length),w.init(),g.push(w),this.info.render.frame++,ce.enabled===!0&&ce.isPresenting===!0){const Oe=C.xr.getDepthSensingMesh();Oe!==null&&le(Oe,D,-1/0,C.sortObjects)}le(S,D,0,C.sortObjects),w.finish(),O!==null&&O.updateLights(T.state.lightsArray),C.sortObjects===!0&&w.sort(qe,xt),Mn=ce.enabled===!1||ce.isPresenting===!1||ce.hasDepthSensing()===!1,Mn&&L.addToRenderList(w,S),this.info.autoReset===!0&&this.info.reset(),zt===!0&&ee.beginShadows();const H=T.state.shadowsArray;if(ge.render(H,S,D),zt===!0&&ee.endShadows(),(k&&P.hasRenderPass())===!1){const Oe=w.opaque,be=w.transmissive;if(T.setupLights(),D.isArrayCamera){const De=D.cameras;if(be.length>0)for(let ke=0,tt=De.length;ke<tt;ke++){const ut=De[ke];ue(Oe,be,S,ut)}Mn&&L.render(S);for(let ke=0,tt=De.length;ke<tt;ke++){const ut=De[ke];J(w,S,ut,ut.viewport)}}else be.length>0&&ue(Oe,be,S,D),Mn&&L.render(S),J(w,S,D)}se!==null&&B===0&&(Ze.updateMultisampleRenderTarget(se),Ze.updateRenderTargetMipmap(se)),k&&P.end(C),S.isScene===!0&&S.onAfterRender(C,S,D),xe.resetDefaultState(),Y=-1,j=null,y.pop(),y.length>0?(T=y[y.length-1],Ze.setTextureUnits(T.state.textureUnits),zt===!0&&ee.setGlobalState(C.clippingPlanes,T.state.camera)):T=null,g.pop(),g.length>0?w=g[g.length-1]:w=null,O!==null&&O.renderEnd()};function le(S,D,X,k){if(S.visible===!1)return;if(S.layers.test(D.layers)){if(S.isGroup)X=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(D);else if(S.isLight)T.pushLight(S),S.castShadow&&T.pushShadow(S);else if(S.isSprite){const Oe=D.isArrayCamera?it:ct;if(!S.frustumCulled||S.intersectsFrustum(Oe)){k&&Gt.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Mt);const be=ae.update(S),De=S.material;De.visible&&w.push(S,be,De,X,Gt.z,null,D)}}else if(S.isMesh||S.isLine||S.isPoints){const Oe=D.isArrayCamera?it:ct;if(!S.frustumCulled||S.intersectsFrustum(Oe)){const be=ae.update(S),De=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Gt.copy(S.boundingSphere.center)):(be.boundingSphere===null&&be.computeBoundingSphere(),Gt.copy(be.boundingSphere.center)),Gt.applyMatrix4(S.matrixWorld).applyMatrix4(Mt)),Array.isArray(De)){const ke=be.groups;for(let tt=0,ut=ke.length;tt<ut;tt++){const Be=ke[tt],dt=De[Be.materialIndex];dt&&dt.visible&&w.push(S,be,dt,X,Gt.z,Be,D)}}else De.visible&&w.push(S,be,De,X,Gt.z,null,D)}}}const Te=S.children;for(let Oe=0,be=Te.length;Oe<be;Oe++)le(Te[Oe],D,X,k)}function J(S,D,X,k){const{opaque:H,transmissive:Te,transparent:Oe}=S;T.setupLightsView(X),zt===!0&&ee.setGlobalState(C.clippingPlanes,X),k&&we.viewport(ie.copy(k)),H.length>0&&de(H,D,X),Te.length>0&&de(Te,D,X),Oe.length>0&&de(Oe,D,X),we.buffers.depth.setTest(!0),we.buffers.depth.setMask(!0),we.buffers.color.setMask(!0),we.setPolygonOffset(!1)}function ue(S,D,X,k){if((X.isScene===!0?X.overrideMaterial:null)!==null)return;if(T.state.transmissionRenderTarget[k.id]===void 0){const Be=Ct.has("EXT_color_buffer_half_float")||Ct.has("EXT_color_buffer_float");T.state.transmissionRenderTarget[k.id]=new ii(1,1,{generateMipmaps:!0,type:Be?ri:Ln,minFilter:Ui,samples:Math.max(4,Pt.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:pt.workingColorSpace})}const Te=T.state.transmissionRenderTarget[k.id],Oe=k.viewport||ie;Te.setSize(Oe.z*C.transmissionResolutionScale,Oe.w*C.transmissionResolutionScale);const be=C.getRenderTarget(),De=C.getActiveCubeFace(),ke=C.getActiveMipmapLevel();C.setRenderTarget(Te),C.getClearColor($),Se=C.getClearAlpha(),Se<1&&C.setClearColor(16777215,.5),C.clear(),Mn&&L.render(X);const tt=C.toneMapping;C.toneMapping=pi;const ut=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),T.setupLightsView(k),zt===!0&&ee.setGlobalState(C.clippingPlanes,k),de(S,X,k),Ze.updateMultisampleRenderTarget(Te),Ze.updateRenderTargetMipmap(Te),Ct.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let dt=0,Ht=D.length;dt<Ht;dt++){const Lt=D[dt],{object:At,geometry:an,material:ze,group:pn}=Lt;if(ze.side===Pn&&At.layers.test(k.layers)){const St=ze.side;ze.side=_n,ze.needsUpdate=!0,ye(At,X,k,an,ze,pn),ze.side=St,ze.needsUpdate=!0,Be=!0}}Be===!0&&(Ze.updateMultisampleRenderTarget(Te),Ze.updateRenderTargetMipmap(Te))}C.setRenderTarget(be,De,ke),C.setClearColor($,Se),ut!==void 0&&(k.viewport=ut),C.toneMapping=tt}function de(S,D,X){const k=D.isScene===!0?D.overrideMaterial:null;for(let H=0,Te=S.length;H<Te;H++){const Oe=S[H],{object:be,geometry:De,group:ke}=Oe;let tt=Oe.material;tt.allowOverride===!0&&k!==null&&(tt=k),be.layers.test(X.layers)&&ye(be,D,X,De,tt,ke)}}function ye(S,D,X,k,H,Te){O!==null&&H.isNodeMaterial&&O.setObject(S,H),S.onBeforeRender(C,D,X,k,H,Te),S.modelViewMatrix.multiplyMatrices(X.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),H.onBeforeRender(C,D,X,k,S,Te),H.transparent===!0&&H.side===Pn&&H.forceSinglePass===!1?(H.side=_n,H.needsUpdate=!0,C.renderBufferDirect(X,D,k,H,S,Te),H.side=ts,H.needsUpdate=!0,C.renderBufferDirect(X,D,k,H,S,Te),H.side=Pn):C.renderBufferDirect(X,D,k,H,S,Te),S.onAfterRender(C,D,X,k,H,Te)}function re(S){let D=0;for(const X of S)X.texture!==null&&D++;return D}function Ee(S,D,X){D.isScene!==!0&&(D=fn);const k=Ye.get(S),H=T.state.lights,Te=T.state.shadowsArray,Oe=H.state.version,be=te.getParameters(S,H.state,Te,D,X,T.state.lightProbeGridArray),De=te.getProgramCacheKey(be);let ke=k.programs;k.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?D.environment:null,k.fog=D.fog;const tt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;k.envMap=A.get(S.envMap||k.environment,tt),k.envMapRotation=k.environment!==null&&S.envMap===null?D.environmentRotation:S.envMapRotation,ke===void 0&&(S.addEventListener("dispose",ht),ke=new Map,k.programs=ke,k.programVariants=new Map);let ut=ke.get(De);if(ut!==void 0){if(k.currentProgram===ut&&k.lightsStateVersion===Oe)return Je(S,be),ut}else be.uniforms=te.getUniforms(S),O!==null&&S.isNodeMaterial&&O.build(S,X,be),S.onBeforeCompile(be,C),ut=te.acquireProgram(be,De),ke.set(De,ut),k.uniforms=be.uniforms;const Be=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Be.clippingPlanes=ee.uniform),Je(S,be),k.needsLights=_u(S),k.lightsStateVersion=Oe,k.needsLights&&(Be.ambientLightColor.value=H.state.ambient,Be.lightProbe.value=H.state.probe,Be.sunLights.value=H.state.sun,Be.sunLightShadows.value=H.state.sunShadow,Be.directionalLights.value=H.state.directional,Be.directionalLightShadows.value=H.state.directionalShadow,Be.spotLights.value=H.state.spot,Be.spotLightShadows.value=H.state.spotShadow,Be.rectAreaLights.value=H.state.rectArea,Be.ltc_1.value=H.state.rectAreaLTC1,Be.ltc_2.value=H.state.rectAreaLTC2,Be.pointLights.value=H.state.point,Be.pointLightShadows.value=H.state.pointShadow,Be.hemisphereLights.value=H.state.hemi,Be.sunShadowMatrix.value=H.state.sunShadowMatrix,Be.sunShadowCascade.value=H.state.sunShadowCascade,Be.directionalShadowMatrix.value=H.state.directionalShadowMatrix,Be.spotLightMatrix.value=H.state.spotLightMatrix,Be.spotLightMap.value=H.state.spotLightMap,Be.pointShadowMatrix.value=H.state.pointShadowMatrix),k.numLightProbeGrids=re(T.state.lightProbeGridArray),k.currentProgram=ut,k.uniformsList=null,ut}function Xe(S,D,X,k,H){const Te=Ye.get(S),Oe=Te.currentProgram.id+","+k+","+H;let be=Te.programVariants.get(Oe);return be===void 0?(be=Ee(S,D,X),Te.programVariants.set(Oe,be)):(Te.currentProgram=be,Te.uniformsList=null,Te.outputColorSpace=k,Te.toneMapping=H),be}function Ce(S){if(S.uniformsList===null){const D=S.currentProgram.getUniforms();S.uniformsList=oa.seqWithValue(D.seq,S.uniforms)}return S.uniformsList}function Je(S,D){const X=Ye.get(S);X.outputColorSpace=D.outputColorSpace,X.batching=D.batching,X.batchingColor=D.batchingColor,X.instancing=D.instancing,X.instancingColor=D.instancingColor,X.instancingMorph=D.instancingMorph,X.skinning=D.skinning,X.morphTargets=D.morphTargets,X.morphNormals=D.morphNormals,X.morphColors=D.morphColors,X.morphTargetsCount=D.morphTargetsCount,X.numClippingPlanes=D.numClippingPlanes,X.numIntersection=D.numClipIntersection,X.vertexAlphas=D.vertexAlphas,X.vertexTangents=D.vertexTangents,X.toneMapping=D.toneMapping}function Gn(S,D,X,k,H){D.isScene!==!0&&(D=fn),Ze.resetTextureUnits();const Te=D.fog,Oe=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?D.environment:null,be=se===null?C.outputColorSpace:se.isXRRenderTarget===!0?se.texture.colorSpace:pt.workingColorSpace,De=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,ke=A.get(k.envMap||Oe,De),tt=k.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,ut=!!X.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),Be=!!X.morphAttributes.position,dt=!!X.morphAttributes.normal,Ht=!!X.morphAttributes.color;let Lt=pi;k.toneMapped&&(se===null||se.isXRRenderTarget===!0)&&(Lt=C.toneMapping);const At=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,an=At!==void 0?At.length:0,ze=Ye.get(k),pn=T.state.lights;if(zt===!0&&(rn===!0||S!==j)){const Ut=S===j&&k.id===Y;ee.setState(k,S,Ut)}let St=!1,qi=!1;k.version===ze.__version?ze.needsLights&&ze.lightsStateVersion!==pn.state.version||H.isBatchedMesh&&ze.batching===!1||!H.isBatchedMesh&&ze.batching===!0||H.isBatchedMesh&&ze.batchingColor===!0&&H._colorsTexture===null||H.isBatchedMesh&&ze.batchingColor===!1&&H._colorsTexture!==null||H.isInstancedMesh&&ze.instancing===!1||!H.isInstancedMesh&&ze.instancing===!0||H.isSkinnedMesh&&ze.skinning===!1||!H.isSkinnedMesh&&ze.skinning===!0||H.isInstancedMesh&&ze.instancingColor===!0&&H.instanceColor===null||H.isInstancedMesh&&ze.instancingColor===!1&&H.instanceColor!==null||H.isInstancedMesh&&ze.instancingMorph===!0&&H.morphTexture===null||H.isInstancedMesh&&ze.instancingMorph===!1&&H.morphTexture!==null||ze.envMap!==ke||k.fog===!0&&ze.fog!==Te||ze.numClippingPlanes!==void 0&&(ze.numClippingPlanes!==ee.numPlanes||ze.numIntersection!==ee.numIntersection)||ze.vertexAlphas!==tt||ze.vertexTangents!==ut||ze.morphTargets!==Be||ze.morphNormals!==dt||ze.morphColors!==Ht||ze.morphTargetsCount!==an||ze.numLightProbeGrids!==re(T.state.lightProbeGridArray)?St=!0:(ze.outputColorSpace!==be||ze.toneMapping!==Lt)&&(qi=!0):(St=!0,ze.__version=k.version);let on=ze.currentProgram;(St===!0||qi===!0)&&(on=qi===!0?Xe(k,D,H,be,Lt):Ee(k,D,H),O&&k.isNodeMaterial&&O.onUpdateProgram(k,on,ze));let wr=!1,bi=!1,Yi=!1;const _t=on.getUniforms(),en=ze.uniforms;if(we.useProgram(on.program)&&(wr=!0,bi=!0,Yi=!0),k.id!==Y&&(Y=k.id,bi=!0),wr||j!==S){we.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),_t.setValue(U,"projectionMatrix",S.projectionMatrix),_t.setValue(U,"viewMatrix",S.matrixWorldInverse);const Zt=_t.map.cameraPosition;Zt!==void 0&&Zt.setValue(U,vn.setFromMatrixPosition(S.matrixWorld)),Pt.logarithmicDepthBuffer&&_t.setValue(U,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&_t.setValue(U,"isOrthographic",S.isOrthographicCamera===!0),j!==S&&(j=S,bi=!0,Yi=!0)}if(ze.needsLights&&(pn.state.sunShadowMap.length>0&&_t.setValue(U,"sunShadowMap",pn.state.sunShadowMap,Ze),pn.state.directionalShadowMap.length>0&&_t.setValue(U,"directionalShadowMap",pn.state.directionalShadowMap,Ze),pn.state.spotShadowMap.length>0&&_t.setValue(U,"spotShadowMap",pn.state.spotShadowMap,Ze),pn.state.pointShadowMap.length>0&&_t.setValue(U,"pointShadowMap",pn.state.pointShadowMap,Ze)),H.isSkinnedMesh){_t.setOptional(U,H,"bindMatrix"),_t.setOptional(U,H,"bindMatrixInverse");const Ut=H.skeleton;Ut&&(Ut.boneTexture===null&&Ut.computeBoneTexture(),_t.setValue(U,"boneTexture",Ut.boneTexture,Ze))}H.isBatchedMesh&&(_t.setOptional(U,H,"batchingTexture"),_t.setValue(U,"batchingTexture",H._matricesTexture,Ze),_t.setOptional(U,H,"batchingIdTexture"),_t.setValue(U,"batchingIdTexture",H._indirectTexture,Ze),_t.setOptional(U,H,"batchingColorTexture"),H._colorsTexture!==null&&_t.setValue(U,"batchingColorTexture",H._colorsTexture,Ze));const Hn=X.morphAttributes;if((Hn.position!==void 0||Hn.normal!==void 0||Hn.color!==void 0)&&ne.update(H,X,on),(bi||ze.receiveShadow!==H.receiveShadow)&&(ze.receiveShadow=H.receiveShadow,_t.setValue(U,"receiveShadow",H.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&D.environment!==null&&(en.envMapIntensity.value=D.environmentIntensity),en.dfgLUT!==void 0&&(en.dfgLUT.value=Ng()),bi){if(_t.setValue(U,"toneMappingExposure",C.toneMappingExposure),ze.needsLights&&oi(en,Yi),Te&&k.fog===!0&&me.refreshFogUniforms(en,Te),me.refreshMaterialUniforms(en,k,Re,We,T.state.transmissionRenderTarget[S.id]),ze.needsLights&&ze.numLightProbeGrids>0){const Ut=b;let Zt=0;for(const li of T.state.lightProbeGridArray)li.texture!==null&&(Ut.textures[Zt]=li.texture,Ut.min[Zt]=li.boundingBox.min,Ut.max[Zt]=li.boundingBox.max,Ut.resolution[Zt]=li.resolution,Zt++);for(const li in Ut)Ut[li].length=Zt;en.probesSH.value=Ut.textures,en.probesMin.value=Ut.min,en.probesMax.value=Ut.max,en.probesResolution.value=Ut.resolution}oa.upload(U,Ce(ze),en,Ze)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(oa.upload(U,Ce(ze),en,Ze),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&_t.setValue(U,"center",H.center),_t.setValue(U,"modelViewMatrix",H.modelViewMatrix),_t.setValue(U,"normalMatrix",H.normalMatrix),_t.setValue(U,"modelMatrix",H.matrixWorld),k.uniformsGroups!==void 0){const Ut=k.uniformsGroups;for(let Zt=0,li=Ut.length;Zt<li;Zt++){const Ol=Ut[Zt];Ge.update(Ol,on),Ge.bind(Ol,on)}}return on}function oi(S,D){S.ambientLightColor.needsUpdate=D,S.lightProbe.needsUpdate=D,S.sunLights.needsUpdate=D,S.sunLightShadows.needsUpdate=D,S.directionalLights.needsUpdate=D,S.directionalLightShadows.needsUpdate=D,S.pointLights.needsUpdate=D,S.pointLightShadows.needsUpdate=D,S.spotLights.needsUpdate=D,S.spotLightShadows.needsUpdate=D,S.rectAreaLights.needsUpdate=D,S.hemisphereLights.needsUpdate=D}function _u(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return V},this.getActiveMipmapLevel=function(){return B},this.getRenderTarget=function(){return se},this.setRenderTargetTextures=function(S,D,X){const k=Ye.get(S);k.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),Ye.get(S.texture).__webglTexture=D,Ye.get(S.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:X,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,D){const X=Ye.get(S);X.__webglFramebuffer=D,X.__useDefaultFramebuffer=D===void 0},this.setRenderTarget=function(S,D=0,X=0){se=S,V=D,B=X;let k=null,H=!1,Te=!1;if(S){const be=Ye.get(S);if(be.__useDefaultFramebuffer!==void 0){we.bindFramebuffer(U.FRAMEBUFFER,be.__webglFramebuffer),ie.copy(S.viewport),Le.copy(S.scissor),Fe=S.scissorTest,we.viewport(ie),we.scissor(Le),we.setScissorTest(Fe),Y=-1;return}else if(be.__webglFramebuffer===void 0)Ze.setupRenderTarget(S);else if(be.__hasExternalTextures)Ze.rebindTextures(S,Ye.get(S.texture).__webglTexture,Ye.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const tt=S.depthTexture;if(be.__boundDepthTexture!==tt){if(tt!==null&&Ye.has(tt)&&(S.width!==tt.image.width||S.height!==tt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");Ze.setupDepthRenderbuffer(S)}}const De=S.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(Te=!0);const ke=Ye.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(ke[D])?k=ke[D][X]:k=ke[D],H=!0):S.samples>0&&Ze.useMultisampledRTT(S)===!1?k=Ye.get(S).__webglMultisampledFramebuffer:Array.isArray(ke)?k=ke[X]:k=ke,ie.copy(S.viewport),Le.copy(S.scissor),Fe=S.scissorTest}else ie.copy(Ke).multiplyScalar(Re).floor(),Le.copy(vt).multiplyScalar(Re).floor(),Fe=Et;if(X!==0&&(k=W),we.bindFramebuffer(U.FRAMEBUFFER,k)&&we.drawBuffers(S,k),we.viewport(ie),we.scissor(Le),we.setScissorTest(Fe),H){const be=Ye.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+D,be.__webglTexture,X)}else if(Te){const be=D;for(let De=0;De<S.textures.length;De++){const ke=Ye.get(S.textures[De]);U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0+De,ke.__webglTexture,X,be)}}else if(S!==null&&X!==0){const be=Ye.get(S.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,be.__webglTexture,X)}Y=-1};function Fl(S){const D=Ye.get(S);return(D.__readFormat!==S.format||D.__readType!==S.type)&&(D.__readFormat=S.format,D.__readType=S.type,D.__formatReadable=Pt.textureFormatReadable(S.format),D.__typeReadable=Pt.textureTypeReadable(S.type)),D}this.readRenderTargetPixels=function(S,D,X,k,H,Te,Oe,be=0){if(!(S&&S.isWebGLRenderTarget)){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=Ye.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Oe!==void 0&&(De=De[Oe],Array.isArray(De)&&(De=De[0])),De){we.bindFramebuffer(U.FRAMEBUFFER,De);try{const ke=S.textures[be],tt=ke.format,ut=ke.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+be);const Be=Fl(ke);if(Be.__formatReadable===!1){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Be.__typeReadable===!1){yt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}D>=0&&D<=S.width-k&&X>=0&&X<=S.height-H&&U.readPixels(D,X,k,H,fe.convert(tt),fe.convert(ut),Te)}finally{const ke=se!==null?Ye.get(se).__webglFramebuffer:null;we.bindFramebuffer(U.FRAMEBUFFER,ke)}}},this.readRenderTargetPixelsAsync=async function(S,D,X,k,H,Te,Oe,be=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=Ye.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Oe!==void 0&&(De=De[Oe],Array.isArray(De)&&(De=De[0])),De)if(D>=0&&D<=S.width-k&&X>=0&&X<=S.height-H){we.bindFramebuffer(U.FRAMEBUFFER,De);const ke=S.textures[be],tt=ke.format,ut=ke.type;S.textures.length>1&&U.readBuffer(U.COLOR_ATTACHMENT0+be);const Be=Fl(ke);if(Be.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Be.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const dt=U.createBuffer();U.bindBuffer(U.PIXEL_PACK_BUFFER,dt),U.bufferData(U.PIXEL_PACK_BUFFER,Te.byteLength,U.STREAM_READ),U.readPixels(D,X,k,H,fe.convert(tt),fe.convert(ut),0),U.bindBuffer(U.PIXEL_PACK_BUFFER,null);const Ht=se!==null?Ye.get(se).__webglFramebuffer:null;we.bindFramebuffer(U.FRAMEBUFFER,Ht);const Lt=U.fenceSync(U.SYNC_GPU_COMMANDS_COMPLETE,0);return U.flush(),await ju(U,Lt,4),U.bindBuffer(U.PIXEL_PACK_BUFFER,dt),U.getBufferSubData(U.PIXEL_PACK_BUFFER,0,Te),U.bindBuffer(U.PIXEL_PACK_BUFFER,null),U.deleteBuffer(dt),U.deleteSync(Lt),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,D=null,X=0){const k=Math.pow(2,-X),H=Math.floor(S.image.width*k),Te=Math.floor(S.image.height*k),Oe=D!==null?D.x:0,be=D!==null?D.y:0;Ze.setTexture2D(S,0),U.copyTexSubImage2D(U.TEXTURE_2D,X,0,0,Oe,be,H,Te),we.unbindTexture()},this.copyTextureToTexture=function(S,D,X=null,k=null,H=0,Te=0){let Oe,be,De,ke,tt,ut,Be,dt,Ht;const Lt=S.isCompressedTexture?S.mipmaps[Te]:S.image;if(X!==null)Oe=X.max.x-X.min.x,be=X.max.y-X.min.y,De=X.isBox3?X.max.z-X.min.z:1,ke=X.min.x,tt=X.min.y,ut=X.isBox3?X.min.z:0;else{const _t=Math.pow(2,-H);Oe=Math.floor(Lt.width*_t),be=Math.floor(Lt.height*_t),S.isDataArrayTexture?De=Lt.depth:S.isData3DTexture?De=Math.floor(Lt.depth*_t):De=1,ke=0,tt=0,ut=0}k!==null?(Be=k.x,dt=k.y,Ht=k.z):(Be=0,dt=0,Ht=0);const At=fe.convert(D.format),an=fe.convert(D.type);let ze;D.isData3DTexture?(Ze.setTexture3D(D,0),ze=U.TEXTURE_3D):D.isDataArrayTexture||D.isCompressedArrayTexture?(Ze.setTexture2DArray(D,0),ze=U.TEXTURE_2D_ARRAY):(Ze.setTexture2D(D,0),ze=U.TEXTURE_2D),we.activeTexture(U.TEXTURE0),we.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,D.flipY),we.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,D.premultiplyAlpha),we.pixelStorei(U.UNPACK_ALIGNMENT,D.unpackAlignment);const pn=we.getParameter(U.UNPACK_ROW_LENGTH),St=we.getParameter(U.UNPACK_IMAGE_HEIGHT),qi=we.getParameter(U.UNPACK_SKIP_PIXELS),on=we.getParameter(U.UNPACK_SKIP_ROWS),wr=we.getParameter(U.UNPACK_SKIP_IMAGES);we.pixelStorei(U.UNPACK_ROW_LENGTH,Lt.width),we.pixelStorei(U.UNPACK_IMAGE_HEIGHT,Lt.height),we.pixelStorei(U.UNPACK_SKIP_PIXELS,ke),we.pixelStorei(U.UNPACK_SKIP_ROWS,tt),we.pixelStorei(U.UNPACK_SKIP_IMAGES,ut);const bi=S.isDataArrayTexture||S.isData3DTexture,Yi=D.isDataArrayTexture||D.isData3DTexture;if(S.isDepthTexture){const _t=Ye.get(S),en=Ye.get(D),Hn=Ye.get(_t.__renderTarget),Ut=Ye.get(en.__renderTarget);we.bindFramebuffer(U.READ_FRAMEBUFFER,Hn.__webglFramebuffer),we.bindFramebuffer(U.DRAW_FRAMEBUFFER,Ut.__webglFramebuffer);for(let Zt=0;Zt<De;Zt++)bi&&(U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ye.get(S).__webglTexture,H,ut+Zt),U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,Ye.get(D).__webglTexture,Te,Ht+Zt)),U.blitFramebuffer(ke,tt,ke+Oe,tt+be,Be,dt,Be+Oe,dt+be,U.DEPTH_BUFFER_BIT,U.NEAREST);we.bindFramebuffer(U.READ_FRAMEBUFFER,null),we.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else if(H!==0||S.isRenderTargetTexture||Ye.has(S)){const _t=Ye.get(S),en=Ye.get(D);we.bindFramebuffer(U.READ_FRAMEBUFFER,R),we.bindFramebuffer(U.DRAW_FRAMEBUFFER,I);for(let Hn=0;Hn<De;Hn++)bi?U.framebufferTextureLayer(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,_t.__webglTexture,H,ut+Hn):U.framebufferTexture2D(U.READ_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,_t.__webglTexture,H),Yi?U.framebufferTextureLayer(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,en.__webglTexture,Te,Ht+Hn):U.framebufferTexture2D(U.DRAW_FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_2D,en.__webglTexture,Te),H!==0?U.blitFramebuffer(ke,tt,ke+Oe,tt+be,Be,dt,Be+Oe,dt+be,U.COLOR_BUFFER_BIT,U.NEAREST):Yi?U.copyTexSubImage3D(ze,Te,Be,dt,Ht+Hn,ke,tt,Oe,be):U.copyTexSubImage2D(ze,Te,Be,dt,ke,tt,Oe,be);we.bindFramebuffer(U.READ_FRAMEBUFFER,null),we.bindFramebuffer(U.DRAW_FRAMEBUFFER,null)}else Yi?S.isDataTexture||S.isData3DTexture?U.texSubImage3D(ze,Te,Be,dt,Ht,Oe,be,De,At,an,Lt.data):D.isCompressedArrayTexture?U.compressedTexSubImage3D(ze,Te,Be,dt,Ht,Oe,be,De,At,Lt.data):U.texSubImage3D(ze,Te,Be,dt,Ht,Oe,be,De,At,an,Lt):S.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,Te,Be,dt,Oe,be,At,an,Lt.data):S.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,Te,Be,dt,Lt.width,Lt.height,At,Lt.data):U.texSubImage2D(U.TEXTURE_2D,Te,Be,dt,Oe,be,At,an,Lt);we.pixelStorei(U.UNPACK_ROW_LENGTH,pn),we.pixelStorei(U.UNPACK_IMAGE_HEIGHT,St),we.pixelStorei(U.UNPACK_SKIP_PIXELS,qi),we.pixelStorei(U.UNPACK_SKIP_ROWS,on),we.pixelStorei(U.UNPACK_SKIP_IMAGES,wr),Te===0&&D.generateMipmaps===!0&&D.mipmapsAutoUpdate===!0&&U.generateMipmap(ze),we.unbindTexture()},this.initRenderTarget=function(S){Ye.get(S).__webglFramebuffer===void 0&&Ze.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?Ze.setTextureCube(S,0):S.isData3DTexture?Ze.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?Ze.setTexture2DArray(S,0):Ze.setTexture2D(S,0),we.unbindTexture()},this.resetState=function(){V=0,B=0,se=null,we.reset(),xe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Jn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=pt._getDrawingBufferColorSpace(e),t.unpackColorSpace=pt._getUnpackColorSpace()}}const He=Math.PI*2,bt=(i,e,t)=>Math.max(e,Math.min(t,i)),gi=(i,e,t)=>i+(e-i)*t,Kh=(i,e,t,n)=>gi(i,e,1-Math.exp(-t*n)),Fg=(i,e,t)=>bt((t-i)/(e-i),0,1),Ci=(i,e,t)=>{const n=Fg(i,e,t);return n*n*(3-2*n)},Qi=(i=0,e=1)=>i+Math.random()*(e-i),Zh=(i,e,t,n)=>Math.hypot(i-t,e-n),Jh=i=>{for(;i>Math.PI;)i-=He;for(;i<-Math.PI;)i+=He;return i},Og=(i,e,t)=>i+Jh(e-i)*t,qn=(i,e,t,n)=>Og(i,e,1-Math.exp(-t*n));function Bg(i){let e=2166136261;for(let t=0;t<i.length;t++)e^=i.charCodeAt(t),e=Math.imul(e,16777619);return e>>>0}function zg(i){let e=i>>>0;return function(){e|=0,e=e+1831565813|0;let t=Math.imul(e^e>>>15,1|e);return t=t+Math.imul(t^t>>>7,61|t)^t,((t^t>>>14)>>>0)/4294967296}}function qt(i){const e=zg(i);return{next:e,range:(t,n)=>t+e()*(n-t),int:(t,n)=>Math.floor(t+e()*(n-t+1)),pick:t=>t[Math.floor(e()*t.length)%t.length],chance:t=>e()<t}}function Qr(i,e,t){let n=Math.imul(i|0,374761393)+Math.imul(e|0,668265263)+Math.imul(t|0,1442695041);return n=Math.imul(n^n>>>13,1274126177),((n^n>>>16)>>>0)/4294967296}function kg(i,e,t=0){const n=Math.floor(i),s=Math.floor(e),r=i-n,a=e-s,o=r*r*(3-2*r),l=a*a*(3-2*a),c=Qr(n,s,t),u=Qr(n+1,s,t),h=Qr(n,s+1,t),d=Qr(n+1,s+1,t);return gi(gi(c,u,o),gi(h,d,o),l)}function jr(i,e,t=0,n=4){let s=0,r=.5,a=1,o=0;for(let l=0;l<n;l++)s+=kg(i*a,e*a,t+l*1013)*r,o+=r,r*=.5,a*=2.03;return s/o}function Gg(i){const e=(i%1+1)%1*24*60,t=Math.floor(e/60)%24,n=Math.floor(e%60);return`${String(t).padStart(2,"0")}:${String(n).padStart(2,"0")}`}function Ia(i){const e=(i%1+1)%1;return e<.21||e>=.88?{id:"night",label:"Night",icon:"moon"}:e<.31?{id:"dawn",label:"Dawn",icon:"dusk"}:e<.68?{id:"day",label:"Day",icon:"sun"}:e<.8?{id:"dusk",label:"Dusk",icon:"dusk"}:{id:"night",label:"Night",icon:"moon"}}function Hg(i){const e=Math.max(0,Math.floor(i));return`${Math.floor(e/60)}:${String(e%60).padStart(2,"0")}`}function Ts(i){return Math.sin(i*.033)*7.5+Math.sin(i*.011+1.7)*4.5}const ei=new Ue;new Ue;new Ue;const uo=new F,Vg=new F;function Wg(i="rgba(255,255,255,1)",e="rgba(255,255,255,0)"){const t=document.createElement("canvas");t.width=64,t.height=64;const n=t.getContext("2d"),s=n.createRadialGradient(32,32,0,32,32,32);s.addColorStop(0,i),s.addColorStop(.3,i),s.addColorStop(1,e),n.fillStyle=s,n.fillRect(0,0,64,64);const r=new wa(t);return r.colorSpace=tn,r}function Xg(){const i=document.createElement("canvas");i.width=16,i.height=64;const e=i.getContext("2d"),t=e.createLinearGradient(0,0,0,64);t.addColorStop(0,"rgba(210,235,255,0)"),t.addColorStop(.45,"rgba(210,235,255,.85)"),t.addColorStop(1,"rgba(210,235,255,0)"),e.fillStyle=t,e.fillRect(5,0,6,64);const n=new wa(i);return n.colorSpace=tn,n}function qg(i,e){const t=i.biome,n=512,s=document.createElement("canvas");s.width=n,s.height=n;const r=s.getContext("2d"),a=qt(i.seed^2654435769),o=new Ue(t.ground),l=new Ue(t.ground2);r.fillStyle=`#${o.getHexString()}`,r.fillRect(0,0,n,n);for(let m=0;m<5200;m++){const _=a.range(0,n),v=a.range(0,n),f=a.range(.6,4.2),p=a.next();ei.copy(o).lerp(l,p*.8),r.globalAlpha=a.range(.06,.28),r.fillStyle=`#${ei.getHexString()}`,r.beginPath(),r.ellipse(_,v,f,f*a.range(.4,1.1),a.range(0,He),0,He),r.fill()}r.globalAlpha=1;const c=m=>(m+120)/240*n,u=m=>(m+120)/240*n,h=(m,_,v,f=0)=>{r.beginPath();for(let p=-122;p<=122;p+=3){const x=Ts(p)+f+Math.sin(p*.09)*.5,E=c(x),b=u(p);p===-122?r.moveTo(E,b):r.lineTo(E,b)}r.strokeStyle=_,r.globalAlpha=v,r.lineWidth=m,r.lineCap="round",r.stroke(),r.globalAlpha=1};h(24,"#2e2a1c",.28,2),h(19,`#${new Ue(t.path).getHexString()}`,.78),h(8,`#${new Ue(t.path).offsetHSL(.02,-.04,.08).getHexString()}`,.5,-1.5);for(let m=0;m<500;m++){const _=a.range(-118,118),v=Ts(_)+a.range(-7,7);r.globalAlpha=a.range(.1,.35),r.fillStyle=a.chance(.5)?"#211f16":"#a4916d",r.beginPath(),r.ellipse(c(v),u(_),a.range(1,3.5),a.range(.8,2.2),a.range(0,He),0,He),r.fill()}if(r.globalAlpha=1,e){const m=c(e.x),_=u(e.z),v=e.r/240*n,f=r.createRadialGradient(m,_,v*.2,m,_,v*1.2);f.addColorStop(0,"rgba(20,42,38,.65)"),f.addColorStop(.7,"rgba(52,57,38,.35)"),f.addColorStop(1,"rgba(40,44,30,0)"),r.fillStyle=f,r.beginPath(),r.arc(m,_,v*1.3,0,He),r.fill()}for(let m=0;m<2600;m++){const _=a.range(0,n),v=a.range(0,n);r.globalAlpha=a.range(.12,.4),r.strokeStyle=a.chance(.7)?`#${new Ue(t.grass).offsetHSL(0,0,a.range(-.08,.1)).getHexString()}`:`#${new Ue(t.flower[0]).getHexString()}`,r.lineWidth=a.range(.5,1.4),r.beginPath(),r.moveTo(_,v),r.lineTo(_+a.range(-2.2,2.2),v-a.range(1.5,5)),r.stroke()}r.globalAlpha=1;const d=new wa(s);return d.colorSpace=tn,d.wrapS=Kn,d.wrapT=Kn,d.anisotropy=4,d}function Yg(i,e,t={}){const n=t.quality||"auto",s=!!t.isMobile,r=n==="low"||n==="auto"&&s,a=e.biome,o=e.seed,l=new lt;l.name="world",i.add(l);const c=[],u=G=>(c.push(G),G),h=a.water?{x:a.waterPos?.[0]??24,z:a.waterPos?.[1]??-26,r:a.waterRadius??10,level:-.42}:null,d=(G,q)=>{let he=jr(G*.013+61,q*.013-27,o)*4.2+jr(G*.051,q*.051,o+91)*.9-2.45;const le=Math.hypot(G,q);if(he*=Ci(5,22,le),h){const J=Math.hypot(G-h.x,q-h.z);if(J<h.r*1.5){const ue=1-Ci(h.r*.45,h.r*1.5,J);he=gi(he,h.level-.55,ue*.94)}}return he},m={topColor:{value:new Ue(a.skyTopDay)},horizonColor:{value:new Ue(a.skyHorizonDay)},bottomColor:{value:new Ue(a.skyHorizonDay)},sunDir:{value:new F(.4,.7,.3).normalize()},moonDir:{value:new F(-.4,-.7,-.3).normalize()},sunColor:{value:new Ue(16767392)},moonColor:{value:new Ue(12572159)},sunIntensity:{value:1},moonIntensity:{value:0},glowColor:{value:new Ue(a.sunset)}},_=u(new Bi(320,32,20)),v=u(new Vi({uniforms:m,side:_n,depthWrite:!1,fog:!1,vertexShader:`
        varying vec3 vDir;
        void main() {
          vDir = normalize(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        varying vec3 vDir;
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        uniform vec3 sunDir;
        uniform vec3 moonDir;
        uniform vec3 sunColor;
        uniform vec3 moonColor;
        uniform vec3 glowColor;
        uniform float sunIntensity;
        uniform float moonIntensity;
        void main() {
          vec3 dir = normalize(vDir);
          float h = dir.y;
          vec3 col = mix(horizonColor, topColor, pow(clamp(h, 0.0, 1.0), 0.58));
          col = mix(col, bottomColor, smoothstep(0.0, -0.3, h));
          float sunDot = max(dot(dir, normalize(sunDir)), 0.0);
          float sunDisc = smoothstep(0.9993, 0.9997, sunDot);
          float sunGlow = pow(sunDot, 12.0);
          col += sunColor * sunDisc * 2.8 * sunIntensity;
          col += glowColor * sunGlow * 0.34 * sunIntensity;
          float moonDot = max(dot(dir, normalize(moonDir)), 0.0);
          float moonDisc = smoothstep(0.99955, 0.99985, moonDot);
          float moonGlow = pow(moonDot, 90.0);
          col += moonColor * moonDisc * 1.9 * moonIntensity;
          col += moonColor * moonGlow * 0.18 * moonIntensity;
          gl_FragColor = vec4(col, 1.0);
        }
      `})),f=new Ot(_,v);f.renderOrder=-10,f.frustumCulled=!1,l.add(f);const p=r?380:760,x=new Float32Array(p*3),E=qt(o^11256099);for(let G=0;G<p;G++){const q=E.range(0,He),he=E.range(.02,1),le=Math.sqrt(1-he*he),J=300;x[G*3]=Math.cos(q)*le*J,x[G*3+1]=he*J,x[G*3+2]=Math.sin(q)*le*J}const b=u(new Wt);b.setAttribute("position",new En(x,3));const w=u(new Li({color:14543359,size:1.5,sizeAttenuation:!1,transparent:!0,opacity:0,depthWrite:!1,fog:!1})),T=new js(b,w);T.renderOrder=-9,T.frustumCulled=!1,l.add(T);const g=new Fd(12572927,3425324,1);l.add(g);const y=new mc(16773584,2.2);y.castShadow=!0,y.shadow.mapSize.set(r?1024:2048,r?1024:2048),y.shadow.camera.near=1,y.shadow.camera.far=120,y.shadow.camera.left=-32,y.shadow.camera.right=32,y.shadow.camera.top=32,y.shadow.camera.bottom=-32,y.shadow.bias=-4e-4,y.shadow.normalBias=.035,y.shadow.radius=2,l.add(y),l.add(y.target);const P=new mc(10467583,0);l.add(P),l.add(P.target);const C=r?84:132,N=u(new is(240,240,C,C));N.rotateX(-Math.PI/2);const O=N.attributes.position,W=new Float32Array(O.count*3);for(let G=0;G<O.count;G++){const q=O.getX(G),he=O.getZ(G),le=d(q,he);O.setY(G,le);const J=jr(q*.07+7,he*.07-3,o+33,3),ue=jr(q*.22,he*.22,o+55,2);let de=.82+(.5-J)*.4+(ue-.5)*.14;a.id==="snow"&&(de+=.08),de=bt(de,.56,1.08),W[G*3]=de,W[G*3+1]=de,W[G*3+2]=de}N.setAttribute("color",new En(W,3)),N.computeVertexNormals();const R=u(qg(e,h)),I=u(new Bn({map:R,vertexColors:!0,roughness:.97,metalness:0})),V=new Ot(N,I);if(V.receiveShadow=!0,l.add(V),h){const G=u(new Ra(h.r,48)),q=u(new Bn({color:a.id==="fen"?2378332:2842458,transparent:!0,opacity:.78,roughness:.16,metalness:.35,emissive:a.id==="fen"?729648:533535,emissiveIntensity:.6,depthWrite:!1})),he=new Ot(G,q);he.rotation.x=-Math.PI/2,he.position.set(h.x,h.level,h.z),l.add(he);const le=u(new Ca(h.r*.94,h.r*1.08,48)),J=u(new Bn({color:a.ground2,roughness:1,transparent:!0,opacity:.65})),ue=new Ot(le,J);ue.rotation.x=-Math.PI/2,ue.position.set(h.x,h.level+.02,h.z),l.add(ue)}const B=new Map,se=new Yt,Y=[],j=[],ie=u(new Oi(.72,1,1,6,1)),Le=u(new Os(1,1,7,1)),Fe=u(new Bi(1,7,5)),$=u(new Oi(.28,.52,1,5)),Se=u(new El(1,0)),Ne=u(new Os(.09,1,3)),We=u(new Bi(1,5,4)),Re=u(new Oi(.028,.06,1,3)),qe=u(new Bn({color:16777215,roughness:.96,flatShading:!0})),xt=u(new Bn({color:16777215,roughness:.9,flatShading:!0})),Ke=u(new Bn({color:16777215,roughness:.94,flatShading:!0})),vt=u(new Bn({color:16777215,roughness:1,flatShading:!0,side:Pn})),Et=u(new Bn({color:16777215,roughness:.7,emissive:1380360,emissiveIntensity:.2})),ct=(G,q,he,le=!0,J=!0)=>{let ue=B.get(G);return ue||(ue={geo:q,mat:he,items:[],castShadow:le,receiveShadow:J},B.set(G,ue)),ue},it=(G,q,he,le,J,ue,de,ye,re,Ee,Xe,Ce,Je,Gn=!0)=>{const oi=ct(G,q,he,Gn);se.position.set(le,J,ue),se.rotation.set(Ee,Xe,Ce),se.scale.set(de,ye,re),se.updateMatrix(),oi.items.push({m:se.matrix.clone(),color:Je?new Ue(Je):null})},zt=(G,q,he,le,J,ue,de,ye)=>{const re=uo.set(0,1,0).applyEuler(new xi(J,0,ue)),Ee=Vg.set(G,q,he).addScaledVector(re,le/2);it("branch",$,qe,Ee.x,Ee.y,Ee.z,de,le,de,J,0,ue,ye,!0)},rn=G=>G.pick(a.foliage),Mt=(G,q=.06)=>(ei.set(rn(G)).offsetHSL(G.range(-.012,.012),G.range(-.05,.05),G.range(-q,q)),ei.getHex());function vn(G,q,he,le,J,ue=!1){const de=(4.6+J.range(0,2.6))*le,ye=.25*le;it("trunk",ie,qe,G,he+de/2,q,ye,de,ye,0,J.range(0,He),0,a.trunk);const re=3+(J.chance(.5)?1:0);for(let Ee=0;Ee<re;Ee++){const Xe=Ee/Math.max(1,re-1),Ce=he+de*(.36+Xe*.56),Je=(1.85-Xe*1.2)*le,Gn=(2-Xe*.6)*le,oi=Mt(J);it("leaf",Le,xt,G,Ce,q,Je,Gn,Je,0,J.range(0,He),0,oi),ue&&Ee>0&&it("snow",Le,xt,G,Ce+Gn*.27,q,Je*.78,Gn*.55,Je*.78,0,J.range(0,He),0,15266548)}j.push({x:G,z:q,r:Math.max(.34,ye*1.2),y:he})}function Gt(G,q,he,le,J){const ue=(5.2+J.range(0,2))*le,de=.15*le;it("trunk",ie,qe,G,he+ue/2,q,de,ue,de,0,J.range(0,He),0,a.trunk);for(let ye=0;ye<3;ye++){const re=he+ue*(.64+ye*.1),Ee=(1.5-ye*.25)*le;it("leaf",Fe,xt,G+J.range(-.7,.7)*le,re,q+J.range(-.7,.7)*le,Ee,Ee*1.15,Ee,0,J.range(0,He),0,Mt(J,.07))}j.push({x:G,z:q,r:Math.max(.28,de*1.3),y:he})}function fn(G,q,he,le,J,ue=!1){const de=(4+J.range(0,1.8))*le,ye=.3*le;it("trunk",ie,qe,G,he+de/2,q,ye,de,ye,0,J.range(0,He),0,a.trunk);for(let re=0;re<4;re++){const Ee=re/4*He+J.range(-.3,.3),Xe=J.range(.2,1.15)*le,Ce=he+de*J.range(.78,1.05),Je=J.range(1.3,2.2)*le;it("leaf",Fe,xt,G+Math.cos(Ee)*Xe,Ce,q+Math.sin(Ee)*Xe,Je,Je*J.range(.72,1.05),Je,0,J.range(0,He),0,Mt(J,.08))}if(ue&&J.chance(.55)){const re=G+J.range(-1.2,1.2),Ee=q+J.range(-1.2,1.2);Ct(re,Ee,d(re,Ee),J)}j.push({x:G,z:q,r:Math.max(.4,ye*1.2),y:he})}function Mn(G,q,he,le,J){const ue=(4.2+J.range(0,1.6))*le,de=.34*le;it("trunk",ie,qe,G,he+ue/2,q,de,ue,de,0,J.range(0,He),0,a.trunk);for(let ye=0;ye<4;ye++){const re=ye/4*He+J.range(-.4,.4),Ee=J.range(.3,1.1)*le,Xe=he+ue*J.range(.8,1.02),Ce=J.range(1.5,2.2)*le,Je=Mt(J,.06);it("leaf",Fe,xt,G+Math.cos(re)*Ee,Xe,q+Math.sin(re)*Ee,Ce,Ce*.62,Ce,0,J.range(0,He),0,Je),it("leaf",Le,xt,G+Math.cos(re)*Ee*1.2,Xe-Ce*.85,q+Math.sin(re)*Ee*1.2,Ce*.32,Ce*1.5,Ce*.32,Math.PI,0,0,Je)}j.push({x:G,z:q,r:Math.max(.45,de*1.2),y:he})}function Sn(G,q,he,le,J){const ue=(12+J.range(0,5))*le,de=1.05*le;it("trunk",ie,qe,G,he+ue/2,q,de,ue,de,0,J.range(0,He),0,a.trunk);for(let ye=0;ye<4;ye++){const re=ye/4*He+J.range(-.5,.5),Ee=J.range(.5,2.2)*le,Xe=he+ue*J.range(.86,1.04),Ce=J.range(2.8,4.2)*le;it("leaf",Fe,xt,G+Math.cos(re)*Ee,Xe,q+Math.sin(re)*Ee,Ce,Ce*.8,Ce,0,J.range(0,He),0,Mt(J,.05))}j.push({x:G,z:q,r:Math.max(1,de*1.18),y:he})}function U(G,q,he,le,J){const ue=3+J.int(0,3);for(let de=0;de<ue;de++){const ye=J.range(-1.1,1.1)*le,re=J.range(-1.1,1.1)*le,Ee=(6+J.range(0,3.5))*le,Xe=J.range(.055,.1)*le,Ce=J.range(-.1,.1);it("trunk",ie,qe,G+ye,he+Ee/2,q+re,Xe,Ee,Xe,Ce,0,Ce*.6,a.trunk);for(let Je=0;Je<3;Je++){const Gn=he+Ee*(.62+Je*.13),oi=J.range(.45,.9)*le;it("leaf",Le,xt,G+ye+J.range(-.4,.4),Gn,q+re+J.range(-.4,.4),oi,oi*.7,oi,J.range(-.5,.5),J.range(0,He),J.range(-.5,.5),Mt(J,.06))}}j.push({x:G,z:q,r:.55*le,y:he})}function yn(G,q,he,le,J){const ue=(4.4+J.range(0,2.4))*le,de=.28*le;it("trunk",ie,qe,G,he+ue/2,q,de,ue,de,0,J.range(0,He),0,a.trunk);const ye=3+J.int(0,3);for(let re=0;re<ye;re++){const Ee=ue*J.range(.45,.92),Xe=J.range(0,He),Ce=J.range(1.4,3.2)*le;zt(G,he+Ee,q,Ce,J.range(.5,1),Math.cos(Xe)*J.range(.5,1),.09*le,a.trunk)}j.push({x:G,z:q,r:Math.max(.32,de*1.2),y:he})}function Ct(G,q,he,le){const J=u(new Bn({color:10485712,emissive:4646562,emissiveIntensity:1.5,roughness:.4})),ue=new Ot(u(new Oi(.04,.06,.3,5)),u(new Bn({color:14218719,roughness:.8})));ue.position.set(G,he+.15,q),l.add(ue);const de=new Ot(u(new Bi(le.range(.12,.24),7,5,0,He,0,Math.PI/2)),J);de.position.set(G,he+.3,q),de.scale.y=.65,l.add(de)}function Pt(){const G=Math.round(178*a.density*(r?.58:1)),q=qt(o^1374496523);let he=0,le=0;for(;le<G&&he<G*20;){he++;const ue=q.range(0,He),de=Math.sqrt(q.next())*96+10,ye=Math.cos(ue)*de,re=Math.sin(ue)*de;if(Math.abs(ye-Ts(re))<3.1||h&&Math.hypot(ye-h.x,re-h.z)<h.r+3.4||Math.hypot(ye,re)<10.5)continue;let Ee=!1;for(const Je of Y)if(Math.hypot(Je.x-ye,Je.z-re)<(Je.big?4.4:2.25)){Ee=!0;break}if(Ee)continue;Y.push({x:ye,z:re,big:a.tree==="redwood"}),le++;const Xe=d(ye,re),Ce=q.range(.82,1.3);switch(a.tree){case"pine":vn(ye,re,Xe,Ce,q);break;case"pineSnow":vn(ye,re,Xe,Ce,q,!0);break;case"birch":Gt(ye,re,Xe,Ce,q);break;case"broad":fn(ye,re,Xe,Ce,q);break;case"broadGlow":fn(ye,re,Xe,Ce,q,!0);break;case"willow":Mn(ye,re,Xe,Ce,q);break;case"redwood":Sn(ye,re,Xe,Ce,q);break;case"bamboo":U(ye,re,Xe,Ce,q);break;case"dead":yn(ye,re,Xe,Ce,q);break;default:vn(ye,re,Xe,Ce,q)}}const J=qt(o^7840195);for(let ue=0;ue<54;ue++){const de=ue/54*He+J.range(-.04,.04),ye=103+J.range(0,8),re=Math.cos(de)*ye,Ee=Math.sin(de)*ye,Xe=d(re,Ee);if(J.range(1.1,1.9),a.tree==="redwood"||a.tree==="pine"||a.tree==="pineSnow"){const Ce=J.range(8,15);it("edge",Le,xt,re,Xe+Ce/2,Ee,J.range(2.4,4.2),Ce,J.range(2.4,4.2),0,J.range(0,He),0,859155)}else{const Ce=J.range(7,13);it("edge",Fe,xt,re,Xe+Ce*.62,Ee,J.range(2.8,4.8),Ce*.5,J.range(2.8,4.8),0,J.range(0,He),0,793105)}}}function we(){const G=qt(o^3119633),q=Math.round(90*a.density*(r?.6:1));for(let ue=0;ue<q;ue++){const de=G.range(0,He),ye=Math.sqrt(G.next())*94+8,re=Math.cos(de)*ye,Ee=Math.sin(de)*ye;if(h&&Math.hypot(re-h.x,Ee-h.z)<h.r+1)continue;const Xe=d(re,Ee),Ce=G.range(.35,1.15);it("bush",Fe,xt,re,Xe+Ce*.55,Ee,Ce*1.2,Ce*.9,Ce*1.2,0,G.range(0,He),0,Mt(G,.1),!1)}const he=Math.round(38*(r?.65:1));for(let ue=0;ue<he;ue++){const de=G.range(0,He),ye=Math.sqrt(G.next())*92+9,re=Math.cos(de)*ye,Ee=Math.sin(de)*ye;if(Math.abs(re-Ts(Ee))<2.4||h&&Math.hypot(re-h.x,Ee-h.z)<h.r+.5)continue;const Xe=d(re,Ee),Ce=G.range(.3,1.15);it("rock",Se,Ke,re,Xe+Ce*.48,Ee,Ce,Ce*G.range(.5,.9),Ce,G.range(0,.4),G.range(0,He),G.range(0,.4),a.rock,!0),Ce>.78&&j.push({x:re,z:Ee,r:Ce*.8,y:Xe})}const le=Math.round(620*a.density*(r?.45:1));for(let ue=0;ue<le;ue++){const de=G.range(0,He),ye=Math.sqrt(G.next())*98+4,re=Math.cos(de)*ye,Ee=Math.sin(de)*ye;if(Math.abs(re-Ts(Ee))<1.2||h&&Math.hypot(re-h.x,Ee-h.z)<h.r*.92)continue;const Xe=d(re,Ee),Ce=G.range(.25,.95);ei.set(a.grass).offsetHSL(G.range(-.02,.02),G.range(-.05,.08),G.range(-.06,.12)),it("grass",Ne,vt,re,Xe+Ce/2,Ee,G.range(.6,1.5),Ce,G.range(.6,1.5),G.range(-.18,.18),G.range(0,He),G.range(-.18,.18),ei.getHex(),!1)}const J=Math.round(120*(r?.6:1));for(let ue=0;ue<J;ue++){const de=G.range(0,He),ye=Math.sqrt(G.next())*88+6,re=Math.cos(de)*ye,Ee=Math.sin(de)*ye;if(Math.abs(re-Ts(Ee))<1.6||h&&Math.hypot(re-h.x,Ee-h.z)<h.r)continue;const Xe=d(re,Ee),Ce=G.range(.06,.13);it("flower",We,Et,re,Xe+G.range(.18,.5),Ee,Ce,Ce,Ce,0,0,0,G.pick(a.flower),!1)}for(let ue=0;ue<6;ue++){const de=G.range(0,He),ye=G.range(16,78),re=Math.cos(de)*ye,Ee=Math.sin(de)*ye;if(h&&Math.hypot(re-h.x,Ee-h.z)<h.r+2)continue;const Xe=d(re,Ee),Ce=G.range(2.5,5.2),Je=G.range(.25,.45),Gn=G.range(0,He);it("log",ie,qe,re,Xe+Je,Ee,Je,Ce,Je,Math.PI/2,0,Gn,a.trunk,!0),j.push({x:re,z:Ee,r:Je*1.1,y:Xe})}if(h)for(let ue=0;ue<46;ue++){const de=G.range(0,He),ye=h.r*G.range(.82,1.1),re=h.x+Math.cos(de)*ye,Ee=h.z+Math.sin(de)*ye,Xe=G.range(.9,2.3);ei.set(7506509).offsetHSL(G.range(-.02,.02),0,G.range(-.06,.1)),it("reed",Re,vt,re,h.level+Xe/2,Ee,G.range(.6,1.3),Xe,G.range(.6,1.3),G.range(-.1,.1),G.range(0,He),G.range(-.1,.1),ei.getHex(),!1),G.chance(.25)&&it("reed",We,Et,re,h.level+Xe+.08,Ee,.09,.2,.09,0,0,0,7227947,!1)}}Pt(),we();for(const[G,q]of B){const he=new Ad(q.geo,q.mat,q.items.length);for(let le=0;le<q.items.length;le++)he.setMatrixAt(le,q.items[le].m),q.items[le].color&&he.setColorAt(le,q.items[le].color);he.instanceMatrix.needsUpdate=!0,he.instanceColor&&(he.instanceColor.needsUpdate=!0),he.castShadow=q.castShadow&&G!=="grass"&&G!=="flower"&&G!=="bush",he.receiveShadow=q.receiveShadow,he.computeBoundingSphere(),l.add(he),u(he)}const It=u(Wg()),Ye=u(Xg());let Ze=null;const A=e.weather,M=r?260:520;if(A==="rain"||A==="snow"||A==="leaves"){const G=A==="leaves"?r?90:170:M,q=new Float32Array(G*3),he=new Float32Array(G),le=new Float32Array(G),J=qt(o^8974618);for(let re=0;re<G;re++)q[re*3]=J.range(-34,34),q[re*3+1]=J.range(0,26),q[re*3+2]=J.range(-34,34),he[re]=J.range(0,He),le[re]=J.range(.7,1.35);const ue=u(new Wt);ue.setAttribute("position",new En(q,3));let de;A==="rain"?de=u(new Li({map:Ye,color:13624302,size:.55,transparent:!0,opacity:.55,depthWrite:!1,sizeAttenuation:!0,blending:ki})):A==="snow"?de=u(new Li({map:It,color:16055295,size:.24,transparent:!0,opacity:.9,depthWrite:!1,sizeAttenuation:!0})):de=u(new Li({map:It,color:14852682,size:.26,transparent:!0,opacity:.85,depthWrite:!1,sizeAttenuation:!0}));const ye=new js(ue,de);ye.frustumCulled=!1,l.add(ye),Ze={type:A,points:ye,positions:q,phases:he,speeds:le,count:G,update(re,Ee){const Xe=ue.attributes.position;for(let Ce=0;Ce<G;Ce++){const Je=Ce*3;A==="rain"?(q[Je+1]-=re*(18+le[Ce]*8),q[Je]-=re*1.6):A==="snow"?(q[Je+1]-=re*(1.4+le[Ce]*.9),q[Je]+=Math.sin(he[Ce]+performance.now()*6e-4)*re*.8,q[Je+2]+=Math.cos(he[Ce]+performance.now()*4e-4)*re*.5):(q[Je+1]-=re*(.55+le[Ce]*.45),q[Je]+=Math.sin(he[Ce]+performance.now()*8e-4)*re*1.3,q[Je+2]+=Math.cos(he[Ce]+performance.now()*7e-4)*re*1),q[Je+1]<-1&&(q[Je+1]=26,q[Je]=((q[Je]+34)%68+68)%68-34,q[Je+2]=((q[Je+2]+34)%68+68)%68-34),Xe.array[Je]=q[Je],Xe.array[Je+1]=q[Je+1],Xe.array[Je+2]=q[Je+2]}Xe.needsUpdate=!0,ye.position.set(Ee.x,0,Ee.z)}}}let z=null;if(a.fireflies){const G=r?46:92,q=new Float32Array(G*3),he=new Float32Array(G),le=qt(o^15826449);for(let ye=0;ye<G;ye++){const re=le.range(0,He),Ee=Math.sqrt(le.next())*88+6;q[ye*3]=Math.cos(re)*Ee,q[ye*3+1]=le.range(.5,4.2),q[ye*3+2]=Math.sin(re)*Ee,he[ye]=le.range(0,He)}const J=u(new Wt);J.setAttribute("position",new En(q,3));const ue=u(new Li({map:It,color:10485696,size:.34,transparent:!0,opacity:0,depthWrite:!1,blending:ki,sizeAttenuation:!0})),de=new js(J,ue);de.frustumCulled=!1,l.add(de),z={points:de,mat:ue,positions:q,phases:he,count:G,geo:J}}const ae=r?70:140,te=new Float32Array(ae*3),me=new Float32Array(ae),_e=qt(o^1157666);for(let G=0;G<ae;G++)te[G*3]=_e.range(-40,40),te[G*3+1]=_e.range(.4,8),te[G*3+2]=_e.range(-40,40),me[G]=_e.range(0,He);const Q=u(new Wt);Q.setAttribute("position",new En(te,3));const ee=u(new Li({map:It,color:16770472,size:.14,transparent:!0,opacity:.35,depthWrite:!1,blending:ki,sizeAttenuation:!0})),ge=new js(Q,ee);ge.frustumCulled=!1,l.add(ge);const L=new Ue(a.skyTopDay),ne=new Ue(a.skyHorizonDay),Z=new Ue(a.skyTopNight),ve=new Ue(a.skyHorizonNight),fe=new Ue(a.sunset),xe=new Ue(a.fogDay),Ge=new Ue(a.fogNight),at=new Ue(16774103),ce=new Ue(a.sunset),Ve=new Ue,Qe=new Ue,Ae=new Ue,ht=new F,Nt=new F,Fn=new F;i.fog=new Sl(a.fogDay,.013);let yi=0,Xi=e.startTime;const Tr={group:l,terrain:V,heightAt:d,colliders:j,treePoints:Y,pond:h,sun:y,moon:P,hemi:g,sky:f,stars:T,get nightAmount(){return yi},get time(){return Xi},setTime(G,q=uo.set(0,0,0)){Xi=(G%1+1)%1;const he=(Xi-.25)*He,le=Math.sin(he);ht.set(Math.cos(he)*.82,le,.42).normalize(),Nt.copy(ht).multiplyScalar(-1);const J=Ci(-.13,.18,le),ue=bt(1-Math.abs(le)/.28,0,1);yi=1-J,Ve.copy(Z).lerp(L,J),Qe.copy(ve).lerp(ne,J),Qe.lerp(fe,ue*.6),Ae.copy(Ge).lerp(xe,J),Ae.lerp(fe,ue*.22),m.topColor.value.copy(Ve),m.horizonColor.value.copy(Qe),m.bottomColor.value.copy(Qe).multiplyScalar(.55),m.sunDir.value.copy(ht),m.moonDir.value.copy(Nt),m.glowColor.value.copy(fe),m.sunIntensity.value=Ci(-.03,.24,le),m.moonIntensity.value=Ci(.08,-.24,le),ei.copy(ce).lerp(at,Ci(.04,.4,le)),y.color.copy(ei),y.intensity=Ci(-.03,.26,le)*2.6,P.intensity=Ci(.06,-.3,le)*.55,g.intensity=.32+J*1,g.color.copy(Qe).lerp(new Ue(12572927),.35),g.groundColor.setHex(a.ground2).lerp(new Ue(1712920),.4);let de=.0125;e.weather==="mist"&&(de=.021),e.weather==="fog"&&(de=.027),e.weather==="rain"&&(de=.018),e.weather==="snow"&&(de=.019),de+=yi*.003,i.fog.color.copy(Ae),i.fog.density=de,Fn.set(q.x,q.y+1,q.z),y.position.set(q.x+ht.x*62,q.y+ht.y*62+12,q.z+ht.z*62),y.target.position.copy(Fn),y.target.updateMatrixWorld(),P.position.set(q.x+Nt.x*50,q.y+Math.abs(Nt.y)*50+10,q.z+Nt.z*50),P.target.position.copy(Fn),P.target.updateMatrixWorld(),w.opacity=Math.pow(yi,1.4)*.9,ee.opacity=J*.32,z&&(z.mat.opacity=Math.pow(yi,1.2)*.95),Ze&&(Ze.points.visible=!0),f.position.set(q.x,0,q.z),T.position.set(q.x,0,q.z),ge.position.set(q.x,0,q.z)},update(G,q,he){Ze&&Ze.update(G,he),ge.position.set(he.x,0,he.z);const le=Q.attributes.position;for(let J=0;J<ae;J++){const ue=J*3;le.array[ue]=te[ue]+Math.sin(q*.23+me[J])*1.4,le.array[ue+1]=te[ue+1]+Math.sin(q*.31+me[J]*1.3)*.7,le.array[ue+2]=te[ue+2]+Math.cos(q*.19+me[J])*1.4}if(le.needsUpdate=!0,z){const J=z.geo.attributes.position;for(let ue=0;ue<z.count;ue++){const de=ue*3;J.array[de]=z.positions[de]+Math.sin(q*.45+z.phases[ue])*1.8,J.array[de+1]=z.positions[de+1]+Math.sin(q*.7+z.phases[ue]*1.7)*.5,J.array[de+2]=z.positions[de+2]+Math.cos(q*.38+z.phases[ue])*1.8}J.needsUpdate=!0}},dispose(){i.remove(l),i.fog=null;for(const G of c)G&&typeof G.dispose=="function"&&G.dispose();l.traverse(G=>{(G.isMesh||G.isPoints)&&(G.geometry?.dispose?.(),Array.isArray(G.material)?G.material.forEach(q=>q.dispose?.()):G.material?.dispose?.())})}};return Tr.setTime(e.startTime,uo.set(0,0,0)),Tr}const Qh={fur:1316636,furLight:2304048,mask:1015198,maskDark:676715,white:15329245,eye:16758579,eyeGlow:7027456,nose:592396,pink:14241658,metal:13095126,claw:14275522,tongue:14248568},Bc={fur:4868678,furLight:5986898,mask:3093558,maskDark:2237991,white:13617592,eye:16734773,eyeGlow:7017984,nose:723724,pink:9190731,metal:10133668,claw:13683128,tongue:12145506},zc=.42,kc=.56,Gc=.32,Hc=1;function bn(i){return new Bn({roughness:.86,metalness:.02,...i})}function st(i,e,t,n=[0,0,0],s=[0,0,0],r=[1,1,1]){const a=new Ot(e,t);return a.position.set(...n),a.rotation.set(...s),a.scale.set(...r),a.castShadow=!0,a.receiveShadow=!0,i.add(a),a}function jh(i={}){const e=i.palette||Qh,t=i.scale||1,n=i.harness!==!1,s=new lt;s.scale.setScalar(t);const r={fur:bn({color:e.fur,roughness:.94}),furLight:bn({color:e.furLight,roughness:.92}),mask:bn({color:e.mask,roughness:.54,metalness:.08}),maskDark:bn({color:e.maskDark,roughness:.6}),white:bn({color:e.white,roughness:.82}),eyeWhite:bn({color:16248793,roughness:.4}),iris:bn({color:e.eye,emissive:e.eyeGlow,emissiveIntensity:.45,roughness:.35}),pupil:bn({color:460810,roughness:.25}),nose:bn({color:e.nose,roughness:.3,metalness:.05}),pink:bn({color:e.pink,roughness:.6}),metal:bn({color:e.metal,roughness:.28,metalness:.85}),claw:bn({color:e.claw,roughness:.5}),tongue:bn({color:e.tongue,roughness:.55}),innerEar:bn({color:e.maskDark,roughness:.7})},a=[r.fur,r.furLight,r.mask,r.maskDark,r.white,r.eyeWhite],o=a.map(R=>({emissive:R.emissive.getHex(),intensity:R.emissiveIntensity})),l=new lt;l.position.y=.83,s.add(l);const c=(R,I,V=6,B=12)=>new Aa(R,I,V,B),u=(R,I=12,V=9)=>new Bi(R,I,V),h=(R,I,V=6)=>new Os(R,I,V),d=(R,I,V)=>new Vs(R,I,V),m=(R,I,V=8,B=18)=>new Pa(R,I,V,B);st(l,c(.32,.78,8,14),r.fur,[0,.02,0],[Math.PI/2,0,0]),st(l,u(.35,14,11),r.fur,[0,.04,.35],[0,0,0],[.98,1.02,.98]),st(l,u(.31,14,11),r.fur,[0,.02,-.4],[0,0,0],[1.02,.96,1]),st(l,u(.2,12,9),r.furLight,[0,-.09,.46],[0,0,0],[.78,.75,.55]);for(let R=0;R<5;R++){const I=.34-R*.18;st(l,h(.055,.16,5),r.fur,[0,.29-R*.005,I],[-.5,0,0],[1,1,1])}st(l,c(.17,.22,5,10),r.fur,[0,.21,.5],[1.15,0,0],[1,1,.95]);const _=new lt;_.position.set(0,.32,.72),_.rotation.x=.06,l.add(_),st(_,u(.27,14,11),r.fur,[0,.02,0],[0,0,0],[.94,1,1.03]),st(_,u(.15,10,8),r.fur,[0,-.11,.04],[0,0,0],[1.2,.9,.9]),st(_,u(.19,12,9),r.mask,[0,-.035,.2],[0,0,0],[1.12,.95,.92]),st(_,c(.12,.16,5,10),r.mask,[0,-.04,.28],[Math.PI/2,0,0],[1.06,1,1]),st(_,u(.105,10,8),r.mask,[0,-.04,.4],[0,0,0],[1.05,.9,.9]),st(_,u(.068,10,8),r.nose,[0,.035,.47],[0,0,0],[1.15,.82,.92]),st(_,u(.02,6,5),r.metal,[-.018,.06,.505],[0,0,0],[1,.5,.5]);const v=new lt;v.position.set(0,-.115,.19),_.add(v),st(v,c(.09,.14,5,9),r.maskDark,[0,-.01,.12],[Math.PI/2,0,0],[1.05,.8,1]),st(v,u(.065,8,6),r.maskDark,[0,-.01,.23],[0,0,0],[1.05,.62,.9]),st(v,d(.07,.018,.14),r.tongue,[0,.055,.13],[.08,0,0],[1,1,1]);for(let R=0;R<3;R++){const I=(R-1)*.052;st(v,h(.017,.055,4),r.white,[I,.045,.27],[0,0,0],[1,1,1])}for(let R=0;R<4;R++){const I=(R-1.5)*.045;st(_,h(.018,.065,4),r.white,[I,-.105,.36],[Math.PI,0,0],[1,1,1])}for(const R of[-1,1])st(_,u(.062,10,8),r.eyeWhite,[R*.145,.09,.19],[0,0,0],[1,1.08,.72]),st(_,u(.04,9,7),r.iris,[R*.155,.09,.238],[0,0,0],[1,1,.55]),st(_,u(.019,7,6),r.pupil,[R*.158,.09,.266],[0,0,0],[1,1.1,.5]),st(_,u(.008,6,5),r.white,[R*.168,.105,.278],[0,0,0],[1,1,1]),st(_,u(.115,9,6),r.white,[R*.145,.205,.185],[0,0,R*-.2],[1.05,.28,.55]),st(_,h(.06,.2,5),r.fur,[R*.235,-.035,.07],[.1,0,R*-1.35],[1,1,1]);const f=[];for(const R of[-1,1]){const I=new lt;I.position.set(R*.165,.245,-.02),I.rotation.set(-.12,0,R*.14),_.add(I),st(I,h(.1,.42,6),r.fur,[0,.19,0],[0,0,0],[1,1,.72]),st(I,h(.058,.3,5),r.innerEar,[0,.16,.028],[0,0,0],[1,1,.45]),f.push(I)}st(_,h(.055,.16,5),r.fur,[0,.27,.03],[-.4,0,0],[1,1,1]);const p={},x=(R,I,V,B)=>{const se=new lt;se.position.set(I,-.1,V),se.rotation.x=B?-.04:.06,l.add(se),st(se,c(B?.115:.14,B?.25:.24,4,9),r.fur,[0,-.17,0],[0,0,0],[1,1,.92]),B||st(se,u(.16,10,8),r.fur,[0,-.03,-.01],[0,0,0],[1,.85,1.1]);const j=new lt;j.position.y=-.37,se.add(j),st(j,c(.072,.25,4,8),r.fur,[0,-.15,.015],[0,0,0],[1,1,1]);const ie=new lt;ie.position.set(0,-.31,.02),j.add(ie),st(ie,c(.085,.12,4,8),r.fur,[0,-.015,.05],[Math.PI/2,0,0],[1,.9,.8]),st(ie,u(.085,8,6),r.fur,[0,-.025,.09],[0,0,0],[1.05,.55,1.1]);for(let Le=0;Le<3;Le++)st(ie,h(.018,.07,4),r.claw,[(Le-1)*.048,-.045,.17],[Math.PI/2.2,0,0],[1,1,1]);p[R]={hip:se,knee:j,paw:ie,baseHip:se.rotation.x}};x("FL",-.265,.42,!0),x("FR",.265,.42,!0),x("BL",-.275,-.43,!1),x("BR",.275,-.43,!1);const E=[];let b=l;for(let R=0;R<3;R++){const I=new lt;I.position.set(0,R===0?.12:0,R===0?-.63:-.27),I.rotation.x=R===0?-.55:-.12,b.add(I);const V=.085-R*.018;st(I,c(V,.24,4,8),R===2?r.mask:r.fur,[0,0,-.13],[Math.PI/2,0,0],[1,1,1]),E.push(I),b=I}if(n){st(l,m(.205,.035,8,20),r.pink,[0,.255,.49],[1.05,0,0],[1.05,.95,1]),st(l,m(.35,.03,8,22),r.furLight,[0,.02,.28],[0,0,0],[1.03,1.02,1]),st(l,d(.1,.025,.92),r.furLight,[0,.315,-.08],[0,0,0],[1,1,1]),st(l,d(.075,.02,.34),r.furLight,[0,.13,.61],[.35,0,0],[1,1,1]);for(let R=0;R<7;R++){const I=R/7*He;st(l,u(.025,6,5),r.metal,[Math.cos(I)*.35,.02+Math.sin(I)*.35,.28],[0,0,0],[1,1,1])}for(let R=0;R<4;R++)st(l,u(.022,6,5),r.metal,[0,.335,.26-R*.2],[0,0,0],[1,1,1]);st(l,m(.075,.016,6,14),r.metal,[0,-.22,.58],[.2,0,0],[1,1,1]),st(l,d(.045,.14,.045),r.metal,[0,-.12,.6],[0,0,0],[1,1,1]),st(l,c(.035,.08,4,8),r.metal,[0,-.26,.62],[Math.PI/2,0,0],[1,1,1])}let w=0,T=0,g=0,y=0,P=0,C=0;const N=.83,O=R=>{C=bt(R,0,1);for(let I=0;I<a.length;I++){const V=a[I];C>0?(V.emissive.setHex(6949380),V.emissiveIntensity=C*.8):(V.emissive.setHex(o[I].emissive),V.emissiveIntensity=o[I].intensity)}};return{root:s,body:l,head:_,jaw:v,ears:f,legs:p,tail:E,mats:r,get pawActive(){return T>0},get biteActive(){return g>0},get feeding(){return P>0},triggerPaw(){return T>0?!1:(T=zc,!0)},triggerBite(){return g>0?!1:(g=kc,!0)},triggerHurt(){y=Gc,O(1)},triggerFeed(){P<=0&&(P=Hc)},update(R,I,V={}){const B=bt(V.speed||0,0,1),se=!!V.sprint;w+=R*(1.8+B*(se?14.5:8.8));const j=(.1+B*.64)*(se?1.1:1);T=Math.max(0,T-R),g=Math.max(0,g-R),y=Math.max(0,y-R),P=Math.max(0,P-R);const ie=[["FL",0],["BR",0],["FR",Math.PI],["BL",Math.PI]];for(const[Fe,$]of ie){const Se=p[Fe],Ne=Math.sin(w+$),We=Math.cos(w+$);Se.hip.rotation.x=Se.baseHip+Ne*j,Se.knee.rotation.x=.16+Math.max(0,-We)*.62*B,Se.paw.rotation.x=-Se.hip.rotation.x*.55-Se.knee.rotation.x*.35}if(T>0){const Fe=1-T/zc,$=Math.sin(Fe*Math.PI);p.FR.hip.rotation.x=-.3-$*1.65,p.FR.hip.rotation.z=-$*.45,p.FR.knee.rotation.x=.2+$*.8,l.rotation.y=-$*.2,_.rotation.y=$*.18}else p.FR.hip.rotation.z=0,l.rotation.y=Math.sin(w)*.025*B;if(g>0){const Fe=1-g/kc,$=Math.sin(Math.min(1,Fe*1.4)*Math.PI);_.rotation.x=.06+$*.48,_.position.z=.72+$*.16,_.position.y=.32-$*.08,v.rotation.x=Math.sin(Fe*Math.PI*2.2)*.55+.08,l.rotation.x=$*.06}else _.rotation.x=.06+Math.sin(w*2)*.022*B,_.position.z=.72,_.position.y=.32,v.rotation.x=.05+Math.max(0,Math.sin(I*1.7))*.02,l.rotation.x=-.02*B;if(P>0){const Fe=1-P/Hc;_.rotation.x=.06+Math.sin(Fe*Math.PI)*.78,_.position.y=.32-Math.sin(Fe*Math.PI)*.12,v.rotation.x=.12+Math.abs(Math.sin(Fe*Math.PI*5))*.45}if(y>0){const Fe=y/Gc;l.rotation.z=Math.sin(I*46)*.12*Fe,O(Fe*.9)}else l.rotation.z=Math.sin(w)*.035*B,C>0&&O(Math.max(0,C-R*6));l.position.y=N+Math.abs(Math.sin(w))*.045*B+Math.sin(I*1.7)*.006,l.position.z=Math.sin(w*2)*.012*B,E[0].rotation.y=Math.sin(I*2.3+w*.25)*.22+Math.sin(I*5.2)*.03,E[1].rotation.y=Math.sin(I*2.8+.7)*.2,E[2].rotation.y=Math.sin(I*3.4+1.4)*.22,E[0].rotation.x=-.55+Math.sin(I*1.9)*.05-B*.12,E[1].rotation.x=-.12+Math.sin(I*2.1+.5)*.06;const Le=Math.sin(I*.9)*.02+Math.sin(I*4.7)*.012;f[0].rotation.z=.14+Le,f[1].rotation.z=-.14-Le,f[0].rotation.x=-.12+Math.sin(I*.6)*.02,f[1].rotation.x=-.12+Math.sin(I*.7+1)*.02,g<=0&&P<=0&&(_.rotation.y=Math.sin(I*.53)*.07*(1-B)+(V.lookYaw||0)*.18,_.rotation.z=Math.sin(I*.41)*.025*(1-B)),r.iris.emissiveIntensity=.35+(V.night||0)*1.5},dispose(){s.traverse(R=>{R.isMesh&&(R.geometry?.dispose?.(),Array.isArray(R.material)?R.material.forEach(I=>I.dispose?.()):R.material?.dispose?.())})}}}const Vc={rabbit:{hp:18,speed:4.6,radius:.34,prey:!0,meat:24,name:"Rabbit",barHeight:.95,bodyCenter:.34,aggro:0,flee:13},deer:{hp:46,speed:6.2,radius:.52,prey:!0,meat:38,name:"Deer",barHeight:1.95,bodyCenter:.92,aggro:0,flee:15},boar:{hp:74,speed:4.9,radius:.66,prey:!1,meat:30,name:"Boar",barHeight:1.45,bodyCenter:.58,aggro:15,damage:14,attackRange:2.3,cooldown:2.4},rival:{hp:96,speed:5.5,radius:.56,prey:!1,meat:26,name:"Rival Wolf",barHeight:1.55,bodyCenter:.78,aggro:19,damage:12,attackRange:2.5,cooldown:1.9},alphaWolf:{hp:150,speed:5.9,radius:.66,prey:!1,meat:34,name:"Alpha Wolf",barHeight:1.8,bodyCenter:.88,aggro:22,damage:18,attackRange:2.7,cooldown:1.7,scale:1.24},bear:{hp:260,speed:3.7,radius:.9,prey:!1,meat:48,name:"Old Bear",barHeight:2.35,bodyCenter:.95,aggro:22,damage:26,attackRange:3.3,cooldown:2.7,scale:1.15}},Dt=i=>new Bn({roughness:.9,metalness:.01,...i});function $e(i,e,t,n=[0,0,0],s=[0,0,0],r=[1,1,1]){const a=new Ot(e,t);return a.position.set(...n),a.rotation.set(...s),a.scale.set(...r),a.castShadow=!0,a.receiveShadow=!0,i.add(a),a}function gt(i,e=10,t=8){return new Bi(i,e,t)}function kn(i,e,t=4,n=9){return new Aa(i,e,t,n)}function sr(i,e,t=5){return new Os(i,e,t)}function Wc(i,e,t,n=6){return new Oi(i,e,t,n)}function $g(i){const e=i.pick([9071173,10189394,7297602,11569756]),t=Dt({color:e,roughness:.95}),n=Dt({color:13085566,roughness:.95}),s=Dt({color:14865590,roughness:.95}),r=Dt({color:14256790,roughness:.7}),a=Dt({color:5909034,roughness:.5}),o=Dt({color:657930,roughness:.2}),l=new lt;$e(l,gt(.3,12,9),t,[0,.4,-.04],[0,0,0],[1,.9,1.22]),$e(l,gt(.23,10,8),n,[0,.43,.2],[0,0,0],[1,.9,.9]),$e(l,gt(.16,10,8),s,[0,.34,.24],[0,0,0],[.85,.7,.7]);const c=new lt;c.position.set(0,.58,.34),l.add(c),$e(c,gt(.2,12,9),t,[0,0,0],[0,0,0],[1,.95,1]),$e(c,gt(.12,10,7),n,[0,-.04,.16],[0,0,0],[1.1,.85,.9]),$e(c,gt(.04,7,5),a,[0,-.02,.27],[0,0,0],[1.2,.8,.9]);for(const h of[-1,1]){$e(c,gt(.035,7,5),o,[h*.11,.045,.16],[0,0,0],[1,1,.6]),$e(c,gt(.008,5,4),Dt({color:16777215,roughness:.2}),[h*.115,.06,.183],[0,0,0],[1,1,1]);const d=new lt;d.position.set(h*.075,.15,-.01),d.rotation.set(-.16,0,h*.12),c.add(d),$e(d,kn(.055,.26,4,8),t,[0,.15,0],[0,0,0],[1,1,.7]),$e(d,kn(.028,.2,3,7),r,[0,.15,.025],[0,0,0],[1,1,.45]),d.userData.baseZ=h*.12}$e(l,gt(.11,8,6),s,[0,.43,-.37],[0,0,0],[1,1,1]);const u=[];for(const h of[-1,1])for(const d of[.22,-.2]){const m=new lt;m.position.set(h*.17,.2,d),l.add(m),$e(m,kn(.045,.12,3,6),t,[0,-.07,0],[0,0,0],[1,1,1]),$e(m,gt(.055,7,5),n,[0,-.14,.02],[0,0,0],[1,.6,1.3]),u.push(m)}return{visual:l,bodyCenter:.34,flashMats:[t,n,s],animate(h,d,m,_,v){const f=v.phase=(v.phase||0)+h*(3+m*12),p=Math.max(0,Math.sin(f))*.18*m;l.position.y=(l.userData.baseY??0)+p,l.rotation.x=-.08*m+Math.sin(f*2)*.04*m,c.rotation.x=.05+Math.sin(d*1.7)*.04+Math.sin(f)*.06*m,c.rotation.y=Math.sin(d*.8)*.18*(1-m);for(let E=0;E<u.length;E++){const b=Math.sin(f+(E%2?Math.PI:0));u[E].rotation.x=b*.5*m,u[E].rotation.z=(E<2?-1:1)*.06}c.children.filter(E=>E.isGroup).forEach((E,b)=>{E.rotation.z=(E.userData.baseZ||0)+Math.sin(d*2.1+b)*.05+Math.sin(f)*.03*m,E.rotation.x=-.16+Math.sin(d*1.4+b)*.03})}}}function Kg(i){const e=Dt({color:i.pick([9136965,9860684,8216382]),roughness:.95}),t=Dt({color:11045211,roughness:.95}),n=Dt({color:14272936,roughness:.95}),s=Dt({color:4864040,roughness:.8}),r=Dt({color:7035458,roughness:.85}),a=Dt({color:1709072,roughness:.4}),o=Dt({color:526344,roughness:.2}),l=new lt,c=new lt;c.position.y=1,l.add(c),$e(c,kn(.27,.62,6,10),e,[0,0,0],[Math.PI/2,0,0],[1,.95,1]),$e(c,gt(.3,10,8),t,[0,.03,.3],[0,0,0],[.95,.9,.9]),$e(c,gt(.28,10,8),e,[0,.02,-.33],[0,0,0],[1,.9,.9]),$e(c,gt(.18,9,7),n,[0,-.17,.02],[0,0,0],[.9,.65,1.4]);const u=new lt;u.position.set(0,.18,.35),u.rotation.x=.42,c.add(u),$e(u,kn(.12,.34,5,9),e,[0,.22,0],[0,0,0],[1,1,.9]);const h=new lt;h.position.set(0,.47,.02),h.rotation.x=-.35,u.add(h),$e(h,gt(.16,10,8),e,[0,0,0],[0,0,0],[.95,1,1.05]),$e(h,kn(.085,.14,4,8),t,[0,-.045,.18],[Math.PI/2,0,0],[1,.9,.9]),$e(h,gt(.045,7,5),a,[0,-.04,.28],[0,0,0],[1.2,.8,.9]);for(const m of[-1,1]){$e(h,gt(.035,7,5),o,[m*.11,.04,.09],[0,0,0],[1,1,.6]);const _=new lt;_.position.set(m*.13,.08,-.01),_.rotation.set(0,0,m*.9),h.add(_),$e(_,sr(.065,.22,5),e,[0,.1,0],[0,0,0],[1,1,.6]);const v=new lt;v.position.set(m*.07,.14,-.02),v.rotation.set(-.15,0,m*.5),h.add(v),$e(v,Wc(.018,.03,.38,5),r,[0,.17,0],[0,0,0],[1,1,1]);for(let f=0;f<3;f++){const p=new lt;p.position.set(0,.16+f*.1,0),p.rotation.set(0,0,m*(.7+f*.15)),v.add(p),$e(p,Wc(.01,.018,.2-f*.03,4),r,[0,.09,0],[0,0,0],[1,1,1])}}$e(c,gt(.1,8,6),n,[0,.02,-.53],[0,0,0],[1,1,1]);const d=[];for(const m of[-1,1])for(const _ of[.32,-.3]){const v=new lt;v.position.set(m*.2,-.16,_),c.add(v),$e(v,kn(.065,.34,4,7),e,[0,-.2,0],[0,0,0],[1,1,.9]);const f=new lt;f.position.y=-.4,v.add(f),$e(f,kn(.045,.32,4,7),s,[0,-.17,0],[0,0,0],[1,1,1]),$e(f,gt(.055,7,5),s,[0,-.35,.02],[0,0,0],[1,.6,1.3]),d.push({hip:v,knee:f,base:v.rotation.x})}return{visual:l,bodyCenter:.92,flashMats:[e,t,n],animate(m,_,v,f,p){const x=p.phase=(p.phase||0)+m*(2+v*(f?13:8)),E=.16+v*.5;d.forEach((b,w)=>{const T=Math.sin(x+(w%2?Math.PI:0));b.hip.rotation.x=b.base+T*E,b.knee.rotation.x=.12+Math.max(0,-Math.cos(x+(w%2?Math.PI:0)))*.55*v}),l.position.y=(l.userData.baseY??0)+Math.abs(Math.sin(x))*.035*v,c.position.y=1+Math.sin(x*2)*.025*v,u.rotation.x=.42+Math.sin(_*1.2)*.03,h.rotation.x=-.35+Math.sin(_*1.5)*.04+(p.headDown?.3:0),h.rotation.y=Math.sin(_*.7)*.15*(1-v)}}}function Zg(i){const e=Dt({color:i.pick([3813414,4602412,3090465]),roughness:.98}),t=Dt({color:5719861,roughness:.95}),n=Dt({color:2103829,roughness:.95}),s=Dt({color:15261896,roughness:.5}),r=Dt({color:5913141,roughness:.6}),a=Dt({color:591622,roughness:.2}),o=new lt,l=new lt;l.position.y=.66,o.add(l),$e(l,gt(.46,12,9),e,[0,0,0],[0,0,0],[1.05,.86,1.28]),$e(l,gt(.38,10,8),t,[0,.04,.34],[0,0,0],[1,.9,.9]),$e(l,gt(.32,10,8),e,[0,.02,-.38],[0,0,0],[1,.9,.9]);const c=new lt;c.position.set(0,.04,.5),l.add(c),$e(c,gt(.3,11,9),t,[0,0,0],[0,0,0],[1.05,.95,1]),$e(c,kn(.13,.18,4,8),e,[0,-.05,.25],[Math.PI/2,0,0],[1.1,.9,1]),$e(c,gt(.1,8,6),r,[0,-.04,.38],[0,0,0],[1.2,.9,.8]);for(const h of[-1,1]){$e(c,gt(.035,7,5),a,[h*.16,.1,.14],[0,0,0],[1,1,.7]),$e(c,sr(.03,.18,5),s,[h*.13,-.12,.3],[-.4,0,h*.18],[1,1,1]);const d=new lt;d.position.set(h*.23,.2,.02),d.rotation.set(-.2,0,h*.7),c.add(d),$e(d,sr(.08,.18,5),e,[0,.08,0],[0,0,0],[1,1,.6])}for(let h=0;h<8;h++)$e(l,sr(.05,.16,5),n,[0,.38-h*.01,.28-h*.12],[-.6,0,0],[1,1,1]);const u=[];for(const h of[-1,1])for(const d of[.3,-.3]){const m=new lt;m.position.set(h*.3,-.2,d),l.add(m),$e(m,kn(.11,.22,4,7),e,[0,-.13,0],[0,0,0],[1,1,.9]),$e(m,gt(.13,8,6),n,[0,-.28,.02],[0,0,0],[1,.6,1.3]),u.push({hip:m,base:m.rotation.x})}return{visual:o,bodyCenter:.58,flashMats:[e,t],animate(h,d,m,_,v){const f=v.phase=(v.phase||0)+h*(2.5+m*(v.charging?16:10));u.forEach((p,x)=>{p.hip.rotation.x=p.base+Math.sin(f+(x%2?Math.PI:0))*(.18+m*.48)}),o.position.y=(o.userData.baseY??0)+Math.abs(Math.sin(f))*.03*m,l.position.y=.66+Math.sin(f*2)*.02*m,l.rotation.x=(v.headDown?.16:0)+Math.sin(f)*.02*m,c.rotation.x=v.headDown?.35:Math.sin(d*1.4)*.05,c.rotation.y=Math.sin(d*.8)*.08*(1-m)}}}function Jg(i){const e=Dt({color:i.pick([3877406,4468770,3286042]),roughness:.98}),t=Dt({color:5914668,roughness:.95}),n=Dt({color:7033142,roughness:.9}),s=Dt({color:854536,roughness:.3}),r=Dt({color:14209212,roughness:.5}),a=Dt({color:657158,roughness:.2}),o=new lt,l=new lt;l.position.y=1,o.add(l),$e(l,gt(.64,13,10),e,[0,0,0],[0,0,0],[1.08,.9,1.2]),$e(l,gt(.5,11,9),t,[0,.06,.42],[0,0,0],[1,.9,.9]);const c=new lt;c.position.set(0,.36,.62),l.add(c),$e(c,gt(.4,12,9),e,[0,0,0],[0,0,0],[1,.95,1]),$e(c,gt(.24,10,8),n,[0,-.09,.28],[0,0,0],[1.05,.8,.95]),$e(c,gt(.085,8,6),s,[0,-.04,.46],[0,0,0],[1.2,.85,.9]);for(const h of[-1,1])$e(c,gt(.04,7,5),a,[h*.16,.1,.25],[0,0,0],[1,1,.6]),$e(c,gt(.12,8,6),t,[h*.3,.28,-.02],[0,0,0],[1,1,.7]);const u=[];for(const h of[-1,1])for(const d of[.38,-.36]){const m=new lt;m.position.set(h*.38,-.25,d),l.add(m),$e(m,kn(.17,.28,4,8),e,[0,-.18,0],[0,0,0],[1,1,.9]);const _=new lt;_.position.y=-.36,m.add(_),$e(_,kn(.12,.24,4,8),e,[0,-.13,.01],[0,0,0],[1,1,1]),$e(_,gt(.15,8,6),t,[0,-.28,.05],[0,0,0],[1,.55,1.25]);for(let v=0;v<3;v++)$e(_,sr(.025,.09,4),r,[(v-1)*.07,-.33,.19],[Math.PI/2.2,0,0],[1,1,1]);u.push({hip:m,knee:_,base:m.rotation.x,front:d>0})}return $e(l,gt(.12,8,6),t,[0,.05,-.66],[0,0,0],[1,1,1]),{visual:o,bodyCenter:.95,flashMats:[e,t],animate(h,d,m,_,v){const f=v.phase=(v.phase||0)+h*(1.8+m*8);if(u.forEach((p,x)=>{p.hip.rotation.x=p.base+Math.sin(f+(x%2?Math.PI:0))*(.14+m*.4),p.knee.rotation.x=.1+Math.max(0,-Math.cos(f+(x%2?Math.PI:0)))*.3*m}),o.position.y=(o.userData.baseY??0)+Math.abs(Math.sin(f))*.03*m,l.position.y=1+Math.sin(f*2)*.025*m,l.rotation.z=Math.sin(f)*.025*m,c.rotation.x=Math.sin(d*1.2)*.04+(v.headDown?.25:0),c.rotation.y=Math.sin(d*.55)*.12*(1-m),v.swipe>0){const p=u.find(x=>x.front);p&&(p.hip.rotation.x=-1.4*Math.sin(v.swipe*Math.PI),p.hip.rotation.z=-.5*Math.sin(v.swipe*Math.PI))}else{const p=u.find(x=>x.front);p&&(p.hip.rotation.z=0)}}}}function Qg(i,e){const t=i==="alphaWolf",n=t?{...Bc,fur:2369067,furLight:3421755,eye:16726559,eyeGlow:7999488,mask:3809312,maskDark:2495508}:Bc,s=jh({palette:n,harness:!1,scale:t?1.18:1});return{visual:s.root,bodyCenter:.78,flashMats:[s.mats.fur,s.mats.furLight,s.mats.mask],rig:s,animate(r,a,o,l,c){s.update(r,a,{speed:o,sprint:l,night:c.night||0,lookYaw:c.lookYaw||0})}}}class jg{constructor(e,t,n,s={}){const r=Vc[e]||Vc.rabbit;this.type=e,this.cfg=r,this.level=t,this.isPrey=r.prey,this.name=r.name,this.radius=r.radius*(s.scale||r.scale||1),this.maxHp=r.hp*t.hpMul*(s.hpMul||1),this.hp=this.maxHp,this.damage=(r.damage||0)*t.dmgMul,this.speed=r.speed*t.speedMul,this.meat=r.meat,this.isAlpha=!!s.alpha,this.home=new rt(n.x,n.z),this.position=new F(n.x,0,n.z),this.heading=s.heading??Math.random()*He,this.velocity=new F,this.state="wander",this.stateTimer=0,this.attackCooldown=0,this.aggro=!1,this.aggroTimer=0,this.hitFlash=0,this.hitTimer=0,this.dead=!1,this.edible=!1,this.consumed=!1,this.gone=!1,this.deathTimer=0,this.deathSide=Math.random()<.5?-1:1,this.wanderTarget=new rt(n.x+(Math.random()-.5)*12,n.z+(Math.random()-.5)*12),this.attackDone=!1,this.chargeDir=new rt(0,0),this.specialTimer=0,this.rng=s.rng||qt(Math.floor(Math.random()*1e9)),this.animState={phase:0},this.root=new lt,this.root.position.set(n.x,0,n.z),this.fall=new lt,this.root.add(this.fall);const a=e==="rabbit"?$g(this.rng):e==="deer"?Kg(this.rng):e==="boar"?Zg(this.rng):e==="bear"?Jg(this.rng):Qg(e,this.rng);this.visual=a.visual,this.flashMats=a.flashMats||[],this.rig=a.rig||null,this.bodyCenter=a.bodyCenter,this.fall.position.y=this.bodyCenter,this.visual.userData.baseY=-this.bodyCenter,this.visual.position.y=-this.bodyCenter,this.fall.add(this.visual),s.scale&&this.visual.scale.setScalar(s.scale),this.baseScale=this.visual.scale.x,this.bar=new lt,this.bar.position.y=r.barHeight+(s.scale||r.scale||1)*.1;const o=new is(1.18,.12),l=new Ds({color:329734,transparent:!0,opacity:.72,depthWrite:!1}),c=new Ot(o,l),u=new is(1.12,.075);u.translate(.56,0,0);const h=new Ds({color:r.prey?10149751:16739156,transparent:!0,depthWrite:!1});this.barFill=new Ot(u,h),this.barFill.position.set(-.56,0,.002),this.bar.add(c,this.barFill),this.bar.visible=!1,this.bar.renderOrder=20,this.root.add(this.bar);const d=new Ca(.62,.82,28),m=new Ds({color:16761690,transparent:!0,opacity:0,depthWrite:!1,blending:ki,side:Pn});this.ring=new Ot(d,m),this.ring.rotation.x=-Math.PI/2,this.ring.position.y=.04,this.ring.visible=!1,this.root.add(this.ring),this.disposables=[o,l,u,h,d,m],this.animateFn=a.animate,this._q=new ls}addTo(e){e.add(this.root)}setFlash(e){for(const t of this.flashMats)t&&(e>0?(t.emissive.setHex(6949380),t.emissiveIntensity=e*.9):(t.emissive.setHex(0),t.emissiveIntensity=0))}takeDamage(e,t={}){if(this.dead)return{killed:!1,damage:0};const n=Math.min(this.hp,e);return this.hp-=e,this.hitFlash=.2,this.aggro=!0,this.aggroTimer=12,this.setFlash(1),this.hp<=0?(this.die(!!t.instant),{killed:!0,damage:n,instant:!!t.instant}):{killed:!1,damage:n}}die(e){this.dead||(this.dead=!0,this.edible=!0,this.deathTimer=0,this.instantDevoured=!!e,this.bar.visible=!1,this.ring.visible=!0,this.ring.material.opacity=.5,this.setFlash(0))}consume(){return!this.edible||this.consumed?!1:(this.consumed=!0,this.edible=!1,this.ring.visible=!1,this.root.visible=!1,!0)}update(e,t,n,s){const r=s.world,a=s.camera;if(this.hitFlash>0&&(this.hitFlash=Math.max(0,this.hitFlash-e),this.hitFlash===0&&this.setFlash(0)),this.dead){this.deathTimer+=e;const w=bt(this.deathTimer/.5,0,1);this.fall.rotation.z=this.deathSide*(Math.PI/2)*(1-Math.pow(1-w,3)),this.fall.position.y=gi(this.bodyCenter,this.bodyCenter*.34,w),this.ring.material.opacity=.28+Math.sin(t*3.2)*.14,this.ring.scale.setScalar(1+Math.sin(t*2.4)*.06),this.deathTimer>22&&(this.gone=!0);return}const o=n.position.x,l=n.position.z,c=Zh(this.position.x,this.position.z,o,l),u=n.night||0;this.attackCooldown=Math.max(0,this.attackCooldown-e),this.aggroTimer=Math.max(0,this.aggroTimer-e),this.aggroTimer<=0&&!this.isPrey&&(this.aggro=!1);let h=0,d=!1,m=!1,_=!1,v=0,f=0;if(this.isPrey){const w=this.cfg.flee+u*2;if(c<w?(this.state="flee",this.aggro=!0,this.aggroTimer=4):this.state==="flee"&&c>w+4&&(this.state="wander"),this.state==="flee"){const T=Math.atan2(this.position.x-o,this.position.z-l),y=Math.hypot(this.position.x,this.position.z)>84?Math.atan2(-this.position.x,-this.position.z):T;this.heading=qn(this.heading,y,8,e),h=this.speed*(this.type==="rabbit"?1:.96),d=!0}else this.wander(e,t,.36),h=this.wanderSpeed||0}else{const w=this.cfg.aggro+u*5+(this.aggro?8:0);if(c<w&&(this.aggro=!0,this.aggroTimer=10),!this.aggro)this.wander(e,t,.3),h=this.wanderSpeed||0;else{const T=Math.atan2(o-this.position.x,l-this.position.z);if(this.type==="boar")if(this.state==="windup"){if(this.specialTimer-=e,m=!0,this.heading=qn(this.heading,T,7,e),this.specialTimer<=0){this.state="charge",this.specialTimer=.95,this.attackDone=!1;const g=Math.max(.01,c);this.chargeDir.set((o-this.position.x)/g,(l-this.position.z)/g)}}else this.state==="charge"?(_=!0,m=!0,this.specialTimer-=e,this.heading=Math.atan2(this.chargeDir.x,this.chargeDir.y),h=this.speed*2.35,!this.attackDone&&c<this.radius+1.6&&(this.attackDone=!0,s.hurtPlayer(this.damage,this)),this.specialTimer<=0&&(this.state="chase",this.attackCooldown=this.cfg.cooldown)):c<10&&this.attackCooldown<=0?(this.state="windup",this.specialTimer=.55):(this.chase(e,T,c,8.5,1),h=this.speed);else if(this.type==="rival"||this.type==="alphaWolf")if(this.state==="windup")this.specialTimer-=e,this.heading=qn(this.heading,T,10,e),this.specialTimer<=0&&(this.state="lunge",this.specialTimer=.48,this.attackDone=!1,this.rig?.triggerBite());else if(this.state==="lunge")this.specialTimer-=e,_=!0,h=this.speed*1.85,this.heading=qn(this.heading,T,12,e),!this.attackDone&&c<this.radius+1.8&&(this.attackDone=!0,s.hurtPlayer(this.damage,this)),this.specialTimer<=0&&(this.state="circle",this.specialTimer=1.1,this.attackCooldown=this.cfg.cooldown);else if(this.state==="circle"){this.specialTimer-=e;const g=T+Math.PI/2;this.heading=qn(this.heading,g,5,e),h=this.speed*.62,this.specialTimer<=0&&(this.state="chase")}else c<6.5&&this.attackCooldown<=0?(this.state="windup",this.specialTimer=.38):(this.chase(e,T,c,6.5,1),h=this.speed*(c<10?.9:1));else this.type==="bear"&&(this.state==="windup"?(this.specialTimer-=e,m=!0,this.heading=qn(this.heading,T,5,e),this.specialTimer<=0&&(this.state="swipe",this.specialTimer=.35,this.attackDone=!1)):this.state==="swipe"?(this.specialTimer-=e,v=1-this.specialTimer/.35,!this.attackDone&&c<this.radius+2.2&&(this.attackDone=!0,s.hurtPlayer(this.damage,this)),this.specialTimer<=0&&(this.state="chase",this.attackCooldown=this.cfg.cooldown)):c<4&&this.attackCooldown<=0?(this.state="windup",this.specialTimer=.55):(this.chase(e,T,c,4,1),h=this.speed))}}if(h>0){const w=Math.sin(this.heading)*h,T=Math.cos(this.heading)*h;this.position.x+=w*e,this.position.z+=T*e,this.velocity.set(w,0,T)}else this.velocity.multiplyScalar(Math.max(0,1-e*6));if(s.animals)for(const w of s.animals){if(w===this||w.dead)continue;const T=this.position.x-w.position.x,g=this.position.z-w.position.z,y=this.radius+w.radius+.15,P=Math.hypot(T,g);if(P>.001&&P<y){const C=(y-P)*.5;this.position.x+=T/P*C,this.position.z+=g/P*C}}const p=this.radius+(this.isPrey?.5:.25);if(c>.001&&c<p){const w=(p-c)*.7;this.position.x+=(this.position.x-o)/c*w,this.position.z+=(this.position.z-l)/c*w}for(const w of r.colliders){const T=this.position.x-w.x,g=this.position.z-w.z,y=this.radius+w.r,P=Math.hypot(T,g);P>.001&&P<y&&(this.position.x+=T/P*(y-P),this.position.z+=g/P*(y-P))}const x=Math.hypot(this.position.x,this.position.z);x>92&&(this.position.x=this.position.x/x*92,this.position.z=this.position.z/x*92,this.heading=Math.atan2(-this.position.x,-this.position.z)),this.position.y=r.heightAt(this.position.x,this.position.z),this.root.position.copy(this.position),this.root.rotation.y=this.heading;const E=bt(h/Math.max(1,this.speed),0,1.3);this.animateFn&&(this.animState.night=u,this.animState.lookYaw=f,this.animState.headDown=m,this.animState.charging=_,this.animState.swipe=v,this.animateFn(e,t,E,d||_,this.animState));const b=this.hp<this.maxHp-.1||this.aggro;if(this.bar.visible=b,b&&a){this.root.getWorldQuaternion(this._q),this.bar.quaternion.copy(this._q).invert().multiply(a.quaternion);const w=bt(this.hp/this.maxHp,0,1);this.barFill.scale.x=w,this.barFill.material.color.setHex(this.isPrey?10149751:w<.35?16739156:16753226)}}chase(e,t,n,s,r){n>s?this.heading=qn(this.heading,t,5.5,e):this.heading=qn(this.heading,t,4,e)}wander(e,t,n){if(this.stateTimer-=e,this.stateTimer<=0){this.stateTimer=2.5+Math.random()*5;const o=Math.random()*He,l=Math.random()*16;this.wanderTarget.set(this.home.x+Math.cos(o)*l,this.home.y+Math.sin(o)*l),this.idle=Math.random()<.3}const s=this.wanderTarget.x-this.position.x,r=this.wanderTarget.y-this.position.z,a=Math.hypot(s,r);if(this.idle&&a<4){this.wanderSpeed=0;return}a>1.2?(this.heading=qn(this.heading,Math.atan2(s,r),2.2,e),this.wanderSpeed=this.speed*n):(this.wanderSpeed=0,this.stateTimer=0)}dispose(){this.root.traverse(e=>{(e.isMesh||e.isPoints)&&(e.geometry?.dispose?.(),Array.isArray(e.material)?e.material.forEach(t=>t.dispose?.()):e.material?.dispose?.())});for(const e of this.disposables)e?.dispose?.()}}function e_(){const i=document.createElement("canvas");i.width=64,i.height=64;const e=i.getContext("2d"),t=e.createRadialGradient(32,32,0,32,32,32);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.35,"rgba(255,255,255,.85)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,64,64);const n=new wa(i);return n.colorSpace=tn,n}class t_{constructor(e){this.scene=e,this.bursts=[],this.slashes=[],this.decals=[],this.texture=e_(),this.decalGeo=new Ra(1,10),this.slashGeo=new Pa(1,.04,4,18,2.1)}burst(e,t={}){const n=t.count??18,s=t.color??7999496,r=t.speed??5,a=t.size??.13,o=t.life??.9,l=t.gravity??11,c=!!t.additive,u=t.spread??1,h=t.dir,d=new Float32Array(n*3),m=new Float32Array(n*3);for(let p=0;p<n;p++){d[p*3]=e.x+(Math.random()-.5)*.25,d[p*3+1]=e.y+(Math.random()-.5)*.2,d[p*3+2]=e.z+(Math.random()-.5)*.25;const x=Math.random()*He,E=Math.random()*Math.PI,b=r*(.35+Math.random()*.85);m[p*3]=Math.sin(E)*Math.cos(x)*b*u+(h?.x||0)*r*.5,m[p*3+1]=Math.cos(E)*b*.7+(t.up??2.2)+(h?.y||0)*r*.4,m[p*3+2]=Math.sin(E)*Math.sin(x)*b*u+(h?.z||0)*r*.5}const _=new Wt;_.setAttribute("position",new En(d,3));const v=new Li({map:this.texture,color:s,size:a,transparent:!0,opacity:1,depthWrite:!1,blending:c?ki:Ps,sizeAttenuation:!0}),f=new js(_,v);f.frustumCulled=!1,this.scene.add(f),this.bursts.push({points:f,geo:_,mat:v,positions:d,vel:m,life:o,age:0,gravity:l,count:n})}blood(e,t,n=1){this.burst(e,{count:Math.round(16*n),color:7998470,speed:5.5,size:.14,life:.85,gravity:13,dir:t}),this.burst(e,{count:Math.round(7*n),color:12066829,speed:7,size:.09,life:.55,gravity:10,dir:t})}sparks(e,t=16765562){this.burst(e,{count:12,color:t,speed:4.2,size:.08,life:.38,gravity:2,additive:!0,up:1.2})}dust(e,t=10127976){this.burst(e,{count:6,color:t,speed:1.4,size:.24,life:.7,gravity:.4,up:.6})}slash(e,t,n=16773576){const s=new Ds({color:n,transparent:!0,opacity:.78,depthWrite:!1,blending:ki,side:Pn}),r=new Ot(this.slashGeo,s);r.position.set(e.x+Math.sin(t)*.95,e.y+.92,e.z+Math.cos(t)*.95),r.rotation.set(0,t,-.42),r.scale.setScalar(.85),r.renderOrder=12,this.scene.add(r),this.slashes.push({mesh:r,mat:s,age:0,life:.24})}decal(e,t=.7,n=3541509){const s=new Ds({color:n,transparent:!0,opacity:.58,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-2,side:Pn}),r=new Ot(this.decalGeo,s);if(r.position.set(e.x,e.y+.025,e.z),r.rotation.x=-Math.PI/2,r.scale.setScalar(t*(.8+Math.random()*.5)),r.renderOrder=2,this.scene.add(r),this.decals.push({mesh:r,mat:s,age:0,life:26}),this.decals.length>28){const a=this.decals.shift();this.scene.remove(a.mesh),a.mat.dispose()}}update(e){for(let t=this.bursts.length-1;t>=0;t--){const n=this.bursts[t];n.age+=e;const s=n.age/n.life;if(s>=1){this.scene.remove(n.points),n.geo.dispose(),n.mat.dispose(),this.bursts.splice(t,1);continue}const r=n.positions;for(let a=0;a<n.count;a++){const o=a*3;n.vel[o+1]-=n.gravity*e,r[o]+=n.vel[o]*e,r[o+1]+=n.vel[o+1]*e,r[o+2]+=n.vel[o+2]*e,r[o+1]<.02&&(r[o+1]=.02,n.vel[o+1]*=-.18,n.vel[o]*=.6,n.vel[o+2]*=.6)}n.points.geometry.attributes.position.needsUpdate=!0,n.mat.opacity=1-Math.pow(s,1.7)}for(let t=this.slashes.length-1;t>=0;t--){const n=this.slashes[t];n.age+=e;const s=n.age/n.life;if(s>=1){this.scene.remove(n.mesh),n.mat.dispose(),this.slashes.splice(t,1);continue}n.mesh.scale.setScalar(.85+s*.55),n.mat.opacity=(1-s)*.78}for(let t=this.decals.length-1;t>=0;t--){const n=this.decals[t];n.age+=e,n.age>=n.life?(this.scene.remove(n.mesh),n.mat.dispose(),this.decals.splice(t,1)):n.age>n.life-4&&(n.mat.opacity=.58*((n.life-n.age)/4))}}clear(){for(const e of this.bursts)this.scene.remove(e.points),e.geo.dispose(),e.mat.dispose();this.bursts.length=0;for(const e of this.slashes)this.scene.remove(e.mesh),e.mat.dispose();this.slashes.length=0;for(const e of this.decals)this.scene.remove(e.mesh),e.mat.dispose();this.decals.length=0}dispose(){this.clear(),this.texture.dispose(),this.decalGeo.dispose(),this.slashGeo.dispose()}}class n_{constructor(e=!0){this.enabled=e,this.ctx=null,this.master=null,this.ambientGain=null,this.elapsed=0,this.nextBird=3,this.nextCricket=2,this.nextHeart=0,this.night=0,this.inGame=!1,this.health=100,this.noiseBuffer=null}ensure(){if(this.ctx)return this.ctx.state==="suspended"&&this.ctx.resume().catch(()=>{}),this.ctx;const e=window.AudioContext||window.webkitAudioContext;if(!e)return null;try{this.ctx=new e;const t=this.ctx;this.master=t.createGain(),this.master.gain.value=this.enabled?.52:0;const n=t.createDynamicsCompressor();n.threshold.value=-18,n.knee.value=24,n.ratio.value=5,n.attack.value=.003,n.release.value=.22,this.master.connect(n),n.connect(t.destination);const s=Math.floor(t.sampleRate*1.8),r=t.createBuffer(1,s,t.sampleRate),a=r.getChannelData(0);let o=0;for(let l=0;l<s;l++){const c=Math.random()*2-1;o=(o+.02*c)/1.02,a[l]=o*3.2}return this.noiseBuffer=r,this.startAmbient(),t}catch{return this.ctx=null,null}}startAmbient(){const e=this.ctx;if(!e)return;const t=e.createBufferSource();t.buffer=this.noiseBuffer,t.loop=!0;const n=e.createBiquadFilter();n.type="lowpass",n.frequency.value=340,n.Q.value=.4,this.ambientGain=e.createGain(),this.ambientGain.gain.value=.028,t.connect(n),n.connect(this.ambientGain),this.ambientGain.connect(this.master),t.start();const s=e.createGain();s.gain.value=.018;const r=e.createBiquadFilter();r.type="lowpass",r.frequency.value=260;const a=e.createOscillator();a.type="sine",a.frequency.value=55;const o=e.createOscillator();o.type="sine",o.frequency.value=82.4;const l=e.createOscillator();l.type="sine",l.frequency.value=.07;const c=e.createGain();c.gain.value=.009,l.connect(c),c.connect(s.gain),a.connect(r),o.connect(r),r.connect(s),s.connect(this.master),a.start(),o.start(),l.start()}setEnabled(e){this.enabled=!!e,this.master&&this.ctx&&(this.master.gain.cancelScheduledValues(this.ctx.currentTime),this.master.gain.setTargetAtTime(this.enabled?.52:0,this.ctx.currentTime,.08)),this.enabled&&this.ensure()}toggle(){return this.setEnabled(!this.enabled),this.enabled}noise({duration:e=.1,gain:t=.2,type:n="bandpass",freq:s=900,q:r=.8,delay:a=0,rate:o=1}){const l=this.ctx;if(!l||!this.enabled)return;const c=l.currentTime+a,u=l.createBufferSource();u.buffer=this.noiseBuffer,u.playbackRate.value=o;const h=l.createBiquadFilter();h.type=n,h.frequency.setValueAtTime(s,c),h.Q.value=r;const d=l.createGain();d.gain.setValueAtTime(1e-4,c),d.gain.exponentialRampToValueAtTime(t,c+.008),d.gain.exponentialRampToValueAtTime(1e-4,c+e),u.connect(h),h.connect(d),d.connect(this.master),u.start(c),u.stop(c+e+.05)}tone({freq:e=220,endFreq:t=null,type:n="sine",duration:s=.2,gain:r=.12,delay:a=0,attack:o=.01}){const l=this.ctx;if(!l||!this.enabled)return;const c=l.currentTime+a,u=l.createOscillator();u.type=n,u.frequency.setValueAtTime(e,c),t&&u.frequency.exponentialRampToValueAtTime(Math.max(1,t),c+s);const h=l.createGain();h.gain.setValueAtTime(1e-4,c),h.gain.exponentialRampToValueAtTime(r,c+o),h.gain.exponentialRampToValueAtTime(1e-4,c+s),u.connect(h),h.connect(this.master),u.start(c),u.stop(c+s+.05)}click(){this.tone({freq:540,endFreq:760,type:"sine",duration:.08,gain:.05})}footstep(e=!1){this.noise({duration:e?.09:.12,gain:e?.11:.075,type:"lowpass",freq:e?700:520,q:.7,rate:Qi(.7,1.1)}),this.tone({freq:74,endFreq:44,type:"sine",duration:.09,gain:.045})}paw(){this.noise({duration:.16,gain:.16,type:"bandpass",freq:1600,q:.9,rate:1.4}),this.tone({freq:190,endFreq:70,type:"triangle",duration:.12,gain:.05})}bite(){this.noise({duration:.07,gain:.24,type:"bandpass",freq:900,q:1.2}),this.noise({duration:.1,gain:.18,type:"lowpass",freq:420,q:.6,delay:.045}),this.tone({freq:120,endFreq:55,type:"square",duration:.1,gain:.06})}hit(e=!1){this.noise({duration:e?.16:.1,gain:e?.26:.16,type:"lowpass",freq:300,q:.7}),this.tone({freq:e?82:120,endFreq:38,type:"sine",duration:e?.28:.16,gain:e?.22:.12})}eat(){for(let e=0;e<3;e++)this.noise({duration:.08,gain:.15,type:"bandpass",freq:700+e*180,q:1.4,delay:e*.085,rate:Qi(.8,1.3)});this.tone({freq:150,endFreq:90,type:"triangle",duration:.25,gain:.06,delay:.05})}hurt(){this.tone({freq:220,endFreq:70,type:"sawtooth",duration:.3,gain:.1}),this.noise({duration:.2,gain:.12,type:"lowpass",freq:600,q:.7})}growl(){this.tone({freq:92,endFreq:54,type:"sawtooth",duration:.55,gain:.075}),this.tone({freq:97,endFreq:58,type:"sawtooth",duration:.55,gain:.05,delay:.02}),this.noise({duration:.5,gain:.05,type:"lowpass",freq:240,q:.8})}roar(){this.tone({freq:78,endFreq:38,type:"sawtooth",duration:.9,gain:.16}),this.tone({freq:118,endFreq:52,type:"square",duration:.8,gain:.06,delay:.04}),this.noise({duration:.8,gain:.12,type:"lowpass",freq:380,q:.6})}squeak(){this.tone({freq:1350,endFreq:1800,type:"sine",duration:.1,gain:.045}),this.tone({freq:1600,endFreq:1200,type:"sine",duration:.08,gain:.03,delay:.07})}snort(){this.noise({duration:.22,gain:.14,type:"bandpass",freq:380,q:.9}),this.tone({freq:105,endFreq:70,type:"sawtooth",duration:.18,gain:.05})}levelComplete(){[392,523.25,659.25,783.99].forEach((t,n)=>{this.tone({freq:t,type:"triangle",duration:.55,gain:.075,delay:n*.11}),this.tone({freq:t*2,type:"sine",duration:.35,gain:.02,delay:n*.11})}),this.tone({freq:98,endFreq:130.8,type:"sine",duration:1.1,gain:.06,delay:.2})}gameOver(){[196,174.6,146.8,110].forEach((t,n)=>{this.tone({freq:t,type:"triangle",duration:.9,gain:.07,delay:n*.22})}),this.tone({freq:55,endFreq:32,type:"sine",duration:1.8,gain:.12,delay:.4})}update(e,t={}){if(this.ctx){if(this.elapsed+=e,this.night=t.night||0,this.inGame=!!t.inGame,this.health=t.health??100,this.ambientGain){const n=this.inGame?.03:.02;this.ambientGain.gain.setTargetAtTime(n,this.ctx.currentTime,.4)}if(this.inGame&&this.night<.55&&this.elapsed>this.nextBird){this.nextBird=this.elapsed+Qi(3.5,9);const n=Qi(1700,3100);this.tone({freq:n,endFreq:n*Qi(1.05,1.35),type:"sine",duration:.09,gain:.018}),this.tone({freq:n*1.1,endFreq:n*.85,type:"sine",duration:.07,gain:.012,delay:.11}),Math.random()<.45&&this.tone({freq:n*1.2,endFreq:n*1.45,type:"sine",duration:.08,gain:.013,delay:.22})}if(this.inGame&&this.night>.45&&this.elapsed>this.nextCricket){this.nextCricket=this.elapsed+Qi(.7,1.8);const n=Qi(3900,4600);for(let s=0;s<3;s++)this.tone({freq:n,type:"sine",duration:.035,gain:.008,delay:s*.06})}if(this.inGame&&this.health<38&&this.elapsed>this.nextHeart){const n=bt((38-this.health)/38,.2,1);this.nextHeart=this.elapsed+1.15-n*.45,this.tone({freq:58,endFreq:42,type:"sine",duration:.16,gain:.07+n*.06}),this.tone({freq:52,endFreq:38,type:"sine",duration:.14,gain:.05+n*.04,delay:.19})}}}}const Dn=500,Xc=[{id:"pine",name:"Pinewood",accent:"#f6b74d",tree:"pine",weather:"clear",density:1,ground:5270333,ground2:3493166,path:7626819,grass:6257989,rock:7040352,foliage:[2904375,3629890,4684362],trunk:4994341,fogDay:10335642,fogNight:727072,skyTopDay:6135490,skyHorizonDay:14082760,skyTopNight:462882,skyHorizonNight:1254451,sunset:15043410,flower:[15918768,15186375,14147744],water:!1,fireflies:!1},{id:"birch",name:"Birch Grove",accent:"#c8dd77",tree:"birch",weather:"clear",density:1.08,ground:7638861,ground2:5270331,path:9074e3,grass:8955994,rock:8092266,foliage:[10469214,11914858,8890702],trunk:15196365,fogDay:13162678,fogNight:1055516,skyTopDay:8239055,skyHorizonDay:14937037,skyTopNight:528927,skyHorizonNight:1451568,sunset:15771496,flower:[16181161,15321042,14411956],water:!1,fireflies:!1},{id:"autumn",name:"Emberwood",accent:"#f08a3e",tree:"broad",weather:"leaves",density:1.05,ground:8020020,ground2:5193767,path:9136706,grass:10189375,rock:7627603,foliage:[13662764,12077610,14721082,10173989],trunk:5979178,fogDay:14070148,fogNight:1708308,skyTopDay:9021885,skyHorizonDay:15778701,skyTopNight:1183002,skyHorizonNight:2759454,sunset:15759930,flower:[15246155,13593149,15910763],water:!1,fireflies:!1},{id:"marsh",name:"Mirefen",accent:"#6fd6c1",tree:"willow",weather:"mist",density:.94,ground:4152394,ground2:2835256,path:6183747,grass:5405263,rock:6120025,foliage:[4156235,5405263,7047762],trunk:4866100,fogDay:8366496,fogNight:662045,skyTopDay:7117733,skyHorizonDay:12899778,skyTopNight:397848,skyHorizonNight:1057830,sunset:14256733,flower:[12572336,14279872,10471349],water:!0,waterPos:[24,-26],waterRadius:12,fireflies:!0},{id:"snow",name:"Frosthush",accent:"#a9d8ef",tree:"pineSnow",weather:"snow",density:.82,ground:14411496,ground2:12176338,path:10394254,grass:10336436,rock:9279387,foliage:[6127469,7180155,8889228],trunk:4865589,fogDay:13162976,fogNight:660512,skyTopDay:7315137,skyHorizonDay:15068912,skyTopNight:463136,skyHorizonNight:1385524,sunset:15312266,flower:[15266546,13886698],water:!1,fireflies:!1},{id:"bamboo",name:"Jade Hollow",accent:"#b9e36a",tree:"bamboo",weather:"clear",density:1.28,ground:6258494,ground2:4612398,path:8220999,grass:8231752,rock:7304546,foliage:[7314239,8827468,10274650],trunk:10137429,fogDay:12046240,fogNight:793108,skyTopDay:8172448,skyHorizonDay:14148279,skyTopNight:464144,skyHorizonNight:1254685,sunset:15119469,flower:[14412448,15918768,12901786],water:!1,fireflies:!0},{id:"deadwood",name:"Ashen Reach",accent:"#b9a7c8",tree:"dead",weather:"fog",density:.92,ground:4934212,ground2:3420975,path:5985609,grass:6711386,rock:6973282,foliage:[6052432,7170653],trunk:3815219,fogDay:9077136,fogNight:854802,skyTopDay:7303043,skyHorizonDay:12694965,skyTopNight:723474,skyHorizonNight:1907236,sunset:12085853,flower:[11049912,12760009],water:!1,fireflies:!1},{id:"glade",name:"Lumen Glade",accent:"#6fe3b0",tree:"broadGlow",weather:"mist",density:1.02,ground:2968117,ground2:1847846,path:3951413,grass:4154440,rock:5002570,foliage:[3105864,4160084,5147229],trunk:3025957,fogDay:5213044,fogNight:463631,skyTopDay:4030324,skyHorizonDay:10406312,skyTopNight:266510,skyHorizonNight:729372,sunset:13732451,flower:[9433282,12645024,8378576],water:!0,waterPos:[-22,20],waterRadius:9,fireflies:!0},{id:"redwood",name:"Titanwood",accent:"#e0a15e",tree:"redwood",weather:"clear",density:.72,ground:5917231,ground2:4076323,path:7166525,grass:7036470,rock:7693396,foliage:[4156218,5208642,6458187],trunk:7025958,fogDay:11569507,fogNight:1182987,skyTopDay:8364462,skyHorizonDay:14467226,skyTopNight:725016,skyHorizonNight:2168851,sunset:15702620,flower:[14267243,13208149],water:!1,fireflies:!0},{id:"fen",name:"Moonfen",accent:"#91b9e8",tree:"willow",weather:"mist",density:.9,ground:3886922,ground2:2505271,path:5200458,grass:5074012,rock:5989736,foliage:[4877660,6061924,7311985],trunk:4078129,fogDay:7046560,fogNight:397083,skyTopDay:4943762,skyHorizonDay:11125455,skyTopNight:330520,skyHorizonNight:859436,sunset:13207920,flower:[12113128,10470105],water:!0,waterPos:[30,18],waterRadius:11,fireflies:!0}],qc=["Whispering","Broken","Hollow","Golden","Crimson","Silent","Frost","Moss","Shadow","Sunken","Wild","Ashen","Elder","Blood","Moon","Thorn","Amber","Dusk","Iron","Lost","Pale","Raven","Sable","Gilded","Hushed","Briar"],Yc=["Pines","Grove","Reach","Hollow","Fen","Thicket","Glade","Ridge","Wilds","Copse","Timber","Mire","Boughs","Crossing","Hush","Verge","Warren","Rise","Trail","Heart","Falls","Barrens","Cradle","Run"],$c=[.3,.38,.47,.56,.64,.72,.82,.22];function i_(i){const e=bt(Math.floor(i),1,Dn);return Xc[(e-1)%Xc.length]}function Na(i){const e=bt(Math.floor(i),1,Dn),t=(Bg(`feral-${e}`)^e*2654435761)>>>0,n=qt(t),s=i_(e),r=qc[(e*7+(e>>3))%qc.length],a=Yc[(e*11+(e>>2)+3)%Yc.length],o=e===1?"Whispering Pines":e===500?"The Last Wood":`${r} ${a}`,c=($c[(e-1)%$c.length]+n.range(-.012,.012)+1)%1,u=150+e%6*12;let h=s.weather;s.id!=="snow"&&e%7===0?h="rain":s.id!=="snow"&&e%11===0?h="fog":e%13===0&&s.id!=="snow"&&(h="leaves");const d=Math.min(10,3+Math.floor((e-1)/22)),m=Math.min(4,1+Math.floor((e-1)/45)),_=e%25===0,v=!_&&e%5===0,f=["rabbit","rabbit","rabbit"];e>=4&&f.push("deer"),e>=12&&f.push("rabbit","deer"),e>=30&&f.push("deer");const p=["boar"];e>=5&&p.push("rival"),e>=9&&p.push("rival","boar"),e>=20&&p.push("rival"),e>=40&&p.push("bear");const x=1+Math.min(2.6,(e-1)*.0052),E=1+Math.min(2.2,(e-1)*.0044),b=1+Math.min(.48,(e-1)*.0011);return{level:e,seed:t,biome:s,name:o,startTime:c,cycleDuration:u,weather:h,eatGoal:d,killGoal:m,boss:_,alpha:v,alphaType:_?"bear":v?"alphaWolf":null,preyPool:f,predatorPool:p,hpMul:x,dmgMul:E,speedMul:b,nightDrain:.5}}const eu="feral500.save.v1",fo={unlocked:1,current:1,cleared:0,eaten:0,kills:0,best:1,health:100,sound:!0,tilt:!1,quality:"auto"};function s_(){try{const i=localStorage.getItem(eu);if(!i)return{...fo};const e=JSON.parse(i);return{...fo,...e,unlocked:bt(Number(e.unlocked)||1,1,Dn),current:bt(Number(e.current)||1,1,Dn),cleared:bt(Number(e.cleared)||0,0,Dn),eaten:Math.max(0,Number(e.eaten)||0),kills:Math.max(0,Number(e.kills)||0),best:bt(Number(e.best)||1,1,Dn),health:bt(Number(e.health)||100,1,100),sound:e.sound!==!1,tilt:!!e.tilt,quality:["auto","high","low"].includes(e.quality)?e.quality:"auto"}}catch{return{...fo}}}function In(i){try{localStorage.setItem(eu,JSON.stringify(i))}catch{}}const Me=i=>document.querySelector(i),tu=i=>Array.from(document.querySelectorAll(i)),_a=window.matchMedia?.("(pointer: coarse)").matches??!1,yr=_a||window.innerWidth<820,oe={app:Me("#app"),stage:Me("#stage"),hud:Me("#hud"),title:Me("#title-screen"),levels:Me("#levels-screen"),howto:Me("#howto-screen"),pause:Me("#pause-screen"),complete:Me("#complete-screen"),gameover:Me("#gameover-screen"),screens:tu(".screen"),lifeFill:Me("#life-fill"),lifeGhost:Me("#life-ghost"),lifeText:Me("#life-text"),hudLevel:Me("#hud-level"),hudBiome:Me("#hud-biome"),hudWeather:Me("#hud-weather"),hudTime:Me("#hud-time"),hudClock:Me("#hud-clock"),hudHunger:Me("#hud-hunger"),objEat:Me("#obj-eat"),objKill:Me("#obj-kill"),objEatCount:Me("#obj-eat-count"),objKillCount:Me("#obj-kill-count"),minimap:Me("#minimap"),btnPaw:Me("#btn-paw"),btnBite:Me("#btn-bite"),btnSprint:Me("#btn-sprint"),joystick:Me("#joystick"),joystickKnob:Me(".joystick-knob"),feedPrompt:Me("#feed-prompt"),feedRingFill:Me("#feed-ring-fill"),banner:Me("#level-banner"),bannerKicker:Me("#banner-kicker"),bannerLevel:Me("#banner-level"),bannerName:Me("#banner-name"),bannerMeta:Me("#banner-meta"),toast:Me("#toast"),hudTip:Me("#hud-tip"),hurtFlash:Me("#hurt-flash"),lowHealth:Me("#low-health"),bloodDrops:Me("#blood-drops"),btnSound:Me("#btn-sound"),titleSound:Me("#title-sound"),btnPause:Me("#btn-pause"),btnPlay:Me("#btn-play"),btnLevels:Me("#btn-levels"),btnHowto:Me("#btn-howto"),levelGrid:Me("#level-grid"),levelProgressBar:Me("#level-progress-bar"),levelProgressText:Me("#level-progress-text"),btnJumpCurrent:Me("#btn-jump-current"),btnResume:Me("#btn-resume"),btnResumeX:Me("#btn-resume-x"),btnRestart:Me("#btn-restart"),btnQuit:Me("#btn-quit"),btnSettingSound:Me("#btn-setting-sound"),btnSettingTilt:Me("#btn-setting-tilt"),btnSettingQuality:Me("#btn-setting-quality"),switchSound:Me("#switch-sound"),switchTilt:Me("#switch-tilt"),qualityValue:Me("#quality-value"),btnNext:Me("#btn-next"),btnCompleteDen:Me("#btn-complete-den"),btnRetry:Me("#btn-retry"),btnGameoverDen:Me("#btn-gameover-den"),completeLevel:Me("#complete-level"),completeEaten:Me("#complete-eaten"),completeKills:Me("#complete-kills"),completeTime:Me("#complete-time"),completeLife:Me("#complete-life"),completeLifeBar:Me("#complete-life-bar"),completeFoot:Me("#complete-foot"),gameoverLevel:Me("#gameover-level"),gameoverEaten:Me("#gameover-eaten"),gameoverKills:Me("#gameover-kills"),gameoverBest:Me("#gameover-best"),deathQuote:Me("#death-quote"),statLevel:Me("#stat-level"),statEaten:Me("#stat-eaten"),statKills:Me("#stat-kills"),continueLine:Me("#continue-line"),rotateHint:Me("#rotate-hint"),touchHint:Me("#touch-hint"),bootError:Me("#boot-error"),bootErrorText:Me("#boot-error-text")};let Un;try{Un=new Ug({antialias:!yr,powerPreference:"high-performance",alpha:!1,stencil:!1})}catch(i){throw iu("This browser could not start WebGL. Try an up-to-date Chrome, Safari or Firefox."),i}Un.setPixelRatio(Math.min(window.devicePixelRatio||1,yr?2:1.8));Un.setSize(window.innerWidth,window.innerHeight);Un.shadowMap.enabled=!0;Un.shadowMap.type=ir;Un.toneMapping=ul;Un.toneMappingExposure=1.06;Un.outputColorSpace=tn;oe.stage.appendChild(Un.domElement);const Si=new xd;Si.background=new Ue(463115);const Xt=new zn(yr?68:62,window.innerWidth/window.innerHeight,.1,420);Xt.position.set(4,3,6);const ai=jh({palette:Qh,harness:!0,scale:1}),xn=ai.root;Si.add(xn);const nu=new Bd(10475775,1.35,4.6,2);nu.position.set(0,1.9,-1.05);xn.add(nu);const Nn=new t_(Si),zs=new F(0,1,0),K={position:new F(0,0,0),heading:0,health:100,speed:0},ss={world:null,camera:Xt,animals:[],hurtPlayer:(...i)=>m_(...i)};let pe=s_(),Bt=new n_(pe.sound),ft="boot",Ie=Na(pe.current||1),nt=null,kt=[],un=0,tr=0,la=.65,ws=0,_i=Ie.startTime,rs=0,as=0,Di=0,rr=0,fr=0,As=0,ol=!1,ca="",xa=0,pr=!1,mr=!1,wn=Math.PI,vi=.2,gr=-99,po=0,Kc=null,Zc=null,Jc=null,Qc=null,va=null,Ni=[],ji=[],ar=0,ea=0,Wi=0,Mi=0,es=100,mo=0,ks=qt(1),jt={active:!1,id:null,originX:0,originY:0,x:0,y:0},nn={active:!1,id:null,lastX:0,lastY:0},hn={enabled:!1,zero:null,x:0,y:0},Cn=Object.create(null),gn={x:0,y:0,sprint:!1};function iu(i){oe.bootError&&(oe.bootErrorText.textContent=i,oe.bootError.classList.remove("hidden"))}function jc(i,e){const t=i?.querySelector("use");t&&t.setAttribute("href",`#${e}`)}function Al(){const i=pe.sound?"i-sound":"i-mute";jc(oe.btnSound,i),jc(oe.titleSound,i),oe.switchSound?.classList.toggle("on",pe.sound)}function Rs(){oe.switchTilt?.classList.toggle("on",!!pe.tilt)}function Rl(){oe.qualityValue&&(oe.qualityValue.textContent=String(pe.quality||"auto").toUpperCase())}function zi(){for(const i of oe.screens)i.classList.add("hidden")}function hs(i){zi();const e=document.getElementById(i);e&&e.classList.remove("hidden")}function br(i){oe.hud.classList.toggle("hidden",!i)}function su(){oe.statLevel.textContent=String(pe.current||1),oe.statEaten.textContent=String(pe.eaten||0),oe.statKills.textContent=String(pe.kills||0);const i=Na(pe.current||1);oe.continueLine.innerHTML=pe.unlocked>1?`Continue at <b>Level ${i.level} · ${i.biome.name}</b>`:`Begin at <b>Level 1 · ${i.biome.name}</b>`}function ru(i){return{clear:"Clear",mist:"Mist",fog:"Fog",rain:"Rain",snow:"Snow",leaves:"Falling Leaves"}[i]||"Clear"}function $n(i,e="",t=2200){clearTimeout(Kc),oe.toast.textContent=i,oe.toast.className=`toast ${e}`.trim(),oe.toast.classList.remove("hidden"),Kc=setTimeout(()=>oe.toast.classList.add("hidden"),t)}function Cl(i,e=3400){clearTimeout(Zc),oe.hudTip.textContent=i,oe.hudTip.classList.add("show"),Zc=setTimeout(()=>oe.hudTip.classList.remove("show"),e)}function r_(){clearTimeout(Jc);const i=Ia(Ie.startTime);oe.bannerKicker.textContent=Ie.level===1?"THE HUNT BEGINS":Ie.level===500?"THE LAST WOOD":Ie.boss?"AN OLD TERROR STIRS":Ie.alpha?"A RIVAL HAS SCENTED YOU":"THE WOODS REMEMBER",oe.bannerLevel.textContent=`LEVEL ${Ie.level}`,oe.bannerName.textContent=Ie.name,oe.bannerMeta.textContent=`${i.label.toUpperCase()} · ${ru(Ie.weather).toUpperCase()}`,oe.banner.classList.remove("hidden"),Jc=setTimeout(()=>oe.banner.classList.add("hidden"),2800)}function au(){oe.hudLevel.textContent=`LEVEL ${Ie.level}`,oe.hudBiome.textContent=Ie.biome.name,oe.hudWeather.textContent=ru(Ie.weather)}function a_(){if(!oe.levelGrid)return;oe.levelGrid.innerHTML="";const i=document.createDocumentFragment(),e=pe.current||1;va=null;for(let n=1;n<=Dn;n++){const s=Na(n),r=n<=pe.unlocked,a=n<=pe.cleared,o=document.createElement("button");o.type="button",o.className=`level-cell ${r?"unlocked":"locked"}${n===e?" current":""}${a?" cleared":""}`,o.setAttribute("aria-label",r?`Level ${n}: ${s.name}`:`Level ${n} locked`);const l=Ia(s.startTime),c=s.boss?"boss":l.id==="night"?"night":"";o.innerHTML=`<span class="cell-dot ${c}"></span><b>${n}</b><small>${s.biome.name.split(" ")[0]}</small>`,r?o.addEventListener("click",()=>{Bt.click(),zi(),Is(n)}):(o.disabled=!0,o.title="Clear earlier woods to unlock"),n===e&&(va=o),i.appendChild(o)}oe.levelGrid.appendChild(i);const t=bt(pe.unlocked/Dn*100,1,100);oe.levelProgressBar.style.width=`${t}%`,oe.levelProgressText.textContent=`${pe.unlocked} / ${Dn} unlocked`}function o_(){a_(),hs("levels-screen"),va&&setTimeout(()=>va.scrollIntoView({block:"center",behavior:"smooth"}),60)}function l_(){hs("howto-screen")}function c_(i){document.getElementById(i)&&(i==="levels-screen"||i==="howto-screen"?hs("title-screen"):i==="pause-screen"&&Sa())}function Er(){for(const i of kt)Si.remove(i.root),i.dispose();kt=[],ss.animals=kt}function ou(i){Ie=Na(i),nt&&(nt.dispose(),nt=null),Er(),Nn.clear(),nt=Yg(Si,Ie,{quality:pe.quality,isMobile:yr}),ss.world=nt,ks=qt(Ie.seed^39706),K.position.set(0,nt.heightAt(0,0),0),K.heading=0,xn.position.copy(K.position),xn.rotation.y=0,xn.visible=!0,_i=Ie.startTime,nt.setTime(_i,K.position),wn=Math.PI,vi=.2,Ua(),au()}function Ma(i,e,t=ks){for(let r=0;r<40;r++){const a=t.range(0,He),o=t.range(i,e),l=Math.cos(a)*o,c=Math.sin(a)*o;if(Math.hypot(l,c)>89||nt.pond&&Math.hypot(l-nt.pond.x,c-nt.pond.z)<nt.pond.r+2.2)continue;let u=!1;for(const d of nt.colliders)if(Math.hypot(l-d.x,c-d.z)<d.r+1){u=!0;break}if(u)continue;let h=!1;for(const d of kt)if(Math.hypot(l-d.position.x,c-d.position.z)<2.4){h=!0;break}if(!h)return{x:l,z:c}}const n=t.range(0,He),s=t.range(i,e);return{x:Math.cos(n)*s,z:Math.sin(n)*s}}function Gi(i,e,t={}){const n=new jg(i,Ie,e,{rng:t.rng||qt(Math.floor(ks.next()*1e9)),alpha:!!t.alpha,heading:ks.range(0,He)});return n.addTo(Si),kt.push(n),ss.animals=kt,n}function h_(){Er();const i=qt(Ie.seed^7842355),e=Math.min(13,Ie.eatGoal+3);for(let n=0;n<e;n++){const s=i.pick(Ie.preyPool);Gi(s,Ma(15,39,i),{rng:qt(Math.floor(i.next()*1e9))})}const t=[];for(Ie.alphaType&&t.push(Ie.alphaType);t.length<Ie.killGoal;)t.push(i.pick(Ie.predatorPool));t.forEach((n,s)=>{Gi(n,Ma(22,46,i),{alpha:s===0&&!!Ie.alphaType,rng:qt(Math.floor(i.next()*1e9))})})}function eh(){Er();const i=qt(Ie.seed^4660);Gi("rabbit",{x:i.range(-8,8),z:i.range(5,12)},{rng:i}),Gi("rabbit",{x:i.range(-11,-4),z:i.range(-6,2)},{rng:i}),Ie.level>3&&Gi("deer",{x:i.range(5,12),z:i.range(-9,-3)},{rng:i})}function Ua(){const i=Math.cos(vi)*6.5;Xt.position.set(K.position.x+Math.sin(wn)*i,K.position.y+2+Math.sin(vi)*6.5,K.position.z+Math.cos(wn)*i),zs.set(K.position.x,K.position.y+1.05,K.position.z),Xt.lookAt(zs)}function Is(i){Bt.ensure(),(!nt||Ie.level!==i)&&ou(i),ft="playing",zi(),br(!0),Er(),Nn.clear(),Ni=[],ji=[],pr=!1,xa=0,mr=!1,rs=0,as=0,Di=0,fr=0,ar=0,ws=0,Wi=0,Mi=0,es=K.health=bt(pe.health||100,55,100),ol=!1,ca="",_i=Ie.startTime,K.position.set(0,nt.heightAt(0,0),0),K.heading=0,xn.position.copy(K.position),xn.rotation.y=0,xn.visible=!0,ai.root.visible=!0,wn=Math.PI,vi=.2,Ua(),h_(),nt.setTime(_i,K.position),au(),_r(),fu(.016),pe.current=i,pe.unlocked=Math.max(pe.unlocked,i),pe.best=Math.max(pe.best||1,i),pe.health=K.health,In(pe),r_(),Cl(_a?"Left side to move · drag right to look · PAW and BITE to hunt":"WASD to move · J paw · K bite · Shift to sprint",5200),Bt.inGame=!0}function nr(){(ft==="playing"||ft==="paused"||ft==="complete"||ft==="gameover")&&(pe.health=bt(K.health||pe.health,1,100),In(pe)),ft="title",Bt.inGame=!1,br(!1),hs("title-screen"),!nt||Ie.level!==pe.current?(ou(pe.current),eh()):(Er(),Nn.clear(),eh(),K.position.set(0,nt.heightAt(0,0),0),K.heading=0,xn.position.copy(K.position),xn.rotation.y=0,wn=Math.PI,vi=.2,Ua()),su(),Al(),Rs(),Rl(),tr=0,la=.65}function th(){pe.health=72,Is(Ie.level)}function ll(){ft==="playing"&&(ft="paused",pe.health=bt(K.health,1,100),In(pe),hs("pause-screen"),Al(),Rs(),Rl())}function Sa(){ft==="paused"&&(ft="playing",zi(),br(!0),Ea=performance.now())}function lu(){mr||ft!=="playing"||(mr=!0,ft="complete",pe.health=bt(K.health+25,1,100),pe.cleared=Math.max(pe.cleared,Ie.level),pe.unlocked=Math.max(pe.unlocked,Math.min(Dn,Ie.level+1)),pe.best=Math.max(pe.best||1,Ie.level),pe.current=Math.min(Dn,Ie.level+1),In(pe),Bt.levelComplete(),oe.completeLevel.textContent=`LEVEL ${Ie.level} · ${Ie.biome.name.toUpperCase()}`,oe.completeEaten.textContent=String(cu()),oe.completeKills.textContent=String(hu()),oe.completeTime.textContent=Hg(ws),oe.completeLife.textContent=`${Math.round(pe.health)} / 100`,oe.completeLifeBar.style.width=`${pe.health}%`,oe.completeFoot.textContent=Ie.level===500?"The last wood is quiet. You are the thing it fears.":Ie.level%25===0?"The old terror falls. Deeper woods wait.":"The trees close behind you.",oe.btnNext.querySelector("span").textContent=Ie.level>=Dn?"Return to Den":"Next level",hs("complete-screen"),br(!0),su())}function Pl(i="starved"){ft==="playing"&&(ft="gameover",pe.health=72,pe.current=Ie.level,In(pe),Bt.gameOver(),oe.gameoverLevel.textContent=`LEVEL ${Ie.level} · ${Ie.biome.name.toUpperCase()}`,oe.gameoverEaten.textContent=String(cu()),oe.gameoverKills.textContent=String(hu()),oe.gameoverBest.textContent=String(pe.best||pe.unlocked||1),oe.deathQuote.textContent=i==="mauled"?"“The woods did not kill you. Something with teeth did.”":"“You stopped feeding. The forest noticed.”",hs("gameover-screen"),br(!0))}function cu(){return Wi}function hu(){return Mi}function u_(){pe.health=bt(K.health||pe.health,1,100),(ft==="playing"||ft==="paused"||ft==="complete"||ft==="gameover")&&(pe.current=Ie.level),In(pe)}function uu(){let i=gn.x,e=gn.y;(Cn.w||Cn.arrowup)&&(e+=1),(Cn.s||Cn.arrowdown)&&(e-=1),(Cn.a||Cn.arrowleft)&&(i-=1),(Cn.d||Cn.arrowright)&&(i+=1),hn.enabled&&!jt.active&&(i+=hn.x*.9,e+=hn.y*.9);const t=Math.hypot(i,e);return t>1&&(i/=t,e/=t),{x:i,y:e,len:Math.min(1,t),sprint:gn.sprint||!!Cn.shift}}function ya(i){if(ft==="playing"){if(i==="paw"){if(rs>0)return;rs=.48,ai.triggerPaw(),Bt.paw(),Nn.slash(K.position,K.heading,14221296),xr(.06),Ni.push({time:.1,kind:"paw"})}else{if(as>0)return;as=.9,ai.triggerBite(),Bt.bite(),Nn.slash(K.position,K.heading,16765562),xr(.11),ar=.18,Ni.push({time:.17,kind:"bite"})}Ll(12)}}function d_(i){const e=new F(Math.sin(K.heading),0,Math.cos(K.heading)),t=i==="bite",n=t?30+Math.min(80,Ie.level*.16):16+Math.min(42,Ie.level*.084),s=t?2.85:2.95,r=t?.92:1.18;let a=!1;for(const o of[...kt]){if(o.dead||o.consumed)continue;const l=o.position.x-K.position.x,c=o.position.z-K.position.z;if(Math.hypot(l,c)>s+o.radius)continue;const h=Math.atan2(l,c);if(Math.abs(Jh(h-K.heading))>r)continue;const d=t&&o.isPrey,m=o.takeDamage(n,{instant:d}),_=new F(o.position.x,o.position.y+o.bodyCenter+.15,o.position.z);Nn.blood(_,e,t?1.35:.9),Nn.sparks(_,t?16765562:14221296),Nn.decal(o.position,o.radius*1.2),Bt.hit(t),xr(t?.2:.1),vr(`-${Math.round(m.damage)}`,_,t?"crit":"damage"),a=!0,m.killed&&f_(o,d)}a?Ll(t?[16,20,16]:10):Nn.dust(K.position,Ie.biome.ground)}function f_(i,e){Nn.blood(new F(i.position.x,i.position.y+i.bodyCenter,i.position.z),null,i.isPrey?1.2:1.6),Nn.decal(i.position,i.radius*1.9),i.isPrey?(Bt.squeak(),e||Cl("Devour the kill to feed your life",2400)):(Mi++,pe.kills=(pe.kills||0)+1,pe.best=Math.max(pe.best||1,Ie.level),Bt.growl(),xr(.22),vr("FELLED",new F(i.position.x,i.position.y+i.bodyCenter+.7,i.position.z),"small"),_r()),e&&i.isPrey&&ji.push({animal:i,timer:.24}),ba()}function du(i){if(!i||!i.consume())return;const e=i.meat;K.health=Math.min(100,K.health+e),pe.health=K.health,i.isPrey?(Wi++,pe.eaten=(pe.eaten||0)+1,vr(`+${e} LIFE`,new F(K.position.x,K.position.y+1.65,K.position.z),"life")):vr(`+${e} LIFE`,new F(K.position.x,K.position.y+1.65,K.position.z),"life"),Bt.eat(),Nn.blood(new F(i.position.x,i.position.y+.35,i.position.z),null,1.1),Di=0,oe.feedPrompt.classList.add("hidden"),_r(),ba()}function ba(){mr||pr||Wi>=Ie.eatGoal&&Mi>=Ie.killGoal&&(pr=!0,xa=1.05,$n("The wood is yours. Move deeper.","warn",2100))}function _r(){oe.objEatCount.textContent=`${Math.min(Wi,Ie.eatGoal)} / ${Ie.eatGoal}`,oe.objKillCount.textContent=`${Math.min(Mi,Ie.killGoal)} / ${Ie.killGoal}`,oe.objEat.classList.toggle("done",Wi>=Ie.eatGoal),oe.objKill.classList.toggle("done",Mi>=Ie.killGoal)}function xr(i){As=Math.max(As,i)}function Ll(i){try{navigator.vibrate&&navigator.vibrate(i)}catch{}}function p_(){oe.hurtFlash.classList.add("on"),setTimeout(()=>oe.hurtFlash.classList.remove("on"),110);for(let i=0;i<4;i++){const e=document.createElement("span");e.className="blood-drop",e.style.left=`${8+Math.random()*84}%`,e.style.top=`${8+Math.random()*18}%`,e.style.animationDelay=`${Math.random()*.18}s`,e.style.transform=`scale(${.7+Math.random()*1.1})`,oe.bloodDrops.appendChild(e),setTimeout(()=>e.remove(),1500)}}function m_(i,e){if(!(ft!=="playing"||fr>0||K.health<=0)){if(fr=.78,K.health=Math.max(0,K.health-i),pe.health=K.health,ai.triggerHurt(),xr(.45),p_(),Bt.hurt(),Ll([30,30,50]),vr(`-${Math.round(i)}`,new F(K.position.x,K.position.y+1.75,K.position.z),"damage"),e?.position){const t=K.position.x-e.position.x,n=K.position.z-e.position.z,s=Math.hypot(t,n)||1;K.position.x+=t/s*1.15,K.position.z+=n/s*1.15}K.health<=0&&Pl("mauled")}}function g_(i){let e=null,t=2.7;for(const s of kt){if(!s.dead||!s.edible||s.consumed)continue;const r=Zh(K.position.x,K.position.z,s.position.x,s.position.z);r<t&&(t=r,e=s)}if(!e){Di=Math.max(0,Di-i*2),oe.feedPrompt.classList.add("hidden");return}oe.feedPrompt.classList.remove("hidden");const n=K.speed<1.2?1:.45;Di=Math.min(1,Di+i*n/.9),ai.triggerFeed(),oe.feedRingFill.style.strokeDashoffset=String(94.2*(1-Di)),rr-=i,rr<=0&&(Bt.eat(),rr=.42),Di>=1&&du(e)}function __(i){if(pr||mr||(or-=i,or>0))return;if(or=2.6,kt.filter(n=>n.isPrey&&!n.dead&&!n.consumed).length<4&&Wi<Ie.eatGoal){const n=qt(Math.floor(ks.next()*1e9)),s=n.pick(Ie.preyPool);Gi(s,Ma(25,46,n),{rng:n});return}if(kt.filter(n=>!n.isPrey&&!n.dead&&!n.consumed).length<Ie.killGoal-Mi&&Mi<Ie.killGoal){const n=qt(Math.floor(ks.next()*1e9)),s=n.pick(Ie.predatorPool);Gi(s,Ma(28,48,n),{rng:n})}}let or=0,ta=0;function x_(i){for(let e=kt.length-1;e>=0;e--){const t=kt[e];t.update(i,un,{position:K.position,night:nt.nightAmount},ss),(t.gone||t.consumed)&&(Si.remove(t.root),t.dispose(),kt.splice(e,1),ss.animals=kt)}}function v_(i){if(ft!=="playing")return;if(K.speed>1.2&&un-gr>1.9){const h=uu();h.y>.42&&Math.abs(h.x)<.42&&(wn=qn(wn,K.heading+Math.PI,1.7,i))}const e=Math.cos(vi)*6.5,t=K.position.x+Math.sin(wn)*e,n=K.position.z+Math.cos(wn)*e;let s=K.position.y+2+Math.sin(vi)*6.5;if(nt){const h=nt.heightAt(t,n);s=Math.max(s,h+.85)}const r=1-Math.exp(-9*i);Xt.position.x=gi(Xt.position.x,t,r),Xt.position.y=gi(Xt.position.y,s,r),Xt.position.z=gi(Xt.position.z,n,r);const a=Math.sin(K.heading),o=Math.cos(K.heading),l=new F(K.position.x+a*1.55,K.position.y+1.05,K.position.z+o*1.55);zs.lerp(l,1-Math.exp(-10*i));const c=(Math.random()-.5)*As,u=(Math.random()-.5)*As*.6;Xt.position.x+=c,Xt.position.y+=u,Xt.lookAt(zs),As=Kh(As,0,7,i)}function M_(i){if(ft!=="playing")return;ws+=i,_i=(Ie.startTime+ws/Ie.cycleDuration)%1,nt.setTime(_i,K.position),nt.update(i,un,K.position),fr=Math.max(0,fr-i),rs=Math.max(0,rs-i),as=Math.max(0,as-i),ar=Math.max(0,ar-i),or=Math.max(0,or-i),ta=Math.max(0,ta-i),rr=Math.max(0,rr-i);for(let f=Ni.length-1;f>=0;f--)Ni[f].time-=i,Ni[f].time<=0&&(d_(Ni[f].kind),Ni.splice(f,1));for(let f=ji.length-1;f>=0;f--)ji[f].timer-=i,ji[f].timer<=0&&(du(ji[f].animal),ji.splice(f,1));if(pr&&(xa-=i,xa<=0)){lu();return}const e=uu(),t=e.len>.055,n=e.sprint&&t,s=n?8.7:5.4;let r=t?s*e.len:0;ai.feeding&&(r*=.42);const a=-Math.sin(wn),o=-Math.cos(wn),l=Math.cos(wn),c=-Math.sin(wn);let u=a*e.y+l*e.x,h=o*e.y+c*e.x;const d=Math.hypot(u,h);if(d>.001&&(u/=d,h/=d),t){const f=Math.atan2(u,h);K.heading=qn(K.heading,f,12,i)}K.speed=r,r>.01&&(K.position.x+=Math.sin(K.heading)*r*i,K.position.z+=Math.cos(K.heading)*r*i),ar>0&&(K.position.x+=Math.sin(K.heading)*4.2*i,K.position.z+=Math.cos(K.heading)*4.2*i);for(const f of nt.colliders){const p=K.position.x-f.x,x=K.position.z-f.z,E=.48+f.r,b=Math.hypot(p,x);b>.001&&b<E&&(K.position.x+=p/b*(E-b),K.position.z+=x/b*(E-b))}for(const f of kt){if(f.dead||f.consumed)continue;const p=K.position.x-f.position.x,x=K.position.z-f.position.z,E=.46+f.radius,b=Math.hypot(p,x);b>.001&&b<E&&(K.position.x+=p/b*(E-b)*.55,K.position.z+=x/b*(E-b)*.55)}const m=Math.hypot(K.position.x,K.position.z);m>93&&(K.position.x=K.position.x/m*93,K.position.z=K.position.z/m*93),K.position.y=nt.heightAt(K.position.x,K.position.z),xn.position.copy(K.position),xn.rotation.y=K.heading;const _=bt(r/s,0,1.2);if(ai.update(i,un,{speed:_,sprint:n,night:nt.nightAmount,lookYaw:Math.sin(un*.4)*.08}),t&&ta<=0){Bt.footstep(n);const f=Math.sin(un*9)>0?1:-1;Nn.dust(new F(K.position.x+Math.sin(K.heading)*.5-Math.cos(K.heading)*f*.22,K.position.y+.08,K.position.z+Math.cos(K.heading)*.5+Math.sin(K.heading)*f*.22),Ie.biome.ground),ta=n?.2:.33}if(x_(i),__(i),g_(i),ws>2.4){const f=nt.nightAmount,p=.22+Ie.level*35e-5+(n?.52:0)+f*.23;if(K.health=Math.max(0,K.health-p*i),pe.health=K.health,K.health<=0){Pl("starved");return}}!ol&&K.health<30&&(ol=!0,$n("You are starving. Devour prey to survive.","bad",3e3),Cl("Stand over a kill to feed. Life drains faster at night.",4200)),v_(i),fu(i);const v=Ia(_i);v.id!==ca&&(ca&&ws>3&&$n(v.id==="night"?"Night falls. The predators grow bold.":`${v.label} breaks over the wood.`,v.id==="night"?"warn":"",2400),ca=v.id),po+=i,po>5&&(po=0,pe.health=bt(K.health,1,100),pe.current=Ie.level,In(pe)),Bt.update(i,{night:nt.nightAmount,health:K.health,inGame:!0})}const S_={position:new F(0,0,1e3),night:0};function y_(i){if(ft!=="title")return;tr+=i,la+=i*.075,nt.setTime((Ie.startTime+tr*9e-4)%1,K.position),nt.update(i,un,K.position),ai.update(i,un,{speed:0,sprint:!1,night:nt.nightAmount,lookYaw:Math.sin(tr*.35)*.32}),xn.position.copy(K.position),xn.rotation.y=0;for(let r=kt.length-1;r>=0;r--){const a=kt[r];a.update(i,un,S_,ss),(a.gone||a.consumed)&&(Si.remove(a.root),a.dispose(),kt.splice(r,1),ss.animals=kt)}const e=6.7,t=new F(K.position.x+Math.sin(la)*e,K.position.y+2.35+Math.sin(tr*.45)*.12,K.position.z+Math.cos(la)*e);Xt.position.lerp(t,1-Math.exp(-3.4*i));const n=window.innerWidth<720,s=new F(K.position.x-(n?2.8:1),K.position.y+(n?-.25:.95),K.position.z);zs.lerp(s,1-Math.exp(-3.8*i)),Xt.lookAt(zs),Bt.update(i,{night:nt.nightAmount,health:100,inGame:!1})}const b_=oe.minimap?oe.minimap.getContext("2d"):null;function vr(i,e,t=""){if(!e||ea>18)return;const n=e.clone().project(Xt);if(n.z>1.1||n.z<-1)return;const s=(n.x*.5+.5)*window.innerWidth,r=(-n.y*.5+.5)*window.innerHeight;if(s<-80||s>window.innerWidth+80||r<-60||r>window.innerHeight+60)return;const a=document.createElement("span");a.className=`float-text ${t}`.trim(),a.textContent=i,a.style.left=`${s}px`,a.style.top=`${r}px`,oe.app.appendChild(a),ea++,window.setTimeout(()=>{a.remove(),ea=Math.max(0,ea-1)},1150)}function E_(){const i=b_;if(!i||!nt||!oe.minimap)return;const e=oe.minimap.width,t=oe.minimap.height,n=e/2,s=t/2,a=(e/2-5)/72;i.setTransform(1,0,0,1,0,0),i.clearRect(0,0,e,t),i.save(),i.beginPath(),i.arc(n,s,e/2-1,0,He),i.clip();const o=i.createRadialGradient(n,s,2,n,s,e/2);if(o.addColorStop(0,"rgba(29,60,39,0.94)"),o.addColorStop(.65,"rgba(16,37,24,0.92)"),o.addColorStop(1,"rgba(5,14,9,0.96)"),i.fillStyle=o,i.fillRect(0,0,e,t),i.translate(n,s),nt.pond){const l=(nt.pond.x-K.position.x)*a,c=(nt.pond.z-K.position.z)*a;Math.hypot(l,c)<e/2+nt.pond.r*a&&(i.beginPath(),i.arc(l,c,nt.pond.r*a,0,He),i.fillStyle="rgba(42,92,104,0.72)",i.fill())}i.fillStyle="rgba(122,150,100,0.42)";for(const l of nt.colliders){const c=(l.x-K.position.x)*a,u=(l.z-K.position.z)*a;if(c*c+u*u>(e/2+8)*(e/2+8))continue;const h=Math.max(.7,l.r*a*.55);i.beginPath(),i.arc(c,u,h,0,He),i.fill()}for(const l of kt){if(l.consumed)continue;const c=(l.position.x-K.position.x)*a,u=(l.position.z-K.position.z)*a;if(!(c*c+u*u>(e/2-2)*(e/2-2))){if(l.dead){i.fillStyle="rgba(246,183,77,0.9)",i.fillRect(c-1.5,u-1.5,3,3);continue}i.fillStyle=l.isPrey?"#9adf77":l.isAlpha?"#ffcf5c":"#ff6b54",i.beginPath(),l.isPrey?(i.arc(c,u,1.9,0,He),i.fill()):(i.moveTo(c,u-2.7),i.lineTo(c+2.2,u+2.2),i.lineTo(c-2.2,u+2.2),i.closePath(),i.fill())}}i.save(),i.rotate(Math.PI-K.heading),i.fillStyle="#f4f0e2",i.beginPath(),i.moveTo(0,-5.6),i.lineTo(3.7,4.5),i.lineTo(0,2.6),i.lineTo(-3.7,4.5),i.closePath(),i.fill(),i.restore(),i.restore(),i.beginPath(),i.arc(n,s,e/2-1,0,He),i.strokeStyle="rgba(220,236,218,0.2)",i.lineWidth=2,i.stroke()}function fu(i=.016){if(!oe.lifeFill)return;const e=bt(K.health,0,100),t=e/100;oe.lifeFill.style.transform=`scaleX(${t})`,e>=es?es=e:es=Kh(es,e,2.6,i),oe.lifeGhost.style.transform=`scaleX(${Math.max(t,es/100)})`,oe.lifeFill.classList.toggle("mid",e<=55&&e>25),oe.lifeFill.classList.toggle("low",e<=25),oe.lifeText.textContent=String(Math.ceil(e));const n=Ia(_i),s=oe.hudTime?.querySelector("use");s&&s.setAttribute("href",`#i-${n.icon}`);const r=oe.hudTime?.querySelector("b");r&&(r.textContent=n.label),oe.hudClock&&(oe.hudClock.textContent=Gg(_i));const a=e>68?"Well fed":e>42?"Hungry":e>20?"Starving":"Dying";oe.hudHunger.textContent=a,oe.hudHunger.classList.toggle("warn",e<=42&&e>20),oe.hudHunger.classList.toggle("danger",e<=20),oe.lowHealth.classList.toggle("on",e<=25&&ft==="playing"),oe.btnPaw.style.setProperty("--cd",`${bt(rs/.48,0,1)*100}%`),oe.btnBite.style.setProperty("--cd",`${bt(as/.9,0,1)*100}%`),oe.btnPaw.classList.toggle("cooling",rs>.02),oe.btnBite.classList.toggle("cooling",as>.02),oe.btnSprint.classList.toggle("active",gn.sprint||!!Cn.shift),mo-=i,mo<=0&&(mo=.1,E_())}function ha(i){pe.sound=!pe.sound,Bt.setEnabled(pe.sound),pe.sound&&Bt.ensure(),In(pe),Al(),pe.sound?$n("Sound on","",1400):$n("Sound muted","",1400)}function T_(){const i=["auto","high","low"],e=i.indexOf(pe.quality||"auto");pe.quality=i[(e+1)%i.length],In(pe),Rl(),$n(`Graphics: ${pe.quality.toUpperCase()} · applies to the next wood`,"warn",2600)}function w_(i){if(!hn.enabled||i.gamma==null&&i.beta==null)return;const e=i.beta||0,t=i.gamma||0;hn.zero||(hn.zero={beta:e,gamma:t});let n=(t-hn.zero.gamma)/26,s=(e-hn.zero.beta)/-26;n=Math.abs(n)<.12?0:bt((n-Math.sign(n)*.12)/.88,-1,1),s=Math.abs(s)<.12?0:bt((s-Math.sign(s)*.12)/.88,-1,1),hn.x=n,hn.y=s}async function A_(i){if(i){if(typeof window.DeviceOrientationEvent>"u"){$n("Tilt is not supported on this device","bad",2600),pe.tilt=!1,In(pe),Rs();return}const e=window.DeviceOrientationEvent.requestPermission;if(typeof e=="function")try{if(await e.call(window.DeviceOrientationEvent)!=="granted"){$n("Motion access was denied","bad",2600),pe.tilt=!1,In(pe),Rs();return}}catch{$n("Motion access is unavailable","bad",2600),pe.tilt=!1,In(pe),Rs();return}hn.enabled=!0,hn.zero=null,pe.tilt=!0,$n("Tilt steer on · lean to turn","warn",2400)}else hn.enabled=!1,hn.x=0,hn.y=0,pe.tilt=!1,$n("Tilt steer off","",1600);In(pe),Rs()}function pu(){jt.active=!1,jt.id=null,gn.x=0,gn.y=0,oe.joystick.classList.add("hidden"),oe.joystickKnob.style.transform=""}function nh(i,e,t){nn.active=!0,nn.id=t,nn.lastX=i,nn.lastY=e}function mu(i){!nn.active||i!=null&&nn.id!==i||(nn.active=!1,nn.id=null)}function R_(i){if(ft!=="playing"||i.button!=null&&i.button!==0)return;if(!(i.pointerType==="touch"||i.pointerType==="pen")){nh(i.clientX,i.clientY,i.pointerId);return}i.clientX<window.innerWidth*.52&&!jt.active?(jt.active=!0,jt.id=i.pointerId,jt.originX=i.clientX,jt.originY=i.clientY,jt.x=0,jt.y=0,gn.x=0,gn.y=0,oe.joystick.style.left=`${i.clientX}px`,oe.joystick.style.top=`${i.clientY}px`,oe.joystick.classList.remove("hidden"),oe.joystickKnob.style.transform="",gr=un):nn.active||nh(i.clientX,i.clientY,i.pointerId)}function C_(i){if(jt.active&&i.pointerId===jt.id){const e=i.clientX-jt.originX,t=i.clientY-jt.originY,n=Math.hypot(e,t),s=58,r=n>.001?e/n:0,a=n>.001?t/n:0,o=Math.min(1,n/s);gn.x=r*o,gn.y=-a*o,jt.x=r*o,jt.y=-a*o,oe.joystickKnob.style.transform=`translate(${r*s*o}px, ${a*s*o}px)`,gr=un;return}if(nn.active&&i.pointerId===nn.id){const e=i.clientX-nn.lastX,t=i.clientY-nn.lastY;nn.lastX=i.clientX,nn.lastY=i.clientY,wn-=e*.0052,vi=bt(vi-t*.0032,-.08,.84),gr=un}}function ih(i){jt.active&&i.pointerId===jt.id&&pu(),nn.active&&i.pointerId===nn.id&&mu(i.pointerId)}function P_(i){const e=i.key.toLowerCase();["arrowup","arrowdown","arrowleft","arrowright"," "].includes(e)&&i.preventDefault(),Cn[e]=!0,ft==="playing"&&(e==="j"&&ya("paw"),(e==="k"||e===" ")&&ya("bite")),(e==="escape"||e==="p")&&(ft==="playing"?ll():ft==="paused"&&Sa()),e==="m"&&ha()}function L_(i){Cn[i.key.toLowerCase()]=!1}function go(i,e,t){if(!i)return;const n=r=>{r.preventDefault(),r.stopPropagation(),i.classList.add("pressed");try{i.setPointerCapture?.(r.pointerId)}catch{}e()},s=r=>{r&&r.preventDefault(),i.classList.remove("pressed"),t?.()};i.addEventListener("pointerdown",n);for(const r of["pointerup","pointercancel","pointerleave","lostpointercapture"])i.addEventListener(r,s)}function Qt(i,e){const t=typeof i=="string"?document.getElementById(i):i;t&&t.addEventListener("click",n=>{n.preventDefault(),Bt.click(),e(n)})}function D_(){Qt("btn-play",()=>{Bt.ensure(),Is(pe.current||1)}),Qt("btn-levels",o_),Qt("btn-howto",l_),Qt("btn-jump-current",()=>{zi(),Is(pe.current||1)}),Qt("btn-resume",Sa),Qt("btn-resume-x",Sa),Qt("btn-restart",()=>{zi(),th()}),Qt("btn-quit",nr),Qt("btn-pause",ll),Qt("btn-next",()=>{zi(),Ie.level>=Dn?nr():Is(Ie.level+1)}),Qt("btn-complete-den",nr),Qt("btn-retry",()=>{zi(),th()}),Qt("btn-gameover-den",nr);for(const e of tu("[data-close]"))e.addEventListener("click",t=>{t.preventDefault(),Bt.click(),c_(e.dataset.close)});Qt("btn-sound",()=>ha()),Qt("title-sound",()=>ha()),Qt("btn-setting-sound",()=>ha()),Qt("btn-setting-tilt",()=>A_(!pe.tilt)),Qt("btn-setting-quality",T_),go(oe.btnPaw,()=>ya("paw")),go(oe.btnBite,()=>ya("bite")),go(oe.btnSprint,()=>{gn.sprint=!0,gr=un},()=>{gn.sprint=!1});const i=Un.domElement;i.addEventListener("pointerdown",R_),window.addEventListener("pointermove",C_,{passive:!0}),window.addEventListener("pointerup",ih),window.addEventListener("pointercancel",ih),i.addEventListener("contextmenu",e=>e.preventDefault()),document.addEventListener("keydown",P_),document.addEventListener("keyup",L_),window.addEventListener("blur",()=>{Cn=Object.create(null),gn.sprint=!1,gn.x=0,gn.y=0,pu(),mu()}),window.addEventListener("resize",cl),window.addEventListener("orientationchange",()=>setTimeout(cl,120)),window.addEventListener("deviceorientation",w_,!0),document.addEventListener("visibilitychange",()=>{document.hidden&&ft==="playing"&&ll()}),document.addEventListener("gesturestart",e=>e.preventDefault()),window.addEventListener("beforeunload",u_),pe.tilt&&(typeof window.DeviceOrientationEvent<"u"&&typeof window.DeviceOrientationEvent.requestPermission=="function"||(hn.enabled=!0))}function cl(){const i=window.innerWidth,e=window.innerHeight;if(Un.setPixelRatio(Math.min(window.devicePixelRatio||1,yr?2:1.8)),Un.setSize(i,e),Xt.aspect=i/e,Xt.updateProjectionMatrix(),oe.touchHint?.classList.toggle("hidden",!_a),oe.rotateHint){const t=e>i*1.35,n=_a&&t&&ft==="playing";oe.rotateHint.classList.toggle("hidden",!n),n&&(clearTimeout(Qc),Qc=setTimeout(()=>oe.rotateHint.classList.add("hidden"),5200))}}let Ea=performance.now();function gu(i){requestAnimationFrame(gu);const e=Math.min(Math.max(0,(i-Ea)/1e3),.05);Ea=i,un+=e,ft==="playing"?M_(e):ft==="title"?y_(e):(ft==="paused"||ft==="complete"||ft==="gameover")&&(nt&&nt.update(e*.25,un,K.position),ai.update(e*.25,un,{speed:0,sprint:!1,night:nt?nt.nightAmount:0,lookYaw:0})),Un.render(Si,Xt)}new URLSearchParams(window.location.search).has("debug")&&(window.__feral={get state(){return ft},get level(){return Ie},get animals(){return kt},get player(){return K},get world(){return nt},startGame:Is,completeLevel:lu,gameOver:Pl,spawn(i,e,t){return Gi(i,{x:e,z:t})},teleport(i,e){K.position.set(i,nt.heightAt(i,e),e),xn.position.copy(K.position),Ua()},setHealth(i){K.health=bt(i,0,100),es=K.health},addEaten(){Wi++,pe.eaten=(pe.eaten||0)+1,_r(),ba()},addKill(){Mi++,pe.kills=(pe.kills||0)+1,_r(),ba()}});function I_(){try{D_(),nr(),cl(),Ea=performance.now(),requestAnimationFrame(gu)}catch(i){console.error(i),iu("The forest failed to grow. Reload the page or try another browser.")}}I_();
