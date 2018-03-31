import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../shared/services/inventory.service';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventory = {
    full: [],
    filtered: [],
    emptySlots: [],
    pages: {
      current: 1,
      total: 1,
      itemsPerPage: 36,
    },
  };
  user;
  currentItem;
  selectedItems = [];
  types = [];
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
              private formBuilder: FormBuilder,
              private sanitization: DomSanitizer) {
    this.user = this.userService.getUser();
    this.activatedRoute.params.subscribe((params) => {
      const game = !!params.game ? params.game : 'dota';
      this.currentPage = game;
      this.inventoryService.getInventory(this.user.steamID, game).subscribe((inventory) => {
        this.inventory.full = Object.values(inventory);
        this.inventory.filtered = Object.values(inventory);
        this.inventory.pages.current = 1;
        this.inventory.pages.total = Math.ceil(Object.values(inventory).length / this.inventory.pages.itemsPerPage);
        this.selectedItems = [];
        this.types = [];
        this.inventory.full.forEach(item => {
          const type = item.type.toLowerCase().replace('csgo', '').replace('type', '').replace('_', ' ').replace('_', ' ').trim();
          if ( this.types.indexOf(type) === -1 ) {
            this.types.push(type);
          }
        });
      });
    });
    this.userService.user.subscribe((user) => {
      this.user = user;
    });
    this.createSortingForm();
  }

  ngOnInit() {}

  sanitizeStyle(url) {
    return this.sanitization.bypassSecurityTrustStyle(`url(${url})`);
  }
  isCurrentPage(page): boolean {
    return this.currentPage === page;
  }

  selectItem(item): void {
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

  createSortingForm(): void {
    this.sortingForm = this.formBuilder.group({
      search: ['', Validators],
      type: ['all', Validators],
      sorting: ['n', Validators],
      selectAll: [false, Validators],
    });
  }
  filterInventory(): void {
    this.inventory.filtered = this.inventory.full.filter((item, index, array) => {
      const search = this.sortingForm.get('search').value.toLowerCase().trim();
      const type = item.type.toLowerCase().replace('csgo', '').replace('type', '').replace('_', ' ').replace('_', ' ').trim();
      return (this.sortingForm.get('type').value === 'all' || this.sortingForm.get('type').value === type) &&
             (this.sortingForm.get('search').value.length === 0 || item.name.toLowerCase().includes(search) );
    });
    this.sortInventory();
  }
  sortInventory(): void {
    const sorting = {
      key: this.sortingForm.get('sorting').value.split('-')[0],
      direction: this.sortingForm.get('sorting').value.split('-')[1],
    };
    this.inventory.pages.current = 1;
    this.inventory.pages.total = Math.ceil(this.inventory.filtered.length / this.inventory.pages.itemsPerPage);
    this.inventory.filtered.sort((a, b) => {
      a[sorting.key] = !isNaN(a[sorting.key]) ? parseFloat(a[sorting.key]) : a[sorting.key];
      b[sorting.key] = !isNaN(b[sorting.key]) ? parseFloat(b[sorting.key]) : b[sorting.key];
      if ( sorting.direction === 'desc' ) {
        if (a[sorting.key] < b[sorting.key]) { return 1; }
        if (a[sorting.key] > b[sorting.key]) { return -1; }
        if (a.n > b.n) {
            return 1;
        } else {
            return -1;
        }
      } else {
        if (a[sorting.key] > b[sorting.key]) { return 1; }
        if (a[sorting.key] < b[sorting.key]) { return -1; }
        if (a.n > b.n) {
            return 1;
        } else {
            return -1;
        }
      }
    });
  }
  selectAll(): void {
    if ( this.selectedItems.length === this.inventory.filtered.length ) {
      this.sortingForm.get('selectAll').setValue(false);
      this.selectedItems = [];
    } else {
      this.sortingForm.get('selectAll').setValue(true);
      this.selectedItems = [].concat(this.inventory.filtered);
    }
  }

  nextPage(): void {
    const es = this.inventory.pages.itemsPerPage - (this.inventory.filtered.length % this.inventory.pages.itemsPerPage);
    this.inventory.emptySlots = this.inventory.pages.current >= this.inventory.pages.total - 1
                                ? new Array(es)
                                : [];
    this.inventory.pages.current = this.inventory.pages.current !== this.inventory.pages.total
                                   ? this.inventory.pages.current + 1
                                   : this.inventory.pages.total;
  }
  prevPage(): void {
    this.inventory.emptySlots = [];
    this.inventory.pages.current = this.inventory.pages.current !== 1
                                   ? this.inventory.pages.current - 1
                                   : 1;
  }

  totalCash(): number {
    let total = 0;
    this.selectedItems.map( (item) => {
      total += parseFloat(item.price);
    });
    return total / 100;
  }
}
