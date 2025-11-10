package com.example.projectmanagement.controller;

import com.example.projectmanagement.model.Project;
import com.example.projectmanagement.model.User;
import com.example.projectmanagement.repository.ProjectRepository;
import com.example.projectmanagement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "http://localhost:3000")
public class ProjectController {

    @Autowired
    private ProjectRepository projectRepo;

    @Autowired
    private UserRepository userRepo;

    // ✅ Add Project
    @PostMapping("/add")
public Object addProject(@RequestBody Project project) {
    // Validate manager
    User manager = userRepo.findByEmail(project.getAssignedManager());
    if (manager == null || !"MANAGER".equalsIgnoreCase(manager.getRole())) {
        return "❌ Invalid Manager: No such registered manager found.";
    }

    // Validate employee
    User employee = userRepo.findByEmail(project.getAssignedEmployee());
    if (employee == null || !"EMPLOYEE".equalsIgnoreCase(employee.getRole())) {
        return "❌ Invalid Employee: No such registered employee found.";
    }

    // ✅ Save managerId and employeeId properly
    project.setManagerId(manager.getId());
    project.setEmployeeId(employee.getId());
    project.setStatus("Pending");
    return projectRepo.save(project);
}

    // ✅ View All Projects
    @GetMapping("/all")
    public List<Project> getAllProjects() {
        return projectRepo.findAll();
    }

    // ✅ View Projects assigned by Manager
    @GetMapping("/manager/{managerId}")
    public List<Project> getProjectsByManager(@PathVariable Long managerId) {
        return projectRepo.findByManagerId(managerId);
    }

    // ✅ View Projects assigned to Employee
    @GetMapping("/employee/{employeeId}")
    public List<Project> getProjectsByEmployee(@PathVariable Long employeeId) {
        return projectRepo.findByEmployeeId(employeeId);
    }

    // ✅ Update Project Status
    @PutMapping("/update-status/{id}")
    public Project updateStatus(@PathVariable Long id, @RequestBody Project newData) {
        Project project = projectRepo.findById(id).orElseThrow();
        project.setStatus(newData.getStatus());
        return projectRepo.save(project);
    }
    
}
