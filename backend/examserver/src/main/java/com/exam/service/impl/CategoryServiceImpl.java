package com.exam.service.impl;

import com.exam.model.exam.Category;
import com.exam.repo.CategoryRepository;
import com.exam.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.LinkedHashSet;
import java.util.Optional;
import java.util.Set;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Override
    public Category addCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Category updateCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    @Override
    public Set<Category> getCategories() {
        return new LinkedHashSet<>(this.categoryRepository.findAll());
    }

    @Override
    public Category getCategory(Long categoryId) {
        return this.categoryRepository.findById(categoryId).get();
    }

//    @Override
//    public Category getCategoryById(Long categoryId) {
//        // Ensure category exists by using Optional or throwing exception if not found
//        Optional<Category> category = this.categoryRepository.findById(categoryId);
//        if (category.isPresent()) {
//            return category.get();
//        } else {
//            throw new IllegalArgumentException("Category with ID " + categoryId + " not found");
//        }
//    }



//    @Override
//    public void deleteCategory(Long categoryId) {
//        Category category = new Category();
//        category.setCid(categoryId);
//        this.categoryRepository.delete(category);
//    }

    @Override
    public void deleteCategory(Long categoryId) {
            this.categoryRepository.deleteById(categoryId);

    }



}
