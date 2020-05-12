package mk.ukim.finki.wp.demo.repository;

import mk.ukim.finki.wp.demo.model.Todo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TodoRepository  extends JpaRepository<Todo,Long> {
    List<Todo> findByStatusIsTrue();
    List<Todo> findByStatusIsFalse();
    List<Todo> findByTitleContaining(String title);
}
