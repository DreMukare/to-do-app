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
  // DOM Load event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click',removeTask);
  // Clear task event
  clearBtn.addEventListener('click',clearTasks);
  // Filter task event
  filter.addEventListener('keyup',filterTasks);
}

// Get tasks from Local Storage
function getTasks() {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(
    function(task){
      // Create li element 
      const li = document.createElement('li');
      // Add class to created element
      li.className = 'collection-item';
      // Create text node and append to the li
      li.appendChild(document.createTextNode(task));
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
    }
  );
}

// Add task function
function addTask(e) {
  if(taskInput.value === ''){
    alert('Add a task first!');
  }

  // Create li element 
  const li = document.createElement('li');
  // Add class to created element
  li.className = 'collection-item';
  // Create text node and append to the li
  li.appendChild(document.createTextNode(taskInput.value));
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

  // Store in local storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear input field
  taskInput.value = '';

  e.preventDefault();
}

// Saving tasks to Local Storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.push(task);

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Remove task function 
function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
    if(confirm('Are you sure?')){
      e.target.parentElement.parentElement.remove();

      // Remove from local storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove from local storage function
function removeTaskFromLocalStorage(taskItem){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = []
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(
    function(task, index){
      if(taskItem.textContent === task){
        tasks.splice(index, 1);
      }
    }
  );

  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear task function
function clearTasks(e) {
  if(confirm('Are you sure?')){
    while(taskList.firstChild){
      taskList.removeChild(taskList.firstChild);
    }// while there is a firstChild, remove the firstChild if there still is one

    // Clear tasks from local storage
    clearTasksFromLocalStorage();
  }

  // Alternative is to use taskList.innerHTML = ''; 
  // Literally setting the HTML within taskList which is a ul to blank
}

// Clear tasks from local storage function
function clearTasksFromLocalStorage(){
  localStorage.clear(); // clear everything from local storage
}

// Filter tasks function
function filterTasks(e){
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection.item').forEach(
    function(task){
     const item = task.firstChild.textContent;
     if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
     } else{  
      task.style.display = 'none';
     }
    }
  );
}