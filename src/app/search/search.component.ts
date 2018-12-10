import { Component, OnInit } from '@angular/core';
import { CategService } from '../shared/categ.service';
import { CategModel } from '../shared/categ-model';
import { Observable } from 'rxjs';
import { SubcategModel } from '../shared/subcateg-model';
import { RecipeModel } from '../shared/recipe-model';
import { concat } from 'rxjs/operators';
import { RecipeService } from '../shared/recipe.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public categs$: Observable<CategModel[]>;
  public categs: CategModel[];

  public subcategs$: Observable<SubcategModel[]>;
  public subcategs: SubcategModel[];

  private categsSelected: Array<CategModel>=[];
  private subcategsSelected: Array<string>=[];
  public subcategsAll: Array<SubcategModel>=[];
  public recipesSelected: Array<RecipeModel>=[];

  constructor(private categService: CategService, private recipeService: RecipeService) { }

  ngOnInit() {
    this.categService.getAllCategs().subscribe(m => this.categs=m);
  }

  selectCat(event, val) {
    this.subcategsAll = [];
    if(event.target.checked === true) {
      this.categsSelected.push(val);
    } else {
      var index = this.categsSelected.indexOf(val);
      this.categsSelected.splice(index, 1);
    }
    this.categsSelected.map((id) => this.categService.getSubcategsByCategId(id).subscribe( cm => {this.subcategsAll = this.subcategsAll.concat(cm)}));
  }

  selectSubCat(event, val) {
    console.log("categs selected = ", this.categsSelected);
    this.recipesSelected = [];
    if(event.target.checked === true) {
      this.subcategsSelected.push(val);
    } else {
      var index = this.subcategsSelected.indexOf(val);
      this.subcategsSelected.splice(index, 1);
    }
    console.log("subcategs selected = ", this.subcategsSelected);

    this.subcategsSelected.map((id) => this.recipeService.getRecipesBySubcategId(id).subscribe( cm => {this.recipesSelected = this.recipesSelected.concat(cm)}));
  }
}
