package com.starads.util;

public class Constants {
	public static final String SECURED_BASE_V1 = "/secured/v1";
	public static final String NON_SECURED_BASE_V1 = "/non-secure/v1";
	public static final String USER_API = SECURED_BASE_V1 + "/users";

	public static final String FLIGHT_PLANS_API = SECURED_BASE_V1 + "/flight-plans";
	public static final String EVENT_DETAILS_API = SECURED_BASE_V1 + "/event-details";

	public static final String LAYERS_API = SECURED_BASE_V1 + "/layers";

	public static final String GEOFENCE_API = SECURED_BASE_V1 + "/geofence";
	public static final String NOTIFICATION_API = SECURED_BASE_V1 + "/notification";

	public static final String NOTIFICATION_TEMPLATE_API = SECURED_BASE_V1 + "/notification-template";
	public static final String CUSTOMER_API = SECURED_BASE_V1 + "/customers";
	public static final String GROUPS_API = SECURED_BASE_V1 + "/groups";
	public static final String ASSETS_API = SECURED_BASE_V1 + "/assets";
	public static final String ASSETS_APL_API = SECURED_BASE_V1 + "/assets/apl";
	public static final String APPLICATION_JSON = "application/json";
	public static final String SITE_RULE_CREATED_MESSAGE = "Site Rule Created Successfully";
	public static final String SUCCESS = "Success";
	public static final String DELETED_SUCCESS = "Deleted Successfully";
	public static final String UPDATED_SUCCESS = "Updated Successfully";
	public static final String CREATED_SUCCESS = "Created Successfully";

	// Asset
	public static final Integer SYMBOL_STROKE_SIZE = 2;
	public static final String SYMBOL_STROKE_COLOR = "#000000";
	public static final String TRACK_COLOR = "#663300";
	public static final String SYMBOL_COLOR = "#FF3300";
}
