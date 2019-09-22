const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mailer = require("./mailer");
const bodyParser = require("body-parser");
const sqlite = require("sqlite");

const dbPromise = sqlite.open("./db/vote.db");

let db;

const port = 8080;

const changePasswordTokenMap = {
    "123" : "a@qq.com"
};

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use((req, res, next) => {
    console.log("req.body : ",req.body);
    next();
});
app.use(cookieParser("my secret"));
app.use(express.static(__dirname + "/static"));
app.use(express.urlencoded({
    extended: true
}))



app.use((req, res, next) =>{
    res.set("Content-Type", "text/html; charset=UTF-8");
    next();
})


app.get("/", (req, res) => {
    if (req.signedCookies.user) {
        res.send(`
            <div>Welcome, ${req.signedCookies.user}</div>
            <a href="/create">创建投票</a>
            <a href="/logout"> 登出 </a>
        `)
    }
    else {
        res.send(`
        <div>
            <a href="login">登录</a>
            <a href="register">注册</a>
        </div>
        `)
    }
});

app.get("/create", (req, res) => {

}); 

app.get("/vote/:id", (req, res) => {

});

app.route("/register")
    .get((req, res,next) => {
        if (req.signedCookies.user) {
            res.send(`
                <div>
                    <span>welcome，  
                </div>
            `)
        }
        res.send(`
            <form action="/register" method="post">
                用户名: <input type="username" name="name" />
                邮箱: <input type="email" name="email" />
                密码: <input type="password" name="password" />
                <button>注册</button>
            </form>
        `)
    })
    .post(async (req, res, next) =>{
        let user = req.body;
        if (await db.get(`select * from users where name='${user.name}'`) != null) {
            res.end("用户名被占用");
        } else {
            await db.run(`insert into users values ('${user.name}', '${user.email}', '${user.password}')`);
            res.end("用户注册成功");
        }
    });

app.route("/login")
    .get((req, res, next) => {
        if(req.signedCookies.user) {
            res.redirect("/");
        } else {
            res.send(`
            <form action="/login" method="post">
                用户名: <input type="username" name="name" />
                密码: <input type="password" name="password" />
                <a href="/forgot">忘记密码</a>
                <button>登录</button>
            </form>        
            `)     
        }   
    })
    .post(async (req, res,next) => {
        if(req.signedCookies.user) {
            res.redirect("/");
        } else {
            let tryLoginUser = req.body;

            if (await db.get(`select * from users where name="${tryLoginUser.name}" and password="${tryLoginUser.password}"`)) {
                res.cookie("user",tryLoginUser.name,{
                    signed: true
                })
                res.end(`
                <div>登录成功，<span>3</span>秒后跳转</div>
                <script>
                    let span = document.querySelector("span");
                    let timer = 3;
                    span.innerText = timer;
                    timer.innerText = 3;
                    setInterval(()=>{
                        timer--;
                        span.innerText = timer;
                    },1000)
                    setTimeout(() => {
                        location.href = "/"
                    },3000)
                </script>
                `);
            } else {
                res.end("用户名或密码错误");
            } 
        }
    });

    app.route("/forgot")
        .get((req, res, next) => {
            res.end(`
                <form action="/forgot" method="post">
                    请输入您的邮箱 : <input type="text" name="email" />
                    <button> </button>
                </form>
            `)
        })
        .post( async (req, res, next) => {
            let email = req.body.email;
            if(await db.get(`select * from users where email="${email}"`)) {
                var token = Math.random().toString().slice(2);
                let link = `http://localhost:8080/change-password/${token}`;
                changePasswordTokenMap[token] = email;

                setTimeout(() => {
                    delete changePasswordTokenMap[token];
                },1000 * 60 * 20);

                mailer.sendMail({
                    from: "tttinkl@126.com",
                    to: email,
                    subject: "密码修改",
                    text: link
                }, (err, info) => {
                    res.end('已向您的邮箱发送密码重置链接，请于20分钟内点击链接修改密码！')
                    console.log(err);
                    console.log(info);
                })
            } else {
                res.end("该邮箱未被注册过");
            }
        });
    
    
    app.route("/change-password/:token")
        .get((req, res, next) => {
            let token = req.params.token;
            res.end(`
                <form action="/change-password/${token}" method="post">
                    请输入修改的密码：<input type="password" name="password">
                    <button></button>
                </form>
            `)
        })
        .post( async (req, res, next) => {
            let token = req.params.token;
            let email = changePasswordTokenMap[token]
            if (email) {
                await db.run(`update users set password="${req.body.password}" where email="${email}"`)
                res.redirect("/")
            } else {
                res.end(`
                    <div>已失效</div>
                `)
            }
        });
    


    app.get("/logout", (req, res, next) => {
        res.clearCookie("user");
        res.redirect("/");
    })



dbPromise.then(dbObject => {
    db = dbObject;
    app.listen(8080, () => {
        console.log("listening", port);
    })
})
