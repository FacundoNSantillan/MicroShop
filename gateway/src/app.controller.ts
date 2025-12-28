import { Controller, Get, Headers } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly http: HttpService) {}

  @Get('users')
  async getUsers(@Headers() headers: any) {
    const response = await firstValueFrom(
      this.http.get('http://users:3001/api/users', {
        headers: {
          authorization: headers.authorization,
        },
      }),
    );

    return response.data;
  }
}
