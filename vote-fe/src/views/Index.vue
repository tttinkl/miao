    <template>
    <el-container v-if="user" style="margin: 0 20px" class="container">
        <el-header class="header">
            <span style="float: left" class="welcome">欢迎，{{user.name}}</span>
            <div class="userstate" style="float: right">
                <el-avatar :src="getAvatar" class="avatar"></el-avatar>
                <el-button size="mini" style="margin-right: 20px" type="primary" @click="showCreate" class="button">创建投票</el-button>
                <span class="logout"><el-link @click="logout">登出</el-link></span>
            </div>
        </el-header>
        <el-container class="main">
            <el-aside style="height:800px" class="aside">
                <ul>
                    <li class="aside_li"><el-button type="primary" @click="showMyCreate">我创建的投票</el-button></li>
                    <li class="aside_li"><el-button type="primary" @click="showMyjoin">我参加的投票</el-button></li>
                </ul>
            </el-aside>
            <el-main style="height:800px" class="route-view">
                <router-view></router-view>
            </el-main>
        </el-container>

    </el-container>
    <el-container v-else>
        <el-header >
            <el-menu mode="horizontal"  style="margin: 0 50px 0 50px" active-text-color="">
                <el-menu-item @click="loginFormVisible = true" style="float: right">
                    登录
                </el-menu-item>
                <el-menu-item style="float: right" @click="registerFormVisible = true">
                    注册
                </el-menu-item>                
            </el-menu>
        </el-header>
        <el-dialog title="请登录" :visible.sync="loginFormVisible" width="25%">    
            <el-form size="mini">
                <el-form-item label="用户名:">
                    <el-input type="username" name="name"  v-model="loginInfo.name" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input type="password" name="password" @keyup.37="login" autocomplete="on" v-model="loginInfo.password" placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item >
                    <el-input type="text" name="captcha" v-model="loginInfo.captcha" @keyup.native.13="login" placeholder="请输入验证码"></el-input>
                    <el-image @click="refresh" :src="getCaptcha"></el-image>
                    <router-link to="/forgot">忘记密码</router-link>
                </el-form-item>
                    <el-button size="small" type="primary" @click="login">登录</el-button>
            </el-form>  
        </el-dialog>   
        <el-dialog  title="请注册" :visible.sync="registerFormVisible" width="25%" >
            <el-form size="mini">
                <el-form-item label="用户名:">
                    <el-input type="username" name="name" v-model="registerInfo.name" placeholder="请输入用户名"/>
                </el-form-item>
                <el-form-item label="电子邮箱:">
                    <el-input type="email" name="email"  v-model="registerInfo.email" placeholder="请输入电子邮箱" />
                </el-form-item>
                <el-form-item label="密码:">
                    <el-input type="password" name="password" v-model="registerInfo.password" placeholder="请输入密码"/>
                </el-form-item>
                <el-form-item label="确认密码:">
                    <el-input type="password"  v-model="registerInfo.psw2" placeholder="请再次输入密码"/>
                </el-form-item>
                <el-form-item label="上传头像:">
                    <input type="file"  @change="getFile" >
                </el-form-item>
                    <el-button size="small" type="primary" @click="register">注册</el-button>
            </el-form >             
            
        </el-dialog>
    </el-container>
</template>

<script>
import api from "../api";
import axios from "axios";
import _mainURL from "../baseURL";
window.api = api;
export default {
    data() {
        return {
            registerInfo: {
                name: "",
                email: "",
                password: "",
                psw2: "",
                file: null,
                avatar: null
            },
            loginInfo: {
                name: "",
                password: "",
                captcha: ""
            },
            user: null,
            loginFormVisible: false,
            registerFormVisible: false
        }
    },
    computed: {
        getAvatar() {
            return _mainURL + this.user.avatar;
        },
        getCaptcha() {
            return _mainURL + "captcha";
        }
    },
    methods: {
        async logout() {
            await api.get("/logout");
            this.user = null;
        },
        refresh(e) {
            e.target.src = "";
            console.log("refresh");
            setTimeout( () => {
                e.target.src = _mainURL + "captcha";
            },1)
        },
        showCreate() {
            location.href = "/#/create";
        },
        showMyCreate() {
            location.href = "/#/mycreate";
        },
        showMyjoin() {
            location.href = "/#/myjoin";
        },
        async login() {
            var req = {
                name: this.loginInfo.name,
                password: this.loginInfo.password,
                captcha: this.loginInfo.captcha
            };
            var data = (await api.post("/login",req)).data; 
            if (data.code === 304) {
                location.href = "/";
            } else if (data.code === 400) {
                this.$alert(data.msg);
            } else if (data.code === 403) {
                this.$alert(data.msg);
            }
        },
        async register() {
            var formdata = new FormData();
            formdata.append("avatar",this.registerInfo.avatar);
            formdata.append("name",this.registerInfo.name);
            formdata.append("email",this.registerInfo.email);
            formdata.append("password",this.registerInfo.password);

            var data = (await axios({
                url: _mainURL + "api/register",
                method: "post",
                withCredentials: true,
                headers: {"Content-Type": "multipart/form-data"},
                data: formdata                 
            })).data;
            if (data.code === 401 || data.code === 400) {
                this.$alert(data.msg)
            } else if (data.code === 200) {
                this.$alert(data.msg);
                var userInfo = (await api.get("/userinfo")).data;
                console.log(userInfo);
                if (userInfo.code != 404) {
                    this.user = userInfo;
                }
            }
        },
        getFile(e) {
            this.registerInfo.avatar = e.target.files[0]
        }
    },
    async mounted() {
        var userInfo = (await api.get("/userinfo")).data;
        if (userInfo.code != 404) {
            this.user = userInfo;
        }
    }    
}
</script>

<style lang="stylus">
 .header 
    border-bottom 1px solid #777
    height 60px
    line-height 60px
.welcome 
    margin-left 50px
    line-height 60px
    text-align center
    float left
.userstate 
    float rights
    height  60px
    line-height 60px
.avatar 
    margin 0 20px 0 0
    vertical-align middle
button
    display inline-block
    vertical-align middle
.logout
    display inline-block
    vertical-align middle
.el-link
    line-height 15px
.main 
    margin-top 10px
.aside 

    border-right 1px solid #777 
    box-sizing border-box
 .aside_li 
    margin 30px
    overflow  hidden
    display flex
    justify-content center
.aside_li el-button 
    margin 0 auto
</style>