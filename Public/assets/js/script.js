document.addEventListener('DOMContentLoaded', () => {
    // Fetch and populate tickets
    fetch('assets/json/tickets.json')
        .then(response => {
            console.log('Tickets JSON fetched successfully');
            return response.json();
        })
        .then(data => {
            console.log('Tickets data:', data);
            const ticketsList = document.querySelector('.card-ticket .list-group');
            ticketsList.innerHTML = ''; // Clear existing content
            data.tickets.forEach(ticket => {
                const ticketItem = document.createElement('li');
                ticketItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                ticketItem.innerHTML = `
                    ${ticket.title}
                    <span class="badge bg-primary rounded-pill">${ticket.count}</span>
                `;
                ticketsList.appendChild(ticketItem);
            });
        })
        .catch(error => console.error('Error loading tickets JSON:', error));

    // Fetch and populate tasks
    fetch('assets/json/tasks.json')
        .then(response => {
            console.log('Tasks JSON fetched successfully');
            return response.json();
        })
        .then(data => {
            console.log('Tasks data:', data);
            const tasksList = document.querySelector('.card-task .list-group');
            tasksList.innerHTML = ''; // Clear existing content
            data.tasks.forEach((task, index) => {
                const taskItem = document.createElement('li');
                taskItem.className = 'list-group-item d-flex justify-content-between align-items-center';
                taskItem.innerHTML = `
                    <div class="task-input">
                        <input type="checkbox" class="form-check-input" id="task-${index}">
                        <label class="form-check-label" for="task-${index}">${task.title}</label>
                    </div>
                    <button class="rounded-pill" style="background-color: ${getStatusColor(task.status)}; min-width: 100px;">${task.status}</button>
                `;
                tasksList.appendChild(taskItem);
            });
        })
        .catch(error => console.error('Error loading tasks JSON:', error));
});

function getStatusColor(status) {
    switch (status) {
        case 'urgent':
            return '#fec400';
        case 'new':
            return '#29cc97';
        case 'default':
            return '#f0f1f7';
        default:
            return '#9fa2b4';
    }
}

