import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {};

  async createNewUrlEntry(originalUrl: string) {
    const randomCode = "link" + Math.floor(Math.random() * 10000);


    const newEntry = await this.prisma.urlEntry.create({
      data: {
        originalUrl: originalUrl,
        shortCode: randomCode
      }
    });

    return newEntry;
  }

  async getOriginalUrl(shortCode: string) {
    try {
      const entry = await this.prisma.urlEntry.update({
        where: {
          shortCode: shortCode
        },
        data: {
          clicks: {
            increment: 1
          }
        }
      });

      return entry;
    } catch (error) {
      throw new NotFoundException('The URL you provided was not found.', error);
    }
  }

  async getUrlStats(shortCode: string) {
    const entry = await this.prisma.urlEntry.findUnique({
      where: {
        shortCode: shortCode
      }
    });

    if (!entry) throw new NotFoundException('The URL you provided was not found.');

    return entry;

  }

}
