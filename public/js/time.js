for (const time of document.querySelectorAll("[time]")) {
  time.innerText = new Date(parseInt(time.getAttribute("time"))).toLocaleString()
}