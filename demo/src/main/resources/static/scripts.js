document.addEventListener('DOMContentLoaded', function() {
    fetch('/employees')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            const employeesDiv = document.getElementById('employees');
            data.forEach(employee => {
                const employeeDiv = document.createElement('div');
                employeeDiv.textContent = `Name: ${employee.firstName} ${employee.lastName}, Email: ${employee.email}`;
                employeesDiv.appendChild(employeeDiv);
            });
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
});
