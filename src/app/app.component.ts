import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';
import { FormControl, FormGroup} from '@angular/forms';

var _ = require('lodash');
@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent {
	tareas: Tarea[];
	//en esta seccion colocamos las variables necesarias para crear la nueva tarea
	AgregarTarea: FormGroup = new FormGroup({
		titulo: new FormControl(''),
		duracion: new FormControl(''),
		destacada: new FormControl(''),
		seleccion: new FormControl('')
	});
	constructor(
        public service: AppService,
	) { }
	
	ngOnInit() {
		this.obtenerTareas();
	}

	async obtenerTareas() {
		this.tareas = await this.service.obtenerTareas();
	}


	
	seleccionarTarea(tarea){
		tarea.seleccion = true
		
	}

	TareaDestacada(tarea){
		tarea.destacada = true
	}

	EliminarTarea(){
		var resultado = []
		var ids_eliminaros = [] 
		this.tareas.forEach(tarea => {
			//recorremos el arreglo de tareas para verificar cuales estan seleccionadas
			if(tarea.seleccion == true){
				//se agrega a un arreglo de seleccionadas los ids de las tareas que estan seleccionadas
				ids_eliminaros.push(tarea.id)
				
			}
		
		});
		//se filtra por medio de la condicion de que no esten en el array de seleccionados y solo los que no estans e dejan
		resultado = this.tareas.filter(tarea => ids_eliminaros.indexOf(tarea.id) < 0  );
		console.log("resultado")
		console.log(resultado)
		console.log("tareas")
		console.log(this.tareas)
		this.tareas = resultado
	}
	agregarTarea() {
		if(this.AgregarTarea.get('titulo').value != '' && this.AgregarTarea.get('duracion').value > 0){
			this.tareas.push(new Tarea(
				this.obtenerID(),
				this.AgregarTarea.get('titulo').value,
				this.AgregarTarea.get('duracion').value,
				false,
				));

			//reiniciamos las varibles
			this.AgregarTarea.get('titulo').reset('');
			this.AgregarTarea.get('duracion').reset('');
		}else{
			alert('Debe ingresar titulo y duracion a la tarea');
			return false;
		}
	}

	//metodo donde ordenaremos ascendentemente por id
	OrdenA(){
		//se utiliza un arreglo temporal para ordenar
		let sorted = _.sortBy(this.tareas, 'id');
		console.log(sorted);
		this.tareas = sorted
	}

	//metodo donde ordenaremos descendentemente por id
	OrdenD(){
		//se utiliza un arreglo temporal para ordenar
		let sorted = _.sortBy(this.tareas, 'id').reverse();
		console.log(sorted);
		this.tareas = sorted
	}

	//metodo donde ordenaremos ascendentemente por la duracion o minutos
	OrdenAT(){
		//se utiliza un arreglo temporal para ordenar
		let sorted = _.sortBy(this.tareas, 'minutos');
		console.log(sorted);
		this.tareas = sorted
	}

	//metodo donde ordenaremos descendentemente por la duracion o minutos
	OrdenDT(){
		//se utiliza un arreglo temporal para ordenar
		let sorted = _.sortBy(this.tareas, 'minutos').reverse();
		console.log(sorted);
		this.tareas = sorted
	}

	ordenALE(){
		this.tareas.sort(function() { return Math.random() - 0.5 });
		console.log(this.tareas)
	}

	obtenerID():number{
		return this.tareas.length + 1;
	}
}
