export class Health {

    private enrutador:any;

    public iniciar = (express: any) => {
        this.enrutador = express.Router();
        
        this.enrutador.get('/', async (_req, res, _next) => {
            const healthcheck = {
                uptime: process.uptime(),
                message: 'OK',
                timestamp: Date.now()
            };
            try {
				res.json({status: 'UP'});
                res.status(200).send();
            } catch (e) {
                healthcheck.message = e;
                res.status(503).send();
            }
        });
    }

    public obtenerRutas(){
        return this.enrutador;
    }
}
