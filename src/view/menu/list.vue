<template>
  <Card>
    <Row>
      <ButtonGroup :size="large">
        <Button type="primary">新增</Button>
        <Button type="primary">编辑</Button>
        <Button type="primary">删除</Button>
      </ButtonGroup>
    </Row>
    <Row>
      <Col span="6">
        <Tree :data="data1"></Tree>
      </Col>
      <Col span="18">
        <Form :model="formItem" :label-width="80">
          <FormItem label="父亲节点">
            <Input v-model="formItem.input" placeholder="请输入父亲节点"></Input>
          </FormItem>
          <FormItem label="节点ID">
            <Input v-model="formItem.input" placeholder="请输入节点ID"></Input>
          </FormItem>
          <FormItem label="标题">
            <Input v-model="formItem.input" placeholder="请输入标题"></Input>
          </FormItem>
          <FormItem label="权限标识">
            <Input v-model="formItem.input" placeholder="请输入权限标识"></Input>
          </FormItem>
          <FormItem label="图标">
            <Input v-model="formItem.input" placeholder="请输入图标"></Input>
          </FormItem>
          <FormItem label="类型">
            <Select v-model="formItem.select">
              <Option value="1">按钮</Option>
              <Option value="2">菜单</Option>
            </Select>
          </FormItem>
          <FormItem label="排序">
            <Input v-model="formItem.input" placeholder="请输入排序"></Input>
          </FormItem>
          <FormItem>
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
        formItem: {},
        data1: [
          {
            title: 'parent 1',
            expand: true,
            children: [
              {
                title: 'parent 1-1',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-1-1'
                  },
                  {
                    title: 'leaf 1-1-2'
                  }
                ]
              },
              {
                title: 'parent 1-2',
                expand: true,
                children: [
                  {
                    title: 'leaf 1-2-1'
                  },
                  {
                    title: 'leaf 1-2-1'
                  }
                ]
              }
            ]
          }
        ]
      }
    },
    methods: {},
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
