const id = new URLSearchParams(window.location.search).get('id');
const property = properties.find(p => p.id == id);

container.innerHTML = `
    <img src="${property.img}" alt="${property.name}">
    <h2>${property.name}</h2>
    <p>Type: ${property.type}</p>
    <p>Location: ${property.location}</p>
    <h3>Price: $${property.price}/month</h3>
    <button onclick="rent()">Rent</button>
`
function rent() {
    let rented = JSON.parse(localStorage.getItem("rented")) || [];
    rented.push(property);
    localStorage.setItem("rented", JSON.stringify(rented));
    alert("You have rented this property!");
}