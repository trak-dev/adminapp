import { Component, OnInit } from '@angular/core';
import { OrdersService } from 'src/app/services/orders/orders.service';
import OrderModel from 'src/app/models/order.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders : OrderModel[] = [];
  constructor(private _order: OrdersService, private _toaster: ToastrService, private _confirmation: ConfirmationService) { }

  async ngOnInit() {
    try {
      const orders = await this._order.getOrders();
      this.orders = orders;
      console.log(this.orders);
    } catch (error) {
      console.error(error);
      this._toaster.error('Erreur', 'Erreur');
    }
  }

  confirm(orderId: number) {
    this._confirmation.confirm({
      message: 'Etes vous sur de vouloir supprimer cet commande ?',
      accept: () => {
          this.deleteOrder(orderId)
      }, 
    });
  }

  async deleteOrder(orderId: number) {
    try {
      await this._order.deleteOrder(orderId);
      this.orders = this.orders.filter(order => order.id !== orderId);
      this._toaster.success('Commande supprimée', 'Succès');
    } catch (error) {
      console.error(error);
      this._toaster.error('Erreur', 'Erreur');
    }
  }

  async deliverOrder(orderId: number) {
    try {
      await this._order.deliverOrder(orderId);
      this.orders = this.orders.map(order => {
        if (order.id === orderId) {
          order.delivered = true;
        }
        return order;
      });
      this._toaster.success('Commande livrée', 'Succès');
    } catch (error) {
      console.error(error);
      this._toaster.error('Erreur', 'Erreur');
    }
  }

}