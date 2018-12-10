import { Component, OnInit, Input } from '@angular/core';
import { CategModel } from 'src/app/shared/categ-model';
import { SubcategModel } from 'src/app/shared/subcateg-model';

@Component({
  selector: 'app-search-subcateg',
  templateUrl: './search-subcateg.component.html',
  styleUrls: ['./search-subcateg.component.css']
})
export class SearchSubcategComponent implements OnInit {
  @Input() categs: CategModel[];
  @Input() onesubcategs: SubcategModel[];

  constructor() { }

  ngOnInit() { }

}


