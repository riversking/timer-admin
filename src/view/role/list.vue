<template>
  <Card>
  <div>
    <Row>
      <Col span="24">
        <Button icon="plus-round" type="primary" @click="showModal">新增</Button>
        <Modal v-model="addModal" footer-hide :closable="true">
          <p slot="header" style="color:#1e27ff">
            <span>新增角色</span>
          </p>
          <Row :gutter="8">
            <Col span="24">
              角色名称：
              <Input v-model="model.roleName" placeholder="请输入角色名称" style="width: 400px" :disabled="isDisable"/>
            </Col>
            <Col span="24" style="margin-top: 10px">
              角色标识：
              <Input v-model="model.roleCode" placeholder="请输入角色标识" style="width: 400px" :disabled="isDisable"/>
            </Col>
            <Col span="24" style="margin-top: 10px">
              角色描述：
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
        <Table border :columns="roleColumns" :data="listData"></Table>
      </Col>
    </Row>
  </div>
  </Card>
</template>
<script>
  import {mapState} from 'vuex'

  export default {

  name: 'roleList',
    data () {
    return {
      namespace: 'role',
      addModal: false,
      isDisable: false,
      isVisable: true,
      model: {
        roleName: '',
        roleCode: '',
        roleDesc: ''
      },
      roleColumns: [
        {
          title: '序号',
          key: 'id'
        },
        {
          title: '角色名称',
          key: 'roleName'
        },
        {
          title: '角色标识',
          key: 'roleCode'
        },
        {
          title: '角色描述',
          key: 'roleDesc'
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
                    this.isDisable = true
                    this.isVisable = false
                    this.getRoleDetail(params.row.id)
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
                    this.deleteRole(params.index, params.row.id)
                  }
                }
              }, '删除')
            ])
          }
        }
      ]
    }
  },
  methods: {
    getList () {
      let query = {
        page: 1,
        pageSize: 20
      }
      this.$store.dispatch(`${this.namespace}/getListData`, { 'param': query })
        .then(data => {
          console.log(data)
        })
    },
    addRole () {
      let query = {
        'roleName': this.model.roleName,
        'roleCode': this.model.roleCode,
        'roleDesc': this.model.roleDesc
      }
      this.$store.dispatch(`${this.namespace}/addRole`, { 'param': query })
        .then(data => {
          switch (data.code) {
            case '0':
              this.$Message.success('成功!')
              this.getList()
              break
            default:
              this.$Message.error('失败!')
              break
          }
        })
      this.addModal = false
      this.model = {
        roleName: '',
        roleCode: '',
        roleDesc: ''
      }
    },
    getRoleDetail (id) {
      this.$store.dispatch(`${this.namespace}/read`, { 'param': id })
        .then(data => {
          console.log(data)
          switch (data.code) {
            case '0':
              this.model = data.rsp
              this.addModal = true
              break
            default:
              this.$Message.error('失败!')
              break
          }
        })
    },
    deleteRole (index, id) {
      this.$store.dispatch(`${this.namespace}/remove`, { 'param': id })
        .then(data => {
          switch (data.code) {
            case '0':
              this.addModal = false
              this.listData.splice(index, 1)
              break
            default:
              this.$Message.error('失败!')
              break
          }
        })
    },
    showModal () {
      this.addModal = true
      this.isDisable = false
      this.isVisable = true
      this.model = {
        roleName: '',
        roleCode: '',
        roleDesc: ''
      }
    }
  },
  computed: {
    ...mapState({
      listData: state => state.role.listData
    })
  },
  mounted () {

  },
  created () {
    this.getList()
  }
}
</script>
