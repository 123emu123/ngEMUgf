import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { CategComponent } from "./categ/categ.component";
import { PageNotFoundComponent } from "./core/page-not-found/page-not-found.component";
import { RecipeComponent } from "./recipe/recipe.component";
import { LoginComponent } from "./user/login/login.component";
import { RecipeListComponent } from "./recipe/recipe-list/recipe-list.component";
import { RecipereadComponent } from "./recipe/reciperead/reciperead.component";
import { RecipeDetailComponent } from "./recipe/recipe-detail/recipe-detail.component";
import { ProfileComponent } from "./user/profile/profile.component";
import { ProfileEditComponent } from "./user/profile-edit/profile-edit.component";
import { LoggedInGuard } from "./shared/logged-in.guard";

const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'categ', component: CategComponent},
    {path: 'recipe', component: RecipeComponent, 
        children: [
            {path: 'new', component: RecipeDetailComponent, canActivate: [LoggedInGuard]}
        ]}, 
    {path: ':cid/recipe', component: RecipeComponent, 
        children: [
            {path: '', component: RecipeListComponent},
            {path: ':rid/read', component: RecipereadComponent},
            {path: 'new', component: RecipeDetailComponent, canActivate: [LoggedInGuard]},      
            {path: ':rid/edit', component: RecipeDetailComponent, canActivate: [LoggedInGuard]}       
        ]},    
    {path: 'user', 
        children: [
            {path: '', component: ProfileComponent, canActivate: [LoggedInGuard]},
            {path: 'edit', component: ProfileEditComponent, canActivate: [LoggedInGuard]},
            {path: 'login', component: LoginComponent},
            {path: 'registration', component: ProfileEditComponent}
        ]},
    {path: '', redirectTo: '/home', pathMatch: 'full'},
    {path: '**', component: PageNotFoundComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
    static routableComponents = [
        HomeComponent, 
        CategComponent,
        RecipeComponent,
        RecipeListComponent,
        RecipereadComponent,
        RecipeDetailComponent,
        LoginComponent,
        ProfileComponent,
        ProfileEditComponent,
        PageNotFoundComponent
    ];
}