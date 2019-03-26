<template>
<div>
  <div class="buildBox">
    <ViewBox v-for='(item,index) in items'
      :key='index'
      :index='index'
      :item='item'
      @delitem='delitem'>
    </ViewBox>
    <input type='text' placeholder='Input placeholer for textbox' v-model='newplaceholder'>
    <button class="btn btn-default" @click='addtextbox'>insert textbox</button>
    <div>
      <input type='text' placeholder='Input form name' v-model='formname'>
      <button class="btn btn-default" @click='createform'>Create</button>
    </div>
    <div>
      <!-- <p>{{'This form\'s key is: ' + fkey}}</p> -->
      <a v-if='fkey' @click="gotoform">This form's key is: {{fkey}}</a>
    </div>
  </div>
</div>
</template>

<script>
import ViewBox from './components/ViewBox.vue'
import builder from '@/services/builder.js'

export default {
  name: 'MainForm',
  components: {
    ViewBox
  },
  data () {
    return {
      items: [{type: 'text', placeholder: 'this is a textbox', name: 'text1'}],
      newplaceholder: '',
      fkey: '',
      formname: ''
    }
  },
  methods: {
    delitem: function (index) {
      this.items.splice(index, 1)
    },
    addtextbox: function () {
      var newtextbox = {type: 'text', placeholder: this.newplaceholder, name: 'n' + Date.now()}
      this.items.push(newtextbox)
      this.newplaceholder = ''
    },
    createform: function () {
      var formkey = {key: 'f' + Date.now(), formname: this.formname}
      this.items.push(formkey)
      this.fkey = formkey.key
      formkey = {}
      if (this.items.length > 1 && this.formname !== '') {
        // this.axios.post('http://localhost:3000', this.items)
        //   .then((res) => {
        //     console.log(res)
        //     if (res.data === 1) {
        //       alert('Success!')
        //     } else {
        //       alert('System Wrong!')
        //       console.log(typeof res.data)
        //     }
        //   })
        builder.sendformdata('http://localhost:3000/create', this)
      } else {
        alert('!')
        this.items.splice(0, 1)
        // console.log(this.items)
        this.fkey = ''
        this.formname = ''
      }
      this.items = []
    },
    gotoform: function () {
      self.location.href = ('http://localhost:8080/#/form/' + this.fkey)
    }
  }
}
</script>

<style>
  .mainBox{
    text-align: center
  }
</style>
