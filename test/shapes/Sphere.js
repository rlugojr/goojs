define(
[
	"goo/shapes/ShapeCreator",
	"goo/shapes/Sphere"
], function(
	ShapeCreator,
	Sphere
) {
	"use strict";

	describe("Sphere", function() {
		var a = ShapeCreator.createSphere(8, 4);

		it("Number of vertices and indices", function() {
			expect(a.vertexCount).toEqual(32);
			expect(a.indexCount).toEqual(144);
		});
	});
});
