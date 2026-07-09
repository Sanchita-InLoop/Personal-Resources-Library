const titleInput = document.getElementById("titleInput");
const urlInput = document.getElementById("urlInput");
const noteInput = document.getElementById("noteInput");
const addResourceBtn = document.getElementById("addResourceBtn");
const resourceList = document.getElementById("resourceList");
const searchInput = document.getElementById("searchInput");

// Render resources
function renderResources(resources) {
    resourceList.innerHTML = "";
    if (resources.length === 0) {
        resourceList.innerHTML = "<p>No resources found.</p>";
        return;
    }
    resources.forEach(resource => {
        // Ensure URLs are absolute for anchor tags
        const formattedUrl = resource.url.startsWith("http://") || resource.url.startsWith("https://") 
            ? resource.url 
            : `https://${resource.url}`;

        const card = document.createElement("div");
        card.classList.add("resource-card");
        card.innerHTML = `
            <h4>${escapeHTML(resource.title)}</h4>
            <a href="${formattedUrl}" target="_blank">${escapeHTML(resource.url)}</a>
            <p>${escapeHTML(resource.note)}</p>
            <button onclick="deleteResourceCard('${resource.id}')">Delete</button>
        `;
        resourceList.appendChild(card);
    });
}

// Simple HTML escaping helper to prevent XSS injection
function escapeHTML(str) {
    return str.replace(/[&<>'"]/g, 
        tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
}

// Add resource
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

// Delete resource
function deleteResourceCard(id) {
    deleteResource(id);
    renderResources(getResources());
}

// Search
searchInput.addEventListener("input", () => {
    const term = searchInput.value;
    renderResources(filterResources(term));
});

// Initial render
renderResources(getResources());