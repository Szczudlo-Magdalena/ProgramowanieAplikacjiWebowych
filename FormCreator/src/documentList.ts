import { locStorage } from "./locStorage";
import { Data } from "./interfaces/data";

export class DocumentList {
    private documents: Record<string, Data> = {};

    constructor() {
        this.getDocumentList();
    }

    getDocumentList() {
        this.documents = {};
        
        locStorage
            .getDocuments()
            .forEach(key => {
                const document = this.getDocument(key)

                this.documents[key] = document;
            });
    }

    // Imię, Nazwisko, Kierunek, Uwagi, e-Learning
    createRow(data: Data) {
        return `
        <td>${data.firstName}</td>
        <td>${data.surname}</td>
        <td>${data.kierunekStudiow}</td>
        <td>${data.comments}</td>
        <td>${data.preferences}</td>
        `;
    }

    getDocument(id: string) {
        return locStorage.loadDocument(id);
    }

    removeDocument(id: string) {
        locStorage.removeDocument(id);
    }

    render(node: HTMLElement) {
        node.innerHTML = '';

        const table = document.createElement('table');
        table.innerHTML = '<tr><th>Imię</th><td>Nazwisko</td><td>Kierunek</td><td>Uwagi</td><td>e-learning</td></tr>';

        Object.keys(this.documents).forEach(key => {
            const data = this.documents[key];

            const tr = document.createElement('tr');
            tr.onclick = () => window.location.href = `edit-document.html?id=${key}`
            tr.innerHTML = this.createRow(data);

            const removeActionTd = document.createElement('td');
            removeActionTd.innerHTML = '<button>Usuń</button>';
            removeActionTd.onclick = (e) => {
                e.stopPropagation();
                this.removeDocument(key);
                window.location.reload();
            }

            tr.appendChild(removeActionTd);

            table.appendChild(tr);
        });
        
        node.appendChild(table);
    }
}