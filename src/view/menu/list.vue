<template>
  <Card>
    <Row>
      <ButtonGroup>
        <Button type="primary">新增</Button>
        <Button type="primary">编辑</Button>
        <Button type="primary">删除</Button>
      </ButtonGroup>
    </Row>
    <Row>
      <Col span="6">
        <Tree :data="listData" @on-select-change="selectNode"></Tree>
      </Col>
      <Col span="18">
        <Form :model="formItem" :label-width="80">
          <FormItem label="父亲节点">
            <Input v-model="formItem.parentId" placeholder="请输入父亲节点" :disabled="disable"></Input>
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
            <Select v-model="formItem.type" :disabled="true">
              <Option value="0">按钮</Option>
              <Option value="1">菜单</Option>
            </Select>
          </FormItem>
          <FormItem label="排序">
            <Input v-model="formItem.sort" placeholder="请输入排序" :disabled="disable"></Input>
          </FormItem>
          <FormItem v-if="isShow">
            <Button type="primary">新增</Button>
            <Button style="margin-left: 8px">取消</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </Card>
</template>
<script>
  import {mapState} from 'vuex'

  export default {

    name: 'menuList',
    components: {},
    data() {
      return {
        namespace: 'menu',
        formItem: {
          parentId: '',
          id: '',
          name: '',
          icon: '',
          type: '',
          sort: '',
        },
        loading: false,
        disable: true,
        isShow: false
      }
    },
    methods: {
      getList() {
        this.$store.dispatch(`${this.namespace}/getListData`)
          .then(data => {
            console.log(data)
          })
      },
      selectNode(v) {
        console.log("asdasdasdasdasd", v)
        this.$store.dispatch(`${this.namespace}/read`,{"param":v[0].id})
          .then(data => {
            this.formItem = data.rsp
          })
      }
    },
    computed: {
      ...mapState({
        listData: state => state.menu.listData
      })
    },
    mounted() {

    },
    created() {
      this.getList()
    }
  }
</script>
