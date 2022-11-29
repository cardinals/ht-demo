!function(V,K){"use strict";var G="ht",p=V[G],n="innerHTML",t="className",S=null,k="px",i=p.Default,E=i.getInternal(),e="0",R=function(){return document},m=function(L){return R().createElement(L)},r=function(){return m("canvas")},U=function(m,s,b){m.style.setProperty(s,b,S)},d=function(B,u,q){i.def(p.widget[B],u,q)},j=function(_,t){_.appendChild(t)},A=function(I,l){I.removeChild(l)},o=E.addEventListener,P=E.removeEventListener,c=i.isTouchable,x=i.isTouchEvent;E.addMethod(i,{menuLabelFont:(c?"16":"13")+"px arial, sans-serif",menuLabelColor:"#000",menuBackground:"#F0EFEE",menuHoverBackground:"#648BFE",menuHoverLabelColor:"#fff",menuSeparatorWidth:1,menuSeparatorColor:"#999"},!0),p.widget.Menu=function(V){var K=this,D=K._view=E.createView(null,K),n=K.$1g=new p.widget.ContextMenu,g=m("ul");n._r=!0,n._view[t]+=" ht-widget-dropdownmenu",D[t]="ht-widget-menu",g[t]="header",U(D,"margin",e),U(D,"padding",e),U(D,"background",i.menuBackground),U(D,"-webkit-user-select","none"),U(D,"-moz-user-select","none"),U(D,"user-select","none"),U(D,"text-align","left"),U(D,"border-bottom",i.menuSeparatorWidth+"px solid "+i.menuSeparatorColor),U(D,"cursor","default"),U(D,"overflow","auto"),U(D,"white-space","nowrap"),U(D,"font",i.menuLabelFont),U(D,"color",i.menuLabelColor),U(D,"box-sizing","border-box"),U(D,"-moz-box-sizing","border-box"),U(g,"list-style","none"),U(g,"margin",e),U(g,"padding",e),U(g,"display","inline-block"),j(D,g),K.setItems(V),K.$2g=function(q){K.$3g(q)},K.$4g=function(V){K.$5g(V)},K.$6g=function(l){K.$7g(l)},K.$8g=function(F){K.$9g(F)},K.$9b=function(i){K.$10g(i)},K._autoShow=!0,K.setAutoShow(!1),n.afterHide=function(){K.$11g()},n.afterShow=function(){K.$12g()},P(R(),"keydown",n.$3b),K.$3b=function(G){K.$13g(G)},K.invalidate()},d("Menu",K,{_items:S,$14g:i.menuHoverBackground,$15g:i.menuHoverLabelColor,$16g:{},_enableGlobalKey:!1,ms_v:1,$21g:"smallicons",$22g:0,$23g:0,$24g:"left",getDropDownMenu:function(){return this.$1g},setLayout:function(p){var x=this;if(x.$21g=p,x.setItems(x._items),"largeicons"===p){for(var z=x._view.querySelectorAll(".header-item"),o=0,$=0;$<z.length;$++){var s=z[$];o=Math.max(o,s.clientWidth)}for(var $=0;$<z.length;$++){var s=z[$];U(s,"min-width",o+k)}}this.invalidate()},getLayout:function(){return this.$21g},setHeaderItemHGap:function(O){this.$22g=O;for(var X=this._view.querySelectorAll(".header-item"),a=0;a<X.length;a++){var Z=X[a];U(Z,"margin-left",O+k),U(Z,"margin-right",O+k)}},getHeaderItemHGap:function(){return this.$22g},setHeaderItemVGap:function(W){this.$23g=W;for(var w=this._view.querySelectorAll(".header-item"),T=0;T<w.length;T++){var i=w[T];U(i,"margin-top",W+k),U(i,"margin-bottom",W+k)}},getHeaderItemVGap:function(){return this.$24g},setHeaderItemAlign:function(M){this.$24g=M,U(this._view,"text-align",M)},getHeaderItemAlign:function(){return this.$23g},enableGlobalKey:function(){var E=this,y=E._enableGlobalKey;y===!1&&(o(R(),"keydown",E.$3b),E._enableGlobalKey=!0)},disableGlobalKey:function(){this._enableGlobalKey=!1,P(R(),"keydown",this.$3b)},setHoverBackground:function(I){this.$14g=I},setHoverColor:function(k){this.$15g=k},setItems:function(K){var O=this,S=O._view,i=O.$21g;if(O._items=K,S.children[0][n]="",O.$16g={},K&&K.length){for(var h=S.children[0],_=0,H=R().createDocumentFragment();_<K.length;_++){var b=K[_],z=m("li"),g=m("span");if(b.icon){var p=r();p[t]="menu-item-icon","smallicons"===i?(U(p,"height","1.2em"),U(p,"width","1.2em"),U(p,"vertical-align","middle")):(U(p,"height","32px"),U(p,"width","32px"),U(p,"display","block"),U(p,"margin","0 auto")),p.$20g=b.icon,j(z,p)}z[t]="header-item",U(z,"display","inline-block"),U(z,"vertical-align","top"),U(z,"padding","0 1.2em"),U(z,"line-height","1.8em"),"largeicons"===i&&U(z,"text-align","center"),U(z,"background-color","rgba(0,0,0,0)"),z.setAttribute("data-index",_),O.$16g[_]=b.items,g[n]=b.label,"iconsonly"!==i&&j(z,g),j(H,z)}j(h,H)}},showDropdownMenu:function(o){var I=this,J=I.$16g[o],m=I.$1g,$=I._view.children[0].children[o],Q=I.$17g;if($&&$!==Q){Q&&I.hideDropdownMenu();var E=$.getBoundingClientRect(),U=i.getWindowInfo();I.$17g=$,m.setItems(J),m.show(E.left+U.left,E.top+E.height+U.top,!1)}},hideDropdownMenu:function(){this.$1g.hide()},getItemByProperty:function(R,T){var P=this,e=P._items;return e&&0!==e.length?P.$1g.getItemByProperty(R,T,e):S},$12g:function(){var m=this,D=m.$17g;D.style.background=m.$14g,D.style.color=m.$15g,m._autoShow||o(R(),c?"touchstart":"mousedown",m.$9b)},$11g:function(){var A=this,D=A.$17g;D&&(D.style.background="",D.style.color="",A.$17g=S),P(R(),c?"touchstart":"mousedown",A.$9b)},$10g:function(X){var q=this,G=q._view,d=q.$1g,_=G.children[0];!R().body.contains(G)||_.contains(X.target)||d._view.contains(X.target)||q.hideDropdownMenu()},$13g:function(O){var V=this,D=V.$1g;R().body.contains(V._view)&&D.$13b.$4b.call(D.$13b,O,V._items)},setAutoShow:function(g){var V=this,F=V.$1g,e=V._view;V._autoShow!==g&&(V._autoShow?(P(e,"mouseover",V.$2g),P(e,"mouseout",V.$4g),P(F._view,"mouseout",V.$4g),c||(o(e,"mouseover",V.$8g),o(e,"mouseout",V.$8g)),o(e,c?"touchstart":"mousedown",V.$6g)):(P(e,"mouseover",V.$8g),P(e,"mouseout",V.$8g),P(e,c?"touchstart":"mousedown",V.$6g),P(R(),c?"touchstart":"mousedown",V.$9b),c||(o(e,"mouseover",V.$2g),o(e,"mouseout",V.$4g),o(F._view,"mouseout",V.$4g))),V._autoShow=g)},$3g:function(z){var C=this,h=C._view.children[0],L=z.target;if(h!==L&&h.contains(L)){for(;"header-item"!==L[t];)L=L.parentNode;C.showDropdownMenu(L.getAttribute("data-index"))}},$5g:function(d){var M=this,f=M._view.children[0],w=M.$1g,h=d.target,p=d.relatedTarget;!f.contains(h)&&!w._view.contains(h)||f.contains(p)||w._view.contains(p)||M.hideDropdownMenu()},$7g:function(v){v.preventDefault();var z=this,L=z._view.children[0],S=z.$1g,_=v.target;if(i.isLeftButton(v)&&L!==_&&L.contains(_))if(x(v)){for(;"header-item"!==_[t];)_=_.parentNode;var Y=_.getAttribute("data-index"),S=z.$1g,A=z._view.children[0].children[Y],f=z.$17g;S.isShowing()&&z.hideDropdownMenu(),A!==f&&z.showDropdownMenu(Y)}else if(S.isShowing())z.hideDropdownMenu();else{for(;"header-item"!==_[t];)_=_.parentNode;z.showDropdownMenu(_.getAttribute("data-index"))}},$9g:function($){var H=this,F=H._view,E=H.$1g,L=$.target;if(F.contains(L)){for(var r=F.querySelectorAll(".header-item"),W=S,C=0;C<r.length;C++){var y=r[C];y.style.background="",y.style.color="","mouseover"===$.type?y.contains(L)&&(W=y):"mouseout"===$.type&&E.isShowing()&&H.$17g===y&&(W=y)}E.isShowing()&&(W||(W=H.$17g),H.showDropdownMenu(W.getAttribute("data-index"))),W&&(W.style.background=H.$14g,W.style.color=H.$15g)}},getShowingMenuIndex:function(){var I=this.$17g;return I?I.getAttribute("data-index"):-1},addTo:function(E){var F=this,L=F._view;j(E,L),F.invalidate()},dispose:function(){var k=this,t=k._view,w=k.$1g;t&&(k._autoShow?(P(t,"mouseover",k.$2g),P(t,"mouseout",k.$4g),P(w._view,"mouseout",k.$4g)):(P(t,"mouseover",k.$8g),P(t,"mouseout",k.$8g),P(t,c?"touchstart":"mousedown",k.$6g),P(R(),c?"touchstart":"mousedown",k.$9b)),P(R(),"keydown",k.$3b),w.dispose(),t.parentNode&&A(t.parentNode,t),k._view=k.$1g=k.$16g=k._items=k.$17g=k.$2g=k.$4g=k.$6g=k.$8g=k.$9b=k.$3b=S)},$19g:function(_,o,x,O){var H=E.initContext(_);E.translateAndScale(H,0,0,1),H.clearRect(0,0,x,O),i.drawStretchImage(H,i.getImage(o),"fill",0,0,x,O),H.restore()},validateImpl:function(){var c,Q,f,v=this,d=v._view,S=d.querySelectorAll(".menu-item-icon");for(f=0;f<S.length;f++){var J=S[f];c=J.clientWidth,Q=J.clientHeight,c&&Q&&(E.setCanvas(J,c,Q),v.$19g(J,i.getImage(J.$20g),c,Q))}}})}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);