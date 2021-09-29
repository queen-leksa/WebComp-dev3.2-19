export default class MyRange extends HTMLElement {
	connectedCallback() {
		console.log(this);
		let thumb = document.createElement("div");
		thumb.style.width = "24px";
		thumb.style.height = "24px";
		thumb.style.backgroundColor = "yellowgreen";
		thumb.style.borderRadius = "50%";
		thumb.style.boxShadow = "0 0 5px 0 #0004";
		let tbnail = document.createElement("div");
		tbnail.style.width = "50%";
		tbnail.style.height = "100%";
		tbnail.style.backgroundColor = "greenyellow";
		this.append(tbnail, thumb);
		thumb.style.left = (this.offsetWidth - thumb.offsetWidth) / 2 + "px";
	}
}
