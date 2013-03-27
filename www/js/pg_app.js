PhoneGapApp = function ()
{
	document.addEventListener('deviceready', this.ready, false);
	this.appTitle = this.appName + this.appVer;
	this.report('Application initialised.');
}

PhoneGapApp.prototype =
{
	/*** Properties ***/
	debug:	true,
	appVer:	'0.0.1',
	appName:	'DIassist',
	appTitle:	'',

	/*** Methods ***/

	log:
		function(msg)
		{
			if (this.debug)
			{
				console.log(msg);
				alert(msg);
			}
		},

	report:
		function(msg)
		{
//			var title = pgApp.appName = ': ';

//			if (navigator.notification)
//			{
//				navigator.notification.alert(msg, null, title, 'OK');
//		}
//			else
//			{
//				alert(title + msg);
	//	}
			var elem = $('#msg');//document.querySelector('#msg');
//			elem.text = msg;
			elem.text(msg);
//			if (elem.className.indexOf('hide') !== false)
			{
//				elem.className = elem.className.replace(hide, '');
			}

		},

	ready:
		function ()
		{
			this.log('EVENT: deviceready');
			this.report('Application started.');
		}
};