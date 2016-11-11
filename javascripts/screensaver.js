// JavaScript Document
    document.addEventListener('DOMContentLoaded',function(){
		(function(){
			var oC=document.getElementsByTagName('canvas')[0];
			var gd=oC.getContext('2d');
			oC.width=document.documentElement.offsetWidth;
			oC.height=document.documentElement.offsetHeight;
			var arr=[];
			var num=0;
			var N=200;
			for(var i=0; i<N; i++){
				arr[i]=1;
			}
			function step(){
				gd.fillStyle='rgba(0,0,0,0.05)';
				gd.fillRect(0,0,oC.width,oC.height);
				gd.save();
				gd.beginPath();
				gd.fillStyle='rgb(255,255,0)';
				for(var j=0; j<arr.length; j++){
					gd.fillText(num,j*10,arr[j]);
					if(num==0){
						num=1;
					}else{
						num=0;
					}
					if(arr[j]>750+Math.random()*10000){
						arr[j]=0;
					}else{
						arr[j]+=10;
					}
				}
			}
			step();
			setInterval(step,30);
			gd.restore();
			oC.onclick=function(){
				this.style.display='none';
			};
		})();
		
		
		(function(){
				var oMsc=document.getElementById('music');
				var oA=oMsc.getElementsByTagName('audio')[0];
				var oRtt=document.getElementById('rotate');
				var oStart=oMsc.querySelector('.start');
				var oRgt2=document.getElementById('right_2');
				var oS2=oRgt2.children[0];
				var oB1=oMsc.querySelector('.bar');
				var oMs=oMsc.querySelector('.meter_s');
				var oMeter=oB1.parentNode;
				var oUl=oMsc.getElementsByTagName('ul')[0];
				var aLi=oUl.children;
				var oT=oMsc.getElementsByTagName('time')[0];
				for(var i=1; i<aLi.length; i++){
					aLi[i].style.display='none';
				}
				function toDou(n){
					return n>=10?''+n:'0'+n;
				}
				function time(n){
					return toDou(Math.floor(n/60))+':'+toDou(Math.floor(n%60));
				}
				function getPos(obj){
					var top=0; 
					var left=0;
					if(obj){
						top+=obj.offsetTop;
						left+=obj.offsetLeft;
						obj=obj.offsetParent;
					}
					return {"top":top,"left":left};
				}
				function play(){
					var scale = oA.currentTime/oA.duration;
					oB1.style.left=oMeter.offsetWidth*scale-5+'px';
					oMs.style.width=oMeter.offsetWidth*scale+'px';
					oT.innerHTML=time(oA.currentTime)+'/'+time(oA.duration);
				}
				oS2.onclick=oStart.onclick=function(){	//主开关
					if(oA.paused){
						oA.play();
						oRtt.style.animation= '2s move linear infinite';
						oStart.style.backgroundImage='url(img/002.png) ';
						oS2.style.backgroundImage='url(img/003.png)';
						oA.ontimeupdate=function(){
							play();
						}
					}else{
						oA.pause();
						oRtt.style.animationPlayState= 'paused';
						oStart.style.backgroundImage='url(img/001.png) ';
						oS2.style.backgroundImage='url(img/004.png)';
					}
				};
				oA.onended=function(){	//播放完成后开关改变状态；
					oRtt.style.animation= 'none';
					oS2.style.backgroundImage='url(img/004.png)';
					oStart.style.backgroundImage='url(img/001.png)';
					oB1.style.left='-5px'; 
					oMs.style.width='0px';
				}
				
				oB1.onmousedown=function(ev){		//拖动进度条（功能未实现）
					var l=ev.clientX-oB1.offsetLeft;
					document.onmousemove=function(ev){
						var x=ev.clientX-l;
						if(x<=-5){
							x=-5;
						}else if(x>=oMeter.offsetWidth-5){
							x=oMeter.offsetWidth-5;
						}
						oMs.style.width=x+5+'px';
						oB1.style.left=x+'px';
					};
					document.onmouseup=function(){
						oA.currentTime=(oB1.offsetLeft+5)/oMeter.offsetWidth*oA.duration;						
						document.onmousemove=null;
						document.omouseup=null;
					};
					return false;
				};
				var oVs=document.querySelector('.volume_switch');
				var oVm=document.querySelector('.volume_meter');
				var oB2=oVm.children[0];
				oVs.onclick=function(){		//音量调节
					if(getStyle(oVm,'display')=='none'){
						oVm.style.display='block';
						oB2.onmousedown=function(ev){
						var h=ev.clientY-oB2.offsetTop;
							document.onmousemove=function(ev){
								var y=ev.clientY-h;
								if(y<=-oB2.offsetHeight/2){
									y=-oB2.offsetHeight/2;
								}else if(y>=oVm.offsetHeight-oB2.offsetHeight/2){
									y=oVm.offsetHeight-oB2.offsetHeight/2;
								}
								oB2.style.top=y+'px';
								oA.volume=(oB2.offsetTop+3)/oVm.offsetHeight;
							};
							document.onmouseup=function(){
								document.onmousemove=null;
								document.omouseup=null;
							};
						return false;
						};
					}else{
						oVm.style.display='none';
					}
					
				}
				oVs.ondblclick=function(){		//双击静音
					if(oA.volume==0){
						oA.volume=1;
					}else{
						oA.volume=0;
					}
				};
			
			})();
			(function(){
				var oNav=document.getElementsByTagName('nav')[0];
				var aLi=oNav.querySelectorAll('li');
				var arr=[];
				for(var i=0; i<aLi.length; i++){
					arr.push(aLi[i].className);
				}
				setInterval(function(){
					arr.push(arr.shift());
					for(var i=0; i<arr.length; i++){
						aLi[i].className=arr[i];
					}
				},3000);				
			})();
			(function(){
				var oClc=document.querySelector('.clock');
				var aS=oClc.querySelectorAll('span');
				var N=12;
				var r=130;
				for(var i=1; i<=N; i++){
					var oB=document.createElement('b');
					oB.innerHTML=i;
					oB.style.width='30px';
					oB.style.height='30px';
					/*oB.style.background='#000';*/
					oB.style.position='absolute';
					oB.style.top=r-r*Math.cos(d2a(360/N*i))+'px';
					oB.style.left=r+r*Math.sin(d2a(360/N*i))+'px';
					oB.style.margin='-15px 0 0 -15px';
					oB.style.font='italic 30px 楷体'
					oB.style.color='#000';
					oClc.appendChild(oB);
				}
				function timer(){
					var oDate=new Date();
					var h=oDate.getHours();
					var m=oDate.getMinutes();
					var s=oDate.getSeconds();
					aS[2].style.transform='rotateZ('+(h%12*30+m/60*30)+'deg)';
					aS[1].style.transform='rotateZ('+(m*6+s/360*5)+'deg)';
					aS[0].style.transform='rotateZ('+s*5+'deg)';
				}
				timer();
				setInterval(timer,1000);	
			})();
	},false);