{var l2d_scale = 1, l2d_x = 0, l2d_y = 0;
let tmp_x = 0, tmp_y = 0, start = null, delta = null;
let slider = document.getElementById("scale_slider");
let canvas = document.getElementById("live2d");
slider.oninput = function() {
    l2d_scale = parseFloat(this.value);
};
canvas.addEventListener('mousedown', e => start = {x: e.clientX, y: e.clientY})
window.addEventListener('mousemove', e => {
    if(start !== null) {
        delta = {x: e.clientX - start.x, y: e.clientY - start.y}
        l2d_x = tmp_x + (delta.x / 600);
        l2d_y = tmp_y - (delta.y / 600);
    }
})
window.addEventListener('mouseup', e => {
    if(start !== null) {
        tmp_x = l2d_x;
        tmp_y = l2d_y;
        start = delta = null;
    }
})
document.getElementsByTagName('button')[0].addEventListener('click', e => {
    l2d_scale = 1;
    l2d_x = l2d_y = tmp_x = tmp_y = 0;
})
let card_id = document.getElementById("card_id").value;
let url = "/live2d_resource/" + card_id;
loadlive2d("live2d", url);
sessionStorage.setItem("Sleepy", "0");
if(card_id.startsWith("card_"))
    window.removeEventListener("mousemove", l2dmouseevent)}