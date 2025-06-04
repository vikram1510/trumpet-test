const express = require('express');
const { validateTextLength } = require('./validation');
const app = express();
const port = 4000;

app.use(express.json());

let snippets = [];
let nextId = 1;

app.post('/snippets', (req, res) => {
  const { text } = req.body;
  
  const validation = validateTextLength(text);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }
  
  const snippet = {
    id: nextId++,
    text
  };
  
  snippets.push(snippet);
  res.status(201).json(snippet);
});

app.get('/snippets', (req, res) => {
  res.json(snippets);
});

app.patch('/snippets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text } = req.body;
  
  const snippet = snippets.find(s => s.id === id);
  
  if (!snippet) {
    return res.status(404).json({ error: 'Snippet not found' });
  }
  
  const validation = validateTextLength(text);
  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }
  
  snippet.text = text;
  res.json(snippet);
});

app.delete('/snippets/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const snippetIndex = snippets.findIndex(s => s.id === id);
  
  if (snippetIndex === -1) {
    return res.status(404).json({ error: 'Snippet not found' });
  }
  
  snippets.splice(snippetIndex, 1);
  res.status(204).send();
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});