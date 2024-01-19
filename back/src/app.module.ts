import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from './db/typeorm.module';
import { UserRepository } from './user/user.repository';

@Module({
  imports: [TypeOrmModule, UserModule, AuthModule, UserRepository],
  controllers: [],
  providers: [],
})
export class AppModule {}
