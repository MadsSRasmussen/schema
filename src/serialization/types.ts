import type { Schema } from "../schema/schema.ts";

/** Interface implemented by schema serializers. */
export interface SchemaSerializer {
    /**
     * Generate a serializeable object from the input data.
     *
     * @param data The schema to generate the serializeable from.
     */
    serializable(data: Schema): object;

    /**
     * Generate a serialized string from the input data.
     *
     * @param data The schema to generate the serialized string from.
     */
    serialize(data: Schema): string;

    /**
     * Generate a `Schema` instance from data serialized to the specific format.
     *
     * @param serializedData The serialized data - serialized to the specific format readebla eby the serializer.
     */
    deserialize(serializedData: string): Schema;
}
