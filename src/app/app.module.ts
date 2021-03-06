import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CarouselModule, CollapseModule, AlertModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/navbar/navbar.component';
import { CarouselComponent } from './core/carousel/carousel.component';
import { FooterComponent } from './core/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { CategcardComponent } from './categ/categcard/categcard.component';
import { RecipecardComponent } from './recipe/recipecard/recipecard.component';
import { CategService } from './shared/categ.service';
import { UserService } from './shared/user.service';
import { RecipeService } from './shared/recipe.service';
import { LoggedInGuard } from './shared/logged-in.guard';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SearchComponent } from './search/search.component';
import { SearchSubcategComponent } from './categ/search-subcateg/search-subcateg.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    CategcardComponent, 
    ...AppRoutingModule.routableComponents, 
    RecipecardComponent, SearchComponent, SearchSubcategComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [CategService, UserService, RecipeService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
