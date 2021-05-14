import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-small-toolbar',
  templateUrl: './small-toolbar.component.html',
  styleUrls: ['./small-toolbar.component.scss']
})
export class SmallToolbarComponent implements OnInit {
  @Input() color: string;
  constructor() { }

  ngOnInit(): void {

  }

}
