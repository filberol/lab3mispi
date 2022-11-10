//Looking for text
$('input[type="text"]').on("input", function () {
    let val = parseFloat(this.value);
    if (val >= -5 && val <= 3) {
        this.style.background = "rgba(0, 200, 0, 0.7)";
    } else {
        if (isNaN(val)) {
            this.style.background = "aliceblue";
        } else {
            this.style.background = "rgba(200, 0, 0, 0.7)";
        }
    }
});