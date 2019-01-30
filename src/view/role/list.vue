<template>
  <Card>
    <div>
      <Row>
        <Col span="24">
          <Button icon="md-add" type="primary" @click="showModal">新增</Button>
          <addRole v-on:refresh="getRefreshList" :addModal="addModal" :isDisable="isDisable" :isShow="isShow" :isEdit="isEdit"
                   :model="model"></addRole>
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
  import AddRole from './add'

  export default {

    name: 'roleList',
    components: {
      AddRole
    },
    data() {
      return {
        namespace: 'role',
        addModal: false,
        roleId: 0,
        isDisable: false,
        isShow: true,
        isEdit: false,
        model: {
          id: '',
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
            align: 'center',
            width: 250,
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'info',
                    size: 'small',
                    icon: 'md-eye'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.getRoleDetail(params.row.id,"view")
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small',
                    icon: 'md-create'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.getRoleDetail(params.row.id,"edit")
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'md-trash'
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
      getList() {
        let query = {
          page: 1,
          pageSize: 20
        }
        this.$store.dispatch(`${this.namespace}/getListData`, {'param': query})
          .then(data => {
            console.log(data)
          })
      },
      getRoleDetail(id,type) {
        this.$store.dispatch(`${this.namespace}/read`, {'param': id})
          .then(data => {
            console.log(data)
            switch (data.code) {
              case '0':
                this.model = data.rsp
                this.addModal = true
                if (type === 'view') {
                  this.isDisable = true
                  this.isShow = false
                  this.isEdit = false
                }
                if (type === 'edit') {
                  this.isDisable = false
                  this.isShow = false
                  this.isEdit = true
                }
                break
              default:
                this.$Message.error('失败!')
                break
            }
          })
      },
      deleteRole(index, id) {
        this.$store.dispatch(`${this.namespace}/remove`, {'param': id})
          .then(data => {
            switch (data.code) {
              case '0':
                this.addModal = false
                this.listData.splice(index, 1)
                break
              default:
                this.$Message.error(data.msg)
                break
            }
          })
      },
      showModal() {
        this.addModal = true
        this.isDisable = false
        this.isShow = true
        this.model = {
          roleName: '',
          roleCode: '',
          roleDesc: ''
        }
      },
      getRefreshList(item) {
        if (item === "0") {
          this.getList()
        }
        this.addModal = false
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
      this.getList()
    }
  }
</script>
