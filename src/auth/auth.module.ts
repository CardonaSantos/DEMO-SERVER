import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, UserService, PrismaService],
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forRoot({
      isGlobal: true, // Esto permite que las variables de entorno estén disponibles globalmente
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('MY_SECRET_KEY'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class AuthModule {}

// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { UserModule } from 'src/user/user.module';
// import { PassportModule } from '@nestjs/passport';
// import { JwtModule } from '@nestjs/jwt';
// import { ConfigModule, ConfigService } from '@nestjs/config';
// import { UserService } from 'src/user/user.service';
// import { PrismaService } from 'src/prisma/prisma.service';

// @Module({
//   controllers: [AuthController],
//   providers: [AuthService, UserService, PrismaService],
//   imports: [
//     UserModule,
//     PassportModule,
//     ConfigModule,
//     JwtModule.registerAsync({
//       imports: [ConfigModule],
//       useFactory: async (configService: ConfigService) => ({
//         secret: configService.get<string>('MY_SECRET_KEY'),
//         // secret: process.env.MY_SECRET_KEY || 'MySecretKey',
//         signOptions: { expiresIn: '1h' },
//       }),
//       inject: [ConfigService],
//     }),
//   ],
// })
// export class AuthModule {}
