import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { ActivatedRoute } from '@angular/router';
import { CategModel } from '../shared/categ-model';
import { CategService } from '../shared/categ.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {
  constructor(private userService: UserService, private route: ActivatedRoute, private categService: CategService) { }
  categ: CategModel;

  ngOnInit() {
   
   // if (!this.categ) {
      const catId = +this.route.snapshot.params['cid'];

      this.categ = this.categService.getCategById(catId);
      console.log("mi a kategid === >>> ", catId);
  //  }
   
  }
}
