<template>
    <div>
        <h3>我创建的投票</h3>
        <el-table :data="mycreate"  >
            <el-table-column border prop="title" label="标题">
            </el-table-column>
            <el-table-column prop="desc" label="描述">
            </el-table-column>
            <el-table-column prop="deadline" :formatter="status" label="状态">
            </el-table-column>
            <el-table-column width="60" label="查看" >
                <template slot-scope="scope">
                    <el-button circle icon="el-icon-view" type="primary" @click.stop="jumpToVote(scope.row)">

                    </el-button>
                </template>
            </el-table-column>
            <el-table-column width="60" label="删除">
                <template slot-scope="scope" >
                    <el-button circle icon="el-icon-delete" type="danger" @click.stop="deleteVote(scope.$index,scope.row)">

                    </el-button>
                </template>
            </el-table-column >
        </el-table>
        <el-link @click="showMoreMycreate">查看更多</el-link>
    </div>
</template>

<script>
import api from "../api"
export default {
    data() {
        return {
            mycreate: [],
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
        async showMoreMycreate() {
            let vote = (await api.post("/mycreate",{limit:this.limit})).data;
            this.mycreate.push(...vote);
            this.limit += vote.length;
        },
        jumpToVote(e) {

            location.href = `/#/vote/${e.id}`;
        },
        async deleteVote(idx,vote) {
            await api.post("/deletevote",{voteid:vote.id});
            this.mycreate.splice(idx,1);
        }
    },
    async mounted() {
        let vote = (await api.post("/mycreate",{limit:this.limit})).data;
        this.mycreate.push(...vote);
        this.limit += vote.length;
    }
}
</script>