import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Main from "../views/Main.vue";
import Home from "../views/Home.vue";
import ResourceCRUD from "../views/ResourceCRUD.vue";

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: "/",
    component: Main,
    children: [
      { name: "home", path: "/", component: Home },
      {
        name: "crud",
        path: "/:resource/list",
        component: ResourceCRUD,
        props: true
      }
      // {
      //   name: "course-edit",
      //   path: "/courses/edit/:id",
      //   component: CourseEdit,
      //   props: true
      // },
      // { name: "course-create", path: "/courses/create", component: CourseEdit }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
