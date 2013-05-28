var App = null;
var reset = false;

$(document).ready(
	function ()
	{
		if (reset)
		{
			localStorage.removeItem('DIAssist');
			localStorage.setItem('DIAssist', '{"App.Unit":{"records":{}},"App.Medication":{"records":{}}}');
		}

		App = Ember.Application.create();
		App.store = DS.Store.create({
			revision: 11,
			adapter: DS.LSAdapter.create({namespace: 'DIAssist' })
		});

/*		Ember.Handlebars.registerHelper(
			'if',
			function(context, options)
			{
				return (model.get('id') == id);
			}
//			,'model', 'id'
		);*/

		App.Router.map(
				function ()
				{
					this.resource('settings', { path: '/settings'});
					this.resource('diary', { path: '/diary' });
					this.resource('analysis', { path: '/analysis' });


					this.resource('medications',
						function ()
						{

							/* These work like a URL rewrite rules - not like routes */
							this.resource('medication', { path: ':medication_id' });
						});
				});

		/* * * * * Routes */

		App.DiaryRoute = Ember.Route.extend({
			model:
				function()
				{
					return App.DiaryEntry.all();
				}
		});

		/**
		 *  Medications
		 */
		App.MedicationsRoute = Ember.Route.extend({
		 	 model:
		 	 	function ()
		 	 	{
		 	 		return App.Medication.find();
		 	 	}
		});

		App.MedicationRoute = Ember.Route.extend({
		 	 model:
		 	 	function (params)
		 	 	{
		 	 		return App.Medication.find(params.medication_id);
		 	 	}
		});

		App.MedicationEditRoute = Ember.Route.extend({
		 	 model:
		 	 	function (params)
		 	 	{
		 	 		return App.Medication.find(params.medication_id);
		 	 	}
		});

		/* * * * * Models */

		App.Unit = DS.Model.extend({
			name:			DS.attr('string'),
			description:	DS.attr('string'),
			created:		DS.attr('date'),
			modified:		DS.attr('date'),
		});

		/**
		 *	Medication
		 */
		App.Medication = DS.Model.extend({
			name:			DS.attr('string'),
			dosage:			DS.attr('number'),
			units:			DS.attr('string'),
			notes:			DS.attr('string'),
			created:		DS.attr('date'),
			modified:		DS.attr('date'),
		});

		App.MedicationUnits = App.Unit.find();
//			[ '', 'IU', 'mg', 'tablets' ];
		/**
		 *	DiaryEntry
		 */
		App.DiaryEntry = DS.Model.extend({
				date:			DS.attr('date'),
				type:			DS.attr('string'),	/* valid values - medication, meal, hypo, bsl */

				/* medication e.g. insulin */
				medId:			DS.attr('number'),
				dosage:			DS.attr('number'),
				units:			DS.attr('string'),

				/* meal */
				image:			DS.attr('string'),
				portions:		DS.attr('number'),

				/* hypoglycaemic episode */
				treatmentId:	DS.attr('number'),

				/* Blood sugar reading */
				reading:		DS.attr('number'),

				notes:		DS.attr('string'),
				created:	DS.attr('date'),
				modified:	DS.attr('date'),
				fulldetails:
					function ()
					{
						switch (this.get('type'))
						{
							case	'bsl':
										return 'BSL: ' + this.get('reading') + ' ' + 'mmol/L';

							case	'hypo':
										return 'BSL: ' + this.get('reading') + 'mmol/L';

							case	'medication':
										return 'medication: ' + 'medicine';

							case	'meal':
										return 'image: ' + this.get('image') + ' with ' + this.get('portions') + ' portions of carbs';
						}
					}.property('type', 'reading', 'image', 'portions')
		});

		/* * * * * Controllers */

		/**
		 *	Medication Controller
		 */

//		App.MedicationController = Ember.ObjectController.extend({
//		});

		App.MedicationsController = Ember.ArrayController.extend({
			editing: null,

			new:
				function ()
				{
					var transaction = App.store.transaction();
					var medication = transaction.createRecord(App.Medication,
//					var medication = App.Medication.createRecord(
					{
						name:		'',
						dosage:		0.0,
						units:		'',
						notes:		'',
						created:	new Date(),
						modified:	new Date()
					});
//					medication.get("transaction").commit();
					transaction.commit();
					this.set('editing', medication);
//					transaction.add(medication);
//					transaction.commit();
//					medication.set('isEditing', true);
					// Don't commit since we want to just display
					// the empty new model so the user can still cancel it
//					this.get('content').addObject(medication);
//					this.transitionToRoute('medications');
				},

			edit:
				function (medication)
				{
					this.set('editing', medication);
				},

			doneEditing:
				function (medication)
				{
					medication.store.commit();
					this.set('editing', null);
				},

/*			cancel:
				function (medication)
				{
					var transaction = medication.transaction;
					medication.deleteRecord();
					transaction.commit();
				},

			save:
				function (medication)
				{
					alert(medication.get('id'));
//					var transaction = medication.transaction;
//					transaction.commit();
//					App.store.commit();
//					medication.store.commit();
				},*/
			delete:
				function (medication)
				{
//					var transaction = medication.transaction;
					medication.deleteRecord();
					App.store.commit();
				}
		});

		var testData =
		[
/*			{
				model:			App.Medication,
				name:			'Humalog',
				dosage:			12.0,
				units:			'',
				notes:			'After each meal',
				created:		new Date(),
				modified:		new Date()
			},*/

			{
				model:			App.Unit,
				name:			'IU',
				description:	'International Units',
				created:		new Date(),
				modified:		new Date()
			},

			{
				model:			App.Unit,
				name:			'IU / portion',
				description:	'International Units per charbohydrate exchange portion',
				created:		new Date(),
				modified:		new Date()
			},

			{
				model:			App.Unit,
				name:			'mg',
				description:	'milligrams',
				created:		new Date(),
				modified:		new Date()
			},

			{
				model:			App.Unit,
				name:			'tablets',
				description:	'number of whole tablets',
				created:		new Date(),
				modified:		new Date()
			},

/*		{
			model:			App.DiaryEntry,
			date:			new Date(),
			type:			'bsl',
			reading:		19.78,
			medId:			1,
			dosage:			10.1,
			units:			'IU',
			notes:			'A blood sugar reading',
			created:		new Date(),
			modified:		new Date()
		},
		{
			model:			App.DiaryEntry,
			date:			new Date(),
			type:			'insulin',
			medId:			1,
			dosage:			10.1,
			units:			'IU',
			notes:		'A dosage of insulin',
			created:	new Date(),
			modified:	new Date()
		}*/
		];

		if (reset)
		{
//			localStorage.removeItem('DIAssist');
//			localStorage.setItem('DIAssist', '"{"App.Unit":{"records":{}},"App.Medication":{"records":{}}}"');
//			var store = this.get("store");
//			var transaction = store.transaction();
			var transaction = App.get("store").transaction();

			for (var i = 0 ; i < testData.length ; i++)
			{
				var data = testData[i];
				var model = testData[i].model;
				delete data.model;
				var entry = transaction.createRecord(model, data);
				entry.get('transaction').commit();
//				transaction.add(entry);
//				App.store.commit();
			}
//			transaction.commit();
		}
	});