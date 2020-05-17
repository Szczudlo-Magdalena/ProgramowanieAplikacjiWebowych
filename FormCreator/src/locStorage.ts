import { Storage } from "./interfaces";

declare global {
    interface Window {
        locStorage: LocStorage;
        adasdasd: boolean;
    }
}

const DOCUMENTS_LIST_ID = 'documents';

// spread i rest 

class LocStorage implements Storage {
    saveDocument(obj: any): string {
        const id = `document-${Date.now()}`;

        localStorage.setItem(id, JSON.stringify(obj));

        const documents = this.getDocuments() || [];
        localStorage.setItem(DOCUMENTS_LIST_ID, JSON.stringify([...documents, id]))

        return id;
    }

    loadDocument(id: string) {
        return JSON.parse(localStorage.getItem(id));
    }

    getDocuments(): string[] {
        return this.loadDocument(DOCUMENTS_LIST_ID) || []; 
    }
    
    removeDocument(id: string){

    }
}

export const locStorage = new LocStorage();