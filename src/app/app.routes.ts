import { Routes } from '@angular/router';
import { DateTimeComponent } from './components/date-time/date-time.component';
import { MainComponent } from './components/main/main.component';
import { CrachaComponent } from './components/cracha/cracha.component';
import { ParticipantesComponent } from './components/participantes/participantes.component';
import { ContatoComponent } from './components/contato/contato.component';
import { MuralComponent } from './components/mural/mural.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: MainComponent },
  { path: 'informacoes', component: DateTimeComponent },
  { path: 'cracha', component: CrachaComponent },
  { path: 'participantes', component: ParticipantesComponent },
  { path: 'contato', component: ContatoComponent },
  { path: 'mural', component: MuralComponent }
];
