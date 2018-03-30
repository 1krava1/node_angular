import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../shared/services/inventory.service';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

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
  sortingForm: FormGroup;

  constructor(private inventoryService: InventoryService,
              private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder) {
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
    this.createSortingForm();
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

  createSortingForm(): void {
    this.sortingForm = this.formBuilder.group({
      search: ['', Validators],
      type: ['', Validators],
      sorting: ['default', Validators],
      selectAll: [false, Validators],
    });
  }
  filterInventory(): void {
    this.inventory.sort(function (a, b) {
      if ( this.sortingForm.get('sorting').value === 'price-asc' ) {
        if (a['price'] > b['price']) { return 1; }
        if (a['price'] < b['price']) { return -1; }
        if (a.id > b.id) {
            return 1;
        } else {
            return -1;
        }
      } else if ( this.sortingForm.get('sorting').value === 'price-desc' ) {
        if (a['price'] < b['price']) { return 1; }
        if (a['price'] > b['price']) { return -1; }
        if (a.id > b.id) {
            return 1;
        } else {
            return -1;
        }
      }
    });
  }
}
