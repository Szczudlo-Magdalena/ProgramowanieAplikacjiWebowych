// import { FieldLabel } from './fieldLabel';
// import { InputField } from './fields/InputField';
enum FieldType {
    inputField = 'inputField'
};

interface Field {
    inputField: {
        name: string;
        label: string;
        type: string;
        value: string;
    },
    selectField: {
        name: string;
        label: string;
        value: string;
        values: string[];
    }
}

class App {
    private form: Form;
    private target: HTMLElement;

    constructor(target: string) {
        this.target = document.querySelector(target);
        this.form = new Form();
    }

    render() {
        this.form.render(this.target);
    }
}

class Form {
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
        })
    ];

    constructor() {
    }


    getValue() {
        // return this.fields.map(instance => instance.getValue())
    }

    render(node: HTMLElement) {
        node.innerHTML = '';
        this.fields.forEach(instance => node.appendChild(instance.render()));
    }
}

class FieldLabel {
    render(node: HTMLElement, labelValue: string) {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.setAttribute("for", node.id)
        label.innerHTML = labelValue + ':';
        div.appendChild(label);
        div.appendChild(node);

        return div;
    }
}

class Field {
    public fieldInstance: FieldLabel;
    constructor() {
        this.fieldInstance = new FieldLabel();
    }
}

class InputField extends Field {
    private config: Partial<Field['inputField']>
    constructor(config: Partial<Field['inputField']>) {
        super();
        this.config = config;
    }

    render() {
        const element = document.createElement("input");
        const { value, name, type, label } = this.config;
        element.type = type;
        element.name = name;
        element.id = name;
        element.value = value;

        return this.fieldInstance.render(element, label);
    }
}
class TextareaField extends Field {
    private config: Partial<Field['inputField']>
    constructor(config: Partial<Field['inputField']>) {
        super();
        this.config = config;
    }

    render() {
        const element = document.createElement("textarea");
        const { value, name, type, label } = this.config;
        //element.type = type;
        element.name = name;
        element.id = name;
        element.value = value;

        return this.fieldInstance.render(element, label);
    }
}

class SelectField extends Field {
    private config: Partial<Field['selectField']>
    constructor(config: Partial<Field['selectField']>) {
        super();
        this.config = config;
    }

    render() {
        const element = document.createElement("select");
        const { value: selectedValue, name, label, values } = this.config;
        element.name = name;
        element.id = name;

        element.innerHTML = values.map(value => `
            <option value='${value}' ${value === selectedValue ? 'selected' : ''}>${value}</option>
        `).join('');

        return this.fieldInstance.render(element, label);
    }
}

const app = new App('#target');
app.render();