const express = require('express');
const app = express();
let sessions = require('express-session');

const hour = 1000 * 60 * 60 * 1;

app.use(sessions({
    secret: "thisismysecrctekey599",
    saveUninitialized: true,
    cookie: { maxAge: hour },
    resave: false
}));

app.get('/', (req, res) => {
    
    res.send(`<h3>Home</h3>
                <form method="post" action="/">
                    username: <input name="pass_field">
                    <input type="submit" value="sign in">
                </form>`);
});

app.use(express.urlencoded({extended:true}));

app.post('/', (req, res) => {

    let userdata = req.body.pass_field;

    if(userdata === "password123"){
        let sess = req.session;
        sess.sessJso = Math.floor(Math.random() * 90000) + 10000;
        res.redirect("/admin");
    }else{
        res.send(`No access <p><a href="/">sign in</a>`)
    }

});

app.get('/pg01', (req, res) => {
    let sess_ob = req.session;
    if (sess_ob.sessJso){
        let userdata = sess_ob.sessJso;
         res.send(`<h2>Page 01</h2>
                <h4>id: ${userdata}</h4> 
                <p>Page 01 stuff</p>
                <a href='/'> GO back set NEW user</a> | <a href='/pg02'> GO to page 02</a>`);
    }else{
        res.send(`<h2>Page 01</h2>
                <h4>id: Guest</h4> 
                <p>Page 01 stuff</p>
                <a href='/'> GO back set NEW user</a> | <a href='/pg02'> GO to page 02</a>`);
        
    }
    
});

app.get('/pg02', (req, res) => {
    let sess_object = req.session;

    if(sess_object.sessJso){
        let userd = sess_object.sessJso;
        res.send(`<h2>Page 02</h2>
                <h4>id: ${userd}</h4> 
                <p>Page 02 data</p>
                 <a href='/pg01'> GO back to page 01</a> | <a href='/pg03'> GO to page 03</a>`);
    }else{
        res.redirect('/');
    }
    
});

app.get('/pg03', (req, res) => {
    let sess_data = req.session;
    let user_data = sess_data.sessJso;
    res.send(`<h2>Page 03</h2>
                <h4>id: ${user_data}</h4> 
                <p>page 03 content</p>
                 <a href='/pg02'> GO back to page 02</a> `);
});

app.get('/admin', (req, res) => {

    let sess = req.session;

    if(sess.sessJso){
        res.send(`<h2>Admin UI</h2>
                    <a href="/logout">logout</a>`
                
            );
    }else{
        res.send(`Access denied
                     <a href="/">sign in</a>  `);
    }

});

app.get('/logout', (req, res) => {

    req.session.destroy((err) => {
        if (err) throw err;
        res.send(`<p>logged out<p>
                     <a href="/">sign in</a>`);

    });

});


app.listen(3000, () => console.log(`Server Running at http://localhost:3000`));