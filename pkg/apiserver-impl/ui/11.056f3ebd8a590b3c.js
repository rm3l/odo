"use strict";(self.webpackChunkdevfile_builder=self.webpackChunkdevfile_builder||[]).push([[11],{4011:(U,D,u)=>{u.r(D),u.d(D,{diagram:()=>t});var v=u(3612),B=u(5703),y=u(9006),A=u(8814),_=u(855),P=u(5299),W=u(1775);u(6780),u(2735),u(1764);let k={};const x=function(a){const n=Object.entries(k).find(s=>s[1].label===a);if(n)return n[0]},t={parser:v.p,db:v.d,renderer:{draw:function(a,n,s,o){const l=(0,_.g)().class;k={},_.l.info("Rendering diagram "+a);const p=(0,_.g)().securityLevel;let h;"sandbox"===p&&(h=(0,B.Ys)("#i"+n));const M=(0,B.Ys)("sandbox"===p?h.nodes()[0].contentDocument.body:"body"),c=M.select(`[id='${n}']`);!function(a){a.append("defs").append("marker").attr("id","extensionStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 1,7 L18,13 V 1 Z"),a.append("defs").append("marker").attr("id","extensionEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 1,1 V 13 L18,7 Z"),a.append("defs").append("marker").attr("id","compositionStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),a.append("defs").append("marker").attr("id","compositionEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),a.append("defs").append("marker").attr("id","aggregationStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),a.append("defs").append("marker").attr("id","aggregationEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L1,7 L9,1 Z"),a.append("defs").append("marker").attr("id","dependencyStart").attr("class","extension").attr("refX",0).attr("refY",7).attr("markerWidth",190).attr("markerHeight",240).attr("orient","auto").append("path").attr("d","M 5,7 L9,13 L1,7 L9,1 Z"),a.append("defs").append("marker").attr("id","dependencyEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 18,7 L9,13 L14,7 L9,1 Z")}(c);const d=new A.k({multigraph:!0});d.setGraph({isMultiGraph:!0}),d.setDefaultEdgeLabel(function(){return{}});const b=o.db.getClasses(),w=Object.keys(b);for(const r of w){const T=P.s.drawClass(c,b[r],l,o);k[T.id]=T,d.setNode(T.id,T),_.l.info("Org height: "+T.height)}o.db.getRelations().forEach(function(r){_.l.info("tjoho"+x(r.id1)+x(r.id2)+JSON.stringify(r)),d.setEdge(x(r.id1),x(r.id2),{relation:r},r.title||"DEFAULT")}),o.db.getNotes().forEach(function(r){_.l.debug(`Adding note: ${JSON.stringify(r)}`);const L=P.s.drawNote(c,r,l,o);k[L.id]=L,d.setNode(L.id,L),r.class&&r.class in b&&d.setEdge(r.id,x(r.class),{relation:{id1:r.id,id2:r.class,relation:{type1:"none",type2:"none",lineType:10}}},"DEFAULT")}),(0,y.bK)(d),d.nodes().forEach(function(r){void 0!==r&&void 0!==d.node(r)&&(_.l.debug("Node "+r+": "+JSON.stringify(d.node(r))),M.select("#"+(o.db.lookUpDomId(r)||r)).attr("transform","translate("+(d.node(r).x-d.node(r).width/2)+","+(d.node(r).y-d.node(r).height/2)+" )"))}),d.edges().forEach(function(r){void 0!==r&&void 0!==d.edge(r)&&(_.l.debug("Edge "+r.v+" -> "+r.w+": "+JSON.stringify(d.edge(r))),P.s.drawEdge(c,d.edge(r),d.edge(r).relation,l,o))});const m=c.node().getBBox(),g=m.width+40,E=m.height+40;(0,W.c)(c,E,g,l.useMaxWidth);const f=`${m.x-20} ${m.y-20} ${g} ${E}`;_.l.debug(`viewBox ${f}`),c.attr("viewBox",f)}},styles:v.s,init:a=>{a.class||(a.class={}),a.class.arrowMarkerAbsolute=a.arrowMarkerAbsolute,v.d.clear()}}},5299:(U,D,u)=>{u.d(D,{p:()=>S,s:()=>I});var v=u(5703),B=u(9111),y=u(855);let A=0;const S=function(e){let a=e.match(/^([#+~-])?(\w+)(~\w+~|\[])?\s+(\w+) *([$*])?$/),n=e.match(/^([#+|~-])?(\w+) *\( *(.*)\) *([$*])? *(\w*[[\]|~]*\s*\w*~?)$/);return a&&!n?R(a):n?H(n):k(e)},R=function(e){let i="",t="";try{let a=e[1]?e[1].trim():"",n=e[2]?e[2].trim():"",s=e[3]?(0,y.p)(e[3].trim()):"",o=e[4]?e[4].trim():"",l=e[5]?e[5].trim():"";t=a+n+s+" "+o,i=x(l)}catch{t=e}return{displayText:t,cssStyle:i}},H=function(e){let i="",t="";try{let a=e[1]?e[1].trim():"",n=e[2]?e[2].trim():"",s=e[3]?(0,y.p)(e[3].trim()):"",o=e[4]?e[4].trim():"";t=a+n+"("+s+")"+(e[5]?" : "+(0,y.p)(e[5]).trim():""),i=x(o)}catch{t=e}return{displayText:t,cssStyle:i}},k=function(e){let i="",t="",a="",n=e.indexOf("("),s=e.indexOf(")");if(n>1&&s>n&&s<=e.length){let o="",l="",p=e.substring(0,1);p.match(/\w/)?l=e.substring(0,n).trim():(p.match(/[#+~-]/)&&(o=p),l=e.substring(1,n).trim());const h=e.substring(n+1,s);e.substring(s+1,1),t=x(e.substring(s+1,s+2)),i=o+l+"("+(0,y.p)(h.trim())+")",s<e.length&&(a=e.substring(s+2).trim(),""!==a&&(a=" : "+(0,y.p)(a),i+=a))}else i=(0,y.p)(e);return{displayText:i,cssStyle:t}},O=function(e,i,t,a){let n=S(i);const s=e.append("tspan").attr("x",a.padding).text(n.displayText);""!==n.cssStyle&&s.attr("style",n.cssStyle),t||s.attr("dy",a.textHeight)},x=function(e){switch(e){case"*":return"font-style:italic;";case"$":return"text-decoration:underline;";default:return""}},I={drawClass:function(e,i,t,a){y.l.debug("Rendering class ",i,t);const n=i.id,s={id:n,label:i.id,width:0,height:0},o=e.append("g").attr("id",a.db.lookUpDomId(n)).attr("class","classGroup");let l;l=i.link?o.append("svg:a").attr("xlink:href",i.link).attr("target",i.linkTarget).append("text").attr("y",t.textHeight+t.padding).attr("x",0):o.append("text").attr("y",t.textHeight+t.padding).attr("x",0);let p=!0;i.annotations.forEach(function(r){const L=l.append("tspan").text("\xab"+r+"\xbb");p||L.attr("dy",t.textHeight),p=!1});let h=i.id;void 0!==i.type&&""!==i.type&&(h+="<"+i.type+">");const M=l.append("tspan").text(h).attr("class","title");p||M.attr("dy",t.textHeight);const c=l.node().getBBox().height,d=o.append("line").attr("x1",0).attr("y1",t.padding+c+t.dividerMargin/2).attr("y2",t.padding+c+t.dividerMargin/2),b=o.append("text").attr("x",t.padding).attr("y",c+t.dividerMargin+t.textHeight).attr("fill","white").attr("class","classText");p=!0,i.members.forEach(function(r){O(b,r,p,t),p=!1});const w=b.node().getBBox(),C=o.append("line").attr("x1",0).attr("y1",t.padding+c+t.dividerMargin+w.height).attr("y2",t.padding+c+t.dividerMargin+w.height),N=o.append("text").attr("x",t.padding).attr("y",c+2*t.dividerMargin+w.height+t.textHeight).attr("fill","white").attr("class","classText");p=!0,i.methods.forEach(function(r){O(N,r,p,t),p=!1});const m=o.node().getBBox();var g=" ";i.cssClasses.length>0&&(g+=i.cssClasses.join(" "));const f=o.insert("rect",":first-child").attr("x",0).attr("y",0).attr("width",m.width+2*t.padding).attr("height",m.height+t.padding+.5*t.dividerMargin).attr("class",g).node().getBBox().width;return l.node().childNodes.forEach(function(r){r.setAttribute("x",(f-r.getBBox().width)/2)}),i.tooltip&&l.insert("title").text(i.tooltip),d.attr("x2",f),C.attr("x2",f),s.width=f,s.height=m.height+t.padding+.5*t.dividerMargin,s},drawEdge:function(e,i,t,a,n){const s=function(g){switch(g){case n.db.relationType.AGGREGATION:return"aggregation";case n.db.relationType.EXTENSION:return"extension";case n.db.relationType.COMPOSITION:return"composition";case n.db.relationType.DEPENDENCY:return"dependency";case n.db.relationType.LOLLIPOP:return"lollipop"}};i.points=i.points.filter(g=>!Number.isNaN(g.y));const o=i.points,l=(0,v.jvg)().x(function(g){return g.x}).y(function(g){return g.y}).curve(v.$0Z),p=e.append("path").attr("d",l(o)).attr("id","edge"+A).attr("class","relation");let M,c,h="";a.arrowMarkerAbsolute&&(h=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,h=h.replace(/\(/g,"\\("),h=h.replace(/\)/g,"\\)")),1==t.relation.lineType&&p.attr("class","relation dashed-line"),10==t.relation.lineType&&p.attr("class","relation dotted-line"),"none"!==t.relation.type1&&p.attr("marker-start","url("+h+"#"+s(t.relation.type1)+"Start)"),"none"!==t.relation.type2&&p.attr("marker-end","url("+h+"#"+s(t.relation.type2)+"End)");const d=i.points.length;let w,C,N,m,b=B.u.calcLabelPosition(i.points);if(M=b.x,c=b.y,d%2!=0&&d>1){let g=B.u.calcCardinalityPosition("none"!==t.relation.type1,i.points,i.points[0]),E=B.u.calcCardinalityPosition("none"!==t.relation.type2,i.points,i.points[d-1]);y.l.debug("cardinality_1_point "+JSON.stringify(g)),y.l.debug("cardinality_2_point "+JSON.stringify(E)),w=g.x,C=g.y,N=E.x,m=E.y}if(void 0!==t.title){const g=e.append("g").attr("class","classLabel"),E=g.append("text").attr("class","label").attr("x",M).attr("y",c).attr("fill","red").attr("text-anchor","middle").text(t.title);window.label=E;const f=E.node().getBBox();g.insert("rect",":first-child").attr("class","box").attr("x",f.x-a.padding/2).attr("y",f.y-a.padding/2).attr("width",f.width+a.padding).attr("height",f.height+a.padding)}y.l.info("Rendering relation "+JSON.stringify(t)),void 0!==t.relationTitle1&&"none"!==t.relationTitle1&&e.append("g").attr("class","cardinality").append("text").attr("class","type1").attr("x",w).attr("y",C).attr("fill","black").attr("font-size","6").text(t.relationTitle1),void 0!==t.relationTitle2&&"none"!==t.relationTitle2&&e.append("g").attr("class","cardinality").append("text").attr("class","type2").attr("x",N).attr("y",m).attr("fill","black").attr("font-size","6").text(t.relationTitle2),A++},drawNote:function(e,i,t,a){y.l.debug("Rendering note ",i,t);const n=i.id,s={id:n,text:i.text,width:0,height:0},o=e.append("g").attr("id",n).attr("class","classGroup");let l=o.append("text").attr("y",t.textHeight+t.padding).attr("x",0);const p=JSON.parse(`"${i.text}"`).split("\n");p.forEach(function(d){y.l.debug(`Adding line: ${d}`),l.append("tspan").text(d).attr("class","title").attr("dy",t.textHeight)});const h=o.node().getBBox(),c=o.insert("rect",":first-child").attr("x",0).attr("y",0).attr("width",h.width+2*t.padding).attr("height",h.height+p.length*t.textHeight+t.padding+.5*t.dividerMargin).node().getBBox().width;return l.node().childNodes.forEach(function(d){d.setAttribute("x",(c-d.getBBox().width)/2)}),s.width=c,s.height=h.height+p.length*t.textHeight+t.padding+.5*t.dividerMargin,s},parseMember:S}}}]);