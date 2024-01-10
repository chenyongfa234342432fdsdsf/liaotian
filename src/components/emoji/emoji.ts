/**
 * 字素截取、拆分
 */
// 是基于 unicode15.0 中的 emoji 标准，返回识别字符串中 emoji 的正则表达式
const regionalIndicator = '\uD83C[\uDDE6-\uDDFF]'
// 地区匹配
const emojiFlagSequence = `${regionalIndicator}${regionalIndicator}`
// emoji 匹配
const emojiCharacter =
  '[\u231A-\u231B]|[\u23E9-\u23EC]|\u23F0|\u23F3|[\u25FD-\u25FE]|[\u2614-\u2615]|[\u2648-\u2653]|\u267F|\u2693|\u26A1|[\u26AA-\u26AB]|[\u26BD-\u26BE]|[\u26C4-\u26C5]|\u26CE|\u26D4|\u26EA|[\u26F2-\u26F3]|\u26F5|\u26FA|\u26FD|\u2705|[\u270A-\u270B]|\u2728|\u274C|\u274E|[\u2753-\u2755]|\u2757|[\u2795-\u2797]|\u27B0|\u27BF|[\u2B1B-\u2B1C]|\u2B50|\u2B55|\uD83C[\uDC04]|\uD83C[\uDCCF]|\uD83C[\uDD8E]|\uD83C[\uDD91-\uDD9A]|\uD83C[\uDE01]|\uD83C[\uDE1A]|\uD83C[\uDE2F]|\uD83C[\uDE32-\uDE36]|\uD83C[\uDE38-\uDE3A]|\uD83C[\uDE50-\uDE51]|\uD83C[\uDF00-\uDF20]|\uD83C[\uDF2D-\uDF35]|\uD83C[\uDF37-\uDF7C]|\uD83C[\uDF7E-\uDF93]|\uD83C[\uDFA0-\uDFCA]|\uD83C[\uDFCF-\uDFD3]|\uD83C[\uDFE0-\uDFF0]|\uD83C[\uDFF4]|\uD83C[\uDFF8-\uDFFF]|\uD83D[\uDC00-\uDC3E]|\uD83D[\uDC40]|\uD83D[\uDC42-\uDCFC]|\uD83D[\uDCFF-\uDD3D]|\uD83D[\uDD4B-\uDD4E]|\uD83D[\uDD50-\uDD67]|\uD83D[\uDD7A]|\uD83D[\uDD95-\uDD96]|\uD83D[\uDDA4]|\uD83D[\uDDFB-\uDE4F]|\uD83D[\uDE80-\uDEC5]|\uD83D[\uDECC]|\uD83D[\uDED0-\uDED2]|\uD83D[\uDED5-\uDED7]|\uD83D[\uDEDC-\uDEDF]|\uD83D[\uDEEB-\uDEEC]|\uD83D[\uDEF4-\uDEFC]|\uD83D[\uDFE0-\uDFEB]|\uD83D[\uDFF0]|\uD83E[\uDD0C-\uDD3A]|\uD83E[\uDD3C-\uDD45]|\uD83E[\uDD47-\uDDFF]|\uD83E[\uDE70-\uDE7C]|\uD83E[\uDE80-\uDEBD]|\uD83E[\uDEBF-\uDEC5]|\uD83E[\uDECE-\uDEDB]|\uD83E[\uDEE0-\uDEE8]|\uD83E[\uDEF0-\uDEF8]'
// 肤色匹配
const emojiModifier = '\uD83C[\uDFFB-\uDFFF]'
// 匹配变形符号
const emojiPresentationSelector = '\uFE0F'
// 匹配键帽
const keycapSymbol = '\u20E3'
// 匹配标签符号
const tagSymbol = '(\uDB40[\uDC20-\uDC7E])'
// 匹配结束标签符号
const termTagSymbol = '\uDB40\uDC7F'
// 匹配零宽字符
const zeroWidthJoiner = '\u200D'

// 键帽变体序列
const kVSequence = `[#*0-9]\uFE0F?\u20E3`
// 变体基础字符
const variationSequence =
  '\u00A9|\u00AE|\u203C|\u2049|\u2122|\u2139|\u2194|\u2195|\u2196|\u2197|\u2198|\u2199|\u21A9|\u21AA|\u2328|\u23CF|\u23ED|\u23EE|\u23EF|\u23F1|\u23F2|\u23F8|\u23F9|\u23FA|\u24C2|\u25AA|\u25AB|\u25B6|\u25C0|\u25FB|\u25FC|\u2600|\u2601|\u2602|\u2603|\u2604|\u260E|\u2611|\u2618|\u261D|\u2620|\u2622|\u2623|\u2626|\u262A|\u262E|\u262F|\u2638|\u2639|\u263A|\u2640|\u2642|\u265F|\u2660|\u2663|\u2665|\u2666|\u2668|\u267B|\u267E|\u2692|\u2694|\u2695|\u2696|\u2697|\u2699|\u269B|\u269C|\u26A0|\u26A7|\u26B0|\u26B1|\u26C8|\u26CF|\u26D1|\u26D3|\u26E9|\u26F0|\u26F1|\u26F4|\u26F7|\u26F8|\u26F9|\u2702|\u2708|\u2709|\u270C|\u270D|\u270F|\u2712|\u2714|\u2716|\u271D|\u2721|\u2733|\u2734|\u2744|\u2747|\u2763|\u2764|\u27A1|\u2934|\u2935|\u2B05|\u2B06|\u2B07|\u3030|\u303D|\u3297|\u3299|\uD83C[\uDD70-\uDD71]|\uD83C[\uDD7E-\uDD7F]|\uD83C[\uDE02]|\uD83C[\uDE37]|\uD83C[\uDF21]|\uD83C[\uDF24-\uDF2C]|\uD83C[\uDF36]|\uD83C[\uDF7D]|\uD83C[\uDF96-\uDF97]|\uD83C[\uDF99-\uDF9B]|\uD83C[\uDF9E-\uDF9F]|\uD83C[\uDFCB-\uDFCE]|\uD83C[\uDFD4-\uDFDF]|\uD83C[\uDFF3]|\uD83C[\uDFF5]|\uD83C[\uDFF7]|\uD83D[\uDC3F]|\uD83D[\uDC41]|\uD83D[\uDCFD]|\uD83D[\uDD49-\uDD4A]|\uD83D[\uDD6F]|\uD83D[\uDD70]|\uD83D[\uDD73-\uDD79]|\uD83D[\uDD87]|\uD83D[\uDD8A-\uDD8D]|\uD83D[\uDD90]|\uD83D[\uDDA5]|\uD83D[\uDDA8]|\uD83D[\uDDB1]|\uD83D[\uDDB2]|\uD83D[\uDDBC]|\uD83D[\uDDC2-\uDDC4]|\uD83D[\uDDD1-\uDDD3]|\uD83D[\uDDDC-\uDDDE]|\uD83D[\uDDE1]|\uD83D[\uDDE3]|\uD83D[\uDDE8]|\uD83D[\uDDEF]|\uD83D[\uDDF3]|\uD83D[\uDDFA]|\uD83D[\uDECB]|\uD83D[\uDECD-\uDECF]|\uD83D[\uDEE0-\uDEE5]|\uD83D[\uDEE9]|\uD83D[\uDEF0]|\uD83D[\uDEF3]'

const emojiZwjElement = `(${emojiCharacter}|${variationSequence})(${emojiModifier}|${emojiPresentationSelector}${keycapSymbol}?|${tagSymbol}+${termTagSymbol}?)?`
const myRegExp = `${emojiFlagSequence}|${kVSequence}|${emojiZwjElement}(${zeroWidthJoiner}${emojiZwjElement})*`

/**
 * 识别 emoji 的正则
 * @param {string} modifier 正则修饰符，比如： 'g'
 * @returns 一段正则。
 */
export const getRegExpEmoji = (modifier?: string) => {
  const _reg = new RegExp(`${myRegExp}`, `${modifier || ''}`)
  return _reg
}

// 将表情 emoji 字符串转换为 Unicode 码点字符串
export function emojiToUnicode(emojiString) {
  let unicodeCodePoints = [] as any[]

  for (let i = 0; i < emojiString.length; i += 1) {
    let codePoint = emojiString.codePointAt(i)
    unicodeCodePoints.push(codePoint)

    // 注意：如果是一个辅助平面字符（surrogate pair），需要额外处理
    if (codePoint > 0xffff) {
      i += 1 // 跳过辅助平面的第二个单元
    }
  }

  // 将码点数组转换为十六进制形式
  let unicodeHex = unicodeCodePoints
    .map(codePoint => {
      /** 针对数字特殊表情符号编码第一位 unicode 会丢失前面的 0，此时长度为 2 需要补 0 */
      if (String(codePoint.toString(16)).length === 2) {
        return `00${codePoint.toString(16)}`
      }
      return codePoint.toString(16)
    })
    .join(' ')

  return unicodeHex
}
