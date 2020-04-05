export class FieldLabel {
    render(node: HTMLElement, labelValue: string) {
        const div = document.createElement('div');
        const label = document.createElement('label');
        label.setAttribute("for", node.id)
        label.innerHTML = labelValue + ':';
        div.appendChild(label);
        div.appendChild(node);

        return div;
    }
}