package mk.ukim.finki.wp.demo.controller;

import mk.ukim.finki.wp.demo.model.BillOrganizer;
import mk.ukim.finki.wp.demo.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api")
public class BillController {
@Autowired
 private BillRepository billRepository;

@GetMapping("/bills")
    List<BillOrganizer> getBills(){
    return billRepository.findAll();
}
@DeleteMapping("/bills/{id}")
    ResponseEntity<BillOrganizer> deleteBill(@PathVariable Long id){
     try {
         billRepository.deleteById(id);
         return new ResponseEntity<>(HttpStatus.NO_CONTENT);
     }
     catch (Exception e){
         return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
     }

}
@PostMapping("/bills")
    ResponseEntity<BillOrganizer> createBill(@Valid  @RequestBody BillOrganizer bill)  {
   try {


       BillOrganizer result = billRepository.save(bill);
       return new ResponseEntity<>(result,HttpStatus.OK);
   } catch (Exception e) {
       return new ResponseEntity<>(HttpStatus.EXPECTATION_FAILED);
   }


}

}
