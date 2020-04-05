import { Field } from "./fields/field";
import { FieldTypes, CommonFieldTypes } from "./interfaces";

class InputField extends Field {
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


class SelectField extends Field {
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
class TextareaField extends Field {
    public config: Partial<FieldTypes['inputField']>
    private element: HTMLTextAreaElement;

    constructor(config: Partial<FieldTypes['inputField']>) {
        super();
        this.config = config;
    }

    getValue() {
        return this.element.value;
    }

    render() {
        const element = document.createElement("textarea");
        this.element = element;
        const { value, name, type, label } = this.config;
        //element.type = type;
        element.name = name;
        element.id = name;
        element.value = value;

        return this.fieldInstance.render(element, label);
    }
}

class CheckboxField extends Field {
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


export class Form {
    private fields = [
        new InputField({
            name: 'firstName',
            label: 'Imię',
            value: 'Jan',
            type: 'text'
        }),
        new InputField({
            name: 'surname',
            label:'Nazwisko',
            value:'Nowak',
            type:'text',

        }),
        new SelectField({
            name: 'kierunekStudiow',
            label: 'Kierunek studiów',
            value: 'Informatyka',
            values: [
                'Matematyka',
                'Informatyka',
                'Geologia'
            ]
        }),
        new TextareaField({
            name: 'comments',
            label: 'Uwagi',
            value:'Wpisz swoją uwagę',
            type: 'textarea'
        }),
        new CheckboxField({
            name: 'preferences',
            label:'Czy preferujesz e-learning?',
            value: true
        })
    ];

    constructor() {
    }


    getValue() {
        const data: Data = {};

        this.fields.forEach(instance => {
            const config = instance.getConfig();
            data[config.name] = instance.getValue();
        });

        return data;
    }

    render(node: HTMLElement) {
        // jesli tak zrobisz, musisz wykonac najpierw event.preventDefault();
        // node.innerHTML = '<form onSubmit=">'; // utworzyć elemnt form w podobny sposób co tworzony jest tutaj submitButton lub jeszcze bardziej podobnie co FieldLabel
        node.innerHTML = '';
        this.fields.forEach(instance => node.appendChild(instance.render()));

        const submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'Wyślij';
        submitButton.onclick = () => pasteInBox(this.getValue());
        node.appendChild(submitButton);
    }
}

interface Data {
    [key: string]: string | boolean;
}

function valueToString(value: any) {
    if (typeof value === 'boolean') {
        return value ? "Tak" : "Nie";
    }

    return value;
}

// name: Wartość || Imię: Wartość
function pasteInBox(data: Data) {
    let box = document.querySelector(".box");
    if (!box) {
        const body = document.querySelector("body");
        body.innerHTML += `<div class="box"></div>`;
        box = document.querySelector(".box");
    }

    box.innerHTML = Object.keys(data).map(key => {
        const value = data[key];

        return `
            <div>
                ${key}: ${valueToString(value)}
            </div>
        `
    }).join('')
    + `
    <textarea>${JSON.stringify(data, null, 2)}</textarea>
`;
}