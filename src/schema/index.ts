/**
 * **Schema** is a serializeable shcema decleration library written in typescript.
 * The developer experience of declaring a schema is inspirred by that of [Zod](https://zod.dev/).
 *
 * ### Example schema
 * To declare a schema, simply import the abstract Schema class from the module:
 *
 * ```ts
 * import { Schema as s } from "@msrass/schema";
 *
 * const objectSchema = s.object({
 *     stringSchema: s.string(),
 *     numberSchema: s.number().describe("Only cool numbers..."),
 *     enumSchema: s.enum(["foo", "bar"]).optional(),
 *     arraySchema: s.array(s.boolean()),
 * });
 * ```
 *
 * ### Serialization
 *
 * To serialize a schema a serializer must be imported from the `@msrass/schema/serialization` module.
 *
 * ```ts
 * // ...continuation of snippet from Example schema section
 * import { OpenAISerializer } from "@msrass/schema/serialization";
 *
 * const serializer = new OpenAISerializer();
 * const serializedSchema = serializer.serialize(objectSchema);
 * const schemaInstance = serializer.deserialize(serializedSchema);
 * ```
 * @module
 */
export * from "./schema.ts";
