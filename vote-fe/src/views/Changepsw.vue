<template>
    <form>
        请输入修改的密码：<input type="password" name="password" v-model="password">
        <button type="button">提交</button>
    </form>    
</template>

<script>
import api from "../api";
window.api = api;
export default {
    mounted() {
        this.token = this.$route.params.token;
    },
    data() {
        return {
            token: "",
            password: ""
        }    
    },
    methods: {
    async submit() {
        var req = {password: this.password};
        var data = (await api.post("/change-password/" + this.token),req).data;
        if (data.code === 304) {
            this.$router.push("/");
        } else if (data.code === 403) {
            this.$alert(data.msg);
        }
    }
}
}
</script>