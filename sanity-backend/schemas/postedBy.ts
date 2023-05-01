interface PostedBy {
  name: string
  title: string
  type: 'reference'
  to: {
    type: string
  }[]
}
