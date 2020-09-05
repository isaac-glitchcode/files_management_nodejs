const fs = require('fs');
const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {console.log("Server Up!")});
console.log("Puerto: "+PORT);
app.use('/', express.static('assets'))
app.use(bodyParser.urlencoded({extended:true}));


app.get('/',(request,response) => {
    response.sendFile(path.join(__dirname,'assets/login.html')) ;
})

app.post('/login',(request,response) => {
    let email = request.body.email;
    let password = request.body.password;
    
    fs.readFile('db.json', (error, data) => {
        if(error){console.log(error)}

        let users = JSON.parse(data.toString());
        
        let res = users.find(user =>{
            return (user.email === email && user.password === password)? true:false;  
        })
        
        res ? response.redirect('/_index.html') : response.redirect("/");

    })
})

app.post('/register', (request, response) => {
    console.log(request)
    fs.readFile('db.json', (error, data) => {
        if(error){console.log(error)}
        //Transformar la data a un obj js para su manupulación
        //Se parcea a JSON la data convertida a string
        let users = JSON.parse(data.toString());
        //Agrego a mi JSON los datos recibidos a través de la petición
        users.push(request.body);
        //Convierto a String los datos optenidos y los agrego al db.json para luego redireccionar a la raíz
        fs.writeFile('db.json', JSON.stringify(users), (error) => {
            if(error){console.log(error)}

            response.redirect('/');
        }) 
    })

})



app.get('/registro',(request,response) => {
    response.sendFile(path.join(__dirname, 'assets/register.html'))
})
app.get('/restablecer-contrasena',(request,response) => {
    response.sendFile(path.join(__dirname,'assets/forgot-password.html'))
})
app.get('/nosotros',(request,response) => {
        
    fs.readFile('counter.txt',(error, data)=>{
        let visits = data.toString().split(':')[1];
        
        visits++

        fs.writeFile('counter.txt', `visits:${visits}`,(err)=>{
            if(err){console.log(err)}
        })

        console.log(visits)
        
        response.send('<h1>Visitas: '+visits+'</h1>')
    })
})
app.get('*', (request, response)=>{
    request.url==='/' ? response.sendFile(path.join(__dirname,'assets/login.html'))
    : response.sendFile(path.join(__dirname,'assets/404.html'))
    
})

