import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipeService } from 'src/app/shared/recipe.service';
import { RecipeModel } from 'src/app/shared/recipe-model';
import { UserService } from 'src/app/shared/user.service';


@Component({
  selector: 'app-reciperead',
  templateUrl: './reciperead.component.html',
  styleUrls: ['./reciperead.component.css']
})
export class RecipereadComponent implements OnInit {
  recipe : RecipeModel;

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private userService: UserService) { }

  ngOnInit() {
    const recId = +this.route.snapshot.params['rid'];
    this.recipe = this.recipeService.getRecipeById(recId);
  }
}
