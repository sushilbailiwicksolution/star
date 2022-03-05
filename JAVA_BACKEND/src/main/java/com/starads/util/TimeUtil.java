package com.starads.util;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

public class TimeUtil {
	public static LocalDateTime currentDateTime() {
		return LocalDateTime.ofInstant(Instant.now(), ZoneOffset.UTC);
	}
}
