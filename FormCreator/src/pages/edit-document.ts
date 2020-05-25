import { Form } from '../form';
import { Router } from '../router';
import { DocumentList } from '../documentList';

export class EditDocumentPage {
    private form: Form;
    private target: HTMLElement;
    private documentList: DocumentList;

    constructor(target: string) {
        this.target = document.querySelector(target);
        this.documentList = new DocumentList();

        const id = Router.getParam('id');
        const data = this.documentList.getDocument(id);

        this.form = new Form(id, data);
    }

    render() {
        this.form.render(this.target);
    }
}