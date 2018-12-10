import { Injectable } from '@angular/core';
import { RecipeModel } from './recipe-model';
import { CategService } from './categ.service';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, forkJoin, combineLatest } from 'rxjs';
import { map, switchMap, flatMap } from 'rxjs/operators';
import { of, zip } from 'rxjs';
import { CategModel } from './categ-model';
import { UserModel } from './user-model';
import { SubcategModel } from './subcateg-model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: RecipeModel[];
  public user: UserModel;

  constructor(private http: HttpClient, 
    private categService: CategService, 
    private userService: UserService) 
  {  }

  // getAllRecipes(): Observable<RecipeModel[]> {
  //   return this.http.get<RecipeModel[]>(`${environment.firebase.baseUrl}/recipes.json`)
  //   .pipe(map(recipesObject => Object.values(recipesObject)));    
  // }

  getRecipeById(id: string): Observable<RecipeModel> {
    return this.http.get<RecipeModel>(`${environment.firebase.baseUrl}/recipes/${id}.json`)
      .pipe(flatMap(
        recipe => combineLatest(
          of(new RecipeModel(recipe)),
          this.categService.getCategById(recipe.categId),
          this.userService.getUserById(recipe.userId),
          (r: RecipeModel, c: CategModel, u: UserModel) => {
            return {
              ...r, 
              categ: c,
              user: u
            };
          })
      ));
  }

  getAllRecipesByCategId(id: string): Observable<RecipeModel[]>  {
    return this.http.get<RecipeModel[]>(`${environment.firebase.baseUrl}/recipes.json`)
      .pipe(map(recipesObject => Object.values(recipesObject)), 
            map(recipem => recipem.filter(r => { return r.categId === id; })),  //eddig a kiválasztott categű receptek tömbje
            map(rma => rma.map(rm => zip(
                     of(rm),
                     this.categService.getCategById(rm.categId),
                     this.userService.getUserById(rm.userId),
                     (r: RecipeModel, c: CategModel, u: UserModel) => {
                       return {
                         ...r,
                         categ: c,
                         user: u
                       };
                     }
                    )
                )
            ),
            switchMap(zipStreamArray => forkJoin(zipStreamArray))
      );    
  }

  getRecipesBySubcategId(id: string): Observable<RecipeModel[]>  {
    return this.http.get<RecipeModel[]>(`${environment.firebase.baseUrl}/recipes.json`)
        .pipe(map(recipesObject => Object.values(recipesObject)), 
              map(recipem => recipem.filter(r => { return r.subcategId === id; })),  //eddig a kiválasztott categű receptek tömbje
              map(rma => rma.map(rm => zip(
                       of(rm),
                       this.categService.getSubcategById(rm.subcategId),
                       this.userService.getUserById(rm.userId),
                       (r: RecipeModel, sc: SubcategModel, u: UserModel) => {
                         return {
                           ...r,
                           categ: sc,
                           user: u
                         };
                       }
                      )
                  )
              ),
              switchMap(zipStreamArray => forkJoin(zipStreamArray))
           );
  }

    // return this.http.get<RecipeModel[]>(`${environment.firebase.baseUrl}/recipes.json`)
    //  .pipe(map(recipesObject => Object.values(recipesObject)), 
    //         map(recipesArray => recipesArray.map(rm =>  
    //           zip(
    //             of(rm),
    //             this.categService.getCategById(rm.categId),
    //             this.userService.getUserById(rm.userId),
    //             (r: RecipeModel, c: CategModel, u: UserModel) => {
    //               return {
    //                 ...r,
    //                 categ: c,
    //                 user: u
    //               };
    //             }
    //           )
    //         )),
    //       switchMap(zipStreamArray => forkJoin(zipStreamArray))
    //      );    

    // .pipe(map(recipesObject => Object.values(recipesObject)), 
    //       map(recipem => recipem.filter(r =>  { return r.categId === id; })))
    // .pipe(map(rma => rma.map(rm => zip(
    //                  of(rm),
    //                  this.categService.getCategById(rm.categId),
    //                  this.userService.getUserById(rm.userId),
    //                  (r: RecipeModel, c: CategModel, u: UserModel) => {
    //                    return {
    //                      ...r,
    //                      categ: c,
    //                      user: u
    //                    };
    //                  }
    //                )
    //            )
    //           ),
    //          switchMap(zipStreamArray => forkJoin(zipStreamArray))
    //      );    
  
  
  update(recId, name, categId, ingred, descript, picURL) {
    console.log("recid ", recId);
    console.log("name ", name);
    console.log("categId ", categId);
    console.log("ingred ", ingred);
    console.log("descript ", descript);
    console.log("oicURL ", picURL);
    console.log(" this.userService.getCurrentUser().id ", this.userService.getCurrentUser().id);
    return this.http.put<RecipeModel>(
      `${environment.firebase.baseUrl}/recipes/${recId}.json`,
        {
          'categId': categId,
          'descript': descript,
          'id': recId,
          'ingred': ingred,
          'name': name,
          'pictureUrl': picURL,
          'userId': this.userService.getCurrentUser().id
        });
  }

  create(name, categId, ingred, descript, picURL) {
    console.log("name ", name);
    console.log("categId ", categId);
    console.log("ingred ", ingred);
    console.log("descript ", descript);
    console.log("oicURL ", picURL);
    console.log(" this.userService.getCurrentUser().id ", this.userService.getCurrentUser().id);
    return this.http.post<any>(
      `${environment.firebase.baseUrl}/recipes.json`,   //első lépésben létrehozza az id-miatt
        {
          'categId': categId,
          'descript': descript,
          'id': '',
          'ingred': ingred,
          'name': name,
          'pictureUrl': picURL,
          'userId': this.userService.getCurrentUser().id
        }).pipe(switchMap(newid => this.http.put<RecipeModel>(`${environment.firebase.baseUrl}/recipes/${newid.name}.json`,  //itt már a megkapott id-t is beleteszi
            {
              'categId': categId,
              'descript': descript,
              'id': newid.name,
              'ingred': ingred,
              'name': picURL,
              'pictureUrl': picURL,
              'userId': this.userService.getCurrentUser().id

            }))
          );
  }

}
