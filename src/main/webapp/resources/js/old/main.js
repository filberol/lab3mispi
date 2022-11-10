import {loadMode, appendRecord, clearStorage, changeMode, switchMode} from "./cookies.js";
import {draw_hits_for_r} from "./canvas.js";

export let checks = []
export let text = NaN
export let radio = NaN
export function setChecks(value) {checks = value}
export function setText(value) {text = value}
export function getRadio() {return radio}

const textInput = $("#y-textinput")
// $(function () { loadMode(); sendGet()})
$("fieldset").mouseleave(function () { refreshValues() })
$("#submit").click(function () { sendRequest() })
$("th").click(function () { sendDelete() })
// $("#night-mode").click(function () { changeMode(); switchMode(); });

textInput.on("input", function () {
  let val = parseInt(this.value);
  if (val >= -3 && val <= 3) {
    this.style.background = "rgba(0, 200, 0, 0.7)";
  } else {
    if (isNaN(val)) {
      this.style.background = "aliceblue";
    } else {
      this.style.background = "rgba(200, 0, 0, 0.7)";
    }
  }
});

export function sendRequest() {
  if (!checkValues())  {
    show_message()
    return false
  }
  checks.forEach(box => {
    $.ajax({
      url: './req',
      method: 'post',
      dataType: 'json',
      data: {
        x: box,
        y: text,
        r: radio
      },
      success: function (record) {
        appendRecord(record)
        draw_hits_for_r()
      }
    })
  })
  return true
}

function sendGet() {
  $.ajax({
    url: './req',
    method: 'get',
    success: function (records) {
      clearStorage()
      for (let i = 0; i < records.data.length; i++) {
        appendRecord(records.data[i])
      }
    }
  })
}

function sendDelete() {
  $.ajax({
    url: './req',
    method: 'delete',
    success: function () {
      clearStorage()
    }
  })
}

function refreshValues() {
  checks = $(".x-check:checked").map(function () {
    return parseInt(this.value);
  }).get();
  text = textInput.val();
  radio = parseInt($(".r-radio:checked").val());
  draw_hits_for_r()
}

export function checkValues() {
  if (checks.length === 0) return false
  if (isNaN(text)) return false
  if (isNaN(radio)) return false
  //x
  for (let x in checks) {
    if (x < -radio || x > radio) return false
    if (x < -4 || x > 4) return false
  }
  //y
  if (text < -radio || text > radio) return false
  if (text < -3 || text > 5) return false
  //r
  return !(radio < 1 || radio > 5);
}

// $("button.menu-button").click(function () {
//   $("#description").toggleClass("active");
//   $("li.header-block").toggleClass("active");
// });

function show_message() {
  const msg = document.createElement("div")
  msg.appendChild(document.createTextNode("НЕПРАВИЛЬНО"))
  msg.classList.add("message")
  document.body.appendChild(msg)
  setTimeout(() => {  msg.remove(); }, 5000);
}
