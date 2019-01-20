<template>
  <Card>
    <div>
      <Row>
        <Col span="24">
          <Button icon="plus-round" type="primary" @click="showModal">新增</Button>
          <Modal v-model="addModal" footer-hide :closable="true">
            <p slot="header" style="color:#1e27ff">
              <span>新增用户</span>
            </p>
            <Row>
              <Col span="3">
                用户名：
              </Col>
              <Col span="21">
              <Input v-model="model.roleName" placeholder="请输入用户名" style="width: 400px" :disabled="isDisable"/>
              </Col>
              <Col span="24" style="margin-top: 10px">
                密码：
                <Input v-model="model.roleCode" placeholder="请输入密码" type="password" style="width: 400px" :disabled="isDisable"/>
              </Col>
              <Col span="24" style="margin-top: 10px">
                头像：
                <Input v-model="model.roleDesc" placeholder="请输入角色描述" style="width: 400px" :disabled="isDisable"/>
              </Col>
              <Col span="12" style="text-align: right;margin-top: 10px" v-show="isVisable">
                <Button type="primary" @click="addRole()" >确定</Button>
              </Col>
              <Col span="12" style="text-align: left;margin-top: 10px" v-show="isVisable">
                <Button @click="addModal = false" >取消</Button>
              </Col>

            </Row>
          </Modal>
        </Col>
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

export default {

  name: 'userList',
  data () {
    return {
      namespace: 'user',
      addModal: false,
      model: {
        roleName: '',
        roleCode: '',
        roleDesc: ''
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
    this.getList()
  }
}
</script>
