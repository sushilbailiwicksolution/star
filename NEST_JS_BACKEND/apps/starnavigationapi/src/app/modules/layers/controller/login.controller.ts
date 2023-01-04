import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, UseInterceptors } from "@nestjs/common";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { LoginDto } from "../dto/login.dto";
import { UserLogin } from "../entity/login.entity";
import { LoginService } from "../service/login.service";


/**
 * @ignore
 */
@Controller({
    version: ['1'],
    path: 'login'
})
@ApiTags('login')
@UseInterceptors(ResTransformInterceptor)
/**
 * @ignore
 */
export class LoginController {
    private readonly logger = new Logger(LoginController.name);
    constructor(private loginService:LoginService) { }

    // @Post()
    // @HttpCode(HttpStatus.CREATED)
    // @ApiOperation({ summary: 'Create Asset' })
    // @ApiResponse({ status: 403, description: 'Forbidden.' })
    // @ApiResponse({ status: HttpStatus.CREATED, description: 'The user has been successfully created.'})
    // public async create(@Body() data: LoginDto): Promise<LoginDto> {
    //     return this.loginService.create(data);
    // }

    @Get()
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Find all user' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async findAll() {
        return this.loginService.findAll();
    }

    


    @Get()
    display(){
        return this.loginService.findAll()
    }
    @Post()
    validate(@Body() loginDto: LoginDto){
        return this.loginService.validate(loginDto)
    }
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Delete loginUser by id' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    public async remove(@Param('id') id: number): Promise<UserLogin> {
        return this.loginService.remove(id);
    }
    

}