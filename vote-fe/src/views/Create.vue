<template>
<div>
    <h1 style="font-size:30px; text-align:center;">创建投票</h1>
    <el-form  id="form" size="mini" style="border: 1px solid black;margin: 0 auto" >
        <el-form-item label="标题:" >
            <el-input type="text" placeholder="标题" name="title" required v-model="title"/>
        </el-form-item>
        <el-form-item>
            <el-input type="text" placeholder="问题描述" name="desc" v-model="desc" />
        </el-form-item>
        <ul style="listStyle: none; padding-left: 0; margin:0;">
        <li v-for="(op,idx) in options" :key="idx">
            <el-input type="text" placeholder="选项" v-model="options[idx]"/>
            <el-button type="button" @click="removeOption(idx)">-</el-button>
        </li>
        </ul>
        <el-form-item id="add-option-wrap">
            <el-button size="mini" type="button" @click="addOption">添加选项</el-button>
        </el-form-item>
        <el-form-item>
            <el-date-picker type="datetime" placeholder="截止日期" name="deadline" v-model="deadline"/>
        </el-form-item>

        <el-form-item style="display: none">
            <el-radio type="radio" checked label="1" name="anonymous" v-model="anonymous" >非匿名</el-radio>
            <el-radio type="radio" label="0" name="anonymous" v-model="anonymous" >匿名</el-radio>
        </el-form-item>

        <el-form-item style="display: none">
            <el-select v-model="singleSelection" placeholder="是否多选">
                <el-option value="1" label="单选"></el-option>
                <el-option value="0" label="多选"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-button type="primary"  @click="createVote">创建投票</el-button>
        </el-form-item>
    </el-form>
</div>
</template>

<script>
import api from "../api";
window.api = api;
export default {
    methods: {
        addOption() {
            this.options.push("");
        },
        removeOption(idx) {
            this.options.splice(idx,1)
        },
        async createVote() {
            var a = await api.post("/create-vote",{
                    title: this.title,
                    desc: this.desc,
                    options: this.options,
                    deadline: this.deadline,
                    anonymous: this.anonymous,
                    singleSelection: this.singleSelection});
                    if (a.data.code === 302) {
                        this.$alert(a.data.voteId)
                        this.$router.push("vote/" + a.data.voteId);
                    }
            }
        },
    data: function() {
        return {
            title: "vue",
            desc: "vue",
            options:["123","123","123"],
            deadline:"",
            anonymous: "1",
            singleSelection:"1"
        }
    },
    mounted() {
        this.deadline = new Date(Date.now() + 86400000);
    }            
}
</script>