import { DocumentList } from "../documentList";

export class DocumentListPage {
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