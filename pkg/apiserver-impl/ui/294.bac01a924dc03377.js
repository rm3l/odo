"use strict";(self.webpackChunkdevfile_builder=self.webpackChunkdevfile_builder||[]).push([[294],{1294:(ut,Ee,A)=>{A.r(Ee),A.d(Ee,{diagram:()=>st});var T=A(8080),X=A(8586),$e=A(1065),we=A(8814),se=(A(1764),A(6780),A(2735),function(){var e=function(C,i,r,a){for(r=r||{},a=C.length;a--;r[C[a]]=i);return r},t=[1,3],l=[1,4],c=[1,5],u=[1,6],d=[5,6,8,9,11,13,31,32,33,34,35,36,44,62,63],_=[1,18],h=[2,7],o=[1,22],p=[1,23],R=[1,24],O=[1,25],N=[1,26],x=[1,27],$=[1,20],k=[1,28],v=[1,29],F=[62,63],me=[5,8,9,11,13,31,32,33,34,35,36,44,51,53,62,63],Ie=[1,47],be=[1,48],Te=[1,49],ke=[1,50],Se=[1,51],Ne=[1,52],xe=[1,53],M=[53,54],U=[1,64],Y=[1,60],B=[1,61],W=[1,62],K=[1,63],Q=[1,65],J=[1,69],Z=[1,70],ee=[1,67],te=[1,68],I=[5,8,9,11,13,31,32,33,34,35,36,44,62,63],oe={trace:function(){},yy:{},symbols_:{error:2,start:3,directive:4,NEWLINE:5,RD:6,diagram:7,EOF:8,acc_title:9,acc_title_value:10,acc_descr:11,acc_descr_value:12,acc_descr_multiline_value:13,requirementDef:14,elementDef:15,relationshipDef:16,requirementType:17,requirementName:18,STRUCT_START:19,requirementBody:20,ID:21,COLONSEP:22,id:23,TEXT:24,text:25,RISK:26,riskLevel:27,VERIFYMTHD:28,verifyType:29,STRUCT_STOP:30,REQUIREMENT:31,FUNCTIONAL_REQUIREMENT:32,INTERFACE_REQUIREMENT:33,PERFORMANCE_REQUIREMENT:34,PHYSICAL_REQUIREMENT:35,DESIGN_CONSTRAINT:36,LOW_RISK:37,MED_RISK:38,HIGH_RISK:39,VERIFY_ANALYSIS:40,VERIFY_DEMONSTRATION:41,VERIFY_INSPECTION:42,VERIFY_TEST:43,ELEMENT:44,elementName:45,elementBody:46,TYPE:47,type:48,DOCREF:49,ref:50,END_ARROW_L:51,relationship:52,LINE:53,END_ARROW_R:54,CONTAINS:55,COPIES:56,DERIVES:57,SATISFIES:58,VERIFIES:59,REFINES:60,TRACES:61,unqString:62,qString:63,$accept:0,$end:1},terminals_:{2:"error",5:"NEWLINE",6:"RD",8:"EOF",9:"acc_title",10:"acc_title_value",11:"acc_descr",12:"acc_descr_value",13:"acc_descr_multiline_value",19:"STRUCT_START",21:"ID",22:"COLONSEP",24:"TEXT",26:"RISK",28:"VERIFYMTHD",30:"STRUCT_STOP",31:"REQUIREMENT",32:"FUNCTIONAL_REQUIREMENT",33:"INTERFACE_REQUIREMENT",34:"PERFORMANCE_REQUIREMENT",35:"PHYSICAL_REQUIREMENT",36:"DESIGN_CONSTRAINT",37:"LOW_RISK",38:"MED_RISK",39:"HIGH_RISK",40:"VERIFY_ANALYSIS",41:"VERIFY_DEMONSTRATION",42:"VERIFY_INSPECTION",43:"VERIFY_TEST",44:"ELEMENT",47:"TYPE",49:"DOCREF",51:"END_ARROW_L",53:"LINE",54:"END_ARROW_R",55:"CONTAINS",56:"COPIES",57:"DERIVES",58:"SATISFIES",59:"VERIFIES",60:"REFINES",61:"TRACES",62:"unqString",63:"qString"},productions_:[0,[3,3],[3,2],[3,4],[4,2],[4,2],[4,1],[7,0],[7,2],[7,2],[7,2],[7,2],[7,2],[14,5],[20,5],[20,5],[20,5],[20,5],[20,2],[20,1],[17,1],[17,1],[17,1],[17,1],[17,1],[17,1],[27,1],[27,1],[27,1],[29,1],[29,1],[29,1],[29,1],[15,5],[46,5],[46,5],[46,2],[46,1],[16,5],[16,5],[52,1],[52,1],[52,1],[52,1],[52,1],[52,1],[52,1],[18,1],[18,1],[23,1],[23,1],[25,1],[25,1],[45,1],[45,1],[48,1],[48,1],[50,1],[50,1]],performAction:function(i,r,a,n,E,s,G){var f=s.length-1;switch(E){case 4:this.$=s[f].trim(),n.setAccTitle(this.$);break;case 5:case 6:this.$=s[f].trim(),n.setAccDescription(this.$);break;case 7:this.$=[];break;case 13:n.addRequirement(s[f-3],s[f-4]);break;case 14:n.setNewReqId(s[f-2]);break;case 15:n.setNewReqText(s[f-2]);break;case 16:n.setNewReqRisk(s[f-2]);break;case 17:n.setNewReqVerifyMethod(s[f-2]);break;case 20:this.$=n.RequirementType.REQUIREMENT;break;case 21:this.$=n.RequirementType.FUNCTIONAL_REQUIREMENT;break;case 22:this.$=n.RequirementType.INTERFACE_REQUIREMENT;break;case 23:this.$=n.RequirementType.PERFORMANCE_REQUIREMENT;break;case 24:this.$=n.RequirementType.PHYSICAL_REQUIREMENT;break;case 25:this.$=n.RequirementType.DESIGN_CONSTRAINT;break;case 26:this.$=n.RiskLevel.LOW_RISK;break;case 27:this.$=n.RiskLevel.MED_RISK;break;case 28:this.$=n.RiskLevel.HIGH_RISK;break;case 29:this.$=n.VerifyType.VERIFY_ANALYSIS;break;case 30:this.$=n.VerifyType.VERIFY_DEMONSTRATION;break;case 31:this.$=n.VerifyType.VERIFY_INSPECTION;break;case 32:this.$=n.VerifyType.VERIFY_TEST;break;case 33:n.addElement(s[f-3]);break;case 34:n.setNewElementType(s[f-2]);break;case 35:n.setNewElementDocRef(s[f-2]);break;case 38:n.addRelationship(s[f-2],s[f],s[f-4]);break;case 39:n.addRelationship(s[f-2],s[f-4],s[f]);break;case 40:this.$=n.Relationships.CONTAINS;break;case 41:this.$=n.Relationships.COPIES;break;case 42:this.$=n.Relationships.DERIVES;break;case 43:this.$=n.Relationships.SATISFIES;break;case 44:this.$=n.Relationships.VERIFIES;break;case 45:this.$=n.Relationships.REFINES;break;case 46:this.$=n.Relationships.TRACES}},table:[{3:1,4:2,6:t,9:l,11:c,13:u},{1:[3]},{3:8,4:2,5:[1,7],6:t,9:l,11:c,13:u},{5:[1,9]},{10:[1,10]},{12:[1,11]},e(d,[2,6]),{3:12,4:2,6:t,9:l,11:c,13:u},{1:[2,2]},{4:17,5:_,7:13,8:h,9:l,11:c,13:u,14:14,15:15,16:16,17:19,23:21,31:o,32:p,33:R,34:O,35:N,36:x,44:$,62:k,63:v},e(d,[2,4]),e(d,[2,5]),{1:[2,1]},{8:[1,30]},{4:17,5:_,7:31,8:h,9:l,11:c,13:u,14:14,15:15,16:16,17:19,23:21,31:o,32:p,33:R,34:O,35:N,36:x,44:$,62:k,63:v},{4:17,5:_,7:32,8:h,9:l,11:c,13:u,14:14,15:15,16:16,17:19,23:21,31:o,32:p,33:R,34:O,35:N,36:x,44:$,62:k,63:v},{4:17,5:_,7:33,8:h,9:l,11:c,13:u,14:14,15:15,16:16,17:19,23:21,31:o,32:p,33:R,34:O,35:N,36:x,44:$,62:k,63:v},{4:17,5:_,7:34,8:h,9:l,11:c,13:u,14:14,15:15,16:16,17:19,23:21,31:o,32:p,33:R,34:O,35:N,36:x,44:$,62:k,63:v},{4:17,5:_,7:35,8:h,9:l,11:c,13:u,14:14,15:15,16:16,17:19,23:21,31:o,32:p,33:R,34:O,35:N,36:x,44:$,62:k,63:v},{18:36,62:[1,37],63:[1,38]},{45:39,62:[1,40],63:[1,41]},{51:[1,42],53:[1,43]},e(F,[2,20]),e(F,[2,21]),e(F,[2,22]),e(F,[2,23]),e(F,[2,24]),e(F,[2,25]),e(me,[2,49]),e(me,[2,50]),{1:[2,3]},{8:[2,8]},{8:[2,9]},{8:[2,10]},{8:[2,11]},{8:[2,12]},{19:[1,44]},{19:[2,47]},{19:[2,48]},{19:[1,45]},{19:[2,53]},{19:[2,54]},{52:46,55:Ie,56:be,57:Te,58:ke,59:Se,60:Ne,61:xe},{52:54,55:Ie,56:be,57:Te,58:ke,59:Se,60:Ne,61:xe},{5:[1,55]},{5:[1,56]},{53:[1,57]},e(M,[2,40]),e(M,[2,41]),e(M,[2,42]),e(M,[2,43]),e(M,[2,44]),e(M,[2,45]),e(M,[2,46]),{54:[1,58]},{5:U,20:59,21:Y,24:B,26:W,28:K,30:Q},{5:J,30:Z,46:66,47:ee,49:te},{23:71,62:k,63:v},{23:72,62:k,63:v},e(I,[2,13]),{22:[1,73]},{22:[1,74]},{22:[1,75]},{22:[1,76]},{5:U,20:77,21:Y,24:B,26:W,28:K,30:Q},e(I,[2,19]),e(I,[2,33]),{22:[1,78]},{22:[1,79]},{5:J,30:Z,46:80,47:ee,49:te},e(I,[2,37]),e(I,[2,38]),e(I,[2,39]),{23:81,62:k,63:v},{25:82,62:[1,83],63:[1,84]},{27:85,37:[1,86],38:[1,87],39:[1,88]},{29:89,40:[1,90],41:[1,91],42:[1,92],43:[1,93]},e(I,[2,18]),{48:94,62:[1,95],63:[1,96]},{50:97,62:[1,98],63:[1,99]},e(I,[2,36]),{5:[1,100]},{5:[1,101]},{5:[2,51]},{5:[2,52]},{5:[1,102]},{5:[2,26]},{5:[2,27]},{5:[2,28]},{5:[1,103]},{5:[2,29]},{5:[2,30]},{5:[2,31]},{5:[2,32]},{5:[1,104]},{5:[2,55]},{5:[2,56]},{5:[1,105]},{5:[2,57]},{5:[2,58]},{5:U,20:106,21:Y,24:B,26:W,28:K,30:Q},{5:U,20:107,21:Y,24:B,26:W,28:K,30:Q},{5:U,20:108,21:Y,24:B,26:W,28:K,30:Q},{5:U,20:109,21:Y,24:B,26:W,28:K,30:Q},{5:J,30:Z,46:110,47:ee,49:te},{5:J,30:Z,46:111,47:ee,49:te},e(I,[2,14]),e(I,[2,15]),e(I,[2,16]),e(I,[2,17]),e(I,[2,34]),e(I,[2,35])],defaultActions:{8:[2,2],12:[2,1],30:[2,3],31:[2,8],32:[2,9],33:[2,10],34:[2,11],35:[2,12],37:[2,47],38:[2,48],40:[2,53],41:[2,54],83:[2,51],84:[2,52],86:[2,26],87:[2,27],88:[2,28],90:[2,29],91:[2,30],92:[2,31],93:[2,32],95:[2,55],96:[2,56],98:[2,57],99:[2,58]},parseError:function(i,r){if(!r.recoverable){var a=new Error(i);throw a.hash=r,a}this.trace(i)},parse:function(i){var a=[0],n=[],E=[null],s=[],G=this.table,f="",ie=0,ve=0,ot=s.slice.call(arguments,1),g=Object.create(this.lexer),D={yy:{}};for(var he in this.yy)Object.prototype.hasOwnProperty.call(this.yy,he)&&(D.yy[he]=this.yy[he]);g.setInput(i,D.yy),D.yy.lexer=g,D.yy.parser=this,typeof g.yylloc>"u"&&(g.yylloc={});var ue=g.yylloc;s.push(ue);var L,ct=g.options&&g.options.ranges;this.parseError="function"==typeof D.yy.parseError?D.yy.parseError:Object.getPrototypeOf(this).parseError;for(var b,q,S,de,ne,w,re,H={};;){if(this.defaultActions[q=a[a.length-1]]?S=this.defaultActions[q]:((null===b||typeof b>"u")&&(L=void 0,"number"!=typeof(L=n.pop()||g.lex()||1)&&(L instanceof Array&&(L=(n=L).pop()),L=this.symbols_[L]||L),b=L),S=G[q]&&G[q][b]),typeof S>"u"||!S.length||!S[0]){var _e;for(ne in re=[],G[q])this.terminals_[ne]&&ne>2&&re.push("'"+this.terminals_[ne]+"'");_e=g.showPosition?"Parse error on line "+(ie+1)+":\n"+g.showPosition()+"\nExpecting "+re.join(", ")+", got '"+(this.terminals_[b]||b)+"'":"Parse error on line "+(ie+1)+": Unexpected "+(1==b?"end of input":"'"+(this.terminals_[b]||b)+"'"),this.parseError(_e,{text:g.match,token:this.terminals_[b]||b,line:g.yylineno,loc:ue,expected:re})}if(S[0]instanceof Array&&S.length>1)throw new Error("Parse Error: multiple actions possible at state: "+q+", token: "+b);switch(S[0]){case 1:a.push(b),E.push(g.yytext),s.push(g.yylloc),a.push(S[1]),b=null,ve=g.yyleng,f=g.yytext,ie=g.yylineno,ue=g.yylloc;break;case 2:if(H.$=E[E.length-(w=this.productions_[S[1]][1])],H._$={first_line:s[s.length-(w||1)].first_line,last_line:s[s.length-1].last_line,first_column:s[s.length-(w||1)].first_column,last_column:s[s.length-1].last_column},ct&&(H._$.range=[s[s.length-(w||1)].range[0],s[s.length-1].range[1]]),typeof(de=this.performAction.apply(H,[f,ve,ie,D.yy,S[1],E,s].concat(ot)))<"u")return de;w&&(a=a.slice(0,-1*w*2),E=E.slice(0,-1*w),s=s.slice(0,-1*w)),a.push(this.productions_[S[1]][0]),E.push(H.$),s.push(H._$),a.push(G[a[a.length-2]][a[a.length-1]]);break;case 3:return!0}}return!0}};function ce(){this.yy={}}return oe.lexer={EOF:1,parseError:function(r,a){if(!this.yy.parser)throw new Error(r);this.yy.parser.parseError(r,a)},setInput:function(i,r){return this.yy=r||this.yy||{},this._input=i,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var i=this._input[0];return this.yytext+=i,this.yyleng++,this.offset++,this.match+=i,this.matched+=i,i.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),i},unput:function(i){var r=i.length,a=i.split(/(?:\r\n?|\n)/g);this._input=i+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-r),this.offset-=r;var n=this.match.split(/(?:\r\n?|\n)/g);this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),a.length-1&&(this.yylineno-=a.length-1);var E=this.yylloc.range;return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:a?(a.length===n.length?this.yylloc.first_column:0)+n[n.length-a.length].length-a[0].length:this.yylloc.first_column-r},this.options.ranges&&(this.yylloc.range=[E[0],E[0]+this.yyleng-r]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(i){this.unput(this.match.slice(i))},pastInput:function(){var i=this.matched.substr(0,this.matched.length-this.match.length);return(i.length>20?"...":"")+i.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var i=this.match;return i.length<20&&(i+=this._input.substr(0,20-i.length)),(i.substr(0,20)+(i.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var i=this.pastInput(),r=new Array(i.length+1).join("-");return i+this.upcomingInput()+"\n"+r+"^"},test_match:function(i,r){var a,n,E;if(this.options.backtrack_lexer&&(E={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(E.yylloc.range=this.yylloc.range.slice(0))),(n=i[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=n.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-n[n.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+i[0].length},this.yytext+=i[0],this.match+=i[0],this.matches=i,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(i[0].length),this.matched+=i[0],a=this.performAction.call(this,this.yy,this,r,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),a)return a;if(this._backtrack){for(var s in E)this[s]=E[s];return!1}return!1},next:function(){if(this.done)return this.EOF;var i,r,a,n;this._input||(this.done=!0),this._more||(this.yytext="",this.match="");for(var E=this._currentRules(),s=0;s<E.length;s++)if((a=this._input.match(this.rules[E[s]]))&&(!r||a[0].length>r[0].length)){if(r=a,n=s,this.options.backtrack_lexer){if(!1!==(i=this.test_match(a,E[s])))return i;if(this._backtrack){r=!1;continue}return!1}if(!this.options.flex)break}return r?!1!==(i=this.test_match(r,E[n]))&&i:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){return this.next()||this.lex()},begin:function(r){this.conditionStack.push(r)},popState:function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(r){return(r=this.conditionStack.length-1-Math.abs(r||0))>=0?this.conditionStack[r]:"INITIAL"},pushState:function(r){this.begin(r)},stateStackSize:function(){return this.conditionStack.length},options:{"case-insensitive":!0},performAction:function(r,a,n,E){switch(n){case 0:return"title";case 1:return this.begin("acc_title"),9;case 2:return this.popState(),"acc_title_value";case 3:return this.begin("acc_descr"),11;case 4:return this.popState(),"acc_descr_value";case 5:this.begin("acc_descr_multiline");break;case 6:case 48:this.popState();break;case 7:return"acc_descr_multiline_value";case 8:return 5;case 9:case 10:case 11:break;case 12:return 8;case 13:return 6;case 14:return 19;case 15:return 30;case 16:return 22;case 17:return 21;case 18:return 24;case 19:return 26;case 20:return 28;case 21:return 31;case 22:return 32;case 23:return 33;case 24:return 34;case 25:return 35;case 26:return 36;case 27:return 37;case 28:return 38;case 29:return 39;case 30:return 40;case 31:return 41;case 32:return 42;case 33:return 43;case 34:return 44;case 35:return 55;case 36:return 56;case 37:return 57;case 38:return 58;case 39:return 59;case 40:return 60;case 41:return 61;case 42:return 47;case 43:return 49;case 44:return 51;case 45:return 54;case 46:return 53;case 47:this.begin("string");break;case 49:return"qString";case 50:return a.yytext=a.yytext.trim(),62}},rules:[/^(?:title\s[^#\n;]+)/i,/^(?:accTitle\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*:\s*)/i,/^(?:(?!\n||)*[^\n]*)/i,/^(?:accDescr\s*\{\s*)/i,/^(?:[\}])/i,/^(?:[^\}]*)/i,/^(?:(\r?\n)+)/i,/^(?:\s+)/i,/^(?:#[^\n]*)/i,/^(?:%[^\n]*)/i,/^(?:$)/i,/^(?:requirementDiagram\b)/i,/^(?:\{)/i,/^(?:\})/i,/^(?::)/i,/^(?:id\b)/i,/^(?:text\b)/i,/^(?:risk\b)/i,/^(?:verifyMethod\b)/i,/^(?:requirement\b)/i,/^(?:functionalRequirement\b)/i,/^(?:interfaceRequirement\b)/i,/^(?:performanceRequirement\b)/i,/^(?:physicalRequirement\b)/i,/^(?:designConstraint\b)/i,/^(?:low\b)/i,/^(?:medium\b)/i,/^(?:high\b)/i,/^(?:analysis\b)/i,/^(?:demonstration\b)/i,/^(?:inspection\b)/i,/^(?:test\b)/i,/^(?:element\b)/i,/^(?:contains\b)/i,/^(?:copies\b)/i,/^(?:derives\b)/i,/^(?:satisfies\b)/i,/^(?:verifies\b)/i,/^(?:refines\b)/i,/^(?:traces\b)/i,/^(?:type\b)/i,/^(?:docref\b)/i,/^(?:<-)/i,/^(?:->)/i,/^(?:-)/i,/^(?:["])/i,/^(?:["])/i,/^(?:[^"]*)/i,/^(?:[\w][^\r\n\{\<\>\-\=]*)/i],conditions:{acc_descr_multiline:{rules:[6,7],inclusive:!1},acc_descr:{rules:[4],inclusive:!1},acc_title:{rules:[2],inclusive:!1},unqString:{rules:[],inclusive:!1},token:{rules:[],inclusive:!1},string:{rules:[48,49],inclusive:!1},INITIAL:{rules:[0,1,3,5,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,50],inclusive:!0}}},ce.prototype=oe,oe.Parser=ce,new ce}());se.parser=se;let ae=[],m={},j={},V={},z={};const le={CONTAINS:"contains",ARROW:"arrow"},ye_ReqMarkers=le;let y={},fe=0;const pe=(e,t)=>e.insert("rect","#"+t).attr("class","req reqBox").attr("x",0).attr("y",0).attr("width",y.rect_min_width+"px").attr("height",y.rect_min_height+"px"),ge=(e,t,l)=>{let c=y.rect_min_width/2,u=e.append("text").attr("class","req reqLabel reqTitle").attr("id",t).attr("x",c).attr("y",y.rect_padding).attr("dominant-baseline","hanging"),d=0;l.forEach(p=>{0==d?u.append("tspan").attr("text-anchor","middle").attr("x",y.rect_min_width/2).attr("dy",0).text(p):u.append("tspan").attr("text-anchor","middle").attr("x",y.rect_min_width/2).attr("dy",.75*y.line_height).text(p),d++});let o=1.5*y.rect_padding+d*y.line_height*.75;return e.append("line").attr("class","req-title-line").attr("x1","0").attr("x2",y.rect_min_width).attr("y1",o).attr("y2",o),{titleNode:u,y:o}},Re=(e,t,l,c)=>{let u=e.append("text").attr("class","req reqLabel").attr("id",t).attr("x",y.rect_padding).attr("y",c).attr("dominant-baseline","hanging"),d=0,h=[];return l.forEach(o=>{let p=o.length;for(;p>30&&d<3;){let R=o.substring(0,30);p=(o=o.substring(30,o.length)).length,h[h.length]=R,d++}if(3==d){let R=h[h.length-1];h[h.length-1]=R.substring(0,R.length-4)+"..."}else h[h.length]=o;d=0}),h.forEach(o=>{u.append("tspan").attr("x",y.rect_padding).attr("dy",y.line_height).text(o)}),u},P=e=>e.replace(/\s/g,"").replace(/\./g,"_"),st={parser:se,db:{RequirementType:{REQUIREMENT:"Requirement",FUNCTIONAL_REQUIREMENT:"Functional Requirement",INTERFACE_REQUIREMENT:"Interface Requirement",PERFORMANCE_REQUIREMENT:"Performance Requirement",PHYSICAL_REQUIREMENT:"Physical Requirement",DESIGN_CONSTRAINT:"Design Constraint"},RiskLevel:{LOW_RISK:"Low",MED_RISK:"Medium",HIGH_RISK:"High"},VerifyType:{VERIFY_ANALYSIS:"Analysis",VERIFY_DEMONSTRATION:"Demonstration",VERIFY_INSPECTION:"Inspection",VERIFY_TEST:"Test"},Relationships:{CONTAINS:"contains",COPIES:"copies",DERIVES:"derives",SATISFIES:"satisfies",VERIFIES:"verifies",REFINES:"refines",TRACES:"traces"},getConfig:()=>(0,T.c)().req,addRequirement:(e,t)=>(void 0===j[e]&&(j[e]={name:e,type:t,id:m.id,text:m.text,risk:m.risk,verifyMethod:m.verifyMethod}),m={},j[e]),getRequirements:()=>j,setNewReqId:e=>{void 0!==m&&(m.id=e)},setNewReqText:e=>{void 0!==m&&(m.text=e)},setNewReqRisk:e=>{void 0!==m&&(m.risk=e)},setNewReqVerifyMethod:e=>{void 0!==m&&(m.verifyMethod=e)},setAccTitle:T.s,getAccTitle:T.g,setAccDescription:T.b,getAccDescription:T.a,addElement:e=>(void 0===z[e]&&(z[e]={name:e,type:V.type,docRef:V.docRef},T.l.info("Added new requirement: ",e)),V={},z[e]),getElements:()=>z,setNewElementType:e=>{void 0!==V&&(V.type=e)},setNewElementDocRef:e=>{void 0!==V&&(V.docRef=e)},addRelationship:(e,t,l)=>{ae.push({type:e,src:t,dst:l})},getRelationships:()=>ae,clear:()=>{ae=[],m={},j={},V={},z={},(0,T.v)()}},renderer:{draw:(e,t,l,c)=>{y=(0,T.c)().requirement;const u=y.securityLevel;let d;"sandbox"===u&&(d=(0,X.Ys)("#i"+t));const h=(0,X.Ys)("sandbox"===u?d.nodes()[0].contentDocument.body:"body").select(`[id='${t}']`);((e,t)=>{let l=e.append("defs").append("marker").attr("id",le.CONTAINS+"_line_ending").attr("refX",0).attr("refY",t.line_height/2).attr("markerWidth",t.line_height).attr("markerHeight",t.line_height).attr("orient","auto").append("g");l.append("circle").attr("cx",t.line_height/2).attr("cy",t.line_height/2).attr("r",t.line_height/2).attr("fill","none"),l.append("line").attr("x1",0).attr("x2",t.line_height).attr("y1",t.line_height/2).attr("y2",t.line_height/2).attr("stroke-width",1),l.append("line").attr("y1",0).attr("y2",t.line_height).attr("x1",t.line_height/2).attr("x2",t.line_height/2).attr("stroke-width",1),e.append("defs").append("marker").attr("id",le.ARROW+"_line_ending").attr("refX",t.line_height).attr("refY",.5*t.line_height).attr("markerWidth",t.line_height).attr("markerHeight",t.line_height).attr("orient","auto").append("path").attr("d",`M0,0\n      L${t.line_height},${t.line_height/2}\n      M${t.line_height},${t.line_height/2}\n      L0,${t.line_height}`).attr("stroke-width",1)})(h,y);const o=new we.k({multigraph:!1,compound:!1,directed:!0}).setGraph({rankdir:y.layoutDirection,marginx:20,marginy:20,nodesep:100,edgesep:100,ranksep:100}).setDefaultEdgeLabel(function(){return{}});let p=c.db.getRequirements(),R=c.db.getElements(),O=c.db.getRelationships();((e,t,l)=>{Object.keys(e).forEach(c=>{let u=e[c];c=P(c),T.l.info("Added new requirement: ",c);const d=l.append("g").attr("id",c),h=pe(d,"req-"+c);let o=ge(d,c+"_title",[`<<${u.type}>>`,`${u.name}`]);Re(d,c+"_body",[`Id: ${u.id}`,`Text: ${u.text}`,`Risk: ${u.risk}`,`Verification: ${u.verifyMethod}`],o.y);const p=h.node().getBBox();t.setNode(c,{width:p.width,height:p.height,shape:"rect",id:c})})})(p,o,h),((e,t,l)=>{Object.keys(e).forEach(c=>{let u=e[c];const d=P(c),_=l.append("g").attr("id",d),h="element-"+d,o=pe(_,h);let p=ge(_,h+"_title",["<<Element>>",`${c}`]);Re(_,h+"_body",[`Type: ${u.type||"Not Specified"}`,`Doc Ref: ${u.docRef||"None"}`],p.y);const R=o.node().getBBox();t.setNode(d,{width:R.width,height:R.height,shape:"rect",id:d})})})(R,o,h),((e,t)=>{e.forEach(function(l){let c=P(l.src),u=P(l.dst);t.setEdge(c,u,{relationship:l})})})(O,o),(0,$e.bK)(o),function(e,t){t.nodes().forEach(function(l){void 0!==l&&void 0!==t.node(l)&&(e.select("#"+l),e.select("#"+l).attr("transform","translate("+(t.node(l).x-t.node(l).width/2)+","+(t.node(l).y-t.node(l).height/2)+" )"))})}(h,o),O.forEach(function(v){!function(e,t,l,c,u){const d=l.edge(P(t.src),P(t.dst)),_=(0,X.jvg)().x(function(o){return o.x}).y(function(o){return o.y}),h=e.insert("path","#"+c).attr("class","er relationshipLine").attr("d",_(d.points)).attr("fill","none");t.type==u.db.Relationships.CONTAINS?h.attr("marker-start","url("+T.e.getUrl(y.arrowMarkerAbsolute)+"#"+t.type+"_line_ending)"):(h.attr("stroke-dasharray","10,7"),h.attr("marker-end","url("+T.e.getUrl(y.arrowMarkerAbsolute)+"#"+ye_ReqMarkers.ARROW+"_line_ending)")),((e,t,l,c)=>{const u=t.node().getTotalLength(),d=t.node().getPointAtLength(.5*u),_="rel"+fe;fe++;const o=e.append("text").attr("class","req relationshipLabel").attr("id",_).attr("x",d.x).attr("y",d.y).attr("text-anchor","middle").attr("dominant-baseline","middle").text(c).node().getBBox();e.insert("rect","#"+_).attr("class","req reqLabelBox").attr("x",d.x-o.width/2).attr("y",d.y-o.height/2).attr("width",o.width).attr("height",o.height).attr("fill","white").attr("fill-opacity","85%")})(e,h,0,`<<${t.type}>>`)}(h,v,o,t,c)});const N=y.rect_padding,x=h.node().getBBox(),$=x.width+2*N,k=x.height+2*N;(0,T.i)(h,k,$,y.useMaxWidth),h.attr("viewBox",`${x.x-N} ${x.y-N} ${$} ${k}`)}},styles:e=>`\n\n  marker {\n    fill: ${e.relationColor};\n    stroke: ${e.relationColor};\n  }\n\n  marker.cross {\n    stroke: ${e.lineColor};\n  }\n\n  svg {\n    font-family: ${e.fontFamily};\n    font-size: ${e.fontSize};\n  }\n\n  .reqBox {\n    fill: ${e.requirementBackground};\n    fill-opacity: 1.0;\n    stroke: ${e.requirementBorderColor};\n    stroke-width: ${e.requirementBorderSize};\n  }\n  \n  .reqTitle, .reqLabel{\n    fill:  ${e.requirementTextColor};\n  }\n  .reqLabelBox {\n    fill: ${e.relationLabelBackground};\n    fill-opacity: 1.0;\n  }\n\n  .req-title-line {\n    stroke: ${e.requirementBorderColor};\n    stroke-width: ${e.requirementBorderSize};\n  }\n  .relationshipLine {\n    stroke: ${e.relationColor};\n    stroke-width: 1;\n  }\n  .relationshipLabel {\n    fill: ${e.relationLabelColor};\n  }\n\n`}}}]);