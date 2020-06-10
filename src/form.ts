import { Field } from "./fields/field";
import { locStorage } from "./locStorage";
import { InputField } from "./fields/InputField";
import { pasteInBox } from "./utils/pasteInBox";
import { SelectField } from "./fields/SelectField";
import { TextareaField } from "./fields/TextAreaField";
import { CheckboxField } from "./fields/CheckboxField";
import { Data } from "./interfaces/data";

export class Form {
    private id: string;
    private fields: Field[] = [];

    constructor(id?: string, data: Record<string, string> = {}) {
        this.id = id;

        this.fields = [
            new InputField({
                name: 'firstName',
                label: 'Imię',
                value: data.firstName || '',
                type: 'text'
            }),
            new InputField({
                name: 'surname',
                label:'Nazwisko',
                value: data.surname || '',
                type: 'text',
    
            }),
            new SelectField({
                name: 'kierunekStudiow',
                label: 'Kierunek studiów',
                value: data.kierunekStudiow || '',
                values: [
                    'Matematyka',
                    'Informatyka',
                    'Geologia'
                ]
            }),
            new TextareaField({
                name: 'comments',
                label: 'Uwagi',
                value: data.comments || 'Wpisz swoją uwagę...',
                type: 'textarea'
            }),
            new CheckboxField({
                name: 'preferences',
                label:'Czy preferujesz e-learning?',
                value: data.preferences || true
            })
        ];
    }


    getValue() {
        const data: Data = {};

        this.fields.forEach(instance => {
            const config = instance.getConfig();
            data[config.name] = instance.getValue();
        });

        return data;
    }

    save() {
        const data = this.getValue();
        pasteInBox(data)
        locStorage.saveDocument(data, this.id);
    }

    render(node: HTMLElement) {
        node.innerHTML = '';
        this.fields.forEach(instance => node.appendChild(instance.render()));

        const submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'Wyślij';
        submitButton.onclick = () => this.save();
        node.appendChild(submitButton);
    }
}

