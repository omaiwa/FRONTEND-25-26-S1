function render(data) {
    results.innerHTML = '';

    data.forEach(item => {
        const div = document.createElement('div');
        div.className = "card";
        div.innerHTML = `
            <h3>${item.name}</h3>
            <p>Type: ${item.type}</p>
            <p>Location: ${item.location}</p>
            <p>Price: $${item.price}/month</p>
            <img src="${item.img}" alt="${item.name}"><br>
            <a href="property.html?id=${item.id}">View Property</a>
        `;
        results.appendChild(div);
    });
}

function filterSearch() {
    const type = typeFilter.value;
    const maxPrice = +maxPriceFilter.value;

    const filtered = properties.filter(item => {
        return (type === "" || item.type === type) && (maxPrice === 0 || item.price <= maxPrice);
    });

    render(filtered);
}

render(properties);