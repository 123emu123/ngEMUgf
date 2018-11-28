import { Injectable } from '@angular/core';
import { RecipeModel } from './recipe-model';
import { CategService } from './categ.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private recipes: RecipeModel[];
  private recipesByCat: RecipeModel[];
  constructor(private categService: CategService, private userService: UserService) { 
    this.recipes = [      
      {
        'id': 1,
        'name': 'Babfőzelék',
        'ingred': 'Liszt, tojás, cukor, habtejszín',
        'descript': 'A tojásokat felverjük, beletesszü a lisztet.', 
        'pictureUrl': 'assets/3.jpg',
        'userId': 3,
        'categId': 3
      }, 
      {
        'id': 2,
        'name': 'Képviselőfánk',
        'ingred': 'Liszt, tojás, cukor, habtejszín',
        'descript': 'A tojásokat felverjük, beletesszü a lisztet.', 
        'pictureUrl': 'assets/3.jpg',
        'userId': 1,
        'categId': 5
      },{
        'id': 3,
        'name': 'Lencsefőzelék',
        'ingred': 'Cukor, tejpor, kakaó, vaj',
        'descript': 'A cukrot 100 ml vízben lassú tűzön megolvasztjuk.',
        'pictureUrl': 'assets/2.jpg',
        'userId': 1,
        'categId': 3
      },  
      {
        'id': 4,
        'name': 'Sütőtökleves', 
        'ingred': 'Sütőtök, narancslé, tejszín',
        'descript': 'A sütőtököt sütőben megsütjük.', 
        'pictureUrl': 'assets/33.jpg',
        'userId': 1,
        'categId': 1
      }, {
        'id': 5,
        'name': 'Házicsoki',
        'ingred': 'Cukor, tejpor, kakaó, vaj',
        'descript': 'A cukrot 100 ml vízben lassú tűzön megolvasztjuk.',
        'pictureUrl': 'assets/2.jpg',
        'userId': 1,
        'categId': 4
      },  
      {
        'id': 6,
        'name': 'Kekszszalámi',
        'ingred': 'Cukor, tejpor, kakaó, vaj',
        'descript': 'A cukrot 100 ml vízben lassú tűzön megolvasztjuk.',
        'pictureUrl': 'assets/2.jpg',
        'userId': 2,
        'categId': 4
      },  
      {
        'id': 7,
        'name': 'Grillcsürke', 
        'ingred': 'Sütőtök, narancslé, tejszín',
        'descript': 'A sütőtököt sütőben megsütjük.', 
        'pictureUrl': 'assets/33.jpg',
        'userId': 2,
        'categId': 2
      }, 
      {
        'id': 8,
        'name': 'Húsleves', 
        'ingred': 'Sütőtök, narancslé, tejszín',
        'descript': 'A sütőtököt sütőben megsütjük.', 
        'pictureUrl': 'assets/33.jpg',
        'userId': 1,
        'categId': 1
      }, 
      {
        'id': 9,
        'name': 'Négerkocka',
        'ingred': 'Liszt, tojás, cukor, habtejszín',
        'descript': 'A tojásokat felverjük, beletesszü a lisztet.', 
        'pictureUrl': 'assets/3.jpg',
        'userId': 1,
        'categId': 5
      },{
        'id': 10,
        'name': 'Tiramisu',
        'ingred': 'Cukor, tejpor, kakaó, vaj',
        'descript': 'A cukrot 100 ml vízben lassú tűzön megolvasztjuk.',
        'pictureUrl': 'assets/2.jpg',
        'userId': 1,
        'categId': 4
      },  
      {
        'id': 11,
        'name': 'Salátaleves', 
        'ingred': 'Sütőtök, narancslé, tejszín',
        'descript': 'A sütőtököt sütőben megsütjük.', 
        'pictureUrl': 'assets/33.jpg',
        'userId': 1,
        'categId': 1
      },
      {
        'id': 12,
        'name': 'Borsófőzelék',
        'ingred': 'Liszt, tojás, cukor, habtejszín',
        'descript': 'A tojásokat felverjük, beletesszü a lisztet.', 
        'pictureUrl': 'assets/3.jpg',
        'userId': 1,
        'categId': 3
      },
      {
        'id': 13,
        'name': 'Gombócleves',
        'ingred': 'Liszt, tojás, cukor, habtejszín',
        'descript': 'A tojásokat felverjük, beletesszü a lisztet.', 
        'pictureUrl': 'assets/3.jpg',
        'userId': 1,
        'categId': 1
      }, {
        'id': 14,
        'name': 'Káposztafőzelék',
        'ingred': 'Liszt, tojás, cukor, habtejszín',
        'descript': 'A tojásokat felverjük, beletesszü a lisztet.', 
        'pictureUrl': 'assets/3.jpg',
        'userId': 1,
        'categId': 3
      }
    ]
  }

  getAllRecipes() {
    return this.recipes.map( recipe => {
      return {
        ...recipe,
        categ: this.categService.getCategById(recipe.categId)
       // owner: this.userService.getUserById(recipe.userId)
      };
    });    
  }

  getCategNameById(id: number) {
    return this.categService.getCategById(id).name;
  }

  getAllRecipesByCategId(id: number): RecipeModel[] {
    this.recipesByCat = this.recipes.filter(x => x.categId === id);
    if (this.recipesByCat.length > 0) { 
      return this.recipesByCat.map( r => {
        return {
          ...r, 
          categ: this.categService.getCategById(r.categId),
          owner: this.userService.getUserById(r.userId) 
        };  
      }); 
    }
  }

  getRecipeById(id: number) { //hozzáfűztem a megtalált recepthez a kategóriáját
    const r = this.recipes.filter(x => x.id === id);
    if (r.length > 0) { 
      return {
        ...r[0], 
        categ: this.categService.getCategById(r[0].categId)
    //    owner: this.userService.getUserById(r[0].userId) 
      } 
    } else {
      new RecipeModel(RecipeModel.emptyRecipe);
    }
  }
  
  update(r: RecipeModel) {
    this.recipes = this.recipes.map( rec => {
      return rec.id === r.id ? {...r} : rec;
    });
  }

  create(r: RecipeModel) {
    r.categId = +r.categId; //itt az volt a baj, hogy stringként kapta meg az id-et, úgy tette be a tömbbe és emiatt nem jelent meg az új
    this.recipes = [
      ...this.recipes, 
      new RecipeModel({
        id: this.getMaxId() + 1,
        ...r      
        //ide betette az event esemenyt teljene meg a usert is
      })
    ];

  console.log("ez az uj recipek tömb = ", this.recipes)
  }

  private getMaxId() {
    return this.recipes.reduce((x, y) => x.id > y.id ? x : y).id;
  }
}

