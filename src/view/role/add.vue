<template>
  <div>
    <!--在子组件中用:value替代v-model-->
    <Modal :value="addModal" footer-hide :closable="true" @on-cancel="showModal()">
      <p slot="header">
        <span>新增</span>
      </p>
      <Row :gutter="8">
        <Col :span="24">
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
        <Col span="12" style="text-align: right;margin-top: 10px">
          <Button type="primary" @click="addRole()">确定</Button>
        </Col>
        <Col span="12" style="text-align: left;margin-top: 10px">
          <Button @click="showModal()">取消</Button>
        </Col>
      </Row>
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
      roleId: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        namespace: 'role',
        isDisable: false,
        model: {
          roleName: '',
          roleCode: '',
          roleDesc: ''
        },
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
                this.$emit('refresh-role-list', data.code)
                break
              default:
                this.$Message.error(data.msg)
                break
            }
          })
      },
      getRoleDetail(id) {
        this.$store.dispatch(`${this.namespace}/read`, {'param': id})
          .then(data => {
            console.log(data)
            switch (data.code) {
              case '0':
                this.model = data.rsp
                break
              default:
                this.$Message.error('失败!')
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
