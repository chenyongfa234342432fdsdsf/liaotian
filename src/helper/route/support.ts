export function getSupportPagePath() {
  return '/support'
}

export function getSupportArticleUrl(id: string | number, redirect?: string) {
  let url = `/support`
  if (id) url = `${url}?id=${id}`
  if (redirect) url = `${url}?redirect=${redirect}`
  return url
}
