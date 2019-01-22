<template>
  <Card>
    <div>
      <Row>
          <Button icon="plus-round" type="primary" @click="showModal">新增</Button>
          <Modal v-model="addModal" footer-hide :closable="true">
            <p slot="header" style="color:#1e27ff">
              <span>新增用户</span>
            </p>
            <Form :model="formItem" :label-width="80">
              <FormItem label="用户名：">
                <Input v-model="formItem.userName" placeholder="请输入用户名"></Input>
              </FormItem>
              <FormItem label="密码：">
                <Input v-model="formItem.password" placeholder="请输入密码" type="password"></Input>
              </FormItem>
              <FormItem label="手机号：">
                <Input v-model="formItem.phone" placeholder="请输入手机号"></Input>
              </FormItem>
              <FormItem label="部门：">
                <Input v-model="formItem.dept" placeholder="请输入手机号"></Input>
              </FormItem>
              <FormItem label="角色：">
                <Select v-model="formItem.roleName" multiple>
                  <Option value="beijing">New York</Option>
                  <Option value="shanghai">London</Option>
                  <Option value="shenzhen">Sydney</Option>
                </Select>
              </FormItem>
              <FormItem label="头像：">
                <upload/>
              </FormItem>
              <FormItem>
                <Button type="primary">确认</Button>
                <Button style="margin-left: 8px">取消</Button>
              </FormItem>
            </Form>
          </Modal>
      </Row>
      <br>
      <Row :gutter="12">
        <Col span="24">
          <Table border :columns="userColumns" :data="listData"></Table>
        </Col>
      </Row>
    </div>
  </Card>
</template>
<script>
import { mapState } from 'vuex'
import  upload  from '../user/upload'
export default {

  name: 'userList',
  components: {
    upload
  },
  data () {
    return {
      namespace: 'user',
      addModal: false,
      formItem: {
        userName: '',
        password: '',
        phone: '',
        dept: '',
        roleName: ''
      },
      userColumns: [
        {
          title: '序号',
          key: 'id'
        },
        {
          title: '用户名',
          key: 'username'
        },
        {
          title: '手机号',
          key: 'phone'
        },
        {
          title: '头像',
          key: 'avatar'
        },
        {
          title: '角色',
          key: 'roleName'
        },
        {
          title: '创建时间',
          key: 'createTime'
        },
        {
          title: '更新时间',
          key: 'updateTime'
        },
        {
          title: '操作',
          key: 'action',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {

                  }
                }
              }, '查看'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {

                  }
                }
              }, 'Delete')
            ])
          }
        }
      ]
    }
  },
  methods: {
    showModal () {

    },
    showModal () {
      this.addModal = true
    }
  },
  computed: {
    ...mapState({
      listData: state => state.user.listData
    })
  },
  mounted () {

  },
  created () {
    // this.getList()
  }
}
</script>
