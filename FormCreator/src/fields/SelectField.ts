import { Field } from "./field";
import { FieldTypes } from "../interfaces/interfaces";

export class SelectField extends Field {
    public config: Partial<FieldTypes['selectField']>;
    private element: HTMLSelectElement;

    constructor(config: Partial<FieldTypes['selectField']>) {
        super();
        this.config = config;
    }

    getValue() {
        return this.element.value;
    }

    render() {
        const element = document.createElement("select");
        this.element = element;
        const { value: selectedValue, name, label, values } = this.config;
        element.name = name;
        element.id = name;

        element.innerHTML = values.map(value => `
            <option value='${value}' ${value === selectedValue ? 'selected' : ''}>${value}</option>
        `).join('');

        return this.fieldInstance.render(element, label);
    }
}