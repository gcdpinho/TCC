/*
 jQuery Toggles v4.0.0
Copyright 2012 - 2015 Simon Tabor - MIT License
https://github.com/simontabor/jquery-toggles / http://simontabor.com/labs/toggles
*/
(function(g){function p(q){var p=g.Toggles=function(c,a){var g=this;if("boolean"===typeof a&&c.data("toggles"))c.data("toggles").toggle(a);else{for(var k="on drag click width height animate easing type checkbox".split(" "),b={},l=0;l<k.length;l++){var t=c.data("toggle-"+k[l]);"undefined"!==typeof t&&(b[k[l]]=t)}a=q.extend({drag:!0,click:!0,text:{on:"ON",off:"OFF"},on:!1,animate:250,easing:"swing",checkbox:null,clicker:null,width:0,height:0,type:"compact",event:"toggle"},a||{},b);c.data("toggles",
g);var f=!a.on,n="select"===a.type,p=q(a.checkbox),k=a.clicker&&q(a.clicker),d=a.height||c.height()||20,m=a.width||c.width()||50;c.height(d);c.width(m);var b=function(a){return q('<div class="toggle-'+a+'">')},r=b("slide"),s=b("inner"),w=b("on"),x=b("off"),h=b("blob"),b=d/2,l=m-b,t=a.text;w.css({height:d,width:l,textIndent:n?"":-d/3,lineHeight:d+"px"}).html(t.on);x.css({height:d,width:l,marginLeft:n?"":-b,textIndent:n?"":d/3,lineHeight:d+"px"}).html(t.off);h.css({height:d,width:d,marginLeft:-b});
s.css({width:2*m-d,marginLeft:n?0:-m+d});n&&(r.addClass("toggle-select"),c.css("width",2*l),h.hide());s.append(w,h,x);r.html(s);c.html(r);var v=g.toggle=function(b,e,A){f!==b&&(f=g.active=!f,c.data("toggle-active",f),x.toggleClass("active",!f),w.toggleClass("active",f),p.prop("checked",f),A||c.trigger(a.event,f),n||(b=f?0:-m+d,s.stop().animate({marginLeft:b},e?0:a.animate,a.easing)))},b=function(b){c.hasClass("disabled")||b.target===h[0]&&a.drag||v()};if(a.click&&(!k||!k.has(c).length))c.on("click",
b);if(k)k.on("click",b);if(a.drag&&!n){var e,y=(m-d)/4,z=function(b){c.off("mousemove");r.off("mouseleave");h.off("mouseup");!e&&a.click&&"mouseleave"!==b.type?v():(f?e<-y:e>y)?v():s.stop().animate({marginLeft:f?0:-m+d},a.animate/2,a.easing)},u=-m+d;h.on("mousedown",function(a){if(!c.hasClass("disabled")){e=0;h.off("mouseup");r.off("mouseleave");var b=a.pageX;c.on("mousemove",h,function(a){e=a.pageX-b;f?(a=e,0<e&&(a=0),e<u&&(a=u)):(a=e+u,0>e&&(a=u),e>-u&&(a=0));s.css("margin-left",a)});h.on("mouseup",
z);r.on("mouseleave",z)}})}v(a.on,!0,!0)}};q.fn.toggles=function(c){return this.each(function(){new p(q(this),c)})}}"function"===typeof define&&define.amd?define(["jquery"],p):p(g.jQuery||g.Zepto||g.ender||g.$||$)})(this);
 
