package com.starads.generic;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.starads.generic.dto.GenericDTO;
import com.starads.generic.dto.ResponseDTO;

public abstract class GenericController<DTO extends GenericDTO<DTO>, ENT extends GenericEntity<ENT>> {

	private final GenericOrch<DTO, ENT> orch;

	public GenericController(GenericOrch<DTO, ENT> orch) {
		this.orch = orch;
	}

	@GetMapping("")
	public ResponseEntity<ResponseDTO> get() {
		return ResponseEntity.ok(orch.get());
	}

	@GetMapping("/{id}")
	public ResponseEntity<ResponseDTO> getOne(@PathVariable Long id) {
		return ResponseEntity.ok(orch.get(id));
	}

	@PostMapping("")
	public ResponseEntity<ResponseDTO> create(@RequestBody DTO dto) {
		return ResponseEntity.ok(orch.create(dto));
	}

	@PutMapping("")
	public ResponseEntity<ResponseDTO> update(@RequestBody DTO dto) {
		return ResponseEntity.ok(orch.update(dto));
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<ResponseDTO> delete(@PathVariable Long id) {
		return ResponseEntity.ok(orch.delete(id));
	}

	public GenericOrch<DTO, ENT> getOrch() {
		return this.orch;
	}
}
