function orderNow(button) {
    let cake = button.parentElement;

    let name = cake.querySelector("p").innerText;
    let price = cake.querySelector("h6").innerText;
    let image = cake.querySelector("img").src;

    let phoneNumber = "917903545280"; 

    let message = `Hello, I want to order this cake:

📌 Name: ${name}
💰 Price: ${price}
🖼 Image: ${image}`

    let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
}

function sendToWhatsApp() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let address = document.getElementById("text").value.trim();
    let message = document.getElementById("message").value.trim();

    if (name === "" || phone === "" || address === "" || message === "") {
        alert("Please fill all fields!");
        return;
    }

    let whatsappNumber = "917903545280"; // 👉 apna number (without +)

    let text = `New Contact Form Message

Name: ${name}
Phone: ${phone}
Address: ${address}
Message: ${message}`;

    let url = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(text);

    window.open(url, "_blank");
}

const pages = ["index.html", "cake.html", "kulfi_house.html"];
let docs = [];

// load pages once
pages.forEach(p =>
    fetch(p)
    .then(r => r.text())
    .then(t => docs.push({ p, d: new DOMParser().parseFromString(t, "text/html") }))
);

// search function
function search(q) {
    let html = "";

    docs.forEach(({ p, d }) => {
        d.querySelectorAll(".cakes").forEach(c => {
            let name = c.querySelector(".CakePrice")?.innerText.toLowerCase();
            if (name && name.includes(q)) {
                html += `<div class="cakes">${c.innerHTML}
                <a href="${p}" class="btn">View</a></div>`;
            }
        });
    });

    document.getElementById("searchResults").style.display = "block";
    document.getElementById("searchGrid").innerHTML =
        html || "<p style='color:white;'>No results</p>";
}

// live search
document.getElementById("search").oninput = e =>
    search(e.target.value.toLowerCase());

// button search
document.querySelector(".btn-sm").onclick = () =>
    search(document.getElementById("search").value.toLowerCase());