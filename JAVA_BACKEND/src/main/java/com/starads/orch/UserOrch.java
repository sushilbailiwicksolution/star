package com.starads.orch;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.starads.dto.UserDto;
import com.starads.exceptions.InternalServiceException;
import com.starads.generic.EntityStatus;
import com.starads.generic.GenericOrch;
import com.starads.generic.dto.ResponseDTO;
import com.starads.repository.entity.User;
import com.starads.repository.entity.UserType;
import com.starads.services.UserService;
import com.starads.util.BeansUtil;
import com.starads.util.Constants;
import com.starads.util.ErrorMessages;

@Service
public class UserOrch extends GenericOrch<UserDto, User> {

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	public UserOrch(UserService service) {
		super(service);
	}

	@Override
	protected User convertToEntity(UserDto dto) {
		User user = modelMapper.map(dto, User.class);
		user.setStatus(EntityStatus.ACTIVE);
		return user;
	}

	@Override
	protected UserDto convertToDTO(User ent) {
		UserDto userDto = modelMapper.map(ent, UserDto.class);
		return userDto;
	}

	public ResponseDTO getUserByAccountType(UserType accountType) {
		try {
			UserService service = (UserService) getService();
			List<UserDto> dtos = convertToDTOs(service.get());
			return BeansUtil.successResponse(Constants.SUCCESS, dtos);
		} catch (Exception e) {
			logger.error("Error while getUserByAccountType data Error{} ", e.getMessage(), e);
			throw new InternalServiceException(ErrorMessages.INTERNAL_SERVER_ERROR);
		}
	}
}
