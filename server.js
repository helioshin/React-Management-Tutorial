const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// app.get('/app/hello', (req, res) => {
//     res.send({message: 'Hello Express!'});
// });

const multer = require('multer');
const upload = multer({desc: './upload'});

const customers = [
    {
        'id': 1,
        'image': 'https://placeimg.com/64/64/1',
        'name': '홍길동',
        'birthday': '921212',
        'gender': 'male',
        'job': 'student',
        'active': true,
        'createDate':Date.now(),
        'updateDate':null
    },
    {
        'id': 2,
        'image': 'https://placeimg.com/64/64/2',
        'name': '조자룡1',
        'birthday': '910102',
        'gender': 'male',
        'job': 'student',
        'active': true,
        'createDate':Date.now(),
        'updateDate':null
    },
    {
        'id': 3,
        'image': 'https://placeimg.com/64/64/3',
        'name': '관우1',
        'birthday': '900321',
        'gender': 'male',
        'job': 'student',
        'active': true,
        'createDate':Date.now(),
        'updateDate':null
    }
];

app.get('/api/customers', (req, res) => {
    let resCustomers = customers.filter( user => {
        return user.active === true
    });
    res.send(resCustomers);
    console.log('get api');
});

app.delete('/api/customers/:id', (req, res) => {
    let targetId = req.params.id;
    console.log(targetId);
    //targetId = 1;
    for(let i=0; i < customers.length; i++){
        //console.log('ID: '+customers[i].id);
        if(customers[i].id == targetId){
            //console.log('change active');
            customers[i].active = false;
            customers[i].updateDate = Date.now();
            break;
        }
    }
    console.log(customers);
    //console.log('get delete customer');
});

app.use('/image', express.static('./upload')); 
app.post('/api/customers', upload.single('image'), (req, res) => {
    let maxId = customers[customers.length - 1].id + 1;
    console.log("maxId: " + "%s", maxId);
    customers.push({
        'id': maxId,
        'image': 'https://placeimg.com/64/64/'+maxId,
        'name': req.body.name,
        'birthday': req.body.birthday,
        'gender': req.body.gender,
        'job': req.body.job,
        'active': true,
        'createDate':Date.now()
    });
    res.send(customers);
})

app.listen(port, () => console.log(`Listening on port ${port}`))