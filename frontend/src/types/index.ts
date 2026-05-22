export interface Product {
    id: number
    name: string
    price: number
    stock: number
    barcode?: string
    createdAt?: string
    supplierId?: number
}

export interface CartItem {
    id: number
    name: string
    price: number
    quantity: number
}