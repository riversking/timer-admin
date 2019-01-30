<template>
  <div>
    <!--在子组件中用:value替代v-model-->
    <Modal :value="addModal" footer-hide :closable="true">
      <p slot="header" style="color:#1e27ff">
        <span>新增用户</span>
      </p>
      <Form :model="formItem" :label-width="80">
        <FormItem label="用户名：">
          <Input v-model="formItem.username" placeholder="请输入用户名" :disabled="isDisable"></Input>
        </FormItem>
        <FormItem label="密码：" v-show="showCom">
          <Input v-model="formItem.password" placeholder="请输入密码" type="password"></Input>
        </FormItem>
        <FormItem label="手机号：">
          <Input v-model="formItem.phone" placeholder="请输入手机号" :disabled="isDisable"></Input>
        </FormItem>
        <FormItem label="角色：">
          <Select v-model="formItem.roleIds" multiple :disabled="isDisable">
            <Option v-for="item in roleList" :value="item.id" :key="item.id">{{item.roleName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="头像：">
          <div>
            <img class="demo-upload-list" :src="'http://localhost:10500/api/v1/image/'+formItem.avatar" v-if="showImg"/>
            <div class="demo-upload-list" v-for="item in uploadList">
              <template v-if="item.status === 'finished'" v-show="showCom">
                <img :src="item.url">
                <div class="demo-upload-list-cover">
                  <Icon type="ios-eye-outline" @click.native="handleView(item.name)"></Icon>
                  <Icon type="ios-trash-outline" @click.native="handleRemove(item)"></Icon>
                </div>
              </template>
              <template v-else>
                <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
              </template>
            </div>
            <Upload
              ref="upload"
              :show-upload-list="false"
              :default-file-list="defaultList"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              type="drag"
              :multiple=false
              action="/file/upload"
              v-show="showCom"
              style="display: inline-block;width:58px;">
              <div style="width: 58px;height:58px;line-height: 58px;">
                <Icon type="ios-camera" size="20"></Icon>
              </div>
            </Upload>
            <Modal title="View Image" v-model="visible">
              <img :src="'http://localhost:10500/api/v1/image/'+this.formItem.avatar" v-if="visible"
                   style="width: 100%">
            </Modal>
          </div>
        </FormItem>
        <FormItem v-show="isVisable">
          <Button type="primary" @click="addUser()">确认</Button>
          <Button style="margin-left: 8px">取消</Button>
        </FormItem>
      </Form>
    </Modal>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {

    name: 'addRole',
    props: {
      addModal: {
        type: Boolean,
        default: false
      },
      isShow: {
        type: Boolean,
        default: true
      },
      isEdit: {
        type: Boolean,
        default: false
      },
      isDisable: {
        type: Boolean,
        default: false
      },
      model: {
        type: Object,
      }
    },
    data() {
      return {
        namespace: 'role',
      }
    },
    methods: {
      addRole() {
        let query = {
          'roleName': this.model.roleName,
          'roleCode': this.model.roleCode,
          'roleDesc': this.model.roleDesc
        }
        this.$store.dispatch(`${this.namespace}/addRole`, {'param': query})
          .then(data => {
            switch (data.code) {
              case '0':
                this.$Message.success('成功!')
                this.$emit('refresh', data.code)
                break
              default:
                this.$Message.error(data.msg)
                break
            }
          })
      },
      updateRole() {
        this.$store.dispatch(`${this.namespace}/updateRole`, {'param': this.model})
          .then(data => {
            switch (data.code) {
              case '0':
                this.$Message.success('成功!')
                this.$emit('refresh', data.code)
                break
              default:
                this.$Message.error(data.msg)
                break
            }
          })
      },
      showModal() {
        this.$emit('refresh', 2)
      }
    },
    computed: {
      ...mapState({
        listData: state => state.role.listData
      })
    },
    mounted() {

    },
    created() {

    }
  }
</script>
