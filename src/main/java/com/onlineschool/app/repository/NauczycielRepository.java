package com.onlineschool.app.repository;

import com.onlineschool.app.domain.Nauczyciel;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Nauczyciel entity.
 */
@SuppressWarnings("unused")
@Repository
public interface NauczycielRepository extends JpaRepository<Nauczyciel, Long> {

}
