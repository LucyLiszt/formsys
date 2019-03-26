<template>
  <div>
    <!-- <h1>Component:{{index}}</h1> -->
    <p>
      <div class="pull-left">
      <label class="text-primary">{{item.placeholder}}</label>
      </div>
      <input class="form-control"
        :type=item.type
        :placeholder=item.placeholder
        :name=item.name
        v-model="formvalue.value">
    </p>
  </div>
</template>

<script>
export default {
  name: 'FormItems',
  props: {
    item: Object,
    index: Number
  },
  data: function () {
    return {
      formvalue: {
        value: '',
        name: ''
      }
    }
  },
  methods: {

  },
  created () {
    this.formvalue.name = this.item.name
    // console.log(this.formvalue)
  }
}
</script>
