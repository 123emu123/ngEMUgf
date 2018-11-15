import { Component, OnInit, Input} from '@angular/core';
import { CategModel } from '../../shared/categ-model';


@Component({
  selector: 'app-categcard',
  templateUrl: './categcard.component.html',
  styleUrls: ['./categcard.component.css']
})
export class CategcardComponent implements OnInit {
  @Input() onecateg: CategModel;
 
  constructor() { }

  ngOnInit() {
  }

 
}

