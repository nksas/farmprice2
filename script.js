const CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRvlNYK9gCagtlcyLXg67rMmWyaTSrjMMWMU-FjXaSorRFy3CCuKekhbWUcMjzrbKnVx_HVTQc_l3n2/pub?gid=0&single=true&output=csv'; // Replace with your published CSV link

async function fetchCSVData() {
    try {
        const response = await fetch(CSV_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const text = await response.text();
        displayCSV(text);
    } catch (error) {
        console.error('Error fetching CSV data:', error);
    }
}

function displayCSV(text) {
    const rows = text.split('\n').slice(1); // Skip the header row
    const tableBody = document.querySelector('#dataTable tbody');
    tableBody.innerHTML = ''; // Clear previous content

    rows.forEach(row => {
        const cols = row.split(',');
        if (cols.length >= 2) { // Ensure there are at least two columns
            const tableRow = document.createElement('tr');
            const colA = document.createElement('td');
            const colB = document.createElement('td');

            colA.textContent = cols[0].trim(); // Column A
            colB.textContent = cols[1].trim(); // Column B

            tableRow.appendChild(colA);
            tableRow.appendChild(colB);
            tableBody.appendChild(tableRow);
        }
    });
}

document.addEventListener('DOMContentLoaded', fetchCSVData);
