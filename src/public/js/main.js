function openAddModal() {
    document.getElementById('addModal').style.display = 'block';
}

function openEditModal(track) {
    const modal = document.getElementById('editModal');
    const form = document.getElementById('editForm');
    
    // Set form action
    form.action = `/tracks/${track.id}`;
    
    // Fill form fields
    document.getElementById('editName').value = track.name;
    document.getElementById('editArtist').value = track.artist;
    document.getElementById('editDescription').value = track.description;
    
    modal.style.display = 'block';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal when clicking outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
    }
};