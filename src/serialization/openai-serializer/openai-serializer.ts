import type { SchemaSerializer } from "../types.ts";
import {
    ArraySchema,
    EnumSchema,
    ObjectSchema,
    type Schema,
} from "../../schema/schema.ts";
import { Validator } from "./utils/validator.ts";
import { generateSchema } from "./utils/generator.ts";

/**
 * A json-serializer compatible with the OpenAI json_schema standard.
 */
export class OpenAISerializer implements SchemaSerializer {
    /** Create a new OpenAISerializer, enabeling serialization in formats compattible with the OpenAI api and other providers that use similar serialization. */
    constructor() {}

    /**
     * Generate a serializeable object compatible with the OpenAI api and other providers that use imilar serialization.
     *
     * @param data The schema instance to generate the serializeable object from.
     */
    serializable(data: Schema): object {
        switch (true) {
            case data instanceof EnumSchema:
                return {
                    type: data.isOptional ? [data.type, "null"] : data.type,
                    enum: data.options,
                    ...(data.description && { description: data.description }),
                };
            case data instanceof ArraySchema:
                return {
                    type: data.isOptional ? [data.type, "null"] : data.type,
                    items: this.serializable(data.schema),
                    ...(data.description && { description: data.description }),
                };
            case data instanceof ObjectSchema: {
                const entries = Object.entries(data.properties);
                const serializableEntries = entries.reduce<
                    Record<string, object>
                >((acc, [key, schema]) => {
                    acc[key] = this.serializable(schema);
                    return acc;
                }, {});
                const requiredEntries = entries.filter(([_, schema]) =>
                    schema.isOptional == false
                );
                return {
                    type: data.isOptional ? [data.type, "null"] : data.type,
                    properties: serializableEntries,
                    required: requiredEntries.map(([key, _]) => key),
                    additionalProperties: false,
                    ...(data.description && { description: data.description }),
                };
            }
            default: {
                return {
                    type: data.isOptional ? [data.type, "null"] : data.type,
                    ...(data.description && { description: data.description }),
                };
            }
        }
    }

    /**
     * Generate a serialized string compatible with the OpenAI api and other providers that use imilar serialization.
     *
     * @param data The schema instance to serialize.
     */
    serialize(data: Schema): string {
        return JSON.stringify(this.serializable(data));
    }

    /**
     * Generate a `Schema` instance from data serialized to the standard compatible with the OpenAI api.
     *
     * @param serializedData The serialized data compatible with the OpenAI api.
     */
    deserialize(serializedData: string): Schema {
        const object = JSON.parse(serializedData);
        if (!Validator.valid(object)) {
            throw new TypeError("Invalid data format");
        }
        return generateSchema(object);
    }
}
