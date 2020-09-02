const fs = require('fs');
const express = require('express');
const app = express();


app.listen(8000, () => {console.log("Server Up!")});

app.use('/', express.static('assets'))

app.get('/inicio',(request,response) => {
    response.sendFile('assets/login.html', {root: __dirname}) 
})
app.get('/registro',(request,response) => {
    response.sendFile('assets/register.html', {root: __dirname})
})
app.get('/restablecer-contrasena',(request,response) => {
    response.sendFile('assets/forgot-password.html', {root: __dirname})
})
app.get('/nosotros',(request,response) => {
    if(request.url==="/nosotros"){
        
        fs.readFile('counter.txt',(error, data)=>{
            let visits = data.toString().split(':')[1];
            
            visits++

            fs.writeFile('counter.txt', `visits:${visits}`,(err)=>{
                if(err){console.log(err)}
            })

            console.log(visits)
            
            response.send('<h1>Visitas: '+visits+'</h1>')
        }) 
    }
})
app.get('*', (request, response)=>{
    request.url==='/'? response.sendFile('assets/login.html', {root:__dirname})
    :response.sendFile('assets/404.html', {root:__dirname})
})
