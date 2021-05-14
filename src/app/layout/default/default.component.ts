import { Component, OnInit } from '@angular/core';
import {Select} from '../../decorators/select.decorator';
import {Observable} from 'rxjs';
import {IAuthUser} from '../../state/app.state';

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.scss']
})
export class DefaultComponent implements OnInit {

  constructor(

  ) { }

  ngOnInit(): void {
  }



}
