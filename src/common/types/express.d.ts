import { Usuario } from '../../usuario/entities/usuario.entity';

declare module 'express-serve-static-core' {
  interface Request {
    user?: Usuario;
  }
}
