<template>
  <div>
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
          <Button @click="addModal = false">取消</Button>
        </Col>
      </Row>
  </div>
</template>
<script>
  import {mapState} from 'vuex'

  export default {

    name: 'addRole',
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
                break
              default:
                this.$Message.error('失败!')
                break
            }
          })
      },
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
