PhoneGapApp = function ()
{
	$('.spinner').removeClass('hide');
	document.addEventListener('deviceready', this.ready, false);
	$(window).on('hashchange', $.proxy(this.route, this));

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
			$('.spinner').fadeOut('normal',
				function ()
				{
					$(this).addClass('hide');
				}
			);
			this.log('EVENT: deviceready');
			this.report('Application started.');
		},

	route:
		function ()
		{
			var controller = null;
			var action = '';
			var id = null;
			var hash = window.location.hash;
			if ((hash == '') || (hash == '/'))
			{
			}
			else
			{
			}
		}
};