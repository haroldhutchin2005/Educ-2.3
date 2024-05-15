const app = require('express')();
const port = process.env.PORT || 3000;
app.get('/', async function (req, res) {
  res.send('<marquee>BOT IS RUNNING</marquee>')
})
app.listen(port, () => {
  console.log('Bot is running on port ' + port)
})