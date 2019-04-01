<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>
          欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input ref="user-name" v-model="form.username" placeholder="请输入用户名">
              <span slot="prepend">
                <Icon :size="16" type="person"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem prop="userPwd">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
              <span slot="prepend">
                <Icon :size="14" type="locked"></Icon>
              </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button size="large" :loading="loading" @click="handleSubmit" type="primary" long>
                <span v-if="!loading">登录</span>
                <span v-else>Loading...</span>
              </Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
  import Cookies from 'js-cookie'
  // import { mapActions } from 'vuex'

  export default {
    data() {
      return {
        loading: false,
        form: {
          username: 'admin',
          password: '123456',
          code: '',
          randomStr: ''
        },
        rules: {
          username: [
            {required: true, message: '账号不能为空', trigger: 'blur'}
          ],
          password: [
            {required: true, message: '密码不能为空', trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      handleSubmit({userName, password}) {
        this.$refs.loginForm.validate((valid, opt, callback) => {
          if (valid) {
            this.loading = true
            this.$store.dispatch('userLogin', {
              'param': {
                'username': this.form.username,
                'password': this.form.password
              }
            }).then(data => {
              console.log('fsdfs时高时低发给谁', data)
              switch (data.code) {
                case '0':
                  this.$store.dispatch('getUserInfo', {'param': data.datas.username}).then(res => {
                    Cookies.set('user', JSON.stringify(res.datas))
                    this.$store.dispatch('menu/getMenuByUserId', {'param': res.datas.id}).then(menuRes => {
                      Cookies.set('access', JSON.stringify(menuRes.datas.access))
                      this.$router.push({
                        name: this.$config.homeName
                      })
                    })
                  })
                  break
                default:
                  this.$Message.error(data.message)
                  break
              }
              this.loading = false
            })
          }
        })
      }
    }

  }
</script>

<style>

</style>
