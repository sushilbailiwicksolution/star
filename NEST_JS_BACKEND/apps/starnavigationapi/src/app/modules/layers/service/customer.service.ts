import { HttpException, HttpStatus, Injectable, Logger, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate, Pagination } from 'nestjs-typeorm-paginate';
import { Repository } from "typeorm";
import { StateDto } from "../../../dto/state.interface";
import { StatusEnum } from "../../../enum/status.enum";
import { QueryBuilder } from "../../../service/query.builder.service";
import { CustomerDto, NewCustomerDto } from "../dto/customer.dto";
import { CustomerEntity } from "../entity/customer.entity";
import * as _ from "lodash";
import { UserEntity } from "../entity/user.entity";

/**
 * This class contains methods for CustomerService API.
 */

// @Injectable()
// export class CustomerService {
//     private readonly logger = new Logger(CustomerService.name);
//     /**
//      * Constructor for Customer services 
//      * @param repository 
//      * @param queryBuilderService 
//      */
//     constructor(
//         @InjectRepository(CustomerEntity) private repository: Repository<CustomerEntity>,
//         @InjectRepository(NewCustomerEntity)private newCustomer: Repository<NewCustomerEntity>,
//         private readonly queryBuilderService: QueryBuilder) { }
        

        
        
//         /**
//          * 
//          * Creates new customer in database
//          * @param data 
//          * @returns 
//          */
//     async create(data: CustomerDto): Promise<CustomerEntity> {
//         return this.repository.save(data);
//     }

//     /**
//      * Find a customer based on id
//      * @param id 
//      * @returns 
//      */
//     async findById(id: number): Promise<CustomerEntity> {
//         return this.repository.findOne({ id });
//     }

//     /**
//      * Find all the customers 
//      * @returns 
//      */
//     async findAll(): Promise<Array<CustomerEntity>> {
//         return this.repository.find({status: StatusEnum.ACTIVE});
//     }
//     /**
//      * Remove a customer from database
//      * @param id 
//      * @returns 
//      */
//     async remove(id: number): Promise<CustomerEntity> {
//         const layer = await this.findById(id);
//         layer.status = StatusEnum.DELETED;
//         return this.repository.save(layer);
//     }

//     /**
//      * Updates a customer field based on new data 
//      * @param data 
//      * @returns 
//      */
//     async update(data: CustomerDto): Promise<CustomerEntity> {
//         const id: number = _.result(data,'id',0);
//         data = _.omit(data, ['id']);
//         let layer = await this.findById(id);
//         if (layer == null) {
//             throw new HttpException({
//                 status: HttpStatus.FORBIDDEN,
//                 error: `Customer id: ${id} not found`,
//             }, HttpStatus.FORBIDDEN);
//         }
//         layer = Object.assign(layer, data);
//         return this.repository.save(layer);
//     }

//     /**
//      * @ignore
//      * @param state 
//      * @returns 
//      */
//     async paginate(state: StateDto): Promise<Pagination<CustomerEntity>> {
//         const options = { page: state.page.current, limit: state.page.size };
//         const queryBuilder = this.repository.createQueryBuilder('t');
//         return await paginate<CustomerEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
//     }





@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>,
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
    private readonly queryBuilderService: QueryBuilder
  ) {}

  async create(customerDto: CustomerDto): Promise<CustomerDto> {
    const { name, phone, email, city,state , country,address,preLogoText,postLogoText,logo_filename,isAdmin, user } = customerDto;

    const customer = this.customerRepository.create({
      name,
      phone,
      email,
      city,
      state,
      country,
      address,
      preLogoText,
      postLogoText,
      logo_filename,
      isAdmin,
    });

    if (isAdmin && user) {
      const newUser = this.userRepository.create({
        ...user,
        customerId: null,
      });

      await this.userRepository.save(newUser);

      customer.userId = newUser.id;
    }

    await this.customerRepository.save(customer);

    return customerDto;
  }



  async findAll(): Promise<CustomerEntity[]> {
    return this.customerRepository.createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .getMany();
  }
  
  async findOne(id: number): Promise<CustomerEntity> {
    return this.customerRepository.createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where('customer.id = :id', { id })
      .getOne();
  }
  
  async findCustomerUser(id: number): Promise<CustomerEntity> {
    return this.customerRepository.createQueryBuilder('customer')
      .leftJoinAndSelect('customer.user', 'user')
      .where('customer.userId = :id', { id })
      .getOne();
  }



  // async update(id: number, customerDto: CustomerDto): Promise<CustomerDto> {

  //   const { name, phone, email, city,state , country,address,preLogoText,postLogoText,logo_filename,isAdmin, user } = customerDto;

  //   const customer = await this.customerRepository.findOne(id);

  //   customer.name = name;
  //   customer.phone = phone;
  //   customer.email = email;
  //   customer.city=city;
  //   customer.state=state;
  //   customer.country=country;
  //   customer.address=address;
  //   customer.preLogoText= preLogoText,
  //   customer.postLogoText=  postLogoText,
  //   customer.logo_filename=  logo_filename,
  //   customer.isAdmin = isAdmin;
      
  //   if (isAdmin && user) {
  //     const newUser = this.userRepository.create({
  //       ...user,
  //       customerId: customer.id,
  //     });

  //     await this.userRepository.save(newUser);

  //     customer.userId = newUser.id;
  //   } else {
  //     customer.userId = null;
  //   }

  //   await this.customerRepository.save(customer);

  //   return customerDto;
  // }


  async update(id: number, customerDto: CustomerDto): Promise<CustomerDto> {
    const { name, phone, email, city, state, country, address, preLogoText, postLogoText, logo_filename, isAdmin, user } = customerDto;
  
    // Retrieve the customer from the database
    const customer = await this.customerRepository.findOne(id);
  
    // Check if the customer exists
    if (!customer) {
      // Handle the case where the customer is not found (e.g., throw an exception)
      throw new NotFoundException(`Customer with id ${id} not found`);
    }
  
    // Update only the fields that are provided in the customerDto
    if (name) customer.name = name;
    if (phone) customer.phone = phone;
    if (email) customer.email = email;
    if (city) customer.city = city;
    if (state) customer.state = state;
    if (country) customer.country = country;
    if (address) customer.address = address;
    if (preLogoText) customer.preLogoText = preLogoText;
    if (postLogoText) customer.postLogoText = postLogoText;
    if (logo_filename) customer.logo_filename = logo_filename;
    if (isAdmin !== undefined) customer.isAdmin = isAdmin;
  
    // Update user information if isAdmin is provided
    if (isAdmin && user) {
      // Check if the customer already has a user associated
      if (customer.userId) {
        // If yes, update the existing user
        await this.userRepository.update(customer.userId, user);
      } else {
        // If no, create a new user and associate it with the customer
        const newUser = this.userRepository.create({
          ...user,
          customerId: customer.id,
        });
  
        await this.userRepository.save(newUser);
  
        customer.userId = newUser.id;
      }
    } else {
      // If isAdmin is false or not provided, remove the associated user
      customer.userId = null;
    }
  
    // Save the updated customer to the database
    await this.customerRepository.save(customer);
  
    // Return the updated customerDto
    return customerDto;
  }
  

 
  async delete(id: number): Promise<void> {
    const customer = await this.customerRepository.findOne(id);
  
    if (!customer) {
      throw new NotFoundException(`Customer with ID ${id} not found`);
    }
  
    if (customer.userId) {
      const user = await this.userRepository.findOne(customer.userId);
  
      if (user) {
        user.status = StatusEnum.DELETED;
        await this.userRepository.save(user);
      }
    }
    await this.customerRepository.delete(id);
  }
  

    /**
     * @ignore
     * @param state 
     * @returns 
     */
    async paginate(state: StateDto): Promise<Pagination<CustomerEntity>> {
      const options = { page: state.page.current, limit: state.page.size };
      const queryBuilder = this.customerRepository.createQueryBuilder('t');
      return await paginate<CustomerEntity>(this.queryBuilderService.getQuery(state, queryBuilder), options);
  }

}
