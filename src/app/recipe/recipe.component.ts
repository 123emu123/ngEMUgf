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
  constructor(private userService: UserService, 
              private route: ActivatedRoute, private categService: CategService) { }
  public categ: CategModel;

  ngOnInit() {
    const catId = this.route.snapshot.params['cid'];
    this.categService.getCategById(catId).subscribe(data => {this.categ = data});  
  }
}
