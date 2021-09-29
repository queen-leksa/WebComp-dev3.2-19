class Range extends HTMLElement {
    static get observedAttributes() {
        return ["value"];
    }
    attributeChangeCallback(name, oldV, newV) {
        console.log(name);
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
        this.addEventListener("mousedown", this.eventHandler);
        this.addEventListener("mousemove", this.eventHandler);
        this.addEventListener("mouseup", this.eventHandler);
    }

    set value(newVal) {
        this.setAttribute("value", newVal);
    }
    get value() {
        return this.getAttribute("value");
    }
    eventHandler(e) {
        // console.log(e.type);
        const bounds = this.getBoundingClientRect();
        // console.log(bounds);
        const x = e.clientX - bounds.left;
        // console.log(x);
        // Сдвинуть тумб
        // изменить значение value
        switch (e.type) {
            case "mousedown":
                this.dragging = true;
                this.changeX(x);
                this.updateThumb(this.value);
                break;
            case "mouseup":
                this.dragging = false;
                break;
            case "mousemove":
                if (this.dragging) {
                    this.changeX(x);
                    this.updateThumb(this.value);
                }
                break;
        }

    }
    changeX(coordinates) {
        let halfTh = this.querySelector(".thumb").offsetWidth / 2;
        let pos = coordinates - halfTh;
        if (pos > this.offsetWidth) {
            pos = this.offsetWidth - halfTh;
        }
        if (pos < 0) {
            pos = 0 - halfTh;
        }
        this.value = (pos + halfTh) / this.offsetWidth * 100;
        if (this.value > 100) {
            this.value = 100;
        }
    }
    updateThumb(val) {
        let thumb = this.querySelector(".thumb");
        thumb.style.left = `calc(${val}% - ${thumb.offsetWidth / 2}px)`;
    }
}
customElements.define("custom-range", Range);