import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../shared/services/inventory.service';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';

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
  currentPage = 'dota';
  routes = [
    {
      link: 'dota',
      name: 'Dota',
    },
    {
      link: 'csgo',
      name: 'CS:GO',
    },
    {
      link: 'pubg',
      name: 'Pubg',
    },
  ];

  constructor(private inventoryService: InventoryService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute) {
    this.user = this.userService.getUser();
    this.activatedRoute.params.subscribe((params) => {
      const game = !!params.game ? params.game : 'dota';
      this.currentPage = game;
      this.inventoryService.getInventory(this.user.steamID, game).subscribe((inventory) => {
        this.inventory = inventory;
      });
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

  isCurrentPage(page): boolean {
    return this.currentPage === page;
  }
}
