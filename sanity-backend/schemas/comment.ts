interface Comment {
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

const comment: Comment = {
  name: 'comment',
  title: 'Comment',
  type: 'document',
  fields: [
    {
      name: 'postedBy',
      title: 'Posted By',
      type: 'postedBy',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'comment',
      title: 'Comment',
      type: 'string',
      validation: (Rule) => Rule.uri(),
    },
  ],
}

export default comment
