$(document).ready(function () {
    $('#userForm').on('submit', function (event) {
        event.preventDefault(); // Prevents page refresh on form submission

        // Collect user inputs
        var name = $('#name').val();
        var topic = $('#topic').val();
        var words = $('#words').val();

        // Construct the prompt
        const systemMessage = "You are an imaginary essay writer. You will be given the name of a real or fictional person, along with a topic, and word count. Your job is to create a compelling, engaging, and interesting essay according to the parameters, in the style & voice of the given person.";
        const userPrompt = `Create an essay on the topic of '${topic}', as if you were ${name}, with a word count of ${words}.`;

        // Send the data to the PHP proxy server
        $.ajax({
            url: 'http://137.184.56.82/real-fake-quotes-virtual/api/proxy.php', // Path to your PHP proxy
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
            success: function (response) {
                // Update the UI with the fetched data
                $('#header').hide();
                $('#subheader').hide();
                $('#dataDisplay').removeClass('hidden');
                $('#dataDisplay').html(response.choices[0].message.content);
                $('#top-half').addClass('quote-bg'); // Changes the background to black
            },
            error: function () {  // Handles errors
                // Update the UI with a placeholder quote in case of an error
                $('#header').hide();
                $('#subheader').hide();
                $('#dataDisplay').removeClass('hidden');
                $('#displayMessage').text('Unknown figure said:');
                $('#displayQuote').text('The greatest things are never said, but often thought.');
                $('#top-half').addClass('quote-bg'); // Changes the background to black
            }
        });
    });
});
