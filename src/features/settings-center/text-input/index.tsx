import React, { useState, useRef, useEffect, CSSProperties } from 'react'
import Icon from '@/components/icon'
import Styles from './index.module.css'

interface TextInputProps {
  label: string
  maxLength: number
  editable: boolean
  onConfirm?: (value: string) => void
  defaultValue?: string
  placeholder?: string
  style?: CSSProperties
  className?: string
}

function TextInput({
  label,
  maxLength,
  editable,
  onConfirm,
  defaultValue,
  placeholder,
  style,
  className,
}: TextInputProps) {
  const [inputText, setInputText] = useState(defaultValue || '')
  const [showEdit, setShowEdit] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setInputText(defaultValue || '')
  }, [defaultValue])

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (editable) {
      setInputText(event.target.value)
    }
  }
  const handleConfirmClick = () => {
    onConfirm && onConfirm(inputText)
    setShowEdit(false)
  }

  const handleIconClick = () => {
    setShowEdit(true)
  }
  useEffect(() => {
    if (showEdit && inputRef.current) {
      inputRef.current.focus()
    }
  }, [showEdit])

  return (
    <div className={`${Styles.scoped} ${className}`} style={style}>
      <p className="input-label">{label}</p>
      {showEdit && (
        <div className="enter-box">
          <input
            type="text"
            className="enter-input"
            value={inputText}
            ref={inputRef}
            onChange={handleInputChange}
            maxLength={maxLength}
            placeholder={placeholder}
          />
          <span className="max-num">{maxLength - inputText.length}</span>
          <div className="icon-box" onClick={handleConfirmClick}>
            <Icon name="icon_chat_unread" fontSize={24} className="modify-icon" />
          </div>
        </div>
      )}
      {!showEdit && (
        <div className="input-box">
          {inputText ? (
            <span className="inputvalue">{inputText}</span>
          ) : (
            <span className="tipvalue">{placeholder}</span>
          )}
          {editable && (
            <div className="icon-box" onClick={handleIconClick}>
              <Icon name="icon_register_edit" fontSize={24} className="modify-icon" />
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TextInput
