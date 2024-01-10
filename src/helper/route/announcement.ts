export function getAnnouncementPagePath() {
  return '/announcement'
}

export function getAnnouncementArticleUrl(id?: string | number) {
  return `/announcement?id=${id}`
}
