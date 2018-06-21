// ==UserScript==
// @name         OPRTimer
// @version      1.0
// @category     Info
// @namespace    sdf12321asccerverv
// @author       lokpro
// @downloadURL https://github.com/Ingrass/OPRTimer/raw/master/OPRTimer.user.js
// @match        https://opr.ingress.com/recon*
// @grant        none
// ==/UserScript==

// CountingTimer

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

	document.querySelector(  '.navbar-header>a').innerHTML += "&nbsp;&nbsp;<span id='CountingTimer' class1='navbar-brand' style='float:right; color:#FFFF00;'></span>";
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


