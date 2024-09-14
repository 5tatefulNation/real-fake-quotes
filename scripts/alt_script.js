$(document).ready(function () {
    $('#userForm').on('submit', function (event) {
        event.preventDefault(); // Submits the form without triggering a page refresh

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
            success: function (response) { //Displays the response from the proxy server
                $('#dataDisplay').html(response.choices[0].message.content);

                
            },
            error: function () {  // This fires if the request fails
                $('#dataDisplay').html('An error occurred while fetching data.');
            }
            
        });
    });
});
