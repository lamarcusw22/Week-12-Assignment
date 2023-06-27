$(document).ready(function() {
    // Function to display entities
    function displayEntities(entities) {
        var entitiesContainer = $('#entities');
        entitiesContainer.empty();
        
        if (entities.length === 0) {
            entitiesContainer.append('<p></p>');
        } else {
            let table = $('<table class="table"></table>');
            let tableHeader = $('<thead><tr><th>Name</th><th>Description</th><th>Actions</th></tr></thead>');
            let tableBody = $('<tbody></tbody>');

            entities.forEach(function(entity) {  //creating each row name of each cell plus action buttons
                let row = $('<tr></tr>');
                let nameCell = $('<td></td>').text(entity.name);
                let descriptionCell = $('<td></td>').text(entity.description);
                let actionsCell = $('<td></td>');
                let editButton = $('<button class="btn btn-sm btn-primary edit-btn">Edit</button>').data('id', entity.id);
                let deleteButton = $('<button class="btn btn-sm btn-danger delete-btn">Delete</button>').data('id', entity.id);
                
                actionsCell.append(editButton, deleteButton);
                row.append(nameCell, descriptionCell, actionsCell);
                tableBody.append(row);
            });

            table.append(tableHeader, tableBody);
            entitiesContainer.append(table);
        }
    }

    // Function to save entities to local storage. I was struggling creating this code with API and had to switch to local storage.
    function saveEntities(entities) {
        localStorage.setItem('entities', JSON.stringify(entities));
    }

    // Function to get entities from local storage
    function getEntities() {
        let entities = localStorage.getItem('entities');
        return entities ? JSON.parse(entities) : [];
    }

    // Load entities from local storage
    let savedEntities = getEntities();
    displayEntities(savedEntities);

    // Function to create a new entity
    function createEntity(formData) {
        let newEntity = {
            id: Date.now(), 
            name: formData.name,
            description: formData.description
        };

        let entities = getEntities();
        entities.push(newEntity);
        saveEntities(entities);
        displayEntities(entities);

        $('#create-form')[0].reset();
    }

    // Handle form submission to create a new entity
    $('#create-form').submit(function(event) {
        event.preventDefault();
        let formData = {
            name: $('#name').val(),
            description: $('#description').val()
        };
        createEntity(formData);
    });

    // AJAX PUT request to update an existing entity
    $(document).on('click', '.edit-btn', function() {
        let entityId = $(this).data('id');
        let updatedData = {}; 
        let entities = getEntities();
        saveEntities(entities);
        displayEntities(entities);
    });

    // AJAX DELETE request to delete an existing entity
    $(document).on('click', '.delete-btn', function() {
        let entityId = $(this).data('id');
        let entities = getEntities().filter(function(entity) {
            return entity.id !== entityId;
        });
        saveEntities(entities);
        displayEntities(entities);
    });
});
