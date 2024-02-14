/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./apps/starnavigationapi/src/app/app.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const app_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/app.service.ts");
const transform_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/transform.interceptor.ts");
const message_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/message.dto.ts");
/**
 * This is controller class  uses Appservice as constructor .
 *
 */
let AppController = class AppController {
    constructor(appService) {
        this.appService = appService;
    }
    /**
     * With value inside MessageDto.
     * @returns
     */
    getData() {
        return this.appService.getData();
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(message_dto_1.MessageDto)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", typeof (_a = typeof message_dto_1.MessageDto !== "undefined" && message_dto_1.MessageDto) === "function" ? _a : Object)
], AppController.prototype, "getData", null);
AppController = (0, tslib_1.__decorate)([
    (0, common_1.Controller)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof app_service_1.AppService !== "undefined" && app_service_1.AppService) === "function" ? _b : Object])
], AppController);
exports.AppController = AppController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/app.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const serve_static_1 = __webpack_require__("@nestjs/serve-static");
const path_1 = __webpack_require__("path");
const app_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/app.controller.ts");
const app_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/app.service.ts");
const config_module_1 = __webpack_require__("./apps/starnavigationapi/src/app/config/app/config.module.ts");
const logs_middleware_1 = __webpack_require__("./apps/starnavigationapi/src/app/middleware/logs.middleware.ts");
const layer_module_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/layer.module.ts");
const provider_module_1 = __webpack_require__("./apps/starnavigationapi/src/app/providers/database/postgres/provider.module.ts");
/**
 * @description This module serve the client folder on root URL
 * @module This module is serving react GUI on root port
 */
let AppModule = 
/**
 * @class AppModule integrate AppModule with nestjs default NestModule
 */
class AppModule {
    configure(consumer) {
        consumer.apply(logs_middleware_1.LoggerMiddleware).forRoutes({ path: '*', method: common_1.RequestMethod.ALL });
    }
};
AppModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)('/home/star/gui/', 'client'),
                exclude:['/docs*'],
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join('/home/star/gui/client/', 'docs'),
                serveRoot: '/docs/gui'
            }),
		 serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join('/home/star/gui/client/', 'node-api'),
                serveRoot: '/docs/node-api'
            }),
		 serve_static_1.ServeStaticModule.forRoot({
                rootPath: path_1.join('/home/star/gui/client/', 'tcp-server'),
                serveRoot: '/docs/tcp-server'
            }),
            provider_module_1.PostgresDatabaseProviderModule,
            layer_module_1.LayerModule,
            config_module_1.AppConfigModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
    /**
     * @class AppModule integrate AppModule with nestjs default NestModule
     */
], AppModule);
exports.AppModule = AppModule;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/app.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
/**
 * This class returns with a message and name
 */
let AppService = class AppService {
    /**
     * This returns message and name
     * @returns {message: string , name:string}
     */
    getData() {
        return { message: 'Welcome to starnavigationapi!', name: 'StarNavigationSystem' };
    }
};
AppService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], AppService);
exports.AppService = AppService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/config/app/config.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const Joi = __webpack_require__("@hapi/joi");
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = __webpack_require__("./apps/starnavigationapi/src/app/config/app/configuration.ts");
const configuration_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/config/app/configuration.service.ts");
let AppConfigModule = 
/**
 * AppConfigModule class defines at which url the app is running
 */
class AppConfigModule {
};
AppConfigModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                validationSchema: Joi.object({
                    APP_NAME: Joi.string().default('application-service/secured'),
                    APP_ENV: Joi.string()
                        .valid('development', 'production', 'test', 'provision')
                        .default('development'),
                    APP_URL: Joi.string().default('http://my-app.test'),
                    APP_PORT: Joi.number().default(3333),
                    FRONTEND_APP_PATH: Joi.string().default('/client'),
                })
            })
        ],
        providers: [config_1.ConfigService, configuration_service_1.AppConfigService],
        exports: [config_1.ConfigService, configuration_service_1.AppConfigService]
    })
    /**
     * AppConfigModule class defines at which url the app is running
     */
], AppConfigModule);
exports.AppConfigModule = AppConfigModule;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/config/app/configuration.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppConfigService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
/**
 * This class conains name , env, url to which app is running
 * @constructor configService
 */
let AppConfigService = class AppConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get name() {
        return this.configService.get('app.name');
    }
    get env() {
        return this.configService.get('app.env');
    }
    get url() {
        return this.configService.get('app.url');
    }
    get port() {
        return Number(this.configService.get('app.port'));
    }
    get frontendAppPath() {
        return this.configService.get('app.frontendAppPath');
    }
};
AppConfigService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], AppConfigService);
exports.AppConfigService = AppConfigService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/config/app/configuration.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__("@nestjs/config");
exports["default"] = (0, config_1.registerAs)('app', () => ({
    env: process.env.APP_ENV,
    name: process.env.APP_NAME,
    url: process.env.APP_URL,
    port: process.env.APP_PORT,
    frontendAppPath: process.env.FRONTEND_APP_PATH
}));


/***/ }),

/***/ "./apps/starnavigationapi/src/app/config/database/postgres/config.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgresSQLConfigModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const Joi = __webpack_require__("@hapi/joi");
const config_1 = __webpack_require__("@nestjs/config");
const configuration_1 = __webpack_require__("./apps/starnavigationapi/src/app/config/database/postgres/configuration.ts");
const configuration_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/config/database/postgres/configuration.service.ts");
let PostgresSQLConfigModule = 
/**
 * This class config connectivity to postgres database
 */
class PostgresSQLConfigModule {
};
PostgresSQLConfigModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                load: [configuration_1.default],
                validationSchema: Joi.object({
                    POSTGRES_HOST: Joi.string().default(`${process.env.DATABASE_HOST}`),
                    POSTGRES_PORT: Joi.number().default(`${process.env.DATABASE_PORT}`),
                    POSTGRES_USERNAME: Joi.string().default(`${process.env.DATABASE_USERNAME}`),
                    POSTGRES_PASSWORD: Joi.string().default(`${process.env.DATABASE_PASSWORD}`),
                    POSTGRES_DBNAME: Joi.string().default(`${process.env.DATABASE_DBNAME}`),
                    DB_SYNCHRONIZE: Joi.boolean().default(`${process.env.DB_SYNCHRONIZE}`),
                    DB_LOGGING: Joi.boolean().default(`${process.env.DB_LOGGING}`),
                })
            })
        ],
        providers: [config_1.ConfigService, configuration_service_1.PostgresSqlConfigService],
        exports: [config_1.ConfigService, configuration_service_1.PostgresSqlConfigService]
    })
    /**
     * This class config connectivity to postgres database
     */
], PostgresSQLConfigModule);
exports.PostgresSQLConfigModule = PostgresSQLConfigModule;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/config/database/postgres/configuration.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgresSqlConfigService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const config_1 = __webpack_require__("@nestjs/config");
/**
 * Service dealing with app config based operations.
 *
 * @ignore
 */
let PostgresSqlConfigService = 
/**
 * This class returns with all the configService required to make connection
 */
class PostgresSqlConfigService {
    constructor(configService) {
        this.configService = configService;
    }
    get host() {
        return this.configService.get('postgres.host');
    }
    get port() {
        return Number(this.configService.get('postgres.port'));
    }
    get username() {
        return this.configService.get('postgres.username');
    }
    get password() {
        return this.configService.get('postgres.password');
    }
    get dbname() {
        return this.configService.get('postgres.dbname');
    }
    get synchronize() {
        return this.configService.get('postgres.synchronize');
    }
    get logging() {
        return this.configService.get('postgres.logging');
    }
};
PostgresSqlConfigService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
    /**
     * This class returns with all the configService required to make connection
     */
    ,
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], PostgresSqlConfigService);
exports.PostgresSqlConfigService = PostgresSqlConfigService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/config/database/postgres/configuration.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const config_1 = __webpack_require__("@nestjs/config");
/**
 * All the variables are defined here for making connection to database
 */
exports["default"] = (0, config_1.registerAs)('postgres', () => ({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    username: process.env.POSTGRES_USERNAME,
    password: process.env.POSTGRES_PASSWORD,
    dbname: process.env.POSTGRES_DBNAME,
    synchronize: process.env.DB_SYNCHRONIZE,
    logging: process.env.DB_LOGGING,
}));


/***/ }),

/***/ "./apps/starnavigationapi/src/app/dto/state.interface.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StateDto = exports.Filter = exports.Sort = exports.Page = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
const swagger_1 = __webpack_require__("@nestjs/swagger");
/**
 * @ignore
 */
class Page {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Page.prototype, "from", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Page.prototype, "to", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Page.prototype, "size", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], Page.prototype, "current", void 0);
exports.Page = Page;
/**
 * @ignore
 */
class Sort {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Sort.prototype, "by", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], Sort.prototype, "reverse", void 0);
exports.Sort = Sort;
/**
 * @ignore
 */
class Filter {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Filter.prototype, "property", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], Filter.prototype, "value", void 0);
exports.Filter = Filter;
/**
 * @ignore
 */
class StateDto {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Page)
], StateDto.prototype, "page", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Sort)
], StateDto.prototype, "sort", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ type: () => Filter }),
    (0, tslib_1.__metadata)("design:type", Array)
], StateDto.prototype, "filters", void 0);
exports.StateDto = StateDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/enum/ConfirmEnum.ts":
/***/ ((__unused_webpack_module, exports) => {


/**
 * This contains confirm type enum
 * @enum {Yes}
 * @enum {No}
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfirmEnum = void 0;
var ConfirmEnum;
(function (ConfirmEnum) {
    ConfirmEnum["Yes"] = "Yes";
    ConfirmEnum["No"] = "No";
})(ConfirmEnum = exports.ConfirmEnum || (exports.ConfirmEnum = {}));


/***/ }),

/***/ "./apps/starnavigationapi/src/app/enum/event.severity.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


/**
 * This contains event severity enum
 * @enum {low}
 * @enum {high}
 *  @enum {medium}
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventSeverityEnum = void 0;
var EventSeverityEnum;
(function (EventSeverityEnum) {
    EventSeverityEnum["low"] = "low";
    EventSeverityEnum["high"] = "high";
    EventSeverityEnum["medium"] = "medium";
})(EventSeverityEnum = exports.EventSeverityEnum || (exports.EventSeverityEnum = {}));


/***/ }),

/***/ "./apps/starnavigationapi/src/app/enum/notification.type.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


/**
 * This contains Notification type enum
 * @enum {EMAIL}
 * @enum {SMS}
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationTypeEnum = void 0;
var NotificationTypeEnum;
(function (NotificationTypeEnum) {
    NotificationTypeEnum["EMAIL"] = "EMAIL";
    NotificationTypeEnum["SMS"] = "SMS";
})(NotificationTypeEnum = exports.NotificationTypeEnum || (exports.NotificationTypeEnum = {}));


/***/ }),

/***/ "./apps/starnavigationapi/src/app/enum/notify.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


/**
 * This is notify enum type
 * @enum {OUTSIDE}
 * @enum {INSIDE}
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotifyEnum = void 0;
var NotifyEnum;
(function (NotifyEnum) {
    NotifyEnum["OUTSIDE"] = "OUTSIDE";
    NotifyEnum["INSIDE"] = "INSIDE";
})(NotifyEnum = exports.NotifyEnum || (exports.NotifyEnum = {}));


/***/ }),

/***/ "./apps/starnavigationapi/src/app/enum/packet.type.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


/**
 * This is packed type enum
 * @enum {H} type
 * @enum {T} type
 * @enum {P} type
 * @enum {A} type
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PacketTypeEnum = void 0;
var PacketTypeEnum;
(function (PacketTypeEnum) {
    PacketTypeEnum["H"] = "H";
    PacketTypeEnum["T"] = "T";
    PacketTypeEnum["P"] = "P";
    PacketTypeEnum["A"] = "A";
})(PacketTypeEnum = exports.PacketTypeEnum || (exports.PacketTypeEnum = {}));


/***/ }),

/***/ "./apps/starnavigationapi/src/app/enum/status.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


/**
 * This is status enum
 * @enum {ACTIVE} status
 * @enum {DELETED} status
 * @enum {DISABLED} status
 * @enum {PENDING} status
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.StatusEnum = void 0;
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["ACTIVE"] = "ACTIVE";
    StatusEnum["DELETED"] = "DELETED";
    StatusEnum["DISABLED"] = "DISABLED";
    StatusEnum["PENDING"] = "PENDING";
})(StatusEnum = exports.StatusEnum || (exports.StatusEnum = {}));


/***/ }),

/***/ "./apps/starnavigationapi/src/app/enum/user.type.enum.ts":
/***/ ((__unused_webpack_module, exports) => {


/**
 * This have enum type  user and service
 * @enum {USER}  What is user type
 * @enum {SERVICE} what is the service of user
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerType = exports.UserTypeEnum = void 0;
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["USER"] = "USER";
    UserTypeEnum["SERVICE"] = "SERVICE";
    UserTypeEnum["CUSTOMER"] = "CUSTOMER";
})(UserTypeEnum = exports.UserTypeEnum || (exports.UserTypeEnum = {}));
var CustomerType;
(function (CustomerType) {
    CustomerType["USER"] = "user";
    CustomerType["ADMIN"] = "ADMIN";
    CustomerType["CUSTOMER"] = "customer";
})(CustomerType = exports.CustomerType || (exports.CustomerType = {}));


/***/ }),

/***/ "./apps/starnavigationapi/src/app/interceptors/response.interceptor.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ResTransformInterceptor = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operators_1 = __webpack_require__("rxjs/operators");
/**
 * @ignore
 */
let ResTransformInterceptor = class ResTransformInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)(data => this.makeResponse(data)));
    }
    makeResponse(data) {
        return { status: "Success", errorInfo: { errorCode: 200, errorLevel: "OK", errorMessage: "Success" }, results: data };
    }
};
ResTransformInterceptor = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], ResTransformInterceptor);
exports.ResTransformInterceptor = ResTransformInterceptor;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/interceptors/transform.interceptor.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TransformInterceptor = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const operators_1 = __webpack_require__("rxjs/operators");
const class_transformer_1 = __webpack_require__("class-transformer");
/**
 * @ignore
 */
let TransformInterceptor = class TransformInterceptor {
    constructor(classType) {
        this.classType = classType;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)(data => (0, class_transformer_1.plainToClass)(this.classType, data, { excludeExtraneousValues: true })));
    }
};
TransformInterceptor = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__metadata)("design:paramtypes", [Object])
], TransformInterceptor);
exports.TransformInterceptor = TransformInterceptor;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/message.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MessageDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_transformer_1 = __webpack_require__("class-transformer");
/**
 * @ignore
 */
class MessageDto {
}
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", String)
], MessageDto.prototype, "message", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Exclude)(),
    (0, tslib_1.__metadata)("design:type", String)
], MessageDto.prototype, "name", void 0);
exports.MessageDto = MessageDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/middleware/logs.middleware.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerMiddleware = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
/**
 * This is a logger middleware class which returns with a message based on checking status code
 * @ignore
 */
let LoggerMiddleware = class LoggerMiddleware {
    constructor() {
        this.logger = new common_1.Logger('HTTP');
    }
    /**
     * Returns a message based
     * @argument request
     * @argument response
     * @argument next
     * @ignore
     */
    use(request, response, next) {
        /**
         * Callback function
         * @callback
         */
        response.on('finish', () => {
            const { method, originalUrl } = request;
            const { statusCode, statusMessage } = response;
            const message = `${method} ${originalUrl} ${statusCode} ${statusMessage}`;
            if (statusCode >= 500) {
                return this.logger.error(message);
            }
            else if (statusCode >= 400) {
                return this.logger.warn(message);
            }
            else
                return this.logger.log(message);
        });
        next();
    }
};
LoggerMiddleware = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], LoggerMiddleware);
exports.LoggerMiddleware = LoggerMiddleware;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/apl.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AplController_1, _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AplController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const state_interface_1 = __webpack_require__("./apps/starnavigationapi/src/app/dto/state.interface.ts");
const transform_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/transform.interceptor.ts");
const apl_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/apl.dto.ts");
const apl_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/apl.service.ts");
/**
 * Handles requests related to apl
 */
let AplController = AplController_1 = class AplController {
    /**
     * Constructor for apl controller
     * @param aplService
     */
    constructor(aplService) {
        this.aplService = aplService;
        this.logger = new common_1.Logger(AplController_1.name);
    }
    /**
     * Post method of apl for apl creation
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const d = yield this.aplService.create(data);
            this.logger.log(`data: ${JSON.stringify(d)}`);
            return this.aplService.create(data);
        });
    }
    /**
     * Get method of apl. Finds all the apl in database
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.aplService.findAll();
        });
    }
    /**
     * Get apl by id . Finds apl  based on id provided
     * @param id
     * @returns
     */
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.aplService.findById(id);
        });
    }
    /**
     * Put method of apl . Updates apl based on id and data
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.aplService.update(id, data);
        });
    }
    /**
     * Delete api request of apl. Deletes apl by id
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.aplService.remove(id);
        });
    }
    /**
     * Find apl list by pagination
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.aplService.paginate(state);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(apl_dto_1.AplDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Create Apl' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The apl has been successfully created.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof apl_dto_1.AplDto !== "undefined" && apl_dto_1.AplDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AplController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(apl_dto_1.AplDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Fin all apl' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AplController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(apl_dto_1.AplDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Find apl by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AplController.prototype, "findOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(apl_dto_1.AplDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Updated apl' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The apl has been successfully updated.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_c = typeof apl_dto_1.AplDto !== "undefined" && apl_dto_1.AplDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AplController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(apl_dto_1.AplDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Delete apl by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], AplController.prototype, "remove", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('paginate'),
    (0, swagger_1.ApiOperation)({ summary: 'Find apl list by pagination' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof state_interface_1.StateDto !== "undefined" && state_interface_1.StateDto) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], AplController.prototype, "paginate", null);
AplController = AplController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'assets/apl'
    }),
    (0, swagger_1.ApiTags)('apl-controller'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof apl_service_1.AplService !== "undefined" && apl_service_1.AplService) === "function" ? _g : Object])
], AplController);
exports.AplController = AplController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/asset.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AssetController_1, _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssetController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const https = __webpack_require__("https");
const axios_1 = __webpack_require__("axios");
const state_interface_1 = __webpack_require__("./apps/starnavigationapi/src/app/dto/state.interface.ts");
const response_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/response.interceptor.ts");
const asset_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/asset.dto.ts");
const asset_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/asset.service.ts");
/**
 * Handles api request related to asset
 */
let AssetController = AssetController_1 = class AssetController {
    /**
     * Constructor for asset controller
     * @param assetService
     */
    constructor(assetService) {
        this.assetService = assetService;
        this.logger = new common_1.Logger(AssetController_1.name);
    }
    /**
     * Creates new asset
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.assetService.create(data);
        });
    }
    /**
     * Find all the assets in database
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.assetService.findAll();
        });
    }
    findUserAssets(customerId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.assetService.findUserAssets(customerId);
        });
    }
    findCustomerAssets(customerId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.assetService.findCustomerAssets(customerId);
        });
    }
    //Adding customerId and customer filter 
    // @Get('latestdata')
    // @HttpCode(HttpStatus.OK)
    // @ApiOperation({ summary: 'Find Latest Data for an Asset' })
    // @ApiResponse({ status: 403, description: 'Forbidden' })
    // public async findAssetData(
    //   @Query('sort') sort?: 'asc' | 'desc',
    //   @Query('filter') filter?: 'active' | 'inactive',
    //   @Query('search') search?: string,
    //   @Query('customerId') customerId?: string, // Add this query parameter
    //   @Query('id') id?: string, // Add this query parameter
    // ): Promise<NodeApiAssetData[]> {
    //   const NODE_API_URL = 'https://star-ads-app.com:3378/getLatestAssetData';
    //     //  const NODE_API_URL='http://103.10.234.244:3378/getLatestAssetData';
    //   // const NODE_API_URL=`http://localhost:3378/getLatestAssetData`;
    //   const nodeResponse = await axios.get(NODE_API_URL);
    //   const nodeApiAssetData: NodeApiAssetData[] = nodeResponse.data;
    //   let nestAssetData = await this.assetService.findAll();
    //   let matchedData = [];
    //   if (customerId) { // Check if customerId is provided
    //     // Find asset data matching the requested customerId
    //     nestAssetData = nestAssetData.filter((asset: any) => asset.customerId.toString() === customerId);
    //   } else if (id) {
    //     nestAssetData = nestAssetData.filter((asset: any) => asset.customerId.toString() === id);
    //   } 
    //     for (const nestAsset of nestAssetData) {
    //       const matchedNestData = nodeApiAssetData.find((data: any) => data.asset_id === nestAsset.esn);
    //       if (matchedNestData) {
    //         matchedData.push(Object.assign(nestAsset, matchedNestData));
    //       }
    //     }
    //     if (filter) {
    //       matchedData = matchedData.filter((asset: any) => {
    //         const elapsedTime = asset.elapsed_time.days * 86400 + asset.elapsed_time.hours * 3600 + asset.elapsed_time.minutes * 60;
    //         if (elapsedTime > 14 * 86400) {
    //           return filter === 'inactive';
    //         } else {
    //           return filter === 'active';
    //         }
    //       });
    //     }
    //     if (search) {
    //       matchedData = matchedData.filter((asset: any) => asset.asset_id === search);
    //     }
    //     if (sort) {
    //       matchedData = matchedData.sort((a: any, b: any) => {
    //         const aElapsedTime = a.elapsed_time.days * 86400 + a.elapsed_time.hours * 3600 + a.elapsed_time.minutes * 60;
    //         const bElapsedTime = b.elapsed_time.days * 86400 + b.elapsed_time.hours * 3600 + b.elapsed_time.minutes * 60;
    //         if (sort === 'asc') {
    //           return aElapsedTime - bElapsedTime;
    //         } else {
    //           return bElapsedTime - aElapsedTime;
    //         }
    //       });
    //     }
    //   return matchedData;
    // }
    findAssetData(sort, filter, search, customerId, // Add this query parameter
    id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const NODE_API_URL = 'https://star-ads-app.com:3378/getLatestAssetData';
                //  const NODE_API_URL='http://103.10.234.244:3378/getLatestAssetData';
                // const NODE_API_URL=`http://localhost:3378/getLatestAssetData`;
                // const nodeResponse = await axios.get(NODE_API_URL );
                const axiosConfig = {
                    url: NODE_API_URL,
                    method: 'get',
                    httpsAgent: new https.Agent({ rejectUnauthorized: false }),
                };
                const nodeResponse = yield (0, axios_1.default)(axiosConfig);
                const nodeApiAssetData = nodeResponse.data;
                let nestAssetData = yield this.assetService.findAll();
                let matchedData = [];
                if (customerId) {
                    nestAssetData = nestAssetData.filter((asset) => asset.customerId.toString() === customerId);
                }
                else if (id) {
                    nestAssetData = nestAssetData.filter((asset) => asset.customerId.toString() === id);
                }
                for (const nestAsset of nestAssetData) {
                    const matchedNestData = nodeApiAssetData.find((data) => data.asset_id === nestAsset.esn);
                    if (matchedNestData) {
                        matchedData.push(Object.assign(nestAsset, matchedNestData));
                    }
                }
                if (filter) {
                    matchedData = matchedData.filter((asset) => {
                        const elapsedTime = asset.elapsed_time.days * 86400 + asset.elapsed_time.hours * 3600 + asset.elapsed_time.minutes * 60;
                        if (elapsedTime > 14 * 86400) {
                            return filter === 'inactive';
                        }
                        else {
                            return filter === 'active';
                        }
                    });
                }
                if (search) {
                    matchedData = matchedData.filter((asset) => asset.asset_id === search);
                }
                if (sort) {
                    matchedData = matchedData.sort((a, b) => {
                        const aElapsedTime = a.elapsed_time.days * 86400 + a.elapsed_time.hours * 3600 + a.elapsed_time.minutes * 60;
                        const bElapsedTime = b.elapsed_time.days * 86400 + b.elapsed_time.hours * 3600 + b.elapsed_time.minutes * 60;
                        if (sort === 'asc') {
                            return aElapsedTime - bElapsedTime;
                        }
                        else {
                            return bElapsedTime - aElapsedTime;
                        }
                    });
                }
                return matchedData;
            }
            catch (error) {
                // Log the error
                console.error('Error occurred while fetching data from the Node API:', error);
                // Return empty values or handle the error gracefully
                throw error;
            }
        });
    }
    /**
     * Find asset based on customer id
     * @param id
     * @returns
     */
    findAssetOfUser(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.assetService.findUserAsset(id);
        });
    }
    /**
     * Updates existing asset with new data
     * @param data
     * @returns
     */
    update(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.assetService.update(data);
        });
    }
    /**
     * Deletes asset based on id
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.assetService.remove(id);
        });
    }
    /**
     * Find asset list by pagination
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.assetService.paginate(state);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create Asset' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The asset has been successfully created.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof asset_dto_1.AssetDto !== "undefined" && asset_dto_1.AssetDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], AssetController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Fin all asset' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssetController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)('user-assets/:customerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find assets by customer ID' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('customerId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssetController.prototype, "findUserAssets", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)('customer-assets/:customerId'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find assets by customer ID' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('customerId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssetController.prototype, "findCustomerAssets", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)('latestdata'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find Latest Data for an Asset' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden' }),
    (0, tslib_1.__param)(0, (0, common_1.Query)('sort')),
    (0, tslib_1.__param)(1, (0, common_1.Query)('filter')),
    (0, tslib_1.__param)(2, (0, common_1.Query)('search')),
    (0, tslib_1.__param)(3, (0, common_1.Query)('customerId')),
    (0, tslib_1.__param)(4, (0, common_1.Query)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [String, String, String, String, String]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], AssetController.prototype, "findAssetData", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find asset by customerId' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssetController.prototype, "findAssetOfUser", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Updated asset' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The asset has been successfully updated.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof asset_dto_1.AssetDto !== "undefined" && asset_dto_1.AssetDto) === "function" ? _d : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], AssetController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete asset by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], AssetController.prototype, "remove", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('paginate'),
    (0, swagger_1.ApiOperation)({ summary: 'Find asset list by pagination' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof state_interface_1.StateDto !== "undefined" && state_interface_1.StateDto) === "function" ? _f : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], AssetController.prototype, "paginate", null);
AssetController = AssetController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'assets'
    }),
    (0, swagger_1.ApiTags)('assets'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResTransformInterceptor),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_h = typeof asset_service_1.AssetService !== "undefined" && asset_service_1.AssetService) === "function" ? _h : Object])
], AssetController);
exports.AssetController = AssetController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/customer.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var CustomerController_1, _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const response_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/response.interceptor.ts");
const transform_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/transform.interceptor.ts");
const customer_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/customer.dto.ts");
const customer_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/customer.service.ts");
// import { NewCustomerEntity } from "../entity/customer.entity";
/**
 * Handles api requests related to customers
 */
let CustomerController = CustomerController_1 = class CustomerController {
    constructor(customerService) {
        this.customerService = customerService;
        this.logger = new common_1.Logger(CustomerController_1.name);
    }
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.customerService.create(data);
        });
    }
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.customerService.findAll();
        });
    }
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.customerService.findOne(id);
        });
    }
    findCustomerUser(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.customerService.findCustomerUser(id);
        });
    }
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.customerService.update(id, data);
        });
    }
    delete(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.customerService.delete(id);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(customer_dto_1.CustomerDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Create Customer' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The customer has been successfully created.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof customer_dto_1.CustomerDto !== "undefined" && customer_dto_1.CustomerDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], CustomerController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find all customer' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CustomerController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find a customer by ID' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'The customer has been successfully retrieved.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'The specified customer could not be found.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CustomerController.prototype, "findOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)('user/:id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find a customer user by ID' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'The customer has been successfully retrieved.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'The specified customer could not be found.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CustomerController.prototype, "findCustomerUser", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Update a customer by ID' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.OK, description: 'The customer has been successfully updated.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'The specified customer could not be found.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_c = typeof customer_dto_1.CustomerDto !== "undefined" && customer_dto_1.CustomerDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CustomerController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.NO_CONTENT),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a customer by ID' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NO_CONTENT, description: 'The customer has been successfully deleted.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.NOT_FOUND, description: 'The specified customer could not be found.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], CustomerController.prototype, "delete", null);
CustomerController = CustomerController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'customers'
    }),
    (0, swagger_1.ApiTags)('customer-controller'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResTransformInterceptor),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_d = typeof customer_service_1.CustomerService !== "undefined" && customer_service_1.CustomerService) === "function" ? _d : Object])
], CustomerController);
exports.CustomerController = CustomerController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/event.based.notification.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g, _h;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventNotificationController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const event_notification_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/event.notification.dto.ts");
const eventNotification_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/eventNotification.service.ts");
const event_based_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.based.notification.entity.ts");
let EventNotificationController = class EventNotificationController {
    constructor(eventNotificationService) {
        this.eventNotificationService = eventNotificationService;
    }
    create(data) {
        return this.eventNotificationService.create(data);
    }
    findById(id) {
        return this.eventNotificationService.findById(id);
    }
    findAll() {
        return this.eventNotificationService.findAll();
    }
    update(id, data) {
        return this.eventNotificationService.update(id, data);
    }
    remove(id) {
        return this.eventNotificationService.remove(id);
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Created', type: event_based_notification_entity_1.EventBasedNotificationEntity }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof event_notification_dto_1.EventNotificationMainDto !== "undefined" && event_notification_dto_1.EventNotificationMainDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], EventNotificationController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK', type: event_based_notification_entity_1.EventBasedNotificationEntity }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Event Notification not found' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_c = typeof Promise !== "undefined" && Promise) === "function" ? _c : Object)
], EventNotificationController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK', type: [event_based_notification_entity_1.EventBasedNotificationEntity] }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], EventNotificationController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK', type: event_based_notification_entity_1.EventBasedNotificationEntity }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Event Notification not found' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_e = typeof event_notification_dto_1.EventNotificationMainDto !== "undefined" && event_notification_dto_1.EventNotificationMainDto) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], EventNotificationController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK', type: event_based_notification_entity_1.EventBasedNotificationEntity }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Event Notification not found' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_g = typeof Promise !== "undefined" && Promise) === "function" ? _g : Object)
], EventNotificationController.prototype, "remove", null);
EventNotificationController = (0, tslib_1.__decorate)([
    (0, swagger_1.ApiTags)('Event Notifications'),
    (0, common_1.Controller)('event-notifications'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_h = typeof eventNotification_service_1.EventNotificationService !== "undefined" && eventNotification_service_1.EventNotificationService) === "function" ? _h : Object])
], EventNotificationController);
exports.EventNotificationController = EventNotificationController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/event.detail.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var EventDetailController_1, _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventDetailController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const state_interface_1 = __webpack_require__("./apps/starnavigationapi/src/app/dto/state.interface.ts");
const transform_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/transform.interceptor.ts");
const event_detail_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/event.detail.dto.ts");
const event_detail_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/event.detail.service.ts");
/**
 * Handles Event API request
 */
let EventDetailController = EventDetailController_1 = class EventDetailController {
    /**
     * Constructor for aplservice
     * @param aplService
     */
    constructor(aplService) {
        this.aplService = aplService;
        this.logger = new common_1.Logger(EventDetailController_1.name);
    }
    /**
     * Create new event
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const d = yield this.aplService.create(data);
            this.logger.log(`data: ${JSON.stringify(d)}`);
            return this.aplService.create(data);
        });
    }
    /**
     * Find all the event details
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.aplService.findAll();
        });
    }
    /**
     * Find event detail by id
     * @param id
     * @returns
     */
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.aplService.findById(id);
        });
    }
    /**
     * Updates event detail
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.aplService.update(id, data);
        });
    }
    /**
     * Delete event by id
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.aplService.remove(id);
        });
    }
    /**
     * Find event detail list by pagination
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.aplService.paginate(state);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(event_detail_dto_1.EventDetailDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Create event detail' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The event detail has been successfully created.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof event_detail_dto_1.EventDetailDto !== "undefined" && event_detail_dto_1.EventDetailDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], EventDetailController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(event_detail_dto_1.EventDetailDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Fin all event detail' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], EventDetailController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(event_detail_dto_1.EventDetailDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Find event detail by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], EventDetailController.prototype, "findOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(event_detail_dto_1.EventDetailDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Updated event detail' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The event detail has been successfully updated.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_c = typeof event_detail_dto_1.EventDetailDto !== "undefined" && event_detail_dto_1.EventDetailDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], EventDetailController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(event_detail_dto_1.EventDetailDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Delete event detail by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], EventDetailController.prototype, "remove", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('paginate'),
    (0, swagger_1.ApiOperation)({ summary: 'Find event detail list by pagination' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof state_interface_1.StateDto !== "undefined" && state_interface_1.StateDto) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], EventDetailController.prototype, "paginate", null);
EventDetailController = EventDetailController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'event-details'
    }),
    (0, swagger_1.ApiTags)('event-details-controller'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof event_detail_service_1.EventDetailService !== "undefined" && event_detail_service_1.EventDetailService) === "function" ? _g : Object])
], EventDetailController);
exports.EventDetailController = EventDetailController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/geofence.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var GeofenceController_1, _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeofenceController = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const state_interface_1 = __webpack_require__("./apps/starnavigationapi/src/app/dto/state.interface.ts");
const response_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/response.interceptor.ts");
const geofence_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/geofence.dto.ts");
const geofence_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/geofence.service.ts");
/**
 * Handles geofence API request
 */
let GeofenceController = GeofenceController_1 = class GeofenceController {
    /**
     * Constructor for geofence controller
     * @param geofenceService
     */
    constructor(geofenceService) {
        this.geofenceService = geofenceService;
        this.logger = new common_1.Logger(GeofenceController_1.name);
    }
    /**
     * Create new geofence
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.geofenceService.create(data);
        });
    }
    /**
     * Find all geofence
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.geofenceService.findAll();
        });
    }
    /**
     * Find geofence template by id
     * @param id
     * @returns
     */
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.geofenceService.findById(id);
        });
    }
    /**
     * Update geofence template by id and new data
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.geofenceService.update(id, data);
        });
    }
    /**
     * Delete geofence by id
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.geofenceService.remove(id);
        });
    }
    /**
     * Find notification template list by pagination
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.geofenceService.paginate(state);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create geofence' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The geofence has been successfully created.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof geofence_dto_1.GeofenceDto !== "undefined" && geofence_dto_1.GeofenceDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], GeofenceController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find all geofence' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], GeofenceController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find geofence template by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], GeofenceController.prototype, "findOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Updated geofence template' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The geofence has been successfully updated.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_c = typeof geofence_dto_1.GeofenceDto !== "undefined" && geofence_dto_1.GeofenceDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], GeofenceController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete geofence by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], GeofenceController.prototype, "remove", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('paginate'),
    (0, swagger_1.ApiOperation)({ summary: 'Find notification template list by pagination' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof state_interface_1.StateDto !== "undefined" && state_interface_1.StateDto) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], GeofenceController.prototype, "paginate", null);
GeofenceController = GeofenceController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'geofence'
    }),
    (0, swagger_1.ApiTags)('geofence-controller'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResTransformInterceptor),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof geofence_service_1.GeofenceService !== "undefined" && geofence_service_1.GeofenceService) === "function" ? _g : Object])
], GeofenceController);
exports.GeofenceController = GeofenceController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/group.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var GroupController_1, _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroupController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const state_interface_1 = __webpack_require__("./apps/starnavigationapi/src/app/dto/state.interface.ts");
const transform_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/transform.interceptor.ts");
const group_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/group.dto.ts");
const group_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/group.service.ts");
/**
 * Handles api request related to group
 */
let GroupController = GroupController_1 = class GroupController {
    /**
     * Constructor for group controller
     * @param groupService
     */
    constructor(groupService) {
        this.groupService = groupService;
        this.logger = new common_1.Logger(GroupController_1.name);
    }
    /**
     * Create a group
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.groupService.create(data);
        });
    }
    /**
     * Find all the group
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.groupService.findAll();
        });
    }
    /**
     * Find a group by id
     * @param id
     * @returns
     */
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.groupService.findById(id);
        });
    }
    /**
     * Update a group with new data based on id
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.groupService.update(id, data);
        });
    }
    /**
     * Delete a group based on id
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.groupService.remove(id);
        });
    }
    /**
     * Find group list by pagination
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.groupService.paginate(state);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(group_dto_1.GroupDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Create Group' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The group has been successfully created.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof group_dto_1.GroupDto !== "undefined" && group_dto_1.GroupDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], GroupController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(group_dto_1.GroupDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Find all group' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], GroupController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(group_dto_1.GroupDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Find group by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], GroupController.prototype, "findOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(group_dto_1.GroupDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Updated group' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The group has been successfully updated.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_c = typeof group_dto_1.GroupDto !== "undefined" && group_dto_1.GroupDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], GroupController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.UseInterceptors)(new transform_interceptor_1.TransformInterceptor(group_dto_1.GroupDto)),
    (0, swagger_1.ApiOperation)({ summary: 'Delete group by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], GroupController.prototype, "remove", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('paginate'),
    (0, swagger_1.ApiOperation)({ summary: 'Find group list by pagination' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof state_interface_1.StateDto !== "undefined" && state_interface_1.StateDto) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], GroupController.prototype, "paginate", null);
GroupController = GroupController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'groups'
    }),
    (0, swagger_1.ApiTags)('groups'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof group_service_1.GroupService !== "undefined" && group_service_1.GroupService) === "function" ? _g : Object])
], GroupController);
exports.GroupController = GroupController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/landmark.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var LandmarkController_1, _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LandmarkController = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const state_interface_1 = __webpack_require__("./apps/starnavigationapi/src/app/dto/state.interface.ts");
const landmark_create_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/landmark.create.dto.ts");
const landmark_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/landmark.service.ts");
const response_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/response.interceptor.ts");
/**
 * handles request related to landmarks
 */
let LandmarkController = LandmarkController_1 = class LandmarkController {
    /**
     * Constructor for landmark controller
     * @param landmarkService
     */
    constructor(landmarkService) {
        this.landmarkService = landmarkService;
        this.logger = new common_1.Logger(LandmarkController_1.name);
    }
    /**
     * handles landmark creation
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.landmarkService.create(data);
        });
    }
    /**
     * Find all the landmark
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.landmarkService.findAll();
        });
    }
    /**
     * Find a landmark by id provided
     * @param id
     * @returns
     */
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.landmarkService.findById(id);
        });
    }
    /**
     * Updates a landmark with new data based on id
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.landmarkService.update(id, data);
        });
    }
    /**
     * Delete a landmark
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.landmarkService.remove(id);
        });
    }
    /**
     * Find landmark list by pagination
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.landmarkService.paginate(state);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create Landmark' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The landmark has been successfully created.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof landmark_create_dto_1.LandmarkCreateDto !== "undefined" && landmark_create_dto_1.LandmarkCreateDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], LandmarkController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Fin all landmark' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], LandmarkController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find landmark by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], LandmarkController.prototype, "findOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Updated Landmark' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The landmark has been successfully updated.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_c = typeof landmark_create_dto_1.LandmarkCreateDto !== "undefined" && landmark_create_dto_1.LandmarkCreateDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], LandmarkController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete landmark by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], LandmarkController.prototype, "remove", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('paginate'),
    (0, swagger_1.ApiOperation)({ summary: 'Find landmark list by pagination' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof state_interface_1.StateDto !== "undefined" && state_interface_1.StateDto) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], LandmarkController.prototype, "paginate", null);
LandmarkController = LandmarkController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'landmarks'
    }),
    (0, swagger_1.ApiTags)('landmarks'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResTransformInterceptor),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof landmark_service_1.LandmarkService !== "undefined" && landmark_service_1.LandmarkService) === "function" ? _g : Object])
], LandmarkController);
exports.LandmarkController = LandmarkController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/layer.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var LayerController_1, _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayerController = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const state_interface_1 = __webpack_require__("./apps/starnavigationapi/src/app/dto/state.interface.ts");
const response_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/response.interceptor.ts");
const layer_create_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/layer.create.dto.ts");
const layer_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/layer.service.ts");
/**
 * This is LayerController class. handles API request related to Layer
 */
let LayerController = LayerController_1 = class LayerController {
    /**
     * Constructor for layer services
     * @param layerService
     *
     */
    constructor(layerService) {
        this.layerService = layerService;
        this.logger = new common_1.Logger(LayerController_1.name);
    }
    /**
     * This handles layer creation
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.create(data);
        });
    }
    /**
     * Handles find all the layer rquest
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.findAll();
        });
    }
    /**
     * Find layer by id
     * @param id
     * @returns
     */
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.findById(id);
        });
    }
    /**
     * Update a layer
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.update(id, data);
        });
    }
    /**
     * Handles layer deletion
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.remove(id);
        });
    }
    /**
     * Find layer list  by pagination
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.paginate(state);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create Layer' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The layer has been successfully created.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof layer_create_dto_1.LayerCreateDto !== "undefined" && layer_create_dto_1.LayerCreateDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], LayerController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Fin all layers' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], LayerController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find layer by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], LayerController.prototype, "findOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Updated Layer' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The layer has been successfully updated.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_c = typeof layer_create_dto_1.LayerCreateDto !== "undefined" && layer_create_dto_1.LayerCreateDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], LayerController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete layer by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], LayerController.prototype, "remove", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('paginate'),
    (0, swagger_1.ApiOperation)({ summary: 'Find layer list by pagination' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof state_interface_1.StateDto !== "undefined" && state_interface_1.StateDto) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], LayerController.prototype, "paginate", null);
LayerController = LayerController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'layers'
    }),
    (0, swagger_1.ApiTags)('layers'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResTransformInterceptor),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof layer_service_1.LayerService !== "undefined" && layer_service_1.LayerService) === "function" ? _g : Object])
], LayerController);
exports.LayerController = LayerController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/newlayer.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var NewLayerController_1, _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewLayerController = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const response_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/response.interceptor.ts");
const newlayer_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/newlayer.service.ts");
const newlayer_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/newlayer.dto.ts");
/**
 * handles request related to NewLayers
 */
let NewLayerController = NewLayerController_1 = class NewLayerController {
    /**
     * Constructor for NewLayer controller
     * @param newlayer
     */
    constructor(newlayer) {
        this.newlayer = newlayer;
        this.logger = new common_1.Logger(NewLayerController_1.name);
    }
    // constructor(private  productCategoryService:NewLayerService ) {}
    //   /**
    //    * handles NewLayer creation
    //    * @param data 
    //    * @returns 
    //    */
    create(layerDto) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.newlayer.createLayer(layerDto);
        });
    }
    getLayers() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.newlayer.getLayers();
        });
    }
    updateLayer(layerId, layerDTO) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const updatedLayer = yield this.newlayer.updateLayer(layerId, layerDTO);
            if (!updatedLayer) {
                throw new common_1.NotFoundException(`Layer with id ${layerId} not found`);
            }
            return updatedLayer;
        });
    }
    deleteLayer(layerId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            yield this.newlayer.deleteLayer(layerId);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new layer' }),
    (0, swagger_1.ApiResponse)({
        status: 201,
        description: 'The layer has been successfully created.',
        type: newlayer_dto_1.NLayerDto,
    }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof newlayer_dto_1.NLayerDto !== "undefined" && newlayer_dto_1.NLayerDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NewLayerController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all layers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Successful retrieval of layers', type: newlayer_dto_1.NLayerDto, isArray: true }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], NewLayerController.prototype, "getLayers", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_c = typeof newlayer_dto_1.NLayerDto !== "undefined" && newlayer_dto_1.NLayerDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], NewLayerController.prototype, "updateLayer", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], NewLayerController.prototype, "deleteLayer", null);
NewLayerController = NewLayerController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'newlayer'
    }),
    (0, swagger_1.ApiTags)('newlayer'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResTransformInterceptor),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof newlayer_service_1.NewLayerService !== "undefined" && newlayer_service_1.NewLayerService) === "function" ? _f : Object])
], NewLayerController);
exports.NewLayerController = NewLayerController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/notification.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var NotificationController_1, _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationController = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const state_interface_1 = __webpack_require__("./apps/starnavigationapi/src/app/dto/state.interface.ts");
const response_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/response.interceptor.ts");
const notification_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/notification.dto.ts");
const notification_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/notification.service.ts");
/**
 * This handles API request related to Notification
 */
let NotificationController = NotificationController_1 = class NotificationController {
    /**
     * Constructor Controller for notification
     * @param layerService
     */
    constructor(layerService) {
        this.layerService = layerService;
        this.logger = new common_1.Logger(NotificationController_1.name);
    }
    /**
     * Create new notification
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.create(data);
        });
    }
    /**
     * Get all the notitifcation
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.findAll();
        });
    }
    /**
     * Find notification by id
     * @param id
     * @returns
     */
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.findById(id);
        });
    }
    /**
     * Updated notification template
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.update(id, data);
        });
    }
    /**
     * Delete notification  by id
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.remove(id);
        });
    }
    /**
     * Find notification template list by pagination
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.paginate(state);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create notification' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The notification template has been successfully created.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof notification_dto_1.NotificationDto !== "undefined" && notification_dto_1.NotificationDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], NotificationController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find all notification template' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NotificationController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find notification template by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NotificationController.prototype, "findOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Updated notification template' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The notification template has been successfully updated.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_c = typeof notification_dto_1.NotificationDto !== "undefined" && notification_dto_1.NotificationDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NotificationController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete layer by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], NotificationController.prototype, "remove", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('paginate'),
    (0, swagger_1.ApiOperation)({ summary: 'Find notification template list by pagination' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof state_interface_1.StateDto !== "undefined" && state_interface_1.StateDto) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], NotificationController.prototype, "paginate", null);
NotificationController = NotificationController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'notification'
    }),
    (0, swagger_1.ApiTags)('notification-controller'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResTransformInterceptor),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof notification_service_1.NotificationService !== "undefined" && notification_service_1.NotificationService) === "function" ? _g : Object])
], NotificationController);
exports.NotificationController = NotificationController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/notification.template.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var NotificationTemplateController_1, _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationTemplateController = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const state_interface_1 = __webpack_require__("./apps/starnavigationapi/src/app/dto/state.interface.ts");
const response_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/response.interceptor.ts");
const notification_template_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/notification.template.dto.ts");
const notification_template_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/notification.template.service.ts");
/**
 * This handles API requests related to NotificationTemplateController.
 */
let NotificationTemplateController = NotificationTemplateController_1 = class NotificationTemplateController {
    /**
     * Constructor for notification template controller
     * @param layerService
     */
    constructor(layerService) {
        this.layerService = layerService;
        this.logger = new common_1.Logger(NotificationTemplateController_1.name);
    }
    /**
     * Create notification template
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.create(data);
        });
    }
    /**
     * Find all the notification template
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.findAll();
        });
    }
    /**
     * Find notification based on template id
     * @param id
     * @returns
     */
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.findById(id);
        });
    }
    /**
     * Updated notification template
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.update(id, data);
        });
    }
    /**
     * Delete Notification by id
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.remove(id);
        });
    }
    /**
     * Find notification template list by pagination
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.layerService.paginate(state);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Create notification template' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The notification template has been successfully created.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof notification_template_dto_1.NotificationTemplateDto !== "undefined" && notification_template_dto_1.NotificationTemplateDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], NotificationTemplateController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Fin all notification template' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NotificationTemplateController.prototype, "findAll", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find notification template by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NotificationTemplateController.prototype, "findOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    (0, swagger_1.ApiOperation)({ summary: 'Updated notification template' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, swagger_1.ApiResponse)({ status: common_1.HttpStatus.CREATED, description: 'The notification template has been successfully updated.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_c = typeof notification_template_dto_1.NotificationTemplateDto !== "undefined" && notification_template_dto_1.NotificationTemplateDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], NotificationTemplateController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Delete notification by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], NotificationTemplateController.prototype, "remove", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('paginate'),
    (0, swagger_1.ApiOperation)({ summary: 'Find notification template list by pagination' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_e = typeof state_interface_1.StateDto !== "undefined" && state_interface_1.StateDto) === "function" ? _e : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], NotificationTemplateController.prototype, "paginate", null);
NotificationTemplateController = NotificationTemplateController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'notification-template'
    }),
    (0, swagger_1.ApiTags)('notification-template-controller'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResTransformInterceptor),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof notification_template_service_1.NotificationTemplateService !== "undefined" && notification_template_service_1.NotificationTemplateService) === "function" ? _g : Object])
], NotificationTemplateController);
exports.NotificationTemplateController = NotificationTemplateController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/report-notification.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportNotificationController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const report_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/report-notification.entity.ts");
const report_notification_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/report-notification.dto.ts");
const report_notification_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/report-notification.service.ts");
let ReportNotificationController = class ReportNotificationController {
    constructor(reportNotificationService) {
        this.reportNotificationService = reportNotificationService;
    }
    create(data) {
        return this.reportNotificationService.create(data);
    }
    update(customerId, reportName, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.reportNotificationService.update(customerId, reportName, data);
        });
    }
    get(customerId, reportName) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.reportNotificationService.getByCustomerIdAndReportName(customerId, reportName);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Created', type: report_notification_entity_1.ReportNotification }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof report_notification_dto_1.ReportNotificationDto !== "undefined" && report_notification_dto_1.ReportNotificationDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_b = typeof Promise !== "undefined" && Promise) === "function" ? _b : Object)
], ReportNotificationController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':customerId/:reportName'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Updated', type: report_notification_entity_1.ReportNotification }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Report not found' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('customerId')),
    (0, tslib_1.__param)(1, (0, common_1.Param)('reportName')),
    (0, tslib_1.__param)(2, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, String, typeof (_c = typeof report_notification_dto_1.ReportNotificationDto !== "undefined" && report_notification_dto_1.ReportNotificationDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], ReportNotificationController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':customerId/:reportName'),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'OK', type: report_notification_entity_1.ReportNotification }),
    (0, swagger_1.ApiNotFoundResponse)({ description: 'Report not found' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('customerId')),
    (0, tslib_1.__param)(1, (0, common_1.Param)('reportName')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, String]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], ReportNotificationController.prototype, "get", null);
ReportNotificationController = (0, tslib_1.__decorate)([
    (0, swagger_1.ApiTags)('Report Notifications'),
    (0, common_1.Controller)('report-notifications'),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_f = typeof report_notification_service_1.ReportNotificationService !== "undefined" && report_notification_service_1.ReportNotificationService) === "function" ? _f : Object])
], ReportNotificationController);
exports.ReportNotificationController = ReportNotificationController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/controller/user.controller.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UserController_1, _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const user_type_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/user.type.enum.ts");
const response_interceptor_1 = __webpack_require__("./apps/starnavigationapi/src/app/interceptors/response.interceptor.ts");
const newUser_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/newUser.dto.ts");
const updateUser_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/updateUser.dto.ts");
const user_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/user.entity.ts");
const newUser_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/newUser.service.ts");
/**
 * This is UserController  class. It handles all the API request related to users
 */
let UserController = UserController_1 = class UserController {
    constructor(userService) {
        this.userService = userService;
        this.logger = new common_1.Logger(UserController_1.name);
    }
    /**
     * Handles User creation request . Creates new user in database
     * @param data
     * @returns
     */
    create(userDto) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.userService.create(userDto);
        });
    }
    /**
     * Find all the users from database
     * @returns
     */
    find() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.userService.find();
        });
    }
    /**
     * Find users based on id provided
     * @param id
     * @returns
     */
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.userService.findById(id);
        });
    }
    /**
     * Find user based on accountType
     * @param accountType
     * @returns
     */
    findByAccountType(accountType) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.userService.findByAccountType(accountType);
        });
    }
    /**
     * Update user with new data
     * @param data
     * @returns
     */
    update(id, updateUserDto) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.userService.update(id, updateUserDto);
        });
    }
    /**
     * Handles deletion of user.
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.userService.remove(id);
        });
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
    login(body) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const username = body.username;
            const loginId = body.login_id;
            const password = body.password;
            const user = yield this.userService.login(username, loginId, password);
            return user;
        });
    }
    getUsersByCustomerId(customerId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.userService.getUsersByCustomerId(customerId);
        });
    }
};
(0, tslib_1.__decorate)([
    (0, common_1.Post)(),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User created successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, swagger_1.ApiBody)({ type: newUser_dto_1.NewUserDto }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof newUser_dto_1.NewUserDto !== "undefined" && newUser_dto_1.NewUserDto) === "function" ? _a : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiOperation)({ summary: 'Get all users' }),
    (0, swagger_1.ApiResponse)({
        status: 200,
        description: 'Get all users successfully',
    }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, common_1.Get)(),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", []),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Find user by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "findOne", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)(':accountType'),
    (0, swagger_1.ApiOperation)({ summary: 'Find users by account type' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Users were found successfully.',
        type: user_entity_1.UserEntity }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('accountType')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_b = typeof user_type_enum_1.UserTypeEnum !== "undefined" && user_type_enum_1.UserTypeEnum) === "function" ? _b : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "findByAccountType", null);
(0, tslib_1.__decorate)([
    (0, common_1.Put)(':id'),
    (0, swagger_1.ApiParam)({ name: 'id', type: Number }),
    (0, swagger_1.ApiResponse)({ status: 200, type: user_entity_1.UserEntity }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__param)(1, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, typeof (_c = typeof updateUser_dto_1.UpdateUserDto !== "undefined" && updateUser_dto_1.UpdateUserDto) === "function" ? _c : Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], UserController.prototype, "update", null);
(0, tslib_1.__decorate)([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK)
    //@UseInterceptors(new TransformInterceptor(UserDto))
    ,
    (0, swagger_1.ApiOperation)({ summary: 'Delete user by id' }),
    (0, swagger_1.ApiResponse)({ status: 403, description: 'Forbidden.' }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_d = typeof Promise !== "undefined" && Promise) === "function" ? _d : Object)
], UserController.prototype, "remove", null);
(0, tslib_1.__decorate)([
    (0, common_1.Post)('/user/authenticate'),
    (0, swagger_1.ApiOperation)({ summary: 'Login a user' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User found and logged in successfully' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad Request' }),
    (0, tslib_1.__param)(0, (0, common_1.Body)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_e = typeof Promise !== "undefined" && Promise) === "function" ? _e : Object)
], UserController.prototype, "login", null);
(0, tslib_1.__decorate)([
    (0, common_1.Get)('customer/:customerId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get all users for a logged-in customer' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Get all users for a logged-in customer successfully', type: user_entity_1.UserEntity, isArray: true }),
    (0, tslib_1.__param)(0, (0, common_1.Param)('customerId')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", typeof (_f = typeof Promise !== "undefined" && Promise) === "function" ? _f : Object)
], UserController.prototype, "getUsersByCustomerId", null);
UserController = UserController_1 = (0, tslib_1.__decorate)([
    (0, common_1.Controller)({
        version: ['1'],
        path: 'users'
    }),
    (0, swagger_1.ApiTags)('users'),
    (0, common_1.UseInterceptors)(response_interceptor_1.ResTransformInterceptor),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_g = typeof newUser_service_1.NewUserService !== "undefined" && newUser_service_1.NewUserService) === "function" ? _g : Object])
], UserController);
exports.UserController = UserController;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/apl.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AplDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
const apl_item_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/apl.item.dto..ts");
/**
 * This is AplDto class
 * @ignore
 * Describes all the fields of APl for API
 */
class AplDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'esn'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AplDto.prototype, "esn", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'customer id'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AplDto.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'version'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AplDto.prototype, "version", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => apl_item_dto_1.AplItemDto),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object)
], AplDto.prototype, "aplItems", void 0);
exports.AplDto = AplDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/apl.item.dto..ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AplItemDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
/**
 * This is AplItems class
 * @ignore
 * Describes all the fields of APlItems for API
 */
class AplItemDto {
}
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'map id'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AplItemDto.prototype, "mapId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'units'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AplItemDto.prototype, "units", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'min value'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AplItemDto.prototype, "minVal", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'max value'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AplItemDto.prototype, "maxVal", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'threshold'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AplItemDto.prototype, "thresHold", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'color'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AplItemDto.prototype, "color", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Display option'
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], AplItemDto.prototype, "displayOption", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'notification'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AplItemDto.prototype, "notification", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AplItemDto.prototype, "severity", void 0);
exports.AplItemDto = AplItemDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/asset.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssetDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
const extend_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/extend.dto.ts");
/**
 * This is AssetDto class
 * @ignore
 * Describes all the fields of AssetDto for API
 */
class AssetDto extends extend_dto_1.ExtendDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'asset esn'
    })
    /**
     * Vehicle type . It stores string
     */
    ,
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "esn", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'vehicle type'
    })
    /**
     * Device type , store string
     */
    ,
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "vehicletype", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'device type'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "deviceType", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'country id'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetDto.prototype, "countryId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)()
    /**
     * Customer id , stores number
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'customer id'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetDto.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Alias, stores string
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'alias'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "alias", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Description stores string
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'description'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)()
    /**
     * Stores symbol stroke size
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'Symbol stroke size'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetDto.prototype, "symbolStrokeSize", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Symbol stroke color
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'symbol stroke color'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "symbolStrokeColor", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Track color
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'track color'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "trackColor", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Symbol color
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'symbol color'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "symbolColor", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Name of asset
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'name of asset'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)()
    /**
     * Symbol size
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'Symbol size'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetDto.prototype, "symbolSize", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)()
    /**
     * track width
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'Track width'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetDto.prototype, "trackwidth", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)()
    /**
     * Symbol stroke size
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'Symbol stroke size'
    }),
    (0, class_validator_1.IsBoolean)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], AssetDto.prototype, "twoWayMessaging", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)()
    /**
     * Two way message max length
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'two way message max length'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetDto.prototype, "twoWayMessageMaxLength", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)()
    /**
     * Web link
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'Web link'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "weblink", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Asset serial number
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'asset serial number'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "assetSerialNumber", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Asset registration number
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'asset registration number'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "assetRegistrationNumber", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Asset make
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'asset make'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "assetMake", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Asset model
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'asset model'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "assetModel", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Asset color
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'asset color'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "assetColor", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * Vehicle serial number
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'vehicle serial number'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "vehicleSerialNumber", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)()
    /**
     * phone
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'phone'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "phone", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)()
    /**
     * Device state
     */
    ,
    (0, swagger_1.ApiProperty)({
        description: 'device state'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetDto.prototype, "deviceState", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Trip Start Event Id'
    }),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "start_event_id", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Trip End Event Id'
    }),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], AssetDto.prototype, "end_event_id", void 0);
exports.AssetDto = AssetDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/customer.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewCustomerDto = exports.CustomerDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
const extend_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/extend.dto.ts");
const newUser_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/newUser.dto.ts");
/**
 * This is CustomerDto class
 * @ignore
 * Describes all the fields of CustomerDto for API
 */
// export class CustomerDto extends ExtendDto {
//     @IsString()
//     @Expose()
//     @ApiProperty({
//         description: 'name'
//     })
//     @IsNotEmpty()
//     name?: string;
//     @IsString()
//     @Expose()
//     @ApiProperty({
//         description: 'name'
//     })
//     @IsNotEmpty()
//     email?: string;
//     @IsString()
//     @Expose()
//     @ApiProperty({
//         description: 'address'
//     })
//     @IsNotEmpty()
//     address?: string;
//     @IsString()
//     @Expose()
//     @ApiProperty({
//         description: 'website'
//     })
//     @IsNotEmpty()
//     website?: string;
//     @IsString()
//     @Expose()
//     @ApiProperty({
//         description: 'phone number'
//     })
//     @IsNotEmpty()
//     phoneNumber?: string;
//     //Customer type 
//     @Expose()
//     @ApiProperty({
//         description: 'customer type',
//     })
//     @IsNotEmpty()
//     customerType?: CustomerType;
//     @Expose()
//     @ApiProperty({
//         description: 'country code'
//     })
//     @IsNotEmpty()
//     countryCode?: string;
// }
class CustomerDto {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerDto.prototype, "phone", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerDto.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsBoolean)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CustomerDto.prototype, "isAdmin", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerDto.prototype, "city", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerDto.prototype, "state", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerDto.prototype, "country", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerDto.prototype, "address", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerDto.prototype, "preLogoText", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerDto.prototype, "postLogoText", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerDto.prototype, "logo_filename", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof newUser_dto_1.NewUserDto !== "undefined" && newUser_dto_1.NewUserDto) === "function" ? _a : Object)
], CustomerDto.prototype, "user", void 0);
exports.CustomerDto = CustomerDto;
//Trying new customer creation 
class NewCustomerDto extends extend_dto_1.ExtendDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'name'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'contact'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "contact", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'email'
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'phone'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "phone", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'address'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "address", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'city'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "city", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'state'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "state", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'country'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "country", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'isAdmin'
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], NewCustomerDto.prototype, "isAdmin", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'firstname'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "firstName", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'lastname'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "lastName", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'password'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsEmail)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'email id'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "emailId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'phone number'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], NewCustomerDto.prototype, "phoneNumber", void 0);
exports.NewCustomerDto = NewCustomerDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/event.detail.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventDetailDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
const packet_type_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/packet.type.enum.ts");
const event_param_detail_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/event.param.detail.dto.ts");
/**
 * This is EventDetails class
 *
 * @ignore
 */
class EventDetailDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'esn'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventDetailDto.prototype, "esn", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'packet type'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof packet_type_enum_1.PacketTypeEnum !== "undefined" && packet_type_enum_1.PacketTypeEnum) === "function" ? _a : Object)
], EventDetailDto.prototype, "packetType", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'aircraft id'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventDetailDto.prototype, "aircraftId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'customer id'
    }),
    (0, class_validator_1.IsDateString)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EventDetailDto.prototype, "scheduledDepartureTime", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'gps latitude'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], EventDetailDto.prototype, "gpsLatitude", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'gps longitude'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], EventDetailDto.prototype, "gpsLongitude", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'altitude'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventDetailDto.prototype, "altitude", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'speed'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventDetailDto.prototype, "speed", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'heading'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventDetailDto.prototype, "heading", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'start time'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventDetailDto.prototype, "startTime", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'end time'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventDetailDto.prototype, "endTime", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'stop time'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventDetailDto.prototype, "stopTime", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'param count'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], EventDetailDto.prototype, "paramCount", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'event id'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventDetailDto.prototype, "eventId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => event_param_detail_dto_1.EventParamDetailDto),
    (0, class_validator_1.IsDefined)(),
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Array !== "undefined" && Array) === "function" ? _c : Object)
], EventDetailDto.prototype, "eventParamDetails", void 0);
exports.EventDetailDto = EventDetailDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/event.notification.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventNotificationMainDto = exports.EventAssetDto = exports.EventNotificationDto = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const crud_1 = __webpack_require__("@nestjsx/crud/lib/crud");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
const ConfirmEnum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/ConfirmEnum.ts");
const extend_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/extend.dto.ts");
/**
 * This is EventNotificationDto class
 * @ignore
 */
class EventNotificationDto {
}
(0, tslib_1.__decorate)([
    (0, crud_1.ApiProperty)({}),
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], EventNotificationDto.prototype, "id", void 0);
exports.EventNotificationDto = EventNotificationDto;
/**
 * This is EventAssetDto class
 * @ignore
 */
class EventAssetDto {
}
(0, tslib_1.__decorate)([
    (0, crud_1.ApiProperty)({}),
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], EventAssetDto.prototype, "id", void 0);
exports.EventAssetDto = EventAssetDto;
/**
 * This is EventNotificationMainDto class
 * @ignore
 */
class EventNotificationMainDto extends extend_dto_1.ExtendDto {
}
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], EventNotificationMainDto.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'The name of event notification'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventNotificationMainDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Is active'
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], EventNotificationMainDto.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({ type: () => EventAssetDto, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", Array)
], EventNotificationMainDto.prototype, "vehicles", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({ type: () => EventNotificationDto, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", Array)
], EventNotificationMainDto.prototype, "notifications", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        enum: ConfirmEnum_1.ConfirmEnum,
        isArray: false
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof ConfirmEnum_1.ConfirmEnum !== "undefined" && ConfirmEnum_1.ConfirmEnum) === "function" ? _a : Object)
], EventNotificationMainDto.prototype, "notifyEmail", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Description'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], EventNotificationMainDto.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Customer ID'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], EventNotificationMainDto.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'The name of event'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventNotificationMainDto.prototype, "eventName", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Event ID'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventNotificationMainDto.prototype, "eventId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'customer name'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventNotificationMainDto.prototype, "customerName", void 0);
exports.EventNotificationMainDto = EventNotificationMainDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/event.param.detail.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventParamDetailDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
const packet_type_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/packet.type.enum.ts");
/**
 * This is EventParam class
 *
 * Describes all the fields of EventParam for API
 *
 * @ignore
 */
class EventParamDetailDto {
}
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'id'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], EventParamDetailDto.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'map id'
    }),
    (0, class_validator_1.IsNumber)(),
    (0, tslib_1.__metadata)("design:type", Number)
], EventParamDetailDto.prototype, "paramId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'units'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], EventParamDetailDto.prototype, "paramValue", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'packet type'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof packet_type_enum_1.PacketTypeEnum !== "undefined" && packet_type_enum_1.PacketTypeEnum) === "function" ? _a : Object)
], EventParamDetailDto.prototype, "packetType", void 0);
exports.EventParamDetailDto = EventParamDetailDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/extend.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtendDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const crud_1 = __webpack_require__("@nestjsx/crud/lib/crud");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
/**
 * This is ExtendDto class
 *
 * Describes all the fields of ExtendedDto
 *
 * @ignore
 */
class ExtendDto {
}
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ExtendDto.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'created by'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], ExtendDto.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ExtendDto.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ExtendDto.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof status_enum_1.StatusEnum !== "undefined" && status_enum_1.StatusEnum) === "function" ? _c : Object)
], ExtendDto.prototype, "status", void 0);
exports.ExtendDto = ExtendDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/geofence.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeofenceDto = exports.GeofenceAssetDto = exports.GeofenceNotificationDto = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const crud_1 = __webpack_require__("@nestjsx/crud/lib/crud");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
const ConfirmEnum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/ConfirmEnum.ts");
const event_severity_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/event.severity.enum.ts");
const notify_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/notify.enum.ts");
const extend_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/extend.dto.ts");
/**
 * This is geofenceNotificationDto class
 * @ignore
 * @param {number} id
 */
class GeofenceNotificationDto {
}
(0, tslib_1.__decorate)([
    (0, crud_1.ApiProperty)({}),
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceNotificationDto.prototype, "id", void 0);
exports.GeofenceNotificationDto = GeofenceNotificationDto;
/**
 * This is GeofenceAsset class
 * @ignore
 * Describes all the fields of GeofenceAsset for api
 *  @param {number} id
 */
class GeofenceAssetDto {
}
(0, tslib_1.__decorate)([
    (0, crud_1.ApiProperty)({}),
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceAssetDto.prototype, "id", void 0);
exports.GeofenceAssetDto = GeofenceAssetDto;
/**
 * This is GeofenceDto class
 *
 * @ignore
 */
class GeofenceDto extends extend_dto_1.ExtendDto {
    constructor() {
        super(...arguments);
        /**
         * Buffer distance
         */
        this.bufferDistance = 0;
    }
}
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceDto.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'The name of geofence'
    })
    /**
     * @param {string}name
     */
    ,
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        enum: notify_enum_1.NotifyEnum,
        isArray: false
    })
    /**
     * @param
     */
    ,
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof notify_enum_1.NotifyEnum !== "undefined" && notify_enum_1.NotifyEnum) === "function" ? _a : Object)
], GeofenceDto.prototype, "notify", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({ type: () => GeofenceAssetDto, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object)
], GeofenceDto.prototype, "vehicles", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({}),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceDto.prototype, "layerId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({}),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceDto.prototype, "landmarkId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({ type: () => GeofenceNotificationDto, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Array !== "undefined" && Array) === "function" ? _c : Object)
], GeofenceDto.prototype, "notifications", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        enum: ConfirmEnum_1.ConfirmEnum,
        isArray: false
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof ConfirmEnum_1.ConfirmEnum !== "undefined" && ConfirmEnum_1.ConfirmEnum) === "function" ? _d : Object)
], GeofenceDto.prototype, "notifyMap", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        enum: ConfirmEnum_1.ConfirmEnum,
        isArray: false
    })
    /**
     * Notifyemail
     */
    ,
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_e = typeof ConfirmEnum_1.ConfirmEnum !== "undefined" && ConfirmEnum_1.ConfirmEnum) === "function" ? _e : Object)
], GeofenceDto.prototype, "notifyEmail", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Description'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceDto.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Min Altitude'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceDto.prototype, "minAltitude", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Max Altitude'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceDto.prototype, "maxAltitude", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Min Velocity'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceDto.prototype, "minVelocity", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Max Altitude'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceDto.prototype, "maxVelocity", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        enum: event_severity_enum_1.EventSeverityEnum,
        isArray: false
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_f = typeof event_severity_enum_1.EventSeverityEnum !== "undefined" && event_severity_enum_1.EventSeverityEnum) === "function" ? _f : Object)
], GeofenceDto.prototype, "eventSeverity", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Schedule Start Time'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceDto.prototype, "scheduleStartTime", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Schedule End Time'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceDto.prototype, "scheduleEndTime", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Customer ID'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceDto.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({}),
    (0, tslib_1.__metadata)("design:type", typeof (_g = typeof Array !== "undefined" && Array) === "function" ? _g : Object)
], GeofenceDto.prototype, "days", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Buffer Distance'
    }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceDto.prototype, "bufferDistance", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, crud_1.ApiProperty)({
        description: 'Aircraft'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceDto.prototype, "aircraft", void 0);
exports.GeofenceDto = GeofenceDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/group.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroupDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
/**
 * This is GroupDto class
 *
 * Describes all the fields of GroupDto for API
 * @ignore
 */
class GroupDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'username'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], GroupDto.prototype, "name", void 0);
exports.GroupDto = GroupDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/landmark.create.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LandmarkCreateDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
/**
 * This is LandmarkCreate class
 *
 * Describes all the fields of LandmarkCreate for API
 *
 * @ignore
 */
class LandmarkCreateDto {
}
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], LandmarkCreateDto.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'The name of layer'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], LandmarkCreateDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], LandmarkCreateDto.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], LandmarkCreateDto.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], LandmarkCreateDto.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], LandmarkCreateDto.prototype, "layerId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Object)
], LandmarkCreateDto.prototype, "geojsonobject", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], LandmarkCreateDto.prototype, "locationType", void 0);
exports.LandmarkCreateDto = LandmarkCreateDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/layer.create.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayerCreateDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
/**
 * This is CreateLayer class
 * @ignore
 * Describes all the fields of LayerCreate for API
 */
class LayerCreateDto {
}
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], LayerCreateDto.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'The name of layer'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], LayerCreateDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Address for a layer'
    }),
    (0, tslib_1.__metadata)("design:type", String)
], LayerCreateDto.prototype, "address", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], LayerCreateDto.prototype, "city", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], LayerCreateDto.prototype, "country", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsInt)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], LayerCreateDto.prototype, "zip", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], LayerCreateDto.prototype, "state", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], LayerCreateDto.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], LayerCreateDto.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], LayerCreateDto.prototype, "updatedAt", void 0);
exports.LayerCreateDto = LayerCreateDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/newUser.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewUserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_validator_1 = __webpack_require__("class-validator");
const user_type_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/user.type.enum.ts");
const extend_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/extend.dto.ts");
class NewUserDto extends extend_dto_1.ExtendDto {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof user_type_enum_1.UserTypeEnum !== "undefined" && user_type_enum_1.UserTypeEnum) === "function" ? _a : Object)
], NewUserDto.prototype, "accountType", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof user_type_enum_1.CustomerType !== "undefined" && user_type_enum_1.CustomerType) === "function" ? _b : Object)
], NewUserDto.prototype, "userType", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], NewUserDto.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], NewUserDto.prototype, "canChangePassword", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewUserDto.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], NewUserDto.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewUserDto.prototype, "email_id", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewUserDto.prototype, "expires_on", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewUserDto.prototype, "firstname", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewUserDto.prototype, "lastname", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewUserDto.prototype, "login_id", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], NewUserDto.prototype, "neverExpire", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewUserDto.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewUserDto.prototype, "phone_no", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NewUserDto.prototype, "username", void 0);
exports.NewUserDto = NewUserDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/newlayer.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NLayerDto = exports.LayerDataDto = exports.ProductDataDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_validator_1 = __webpack_require__("class-validator");
/**
 * This is NewLayerCreate class
 *
 * Describes all the fields of new layer for API
 *
 * @ignore
 */
class ProductDataDto {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ description: 'Id of the product data' }),
    (0, tslib_1.__metadata)("design:type", String)
], ProductDataDto.prototype, "product_id", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ description: 'Name of the product data' }),
    (0, tslib_1.__metadata)("design:type", String)
], ProductDataDto.prototype, "product_name", void 0);
exports.ProductDataDto = ProductDataDto;
class LayerDataDto {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ description: 'Id of the layer data' }),
    (0, tslib_1.__metadata)("design:type", Number)
], LayerDataDto.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ description: 'Value of the layer data' }),
    (0, tslib_1.__metadata)("design:type", String)
], LayerDataDto.prototype, "value", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, swagger_1.ApiProperty)({
        type: ProductDataDto,
        isArray: true,
        description: 'Array of product data',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], LayerDataDto.prototype, "data", void 0);
exports.LayerDataDto = LayerDataDto;
//For new service
// export class LayerDataDto {
//   @ApiProperty({ description: 'Id of the layer data' })
//   id: number;
//   @ApiProperty({ description: 'Value of the layer data' })
//   value: string;
//   @ApiProperty({
//     type: ProductDataDto,
//     isArray: true,
//     description: 'Array of product data',
//   })
//   data?: never;
//   @ApiProperty({
//     type: ProductDataDto,
//     isArray: false,
//     description: 'Product data',
//   })
//   productData?: ProductDataDto;
// }
class NLayerDto {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ description: 'Id of the layer' }),
    (0, tslib_1.__metadata)("design:type", Number)
], NLayerDto.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ description: 'Category of the layer' }),
    (0, tslib_1.__metadata)("design:type", String)
], NLayerDto.prototype, "category", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({
        type: 'boolean',
        description: 'Flag indicating if the layer has a subcategory',
    }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], NLayerDto.prototype, "has_subcategory", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({
        type: LayerDataDto,
        isArray: true,
        description: 'Array of layer data',
    }),
    (0, tslib_1.__metadata)("design:type", Array)
], NLayerDto.prototype, "data", void 0);
exports.NLayerDto = NLayerDto;
//For new service
// export class NLayerDto {
//   @ApiProperty({ description: 'Id of the layer' })
//   id: number;
//   @ApiProperty({ description: 'Category of the layer' })
//   category: string;
//   @ApiProperty({
//     type: 'boolean',
//     description: 'Flag indicating if the layer has a subcategory',
//   })
//   has_subcategory: boolean;
//   @ApiProperty({
//     type: LayerDataDto,
//     isArray: true,
//     description: 'Array of layer data',
//   })
//   data: LayerDataDto[] | ProductDataDto[];
// }


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/notification.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationDto = exports.NotificationUserDto = exports.NotificationEmailDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
const notification_type_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/notification.type.enum.ts");
const extend_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/extend.dto.ts");
const notification_template_dto_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/dto/notification.template.dto.ts");
/**
 * This is NotificationEmailDto class
 *
 * Describes all the fields of NotificationEmailDto for API
 *
 * @ignore
 */
class NotificationEmailDto {
}
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({}),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationEmailDto.prototype, "email", void 0);
exports.NotificationEmailDto = NotificationEmailDto;
/**
 * This is NotificationUserDto class
 *
 * Describes all the fields of NotificationUserDto for API
 * @param {number}id
 * @ignore
 */
class NotificationUserDto {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({}),
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], NotificationUserDto.prototype, "id", void 0);
exports.NotificationUserDto = NotificationUserDto;
/**
 * This is NotificationDto class
 *
 * @ignore
 */
class NotificationDto extends extend_dto_1.ExtendDto {
}
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], NotificationDto.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'The name of notification'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Timezone for notification'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationDto.prototype, "timezone", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        enum: notification_type_enum_1.NotificationTypeEnum,
        isArray: false
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof notification_type_enum_1.NotificationTypeEnum !== "undefined" && notification_type_enum_1.NotificationTypeEnum) === "function" ? _a : Object)
], NotificationDto.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], NotificationDto.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], NotificationDto.prototype, "emailTemplateId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], NotificationDto.prototype, "smsTemplateId", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ type: () => NotificationEmailDto, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Array !== "undefined" && Array) === "function" ? _b : Object)
], NotificationDto.prototype, "emails", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({ type: () => NotificationUserDto, isArray: true }),
    (0, class_validator_1.IsOptional)(),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Array !== "undefined" && Array) === "function" ? _c : Object)
], NotificationDto.prototype, "users", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationDto.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], NotificationDto.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], NotificationDto.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationDto.prototype, "updatedBy", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => notification_template_dto_1.NotificationTemplateDto),
    (0, tslib_1.__metadata)("design:type", typeof (_f = typeof notification_template_dto_1.NotificationTemplateDto !== "undefined" && notification_template_dto_1.NotificationTemplateDto) === "function" ? _f : Object)
], NotificationDto.prototype, "emailTemplate", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => notification_template_dto_1.NotificationTemplateDto),
    (0, tslib_1.__metadata)("design:type", typeof (_g = typeof notification_template_dto_1.NotificationTemplateDto !== "undefined" && notification_template_dto_1.NotificationTemplateDto) === "function" ? _g : Object)
], NotificationDto.prototype, "smsTemplate", void 0);
exports.NotificationDto = NotificationDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/notification.template.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationTemplateDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
/**
 * This is NotificationTemplateDto class
 *
 * Describes all the fields of Notification Template for API
 * @ignore
 */
class NotificationTemplateDto {
}
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", Number)
], NotificationTemplateDto.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'The name of template'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationTemplateDto.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Subject for a template'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationTemplateDto.prototype, "subject", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationTemplateDto.prototype, "body", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationTemplateDto.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], NotificationTemplateDto.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], NotificationTemplateDto.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, class_transformer_1.Expose)(),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationTemplateDto.prototype, "updatedBy", void 0);
exports.NotificationTemplateDto = NotificationTemplateDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/report-notification.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportNotificationDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const class_transformer_1 = __webpack_require__("class-transformer");
const class_validator_1 = __webpack_require__("class-validator");
class ReportNotificationDto {
}
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Created By'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], ReportNotificationDto.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Customer Name'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], ReportNotificationDto.prototype, "customerName", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Customer Id'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ReportNotificationDto.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsArray)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'Notifications Ids'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Array !== "undefined" && Array) === "function" ? _a : Object)
], ReportNotificationDto.prototype, "notifications", void 0);
(0, tslib_1.__decorate)([
    (0, class_validator_1.IsString)(),
    (0, class_transformer_1.Expose)(),
    (0, swagger_1.ApiProperty)({
        description: 'The report name'
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, tslib_1.__metadata)("design:type", String)
], ReportNotificationDto.prototype, "report", void 0);
exports.ReportNotificationDto = ReportNotificationDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/dto/updateUser.dto.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdateUserDto = void 0;
const tslib_1 = __webpack_require__("tslib");
const class_validator_1 = __webpack_require__("class-validator");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const user_type_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/user.type.enum.ts");
class UpdateUserDto {
}
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ example: 'newFirstName' }),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUserDto.prototype, "firstname", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ example: 'newLastName' }),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUserDto.prototype, "lastname", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ example: 'newEmail@email.com' }),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUserDto.prototype, "email_id", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ example: 'newPhoneNo' }),
    (0, class_validator_1.IsString)(),
    (0, tslib_1.__metadata)("design:type", String)
], UpdateUserDto.prototype, "phone_no", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ example: true }),
    (0, class_validator_1.IsBoolean)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UpdateUserDto.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, swagger_1.ApiProperty)({ example: user_type_enum_1.CustomerType }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof user_type_enum_1.CustomerType !== "undefined" && user_type_enum_1.CustomerType) === "function" ? _a : Object)
], UpdateUserDto.prototype, "userType", void 0);
exports.UpdateUserDto = UpdateUserDto;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/apl.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AplEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const apl_item_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/apl.item.entity.ts");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
/**
 * This is apl entity
 * Contains apl fields , Creates  apl table im database with respective fields
 */
let AplEntity = class AplEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, length: 128 }),
    (0, tslib_1.__metadata)("design:type", String)
], AplEntity.prototype, "esn", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], AplEntity.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true, length: 128 }),
    (0, tslib_1.__metadata)("design:type", String)
], AplEntity.prototype, "version", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => apl_item_entity_1.AplItemEntity, (item) => item.apl),
    (0, tslib_1.__metadata)("design:type", Array)
], AplEntity.prototype, "aplItems", void 0);
AplEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "apl" })
], AplEntity);
exports.AplEntity = AplEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/apl.item.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AplItemEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const apl_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/apl.entity.ts");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
/**
 * This is apl_items entity
 * Contains apl_items fields
 */
let AplItemEntity = class AplItemEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], AplItemEntity.prototype, "mplId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AplItemEntity.prototype, "units", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], AplItemEntity.prototype, "minVal", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], AplItemEntity.prototype, "maxVal", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], AplItemEntity.prototype, "thresHold", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AplItemEntity.prototype, "color", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], AplItemEntity.prototype, "displayOption", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AplItemEntity.prototype, "notification", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], AplItemEntity.prototype, "severity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => apl_entity_1.AplEntity, (apl) => apl.aplItems, { eager: false, cascade: ['insert', 'update', 'remove'], nullable: false }),
    (0, typeorm_1.JoinColumn)({ name: "apl_id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof apl_entity_1.AplEntity !== "undefined" && apl_entity_1.AplEntity) === "function" ? _a : Object)
], AplItemEntity.prototype, "apl", void 0);
AplItemEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "apl_items" })
], AplItemEntity);
exports.AplItemEntity = AplItemEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/asset.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssetEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
/**
 * This is asset entity
 * Contains asset fields . Creates asset table in database with respective fields
 */
let AssetEntity = class AssetEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "esn", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "vehicletype", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "deviceType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetEntity.prototype, "countryId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetEntity.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "alias", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetEntity.prototype, "symbolStrokeSize", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "symbolStrokeColor", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "trackColor", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "symbolColor", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("decimal", { precision: 6, scale: 2 }),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetEntity.prototype, "symbolSize", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("decimal", { precision: 6, scale: 2 }),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetEntity.prototype, "trackwidth", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], AssetEntity.prototype, "twoWayMessaging", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetEntity.prototype, "twoWayMessageMaxLength", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "weblink", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "assetSerialNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "assetRegistrationNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "assetMake", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "assetModel", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "assetColor", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "vehicleSerialNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "phone", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], AssetEntity.prototype, "deviceState", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "start_event_id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], AssetEntity.prototype, "end_event_id", void 0);
AssetEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "asset" })
], AssetEntity);
exports.AssetEntity = AssetEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/customer.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const user_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/user.entity.ts");
/**
 * This is customer entity
 * Contains customer fields, Create customer in database
 */
// @Entity({name: "customers"})
// export class CustomerEntity extends ExtendEntity {
//     @Column({length: 100, nullable: false})
//     name?: string;
//     email?: string;
//     address?: string;
//     website?: string;
//     phoneNumber?: string;
//     customerType:CustomerType;
//     countryCode?: string;
//   @Column({ default: false })
//   administrator: boolean;
//   @ManyToOne(() => UserEntity, (user) => user.customerId)
//   user: UserEntity;
// }
let CustomerEntity = class CustomerEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], CustomerEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerEntity.prototype, "phone", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerEntity.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerEntity.prototype, "city", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerEntity.prototype, "state", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerEntity.prototype, "country", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerEntity.prototype, "address", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerEntity.prototype, "preLogoText", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerEntity.prototype, "postLogoText", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], CustomerEntity.prototype, "logo_filename", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: false }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], CustomerEntity.prototype, "isAdmin", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], CustomerEntity.prototype, "userId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, { cascade: true, onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)(),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _a : Object)
], CustomerEntity.prototype, "user", void 0);
CustomerEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "new_customer" })
], CustomerEntity);
exports.CustomerEntity = CustomerEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/event.asset.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventAssetEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const event_based_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.based.notification.entity.ts");
/**
 * This is geofence_assets entity
 * Contains geofence_assets fields
 */
let EventAssetEntity = class EventAssetEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], EventAssetEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], EventAssetEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EventAssetEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => event_based_notification_entity_1.EventBasedNotificationEntity, map => map.vehicles),
    (0, typeorm_1.JoinColumn)({ name: "event_id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof event_based_notification_entity_1.EventBasedNotificationEntity !== "undefined" && event_based_notification_entity_1.EventBasedNotificationEntity) === "function" ? _c : Object)
], EventAssetEntity.prototype, "asset", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'asset_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], EventAssetEntity.prototype, "assetId", void 0);
EventAssetEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "event_assets" })
], EventAssetEntity);
exports.EventAssetEntity = EventAssetEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/event.based.notification.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventBasedNotificationEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
/**
 * This is Event entity
 * Contains Event fields creates new entry in database
 */
let EventBasedNotificationEntity = class EventBasedNotificationEntity extends extend_entity_1.ExtendEntity {
    constructor() {
        super(...arguments);
        this.notifyEmail = "Yes";
    }
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], EventBasedNotificationEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'notify_email', length: 3 }),
    (0, tslib_1.__metadata)("design:type", String)
], EventBasedNotificationEntity.prototype, "notifyEmail", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'description' }),
    (0, tslib_1.__metadata)("design:type", String)
], EventBasedNotificationEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: false, name: 'customer_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], EventBasedNotificationEntity.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: false, name: 'customer_name', default: "" }),
    (0, tslib_1.__metadata)("design:type", String)
], EventBasedNotificationEntity.prototype, "customerName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'eventid', default: "" }),
    (0, tslib_1.__metadata)("design:type", String)
], EventBasedNotificationEntity.prototype, "eventId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'eventname', default: "" }),
    (0, tslib_1.__metadata)("design:type", String)
], EventBasedNotificationEntity.prototype, "eventName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'asset_id', type: 'integer', nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], EventBasedNotificationEntity.prototype, "assetIds", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'notification_id', type: 'integer', nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], EventBasedNotificationEntity.prototype, "notificationsId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)('EventAssetEntity', 'asset', { eager: true, cascade: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], EventBasedNotificationEntity.prototype, "vehicles", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)('EventNotificationEntity', 'notification', { onDelete: 'CASCADE', eager: true, cascade: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], EventBasedNotificationEntity.prototype, "notifications", void 0);
EventBasedNotificationEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "event_based_notification" })
], EventBasedNotificationEntity);
exports.EventBasedNotificationEntity = EventBasedNotificationEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/event.details.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventDetailsEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const packet_type_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/packet.type.enum.ts");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
/**
 * This is event_details entity
 * Contains event_details fields
 */
let EventDetailsEntity = class EventDetailsEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], EventDetailsEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "enum", enum: packet_type_enum_1.PacketTypeEnum, default: packet_type_enum_1.PacketTypeEnum.A }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof packet_type_enum_1.PacketTypeEnum !== "undefined" && packet_type_enum_1.PacketTypeEnum) === "function" ? _a : Object)
], EventDetailsEntity.prototype, "packetType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EventDetailsEntity.prototype, "scheduledDepartureTime", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("decimal", { precision: 6, scale: 2 }),
    (0, tslib_1.__metadata)("design:type", Number)
], EventDetailsEntity.prototype, "gpsLatitude", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("decimal", { precision: 6, scale: 2 }),
    (0, tslib_1.__metadata)("design:type", Number)
], EventDetailsEntity.prototype, "gpsLongitude", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)('EventParamDetailsEntity', 'eventDetails', { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", Array)
], EventDetailsEntity.prototype, "eventParamDetails", void 0);
EventDetailsEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "event_details" })
], EventDetailsEntity);
exports.EventDetailsEntity = EventDetailsEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/event.notification.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventNotificationEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const event_based_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.based.notification.entity.ts");
/**
 * This is Geofence Notification entity
 * Contains Geofence Notification field creates new geofence Notification
 */
let EventNotificationEntity = class EventNotificationEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], EventNotificationEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], EventNotificationEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], EventNotificationEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => event_based_notification_entity_1.EventBasedNotificationEntity, map => map.notifications, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "event_id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof event_based_notification_entity_1.EventBasedNotificationEntity !== "undefined" && event_based_notification_entity_1.EventBasedNotificationEntity) === "function" ? _c : Object)
], EventNotificationEntity.prototype, "notification", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'notification_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], EventNotificationEntity.prototype, "notificationId", void 0);
EventNotificationEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "events_notifications_list" })
], EventNotificationEntity);
exports.EventNotificationEntity = EventNotificationEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/event.param.details.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventParamDetailsEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const packet_type_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/packet.type.enum.ts");
const event_details_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.details.entity.ts");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
/**
 * This is event_param_details entity
 * Contains event_param fields
 */
let EventParamDetailsEntity = class EventParamDetailsEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "enum", enum: packet_type_enum_1.PacketTypeEnum, default: packet_type_enum_1.PacketTypeEnum.A }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof packet_type_enum_1.PacketTypeEnum !== "undefined" && packet_type_enum_1.PacketTypeEnum) === "function" ? _a : Object)
], EventParamDetailsEntity.prototype, "packetType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => event_details_entity_1.EventDetailsEntity, (event) => event.eventParamDetails, { nullable: false, eager: false, cascade: ['insert', 'update', 'remove'] }),
    (0, typeorm_1.JoinColumn)({ name: "event_id" }),
    (0, tslib_1.__metadata)("design:type", EventParamDetailsEntity)
], EventParamDetailsEntity.prototype, "eventDetails", void 0);
EventParamDetailsEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "event_param_details" })
], EventParamDetailsEntity);
exports.EventParamDetailsEntity = EventParamDetailsEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExtendEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
/**
 * This is Extended  entity
 * Contains Extended fields . It supports other entities
 *
 * @ignore
 */
class ExtendEntity extends typeorm_1.BaseEntity {
}
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ExtendEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], ExtendEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], ExtendEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "enum", enum: status_enum_1.StatusEnum, default: status_enum_1.StatusEnum.ACTIVE }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof status_enum_1.StatusEnum !== "undefined" && status_enum_1.StatusEnum) === "function" ? _c : Object)
], ExtendEntity.prototype, "status", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64, name: "created_by", nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], ExtendEntity.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64, nullable: true, name: "updated_by" }),
    (0, tslib_1.__metadata)("design:type", String)
], ExtendEntity.prototype, "updatedBy", void 0);
exports.ExtendEntity = ExtendEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/fligh.location.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlighLocationEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
const flight_plan_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/flight.plan.entity.ts");
/**
 * This is FlightLocation entity
 * Contains FlightLocation fields.  Creates new flight in database.
 */
let FlighLocationEntity = class FlighLocationEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("decimal", { precision: 6, scale: 2 }),
    (0, tslib_1.__metadata)("design:type", Number)
], FlighLocationEntity.prototype, "latitude", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("decimal", { precision: 6, scale: 2 }),
    (0, tslib_1.__metadata)("design:type", Number)
], FlighLocationEntity.prototype, "longitude", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => flight_plan_entity_1.FlighPlanEntity, (plan) => plan.locations, { nullable: false, eager: false, cascade: ['insert', 'update', 'remove'] }),
    (0, typeorm_1.JoinColumn)({ name: "flight_plan_id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof flight_plan_entity_1.FlighPlanEntity !== "undefined" && flight_plan_entity_1.FlighPlanEntity) === "function" ? _a : Object)
], FlighLocationEntity.prototype, "flightPlan", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], FlighLocationEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], FlighLocationEntity.prototype, "scheduledArrivalTime", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof Date !== "undefined" && Date) === "function" ? _c : Object)
], FlighLocationEntity.prototype, "estimatedDepartureTime", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof Date !== "undefined" && Date) === "function" ? _d : Object)
], FlighLocationEntity.prototype, "estimatedArrivalTime", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_e = typeof Date !== "undefined" && Date) === "function" ? _e : Object)
], FlighLocationEntity.prototype, "actualDepartureTime", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: true }),
    (0, tslib_1.__metadata)("design:type", typeof (_f = typeof Date !== "undefined" && Date) === "function" ? _f : Object)
], FlighLocationEntity.prototype, "actualArrivalTime", void 0);
FlighLocationEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "fligh_location" })
], FlighLocationEntity);
exports.FlighLocationEntity = FlighLocationEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/flight.plan.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FlighPlanEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
const fligh_location_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/fligh.location.entity.ts");
/**
 * This is flight_Plan entity
 * Contains flightPlan fields
 */
let FlighPlanEntity = class FlighPlanEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], FlighPlanEntity.prototype, "tailNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], FlighPlanEntity.prototype, "flightNumber", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'timestamp', nullable: false }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], FlighPlanEntity.prototype, "scheduledDepartureTime", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(() => fligh_location_entity_1.FlighLocationEntity, (location) => location.flightPlan),
    (0, tslib_1.__metadata)("design:type", Array)
], FlighPlanEntity.prototype, "locations", void 0);
FlighPlanEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "fligh_plan" })
], FlighPlanEntity);
exports.FlighPlanEntity = FlighPlanEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/genfence.asset.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeofenceAssetEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const geofence_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/geofence.entity.ts");
/**
 * This is geofence_assets entity
 * Contains geofence_assets fields
 */
let GeofenceAssetEntity = class GeofenceAssetEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceAssetEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], GeofenceAssetEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], GeofenceAssetEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => geofence_entity_1.GeofenceEntity, map => map.vehicles),
    (0, typeorm_1.JoinColumn)({ name: "geofence_id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof geofence_entity_1.GeofenceEntity !== "undefined" && geofence_entity_1.GeofenceEntity) === "function" ? _c : Object)
], GeofenceAssetEntity.prototype, "asset", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'asset_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceAssetEntity.prototype, "assetId", void 0);
GeofenceAssetEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "geofence_assets" })
], GeofenceAssetEntity);
exports.GeofenceAssetEntity = GeofenceAssetEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/geo.object.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeoObjectEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
const landmark_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/landmark.entity.ts");
/**
 * This is geo_object entity
 * Contains geo_object fields creates new entry
 */
let GeoObjectEntity = class GeoObjectEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64 }),
    (0, tslib_1.__metadata)("design:type", String)
], GeoObjectEntity.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)('LandmarkEntity', 'landmark', { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof landmark_entity_1.LandmarkEntity !== "undefined" && landmark_entity_1.LandmarkEntity) === "function" ? _a : Object)
], GeoObjectEntity.prototype, "landmark", void 0);
GeoObjectEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "geo_object" })
], GeoObjectEntity);
exports.GeoObjectEntity = GeoObjectEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/geofence.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeofenceNewEntity = exports.GeofenceEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const event_severity_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/event.severity.enum.ts");
const notify_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/notify.enum.ts");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
/**
 * This is Geofence entity
 * Contains Geofence fields creates new entry in database
 */
let GeofenceEntity = class GeofenceEntity extends extend_entity_1.ExtendEntity {
    constructor() {
        super(...arguments);
        this.notifyMap = "Yes";
        this.notifyEmail = "Yes";
    }
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "enum", enum: notify_enum_1.NotifyEnum, default: notify_enum_1.NotifyEnum.INSIDE }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof notify_enum_1.NotifyEnum !== "undefined" && notify_enum_1.NotifyEnum) === "function" ? _a : Object)
], GeofenceEntity.prototype, "notify", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'buffer_distance' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceEntity.prototype, "bufferDistance", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'notify_map', length: 3 }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceEntity.prototype, "notifyMap", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'notify_email', length: 3 }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceEntity.prototype, "notifyEmail", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'description' }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'min_altitude' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceEntity.prototype, "minAltitude", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'max_altitude' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceEntity.prototype, "maxAltitude", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("decimal", { precision: 6, scale: 2, name: 'min_velocity' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceEntity.prototype, "minVelocity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("decimal", { precision: 6, scale: 2, name: 'max_velocity' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceEntity.prototype, "maxVelocity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "enum", enum: event_severity_enum_1.EventSeverityEnum, default: event_severity_enum_1.EventSeverityEnum.low, name: 'event_severity' }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof event_severity_enum_1.EventSeverityEnum !== "undefined" && event_severity_enum_1.EventSeverityEnum) === "function" ? _b : Object)
], GeofenceEntity.prototype, "eventSeverity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'schedule_start_time' }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceEntity.prototype, "scheduleStartTime", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'schedule_end_time' }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceEntity.prototype, "scheduleEndTime", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: false, name: 'customer_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceEntity.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "simple-json", nullable: true }),
    (0, tslib_1.__metadata)("design:type", Object)
], GeofenceEntity.prototype, "geojsonobject", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)('GeofenceAssetEntity', 'asset', { eager: true, cascade: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], GeofenceEntity.prototype, "vehicles", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'g_layer_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceEntity.prototype, "layerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'g_landmark_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceEntity.prototype, "landmarkId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)('GeofenceNotificationEntity', 'notification', { onDelete: 'CASCADE', eager: true, cascade: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], GeofenceEntity.prototype, "notifications", void 0);
GeofenceEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "geofence" })
], GeofenceEntity);
exports.GeofenceEntity = GeofenceEntity;
let GeofenceNewEntity = class GeofenceNewEntity extends extend_entity_1.ExtendEntity {
    constructor() {
        super(...arguments);
        this.notifyMap = "Yes";
        this.notifyEmail = "Yes";
    }
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceNewEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "enum", enum: notify_enum_1.NotifyEnum, default: notify_enum_1.NotifyEnum.INSIDE }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof notify_enum_1.NotifyEnum !== "undefined" && notify_enum_1.NotifyEnum) === "function" ? _c : Object)
], GeofenceNewEntity.prototype, "notify", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'buffer_distance' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceNewEntity.prototype, "bufferDistance", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'notify_map', length: 3 }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceNewEntity.prototype, "notifyMap", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'notify_email', length: 3 }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceNewEntity.prototype, "notifyEmail", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'description' }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceNewEntity.prototype, "description", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'min_altitude' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceNewEntity.prototype, "minAltitude", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'max_altitude' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceNewEntity.prototype, "maxAltitude", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("decimal", { precision: 6, scale: 2, name: 'min_velocity' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceNewEntity.prototype, "minVelocity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)("decimal", { precision: 6, scale: 2, name: 'max_velocity' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceNewEntity.prototype, "maxVelocity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "enum", enum: event_severity_enum_1.EventSeverityEnum, default: event_severity_enum_1.EventSeverityEnum.low, name: 'event_severity' }),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof event_severity_enum_1.EventSeverityEnum !== "undefined" && event_severity_enum_1.EventSeverityEnum) === "function" ? _d : Object)
], GeofenceNewEntity.prototype, "eventSeverity", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'schedule_start_time' }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceNewEntity.prototype, "scheduleStartTime", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'schedule_end_time' }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceNewEntity.prototype, "scheduleEndTime", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: false, name: 'customer_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceNewEntity.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "simple-json", nullable: true }),
    (0, tslib_1.__metadata)("design:type", Object)
], GeofenceNewEntity.prototype, "geojsonobject", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)('GeofenceAssetEntity', 'asset', { eager: true, cascade: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], GeofenceNewEntity.prototype, "vehicles", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'g_layer_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceNewEntity.prototype, "layerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'g_landmark_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceNewEntity.prototype, "landmarkId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)('GeofenceNotificationEntity', 'notification', { onDelete: 'CASCADE', eager: true, cascade: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], GeofenceNewEntity.prototype, "notifications", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], GeofenceNewEntity.prototype, "aircraft", void 0);
GeofenceNewEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "geofence_new" })
], GeofenceNewEntity);
exports.GeofenceNewEntity = GeofenceNewEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/geofence.notification.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeofenceNotificationEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const geofence_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/geofence.entity.ts");
/**
 * This is Geofence Notification entity
 * Contains Geofence Notification field creates new geofence Notification
 */
let GeofenceNotificationEntity = class GeofenceNotificationEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceNotificationEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], GeofenceNotificationEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], GeofenceNotificationEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => geofence_entity_1.GeofenceEntity, map => map.notifications, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "geofence_id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof geofence_entity_1.GeofenceEntity !== "undefined" && geofence_entity_1.GeofenceEntity) === "function" ? _c : Object)
], GeofenceNotificationEntity.prototype, "notification", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: 'notification_id' }),
    (0, tslib_1.__metadata)("design:type", Number)
], GeofenceNotificationEntity.prototype, "notificationId", void 0);
GeofenceNotificationEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "geofence_notifications" })
], GeofenceNotificationEntity);
exports.GeofenceNotificationEntity = GeofenceNotificationEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/group.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroupEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const typeorm_1 = __webpack_require__("typeorm");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
/**
 * This is group entity
 * Contains all group fields. Creates new group
 */
let GroupEntity = class GroupEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], GroupEntity.prototype, "name", void 0);
GroupEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "all_groups" })
], GroupEntity);
exports.GroupEntity = GroupEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/landmark.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LandmarkEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
const geo_object_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/geo.object.entity.ts");
const layer_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/layer.entity.ts");
/**
 * This is landmark entity
 * Contains Landmark fields  creates landmark in database
 */
let LandmarkEntity = class LandmarkEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64 }),
    (0, tslib_1.__metadata)("design:type", String)
], LandmarkEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "simple-json", nullable: true }),
    (0, tslib_1.__metadata)("design:type", Object)
], LandmarkEntity.prototype, "geojsonobject", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 16 }),
    (0, tslib_1.__metadata)("design:type", String)
], LandmarkEntity.prototype, "locationType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => layer_entity_1.LayerEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "landmark_layer_id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof layer_entity_1.LayerEntity !== "undefined" && layer_entity_1.LayerEntity) === "function" ? _a : Object)
], LandmarkEntity.prototype, "layer", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)('GeoObjectEntity', 'geoobject', { onDelete: 'CASCADE', cascade: true }),
    (0, typeorm_1.JoinColumn)({ name: "geo_object_id", referencedColumnName: 'id' }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof geo_object_entity_1.GeoObjectEntity !== "undefined" && geo_object_entity_1.GeoObjectEntity) === "function" ? _b : Object)
], LandmarkEntity.prototype, "geoObject", void 0);
LandmarkEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "landmark" })
], LandmarkEntity);
exports.LandmarkEntity = LandmarkEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/layer.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayerEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
/**
 * This is Layer entity
 * Contains layer fields creates layer in database
 */
let LayerEntity = class LayerEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64 }),
    (0, tslib_1.__metadata)("design:type", String)
], LayerEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 512 }),
    (0, tslib_1.__metadata)("design:type", String)
], LayerEntity.prototype, "address", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64 }),
    (0, tslib_1.__metadata)("design:type", String)
], LayerEntity.prototype, "city", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64 }),
    (0, tslib_1.__metadata)("design:type", String)
], LayerEntity.prototype, "country", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], LayerEntity.prototype, "zip", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64 }),
    (0, tslib_1.__metadata)("design:type", String)
], LayerEntity.prototype, "state", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], LayerEntity.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)('GeofenceEntity', 'geofence', { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", Array)
], LayerEntity.prototype, "geofence", void 0);
LayerEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "layers" })
], LayerEntity);
exports.LayerEntity = LayerEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/newlayer.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ProductData = exports.LayerData = exports.NLayer = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let NLayer = class NLayer {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], NLayer.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], NLayer.prototype, "category", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Boolean)
], NLayer.prototype, "has_subcategory", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(type => LayerData, layerData => layerData.layer, { cascade: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], NLayer.prototype, "data", void 0);
NLayer = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "layer_category" })
], NLayer);
exports.NLayer = NLayer;
let LayerData = class LayerData {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], LayerData.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], LayerData.prototype, "value", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)(type => ProductData, productData => productData.layerData, { cascade: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], LayerData.prototype, "data", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(type => NLayer, layer => layer.data, { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", NLayer)
], LayerData.prototype, "layer", void 0);
LayerData = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "layer_data" })
], LayerData);
exports.LayerData = LayerData;
let ProductData = class ProductData {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ProductData.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], ProductData.prototype, "product_id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], ProductData.prototype, "product_name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(type => LayerData, layerData => layerData.data, { onDelete: 'CASCADE' }),
    (0, tslib_1.__metadata)("design:type", LayerData)
], ProductData.prototype, "layerData", void 0);
ProductData = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "product_data" })
], ProductData);
exports.ProductData = ProductData;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/notification.email.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationEmailEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.entity.ts");
/**
 * This is notification email  entity
 * Contains notification email fields
 */
let NotificationEmailEntity = class NotificationEmailEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], NotificationEmailEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], NotificationEmailEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], NotificationEmailEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64 }),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationEmailEntity.prototype, "email", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => notification_entity_1.NotificationEntity, map => map.emails, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "notification_id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof notification_entity_1.NotificationEntity !== "undefined" && notification_entity_1.NotificationEntity) === "function" ? _c : Object)
], NotificationEmailEntity.prototype, "notification", void 0);
NotificationEmailEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "notification_emails" })
], NotificationEmailEntity);
exports.NotificationEmailEntity = NotificationEmailEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/notification.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const typeorm_1 = __webpack_require__("typeorm");
const notification_type_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/notification.type.enum.ts");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
const notification_template_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.template.entity.ts");
/**
 * This is npotification  entity
 * Contains notification fields and creates notification in database
 */
let NotificationEntity = class NotificationEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: "timezone", nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationEntity.prototype, "timezone", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "enum", enum: notification_type_enum_1.NotificationTypeEnum, default: notification_type_enum_1.NotificationTypeEnum.EMAIL }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof notification_type_enum_1.NotificationTypeEnum !== "undefined" && notification_type_enum_1.NotificationTypeEnum) === "function" ? _a : Object)
], NotificationEntity.prototype, "type", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ name: "customer_id", nullable: false }),
    (0, tslib_1.__metadata)("design:type", Number)
], NotificationEntity.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)('NotificationEmailEntity', 'notification', { onDelete: 'CASCADE', eager: true, cascade: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], NotificationEntity.prototype, "emails", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(type => notification_template_entity_1.NotificationTemplateEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "email_template_id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof notification_template_entity_1.NotificationTemplateEntity !== "undefined" && notification_template_entity_1.NotificationTemplateEntity) === "function" ? _b : Object)
], NotificationEntity.prototype, "emailTemplate", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(type => notification_template_entity_1.NotificationTemplateEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "sms_template_id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof notification_template_entity_1.NotificationTemplateEntity !== "undefined" && notification_template_entity_1.NotificationTemplateEntity) === "function" ? _c : Object)
], NotificationEntity.prototype, "smsTemplate", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToMany)('NotificationUserEntity', 'notification', { onDelete: 'CASCADE', eager: true, cascade: true }),
    (0, tslib_1.__metadata)("design:type", Array)
], NotificationEntity.prototype, "users", void 0);
NotificationEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "notification" })
], NotificationEntity);
exports.NotificationEntity = NotificationEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/notification.template.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationTemplateEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
/**
 * This is Notification template  entity
 * Contains Notification template fields and creates notification in database
 */
let NotificationTemplateEntity = class NotificationTemplateEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: 'text', nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationTemplateEntity.prototype, "body", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationTemplateEntity.prototype, "name", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 64, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], NotificationTemplateEntity.prototype, "subject", void 0);
NotificationTemplateEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "notification_template" })
], NotificationTemplateEntity);
exports.NotificationTemplateEntity = NotificationTemplateEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/notification.user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationUserEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
const notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.entity.ts");
const user_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/user.entity.ts");
/**
 * This Notification entity
 * Contains notification fields and creates notification in database
 */
let NotificationUserEntity = class NotificationUserEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], NotificationUserEntity.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.CreateDateColumn)({ name: "created_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], NotificationUserEntity.prototype, "createdAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.UpdateDateColumn)({ name: "updated_at" }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], NotificationUserEntity.prototype, "updatedAt", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.ManyToOne)(() => notification_entity_1.NotificationEntity, map => map.emails, { onDelete: 'CASCADE' }),
    (0, typeorm_1.JoinColumn)({ name: "notification_id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_c = typeof notification_entity_1.NotificationEntity !== "undefined" && notification_entity_1.NotificationEntity) === "function" ? _c : Object)
], NotificationUserEntity.prototype, "notification", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.OneToOne)(() => user_entity_1.UserEntity, { eager: true }),
    (0, typeorm_1.JoinColumn)({ name: "id" }),
    (0, tslib_1.__metadata)("design:type", typeof (_d = typeof user_entity_1.UserEntity !== "undefined" && user_entity_1.UserEntity) === "function" ? _d : Object)
], NotificationUserEntity.prototype, "user", void 0);
NotificationUserEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "notification_users" })
], NotificationUserEntity);
exports.NotificationUserEntity = NotificationUserEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/report-notification.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportNotification = void 0;
const tslib_1 = __webpack_require__("tslib");
const typeorm_1 = __webpack_require__("typeorm");
let ReportNotification = class ReportNotification {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ReportNotification.prototype, "id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], ReportNotification.prototype, "customerName", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], ReportNotification.prototype, "report", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", String)
], ReportNotification.prototype, "createdBy", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)(),
    (0, tslib_1.__metadata)("design:type", Number)
], ReportNotification.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)('simple-array'),
    (0, tslib_1.__metadata)("design:type", Array)
], ReportNotification.prototype, "notificationIds", void 0);
ReportNotification = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "report_notifications" })
], ReportNotification);
exports.ReportNotification = ReportNotification;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/entity/user.entity.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEntity = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-unused-vars */
const typeorm_1 = __webpack_require__("typeorm");
const user_type_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/user.type.enum.ts");
const extend_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/extend.entity.ts");
/**
 * This is users entity
 * Contains users fields and creates column based on these fields into database
 */
let UserEntity = class UserEntity extends extend_entity_1.ExtendEntity {
};
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "username", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 100, nullable: false }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "password", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ length: 100, nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "lastname", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "enum", enum: user_type_enum_1.UserTypeEnum, default: user_type_enum_1.UserTypeEnum.USER }),
    (0, tslib_1.__metadata)("design:type", typeof (_a = typeof user_type_enum_1.UserTypeEnum !== "undefined" && user_type_enum_1.UserTypeEnum) === "function" ? _a : Object)
], UserEntity.prototype, "accountType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ type: "enum", enum: user_type_enum_1.CustomerType, default: user_type_enum_1.CustomerType.USER }),
    (0, tslib_1.__metadata)("design:type", typeof (_b = typeof user_type_enum_1.CustomerType !== "undefined" && user_type_enum_1.CustomerType) === "function" ? _b : Object)
], UserEntity.prototype, "userType", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", Number)
], UserEntity.prototype, "customerId", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UserEntity.prototype, "active", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: true }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UserEntity.prototype, "canChangePassword", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: "star@admin.com" }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "email_id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: "2025-07-12 12:35:00" }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "expires_on", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: "admin" }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "firstname", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: "admin" }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "login_id", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ default: false }),
    (0, tslib_1.__metadata)("design:type", Boolean)
], UserEntity.prototype, "neverExpire", void 0);
(0, tslib_1.__decorate)([
    (0, typeorm_1.Column)({ nullable: true }),
    (0, tslib_1.__metadata)("design:type", String)
], UserEntity.prototype, "phone_no", void 0);
UserEntity = (0, tslib_1.__decorate)([
    (0, typeorm_1.Entity)({ name: "users" })
], UserEntity);
exports.UserEntity = UserEntity;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/layer.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayerModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const apl_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/apl.controller.ts");
const asset_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/asset.controller.ts");
const customer_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/customer.controller.ts");
const event_detail_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/event.detail.controller.ts");
const geofence_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/geofence.controller.ts");
const group_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/group.controller.ts");
const landmark_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/landmark.controller.ts");
const layer_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/layer.controller.ts");
const newlayer_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/newlayer.controller.ts");
const notification_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/notification.controller.ts");
const notification_template_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/notification.template.controller.ts");
const user_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/user.controller.ts");
const apl_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/apl.entity.ts");
const apl_item_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/apl.item.entity.ts");
const asset_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/asset.entity.ts");
const customer_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/customer.entity.ts");
const event_details_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.details.entity.ts");
const event_param_details_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.param.details.entity.ts");
const fligh_location_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/fligh.location.entity.ts");
const flight_plan_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/flight.plan.entity.ts");
const genfence_asset_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/genfence.asset.entity.ts");
const geofence_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/geofence.entity.ts");
const geofence_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/geofence.notification.entity.ts");
const group_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/group.entity.ts");
const landmark_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/landmark.entity.ts");
const layer_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/layer.entity.ts");
const newlayer_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/newlayer.entity.ts");
const notification_email_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.email.entity.ts");
const notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.entity.ts");
const notification_template_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.template.entity.ts");
const notification_user_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.user.entity.ts");
const user_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/user.entity.ts");
const apl_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/apl.service.ts");
const asset_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/asset.service.ts");
const customer_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/customer.service.ts");
const event_detail_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/event.detail.service.ts");
const geofence_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/geofence.service.ts");
const group_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/group.service.ts");
const landmark_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/landmark.service.ts");
const layer_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/layer.service.ts");
const newlayer_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/newlayer.service.ts");
const newUser_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/newUser.service.ts");
const notification_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/notification.service.ts");
const notification_template_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/notification.template.service.ts");
const user_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/user.service.ts");
const event_based_notification_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/event.based.notification.controller.ts");
const eventNotification_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/eventNotification.service.ts");
const event_based_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.based.notification.entity.ts");
const event_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.notification.entity.ts");
const event_asset_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.asset.entity.ts");
const report_notification_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/service/report-notification.service.ts");
const report_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/report-notification.entity.ts");
const report_notification_controller_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/controller/report-notification.controller.ts");
/**
 * @ignore
 */
let LayerModule = class LayerModule {
};
LayerModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                event_based_notification_entity_1.EventBasedNotificationEntity, event_notification_entity_1.EventNotificationEntity, event_asset_entity_1.EventAssetEntity, report_notification_entity_1.ReportNotification,
                newlayer_entity_1.NLayer, newlayer_entity_1.LayerData, newlayer_entity_1.ProductData,
                layer_entity_1.LayerEntity, landmark_entity_1.LandmarkEntity, notification_email_entity_1.NotificationEmailEntity, notification_entity_1.NotificationEntity,
                notification_template_entity_1.NotificationTemplateEntity, geofence_entity_1.GeofenceEntity, apl_entity_1.AplEntity, apl_item_entity_1.AplItemEntity, asset_entity_1.AssetEntity, customer_entity_1.CustomerEntity,
                event_details_entity_1.EventDetailsEntity, event_param_details_entity_1.EventParamDetailsEntity, fligh_location_entity_1.FlighLocationEntity, flight_plan_entity_1.FlighPlanEntity, user_entity_1.UserEntity, group_entity_1.GroupEntity,
                customer_entity_1.CustomerEntity, notification_user_entity_1.NotificationUserEntity, geofence_notification_entity_1.GeofenceNotificationEntity, genfence_asset_entity_1.GeofenceAssetEntity, asset_entity_1.AssetEntity
            ])
        ],
        providers: [
            newlayer_service_1.NewLayerService, newUser_service_1.NewUserService, eventNotification_service_1.EventNotificationService, report_notification_service_1.ReportNotificationService,
            layer_service_1.LayerService, query_builder_service_1.QueryBuilder, landmark_service_1.LandmarkService, notification_service_1.NotificationService, notification_template_service_1.NotificationTemplateService,
            asset_service_1.AssetService, user_service_1.UserService, group_service_1.GroupService, customer_service_1.CustomerService, apl_service_1.AplService, event_detail_service_1.EventDetailService, geofence_service_1.GeofenceService
        ],
        exports: [typeorm_1.TypeOrmModule],
        controllers: [
            newlayer_controller_1.NewLayerController, event_based_notification_controller_1.EventNotificationController, report_notification_controller_1.ReportNotificationController,
            layer_controller_1.LayerController, landmark_controller_1.LandmarkController, notification_controller_1.NotificationController, notification_template_controller_1.NotificationTemplateController,
            asset_controller_1.AssetController, user_controller_1.UserController, group_controller_1.GroupController, customer_controller_1.CustomerController, apl_controller_1.AplController, event_detail_controller_1.EventDetailController,
            geofence_controller_1.GeofenceController, asset_controller_1.AssetController
        ]
    })
], LayerModule);
exports.LayerModule = LayerModule;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/apl.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AplService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AplService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const apl_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/apl.entity.ts");
/**
 * This provides AplService methods for API Query
 */
let AplService = AplService_1 = class AplService {
    /**
     * Constructor for apl services
     * @param repository
     * @param queryBuilderService
     */
    constructor(repository, queryBuilderService) {
        this.repository = repository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(AplService_1.name);
    }
    /**
     * Creates new Api based on data
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.save(data);
        });
    }
    /**
     * Find APl based on id
     * @param id
     * @returns
     */
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.findOne({ id });
        });
    }
    /**
     * Find all the apl in database
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
    /**
     * This query removes apl based on id
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = yield this.findById(id);
            layer.status = status_enum_1.StatusEnum.DELETED;
            return this.repository.save(layer);
        });
    }
    /**
     * Updates apl with new data checks firstly with id
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let layer = yield this.findById(id);
            this.logger.log(`update: ${JSON.stringify(layer)}`);
            if (layer == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: `Apl id: ${id} not found`,
                }, common_1.HttpStatus.FORBIDDEN);
            }
            layer = Object.assign(layer, data);
            return this.repository.save(layer);
        });
    }
    /**
     * @ignore
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.repository.createQueryBuilder('t');
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
};
AplService = AplService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(apl_entity_1.AplEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _b : Object])
], AplService);
exports.AplService = AplService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/asset.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var AssetService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AssetService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const asset_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/asset.entity.ts");
const _ = __webpack_require__("lodash");
/**
 * This class contains methods for AssetService API Query
 */
let AssetService = AssetService_1 = class AssetService {
    /**
     * Constructor for AssetServices
     * @param repository
     * @param queryBuilderService
     */
    constructor(repository, queryBuilderService) {
        this.repository = repository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(AssetService_1.name);
    }
    /**
     * Creates new asset in database
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.save(data);
        });
    }
    /**
     * Find a asset based on id of asset
     * @param id
     * @returns
     */
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.findOne({ id });
        });
    }
    /**
     * Find all the assets from database
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find({ status: status_enum_1.StatusEnum.ACTIVE });
        });
    }
    findUserAssets(customerId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find({ customerId: customerId, status: status_enum_1.StatusEnum.ACTIVE });
        });
    }
    findCustomerAssets(customerId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find({ customerId: customerId, status: status_enum_1.StatusEnum.ACTIVE });
        });
    }
    /**
     * Remove a asset from database
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = yield this.findById(id);
            layer.status = status_enum_1.StatusEnum.DELETED;
            return this.repository.save(layer);
        });
    }
    /**
     * Updates asset with new data
     * @param data
     * @returns
     */
    update(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const id = _.result(data, 'id', 0);
            data = _.omit(data, ['id']);
            let layer = yield this.findById(id);
            if (layer == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: `Asset id: ${id} not found`,
                }, common_1.HttpStatus.FORBIDDEN);
            }
            layer = Object.assign(layer, data);
            return this.repository.save(layer);
        });
    }
    /**
     * This method finds all the assets based on Customer ID.
     * @param {number}customerId  Functions to find customer asset based on id
     * @returns
     */
    findUserAsset(customerId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find({ customerId });
        });
    }
    /**
     * @ignore
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.repository.createQueryBuilder('t');
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
};
AssetService = AssetService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(asset_entity_1.AssetEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _b : Object])
], AssetService);
exports.AssetService = AssetService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/customer.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomerService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const customer_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/customer.entity.ts");
const user_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/user.entity.ts");
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
let CustomerService = class CustomerService {
    constructor(customerRepository, userRepository, queryBuilderService) {
        this.customerRepository = customerRepository;
        this.userRepository = userRepository;
        this.queryBuilderService = queryBuilderService;
    }
    create(customerDto) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { name, phone, email, city, state, country, address, preLogoText, postLogoText, logo_filename, isAdmin, user } = customerDto;
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
                const newUser = this.userRepository.create(Object.assign(Object.assign({}, user), { customerId: null }));
                yield this.userRepository.save(newUser);
                customer.userId = newUser.id;
            }
            yield this.customerRepository.save(customer);
            return customerDto;
        });
    }
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.customerRepository.createQueryBuilder('customer')
                .leftJoinAndSelect('customer.user', 'user')
                .getMany();
        });
    }
    findOne(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.customerRepository.createQueryBuilder('customer')
                .leftJoinAndSelect('customer.user', 'user')
                .where('customer.id = :id', { id })
                .getOne();
        });
    }
    findCustomerUser(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.customerRepository.createQueryBuilder('customer')
                .leftJoinAndSelect('customer.user', 'user')
                .where('customer.userId = :id', { id })
                .getOne();
        });
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
    update(id, customerDto) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const { name, phone, email, city, state, country, address, preLogoText, postLogoText, logo_filename, isAdmin, user } = customerDto;
            // Retrieve the customer from the database
            const customer = yield this.customerRepository.findOne(id);
            // Check if the customer exists
            if (!customer) {
                // Handle the case where the customer is not found (e.g., throw an exception)
                throw new common_1.NotFoundException(`Customer with id ${id} not found`);
            }
            // Update only the fields that are provided in the customerDto
            if (name)
                customer.name = name;
            if (phone)
                customer.phone = phone;
            if (email)
                customer.email = email;
            if (city)
                customer.city = city;
            if (state)
                customer.state = state;
            if (country)
                customer.country = country;
            if (address)
                customer.address = address;
            if (preLogoText)
                customer.preLogoText = preLogoText;
            if (postLogoText)
                customer.postLogoText = postLogoText;
            if (logo_filename)
                customer.logo_filename = logo_filename;
            if (isAdmin !== undefined)
                customer.isAdmin = isAdmin;
            // Update user information if isAdmin is provided
            if (isAdmin && user) {
                // Check if the customer already has a user associated
                if (customer.userId) {
                    // If yes, update the existing user
                    yield this.userRepository.update(customer.userId, user);
                }
                else {
                    // If no, create a new user and associate it with the customer
                    const newUser = this.userRepository.create(Object.assign(Object.assign({}, user), { customerId: customer.id }));
                    yield this.userRepository.save(newUser);
                    customer.userId = newUser.id;
                }
            }
            else {
                // If isAdmin is false or not provided, remove the associated user
                customer.userId = null;
            }
            // Save the updated customer to the database
            yield this.customerRepository.save(customer);
            // Return the updated customerDto
            return customerDto;
        });
    }
    delete(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const customer = yield this.customerRepository.findOne(id);
            if (!customer) {
                throw new common_1.NotFoundException(`Customer with ID ${id} not found`);
            }
            if (customer.userId) {
                const user = yield this.userRepository.findOne(customer.userId);
                if (user) {
                    user.status = status_enum_1.StatusEnum.DELETED;
                    yield this.userRepository.save(user);
                }
            }
            yield this.customerRepository.delete(id);
        });
    }
    /**
     * @ignore
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.customerRepository.createQueryBuilder('t');
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
};
CustomerService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(customer_entity_1.CustomerEntity)),
    (0, tslib_1.__param)(1, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _c : Object])
], CustomerService);
exports.CustomerService = CustomerService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/event.detail.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var EventDetailService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventDetailService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const event_details_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.details.entity.ts");
/**
 * This class contains methods for EventDetaial API
 * @class EventDetailService
 */
let EventDetailService = EventDetailService_1 = class EventDetailService {
    /**
     * Constructor for Event details
     * @param repository
     * @param queryBuilderService
     */
    constructor(repository, queryBuilderService) {
        this.repository = repository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(EventDetailService_1.name);
    }
    /**
     *Creates new EventDetail in database
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.save(data);
        });
    }
    /**
     * Find event based on id provided
     * @param id
     * @returns
     */
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.findOne({ id });
        });
    }
    /**
     * Find all the events
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
    /**
     * Remove a event based on id provided
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = yield this.findById(id);
            layer.status = status_enum_1.StatusEnum.DELETED;
            return this.repository.save(layer);
        });
    }
    /**
     * Updates event based on id
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let layer = yield this.findById(id);
            this.logger.log(`update: ${JSON.stringify(layer)}`);
            if (layer == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: `Event detail id: ${id} not found`,
                }, common_1.HttpStatus.FORBIDDEN);
            }
            layer = Object.assign(layer, data);
            return this.repository.save(layer);
        });
    }
    /**
     * @ignore
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.repository.createQueryBuilder('t');
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
};
EventDetailService = EventDetailService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(event_details_entity_1.EventDetailsEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _b : Object])
], EventDetailService);
exports.EventDetailService = EventDetailService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/eventNotification.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var EventNotificationService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EventNotificationService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const typeorm_2 = __webpack_require__("typeorm");
const _ = __webpack_require__("lodash");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const event_based_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.based.notification.entity.ts");
const event_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.notification.entity.ts");
const notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.entity.ts");
const event_asset_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/event.asset.entity.ts");
const asset_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/asset.entity.ts");
const customer_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/customer.entity.ts");
/**
 * This class contains methods for event notification services
 * @class EventNotificationService
 */
let EventNotificationService = EventNotificationService_1 = class EventNotificationService {
    /**
     * Constructor for event notification service
     * @param repository
     * @param queryBuilderService
     */
    constructor(repository, queryBuilderService) {
        this.repository = repository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(EventNotificationService_1.name);
    }
    /**
     * Create a new event notification
     * @param data
     * @returns
     */
    // async create(data: EventNotificationMainDto): Promise<EventBasedNotificationEntity> {
    //   data.vehicles.forEach(o => {
    //       o = Object.assign(o, {assetId: o.id})
    //       _.omit(o, ['id']);
    //   });
    //   data.notifications.forEach(o => {
    //       o = Object.assign(o, {notificationId: o.id})
    //       _.omit(o, ['id']);
    //   });
    //   const geofence: EventBasedNotificationEntity = Object.assign(data);
    //   const notification = await this.repository.save(geofence);
    //   return notification;
    // }
    // service
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            // First, create the EventBasedNotificationEntity
            const eventNotification = new event_based_notification_entity_1.EventBasedNotificationEntity();
            eventNotification.name = data.name;
            eventNotification.customerId = data.customerId;
            eventNotification.customerName = data.customerName;
            eventNotification.eventId = data.eventId;
            eventNotification.eventName = data.eventName;
            eventNotification.description = data.description;
            // Create and associate the EventAssetEntity instances
            const vehicles = data.vehicles.map((vehicleData) => {
                const eventAsset = new event_asset_entity_1.EventAssetEntity();
                eventAsset.assetId = vehicleData.id;
                eventNotification.assetIds = vehicleData.id;
                return eventAsset;
            });
            eventNotification.vehicles = vehicles;
            // eventNotification.assetIds = vehicles.map((vehicle) => vehicle.assetId);
            // Create and associate the EventNotificationEntity instances
            const notifications = data.notifications.map((notificationData) => {
                const eventNotificationEntity = new event_notification_entity_1.EventNotificationEntity();
                eventNotificationEntity.notificationId = notificationData.id;
                eventNotification.notificationsId = notificationData.id;
                return eventNotificationEntity;
            });
            eventNotification.notifications = notifications;
            // eventNotification.notificationsId = notifications.map((notification) => notification.notificationId);
            // Save the EventBasedNotificationEntity and its associations in the database
            const savedEventNotification = yield this.repository.save(eventNotification);
            return savedEventNotification;
        });
    }
    /**
     * Find an event notification by ID
     * @param id
     * @returns
     */
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository
                .createQueryBuilder("t")
                .leftJoinAndMapMany("t.notifications", event_notification_entity_1.EventNotificationEntity, "n", "t.id = n.event_id")
                .leftJoinAndMapOne("n.notification", notification_entity_1.NotificationEntity, "notification", "n.notification_id = notification.id")
                .leftJoinAndMapMany("t.assets", event_asset_entity_1.EventAssetEntity, "a", "t.id = a.event_id")
                .leftJoinAndMapOne("a.asset", asset_entity_1.AssetEntity, "asset", "a.asset_id = asset.id")
                .where("t.id = :id", { id })
                .where('t.status = :status', { status: status_enum_1.StatusEnum.ACTIVE })
                .getOne();
        });
    }
    /**
     * Find all event notifications in the database
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.createQueryBuilder('t')
                .leftJoinAndMapOne('t.customer', customer_entity_1.CustomerEntity, 'customer', 't.customer_id = customer.id')
                .leftJoinAndMapMany('t.notifications', event_notification_entity_1.EventNotificationEntity, 'n', 't.id  = n.event_id')
                .leftJoinAndMapOne('n.notification', notification_entity_1.NotificationEntity, 'notification', 'n.notification_id  = notification.id')
                .leftJoinAndMapMany('t.vehicles', event_asset_entity_1.EventAssetEntity, 'a', 't.id  = a.event_id')
                .leftJoinAndMapOne('a.asset', asset_entity_1.AssetEntity, 'asset', 'a.asset_id  = asset.id')
                .where('t.status = :status', { status: status_enum_1.StatusEnum.ACTIVE })
                .getMany();
        });
    }
    /**
     * Remove an event notification by ID
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log("id: ", id);
            yield this.repository
                .createQueryBuilder("t")
                .update(event_based_notification_entity_1.EventBasedNotificationEntity)
                .set({ status: status_enum_1.StatusEnum.DELETED })
                .where("id = :id", { id })
                .execute();
            return this.findById(id);
        });
    }
    /**
     * Update an event notification
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            data = _.omit(data, ["id"]);
            data.vehicles.forEach((o) => {
                o = Object.assign(o, { assetId: o.id });
                _.omit(o, ["id"]);
            });
            data.notifications.forEach((o) => {
                o = Object.assign(o, { notificationId: o.id });
                _.omit(o, ["id"]);
            });
            let event = yield this.findById(id);
            this.logger.log(`update: ${JSON.stringify(event)}`);
            if (event == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: `Event notification id: ${id} not found`,
                }, common_1.HttpStatus.FORBIDDEN);
            }
            event = Object.assign(event, data);
            const notification = yield this.repository.save(event);
            return notification;
        });
    }
    /**
     * @ignore
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.repository.createQueryBuilder("t");
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
};
EventNotificationService = EventNotificationService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(event_based_notification_entity_1.EventBasedNotificationEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _b : Object])
], EventNotificationService);
exports.EventNotificationService = EventNotificationService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/geofence.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var GeofenceService_1, _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GeofenceService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const geofence_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/geofence.entity.ts");
const landmark_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/landmark.entity.ts");
const layer_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/layer.entity.ts");
const user_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/user.entity.ts");
const _ = __webpack_require__("lodash");
const customer_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/customer.entity.ts");
const geofence_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/geofence.notification.entity.ts");
const notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.entity.ts");
const genfence_asset_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/genfence.asset.entity.ts");
const asset_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/asset.entity.ts");
/**
 * This class contains method for geofence services
 * @class Geofence
 */
let GeofenceService = GeofenceService_1 = class GeofenceService {
    /**
     * Constructor for geofence service
     * @param repository
     * @param layerRepository
     * @param landmarkRepository
     * @param userRepository
     * @param queryBuilderService
     */
    constructor(repository, layerRepository, landmarkRepository, userRepository, queryBuilderService) {
        this.repository = repository;
        this.layerRepository = layerRepository;
        this.landmarkRepository = landmarkRepository;
        this.userRepository = userRepository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(GeofenceService_1.name);
    }
    /**
     * Create new GeoFence
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            data.vehicles.forEach(o => {
                o = Object.assign(o, { assetId: o.id });
                _.omit(o, ['id']);
            });
            data.notifications.forEach(o => {
                o = Object.assign(o, { notificationId: o.id });
                _.omit(o, ['id']);
            });
            const geofence = Object.assign(data);
            const notification = yield this.repository.save(geofence);
            return notification;
        });
    }
    /**
     * Finds Geofence based on id provided
     * @param id
     * @returns
     */
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.createQueryBuilder('t')
                .leftJoinAndMapOne('t.customer', customer_entity_1.CustomerEntity, 'customer', 't.customer_id = customer.id')
                .leftJoinAndMapOne('t.layer', layer_entity_1.LayerEntity, 'layer', 't.g_layer_id  = layer.id')
                .leftJoinAndMapOne('t.landmark', landmark_entity_1.LandmarkEntity, 'landmark', 't.g_landmark_id  = landmark.id')
                .leftJoinAndMapMany('t.notifications', geofence_notification_entity_1.GeofenceNotificationEntity, 'n', 't.id  = n.geofence_id')
                .leftJoinAndMapOne('n.notification', notification_entity_1.NotificationEntity, 'notification', 'n.notification_id  = notification.id')
                .leftJoinAndMapMany('t.vehicles', genfence_asset_entity_1.GeofenceAssetEntity, 'a', 't.id  = a.geofence_id')
                .leftJoinAndMapOne('a.asset', asset_entity_1.AssetEntity, 'asset', 'a.asset_id  = asset.id')
                .where('t.id = :id', { id })
                .getOne();
            return this.repository.findOne({ id: id, status: status_enum_1.StatusEnum.ACTIVE });
        });
    }
    /**
     * Finds all the geofence entries in database
     * @returns
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.createQueryBuilder('t')
                .leftJoinAndMapOne('t.customer', customer_entity_1.CustomerEntity, 'customer', 't.customer_id = customer.id')
                .leftJoinAndMapOne('t.layer', layer_entity_1.LayerEntity, 'layer', 't.g_layer_id  = layer.id')
                .leftJoinAndMapOne('t.landmark', landmark_entity_1.LandmarkEntity, 'landmark', 't.g_landmark_id  = landmark.id')
                .leftJoinAndMapMany('t.notifications', geofence_notification_entity_1.GeofenceNotificationEntity, 'n', 't.id  = n.geofence_id')
                .leftJoinAndMapOne('n.notification', notification_entity_1.NotificationEntity, 'notification', 'n.notification_id  = notification.id')
                .leftJoinAndMapMany('t.vehicles', genfence_asset_entity_1.GeofenceAssetEntity, 'a', 't.id  = a.geofence_id')
                .leftJoinAndMapOne('a.asset', asset_entity_1.AssetEntity, 'asset', 'a.asset_id  = asset.id')
                .where('t.status = :status', { status: status_enum_1.StatusEnum.ACTIVE })
                .getMany();
        });
    }
    /**
     * Remove Geofence based on id provided
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log('id: ', id);
            yield this.repository.createQueryBuilder('t').update(geofence_entity_1.GeofenceEntity).set({ status: status_enum_1.StatusEnum.DELETED })
                .where("id = :id", { id }).execute();
            return this.findById(id);
        });
    }
    /**
     * Updates Geofence entry based on id
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            data = _.omit(data, ['id']);
            data.vehicles.forEach(o => {
                o = Object.assign(o, { assetId: o.id });
                _.omit(o, ['id']);
            });
            data.notifications.forEach(o => {
                o = Object.assign(o, { notificationId: o.id });
                _.omit(o, ['id']);
            });
            let layer = yield this.findById(id);
            this.logger.log(`update: ${JSON.stringify(layer)}`);
            if (layer == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: `Notification id: ${id} not found`,
                }, common_1.HttpStatus.FORBIDDEN);
            }
            layer = Object.assign(layer, data);
            const notification = yield this.repository.save(layer);
            return notification;
        });
    }
    /**
     * @ignore
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.repository.createQueryBuilder('t');
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
};
GeofenceService = GeofenceService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(geofence_entity_1.GeofenceEntity)),
    (0, tslib_1.__param)(1, (0, typeorm_1.InjectRepository)(layer_entity_1.LayerEntity)),
    (0, tslib_1.__param)(2, (0, typeorm_1.InjectRepository)(landmark_entity_1.LandmarkEntity)),
    (0, tslib_1.__param)(3, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _e : Object])
], GeofenceService);
exports.GeofenceService = GeofenceService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/group.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var GroupService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GroupService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const group_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/group.entity.ts");
const _ = __webpack_require__("lodash");
/**
 * This class contains methods for GroupService API
 */
let GroupService = GroupService_1 = class GroupService {
    /**
     * Constructor for group service
     * @param repository
     * @param queryBuilderService
     */
    constructor(repository, queryBuilderService) {
        this.repository = repository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(GroupService_1.name);
    }
    /**
     * Creates new Group in database
     * @param data
     * @returns
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.save(data);
        });
    }
    /**
     * Finds a GroupService based on id
     * @param id
     * @returns
     */
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.findOne({ id });
        });
    }
    /**
     * Finds all the Group
     * @returns With all the entries in database
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find();
        });
    }
    /**
     * Remove a GroupService based on id provided
     * @param id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = yield this.findById(id);
            layer.status = status_enum_1.StatusEnum.DELETED;
            return this.repository.save(layer);
        });
    }
    /**
     * Updates new entries based on id and new data provided
     * @param id
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            data = _.omit(data, ['id']);
            let layer = yield this.findById(id);
            this.logger.log(`update: ${JSON.stringify(layer)}`);
            if (layer == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: `Group id: ${id} not found`,
                }, common_1.HttpStatus.FORBIDDEN);
            }
            layer = Object.assign(layer, data);
            return this.repository.save(layer);
        });
    }
    /**
     * @ignore
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.repository.createQueryBuilder('t');
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
};
GroupService = GroupService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(group_entity_1.GroupEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _b : Object])
], GroupService);
exports.GroupService = GroupService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/landmark.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var LandmarkService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LandmarkService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const landmark_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/landmark.entity.ts");
const _ = __webpack_require__("lodash");
/**
 * LandmarkService consist of methods for Landmark API
 */
let LandmarkService = LandmarkService_1 = class LandmarkService {
    /**
     * This is constructor for Landmark Service
     * @param repository
     * @param queryBuilderService
     */
    constructor(repository, queryBuilderService) {
        this.repository = repository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(LandmarkService_1.name);
    }
    /**
     * Create new Landmark in database
     * @param {object}data Takes this and save it into database (new entry)
     * @returns Saves this data into database
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.save(data);
        });
    }
    /**
     * Find Landmark based on id provided
     * @param {number}id Checks for the id of landmark into database
     * @returns with the data related to the id
     */
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.findOne({ id });
        });
    }
    /**
     * Find all the landmarks into database
     * @returns All the landmarks saved in database
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find({ status: status_enum_1.StatusEnum.ACTIVE });
        });
    }
    /**
     * Removes the landmark based on id provided.
     * @param {number}id  Checks for the id
     * @returns
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = yield this.findById(id);
            layer.status = status_enum_1.StatusEnum.DELETED;
            return this.repository.save(layer);
        });
    }
    /**
     * Updates landmark based on id  provided
     * @param id Updates Landmark based on id provided
     * @param data
     * @returns
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            data = _.omit(data, ['id']);
            let layer = yield this.findById(id);
            this.logger.log(`update: ${JSON.stringify(layer)}`);
            if (layer == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: `Layer id: ${id} not found`,
                }, common_1.HttpStatus.FORBIDDEN);
            }
            layer = Object.assign(layer, data);
            return this.repository.save(layer);
        });
    }
    /**
     * @ignore
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.repository.createQueryBuilder('t');
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
};
LandmarkService = LandmarkService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(landmark_entity_1.LandmarkEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _b : Object])
], LandmarkService);
exports.LandmarkService = LandmarkService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/layer.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var LayerService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LayerService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const layer_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/layer.entity.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const _ = __webpack_require__("lodash");
/**
 * LayerService consist of methods for Layer API
 * @property create new Layer
 */
let LayerService = LayerService_1 = class LayerService {
    /**
     * THis is LayerService Constructor
     * @param repository
     * @param queryBuilderService
     */
    constructor(repository, queryBuilderService) {
        this.repository = repository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(LayerService_1.name);
    }
    /**
     * This creates a new Layer in database
     * @param {object}data Takes data from GUI
     * @returns Updates the database
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.save(data);
        });
    }
    /**
     * Finds the layer based on id provided
     * @param {number}id Finds the layer based on id provided
     * @returns With the data matched with id
     */
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.findOne({ id });
        });
    }
    /**
     * All the data related to layer
     * @returns All the data related to layer
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find({ status: status_enum_1.StatusEnum.ACTIVE });
        });
    }
    /**
     * Checks for id in database and delete that layer
     * @param {number}id Checks for id in database
     * @returns Delete the respective id if found in database
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = yield this.findById(id);
            layer.status = status_enum_1.StatusEnum.DELETED;
            return this.repository.save(layer);
        });
    }
    /**
     * Updates a layer with new entries
     * @param {number}id Checks for the id
     * @param {object}data Update the Layer data based on id
     * @returns Update the database
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            data = _.omit(data, ['id']);
            let layer = yield this.findById(id);
            this.logger.log(`update: ${JSON.stringify(layer)}`);
            if (layer == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: `Layer id: ${id} not found`,
                }, common_1.HttpStatus.FORBIDDEN);
            }
            layer = Object.assign(layer, data);
            return this.repository.save(layer);
        });
    }
    /**
     * @ignore
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.repository.createQueryBuilder('t');
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
};
LayerService = LayerService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(layer_entity_1.LayerEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _b : Object])
], LayerService);
exports.LayerService = LayerService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/newUser.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var NewUserService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewUserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const user_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/user.entity.ts");
let NewUserService = NewUserService_1 = class NewUserService {
    constructor(userRepository, queryBuilderService) {
        this.userRepository = userRepository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(NewUserService_1.name);
    }
    create(userDto) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const user = new user_entity_1.UserEntity();
            user.accountType = userDto.accountType;
            user.active = userDto.active;
            user.canChangePassword = userDto.canChangePassword;
            user.createdBy = userDto.createdBy;
            user.customerId = userDto.customerId;
            user.email_id = userDto.email_id;
            user.expires_on = userDto.expires_on;
            user.firstname = userDto.firstname;
            user.lastname = userDto.lastname;
            user.login_id = userDto.login_id;
            user.neverExpire = userDto.neverExpire;
            user.password = userDto.password;
            user.phone_no = userDto.phone_no;
            user.username = userDto.username;
            user.userType = userDto.userType;
            return this.userRepository.save(user);
        });
    }
    login(username, loginId, password) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            let user;
            if (username) {
                user = yield this.userRepository.findOne({ where: { username, password, status: status_enum_1.StatusEnum.ACTIVE } });
            }
            else if (loginId) {
                user = yield this.userRepository.findOne({ where: { login_id: loginId, password, status: status_enum_1.StatusEnum.ACTIVE } });
            }
            if (!user) {
                throw new Error('Invalid request');
            }
            return user;
        });
    }
    find() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const users = yield this.userRepository.find({ status: status_enum_1.StatusEnum.ACTIVE });
                return users;
            }
            catch (error) {
                // Log the error
                console.error(error);
                throw new common_1.HttpException('Invalid request', common_1.HttpStatus.BAD_REQUEST);
            }
        });
    }
    //Handle list of users for logged in customer 
    getUsersByCustomerId(customerId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.userRepository.find({ where: { customerId, status: status_enum_1.StatusEnum.ACTIVE } });
        });
    }
    update(id, updateUserDto) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.find({ id });
                if (!user) {
                    throw new Error('User not found');
                }
                yield this.userRepository.update({ id }, updateUserDto);
                return user;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const layer = yield this.findById(id);
                layer.status = status_enum_1.StatusEnum.DELETED;
                return this.userRepository.save(layer);
            }
            catch (err) {
                console.log(err);
                const obj = {
                    error: "No user found",
                    status: 404
                };
                return obj;
            }
        });
    }
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const user = yield this.userRepository.findOne({ id });
                if (!user) {
                    throw new Error('User not found');
                }
                return user;
            }
            catch (error) {
                console.error(error);
                throw error;
            }
        });
    }
    //Find by account type
    findByAccountType(accountType) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log('account type: ', accountType);
            return this.userRepository.findOne({ status: status_enum_1.StatusEnum.ACTIVE, accountType });
        });
    }
};
NewUserService = NewUserService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _b : Object])
], NewUserService);
exports.NewUserService = NewUserService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/newlayer.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NewLayerService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const newlayer_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/newlayer.entity.ts");
let NewLayerService = class NewLayerService {
    // constructor(@InjectRepository(NLayer) private layerRepository: Repository<NLayer>) {}
    constructor(layerRepository, productCategoryRepository, layerDataRepository, productRepository) {
        this.layerRepository = layerRepository;
        this.productCategoryRepository = productCategoryRepository;
        this.layerDataRepository = layerDataRepository;
        this.productRepository = productRepository;
        //added -1-3-23
        this.categories = [
            {
                id: 1,
                category: 'Aeronotical Charts',
                has_subcategory: false,
                data: [
                    {
                        id: 1,
                        value: 'US High',
                        data: [
                            {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            },
                        ],
                    },
                    {
                        id: 2,
                        value: 'US Low',
                        data: [
                            {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            },
                        ],
                    },
                    {
                        id: 3,
                        value: 'US VFR',
                        data: [
                            {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            },
                        ],
                    },
                ],
            },
            {
                id: 2,
                category: 'Weather Subscription Basics',
                has_subcategory: true,
                data: [
                    {
                        id: 4,
                        value: 'Enroute',
                        data: [
                            {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            },
                            {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            }, {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            },
                        ],
                    },
                    {
                        id: 5,
                        value: 'Forecast',
                        data: [
                            {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            },
                            {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            }, {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            },
                        ],
                    }, {
                        id: 6,
                        value: 'Lightining and Hazardus',
                        data: [
                            {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            },
                            {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            }, {
                                product_id: 'C39-0x0302-0',
                                product_name: 'camulas weather',
                            },
                        ],
                    },
                ],
            },
        ];
    }
    // Get all layers 
    getLayers() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.categories.map((category) => this.toCategoryDto(category));
        });
    }
    toCategoryDto(category) {
        if (category.has_subcategory) {
            return {
                id: category.id,
                category: category.category,
                has_subcategory: category.has_subcategory,
                data: category.data.map((subcategory) => ({
                    id: subcategory.id,
                    value: subcategory.value,
                    product: subcategory.data.map((product) => ({
                        product_id: product.product_id,
                        product_name: product.product_name,
                    })),
                })),
            };
        }
        else {
            const products = category.data.flatMap((subcategory) => subcategory.data.map((product) => ({
                id: subcategory.id,
                value: subcategory.value,
                product_id: product.product_id,
                product_name: product.product_name,
            })));
            return {
                id: category.id,
                category: category.category,
                has_subcategory: category.has_subcategory,
                data: products,
            };
        }
    }
    // to handle create request 
    createLayer(layerDTO) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = new newlayer_entity_1.NLayer();
            layer.category = layerDTO.category;
            layer.has_subcategory = layerDTO.has_subcategory;
            yield this.layerRepository.save(layer);
            layerDTO.data.forEach((layerDataDTO) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                const layerData = new newlayer_entity_1.LayerData();
                layerData.value = layerDataDTO.value;
                layerData.layer = layer;
                yield this.layerDataRepository.save(layerData);
                if (layerDataDTO.data) {
                    layerDataDTO.data.forEach((productDTO) => (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
                        const product = new newlayer_entity_1.ProductData();
                        product.product_id = productDTO.product_id;
                        product.product_name = productDTO.product_name;
                        product.layerData = layerData;
                        yield this.productRepository.save(product);
                    }));
                }
            }));
            return layerDTO;
        });
    }
    //Update Layer 
    updateLayer(layerId, layerDTO) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = yield this.layerRepository.findOne(layerId);
            layer.category = layerDTO.category;
            layer.has_subcategory = layerDTO.has_subcategory;
            yield this.layerRepository.save(layer);
            for (const layerDataDTO of layerDTO.data) {
                const layerData = yield this.layerDataRepository.findOne(layerDataDTO.id);
                if (!layerData) {
                    continue;
                }
                layerData.value = layerDataDTO.value;
                layerData.layer = layer;
                yield this.layerDataRepository.save(layerData);
                if (layerDataDTO.data) {
                    for (const productDTO of layerDataDTO.data) {
                        const product = yield this.productRepository.findOne(productDTO.product_id);
                        if (!product) {
                            continue;
                        }
                        product.product_id = productDTO.product_id;
                        product.product_name = productDTO.product_name;
                        product.layerData = layerData;
                        yield this.productRepository.save(product);
                    }
                }
            }
            return layerDTO;
        });
    }
    deleteLayer(layerId) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = yield this.layerRepository.findOne(layerId);
            if (!layer) {
                throw new common_1.NotFoundException(`Layer with id ${layerId} not found`);
            }
            yield this.layerRepository.remove(layer);
        });
    }
};
NewLayerService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(newlayer_entity_1.NLayer)),
    (0, tslib_1.__param)(1, (0, typeorm_1.InjectRepository)(newlayer_entity_1.NLayer)),
    (0, tslib_1.__param)(2, (0, typeorm_1.InjectRepository)(newlayer_entity_1.LayerData)),
    (0, tslib_1.__param)(3, (0, typeorm_1.InjectRepository)(newlayer_entity_1.ProductData)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object])
], NewLayerService);
exports.NewLayerService = NewLayerService;
//Layer Data Code Latest
// @Injectable()
// export class NewLayerService {
//   constructor(
//     @InjectRepository(NLayer)
//     private readonly nLayerRepository: Repository<NLayer>,
//     @InjectRepository(LayerData)
//     private readonly layerDataRepository: Repository<LayerData>,
//     @InjectRepository(ProductData)
//     private readonly productDataRepository: Repository<ProductData>,
//   ) {}
//   // async getLayers(): Promise<NLayerDto[]> {
//   //   const nLayers = await this.nLayerRepository.find({ relations: ['data', 'data.data'] });
//   //   return nLayers.map(nLayer => this.mapNLayerToDto(nLayer));
//   // }
//   async  getLayers(): Promise<NLayerDto[]> {
//     const layers = await this.nLayerRepository.find({ relations: ['data', 'data.data'] });
//     return layers.map(layer => {
//       if (layer.has_subcategory) {
//         return plainToClass(NLayerDto, layer, { excludeExtraneousValues: true });
//       } else {
//         const data = layer.data.reduce((acc, curr) => {
//           const productData = curr.data.map(pd => plainToClass(ProductDataDto, pd, { excludeExtraneousValues: true }));
//           const layerDataDto = plainToClass(LayerDataDto, { ...curr, productData }, { excludeExtraneousValues: true });
//           return [...acc, layerDataDto];
//         }, []);
//         const { id, category, has_subcategory } = layer;
//         return plainToClass(NLayerDto, { id, category, has_subcategory, data }, { excludeExtraneousValues: true });
//       }
//     });
//   }
//   // async createNLayer(nLayerDto: NLayerDto): Promise<NLayerDto> {
//   //   const nLayer = this.mapDtoToNLayer(nLayerDto);
//   //   const savedNLayer = await this.nLayerRepository.save(nLayer);
//   //   return this.mapNLayerToDto(savedNLayer);
//   // }
//   // private mapNLayerToDto(nLayer: NLayer): NLayerDto {
//   //   const { id, category, has_subcategory, data } = nLayer;
//   //   const layerDataDto = data.map(layerData => this.mapLayerDataToDto(layerData));
//   //   return { id, category, has_subcategory, data: layerDataDto };
//   // }
//   // private mapLayerDataToDto(layerData: LayerData): LayerDataDto {
//   //   const { id, value, data } = layerData;
//   //   const productDataDto = data.map(productData => this.mapProductDataToDto(productData));
//   //   return { id, value, productData: productDataDto };
//   // }
//   // private mapProductDataToDto(productData: ProductData): ProductDataDto {
//   //   const { product_id, product_name } = productData;
//   //   return { product_id, product_name };
//   // }
//   // private mapDtoToNLayer(nLayerDto: NLayerDto): NLayer {
//   //   const { category, has_subcategory, data } = nLayerDto;
//   //   const layerData = data.map(layerDataDto => this.mapDtoToLayerData(layerDataDto));
//   //   const nLayer = new NLayer();
//   //   nLayer.category = category;
//   //   nLayer.has_subcategory = has_subcategory;
//   //   nLayer.data = layerData;
//   //   return nLayer;
//   // }
//   // private mapDtoToLayerData(layerDataDto: LayerDataDto): LayerData {
//   //   const { value, data } = layerDataDto;
//   //   const productData = data.map(productDataDto => this.mapDtoToProductData(productDataDto));
//   //   const layerData = new LayerData();
//   //   layerData.value = value;
//   //   layerData.data = productData;
//   //   return layerData;
//   // }
//   // private mapDtoToProductData(productDataDto: ProductDataDto): ProductData {
//   //   const { product_id, product_name } = productDataDto;
//   //   const productData = new ProductData();
//   //   productData.product_id = product_id;
//   //   productData.product_name = product_name;
//   //   return productData;
//   // }
// }


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/notification.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var NotificationService_1, _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const notification_email_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.email.entity.ts");
const notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.entity.ts");
const notification_template_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.template.entity.ts");
const user_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/user.entity.ts");
const _ = __webpack_require__("lodash");
/**
 * NotificationService consist of methods for notification API
 */
let NotificationService = NotificationService_1 = class NotificationService {
    /**
     * This is constructor for notification services
     * @param repository
     * @param templateRepository
     * @param notiEmailRepository
     * @param userRepository
     * @param queryBuilderService
     */
    constructor(repository, templateRepository, notiEmailRepository, userRepository, queryBuilderService) {
        this.repository = repository;
        this.templateRepository = templateRepository;
        this.notiEmailRepository = notiEmailRepository;
        this.userRepository = userRepository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(NotificationService_1.name);
    }
    /**
     * This creates new notification in database
     * @param {object}data Takes data as input from API
     * @returns with a Nofitication based on data
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log('data: ', data);
            const emailTemplate = yield this.templateRepository.findOne({ id: data.emailTemplateId });
            const smsTemplate = yield this.templateRepository.findOne({ id: data.smsTemplateId });
            data.emailTemplate = emailTemplate;
            data.smsTemplate = smsTemplate;
            const notification = yield this.repository.save(data);
            return notification;
        });
    }
    /**
     * This method is used to find notification by provided id
     * @param {number}id Takes id as input from GUI
     * @returns  with the notification found based on id provided
     */
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.findOne({ id: id, status: status_enum_1.StatusEnum.ACTIVE });
        });
    }
    /**
     * Finds all the notification
     * @returns All the notification found in database.
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find({ status: status_enum_1.StatusEnum.ACTIVE });
        });
    }
    /**
     * Delete a notification based on id
     * This deletes notification based on id provided
     * @param {number}id Checks for the id provided from GUI into database
     * @returns  Deletes the respective id found in database and update it
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = yield this.findById(id);
            layer.status = status_enum_1.StatusEnum.DELETED;
            return this.repository.save(layer);
        });
    }
    /**
     * Updates notification based on id provided
     * @param {number}id Checks for the id
     * @param {object}data New Data provided
     * @returns  Updates the database
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            data = _.omit(data, ['id']);
            let layer = yield this.findById(id);
            this.logger.log(`update: ${JSON.stringify(layer)}`);
            if (layer == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: `Notification id: ${id} not found`,
                }, common_1.HttpStatus.FORBIDDEN);
            }
            layer = Object.assign(layer, data);
            const notification = yield this.repository.save(layer);
            yield this.notiEmailRepository.delete({ notification: (0, typeorm_2.IsNull)() });
            return notification;
        });
    }
    /**
     * For paginate
     * @ignore
     * @param state
     * @returns
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.repository.createQueryBuilder('t');
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
};
NotificationService = NotificationService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(notification_entity_1.NotificationEntity)),
    (0, tslib_1.__param)(1, (0, typeorm_1.InjectRepository)(notification_template_entity_1.NotificationTemplateEntity)),
    (0, tslib_1.__param)(2, (0, typeorm_1.InjectRepository)(notification_email_entity_1.NotificationEmailEntity)),
    (0, tslib_1.__param)(3, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _b : Object, typeof (_c = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _c : Object, typeof (_d = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _d : Object, typeof (_e = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _e : Object])
], NotificationService);
exports.NotificationService = NotificationService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/notification.template.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var NotificationTemplateService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotificationTemplateService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const notification_template_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/notification.template.entity.ts");
const _ = __webpack_require__("lodash");
/**
 *  This class handles functions of Notification based API Queries.
 * @class
 */
let NotificationTemplateService = NotificationTemplateService_1 = class NotificationTemplateService {
    /**
     * Constructor for notifciation template
     * @param repository
     * @param queryBuilderService
     */
    constructor(repository, queryBuilderService) {
        this.repository = repository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(NotificationTemplateService_1.name);
    }
    /**
     * Takes  data as input and create new notification in database
     * @param data
     * @returns Saves the notification data into database
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.save(data);
        });
    }
    /**
     * Finds by id
     * @param id Find a notification based on id provided
     * @returns With the notification found by the respective id in database.
     */
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.findOne({ id });
        });
    }
    /**
     * Finds all the notification
     * @returns Find all the notification in database
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find({ status: status_enum_1.StatusEnum.ACTIVE });
        });
    }
    /**
     * Remove notification based on id provided
     * @param id Search for a notification based on the provided id
     * @returns  It delete the respective notification and update the database.
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = yield this.findById(id);
            layer.status = status_enum_1.StatusEnum.DELETED;
            return this.repository.save(layer);
        });
    }
    /**
     * Updates database with new entries based on id
     * @param {number}id Search for notification based on id
     * @param {object}data  To be updated data for notification.
     * @returns It updates the database with new entries
     */
    update(id, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            data = _.omit(data, ['id']);
            let layer = yield this.findById(id);
            this.logger.log(`update: ${JSON.stringify(layer)}`);
            if (layer == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: `Notification template id: ${id} not found`,
                }, common_1.HttpStatus.FORBIDDEN);
            }
            layer = Object.assign(layer, data);
            return this.repository.save(layer);
        });
    }
    /**
     * For paginate
     * @param state CreateQueryBuilder based on state data provided
     * @returns With new paginate
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.repository.createQueryBuilder('t');
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
};
NotificationTemplateService = NotificationTemplateService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(notification_template_entity_1.NotificationTemplateEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _b : Object])
], NotificationTemplateService);
exports.NotificationTemplateService = NotificationTemplateService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/report-notification.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReportNotificationService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const report_notification_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/report-notification.entity.ts");
let ReportNotificationService = class ReportNotificationService {
    constructor(reportNotificationRepository) {
        this.reportNotificationRepository = reportNotificationRepository;
    }
    create(dto) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const notificationIds = dto.notifications.map((notification) => notification.id);
            const reportNotification = this.reportNotificationRepository.create({
                createdBy: dto.createdBy,
                customerName: dto.customerName,
                customerId: dto.customerId,
                notificationIds: notificationIds,
                report: dto.report,
            });
            return this.reportNotificationRepository.save(reportNotification);
        });
    }
    update(customerId, reportName, data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const notificationIds = data.notifications.map((notification) => notification.id);
            const existingRecord = yield this.reportNotificationRepository.findOne({
                where: { customerId: customerId, report: reportName },
            });
            if (!existingRecord) {
                return null;
            }
            existingRecord.customerName = data.customerName;
            existingRecord.notificationIds = notificationIds;
            return this.reportNotificationRepository.save(existingRecord);
        });
    }
    getByCustomerIdAndReportName(customerId, reportName) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.reportNotificationRepository.findOne({
                where: { customerId: customerId, report: reportName },
            });
        });
    }
};
ReportNotificationService = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(report_notification_entity_1.ReportNotification)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object])
], ReportNotificationService);
exports.ReportNotificationService = ReportNotificationService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/modules/layers/service/user.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UserService_1, _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const nestjs_typeorm_paginate_1 = __webpack_require__("nestjs-typeorm-paginate");
const typeorm_2 = __webpack_require__("typeorm");
const status_enum_1 = __webpack_require__("./apps/starnavigationapi/src/app/enum/status.enum.ts");
const query_builder_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/service/query.builder.service.ts");
const user_entity_1 = __webpack_require__("./apps/starnavigationapi/src/app/modules/layers/entity/user.entity.ts");
const _ = __webpack_require__("lodash");
/**
 * This class consist of methods which verify user login creation and also to find users
 * @class UserService
 */
let UserService = UserService_1 = class UserService {
    /**
     * Constructor for user services
     * @param repository
     * @param queryBuilderService
     */
    constructor(repository, queryBuilderService) {
        this.repository = repository;
        this.queryBuilderService = queryBuilderService;
        this.logger = new common_1.Logger(UserService_1.name);
    }
    /**
     * This method is used to create new user
     * @param data UserDto is used as param for create function
     * @returns This saves new user into database respective to entries made in UserDto fields.
     */
    create(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.save(data);
        });
    }
    /**
     * This method is used to find individual user based on id
     * @param {number} id Find user by the provided id
     * @returns The user with provided id
     */
    findById(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.findOne({ id });
        });
    }
    /**
     * Find a user based on account type
     * @param {object} accountType
     * @returns Find user based on accountType and the account status.
     */
    findByAccountType(accountType) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            console.log('account type: ', accountType);
            return this.repository.findOne({ status: status_enum_1.StatusEnum.ACTIVE, accountType });
        });
    }
    /**Find all the user exist in database
     * @returns All the users in the database
     */
    findAll() {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            return this.repository.find({ status: status_enum_1.StatusEnum.ACTIVE });
        });
    }
    /**
     * Remove a user from database
     * @param {number}id Takes id and delete the user if found in database
     * @returns Updates the database after the provoded id user is deleted.
     */
    remove(id) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const layer = yield this.findById(id);
            layer.status = status_enum_1.StatusEnum.DELETED;
            return this.repository.save(layer);
        });
    }
    /**
     * Update new entries for a user in database based on id
     * @param data Updates the database with new detail of user
     * @returns  It saves updated entries of user into database
     */
    update(data) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const id = _.result(data, 'id', 0);
            data = _.omit(data, ['id']);
            let layer = yield this.findById(id);
            if (layer == null) {
                throw new common_1.HttpException({
                    status: common_1.HttpStatus.FORBIDDEN,
                    error: `User id: ${id} not found`,
                }, common_1.HttpStatus.FORBIDDEN);
            }
            layer = Object.assign(layer, data);
            return this.repository.save(layer);
        });
    }
    /**
     * For user paginate
     * @param state Uses StateDto
     * @returns With updated paginate.
     */
    paginate(state) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            const options = { page: state.page.current, limit: state.page.size };
            const queryBuilder = this.repository.createQueryBuilder('t');
            return yield (0, nestjs_typeorm_paginate_1.paginate)(this.queryBuilderService.getQuery(state, queryBuilder), options);
        });
    }
    /**
     * This is used to validate user login
     * @param {JSON}payload Takes user input at login GUI
     * @returns With a data if match found else returns with HTTP exception
     */
    validate(payload) {
        return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
            try {
                const loginData = yield this.repository;
                const { username, password } = payload;
                // console.log(loginData)
                // This functions checks for user 
                const user = yield loginData.findOne({ username, password });
                if (user) {
                    return user;
                }
                else {
                    return new common_1.HttpException({
                        status: common_1.HttpStatus.FORBIDDEN,
                        error: `User not found`,
                    }, common_1.HttpStatus.FORBIDDEN);
                }
                ;
            }
            catch (err) {
                console.log(err.message);
            }
        });
    }
};
UserService = UserService_1 = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)(),
    (0, tslib_1.__param)(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity)),
    (0, tslib_1.__metadata)("design:paramtypes", [typeof (_a = typeof typeorm_2.Repository !== "undefined" && typeorm_2.Repository) === "function" ? _a : Object, typeof (_b = typeof query_builder_service_1.QueryBuilder !== "undefined" && query_builder_service_1.QueryBuilder) === "function" ? _b : Object])
], UserService);
exports.UserService = UserService;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/providers/database/postgres/provider.module.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PostgresDatabaseProviderModule = void 0;
const tslib_1 = __webpack_require__("tslib");
const common_1 = __webpack_require__("@nestjs/common");
const typeorm_1 = __webpack_require__("@nestjs/typeorm");
const typeorm_2 = __webpack_require__("typeorm");
const config_module_1 = __webpack_require__("./apps/starnavigationapi/src/app/config/database/postgres/config.module.ts");
const configuration_service_1 = __webpack_require__("./apps/starnavigationapi/src/app/config/database/postgres/configuration.service.ts");
/**
 * @description  This module is for Connecting to postgres database
 * @module TypeOrmModule is for database connectivity
 * @class This class is exported as PostgresDatabaseProviderModule
 */
let PostgresDatabaseProviderModule = class PostgresDatabaseProviderModule {
};
PostgresDatabaseProviderModule = (0, tslib_1.__decorate)([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_module_1.PostgresSQLConfigModule],
                useFactory: (postgresConfigService) => (0, tslib_1.__awaiter)(void 0, void 0, void 0, function* () {
                    return ({
                        type: 'postgres',
                        host: postgresConfigService.host,
                        port: postgresConfigService.port,
                        username: postgresConfigService.username,
                        password: postgresConfigService.password,
                        database: postgresConfigService.dbname,
                        logging: postgresConfigService.logging,
                        synchronize: postgresConfigService.synchronize,
                        entities: (0, typeorm_2.getMetadataArgsStorage)().tables.map(tbl => tbl.target)
                    });
                }),
                inject: [configuration_service_1.PostgresSqlConfigService],
            })
        ]
    })
], PostgresDatabaseProviderModule);
exports.PostgresDatabaseProviderModule = PostgresDatabaseProviderModule;


/***/ }),

/***/ "./apps/starnavigationapi/src/app/service/query.builder.service.ts":
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.QueryBuilder = void 0;
const tslib_1 = __webpack_require__("tslib");
/* eslint-disable @typescript-eslint/no-explicit-any */
const common_1 = __webpack_require__("@nestjs/common");
/**
 * @ignore
 */
let QueryBuilder = class QueryBuilder {
    getQuery(state, queryBuilder) {
        this.filter(state, queryBuilder);
        this.sort(state, queryBuilder);
        return queryBuilder;
    }
    filter(state, queryBuilder) {
        if (typeof state.filters !== 'undefined') {
            queryBuilder.where("t." + state.filters[0].property + " like '%" + state.filters[0].value + "%'");
            if (state.filters.length > 1) {
                for (let i = 1; i < state.filters.length; i++) {
                    queryBuilder.where("t." + state.filters[i].property + " like '%" + state.filters[i].value + "%'");
                }
            }
        }
        return queryBuilder;
    }
    sort(state, queryBuilder) {
        if (typeof state.sort !== 'undefined') {
            queryBuilder.addOrderBy(`t.${state.sort.by}`, state.sort.reverse ? 'DESC' : 'ASC');
        }
        return queryBuilder;
    }
};
QueryBuilder = (0, tslib_1.__decorate)([
    (0, common_1.Injectable)()
], QueryBuilder);
exports.QueryBuilder = QueryBuilder;


/***/ }),

/***/ "@hapi/joi":
/***/ ((module) => {

module.exports = require("@hapi/joi");

/***/ }),

/***/ "@nestjs/common":
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),

/***/ "@nestjs/config":
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),

/***/ "@nestjs/core":
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),

/***/ "@nestjs/serve-static":
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),

/***/ "@nestjs/swagger":
/***/ ((module) => {

module.exports = require("@nestjs/swagger");

/***/ }),

/***/ "@nestjs/typeorm":
/***/ ((module) => {

module.exports = require("@nestjs/typeorm");

/***/ }),

/***/ "@nestjsx/crud/lib/crud":
/***/ ((module) => {

module.exports = require("@nestjsx/crud/lib/crud");

/***/ }),

/***/ "axios":
/***/ ((module) => {

module.exports = require("axios");

/***/ }),

/***/ "class-transformer":
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),

/***/ "class-validator":
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),

/***/ "fs":
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ "https":
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "lodash":
/***/ ((module) => {

module.exports = require("lodash");

/***/ }),

/***/ "nestjs-typeorm-paginate":
/***/ ((module) => {

module.exports = require("nestjs-typeorm-paginate");

/***/ }),

/***/ "rxjs/operators":
/***/ ((module) => {

module.exports = require("rxjs/operators");

/***/ }),

/***/ "tslib":
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),

/***/ "typeorm":
/***/ ((module) => {

module.exports = require("typeorm");

/***/ }),

/***/ "path":
/***/ ((module) => {

module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__("tslib");
const fs = __webpack_require__("fs");
const common_1 = __webpack_require__("@nestjs/common");
const core_1 = __webpack_require__("@nestjs/core");
const swagger_1 = __webpack_require__("@nestjs/swagger");
const app_module_1 = __webpack_require__("./apps/starnavigationapi/src/app/app.module.ts");
/**
 * @ignore
 */
function bootstrap() {
    return (0, tslib_1.__awaiter)(this, void 0, void 0, function* () {
        // const app = await NestFactory.create(AppModule);
        // const app = await NestFactory.create(AppModule, {
        //   httpsOptions: {
        //     key: fs.readFileSync('/home/ssl_cert/star-ads-app/new-private-key.txt', 'utf8'),
        //     cert: fs.readFileSync('/home/ssl_cert/star-ads-app/new-certificate.crt', 'utf8'),
        //   },
        // });
        const app = yield core_1.NestFactory.create(app_module_1.AppModule, {
            httpsOptions: {
                key: fs.readFileSync('/home/ssl_cert/star-ads-app/new-private-key.txt', 'utf8'),
                cert: fs.readFileSync('/home/ssl_cert/star-ads-app/8254c3b042470198.crt'),
            },
        });
        const globalPrefix = 'application-service/secured';
        app.setGlobalPrefix(globalPrefix);
        app.useGlobalPipes(new common_1.ValidationPipe());
        app.enableVersioning({
            type: common_1.VersioningType.URI,
        });
        /**
         * Display API using swagger to a port
         * @function
         */
        const port = process.env.APP_PORT || 3377;
        // const port = 3333;
        const config = new swagger_1.DocumentBuilder()
            .setTitle('Star Api')
            .setDescription('Star API Documentation')
            .setVersion('2.0')
            .addTag('star')
            .build();
        /**
         * @param app is argument passed to createDocument of swaggerModule. It contains all the api components.
         */
        const document = swagger_1.SwaggerModule.createDocument(app, config);
        swagger_1.SwaggerModule.setup(globalPrefix, app, document);
        app.enableCors({});
        /**
         * @param port is where our Swagger API is running
         */
        yield app.listen(port);
        /**
         * Logger is simply message function . It display port
         */
        common_1.Logger.log(`🚀 Application is running on PORT: ${port} URIs:- ${globalPrefix}`);
    });
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;
//# sourceMappingURL=main.js.map