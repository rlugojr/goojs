require([
	'goo/entities/GooRunner',
	'goo/renderer/Material',
	'goo/renderer/shaders/ShaderLib',
	'goo/entities/components/MeshDataComponent',
	'goo/math/Vector3',
	'goo/shapes/Box',
	'goo/shapes/Sphere',
	'goo/shapes/Torus',
	'goo/entities/systems/GizmoRenderSystem',
	'../../lib/V'
], function(
	GooRunner,
	Material,
	ShaderLib,
	MeshDataComponent,
	Vector3,
	Box,
	Sphere,
	Torus,
	GizmoRenderSystem,
	V
) {
	'use strict';

	function setupKeys() {
		document.body.addEventListener('keypress', function (e) {
			switch(e.which) {
				case 49: // 1
					console.log('translation');
					gizmoRenderSystem.setActiveGizmo(0);
					break;
				case 50: // 2
					console.log('rotation');
					gizmoRenderSystem.setActiveGizmo(1);
					break;
				case 51: // 3
					console.log('scale');
					gizmoRenderSystem.setActiveGizmo(2);
					break;
				default:
					console.log('1: translate gizmo\n2: rotate gizmo\n3: scale gizmo');
			}
		});
	}

	function setupMouse() {
		goo.addEventListener('mousedown', function (e) {
			if (e.domEvent.button !== 0) { return; }
			if (e.domEvent.shiftKey || e.domEvent.altKey) { return; }

			if (e.id < 16000) {
				if (e.id >= 0) {
					console.log('selected', e.id);
					var entitySelected = goo.world.entityManager.getEntityByIndex(e.id);
					gizmoRenderSystem.show(entitySelected);
				} else {
					console.log('deselected');
					gizmoRenderSystem.show(); // actually hides
				}
			} else if (e.id < 16100) {
				gizmoRenderSystem.activate(e.id, e.x, e.y);
			}
		});

		document.addEventListener('mouseup', function(e) {
			gizmoRenderSystem.deactivate();
		});
	}

	function setupGizmos() {
		gizmoRenderSystem = new GizmoRenderSystem();
		gizmoRenderSystem.setActiveGizmo(0);
		goo.setRenderSystem(gizmoRenderSystem);
	}

	// initialise goo
	var goo = V.initGoo();
	var world = goo.world;

	var gizmoRenderSystem;

	// add some lights
	V.addLights();

	V.addOrbitCamera(new Vector3(15, Math.PI / 2, 0.3), new Vector3(), 2);

	// standard material
	var material = new Material(ShaderLib.simpleLit);

	// add some entities
	world.createEntity(new Box(), material, [3, 0, 0]).addToWorld();
	world.createEntity(new Sphere(32, 32), material, [0, 0, 0]).addToWorld();
	world.createEntity(new Torus(32, 32, 0.1, 0.5), material, [-3, 0, 0]).addToWorld();

	// add the gizmo render system
	setupGizmos();

	// allow using the mouse to select what entity to transform
	setupMouse();

	// allow switching of active gizmo with the 1, 2 and 3 keys
	setupKeys();

	console.log('Pick entities to select them and press 1, 2, 3 to switch between transform gizmos');
});