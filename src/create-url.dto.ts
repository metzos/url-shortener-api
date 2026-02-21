import { IsUrl, IsNotEmpty } from 'class-validator';

export class CreateUrlDto {

  @IsNotEmpty({ message: 'Please provide a URL.' })
  @IsUrl({}, { message: 'You must provide a valid web address (e.g., https://google.com)' })
  
  url: string;
}