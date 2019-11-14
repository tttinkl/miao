<template>
    <div>
        <h3>我参加的投票</h3>
        <el-table :data="myjoin" height="1000" >
            <el-table-column border prop="title" label="标题" >
            </el-table-column>
            <el-table-column prop="desc" label="描述">
            </el-table-column>
            <el-table-column prop="deadline" :formatter="status" label="状态">
            </el-table-column>
            <el-table-column prop="name" label="发起人">
            </el-table-column>
            <el-table-column width="50" label="查看">
                <template slot-scope="scope">
                    <el-button circle icon="el-icon-view" type="primary" @click.stop="jumpToVote(scope.row)">

                    </el-button>
                </template>
            </el-table-column>            
        </el-table>
        <el-link @click="showMoreMyjoin">查看更多</el-link>
    </div>
</template>

<script>
import api from "../api"
export default {
    data() {
        return {
            myjoin: [],
            limit: 0,
        }
    },
    methods: {
        status(row,col,ceil) {
            if(ceil > Date.now()) {
                return "未过期";
            } else {
                return "已过期";
            }
        },
        async showMoreMyjoin() {
            console.log('123')
            let vote = (await api.post("/myjoin",{limit:this.limit})).data;
            this.myjoin.push(...vote);
            this.limit += vote.length;
        },
        jumpToVote(e) {
            location.href = `/#/vote/${e.id}`
        }
    },
    async mounted() {
        let vote = (await api.post("/myjoin",{limit:this.limit})).data;
        console.log(vote);
        this.myjoin.push(...vote);
        this.limit += vote.length;
    }
}
</script>