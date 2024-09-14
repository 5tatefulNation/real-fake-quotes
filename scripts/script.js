console.log("Script is getting loaded");

$(document).ready(function () {
    // Handle form submission
    $('#userForm').on('submit', function (event) {
        event.preventDefault(); // Prevent the default form submission
        
        // Gather form data
        var formData = {
            name: $('#name').val(),
            topic: $('#topic').val(),
            words: $('#words').val()
        };

        // Send data to the server via AJAX
        $.ajax({
            url: 'api/data.php', // Adjust to your server-side script
            method: 'POST',
            data: formData,
            success: function (response) {
                // Update the display area with the response data
                $('#responseDisplay').html(response);
            },
            error: function () {
                // Display an error message if the request fails
                $('#responseDisplay').html('An error occurred while processing your request.');
            }
        });
    });
});
