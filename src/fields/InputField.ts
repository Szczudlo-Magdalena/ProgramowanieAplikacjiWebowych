import { Field } from "./field";
import { FieldTypes } from "../interfaces/interfaces";

export class InputField extends Field {
    public config: Partial<FieldTypes['inputField']>
    private element: HTMLInputElement;

    constructor(config: Partial<FieldTypes['inputField']>) {
        super();
        this.config = config;
    }

    getValue() {
        return this.element.value;
    }

    render() {
        const element = document.createElement("input");
        this.element = element;
        const { value, name, type, label } = this.config;
        element.type = type;
        element.name = name;
        element.id = name;
        element.value = value;

        return this.fieldInstance.render(element, label);
    }
}