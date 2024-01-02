import { registerAs } from '@nestjs/config';

export default registerAs('stardb', () => ({
  host: '127.0.0.1',
  port: 5432,
  username: 'star',
  password: 'Admin@123',
  dbname: 'stardb',
  synchronize: true, 
  logging: true,
}));
