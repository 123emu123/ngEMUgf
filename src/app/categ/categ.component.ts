import { Component, OnInit } from '@angular/core';
import { CategService } from '../shared/categ.service';
import { CategModel } from '../shared/categ-model';
import { RecipeModel } from '../shared/recipe-model';
import { Observable } from 'rxjs';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-categ',
  templateUrl: './categ.component.html',
  styleUrls: ['./categ.component.css']
})
export class CategComponent implements OnInit {
  public categs: CategModel[];
  public recipes: RecipeModel[];
  public categs$: Observable<CategModel[]>;
  
  constructor(private categService: CategService, private userService: UserService) {  }

  ngOnInit() {
    this.categs$ = this.categService.getAllCategs();
    //  this.categs$ = this.categService.getAllCategs(); ASYNC megoldás
   
    //  this.categService.getAllCategs().subscribe( data => { // ez a SUBSCRIBE-os megoldás
    //    this.categs = data
    //  });


  }

}
