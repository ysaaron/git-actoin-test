<template>
  <div>
    <h1>Hello world!</h1>
    <code>{{ currentTime }}</code>
  </div>
</template>

<script>
export default {
  fetch() {
    return fetch(`http://api:${process.env.API_SERVER_PORT}/time`).then(res => {
      return res.json()
    }).then(data => {
      console.log(data)
      this.currentTime = data
    })
  },
  data() {
    return {
      currentTime: {}
    }
  }
}
</script>
