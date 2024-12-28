export class ChecklistModel {
    public id_locacao!: number;
    public id_carro!: number;
    public status!: string;
    public id_usuario!: number;
    public tipo_check!: string;
    public id_checklist!: number;
    public documentos: boolean = false;
    public chavereserva: boolean = false;
    public catalizador: boolean = false;
    public tapetes: boolean = false;
    public som: boolean = false;
    public calotas: boolean = false;
    public estepe: boolean = false;
    public chave_roda: boolean = false;
    public macaco: boolean = false;
    public triangulo: boolean = false;
    public simbolo: boolean = false;
    public antena: boolean = false;
    public gasolina!: number;
    public obs_check!: string;
    public manual: boolean = false;
    public km_check!: number;
    public id_modelo_car: any;
    public descricao_ava: any;
    public avarias: any;
    public seguroPlus: any;
    /*atributo para moto*/
    public mata_cachorro: boolean = false;
    public bau: boolean = false;
    public sirene: boolean = false;
    public lampada_sirene: boolean = false;
    public giroflex_traseiro: boolean = false;
    public giroflex_dianteiro: boolean = false;
    public tipo_car: any;
    public oleo_km_car: any;

}
