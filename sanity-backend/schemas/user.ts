interface User {
  name: string
  title: string
  type: 'document'
  fields: {
    name: string
    title: string
    type: string
    validation?: (Rule: any) => any
  }[]
}

const user: User = {
  name: 'user',
  title: 'User',
  type: 'document',
  fields: [
    {
      name: 'userName',
      title: 'User Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'string',
      validation: (Rule) => Rule.uri(),
    },
  ],
}

export default user
