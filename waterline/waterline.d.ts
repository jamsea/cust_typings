declare var waterline: waterline.waterline;

declare module waterline {
    export interface waterline {
        new (): waterline;
        _collections: Collection[];
        _connections: Connection[];
        Collection: Collection;
        Model: Model;
        loadCollection(collection: Collection): Collection[];
        initialize(options: ConfigOptions, cb: cb): void;
        schema: Schema;
        teardown(cb: cb): void;
        bootstrap(cb: cb): void;
    }

    export interface Collection extends Core, Query {
        new (waterline: waterline, connections: Connection[], cb: cb): Collection;
        connections: Connection[];
        waterline: waterline;
        attributes: Attributes;
        extend(protoProps: {}, staticProps?: {}): any;
    }

    export interface Attributes {
        migrate?: string;
    }

    export interface CollectionLoader {
        new (collection: Collection, connections: Connection[], defaults: {}): CollectionLoader;
        initialize(context: {}): Collection;
        _validate(collection: Collection, connections: Connection[]): Collection;
        _getConnections(collection: Collection, connections: Connection[]): {};
    }

    export interface Core {
        new (options: {}): Core;
        adapter: Adapter;
        _attributes: {};
        connections: Connection[];
        defaults: Attributes;
        _cast: Cast;
        _schema: Schema;
        _validator: Validator;
        _callbacks: {
            afterCreate: any[],
            beforeCreate: any[]
        };
        _instanceMethods: {};
        hasSchema: boolean;
        migrate: string;
        _initialize(options: {}): void;
        _model: Model;
        _transformer: Transformer;
        adapterDictionary: Dictionary;
        _normalizeSchemaFlag(): boolean;
    }

    export interface Dictionary {
        // TODO
    }

    export interface Transformer {
        // TODO
    }

    export interface Validator {
        // TODO
    }

    export interface Cast {
        // TODO
    }

    export interface Query extends validate, ddl, dql, aggregate, composite, findersBasic, findersHelpers, findersDynamicFinders, stream {
        new (): Query;
        adapter: Adapter;
        buildDynamicFinders(): void;
        sync(cb: cb): void;
        extend(protoProps: {}, staticProps: {}): {};
    }

    export interface validate {
        validate: (values: any[], presentOnly?: cb | boolean, cb?: cb) => void;
    }

    export interface ddl {
        describe(cb: cb): void;
        alter(cb: cb): void;
        drop(cb: cb): void;
    }

    interface AsyncResultCallback<T> { (err: Error, result: T): void; }
    interface AsyncResultIterator<T, R> { (item: T, callback: AsyncResultCallback<R>): void; }

    export interface dql {
        create(values: any | any[], cb?: cb|AsyncResultIterator<any, any>): any;
        update(criteria: {}, values: {}, cb?: cb): any;
        destroy(criteria: {}, cb?: cb): any;
        count(criteria: {}, options: {}, cb?: cb): any;
        join(collection: any, fk: any, pk: any, cb: cb): void;
    }

    export interface aggregate {
        createEach(valuesList: any[], cb?: cb): any;
        findOrCreateEach(criteria: {}, valuesList: any[], cb?: cb): any;
    }

    export interface composite {
        findOrCreate(criteria: {}, values?: {}, cb?: cb): any;
    }

    export interface findersBasic {
        findOne(criteria: {}, cb?: cb): any;
        find(criteria?: {}, options?: {}, cb?: cb): any;
        where(...arguments: any[]): findersBasic;
        select(...arguments: any[]): findersBasic;
    }

    export interface findersHelpers {
        findOneLike(criteria: {}, options: {}, cb: cb): void;
        findLike(criteria: {}, options: {}, cb: cb): void;
        startsWith(criteria: {}, options: {}, cb: cb): void;
        endsWith(criteria: {}, options: {}, cb: cb): void;
        contains(criteria: {}, options: {}, cb: cb): void;
    }

    export interface findersDynamicFinders {
        buildDynamicFinders(): void;
        generateDynamicFinder(attrName: string, method: string, dontCapitalize: boolean): any;
        generateAssociationFinders(attrName: string): any;
    }

    export interface stream {
        stream(criteria: {}, transformation?: {}): ModelStream;
    }

    export interface ModelStream {
        // TODO
    }

    export interface Connection {
        postgres: any; // Fix this line
    }

    export interface Model {
        (context: {}, mixins: {}): Model;
        toObject(): Object;
        save(options: {}, cb: cb): any;
        destory(cb: any): any;
        find(query: Object): any;
        _defineAssociations(): void;
        _normalizeAssociations(): void;
        _cast(values: any[]): void;
        query(query: string, cb: cb): void;
        validate(cb: cb): void | any;
        toJSON(): JSON;
    }

    export interface ConfigOptions {
        adapters: Adapter;
        connections: Connection;
    }

    export interface cb {
        (error: WLError, result?: any): any;
    }

    export interface Adapter {
        url?: string;
        postgres?: any; // TODO: Fix this line
        /*
         connections: Connection[],
         query: any,
         collection: string,
         identity: string,
         dictionary: adapterDictionary
         */
    }

    export interface adapterDictionary {
        // TODO
    }

    export interface Schema {
        // TODO, in waterline-schema.d.ts
    }

    export interface Record {
        id?: number;
        createdAt: Date;
        updatedAt: Date;
    }

    export interface WLError {
        invalidAttributes: any;
        model: string;
        _e: any;
        rawStack: string;
        reason: string;
        code: string;
        status: number;
        details: string;
        detail?: string;
    }
}

export = waterline;
