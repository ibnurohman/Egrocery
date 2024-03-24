const express = require("express");
const router = require("./routes");
const cookieParser = require('cookie-parser'); // untuk menyimpan session
const session = require('express-session'); //  untuk memakai sessionnya
const app = express();
const fs = require('fs')

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true}));
app.use(require('express-fileupload')())
const directoryPath = './uploads';
if (!fs.existsSync(directoryPath)) {
  fs.mkdirSync(directoryPath);
  console.log('Direktori berhasil dibuat.');
} else {
  console.log('Direktori sudah ada.');
}
app.use('/uploads', express.static('uploads'));
app.use(cookieParser()); // middleware coookie
app.use(session({ // set-up session
  secret: 'secret',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 3600000 // masa session
  }
}));

app.use(router);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Example app listening on PORT ${PORT}`);
});