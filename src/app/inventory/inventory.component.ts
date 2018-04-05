import { Component, OnInit } from '@angular/core';
import { InventoryService } from '../shared/services/inventory.service';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {
  inventory = {
    full: [],
    filtered: [],
    emptySlots: Array(36),
    notTradable: 0,
    pages: {
      current: 1,
      itemsPerPage: 36,
      total: 1,
    },
    loading: true,
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
    this.createSortingForm();
    this.refreshInventory();
    this.userService.user.subscribe((user) => {
      this.user = user;
    });
  }

  ngOnInit() {}

  sanitizeStyle(url): SafeStyle {
    return this.sanitization.bypassSecurityTrustStyle(`url(${url})`);
  }
  isCurrentPage(page): boolean {
    return this.currentPage === page;
  }
  refreshInventory(): void {
    this.inventory.loading = true;
    this.activatedRoute.params.subscribe((params) => {
      const game = !!params.game ? params.game : 'dota';
      this.currentPage = game;
      this.inventoryService.getInventory(this.user.steamID, game).subscribe((inventory) => {
        let notTradable = 0;
        inventory = Object.values(inventory).filter((item) => {
          if ( !(item.tradable && item.price > 0) ) { notTradable = notTradable + 1; }
          return item.tradable && item.price > 0;
        });
        this.inventory = {
          full: Object.values(inventory),
          filtered: Object.values(inventory),
          notTradable: notTradable,
          pages: {
            current: 1,
            itemsPerPage: this.inventory.pages.itemsPerPage,
            total: Math.ceil(Object.values(inventory).length / this.inventory.pages.itemsPerPage),
          },
          emptySlots: [],
          loading: true,
        };
        this.fillEmptySlots();
        this.selectedItems = [];
        this.types = [];
        this.inventory.full.forEach(item => {
          if ( item.type ) {
            const type = item.type.toLowerCase().replace('csgo', '').replace('type', '').replace('_', ' ').replace('_', ' ').trim();
            if ( this.types.indexOf(type) === -1 ) {
              this.types.push(type);
            }
          }
        });
        this.filterInventory();
        this.inventory.loading = false;
      });
    });
  }

  selectItem(item): void {
    this.currentItem = item;
  }
  isItemSelected(item): boolean {
    return this.selectedItems.indexOf(item) !== -1;
  }
  toggleItemInTrade(item): void {
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
    this.fillEmptySlots();
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

  fillEmptySlots(): void {
    let es = this.inventory.pages.itemsPerPage - this.inventory.filtered.slice(
      ( this.inventory.pages.current - 1 ) * this.inventory.pages.itemsPerPage,
      this.inventory.pages.current * this.inventory.pages.itemsPerPage
    ).length;
    if ( this.inventory.pages.current === this.inventory.pages.total ) { es--; }
    this.inventory.emptySlots = new Array(es);
  }
  nextPage(): void {
    this.inventory.pages.current = this.inventory.pages.current !== this.inventory.pages.total
                                   ? this.inventory.pages.current + 1
                                   : this.inventory.pages.total;
    this.fillEmptySlots();
  }
  prevPage(): void {
    this.inventory.pages.current = this.inventory.pages.current !== 1
                                   ? this.inventory.pages.current - 1
                                   : 1;
    this.fillEmptySlots();
  }

  totalCash(): number {
    let total = 0;
    this.selectedItems.map( (item) => {
      total += parseFloat(item.price);
    });
    return total / 100;
  }
}
