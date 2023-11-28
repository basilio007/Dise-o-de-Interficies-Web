import { Component, OnInit } from '@angular/core';
import { Evento } from './models/evento.model';
import data from '../assets/data.json';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  eventos: Evento[] = [];
  fechaactual: Date;
  directions: string[] =[];
  selected_direction: string ='';
  filtrated_directions: Evento[] =[];

  ngOnInit() {
    // Cargamos el fichero JSON
    const json: any = data;
    // Guardamos el fichero cargado en el array de Eventos
    this.eventos = json;
    // Convertimos las fechas a tipo Date
    this.eventos.map((value) => value.fecha = new Date(value.fecha));
    this.fechaactual = new Date();
    this.directions = this.getdirections();
    this.soltarPorDireccion();
  }
proximosEventos(): Evento[]{
  return this.filtrated_directions.filter(Evento => Evento.fecha >= this.fechaactual);
}

Eventospasados(): Evento[]{
  return this.filtrated_directions.filter(Evento => Evento.fecha <= this.fechaactual);
}

getdirections(): string[]{
const direcionesSet = new Set<string>();
this.eventos.forEach(evento =>direcionesSet.add(evento.direccion));
return Array.from(direcionesSet);

}
soltarPorDireccion(){
this.filtrated_directions = this.eventos.filter(Evento => Evento.direccion === this.selected_direction);
}
ondiretion(){
  this.soltarPorDireccion();
}
 }
