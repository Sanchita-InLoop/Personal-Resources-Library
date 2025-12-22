// 1. Data Management (Replaces dataController.js)
const STORAGE_KEY = "my_personal_library_data";

function getResources() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
}

function saveResources(resources) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(resources));
}

function addResource(resource) {
    const resources = getResources();
    const newResource = {
        ...resource,
        id: Date.now().toString() // Unique ID based on timestamp
    };
    resources.push(newResource);
    saveResources(resources);
}

function deleteResource(id) {
    const resources = getResources().filter(res => res.id !== id);
    saveResources(resources);
}

function filterResources(term) {
    const resources = getResources();
    return resources.filter(res => 
        res.title.toLowerCase().includes(term.toLowerCase()) || 
        res.note.toLowerCase().includes(term.toLowerCase())
    );
}

// 2. UI Elements
const titleInput = document.getElementById("titleInput");
const urlInput = document.getElementById("urlInput");
const noteInput = document.getElementById("noteInput");
const addResourceBtn = document.getElementById("addResourceBtn");
const resourceList = document.getElementById("resourceList");
const searchInput = document.getElementById("searchInput");

// 3. Render Logic
function renderResources(resources) {
    resourceList.innerHTML = "";
    if (resources.length === 0) {
        resourceList.innerHTML = "<p style='text-align:center; color:#888;'>No resources found. Add one above!</p>";
        return;
    }
    resources.forEach(resource => {
        const card = document.createElement("div");
        card.classList.add("resource-card");
        card.innerHTML = `
            <h4>${resource.title}</h4>
            <a href="${resource.url}" target="_blank">${resource.url}</a>
            <p>${resource.note}</p>
            <button onclick="deleteResourceCard('${resource.id}')">Delete</button>
        `;
        resourceList.appendChild(card);
    });
}

// 4. Event Listeners
addResourceBtn.addEventListener("click", () => {
    const title = titleInput.value.trim();
    const url = urlInput.value.trim();
    const note = noteInput.value.trim();

    if (!title || !url) {
        alert("Please fill in Title and URL.");
        return;
    }

    addResource({ title, url, note });
    titleInput.value = "";
    urlInput.value = "";
    noteInput.value = "";

    renderResources(getResources());
});

function deleteResourceCard(id) {
    if(confirm("Are you sure you want to delete this resource?")) {
        deleteResource(id);
        renderResources(getResources());
    }
}

searchInput.addEventListener("input", () => {
    const term = searchInput.value;
    renderResources(filterResources(term));
});

// Initial load
document.addEventListener("DOMContentLoaded", () => {
    renderResources(getResources());
});
