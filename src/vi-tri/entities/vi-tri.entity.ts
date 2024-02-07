import { ApiProperty } from "@nestjs/swagger"

export class CreateLocation {
    @ApiProperty()
    ten_vi_tri: string
    @ApiProperty()
    tinh_thanh: string
    @ApiProperty()
    quoc_gia: string
}
