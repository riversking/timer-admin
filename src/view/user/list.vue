<template>
  <Card>
    <div>
      <Row>
        <Button icon="md-add" type="primary" @click="showModal">新增</Button>

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

  export default {

    name: 'userList',
    components: {},
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
        defaultList: [],
        imgName: '',
        visible: false,
        uploadList: [],
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
                      this.visible = true
                      this.formItem.avatar =  params.row.avatar
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
      handleView(name) {
        this.imgName = name;
        this.visible = true;
      },
      handleRemove(file) {
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      },
      handleSuccess(res, file) {
        console.log("res", res)
        console.log("file", file)
        file.url = 'http://localhost:10500/api/v1/image/' + res.rsp;
        this.formItem.avatar = res.rsp
        file.name = res.rsp;
      },
      handleFormatError(file) {
        this.$Notice.warning({
          title: 'The file format is incorrect',
          desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
        });
      },
      handleMaxSize(file) {
        this.$Notice.warning({
          title: 'Exceeding file size limit',
          desc: 'File  ' + file.name + ' is too large, no more than 2M.'
        });
      },
      handleBeforeUpload() {
        const check = this.uploadList.length < 2;
        if (!check) {
          this.$Notice.warning({
            title: 'Up to one pictures can be uploaded.'
          });
        }
        return check;
      },
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
      addUser() {
        this.formItem.createUser = 'admin'
        this.formItem.updateUser = 'admin'
        this.$store.dispatch('add', {'param': this.formItem})
          .then(data => {
            switch (data.code) {
              case '0':
                this.$Message.success(data.msg)
                this.getList()
                break
              default:
                this.$Message.error(data.msg)
                break
            }
          })
        this.addModal = false
        this.uploadList = []
      },
      getRoleList() {
        this.$store.dispatch(`role/getRoleList`, {'param': this.formItem})
          .then(data => {
            console.log('datadatadatadata', data)
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
                this.showCom = false
                this.isVisable = false
                this.isDisable = true
                this.showImg = true
                break
              default:
                this.$Message.error('失败!')
                break
            }
          })
      },
      deleteUser(index, id) {
        this.$store.dispatch(`deleteById`, { 'param': id })
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
      }
    },
    computed: {
      ...mapState({
        listData: state => state.user.listData,
        roleList: state => state.role.roleList
      })
    },
    mounted() {
      this.uploadList = this.$refs.upload.fileList;
      this.getRoleList()
    },
    created() {
      this.getList()
    }
  }
</script>
<style>
  .demo-upload-list {
    display: inline-block;
    width: 60px;
    height: 60px;
    text-align: center;
    line-height: 60px;
    border: 1px solid transparent;
    border-radius: 4px;
    overflow: hidden;
    background: #fff;
    position: relative;
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2);
    margin-right: 4px;
  }

  .demo-upload-list img {
    width: 100%;
    height: 100%;
  }

  .demo-upload-list-cover {
    display: none;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, .6);
  }

  .demo-upload-list:hover .demo-upload-list-cover {
    display: block;
  }

  .demo-upload-list-cover i {
    color: #fff;
    font-size: 20px;
    cursor: pointer;
    margin: 0 2px;
  }
</style>
