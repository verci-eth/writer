import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const basePromptPrefix =
`List the 10 most effective prompts to ask GPT-3 the below request. The list must not start with numbers.
Request: `

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`)

  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}${req.body.userInput}\n`,
    temperature: 0.85,
    max_tokens: 500,
  });
  
  const basePromptOutput = baseCompletion.data.choices.pop();

  const secondPrompt = 
  `Among the below 10 prompts, pick the best three that are more likely to give the most complete and accurate answers for the following request? Number them as 1, 2 and 3.
  Request: ${req.body.userInput}
  Prompts:
  ${basePromptOutput.text}`

  const secondPromptCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${secondPrompt}\n`,
    temperature: 0.75,
    max_tokens: 150,
  });
  
  const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;