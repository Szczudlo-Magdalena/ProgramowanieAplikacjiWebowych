import { locStorage } from "./locStorage";
import { InputField } from "./fields/InputField";

// moze byc uzyte w kilku plikach
const LABELS = {
    name: 'Nazwa pola',
    label: 'Etykieta',
    value: 'Domyślna wartość',
    type: 'Typ pola'
};

/*
localStorage: 
[
    {
        name: value,
        label: value,
        value: value,
        type: value
    }
    ^ <- np. jeden inputField w form.ts
    ^ <- 4 inputField'y w formCreator.ts
]
*/

// todo: wynieść do folderu z interfejsami
type fieldKey = 'name' | 'label' | 'value' | 'type';

type FieldDetails = {
    [key in fieldKey]: string;
}

type FieldNode = {
    [key in fieldKey]: InputField;
}

export class FormCreator {
    private id: string;
    private wrapper: HTMLElement;
    private fieldNodes: FieldNode[] = [];


    constructor(id?: string, data?: FieldDetails[]) {
        this.id = id;

        this.wrapper = document.createElement('div');

        this.fieldNodes = (data || [this.getNewFieldEntry()])
            .map(this.getNodesForEntry);
    }
    
    getNodesForEntry = (entry: FieldDetails): FieldNode => {
        const fields: Partial<FieldNode> = {};
        Object.keys(entry).forEach((property: fieldKey) => {
            const field = new InputField({
                name: property,
                value: entry[property],
                label: LABELS[property],
            })
         
            fields[property] = field;
        });

        return fields as FieldNode;
    }

    
    getNewFieldEntry = () => {
        return {
            name: '',
            label: '',
            value: '',
            type: ''
        }
    }


    addNewField = () => {
        const field = this.getNewFieldEntry();
        const nodes = this.getNodesForEntry(field);

        this.fieldNodes.push(nodes);
        this.wrapper.appendChild(this.getEntryNodes(nodes));
    }


    getValue() {
        const data: FieldDetails[] = [];

        this.fieldNodes.forEach(instance => {
            const fieldDetails: any = {}; // FieldDetails
            Object.keys(instance).forEach((property: fieldKey) => {
                const node = instance[property];
                const config = node.getConfig();
                fieldDetails[config.name] = node.getValue();
            })

            data.push(fieldDetails);
        });

        return data;
    }

    save() {
        const data = this.getValue();
        locStorage.saveForm(data, this.id);
    }

    getEntryNodes(fieldEntry: FieldNode) {
        const div = document.createElement('div');
        
        Object.keys(fieldEntry).forEach((key: fieldKey) => {
            div.appendChild(fieldEntry[key].render())
        });

        return div;
    }

    render(node: HTMLElement) {
        node.innerHTML = '';

        this.fieldNodes.forEach(fieldEntry => {
            this.wrapper.appendChild(this.getEntryNodes(fieldEntry))
        });

        const submitButton = document.createElement('input');
        submitButton.type = 'submit';
        submitButton.value = 'Wyślij';
        submitButton.onclick = () => this.save();

        const addNewField = document.createElement('input');
        addNewField.type = 'submit';
        addNewField.value = 'Dodaj pole';
        addNewField.onclick = () => this.addNewField();

        node.appendChild(this.wrapper);
        node.appendChild(submitButton);
        node.appendChild(addNewField);
    }
}

