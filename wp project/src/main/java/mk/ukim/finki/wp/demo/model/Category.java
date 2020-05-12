package mk.ukim.finki.wp.demo.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
@Entity
public class Category {
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }




    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Valid
    @NotNull
    @NotEmpty
    private String  name;

   public  Category(){}
    public Category(Long id,String name) {
        this.id=id;
        this.name=name;
    }
    public Category(String name) {

        this.name=name;
    }
}
