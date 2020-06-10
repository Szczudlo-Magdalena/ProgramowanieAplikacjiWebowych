import { Storage } from "./interfaces/interfaces";

declare global {
    interface Window {
        locStorage: LocStorage;
    }
}

const DOCUMENTS_LIST_ID = 'documents';
const FORMS_LIST_ID = 'forms';

class LocStorage implements Storage {
    saveDocument(obj: any, key?: string): string {
        const id = key || `document-${Date.now()}`;

        localStorage.setItem(id, JSON.stringify(obj));

        const documents = this.getDocuments() || [];
        if (!key) {
            documents.push(id);
        }
        localStorage.setItem(DOCUMENTS_LIST_ID, JSON.stringify(documents))

        return id;
    }

    loadDocument(id: string) {
        return JSON.parse(localStorage.getItem(id));
    }

    getDocuments(): string[] {
        return this.loadDocument(DOCUMENTS_LIST_ID) || []; 
    }

    removeDocument(key: string) {
        const documents = this.getDocuments().filter(id => id !== key);
        localStorage.removeItem(key);

        localStorage.setItem(DOCUMENTS_LIST_ID, JSON.stringify(documents))
    }
    
    saveForm(obj: any, key?: string): string {
        const id = key || `form-${Date.now()}`;

        localStorage.setItem(id, JSON.stringify(obj));

        const forms = this.getForms() || [];
        if (!key) {
            forms.push(id);
        }
        localStorage.setItem(FORMS_LIST_ID, JSON.stringify(forms))

        return id;
    }

    loadForm(id: string) {
        return JSON.parse(localStorage.getItem(id));
    }

    getForms(): string[] {
        return this.loadForm(FORMS_LIST_ID) || []; 
    }

    removeForm(key: string) {
        const forms = this.getForms().filter(id => id !== key);
        localStorage.removeItem(key);

        localStorage.setItem(FORMS_LIST_ID, JSON.stringify(forms))
    }
}

export const locStorage = new LocStorage();