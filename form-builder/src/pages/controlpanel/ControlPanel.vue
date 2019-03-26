<template>
  <div>
    <h3>this is panel</h3>
    <button class="button primary" @click='tobuilder'>to builder</button>
    <button class="button primary" @click='todatachecker'>data checker</button>
  </div>
</template>
<script>
export default {
  name: 'ControlPanel',
  methods: {
    tobuilder: function () {
      self.location.href += '/builder'
    },
    todatachecker: function () {
      self.location.href += '/present'
    }
  }
}
</script>
