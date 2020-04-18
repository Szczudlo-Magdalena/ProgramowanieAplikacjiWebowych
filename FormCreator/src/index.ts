import { Form } from './form';
// import { InputField } from './fields/InputField';
import './locStorage';
import { DocumentList } from './documentList';

class FormPage {
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
class DocumentListPage {
    private documentList: DocumentList;
    private target: HTMLElement;

    constructor(target: string) {
        this.target = document.querySelector(target);
        this.documentList = new DocumentList();
    }

    render() {
        this.documentList.render(this.target);
    }
}

const app = new FormPage('#target');
app.render(); 


// sprobuj zrobic ze klikasz przycis wyslij to wywoluje sie dokuemntlistpage

