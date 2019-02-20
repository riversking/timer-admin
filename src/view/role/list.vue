<template>
  <Card>
    <div>
      <Row :gutter="16">
        <Col span="6">
          <Button icon="md-add" type="primary" @click="showModal">新增</Button>
          <addRole v-on:refresh="getRefreshList" :addModal="addModal" :isDisable="isDisable" :isShow="isShow"
                   :isEdit="isEdit"
                   :model="model"></addRole>
        </Col>
        <Col span="18" style="text-align: right">
          <Input v-model="roleName" placeholder="请输入角色名称" clearable style="width: 200px;margin-right: 5px"></Input>
          <Input v-model="roleCode" placeholder="请输入角色标识" clearable style="width: 200px;margin-right: 5px"></Input>
          <DatePicker v-model="createTime" type="datetime" placeholder="请选择创建时间"
                      style="width: 200px;margin-right: 5px"></DatePicker>
          <DatePicker v-model="updateTime" type="datetime" placeholder="请选择更新时间"
                      style="width: 200px;margin-right: 5px"></DatePicker>
          <Button icon="md-search" type="primary" @click="searchRole()">搜索</Button>
        </Col>
      </Row>
      <br>
      <Row :gutter="12">
        <Col span="24">
          <Table :loading="loading" border :columns="roleColumns" :data="listData"></Table>
          <Modal v-model="permissionModal">
            <p slot="header">
              <span>权限</span>
            </p>
            <Tree :data="roleMenuTree" show-checkbox multiple></Tree>
          </Modal>
        </Col>
      </Row>
      <Row>
        <Col span="24">
          <Page :total="total" prev-text="上一页" next-text="下一页" style="margin-top: 10px"/>
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
        permissionModal: false,
        roleMenuTree: [],
        roleName: '',
        roleCode: '',
        createTime: '',
        updateTime: '',
        loading: false,
        model: {
          id: '',
          roleName: '',
          roleCode: '',
          roleDesc: ''
        },
        roleColumns: [
          {
            title: '序号',
            key: 'id',
            align: 'center',
          },
          {
            title: '角色名称',
            key: 'roleName',
            align: 'center',
          },
          {
            title: '角色标识',
            key: 'roleCode',
            align: 'center',
          },
          {
            title: '角色描述',
            key: 'roleDesc',
            align: 'center',
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
            width: 350,
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
                      this.getRoleDetail(params.row.id, "view")
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
                      this.getRoleDetail(params.row.id, "edit")
                    }
                  }
                }, '编辑'),
                h('Button', {
                  props: {
                    type: 'dashed',
                    size: 'small',
                    icon: 'md-add'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.$store.dispatch(`menu/getMenuByRoleId`, {'param': params.row.id}).then(data => {
                        switch (data.code) {
                          case '0':
                            this.permissionModal = true
                            this.roleMenuTree = data.datas
                            break
                          default:
                            this.$Message.error('失败!')
                            break
                        }
                      })
                    }
                  }
                }, '权限'),
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
          pageSize: 20,
          roleName: this.roleName,
          roleCode: this.roleCode,
          createTime: this.createTime,
          updateTime: this.updateTime
        }
        this.loading = true
        this.$store.dispatch(`${this.namespace}/getListData`, {'param': query})
          .then(data => {
            this.loading = false
            console.log(data)
          })
      },
      getRoleDetail(id, type) {
        this.$store.dispatch(`${this.namespace}/read`, {'param': id})
          .then(data => {
            switch (data.code) {
              case '0':
                this.model = data.datas
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
                this.$Message.error(data.message)
                break
            }
          })
      },
      searchRole() {
        this.getList()
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
        listData: state => state.role.listData,
        total: state => state.role.total
      })
    },
    mounted() {

    },
    created() {
      this.getList()
    }
  }
</script>
