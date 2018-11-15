import { Component, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/shared/recipe-model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Location } from '@angular/common';
import { CategModel } from 'src/app/shared/categ-model';
import { CategService } from 'src/app/shared/categ.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe : RecipeModel;
  categs: CategModel[];
  isCateg: boolean;
  categ: CategModel; //ez kell a html-ben a categ létezésekor hogy meg tudja adni a select boxban már beállítottként ---- nem müxik
  recId: number; //a creat és az update ág miatt
    
  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService, 
              private router: Router,
              private location: Location,
              private categService: CategService) {    }

  ngOnInit() {
    this.recipe = new RecipeModel(RecipeModel.emptyRecipe); 
    const catId = +this.route.snapshot.parent.params['cid'];
    this.recId = +this.route.snapshot.params['rid'];
    this.categs = this.categService.getAllCategs();

    if (catId) {
      this.isCateg = true;
      this.categ = this.categService.getCategById(catId);
    } else {
      this.isCateg = false;
    }   
  }

  onSubmit() {
    console.log("ez a recipe ami megy = ",this.recipe);
    if (this.recId) {
      this.recipeService.update(this.recipe);
    } else {
      this.recipeService.create(this.recipe);
    }
    this.router.navigate([this.recipe.categId,'recipe']);
  }

  gotoback() {
    this.location.back();
  }
}
