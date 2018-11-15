import { Component, OnInit } from '@angular/core';
import { RecipeService } from 'src/app/shared/recipe.service';
import { RecipeModel } from 'src/app/shared/recipe-model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  public recipesByCat: RecipeModel[];
    
  constructor(private recipeService: RecipeService, private route: ActivatedRoute) { 
    const catId = +this.route.snapshot.parent.params['cid'];
    this.recipesByCat = this.recipeService.getAllRecipesByCategId(catId);
  }

  ngOnInit() {
   
  }

}
