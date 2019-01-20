<template>
  <Card>
    <div>
      <Row>
        <Col span="24">
          <Button icon="plus-round" type="primary" @click="showModal">新增</Button>
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

  name: 'roleList',
  data () {
    return {
      namespace: 'role',
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
