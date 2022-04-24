import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { UserTypeEnum } from "../../../enum/user.type.enum";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { UserDto } from "../dto/user.dto";
import { LandmarkEntity } from "../entity/landmark.entity";
import { UserService } from "../service/user.service";

@Controller({
    version: ['1'],
    path: 'users'
})
@ApiTags('users')
@UseInterceptors(ResTransformInterceptor)
export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private userService: UserService) { }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Create Asset' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created.'})
    public async create(@Body() data: UserDto): Promise<UserDto> {
        return this.userService.create(data);
    }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find all user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.userService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find user by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOne(@Param('id') id) {
        return this.userService.findById(id);
    }

    @Get('by-type/:accountType')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find user by account type' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findOneByAccountType(@Param('accountType') accountType: UserTypeEnum) {
        return this.userService.findByAccountType(accountType);
    }

    @Put(':id')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({ summary: 'Updated user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully updated.'})
    public async update(@Param('id') id: number, @Body() data: UserDto) {
        return this.userService.update(id, data);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    //@UseInterceptors(new TransformInterceptor(UserDto))
    @ApiOperation({ summary: 'Delete user by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<UserDto> {
        return this.userService.remove(id);
    }

    @Post('paginate')
    @ApiOperation({ summary: 'Find user list by pagination' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async paginate(@Body() state: StateDto): Promise<Pagination<LandmarkEntity>> {
        return this.userService.paginate(state);
    }
}