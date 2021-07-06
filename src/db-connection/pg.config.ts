import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'nestjspostcomment.caqvgoqygzpq.ap-south-1.rds.amazonaws.com',
  port: 5432,
  username: 'postgres',
  password: 'postgres',
  database: 'demo_blog',
  entities: [__dirname + '/../**/*.entity{ .ts,.js}'],
  synchronize: true,
  logging: 'all',
};
