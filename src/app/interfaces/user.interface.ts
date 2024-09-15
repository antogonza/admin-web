export interface User {
    id: string
    name: string
    surname: string
    email: string
    password: string
    phone: string
    confirmed: boolean
    notificationToken: string[]
    rol: string
    isActive: boolean
}