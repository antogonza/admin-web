export interface Local {
    id: number
    name: string
    isOpen: boolean
    deliveryPrice: number
    extraPrice: number
    freeShipping: number
    timePerProduct: number
    deliveryTime: number
    minDeliveryTime: number
    differenceHours: number
    firstDeliver: string
    localType: string[]
    userId: string
}
