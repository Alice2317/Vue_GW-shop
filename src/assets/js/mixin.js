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

export function removeAlert () {
  return this.$swal.fire({
    title: '你確定刪除嗎?',
    text: '刪除後無法恢復',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#b30808',
    cancelButtonColor: 'gray',
    confirmButtonText: '刪除',
    cancelButtonText: '取消',
    reverseButtons: true
  })
}
