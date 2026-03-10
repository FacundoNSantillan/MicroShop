import {
  Controller,
  All,
  Req,
  Res
} from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import type { Request, Response } from 'express';
import { firstValueFrom } from 'rxjs';

@Controller('api')
export class AppController {
  constructor(private readonly http: HttpService) {}

  @All('users')
  async usersRoot(@Req() req: Request, @Res() res: Response) {

    const url = `http://users:3001/api/users`;

    const response = await firstValueFrom(
      this.http.request({
        method: req.method,
        url,
        data: req.body,
        headers: req.headers,
      }),
    );

    res.status(response.status).send(response.data);
  }

  @All('users/*')
  async users(@Req() req: Request, @Res() res: Response) {

    const url = `http://users:3001/api/users/${req.params[0]}`;

    const response = await firstValueFrom(
      this.http.request({
        method: req.method,
        url,
        data: req.body,
        headers: req.headers,
      }),
    );

    res.status(response.status).send(response.data);
  }

  @All('products')
  async productsRoot(@Req() req: Request, @Res() res: Response) {

    const url = `http://products:3002/api/products`;

    const response = await firstValueFrom(
      this.http.request({
        method: req.method,
        url,
        data: req.body,
        headers: req.headers,
      }),
    );

    res.status(response.status).send(response.data);
  }

  @All('products/*')
  async products(@Req() req: Request, @Res() res: Response) {

    const url = `http://products:3002/api/products/${req.params[0]}`;

    const response = await firstValueFrom(
      this.http.request({
        method: req.method,
        url,
        data: req.body,
        headers: req.headers,
      }),
    );

    res.status(response.status).send(response.data);
  }

  @All('orders')
  async ordersRoot(@Req() req: Request, @Res() res: Response) {

    const url = `http://orders:3003/api/orders`;

    const response = await firstValueFrom(
      this.http.request({
        method: req.method,
        url,
        data: req.body,
        headers: req.headers,
      }),
    );

    res.status(response.status).send(response.data);
  }

  @All('orders/*')
  async orders(@Req() req: Request, @Res() res: Response) {

    const url = `http://orders:3003/api/orders/${req.params[0]}`;

    const response = await firstValueFrom(
      this.http.request({
        method: req.method,
        url,
        data: req.body,
        headers: req.headers,
      }),
    );

    res.status(response.status).send(response.data);
  }
}