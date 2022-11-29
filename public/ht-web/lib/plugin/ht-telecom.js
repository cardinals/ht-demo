!function(J,R){"use strict";var b=ht.AlarmSeverity=function(Y,N,t,z,l){this.value=Y,this.name=N,this.nickName=t,this.color=z,this.displayName=l};ht.Default.def("ht.AlarmSeverity",R,{toString:function(){return this.displayName||this.name}}),function(){b.severities=new ht.List,b._vm={},b._nm={},b._cp=function(I,d){if(I&&d){var A=I.value-d.value;return A>0?1:0>A?-1:0}return I&&!d?1:!I&&d?-1:0},b.each=function(P,D){b.severities.each(P,D)},b.getSortFunction=function(){return b._cp},b.setSortFunction=function(K){b._cp=K,b.severities.sort(K)},b.add=function(B,q,N,H,l){var f=new b(B,q,N,H,l);return b._vm[B]=f,b._nm[q]=f,b.severities.add(f),b.severities.sort(b._cp),f},b.remove=function(_){var G=b._nm[_];return G&&(delete b._nm[_],delete b._vm[G.value],b.severities.remove(G)),G},b.CRITICAL=b.add(500,"Critical","C","#FF0000"),b.MAJOR=b.add(400,"Major","M","#FFA000"),b.MINOR=b.add(300,"Minor","m","#FFFF00"),b.WARNING=b.add(200,"Warning","W","#00FFFF"),b.INDETERMINATE=b.add(100,"Indeterminate","N","#C800FF"),b.CLEARED=b.add(0,"Cleared","R","#00FF00"),b.isClearedAlarmSeverity=function(I){return I?0===I.value:!1},b.getByName=function(e){return b._nm[e]},b.getByValue=function(i){return b._vm[i]},b.clear=function(){b.severities.clear(),b._vm={},b._nm={}},b.compare=function(K,v){return b._cp(K,v)}}();var r=ht.AlarmState=function(h){this._d=h,this._nm={},this._am={},this._ps=null,this._haa=null,this._hna=null,this._hoa=null,this._hta=null,this._hls=!1,this._aac=0,this._nac=0};ht.Default.def("ht.AlarmState",R,{_ep:!0,_f:function(){this._c1(),this._c2(),this._c3(),this._c4(),this._c5(),this._c6(),this._c7(),this._d.fp("alarmState",null,this)},getHighestAcknowledgedAlarmSeverity:function(){return this._haa},getHighestNewAlarmSeverity:function(){return this._hna},getHighestOverallAlarmSeverity:function(){return this._hoa},getHighestNativeAlarmSeverity:function(){return this._hta},hasLessSevereNewAlarms:function(){return this._hls},_c1:function(){var I=null;for(var o in this._am)o=b.getByName(o),b.isClearedAlarmSeverity(o)||0!==this.getAcknowledgedAlarmCount(o)&&(I=I?b.compare(I,o)>0?I:o:o);this._haa=I},_c2:function(){var c=null;for(var F in this._nm)F=b.getByName(F),b.isClearedAlarmSeverity(F)||0!==this.getNewAlarmCount(F)&&(c=c?b.compare(c,F)>0?c:F:F);this._hna=c},_c3:function(){if(!this._hna)return this._hls=!1,void 0;for(var A in this._nm)if(A=b.getByName(A),!b.isClearedAlarmSeverity(A)&&0!==this.getNewAlarmCount(A)&&b.compare(this._hna,A)>0)return this._hls=!0,void 0;this._hls=!1},_c4:function(){var e=this._haa,c=this._hna,O=this._ps;this._hoa=e,b.compare(c,this._hoa)>0&&(this._hoa=c),b.compare(O,this._hoa)>0&&(this._hoa=O)},_c5:function(){var g=this._haa,M=this._hna;this._hta=g,b.compare(M,this._hta)>0&&(this._hta=M)},increaseAcknowledgedAlarm:function(P,g){if(0!==g){g=g||1;var q=this._am[P.name]||0;q+=g,this._am[P.name]=q,this._f()}},increaseNewAlarm:function($,t){if(0!==t){t=t||1;var E=this._nm[$.name]||0;E+=t,this._nm[$.name]=E,this._f()}},decreaseAcknowledgedAlarm:function(K,w){if(0!==w){w||(w=1);var G=this._am[K.name]||0;if(G-=w,0>G)throw"Alarm count can not be negative";this._am[K.name]=G,this._f()}},decreaseNewAlarm:function(U,B){if(0!==B){B||(B=1);var L=this._nm[U.name]||0;if(L-=B,0>L)throw"Alarm count can not be negative";this._nm[U.name]=L,this._f()}},acknowledgeAlarm:function(I){this.decreaseNewAlarm(I,1),this.increaseAcknowledgedAlarm(I,1)},acknowledgeAllAlarms:function(Q){if(Q){var T=this.getNewAlarmCount(Q);this.decreaseNewAlarm(Q,T),this.increaseAcknowledgedAlarm(Q,T)}else for(var k in this._nm)this.acknowledgeAllAlarms(b.getByName(k))},_c6:function(){this._aac=0;for(var X in this._am)X=b.getByName(X),this._aac+=this.getAcknowledgedAlarmCount(X)},getAcknowledgedAlarmCount:function(D){return D?this._am[D.name]||0:this._aac},getAlarmCount:function(X){return this.getAcknowledgedAlarmCount(X)+this.getNewAlarmCount(X)},_c7:function(){this._nac=0;for(var t in this._nm)this._nac+=this.getNewAlarmCount(b.getByName(t))},getNewAlarmCount:function(a){return a?this._nm[a.name]||0:this._nac},setNewAlarmCount:function(t,U){this._nm[t.name]=U,this._f()},removeAllNewAlarms:function($){$?delete this._nm[$]:this._nm={},this._f()},setAcknowledgedAlarmCount:function(G,w){this._am[G.name]=w,this._f()},removeAllAcknowledgedAlarms:function($){$?delete this._am[$.name]:this._am={},this._f()},isEmpty:function(){return!this._hoa},clear:function(){this._am={},this._nm={},this._f()},getPropagateSeverity:function(){return this._ps},setPropagateSeverity:function(C){if(this._ep||(C=null),this._ps!==C){var T=this._ps;this._ps=C,this._f(),this._d.fp("propagateSeverity",T,C)}},isEnablePropagation:function(){return this._ep},setEnablePropagation:function(H){var t=this._ep;this._ep=H,this._d.fp("enablePropagation",t,H)&&(H||this.setPropagateSeverity(null))}});var L=ht.AlarmStatePropagator=function(u){this._dataModel=u,this._enable=!1,this._isPropagating=!1};ht.Default.def("ht.AlarmStatePropagator",R,{getDataModel:function(){return this._dataModel},isEnable:function(){return this._enable},setEnable:function(T){this._enable!==T&&(this._enable=T,this._enable?(this._dataModel.mm(this.handleDataModelChange,this),this._dataModel.md(this.handleDataPropertyChange,this),this._dataModel.each(function(z){this.propagate(z)},this)):(this._dataModel.umm(this.handleDataModelChange,this),this._dataModel.umd(this.handleDataPropertyChange,this)))},handleDataModelChange:function(A){A.data&&this.propagate(A.data)},handleDataPropertyChange:function(x){if("alarmState"===x.property||"enablePropagation"===x.property)this.propagate(x.data);else if("parent"===x.property){var K=x.oldValue;K&&this.propagate(K),this.propagate(x.data)}},propagate:function(F){F&&!this._isPropagating&&(this._isPropagating=!0,this.propagateToTop(F),this._isPropagating=!1)},propagateToTop:function(n){for(this.propagateToParent(null,n);n&&n.getParent();)this.propagateToParent(n,n.getParent()),n=n.getParent()},propagateToParent:function(v,B){var h=null;B.getChildren().each(function(e){var j=e.getAlarmState().getHighestOverallAlarmSeverity();b.compare(j,h)>0&&(h=j)}),B.getAlarmState().setPropagateSeverity(h)}}),ht.AlarmStateStatistics=function(y){this.sumNew=0,this.sumAcked=0,this.sumTotal=0,this.severtiyMap={},this.dataMap={},this.setDataModel(y)},ht.Default.def("ht.AlarmStateStatistics",R,{ms_fire:1,getDataModel:function(){return this._dataModel},setDataModel:function(t){var H=this._dataModel;H!==t&&(H&&(H.umd(this.handleDataPropertyChange,this),H.umm(this.handleDataModelChange,this),this.severtiyMap={},this.dataMap={}),this._dataModel=t,this.reset(),t.md(this.handleDataPropertyChange,this),t.mm(this.handleDataModelChange,this),this.fp("dataModel",H,t))},dispose:function(){this._dataModel.umd(this.handleDataPropertyChange,this),this._dataModel.umm(this.handleDataModelChange,this),delete this._dataModel},handleDataPropertyChange:function(d){"alarmState"===d.property&&(this.increase(d.data),this.fireAlarmStateChange())},handleDataModelChange:function(n){"add"===n.kind?(this.increase(n.data),this.fireAlarmStateChange()):"remove"===n.kind?(this.decrease(n.data),this.fireAlarmStateChange()):"clear"===n.kind&&(this.severtiyMap={},this.dataMap={},this.fireAlarmStateChange())},fireAlarmStateChange:function(){this.sumAcked=0,this.sumNew=0,this.sumTotal=0,b.each(function(i){var c=this.getSumInfo(i);this.sumAcked+=c.ackedCount,this.sumNew+=c.newCount,this.sumTotal+=c.totalCount},this),this.fp("alarmState",!1,!0)},getNewAlarmCount:function(p){if(!p)return this.sumNew;var L=this.getSumInfo(p);return L.newCount},getAcknowledgedAlarmCount:function(L){if(!L)return this.sumAcked;var Y=this.getSumInfo(L);return Y.ackedCount},getTotalAlarmCount:function(g){if(!g)return this.sumTotal;var j=this.getSumInfo(g);return j.totalCount},getSumInfo:function(k){var B=this.severtiyMap[k.name];return B||(B={},B.newCount=0,B.ackedCount=0,B.totalCount=0,this.severtiyMap[k.name]=B),B},decrease:function(V){var F=this.dataMap[V.getId()];F&&(delete this.dataMap[V.getId()],b.each(function(s){var u=F[s.name],_=this.getSumInfo(s);_.newCount=_.newCount-u.newCount,_.ackedCount=_.ackedCount-u.ackedCount,_.totalCount=_.totalCount-u.totalCount},this))},increase:function(F){if(this.decrease(F),!this._filterFunc||this._filterFunc(F)){var E={},c=F.getAlarmState();this.dataMap[F.getId()]=E,b.each(function(j){var R={};R.newCount=c.getNewAlarmCount(j),R.ackedCount=c.getAcknowledgedAlarmCount(j),R.totalCount=c.getAlarmCount(j),E[j.name]=R;var D=this.getSumInfo(j);D.newCount=D.newCount+R.newCount,D.ackedCount=D.ackedCount+R.ackedCount,D.totalCount=D.totalCount+R.totalCount},this)}},reset:function(){this.severtiyMap={},this.dataMap={},this._dataModel.each(this.increase,this),this.fireAlarmStateChange()},setFilterFunc:function(k){var F=this._filterFunc;this._filterFunc=k,this.reset(),this.fp("filterFunc",F,k)},getFilterFunc:function(){return this._filterFunc}});var Y=ht.Data.prototype;Y.getAlarmState=function(){return this._alarmState||(this._alarmState=new r(this))},Y=ht.DataModel.prototype,Y.isEnableAlarmStatePropagator=function(){return!!this._alarmStatePropagator&&this._alarmStatePropagator.isEnable()},Y.setEnableAlarmStatePropagator=function(g){g!=this.isEnableAlarmStatePropagator()&&(g?(this._alarmStatePropagator=new L(this)).setEnable(!0):this._alarmStatePropagator.setEnable(!1))},Y=ht.graph.GraphView.prototype,Y.getNote2=function(d){var C=d.getAlarmState().getHighestNewAlarmSeverity();if(C){var B=d.getAlarmState().getNewAlarmCount(C)+C.nickName;return d.getAlarmState().hasLessSevereNewAlarms()&&(B+="+"),B}return d.s("note2")},Y.getNote2Background=function(B){var b=B.getAlarmState().getHighestNewAlarmSeverity();return b?b.color:B.s("note2.background")},Y.getBodyColor=function(f){var v=f.getAlarmState().getHighestNativeAlarmSeverity();return v?v.color:f.s("body.color")},Y.getBorderColor=function(M){var G=M.getAlarmState().getPropagateSeverity();return G?G.color:M.s("border.color")},Y=ht.widget.TreeView.prototype,Y.getBorderColor=function(c){var O=c.getAlarmState().getPropagateSeverity();return O?O.color:c.s("border.color")},Y.getIcon=function(G){return G.getIcon()?"__alarmIcon__":null},Y=ht.widget.TreeTableView.prototype,Y.getBorderColor=function(i){var h=i.getAlarmState().getPropagateSeverity();return h?h.color:i.s("border.color")},Y.getIcon=function(R){return R.getIcon()?"__alarmIcon__":null},ht.Default.setImage("__alarmIcon__",{width:16,height:16,comps:[{type:"image",name:{func:function(H){return H.getIcon()}},color:{func:function(x){var P=x.getAlarmState().getHighestNativeAlarmSeverity();return P?P.color:x.s("body.color")}},rect:[0,0,16,16]}]});var E=ht.Style;E["note2.expanded"]=!0,E["note2.color"]="#000"}("undefined"!=typeof global?global:"undefined"!=typeof self?self:"undefined"!=typeof window?window:(0,eval)("this"),Object);