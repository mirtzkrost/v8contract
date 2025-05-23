import { TextProps } from '@chakra-ui/react'

export type IFontesUiType = {
  fontFamily: TextProps['fontFamily']
  fontSize: TextProps['fontSize']
  fontWeight: TextProps['fontWeight']
  lineHeight: TextProps['lineHeight']
}

// Plus Jakarta Sans
const createFontStyle = (
  fontFamily: string,
  fontSize: string,
  fontWeight: 'light' | 'normal' | 'medium' | 'bold'
): IFontesUiType => ({
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight: 'auto',
})

const plusJakartaSizes = {
  xss: '8px',
  xs: '10px',
  sm: '12px',
  md: '14px',
  lg: '16px',
  XL: '18px',
  XL1: '20px',
  XL2: '24px',
  XL3: '28px',
  XL4: '34px',
  XL5: '48px',
}

export const textoXssLight = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.xss, 'light')
export const textoXssRegular = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.xss, 'normal')
export const textoXssMedium = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.xss, 'medium')
export const textoXssBold = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.xss, 'bold')

export const textoXsLight = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.xs, 'light')
export const textoXsRegular = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.xs, 'normal')
export const textoXsMedium = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.xs, 'medium')
export const textoXsBold = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.xs, 'bold')

export const textoSmLight = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.sm, 'light')
export const textoSmRegular = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.sm, 'normal')
export const textoSmMedium = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.sm, 'medium')
export const textoSmBold = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.sm, 'bold')

// md, lg, XL, XL1, XL2, XL3 e XL4
export const textoMdLight = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.md, 'light')
export const textoMdRegular = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.md, 'normal')
export const textoMdMedium = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.md, 'medium')
export const textoMdBold = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.md, 'bold')

export const textoLgLight = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.lg, 'light')
export const textoLgRegular = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.lg, 'normal')
export const textoLgMedium = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.lg, 'medium')
export const textoLgBold = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.lg, 'bold')

export const textoXLLight = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.XL, 'light')
export const textoXLRegular = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.XL, 'normal')
export const textoXLMedium = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.XL, 'medium')
export const textoXLBold = createFontStyle('Plus Jakarta Sans', plusJakartaSizes.XL, 'bold')


// Poppins

const poppinsSizes = plusJakartaSizes

export const textoXL1Light = createFontStyle('Poppins', poppinsSizes.XL1, 'light')
export const textoXL1Regular = createFontStyle('Poppins', poppinsSizes.XL1, 'normal')
export const textoXL1Medium = createFontStyle('Poppins', poppinsSizes.XL1, 'medium')
export const textoXL1Bold = createFontStyle('Poppins', poppinsSizes.XL1, 'bold')

export const textoXL2Light = createFontStyle('Poppins', poppinsSizes.XL2, 'light')
export const textoXL2Regular = createFontStyle('Poppins', poppinsSizes.XL2, 'normal')
export const textoXL2Medium = createFontStyle('Poppins', poppinsSizes.XL2, 'medium')
export const textoXL2Bold = createFontStyle('Poppins', poppinsSizes.XL2, 'bold')

export const textoXL3Light = createFontStyle('Poppins', poppinsSizes.XL3, 'light')
export const textoXL3Regular = createFontStyle('Poppins', poppinsSizes.XL3, 'normal')
export const textoXL3Medium = createFontStyle('Poppins', poppinsSizes.XL3, 'medium')
export const textoXL3Bold = createFontStyle('Poppins', poppinsSizes.XL3, 'bold')

export const textoXL4Light = createFontStyle('Poppins', poppinsSizes.XL4, 'light')
export const textoXL4Regular = createFontStyle('Poppins', poppinsSizes.XL4, 'normal')
export const textoXL4Medium = createFontStyle('Poppins', poppinsSizes.XL4, 'medium')
export const textoXL4Bold = createFontStyle('Poppins', poppinsSizes.XL4, 'bold')


export const textoXL5Light = createFontStyle('Poppins', poppinsSizes.XL5, 'light')
export const textoXL5Regular = createFontStyle('Poppins', poppinsSizes.XL5, 'normal')
export const textoXL5Medium = createFontStyle('Poppins', poppinsSizes.XL5, 'medium')
export const textoXL5Bold = createFontStyle('Poppins', poppinsSizes.XL5, 'bold')
