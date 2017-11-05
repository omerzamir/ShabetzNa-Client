import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  show: boolean = false;
  stateCtrl: FormControl;
  filteredStates: Observable<any[]>;
  constructor() { }

  ngOnInit() {
  }

  toggle() {
    this.show = !this.show;
  }

  filterStates(name: string) {
    return "";
  }

}
