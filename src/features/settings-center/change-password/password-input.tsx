import React, { useState } from 'react'
import Icon from '@/components/icon'
import Styles from './password-input.module.css'

interface InputProps {
  type: string
  rules?: RegExp
  errorText?: string
  placeholder?: string
  onChange: (value: string) => void
}

function PasswordInput({ type, rules, errorText, placeholder, onChange }: InputProps) {
  const [value, setValue] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isValid, setIsValid] = useState(true)
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value
    setValue(inputValue)
    onChange(inputValue) // 调用父组件传递的回调函数，并传递输入框的值
    if (rules && !rules.test(inputValue)) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  const handleInputBlur = () => {
    if (rules && !rules.test(value)) {
      setIsValid(false)
    } else {
      setIsValid(true)
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={Styles.scoped}>
      <div className={!isValid ? 'error-border password-input relative' : 'password-input relative'}>
        <input
          type={showPassword ? 'text' : type}
          value={value}
          autoComplete="off"
          onChange={handleInputChange}
          placeholder={placeholder}
        />
        <Icon
          name={showPassword ? 'icon_register_open' : 'icon_register_hide'}
          fontSize={22}
          className="password-icon text-icon_color"
          onClick={togglePasswordVisibility}
        />
        {!isValid && <div className="absolute left-0 bottom-0 text-[#b83434] errortxt">{errorText}</div>}
      </div>
    </div>
  )
}

export default PasswordInput
