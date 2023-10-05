export class Tarea {
    constructor(
        public id: number,
        public titulo: string,
        public minutos: number,
        public destacada?:boolean,
        public seleccion?:boolean
    ){}
}