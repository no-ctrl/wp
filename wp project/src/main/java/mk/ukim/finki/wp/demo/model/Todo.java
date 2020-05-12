package mk.ukim.finki.wp.demo.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;

@Entity
@Table(name="todos")
public class Todo {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private long  id;
    @Column(name="title")
    private String title;

    @JsonFormat(pattern="dd-MM-yyyy")
    @Column(name ="status")
    private boolean status;
    @ManyToOne(cascade = CascadeType.PERSIST)
    private  User user;

    public Todo() {
    }
    public Todo(String title, boolean status){
        this.title=title;

        this.status=status;
    }

    public long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }



    public boolean getStatus() {
        return status;
    }

    public void setId(long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }


    public void setStatus(boolean status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", title='" + title + '\'' +

                ", status=" + status +
                '}';
    }
}
