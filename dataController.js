const RESOURCE_KEY = "myResources";

function generateId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function getResources() {
    const resources = localStorage.getItem(RESOURCE_KEY);
    return resources ? JSON.parse(resources) : [];
}

function saveResources(resources) {
    localStorage.setItem(RESOURCE_KEY, JSON.stringify(resources));
}

function addResource({ title, url, note }) {
    const resources = getResources();
    const newResource = {
        id: generateId(),
        title,
        url,
        note,
        dateAdded: new Date().toISOString()
    };
    resources.push(newResource);
    saveResources(resources);
    return newResource;
}

function deleteResource(id) {
    let resources = getResources();
    resources = resources.filter(r => r.id !== id);
    saveResources(resources);
}

function filterResources(searchTerm = "") {
    let resources = getResources();
    if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        resources = resources.filter(r =>
            r.title.toLowerCase().includes(term) ||
            r.note.toLowerCase().includes(term)
        );
    }
    return resources;
}
