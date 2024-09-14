console.log("Confirmed running local_script");

$(document).ready(function () {
    $('#userForm').on('submit', function (event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        console.log("Button clicked");

        // Collect user inputs
        var name = $('#name').val();
        var topic = $('#topic').val();
        var words = $('#words').val();

        console.log("inputs collected");

        // This essay never existed prompt
        const systemMessage = "You are an imaginary essay writer. You will be given the name of a real or fictional person, along with a topic, and word count. Your job is to create a compelling, engaging, and interesting essay according to the parameters, in the style & voice of the given person";
        const userPrompt = `Create an essay on the topic of '${topic}', as if you were ${name}, with a word count of ${words}.`;

        // Send the data directly to the OpenAI API
        $.ajax({
            url: 'https://api.openai.com/v1/chat/completions', // OpenAI API endpoint
            method: 'POST',
            headers: {
                'Authorization': 'Bearer sk-FHe9ax-CZT6IFrOJMO3uMoUvVLDJdFuc-hx_QLhFX5T3BlbkFJwh7VTshudrS1LSSn-fLa_DuJa9TkwqwqKV9-4QuxMA', // Replace with your actual API key
                'Content-Type': 'application/json'
            },
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
                console.log('Full response:', response);
                if (response.choices && response.choices.length > 0) {
                    var content = response.choices[0].message.content;
                    $('#dataDisplay').html(content);
                } else {
                    $('#dataDisplay').html('No response content available.');
                }

                // Log the data to the server if needed
                $.ajax({
                    url: '../api/data.php', // Your PHP script to handle logging
                    method: 'POST',
                    data: {
                        name: name,
                        topic: topic,
                        words: words,
                        response: content
                    },
                    success: function () {
                        console.log('Data logged successfully');
                    },
                    error: function () {
                        console.log('Error logging data');
                    }
                });
            },
            error: function (xhr, status, error) {
                console.log('Error:', xhr, status, error);
                $('#dataDisplay').html('An error occurred while fetching data.');
            }
        });
    });
});
