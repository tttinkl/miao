import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from "../views/Index"
import Changepsw from "../views/Changepsw"
import Forgot from "../views/Forgot"
import Create from "../views/Create"
import Voteview from "../views/Voteview"
import Mycreate from "../views/Mycreate"
import Myjoin from "../views/Myjoin"

Vue.use(VueRouter)

const routes = [{
        path: "/",
        component:Index,
        children:[{
            path: "/create",
            component: Create
        },{
            path: "/mycreate",
            component: Mycreate
        },{
            path: "/myjoin",
            component: Myjoin
        },{
            path: "/vote/:id",
            component: Voteview
        }]
    }, {
        path: "/change-password/:token",
        component: Changepsw,
    }, {
        path: "/forgot",
        component: Forgot
    }]

const router = new VueRouter({
  routes
})

export default router
