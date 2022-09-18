import { Pipe, PipeTransform } from '@angular/core';
import {AccountsService } from '../services/accounts/accounts.service';

@Pipe({
  name: 'userIdToUser'
})
export class UserIdToUserPipe implements PipeTransform {

  constructor(private _account: AccountsService) {}

  async transform(user_id: number, ...args: unknown[]) {
    const user = await this._account.getUserById(user_id);
    if (user) return user.email;
    return user_id;
  }

}
