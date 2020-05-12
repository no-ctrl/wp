package mk.ukim.finki.wp.demo.model;

import javax.persistence.*;
import java.util.Set;

@Entity
@Table(name = "users")

public class User {


    @OneToMany
    private Set<Todo> todos;
    @OneToMany
    private Set<Category> categories;
    @OneToMany
    private Set<BillOrganizer> bills;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(unique = true,nullable = false)
    private String username;
    @Column(nullable = false)
    private String password;



    public User() {
    }
    public User(String username,String password){
        this.username=username;
        this.password=password;
    }

    public Set<Todo> getTodos() {
        return todos;
    }

    public void setTodos(Set<Todo> todos) {
        this.todos = todos;
    }

    public Set<Category> getCategories() {
        return categories;
    }

    public void setCategories(Set<Category> categories) {
        this.categories = categories;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }




}
