import { DocumentListPage } from "./pages/document-list";
import { EditDocumentPage } from "./pages/edit-document";
import { NewDocumentPage } from "./pages/new-document";

export class Router {
    static getParam(key: string) {
        const query: string = window.location.search.substr(1);
        const urlParams = new URLSearchParams(query);
        const id = urlParams.get(key);

        return id;
    }

    render(target: string) {
        const { pathname } = window.location;
        let page;
        if (pathname.includes('document-list')) {
            page = new DocumentListPage(target);
        } else if (pathname.includes('edit-document')) {
            page = new EditDocumentPage(target);
        } else {
            page = new NewDocumentPage(target);
        }

        page.render();
    }
}