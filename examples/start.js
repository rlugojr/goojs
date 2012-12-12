require({
    baseUrl : "./",
    paths : {
        goo : "../src/goo",
    }
});
require(['goo/entities/World', 'goo/entities/Entity', 'goo/entities/systems/System', 'goo/entities/systems/TransformSystem',
		'goo/entities/systems/RenderSystem', 'goo/entities/components/TransformComponent', 'goo/entities/components/MeshDataComponent',
		'goo/entities/components/MeshRendererComponent', 'goo/entities/systems/PartitioningSystem', 'goo/renderer/MeshData', 'goo/renderer/Renderer',
		'goo/renderer/Material', 'goo/renderer/Shader', 'goo/entities/GooRunner', 'goo/renderer/TextureCreator', 'goo/renderer/Loader',
		'goo/loaders/JSONImporter', 'goo/entities/components/ScriptComponent', 'goo/util/DebugUI', 'goo/shapes/ShapeCreator',
		'goo/entities/EntityUtils', 'goo/renderer/Texture', 'goo/renderer/Camera', 'goo/entities/components/CameraComponent', 'goo/math/Vector3'],
	function(World, Entity, System, TransformSystem, RenderSystem, TransformComponent, MeshDataComponent, MeshRendererComponent, PartitioningSystem,
		MeshData, Renderer, Material, Shader, GooRunner, TextureCreator, Loader, JSONImporter, ScriptComponent, DebugUI, ShapeCreator, EntityUtils,
		Texture, Camera, CameraComponent, Vector3) {
		"use strict";

		var resourcePath = "../resources";

		function init() {
			// Create typical goo application
			var goo = new GooRunner({
				showStats : true
			});
			goo.renderer.domElement.id = 'goo';
			document.body.appendChild(goo.renderer.domElement);

			// var ui = new DebugUI(goo);

			// Examples of model loading
			loadModels(goo);

			// Add quad
			var quadEntity = createQuadEntity(goo);
			quadEntity.addToWorld();

			// Add box
			var boxEntity = createBoxEntity(goo);
			boxEntity.addToWorld();

			// Add camera
			var camera = new Camera(45, 1, 1, 1000);
			var cameraEntity = goo.world.createEntity("CameraEntity");
			cameraEntity.setComponent(new CameraComponent(camera));
			cameraEntity.addToWorld();

			var script = {
				zero : new Vector3(),
				run : function(entity) {
					var t = entity._world.time;

					// TODO: use transformcomponent instead. just fix a lookat for it.
					// var transformComponent = entity.transformComponent;
					// transformComponent.transform.translation.x = Math.sin(t * 1.0) * 30 + 50;
					// transformComponent.transform.translation.y = 25;
					// transformComponent.transform.translation.z = Math.sin(t * 1.0) * 30 + 50;
					// transformComponent.transform.rotation.y = Math.sin(t * 1.5) * 3;
					// transformComponent.setUpdated();

					var camera = entity.cameraComponent.camera;
					camera.translation.x = Math.sin(t * 1.0) * 30 + 50;
					camera.translation.y = 20;
					camera.translation.z = Math.sin(t * 1.0) * 30 + 50;
					camera.lookAt(this.zero, Vector3.UNIT_Y);
					camera.onFrameChange();
				}
			};
			cameraEntity.setComponent(new ScriptComponent(script));

		}

		function loadModels(goo) {
			var importer = new JSONImporter(goo.world);

			// Load asynchronous with callback
			importer.load(resourcePath + '/girl.model', resourcePath + '/', {
				onSuccess : function(entities) {
					for ( var i in entities) {
						entities[i].addToWorld();
					}
					entities[0].transformComponent.transform.scale.set(0.15, 0.15, 0.15);
					var script = {
						run : function(entity) {
							var t = entity._world.time;

							var transformComponent = entity.transformComponent;
							transformComponent.transform.translation.x = Math.sin(t) * 30;
							transformComponent.transform.translation.z = Math.cos(t) * 30;
							transformComponent.transform.rotation.y = Math.sin(t * 1.5) * 3;
							transformComponent.setUpdated();
						}
					};
					entities[0].setComponent(new ScriptComponent(script));
				},
				onError : function(error) {
					console.error(error);
				}
			});

			// Load asynchronous with callback
			importer.load(resourcePath + '/head.model', resourcePath + '/', {
				onSuccess : function(entities) {
					for ( var i in entities) {
						entities[i].addToWorld();
					}
					entities[0].transformComponent.transform.scale.set(50, 50, 50);
					var script = {
						run : function(entity) {
							var t = entity._world.time;

							var transformComponent = entity.transformComponent;
							transformComponent.transform.translation.x = Math.sin(t + 3) * 30;
							transformComponent.transform.translation.z = Math.cos(t + 3) * 30;
							transformComponent.transform.rotation.x = Math.sin(t) * 2;
							transformComponent.transform.rotation.y = Math.sin(t * 1.5) * 3;
							transformComponent.setUpdated();
						}
					};
					entities[0].setComponent(new ScriptComponent(script));
				},
				onError : function(error) {
					console.error(error);
				}
			});

			// Load asynchronous with callback
			importer.load(resourcePath + '/shoes/shoes_compressed.json', resourcePath + '/shoes/textures/', {
				onSuccess : function(entities) {
					// Pull out the fabric entity of the shoe
					var fabricEntity;
					var name = 'polySurfaceShape10[lambert2SG]';
					for ( var key in entities) {
						var entity = entities[key];
						if (entity.name === name) {
							fabricEntity = entity;
							break;
						}
					}
					if (!fabricEntity) {
						console.error('Could not find entity: ' + name);
						return;
					}

					var script = {
						run : function(entity) {
							var t = entity._world.time;

							entity.meshRendererComponent.materials[0].materialState.diffuse.r = Math.sin(t * 3) * 0.5 + 0.5;
							entity.meshRendererComponent.materials[0].materialState.diffuse.g = Math.sin(t * 2) * 0.5 + 0.5;
							entity.meshRendererComponent.materials[0].materialState.diffuse.b = Math.sin(t * 4) * 0.5 + 0.5;
						}
					};
					fabricEntity.setComponent(new ScriptComponent(script));

					for ( var i in entities) {
						entities[i].addToWorld();
					}
					// entities[0].transformComponent.transform.scale.set(1.5, 1.5, 1.5);
					entities[0].transformComponent.transform.translation.y = -5;
					var script = {
						run : function(entity) {
							var t = entity._world.time;

							var transformComponent = entity.transformComponent;
							transformComponent.transform.rotation.y = t * 0.5;
							transformComponent.setUpdated();
						}
					};
					entities[0].setComponent(new ScriptComponent(script));
				},
				onError : function(error) {
					console.error(error);
				}
			});
		}

		// Create simple quad
		function createQuadEntity(goo) {
			var world = goo.world;

			// Setup default attributes
			var attributeMap = MeshData.defaultMap([MeshData.POSITION, MeshData.COLOR, MeshData.TEXCOORD0]);
			// Add custom attribute
			attributeMap.Stuff = {
				count : 1,
				type : 'Byte'
			};

			var meshData = new MeshData(attributeMap, 4, 6);

			// Fill attribute buffers
			meshData.getAttributeBuffer(MeshData.POSITION).set([-5, -5, 0, -5, 5, 0, 5, 5, 0, 5, -5, 0]);
			meshData.getAttributeBuffer(MeshData.COLOR).set([1.0, 0.5, 0.5, 1.0, 0.5, 1.0, 0.5, 1.0, 0.5, 0.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0]);
			meshData.getAttributeBuffer(MeshData.TEXCOORD0).set([0, 0, 0, 1, 1, 1, 1, 0]);
			meshData.getAttributeBuffer('Stuff').set([0, 1, 2, 3]);
			meshData.getIndexBuffer().set([0, 1, 3, 1, 2, 3]);

			// Create entity
			var entity = world.createEntity();

			// Create meshdata component using above data
			var meshDataComponent = new MeshDataComponent(meshData);
			entity.setComponent(meshDataComponent);

			// Create meshrenderer component with material and shader
			var meshRendererComponent = new MeshRendererComponent();
			var material = new Material('QuadMaterial');

			var vs = getShader('vshader');
			var fs = getShader('fshader');
			material.shader = new Shader('QuadShader', {
				vshader : vs,
				fshader : fs,
				attributes : {
					vertexPosition : MeshData.POSITION,
					vertexColors : MeshData.COLOR,
					vertexUV0 : MeshData.TEXCOORD0,
					fish : 'Stuff'
				},
				uniforms : {
					viewMatrix : Shader.VIEW_MATRIX,
					projectionMatrix : Shader.PROJECTION_MATRIX,
					worldMatrix : Shader.WORLD_MATRIX,
					diffuseMap : Shader.TEXTURE0,
				}
			});

			material.cullState.enabled = false;

			var texture = new TextureCreator().loadTexture2D(resourcePath + '/pitcher.jpg');
			// var colorInfo = new Uint8Array([255, 255, 255, 255, 255, 0, 0, 255, 0, 255, 0, 255, 0, 0, 255, 255]);
			// var texture = new Texture(colorInfo, null, 2, 2);
			material.textures.push(texture);

			meshRendererComponent.materials.push(material);
			entity.setComponent(meshRendererComponent);

			// Add script component
			var script = {
				run : function(entity) {
					var t = entity._world.time;
					var transformComponent = entity.transformComponent;
					transformComponent.transform.translation.x = Math.sin(t + 4) * 30;
					transformComponent.transform.translation.z = Math.cos(t + 4) * 30;
					transformComponent.transform.rotation.x = Math.sin(t) * 3;
					// transformComponent.transform.rotation.y = Math.sin(t) * 3;
					// transformComponent.transform.rotation.z = Math.sin(t) * 3;
					transformComponent.setUpdated();
				}
			};
			entity.setComponent(new ScriptComponent(script));

			return entity;
		}

		function createBoxEntity(goo) {
			var meshData = ShapeCreator.createBox(250, 5, 250);
			var entity = EntityUtils.createTypicalEntity(goo.world, meshData);
			entity.transformComponent.transform.translation.y = -15;
			entity.name = "Box";

			var material = new Material('TestMaterial');
			material.shader = Material.createShader(Material.shaders.texturedLit, 'BoxShader');

			var texture = new TextureCreator().loadTexture2D(resourcePath + '/pitcher.jpg');
			material.textures.push(texture);

			entity.meshRendererComponent.materials.push(material);

			return entity;
		}

		function getShader(id) {
			var shaderScript = document.getElementById(id);
			if (!shaderScript) {
				return null;
			}

			var str = "";
			var k = shaderScript.firstChild;
			while (k) {
				if (k.nodeType === 3) {
					str += k.textContent;
				}
				k = k.nextSibling;
			}

			return str;
		}

		init();
	});
