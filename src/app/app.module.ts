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

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    CarouselComponent,
    FooterComponent,
    CategcardComponent, 
    ...AppRoutingModule.routableComponents, 
    RecipecardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    CarouselModule.forRoot(),
    CollapseModule.forRoot(),
    AlertModule.forRoot(),
    AppRoutingModule
  ],
  providers: [CategService, UserService, RecipeService, LoggedInGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
