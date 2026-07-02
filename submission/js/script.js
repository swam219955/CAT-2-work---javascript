// Array of objects — each practice area is one object with a "name" and "description"
const practiceAreas = [
    {
        name: "Commercial Law",
        description: "Our primary focus. We advise businesses on transactions, contracts, trade, and commercial disputes."
    },
    {
        name: "Conveyancing",
        description: "Property transfers, land transactions, title deeds, and all real estate legal matters handled efficiently."
    },
    {
        name: "Criminal Law",
        description: "Skilled criminal defence representation ensuring your rights are protected at every stage of proceedings."
    },
    {
        name: "Civil Law",
        description: "Resolution of civil disputes between individuals and organisations through negotiation or litigation."
    }
];

// Find the empty container in the HTML
const practiceGrid = document.getElementById("practice-grid");

// Loop through the array and build a card for each object
practiceAreas.forEach(function (area) {
    const card = document.createElement("div");
    card.className = "practice-card";

    const heading = document.createElement("h3");
    heading.textContent = area.name;

    const paragraph = document.createElement("p");
    paragraph.textContent = area.description;

    card.appendChild(heading);
    card.appendChild(paragraph);

    practiceGrid.appendChild(card);
});