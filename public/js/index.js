const urlForm = document.querySelector("form");

const toggleLoadState = (element, value="Please wait...") => {
    element.innerText = value;
    element.setAttribute("aria-busy", !element.getAttribute("aria-busy"));
}

urlForm.onsubmit = async (event) => {
    event.preventDefault();

    const urlInput = event.target.elements.urlInput;
    const submitButton = event.target.elements.submitButton;

    toggleLoadState(submitButton);

    const response = await fetch('/createUrl', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({'url': urlInput.value})
    });

    urlInput.setAttribute("aria-invalid", !response.ok);

    toggleLoadState(submitButton, "Shorten URL");

    if (response.ok) {
        const { shortUrl } = await response.json();
        window.location.href = `${shortUrl}/info`;
    }
};
