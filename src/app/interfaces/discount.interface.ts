export interface Discount {
    id: string
    code: string
    value: number
    type: string
    isActive: boolean
    remaining: number
    expiresAt: string
    createdAt: string
    updatedAt: string
}