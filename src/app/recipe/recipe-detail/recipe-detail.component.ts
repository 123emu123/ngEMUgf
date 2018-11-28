import { Component, OnInit } from '@angular/core';
import { RecipeModel } from 'src/app/shared/recipe-model';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { Location } from '@angular/common';
import { CategModel } from 'src/app/shared/categ-model';
import { CategService } from 'src/app/shared/categ.service';
import { Observable } from 'rxjs';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {  
  recipe : RecipeModel;
  isCateg: boolean;
  recId: string; 
  public categs$: Observable<CategModel[]>;

  constructor(private route: ActivatedRoute, 
              private recipeService: RecipeService, 
              private router: Router,
              private location: Location,
              private categService: CategService) {    }

  ngOnInit() {
    const catId = this.route.snapshot.parent.params['cid'];
    this.recId = this.route.snapshot.params['rid'];
    this.categs$ = this.categService.getAllCategs();

    if (this.recId) {
      this.recipeService.getRecipeById(this.recId)
        .subscribe( recm => this.recipe = recm);
    } else {
      this.recipe = new RecipeModel();
    }

    if (catId) {
      this.isCateg = true;
      this.recipe.categId = catId;
    } else {
      this.isCateg = false;
      this.recipe.categId='0';
    }   
  }

  onSubmit(f:NgForm) {
    if (this.recId) {
      this.recipeService.update(this.recId, f.value.name, f.value.categId, f.value.ingred, f.value.descript, f.value.picURL)
        .subscribe(
          (r: RecipeModel) => {
            this.router.navigate([r.categId,'recipe',r.id,'read']);
          },
          err => console.warn('hiba', err)
        )
    } else {
      this.recipeService.create(f.value.name, f.value.categId, f.value.ingred, f.value.descript, f.value.picURL)
        .subscribe(
          (r: RecipeModel) => {
            this.router.navigate([r.categId,'recipe',r.id,'read']);
          },
          err => console.warn('hiba', err)
        )
    }
  }

  gotoback() {
    this.location.back();
  }
}
