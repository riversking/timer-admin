<template>
  <Card>
    <div>
      <Row>
        <Button icon="md-add" type="primary" @click="showModal">新增</Button>
        <AddUserModal :addModal="addModal" v-on:add-user="refreshUser" :formItem="formItem" :isDisable="isDisable"></AddUserModal>
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
  import {mapState} from 'vuex'
  import AddUserModal from './add'

  export default {

    name: 'userList',
    components: {
      AddUserModal
    },
    data() {
      return {
        namespace: 'user',
        addModal: false,
        isDisable: false,
        showCom: true,
        showImg: false,
        isVisable: true,
        formItem: {
          username: '',
          password: '',
          phone: '',
          roleIds: [],
          avatar: ''
        },
        userColumns: [
          {
            title: '序号',
            key: 'id',
            align: 'center',
          },
          {
            title: '用户名',
            key: 'username',
            align: 'center',
          },
          {
            title: '手机号',
            key: 'phone',
            align: 'center',
          },
          {
            title: '头像',
            key: 'avatar',
            align: 'center',
            render: (h, params) => {
              return h('div', [
                h('img', {
                  attrs: {
                    src: "http://localhost:10500/api/v1/image/" + params.row.avatar
                  },
                  style: {
                    widget: '40px',
                    height: '40px'
                  },
                  on: {
                    click: () => {
                      this.formItem.avatar = params.row.avatar
                    }
                  }
                },)
              ])
            }
          },
          {
            title: '角色',
            key: 'roleName',
            align: 'center',
            render: (h, params) => {
              return h('div',
                params.row.sysRoleModels.map(i => {
                  return h('Tag', {
                    style: {
                      marginRight: '5px'
                    },
                  }, i.roleName)
                })
              )
            }
          },
          {
            title: '创建时间',
            key: 'createTime',
            align: 'center',
          },
          {
            title: '更新时间',
            key: 'updateTime',
            align: 'center',
          },
          {
            title: '操作',
            key: 'action',
            align: 'center',
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
                      this.getUserDetail(params.row.id)
                    }
                  }
                }, '查看'),
                h('Button', {
                  props: {
                    type: 'error',
                    size: 'small',
                    icon: 'md-trash'
                  },
                  on: {
                    click: () => {
                      this.deleteUser(params.index, params.row.id)
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
      showModal() {
        this.addModal = true
        this.showCom = true
        this.isVisable = true
        this.isDisable = false
        this.showImg = false
        this.formItem = {
          username: '',
          password: '',
          phone: '',
          roleIds: [],
          avatar: ''
        }
      },
      getRoleList() {
        this.$store.dispatch(`role/getRoleList`, {'param': this.formItem})
          .then(data => {
            // console.log('datadatadatadata', data)
          })
      },
      getList() {
        let query = {
          page: 1,
          pageSize: 20
        }
        this.$store.dispatch(`getListData`, {'param': query})
          .then(data => {
            console.log('datadatadatadata', data)
          })
      },
      getUserDetail(id) {
        this.$store.dispatch(`getUserById`, {'param': id})
          .then(data => {
            switch (data.code) {
              case '0':
                this.formItem = data.rsp
                this.addModal = true
                this.isDisable = true
                break
              default:
                this.$Message.error('失败!')
                break
            }
          })
      },
      deleteUser(index, id) {
        this.$store.dispatch(`deleteById`, {'param': id})
          .then(data => {
            switch (data.code) {
              case '0':
                this.listData.splice(index, 1)
                break
              default:
                this.$Message.error('失败!')
                break
            }
          })
      },
      refreshUser(item) {
        if (item === '0') {
          this.getList()
        }
        this.addModal = false
      }
    },
    computed: {
      ...mapState({
        listData: state => state.user.listData,
        roleList: state => state.role.roleList
      })
    },
    mounted() {
      this.getRoleList()
    },
    created() {
      this.getList()
    }
  }
</script>
