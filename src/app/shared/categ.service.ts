import { Injectable } from '@angular/core';
import { CategModel } from './categ-model';

@Injectable({
  providedIn: 'root'
})
export class CategService {
  private categs: CategModel[];

  constructor() { 
    this.categs = [
      {
        'id': 1,
        'name': 'Levesek',
        'pictureUrl': 'assets/33.jpg'
      },
      {
        'id': 2,
        'name': 'Szárnyasok',
        'pictureUrl': 'assets/55.jpg'
      },
      {
        'id': 3,
        'name': 'Főzelékek',
        'pictureUrl': 'assets/22.jpg'
      },
      {
        'id': 4,
        'name': 'Desszertek',
        'pictureUrl': 'assets/11.jpg'
      },
      {
        'id': 5,
        'name': 'Sütemények',
        'pictureUrl': 'assets/44.jpg'
      }
    ]
  }

  getAllCategs(): CategModel[] {
    return this.categs;
  }

  getCategById(id: number) {
    const cat = this.categs.filter(x => x.id === +id);
    return cat.length > 0 ? cat[0] : new CategModel(CategModel.emptyCateg);
  }
}
