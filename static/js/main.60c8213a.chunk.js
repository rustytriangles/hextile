(this.webpackJsonphextile=this.webpackJsonphextile||[]).push([[0],{12:function(t,e,a){},13:function(t,e,a){},14:function(t,e,a){"use strict";a.r(e);var n=a(0),r=a.n(n),o=a(2),l=a.n(o),i=(a(12),a(3)),s=a(4),c=a(6),h=a(5);a(13);function u(t,e){if("none"==e.strokeColor)return r.a.createElement(r.a.Fragment,null);for(var a="",n=0;n<t.length;n++)a+=0===n?" M":" L",a+=" "+t[n][0].toFixed(2)+" "+t[n][1].toFixed(2);return a+=" Z",r.a.createElement("path",{fill:e.fillStyle,stroke:e.strokeColor,"stroke-width":e.strokeWidth,d:a})}function d(t,e,a,n,o,l){var i=[(t[0]+a*Math.cos(n)).toFixed(2),(t[1]+a*Math.sin(n)).toFixed(2)],s=[(t[0]+a*Math.cos(o)).toFixed(2),(t[1]+a*Math.sin(o)).toFixed(2)],c=[(t[0]+e*Math.cos(o)).toFixed(2),(t[1]+e*Math.sin(o)).toFixed(2)],h=[(t[0]+e*Math.cos(n)).toFixed(2),(t[1]+e*Math.sin(n)).toFixed(2)],u="";u+=" M "+i[0]+" "+i[1],u+=" A "+a+" "+a+" 0 0 1 "+s[0]+" "+s[1],u+=" L "+c[0]+" "+c[1],u+=" A "+e+" "+e+" 0 0 0 "+h[0]+" "+h[1],u+=" Z";var d="";return d+=" M "+i[0]+" "+i[1],d+=" A "+a+" "+a+" 0 0 1 "+s[0]+" "+s[1],d+=" M "+c[0]+" "+c[1],d+=" A "+e+" "+e+" 0 0 0 "+h[0]+" "+h[1],r.a.createElement(r.a.Fragment,null,r.a.createElement("path",{fill:l.fillStyle,stroke:"none","stroke-width":"0",d:u}),r.a.createElement("path",{fill:"none",stroke:l.strokeColor,"stroke-width":l.strokeWidth,d:d}))}function m(t,e,a,n){var o=e[0]-t[0],l=e[1]-t[1],i=a/Math.sqrt(o*o+l*l),s=[-l*i,o*i],c=[(t[0]+s[0]).toFixed(2),(t[1]+s[1]).toFixed(2)],h=[(e[0]+s[0]).toFixed(2),(e[1]+s[1]).toFixed(2)],u=[(e[0]-s[0]).toFixed(2),(e[1]-s[1]).toFixed(2)],d=[(t[0]-s[0]).toFixed(2),(t[1]-s[1]).toFixed(2)],m="";m+=" M "+c[0]+" "+c[1]+" L "+h[0]+" "+h[1]+" L "+u[0]+" "+u[1]+" L "+d[0]+" "+d[1]+" Z ";var M;return M=" M "+c[0]+" "+c[1]+" L "+h[0]+" "+h[1]+" M "+u[0]+" "+u[1]+" L "+d[0]+" "+d[1],r.a.createElement(r.a.Fragment,null,r.a.createElement("path",{fill:n.fillStyle,stroke:"none","stroke-width":"0",d:m}),r.a.createElement("path",{fill:"none",stroke:n.strokeColor,"stroke-width":n.strokeWidth,d:M}))}function M(t,e,a,n){var o=e*Math.sqrt(3)/2,l=e/2,i=[[0,-e],[o,-l],[o,l],[0,e],[-o,l],[-o,-l]];switch(t){case 0:return function(t,e,a,n){var o=e/3,l=2*e/3;return r.a.createElement(r.a.Fragment,null,d(t[0],o,l,Math.PI/6,5*Math.PI/6,n),d(t[2],o,l,5*Math.PI/6,9*Math.PI/6,n),d(t[4],o,l,9*Math.PI/6,13*Math.PI/6,n),u(t,a))}(i,e,a,n);case 1:return function(t,e,a,n){var o=e/3,l=2*e/3,i=[(t[1][0]+t[2][0])/2,(t[1][1]+t[2][1])/2],s=[(t[4][0]+t[5][0])/2,(t[4][1]+t[5][1])/2];return r.a.createElement(r.a.Fragment,null,d(t[0],o,l,Math.PI/6,5*Math.PI/6,n),d(t[3],o,l,-5*Math.PI/6,-Math.PI/6,n),m(i,s,e/6,n),u(t,a))}(i,e,a,n);case 2:return function(t,e,a,n){var o=e/3,l=2*e/3,i=t[0][0]-t[5][0],s=t[0][1]-t[5][1],c=[t[0][0]+i,t[0][1]+s],h=[t[0][0]-i,t[0][1]+s];return r.a.createElement(r.a.Fragment,null,d(c,e+o,e+l,3*Math.PI/6,5*Math.PI/6,n),d(h,e+o,e+l,1*Math.PI/6,3*Math.PI/6,n),d(t[3],o,l,-5*Math.PI/6,-Math.PI/6,n),u(t,a))}(i,e,a,n);case 3:return function(t,e,a,n){var o=e/3,l=2*e/3,i=t[0][0]-t[5][0],s=t[0][1]-t[5][1],c=[t[0][0]+i,t[0][1]+s],h=[t[3][0]-i,t[3][1]-s],M=[(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2],f=[(t[3][0]+t[4][0])/2,(t[3][1]+t[4][1])/2];return r.a.createElement(r.a.Fragment,null,d(c,e+o,e+l,3*Math.PI/6,5*Math.PI/6,n),m(M,f,e/6,n),d(h,e+o,e+l,-3*Math.PI/6,-1*Math.PI/6,n),u(t,a))}(i,e,a,n);case 4:default:return function(t,e,a,n){var o=[[(t[0][0]+t[1][0])/2,(t[0][1]+t[1][1])/2],[(t[1][0]+t[2][0])/2,(t[1][1]+t[2][1])/2],[(t[2][0]+t[3][0])/2,(t[2][1]+t[3][1])/2],[(t[3][0]+t[4][0])/2,(t[3][1]+t[4][1])/2],[(t[4][0]+t[5][0])/2,(t[4][1]+t[5][1])/2],[(t[5][0]+t[0][0])/2,(t[5][1]+t[0][1])/2]];return r.a.createElement(r.a.Fragment,null,m(o[0],o[3],e/6,n),m(o[1],o[4],e/6,n),m(o[2],o[5],e/6,n),u(t,a))}(i,e,a,n)}}var f=function(t){Object(c.a)(a,t);var e=Object(h.a)(a);function a(t){var n;return Object(i.a)(this,a),(n=e.call(this,t)).state={s_real:7,s_imag:-8,scale:12},n.primeProps={radius:5,fillStyle:"magenta",strokeColor:"none"},n.pathFillProps={fillStyle:"none",strokeColor:"grey",strokeWidth:"3"},n}return Object(s.a)(a,[{key:"keydown",value:function(t){switch(t.keyCode){case 187:this.setState((function(t){var e=Math.min(22,t.scale+1);return{s_real:t.s_real,s_imag:t.s_imag,scale:e}}));break;case 189:this.setState((function(t){var e=Math.max(4,t.scale-1);return{s_real:t.s_real,s_imag:t.s_imag,scale:e}}))}}},{key:"onclick",value:function(t){var e=t.target.getScreenCTM().inverse(),a=Math.round((t.clientX*e.a+e.e)/this.state.scale),n=-Math.round((t.clientY*e.d+e.f)/this.state.scale);this.setState((function(t){return{s_real:a,s_imag:n,scale:t.scale}}))}},{key:"render",value:function(){var t={fillStyle:"none",strokeColor:"none",strokeWidth:"0"},e={fillStyle:"#FE9",strokeColor:"#8A2",strokeWidth:"5"},a=function(t,e){for(var a=t*Math.sqrt(3),n=1.5*t,r=[],o=-e;o<=e;o++)for(var l=o*n,i=2*e-Math.abs(o),s=-i;s<=i;s+=2){var c=s*a/2;r.push([c,l])}return r}(52,5),n=[[0,0],[0,60],[1,0],[1,60],[1,120],[2,0],[2,60],[2,120],[2,180],[2,240],[2,300],[3,0],[3,60],[3,120],[4,0]],o=1e3,l=[-500,-480,o,960];return r.a.createElement("div",{class:"wrapper"},r.a.createElement("h2",null,"Hex Tiles"),r.a.createElement("svg",{xmlns:"http://www.w3.org/2000/svg",width:500,height:480,viewBox:l,onKeyDown:this.keydown.bind(this),onClick:this.onclick.bind(this),tabIndex:"1"},r.a.createElement(r.a.Fragment,null," ",a.map((function(a){var o=Math.floor(Math.random()*Math.floor(n.length)),l="translate("+a[0].toFixed(2)+" "+a[1].toFixed(2)+") rotate("+n[o][1]+")";return r.a.createElement("g",{transform:l},M(n[o][0],52,t,e))}))," ")))}}]),a}(r.a.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(f,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(t){t.unregister()})).catch((function(t){console.error(t.message)}))},7:function(t,e,a){t.exports=a(14)}},[[7,1,2]]]);
//# sourceMappingURL=main.60c8213a.chunk.js.map