document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('upload-form');
    const resultsDiv = document.getElementById('results');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const groupsFile = document.getElementById('groups').files[0];
        const hostelsFile = document.getElementById('hostels').files[0];

        if (groupsFile && hostelsFile) {
            const readerGroups = new FileReader();
            const readerHostels = new FileReader();

            readerGroups.onload = function(e) {
                const groupsText = e.target.result;
                processFiles(groupsText, 'groups');
            };

            readerHostels.onload = function(e) {
                const hostelsText = e.target.result;
                processFiles(hostelsText, 'hostels');
            };

            readerGroups.readAsText(groupsFile);
            readerHostels.readAsText(hostelsFile);
        }
    });

    function processFiles(text, type) {
        if (type === 'groups') {
            Papa.parse(text, {
                header: true,
                complete: function(results) {
                    const groups = results.data;
                    processGroups(groups);
                }
            });
        } else if (type === 'hostels') {
            Papa.parse(text, {
                header: true,
                complete: function(results) {
                    const hostels = results.data;
                    processHostels(hostels);
                }
            });
        }
    }

    function processGroups(groups) {
        // Logic to process groups CSV data
        console.log('Groups:', groups);
        // For simplicity, assuming allocation logic here
        // Replace with your actual allocation logic
        const allocation = allocateRooms(groups, []);
        displayResults(allocation);
    }

    function processHostels(hostels) {
        // Logic to process hostels CSV data
        console.log('Hostels:', hostels);
        // For simplicity, assuming allocation logic here
        // Replace with your actual allocation logic
        const allocation = allocateRooms([], hostels);
        displayResults(allocation);
    }

    function allocateRooms(groups, hostels) {
        // Logic to allocate rooms based on groups and hostels data
        // Replace with your actual allocation logic
        return [];
    }

    function displayResults(allocation) {
        resultsDiv.innerHTML = '<h2>Allocation Results</h2>';
        const table = document.createElement('table');
        const headerRow = document.createElement('tr');

        ['Group ID', 'Hostel Name', 'Room Number', 'Members Allocated'].forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            headerRow.appendChild(th);
        });

        table.appendChild(headerRow);

        allocation.forEach(row => {
            const tr = document.createElement('tr');
            Object.values(row).forEach(cell => {
                const td = document.createElement('td');
                td.textContent = cell;
                tr.appendChild(td);
            });
            table.appendChild(tr);
        });

        resultsDiv.appendChild(table);
    }
});
