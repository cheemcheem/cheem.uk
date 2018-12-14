window.onload = () => {
    const tips = document.getElementsByTagName(".tooltip");
    for(let i = 0; i < tips.length; i++) {
        tips.item(i).addEventListener("mouseout", (ev) => {
            const children = tips.item(i).children;
            children.item(0).setAttribute("style", "display: none;");
        });
    }
}