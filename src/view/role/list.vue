<template>
  <Card>
  <div>
    <Row>
      <Col span="24">
        <Button icon="plus-round" type="primary">新增</Button>
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
import { mapState } from 'vuex'

export default {

  name: 'roleList',
  data () {
    return {
      namespace: 'role',
      listData: [],
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
                    // this.show(params.index)
                  }
                }
              }, 'View'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    // this.remove(params.index)
                  }
                }
              }, 'Delete')
            ])
          }
        }
      ],
      data: [
        {
          id: 'John Brown',
          roleName: '管理员',
          roleCode: 'Role_admin',
          roleDesc: '管理员',
          createTime: '2019-1-14',
          updateTime: '2019-1-14'
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
      this.$store.dispatch(`${this.namespace}/getListData`, { "param" : query })
        .then(data => {
          this.listData = data.rsp.records
      })
    }
  },
  computed: {
    ...mapState({
      // listData: state => state.usercenter.role.listData,
    })
  },
  created () {
    this.getList()
  }
}
</script>
