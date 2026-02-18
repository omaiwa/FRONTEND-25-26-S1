const id = new URLSearchParams(window.location.search).get('id');
const property = properties.find(p => p.id == id);

let rented = JSON.parse(localStorage.getItem("rented")) || [];
let isRented = rented.some(p => p.id == property.id);

container.innerHTML = `
    <img src="${property.img}" alt="${property.name}">
    <h2>${property.name}</h2>
    <p>Type: ${property.type.charAt(0).toUpperCase() + property.type.slice(1)}</p>
    <p>Location: ${property.location.charAt(0).toUpperCase() + property.location.slice(1)}</p>
    <p>${property.description}</p>
    <h3>Price: $${property.price}/month</h3>
    ${isRented ? '<div class="rented-msg">You have already rented this property.</div>' : '<button onclick="rent()">Rent</button>'}
    <button onclick="openChat(property.id, property.name)">Open chat</button>'
`;

function rent() {
    let rented = JSON.parse(localStorage.getItem("rented")) || [];
    rented.push(property);
    localStorage.setItem("rented", JSON.stringify(rented));
    if (typeof addRentalToHistory === 'function') {
        try { addRentalToHistory(property); } catch(e) { }
    }
    alert("You have rented this property!");
    location.reload();
}