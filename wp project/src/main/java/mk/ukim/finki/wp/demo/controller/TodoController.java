package mk.ukim.finki.wp.demo.controller;

import mk.ukim.finki.wp.demo.model.Todo;
import mk.ukim.finki.wp.demo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "http://localhost:8080")
@RestController
@RequestMapping("/api")
public class TodoController {
    @Autowired
    TodoRepository  todoRepository;
    //work
    @GetMapping("/todos")
    public ResponseEntity<List<Todo>> getAllTodos(@RequestParam(required =false) String title){
     try {
         List<Todo> todos = new ArrayList<>();
         if(title==null){
             todos.addAll(todoRepository.findAll());
         }
         else{
             todos.addAll(todoRepository.findByTitleContaining(title));

         }
         if(todos.isEmpty()){
             return  new ResponseEntity<>(HttpStatus.NO_CONTENT);

         }
         return  new ResponseEntity<>(todos,HttpStatus.OK);
     } catch (Exception e) {
         return  new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
     }
    }
      //work
    @GetMapping("/todos/byId/{id}")
    public  ResponseEntity<Todo> getTodoById(@PathVariable("id") long id){
        Optional<Todo> todoData =  todoRepository.findById(id);
        return todoData.map(todo -> new ResponseEntity<>(todo, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    //work
    @PostMapping("/todos")
    public ResponseEntity<Todo> createTodo(@RequestBody Todo todo){
        try {
            Todo _todo=todoRepository.save(new Todo(todo.getTitle(),todo.getStatus()));
            return new ResponseEntity<>(_todo,HttpStatus.CREATED);
        }
        catch (Exception e ){
            return  new ResponseEntity<>(null,HttpStatus.EXPECTATION_FAILED);

        }

    }
    //work
    @PutMapping("/todos/{id}")
    public ResponseEntity<Todo> updateTodo(@PathVariable("id")long id,@RequestBody Todo todo){
        Optional<Todo>  todoData=todoRepository.findById(id);
        if(todoData.isPresent()){
            Todo _todo=todoData.get();
            _todo.setTitle(todo.getTitle());

            _todo.setStatus(todo.getStatus());
            return new ResponseEntity<>(todoRepository.save(_todo),HttpStatus.OK);

        }
        else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND) ;
        }
    }
     //work
    @DeleteMapping("/todos/{id}")
    public ResponseEntity<HttpStatus>  deleteTodo(@PathVariable("id")long id){
        try {
            todoRepository.deleteById(id);
            return  new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        catch (Exception e){
            return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
        }
    }

    @PutMapping ("todos/status/{id}")
    public ResponseEntity<Todo> updateStatus(@PathVariable("id")long id){

            Optional<Todo>  todoData=todoRepository.findById(id);
            if(todoData.isPresent()){
                Todo _todo=todoData.get();
                _todo.setStatus(!_todo.getStatus());
                return new ResponseEntity<>(todoRepository.save(_todo),HttpStatus.OK);
            }
            else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND) ;
            }
        }


 @GetMapping("/todos/true")
    public Collection<Todo> getStatusTrue(){
        return todoRepository.findByStatusIsTrue();
 }
 @GetMapping("/todos/false")
    public Collection<Todo> getStatusFalse(){
        return todoRepository.findByStatusIsFalse();
 }

}
