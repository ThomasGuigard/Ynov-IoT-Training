import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: './tabs/tabs.module#TabsPageModule' },
  { path: 'temperature', loadChildren: './temperature/temperature.module#TemperaturePageModule' },
  { path: 'humidity', loadChildren: './humidity/humidity.module#HumidityPageModule' },  { path: 'height', loadChildren: './height/height.module#HeightPageModule' }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
