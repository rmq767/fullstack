<template>
  <v-app id="inspire">
    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list dense>
        <v-list-item
          v-for="item in items"
          :key="item.text"
          :to="item.link"
          link
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>
              {{ item.text }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader class="mt-4 grey--text text--darken-1">订阅</v-subheader>
        <v-list>
          <v-list-item v-for="item in items2" :key="item.text" link>
            <v-list-item-avatar>
              <img
                :src="
                  `https://randomuser.me/api/portraits/men/${item.picture}.jpg`
                "
                alt=""
              />
            </v-list-item-avatar>
            <v-list-item-title v-text="item.text" />
          </v-list-item>
        </v-list>
        <v-list-item class="mt-4" link @click="isShowLogin = true">
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1"
            >登录</v-list-item-title
          >
        </v-list-item>
        <v-list-item class="mt-4" link @click="isShowLogin = true">
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-plus-circle-outline</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1">{{
            $store.state.auth.user.username
          }}</v-list-item-title>
        </v-list-item>
        <v-list-item link>
          <v-list-item-action>
            <v-icon color="grey darken-1">mdi-settings</v-icon>
          </v-list-item-action>
          <v-list-item-title class="grey--text text--darken-1"
            >Manage Subscriptions</v-list-item-title
          >
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar app clipped-left color="red" dense>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-icon class="mx-4">fab fa-youtube</v-icon>
      <v-toolbar-title class="mr-12 align-center">
        <span class="title">全栈视频</span>
      </v-toolbar-title>
      <v-spacer />
      <v-row align="center" style="max-width: 650px">
        <v-text-field
          :append-icon-cb="() => {}"
          placeholder="搜索..."
          single-line
          append-icon="search"
          color="white"
          hide-details
        />
      </v-row>
    </v-app-bar>

    <v-content>
      <nuxt-child></nuxt-child>
    </v-content>

    <v-bottom-sheet v-model="isShowLogin" inset>
      <v-form class="pa-4" @submit.prevent="login">
        <v-text-field
          v-model="loginModel.username"
          label="用户名"
        ></v-text-field>
        <v-text-field
          v-model="loginModel.password"
          label="密码"
          type="password"
          autocomplete="new-password"
        ></v-text-field>
        <v-btn color="success" type="submit">登录</v-btn>
      </v-form>
    </v-bottom-sheet>
  </v-app>
</template>

<script>
export default {
  props: {
    source: {
      default: '',
      type: String
    }
  },
  data: () => ({
    isShowLogin: true,
    loginModel: {},
    drawer: null,
    items: [
      { icon: 'home', text: '首页', link: '/' },
      { icon: 'trending_up', text: '热门课程', link: '/courses' },
      { icon: 'subscriptions', text: '热门评论', link: '/comments' }
    ],
    items2: [
      { picture: 28, text: 'Joseph' },
      { picture: 38, text: 'Apple' },
      { picture: 48, text: 'Xbox Ahoy' },
      { picture: 58, text: 'Nokia' },
      { picture: 78, text: 'MKBHD' }
    ]
  }),
  created() {
    this.$vuetify.theme.dark = true
  },
  methods: {
    async login() {
      await this.$auth.loginWith('local', {
        data: this.loginModel
      })
      this.isShowLogin = false
    }
  }
}
</script>
