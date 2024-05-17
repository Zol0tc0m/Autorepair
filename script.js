const cars = [];

const form = document.getElementById('add-form');
const table = document.getElementById('table');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('name').value;
  const date = document.getElementById('date').value;
  const problem = document.getElementById('problem').value;
  const status = document.querySelector('input[name="status"]:checked').value;

  const car = {
    name,
    date,
    problem,
    status,
  };

cars.push(car);

  updateTable();
});

table.addEventListener('click', (e) => {
  const target = e.target;
  if (target.classList.contains('delete-btn')) {
    const name = target.closest('tr').querySelector('td:first-child').textContent;
    deleteCar(name);
  } else if (target.classList.contains('edit-btn')) {
    const name = target.closest('tr').querySelector('td:first-child').textContent;
    editCar(name);
  }
});

function deleteCar(name) {
  const index = cars.findIndex(car => car.name === name);
  if (index !== -1) {
    cars.splice(index, 1);
    updateTable();
  };
};

function editCar(name) {
  const car = cars.find(car => car.name === name);
  if (car) {
    alert('Измените данные в полях на исправленные и нажмите Добавить')
    
    document.getElementById('name').value = car.name;
    document.getElementById('date').value = car.date;
    document.getElementById('problem').value = car.problem;
    document.querySelector(`input[name="status"][value="${car.status}"]`).checked = true;

    deleteCar(name);
  };
};

const updateTable = () => {
  const tbody = table.querySelector('tbody');
  tbody.innerHTML = '';

  cars.forEach((car) => {
    const row = document.createElement('tr');

    const nameCell = document.createElement('td');
    nameCell.textContent = car.name;

    const dateCell = document.createElement('td');
    dateCell.textContent = car.date;

    const problemCell = document.createElement('td');
    problemCell.textContent = car.problem;

    const statusCell = document.createElement('td');
    statusCell.textContent = car.status;

    row.appendChild(nameCell);
    row.appendChild(dateCell);
    row.appendChild(problemCell);
    row.appendChild(statusCell);

    tbody.appendChild(row);

    const actionsCell = document.createElement('td');

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'Удалить';
    actionsCell.appendChild(deleteBtn);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.textContent = 'Изменить';
    actionsCell.appendChild(editBtn);

    row.appendChild(actionsCell);

    tbody.appendChild(row);
  });
};