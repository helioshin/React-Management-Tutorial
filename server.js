const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// app.get('/app/hello', (req, res) => {
//     res.send({message: 'Hello Express!'});
// });

app.get('/api/customers', (req, res) => {
    res.send([
        {
            'id': 1,
            'image': 'https://placeimg.com/64/64/1',
            'name': '홍길동',
            'birthday': '921212',
            'gender': 'male',
            'job': 'student'
        },
        {
            'id': 2,
            'image': 'https://placeimg.com/64/64/2',
            'name': '조자룡',
            'birthday': '910102',
            'gender': 'male',
            'job': 'student'
        },
        {
            'id': 3,
            'image': 'https://placeimg.com/64/64/3',
            'name': '관우',
            'birthday': '900321',
            'gender': 'male',
            'job': 'student'
        }
    ]);
});

app.listen(port, () => console.log(`Listening on port ${port}`))