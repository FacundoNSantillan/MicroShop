import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import axios from 'axios';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}


async create(dto: CreateOrderDto) {
  try {
    await axios.get(
      `http://users:3001/api/users/internal/${dto.userId}`,
    );
  } catch {
    throw new BadRequestException('User not found');
  }

  let total = 0;

  const itemsWithPrice = await Promise.all(
    dto.items.map(async (item) => {
      let product;

      try {
        const res = await axios.get(
          `http://products:3002/api/products/internal/${item.productId}`,
        );
        product = res.data;
      } catch {
        throw new BadRequestException(
          `Product ${item.productId} not found`,
        );
      }

      total += product.price * item.quantity;

      return {
        productId: item.productId,
        quantity: item.quantity,
        price: product.price,
      };
    }),
  );

  return this.prisma.order.create({
    data: {
      userId: dto.userId,
      total,
      items: {
        create: itemsWithPrice,
      },
    },
    include: { items: true },
  });
  }


  findAll() {
    return this.prisma.order.findMany({
      include: { items: true },
    });
  }

  async findOne(id: number) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    return order;
  }

  update(id: number, dto: UpdateOrderDto) {
    return this.prisma.order.update({
      where: { id },
      data: dto,
    });
  }
}
