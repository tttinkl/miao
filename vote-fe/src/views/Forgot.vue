<template>
    <form>
        请输入您的邮箱 : <input type="text" name="email" v-model="email" @keyup.Enter="submit" />
        <button type="button" @click="submit">提交</button>
    </form>
</template>

<script>
import api from "../api";
window.api = api;
export default {
    data() {
        return {
            email: "",
        }
    },
    methods: {
        async submit() {
            var req = {email: this.email};
            var data = (await api.post("/forgot",req)).data;
            this.$alert(data.msg)
        }
    }
}
</script>