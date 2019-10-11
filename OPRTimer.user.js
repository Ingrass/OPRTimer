// ==UserScript==
// @name         OPRTimer
// @version      1.1
// @category     Info
// @namespace    sdf12321asccerverv
// @author       lokpro
// @match        https://opr.ingress.com/recon*
// @include     https://wayfarer.nianticlabs.com/review*
// @grant        none
// ==/UserScript==

// CountingTimer

/*
v1.1 11/10/2019
- fixes for new WayFarer site
*/

var interval = setInterval( function(){
	
	// wait for information available
	var expires;
	try {
		expires = angular.element(document.getElementById('NewSubmissionController')).scope().subCtrl.pageData.expires;
	} catch (e) {
		return;
	}
	// information OK
	clearInterval( interval );

	document.querySelector(  '.niantic-wayfarer-logo').parentNode.innerHTML += "&nbsp;&nbsp;<span id='CountingTimer' class1='navbar-brand' style='float:right; color:#774444;  background-color: #FFFFBB;'></span>";
	var countingTimer = document.getElementById('CountingTimer');

	var date0 = new Date( expires );

	var timer = setInterval( function(){
		var date = date0 - new Date();
		
		if( date<=0 ){
			date = 0;
			clearInterval( timer );
		}
		
		countingTimer.innerText = new Date(date).toISOString().substr(14, 5);
	}, 1000 );
}, 99 );


