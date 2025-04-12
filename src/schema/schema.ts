import type { PrimitiveSchemaType, SchemaType } from "./types.ts";

/** Main schema factory class. */
export abstract class Schema {
    public type: SchemaType;
    public isOptional: boolean = false;
    public description?: string;

    /**
     * This cannot be used to instantiate a Schema instance directly.
     *
     * @param type The schema type to be constructed.
     * @param description A description metadata do attatc to the instance.
     */
    protected constructor(type: SchemaType, description?: string) {
        this.type = type;
        this.description = description;
    }

    /**
     * Add a description.
     *
     * @param description The description metadata do attatch to the instance.
     */
    public describe(description: string): Schema {
        this.description = description;
        return this;
    }

    /** Flag instance as optional. */
    public optional(): Schema {
        this.isOptional = true;
        return this;
    }

    /** Create an instance of NumberSchema. */
    public static number(): NumberSchema {
        return new NumberSchema();
    }

    /** Create an instance of BooleanSchema. */
    public static boolean(): BooleanSchema {
        return new BooleanSchema();
    }

    /** Create an instance of StringSchema. */
    public static string(): StringSchema {
        return new StringSchema();
    }

    /** Create an instance of EnumSchema. */
    public static enum(options: string[]): EnumSchema {
        return new EnumSchema(options);
    }

    /** Create an instance of ArraySchema. */
    public static array(schema: Schema): ArraySchema {
        return new ArraySchema(schema);
    }

    /** Create an instance of ObjectSchema. */
    public static object(properties: Record<string, Schema>): ObjectSchema {
        return new ObjectSchema(properties);
    }
}

/** Abstract PrimitiveSchema class. */
export abstract class PrimitiveSchema extends Schema {
    /**
     * This cannot be used to instantiate a PrimitiveSchema directly.
     *
     * @param type The primitive schema type to be constructed.
     */
    protected constructor(type: PrimitiveSchemaType) {
        super(type);
    }
}

/** NumberSchema represents a number type. */
export class NumberSchema extends PrimitiveSchema {
    /** Create a new NumberSchema representing a number type. */
    constructor() {
        super("number");
    }
}

/** BooleanSchema represents a boolean type. */
export class BooleanSchema extends PrimitiveSchema {
    /** Create a new BooleanSchema representing a boolean type. */
    constructor() {
        super("boolean");
    }
}

/** StringSchema represents a string type. */
export class StringSchema extends PrimitiveSchema {
    /** Create a new StringSchema representing a string type. */
    constructor() {
        super("string");
    }
}

/** EnumSchema represents an enum type. */
export class EnumSchema extends StringSchema {
    /** The valid enum options. */
    public options: string[];

    /**
     * Create a new EnumSchema representing an enum type.
     *
     * @param options The valid enum options.
     */
    constructor(options: string[]) {
        super();
        this.options = options;
    }
}

/** ArraySchema represents an array type. */
export class ArraySchema extends Schema {
    /** The schema of the items in the array. */
    public schema: Schema;

    /**
     * Create a new ArraySchema representing an array type.
     *
     * @param schema The schema of the items in the array.
     */
    constructor(schema: Schema) {
        super("array");
        this.schema = schema;
    }
}

/** ObjectSchema represents an object type. */
export class ObjectSchema extends Schema {
    /** The schemas of the properties of the object schema. */
    public properties: Record<string, Schema>;

    /**
     * Create a new ObjectSchema representing an object type.
     *
     * @param properties The schemas of the properties of the object schema.
     */
    constructor(properties: Record<string, Schema>) {
        super("object");
        this.properties = properties;
    }
}
