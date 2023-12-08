const buttons = document.querySelectorAll("button");

const levelHandler = (e) => {
    const level = e.target.innerText.toLowerCase();
    localStorage.setItem("level", JSON.stringify(level))
    window.location.assign("/")
}


buttons.forEach(button => button.addEventListener("click", levelHandler));
