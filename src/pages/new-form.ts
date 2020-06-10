import { FormCreator } from '../formCreator';

export class NewFormPage {
    private form: FormCreator;
    private target: HTMLElement;

    constructor(target: string) {
        this.target = document.querySelector(target);
        this.form = new FormCreator();
    }

    render() {
        this.form.render(this.target);
    }
}