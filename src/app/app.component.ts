import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Tarea } from './tarea';
import { FormControl, FormGroup} from '@angular/forms';
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
		duracion: new FormControl('')
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


	

	agregarTarea() {
		if(this.AgregarTarea.get('titulo').value != '' && this.AgregarTarea.get('duracion').value > 0){
			this.tareas.push(new Tarea(
				this.obtenerID(),
				this.AgregarTarea.get('titulo').value,
				this.AgregarTarea.get('duracion').value,
				this.AgregarTarea.get('seleccion').value,
				));

			//reiniciamos las varibles
			this.AgregarTarea.get('titulo').reset('');
			this.AgregarTarea.get('duracion').reset('');
		}else{
			alert('Debe ingresar titulo y duracion a la tarea');
			return false;
		}
	}

	obtenerID():number{
		return this.tareas.length + 1;
	}
}
