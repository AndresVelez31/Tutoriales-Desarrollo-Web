import { Module } from '@nestjs/common';
import { HomeModule } from './home/home.module.js';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module.js';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST ?? 'localhost',
      port: Number(process.env.DB_PORT ?? 3306),
      username: process.env.DB_USER ?? 'bookstore',
      password: process.env.DB_PASSWORD ?? 'bookstore',
      database: process.env.DB_NAME ?? 'bookstore',
      autoLoadEntities: true,
      synchronize: true,
    }),    
    HomeModule,
    BooksModule,
  ],
})
export class AppModule {}
