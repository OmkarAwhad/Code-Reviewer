const express = require("express");
const app = express();
require("dotenv").config();
const cors = require('cors')

const PORT = process.env.PORT;

app.use(express.json())
app.use(cors())

const aiRouter = require('./routes/ai.routes')
app.use('/api/v1/ai',aiRouter)

app.listen(PORT, () => {
	console.log(`Server running at PORT ${PORT}`);
});
