define([
	'test/animationpack/blendtree/BinaryLERPSource-test',
	'test/animationpack/blendtree/ClipSource-test',
	'test/animationpack/blendtree/FrozenClipSource-test',
	'test/animationpack/blendtree/ManagedTransformSource-test',
	'test/animationpack/clip/AbstractAnimationChannel-test',
	'test/animationpack/clip/AnimationClip-test',
	'test/animationpack/clip/AnimationClipInstance-test',
	'test/animationpack/clip/InterpolatedFloatChannel-test',
	'test/animationpack/clip/JointChannel-test',
	'test/animationpack/clip/JointData-test',
	'test/animationpack/clip/TransformChannel-test',
	'test/animationpack/clip/TransformData-test',
	'test/animationpack/clip/TriggerChannel-test',
	'test/animationpack/clip/TriggerData-test',
	'test/animationpack/Joint-test',
	'test/animationpack/layer/AnimationLayer-test',
	'test/animationpack/layer/LayerLERPBlender-test',
	'test/animationpack/Skeleton-test',
	'test/animationpack/SkeletonPose-test',
	'test/animationpack/state/AbstractState-test',
	'test/animationpack/state/AbstractTransitionState-test',
	'test/animationpack/state/FadeTransitionState-test',
	'test/animationpack/state/FrozenTransitionState-test',
	'test/animationpack/state/SteadyState-test',
	'test/animationpack/state/SyncFadeTransitionState-test',
	'test/animationpack/handlers/AnimationClipHandler-test',
	'test/animationpack/handlers/AnimationComponentHandler-test',
	'test/animationpack/handlers/AnimationLayersHandler-test',
	'test/animationpack/handlers/AnimationStateHandler-test',
	'test/animationpack/handlers/SkeletonHandler-test',
	'test/animationpack/components/AnimationComponent-test',
	'test/animationpack/systems/AnimationSystem-test',
	'test/debugpack/BoundingVolumeMeshBuilder-test',
	'test/debugpack/components/MarkerComponent-test',
	'test/debugpack/DebugDrawHelper-test',
	'test/debugpack/Debugger-test',
	'test/debugpack/EntityCounter-test',
	'test/debugpack/systems/MarkerSystem-test',
	'test/entities/Bus-test',
	'test/entities/components/CameraComponent-test',
	'test/entities/components/Component-test',
	'test/entities/components/CSSTransformComponent-test',
	'test/entities/components/LightComponent-test',
	'test/entities/components/MeshDataComponent-test',
	'test/entities/components/MeshRendererComponent-test',
	'test/entities/components/MovementComponent-test',
	'test/entities/components/ParticleComponent-test',
	'test/entities/components/PortalComponent-test',
	'test/entities/components/ProximityComponent-test',
	'test/entities/components/ScriptComponent-test',
	'test/entities/components/SoundComponent-test',
	'test/entities/components/TextComponent-test',
	'test/entities/components/TransformComponent-test',
	'test/entities/Entity-test',
	'test/entities/EntitySelection-test',
	'test/entities/EntityUtils-test',
	'test/entities/GooRunner-test',
	'test/entities/managers/EntityManager-test',
	'test/entities/managers/Manager-test',
	'test/entities/Selection-test',
	'test/entities/SystemBus-test',
	'test/entities/systems/BoundingUpdateSystem-test',
	'test/entities/systems/CameraSystem-test',
	'test/entities/systems/CSSTransformSystem-test',
	'test/entities/systems/GridRenderSystem-test',
	'test/entities/systems/LightingSystem-test',
	'test/entities/systems/ParticlesSystem-test',
	'test/entities/systems/PickingSystem-test',
	'test/entities/systems/PortalSystem-test',
	'test/entities/systems/RenderSystem-test',
	'test/entities/systems/ScriptSystem-test',
	'test/entities/systems/SoundSystem-test',
	'test/entities/systems/System-test',
	'test/entities/systems/TextSystem-test',
	'test/entities/systems/TransformSystem-test',
	'test/entities/World-test',
	'test/geometrypack/FilledPolygon-test',
	'test/geometrypack/PolyLine-test',
	'test/geometrypack/RegularPolygon-test',
	'test/geometrypack/Surface-test',
	'test/geometrypack/Triangle-test',
	'test/loaders/crunch/CrunchLoader-test',
	'test/loaders/dds/DdsLoader-test',
	'test/loaders/dds/DdsUtils-test',
	'test/loaders/DynamicLoader-test',
	'test/loaders/handlers/CameraComponentHandler-test',
	'test/loaders/handlers/ComponentHandler-test',
	'test/loaders/handlers/ConfigHandler-test',
	'test/loaders/handlers/EntityHandler-test',
	'test/loaders/handlers/HtmlComponentHandler-test',
	'test/loaders/handlers/LightComponentHandler-test',
	'test/loaders/handlers/MeshDataComponentHandler-test',
	'test/loaders/handlers/MeshDataHandler-test',
	'test/loaders/handlers/MeshRendererComponentHandler-test',
	'test/loaders/handlers/ProjectHandler-test',
	'test/loaders/handlers/SceneHandler-test',
	'test/loaders/handlers/ScriptComponentHandler-test',
	'test/loaders/handlers/ScriptHandler-test',
	'test/loaders/handlers/ShaderHandler-test',
	'test/loaders/handlers/SoundComponentHandler-test',
	'test/loaders/handlers/SoundHandler-test',
	'test/loaders/handlers/TextureHandler-test',
	'test/loaders/handlers/TransformComponentHandler-test',
	'test/loaders/tga/TgaLoader-test',
	'test/math/MathUtils-test',
	'test/math/Matrix-test',
	'test/math/Matrix2x2-test',
	'test/math/Matrix3x3-test',
	'test/math/Matrix4x4-test',
	'test/math/Plane-test',
	'test/math/Quaternion-test',
	'test/math/Ray-test',
	'test/math/Transform-test',
	'test/math/Vector-test',
	'test/math/Vector2-test',
	'test/math/Vector3-test',
	'test/math/Vector4-test',
	'test/noise/Noise-test',
	'test/noise/ValueNoise-test',
	'test/particles/Particle-test',
	'test/particles/ParticleEmitter-test',
	'test/particles/ParticleInfluence-test',
	'test/particles/ParticleLib-test',
	'test/particles/ParticleUtils-test',
	'test/physicspack/ammo/AmmoPhysicsSystem-test',
	'test/physicspack/cannon/CannonPhysicsSystem-test',
	'test/picking/BoundingTree-test',
	'test/picking/PrimitivePickLogic-test',
	'test/quadpack/QuadComponent-test',
	'test/quadpack/QuadComponentHandler-test',
	'test/renderer/bounds/BoundingBox-test',
	'test/renderer/bounds/BoundingSphere-test',
	'test/renderer/bounds/BoundingVolume-test',
	'test/renderer/BufferData-test',
	'test/renderer/BufferUtils-test',
	'test/renderer/Camera-test',
	'test/renderer/light/DirectionalLight-test',
	'test/renderer/light/Light-test',
	'test/renderer/light/Light-test',
	'test/renderer/light/PointLight-test',
	'test/renderer/light/SpotLight-test',
	'test/renderer/Material-test',
	'test/renderer/MeshData-test',
	'test/renderer/pass/Composer-test',
	'test/renderer/pass/FullscreenPass-test',
	'test/renderer/pass/FullscreenUtil-test',
	'test/renderer/pass/RenderPass-test',
	'test/renderer/pass/RenderTarget-test',
	'test/renderer/Renderer-test',
	'test/renderer/RendererRecord-test',
	'test/renderer/RenderQueue-test',
	'test/renderer/Shader-test',
	'test/renderer/ShaderCall-test',
	'test/renderer/shaders/ShaderBuilder-test',
	'test/renderer/shaders/ShaderFragment-test',
	'test/renderer/shaders/ShaderLib-test',
	'test/renderer/shadow/ShadowHandler-test',
	'test/renderer/SimplePartitioner-test',
	'test/renderer/Texture-test',
	'test/renderer/TextureCreator-test',
	'test/renderer/Util-test',
	'test/scripts/GroundBoundMovementScript-test',
	'test/scripts/HeightMapBoundingScript-test',
	'test/scripts/WorldFittedTerrainScript-test',
	'test/shapes/Box-test',
	'test/shapes/Cone-test',
	'test/shapes/Cylinder-test',
	'test/shapes/Disk-test',
	'test/shapes/Grid-test',
	'test/shapes/Quad-test',
	'test/shapes/SimpleBox-test',
	'test/shapes/Sphere-test',
	'test/shapes/TextureGrid-test',
	'test/shapes/Torus-test',
	'test/statemachine/actions/InBoxAction-test',
	'test/statemachine/StateMachineComponent-test',
	'test/util/Ajax-test',
	'test/util/ArrayUtil-test',
	'test/util/CanvasUtils-test',
	'test/util/StringUtil-test',
	'test/util/PromiseUtil-test',
	'test/util/ObjectUtil-test',
	'test/renderer/Shader-test',
	'test/renderer/MeshData-test',
	'test/renderer/Camera-test',
	'test/renderer/bounds/BoundingBox-test',
	'test/renderer/bounds/BoundingSphere-test',
	'test/statemachine/StateMachineComponent-test',
	'test/entities/Bus-test',
	'test/statemachine/actions/InBoxAction-test',
	'test/scripts/HeightMapBoundingScript-test',
	'test/scripts/WorldFittedTerrainScript-test',
	'test/scripts/GroundBoundMovementScript-test',
	'test/scripts/ScriptUtils-test',
	'test/entities/components/MovementComponent-test',
	'test/entities/World-test',
	'test/entities/components/MeshRendererComponent-test',
	'test/entities/Selection-test',
	'test/entities/EntitySelection-test',
	'test/renderer/Material-test',
	'test/loaders/DynamicLoader-test',
	'test/loaders/handlers/TransformComponentHandler-test',
	'test/loaders/handlers/CameraComponentHandler-test',
	'test/loaders/handlers/LightComponentHandler-test',
	'test/loaders/handlers/EntityHandler-test',
	'test/loaders/handlers/ShaderHandler-test',
	'test/passpack/PosteffectsHandler-test',
	'test/loaders/handlers/MaterialHandler-test',
	'test/loaders/handlers/TextureHandler-test',
	'test/loaders/handlers/MeshRendererComponentHandler-test',
	'test/loaders/handlers/MeshDataComponentHandler-test',
	'test/loaders/handlers/MeshDataHandler-test',
	'test/loaders/handlers/SceneHandler-test',
	'test/loaders/handlers/ProjectHandler-test',
	'test/loaders/handlers/SkyboxHandler-test',
	'test/loaders/handlers/EnvironmentHandler-test',
	'test/loaders/handlers/SkyboxHandler-test',
	'test/loaders/handlers/EnvironmentHandler-test',
	'test/entities/components/ScriptComponent-test',
	'test/timelinepack/ValueChannel-test',
	'test/timelinepack/EventChannel-test',
	'test/timelinepack/TimelineComponent-test',
	'test/timelinepack/TimelineComponentHandler-test'
], function () {});
