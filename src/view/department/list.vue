<template>
  <Card>
    <div>
      <Row :gutter="12">
        <Col span="24">
          <Tree :data="listData"></Tree>
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
        namespace: 'dept'
      }
    },
    methods: {
      getList () {
        this.$store.dispatch(`${this.namespace}/getListData`)
          .then(data => {
            console.log(data)
          })
      }
    },
    computed: {
      ...mapState({
        listData: state => state.dept.listData

      })
    },
    mounted() {

    },
    created() {
      this.getList()
    }
  }
</script>
