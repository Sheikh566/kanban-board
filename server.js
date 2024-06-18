const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const path = require('path');
app.use(cors());

//app.use(express.static('public'));
app.get('*', (req, res) => {
   res.sendFile(path.resolve(__dirname, 'svelte-kanban-board', 'dist', 'index.html'));
});
app.listen(port, () => {
   console.log(`Server is up at port http://127.0.0.1:${port}`);
});