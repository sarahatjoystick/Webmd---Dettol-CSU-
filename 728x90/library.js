function trace(e){console&&console.log(e)}function $(e){return document.querySelector(e)}function hasClass(e,t){return(" "+e.className+" ").indexOf(" "+t+" ")>-1}function addClass(e,t){e.classList?e.classList.add(t):e.className+=" "+t}function removeClass(e,t){e.classList?e.classList.remove(t):e.className=e.className.replace(new RegExp("(^|\\b)"+t.split(" ").join("|")+"(\\b|$)","gi")," ")}function isMobile(){var e=navigator.userAgent||navigator.vendor||window.opera;return/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(e)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(e.substr(0,4))?(trace("mobile browser detected"),!0):(trace("desktop browser detected"),!1)}function loadFile(e,t){var i=new Loader;i.queue(e,t)}function enablerInitialized(){Enabler.isPageLoaded()?pageLoaded():Enabler.addEventListener(studio.events.StudioEvent.PAGE_LOADED,pageLoaded)}function pageLoaded(){var e=navigator.userAgent;e.indexOf("MSIE")>0?e.indexOf("10")>0||e.indexOf("11")>0?adSupported():backup():adSupported()}function adSupported(){console&&console.log("[Studio Enabler] Callback set to: init()\n				 Common methods: Enabler.exitoverride(ID, URL), Enabler.counter(ID, true)\n				 Custom methods: loadVideoMetrics(), getURL(URL)"),init()}function getURL(e){var t;switch(typeof e){case"object":t=[];for(var i=0;i<e.length;i++)t.push(Enabler.getUrl(e[i]));break;default:t=Enabler.getUrl(e)}return t}function loadVideoMetrics(){Enabler&&(Enabler.loadModule(studio.module.ModuleId.VIDEO),console&&console.log('Studio Video Metrics Loaded\nUSAGE: studio.video.Reporter.attach("VIDEO_ID", VIDEO_ELEMENT);'))}function uniq(e){var t={"boolean":{},number:{},string:{}},i=[];return e.filter(function(e){var n=typeof e;return n in t?t[n].hasOwnProperty(e)?!1:t[n][e]=!0:i.indexOf(e)>=0?!1:i.push(e)})}var EventBusClass={};EventBusClass=function(){this.listeners={}},EventBusClass.prototype={addEventListener:function(e,t,i){for(var n=[],s=arguments.length,a=0;s>a;a++)n.push(arguments[a]);n=n.length>3?n.splice(3,n.length-1):[],"undefined"!=typeof this.listeners[e]?this.listeners[e].push({scope:i,callback:t,args:n}):this.listeners[e]=[{scope:i,callback:t,args:n}]},removeEventListener:function(e,t,i){if("undefined"!=typeof this.listeners[e]){for(var n=this.listeners[e].length,s=[],a=0;n>a;a++){var o=this.listeners[e][a];o.scope==i&&o.callback==t||s.push(o)}this.listeners[e]=s}},hasEventListener:function(e,t,i){if("undefined"!=typeof this.listeners[e]){var n=this.listeners[e].length;if(void 0===t&&void 0===i)return n>0;for(var s=0;n>s;s++){var a=this.listeners[e][s];if((i?a.scope==i:!0)&&a.callback==t)return!0}}return!1},dispatch:function(e,t){for(var i=0,n={type:e,target:t},s=[],a=arguments.length,o=0;a>o;o++)s.push(arguments[o]);if(s=s.length>2?s.splice(2,s.length-1):[],s=[n].concat(s),"undefined"!=typeof this.listeners[e])for(var r=this.listeners[e].length,o=0;r>o;o++){var l=this.listeners[e][o];if(l&&l.callback){var c=s.concat(l.args);l.callback.apply(l.scope,c),i+=1}}},getEvents:function(){var e="";for(var t in this.listeners)for(var i=this.listeners[t].length,n=0;i>n;n++){var s=this.listeners[t][n];e+=s.scope&&s.scope.className?s.scope.className:"anonymous",e+=" listen for '"+t+"'\n"}return e}};var EventBus=new EventBusClass,loadImage=function(e,t){switch(typeof e){case"object":for(var i=0,n=0;n<e.length;n++){var s=new Image;s.onload=function(){++i==e.length&&t&&t()},s.onerror=function(e){console&&console.log(e)},s.src=e[n]}break;default:var s=new Image;s.onload=t,s.onerror=function(e){console&&console.log(e)},s.src=e}},Loader=function(){};Loader.prototype={queue:function(e,t){"string"==typeof e?(this.scriptArray=new Array(String(e)),this.totalRequired=1):(this.scriptArray=e,this.totalRequired=e.length),this.loadCount=0,this.callback=t,this.processScript(this.loadCount)},processScript:function(e){console&&console.log("loading file "+(e+1)+" of "+this.totalRequired+" ("+this.scriptArray[e]+")"),this.writeScript(this.scriptArray[e])},loaded:function(e){this.loadCount++,this.loadCount==this.totalRequired&&"function"==typeof this.callback?(trace("all scripts loaded"),this.callback.call()):this.processScript(this.loadCount)},writeScript:function(e){var t=this,i;switch(e.split(".")[e.split(".").length-1]){case"css":i=document.createElement("link"),i.rel="stylesheet",i.type="text/css",i.href=e;break;default:i=document.createElement("script"),i.type="text/javascript",i.async=!0,i.src=e}i.addEventListener("load",function(e){t.loaded(e)},!1);var n=document.getElementsByTagName("head")[0];n.appendChild(i)}},Enabler.isInitialized()?enablerInitialized():Enabler.addEventListener(studio.events.StudioEvent.INIT,enablerInitialized);