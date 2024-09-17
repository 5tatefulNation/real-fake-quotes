$(document).ready(function () {
    $('#userForm').on('submit', function (event) {
        event.preventDefault(); // Prevent page refresh

        // Collect user inputs
        var name = $('#name').val();
        var topic = $('#topic').val();
        var words = $('#words').val();

        // Construct the prompt
        const systemMessage = "You are an imaginary essay writer. You will be given the name of a real or fictional person, along with a topic, and word count. Your job is to create a compelling, engaging, and interesting essay according to the parameters, in the style & voice of the given person.";
        const userPrompt = `Create an essay on the topic of '${topic}', as if you were ${name}, with a word count of ${words}.`;

        // Update the response header before request
        $('#responseHeader').html(`${name} never said:`); // Update with user input
        $('#responseText').html('Waiting for a response...'); // Initial waiting message

        // Hide the form container and show the response container
        $('#formContainer').addClass('hidden');
        $('#responseContainer').removeClass('hidden'); // Show response container

        // Hide the action buttons while waiting for the response
        $('#actionButtons').addClass('hidden');

        // Send the data to the PHP proxy server
        $.ajax({
            url: 'https://137.184.56.82/real-fake-quotes-virtual/api/proxy.php', // Proxy URL
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                "model": "gpt-3.5-turbo",
                "messages": [
                    {
                        "role": "system",
                        "content": systemMessage
                    },
                    {
                        "role": "user",
                        "content": userPrompt
                    }
                ]
            }),
            success: function (response) { // Displays the response from the proxy server
                $('#responseText').html(response.choices[0].message.content);

                // Show the action buttons now that the response is back
                $('#actionButtons').removeClass('hidden');
            },
            error: function () {
                $('#responseText').html('An error occurred while fetching data.');
            }
        });
    });

    // Reset form and switch back to the form container when "Do Another" is clicked
    $('#newQuoteButton').on('click', function () {
        $('#responseContainer').addClass('hidden'); // Hide response container
        $('#formContainer').removeClass('hidden'); // Show form container
        $('#userForm')[0].reset(); // Reset the form
    });

    // Copy button functionality
    $('#shareButton').on('click', function () {
        const quoteText = $('#responseText').text();
        navigator.clipboard.writeText(quoteText).then(() => {
            alert('Quote copied to clipboard!');
        }).catch((error) => {
            console.error('Failed to copy text: ', error);
        });
    });
});
