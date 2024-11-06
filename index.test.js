import { expect, test } from "vitest";
import hello from "./index.js";

test("hello", () => {
  expect(hello()).toBe("Hello, World!");
});
