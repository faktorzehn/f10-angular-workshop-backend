import { ApiProperty } from '@nestjs/swagger';

export class Task {
  @ApiProperty()
  id: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  destination: string;

  @ApiProperty()
  type?: 'suchen' | 'entern' | 'erpressen';

  @ApiProperty()
  done: boolean;

  @ApiProperty()
  priority: number;

  @ApiProperty()
  gold: number;
}
