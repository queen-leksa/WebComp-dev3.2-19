class Range extends HTMLElement {
    static get observedAttributes() {
        return ["value"];
    }
    attributeChangeCallback(name, oldV, newV) {
        if (name === "value") {
            this.updateThumb(newV);
        }
    }
    connectedCallback() {
        console.log(this);
        this.innerHTML = `
            <div class="thumbnail"></div>
            <div class="thumb"></div>
        `;
        let val = this.getAttribute("value");
        this.updateThumb(val);
    }
    updateThumb(val) {
        let thumb = this.querySelector(".thumb");
        thumb.style.left = `calc(${val}% - ${thumb.offsetWidth / 2}px)`;
    }
}
customElements.define("custom-range", Range);