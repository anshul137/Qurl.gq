for (const timeElement of document.querySelectorAll("[time]")) {
  const timestamp = parseInt(timeElement.getAttribute("time"));
  timeElement.innerText = new Date(timestamp).toLocaleString();
}