export interface go {
  "service": {
    "ClientService": {
		CreateClient(arg1:Client):Promise<Client>
		GetClients():Promise<Array<Client>>
		GetClientsByIdentification(arg1:number,arg2:number,arg3:string):Promise<Array<Client>>
		GetClientsByName(arg1:number,arg2:number,arg3:string):Promise<Array<Client>>
		GetClientsList(arg1:number,arg2:number):Promise<Array<Client>>
		UpdateClient(arg1:Client):Promise<Client>
    },
    "OrderService": {
		CreateOrder(arg1:Order,arg2:boolean):Promise<Order>
		GetNextOrderIdentifier():Promise<number>
		GetOrderByClientName(arg1:string,arg2:number,arg3:number):Promise<Array<Order>>
		GetOrderByIdentifier(arg1:string,arg2:number,arg3:number):Promise<Array<Order>>
		GetOrdersList(arg1:number,arg2:number):Promise<Array<Order>>
		ListOrdersByRange(arg1:string,arg2:string,arg3:number,arg4:number,arg5:string):Promise<OrderPagination>
		SetOrderDateAt(arg1:UUID,arg2:string,arg3:string):Promise<Order>
    },
    "PriceService": {
		CreatePrice(arg1:Price):Promise<Price>
		DeletePrice(arg1:UUID):Promise<boolean>
		GetPrices():Promise<Array<Price>>
		GetPricesByCategory(arg1:number,arg2:number,arg3:string):Promise<Array<Price>>
		GetPricesList(arg1:number,arg2:number):Promise<Array<Price>>
		UpdatePrice(arg1:Price):Promise<Price>
    },
  }

}

declare global {
	interface Window {
		go: go;
	}
}
