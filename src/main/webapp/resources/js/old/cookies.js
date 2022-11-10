import {draw} from "./canvas.js";

export let saved = []

export function appendRecord(record) {
  let table = $(".table-container div table tbody");
  let nightMode = localStorage.getItem("mode") === "night" ? "night" : "";
  saved.push(JSON.parse(record.coordinates))
  table.append(`
              <tr class="logged">
              <td class="${nightMode}" >${record.coordinates}</td>
              <td class="${nightMode}" >${record.timeZoned}</td>
              <td class="${nightMode}" >${record.execution}</td>
              <td class="${nightMode}" >${record.resulted}</td>
            </tr>
  `);
}

// export function clearStorage() {
//   saved = []
//   draw()
//   $("tbody .logged").html("");
// }
//
// export function changeMode() {
//   const mode = localStorage.getItem("mode");
//   if (mode === "day") {
//     localStorage.setItem("mode", "night");
//   } else {
//     localStorage.setItem("mode", "day");
//   }
// }
//
// export function loadMode() {
//   const mode = localStorage.getItem("mode");
//   if (mode == null) {
//     localStorage.setItem("mode", "day");
//   }
//   if (mode === "night") {
//     switchMode();
//   }
// }
//
// export function switchMode() {
//   $("#dragger, #night-mode").toggleClass("active");
//   $(".header, .header-block, .glass").toggleClass("night");
//   $("body, th, td, input").toggleClass("night");
// }