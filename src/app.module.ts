import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './modules/account/account.module';
import { UserModule } from './modules/user/user.module';
import { AddressModule } from './modules/address/address.module';
import { AnnouncementsModule } from './modules/announcements/announcements.module';

@Module({
  imports: [AccountModule, UserModule, AddressModule, AnnouncementsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
