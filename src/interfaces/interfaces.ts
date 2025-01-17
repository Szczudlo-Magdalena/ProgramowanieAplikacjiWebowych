export interface CommonFieldTypes {
    name: string;
    label: string;
    value?: any;
}

export interface FieldTypes {
    inputField: { 
        type: string;
        value: string;
    } & CommonFieldTypes,
    selectField: {
        value: string;
        values: string[];
    } & CommonFieldTypes,
    checkboxField: {
        value: boolean;
    } & CommonFieldTypes
}

export interface Storage {
    saveDocument(obj: any): string;
    loadDocument(id: string): any;
    getDocuments(): string[];
    removeDocument(id: string): void;
    saveForm(obj: any): string;
    loadForm(id: string): any;
    getForms(): string[];
    removeForm(id: string): void;
}