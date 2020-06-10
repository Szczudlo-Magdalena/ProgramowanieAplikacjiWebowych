import { Form } from '../form';

export class NewDocumentPage {
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