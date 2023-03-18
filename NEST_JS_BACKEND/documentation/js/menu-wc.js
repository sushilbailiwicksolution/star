'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">starnavigationapi documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppConfigModule.html" data-type="entity-link" >AppConfigModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppConfigModule-973e99c3118cb2ed7a847c1458d91d4f0337cd981ce6fbfc88608bdd11083370b1879750ee41a0dd45133b5ff5ec2cf6adff58daeb8bf4029efd6e336f2315cc"' : 'data-target="#xs-injectables-links-module-AppConfigModule-973e99c3118cb2ed7a847c1458d91d4f0337cd981ce6fbfc88608bdd11083370b1879750ee41a0dd45133b5ff5ec2cf6adff58daeb8bf4029efd6e336f2315cc"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppConfigModule-973e99c3118cb2ed7a847c1458d91d4f0337cd981ce6fbfc88608bdd11083370b1879750ee41a0dd45133b5ff5ec2cf6adff58daeb8bf4029efd6e336f2315cc"' :
                                        'id="xs-injectables-links-module-AppConfigModule-973e99c3118cb2ed7a847c1458d91d4f0337cd981ce6fbfc88608bdd11083370b1879750ee41a0dd45133b5ff5ec2cf6adff58daeb8bf4029efd6e336f2315cc"' }>
                                        <li class="link">
                                            <a href="injectables/AppConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppConfigService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#controllers-links-module-AppModule-458990fc2cfcf8e07bd1cf71eb6012d6dc63dd19806829d20b07b6588f674c415ab27056705390bd493c3d188d109144eb9154df4aaef39d27fd31850a063240"' : 'data-target="#xs-controllers-links-module-AppModule-458990fc2cfcf8e07bd1cf71eb6012d6dc63dd19806829d20b07b6588f674c415ab27056705390bd493c3d188d109144eb9154df4aaef39d27fd31850a063240"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-458990fc2cfcf8e07bd1cf71eb6012d6dc63dd19806829d20b07b6588f674c415ab27056705390bd493c3d188d109144eb9154df4aaef39d27fd31850a063240"' :
                                            'id="xs-controllers-links-module-AppModule-458990fc2cfcf8e07bd1cf71eb6012d6dc63dd19806829d20b07b6588f674c415ab27056705390bd493c3d188d109144eb9154df4aaef39d27fd31850a063240"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-458990fc2cfcf8e07bd1cf71eb6012d6dc63dd19806829d20b07b6588f674c415ab27056705390bd493c3d188d109144eb9154df4aaef39d27fd31850a063240"' : 'data-target="#xs-injectables-links-module-AppModule-458990fc2cfcf8e07bd1cf71eb6012d6dc63dd19806829d20b07b6588f674c415ab27056705390bd493c3d188d109144eb9154df4aaef39d27fd31850a063240"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-458990fc2cfcf8e07bd1cf71eb6012d6dc63dd19806829d20b07b6588f674c415ab27056705390bd493c3d188d109144eb9154df4aaef39d27fd31850a063240"' :
                                        'id="xs-injectables-links-module-AppModule-458990fc2cfcf8e07bd1cf71eb6012d6dc63dd19806829d20b07b6588f674c415ab27056705390bd493c3d188d109144eb9154df4aaef39d27fd31850a063240"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/HttpConfigModule.html" data-type="entity-link" >HttpConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MySqlConfigModule.html" data-type="entity-link" >MySqlConfigModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/MysqlDatabaseProviderModule.html" data-type="entity-link" >MysqlDatabaseProviderModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PostgresDatabaseProviderModule.html" data-type="entity-link" >PostgresDatabaseProviderModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PostgresSQLConfigModule.html" data-type="entity-link" >PostgresSQLConfigModule</a>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#controllers-links"' :
                                'data-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AplController.html" data-type="entity-link" >AplController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AssetController.html" data-type="entity-link" >AssetController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/CustomerController.html" data-type="entity-link" >CustomerController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/EventDetailController.html" data-type="entity-link" >EventDetailController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GeofenceController.html" data-type="entity-link" >GeofenceController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/GroupController.html" data-type="entity-link" >GroupController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LandmarkController.html" data-type="entity-link" >LandmarkController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/LayerController.html" data-type="entity-link" >LayerController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NewLayerController.html" data-type="entity-link" >NewLayerController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NotificationController.html" data-type="entity-link" >NotificationController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/NotificationTemplateController.html" data-type="entity-link" >NotificationTemplateController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UserController.html" data-type="entity-link" >UserController</a>
                                </li>
                            </ul>
                        </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#entities-links"' :
                                'data-target="#xs-entities-links"' }>
                                <span class="icon ion-ios-apps"></span>
                                <span>Entities</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="entities-links"' : 'id="xs-entities-links"' }>
                                <li class="link">
                                    <a href="entities/AplEntity.html" data-type="entity-link" >AplEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/AplItemEntity.html" data-type="entity-link" >AplItemEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/AssetEntity.html" data-type="entity-link" >AssetEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/CustomerEntity.html" data-type="entity-link" >CustomerEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/EventDetailsEntity.html" data-type="entity-link" >EventDetailsEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/EventParamDetailsEntity.html" data-type="entity-link" >EventParamDetailsEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/FlighLocationEntity.html" data-type="entity-link" >FlighLocationEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/FlighPlanEntity.html" data-type="entity-link" >FlighPlanEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/GeofenceAssetEntity.html" data-type="entity-link" >GeofenceAssetEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/GeofenceEntity.html" data-type="entity-link" >GeofenceEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/GeofenceNotificationEntity.html" data-type="entity-link" >GeofenceNotificationEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/GeoObjectEntity.html" data-type="entity-link" >GeoObjectEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/GroupEntity.html" data-type="entity-link" >GroupEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/LandmarkEntity.html" data-type="entity-link" >LandmarkEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/LayerEntity.html" data-type="entity-link" >LayerEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/NewLayerDataEntity.html" data-type="entity-link" >NewLayerDataEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/NewLayerEntity.html" data-type="entity-link" >NewLayerEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/NotificationEmailEntity.html" data-type="entity-link" >NotificationEmailEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/NotificationEntity.html" data-type="entity-link" >NotificationEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/NotificationTemplateEntity.html" data-type="entity-link" >NotificationTemplateEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/NotificationUserEntity.html" data-type="entity-link" >NotificationUserEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserEntity.html" data-type="entity-link" >UserEntity</a>
                                </li>
                                <li class="link">
                                    <a href="entities/UserLogin.html" data-type="entity-link" >UserLogin</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/NewLayerCreateDto.html" data-type="entity-link" >NewLayerCreateDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AplService.html" data-type="entity-link" >AplService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppConfigService.html" data-type="entity-link" >AppConfigService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AssetService.html" data-type="entity-link" >AssetService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/CustomerService.html" data-type="entity-link" >CustomerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/EventDetailService.html" data-type="entity-link" >EventDetailService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GeofenceService.html" data-type="entity-link" >GeofenceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/GroupService.html" data-type="entity-link" >GroupService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LandmarkService.html" data-type="entity-link" >LandmarkService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/LayerService.html" data-type="entity-link" >LayerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NewLayerService.html" data-type="entity-link" >NewLayerService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationService.html" data-type="entity-link" >NotificationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NotificationTemplateService.html" data-type="entity-link" >NotificationTemplateService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});