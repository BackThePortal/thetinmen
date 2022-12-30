import Posts from './posts.json'
import { describe, it, expectTypeOf, expect } from "vitest";

describe('check posts.json content', function () {
	it('array at top level', () => {
		expectTypeOf(Posts).toBeArray;
	});
	it('top level array contains at least one item', () => {
		expect(Posts.length).toBeGreaterThanOrEqual(2);
	});
});