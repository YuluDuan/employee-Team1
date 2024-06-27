package com.example.demo.controller;

import com.example.demo.model.Employee;
import com.example.demo.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class EmployeeController {

    private final EmployeeRepository repository;

    @GetMapping("/employee/{email}")
    @ResponseBody
    public Employee findEmployee(@PathVariable String email) {
        return repository.findByEmail(email);
    }

    @GetMapping("/employees")
    @ResponseBody
    public List<Employee> findAllEmployees() {
        return repository.findAll();
    }

    @DeleteMapping("/employees/{id}")
    public ResponseEntity<Void> borrowBook(@PathVariable long id) {
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/employees")
    public Employee returnBook(@RequestBody Employee employee) {
        employee.setId(null);
        return repository.save(employee);
    }
}
