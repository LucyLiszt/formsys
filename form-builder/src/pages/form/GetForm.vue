<template>
<div class="container">
  <div class="pull-right"><img src="..\..\assets\logo.jpg" height="20px"/></div>
  <div class="row form_text">
    <div class="col-xs-1 col-sm-2 col-md-4"></div>
    <div class="col-xs-10 col-sm-8 col-md-4">
    <FormItems v-for='(item,index) in items'
      :key='index'
      :index='index'
      :item='item'
      ref='FormItems'>
    </FormItems>
    <div class="form-group form_text">
    <button type="button" class="btn btn-warning" id="buttonDown">提交</button>
    </div>
    </div>
    <div class="col-xs-1 col-sm-2 col-md-4"></div>
  </div>
</div>
</template>

<script>
import FormItems from './components/FormItems.vue'
import form from '@/services/form.js'

export default {
  name: 'GetForm',
  components: {
    FormItems
  },
  props: {
    fkey: String
  },
  data () {
    return {
      items: [],
      values: []
    }
  },
  methods: {
    uploadinput: function () {
      for (var i = 0; i < this.items.length; i++) {
        if (this.$refs.FormItems[i].formvalue.value === '') {
          alert('!')
          return
        }
        this.values.push(this.$refs.FormItems[i].formvalue)
      }
      var key = {key: this.fkey}
      this.values.push(key)
      console.log(this.values)
      // this.axios.post('http://localhost:3000/formpost', this.values)
      //   .then((res) => {
      //     console.log(res)
      //     if (res.data === 1) {
      //       alert('Success!')
      //     } else {
      //       alert('System Wrong!')
      //       console.log(typeof res.data)
      //     }
      //   })
      form.form.formsubmit('http://localhost:3000/formpost', this)
      this.values = []
    }
  },
  created: function () {
    // var thisx = this
    // this.axios.get('http://localhost:3000', {
    //   params: {key: this.fkey}
    // }).then(function (res) {
    //   console.log(res.data)
    //   thisx.items = res.data
    //   console.log(thisx.items)
    // })
    form.form.getform('http://localhost:3000/form', this)
  }
//   mounted: function () {
//     this.values.push(this.$refs.FormItems.formvalue)
//   }
}
</script>
<style>
#buttonDown{
  margin-top: 6vh
}

</style>
