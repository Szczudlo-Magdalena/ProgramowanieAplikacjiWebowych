import { locStorage } from "./locStorage";
import { Data } from "./form";

export class DocumentList {
    private documents: Data[] = [];

    constructor() {
        this.getDocumentList();
    }

    getDocumentList() {
        this.documents = locStorage
            .getDocuments()
            .map(key => locStorage.loadDocument(key));
    }

    // Imię, Nazwisko, Kierunek, Uwagi, e-Learning
    createRow(data: Data) {
        // const temp = Object.keys(data).map(key => `<td>${data[key]}</td>`);
        return `
        <td>${data.firstName}</td>
        <td>${data.surname}</td>
        <td>${data.kierunekStudiow}</td>
        <td>${data.comments}</td>
        <td>${data.preferences}</td>
        `;
        // return temp.join('');
    }

    render(node: HTMLElement) {
        node.innerHTML = '';

        const table = document.createElement('table');
        table.innerHTML = '<tr><th>Imię</th><td>Nazwisko</td><td>Kierunek</td><td>Uwagi</td><td>e-learning</td></tr>';

        // tr - table row
        // th - table head
        // td - table element | 1 | 2 | 3 |
        this.documents.forEach(data => {
            const tr = document.createElement('tr');
            tr.innerHTML = this.createRow(data);
            table.appendChild(tr);
        });
        
        node.appendChild(table);
    }
}