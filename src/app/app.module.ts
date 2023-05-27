//Base
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

//Personalizados
import { HomeComponent } from './components/home/home.component';
import { AlbumComponent } from './components/album/album.component';
import { ArtistaComponent } from './components/artista/artista.component';
import { CancionComponent } from './components/cancion/cancion.component';
import { GeneroComponent } from './components/genero/genero.component';
import { LayoutModule } from './layout/layout.module';
import { ArtistaFormComponent } from './components/artista/artista-form.component';
import { AlbumFormComponent } from './components/album/album-form.component';
import { CancionFormComponent } from './components/cancion/cancion-form.component';
import { GeneroFormComponent } from './components/genero/genero-form.component';
import { AsignarArtistasComponent } from './components/genero/asignar-artistas.component';

//Angular material
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AlbumComponent,
    ArtistaComponent,
    CancionComponent,
    GeneroComponent,
    GeneroFormComponent,
    ArtistaFormComponent,
    AlbumFormComponent,
    CancionFormComponent,
    AsignarArtistasComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatPaginatorModule,
    FormsModule,
    HttpClientModule,
    MatTableModule,
    MatTabsModule,
    MatCheckboxModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
