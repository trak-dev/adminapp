export default class OrderModel {
    id?: number
    declare user_id: number
    declare basket_id: number
    declare address: string
    payed?: boolean
    delivered?: boolean
  }