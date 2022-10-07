const urlForm = document.querySelector("form");

const toggleLoadState = (element, value = "Please wait...") => {
    element.innerText = value;
    element.setAttribute("aria-busy", !element.getAttribute("aria-busy") === "true");
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
        body: JSON.stringify({ 'url': urlInput.value })
    });

    toggleLoadState(submitButton, "Shorten URL");

    if (response.ok) {
        const { shortUrl } = await response.json();
        window.location.href = `${shortUrl}/info`;
    }
    else {
        const { errors } = await response.json();
        urlInput.setAttribute("aria-invalid", true);
        submitButton.setAttribute("data-tooltip", errors[0]);
    }
};
