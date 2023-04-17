interface PageAttributes {
  title: string
  description: string
}

interface PostAttributes {
  title: string
  description: string
  imageUrl: string
  imageDescription: string
  category: string
  tags: Array<string>
  date: Date
}

export const getPageUri = (
  { title, description }: PageAttributes,
  encodeUri = true
) => {
  const url = [
    `?type=page`,
    `&title=${encodeURIComponent(title)}`,
    `&description=${encodeURIComponent(description)}`,
    // Joining a multiline string for readability.
  ].join("")

  return encodeUri ? encodeURIComponent(url) : url
}

export const getPostUri = (
  {
    title,
    description,
    imageUrl,
    imageDescription,
    category,
    tags,
    date,
  }: PostAttributes,
  encodeUri = true
) => {
  const url = [
    `?type=post`,
    `&title=${encodeURIComponent(title)}`,
    `&description=${encodeURIComponent(description)}`,
    // Joining a multiline string for readability.
  ].join("")

  return encodeUri ? encodeURIComponent(url) : url
}
