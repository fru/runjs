var state = run.require('src/state');
var equal = function(a, b){ return a === b; };

QUnit.test('Simple state transition.', function(assert) {

	var match = new state.DNF([
		new state.Assertion('attr', 'test1', equal, 'x'),
		new state.Assertion('attr', 'test2', equal, 'x'),
	]);

	var current = new state.States();
	current.addTransition(0, 5, match);
	current.setEndState(5);

	var next = current.transition({
		attr: {
			'test1': 'x',
			'test2': 'x',
		}
	});

	assert.ok(next.resolve());
});


QUnit.test('DNF state transition.', function(assert) {

	var match = new state.DNF([
		new state.Assertion('attr', 'test1', equal, 'x'),
		new state.Assertion('attr', 'test2', equal, 'x'),
	]);

	var current = new state.States();
	current.addTransition(0, 5, match);
	current.setEndState(5);

	var collection = new state.DNF([
		current,
	]);

	var next = collection.transition({
		attr: {
			'test1': 'x',
			'test2': 'x',
		}
	});

	assert.ok(next.resolve());
});

QUnit.test('Simple state non transition.', function(assert) {

	var match = new state.DNF([
		new state.Assertion('attr', 'test1', equal, 'x'),
		new state.Assertion('attr', 'test2', equal, 'x'),
	]);

	var current = new state.States();
	current.addTransition(0, 5, match);
	current.setEndState(5);

	var next = current.transition({
		attr: {
			'test1': 'x',
			'test2': 'wrong!',
		}
	});

	assert.ok(!next.resolve());
});

