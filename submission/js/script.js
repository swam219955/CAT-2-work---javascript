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

// ===== Consultation Checklist: add & remove & persist =====

const checklistInput = document.getElementById("checklist-input");
const checklistAddBtn = document.getElementById("checklist-add-btn");
const checklistList = document.getElementById("checklist-list");

// Get saved items from localStorage, or start with an empty array if none exist
function getSavedItems() {
    const stored = localStorage.getItem("consultationChecklist");
    if (stored === null) {
        return [];
    }
    return JSON.parse(stored);
}

// Save the current array of items back to localStorage
function saveItems(itemsArray) {
    localStorage.setItem("consultationChecklist", JSON.stringify(itemsArray));
}

// Build one <li> element for a given question string
function createChecklistItem(questionText) {
    const listItem = document.createElement("li");

    const textSpan = document.createElement("span");
    textSpan.textContent = questionText;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.type = "button";

    removeBtn.addEventListener("click", function () {
        listItem.remove();

        // Also remove it from localStorage
        const currentItems = getSavedItems();
        const updatedItems = currentItems.filter(function (item) {
            return item !== questionText;
        });
        saveItems(updatedItems);
    });

    listItem.appendChild(textSpan);
    listItem.appendChild(removeBtn);
    return listItem;
}

// On page load: render any items already saved in localStorage
const savedItems = getSavedItems();
savedItems.forEach(function (questionText) {
    checklistList.appendChild(createChecklistItem(questionText));
});

// When Add is clicked
checklistAddBtn.addEventListener("click", function () {
    const questionText = checklistInput.value.trim();

    if (questionText === "") {
        return;
    }

    // Add to the page
    checklistList.appendChild(createChecklistItem(questionText));

    // Add to localStorage
    const currentItems = getSavedItems();
    currentItems.push(questionText);
    saveItems(currentItems);

    checklistInput.value = "";
});

// ===== Contact form validation =====

const contactForm = document.getElementById("contact-form");
const contactFeedback = document.getElementById("contact-feedback");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault(); // stop the page from reloading

    const nameValue = document.getElementById("contact-name").value.trim();
    const emailValue = document.getElementById("contact-email").value.trim();
    const messageValue = document.getElementById("contact-message").value.trim();

    // Basic check: is the email in a valid-looking format?
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (nameValue === "" || emailValue === "" || messageValue === "") {
        contactFeedback.textContent = "Please fill in all fields before sending.";
        contactFeedback.className = "contact-feedback error";
        return;
    }

    if (!emailPattern.test(emailValue)) {
        contactFeedback.textContent = "Please enter a valid email address.";
        contactFeedback.className = "contact-feedback error";
        return;
    }

    // If everything passed, show success and reset the form
    contactFeedback.textContent = "Thank you, " + nameValue + "! Your message has been received.";
    contactFeedback.className = "contact-feedback success";
    contactForm.reset();
});

// ===== Banner click-to-reveal =====

const bannerWrapper = document.getElementById("banner-wrapper");

bannerWrapper.addEventListener("click", function () {
    bannerWrapper.classList.toggle("revealed");
});