define([
	'goo/fsmpack/statemachine/actions/Action'
],
/** @lends */
function(
	Action
) {
	"use strict";

	function SoundFadeOutAction(/*id, settings*/) {
		Action.apply(this, arguments);
	}

	SoundFadeOutAction.prototype = Object.create(Action.prototype);
	SoundFadeOutAction.prototype.constructor = SoundFadeOutAction;

	SoundFadeOutAction.external = {
		name: 'Sound Fade Out',
		descriptions: 'Fades out a sound and stops it',
		canTransition: true,
		parameters: [{
			name: 'Sound',
			key: 'sound',
			type: 'sound',
			description: 'Sound',
			'default': 0
		}, {
			name: 'Time',
			key: 'time',
			type: 'number',
			description: 'Time it takes for the fading to complete',
			'default': 1000
		}],
		transitions: [{
			key: 'complete',
			name: 'On Completion',
			description: 'State to transition to when the movement completes'
		}]
	};

	SoundFadeOutAction.prototype._run = function(fsm) {
		var entity = fsm.getOwnerEntity();
		if (entity.hasComponent('HowlerComponent')) {
			var sound = entity.howlerComponent.sounds[this.sound];
			if (sound) {
				sound.fadeOut(0, this.time, function() {
					fsm.send(this.transitions.complete);
				}.bind(this));
			}
		}
		// if howler's fade out method is not behaving nice then we can switch to tweening the volume 'manually'
	};

	return SoundFadeOutAction;
});