import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../shared/services/inventory.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventory;
  user;
  currentItem;
  selectedItems = [];

  constructor(private inventoryService: InventoryService,
              private userService: UserService) {
    this.user = this.userService.getUser();
    this.inventoryService.getInventory(this.user.steamID).subscribe((inventory) => {
      this.inventory = inventory;
    });
    this.userService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  selectItem(item) {
    this.currentItem = item;
  }
  isItemSelected(item) {
    return this.selectedItems.indexOf(item) !== -1;
  }
  toggleItemInTrade(item) {
    if ( this.selectedItems.indexOf(item) !== -1 ) {
      this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    } else {
      this.selectedItems.push(item);
    }
  }
}
