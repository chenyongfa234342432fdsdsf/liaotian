const createImage = url =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', error => reject(error))
    image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
    image.src = url
  })

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 * @param {File} image - Image File url
 * @param {Object} pixelCrop - pixelCrop Object provided by react-easy-crop
 */
export default async function getCroppedImg(imageSrc, pixelCrop) {
  console.log(pixelCrop, '9999999999999')
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  canvas.width = pixelCrop.width
  canvas.height = pixelCrop.height
  const ctx: any = canvas.getContext('2d')

  ctx.fillStyle = '#000000'
  ctx.fillRect(0, 0, canvas.width, canvas.height)
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  )

  // As Base64 string
  // return canvas.toDataURL('image/jpeg');

  // As a blob
  return new Promise((resolve, reject) => {
    canvas.toBlob(file => {
      resolve(file)
      // resolve(URL.createObjectURL(file))
    }, 'image/jpeg')
  })
}

// export const createImage = (url: string): Promise<HTMLImageElement> =>
//   new Promise((resolve, reject) => {
//     const image = new Image()
//     image.addEventListener('load', () => resolve(image))
//     image.addEventListener('error', error => reject(error))
//     image.setAttribute('crossOrigin', 'anonymous')
//     image.src = url
//   })

// export function getRadianAngle(degreeValue) {
//   return (degreeValue * Math.PI) / 180
// }

// export function rotateSize(width, height, rotation) {
//   const rotRad = getRadianAngle(rotation)

//   return {
//     width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
//     height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
//   }
// }

// export default async function getCroppedImg(
//   imageSrc,
//   pixelCrop,
//   rotation = 0,
//   flip = { horizontal: false, vertical: false }
// ) {
//   const image: HTMLImageElement = await createImage(imageSrc)
//   const canvas = document.createElement('canvas')
//   const ctx = canvas.getContext('2d')

//   if (!ctx) {
//     return null
//   }

//   const rotRad = getRadianAngle(rotation)

//   const { width: bBoxWidth, height: bBoxHeight } = rotateSize(image.width, image.height, rotation)

//   canvas.width = bBoxWidth
//   canvas.height = bBoxHeight

//   ctx.translate(bBoxWidth / 2, bBoxHeight / 2)
//   ctx.rotate(rotRad)
//   ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1)
//   ctx.translate(-image.width / 2, -image.height / 2)

//   ctx.drawImage(image, 0, 0)

//   const croppedCanvas = document.createElement('canvas')

//   const croppedCtx = croppedCanvas.getContext('2d')

//   if (!croppedCtx) {
//     return null
//   }

//   croppedCanvas.width = pixelCrop.width
//   croppedCanvas.height = pixelCrop.height

//   croppedCtx.drawImage(
//     canvas,
//     pixelCrop.x,
//     pixelCrop.y,
//     pixelCrop.width,
//     pixelCrop.height,
//     0,
//     0,
//     pixelCrop.width,
//     pixelCrop.height
//   )

//   // As Base64 string
//   // return croppedCanvas.toDataURL('image/jpeg');

//   // As a blob
//   return new Promise((resolve, reject) => {
//     croppedCanvas.toBlob(file => {
//       console.log(file,'555555555')
//       resolve(file)
//    //   resolve(file ? URL.createObjectURL(file) : '')
//     }, 'image/jpeg')
//   })
// }
