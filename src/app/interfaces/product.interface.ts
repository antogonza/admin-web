export interface Product {
    id: string
    photo?: string
    name: string
    ingredients: string
    isMultiSize: boolean
    stock: number
    priceBig: number
    priceMedium: number
    priceSmall: number
    discount: number
    type: string
    available: boolean
    createdAt: string
    updatedAt: string
}