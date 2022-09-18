import { Component, OnInit } from '@angular/core';
import { AccountsService } from 'src/app/services/accounts/accounts.service';
import UserModel from 'src/app/models/user.model';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationService } from 'primeng/api';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  users : UserModel[] = [];

  constructor(private _account: AccountsService, private _toaster: ToastrService, private _confirmation: ConfirmationService) { }

  async ngOnInit() {
    try {
      const users = await this._account.getUsers();
      this.users = users;
    } catch (error) {
      console.error(error);
      this._toaster.error('Erreur', 'Erreur');
    }
  }

  confirm(userId: string) {
      this._confirmation.confirm({
        message: 'Etes vous sur de vouloir supprimer cet utilisateur ?',
        accept: () => {
            this.deleteUser(userId)
        }, 
    });
  }

  async deleteUser(userId: string) {
    try {
      await this._account.deleteUser(userId);
      this.users = this.users.filter(user => user.id !== parseInt(userId));
      this._toaster.success('Utilisateur supprimé', 'Succès');
    } catch (error) {
      console.error(error);
      this._toaster.error('Erreur', 'Erreur');
    }
  }

  async setAdmin(userId: string) {
    try {
      await this._account.setAdmin(userId);
      this.users = this.users.map(user => {
        if (user.id === parseInt(userId)) {
          user.isadmin = !user.isadmin;
        }
        return user;
      });
      this._toaster.success('Changement du statut de l utilisateur', 'Succès');
    } catch (error) {
      console.error(error);
      this._toaster.error('Erreur', 'Erreur');
    }
  }
}