import React, { useState, ChangeEvent, useEffect, useRef } from 'react'
import Styles from './pay-password-component.module.css'

interface PayPasswordProps {
  onComplete: (password: string) => void
}

function PayPasswordComponent({ onComplete }: PayPasswordProps) {
  const [password, setPassword] = useState<string>('')
  const inputRefs: React.RefObject<HTMLInputElement>[] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const handleInputChange = (index: number, e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (!isNaN(Number(value)) && value.length <= 1) {
      setPassword(prev => {
        const newPassword = prev.split('')
        newPassword[index] = value
        return newPassword.join('').substr(0, 6)
      })
      // if (value !== '' && index < 5 && inputRefs[index + 1].current) {
      //   inputRefs[index + 1].current?.focus()
      // }
    }
  }

  const handleKeyDown = (index: number, e: any) => {
    if (e.key === 'Backspace' && index > 0 && !inputRefs[index].current?.value) {
      inputRefs[index - 1].current?.focus()
    } else if (e.key >= '0' && e.key <= '9' && index < 5 && !inputRefs[index + 1].current?.value) {
      inputRefs[index + 1].current?.focus()
    }
  }

  useEffect(() => {
    inputRefs[0].current?.focus() // 在组件加载时聚焦到第一个输入框
  }, [])

  useEffect(() => {
    onComplete(password)
  }, [password, onComplete])

  return (
    <div className={Styles.scoped}>
      {Array.from({ length: 6 }, (_, index) => (
        <input
          key={index}
          ref={inputRefs[index]}
          type="password"
          autoComplete="off"
          name="password"
          inputMode="numeric"
          value={password[index] || ''}
          onChange={e => handleInputChange(index, e)}
          onKeyDown={e => handleKeyDown(index, e)}
          maxLength={1}
        />
      ))}
    </div>
  )
}

export default PayPasswordComponent
