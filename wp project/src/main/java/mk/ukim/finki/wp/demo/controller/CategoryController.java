package mk.ukim.finki.wp.demo.controller;

import mk.ukim.finki.wp.demo.model.Category;
import mk.ukim.finki.wp.demo.repository.CategoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class CategoryController {
    private CategoryRepository categoryRepository;

    public CategoryController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping("/categories")
    List<Category> categories(){
        return  categoryRepository.findAll();
    }
    @Valid
    @PutMapping("/category")
    public ResponseEntity<Category> updateCategoryById(@Valid   @RequestBody Category category){
        Category categoryData=categoryRepository.save(category);
        return new ResponseEntity<>(categoryData,HttpStatus.OK);
    }
    @GetMapping("/category/{id}")
     public ResponseEntity<Category> getCategoryById(@PathVariable("id") long id){
       Optional<Category> categoryData=categoryRepository.findById(id);
       return categoryData.map(category -> new ResponseEntity<>(category, HttpStatus.OK)).orElseGet(()-> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping("/category")
    ResponseEntity<Category> createCategory( @Valid @RequestBody Category category){
        try {


            Category _category = categoryRepository.save(new Category(category.getId(), category.getName()));
            return new ResponseEntity<>(_category, HttpStatus.OK);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }
    @DeleteMapping("/category/{id}")
    public ResponseEntity<HttpStatus> deleteCategory(@PathVariable("id") long id){
        try {
            categoryRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

}
