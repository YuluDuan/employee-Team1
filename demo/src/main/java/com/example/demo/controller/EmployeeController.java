package com.example.demo.controller;

import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeRepository repository;

    @Operation(summary = "Find an employee by email")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Found the employee",
            content = { @Content(mediaType = "application/json",
            schema = @Schema(implementation = Employee.class)) }),
        @ApiResponse(responseCode = "404", description = "Employee not found",
            content = @Content)
    })
    @GetMapping("/employee/{email}")
    @ResponseBody
    public Employee findEmployee(@PathVariable String email) {
        return repository.findByEmail(email);
    }

    @Operation(summary = "Get all employees")
    @ApiResponses(value = {
        @ApiResponse(responseCode = "200", description = "Found all employees",
            content = { @Content(mediaType = "application/json",
            schema = @Schema(implementation = Employee.class)) })
    })
    @GetMapping("/employees")
    @ResponseBody
    public List<Employee> findAllEmployees() {
        return repository.findAll();
    }
}
