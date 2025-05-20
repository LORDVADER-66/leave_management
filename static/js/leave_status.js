document.addEventListener('DOMContentLoaded', () => {
    // Function to fetch leave status data from the backend API
    async function fetchLeaveStatus() {
        try {
            // Replace '/api/student/leave-status' with the actual API endpoint
            const response = await fetch('/api/student/leave-status');
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching leave status:', error);
            // Display an error message to the user
            const tableBody = document.querySelector('.leave-status-table tbody');
            tableBody.innerHTML = `<tr><td colspan="6" class="error-message">Failed to load leave status. Please try again later.</td></tr>`;
            return []; // Return an empty array in case of an error
        }
    }

    // Function to display leave status data in the table
    function displayLeaveStatus(leaves) {
        const tableBody = document.querySelector('.leave-status-table tbody');
        const noLeavesMessage = document.querySelector('.no-leaves-message');

        if (leaves && leaves.length > 0) {
            noLeavesMessage.style.display = 'none';
            tableBody.innerHTML = leaves.map(leave => `
                <tr>
                    <td>${leave.leave_type}</td>
                    <td>${leave.subject}</td>
                    <td>${leave.start_date}</td>
                    <td>${leave.end_date}</td>
                    <td>${leave.reason}</td>
                    <td><span class="status-badge status-${leave.status.toLowerCase()}">${leave.status}</span></td>
                </tr>
            `).join('');
        } else {
            tableBody.innerHTML = '';
            noLeavesMessage.style.display = 'block';
        }
    }

    // Fetch and display leave status when the page loads
    fetchLeaveStatus()
        .then(leaves => displayLeaveStatus(leaves));
});