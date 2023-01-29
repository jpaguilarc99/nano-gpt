// PACKAGES //
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');

const { Configuration, OpenAIApi } = require("openai");

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

// VAR GLOBALES

let gptResponse;
let configuration = new Configuration({
    apiKey: "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",
});

// OPENAI API CONSUME
async function getAiResponse(prompt) {
    const openai = new OpenAIApi(configuration);
    const completion = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        max_tokens: 1024,
        n: 1,
        stop: null,
        temperature: 0.9
    });
    returnValue = completion.data.choices[0].text;
    console.log(returnValue);
    return await returnValue;    
}

// GET METHOD MESSAGE
app.get("/", function(req, res) {
    res.render("home", {
    });
});

app.get("/about", function(req, res){
    res.render("about");
})

// POST METHOD RESPONSE
app.get("/gpt", function(req, res) {
    res.render("gpt", {
        gptChat: gptResponse
    });
});

app.post("/gpt", async function(req, res) {
    const chat = {
        question: req.body.postText
    };  

    const prompt = chat.question;
    gptResponse = await getAiResponse(prompt);        
    
    res.redirect("/gpt");       
});



// LISTENER //
app.listen(3000, function() {
    console.log("Server started on port 3000");
  });
