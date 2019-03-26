package com.onlineschool.app.repository;

import com.onlineschool.app.domain.Uczen;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Uczen entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UczenRepository extends JpaRepository<Uczen, Long> {

}
