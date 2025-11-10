package com.example.projectmanagement.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "projects")
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String deadline;
    private String status; // Pending, In Progress, Completed

    // Store who assigned the project
    private String assignedManager;

    // Store to whom project is assigned
    private String assignedEmployee;

    // ✅ Store IDs for better mapping
    private Long managerId;
    private Long employeeId;
}
