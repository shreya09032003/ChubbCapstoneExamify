package com.exam.controller;

import com.exam.model.exam.Category;
import com.exam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/category")
@CrossOrigin("*")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    //add category
    @PostMapping("/")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        Category category1 = this.categoryService.addCategory(category);
        return ResponseEntity.ok(category1);
    }

    //get category
    @GetMapping("/{categoryId}")
    public Category getCategory(@PathVariable("categoryId") Long categoryId) {
        return this.categoryService.getCategory(categoryId);
    }

    //get all categories
    @GetMapping("/")
    public ResponseEntity<?> getCategories() {
        return ResponseEntity.ok(this.categoryService.getCategories());
    }

    //update category
    @PutMapping("/")
    public Category updateCategory(@RequestBody Category category) {
        return this.categoryService.updateCategory(category);
    }

    //delete category
    @DeleteMapping("/{categoryId}")
    public void deleteCategory(@PathVariable("categoryId") Long categoryId) {
        this.categoryService.deleteCategory(categoryId);
    }


//    @DeleteMapping("/{categoryId}")
//    public ResponseEntity<String> deleteCategory(@PathVariable("categoryId") Long categoryId) {
//        try {
//            // Log categoryId to verify it's being passed correctly
//            System.out.println("Attempting to delete category with ID: " + categoryId);
//            this.categoryService.deleteCategory(categoryId);
//            return ResponseEntity.ok("Category deleted successfully.");
//        } catch (Exception e) {
//            // Log the full stack trace for debugging
//            e.printStackTrace();
//            return ResponseEntity.status(400).body("Failed to delete category: " + e.getMessage());
//        }
//    }


}
