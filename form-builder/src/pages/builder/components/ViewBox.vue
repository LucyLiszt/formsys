<template>

  <div>
    <!-- <h1>Component:{{index}}</h1> -->
      <p>{{index+1}}.<input :type=item.type :placeholder=item.placeholder :name=item.name>
      <button class="btn btn-default" @click='delitem'>Delete</button></p>
      <!-- <p>Age:<input type="text" v-model="student.age" placeholder="Please enter age"><button class="button success outline" @click="deleteStudent">Delete</button></p> -->
  </div>
</template>

<script>
export default {
  name: 'ViewBox',
  props: {
    item: Object,
    index: Number
  },
  methods: {
    delitem: function () {
      this.$emit('delitem', this.index)
    }
  }
}
</script>
