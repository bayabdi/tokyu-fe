export function splitName (name) {
  if (!name) {
    return {
      surname: null,
      firstName: null
    }
  }

  // eslint-disable-next-line no-irregular-whitespace
  const split = name.split(/[ 　]/)
  return {
    surname: split[0],
    firstName: split.slice(1).join(' ')
  }
}

const prefectures = [
  '北海道',
  '青森県',
  '岩手県',
  '宮城県',
  '秋田県',
  '山形県',
  '福島県',
  '茨城県',
  '栃木県',
  '群馬県',
  '埼玉県',
  '千葉県',
  '東京都',
  '神奈川県',
  '新潟県',
  '富山県',
  '石川県',
  '福井県',
  '山梨県',
  '長野県',
  '岐阜県',
  '静岡県',
  '愛知県',
  '三重県',
  '滋賀県',
  '京都府',
  '大阪府',
  '兵庫県',
  '奈良県',
  '和歌山県',
  '鳥取県',
  '島根県',
  '岡山県',
  '広島県',
  '山口県',
  '徳島県',
  '香川県',
  '愛媛県',
  '高知県',
  '福岡県',
  '佐賀県',
  '長崎県',
  '熊本県',
  '大分県',
  '宮崎県',
  '鹿児島県',
  '沖縄県'
]
export function getPrefectureFromAddress (address) {
  if (!address) return ''
  for (const pref of prefectures) {
    if (address.includes(pref)) return pref
  }
  return ''
}

export function getLocalityFromAddress (address) {
  if (!address) return ''
  for (const pref of prefectures) {
    const ind = String(address).indexOf(pref)
    if (ind >= 0) {
      const rest = address.slice(ind + pref.length)
      // eslint-disable-next-line no-irregular-whitespace
      const match = /^[ 　]?([^ 　]+[市区町村郡])/.exec(rest)
      return match[1] ?? ''
    }
  }
  return ''
}
