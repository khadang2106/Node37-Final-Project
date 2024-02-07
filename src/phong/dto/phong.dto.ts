import { ApiProperty } from "@nestjs/swagger";

export class UploadPhongDto {
    @ApiProperty({ type: 'string', format: 'binary' })
    file: any
}