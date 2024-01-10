import { useEffect, useState, useRef } from 'react'
import { getEmoticonsGroupJson } from '@/apis/emoticons'
import { Tabs, Typography } from '@nbit/arco'
import { title } from 'process'
import classNames from 'classnames'
import { oss_svg_image_domain_address } from '@/constants/oss'
import { useMessengerStore } from '@/store/messenger'
import { t } from '@lingui/macro'
import Styles from './index.module.css'
// eslint-disable-next-line no-alert
import emojiJson from './emoji.json'
import Icon from '../icon'
import LazyImage from '../lazy-image'

const TabPane = Tabs.TabPane

export type emoticonsTypes = {
  key: string
  icon: string
  title: string
  emojiGroupArray: any[]
}

const EmoticonsGroupMap = [
  /** 表情 */
  {
    key: 'Smileys & Emotion',
    icon: 'icon_chat_expression',
    title: t`components_emoticons_index_dsifphh5_r`,
  },
  /** 动物 */
  {
    key: 'Animals & Nature',
    icon: 'icon_chat_animal',
    title: t`components_emoticons_index_3szo7lzdvq`,
  },
  /** 食物和饮料 */
  {
    key: 'Food & Drink',
    icon: 'icon_chat_food',
    title: t`components_emoticons_index_b9cpjspep8`,
  },
  /** 活动 */
  {
    key: 'Activities',
    icon: 'icon_chat_activity',
    title: t`components_emoticons_index_xypcmhtwsi`,
  },
  /** 旅游 */
  {
    key: 'Travel & Places',
    icon: 'icon_chat_travel',
    title: t`components_emoticons_index_j1b6fvuas0`,
  },
  /** 物体 */
  {
    key: 'Objects',
    icon: 'icon_chat_object',
    title: t`components_emoticons_index_71th0oc0fp`,
  },
  /** 符号 */
  {
    key: 'Symbols',
    icon: 'icon_chat_symbol',
    title: t`components_emoticons_index_bfr7hhxdmr`,
  },
  /** 旗帜 */
  {
    key: 'Flags',
    icon: 'icon_chat_flag',
    title: t`components_emoticons_index_ofgvktagja`,
  },
]

/** 表情包 */
export default function Emoticons({ onChange }: { onChange: (emoji: emoticonsTypes) => void }) {
  const [selected, setselected] = useState<emoticonsTypes>()
  const emojiClick = emojiInfo => {
    setselected({ ...emojiInfo })
  }
  const EmoticonsGroupMap = [
    /** 表情 */
    {
      key: 'Smileys & Emotion',
      icon: 'icon_chat_expression1',
      title: t`components_emoticons_index_dsifphh5_r`,
    },
    /** 动物 */
    {
      key: 'Animals & Nature',
      icon: 'icon_chat_animal',
      title: t`components_emoticons_index_3szo7lzdvq`,
    },
    /** 食物和饮料 */
    {
      key: 'Food & Drink',
      icon: 'icon_chat_food',
      title: t`components_emoticons_index_b9cpjspep8`,
    },
    /** 活动 */
    {
      key: 'Activities',
      icon: 'icon_chat_activity',
      title: t`components_emoticons_index_xypcmhtwsi`,
    },
    /** 旅游 */
    {
      key: 'Travel & Places',
      icon: 'icon_chat_travel',
      title: t`components_emoticons_index_j1b6fvuas0`,
    },
    /** 物体 */
    {
      key: 'Objects',
      icon: 'icon_chat_object',
      title: t`components_emoticons_index_71th0oc0fp`,
    },
    /** 符号 */
    {
      key: 'Symbols',
      icon: 'icon_chat_symbol',
      title: t`components_emoticons_index_bfr7hhxdmr`,
    },
    /** 旗帜 */
    {
      key: 'Flags',
      icon: 'icon_chat_flag',
      title: t`components_emoticons_index_ofgvktagja`,
    },
  ]
  useEffect(() => {
    selected && onChange(selected)
  }, [selected])

  const [activeKey, setActiveKey] = useState<string>('Smileys & Emotion')
  const [emoticonsGroup, setEmoticonsGroup] = useState<emoticonsTypes[]>([])
  useEffect(() => {
    /** 进行表情组整合 */
    setEmoticonsGroup(
      EmoticonsGroupMap.reduce((prev, current) => {
        /** 表情符号与人物需要整合成一个表情集合 */
        let emojiGroupArray =
          current.key === 'Smileys & Emotion'
            ? [...emojiJson[current.key], ...emojiJson['People & Body']]
            : emojiJson[current.key]
        /** 需要根据 unicode 码进行排序 */
        emojiGroupArray = emojiGroupArray.sort((a, b) => {
          return a.glyph.localeCompare(b.glyph)
        })
        return [
          ...prev,
          {
            ...current,
            emojiGroupArray,
          },
        ]
      }, [] as emoticonsTypes[])
    )
  }, [])
  return (
    <div className={Styles.emoji}>
      <Tabs
        defaultActiveTab="Smileys & Emotion"
        onClickTab={e => {
          setActiveKey(e)
        }}
      >
        {emoticonsGroup.map(i => {
          return (
            <TabPane
              key={i.key}
              title={
                <Icon
                  className={classNames('title-icon', {
                    active: i.key === activeKey,
                  })}
                  name={i.icon}
                />
              }
            >
              <Typography.Paragraph>
                <div className="emoji-group">
                  <p className="title">{i.title}</p>
                  <div className="emoji-box">
                    {i?.emojiGroupArray?.map((item, index) => {
                      return (
                        <LazyImage
                          onClick={() => emojiClick(item)}
                          className="cursor-pointer"
                          key={index}
                          src={`${oss_svg_image_domain_address}emojis_3d/${item.file}`}
                        />
                      )
                    })}
                  </div>
                </div>
              </Typography.Paragraph>
            </TabPane>
          )
        })}
      </Tabs>
    </div>
  )
}
