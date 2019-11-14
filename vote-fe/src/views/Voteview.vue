<template>
    <div>
        <h1>{{vote.info.title}}</h1>
        <h5>[{{vote.info.singleSelection? "单选": "多选"}}]</h5>
        <h3>描述:{{vote.info.desc}}</h3>
        <h4>截止时间:{{new Date(vote.info.deadline)}}  [{{vote.active?"未过期":"已过期"}}]</h4>
        <ul id="option-lists">
        <li class="option-list" v-for="op in vote.options" :date-optionid="op.id" :key="op.id" >
            <div class="op-main">
                <span class="op-content" @click="vote.active && voteit(op.id)" ><strong>{{op.content}}</strong></span>
                <i class="el-icon-check" v-if="op.id == myoption"></i>
                <span class="op-count" style="float:right" v-if="showvote==1">{{vote.voteupsGroup[op.id]?vote.voteupsGroup[op.id].length:0}}票</span>
                <span style="float:right" v-else>请投票后查看结果</span>
            </div>
            <el-progress :percentage="percent(op.id)"> </el-progress>
            <div class="op-avatar" v-if="vote.voteupsGroup[op.id]">
                <el-avatar class="user-avatar" style="width:30px;height:30px;" v-for="(voteup,idx) in vote.voteupsGroup[op.id]"  :key="idx" :src="getAvatar(voteup.avatar)"></el-avatar>
            </div>
        </li>
        </ul>
    </div>
</template>

<script>
import api from "../api";
import _ from "lodash";
import io from "socket.io-client";
import _mainURL from "../baseURL";
window.api = api;
export default {
    data: function() {
        return {
            voteid:"",
            userid:"",
            vote: {
                info: {},
                options: [],
                voteups: [],
                voteupsGroup:[],
                active:null,
            },
            showvote:0,
            myoption: null
        }
    },
    computed: {


    },
    methods: {
        voteit: async function (optionid) {
            api.post("/voteup",{
                voteid:this.voteid,
                optionid:optionid
            });
        },
        getAvatar(ava) {
            return _mainURL + ava;
        },
        percent(optionid) {
            if (!this.vote.voteupsGroup[optionid]) return 0;
            let percent = this.vote.voteupsGroup[optionid].length / this.vote.voteups.length;
            return percent * 100;
        }

    },

    async mounted() {
        // var query = location.search.slice(1).split("&").reduce((obj, pair) =>{
        // var [key, val] = pair.split("=");
        // obj[key] = val;
        // return obj},{});
        this.voteid = this.$route.params.id;
        var voteret = (await api.get(`/vote-vue/${this.voteid}`)).data;
        this.userid = voteret.userid,
        this.vote.info = voteret.voteInfo;
        this.vote.options = voteret.options;
        let voteups = (await api.get(`voteup/${this.voteid}/info`)).data;
        
        // voteups {avatar,id(voteup的id),userid,optionid,voteid};
        if (voteups.code != 403) {
            this.showvote = 1;
            this.vote.voteups = voteups;
            this.vote.voteupsGroup = _.groupBy(this.vote.voteups,"optionid");
            this.myoption = _.find(voteups,(voteup) => {
                return voteup.userid == this.userid;
            }).optionid;
        }
        this.vote.active = (this.vote.info.deadline > Date.now());
        if (this.vote.active) {
            this.socket = io(_mainURL);
            this.socket.emit("select room",this.voteid);
            this.socket.on("new vote", async data => {
                if (data.userid == this.userid) {
                    if (!this.showvote) {
                        this.showvote = 1;
                        this.vote.voteups = (await api.get(`voteup/${this.voteid}/info`)).data;
                    }
                    this.myoption = data.optionid;
                }
                if (this.showvote) {
                    this.vote.voteups = _.filter(this.vote.voteups,function(voteup) {
                        return voteup.userid != data.userid;
                    });
                    this.vote.voteups.push(data);
                    this.vote.voteupsGroup = _.groupBy(this.vote.voteups,"optionid")
                }
            });
        } else {
            this.showvote = 1;
        }
    }
}
</script>
 <style lang="stylus">
    #option-lists {
        list-style none
    }
    .option-list {
        margin 20px 0

    }
    .option-list::before {
        content  ""
        display table
        clear both
    }
    .option-list::after {
        content  ""
        display table
        clear both
    }
    .op-main::before {
        content  ""
        display table
        clear both
    }
    .op-main::after {
        content  ""
        display table
        clear both
    }
    .op-avatar {
        border 1px solid gray
    }
    .op-avatar::before {
        content  ""
        display table
        clear both
    }
    .op-avatar::after {
        content  ""
        display table
        clear both
    }
    .op-content {
        float left
        margin 5px
        cursor pointer
    }
    .op-count {
        display inline-block
        width 30px
    }
    .user-avatar {
        float left
    }
    .op-main i {
        float left
    }
 </style>
