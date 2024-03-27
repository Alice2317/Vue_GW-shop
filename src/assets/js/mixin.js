export const windowWidth = {
  data () {
    return {
      resize: false
    }
  },
  methods: {
    listenScreenSize () {
      const screenSize = document.body.clientWidth
      if (screenSize < 576) {
        this.resize = true
      } else {
        this.resize = false
      }
    }
  },
  created () {
    window.addEventListener('resize', this.listenScreenSize)
  }
}

export function toast (state = 'success', title = '') {
  const Toast = this.$swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: false
  })
  Toast.fire({
    icon: state,
    title
  })
}
