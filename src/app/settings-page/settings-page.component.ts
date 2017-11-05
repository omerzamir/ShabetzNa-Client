import { Component } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { UserService } from '../_services/index';

@Component({
  selector: 'app-settings-page',
  templateUrl: './settings-page.component.html',
  styleUrls: ['./settings-page.component.css'],
  providers: [UserService]
})
export class SettingsPageComponent {
  userSearch: FormControl;
  users = [];
  soldiers = [];
  filteredUsers = [];
  constructor(private userService: UserService, ) {
    this.userSearch = new FormControl;
    this.users = this.userService.getAllUsers();
    this.filteredUsers = this.users;
    // TODO: need to be implemented after the user login will be implemented
    this.soldiers = [];
  }

  onSubmit(f: NgForm): void {
    this.addSoldier();
  }

  filterUsers(val: string) {
    if (val) {
      const filterValue = val.toLowerCase();
      return this.users.filter(user => user.hierarchy.join('/').toLowerCase().includes(filterValue));
    }
    return this.users;
  }

  addSoldier() {
    const soldier = this.users.find(val => val.userName == this.userSearch.value);
    this.filteredUsers = this.filteredUsers.filter(val => val.userName != this.userSearch.value);
    this.soldiers.push(soldier);
    this.userSearch.setValue(undefined);
  }

  remove(soldier) {
    let toPushBack = [];

    // Remove the soldier from the chosens;
    this.soldiers = this.soldiers.filter(val => {
      if (val.userName != soldier.userName) {
        toPushBack.push(val);
        return true;
      }
      return false;
    });

    // Push it back to the searchable array.
    toPushBack.forEach(val => {
      this.filteredUsers.push(val);
    });

  }
}
