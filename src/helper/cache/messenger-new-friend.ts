import multiWindowsCacheUtils from './multi-windows'

export const messengerNewFriend = 'MESSENGER_NEW_FRIEND'
export const messengerNewFriendNumber = 'MESSENGER_NEW_FRIEND_NUMBER'

export function getMessengerNewFriend() {
  return multiWindowsCacheUtils.get(messengerNewFriend)
}

export function setMessengerNewFriend(val) {
  return multiWindowsCacheUtils.set(messengerNewFriend, val)
}

export function removeMessengerNewFriend() {
  return multiWindowsCacheUtils.set(messengerNewFriend, '')
}
export function getMessengerNewFriendNumber() {
  return multiWindowsCacheUtils.get(messengerNewFriendNumber)
}

export function setMessengerNewFriendNumber(val) {
  return multiWindowsCacheUtils.set(messengerNewFriendNumber, val)
}

export function removeMessengerNewFriendNumber() {
  return multiWindowsCacheUtils.set(messengerNewFriendNumber, '')
}
