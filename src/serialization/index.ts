/**
 * This module contains a range of serializers supporting different serialization formats.
 *
 * ### Example
 *
 * To use a serializer, import it and serialize a `Schema`instance.
 * ```ts
 * import { Schema as s } from "@msrass/schema";
 * import { OpenAISerializer } from "@msrass/schema/serialization";
 *
 * const simpleSchema = s.string().describe("Any string will do.");
 *
 * const serializer = new OpenAISerializer();
 * const serializedSchema = serializer.serialize(simpleSchema);
 * ```
 *
 * @module
 */

export { OpenAISerializer } from "./openai-serializer/openai-serializer.ts";
export type { SchemaSerializer } from "./types.ts";
