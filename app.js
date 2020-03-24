// Define ui variables

const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Calling function to load all event listeners
loadEventListeners();

// Defining function to load all event listeners
function loadEventListeners() {
  // Add task event
  form.addEventListener('submit', addTask);
}

// Add task function
function addTask(e) {
  if(taskInput.value === ''){
    alert('Add a task first!');
  }

  let value = taskInput.value;

  // Create li element 
  document.createElement('li');
  // Add class to created element
  li.className = 'collection-item';
  // Create text node and append to the li
  let liTextNode = document.createTextNode(value); 
  li.appendChild(liTextNode);
  // Create new link element
  const link = document.createElement('a');
  // Add class
  link.className = 'delete-item secondary-content';
  // Adding icon through innerHTML
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to the li
  li.appendChild(link);

  // Append li to ul
  taskList.appendChild(li);

  // Clear input field
  value = '';

  e.preventDefault();
}