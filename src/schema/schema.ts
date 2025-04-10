import type { PrimitiveSchemaType, SchemaType } from "./types.ts";

/** Main schema factory class */
export abstract class Schema {
    public type: SchemaType;
    public isOptional: boolean = false;
    public description?: string;

    protected constructor(type: SchemaType, description?: string) {
        this.type = type;
        this.description = description;
    }

    /** Add a description */
    public describe(description: string): Schema {
        this.description = description;
        return this;
    }

    /** Flag instance as optional */
    public optional(): Schema {
        this.isOptional = true;
        return this;
    }

    /** Create an instance of NumberSchema */
    public static number(): NumberSchema {
        return new NumberSchema();
    }

    /** Create an instance of BooleanSchema */
    public static boolean(): BooleanSchema {
        return new BooleanSchema();
    }

    /** Create an instance of StringSchema */
    public static string(): StringSchema {
        return new StringSchema();
    }

    /** Create an instance of EnumSchema */
    public static enum(options: string[]): EnumSchema {
        return new EnumSchema(options);
    }

    /** Create an instance of ArraySchema */
    public static array(schema: Schema): ArraySchema {
        return new ArraySchema(schema);
    }

    /** Create an instance of ObjectSchema */
    public static object(properties: Record<string, Schema>): ObjectSchema {
        return new ObjectSchema(properties);
    }
}

export abstract class PrimitiveSchema extends Schema {
    protected constructor(type: PrimitiveSchemaType) {
        super(type);
    }
}

export class NumberSchema extends PrimitiveSchema {
    constructor() {
        super("number");
    }
}
export class BooleanSchema extends PrimitiveSchema {
    constructor() {
        super("boolean");
    }
}

export class StringSchema extends PrimitiveSchema {
    constructor() {
        super("string");
    }
}

export class EnumSchema extends StringSchema {
    public options: string[];

    constructor(options: string[]) {
        super();
        this.options = options;
    }
}

export class ArraySchema extends Schema {
    public schema: Schema;

    constructor(schema: Schema) {
        super("array");
        this.schema = schema;
    }
}

export class ObjectSchema extends Schema {
    public properties: Record<string, Schema>;

    constructor(properties: Record<string, Schema>) {
        super("object");
        this.properties = properties;
    }
}
