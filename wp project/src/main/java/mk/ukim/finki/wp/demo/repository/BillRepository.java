package mk.ukim.finki.wp.demo.repository;

import mk.ukim.finki.wp.demo.model.BillOrganizer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BillRepository extends JpaRepository<BillOrganizer,Long> {
}
