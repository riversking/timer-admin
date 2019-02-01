<template>
  <Card>
    <div>
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

    name: 'deptList',
    components: {
    },
    data() {
      return {
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
          }
        ]
      }
    },
    methods: {

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
