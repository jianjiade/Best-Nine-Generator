/**
 * Maximum output size for cropped images (to prevent memory issues)
 */
const MAX_OUTPUT_SIZE = 800;

/**
 * Creates an image object from a source URL
 */
export const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image()
    image.addEventListener('load', () => resolve(image))
    image.addEventListener('error', (error) => reject(error))
    // Only set crossOrigin for external URLs, not for base64 data URLs
    if (!url.startsWith('data:')) {
      image.setAttribute('crossOrigin', 'anonymous')
    }
    image.src = url
  })

/**
 * Returns the new data URL of a cropped image (with size limiting)
 */
export async function getCroppedImg(
  imageSrc: string,
  pixelCrop: { x: number; y: number; width: number; height: number }
): Promise<string> {
  const image = await createImage(imageSrc)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')

  if (!ctx) {
    throw new Error('No 2d context')
  }

  // Calculate output size (limit to MAX_OUTPUT_SIZE to prevent memory issues)
  let outputWidth = pixelCrop.width
  let outputHeight = pixelCrop.height
  
  if (outputWidth > MAX_OUTPUT_SIZE || outputHeight > MAX_OUTPUT_SIZE) {
    const scale = MAX_OUTPUT_SIZE / Math.max(outputWidth, outputHeight)
    outputWidth = Math.round(outputWidth * scale)
    outputHeight = Math.round(outputHeight * scale)
  }

  // set canvas size to the limited output size
  canvas.width = outputWidth
  canvas.height = outputHeight

  // draw the image with scaling
  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    outputWidth,
    outputHeight
  )

  // As Base64 string with compression
  return canvas.toDataURL('image/jpeg', 0.85)
}