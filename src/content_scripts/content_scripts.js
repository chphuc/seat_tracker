function injectCSS(filename) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = chrome.runtime.getURL(filename);
    document.head.appendChild(link);
}

injectCSS('content/content.css');

window.addEventListener('load', function () {
    initButton();
});

function initButton() {
    var button = document.createElement('button');

    button.textContent = 'Result Count';
    button.classList.add('button');

    document.body.appendChild(button);

    button.addEventListener('click', function () {
        initModal();
    });
}

function initModal() {
    var res = countSeats();
    // Create modal container
    var modal = document.createElement('div');
    modal.classList.add('modal');

    // Create modal content
    var modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Create close button
    var closeButton = document.createElement('span');
    closeButton.classList.add('close');
    closeButton.innerHTML = '&times;'; // HTML entity for the close symbol

    // Append close button to modal content
    modalContent.appendChild(closeButton);

    // Create table
    var table = document.createElement('table');
    table.classList.add('seat-info-table'); // Add a class for styling

    // Create table rows for seat information
    createSeatInfoRow(table, "Total number of seats:", res.totalNumberOfSeats);
    createSeatInfoRow(table, "Available Seats:", res.availableSeats);
    createSeatInfoRow(table, "Selected Seats:", res.selectedSeats);
    createSeatInfoRow(table, "Booked Seats:", res.bookedSeats);
    createSeatInfoRow(table, "Locked Seats:", res.lockedSeats);

    // Append table to modal content
    modalContent.appendChild(table);

    // Append modal content to modal container
    modal.appendChild(modalContent);

    // Append modal container to body
    document.body.appendChild(modal);

    // Display modal
    modal.style.display = 'block';

    // Close modal when close button is clicked
    closeButton.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Close modal when user clicks outside the modal content
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

function createSeatInfoRow(table, label, value) {
    // Create table row
    var row = document.createElement('tr');

    // Create table cell for label
    var labelCell = document.createElement('td');
    labelCell.textContent = label;

    // Create table cell for value
    var valueCell = document.createElement('td');
    valueCell.textContent = value;

    // Append cells to row
    row.appendChild(labelCell);
    row.appendChild(valueCell);

    // Append row to table
    table.appendChild(row);
}

function countSeats() {
    var totalNumberOfSeats = document.querySelectorAll('circle').length;
    var availableSeats = document.querySelectorAll('circle[style*="fill:#fff;"]').length;
    var selectedSeats = document.querySelectorAll('circle[style*="fill:#8BC34A;"]').length;
    var bookedSeats = document.querySelectorAll('circle[style*="fill:#F44336;"]').length;
    var lockedSeats = document.querySelectorAll('circle[style*="fill:#C2C1C1;"]').length;

    return {
        totalNumberOfSeats: totalNumberOfSeats,
        availableSeats: availableSeats,
        selectedSeats: selectedSeats,
        bookedSeats: bookedSeats,
        lockedSeats: lockedSeats
    };
}
