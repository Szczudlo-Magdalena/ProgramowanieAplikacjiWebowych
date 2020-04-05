import { FieldLabel } from './fieldLabel';

export abstract class Field {
    public fieldInstance: FieldLabel;
    abstract config: any;

    constructor() {
        this.fieldInstance = new FieldLabel();
    }

    getConfig() {
        return this.config
    }

    abstract getValue(): any;
}