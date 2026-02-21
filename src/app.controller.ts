import { Body, Controller, Get, Param, Post, Res, } from '@nestjs/common';
import { AppService } from './app.service';
import type { Response } from 'express';
import { CreateUrlDto } from './create-url.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}



  @Post('shorten')
  async createNewUrlEntry(@Body() data: CreateUrlDto) {
    console.log("Saving your URL in database: ", data.url);
    const res = await this.appService.createNewUrlEntry(data.url);

    return res;
  }

  @Get('stats/:shortCode')
  async getUrlStats(@Param('shortCode') shortCode: string) {
    console.log("Fetching data for URL with code: ", shortCode)

    const entry = await this.appService.getUrlStats(shortCode);

    return entry;
  }

  @Get(':shortCode')
  async redirectToOriginalUrl(@Param('shortCode') shortCode: string, @Res() res: Response) {
    console.log("Searching for original Url in database. Code provided: ", shortCode);

    const entry = await this.appService.getOriginalUrl(shortCode);

    return res.redirect(302, entry.originalUrl);
    
  }
}
