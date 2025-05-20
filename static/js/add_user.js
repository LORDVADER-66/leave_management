document.addEventListener('DOMContentLoaded', () => {
    const addUserForm = document.getElementById('add-user-form');

    addUserForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(addUserForm);
        const userData = Object.fromEntries(formData.entries());

        try {
            // Replace '/api/admin/users' with the actual API endpoint for adding a user
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                alert('User added successfully!');
                window.location.href = '/templates/admin/manage_users.html'; // Redirect back to manage users page
            } else {
                const errorData = await response.json();
                alert(`Failed to add user: ${errorData.message || 'An error occurred.'}`);
            }
        } catch (error) {
            console.error('Error adding user:', error);
            alert('Failed to add user. Please try again.');
        }
    });
});