export interface Order {
    id: string
    totalAmmount: number
    totalItems: number
    status: string
    paid: boolean
    paidAt?: string
    paidType: string
    scheduleDelivery: string
    estimatedTime: string
    stripeChargeId: any
    pickUp: boolean
    discountCode: any
    discountedPrice: number
    userId: string
    addressId: string
    createdAt: string
    updatedat: string
    OrderItem: OrderItem[]
}

export interface OrderItem {
    productId: string
    price: number
    quantity: number
    size?: string
    hasExtra: boolean
    extraIngredient: any
    comment: any
    id: string
    isMultiFlavour: boolean
}

export function mapJsonToOrder(json: any): Order {
    return {
        id: json.id,
        totalAmmount: json.totalAmmount,
        totalItems: json.totalItems,
        status: json.status,
        paid: json.paid,
        paidAt: json.paidAt,
        paidType: json.paidType,
        scheduleDelivery: json.scheduleDelivery,
        estimatedTime: json.estimatedTime,
        stripeChargeId: json.stripeChargeId,
        pickUp: json.pickUp,
        discountCode: json.discountCode,
        discountedPrice: json.discountedPrice,
        userId: json.userId,
        addressId: json.addressId,
        createdAt: json.createdAt,
        updatedat: json.updatedat,
        OrderItem: [] // Suponiendo que en este caso está vacío, lo puedes modificar según sea necesario
    };
}