<template>
  <Card>
    <Row>
      <ButtonGroup>
        <Button type="primary" @click="add">新增</Button>
        <Button type="primary" @click="edit">编辑</Button>
        <Button type="primary" @click="deleteMenu">删除</Button>
      </ButtonGroup>
    </Row>
    <Row>
      <Col span="6">
        <Tree :data="listData" @on-select-change="selectNode"></Tree>
      </Col>
      <Col span="18">
        <Form :model="formItem" :label-width="80">
          <FormItem label="父亲节点">
            <Input v-model="formItem.parentId" placeholder="请输入父亲节点" :disabled="true"></Input>
          </FormItem>
          <FormItem label="节点ID">
            <Input v-model="formItem.id" placeholder="请输入节点ID" :disabled="disable"></Input>
          </FormItem>
          <FormItem label="标题">
            <Input v-model="formItem.name" placeholder="请输入标题" :disabled="disable"></Input>
          </FormItem>
          <FormItem label="权限标识">
            <Input v-model="formItem.permission" placeholder="请输入权限标识" :disabled="disable"></Input>
          </FormItem>
          <FormItem label="图标">
            <Input v-model="formItem.icon" placeholder="请输入图标" :disabled="disable"></Input>
          </FormItem>
          <FormItem label="类型">
            <Select v-model="formItem.type" :disabled="disable">
              <Option value="0">按钮</Option>
              <Option value="1">菜单</Option>
            </Select>
          </FormItem>
          <FormItem label="排序">
            <Input v-model="formItem.sort" placeholder="请输入排序" :disabled="disable"></Input>
          </FormItem>
          <FormItem>
            <Button type="primary" v-if="isAdd" @click="create">新增</Button>
            <Button type="primary" v-if="isEdit" @click="update">更新</Button>
            <Button style="margin-left: 8px" v-if="isAdd || isEdit">取消</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </Card>
</template>
<script>
import { mapState } from 'vuex'

export default {

  name: 'menuList',
  components: {},
  data () {
    return {
      namespace: 'menu',
      formItem: {
        parentId: '',
        id: '',
        name: '',
        icon: '',
        type: '',
        sort: ''
      },
      loading: false,
      disable: true,
      isAdd: false,
      isEdit: false
    }
  },
  methods: {
    getList () {
      this.$store.dispatch(`${this.namespace}/getListData`)
        .then(data => {
          console.log(data)
        })
    },
    selectNode (v) {
      this.$store.dispatch(`${this.namespace}/read`, { 'param': v[0].id })
        .then(data => {
          this.formItem = data.datas
        })
    },
    edit () {
      if (this.formItem.id) {
        this.disable = false
        this.isEdit = true
        this.isAdd = false
      }
    },
    add () {
      this.disable = false
      this.isAdd = true
      this.isEdit = false
      this.formItem = {
        parentId: this.formItem.id || -1,
        id: '',
        name: '',
        icon: '',
        type: '',
        sort: ''
      }
    },
    create () {
      this.formItem.createUser = 'admin'
      this.formItem.updateUser = 'admin'
      this.$store.dispatch(`${this.namespace}/add`, { 'param': this.formItem })
        .then(data => {
          console.log('asdasdasdasd', data)
          switch (data.code) {
            case '0':
              this.$Message.success(data.message)
              this.getList()
              break
            default:
              this.$Message.error(data.message)
              break
          }
        })
    },
    deleteMenu () {
      this.$store.dispatch(`${this.namespace}/delete`, { 'param': this.formItem.id })
        .then(data => {
          switch (data.code) {
            case '0':
              this.$Message.success(data.message)
              this.getList()
              break
            default:
              this.$Message.error(data.message)
              break
          }
        })
    },
    update () {
      this.$store.dispatch(`${this.namespace}/update`, { 'param': this.formItem })
        .then(data => {
          switch (data.code) {
            case '0':
              this.$Message.success(data.message)
              this.getList()
              break
            default:
              this.$Message.error(data.message)
              break
          }
        })
    }
  },
  computed: {
    ...mapState({
      listData: state => state.menu.listData
    })
  },
  mounted () {
  },
  created () {
    this.getList()
  }
}
</script>
