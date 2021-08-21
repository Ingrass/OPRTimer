// ==UserScript==
// @name         OPRTimer
// @version      1.3
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
v1.3 22/8/2021
- fixes for new WayFarer site, again

v1.2 21/10/2020
- 因應 Wayfarer變數名稱轉變 的修正

v1.1 11/10/2019
- fixes for new WayFarer site
*/

(function(){
	let expires;

	let func = XMLHttpRequest.prototype.open;
	XMLHttpRequest.prototype.open = function( method, url ){
		console.log( "open" )
		if( method=="GET" && url.endsWith("vault/review") ){
			console.log( "yes" )
			
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

	var waitInitComplete = setInterval( function(){

		let el_logo = document.querySelector("wf-logo");
		if( !el_logo ) return;
		clearInterval( waitInitComplete );

		el_logo.closest("div").innerHTML += /*html*/`<span id='CountingTimer' style='color:#774444; background-color: #FFFFBB; font-size:2em; margin-left:1em;align-self:flex-end;'>00:00</span>`;
		
		let el_countingTimer = document.getElementById('CountingTimer');

		setInterval( ()=>{
			if( ! location.href.includes("new/review") ){
				el_countingTimer.style.display = "none";
			}else{
				el_countingTimer.style.display = "inline";
				let date = Math.max( 0, expires - Date.now() );
				el_countingTimer.innerText = new Date(date).toISOString().substr(14, 5);
			}
		}, 1000 );
		
	}, 333 );

})();
