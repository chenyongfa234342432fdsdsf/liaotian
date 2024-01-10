import React, { useImperativeHandle, forwardRef } from 'react'
import QRCode from 'qrcode.react'
import html2canvas from 'html2canvas'

type props = {
  value: string
}
const PersonalQrcode = forwardRef((props: props, ref) => {
  const qrCodeRef = React.useRef(null)

  useImperativeHandle(ref, () => ({
    downloadQRCode: () => {
      if (qrCodeRef.current) {
        html2canvas(qrCodeRef.current).then(canvas => {
          const qrCodeDataURL = canvas.toDataURL('image/png')
          const a = document.createElement('a')
          a.href = qrCodeDataURL
          a.download = 'qrcode.png'
          a.click()
        })
      }
    },
  }))

  return (
    <div ref={qrCodeRef}>
      <QRCode value={props.value} size={260} />
    </div>
  )
})

export default PersonalQrcode
