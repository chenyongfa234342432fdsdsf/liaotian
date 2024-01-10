import { waveHeightArr } from '@/helper/message'
import classNames from 'classnames'

type IAudioProgressProps = {
  /** 当前秒数 */
  current: number
  total: number
  inActiveClassName?: string
  /** 高度缩放系数，默认为 1，波浪最高处为 15.4 px */
  waveHeightScale?: number
}
export function AudioProgress({
  current,
  waveHeightScale = 1,
  total,
  inActiveClassName = 'bg-card_bg_color_02',
}: IAudioProgressProps) {
  const list = [...waveHeightArr]
  return (
    <div className="flex items-center">
      {list.map((height, index) => {
        const isCurrent = index / list.length < current / total
        return (
          <div
            style={{
              height: `${height * waveHeightScale}px`,
            }}
            // 未播放的时候认为全部活跃
            className={classNames(
              'w-px mr-px rounded-sm',
              isCurrent || current === 0 ? 'bg-brand_color' : inActiveClassName
            )}
            key={index}
          ></div>
        )
      })}
    </div>
  )
}
