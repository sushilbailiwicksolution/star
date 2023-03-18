import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Logger, Param, Post, Put, Req, Res, UseInterceptors } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { Pagination } from "nestjs-typeorm-paginate";
import { StateDto } from "../../../dto/state.interface";
import { UserTypeEnum } from "../../../enum/user.type.enum";
import { ResTransformInterceptor } from "../../../interceptors/response.interceptor";
import { LoginDto } from "../dto/login.dto";
import { NewUserDto } from "../dto/newUser.dto";
import { UpdateUserDto } from "../dto/updateUser.dto";
import { UserDto } from "../dto/user.dto";
import { LandmarkEntity } from "../entity/landmark.entity";
import { UserEntity } from "../entity/user.entity";
import { NewUserService } from "../service/newUser.service";
import { UserService } from "../service/user.service";


/**
 * This is UserController  class. It handles all the API request related to users
 */
@Controller({
    version: ['1'],
    path: 'users'
})
@ApiTags('users')
@UseInterceptors(ResTransformInterceptor)


export class UserController {
    private readonly logger = new Logger(UserController.name);
    constructor(private userService: NewUserService) { }
/**
 * Handles User creation request . Creates new user in database
 * @param data 
 * @returns 
 */

@Post()
@ApiResponse({ status: 201, description: 'User created successfully' })
@ApiResponse({ status: 400, description: 'Bad Request' })
@ApiBody({ type: NewUserDto })
async create(@Body() userDto: NewUserDto) {
  return this.userService.create(userDto);
}

  /**
   * Find all the users from database
   * @returns 
   */
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Get all users successfully',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get()
  async find() {
    return this.userService.find();
  }

  /**
   * Find users based on id provided
   * @param id 
   * @returns 
   */
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Find user by id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  public async findOne(@Param('id') id:number) {
      return this.userService.findById(id);
  }

  /**
   * Find user based on accountType
   * @param accountType 
   * @returns 
   */
  @Get(':accountType')
  @ApiOperation({ summary: 'Find users by account type' })
  @ApiResponse({ status: 200, description: 'Users were found successfully.', 
  type: UserEntity })
  
  async findByAccountType(@Param('accountType') accountType: UserTypeEnum) {
      return this.userService.findByAccountType(accountType);
  }

  /**
   * Update user with new data 
   * @param data 
   * @returns 
   */

  @Put(':id')
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, type: UserEntity })
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  /**
   * Handles deletion of user.
   * @param id 
   * @returns 
   */
  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  //@UseInterceptors(new TransformInterceptor(UserDto))
  @ApiOperation({ summary: 'Delete user by id' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
   public async remove(@Param('id') id: number ): Promise<NewUserDto> {
      return this.userService.remove(id);
  }

  /**
   * Find User list by pagination
   * @param state 
   * @returns 
   */
  // @Post('paginate')
  // @ApiOperation({ summary: 'Find user list by pagination' })
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  // async paginate(@Body() state: StateDto): Promise<Pagination<LandmarkEntity>> {
  //     return this.userService.paginate(state);
  // }

  /**
   * Handles user login API. 
   * @param loginDto 
   * @returns 
   */
  @Post('/user/authenticate')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User found and logged in successfully' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async login(@Body() body: any): Promise<NewUserDto> {
    const username = body.username;
    const loginId = body.login_id;
    const password = body.password;
    const user = await this.userService.login(username, loginId, password);
    return user;
  }

}