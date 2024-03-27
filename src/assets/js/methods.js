export function changeTabs (getData, regexContent, pushArray) {
  getData.forEach((item) => {
    const array = item.category.split(',')

    const filter = array.filter((item) => {
      const regex = regexContent
      return item.match(regex)
    })
    if (pushArray.length < 1) {
      pushArray.push(filter[0])
    } else {
      const result = pushArray.filter((item) => {
        return item === filter[0]
      })
      if (result.length < 1) {
        pushArray.push(filter[0])
      }
    }
  })
}

export function dateString (val) {
  return new Date(val * 1000).toLocaleDateString()
}
