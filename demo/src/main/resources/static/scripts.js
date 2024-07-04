document.addEventListener('DOMContentLoaded', function() {
    const employeesDiv = document.getElementById('employees');
    const toggleEmployeesBtn = document.getElementById('toggleEmployeesBtn');
    const addEmployeeBtn = document.getElementById('addEmployeeBtn');

    // Fetch and display employees
    function fetchAndDisplayEmployees() {
        fetch('/employees')
            .then(response => response.json())
            .then(data => {
                employeesDiv.innerHTML = ''; // Clear previous entries
                data.forEach(employee => {
                    const employeeDiv = document.createElement('div');
                    employeeDiv.innerHTML = `Name: ${employee.firstName} ${employee.lastName}, Email: ${employee.email} <button onclick="deleteEmployee(${employee.id})">Delete</button>`;
                    employeesDiv.appendChild(employeeDiv);
                });
            })
            .catch(error => console.error('Error fetching employees:', error));
    }

    // Toggle employee list visibility
    toggleEmployeesBtn.addEventListener('click', function() {
        if (employeesDiv.style.display === 'none') {
            fetchAndDisplayEmployees();
            employeesDiv.style.display = 'block';
            toggleEmployeesBtn.textContent = 'Hide Employees';
        } else {
            employeesDiv.style.display = 'none';
            toggleEmployeesBtn.textContent = 'Show Employees';
        }
    });

    // Add a new employee
    addEmployeeBtn.addEventListener('click', function() {
        const name = document.getElementById('employeeName').value;
        const email = document.getElementById('employeeEmail').value;

        if (name && email) {
            const [firstName, lastName] = name.split(' ');
            const newEmployee = {
                firstName: firstName || '',
                lastName: lastName || '',
                email: email
            };

            fetch('/employees', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newEmployee)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to add employee');
                }
                return response.json();
            })
            .then(() => {
                fetchAndDisplayEmployees(); // Refresh the employee list immediately
            })
            .catch(error => console.error('Error adding employee:', error));
        } else {
            alert('Please enter both name and email');
        }
    });

    // Delete an employee
    window.deleteEmployee = function(id) {
        fetch(`/employees/${id}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to delete employee');
            }
            fetchAndDisplayEmployees(); // Refresh the employee list immediately
        })
        .catch(error => console.error('Error deleting employee:', error));
    };
});
