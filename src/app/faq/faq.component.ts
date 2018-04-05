import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import {isPlatformBrowser, DOCUMENT} from '@angular/common';
import * as FAQpage from './faq.content.json';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  FAQ = [];
  activePanel = '';

  constructor( @Inject(PLATFORM_ID) private platform: any,
               @Inject(DOCUMENT) private doc: any) {
    this.FAQ = [].concat(FAQpage);
    this.activePanel = this.FAQ[0].section.id + '-' + this.FAQ[0].questions[0].id;
  }

  ngOnInit() {
  }
  setActivePanel( event ): void {
    this.activePanel = event['panelId'];
    this.goToTab(this.activePanel);
  }
  openTab( hash: string ): void {
    if ( isPlatformBrowser( this.platform ) ) {
      this.doc.getElementById(hash + '-header' ).getElementsByTagName('a')[0].click();
    }
  }
  setActiveTab( id ): void {
    this.FAQ.forEach( (faq, index, array) => {
      if ( id === faq.section.id ) {
        this.activePanel = id + '-' + faq.questions[0].id;
        this.goToTab(this.activePanel);
      }
    });
  }
  goToTab( hash ): void {
    if ( isPlatformBrowser( this.platform ) ) {
      setTimeout( () => {
        if ( window.innerWidth <= 1200 ) {
          const target = document.getElementById(hash + '-header');
          if (target) {
            target.scrollIntoView({block: 'start', behavior: 'smooth'});
          }
        }
      }, 200);
    }
  }
}
