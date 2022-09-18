import { Component, OnInit } from '@angular/core';
import { itemsService } from 'src/app/services/items/items.service';
import ItemModel from 'src/app/models/item.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  items : ItemModel[] = [];
  newItem : ItemModel = new ItemModel();

  isEditing = 0;
  constructor(private _item: itemsService, private _toaster: ToastrService, private _confirmation: ConfirmationService) { }

  async ngOnInit() {
    try {
      const items = await this._item.getItems();
      this.items = items;
      console.log(this.items);
    } catch (error) {
      console.error(error);
      this._toaster.error('Erreur', 'Erreur');
    }
  }

  async updateItem(item: ItemModel) {
    try {
      // await this._item.updateItem(item);
      this.isEditing = 0;
      this._toaster.success('Item modifié', 'Succès');
    } catch (error) {
      console.error(error);
      this._toaster.error('Erreur', 'Erreur');
    }
  }

  async addItem() {
    try {
      await this._item.addItem(this.newItem);
      this.items.push(this.newItem);
      this.newItem = new ItemModel();
      this._toaster.success('Item ajouté', 'Succès');
    } catch (error) {
      console.error(error);
      this._toaster.error('Erreur', 'Erreur');
    }
  }

}
