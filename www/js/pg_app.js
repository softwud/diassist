var pgApp =
function ()
{
	pgApp.inititialise();
}

pgApp.prototype =
{
	/*** Properties ***/
	debug:	true,
	appVer:	0.0.1,
	appName:	'DIassist' + pgApp.appVer,

	/*** Methods ***/

	log:
		function(msg)
		{
			if (pgApp.debug)
			{
				console.log(msg);
			}
		},

	report:
		function(msg)
		{
			var title = pgApp.appName = ': ';

			if (navigator.notification)
			{
				navigator.notification.alert(msg, null, title, 'OK');
			}
			else
			{
				alert(title + msg);
			}
		},

	initialise:
		function ()
		{
			pgApp.report('Application starting...');
			document.addEventListener('deviceready', this.ready, false);
		},

	ready:
		function ()
		{
			pgApp.log('EVENT: deviceready');
			pgApp.report('Application started');
		},
};

var APP = new pgApp();