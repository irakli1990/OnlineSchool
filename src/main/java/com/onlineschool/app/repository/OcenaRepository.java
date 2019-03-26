package com.onlineschool.app.repository;

import com.onlineschool.app.domain.Ocena;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Ocena entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OcenaRepository extends JpaRepository<Ocena, Long> {

}
