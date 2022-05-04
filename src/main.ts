/*
 * @Author: Evan Zuo v_wangxiangbo01@baidu.com
 * @Date: 2022-04-12 04:03:46
 * @LastEditors: Evan Zuo v_wangxiangbo01@baidu.com
 * @LastEditTime: 2022-05-04 08:54:10
 * @FilePath: /nestjs-microservice-example-master/books-service/src/main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { Transport } from '@nestjs/microservices';

// Create new logger instance
const logger = new Logger('Main');

// Create micro service options
const microserviceOptions = {
  name: 'BOOK_SERVICE',
  transport: Transport.REDIS,
  options: {
    url: 'redis://localhost:6379',
  },
};
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice(microserviceOptions);
  await app.listen(9000);
  console.log(await app.getUrl())
  // const app = await NestFactory.createMicroservice(
  //   AppModule,
  //   microserviceOptions,
  // );
  // app.listen(3002);
}
bootstrap();
