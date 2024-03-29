// ==UserScript==
// @name         OPRTimer
// @version      1.3.2
// @category     Info
// @namespace    sdf12321asccerverv
// @author       lokpro
// @include      https://wayfarer.nianticlabs.com/*
// @updateURL    https://github.com/Ingrass/OPRTimer/raw/master/OPRTimer.user.js
// @downloadURL  https://github.com/Ingrass/OPRTimer/raw/master/OPRTimer.user.js
// @run-at document-start
// @grant        none
// ==/UserScript==

// CountingTimer

/*
v1.3.2 22/8/2021
- fixes for new WayFarer site, again

v1.2 21/10/2020
- 因應 Wayfarer變數名稱轉變 的修正

v1.1 11/10/2019
- fixes for new WayFarer site
*/

(function(){
	let expires = 0;

	let func = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function( method, url ){
		if( method=="GET" && url.endsWith("vault/review") ){
			var send2 = this.send;
			this.send = function(){
				this.sendArguments = arguments;
				return send2.apply(this, arguments);
			};

			this.addEventListener( 'load', function(){
				let result = this.response;
				try {
					result = JSON.parse(result);
					expires = result.result.expires;
				} catch (error) {
					console.error( error );
				}
			} );
		}
		return  func.apply(this, arguments);
	}

	var waitReady = setInterval( function(){
		if( !document.body ) return;
		clearInterval( waitReady );

		document.body.innerHTML += /*html*/`<span id='CountingTimer' style='position: fixed; top:0; right: 70px; color:#774444; background-color: #FFFFBBCC; font-size:1.5em; '></span>`;
		
		let el_countingTimer = document.getElementById('CountingTimer');

		setInterval( ()=>{
			if( ! location.href.includes("new/review") ){
				el_countingTimer.style.display = "none";
			}else{
				el_countingTimer.style.display = "block";
				let date = Math.max( 0, expires - Date.now() );
				el_countingTimer.innerText = new Date(date).toISOString().substr(14, 5);
			}
		}, 1000 );
		
	}, 333 );

})();
