import { registerAs } from '@nestjs/config';

export default registerAs('stardb', () => ({
  host: '103.10.234.244',
  port: 5432,
  username: 'star',
  password: 'Admin@123',
  dbname: 'stardb',
  synchronize: true, 
  logging: true,
}));
