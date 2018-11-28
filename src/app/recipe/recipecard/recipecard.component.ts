import { Component, OnInit, Input } from '@angular/core';
import { RecipeModel } from 'src/app/shared/recipe-model';

@Component({
  selector: 'app-recipecard',
  templateUrl: './recipecard.component.html',
  styleUrls: ['./recipecard.component.css']
})
export class RecipecardComponent implements OnInit {
  @Input() onerecipe: RecipeModel;
  constructor() {}

  ngOnInit() {
  console.log("ez az onerecipe : ", this.onerecipe);
  }
 
}
