(() => {
    let toDoListArray = [];
    const form = document.querySelector(".form");
    const input = document.querySelector(".form__input");
    const ul = document.querySelector(".toDoList"); // Ensure class name is correct

    // Example translations object
    const translations = {
        en: {
            'addTask': 'Add Task',
            'delete': 'Delete',
            'label': 'What do you need to do today?',
            'title': 'To-Do List'
        },
        es: {
            'addTask': 'Añadir Tarea',
            'delete': 'Eliminar',
            'label': '¿Qué necesitas hacer hoy?',
            'title': 'Lista de Tareas'
        },
        pt: {
            'addTask': 'Adicionar Tarefa',
            'delete': 'Excluir',
            'label': 'O que você precisa fazer hoje?',
            'title': 'Lista de Tarefas'
        }
        // Add more languages here
    };

    const currentLang = 'pt'; // Set the current language here (en, es, pt)

    // Translate text based on the selected language
    function translate() {
        document.querySelectorAll('[data-title]').forEach(el => el.innerText = translations[currentLang]['title']);
        document.querySelectorAll('[data-label]').forEach(el => el.innerText = translations[currentLang]['label']);
        document.querySelectorAll('[data-button]').forEach(el => el.querySelector('span').innerText = translations[currentLang]['addTask']);
    }

    translate();

    // Add item to DOM and array when the form is submitted
    form.addEventListener('submit', e => {
        e.preventDefault();
        const itemId = String(Date.now());
        const toDoItem = input.value.trim();
        
        if (toDoItem === '') return; // Don't add empty items

        addItemToDOM(itemId, toDoItem);
        addItemToArray(itemId, toDoItem);
        input.value = '';
    });

    // Remove item from DOM and array when the delete button is clicked
    ul.addEventListener('click', e => {
        if (e.target.classList.contains('delete-btn')) {
            const id = e.target.getAttribute('data-id');
            if (!id) return;
            removeItemFromDOM(id);
            removeItemFromArray(id);
        }
    });

    // Add an item to the DOM
    function addItemToDOM(itemId, toDoItem) {
        const li = document.createElement('li');
        li.setAttribute("data-id", itemId);
        li.innerText = toDoItem;

        // Create the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = translations[currentLang]['delete'];
        deleteBtn.setAttribute('data-id', itemId);
        deleteBtn.classList.add('delete-btn');

        // Add the button to the list item
        li.appendChild(deleteBtn);
        ul.appendChild(li);
    }

    // Add the item to the array
    function addItemToArray(itemId, toDoItem) {
        toDoListArray.push({ itemId, toDoItem });
        console.log(toDoListArray);
    }

    // Remove the item from the DOM
    function removeItemFromDOM(id) {
        const li = document.querySelector(`[data-id="${id}"]`);
        if (li) li.remove(); // Use li.remove() for a more modern way to remove the element
    }

    // Remove the item from the array
    function removeItemFromArray(id) {
        toDoListArray = toDoListArray.filter(item => item.itemId !== id);
        console.log(toDoListArray);
    }
})();
