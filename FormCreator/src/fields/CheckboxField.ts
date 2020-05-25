import { Field } from "./field";
import { FieldTypes } from "../interfaces/interfaces";

export class CheckboxField extends Field {
    public config: Partial<FieldTypes['checkboxField']>
    private element: HTMLInputElement;

    constructor(config: Partial<FieldTypes['checkboxField']>) {
        super();
        this.config = config;
    }

    getValue() {
        return this.element.checked;
    }

    render() {
        const element = document.createElement("input");
        this.element = element;
        const { value, name, label } = this.config;
        element.type = 'checkbox';
        element.name = name;
        element.id = name;
        element.checked = value;

        return this.fieldInstance.render(element, label);
    }
}