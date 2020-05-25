import { valueToString } from "./valueToString";
import { Data } from "../interfaces/data";

export function pasteInBox(data: Data) {
    let box = document.querySelector(".box");
    if (!box) {
        const body = document.querySelector("body");
        body.innerHTML += `<div class="box"></div>`;
        box = document.querySelector(".box");
    }

    box.innerHTML = Object.keys(data).map(key => {
        const value = data[key];

        return `
            <div>
                ${key}: ${valueToString(value)}
            </div>
        `
    }).join('')
    + `
    <textarea>${JSON.stringify(data, null, 2)}</textarea>
`;
}