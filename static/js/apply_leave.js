document.addEventListener('DOMContentLoaded', () => {
    const applyLeaveForm = document.getElementById('apply-leave-form');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const subjectSelect = document.getElementById('subject'); // Get the subject select element

    applyLeaveForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission

        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);
        const timeDifference = endDate.getTime() - startDate.getTime();
        const dayDifference = Math.ceil(timeDifference / (1000 * 3600 * 24)) + 1; // Include both start and end dates
        const selectedSubject = subjectSelect.value; // Get the selected subject

        // Basic client-side validation (more robust validation will be needed)
        if (endDate < startDate) {
            alert('End date cannot be before the start date.');
            return;
        }

        if (dayDifference > 5) {
            alert('Leave application cannot exceed 5 days.');
            return;
        }

        if (!selectedSubject) {
            alert('Please select a subject.');
            return;
        }

        // In a real application, you would use fetch() to send the form data to the backend API.
        console.log('Leave application submitted:', {
            leaveType: document.getElementById('leaveType').value,
            subject: selectedSubject, // Include the selected subject
            startDate: startDateInput.value,
            endDate: endDateInput.value,
            reason: document.getElementById('reason').value,
            attachment: document.getElementById('attachment').files[0]
        });

        alert('Leave application submitted successfully (this is a simulation).');
        window.location.href = 'leave_status.html'; // Redirect to leave status page
    });
});