define([
	'goo/renderer/Material',
	'goo/renderer/Camera',
	'goo/math/Vector3',
	'goo/math/Transform',
	'goo/renderer/TextureCreator',
	'goo/renderer/Texture',
	'goo/renderer/MeshData',
	'goo/renderer/Shader',
	'goo/renderer/light/DirectionalLight',
	'goo/util/CanvasUtils',
	'goo/util/Ajax',
	'goo/util/MeshBuilder',
	'goo/noise/Noise',
	'goo/noise/ValueNoise',
	'goo/shapes/TerrainSurface',
	'goo/shapes/ShapeCreator',
	'goo/loaders/DynamicLoader',
	'goo/entities/EntityUtils',
	'goo/util/combine/EntityCombiner',
	'goo/util/TangentGenerator',
	'goo/entities/components/MeshDataComponent',
	'goo/entities/components/ScriptComponent',
	'goo/renderer/shaders/ShaderBuilder',
	'goo/math/MathUtils',
	'goo/util/rsvp'
],
/** @lends */
function(
	Material,
	Camera,
	Vector3,
	Transform,
	TextureCreator,
	Texture,
	MeshData,
	Shader,
	DirectionalLight,
	CanvasUtils,
	Ajax,
	MeshBuilder,
	Noise,
	ValueNoise,
	TerrainSurface,
	ShapeCreator,
	DynamicLoader,
	EntityUtils,
	EntityCombiner,
	TangentGenerator,
	MeshDataComponent,
	ScriptComponent,
	ShaderBuilder,
	MathUtils,
	RSVP
) {
	"use strict";

	function Forrest() {
		this.calcVec = new Vector3();
		this.initDone = false;
	}

	Forrest.prototype.init = function(world, terrainQuery, forrestAtlasTexture, forrestAtlasNormals, forrestTypes) {
		return this.loadLODTrees(world, terrainQuery, forrestAtlasTexture, forrestAtlasNormals, forrestTypes);
	};

	Forrest.prototype.loadLODTrees = function(world, terrainQuery, forrestAtlasTexture, forrestAtlasNormals, forrestTypes) {
		this.terrainQuery = terrainQuery;
		this.forrestTypes = forrestTypes;

		this.vegetationList = {};
		for (var type in forrestTypes) {
			var typeSettings = forrestTypes[type];
			var meshData = this.createBase(typeSettings);
			this.vegetationList[type] = meshData;
		}

		var material = Material.createMaterial(vegetationShader, 'vegetation');
		material.setTexture('DIFFUSE_MAP', forrestAtlasTexture);
		material.setTexture('NORMAL_MAP', forrestAtlasNormals);
		material.uniforms.discardThreshold = 0.6;
		// material.blendState.blending = 'CustomBlending';
		material.uniforms.materialAmbient = [0.3, 0.3, 0.3, 1.0];
		material.uniforms.materialSpecular = [0.0, 0.0, 0.0, 1.0];
		material.renderQueue = 2001;
		this.material = material;

		this.patchSize = 64;
		this.patchDensity = 10;
		this.gridSize = 7;
		this.minDist = 0;
		// this.minDist = 1.5;

		this.patchSpacing = this.patchSize / this.patchDensity;
		this.gridSizeHalf = Math.floor(this.gridSize*0.5);
		this.grid = [];
		var dummyMesh = this.createPatch(0, 0);
		for (var x = 0; x < this.gridSize; x++) {
			this.grid[x] = [];
			for (var z = 0; z < this.gridSize; z++) {
				var entity = world.createEntity(this.material);
				var meshDataComponent = new MeshDataComponent(dummyMesh);
				meshDataComponent.modelBound.xExtent = this.patchSize;
				meshDataComponent.modelBound.yExtent = 500;
				meshDataComponent.modelBound.zExtent = this.patchSize;
				meshDataComponent.autoCompute = false;
				entity.set(meshDataComponent);
				entity.addToWorld();
				this.grid[x][z] = entity;
				entity.meshRendererComponent.hidden = true;
			}
		}

		this.currentX = -10000;
		this.currentZ = -10000;

		this.initDone = true;
	};

	Forrest.prototype.rebuild = function() {
		this.currentX = -10000;
		this.currentZ = -10000;
	};

	var hidden = false;
	Forrest.prototype.toggle = function() {
		hidden = !hidden;
		for (var x = 0; x < this.gridSize; x++) {
			for (var z = 0; z < this.gridSize; z++) {
				var entity = this.grid[x][z];
				entity.skip = hidden;
			}
		}
		if (!hidden) {
			this.rebuild();
		}
	};

	Forrest.prototype.update = function(x, z) {
		if (!this.initDone || hidden) {
			return;
		}

		var newX = Math.floor(x / this.patchSize);
		var newZ = Math.floor(z / this.patchSize);

		if (this.currentX === newX && this.currentZ === newZ) {
			return;
		}

		// console.time('forrest update');

		for (var x = 0; x < this.gridSize; x++) {
			for (var z = 0; z < this.gridSize; z++) {
				var patchX = newX + x;
				var patchZ = newZ + z;

				var diffX = patchX - this.currentX;
				var diffZ = patchZ - this.currentZ;

				patchX -= this.gridSizeHalf;
				patchZ -= this.gridSizeHalf;
				var modX = MathUtils.moduloPositive(patchX, this.gridSize);
				var modZ = MathUtils.moduloPositive(patchZ, this.gridSize);
				var entity = this.grid[modX][modZ];

				var testX = Math.abs(x - this.gridSizeHalf);
				var testZ = Math.abs(z - this.gridSizeHalf);

				if (entity.meshRendererComponent.hidden === false && diffX >= 0 && diffX < this.gridSize && diffZ >= 0 && diffZ < this.gridSize) {
					if (testX < this.minDist && testZ < this.minDist) {
						entity.meshRendererComponent.hidden = true;
					}
					continue;
				}

				if (testX < this.minDist && testZ < this.minDist) {
					entity.meshRendererComponent.hidden = true;
					continue;
				}

				patchX *= this.patchSize;
				patchZ *= this.patchSize;
				var meshData = this.createPatch(patchX, patchZ);
				if (!meshData) {
					entity.meshRendererComponent.hidden = true;
				} else {
					entity.meshRendererComponent.hidden = false;
					entity.meshDataComponent.meshData = meshData;
					entity.meshRendererComponent.worldBound.center.setd(patchX + this.patchSize * 0.5, 0, patchZ + this.patchSize * 0.5);
				}
			}
		}

		this.currentX = newX;
		this.currentZ = newZ;

		// console.timeEnd('forrest update');
	};

	Forrest.prototype.createPatch = function(patchX, patchZ) {
		var meshBuilder = new MeshBuilder();
		var transform = new Transform();

		var patchDensity = this.patchDensity;
		var patchSpacing = this.patchSpacing;
		var pos = [0, 10, 0];
		for (var x = 0; x < patchDensity; x++) {
			for (var z = 0; z < patchDensity; z++) {
				var xx = patchX + (x + Math.random()*0.75) * patchSpacing;
				var zz = patchZ + (z + Math.random()*0.75) * patchSpacing;
				pos[0] = xx;
				pos[2] = zz + 0.5;
				var yy = this.terrainQuery.getHeightAt(pos);
				var norm = this.terrainQuery.getNormalAt(pos);
				if (yy === null) {
					yy = 0;
				}
				if (norm === null) {
					norm = Vector3.UNIT_Y;
				}
				var slope = norm.dot(Vector3.UNIT_Y);

				var vegetationType = this.terrainQuery.getForrestType(xx, zz, slope);
				if (!vegetationType) {
					continue;
				}

				var size = (Math.random() * 0.5 + 0.75);
				transform.translation.setd(xx, yy, zz);
				transform.update();

				var meshData = this.vegetationList[vegetationType];

				var type = this.forrestTypes[vegetationType];
				var w = type.w * size;
				var h = type.h * size;
				meshData.getAttributeBuffer('OFFSET').set([
					-w*0.5, 0,
					-w*0.5, h,
					w*0.5, h,
					w*0.5, 0
				]);

				meshBuilder.addMeshData(meshData, transform);

				// console.count('tree');
			}
		}
		var meshDatas = meshBuilder.build();

		return meshDatas[0]; // Don't create patches bigger than 65k
	};

	Forrest.prototype.createBase = function(type) {
		var attributeMap = MeshData.defaultMap([MeshData.POSITION, MeshData.TEXCOORD0]);
		attributeMap.BASE = MeshData.createAttribute(1, 'Float');
		attributeMap.OFFSET = MeshData.createAttribute(2, 'Float');
		var meshData = new MeshData(attributeMap, 4, 6);

		meshData.getAttributeBuffer(MeshData.POSITION).set([
			0, -type.h * 0.1, 0,
			0, -type.h * 0.1, 0,
			0, -type.h * 0.1, 0,
			0, -type.h * 0.1, 0
		]);
		meshData.getAttributeBuffer(MeshData.TEXCOORD0).set([
			type.tx, type.ty,
			type.tx, type.ty + type.th,
			type.tx + type.tw, type.ty + type.th,
			type.tx + type.tw, type.ty
		]);
		meshData.getAttributeBuffer('BASE').set([
			0, type.h, type.h, 0
		]);
		meshData.getAttributeBuffer('OFFSET').set([
			-type.w*0.5, 0,
			-type.w*0.5, type.h,
			type.w*0.5, type.h,
			type.w*0.5, 0
		]);

		meshData.getIndexBuffer().set([0, 3, 1, 1, 3, 2]);

		return meshData;
	};

	var vegetationShader = {
		processors: [
			ShaderBuilder.light.processor
		],
		attributes : {
			vertexPosition : MeshData.POSITION,
			vertexUV0 : MeshData.TEXCOORD0,
			base : 'BASE',
			offset : 'OFFSET'
		},
		uniforms : {
			viewProjectionMatrix : Shader.VIEW_PROJECTION_MATRIX,
			cameraPosition : Shader.CAMERA,
			diffuseMap : Shader.DIFFUSE_MAP,
			normalMap : Shader.NORMAL_MAP,
			discardThreshold: -0.01,
			fogSettings: function() {
				return ShaderBuilder.FOG_SETTINGS;
			},
			fogColor: function() {
				return ShaderBuilder.FOG_COLOR;
			},
			time : Shader.TIME
		},
		builder: function (shader, shaderInfo) {
			ShaderBuilder.light.builder(shader, shaderInfo);
		},
		vshader: function () {
			return [
		'attribute vec3 vertexPosition;',
		'attribute vec2 vertexUV0;',
		'attribute float base;',
		'attribute vec2 offset;',

		'uniform mat4 viewProjectionMatrix;',
		'uniform vec3 cameraPosition;',
		'uniform float time;',

		ShaderBuilder.light.prevertex,

		'varying vec3 normal;',
		'varying vec3 binormal;',
		'varying vec3 tangent;',
		'varying vec3 vWorldPos;',
		'varying vec3 viewPosition;',
		'varying vec2 texCoord0;',

		'void main(void) {',
			'vec3 swayPos = vertexPosition;',

			'vec3 nn = cameraPosition - swayPos.xyz;',
			'nn.y = 0.0;',
			'normal = normalize(nn);',
			'tangent = cross(vec3(0.0, 1.0, 0.0), normal);',
			'binormal = cross(normal, tangent);',
			'swayPos.xz += tangent.xz * offset.x;',
			'swayPos.y += offset.y;',

			'swayPos.x += sin(time * 0.5 + swayPos.x * 0.4) * base * sin(time * 1.5 + swayPos.y * 0.4) * 0.02 + 0.01;',

		'	vec4 worldPos = vec4(swayPos, 1.0);',
		'	vWorldPos = worldPos.xyz;',
		'	gl_Position = viewProjectionMatrix * worldPos;',

			ShaderBuilder.light.vertex,

		'	texCoord0 = vertexUV0;',
		'	viewPosition = cameraPosition - worldPos.xyz;',
		'}'//
		].join('\n');
		},
		fshader: function () {
			return [
		'uniform sampler2D diffuseMap;',
		'uniform sampler2D normalMap;',
		'uniform float discardThreshold;',
		'uniform vec2 fogSettings;',
		'uniform vec3 fogColor;',

		ShaderBuilder.light.prefragment,

		'varying vec3 normal;',
		'varying vec3 binormal;',
		'varying vec3 tangent;',
		'varying vec3 vWorldPos;',
		'varying vec3 viewPosition;',
		'varying vec2 texCoord0;',

		'void main(void)',
		'{',
		'	vec4 final_color = texture2D(diffuseMap, texCoord0);',
			'if (final_color.a < discardThreshold) discard;',
			// 'final_color = vec4(1.0);',

			'mat3 tangentToWorld = mat3(tangent, binormal, normal);',
			'vec3 tangentNormal = texture2D(normalMap, texCoord0).xyz * vec3(2.0) - vec3(1.0);',
			'vec3 worldNormal = (tangentToWorld * tangentNormal);',
			'vec3 N = normalize(worldNormal);',

			// 'final_color = vec4(N, 1.0);',
			ShaderBuilder.light.fragment,

			'float d = pow(smoothstep(fogSettings.x, fogSettings.y, length(viewPosition)), 1.0);',
			'final_color.rgb = mix(final_color.rgb, fogColor, d);',

		'	gl_FragColor = final_color;',
		'}'//
		].join('\n');
		}
	};

	return Forrest;
});