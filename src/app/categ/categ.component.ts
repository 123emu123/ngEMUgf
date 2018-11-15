import { Component, OnInit } from '@angular/core';
import { CategService } from '../shared/categ.service';
import { CategModel } from '../shared/categ-model';
import { RecipeModel } from '../shared/recipe-model';
import { RecipeService } from '../shared/recipe.service';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-categ',
  templateUrl: './categ.component.html',
  styleUrls: ['./categ.component.css']
})
export class CategComponent implements OnInit {
  public categs: CategModel[];
  public recipes: RecipeModel[];

  constructor(private categService: CategService, private recipeService: RecipeService, private userService: UserService) { 
    this.categs = this.categService.getAllCategs();
   // this.recipes = this.recipeService.getAllRecipes();
  }

  ngOnInit() {
  }

}
